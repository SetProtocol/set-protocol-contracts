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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ICore } from "../interfaces/ICore.sol";
import { IOracleWhiteList } from "../interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { LinearAuction } from "./linear-auction/LinearAuction.sol";


/**
 * @title LinearAuctionLiquidator
 * @author Set Protocol
 *
 * Contract that holds all the state and functionality required for setting up, returning prices, and tearing
 * down linear auction rebalances for RebalancingSetTokens.
 */
contract LinearAuctionLiquidator is
    LinearAuction
{
    using SafeMath for uint256;

    ICore public core;
    string public name;
    mapping(address => LinearAuction.State) public auctions;

    /* ============ Modifier ============ */
    modifier isValidSet() {
        // Check that calling address is a valid set
        require(
            core.validSets(msg.sender),
            "LinearAuctionLiquidator: Invalid or disabled proposed SetToken address"
        );

        _;
    }

    /**
     * LinearAuctionLiquidator constructor
     *
     * @param _core                 Core instance
     * @param _oracleWhiteList      Oracle WhiteList instance
     * @param _pricePrecision               Price precision used in auctions
     * @param _name                         Descriptive name of Liquidator
     */
    constructor(
        ICore _core,
        IOracleWhiteList _oracleWhiteList,
        uint256 _pricePrecision,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd,
        string memory _name
    )
        public
        LinearAuction(
            _pricePrecision,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd,
            _oracleWhiteList            
        )
    {
        core = _core;
        name = _name;
    }

    /* ============ External Functions ============ */

    function processProposal(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        external
        // isValidSet
    {
        // Check that all components in the rebalance have a matching oracle
        address[] memory combinedTokenArray = getCombinedTokenArray(_currentSet, _nextSet);
        require(
            oracleWhiteList.areValidAddresses(combinedTokenArray),
            "LinearAuctionLiquidator.processProposal: Passed token does not have matching oracle."
        );

        // Check that prices are valid?
    }

    // Can only be called during proposal
    // Should we place safeguards as to when it can be called?
    function cancelProposal()
        external
        // isValidSet
    {}

    // Should we place safeguards as to when this can be called?
    function startRebalance(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
        // isValidSet
    {
        initializeLinearAuction(
            auctions[msg.sender],
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity
        );
    }

    function placeBid(
        uint256 _quantity
    )
        external
        // isValidSet
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        validateBidQuantity(auctions[msg.sender], _quantity);

        reduceRemainingCurrentSets(auctions[msg.sender], _quantity);

        return getBidPrice(_quantity);
    }

    function getBidPrice(
        uint256 _quantity
    )
        public
        // isValidSet
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        // Get bid conversion price, currently static placeholder for calling auctionlibrary
        (
            uint256 currentPriceRatioNumerator,
            uint256 currentPriceRatioDenominator
        ) = getCurrentPriceRatio(
            auctions[msg.sender]
        );

        // Return arrays reprsenting token inflows and outflows required to complete bid at current
        // price for passed in quantity
        return createTokenFlowArrays(
            auctions[msg.sender].auction,
            _quantity,
            currentPriceRatioNumerator,
            currentPriceRatioDenominator
        );
    }

    function settleRebalance()
        external
        // isValidSet
    {
        // Make sure all currentSets have been rebalanced
        require(
            !hasBiddableQuantity(auctions[msg.sender]),
            "LinearAuctionLiquidator.settleRebalance: Rebalance not completed"
        );

        clearAuctionState();
    }

    function endFailedRebalance()
        external
        // isValidSet
    {
        clearAuctionState();
    }

    function hasRebalanceFailed()
        external
        view
        // isValidSet
        returns (bool)    
    {
        return hasAuctionFailed(auctions[msg.sender]);
    }

    /* ============ Getters Functions ============ */
    function getCombinedTokenArray() external view returns (address[] memory) {
        return auctions[msg.sender].auction.combinedTokenArray;
    }

    function getCombinedCurrentSetUnits() external view returns (uint256[] memory) {
        return auctions[msg.sender].auction.combinedCurrentSetUnits;
    }

    function getCombinedNextSetUnits() external view returns (uint256[] memory) {
        return auctions[msg.sender].auction.combinedNextSetUnits;
    }

    /* ============ Internal Functions ============ */
    function clearAuctionState()
        private
    {
        delete auctions[msg.sender];
    }
}