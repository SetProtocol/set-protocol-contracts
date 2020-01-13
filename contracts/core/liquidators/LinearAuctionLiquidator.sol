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

import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { IOracleWhiteList } from "../interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { Auction } from "./impl/Auction.sol";
import { LinearAuction } from "./impl/LinearAuction.sol";
import { Rebalance } from "../lib/Rebalance.sol";
import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";
import { TwoAssetPriceBoundedLinearAuction } from "./impl/TwoAssetPriceBoundedLinearAuction.sol";


/**
 * @title LinearAuctionLiquidator
 * @author Set Protocol
 *
 * Contract that holds all the state and functionality required for setting up, returning prices, and tearing
 * down linear auction rebalances for RebalancingSetTokens.
 */
contract LinearAuctionLiquidator is TwoAssetPriceBoundedLinearAuction, ILiquidator {
    using SafeMath for uint256;

    ICore public core;
    string public name;
    mapping(address => LinearAuction.State) public auctions;

    /* ============ Modifier ============ */
    modifier isValidSet() {
        requireValidSet(msg.sender);
        _;
    }

    /**
     * LinearAuctionLiquidator constructor
     *
     * @param _core                   Core instance
     * @param _oracleWhiteList        Oracle WhiteList instance
     * @param _auctionPeriod          Length of auction
     * @param _rangeStart             Percentage above FairValue to begin auction at
     * @param _rangeEnd               Percentage below FairValue to end auction at     
     * @param _name                   Descriptive name of Liquidator
     */
    constructor(
        ICore _core,
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd,
        string memory _name
    )
        public
        TwoAssetPriceBoundedLinearAuction(
            _oracleWhiteList,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd
        )
    {
        core = _core;
        name = _name;
    }

    /* ============ External Functions ============ */

    /**
     * Initiates a linear auction. Can only be called by a SetToken.
     *
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     * @param _startingCurrentSetQuantity   The currentSet quantity to rebalance
     * @param _liquidatorData                  Bytecode formatted data with liquidator-specific arguments
     */
    function startRebalance(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        bytes calldata _liquidatorData
    )
        external
        isValidSet
    {
        _liquidatorData; // Pass linting

        TwoAssetPriceBoundedLinearAuction.validateTwoAssetPriceBoundedAuction(
            _currentSet,
            _nextSet
        );

        LinearAuction.initializeLinearAuction(
            linearAuction(msg.sender),
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity
        );
    }

    /**
     * Reduces the remainingCurrentSet quantity and retrieves the current
     * bid price.
     * Can only be called by a SetToken during an active auction
     *
     * @param _quantity               The currentSetQuantity to rebalance
     * @return TokenFlow              Struct with array, inflow, and outflow data 
     */
    function placeBid(
        uint256 _quantity
    )
        external
        isValidSet
        returns (Rebalance.TokenFlow memory)
    {
        Auction.validateBidQuantity(auction(msg.sender), _quantity);

        Auction.reduceRemainingCurrentSets(auction(msg.sender), _quantity);

        return getBidPrice(msg.sender, _quantity);
    }

    /**
     * Retrieves the current auction price for the particular Set
     *
     * @param _set                    Address of the SetToken
     * @param _quantity               The currentSetQuantity to rebalance
     * @return TokenFlow              Struct with array, inflow, and outflow data
     */
    function getBidPrice(
        address _set,
        uint256 _quantity
    )
        public
        view
        returns (Rebalance.TokenFlow memory)
    {   
        return LinearAuction.getTokenFlow(linearAuction(_set), _quantity);
    }

    /**
     * Validates auction completion and clears auction state.
     */
    function settleRebalance() external isValidSet {

        Auction.validateAuctionCompletion(auction(msg.sender));

        clearAuctionState(msg.sender);
    }

    /**
     * Clears auction state.
     */
    function endFailedRebalance() external isValidSet {

        clearAuctionState(msg.sender);
    }

    /* ============ Getters Functions ============ */

    function hasRebalanceFailed(address _set) external view returns (bool) {
        return LinearAuction.hasAuctionFailed(linearAuction(_set));
    }

    function minimumBid(address _set) external view returns (uint256) {
        return auction(_set).minimumBid;
    }

    function remainingCurrentSets(address _set) external view returns (uint256) {
        return auction(_set).remainingCurrentSets;
    }

    function startingCurrentSets(address _set) external view returns (uint256) {
        return auction(_set).startingCurrentSets;
    }

    function getCombinedTokenArray(address _set) external view returns (address[] memory) {
        return auction(_set).combinedTokenArray;
    }

    function getCombinedCurrentSetUnits(address _set) external view returns (uint256[] memory) {
        return auction(_set).combinedCurrentSetUnits;
    }

    function getCombinedNextSetUnits(address _set) external view returns (uint256[] memory) {
        return auction(_set).combinedNextSetUnits;
    }

    function auctionPriceParameters(address _set)
        external
        view
        returns (RebalancingLibrary.AuctionPriceParameters memory)
    {
        return RebalancingLibrary.AuctionPriceParameters({
            auctionStartTime: auction(_set).startTime,
            auctionTimeToPivot: auctionPeriod,
            auctionStartPrice: linearAuction(_set).startPrice,
            auctionPivotPrice: linearAuction(_set).endPrice
        });
    }

    /* ============ Private Functions ============ */

    function clearAuctionState(address _set) private {
        delete auctions[_set];
    }

    function auction(address _set) private view returns(Auction.Setup storage) {
        return linearAuction(_set).auction;
    }

    function linearAuction(address _set) private view returns(LinearAuction.State storage) {
        return auctions[_set];
    }

    function requireValidSet(address _set) private view {
        require(
            core.validSets(_set),
            "LinearAuctionLiquidator: Invalid or disabled proposed SetToken address"
        );       
    }
}