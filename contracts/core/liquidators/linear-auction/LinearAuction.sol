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


/**
 * @title LinearAuction
 * @author Set Protocol
 *
 * Library containing utility functions for calculating auction parameters and auction prices for
 * linear auctions.
 */
contract LinearAuction {
    using SafeMath for uint256;

    /* ============ Structs ============ */
    struct LinearAuctionDetails {
        uint256 startTime;
        uint256 startPrice;
        uint256 pivotPrice;
    }

    /* ============ Constants ============ */
    uint256 constant public THIRTY_SECONDS = 30;
    uint256 constant public MAX_30_SECOND_PERIODS = 1000;

    /* ============ State Variables ============ */
    uint256 public timeToPivot;
    uint256 public auctionSpeed;
    mapping(address => LinearAuctionDetails) public linearAuctionDetails;

    /**
     * LinearAuction constructor
     *
     * @param _timeToPivot          Time spent in linear auction curve
     * @param _auctionSpeed         Time spent exploring 1% change in price
     */
    constructor(
        uint256 _timeToPivot,
        uint256 _auctionSpeed
    )
        public
        
    {
        timeToPivot = _timeToPivot;
        auctionSpeed = _auctionSpeed;
    }

    /*
     * Calculates the auction price parameters, targetting 1% slippage every 10 minutes. Fair value
     * placed in middle of price range.
     *
     * @param  _currentSetDollarAmount      The 18 decimal value of one currenSet
     * @param  _nextSetDollarAmount         The 18 decimal value of one nextSet
     * @param  _auctionPricePrecision       The auction library price precision
     */
    function calculateAuctionPriceParameters(
        uint256 _currentSetDollarAmount,
        uint256 _nextSetDollarAmount,
        uint256 _auctionPricePrecision
    )
        internal
    {
        // Determine fair value of nextSet/currentSet and put in terms of auction library price divisor
        uint256 fairValue = _nextSetDollarAmount.mul(_auctionPricePrecision).div(_currentSetDollarAmount);
        // Calculate how much one percent slippage from fair value is
        uint256 onePercentSlippage = fairValue.div(100);

        // Calculate how many time increments are in auctionTimeToPivot
        uint256 timeIncrements = timeToPivot.div(auctionSpeed);
        // Since we are targeting a 1% slippage every time increment the price range is defined as
        // the price of a 1% move multiplied by the amount of time increments in the auctionTimeToPivot
        // This value is then divided by two to get half the price range
        uint256 halfPriceRange = timeIncrements.mul(onePercentSlippage).div(2);

        // Auction start price is fair value minus half price range to center the auction at fair value
        linearAuctionDetails[msg.sender].startPrice = fairValue.sub(halfPriceRange);
        // Auction pivot price is fair value plus half price range to center the auction at fair value
        linearAuctionDetails[msg.sender].pivotPrice = fairValue.add(halfPriceRange);
    }

    /*
     * Calculate the current priceRatio for an auction given defined price and time parameters
     *
     * @param _startPrice           Starting price of auction
     * @param _pivotPrice           Pivot price of auction
     * @param _startTime            Starting timestamp of auction
     * @param _timeToPivot          Amount of time to reach pivot price from start of auction
     * @param _pricePrecision       Starting price ratio denominator
     * @return uint256              The price ratio numerator
     * @return uint256              The price ratio denominator
     */
    function getCurrentPriceRatio(
        uint256 _pricePrecision
    )
        internal
        view
        returns (uint256, uint256)
    {
        // Calculate how much time has elapsed since start of auction
        uint256 elapsed = block.timestamp.sub(linearAuctionDetails[msg.sender].startTime);
        uint256 startPrice = linearAuctionDetails[msg.sender].startPrice;
        uint256 pivotPrice = linearAuctionDetails[msg.sender].pivotPrice;

        // Initialize numerator and denominator
        uint256 priceNumerator = pivotPrice;
        uint256 currentPriceDivisor = _pricePrecision;

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
        if (elapsed <= timeToPivot) {
            // Calculate the priceNumerator as a linear function of time between _startPrice and
            // _auctionPivotPrice
            uint256 linearPriceDifference = pivotPrice.sub(startPrice);
            priceNumerator = startPrice.add(
                elapsed.mul(linearPriceDifference).div(timeToPivot)
            );
        } else {
            // Calculate how many 30 second increments have passed since pivot was reached
            uint256 thirtySecondPeriods = elapsed
                .sub(timeToPivot)
                .div(THIRTY_SECONDS);
            // Because after 1000 thirtySecondPeriods the priceDivisor would be 0 (causes revert)
            if (thirtySecondPeriods < MAX_30_SECOND_PERIODS) {
                // Calculate new denominator where the denominator decays at a rate of 0.1% of the ORIGINAL
                // priceDivisor per time increment (hence divide by 1000)
                currentPriceDivisor = _pricePrecision
                    .sub(thirtySecondPeriods
                        .mul(_pricePrecision)
                        .div(MAX_30_SECOND_PERIODS)
                    );
            } else {
                // Once denominator has fully decayed, fix it at 1
                currentPriceDivisor = 1;

                // Now priceNumerator just changes linearly, but with slope equal to the pivot price
                priceNumerator = pivotPrice.add(
                    pivotPrice.mul(thirtySecondPeriods.sub(MAX_30_SECOND_PERIODS))
                );
            }
        }

        return (priceNumerator, currentPriceDivisor);
    }
}