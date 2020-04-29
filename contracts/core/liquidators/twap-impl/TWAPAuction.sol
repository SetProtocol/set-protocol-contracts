/*
    Copyright 2020 Set Labs Inc.

    Licensed under the Apache License,
        Version 2.0 (the "License");
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
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";
import { BoundsLibrary } from "set-protocol-contract-utils/contracts/lib/BoundsLibrary.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

import { Auction } from "../impl/Auction.sol";
import { LinearAuction } from "../impl/LinearAuction.sol";
import { LiquidatorUtils } from "../utils/LiquidatorUtils.sol";
import { IOracleWhiteList } from "../../../core/interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../../../core/interfaces/ISetToken.sol";
import { IRebalancingSetTokenV3 } from "../../../core/interfaces/IRebalancingSetTokenV3.sol";
import { TwoAssetPriceBoundedLinearAuction } from "../impl/TwoAssetPriceBoundedLinearAuction.sol";


/**
 * @title TWAPAuction
 * @author Set Protocol
 *
 * Contract for executing TWAP Auctions fropm initializing to moving to the next chunk auction. Inherits from
 * TwoAssetPriceBoundedLinearAuction
 */
contract TWAPAuction is TwoAssetPriceBoundedLinearAuction {
    using SafeMath for uint256;
    using CommonMath for uint256;
    using AddressArrayUtils for address[];
    using BoundsLibrary for BoundsLibrary.Bounds;

    /* ============ Structs ============ */

    struct TWAPState {
        LinearAuction.State chunkAuction;
        uint256 orderSize;
        uint256 orderRemaining;
        uint256 lastChunkAuctionEnd;
        uint256 chunkAuctionPeriod;
        uint256 chunkSize;
    }

    struct TWAPLiquidatorData {
        uint256 usdChunkSize;
        uint256 chunkAuctionPeriod;
    }

    /* ============ Constants ============ */

    // Auction completion buffer assumes completion potentially 2% after fair value when auction started
    uint256 constant AUCTION_COMPLETION_BUFFER = 2;

    /* ============ State Variables ============ */

    mapping(bytes32 => BoundsLibrary.Bounds) public chunkSizeWhiteList;
    uint256 public expectedChunkAuctionLength;

    /* ============ Constructor ============ */

    /**
     * TWAPAuction constructor
     *
     * @param _oracleWhiteList        OracleWhiteList used by liquidator
     * @param _auctionPeriod          Length of auction
     * @param _rangeStart             Percentage below FairValue to begin auction at
     * @param _rangeEnd               Percentage above FairValue to end auction at
     * @param _assetPairHashes        Identifying hashes of asset pairs
     * @param _assetPairBounds        Chunk size bounds for each asset pair
     */
    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd,
        bytes32[] memory _assetPairHashes,
        BoundsLibrary.Bounds[] memory _assetPairBounds
    )
        public
        TwoAssetPriceBoundedLinearAuction(
            _oracleWhiteList,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd
        )
    {
        require(
            _assetPairHashes.length == _assetPairBounds.length,
            "TWAPAuction: Must be equal amount of asset pair hashes and bounds."
        );

        for (uint8 i = 0; i < _assetPairHashes.length; i++) {
            require(
                _assetPairBounds[i].isValid(),
                "TWAPAuction.constructor: Passed asset pair bounds are invalid."
            );

            chunkSizeWhiteList[_assetPairHashes[i]] = _assetPairBounds[i];
        }

        expectedChunkAuctionLength = _auctionPeriod
            .mul(_rangeStart.add(AUCTION_COMPLETION_BUFFER))
            .div(_rangeStart.add(_rangeEnd));
    }

    /* ============ Internal Functions ============ */

    /**
     * Populates the TWAPState struct and initiates first chunk auction.
     *
     * @param _twapAuction                  TWAPAuction State object
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     * @param _startingCurrentSetQuantity   Quantity of currentSet to rebalance
     * @param _liquidatorData               Struct of parsed liquidator data
     */
    function initializeTWAPAuction(
        TWAPState storage _twapAuction,
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        TWAPLiquidatorData memory _liquidatorData
    )
        internal
    {
        // Calculate value of rebalance volume
        uint256 rebalanceVolume = LiquidatorUtils.calculateRebalanceVolume(
            _currentSet,
            _nextSet,
            oracleWhiteList,
            _startingCurrentSetQuantity
        );

        // Calculate the size of each chunk auction in currentSet terms
        uint256 chunkSize = calculateChunkSize(
            _startingCurrentSetQuantity,
            rebalanceVolume,
            _liquidatorData.usdChunkSize
        );

        // Initialize first chunk auction
        LinearAuction.initializeLinearAuction(
            _twapAuction.chunkAuction,
            _currentSet,
            _nextSet,
            chunkSize
        );

        // Set TWAPState
        _twapAuction.orderSize = _startingCurrentSetQuantity;
        _twapAuction.orderRemaining = _startingCurrentSetQuantity.sub(chunkSize);
        _twapAuction.chunkSize = chunkSize;
        _twapAuction.lastChunkAuctionEnd = block.timestamp.sub(_liquidatorData.chunkAuctionPeriod);
        _twapAuction.chunkAuctionPeriod = _liquidatorData.chunkAuctionPeriod;
    }

    /**
     * Resets state for next chunk auction (except minimumBid and token flow arrays), and updates
     * orderRemaining value for TWAP auction.
     *
     * @param _twapAuction                  TWAPAuction State object
     */
    function auctionNextChunk(
        TWAPState storage _twapAuction
    )
        internal
    {
        // Add leftover current Sets from previous chunk auction to orderRemaining
        uint256 totalRemainingSets = _twapAuction.orderRemaining.add(
            _twapAuction.chunkAuction.auction.remainingCurrentSets
        );

        // Calculate next chunk auction sise as min of chunkSize or orderRemaining
        uint256 nextChunkAuctionSize = Math.min(_twapAuction.chunkSize, totalRemainingSets);

        // Start new chunk auction by over writing previous auction state and decrementing orderRemaining
        overwriteChunkAuctionState(_twapAuction, nextChunkAuctionSize);
        _twapAuction.orderRemaining = totalRemainingSets.sub(nextChunkAuctionSize);
    }

    /* ============ Internal Helper Functions ============ */

    /**
     * Resets state for next chunk auction (except minimumBid and token flow arrays)
     *
     * @param _twapAuction                  TWAPAuction State object
     * @param _chunkAuctionSize             Size of next chunk auction
     */
    function overwriteChunkAuctionState(
        TWAPState storage _twapAuction,
        uint256 _chunkAuctionSize
    )
        internal
    {
        _twapAuction.chunkAuction.auction.startingCurrentSets = _chunkAuctionSize;
        _twapAuction.chunkAuction.auction.remainingCurrentSets = _chunkAuctionSize;
        _twapAuction.chunkAuction.auction.startTime = block.timestamp;
        _twapAuction.chunkAuction.endTime = block.timestamp.add(auctionPeriod);

        // Since currentSet and nextSet param is not used in calculating start and end price on
        // TwoAssetPriceBoundedLinearAuction we can pass in zero addresses
        _twapAuction.chunkAuction.startPrice = calculateStartPrice(
            _twapAuction.chunkAuction.auction,
            ISetToken(address(0)),
            ISetToken(address(0))
        );
        _twapAuction.chunkAuction.endPrice = calculateEndPrice(
            _twapAuction.chunkAuction.auction,
            ISetToken(address(0)),
            ISetToken(address(0))
        );
    }

    function validateLiquidatorData(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        TWAPLiquidatorData memory _liquidatorData
    )
        internal
        view
    {
        uint256 rebalanceVolume = LiquidatorUtils.calculateRebalanceVolume(
            _currentSet,
            _nextSet,
            oracleWhiteList,
            _startingCurrentSetQuantity
        );

        bytes32 assetPairHash = getAssetPairHashFromCollateral(_currentSet, _nextSet);

        validateTWAPParameters(
            _liquidatorData,
            assetPairHash,
            rebalanceVolume
        );
    }

    /**
     * Validates passed in parameters for TWAP auction
     *
     * @param _twapLiquidatorData       Struct of passed liquidator data
     * @param _assetPairHash            Hash of asset pair being rebalanceds
     * @param _rebalanceVolume          Value of collateral being rebalanced
     */
    function validateTWAPParameters(
        TWAPLiquidatorData memory _twapLiquidatorData,
        bytes32 _assetPairHash,
        uint256 _rebalanceVolume
    )
        internal
        view
    {
        require(
            chunkSizeWhiteList[_assetPairHash].isWithin(_twapLiquidatorData.usdChunkSize),
            "TWAPAuction.validateTWAPParameters: Passed chunk size must be between bounds."
        );

        uint256 chunkAuctions = _rebalanceVolume.divCeil(_twapLiquidatorData.usdChunkSize);
        uint256 expectedTWAPAuctionTime = chunkAuctions.mul(expectedChunkAuctionLength)
            .add(chunkAuctions.sub(1).mul(_twapLiquidatorData.chunkAuctionPeriod));

        uint256 failAuctionPeriod = IRebalancingSetTokenV3(msg.sender).failAuctionPeriod();

        require(
            expectedTWAPAuctionTime < failAuctionPeriod,
            "TWAPAuction.validateTWAPParameters: Expected auction duration exceeds allowed length."
        );
    }

    /**
     * Validates next chunk auction can begin.
     *
     * @param _twapAuction                  TWAPAuction State object
     */
    function validateNextChunkAuction(
        TWAPState storage _twapAuction
    )
        internal
        view
    {
        Auction.validateAuctionCompletion(_twapAuction.chunkAuction.auction);

        require(
            isRebalanceActive(_twapAuction),
            "TWAPState.validateNextChunkAuction: TWAPAuction is finished."
        );

        require(
            _twapAuction.lastChunkAuctionEnd.add(_twapAuction.chunkAuctionPeriod) <= block.timestamp,
            "TWAPState.validateNextChunkAuction: Not enough time elapsed from last chunk auction end."
        );
    }

    /**
     * Checks if the amount of Sets still to be auctioned (in aggregate) is greater than the minimumBid
     *
     * @param _twapAuction                  TWAPAuction State object
     */
    function isRebalanceActive(
        TWAPState storage _twapAuction
    )
        internal
        view
        returns (bool)
    {
        // Sum of remaining Sets in current chunk auction and order remaining
        uint256 totalRemainingSets = _twapAuction.orderRemaining.add(
            _twapAuction.chunkAuction.auction.remainingCurrentSets
        );
        
        // Check that total remaining sets is greater than minimumBid
        return totalRemainingSets > _twapAuction.chunkAuction.auction.minimumBid;
    }

    /**
     * Calculates chunkSize of auction in current Set terms
     *
     * @param _totalSetAmount       Total amount of Sets being auctioned
     * @param _rebalanceVolume      The total value being auctioned
     * @param _usdChunkSize         Value of chunk size
     */
    function calculateChunkSize(
        uint256 _totalSetAmount,
        uint256 _rebalanceVolume,
        uint256 _usdChunkSize
    )
        internal
        view
        returns (uint256)
    {
        // Since solidity rounds down anything equal to 1 will require at least one auction
        // equal to the usdChunkSize
        if (_rebalanceVolume.div(_usdChunkSize) >= 1) {
            return _totalSetAmount.mul(_usdChunkSize).div(_rebalanceVolume);
        } else {
            return _totalSetAmount;
        }
    }

    /**
     * Parse passed Liquidator data
     *
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     */
    function getAssetPairHashFromCollateral(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (bytes32)
    {
        // Get set components
        address[] memory currentSetComponents = _currentSet.getComponents();
        address[] memory nextSetComponents = _nextSet.getComponents();

        address[] memory assetPairComponents = currentSetComponents.union(nextSetComponents);

        return getAssetPairHash(assetPairComponents[0], assetPairComponents[1]);
    }

    /**
     * Parse passed Liquidator data
     *
     * @param _liquidatorData               Bytestring of liquidator data
     */
    function parseLiquidatorData(
        bytes memory _liquidatorData
    )
        internal
        pure
        returns (TWAPLiquidatorData memory)
    {
        return abi.decode(_liquidatorData, (TWAPLiquidatorData));
    }

    /**
     * Returns hash of token pair where token address with lowest numerical value is hashed first.
     *
     * @param _assetOne                   First asset in pair
     * @param _assetTwo                   Second asset in pair
     */
    function getAssetPairHash(
        address _assetOne,
        address _assetTwo
    )
        internal
        pure
        returns (bytes32)
    {
        return _assetOne < _assetTwo ? keccak256(abi.encodePacked(_assetOne, _assetTwo)) :
            keccak256(abi.encodePacked(_assetTwo, _assetOne));
    }
}