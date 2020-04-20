/*
    Copyright 2019 Set Labs Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

pragma solidity 0.5.7;

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";

import { ERC20Wrapper } from "../../../lib/ERC20Wrapper.sol";
import { IRebalancingSetToken } from "../../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { ModuleCoreState } from "./ModuleCoreState.sol";


/**
 * @title RebalancingSetIssuance
 * @author Set Protocol
 *
 * The RebalancingSetIssuance contains utility functions used in rebalancing SetToken 
 * issuance
 */
contract RebalancingSetIssuance is 
    ModuleCoreState
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    // ============ Internal ============

    /**
     * Validates that wrapped Ether is a component of the SetToken
     *
     * @param  _setAddress            Address of the SetToken
     * @param  _wrappedEtherAddress   Address of wrapped Ether
     */
    function validateWETHIsAComponentOfSet(
        address _setAddress,
        address _wrappedEtherAddress
    )
        internal
        view
    {
        require(
            ISetToken(_setAddress).tokenIsComponent(_wrappedEtherAddress),
            "RebalancingSetIssuance.validateWETHIsAComponentOfSet: Components must contain weth"
        );
    }

    /**
     * Validates that the passed in address is tracked by Core and that the quantity
     * is a multiple of the natural unit
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken to issue/redeem
     * @param  _rebalancingSetQuantity   The issuance quantity of rebalancing SetToken
     */   
    function validateRebalancingSetIssuance(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity
    ) 
        internal
        view
    {
        // Expect rebalancing SetToken to be valid and enabled SetToken
        require(
            coreInstance.validSets(_rebalancingSetAddress),
            "RebalancingSetIssuance.validateRebalancingIssuance: Invalid or disabled SetToken address"
        );
        
        // Make sure Issuance quantity is multiple of the rebalancing SetToken natural unit
        require(
            _rebalancingSetQuantity.mod(ISetToken(_rebalancingSetAddress).naturalUnit()) == 0,
            "RebalancingSetIssuance.validateRebalancingIssuance: Quantity must be multiple of natural unit"
        );
    }

    /**
     * Given a rebalancing SetToken and a desired issue quantity, calculates the 
     * minimum issuable quantity of the base SetToken. If the calculated quantity is initially
     * not a multiple of the base SetToken's natural unit, the quantity is rounded up
     * to the next base set natural unit.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing SetToken to issue
     * @param  _rebalancingSetQuantity   The issuance quantity of rebalancing SetToken
     * @return requiredBaseSetQuantity   The quantity of base SetToken to issue
     */    
    function getBaseSetIssuanceRequiredQuantity(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity
    )
        internal
        view
        returns (uint256)
    {
        IRebalancingSetToken rebalancingSet = IRebalancingSetToken(_rebalancingSetAddress);

        uint256 unitShares = rebalancingSet.unitShares();
        uint256 naturalUnit = rebalancingSet.naturalUnit();

        uint256 requiredBaseSetQuantity = _rebalancingSetQuantity.div(naturalUnit).mul(unitShares);

        address baseSet = rebalancingSet.currentSet();
        uint256 baseSetNaturalUnit = ISetToken(baseSet).naturalUnit();

        // If there is a mismatch between the required quantity and the base SetToken natural unit,
        // round up to the next base SetToken natural unit if required.
        uint256 roundDownQuantity = requiredBaseSetQuantity.mod(baseSetNaturalUnit);
        if (roundDownQuantity > 0) {
            requiredBaseSetQuantity = requiredBaseSetQuantity.sub(roundDownQuantity).add(baseSetNaturalUnit);
        }

        return requiredBaseSetQuantity;
    }


    /**
     * Given a rebalancing SetToken address, retrieve the base SetToken quantity redeem quantity based on the quantity
     * held in the Vault. Rounds down to the nearest base SetToken natural unit
     *
     * @param _baseSetAddress             The address of the base SetToken
     * @return baseSetRedeemQuantity      The quantity of base SetToken to redeem
     */
    function getBaseSetRedeemQuantity(
        address _baseSetAddress
    )
        internal
        view
        returns (uint256)
    {
        // Get base SetToken Details from the rebalancing SetToken
        uint256 baseSetNaturalUnit = ISetToken(_baseSetAddress).naturalUnit();
        uint256 baseSetBalance = vaultInstance.getOwnerBalance(
            _baseSetAddress,
            address(this)
        );

        // Round the balance down to the base SetToken natural unit and return
        return baseSetBalance.sub(baseSetBalance.mod(baseSetNaturalUnit));
    }

    /**
     * Checks the base SetToken balances in the Vault and on the contract. 
     * Sends any positive quantity to the user directly or into the Vault
     * depending on the keepChangeInVault flag.
     *
     * @param _baseSetAddress             The address of the base SetToken
     * @param _transferProxyAddress       The address of the TransferProxy
     * @param  _keepChangeInVault         Boolean signifying whether excess base SetToken is transferred to the user 
     *                                     or left in the vault
     */
    function returnExcessBaseSet(
        address _baseSetAddress,
        address _transferProxyAddress,
        bool _keepChangeInVault
    )
        internal
    {
        returnExcessBaseSetFromContract(_baseSetAddress, _transferProxyAddress, _keepChangeInVault);

        returnExcessBaseSetInVault(_baseSetAddress, _keepChangeInVault);
    }   

    /**
     * Checks the base SetToken balances on the contract and sends
     * any positive quantity to the user directly or into the Vault
     * depending on the keepChangeInVault flag.
     *
     * @param _baseSetAddress             The address of the base SetToken
     * @param _transferProxyAddress       The address of the TransferProxy
     * @param  _keepChangeInVault         Boolean signifying whether excess base SetToken is transfered to the user 
     *                                     or left in the vault
     */
    function returnExcessBaseSetFromContract(
        address _baseSetAddress,
        address _transferProxyAddress,
        bool _keepChangeInVault
    )
        internal
    {
        uint256 baseSetQuantity = ERC20Wrapper.balanceOf(_baseSetAddress, address(this));
        
        if (baseSetQuantity == 0) { 
            return; 
        } else if (_keepChangeInVault) {
            // Ensure base SetToken allowance
            ERC20Wrapper.ensureAllowance(
                _baseSetAddress,
                address(this),
                _transferProxyAddress,
                baseSetQuantity
            );

            // Deposit base SetToken to the user
            coreInstance.depositModule(
                address(this),
                msg.sender,
                _baseSetAddress,
                baseSetQuantity
            );
        } else {
            // Transfer directly to the user
            ERC20Wrapper.transfer(
                _baseSetAddress,
                msg.sender,
                baseSetQuantity
            );
        }
    }

    /**
     * Checks the base SetToken balances in the Vault and sends
     * any positive quantity to the user directly or into the Vault
     * depending on the keepChangeInVault flag.
     *
     * @param _baseSetAddress             The address of the base SetToken
     * @param  _keepChangeInVault         Boolean signifying whether excess base SetToken is transfered to the user 
     *                                     or left in the vault
     */
    function returnExcessBaseSetInVault(
        address _baseSetAddress,
        bool _keepChangeInVault
    )
        internal
    {
        // Return base SetToken if any that are in the Vault
        uint256 baseSetQuantityInVault = vaultInstance.getOwnerBalance(
            _baseSetAddress,
            address(this)
        );
        
        if (baseSetQuantityInVault == 0) { 
            return; 
        } else if (_keepChangeInVault) {
            // Transfer ownership within the vault to the user
            coreInstance.internalTransfer(
                _baseSetAddress,
                msg.sender,
                baseSetQuantityInVault
            );
        } else {
            // Transfer ownership directly to the user
            coreInstance.withdrawModule(
                address(this),
                msg.sender,
                _baseSetAddress,
                baseSetQuantityInVault
            );
        }
    }   
}
