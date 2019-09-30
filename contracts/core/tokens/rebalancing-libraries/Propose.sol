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
import { RebalancingLifecycleLibrary } from "./RebalancingLifecycleLibrary.sol";

/**
 * @title Propose
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
contract Propose is 
    RebalancingSetState
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event RebalanceProposed(
        address nextSet,
        uint256 indexed proposalPeriodEndTime
    );

    /* ============ Internal Functions ============ */

    /**
     * Function used to validate inputs to propose function
     *
     * @param _nextSet                    The Set to rebalance into
     */
    function validateProposal(
        ISetToken _nextSet
    )
        public
    {
        // Make sure it is manager that is proposing the rebalance
        require(
            msg.sender == manager,
            "Propose.validateProposal: Sender must be manager"
        );

        // New Proposal can only be made in Default and Proposal state
        require(
            rebalanceState == RebalancingLibrary.State.Default ||
            rebalanceState == RebalancingLibrary.State.Proposal,
            "Propose.validateProposal: State must be in Propose or Default"
        );

        // Make sure enough time has passed from last rebalance to start a new proposal
        require(
            block.timestamp >= lastRebalanceTimestamp.add(rebalanceInterval),
            "Propose.validateProposal: Rebalance interval not elapsed"
        );

        // Check that new proposed Set is valid Set created by Core
        require(
            core.validSets(address(_nextSet)),
            "Propose.validateProposal: Invalid or disabled proposed SetToken address"
        );

        // Check proposed components on whitelist. This is to ensure managers are unable to add contract addresses
        // to a propose that prohibit the set from carrying out an auction i.e. a token that only the manager possesses
        require(
            componentWhiteList.areValidAddresses(_nextSet.getComponents()),
            "Propose.validateProposal: Proposed set contains invalid component token"
        );

        // Check that the proposed set natural unit is a multiple of current set natural unit, or vice versa.
        // Done to make sure that when calculating token units there will are no rounding errors.
        uint256 currentNaturalUnit = currentSet.naturalUnit();
        uint256 nextSetNaturalUnit = _nextSet.naturalUnit();
        require(
            Math.max(currentNaturalUnit, nextSetNaturalUnit).mod(
                Math.min(currentNaturalUnit, nextSetNaturalUnit)
            ) == 0,
            "Propose.validateProposal: Invalid proposed Set natural unit"
        );
    }

    function liquidatorValidateProposal(
        ISetToken _nextSet
    )
        internal
    {
        uint256 currentSetQuantity = RebalancingLifecycleLibrary.calculateStartingSetQuantity(
            vault,
            currentSet
        );

        liquidator.validatePropose(currentSet, _nextSet, currentSetQuantity);
    }

    function transitionToProposal(
        ISetToken _nextSet
    )
        internal
    {
        // Update state parameters
        nextSet = _nextSet;
        proposalStartTime = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Proposal;

        emit RebalanceProposed(
            address(_nextSet),
            proposalStartTime.add(proposalPeriod)
        );
    }
}
