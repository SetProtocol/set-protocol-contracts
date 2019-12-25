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
import { IAuctionPriceCurve } from "../../lib/auction-price-libraries/IAuctionPriceCurve.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";


/**
 * @title PlaceBidLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token placeBid function
 */
library PlaceBidLibrary {
    using SafeMath for uint256;

    /* ============ Internal Functions ============ */

    /*
     * Place bid during rebalance auction. Can only be called by Core.
     *
     * @param _quantity                 The amount of currentSet to be rebalanced
     * @param _coreAddress              Core address
     * @param _biddingParameters        Struct containing relevant data for calculating token flows
     */
    function validatePlaceBid(
        uint256 _quantity,
        address _coreAddress,
        RebalancingLibrary.BiddingParameters memory _biddingParameters
    )
        public
        view
    {
        // Make sure sender is a module
        require(
            ICore(_coreAddress).validModules(msg.sender),
            "RebalancingSetToken.placeBid: Sender must be approved module"
        );

        // Make sure that bid amount is greater than zero
        require(
            _quantity > 0,
            "RebalancingSetToken.placeBid: Bid must be > 0"
        );

        // Make sure that bid amount is multiple of minimum bid amount
        require(
            _quantity.mod(_biddingParameters.minimumBid) == 0,
            "RebalancingSetToken.placeBid: Must bid multiple of minimum bid"
        );

        // Make sure that bid Amount is less than remainingCurrentSets
        require(
            _quantity <= _biddingParameters.remainingCurrentSets,
            "RebalancingSetToken.placeBid: Bid exceeds remaining current sets"
        );
    }

    /*
     * Get token inflows and outflows required for bid. Also the amount of Rebalancing
     * Sets that would be generated.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @param _auctionLibrary         Auction library used in rebalance
     * @param _biddingParameters      Struct containing relevant data for calculating token flows
     * @param _auctionPriceParameters Struct containing auction price curve parameters
     * @param _rebalanceState         State of rebalancing set token
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function getBidPrice(
        uint256 _quantity,
        address _auctionLibrary,
        RebalancingLibrary.BiddingParameters memory _biddingParameters,
        RebalancingLibrary.AuctionPriceParameters memory _auctionPriceParameters,
        uint8 _rebalanceState
    )
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        // Confirm in Rebalance State
        require(
            _rebalanceState == uint8(RebalancingLibrary.State.Rebalance),
            "RebalancingSetToken.getBidPrice: State must be Rebalance"
        );

        // Get bid conversion price, currently static placeholder for calling auctionlibrary
        uint256 priceNumerator;
        uint256 priceDivisor;
        (priceNumerator, priceDivisor) = IAuctionPriceCurve(_auctionLibrary).getCurrentPrice(
            _auctionPriceParameters
        );

        // Normalized quantity amount
        uint256 unitsMultiplier = _quantity.div(_biddingParameters.minimumBid).mul(priceDivisor);

        // Calculate token flow arrays
        return createTokenFlowArrays(
            unitsMultiplier,
            priceNumerator,
            priceDivisor,
            _biddingParameters
        );
    }

    /*
     * Creates arrays of token inflows and outflows
     *
     * @param _unitsMultiplier        Bid amount normalized to number of standard bid amounts
     * @param _priceNumerator         The numerator of the price ratio
     * @param _priceDivisor           The denominator of the price ratio
     * @param _biddingParameters      Struct containing relevant data for calculating token flows
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function createTokenFlowArrays(
        uint256 _unitsMultiplier,
        uint256 _priceNumerator,
        uint256 _priceDivisor,
        RebalancingLibrary.BiddingParameters memory _biddingParameters
    )
        public
        pure
        returns (uint256[] memory, uint256[] memory)
    {
        // Declare unit arrays in memory
        uint256 combinedTokenCount = _biddingParameters.combinedTokenArray.length;
        uint256[] memory inflowUnitArray = new uint256[](combinedTokenCount);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenCount);

        // Cycle through each token in combinedTokenArray, calculate inflow/outflow and store
        // result in array
        for (uint256 i = 0; i < combinedTokenCount; i++) {
            (
                inflowUnitArray[i],
                outflowUnitArray[i]
            ) = calculateTokenFlows(
                _biddingParameters.combinedCurrentUnits[i],
                _biddingParameters.combinedNextSetUnits[i],
                _unitsMultiplier,
                _priceNumerator,
                _priceDivisor
            );
        }

        return (inflowUnitArray, outflowUnitArray);
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
        public
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
}
