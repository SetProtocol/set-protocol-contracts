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

pragma solidity 0.4.24;


/**
 * @title ConstantAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used in rebalancing auctions to calculate price based off of a linear curve
 *
 */

contract ConstantAuctionPriceCurve {

    uint256 public constantPrice;

    /*
     * Declare price you want this library to return when queried
     *
     * @param  _price          The price you want this library to always return
     */
    constructor(
        uint256 _price
    )
        public
    {
        // Set price to be returned by library
        constantPrice = _price;
    }


    /*
     * Return constant price amount
     *
     * @param  _auctionStartTime          Time of auction start
     * @param  _auctionStartPrice         The price to start the auction at
     * @param  _curveCoefficient          The slope (or convexity) of the price curve
     */
    function getCurrentPrice(
        uint256 _auctionStartTime,
        uint256 _auctionStartPrice,
        uint256 _curveCoefficient
    )
        external
        returns (uint256)
    {
        return constantPrice;
    }
}
