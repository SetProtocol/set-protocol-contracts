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
import { RebalancingLibrary } from "../RebalancingLibrary.sol";


/**
 * @title LinearAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used in rebalancing auctions to calculate price based off of a linear curve
 */
contract LinearAuctionPriceCurve {
    using SafeMath for uint256;

    uint256 constant public MIN_PIVOT_PRICE_DIVISOR = 5;
    uint256 constant public MAX_PIVOT_PRICE_NUMERATOR = 5;
    uint256 constant public MAX_30_SECOND_PERIODS = 1000;
    uint256 constant public THIRTY_SECONDS = 30;

    uint256 public priceDivisor;
    bool public usesStartPrice;

    /*
     * Declare price denominator (or precision) of price curve
     *
     * @param  _priceDivisor            The priceDivisor you want this library to always return
     * @param  _usesStartPrice          Boolean indicating if provided auctionStartPrice is used (true) or
     *                                  auction starts at 0 (false)
     */
    constructor(
        uint256 _priceDivisor,
        bool _usesStartPrice
    )
        public
    {
        // Set price to be returned by library
        priceDivisor = _priceDivisor;
        usesStartPrice = _usesStartPrice;
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
        // Require that auction pivot price is greater than auction start price
        require(
            _auctionPriceParameters.auctionPivotPrice > _auctionPriceParameters.auctionStartPrice,
            "LinearAuctionPriceCurve.validateAuctionPriceParameters: Start price greater than pivot price"
        );

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
     * @param _auctionPriceParameters     Struct containing relevant auction price parameters
     * @return uint256                    The auction price numerator
     * @return uint256                    The auction price denominator
     */
    function getCurrentPrice(
        RebalancingLibrary.AuctionPriceParameters memory _auctionPriceParameters
    )
        public
        view
        returns (uint256, uint256)
    {
        // Calculate how much time has elapsed since start of auction
        uint256 elapsed = block.timestamp.sub(_auctionPriceParameters.auctionStartTime);

        // Initialize numerator and denominator
        uint256 priceNumerator = _auctionPriceParameters.auctionPivotPrice;
        uint256 currentPriceDivisor = priceDivisor;

        // Determine the auctionStartPrice based on if it should be self-defined
        uint256 auctionStartPrice = 0;
        if (usesStartPrice) {
            auctionStartPrice = _auctionPriceParameters.auctionStartPrice;
        }

        /*
         * This price curve can be broken down into three stages, 1) set up to allow a portion where managers
         * have control over the cadence of the auction, and then two more stages that are used to enforce finality
         * to the auction. The auction price, p(x), is defined by:
         *
         * p(x) = (priceNumerator/priceDivisor
         *
         * In each stage either the priceNumerator or priceDivisor is manipulated to change p(x).The curve shape
         * in each stage is defined below.
         *
         * 1) Managers have the greatest control over stage 1. Here they define a linear curve that starts at zero
         * and terminates at the passed pivot price. The length of time it takes for the auction to reach the pivot
         * price is defined by the manager too, thus resulting in the following equation for the slope of the line:
         *
         * PriceNumerator(x) = auctionStartPrice + (auctionPivotPrice-auctionStartPrice)*(x/auctionTimeToPivot),
         * where x is amount of time from auction start
         *
         * 2) Stage 2 the protocol takes over to attempt to hasten/guarantee finality, this unfortunately decreases
         * the granularity of the auction price changes. In this stage the PriceNumerator remains fixed at the
         * auctionPivotPrice. However, the priceDivisor decays at a rate equivalent to 0.1% of the ORIGINAL
         * priceDivisor every 30 secs. This leads to the following function relative to time:
         *
         * PriceDenominator(x) = priceDivisor-(0.01*priceDivisor*((x-auctionTimeToPivot)/30)), where x is amount
         * of time from auction start.
         *
         * Since we are decaying the denominator the price curve takes on the shape of e^x. Because of the limitations
         * of integer math the denominator can only be decayed to 1. Hence in order to maintain simplicity in calculations
         * there is a third segment defined below.
         *
         * 3) The third segment is a simple linear calculation that changes the priceNumerator at the rate of the pivot
         * price every 30 seconds and fixes the priceDivisor at 1:
         *
         * PriceNumerator(x) = auctionPivotPrice + auctionPivotPrice*(x-auctionTimeToPivot-30000), where x is amount of
         * time from auction start and 30000 represents the amount of time spent in Stage 2
         */

        // If time hasn't passed to pivot use the user-defined curve
        if (elapsed <= _auctionPriceParameters.auctionTimeToPivot) {
            // Calculate the priceNumerator as a linear function of time between _auctionStartPrice and
            // _auctionPivotPrice
            uint256 linearPriceDifference = _auctionPriceParameters.auctionPivotPrice.sub(auctionStartPrice);
            priceNumerator = auctionStartPrice.add(
                elapsed.mul(linearPriceDifference).div(_auctionPriceParameters.auctionTimeToPivot)
            );
        } else {
            // Calculate how many 30 second increments have passed since pivot was reached
            uint256 thirtySecondPeriods = elapsed
                .sub(_auctionPriceParameters.auctionTimeToPivot)
                .div(THIRTY_SECONDS);

            // Because after 1000 thirtySecondPeriods the priceDivisor would be 0 (causes revert)
            if (thirtySecondPeriods < MAX_30_SECOND_PERIODS) {
                // Calculate new denominator where the denominator decays at a rate of 0.1% of the ORIGINAL
                // priceDivisor per time increment (hence divide by 1000)
                currentPriceDivisor = priceDivisor
                    .sub(thirtySecondPeriods
                        .mul(priceDivisor)
                        .div(MAX_30_SECOND_PERIODS)
                    );
            } else {
                // Once denominator has fully decayed, fix it at 1
                currentPriceDivisor = 1;

                // Now priceNumerator just changes linearly, but with slope equal to the pivot price
                priceNumerator = _auctionPriceParameters.auctionPivotPrice.add(
                    _auctionPriceParameters.auctionPivotPrice.mul(thirtySecondPeriods.sub(MAX_30_SECOND_PERIODS))
                );
            }
        }

        return (priceNumerator, currentPriceDivisor);
    }
}
