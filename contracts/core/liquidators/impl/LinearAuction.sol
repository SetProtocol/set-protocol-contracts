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
import { SetUSDValuation } from "./SetUSDValuation.sol";


/**
 * @title LinearAuction
 * @author Set Protocol
 *
 * Library containing utility functions for computing and auction prices for a linearly improving price auction.
 */
contract LinearAuction is Auction {
    using SafeMath for uint256;

    /* ============ Structs ============ */
    struct State {
        Auction.Setup auction;
        uint256 endTime;
        uint256 startPrice;
        uint256 endPrice;
    }

    /* ============ State Variables ============ */
    uint256 public auctionPeriod; // Length in seconds of auction
    uint256 public rangeStart; // Percentage above FairValue to begin auction at
    uint256 public rangeEnd;  // Percentage below FairValue to end auction at
    IOracleWhiteList public oracleWhiteList; // Instance of the oracle list

    /**
     * LinearAuction constructor
     *
     * @param _pricePrecision         Price precision used in auctions
     * @param _auctionPeriod          Length of auction
     * @param _rangeStart             Percentage above FairValue to begin auction at
     * @param _rangeEnd               Percentage below FairValue to end auction at
     * @param _oracleWhiteList        Price precision used in auctions
     */
    constructor(
        uint256 _pricePrecision,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd,
        IOracleWhiteList _oracleWhiteList
    )
        public
        Auction(_pricePrecision)
        
    {
        auctionPeriod = _auctionPeriod;
        rangeStart = _rangeStart;
        rangeEnd = _rangeEnd;
        oracleWhiteList = _oracleWhiteList;
    }

    /* ============ Internal Functions ============ */

    /**
     * Validates the Sets are supposed by the oracle.
     *
     * @param _linearAuction                LinearAuction State object
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     */
    function validateSets(
        State storage _linearAuction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
    {
        // Check that all components in the rebalance have a matching oracle
        address[] memory combinedTokenArray = getCombinedTokenArray(_currentSet, _nextSet);
        require(
            oracleWhiteList.areValidAddresses(combinedTokenArray),
            "LinearAuctionLiquidator.processProposal: Passed token does not have matching oracle."
        );
    }

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
        _linearAuction.startPrice = calculateStartPrice(fairValue);
        _linearAuction.endPrice = calculateEndPrice(fairValue);
        _linearAuction.endTime = block.timestamp.add(auctionPeriod);
    }

    /* ============ Internal View Functions ============ */

    /**
     * Returns the TokenFlow based on the current price
     *
     * @param _linearAuction          Linear Auction State object
     * @return TokenFlow              Object struct containing tokens, inflow, and outflow
     */
    function getTokenFlow(
        State storage _linearAuction,
        uint256 _quantity
    )
        internal
        view
        returns (Rebalance.TokenFlow memory)
    {
        // Return arrays reprsenting token inflows and outflows required to complete bid at current
        // price for passed in quantity
        return Auction.calculateTokenFlow(
            _linearAuction.auction,
            _quantity,
            getPrice(_linearAuction)
        );        
    }

    /**
     * Returns the linear price based on the current timestamp
     *
     * @param _linearAuction            Linear Auction State object
     * @return price                    uint representing the current price
     */
    function getPrice(
        State storage _linearAuction
    )
        internal
        view
        returns (Rebalance.Price memory)
    {
        return Rebalance.composePrice(getNumerator(_linearAuction), Auction.pricePrecision);
    }

    /**
     * Auction failed is defined the timestamp breacnhing the auction end time and
     * the auction not being complete
     *
     * @param _linearAuction    Linear Auction State object
     * @return hasFailed        Boolean whether the auction has failed
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
        uint256 range = _linearAuction.endPrice.sub(_linearAuction.startPrice);
        uint256 elapsedPrice = elapsed.mul(range).div(auctionPeriod);

        return _linearAuction.startPrice.add(elapsedPrice);
    }

    /**
     * Calculates the fair value based on the USD values of the next and current Sets.
     * TODO: Add formula for fair value
     *
     * @param _currentSet             The Set to rebalance from
     * @param _nextSet                The Set to rebalance to
     * @return fairValue              USD value
     */
    function calculateFairValue(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256)
    {
        uint256 currentSetUSDValue = SetUSDValuation.calculateSetTokenDollarValue(_currentSet, oracleWhiteList);
        uint256 nextSetUSDValue = SetUSDValuation.calculateSetTokenDollarValue(_nextSet, oracleWhiteList);

        return nextSetUSDValue.mul(Auction.pricePrecision).div(currentSetUSDValue);
    }

    /**
     * Calculates the linear auction start price
     *
     * @param _fairValue              Fair value figure
     * @return startPrice             Value to start auction at
     */
    function calculateStartPrice(uint256 _fairValue) internal view returns(uint256) {
        uint256 startRange = _fairValue.mul(rangeStart).div(100);
        return _fairValue.sub(startRange);
    }

    /**
     * Calculates the linear auction end price
     *
     * @param _fairValue              Fair value figure
     * @return startPrice             Value to start auction at
     */
    function calculateEndPrice(uint256 _fairValue) internal view returns(uint256) {
        uint256 endRange = _fairValue.mul(rangeEnd).div(100);
        return _fairValue.add(endRange);
    }
}