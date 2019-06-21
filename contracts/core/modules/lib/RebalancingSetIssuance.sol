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

    function returnExcessBaseSet(
        address _baseSetAddress,
        bool _keepChangeInVault
    )
        internal
    {
        // Return base Set if any that are in the Vault
        uint256 baseSetQuantity = vaultInstance.getOwnerBalance(_baseSetAddress, address(this));
        
        if (baseSetQuantity == 0) {
            return;
        }

        if (_keepChangeInVault) {
            // Transfer ownership within the vault to the user
            coreInstance.internalTransfer(
                _baseSetAddress,
                msg.sender,
                baseSetQuantity
            );
        } else {
            coreInstance.withdrawModule(
                address(this),
                msg.sender,
                _baseSetAddress,
                baseSetQuantity
            );
        }
    }    
}
