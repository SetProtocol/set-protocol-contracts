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

// import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
// import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

// import { AddressArrayUtils } from "../../../lib/AddressArrayUtils.sol";
// import { GeneralAuction } from "../GeneralAuction.sol";
// import { ICore } from "../../interfaces/ICore.sol";
// import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
// import { LinearAuction } from "./LinearAuction.sol";
// import { SetTokenLibrary } from "../../lib/SetTokenLibrary.sol";


// /**
//  * @title LinearAuctionLiquidator
//  * @author Set Protocol
//  *
//  * Contract that holds all the state and functionality required for setting up, returning prices, and tearing
//  * down linear auction rebalances for RebalancingSetTokens.
//  */
// contract LinearAuctionLiquidator is
//     LinearAuction
// {
//     using SafeMath for uint256;
//     using AddressArrayUtils for address[];

//     ICore public coreInstance;
//     IOracleWhiteList public oracleWhiteListInstance;
//     string public name;
//     mapping(address => LinearAuction) public auctions;

//     /* ============ Modifier ============ */
//     modifier isValidSet() {
//         // Check that calling address is a valid set
//         require(
//             coreInstance.validSets(msg.sender),
//             "LinearAuctionLiquidator: Invalid or disabled proposed SetToken address"
//         );

//         _;
//     }

//     /**
//      * LinearAuctionLiquidator constructor
//      *
//      * @param _coreInstance                 Core instance
//      * @param _oracleWhiteListInstance      Oracle WhiteList instance
//      * @param _pricePrecision               Price precision used in auctions
//      * @param _timeToPivot                  Time spent in linear auction curve
//      * @param _auctionSpeed                 Time spent exploring 1% change in price
//      * @param _name                         Descriptive name of Liquidator
//      */
//     constructor(
//         ICore _coreInstance,
//         IOracleWhiteList _oracleWhiteListInstance,
//         uint256 _pricePrecision,
//         uint256 _timeToPivot,
//         uint256 _auctionSpeed,
//         string memory _name
//     )
//         public
//         LinearAuction(
//             _timeToPivot,
//             _auctionSpeed,
//             _pricePrecision
//         )
//     {
//         // TODO: Add % above fair value, % below fair value
//         // Set name
//         // Set core instance
//         // set oraclewhitelist
//     }

//     /* ============ External Functions ============ */

//     function processProposal(
//         ISetToken _currentSet,
//         ISetToken _nextSet
//     )
//         external
//         // isValidSet
//     {
//         // Check that all components in the rebalance have a matching oracle
//         address[] memory combinedTokenArray = getCombinedTokenArray(_currentSet, _nextSet);
//         require(
//             oracleWhiteListInstance.areValidAddresses(combinedTokenArray),
//             "LinearAuctionLiquidator.processProposal: Passed token does not have matching oracle."
//         );

//         // Check that prices are valid?
//     }

//     // Can only be called during proposal
//     // Should we place safeguards as to when it can be called?
//     function cancelProposal()
//         external
//         // isValidSet
//     {}

//     // Should we place safeguards as to when this can be called?
//     function startRebalance(
//         address _currentSet,
//         address _nextSet,
//         uint256 _startingCurrentSetQuantity
//     )
//         external
//         // isValidSet
//     {
//         initializeLinearAuction(
//             auctions[msg.sender],
//             _currentSet,
//             _nextSet,
//             _startingCurrentSetQuantity
//         );
//     }

//     function placeBid(
//         uint256 _quantity
//     )
//         external
//         // isValidSet
//         returns (address[] memory, uint256[] memory, uint256[] memory)
//     {
//         validateBidQuantity(_quantity);

//         // Update remainingCurrentSet figure to account for placed bid
//         reduceRemainingCurrentSets(auctions[msg.sender], _quantity);

//         return getBidPrice(_quantity);
//     }

//     function getBidPrice(
//         uint256 _quantity
//     )
//         public
//         // isValidSet
//         returns (address[] memory, uint256[] memory, uint256[] memory)
//     {
//         // Get bid conversion price, currently static placeholder for calling auctionlibrary
//         (
//             uint256 currentPriceRatioNumerator,
//             uint256 currentPriceRatioDenominator
//         ) = getCurrentPriceRatio(
//             pricePrecision
//         );

//         // Return arrays reprsenting token inflows and outflows required to complete bid at current
//         // price for passed in quantity
//         return createTokenFlowArrays(
//             _quantity,
//             currentPriceRatioNumerator,
//             currentPriceRatioDenominator
//         );
//     }

//     function settleRebalance()
//         external
//         // isValidSet
//     {
//         // Make sure all currentSets have been rebalanced
//         require(
//             !hasBiddableQuantity(auctions[msg.sender]),
//             "LinearAuctionLiquidator.settleRebalance: Rebalance not completed"
//         );

//         clearAuctionState();
//     }

//     function endFailedRebalance()
//         external
//         // isValidSet
//     {
//         clearAuctionState();
//     }

//     function hasRebalanceFailed()
//         external
//         view
//         // isValidSet
//         returns (bool)    
//     {
//         return hasAuctionFailed(auctions[msg.sender]);
//     }

//     /* ============ Getters Functions ============ */
//     function getCombinedTokenArray()
//         external
//         view
//         returns (address[] memory)
//     {
//         return auctions[msg.sender].combinedTokenArray;
//     }

//     function getCombinedCurrentSetUnits()
//         external
//         view
//         returns (uint256[] memory)
//     {
//         return auctions[msg.sender].combinedCurrentSetUnits;
//     }

//     function getCombinedNextSetUnits()
//         external
//         view
//         returns (uint256[] memory)
//     {
//         return auctions[msg.sender].combinedNextSetUnits;
//     }

//     /* ============ Internal Functions ============ */
//     function clearAuctionState()
//         private
//     {
//         delete auctions[msg.sender];
//     }
// }