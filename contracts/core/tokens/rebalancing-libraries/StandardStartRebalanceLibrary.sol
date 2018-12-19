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
pragma experimental "ABIEncoderV2";

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { AddressArrayUtils } from "../../../lib/AddressArrayUtils.sol";
import { IAuctionPriceCurve } from "../../lib/auction-price-libraries/IAuctionPriceCurve.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IVault } from "../../interfaces/IVault.sol";
import { RebalancingHelperLibrary } from "../../lib/RebalancingHelperLibrary.sol";

/**
 * @title StandardProposeLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token startRebalance function
 */


library StandardStartRebalanceLibrary {
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Structs ============ */
    struct StartRebalanceParameters {
        address currentSet;
        address nextSet;
        address auctionLibrary;
        uint256 proposalStartTime;
        uint256 proposalPeriod;
        ICore coreInstance;
        IVault vaultInstance;
        RebalancingHelperLibrary.State rebalanceState;
    }

    struct BiddingParameters {
        uint256 minimumBid;
        uint256 remainingCurrentSets;
        uint256[] combinedCurrentUnits;
        uint256[] combinedNextSetUnits;
        address[] combinedTokenArray;
    }

    struct SetsDetails {
        uint256 currentSetNaturalUnit;
        uint256 nextSetNaturalUnit;
        uint256[] currentSetUnits;
        uint256[] nextSetUnits;
        address[] currentSetComponents;
        address[] nextSetComponents;
    }

    /* ============ Internal Functions ============ */

    /**
     * Function used to validate inputs to propose function and initialize biddingParameters struct
     *
     * @param _startRebalanceParameters            Rebalancing Set Token state parameters needed to execute logic
     * @return                                     Struct containing bidding parameters
     */
    function startRebalance(
        StartRebalanceParameters memory _startRebalanceParameters
    )
        internal
        returns (BiddingParameters)
    {
        // Must be in "Proposal" state before going into "Rebalance" state
        require(
            _startRebalanceParameters.rebalanceState == RebalancingHelperLibrary.State.Proposal,
            "RebalancingSetToken.rebalance: State must be Proposal"
        );

        // Be sure the full proposal period has elapsed
        require(
            block.timestamp >= _startRebalanceParameters.proposalStartTime.add(
                _startRebalanceParameters.proposalPeriod
            ),
            "RebalancingSetToken.rebalance: Proposal period not elapsed"
        );

        // Create combined array data structures and calculate minimum bid needed for auction
        BiddingParameters memory biddingParameters = setUpBiddingParameters(_startRebalanceParameters);
        
        // Redeem rounded quantity of current Sets and update
        biddingParameters.remainingCurrentSets = redeemCurrentSet(_startRebalanceParameters);

        return biddingParameters;
    }

    /**
     * Create struct that holds array representing all components in currentSet and nextSet.
     * Calcualate unit difference between both sets relative to the largest natural
     * unit of the two sets. Calculate minimumBid. 
     *
     * @param _startRebalanceParameters            Rebalancing Set Token state parameters needed to execute logic
     * @return                                     Struct containing bidding parameters
     */
    function setUpBiddingParameters(
        StartRebalanceParameters memory _startRebalanceParameters
    )
        internal
        returns (BiddingParameters)
    {
        // Get set details for currentSet and nextSet (units, components, natural units)
        SetsDetails memory setsDetails = getUnderlyingSetsDetails(
            _startRebalanceParameters.currentSet,
            _startRebalanceParameters.nextSet
        );

        // Create combinedTokenArray
        address[] memory combinedTokenArray = setsDetails.currentSetComponents.union(
            setsDetails.nextSetComponents
        );

        // Calcualate minimumBid
        uint256 minimumBid = calculateMinimumBid(
            setsDetails.currentSetNaturalUnit,
            setsDetails.nextSetNaturalUnit,
            _startRebalanceParameters.auctionLibrary
        );

        // Create memory version of combinedNextSetUnits and combinedCurrentUnits to only make one
        // call to storage once arrays have been created
        (
            uint256[] memory combinedCurrentUnits,
            uint256[] memory combinedNextSetUnits
        ) = calculateCombinedUnitArrays(
            setsDetails,
            minimumBid,
            _startRebalanceParameters.auctionLibrary,
            combinedTokenArray
        );

        // Build Bidding Parameters struct and return
        return BiddingParameters({
            minimumBid: minimumBid,
            remainingCurrentSets: 0,
            combinedCurrentUnits: combinedCurrentUnits,
            combinedNextSetUnits: combinedNextSetUnits,
            combinedTokenArray: combinedTokenArray
        });
    }

    /**
     * Create struct that holds set details for currentSet and nextSet (units, components, natural units).
     *
     * @param _currentSetAddress    Address of currentSet
     * @param _nextSetAddress       Address of nextSet
     * @return                      Struct that holds set details for currentSet and nextSet
     */
    function getUnderlyingSetsDetails(
        address _currentSetAddress,
        address _nextSetAddress
    )
        internal
        returns (SetsDetails)
    {
        // Create set token interfaces
        ISetToken currentSetInstance = ISetToken(_currentSetAddress);
        ISetToken nextSetInstance = ISetToken(_nextSetAddress);

        // Get units arrays for both sets
        uint256[] memory currentSetUnits = currentSetInstance.getUnits();
        uint256[] memory nextSetUnits = nextSetInstance.getUnits();

        // Get component arrays for both sets
        address[] memory currentSetComponents = currentSetInstance.getComponents();
        address[] memory nextSetComponents = nextSetInstance.getComponents();

        // Get naturalUnit of both sets
        uint256 currentSetNaturalUnit = currentSetInstance.naturalUnit();
        uint256 nextSetNaturalUnit = nextSetInstance.naturalUnit();

        return SetsDetails({
            currentSetNaturalUnit: currentSetNaturalUnit,
            nextSetNaturalUnit: nextSetNaturalUnit,
            currentSetUnits: currentSetUnits,
            nextSetUnits: nextSetUnits,
            currentSetComponents: currentSetComponents,
            nextSetComponents: nextSetComponents
        });
    }

    /**
     * Calculate the minimumBid allowed for the rebalance
     *
     * @param _currentSetNaturalUnit    Natural unit of currentSet
     * @param _nextSetNaturalUnit       Natural of nextSet
     * @param _auctionLibrary           Address of auction library being used in rebalance
     * @return                          Minimum bid amount
     */
    function calculateMinimumBid(
        uint256 _currentSetNaturalUnit,
        uint256 _nextSetNaturalUnit,
        address _auctionLibrary
    )
        internal
        returns (uint256)
    {
        // Get priceDivisor from auctionLibrary
        uint256 priceDivisor = IAuctionPriceCurve(_auctionLibrary).priceDenominator();

        return Math.max(
            _currentSetNaturalUnit.mul(priceDivisor),
            _nextSetNaturalUnit.mul(priceDivisor)
        );
    }

    /**
     * Create arrays that represents all components in currentSet and nextSet.
     * Calcualate unit difference between both sets relative to the largest natural
     * unit of the two sets.
     *
     * @param _setsDetails              Information on currentSet and nextSet
     * @param _minimumBid               Minimum bid amount
     * @param _auctionLibrary           Address of auction library being used in rebalance
     * @param _combinedTokenArray       Array of component tokens involved in rebalance
     * @return                          Unit inflow/outflow arrays for current and next Set
     */
    function calculateCombinedUnitArrays(
        SetsDetails _setsDetails,
        uint256 _minimumBid,
        address _auctionLibrary,
        address[] _combinedTokenArray
    )
        internal
        returns (uint256[], uint256[])
    {
        // Create memory version of combinedNextSetUnits and combinedCurrentUnits to only make one
        // call to storage once arrays have been created
        uint256[] memory memoryCombinedCurrentUnits = new uint256[](_combinedTokenArray.length);
        uint256[] memory memoryCombinedNextSetUnits = new uint256[](_combinedTokenArray.length);

        for (uint256 i = 0; i < _combinedTokenArray.length; i++) {
            // Check if component in arrays and get index if it is
            (uint256 indexCurrent, bool isInCurrent) = _setsDetails.currentSetComponents.indexOf(_combinedTokenArray[i]);
            (uint256 indexRebalance, bool isInNext) = _setsDetails.nextSetComponents.indexOf(_combinedTokenArray[i]);

            // Compute and push unit amounts of token in currentSet
            if (isInCurrent) {
                memoryCombinedCurrentUnits[i] = RebalancingHelperLibrary.computeTransferValue(
                    _setsDetails.currentSetUnits[indexCurrent],
                    _setsDetails.currentSetNaturalUnit,
                    _minimumBid,
                    _auctionLibrary
                );
            }

            // Compute and push unit amounts of token in nextSet
            if (isInNext) {
                memoryCombinedNextSetUnits[i] = RebalancingHelperLibrary.computeTransferValue(
                    _setsDetails.nextSetUnits[indexRebalance],
                    _setsDetails.nextSetNaturalUnit,
                    _minimumBid,
                    _auctionLibrary
                );
            }
        }

        return (memoryCombinedCurrentUnits, memoryCombinedNextSetUnits);
    }

    /**
     * Calculates the maximum redemption quantity and redeems the Set into the vault.
     * Also updates remainingCurrentSets state variable
     *
     * @param _startRebalanceParameters         Rebalancing Set Token state parameters needed to execute logic
     * @return                                  Amount of currentSets remaining
     */
    function redeemCurrentSet(
        StartRebalanceParameters memory _startRebalanceParameters
    )
        internal
        returns (uint256)
    {
        // Get remainingCurrentSets and make it divisible by currentSet natural unit
        uint256 currentSetBalance = _startRebalanceParameters.vaultInstance.getOwnerBalance(
            _startRebalanceParameters.currentSet,
            this
        );

        // Calculates the set's natural unit
        uint256 currentSetNaturalUnit = ISetToken(_startRebalanceParameters.currentSet).naturalUnit();

        // Rounds the redemption quantity to a multiple of the current Set natural unit and sets variable
        uint256 remainingCurrentSets = currentSetBalance.div(currentSetNaturalUnit).mul(currentSetNaturalUnit);

        _startRebalanceParameters.coreInstance.redeemInVault(
            _startRebalanceParameters.currentSet,
            remainingCurrentSets
        );

        return remainingCurrentSets;
    }
}