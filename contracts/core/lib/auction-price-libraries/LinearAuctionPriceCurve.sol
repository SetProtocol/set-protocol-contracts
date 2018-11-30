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

pragma solidity 0.4.25;

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title LinearAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used in rebalancing auctions to calculate price based off of a linear curve
 */
contract LinearAuctionPriceCurve {
    using SafeMath for uint256;

    uint256 public priceDenominator;

    /*
     * Declare price denominator (or precision) of price curve
     *
     * @param  _priceDenominator        The priceDenominator you want this library to always return
     */
    constructor(
        uint256 _priceDenominator
    )
        public
    {
        // Set price to be returned by library
        priceDenominator = _priceDenominator;
    }

    /*
     * Validate any auction parameters that have library-specific restrictions
     *
     * @param  -- Unused auction time to pivot param to conform to IAuctionPriceCurve --
     * @param  -- Unused auction start price to conform to IAuctionPriceCurve --
     * @param  _auctionPivotPrice         The price at which auction curve changes from linear to exponential
     */
    function validateAuctionPriceParameters(
        uint256,
        uint256,
        uint256 _auctionPivotPrice
    )
        external
        view
    {
        // Require pivot price to be greater than 0.5 * price denominator
        // Equivalent to oldSet/newSet = 0.5
        require(
            _auctionPivotPrice > priceDenominator.div(2),
            "LinearAuctionPriceCurve.validateAuctionPriceParameters: Pivot price too low"
        );
         // Require pivot price to be less than 5 * price denominator
        // Equivalent to oldSet/newSet = 5
        require(
            _auctionPivotPrice < priceDenominator.mul(5),
            "LinearAuctionPriceCurve.validateAuctionPriceParameters: Pivot price too high"
        );
    }

    /*
     * Calculate the current priceRatio for an auction given defined price and time parameters
     *
     * @param  _auctionStartTime          Time of auction start
     * @param  _auctionTimeToPivot        Time until auction reaches pivot point
     * @param  -- Unused auction start price to conform to IAuctionPriceCurve --
     * @param  _auctionPivotPrice         The price at which auction curve changes from linear to exponential
     * @return uint256                    The auction price numerator
     * @return uint256                    The auction price denominator
     */
    function getCurrentPrice(
        uint256 _auctionStartTime,
        uint256 _auctionTimeToPivot,
        uint256,
        uint256 _auctionPivotPrice
    )
        external
        view
        returns (uint256, uint256)
    {
        // Calculate how much time has elapsed since start of auction
        uint256 elapsed = block.timestamp.sub(_auctionStartTime);

        // Initialize numerator and denominator
        uint256 priceNumerator = _auctionPivotPrice;
        uint256 currentPriceDenominator = priceDenominator;

        /*
         * This price curve can be broken down into three stages, 1) set up to allow a portion where managers
         * have control over the cadence of the auction, and then two more stages that are used to enforce finality
         * to the auction. The auction price, p(x), is defined by:
         *
         * p(x) = (priceNumerator/priceDenominator
         * 
         * In each stage either the priceNumerator or priceDenominator is manipulated to change p(x).The curve shape
         * in each stage is defined below.
         *
         * 1) Managers have the greatest control over stage 1. Here they define a linear curve that starts at zero
         * and terminates at the passed pivot price. The length of time it takes for the auction to reach the pivot
         * price is defined by the manager too, thus resulting in the following equation for the slope of the line:
         *
         * PriceNumerator(x) = auctionPivotPrice*(x/auctionTimeToPivot), where x is amount of time from auction start
         * 
         * 2) Stage 2 the protocol takes over to attempt to hasten/guarantee finality, this unfortunately decreases
         * the granularity of the auction price changes. In this stage the PriceNumerator remains fixed at the 
         * auctionPivotPrice. However, the priceDenominator decays at a rate equivalent to 0.1% of the ORIGINAL
         * priceDenominator every 30 secs. This leads to the following function relative to time:
         *
         * PriceDenominator(x) = priceDenominator-(0.01*priceDeonimator*((x-auctionTimeToPivot)/30)), where x is amount
         * of time from auction start. 
         *
         * Since we are decaying the denominator the price curve takes on the shape of e^x. Because of the limitations 
         * of integer math the denominator can only be decayed to 1. Hence in order to maintain simplicity in calculations
         * there is a third segment defined below.
         *
         * 3) The third segment is a simple linear calculation that changes the priceNumerator at the rate of the pivot
         * price every 30 seconds and fixes the priceDenominator at 1:
         *
         * PriceNumerator(x) = auctionPivotPrice + auctionPivotPrice*(x-auctionTimeToPivot-30000), where x is amount of
         * time from auction start and 30000 represents the amount of time spent in Stage 2
         */

        // If time hasn't passed to pivot use the user-defined curve
        if (elapsed <= _auctionTimeToPivot) {
            // Calculate the priceNumerator as a linear function of time between 0 and _auctionPivotPrice
            priceNumerator = elapsed.mul(_auctionPivotPrice).div(_auctionTimeToPivot);
        } else {
            // Calculate how many 30 second increments have passed since pivot was reached
            uint256 thirtySecondPeriods = elapsed.sub(_auctionTimeToPivot).div(30);

            // Because after 1000 thirtySecondPeriods the priceDenominator would be 0 (causes revert)
            if (thirtySecondPeriods < 1000) {
                // Calculate new denominator where the denominator decays at a rate of 0.1% of the ORIGINAL
                // priceDenominator per time increment (hence divide by 1000)
                currentPriceDenominator = priceDenominator.sub(thirtySecondPeriods.mul(priceDenominator).div(1000));                
            } else {
                // Once denominator has fully decayed, fix it at 1
                currentPriceDenominator = 1;

                // Now priceNumerator just changes linearly, but with slope equal to the pivot price
                priceNumerator = _auctionPivotPrice.add(_auctionPivotPrice.mul(thirtySecondPeriods.sub(1000)));
            }
        }

        return (priceNumerator, currentPriceDenominator);
    }
}
