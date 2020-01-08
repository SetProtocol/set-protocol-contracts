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

import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";


/**
 * @title RebalancingStart
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set Token V2 start rebalance functionality
 */
contract RebalancingStart is 
    ERC20,
    RebalancingSetState
{
    using SafeMath for uint256;

    /* ============ Internal Functions ============ */

    /**
     * Validate that start rebalance can be called:
     *  - Current state is Default
     *  - rebalanceInterval has elapsed
     *  - Proposed set is valid in Core
     *  - Components in set are all valid
     *  - NaturalUnits are multiples of each other
     *
     * @param _nextSet                    The Set to rebalance into
     */
    function validateStartRebalance(
        ISetToken _nextSet
    )
        internal
        view
    {
        validateRebalanceStateIs(RebalancingLibrary.State.Default);

        // Enough time must have passed from last rebalance to start a new proposal
        require(
            block.timestamp >= lastRebalanceTimestamp.add(rebalanceInterval),
            "Interval not elapsed"
        );

        // Must be a positive supply of the Set
        require(
            totalSupply() > 0,
            "Invalid supply"
        );

        // New proposed Set must be a valid Set created by Core
        require(
            core.validSets(address(_nextSet)),
            "Invalid Set"
        );

        // Check proposed components on whitelist. This is to ensure managers are unable to add contract addresses
        // to a propose that prohibit the set from carrying out an auction i.e. a token that only the manager possesses
        require(
            componentWhiteList.areValidAddresses(_nextSet.getComponents()),
            "Invalid component"
        );

        // Check that the proposed set natural unit is a multiple of current set natural unit, or vice versa.
        // Done to make sure that when calculating token units there will are be rounding errors.
        require(
            naturalUnitsAreValid(currentSet, _nextSet),
            "Invalid natural unit"
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
        uint256 currentSetBalance = vault.getOwnerBalance(address(currentSet), address(this));
        uint256 currentSetNaturalUnit = currentSet.naturalUnit();

        // Rounds the redemption quantity to a multiple of the current Set natural unit
        return currentSetBalance.sub(currentSetBalance.mod(currentSetNaturalUnit));
    }

    /**
     * Signals to the Liquidator to initiate the rebalance.
     *
     * @param _nextSet                         Next set instance
     * @param _startingCurrentSetQuantity      Amount of currentSets the rebalance is initiated with
     * @param _liquidatorData                  Bytecode formatted data with liquidator-specific arguments
     */
    function liquidatorRebalancingStart(
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        bytes memory _liquidatorData
    )
        internal
    {
        liquidator.startRebalance(
            currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            _liquidatorData       
        );
    }

    /**
     * Updates rebalance-related state parameters.
     *
     * @param _nextSet                    The Set to rebalance into
     */
    function transitionToRebalance(ISetToken _nextSet) internal {
        nextSet = _nextSet;
        rebalanceState = RebalancingLibrary.State.Rebalance;
        rebalanceStartTime = block.timestamp;
    }

    /* ============ Private Functions ============ */

    /**
     * Check that the proposed set natural unit is a multiple of current set natural unit, or vice versa.
     * Done to make sure that when calculating token units there will be no rounding errors.
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
