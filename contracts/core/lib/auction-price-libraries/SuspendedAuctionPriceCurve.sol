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
import { RebalancingLibrary } from "../RebalancingLibrary.sol";
import { SuspendedLinearAuctionLibrary } from "../SuspendedLinearAuctionLibrary.sol";


/**
 * @title SuspendedAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used in rebalancing auctions to calculate price based off of a linear curve
 */
contract SuspendedAuctionPriceCurve {
    using SafeMath for uint256;

    uint256 public priceDivisor;
    uint256 public minAuctionFailTime;
    uint256 public maxAuctionFailTime;

    /*
     * Declare price denominator (or precision) of price curve
     *
     * @param  _priceDivisor            The priceDivisor you want this library to always return
     * TODO: Add javadocs
     */
    constructor(
        uint256 _priceDivisor,
        uint256 _minAuctionFailTime,
        uint256 _maxAuctionFailTime
    )
        public
    {
        // Set price to be returned by library
        priceDivisor = _priceDivisor;
        minAuctionFailTime = _minAuctionFailTime;
        maxAuctionFailTime = _maxAuctionFailTime;
    }

    /*
     * Validate any auction parameters that have library-specific restrictions
     *
     * @param _auctionPriceParameters   Struct containing relevant auction price parameters
     */
    function validateAuctionPriceParameters(
        RebalancingLibrary.AuctionPriceParameters memory _auctionPriceParameters,
        SuspendedLinearAuctionLibrary.SuspendedPriceParameters memory _suspendedPriceParameters
    )
        public
        view
    {
        // Require that auction pivot time is greater than auction start time
        require(
            _auctionPriceParameters.auctionTimeToPivot > _auctionPriceParameters.auctionStartTime,
            "SuspendedAuctionPriceCurve.validateAuctionPriceParameters: Start time greater than pivot time"
        );

        // Require that auction pivot price is greater than auction start price
        require(
            _auctionPriceParameters.auctionPivotPrice > _auctionPriceParameters.auctionStartPrice,
            "SuspendedAuctionPriceCurve.validateAuctionPriceParameters: Start price greater than pivot price"
        );

        // Require that auction fail time is greater than the minimum auction fail time
        require(
            _suspendedPriceParameters.auctionFailTime >= minAuctionFailTime,
            "SuspendedAuctionPriceCurve.validateAuctionPriceParameters: Fail time must be greater than min fail time"
        );

        // Require that auction fail time is greater than the minimum auction fail time
        require(
            _suspendedPriceParameters.auctionFailTime <= maxAuctionFailTime,
            "SuspendedAuctionPriceCurve.validateAuctionPriceParameters: Fail time must be less than max fail time"
        );

        // Are there any requirements that relate to the price divisor re: the slope?
        // We may need to check start price
    }

    /*
     * Calculate the current priceRatio for an auction given defined price and time parameters
     *
     * @param _auctionPriceParameters     Struct containing relevant auction price parameters
     * @param _suspendedPriceParameters   Struct containing relevant suspended price parameters
     * @return uint256                    The auction price numerator
     * @return uint256                    The auction price denominator
     */
    function getCurrentPrice(
        RebalancingLibrary.AuctionPriceParameters memory _auctionPriceParameters,
        SuspendedLinearAuctionLibrary.SuspendedPriceParameters memory _suspendedPriceParameters
    )
        public
        view
        returns (uint256, uint256)
    {
        uint256 priceNumerator = _suspendedPriceParameters.lastCriticalBidNumerator;

        // Suspension is based on the last critical bid time
        uint256 suspensionEndTime = _suspendedPriceParameters.lastCriticalBidTime
            .add(_suspendedPriceParameters.suspensionTime);
        
        // If the current timestamp has elapsed the suspensionTime, we are searching
        if (block.timestamp > suspensionEndTime) {
            // Time since end of suspension
            uint256 timeSinceSuspensionEnd = block.timestamp.sub(suspensionEndTime);

            // TODO: Are there cases where the slope doesn't work?
            (
                uint256 priceDifference,
                uint256 timeDifference
            ) = getNumeratorSlope(
                _auctionPriceParameters.auctionStartPrice, 
                _auctionPriceParameters.auctionPivotPrice,           
                _auctionPriceParameters.auctionStartTime,
                _auctionPriceParameters.auctionTimeToPivot
            );

            // If isSearching, then searchingCumulative = slope * block.timestamp - timeSinceSuspension
            // TODO: There might be a chance that this ends up being 0
            uint256 accumulatedPriceMovement = timeSinceSuspensionEnd.mul(priceDifference).div(timeDifference);
            priceNumerator = priceNumerator.add(accumulatedPriceMovement);
        }

        return (priceNumerator, priceDivisor);
    }

    function getNumeratorSlope(
        uint256 priceStart,
        uint256 priceEnd,
        uint256 timeStart,
        uint256 timeEnd
    ) 
        internal
        pure
        returns (uint256, uint256)
    {
        // Need to ensure that y2 > y1 and x2 > x1
        uint256 priceDifference = priceEnd.sub(priceStart);
        uint256 timeDifference = timeEnd.sub(timeStart);
        return (priceDifference, timeDifference);
    }
}
