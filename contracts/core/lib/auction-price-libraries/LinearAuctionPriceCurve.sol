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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title LinearAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used in rebalancing auctions to calculate price based off of a linear curve
 */


contract LinearAuctionPriceCurve {
    using SafeMath for uint256;

    /*
     * Calculate the current priceRatio for an auction given defined price and time parameters
     *
     * @param  _auctionStartTime          Time of auction start
     * @param  _auctionStartPrice         The price to start the auction at
     * @param  _curveCoefficient          The slope (or convexity) of the price curve
     * @return uint256                    Numerator of calculated price
     */
    function getCurrentPrice(
        uint256 _auctionStartTime,
        uint256 _auctionStartPrice,
        uint256 _curveCoefficient
    )
        external
        view
        returns (uint256)
    {
        // Calculate how much time has elapsed since start of auction and divide by
        // timeIncrement of 30 seconds, so price changes every 30 seconds
        uint256 elapsed = block.timestamp.sub(_auctionStartTime).div(30);

        return _curveCoefficient.mul(elapsed).add(_auctionStartPrice);
    }
}
