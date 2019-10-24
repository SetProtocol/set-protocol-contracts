// /*
//     Copyright 2019 Set Labs Inc.

//     Licensed under the Apache License, Version 2.0 (the "License");
//     you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

//     Unless required by applicable law or agreed to in writing, software
//     distributed under the License is distributed on an "AS IS" BASIS,
//     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
//     limitations under the License.
// */

// pragma solidity 0.5.7;
// pragma experimental "ABIEncoderV2";

// import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

// import { IOracleWhiteList } from "../interfaces/IOracleWhiteList.sol";
// import { ISetToken } from "../interfaces/ISetToken.sol";
// import { Auction } from "./Auction";

// /**
//  * @title LinearAuction
//  * @author Set Protocol
//  *
//  * Library containing utility functions for calculating auction parameters and auction prices for
//  * linear auctions.
//  */
// contract LinearAuction is Auction {
//     using SafeMath for uint256;

//     /* ============ Structs ============ */
//     struct LinearAuction {
//         Auction.Auction auction;
//         uint256 endTime;
//         uint256 startPrice;
//         uint256 endPrice;
//     }

//     /* ============ State Variables ============ */
//     uint256 public auctionPeriod;
//     uint256 public rangeStart; // Percentage above FairValue to begin auction at
//     uint256 public rangeEnd;  // Percentage below FairValue to end auction at

//     IOracleWhiteList public oracleWhiteList;

//     /**
//      * LinearAuction constructor
//      *
//      * @param _auctionPeriod          Time spent in linear auction curve
//      */
//     constructor(
//         uint256 _pricePrecision,
//         uint256 _rangeStart,
//         uint256 _rangeEnd,
//         IOracleWhiteList _oracleWhiteList
//     )
//         public
//         Auction(_pricePrecision)
        
//     {
//         auctionPeriod = _auctionPeriod;
//         rangeStart = _rangeStart;
//         rangeEnd = _rangeEnd;
//         oracleWhiteList = _oracleWhiteList;
//     }

//     function initializeLinearAuction(
//         LinearAuction storage _linearAuction,
//         ISetToken _currentSet,
//         ISetToken _nextSet,
//         uint256 _startingCurrentSetQuantity
//     )
//         internal
//     {
//         // Initialize auction
//         initializeAuction(
//             _linearAuction.auction,
//             _currentSet,
//             _nextSet,
//             _startingCurrentSetQuantity
//         );

//         _linearAuction.endTime = block.timestamp.add(auctionPeriod);

//         uint256 fairValue = calculateFairValue(_currentSet, _nextSet);
//         _linearAuction.startPrice = calculateStartPrice(fairValue);
//         _linearAuction.endPrice = calculatePivotPrice(fairValue);
//     }

//     /* ============ Internal View Functions ============ */

//     function calculateStartPrice()
//         internal
//         view
//         returns(uint256)
//     {
//         uint256 fairValue = calculateFairValue();
//         uint256 startRange = fairValue.mul(rangeStart).div(100);

//         return fairValue.sub(startRange);
//     }

//     function calculatePivotPrice()
//         internal
//         view
//         returns(uint256)
//     {
//         uint256 fairValue = calculateFairValue();
//         uint256 endRange = fairValue.mul(rangeEnd).div(100);

//         return fairValue.add(endRange);
//     }

//     function calculateFairValue(
//         ISetToken _currentSet,
//         ISetToken _nextSet,
//     )
//         internal
//         view
//         returns (uint256)
//     {
//         // Calculate SetToken valuations
//         uint256 currentSetUSDValue = calculateSetTokenDollarValue(_currentSet, oracleWhiteList);
//         uint256 nextSetUSDValue = calculateSetTokenDollarValue(_nextSet, oracleWhiteList);

//         return nextSetUSDValue.mul(pricePrecision).div(currentSetUSDValue);
//     }

//     function getCurrentPriceRatio(
//         LinearAuction storage _linearAuction
//     )
//         internal
//         view
//         returns (uint256, uint256)
//     {
//         return (
//             getLinearPrice(_linearAuction),
//             pricePrecision
//         );
//     }

//     function hasAuctionFailed(
//         LinearAuction storage _linearAuction
//     )
//         internal
//         view
//         returns(bool)
//     {
//         // Calculate timestamp when pivot is reached
//         uint256 revertAuctionTime = _linearAuction.auction.startTime.add(auctionPeriod);

//         // Make sure auction has gone past pivot point
//         bool endTimeExceeded = block.timestamp >= revertAuctionTime;

//         // Make sure more than minimumBid amount of currentSets remains
//         bool setsNotAuctioned = !hasBiddableQuantity(_linearAuction);

//         return (endTimeExceeded && setsNotAuctioned);        
//     }

//     function hasBiddableQuantity(
//         LinearAuction storage _linearAuction
//     )
//         internal
//         view
//         returns(bool)
//     {
//         return _linearAuction.remainingCurrentSets >= _linearAuction.auction.minimumBid;
//     }

//     /*
//      * Calculate the current priceRatio for an auction given defined price and time parameters
//      *
//      * @param _startPrice           Starting price of auction
//      * @param _endPrice           Pivot price of auction
//      * @param _startTime            Starting timestamp of auction
//      * @param _auctionPeriod          Amount of time to reach pivot price from start of auction
//      * @param _pricePrecision       Starting price ratio denominator
//      * @return uint256              The price ratio numerator
//      */
//     function getLinearPrice(
//         LinearAuction storage _linearAuction
//     )
//         internal
//         view
//         returns (uint256)
//     {
//         // Calculate how much time has elapsed since start of auction
//         uint256 elapsed = block.timestamp.sub(_linearAuction.auction.startTime);
//         uint256 range = _linearAuction.endPrice.sub(_linearAuction.startPrice);

//         uint256 elapsedPrice = elapsed.mul(range).div(auctionPeriod);

//         // Calculate the priceNumerator as a linear function of time between _startPrice and
//         // _auctionPivotPrice
//         return startPrice.add(elapsedPrice);
//     }
// }