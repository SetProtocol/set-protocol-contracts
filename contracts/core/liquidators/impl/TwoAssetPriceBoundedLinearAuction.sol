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
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";
import { IOracle } from "set-protocol-oracles/contracts/meta-oracles/interfaces/IOracle.sol";

import { Auction } from "./Auction.sol";
import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { LinearAuction } from "./LinearAuction.sol";


/**
 * @title TwoAssetPriceBoundedLinearAuction
 * @author Set Protocol
 *
 * Contract to calculate minimumBid and auction start bounds for auctions containing only
 * an asset pair.
 *
 * CHANGELOG: 5/20/2020 - Edited rangeStart and rangeEnd values to be scaled figures.
 */
contract TwoAssetPriceBoundedLinearAuction is LinearAuction {
    using SafeMath for uint256;
    using CommonMath for uint256;

    /* ============ Struct ============ */
    struct AssetInfo {
        uint256 price;
        uint256 fullUnit;
    }

    /* ============ Constants ============ */
    uint256 constant private CURVE_DENOMINATOR = 10 ** 18;
    uint256 constant private ONE = 1;
    // Minimum token flow allowed at spot price in auction
    uint256 constant private MIN_SPOT_TOKEN_FLOW_SCALED = 10 ** 21;

    /* ============ State Variables ============ */
    IOracleWhiteList public oracleWhiteList;
    uint256 public rangeStart; // Percentage below FairValue to begin auction at
    uint256 public rangeEnd;  // Percentage above FairValue to end auction at

    /**
     * TwoAssetPriceBoundedLinearAuction constructor
     *
     * @param _auctionPeriod          Length of auction
     * @param _rangeStart             Percentage below FairValue to begin auction at in 18 decimal value
     * @param _rangeEnd               Percentage above FairValue to end auction at in 18 decimal value
     */
    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd
    )
        public
        LinearAuction(_auctionPeriod)
    {
        oracleWhiteList = _oracleWhiteList;
        rangeStart = _rangeStart;
        rangeEnd = _rangeEnd;
    }

    /* ============ Internal Functions ============ */

    /**
     * Validates that the auction only includes two components and the components are valid.
     */
    function validateTwoAssetPriceBoundedAuction(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
    {
        address[] memory combinedTokenArray = Auction.getCombinedTokenArray(_currentSet, _nextSet);
        require(
            combinedTokenArray.length == 2,
            "TwoAssetPriceBoundedLinearAuction: Only two components are allowed."
        );

        require(
            oracleWhiteList.areValidAddresses(combinedTokenArray),
            "TwoAssetPriceBoundedLinearAuction: Passed token does not have matching oracle."
        );
    }

    /**
     * Calculates the minimumBid. First calculates the minimum token flow for the pair at fair value using
     * maximum natural unit of two Sets. If that token flow is below 1000 units then calculate minimumBid
     * as such:
     *
     * minimumBid = maxNaturalUnit*1000/min(tokenFlow)
     *
     * Else, set minimumBid equal to maxNaturalUnit. This is to ensure that around fair value there is ample
     * granualarity in asset pair price changes and not large discontinuities.
     *
     * @param _auction            Auction object
     * @param _currentSet         CurrentSet, unused in this implementation
     * @param _nextSet            NextSet, unused in this implementation
     */
    function calculateMinimumBid(
        Auction.Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256)
    {
        // Get full Unit amount and price for each asset
        AssetInfo memory assetOne = getAssetInfo(_auction.combinedTokenArray[0]);
        AssetInfo memory assetTwo = getAssetInfo(_auction.combinedTokenArray[1]);

        // Calculate current spot price as assetOne/assetTwo
        uint256 spotPrice = calculateSpotPrice(assetOne.price, assetTwo.price);

        // Calculate auction price at current asset pair spot price
        uint256 auctionFairValue = convertAssetPairPriceToAuctionPrice(
            _auction,
            spotPrice,
            assetOne.fullUnit,
            assetTwo.fullUnit
        );

        uint256 minimumBidMultiplier = 0;
        for (uint8 i = 0; i < _auction.combinedTokenArray.length; i++) {
            // Get token flow at fair value for asset i, using an amount equal to ONE maxNaturalUnit
            // Hence the ONE.scale()
            (
                uint256 tokenInflowScaled,
                uint256 tokenOutflowScaled
            ) = Auction.calculateInflowOutflow(
                _auction.combinedCurrentSetUnits[i],
                _auction.combinedNextSetUnits[i],
                ONE.scale(),
                auctionFairValue
            );

            // One returned number from previous function will be zero so use max to get tokenFlow
            uint256 tokenFlowScaled = Math.max(tokenInflowScaled, tokenOutflowScaled);

            // Divide minimum spot token flow (1000 units) by token flow if more than minimumBidMultiplier
            // update minimumBidMultiplier
            uint256 currentMinBidMultiplier = MIN_SPOT_TOKEN_FLOW_SCALED.divCeil(tokenFlowScaled);
            minimumBidMultiplier = currentMinBidMultiplier > minimumBidMultiplier ?
                currentMinBidMultiplier :
                minimumBidMultiplier;
        }

        // Multiply the minimumBidMultiplier by maxNaturalUnit to get minimumBid
        return _auction.maxNaturalUnit.mul(minimumBidMultiplier);
    }

    /**
     * Calculates the linear auction start price. A target asset pair (i.e. ETH/DAI) price is calculated
     * to start the auction at, that asset pair price is then translated into the equivalent auction price.
     *
     * @param _auction            Auction object
     * @param _currentSet         CurrentSet, unused in this implementation
     * @param _nextSet            NextSet, unused in this implementation
     */
    function calculateStartPrice(
        Auction.Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns(uint256)
    {
        // Get full Unit amount and price for each asset
        AssetInfo memory assetOne = getAssetInfo(_auction.combinedTokenArray[0]);
        AssetInfo memory assetTwo = getAssetInfo(_auction.combinedTokenArray[1]);

        // Calculate current asset pair spot price as assetOne/assetTwo
        uint256 spotPrice = calculateSpotPrice(assetOne.price, assetTwo.price);

        // Check to see if asset pair price is increasing or decreasing as time passes
        bool isTokenFlowIncreasing = isTokenFlowIncreasing(
            _auction,
            spotPrice,
            assetOne.fullUnit,
            assetTwo.fullUnit
        );

        // If price implied by token flows is increasing then target price we are using for lower bound
        // is below current spot price, if flows decreasing set target price above spotPrice
        uint256 startPairPrice;
        if (isTokenFlowIncreasing) {
            startPairPrice = spotPrice.mul(CommonMath.scaleFactor().sub(rangeStart)).deScale();
        } else {
            startPairPrice = spotPrice.mul(CommonMath.scaleFactor().add(rangeStart)).deScale();
        }

        // Convert start asset pair price to equivalent auction price
        return convertAssetPairPriceToAuctionPrice(
            _auction,
            startPairPrice,
            assetOne.fullUnit,
            assetTwo.fullUnit
        );
    }

    /**
     * Calculates the linear auction end price. A target asset pair (i.e. ETH/DAI) price is calculated
     * to end the auction at, that asset pair price is then translated into the equivalent auction price.
     *
     * @param _auction            Auction object
     * @param _currentSet         CurrentSet, unused in this implementation
     * @param _nextSet            NextSet, unused in this implementation
     */
    function calculateEndPrice(
        Auction.Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns(uint256)
    {
        // Get full Unit amount and price for each asset
        AssetInfo memory assetOne = getAssetInfo(_auction.combinedTokenArray[0]);
        AssetInfo memory assetTwo = getAssetInfo(_auction.combinedTokenArray[1]);

        // Calculate current spot price as assetOne/assetTwo
        uint256 spotPrice = calculateSpotPrice(assetOne.price, assetTwo.price);

        // Check to see if asset pair price is increasing or decreasing as time passes
        bool isTokenFlowIncreasing = isTokenFlowIncreasing(
            _auction,
            spotPrice,
            assetOne.fullUnit,
            assetTwo.fullUnit
        );

        // If price implied by token flows is increasing then target price we are using for upper bound
        // is above current spot price, if flows decreasing set target price below spotPrice
        uint256 endPairPrice;
        if (isTokenFlowIncreasing) {
            endPairPrice = spotPrice.mul(CommonMath.scaleFactor().add(rangeEnd)).deScale();
        } else {
            endPairPrice = spotPrice.mul(CommonMath.scaleFactor().sub(rangeEnd)).deScale();
        }

        // Convert end asset pair price to equivalent auction price
        return convertAssetPairPriceToAuctionPrice(
            _auction,
            endPairPrice,
            assetOne.fullUnit,
            assetTwo.fullUnit
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Determines if asset pair price is increasing or decreasing as time passed in auction. Used to set the
     * auction price bounds. Below a refers to any asset and subscripts c, n, d mean currentSetUnit, nextSetUnit
     * and fullUnit amount, respectively. pP and pD refer to auction price and auction denominator. Asset pair
     * price is defined as such:
     *
     * assetPrice = abs(assetTwoOutflow/assetOneOutflow)
     *
     * The equation for an outflow is given by (a_c/a_d)*pP - (a_n/a_d)*pD). It can be proven that the derivative
     * of this equation is always increasing. Thus by determining the sign of the assetOneOutflow (where a negative
     * amount signifies an inflow) it can be determined whether the asset pair price is increasing or decreasing.
     *
     * For example, if assetOneOutflow is negative it means that the denominator is getting smaller as time passes
     * and thus the assetPrice is increasing during the auction.
     *
     * @param _auction              Auction object
     * @param _spotPrice            Current spot price provided by asset oracles
     * @param _assetOneFullUnit     Units in one full unit of assetOne
     * @param _assetTwoFullUnit     Units in one full unit of assetTwo
     */
    function isTokenFlowIncreasing(
        Auction.Setup storage _auction,
        uint256 _spotPrice,
        uint256 _assetOneFullUnit,
        uint256 _assetTwoFullUnit
    )
        private
        view
        returns (bool)
    {
        // Calculate auction price at current asset pair spot price
        uint256 auctionFairValue = convertAssetPairPriceToAuctionPrice(
            _auction,
            _spotPrice,
            _assetOneFullUnit,
            _assetTwoFullUnit
        );

        // Determine whether outflow for assetOne is positive or negative, if positive then asset pair price is
        // increasing, else decreasing.
        return _auction.combinedNextSetUnits[0].mul(CURVE_DENOMINATOR) >
            _auction.combinedCurrentSetUnits[0].mul(auctionFairValue);
    }

    /**
     * Convert an asset pair price to the equivalent auction price where a1 refers to assetOne and a2 refers to assetTwo
     * and subscripts c, n, d mean currentSetUnit, nextSetUnit and fullUnit amount, respectively. pP and pD refer to auction
     * price and auction denominator:
     *
     * assetPrice = abs(assetTwoOutflow/assetOneOutflow)
     *
     * assetPrice = ((a2_c/a2_d)*pP - (a2_n/a2_d)*pD) / ((a1_c/a1_d)*pP - (a1_n/a1_d)*pD)
     *
     * We know assetPrice so we isolate for pP:
     *
     * pP = pD((a2_n/a2_d)+assetPrice*(a1_n/a1_d)) / (a2_c/a2_d)+assetPrice*(a1_c/a1_d)
     *
     * This gives us the auction price that matches with the passed asset pair price.
     *
     * @param _auction              Auction object
     * @param _targetPrice          Target asset pair price
     * @param _assetOneFullUnit     Units in one full unit of assetOne
     * @param _assetTwoFullUnit     Units in one full unit of assetTwo
     */
    function convertAssetPairPriceToAuctionPrice(
        Auction.Setup storage _auction,
        uint256 _targetPrice,
        uint256 _assetOneFullUnit,
        uint256 _assetTwoFullUnit
    )
        private
        view
        returns (uint256)
    {
        // Calculate the numerator for the above equation. In order to ensure no rounding down errors we distribute the auction
        // denominator. Additionally, since the price is passed as an 18 decimal number in order to maintain consistency we
        // have to scale the first term up accordingly
        uint256 calcNumerator = _auction.combinedNextSetUnits[1].mul(CURVE_DENOMINATOR).scale().div(_assetTwoFullUnit).add(
            _targetPrice.mul(_auction.combinedNextSetUnits[0]).mul(CURVE_DENOMINATOR).div(_assetOneFullUnit)
        );

        // Calculate the denominator for the above equation. As above we we have to scale the first term match the 18 decimal
        // price. Furthermore since we are not guaranteed that targetPrice * a1_c > a1_d we have to scale the second term and
        // thus also the first term in order to match (hence the two scale() in the first term)
        uint256 calcDenominator = _auction.combinedCurrentSetUnits[1].scale().scale().div(_assetTwoFullUnit).add(
           _targetPrice.mul(_auction.combinedCurrentSetUnits[0]).scale().div(_assetOneFullUnit)
        );

        // Here the scale required to account for the 18 decimal price cancels out since it was applied to both the numerator
        // and denominator. However, there was an extra scale applied to the denominator that we need to remove, in order to
        // do so we'll just apply another scale to the numerator before dividing since 1/(1/10 ** 18) = 10 ** 18!
        return calcNumerator.scale().div(calcDenominator);
    }

    /**
     * Get fullUnit amount and price of given asset.
     *
     * @param _asset            Address of auction to get information from
     */
    function getAssetInfo(address _asset) private view returns(AssetInfo memory) {
        address assetOracle = oracleWhiteList.getOracleAddressByToken(_asset);
        uint256 assetPrice = IOracle(assetOracle).read();

        uint256 decimals = ERC20Detailed(_asset).decimals();

        return AssetInfo({
            price: assetPrice,
            fullUnit: CommonMath.safePower(10, decimals)
        });
    }

    /**
     * Calculate asset pair price given two prices.
     */
    function calculateSpotPrice(uint256 _assetOnePrice, uint256 _assetTwoPrice) private view returns(uint256) {
        return _assetOnePrice.scale().div(_assetTwoPrice);
    }
}