/*
    Copyright 2020 Set Labs Inc.

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

import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { BoundsLibrary } from "set-protocol-contract-utils/contracts/lib/BoundsLibrary.sol";

import { Auction } from "./impl/Auction.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { IOracleWhiteList } from "../interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { LinearAuction } from "./impl/LinearAuction.sol";
import { Rebalance } from "../lib/Rebalance.sol";
import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";
import { TWAPAuction } from "./twap-impl/TWAPAuction.sol";
import { TWAPAuctionGetters } from "./twap-impl/TWAPAuctionGetters.sol";
import { TwoAssetPriceBoundedLinearAuction } from "./impl/TwoAssetPriceBoundedLinearAuction.sol";


/**
 * @title TWAPLiquidator
 * @author Set Protocol
 *
 * Contract that holds all the state and functionality required for setting up, returning prices, and tearing
 * down TWAP rebalances for RebalancingSetTokens.
 */
contract TWAPLiquidator is
    ILiquidator,
    TWAPAuction,
    TWAPAuctionGetters,
    Ownable
{
    using SafeMath for uint256;

    ICore public core;
    string public name;
    mapping(address => TWAPAuction.TWAPState) public auctions;

    /* ============ Modifier ============ */
    modifier isValidSet() {
        requireValidSet(msg.sender);
        _;
    }

    /**
     * TWAPLiquidator constructor
     *
     * @param _core                   Core instance
     * @param _oracleWhiteList        Oracle WhiteList instance
     * @param _auctionPeriod          Length of auction in seconds
     * @param _rangeStart             Percentage above FairValue to begin auction at
     * @param _rangeEnd               Percentage below FairValue to end auction at     
     * @param _assetPairHashes        List of asset pair unique identifiers
     * @param _assetPairBounds        List of asset pair USD-denominated chunk auction size bounds
     * @param _name                   Descriptive name of Liquidator
     */
    constructor(
        ICore _core,
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd,
        bytes32[] memory _assetPairHashes,
        BoundsLibrary.Bounds[] memory _assetPairBounds,
        string memory _name
    )
        public
        TWAPAuction(
            _oracleWhiteList,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd,
            _assetPairHashes,
            _assetPairBounds
        )
    {
        core = _core;
        name = _name;
    }

    /* ============ External Functions ============ */

    /**
     * Initiates a TWAP auction. Can only be called by a SetToken.
     *
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     * @param _startingCurrentSetQuantity   The currentSet quantity to rebalance
     * @param _liquidatorData               Bytecode formatted data with TWAPLiquidator-specific arguments
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
        // Validates only 2 components are involved and are supported by oracles
        TwoAssetPriceBoundedLinearAuction.validateTwoAssetPriceBoundedAuction(
            _currentSet,
            _nextSet
        );

        // Retrieve the chunk auction size and auction period from liquidator data.
        TWAPAuction.TWAPLiquidatorData memory twapLiquidatorData = TWAPAuction.parseLiquidatorData(_liquidatorData);

        // Chunk size must be within bounds and total rebalance length must be below fail auction time
        TWAPAuction.validateLiquidatorData(
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            twapLiquidatorData
        );

        // Initializes TWAP Auction and commits to TWAP state
        TWAPAuction.initializeTWAPAuction(
            auctions[msg.sender],
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            twapLiquidatorData
        );
    }

    /**
     * Reduces the remainingCurrentSet quantity and retrieves the current
     * bid price for the chunk auction. If this auction completes the chunkAuction,
     * the lastChunkAuction parameter is updated.
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

        // If the auction is complete, update the chunk auction end time to the present timestamp
        if (!hasBiddableQuantity(auction(msg.sender))) {
            twapAuction(msg.sender).lastChunkAuctionEnd = block.timestamp;    
        }

        return getBidPrice(msg.sender, _quantity);
    }

    /**
     * Retrieves the current chunk auction price for the particular Set
     *
     * @param _set                    Address of the SetToken
     * @param _quantity               The chunk auction's currentSetQuantity to rebalance
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
        return LinearAuction.getTokenFlow(chunkAuction(_set), _quantity);
    }

    /**
     * Initiates the next chunk auction. Callable by anybody.
     *
     * @param _set                    Address of the RebalancingSetToken
     */
    function iterateChunkAuction(address _set) external {
        validateNextChunkAuction(twapAuction(_set));

        auctionNextChunk(twapAuction(_set));
    }

    /**
     * Validates auction completion and clears auction state. Callable only by a SetToken.
     */
    function settleRebalance() external isValidSet {
        require(
            !(TWAPAuction.isRebalanceActive(twapAuction(msg.sender))),
            "TWAPLiquidator: Rebalance must be complete"
        );

        clearAuctionState(msg.sender);
    }

    /**
     * Clears auction state.
     */
    function endFailedRebalance() external isValidSet {
        clearAuctionState(msg.sender);
    }

    /**
     * Admin function to modify chunk sizes for an asset pair. 
     *
     * @param _assetOne             Address of the first asset
     * @param _assetTwo             Address of the second asset
     * @param _assetPairBounds      Asset pair USD-denominated chunk auction size bounds
     */
    function setChunkSizeBounds(
        address _assetOne,
        address _assetTwo,
        BoundsLibrary.Bounds memory _assetPairBounds
    )
        public
        onlyOwner
    {
        bytes32 pairHash = TWAPAuction.getAssetPairHash(_assetOne, _assetTwo);

        require(
            BoundsLibrary.isValid(_assetPairBounds),
            "TWAPLiquidator: Bounds invalid"
        );

        chunkSizeWhiteList[pairHash] = _assetPairBounds;
    }

    /* ============ Getters Functions ============ */

    function hasRebalanceFailed(address _set) external view returns (bool) {
        return LinearAuction.hasAuctionFailed(chunkAuction(_set));
    }

    function auctionPriceParameters(address _set)
        external
        view
        returns (RebalancingLibrary.AuctionPriceParameters memory)
    {
        return RebalancingLibrary.AuctionPriceParameters({
            auctionStartTime: auction(_set).startTime,
            auctionTimeToPivot: auctionPeriod,
            auctionStartPrice: chunkAuction(_set).startPrice,
            auctionPivotPrice: chunkAuction(_set).endPrice
        });
    }

    /* ============ Private Functions ============ */

    function clearAuctionState(address _set) private {
        delete auctions[_set];
    }

    function twapAuction(address _set) internal view returns(TWAPAuction.TWAPState storage) {
        return auctions[_set];
    }

    function chunkAuction(address _set) internal view returns(LinearAuction.State storage) {
        return twapAuction(_set).chunkAuction;
    }

    function auction(address _set) internal view returns(Auction.Setup storage) {
        return chunkAuction(_set).auction;
    }

    function requireValidSet(address _set) private view {
        require(
            core.validSets(_set),
            "TWAPLiquidator: Invalid or disabled proposed SetToken address"
        );       
    }
}