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
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title RebalancingTokenIssuanceModule
 * @author Set Protocol
 *
 * The CoreBidding extension exposes a bid endpoint for use in the RebalancingSetToken
 * auction process.
 */
contract RebalancingTokenIssuanceModule is
    ModuleCoreState,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    
    /* ============ Events ============ */

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

    function redeemIntoBaseComponents(
        address _rebalancingSetAddress,
        uint256 _redeemQuantity
    )
        public
        nonReentrant
    {
        // Transfer RB Set to the vault attributed to this contract
        address[] memory depositComponent = new address[](1);
        depositComponent[0] = _rebalancingSetAddress;
        uint256[] memory depositQuantity = new uint256[](1);
        depositQuantity[0] = _redeemQuantity;

        coreInstance.batchDepositModule(
            msg.sender,
            address(this),
            depositComponent,
            depositQuantity
        );

        // Redeem the RB Set into the Base Set
        coreInstance.redeemInVault(
            _rebalancingSetAddress,
            _redeemQuantity
        );

        // Get Base Set Details
        ISetToken rebalancingSet = ISetToken(_rebalancingSetAddress);
        address baseSetAddress = rebalancingSet.getComponents()[0];
        
        uint256 baseSetNaturalUnit = ISetToken(baseSetAddress).naturalUnit();
        uint256 baseSetBalance = vaultInstance.getOwnerBalance(
            baseSetAddress,
            address(this)
        );
        
        // Normalize the redeem quantity so it is a multiple of the natural unit
        uint256 baseSetRedeemQuantity = baseSetBalance.div(baseSetNaturalUnit).mul(baseSetNaturalUnit);


        coreInstance.redeemAndWithdrawTo(
            baseSetAddress,
            msg.sender,
            baseSetRedeemQuantity,
            0
        );

        // Return leftover tokens to the user
        uint256 leftoverBaseSetBalance = vaultInstance.getOwnerBalance(
            baseSetAddress,
            address(this)
        );
        if (leftoverBaseSetBalance > 0) {
            vaultInstance.withdrawTo(
                baseSetAddress,
                msg.sender,
                leftoverBaseSetBalance
            ); 
        }
    }

    
}
