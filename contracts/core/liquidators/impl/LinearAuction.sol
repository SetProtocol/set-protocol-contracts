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
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { Auction } from "./Auction.sol";
import { Rebalance } from "../../lib/Rebalance.sol";


/**
 * @title LinearAuction
 * @author Set Protocol
 *
 * Library containing utility functions for computing auction Price for a linear price auction.
 */
contract LinearAuction is Auction {
    using SafeMath for uint256;

    /* ============ Structs ============ */
    struct State {
        Auction.Setup auction;
        uint256 endTime;
        uint256 startNumerator;
        uint256 endNumerator;
    }

    /* ============ State Variables ============ */
    uint256 public auctionPeriod; // Length in seconds of auction
    uint256 public rangeStart; // Percentage above FairValue to begin auction at
    uint256 public rangeEnd;  // Percentage below FairValue to end auction at

    /**
     * LinearAuction constructor
     *
     * @param _pricePrecision         Price precision used in auctions
     * @param _auctionPeriod          Length of auction
     * @param _rangeStart             Percentage above FairValue to begin auction at
     * @param _rangeEnd               Percentage below FairValue to end auction at
     */
    constructor(
        uint256 _pricePrecision,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd
    )
        public
        Auction(_pricePrecision)
        
    {
        auctionPeriod = _auctionPeriod;
        rangeStart = _rangeStart;
        rangeEnd = _rangeEnd;
    }

    /* ============ Internal Functions ============ */

    /**
     * Populates the linear auction struct following an auction initiation.
     *
     * @param _linearAuction                LinearAuction State object
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     * @param _startingCurrentSetQuantity   Quantity of currentSet to rebalance
     */
    function initializeLinearAuction(
        State storage _linearAuction,
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        internal
    {
        initializeAuction(
            _linearAuction.auction,
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity
        );

        uint256 fairValue = calculateFairValue(_currentSet, _nextSet);
        _linearAuction.startNumerator = calculateStartNumerator(fairValue);
        _linearAuction.endNumerator = calculateEndNumerator(fairValue);
        _linearAuction.endTime = block.timestamp.add(auctionPeriod);
    }

    /* ============ Internal View Functions ============ */

    /**
     * Returns the TokenFlow based on the current price
     */
    function getTokenFlow(
        State storage _linearAuction,
        uint256 _quantity
    )
        internal
        view
        returns (Rebalance.TokenFlow memory)
    {
        return Auction.calculateTokenFlow(
            _linearAuction.auction,
            _quantity,
            getPrice(_linearAuction)
        );        
    }

    /**
     * Returns the linear price based on the current timestamp
     */
    function getPrice(State storage _linearAuction) internal view returns (Rebalance.Price memory) {
        return Rebalance.composePrice(getNumerator(_linearAuction), Auction.pricePrecision);
    }

    /**
     * Auction failed is defined the timestamp breacnhing the auction end time and
     * the auction not being complete
     */
    function hasAuctionFailed(State storage _linearAuction) internal view returns(bool) {
        bool endTimeExceeded = block.timestamp >= _linearAuction.endTime;
        bool setsNotAuctioned = !hasBiddableQuantity(_linearAuction.auction);
        return (endTimeExceeded && setsNotAuctioned);        
    }

    /**
     * Returns the linear price based on the current timestamp
     *
     * @param _linearAuction            Linear Auction State object
     * @return price                    uint representing the current price
     */
    function getNumerator(State storage _linearAuction) internal view returns (uint256) {
        uint256 elapsed = block.timestamp.sub(_linearAuction.auction.startTime);
        uint256 range = _linearAuction.endNumerator.sub(_linearAuction.startNumerator);
        uint256 elapsedPrice = elapsed.mul(range).div(auctionPeriod);

        return _linearAuction.startNumerator.add(elapsedPrice);
    }

    /**
     * Calculates the fair value based on the USD values of the next and current Sets.
     */
    function calculateFairValue(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256)
    {
        uint256 currentSetUSDValue = calculateUSDValueOfSet(_currentSet);
        uint256 nextSetUSDValue = calculateUSDValueOfSet(_nextSet);

        return nextSetUSDValue.mul(Auction.pricePrecision).div(currentSetUSDValue);
    }

    /**
     * Calculates the linear auction start price
     */
    function calculateStartNumerator(uint256 _fairValue) internal view returns(uint256) {
        uint256 startRange = _fairValue.mul(rangeStart).div(100);
        return _fairValue.sub(startRange);
    }

    /**
     * Calculates the linear auction end price
     */
    function calculateEndNumerator(uint256 _fairValue) internal view returns(uint256) {
        uint256 endRange = _fairValue.mul(rangeEnd).div(100);
        return _fairValue.add(endRange);
    }

    /**
     * Unimplemented calculateUSDValue function.
     *
     * @param _set              Instance of SetToken
     * @return USDValue         USD Value of the Set Token
     */
    function calculateUSDValueOfSet(ISetToken _set) internal view returns(uint256);
}