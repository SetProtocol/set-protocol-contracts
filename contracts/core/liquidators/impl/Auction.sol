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
import { IOracle } from "set-protocol-oracles/contracts/meta-oracles/interfaces/IOracle.sol";

import { ICore } from "../../interfaces/ICore.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { Rebalance } from "../../lib/Rebalance.sol";
import { SetMath } from "../../lib/SetMath.sol";


/**
 * @title Auction
 * @author Set Protocol
 *
 * Contract containing utility functions for liquidators that use auctions processes. Contains
 * helper functions to value collateral SetTokens and determine parameters used in bidding
 * processes. Meant to be inherited.
 */
contract Auction {
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Structs ============ */
    struct Setup {
        uint256 maxNaturalUnit;
        uint256 minimumBid;
        uint256 startTime;
        uint256 startingCurrentSets;
        uint256 remainingCurrentSets;
        address[] combinedTokenArray;
        uint256[] combinedCurrentSetUnits;
        uint256[] combinedNextSetUnits;
    }

    /* ============ Structs ============ */
    uint256 constant private CURVE_DENOMINATOR = 10 ** 18;

    /* ============ Auction Struct Methods ============ */

    /*
     * Sets the Auction Setup struct variables.
     *
     * @param _auction                      Auction Setup object
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     * @param _startingCurrentSetQuantity   Quantity of currentSet to rebalance
     */
    function initializeAuction(
        Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        internal
    {
        _auction.maxNaturalUnit = Math.max(
            _currentSet.naturalUnit(),
            _nextSet.naturalUnit()
        );

        _auction.startingCurrentSets = _startingCurrentSetQuantity;
        _auction.remainingCurrentSets = _startingCurrentSetQuantity;
        _auction.startTime = block.timestamp;
        _auction.combinedTokenArray = getCombinedTokenArray(_currentSet, _nextSet);
        _auction.combinedCurrentSetUnits = calculateCombinedUnitArray(_auction, _currentSet);
        _auction.combinedNextSetUnits = calculateCombinedUnitArray(_auction, _nextSet);
    }

    function reduceRemainingCurrentSets(Setup storage _auction, uint256 _quantity) internal {
        _auction.remainingCurrentSets = _auction.remainingCurrentSets.sub(_quantity);
    }

    /*
     * Validate bid is a multiple of minimum bid and that amount is less than remaining.
     */
    function validateBidQuantity(Setup storage _auction, uint256 _quantity) internal view {
        require(
            _quantity.mod(_auction.minimumBid) == 0,
            "Auction.validateBidQuantity: Must bid multiple of minimum bid"
        );

        require(
            _quantity <= _auction.remainingCurrentSets,
            "Auction.validateBidQuantity: Bid exceeds remaining current sets"
        );
    }

    /*
     * Asserts whether the auction has been completed, which is when all currentSets have been
     * rebalanced.
     */
    function validateAuctionCompletion(Setup storage _auction) internal view {
        require(
            !hasBiddableQuantity(_auction),
            "Auction.settleRebalance: Rebalance not completed"
        );
    }

    /**
     * Returns whether the remainingSets is still a quantity equal or greater than the minimum bid
     */
    function hasBiddableQuantity(Setup storage _auction) internal view returns(bool) {
        return _auction.remainingCurrentSets >= _auction.minimumBid;
    }

    /**
     * Returns whether the auction is active
     */
    function isAuctionActive(Setup storage _auction) internal view returns(bool) {
        return _auction.startTime > 0;
    }

    /*
     * Calculates TokenFlows
     *
     * @param _auction              Auction Setup object
     * @param _quantity             Amount of currentSets bidder is seeking to rebalance
     * @param _price                Value representing the auction numeartor
     */
    function calculateTokenFlow(
        Setup storage _auction,
        uint256 _quantity,
        uint256 _price
    )
        internal
        view
        returns (Rebalance.TokenFlow memory)
    {
        // Normalized quantity amount
        uint256 unitsMultiplier = _quantity.div(_auction.maxNaturalUnit);

        address[] memory memCombinedTokenArray = _auction.combinedTokenArray;

        uint256 combinedTokenCount = memCombinedTokenArray.length;
        uint256[] memory inflowUnitArray = new uint256[](combinedTokenCount);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenCount);

        // Cycle through each token in combinedTokenArray, calculate inflow/outflow and store
        // result in array
        for (uint256 i = 0; i < combinedTokenCount; i++) {
            (
                inflowUnitArray[i],
                outflowUnitArray[i]
            ) = calculateInflowOutflow(
                _auction.combinedCurrentSetUnits[i],
                _auction.combinedNextSetUnits[i],
                unitsMultiplier,
                _price
            );
        }

        return Rebalance.composeTokenFlow(memCombinedTokenArray, inflowUnitArray, outflowUnitArray);
    }

    /**
     * Computes the union of the currentSet and nextSet components
     *
     * @param _currentSet               The Set to rebalance from
     * @param _nextSet                  The Set to rebalance to
     * @return                          Aggregated components array
     */
    function getCombinedTokenArray(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns(address[] memory)
    {
        address[] memory currentSetComponents = _currentSet.getComponents();
        address[] memory nextSetComponents = _nextSet.getComponents();
        return currentSetComponents.union(nextSetComponents);
    }

    /*
     * Calculates token inflow/outflow for single component in combinedTokenArray
     *
     * @param _currentUnit          Amount of token i in currentSet per minimum bid amount
     * @param _nextSetUnit          Amount of token i in nextSet per minimum bid amount
     * @param _unitsMultiplier      Bid amount normalized to number of minimum bid amounts
     * @param _price                Auction price numerator with 10 ** 18 as denominator
     * @return inflowUnit           Amount of token i transferred into the system
     * @return outflowUnit          Amount of token i transferred to the bidder
     */
    function calculateInflowOutflow(
        uint256 _currentUnit,
        uint256 _nextSetUnit,
        uint256 _unitsMultiplier,
        uint256 _price
    )
        internal
        pure
        returns (uint256, uint256)
    {
        /*
         * Below is a mathematically simplified formula for calculating token inflows and
         * outflows, the following is it's derivation:
         * token_flow = (bidQuantity/price)*(nextUnit - price*currentUnit)
         *
         * Where,
         * 1) price = (priceNumerator/priceDivisor),
         * 2) nextUnit and currentUnit are the amount of component i needed for a
         * standardAmount of sets to be rebalanced where one standardAmount =
         * max(natural unit nextSet, natural unit currentSet), and
         * 3) bidQuantity is a normalized amount in terms of the standardAmount used
         * to calculate nextUnit and currentUnit. This is represented by the unitsMultiplier
         * variable.
         *
         * Given these definitions we can derive the below formula as follows:
         * token_flow = (unitsMultiplier/(priceNumerator/priceDivisor))*
         * (nextUnit - (priceNumerator/priceDivisor)*currentUnit)
         *
         * We can then multiply this equation by (priceDivisor/priceDivisor)
         * which simplifies the above equation to:
         *
         * (unitsMultiplier/priceNumerator)* (nextUnit*priceDivisor - currentUnit*priceNumerator)
         *
         * This is the equation seen below, but since unsigned integers are used we must check to see if
         * nextUnit*priceDivisor > currentUnit*priceNumerator, otherwise those two terms must be
         * flipped in the equation.
         */
        uint256 inflowUnit;
        uint256 outflowUnit;

        // Use if statement to check if token inflow or outflow
        if (_nextSetUnit.mul(CURVE_DENOMINATOR) > _currentUnit.mul(_price)) {
            // Calculate inflow amount
            inflowUnit = _unitsMultiplier.mul(
                _nextSetUnit.mul(CURVE_DENOMINATOR).sub(_currentUnit.mul(_price))
            ).div(_price);

            // Set outflow amount to 0 for component i, since tokens need to be injected in rebalance
            outflowUnit = 0;
        } else {
            // Calculate outflow amount
            outflowUnit = _unitsMultiplier.mul(
                _currentUnit.mul(_price).sub(_nextSetUnit.mul(CURVE_DENOMINATOR))
            ).div(_price);

            // Set inflow amount to 0 for component i, since tokens need to be returned in rebalance
            inflowUnit = 0;
        }

        return (inflowUnit, outflowUnit);
    }

    /* ============ Token Array Creation Helpers ============ */

    /**
     * Create uint256 arrays that represents all components in currentSet and nextSet.
     * Calcualate unit difference between both sets relative to the largest natural
     * unit of the two sets.
     *
     * @param _auction           Auction Setup object
     * @param _set               The Set to generate units for
     * @return combinedUnits     
     */
    function calculateCombinedUnitArray(
        Setup storage _auction,
        ISetToken _set
    )
        internal
        view
        returns (uint256[] memory)
    {
        address[] memory combinedTokenArray = _auction.combinedTokenArray;
        uint256[] memory combinedUnits = new uint256[](combinedTokenArray.length);
        for (uint256 i = 0; i < combinedTokenArray.length; i++) {
            combinedUnits[i] = calculateCombinedUnit(
                _set,
                _auction.maxNaturalUnit,
                combinedTokenArray[i]
            );
        }

        return combinedUnits;
    }

    /**
     * Calculations the unit amount of Token to include in the the combined Set units.
     *
     * @param _setToken                 Information on the SetToken
     * @param _maxNaturalUnit           Max natural unit of two sets in rebalance
     * @param _component                Current component in iteration
     * @return                          Unit inflow/outflow
     */
    function calculateCombinedUnit(
        ISetToken _setToken,
        uint256 _maxNaturalUnit,
        address _component
    )
        private
        view
        returns (uint256)
    {
        // Check if component in arrays and get index if it is
        (
            uint256 indexCurrent, 
            bool isComponent
        ) = _setToken.getComponents().indexOf(_component);

        // Compute unit amounts of token in Set
        if (isComponent) {
            return calculateTransferValue(
                _setToken.getUnits()[indexCurrent],
                _setToken.naturalUnit(),
                _maxNaturalUnit
            );
        }

        return 0;
    }

   /**
     * Function to calculate the transfer value of a component given a standardized bid amount
     * (minimumBid/priceDivisor)
     *
     * @param   _unit               Units of the component token
     * @param   _naturalUnit        Natural unit of the Set token
     * @param   _maxNaturalUnit     Max natural unit of two sets in rebalance
     * @return  uint256             Amount of tokens per standard bid amount (minimumBid/priceDivisor)
     */
    function calculateTransferValue(
        uint256 _unit,
        uint256 _naturalUnit,
        uint256 _maxNaturalUnit
    )
        private
        pure
        returns (uint256)
    {
        return SetMath.setToComponent(_maxNaturalUnit, _unit, _naturalUnit);
    }
}