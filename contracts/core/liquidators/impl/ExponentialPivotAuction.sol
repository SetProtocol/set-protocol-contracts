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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
import { LinearAuction } from "./LinearAuction.sol";

/**
 * @title ExponentialPivotAuction
 * @author Set Protocol
 *
 * Library containing utility functions for calculating auction parameters and auction prices for
 * linear auctions.
 */
contract ExponentialPivotAuction is LinearAuction {
    using SafeMath for uint256;

    /* ============ Constants ============ */
    uint256 constant public THIRTY_SECONDS = 30;
    uint256 constant public MAX_30_SECOND_PERIODS = 1000;

    /* ============ Constructor ============ */
    /**
     * LinearAuction constructor
     *
     */
    constructor(
        uint256 _pricePrecision,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd,
        IOracleWhiteList _oracleWhiteList
    )
        public
        LinearAuction(
            _pricePrecision,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd,
            _oracleWhiteList
        )
    {}

    /*
     * Calculate the current priceRatio for an auction given defined price and time parameters
     *
     * @param _startPrice           Starting price of auction
     * @param _endPrice           Pivot price of auction
     * @param _startTime            Starting timestamp of auction
     * @param _auctionPeriod          Amount of time to reach pivot price from start of auction
     * @param _pricePrecision       Starting price ratio denominator
     * @return uint256              The price ratio numerator
     * @return uint256              The price ratio denominator
     */
    function getCurrentPriceRatio(
        LinearAuction.State storage _linearAuction
    )
        internal
        view
        returns (uint256, uint256)
    {
        // Calculate how much time has elapsed since start of auction
        uint256 elapsed = block.timestamp.sub(_linearAuction.auction.startTime);
        uint256 startPrice = _linearAuction.startPrice;
        uint256 endPrice = _linearAuction.endPrice;

        // Initialize numerator and denominator
        uint256 priceNumerator = endPrice;
        uint256 currentPriceDivisor = pricePrecision;

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
         * PriceNumerator(x) = startPrice + (auctionPivotPrice-startPrice)*(x/auctionTimeToPivot),
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
        if (elapsed <= auctionPeriod) {
            // Calculate the priceNumerator as a linear function of time between _startPrice and
            // _auctionPivotPrice
            priceNumerator = getLinearPrice(_linearAuction);
        } else {
            // Calculate how many 30 second increments have passed since pivot was reached
            uint256 thirtySecondPeriods = elapsed
                .sub(auctionPeriod)
                .div(THIRTY_SECONDS);
            // Because after 1000 thirtySecondPeriods the priceDivisor would be 0 (causes revert)
            if (thirtySecondPeriods < MAX_30_SECOND_PERIODS) {
                // Calculate new denominator where the denominator decays at a rate of 0.1% of the ORIGINAL
                // priceDivisor per time increment (hence divide by 1000)
                currentPriceDivisor = pricePrecision
                    .sub(thirtySecondPeriods
                        .mul(pricePrecision)
                        .div(MAX_30_SECOND_PERIODS)
                    );
            } else {
                // Once denominator has fully decayed, fix it at 1
                currentPriceDivisor = 1;

                // Now priceNumerator just changes linearly, but with slope equal to the pivot price
                priceNumerator = endPrice.add(
                    endPrice.mul(thirtySecondPeriods.sub(MAX_30_SECOND_PERIODS))
                );
            }
        }

        return (priceNumerator, currentPriceDivisor);
    }
}