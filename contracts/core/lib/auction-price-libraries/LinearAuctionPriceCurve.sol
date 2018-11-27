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
     * @param  _auctionStartPrice         The price to start the auction at
     * @param  _auctionPivotPrice         The price at which auction curve changes from linear to exponential
     * @return uint256                    The auction price numerator
     * @return uint256                    The auction price denominator
     */
    function getCurrentPrice(
        uint256 _auctionStartTime,
        uint256 _auctionTimeToPivot,
        uint256 _auctionStartPrice,
        uint256 _auctionPivotPrice
    )
        external
        view
        returns (uint256, uint256)
    {
        // Calculate how much time has elapsed since start of auction and divide by
        // timeIncrement of 30 seconds, so price changes every 30 seconds
        uint256 elapsed = block.timestamp.sub(_auctionStartTime).div(30);

        return (elapsed, priceDenominator);
    }
}
