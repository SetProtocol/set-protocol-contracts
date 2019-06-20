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

import { ERC20Wrapper } from "../../../lib/ERC20Wrapper.sol";
import { ExchangeIssuanceLibrary } from "./ExchangeIssuanceLibrary.sol";
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

    // ============ Internal ============

    function redeemRebalancingSetAndWithdraw(
        address _rebalancingSetAddress,
        uint256 _redeemQuantity
    )
        internal
    {
        // Redeem RB Set to the vault attributed to this contract
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _redeemQuantity
        );

        // Calculate the Base Set Redeem quantity
        address baseSetAddress = IRebalancingSetToken(_rebalancingSetAddress).currentSet();
        uint256 baseSetRedeemQuantity = getBaseSetRedeemQuantity(baseSetAddress);

        // Withdraw base Set to this contract
        coreInstance.withdraw(
            baseSetAddress,
            baseSetRedeemQuantity
        );
    }


    /**
     * Given a rebalancing set address, retrieve the base set quantity redeem quantity.
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

        // Round the balance to the natural unit
        uint256 redeemQuantity = baseSetBalance.div(baseSetNaturalUnit).mul(baseSetNaturalUnit);

        return redeemQuantity;
    }

    function redeemToBaseSetAndWithdraw(
        address _rebalancingSetAddress,
        uint256 _redeemQuantity
    )
        internal
    {
        // Redeem RB Set to the vault attributed to this contract
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _rebalancingSetAddress,
            _redeemQuantity
        );

        // Calculate the Base Set Redeem quantity
        IRebalancingSetToken rebalancingSet = IRebalancingSetToken(_rebalancingSetAddress);
        address baseSetAddress = rebalancingSet.currentSet();
        uint256 baseSetRedeemQuantity = getBaseSetRedeemQuantity(baseSetAddress);

        // Withdraw base Set to this contract
        coreInstance.withdraw(
            baseSetAddress,
            baseSetRedeemQuantity
        );
    }

    /**
     * Any base Set and base Set components issued are returned to the caller.
     *
     * @param _baseSetAddress           The address of the base Set
     */
    function returnIssuanceBaseSetAndComponentsExcessFunds(
        address _baseSetAddress
    )
        internal
    {
        // Return any excess base Set to the user not used in rebalancing set issuance
        uint256 leftoverBaseSet = ERC20Wrapper.balanceOf(
            _baseSetAddress,
            address(this)
        );
        if (leftoverBaseSet > 0) {
            ERC20Wrapper.transfer(
                _baseSetAddress,
                msg.sender,
                leftoverBaseSet
            );
        }

        // Return base Set components not used in issuance of base set
        address[] memory baseSetComponents = ISetToken(_baseSetAddress).getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            uint256 vaultQuantity = vaultInstance.getOwnerBalance(baseSetComponents[i], address(this));
            if (vaultQuantity > 0) {
                coreInstance.withdrawModule(
                    address(this),
                    msg.sender,
                    baseSetComponents[i],
                    vaultQuantity
                );
            }
        }
    }

    /**
     * Withdraw any remaining Base Set and non-exchanged components to the user
     *
     * @param  _setAddress   Address of the Base Set
     */
    function returnRedemptionExcessFunds(
        address _setAddress
    )
        internal
    {
        // Return base Set if any that are in the Vault
        uint256 baseSetQuantity = vaultInstance.getOwnerBalance(_setAddress, address(this));
        if (baseSetQuantity > 0) {
            coreInstance.withdrawModule(
                address(this),
                msg.sender,
                _setAddress,
                baseSetQuantity
            );
        }

        // Return base Set components
        address[] memory baseSetComponents = ISetToken(_setAddress).getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            uint256 withdrawQuantity = ERC20Wrapper.balanceOf(baseSetComponents[i], address(this));
            if (withdrawQuantity > 0) {
                ERC20Wrapper.transfer(
                    baseSetComponents[i],
                    msg.sender,
                    withdrawQuantity
                );
            }
        }         
    }
    
}
