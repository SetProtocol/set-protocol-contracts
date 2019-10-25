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

import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { IOracle } from "set-protocol-strategies/contracts/meta-oracles/interfaces/IOracle.sol";

import { AddressArrayUtils } from "../../../lib/AddressArrayUtils.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";


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
        uint256 minimumBid;
        uint256 startTime;
        uint256 startingCurrentSets;
        uint256 remainingCurrentSets;
        address[] combinedTokenArray;
        uint256[] combinedCurrentSetUnits;
        uint256[] combinedNextSetUnits;
    }

    /* ============ State Variables ============ */
    uint256 public pricePrecision;

    /**
     * Auction constructor
     *
     * @param _pricePrecision               Price precision used in auctions
     */
    constructor(uint256 _pricePrecision) public {
        pricePrecision = _pricePrecision;
    }

    function initializeAuction(
        Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        internal
    {
        uint256 minimumBid = calculateMinimumBid(_currentSet, _nextSet);
        
        // Require remainingCurrentSets to be greater than minimumBid otherwise no bidding would
        // be allowed
        require(
            _startingCurrentSetQuantity >= minimumBid,
            "Auction.initializeAuction: Not enough collateral to rebalance"
        );

        _auction.minimumBid = minimumBid;
        _auction.startingCurrentSets = _startingCurrentSetQuantity;
        _auction.remainingCurrentSets = _startingCurrentSetQuantity;
        _auction.startTime = block.timestamp;
        _auction.combinedTokenArray = getCombinedTokenArray(_currentSet, _nextSet);

        (
            uint256[] memory combinedCurrentSetUnits,
            uint256[] memory combinedNextSetUnits
        ) = calculateCombinedUnitArrays(_auction, _currentSet, _nextSet);
        _auction.combinedCurrentSetUnits = combinedCurrentSetUnits;
        _auction.combinedNextSetUnits = combinedNextSetUnits;
    }

    function reduceRemainingCurrentSets(
        Setup storage _auction,
        uint256 _quantity
    )
        internal
    {
        _auction.remainingCurrentSets = _auction.remainingCurrentSets.sub(_quantity);
    }

    /**
     * Calculate the minimumBid allowed for the rebalance
     *
     * @return                          Minimum bid amount
     */
    function calculateMinimumBid(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256)
    {
        uint256 currentSetNaturalUnit = _currentSet.naturalUnit();
        uint256 nextNaturalUnit = _nextSet.naturalUnit();
        
        return Math.max(
            currentSetNaturalUnit.mul(pricePrecision),
            nextNaturalUnit.mul(pricePrecision)
        );
    }

    /*
     * Validate bid quantity
     *
     * @param _quantity               Amount of currentSets bidder is seeking to rebalance
     */
    function validateBidQuantity(
        Setup storage _auction,
        uint256 _quantity
    )
        internal
        view
    {
        // Make sure that bid amount is multiple of minimum bid amount
        require(
            _quantity.mod(_auction.minimumBid) == 0,
            "Auction.validateBidQuantity: Must bid multiple of minimum bid"
        );

        // Make sure that bid Amount is less than remainingCurrentSets
        require(
            _quantity <= _auction.remainingCurrentSets,
            "Auction.validateBidQuantity: Bid exceeds remaining current sets"
        );
    }

    /* ============ Bid Price Helpers ============ */

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
     * Creates arrays of token inflows and outflows
     *
     * @param _quantity               Amount of currentSets bidder is seeking to rebalance
     * @param _priceNumerator         The numerator of the price ratio
     * @param _priceDivisor           The denominator of the price ratio
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function createTokenFlowArrays(
        Setup storage _auction,
        uint256 _quantity,
        uint256 _priceNumerator,
        uint256 _priceDivisor
    )
        internal
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        // Normalized quantity amount
        uint256 unitsMultiplier = _quantity.div(_auction.minimumBid).mul(pricePrecision);

        // Get combinedTokenArray from storage to memory
        address[] memory memCombinedTokenArray = _auction.combinedTokenArray;

        // Declare unit arrays in memory
        uint256 combinedTokenCount = memCombinedTokenArray.length;
        uint256[] memory inflowUnitArray = new uint256[](combinedTokenCount);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenCount);

        // Cycle through each token in combinedTokenArray, calculate inflow/outflow and store
        // result in array
        for (uint256 i = 0; i < combinedTokenCount; i++) {
            (
                inflowUnitArray[i],
                outflowUnitArray[i]
            ) = calculateTokenFlows(
                _auction.combinedCurrentSetUnits[i], // Not loaded into memory cause stackTooDeep
                _auction.combinedNextSetUnits[i], // Not loaded into memory cause stackTooDeep
                unitsMultiplier,
                _priceNumerator,
                _priceDivisor
            );
        }

        return (memCombinedTokenArray, inflowUnitArray, outflowUnitArray);
    }

    /*
     * Calculates token inflow/outflow for single component in combinedTokenArray
     *
     * @param _currentUnit          Amount of token i in currentSet per minimum bid amount
     * @param _nextSetUnit          Amount of token i in nextSet per minimum bid amount
     * @param _unitsMultiplier      Bid amount normalized to number of minimum bid amounts
     * @param _priceNumerator       The numerator of the price ratio
     * @param _priceDivisor         The denominator of the price ratio
     * @return inflowUnit           Amount of token i transferred into the system
     * @return outflowUnit          Amount of token i transferred to the bidder
     */
    function calculateTokenFlows(
        uint256 _currentUnit,
        uint256 _nextSetUnit,
        uint256 _unitsMultiplier,
        uint256 _priceNumerator,
        uint256 _priceDivisor
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
        if (_nextSetUnit.mul(_priceDivisor) > _currentUnit.mul(_priceNumerator)) {
            // Calculate inflow amount
            inflowUnit = _unitsMultiplier.mul(
                _nextSetUnit.mul(_priceDivisor).sub(_currentUnit.mul(_priceNumerator))
            ).div(_priceNumerator);

            // Set outflow amount to 0 for component i, since tokens need to be injected in rebalance
            outflowUnit = 0;
        } else {
            // Calculate outflow amount
            outflowUnit = _unitsMultiplier.mul(
                _currentUnit.mul(_priceNumerator).sub(_nextSetUnit.mul(_priceDivisor))
            ).div(_priceNumerator);

            // Set inflow amount to 0 for component i, since tokens need to be returned in rebalance
            inflowUnit = 0;
        }

        return (inflowUnit, outflowUnit);
    }

    /* ============ Token Array Creation Helpers ============ */

    /**
     * Create arrays that represents all components in currentSet and nextSet.
     * Calcualate unit difference between both sets relative to the largest natural
     * unit of the two sets.
     *
     * @param _currentSet               Information on currentSet
     * @param _nextSet                  Information on nextSet
     */
    function calculateCombinedUnitArrays(
        Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256[] memory combinedCurrentSetUnits, uint256[] memory combinedNextSetUnits)
    {
        uint256 minimumBid = _auction.minimumBid;
        address[] memory combinedTokenArray = _auction.combinedTokenArray;

        // Create memory version of combinedNextSetUnits and combinedCurrentUnits to only make one
        // call to storage once arrays have been created
        uint256[] memory memoryCombinedCurrentSetUnits = new uint256[](combinedTokenArray.length);
        uint256[] memory memoryCombinedNextSetUnits = new uint256[](combinedTokenArray.length);


        for (uint256 i = 0; i < combinedTokenArray.length; i++) {
            memoryCombinedCurrentSetUnits[i] = calculateCombinedUnit(
                _currentSet,
                minimumBid,
                pricePrecision,
                combinedTokenArray[i]
            );

            memoryCombinedNextSetUnits[i] = calculateCombinedUnit(
                _nextSet,
                minimumBid,
                pricePrecision,
                combinedTokenArray[i]
            );
        }

        return (memoryCombinedCurrentSetUnits, memoryCombinedNextSetUnits);
    }


    /**
     * Calculations the unit amount of Token to include in the the combined Set units.
     *
     * @param _setToken                 Information on the SetToken
     * @param _minimumBid               Minimum bid amount
     * @param _pricePrecision           Price Divisor used in Liquidator contract
     * @param _component                Current component in iteration
     * @return                          Unit inflow/outflow
     */
    function calculateCombinedUnit(
        ISetToken _setToken,
        uint256 _minimumBid,
        uint256 _pricePrecision,
        address _component
    )
        private
        view
        returns (uint256)
    {
        // Check if component in arrays and get index if it is
        uint256 indexCurrent;
        bool isComponent;
        (indexCurrent, isComponent) = _setToken.getComponents().indexOf(_component);

        // Compute unit amounts of token in Set
        if (isComponent) {
            return computeTransferValue(
                _setToken.getUnits()[indexCurrent],
                _setToken.naturalUnit(),
                _minimumBid,
                _pricePrecision
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
     * @param   _minimumBid         Minimum bid amount
     * @param   _pricePrecision     Price Divisor used in Liquidator contract 
     * @return  uint256             Amount of tokens per standard bid amount (minimumBid/priceDivisor)
     */
    function computeTransferValue(
        uint256 _unit,
        uint256 _naturalUnit,
        uint256 _minimumBid,
        uint256 _pricePrecision
    )
        private
        pure
        returns (uint256)
    {
        return _minimumBid.mul(_unit).div(_naturalUnit).div(_pricePrecision);
    }
}