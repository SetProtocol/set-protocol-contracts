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
contract LinearAuction is Auction {
    using SafeMath for uint256;

    /* ============ Structs ============ */
    struct LinearAuction {
        Auction.Auction auction;
        uint256 startTime;
        uint256 endTime;
        uint256 startPrice;
        uint256 endPrice;
    }

    /* ============ Constants ============ */
    uint256 constant public THIRTY_SECONDS = 30;
    uint256 constant public MAX_30_SECOND_PERIODS = 1000;

    /* ============ State Variables ============ */
    uint256 public auctionPeriod;
    uint256 public auctionSpeed;

    uint256 public rangeStart;
    uint256 public rangeEnd;

    IOracleWhiteList public oracleWhiteList;

    /**
     * LinearAuction constructor
     *
     * @param _auctionPeriod          Time spent in linear auction curve
     */
    constructor(
        uint256 _auctionPeriod,
        uint256 _pricePrecision
    )
        public
        Auction(_pricePrecision)
        
    {
        auctionPeriod = _auctionPeriod;
        auctionSpeed = _auctionSpeed;

        // Add % starting price % above FV
        // Add % pivot price below FV
    }

    function initializeLinearAuction(
        LinearAuction storage _linearAuction,
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        internal
    {
        // Initialize auction
        initializeAuction(
            _linearAuction.auction,
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity
        );

        _linearAuction.startTime = block.timestamp;
        _linearAuction.endTime = block.timestamp.add(auctionPeriod);

        uint256 fairValue = calculateFairValue(_currentSet, _nextSet);
        _linearAuction.startPrice = calculateStartPrice(fairValue);
        _linearAuction.endPrice = calculatePivotPrice(fairValue);
    }

    /* ============ Internal View Functions ============ */

    function calculateStartPrice()
        internal
        view
        returns(uint256)
    {
        uint256 fairValue = calculateFairValue();
        uint256 startRange = fairValue.mul(rangeStart).div(100);

        return fairValue.sub(startRange);
    }

    function calculatePivotPrice()
        internal
        view
        returns(uint256)
    {
        uint256 fairValue = calculateFairValue();
        uint256 endRange = fairValue.mul(rangeEnd).div(100);

        return fairValue.add(endRange);
    }

    function calculateFairValue(
        ISetToken _currentSet,
        ISetToken _nextSet,
    )
        internal
        view
        returns (uint256)
    {
        // Calculate SetToken valuations
        uint256 currentSetUSDValue = calculateSetTokenDollarValue(_currentSet, oracleWhiteList);
        uint256 nextSetUSDValue = calculateSetTokenDollarValue(_nextSet, oracleWhiteList);

        return nextSetUSDValue.mul(pricePrecision).div(currentSetUSDValue);
    }

    function getCurrentPriceRatio(
        LinearAuction storage _linearAuction
    )
        internal
        view
        returns (uint256, uint256)
    {
        return (
            getNumerator(_linearAuction),
            pricePrecision
        );
    }

    /*
     * Calculate the current priceRatio for an auction given defined price and time parameters
     *
     * @param _startPrice           Starting price of auction
     * @param _endPrice           Pivot price of auction
     * @param _startTime            Starting timestamp of auction
     * @param _auctionPeriod          Amount of time to reach pivot price from start of auction
     * @param _pricePrecision       Starting price ratio denominator
     * @return uint256              The price ratio numerator
     */
    function getNumerator(
        LinearAuction storage _linearAuction
    )
        internal
        view
        returns (uint256)
    {
        // Calculate how much time has elapsed since start of auction
        uint256 elapsed = block.timestamp.sub(_linearAuction.auction.startTime);
        uint256 range = _linearAuction.endPrice.sub(_linearAuction.startPrice);

        uint256 elapsedPrice = elapsed.mul(range).div(auctionPeriod);

        // Calculate the priceNumerator as a linear function of time between _startPrice and
        // _auctionPivotPrice
        return startPrice.add(elapsedPrice);
    }
}