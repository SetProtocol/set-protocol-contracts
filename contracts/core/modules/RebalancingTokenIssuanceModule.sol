/*
    Copyright 2018 Set Labs Inc.

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

pragma solidity 0.4.25;

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ICore } from "../interfaces/ICore.sol";
import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { IVault } from "../interfaces/IVault.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title RebalancingTokenIssuanceModule
 * @author Set Protocol
 *
 * A module that includes a convenience function for redeeming a rebalancing set into components efficiently.
 */
contract RebalancingTokenIssuanceModule is
    ModuleCoreState,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ Constructor ============ */

    /**
     * Constructor function for ExchangeIssueModule
     *
     * @param _core                The address of Core
     * @param _transferProxy       The address of transferProxy
     * @param _vault               The address of Vault
     */
    constructor(
        address _core,
        address _transferProxy,
        address _vault
    )
        public
        ModuleCoreState(
            _core,
            _transferProxy,
            _vault
        )
    {}

    /* ============ Public Functions ============ */

    /**
     * Redeems a Rebalancing Set into the base components of the Base Set.
     *
     * @param  _rebalancingSetAddress    Address of the rebalancing Set to redeem
     * @param  _redeemQuantity           The Quantity of the rebalancing Set to redeem
     * @param  _toExclude                Mask of indexes of tokens to exclude from withdrawing
     */
    function redeemRebalancingSetIntoBaseComponents(
        address _rebalancingSetAddress,
        uint256 _redeemQuantity,
        uint256 _toExclude
    )
        public
        nonReentrant
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

        // Redeem Base Set and send components to the the user
        coreInstance.redeemAndWithdrawTo(
            baseSetAddress,
            msg.sender,
            baseSetRedeemQuantity,
            _toExclude
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
        private
        returns (uint256)
    {
        // Get Base Set Details from the rebalancing Set
        uint256 baseSetNaturalUnit = IRebalancingSetToken(_baseSetAddress).naturalUnit();
        uint256 baseSetBalance = vaultInstance.getOwnerBalance(
            _baseSetAddress,
            address(this)
        );

        require(
            baseSetBalance % baseSetNaturalUnit == 0,
            "RebalancingTokenIssuanceModule.getBaseSetRedeemQuantity: Base Redemption must be multiple of natural unit"
        );
        
        return baseSetBalance;
    }
}
