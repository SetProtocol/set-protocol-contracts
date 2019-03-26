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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { RebalancingLibrary } from "../../../core/lib/RebalancingLibrary.sol";

/**
 * @title ConstantAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used in rebalancing auction testing to return consistent price
 *
 */

contract ConstantAuctionPriceCurve {
    using SafeMath for uint256;

    uint256 constant public MIN_PIVOT_PRICE_DIVISOR = 2;
    uint256 constant public MAX_PIVOT_PRICE_NUMERATOR = 5;

    uint256 public priceNumerator;
    uint256 public priceDivisor;

    /*
     * Declare price you want this library to return when queried
     *
     * @param  _priceNumerator      The priceNumerator you want this library to always return
     * @param  _priceDivisor        The priceDivisor you want this library to always return
     */
    constructor(
        uint256 _priceNumerator,
        uint256 _priceDivisor
    )
        public
    {
        // Set price to be returned by library
        priceNumerator = _priceNumerator;
        priceDivisor = _priceDivisor;
    }

    /*
     * Validate any auction parameters that have library-specific restrictions
     *
     * @param _auctionPriceParameters   Struct containing relevant auction price parameters
     */
    function validateAuctionPriceParameters(
        RebalancingLibrary.AuctionPriceParameters memory _auctionPriceParameters
    )
        public
        view
    {
        // Require pivot price to be greater than 0.5 * price denominator
        // Equivalent to oldSet/newSet = 0.5
        require(
            _auctionPriceParameters.auctionPivotPrice > priceDivisor.div(MIN_PIVOT_PRICE_DIVISOR),
            "LinearAuctionPriceCurve.validateAuctionPriceParameters: Pivot price too low"
        );
         // Require pivot price to be less than 5 * price denominator
        // Equivalent to oldSet/newSet = 5
        require(
            _auctionPriceParameters.auctionPivotPrice < priceDivisor.mul(MAX_PIVOT_PRICE_NUMERATOR),
            "LinearAuctionPriceCurve.validateAuctionPriceParameters: Pivot price too high"
        );
    }

    /*
     * Calculate the current priceRatio for an auction given defined price and time parameters
     *
     * -- Unused _auctionPriceParameters param containing relevant auction price parameters  --
     * @return uint256                    The auction price numerator
     * @return uint256                    The auction price denominator
     */
    function getCurrentPrice(
        RebalancingLibrary.AuctionPriceParameters memory
    )
        public
        view
        returns (uint256, uint256)
    {
        return (priceNumerator, priceDivisor);
    }
}
