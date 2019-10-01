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


/**
 * @title StartRebalance
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
contract StartRebalance is 
    RebalancingSetState
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event RebalanceStarted(
        address oldSet,
        address newSet
    );

    /* ============ Internal Functions ============ */

    /**
     * Function used to validate time passed to start a rebalance
     *
     */
    function validateStartRebalance()
        internal
    {
        // Must be in "Proposal" state before going into "Rebalance" state
        require(
            rebalanceState == RebalancingLibrary.State.Proposal,
            "StartRebalance.validateStartRebalance: State must be Proposal"
        );

        // Be sure the full proposal period has elapsed
        require(
            block.timestamp >= proposalStartTime.add(proposalPeriod),
            "StartRebalance.validateStartRebalance: Proposal period not elapsed"
        );
    }

    /**
     * Calculates the maximum redemption quantity and redeems the Set into the vault.
     * Also updates startingCurrentSets state variable
     *
     * @return                      Amount of currentSets remaining
     */
    function redeemCurrentSet()
        internal
        returns (uint256)
    {
        uint256 startingCurrentSets = calculateStartingSetQuantity();

        core.redeemInVault(address(currentSet), startingCurrentSets);

        return startingCurrentSets;
    }

    function liquidatorStartRebalance(
        uint256 _startingCurrentSetQuantity
    )
        internal
    {
        liquidator.startRebalance(
            currentSet,
            nextSet,
            _startingCurrentSetQuantity
        );
    }

    function transitionToRebalance()
        internal
    {
        // Update state parameters
        rebalanceStartTime = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Rebalance;

        emit RebalanceStarted(address(currentSet), address(nextSet));
    }

    function calculateStartingSetQuantity()
        internal
        view
        returns (uint256)
    {
        // Get startingCurrentSets and make it divisible by currentSet natural unit
        uint256 currentSetBalance = vault.getOwnerBalance(address(currentSet), address(this));

        // Calculates the set's natural unit
        uint256 currentSetNaturalUnit = currentSet.naturalUnit();

        // Rounds the redemption quantity to a multiple of the current Set natural unit and sets variable
        return currentSetBalance.div(currentSetNaturalUnit).mul(currentSetNaturalUnit);
    }
}
