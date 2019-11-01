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
 * @title StartRebalance
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set Token V2 start rebalance functionality
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
     * Validate that start rebalance can be called
     */
    function validateStartRebalance()
        internal
    {
        // Must be in "Proposal" state
        require(
            rebalanceState == RebalancingLibrary.State.Proposal,
            "Start: State must be Proposal"
        );

        // The full proposal period must have elapsed
        require(
            block.timestamp >= proposalStartTime.add(proposalPeriod),
            "Start: Proposal period not elapsed"
        );
    }

    /**
     * Calculates the maximum quantity of the currentSet that can be redeemed. This is defined
     * by how many naturalUnits worth of the Set there are.
     *
     * @return   Maximum quantity of the current Set that can be redeemed
     */
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

    /**
     * Redeems the current SetToken into the vault.
     *
     * @param _startingCurrentSetQuantity      Amount of currentSets the rebalance is initiated with
     */
    function redeemCurrentSet(
        uint256 _startingCurrentSetQuantity
    )
        internal
    {
        core.redeemInVault(address(currentSet), _startingCurrentSetQuantity);
    }

    /**
     * Signals to the Liquidator to initiate the rebalance.
     *
     * @param _startingCurrentSetQuantity      Amount of currentSets the rebalance is initiated with
     */
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

    /**
     * Updates rebalance-related state parameters.
     */
    function transitionToRebalance()
        internal
    {
        rebalanceState = RebalancingLibrary.State.Rebalance;
        rebalanceStartTime = block.timestamp;

        emit RebalanceStarted(address(currentSet), address(nextSet));
    }
}
