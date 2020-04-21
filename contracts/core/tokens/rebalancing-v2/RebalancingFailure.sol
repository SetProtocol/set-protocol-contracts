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
pragma experimental "ABIEncoderV2";

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";

import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";
import { RebalancingSettlement } from "./RebalancingSettlement.sol";


/**
 * @title RebalancingFailure
 * @author Set Protocol
 *
 */
contract RebalancingFailure is 
    RebalancingSetState,
    RebalancingSettlement
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Internal Functions ============ */

    /*
     * Validations for failRebalance:
     *  - State is Rebalance
     *  - Either liquidator recognizes failure OR fail period breached on RB Set
     *
     * @param _quantity                 The amount of currentSet to be rebalanced
     */
    function validateFailRebalance()
        internal
        view
    {
        // Token must be in Rebalance State
        validateRebalanceStateIs(RebalancingLibrary.State.Rebalance);

        // Failure triggers must be met
        require(
            liquidatorBreached() || failPeriodBreached(),
            "Triggers not breached"
        );
    }

    /*
     * Determine the new Rebalance State. If there has been a bid, then we put it to 
     * Drawdown, where the Set is effectively killed. If no bids, we reissue the currentSet.
     */
    function getNewRebalanceState()
        internal
        view
        returns (RebalancingLibrary.State)
    {
        return hasBidded ? RebalancingLibrary.State.Drawdown : RebalancingLibrary.State.Default;
    }

    /*
     * Update state based on new Rebalance State.
     *
     * @param  _newRebalanceState      The new State to transition to
     */
    function transitionToNewState(
        RebalancingLibrary.State _newRebalanceState
    )
        internal
    {
        reissueSetIfRevertToDefault(_newRebalanceState);

        setWithdrawComponentsIfDrawdown(_newRebalanceState);

        rebalanceState = _newRebalanceState;
        rebalanceIndex = rebalanceIndex.add(1);
        lastRebalanceTimestamp = block.timestamp;

        nextSet = ISetToken(address(0));
        hasBidded = false;
    }

    /* ============ Private Functions ============ */

    /*
     * Returns whether the liquidator believes the rebalance has failed.
     *
     * @return        If liquidator thinks rebalance failed
     */
    function liquidatorBreached()
        private
        view
        returns (bool)
    {
        return liquidator.hasRebalanceFailed(address(this));
    }

    /*
     * Returns whether the the fail time has elapsed, which means that a period
     * of time where the auction should have succeeded has not.
     *
     * @return        If fail period has passed on Rebalancing Set Token
     */
    function failPeriodBreached()
        private
        view
        returns(bool)
    {
        uint256 rebalanceFailTime = rebalanceStartTime.add(rebalanceFailPeriod);

        return block.timestamp >= rebalanceFailTime;
    }

    /*
     * If the determination is Default State, reissue the Set.
     */
    function reissueSetIfRevertToDefault(
        RebalancingLibrary.State _newRebalanceState
    )
        private
    {
        if (_newRebalanceState ==  RebalancingLibrary.State.Default) {
            uint256 issueQuantity = calculateSetIssueQuantity(currentSet);

            // If bid not placed, reissue current Set
            core.issueInVault(
                address(currentSet),
                issueQuantity
            );
        }
    }

    /*
     * If the determination is Drawdown State, set the drawdown components which is the union of
     * the current and next Set components.
     */
    function setWithdrawComponentsIfDrawdown(
        RebalancingLibrary.State _newRebalanceState
    )
        private
    {
        if (_newRebalanceState ==  RebalancingLibrary.State.Drawdown) {
            address[] memory currentSetComponents = currentSet.getComponents();
            address[] memory nextSetComponents = nextSet.getComponents();

            failedRebalanceComponents = currentSetComponents.union(nextSetComponents);
        }
    }
}
