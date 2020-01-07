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
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { IOracle } from "set-protocol-strategies/contracts/meta-oracles/interfaces/IOracle.sol";

import { Auction } from "./Auction.sol";
import { CommonMath } from "../../../lib/CommonMath.sol";
import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { LinearAuction } from "./LinearAuction.sol";


/**
 * @title TwoAssetPriceBoundedLinearAuction
 * @author Set Protocol
 *
 */
contract TwoAssetPriceBoundedLinearAuction is LinearAuction {
    using SafeMath for uint256;
    using CommonMath for uint256;

    struct AssetInfo {
        uint256 price;
        uint256 fullUnit;
    }

    uint256 constant private CURVE_DENOMINATOR = 10 ** 18;
    uint256 constant private ONE_HUNDRED = 100;

    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd
    )
        public
        LinearAuction(
            _oracleWhiteList,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd
        )
    {}

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

        LinearAuction.validateRebalanceComponents(
            _currentSet,
            _nextSet
        );
    }

    /**
     * Calculates the linear auction start price with a scaled value
     */
    function calculateStartPrice(
        Auction.Setup storage _auction
    )
        internal
        view
        returns(uint256)
    {
        // Get full Unit amount and price for each asset
        AssetInfo memory assetOne = getAssetInfo(_auction.combinedTokenArray[0]);
        AssetInfo memory assetTwo = getAssetInfo(_auction.combinedTokenArray[1]);

        // Calculate current asset pair spot price as assetOne/assetTwo
        uint256 spotPrice = assetOne.price.scale().div(assetTwo.price);

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
            startPairPrice = spotPrice.mul(ONE_HUNDRED.sub(rangeStart)).div(ONE_HUNDRED);
        } else {
            startPairPrice = spotPrice.mul(ONE_HUNDRED.add(rangeStart)).div(ONE_HUNDRED);  
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
     * Calculates the linear auction end price with a scaled value
     */
    function calculateEndPrice(
        Auction.Setup storage _auction
    )
        internal
        view
        returns(uint256)
    {
        // Get full Unit amount and price for each asset
        AssetInfo memory assetOne = getAssetInfo(_auction.combinedTokenArray[0]);
        AssetInfo memory assetTwo = getAssetInfo(_auction.combinedTokenArray[1]);

        // Calculate current spot price as assetOne/assetTwo
        uint256 spotPrice = assetOne.price.scale().div(assetTwo.price);

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
            endPairPrice = spotPrice.mul(ONE_HUNDRED.add(rangeEnd)).div(ONE_HUNDRED);
        } else {
            endPairPrice = spotPrice.mul(ONE_HUNDRED.sub(rangeEnd)).div(ONE_HUNDRED);  
        }

        // Convert end asset pair price to equivalent auction price
        return convertAssetPairPriceToAuctionPrice(
            _auction,
            endPairPrice,
            assetOne.fullUnit,
            assetTwo.fullUnit
        );
    }

    function isTokenFlowIncreasing(
        Auction.Setup storage _auction,
        uint256 _spotPrice,
        uint256 _assetOneFullUnit,
        uint256 _assetTwoFullUnit
    )
        internal
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

        // Equation for assetOne net outflow is assetOneCurrentUnits*auctionPrice - assetOneNextUnits*auctionDenominator.
        // Thus if assetOneNextUnits*auctionDenominator > assetOneCurrentUnits*auctionPrice then assetOne is
        // an inflow. When assetOne is an inflow (negative outflow), it implies that assetTwo is an outflow, 
        // furthermore we are guaranteed that both flows have a positive derivative with respect to auction price (and
        // auction price always increases). Since we define price as abs(assetTwoOutflow/assetOneOutflow), with assetOneFlow
        // getting less negative and assetTwoFlow getting more positive it implies that the asset price is increasing as
        // time passes in the auction. 
        return _auction.combinedNextSetUnits[0].mul(CURVE_DENOMINATOR) >
            _auction.combinedCurrentSetUnits[0].mul(auctionFairValue);
    }

    /**
     * Convert an asset pair price to the equivalent auction price where a1 refers to assetOne and a2 refers to assetTwo
     * and subscripts c, n, d mean currentSetUnit, nextSetUnit and fullUnit amount, respectively. aP and aD refer to auction
     * price and auction denominator:
     *
     * assetPrice = abs(assetTwoOutflow/assetOneOutflow)
     *
     * assetPrice = ((a2_c/a2_d)*aP - (a2_n/a2_d)*aD) / ((a1_c/a1_d)*aP - (a1_n/a1_d)*aD)
     *
     * We know assetPrice so we isolate for aP:
     *
     * aP = aD((a2_n/a2_d)+assetPrice*(a1_n/a1_d)) / (a2_c/a2_d)+assetPrice*(a1_c/a1_d)
     *
     * This gives us the auction price that matches with the passed asset pair price.
     */
    function convertAssetPairPriceToAuctionPrice(
        Auction.Setup storage _auction,
        uint256 _targetPrice,
        uint256 assetOneFullUnit,
        uint256 assetTwoFullUnit
    )
        internal
        view
        returns (uint256)
    {
        // Calculate the numerator for the above equation. In order to ensure no rounding down errors we distribute the auction
        // denominator. Additionally, since the price is passed as an 18 decimal number in order to maintain consistency we
        // have to scale the first term up accordingly
        uint256 calcNumerator = _auction.combinedNextSetUnits[1].mul(CURVE_DENOMINATOR).scale().div(assetTwoFullUnit).add(
            _targetPrice.mul(_auction.combinedNextSetUnits[0]).mul(CURVE_DENOMINATOR).div(assetOneFullUnit)
        );

        // Calculate the denominator for the above equation. As above we we have to scale the first term match the 18 decimal
        // price. Furthermore since we are not guaranteed that targetPrice * a1_c > a1_d we have to scale the second term and
        // thus also the first term in order to match (hence the two scale() in the first term)
        uint256 calcDenominator = _auction.combinedCurrentSetUnits[1].scale().scale().div(assetTwoFullUnit).add(
           _targetPrice.mul(_auction.combinedCurrentSetUnits[0]).scale().div(assetOneFullUnit) 
        );

        // Here the scale required to account for the 18 decimal price cancels out since it was applied to both the numerator
        // and denominator. However there was an extra scale applied to the denominator that we need to remove, in order to
        // do so we'll just apply another scale to the numerator before dividing since 1/(1/10 ** 18) = 10 ** 18!
        return calcNumerator.scale().div(calcDenominator);
    }

    function getAssetInfo(address _asset) internal view returns(AssetInfo memory) {
        address assetOracle = oracleWhiteList.getOracleAddressByToken(_asset);
        uint256 assetPrice = IOracle(assetOracle).read();

        uint256 decimals = ERC20Detailed(_asset).decimals();

        return AssetInfo({
            price: assetPrice,
            fullUnit: CommonMath.safePower(10, decimals)
        });
    }
}