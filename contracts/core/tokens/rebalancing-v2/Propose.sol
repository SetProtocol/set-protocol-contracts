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

import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";


/**
 * @title Propose
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set Token V2 proposal-related functionality.
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
     * Validates inputs to propose function
     *
     * @param _nextSet                    The Set to rebalance into
     */
    function validateProposal(
        ISetToken _nextSet
    )
        internal
        view
    {
        require(
            rebalanceState == RebalancingLibrary.State.Default,
            "Propose: State must be Default"
        );

        // Enough time must have passed from last rebalance to start a new proposal
        require(
            block.timestamp >= lastRebalanceTimestamp.add(rebalanceInterval),
            "Propose: Rebalance interval not elapsed"
        );

        // New proposed Set must be a valid Set created by Core
        require(
            core.validSets(address(_nextSet)),
            "Propose: Invalid or disabled Set"
        );

        // Check proposed components on whitelist. This is to ensure managers are unable to add contract addresses
        // to a propose that prohibit the set from carrying out an auction i.e. a token that only the manager possesses
        require(
            componentWhiteList.areValidAddresses(_nextSet.getComponents()),
            "Propose: Set contains invalid component"
        );

        // Check that the proposed set natural unit is a multiple of current set natural unit, or vice versa.
        // Done to make sure that when calculating token units there will are no rounding errors.
        require(
            naturalUnitsAreValid(currentSet, _nextSet),
            "Propose: Invalid natural unit"
        );
    }

    /**
     * Cancel propose can only be called when the state is Proposal
     */
    function validateCancelProposal()
        internal
        view
    {
        require(
            rebalanceState == RebalancingLibrary.State.Proposal,
            "Cancel: State must be Proposal"
        );
    }

    /**
     * Following a valid proposal, updates the relevant state.
     *
     * @param _nextSet                    The Set to rebalance into
     */
    function transitionToProposal(
        ISetToken _nextSet
    )
        internal
    {
        rebalanceState = RebalancingLibrary.State.Proposal;
        nextSet = _nextSet;
        proposalStartTime = block.timestamp;

        emit RebalanceProposed(
            address(_nextSet),
            proposalStartTime.add(proposalPeriod)
        );
    }

    /**
     * Resets any proposal-related state. Note: it is not neccessary to reset the proposalStartTime
     */
    function revertProposal()
        internal
    {
        rebalanceState = RebalancingLibrary.State.Default;
        nextSet = ISetToken(address(0));
    }

    /* ============ Private Functions ============ */

    /**
     * Check that the proposed set natural unit is a multiple of current set natural unit, or vice versa.
     * Done to make sure that when calculating token units there will are no rounding errors.
     *
     * @param _currentSet                 The current base SetToken
     * @param _nextSet                    The proposed SetToken
     */
    function naturalUnitsAreValid(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        private
        view
        returns (bool)
    {
        uint256 currentNaturalUnit = _currentSet.naturalUnit();
        uint256 nextSetNaturalUnit = _nextSet.naturalUnit();

        return Math.max(currentNaturalUnit, nextSetNaturalUnit).mod(
            Math.min(currentNaturalUnit, nextSetNaturalUnit)
        ) == 0;
    }
}
