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

import { AddressArrayUtils } from "../../../lib/AddressArrayUtils.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";
import { SettleRebalance } from "./SettleRebalance.sol";


/**
 * @title FailRebalance
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
contract FailRebalance is 
    RebalancingSetState,
    SettleRebalance
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Internal Functions ============ */

    /*
     * 
     *
     */
    function validateFailRebalance()
        internal
    {
        // Token must be in Rebalance State
        require(
            rebalanceState ==  RebalancingLibrary.State.Rebalance,
            "FailRebalance: Rebalancing Set Token must be in Rebalance State"
        );

        bool triggersBreached = failTriggersBreached();
        require(
            failTriggersBreached(),
            "FailRebalance: Fail triggers have not been breached"
        );
    }

    function handleFailedRebalance()
        internal
    {
        // Fail auction and either reset to Default state or kill Rebalancing Set Token and enter Drawdown
        // state
        RebalancingLibrary.State newRebalanceState = getNewRebalanceState();

        reissueSetIfRevertToDefault(newRebalanceState);

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

    function getNewRebalanceState()
        internal
        returns (RebalancingLibrary.State)
    {
        return hasBidded ? RebalancingLibrary.State.Drawdown : RebalancingLibrary.State.Default;
    }

    function reissueSetIfRevertToDefault(
        RebalancingLibrary.State _newRebalanceState
    )
        internal
    {
        if (_newRebalanceState ==  RebalancingLibrary.State.Default) {
            (uint256 issueQuantity, ) = calculateNextSetIssueQuantity();

            // If bid not placed, reissue current Set
            core.issueInVault(
                address(currentSet),
                issueQuantity
            );
        }
    }

    function setWithdrawComponentsIfDrawdown(
        RebalancingLibrary.State _newRebalanceState
    )
        internal
    {
        if (_newRebalanceState ==  RebalancingLibrary.State.Drawdown) {
            address[] memory currentSetComponents = currentSet.getComponents();
            address[] memory nextSetComponents = nextSet.getComponents();

            failedRebalanceComponents = currentSetComponents.union(nextSetComponents);
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
        rebalanceIndex = rebalanceIndex.add(1);
    }
}
