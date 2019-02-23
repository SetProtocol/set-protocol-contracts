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

pragma solidity 0.5.4;
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
 * @title StandardStartRebalanceLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token startRebalance function
 */


library StandardStartRebalanceLibrary {
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Structs ============ */
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
     * @param _currentSet           Address of current Set
     * @param _nextSet              Address of next Set
     * @param _auctionLibrary       Address of auction library being used in rebalance
     * @param _coreAddress          Core address
     * @param _vaultAddress         Vault address
     * @param _proposalStartTime    Start time of proposal period
     * @param _proposalPeriod       Required length of proposal period
     * @param _rebalanceState       State rebalancing set token is in
     * @return                      Struct containing bidding parameters
     */
    function startRebalance(
        address _currentSet,
        address _nextSet,
        address _auctionLibrary,
        address _coreAddress,
        address _vaultAddress,
        uint256 _proposalStartTime,
        uint256 _proposalPeriod,
        uint8 _rebalanceState
    )
        public
        returns (BiddingParameters memory)
    {
        // Must be in "Proposal" state before going into "Rebalance" state
        require(
            _rebalanceState == uint8(RebalancingHelperLibrary.State.Proposal),
            "RebalancingSetToken.startRebalance: State must be Proposal"
        );

        // Be sure the full proposal period has elapsed
        require(
            block.timestamp >= _proposalStartTime.add(_proposalPeriod),
            "RebalancingSetToken.startRebalance: Proposal period not elapsed"
        );

        // Create combined array data structures and calculate minimum bid needed for auction
        BiddingParameters memory biddingParameters = setUpBiddingParameters(
            _currentSet,
            _nextSet,
            _auctionLibrary
        );

        // Redeem rounded quantity of current Sets and return redeemed amount of Sets
        biddingParameters.remainingCurrentSets = redeemCurrentSet(
            _currentSet,
            _coreAddress,
            _vaultAddress
        );

        // Require remainingCurrentSets to be greater than minimumBid otherwise no bidding would
        // be allowed
        require(
            biddingParameters.remainingCurrentSets >= biddingParameters.minimumBid,
            "RebalancingSetToken.startRebalance: Not enough collateral to rebalance"
        );

        return biddingParameters;
    }

    /**
     * Create struct that holds array representing all components in currentSet and nextSet.
     * Calcualate unit difference between both sets relative to the largest natural
     * unit of the two sets. Calculate minimumBid.
     *
     * @param _currentSet           Address of current Set
     * @param _nextSet              Address of next Set
     * @param _auctionLibrary       Address of auction library being used in rebalance
     * @return                      Struct containing bidding parameters
     */
    function setUpBiddingParameters(
        address _currentSet,
        address _nextSet,
        address _auctionLibrary
    )
        public
        view
        returns (BiddingParameters memory)
    {
        // Get set details for currentSet and nextSet (units, components, natural units)
        SetsDetails memory setsDetails = getUnderlyingSetsDetails(
            _currentSet,
            _nextSet
        );

        // Create combinedTokenArray
        address[] memory combinedTokenArray = setsDetails.currentSetComponents.union(
            setsDetails.nextSetComponents
        );

        // Calcualate minimumBid
        uint256 minimumBid = calculateMinimumBid(
            setsDetails.currentSetNaturalUnit,
            setsDetails.nextSetNaturalUnit,
            _auctionLibrary
        );

        // Create memory version of combinedNextSetUnits and combinedCurrentUnits to only make one
        // call to storage once arrays have been created
        uint256[] memory combinedCurrentUnits;
        uint256[] memory combinedNextSetUnits;
        (
            combinedCurrentUnits,
            combinedNextSetUnits
        ) = calculateCombinedUnitArrays(
            setsDetails,
            minimumBid,
            _auctionLibrary,
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
     * @param _currentSet    Address of currentSet
     * @param _nextSet       Address of nextSet
     * @return               Struct that holds set details for currentSet and nextSet
     */
    function getUnderlyingSetsDetails(
        address _currentSet,
        address _nextSet
    )
        public
        view
        returns (SetsDetails memory)
    {
        // Create set token interfaces
        ISetToken currentSetInstance = ISetToken(_currentSet);
        ISetToken nextSetInstance = ISetToken(_nextSet);

        return SetsDetails({
            currentSetNaturalUnit: currentSetInstance.naturalUnit(),
            nextSetNaturalUnit: nextSetInstance.naturalUnit(),
            currentSetUnits: currentSetInstance.getUnits(),
            nextSetUnits: nextSetInstance.getUnits(),
            currentSetComponents: currentSetInstance.getComponents(),
            nextSetComponents: nextSetInstance.getComponents()
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
        public
        view
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
        SetsDetails memory _setsDetails,
        uint256 _minimumBid,
        address _auctionLibrary,
        address[] memory _combinedTokenArray
    )
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        // Create memory version of combinedNextSetUnits and combinedCurrentUnits to only make one
        // call to storage once arrays have been created
        uint256[] memory memoryCombinedCurrentUnits = new uint256[](_combinedTokenArray.length);
        uint256[] memory memoryCombinedNextSetUnits = new uint256[](_combinedTokenArray.length);

        for (uint256 i = 0; i < _combinedTokenArray.length; i++) {
            // Check if component in arrays and get index if it is
            uint256 indexCurrent;
            bool isInCurrent;
            (indexCurrent, isInCurrent) = _setsDetails.currentSetComponents.indexOf(_combinedTokenArray[i]);

            uint256 indexRebalance;
            bool isInNext;
            (indexRebalance, isInNext) = _setsDetails.nextSetComponents.indexOf(_combinedTokenArray[i]);

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
     * @param _currentSet           Address of current Set
     * @param _coreAddress          Core address
     * @param _vaultAddress         Vault address
     * @return                      Amount of currentSets remaining
     */
    function redeemCurrentSet(
        address _currentSet,
        address _coreAddress,
        address _vaultAddress
    )
        public
        returns (uint256)
    {
        // Get remainingCurrentSets and make it divisible by currentSet natural unit
        uint256 currentSetBalance = IVault(_vaultAddress).getOwnerBalance(
            _currentSet,
            this
        );

        // Calculates the set's natural unit
        uint256 currentSetNaturalUnit = ISetToken(_currentSet).naturalUnit();

        // Rounds the redemption quantity to a multiple of the current Set natural unit and sets variable
        uint256 remainingCurrentSets = currentSetBalance.div(currentSetNaturalUnit).mul(currentSetNaturalUnit);

        ICore(_coreAddress).redeemInVault(
            _currentSet,
            remainingCurrentSets
        );

        return remainingCurrentSets;
    }
}
