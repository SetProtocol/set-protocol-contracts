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

import { Auction } from "./Auction.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
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
        uint256 startPrice;
        uint256 endPrice;
    }

    /* ============ State Variables ============ */
    uint256 public auctionPeriod; // Length in seconds of auction

    /**
     * LinearAuction constructor
     *
     * @param _auctionPeriod          Length of auction
     */
    constructor(
        uint256 _auctionPeriod
    )
        public
    {
        auctionPeriod = _auctionPeriod;
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

        uint256 minimumBid = calculateMinimumBid(_linearAuction.auction, _currentSet, _nextSet);
        
        // remainingCurrentSets must be greater than minimumBid or no bidding would be allowed
        require(
            _startingCurrentSetQuantity.div(minimumBid) >= 100,
            "LinearAuction.initializeAuction: Minimum bid must be less than or equal to 1% of collateral."
        );

        _linearAuction.auction.minimumBid = minimumBid;

        _linearAuction.startPrice = calculateStartPrice(_linearAuction.auction, _currentSet, _nextSet);
        _linearAuction.endPrice = calculateEndPrice(_linearAuction.auction, _currentSet, _nextSet);

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
     * Auction failed is defined the timestamp breacnhing the auction end time and
     * the auction not being complete
     */
    function hasAuctionFailed(State storage _linearAuction) internal view returns(bool) {
        bool endTimeExceeded = block.timestamp >= _linearAuction.endTime;
        bool setsNotAuctioned = hasBiddableQuantity(_linearAuction.auction);

        return (endTimeExceeded && setsNotAuctioned);        
    }

    /**
     * Returns the price based on the current timestamp. Returns the endPrice
     * if time has exceeded the auction period
     *
     * @param _linearAuction            Linear Auction State object
     * @return price                    uint representing the current price
     */
    function getPrice(State storage _linearAuction) internal view returns (uint256) {
        uint256 elapsed = block.timestamp.sub(_linearAuction.auction.startTime);

        // If current time has elapsed 
        if (elapsed >= auctionPeriod) {
            return _linearAuction.endPrice;
        } else {
            uint256 range = _linearAuction.endPrice.sub(_linearAuction.startPrice);
            uint256 elapsedPrice = elapsed.mul(range).div(auctionPeriod);

            return _linearAuction.startPrice.add(elapsedPrice);
        }
    }

    /**
     * Abstract function that must be implemented.
     * Calculate the minimumBid allowed for the rebalance.
     *
     * @param _auction            Auction object
     * @param _currentSet         The Set to rebalance from
     * @param _nextSet            The Set to rebalance to
     * @return                    Minimum bid amount
     */
    function calculateMinimumBid(
        Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256);

    /**
     * Abstract function that must be implemented.
     * Calculates the linear auction start price
     */
    function calculateStartPrice(
        Auction.Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns(uint256);

    /**
     * Abstract function that must be implemented.
     * Calculates the linear auction end price
     */
    function calculateEndPrice(
        Auction.Setup storage _auction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns(uint256);
}