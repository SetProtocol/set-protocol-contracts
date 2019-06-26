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

import { AddressArrayUtils } from "../../../lib/AddressArrayUtils.sol";
import { ERC20Wrapper } from "../../../lib/ERC20Wrapper.sol";
import { IRebalancingSetToken } from "../../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { ModuleCoreState } from "./ModuleCoreState.sol";


/**
 * @title RebalancingSetIssuance
 * @author Set Protocol
 *
 * The RebalancingSetIssuance contains utility functions used in RebalancingSet 
 * issuance
 */
contract RebalancingSetIssuance is 
    ModuleCoreState
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    // ============ Internal ============

    /**
     * Validates that wrapped Ether is a component of the Set
     *
     * @param  _setAddress            Address of the SetToken
     * @param  _wrappedEtherAddress   Address of wrapped Ether
     */
    function validateWethIsAComponentOfSet(
        address _setAddress,
        address _wrappedEtherAddress
    )
        internal
    {
        address[] memory setComponents = ISetToken(_setAddress).getComponents();
        require(
            setComponents.contains(_wrappedEtherAddress),
            "RebalancingSetIssuance.validateWethIsAComponentOfSet: Components must contain weth"
        );
    }

    /**
     * Validates that the passed in address is tracked by Core and that the quantity
     * is a multiple of the natural unit
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue/redeem
     * @param  _rebalancingSetQuantity   The issuance quantity of Rebalancing Set
     */   
    function validateRebalancingSetIssuance(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity
    ) 
        internal
    {
        // Expect RebalancingSet to be valid and enabled Set
        require(
            coreInstance.validSets(_rebalancingSetAddress),
            "RebalancingSetIssuance.validateRebalancingIssuance: Invalid or disabled SetToken address"
        );
        
        // Make sure Issuance quantity is multiple of the RebalancingSet natural unit
        require(
            _rebalancingSetQuantity.mod(ISetToken(_rebalancingSetAddress).naturalUnit()) == 0,
            "RebalancingSetIssuance.validateRebalancingIssuance: Quantity must be multiple of natural unit"
        );
    }

    /**
     * Given a rebalancing Set and a desired issue quantity, calculates the 
     * minimum issuable quantity of the base Set. If the calculated quantity is initially
     * not a multiple of the base Set's natural unit, the quantity is rounded up
     * to the next base set natural unit.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to issue
     * @param  _rebalancingSetQuantity   The issuance quantity of Rebalancing Set
     * @return requiredBaseSetQuantity      The quantity of base Set to issue
     */    
    function getBaseSetIssuanceRequiredQuantity(
        address _rebalancingSetAddress,
        uint256 _rebalancingSetQuantity
    )
        internal
        returns (uint256)
    {
        IRebalancingSetToken rebalancingSet = IRebalancingSetToken(_rebalancingSetAddress);

        uint256 unitShares = rebalancingSet.unitShares();
        uint256 naturalUnit = rebalancingSet.naturalUnit();

        uint256 requiredBaseSetQuantity = _rebalancingSetQuantity.mul(unitShares).div(naturalUnit);

        address baseSet = rebalancingSet.currentSet();
        uint256 baseSetNaturalUnit = ISetToken(baseSet).naturalUnit();

        // If there is a mismatch between the required quantity and the base Set natural unit,
        // round up to the next base Set natural unit if required.
        if (requiredBaseSetQuantity.mod(baseSetNaturalUnit) > 0) {
            uint256 roundDownQuantity = requiredBaseSetQuantity.mod(baseSetNaturalUnit);
            requiredBaseSetQuantity = requiredBaseSetQuantity.sub(roundDownQuantity).add(baseSetNaturalUnit);
        }

        return requiredBaseSetQuantity;
    }


    /**
     * Given a rebalancing set address, retrieve the base set quantity redeem quantity.
     * Rounds down to the nearest base Set natural unit.
     *
     * @param _baseSetAddress             The address of the base Set
     * @return baseSetRedeemQuantity      The quantity of base Set to redeem
     */
    function getBaseSetRedeemQuantity(
        address _baseSetAddress
    )
        internal
        view
        returns (uint256)
    {
        // Get Base Set Details from the rebalancing Set
        uint256 baseSetNaturalUnit = IRebalancingSetToken(_baseSetAddress).naturalUnit();
        uint256 baseSetBalance = vaultInstance.getOwnerBalance(
            _baseSetAddress,
            address(this)
        );

        // Round the balance down to the base Set natural unit
        uint256 redeemQuantity = baseSetBalance.div(baseSetNaturalUnit).mul(baseSetNaturalUnit);

        return redeemQuantity;
    }

    /**
     * Checks the base Set balances in the Vault and on the contract. 
     * Sends any positive quantity to the user directly or into the Vault
     * depending on the keepChangeInVault flag.
     *
     * @param _baseSetAddress             The address of the base Set
     * @param  _keepChangeInVault         Boolean signifying whether excess base Set is transfered to the user 
     *                                     or left in the vault
     */
    function returnExcessBaseSet(
        address _baseSetAddress,
        bool _keepChangeInVault
    )
        internal
    {
        returnExcessBaseSetFromContract(_baseSetAddress, _keepChangeInVault);

        returnExcessBaseSetInVault(_baseSetAddress, _keepChangeInVault);
    }   

    /**
     * Checks the base Set balances on the contract and sends
     * any positive quantity to the user directly or into the Vault
     * depending on the keepChangeInVault flag.
     *
     * @param _baseSetAddress             The address of the base Set
     * @param  _keepChangeInVault         Boolean signifying whether excess base Set is transfered to the user 
     *                                     or left in the vault
     */
    function returnExcessBaseSetFromContract(
        address _baseSetAddress,
        bool _keepChangeInVault
    )
        internal
    {
        uint256 baseSetQuantity = ERC20Wrapper.balanceOf(_baseSetAddress, address(this));
        
        if (baseSetQuantity == 0) { return; }

        if (_keepChangeInVault) {
            // Transfer ownership within the vault to the user
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
     * Checks the base Set balances in the Vault and sends
     * any positive quantity to the user directly or into the Vault
     * depending on the keepChangeInVault flag.
     *
     * @param _baseSetAddress             The address of the base Set
     * @param  _keepChangeInVault         Boolean signifying whether excess base Set is transfered to the user 
     *                                     or left in the vault
     */
    function returnExcessBaseSetInVault(
        address _baseSetAddress,
        bool _keepChangeInVault
    )
        internal
    {
        // Return base Set if any that are in the Vault
        uint256 baseSetQuantityInVault = vaultInstance.getOwnerBalance(
            _baseSetAddress,
            address(this)
        );
        
        if (baseSetQuantityInVault == 0) { return; }

        if (_keepChangeInVault) {
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
