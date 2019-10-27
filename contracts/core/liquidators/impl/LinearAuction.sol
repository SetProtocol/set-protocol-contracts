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
import { SetValuation } from "./SetValuation.sol";

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
    struct State {
        Auction.Setup auction;
        uint256 endTime;
        uint256 startPrice;
        uint256 endPrice;
    }

    /* ============ State Variables ============ */
    uint256 public auctionPeriod;
    uint256 public rangeStart; // Percentage above FairValue to begin auction at
    uint256 public rangeEnd;  // Percentage below FairValue to end auction at

    IOracleWhiteList public oracleWhiteList;

    /**
     * LinearAuction constructor
     *
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

    function validateSets(
        State storage _linearAuction,
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
    {
        // Check that all components in the rebalance have a matching oracle
        address[] memory combinedTokenArray = getCombinedTokenArray(_currentSet, _nextSet);
        require(
            oracleWhiteList.areValidAddresses(combinedTokenArray),
            "LinearAuctionLiquidator.processProposal: Passed token does not have matching oracle."
        );
    }

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

        _linearAuction.endTime = block.timestamp.add(auctionPeriod);

        uint256 fairValue = calculateFairValue(_currentSet, _nextSet);
        _linearAuction.startPrice = calculateStartPrice(fairValue);
        _linearAuction.endPrice = calculateEndPrice(fairValue);
    }

    function validateBidQuantity(
        State storage _linearAuction,
        uint256 _quantity
    )
        internal
        view
    {
        super.validateBidQuantity(_linearAuction.auction, _quantity);
    }

    function reduceRemainingCurrentSets(
        State storage _linearAuction,
        uint256 _quantity
    )
        internal
    {
        super.reduceRemainingCurrentSets(_linearAuction.auction, _quantity);
    }

    function validateAuctionCompletion(
        State storage _linearAuction
    )
        internal
        view
    {
        // Make sure all currentSets have been rebalanced
        require(
            !hasBiddableQuantity(_linearAuction),
            "LinearAuctionLiquidator.settleRebalance: Rebalance not completed"
        );
    }

    /* ============ Internal View Functions ============ */

    function calculateFairValue(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (uint256)
    {
        uint256 currentSetUSDValue = SetValuation.calculateSetTokenDollarValue(_currentSet, oracleWhiteList);
        uint256 nextSetUSDValue = SetValuation.calculateSetTokenDollarValue(_nextSet, oracleWhiteList);

        return nextSetUSDValue.mul(pricePrecision).div(currentSetUSDValue);
    }

    function calculateStartPrice(uint256 _fairValue) internal view returns(uint256) {
        uint256 startRange = _fairValue.mul(rangeStart).div(100);
        return _fairValue.sub(startRange);
    }

    function calculateEndPrice(uint256 _fairValue) internal view returns(uint256) {
        uint256 endRange = _fairValue.mul(rangeEnd).div(100);
        return _fairValue.add(endRange);
    }

    function getPricedTokenFlows(
        State storage _linearAuction
    )
        internal
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        // Get bid conversion price, currently static placeholder for calling auctionlibrary
        (
            uint256 currentPriceRatioNumerator,
            uint256 currentPriceRatioDenominator
        ) = getCurrentPriceRatio(
            _linearAuction
        );

        // Return arrays reprsenting token inflows and outflows required to complete bid at current
        // price for passed in quantity
        return createTokenFlowArrays(
            _linearAuction.auction,
            _quantity,
            currentPriceRatioNumerator,
            currentPriceRatioDenominator
        );        
    }


    function getCurrentPriceRatio(
        State storage _linearAuction
    )
        internal
        view
        returns (uint256, uint256)
    {
        return (
            getLinearPrice(_linearAuction),
            pricePrecision
        );
    }

    function hasAuctionFailed(State storage _linearAuction) internal view returns(bool) {
        uint256 revertAuctionTime = _linearAuction.endTime;

        bool endTimeExceeded = block.timestamp >= revertAuctionTime;
        bool setsNotAuctioned = !hasBiddableQuantity(_linearAuction);
        return (endTimeExceeded && setsNotAuctioned);        
    }

    function hasBiddableQuantity(State storage _linearAuction) internal view returns(bool) {
        return _linearAuction.auction.remainingCurrentSets >= _linearAuction.auction.minimumBid;
    }

    function getLinearPrice(State storage _linearAuction) internal view returns (uint256) {
        uint256 elapsed = block.timestamp.sub(_linearAuction.auction.startTime);
        uint256 range = _linearAuction.endPrice.sub(_linearAuction.startPrice);
        uint256 elapsedPrice = elapsed.mul(range).div(auctionPeriod);

        return _linearAuction.startPrice.add(elapsedPrice);
    }
}