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


/**
 * @title IAuctionPriceCurve
 * @author Set Protocol
 *
 * The IAuctionPriceCurve interface provides a structured way to interact with any AuctionLibrary
 */
interface IAuctionPriceCurve {

    /*
     * Getter for priceDenominator variable on Auction Price Curve Library
     */
    function priceDenominator()
        external
        view
        returns (uint256);

    /*
     * Validate any auction parameters that have library-specific restrictions
     *
     * @param  _auctionTimeToPivot        Time until auction reaches pivot point
     * @param  _auctionStartPrice         The price to start the auction at
     * @param  _auctionPivotPrice         The price at which auction curve changes from linear to exponential
     */

    function validateAuctionPriceParameters(
        uint256 _auctionTimeToPivot,
        uint256 _auctionStartPrice,
        uint256 _auctionPivotPrice
    )
        external
        view;

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
        returns (uint256, uint256);
}
