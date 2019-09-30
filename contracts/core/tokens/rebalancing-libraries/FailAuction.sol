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

pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";
import { SettleRebalance } from "./SettleRebalance.sol";


/**
 * @title FailAuction
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
contract FailAuction is 
    RebalancingSetState,
    SettleRebalance
{
    using SafeMath for uint256;

    /* ============ Internal Functions ============ */

    /*
     * 
     *
     */
    function validateFailRebalance()
        internal
        view
    {
        // Token must be in Rebalance State
        require(
            rebalanceState ==  RebalancingLibrary.State.Rebalance,
            "RebalanceAuctionModule.endFailedAuction: Rebalancing Set Token must be in Rebalance State"
        );
    }

    function handleFailedRebalance()
        internal
    {
        bool triggersBreached = failTriggersBreached();

        (
            uint256 issueAmount,
            uint256 calculatedUnitShares
        ) = calculateNextSetIssueQuantity();

        // Fail auction and either reset to Default state or kill Rebalancing Set Token and enter Drawdown
        // state
        RebalancingLibrary.State newRebalanceState = getNewRebalanceState(
            triggersBreached,
            calculatedUnitShares
        );

        reissueSetIfRevertToDefault(newRebalanceState, issueAmount);

        setWithdrawComponentsIfDrawdown(newRebalanceState);

        transitionToNewState(newRebalanceState);
    }

    function failTriggersBreached()
        internal
        returns(bool)
    {
        return liquidatorTriggersBreached() || failPeriodBreached();
    }

    function liquidatorTriggersBreached()
        internal
        returns (bool)
    {
        bool hasFailed = liquidator.endFailedRebalance();

        return hasFailed;
    }

    function failPeriodBreached()
        internal
        view
        returns(bool)
    {
        // Calculate timestamp when pivot is reached
        uint256 rebalanceFailTime = rebalanceStartTime.add(rebalanceFailPeriod);

        return block.timestamp >= rebalanceFailTime;
    }



    function getNewRebalanceState(
        bool _auctionFailed,
        uint256 _calculatedUnitShares
    )
        internal
        returns (RebalancingLibrary.State)
    {
        RebalancingLibrary.State newRebalanceState;
        /**
         * If not enough sets have been bid on then allow auction to fail where no bids being registered
         * returns the rebalancing set token to pre-auction state and some bids being registered puts the
         * rebalancing set token in Drawdown mode.
         *
         * However, if enough sets have been bid on. Then allow auction to fail and enter Drawdown state if
         * and only if the calculated post-auction unitShares is equal to 0.
         */
        if (_auctionFailed) {
            newRebalanceState = hasBidded ? RebalancingLibrary.State.Drawdown : RebalancingLibrary.State.Default;
        } else {
            // If settleRebalance can be called then endFailedAuction can't be unless calculatedUnitShares
            // equals 0
            require(
                _calculatedUnitShares == 0,
                "RebalancingSetToken.endFailedAuction: Cannot be called if rebalance is viably completed"
            );

            // If calculated unitShares equals 0 set to Drawdown state
            newRebalanceState = RebalancingLibrary.State.Drawdown;
        }

        return newRebalanceState;
    }

    function reissueSetIfRevertToDefault(
        RebalancingLibrary.State _newRebalanceState,
        uint256 _issueQuantity
    )
        internal
    {
        if (_newRebalanceState ==  RebalancingLibrary.State.Default) {
            // If bid not placed, reissue current Set
            core.issueInVault(
                address(currentSet),
                _issueQuantity
            );
        }
    }

    function setWithdrawComponentsIfDrawdown(
        RebalancingLibrary.State _newRebalanceState
    )
        internal
    {
        if (_newRebalanceState ==  RebalancingLibrary.State.Drawdown) {
            // TODO: Set drawdown components and calculate it
            // Save combined token arrays to failedAuctionWithdrawComponents
            // failedAuctionWithdrawComponents = [];
        }
    }

    function transitionToNewState(
        RebalancingLibrary.State _newRebalanceState
    )
        internal
    {
        rebalanceState = _newRebalanceState;

        // Reset lastRebalanceTimestamp to now
        lastRebalanceTimestamp = block.timestamp;

        nextSet = ISetToken(address(0));
        hasBidded = false;
    }
}
