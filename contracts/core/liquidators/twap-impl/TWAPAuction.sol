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
 * Contract for executing TWAP Auctions from initializing to moving to the next chunk auction. Inherits from
 * TwoAssetPriceBoundedLinearAuction
 */
contract TWAPAuction is TwoAssetPriceBoundedLinearAuction {
    using SafeMath for uint256;
    using CommonMath for uint256;
    using AddressArrayUtils for address[];
    using BoundsLibrary for BoundsLibrary.Bounds;

    /* ============ Structs ============ */

    struct TWAPState {
        LinearAuction.State chunkAuction;   // Current chunk auction state
        uint256 orderSize;                  // Beginning amount of currentSets
        uint256 orderRemaining;             // Amount of current Sets not auctioned or being auctioned
        uint256 lastChunkAuctionEnd;        // Time of last chunk auction end
        uint256 chunkAuctionPeriod;         // Time between chunk auctions
        uint256 chunkSize;                  // Amount of current Sets in a full chunk auction
    }

    struct TWAPLiquidatorData {
        uint256 chunkSizeValue;             // Currency value of rebalance volume in each chunk (18 decimal)
        uint256 chunkAuctionPeriod;         // Time between chunk auctions
    }

    struct AssetPairVolumeBounds {
        address assetOne;                   // Address of first asset in pair
        address assetTwo;                   // Address of second asset in pair
        BoundsLibrary.Bounds bounds;        // Chunk size volume bounds for asset pair
    }

    /* ============ Constants ============ */

    // Auction completion buffer assumes completion potentially 2% after fair value when auction started
    uint256 constant public AUCTION_COMPLETION_BUFFER = 2e16;

    /* ============ State Variables ============ */

    // Mapping between an address pair's addresses and the min/max USD-chunk size, each asset pair will
    // have two entries, one for each ordering of the addresses
    mapping(address => mapping(address => BoundsLibrary.Bounds)) public chunkSizeWhiteList;
    //Estimated length in seconds of a chunk auction
    uint256 public expectedChunkAuctionLength;

    /* ============ Constructor ============ */

    /**
     * TWAPAuction constructor
     *
     * @param _oracleWhiteList          OracleWhiteList used by liquidator
     * @param _auctionPeriod            Length of auction in seconds
     * @param _rangeStart               Percentage below FairValue to begin auction at in 18 decimal value
     * @param _rangeEnd                 Percentage above FairValue to end auction at in 18 decimal value
     * @param _assetPairVolumeBounds    List of chunk size bounds for each asset pair
     */
    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd,
        AssetPairVolumeBounds[] memory _assetPairVolumeBounds
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
            _rangeEnd >= AUCTION_COMPLETION_BUFFER,
            "TWAPAuction.constructor: Passed range end must exceed completion buffer."
        );

        // Not using CommonMath.scaleFactoor() due to compilation issues related to constructor size
        require(
            _rangeEnd <= 1e18 && _rangeStart <= 1e18,
            "TWAPAuction.constructor: Range bounds must be less than 100%."
        );

        for (uint256 i = 0; i < _assetPairVolumeBounds.length; i++) {
            BoundsLibrary.Bounds memory bounds = _assetPairVolumeBounds[i].bounds;

            // Not using native library due to compilation issues related to constructor size
            require(
                bounds.lower <= bounds.upper,
                "TWAPAuction.constructor: Passed asset pair bounds are invalid."
            );

            address assetOne = _assetPairVolumeBounds[i].assetOne;
            address assetTwo = _assetPairVolumeBounds[i].assetTwo;

            require(
                chunkSizeWhiteList[assetOne][assetTwo].upper == 0,
                "TWAPAuction.constructor: Asset pair volume bounds must be unique."
            );

            chunkSizeWhiteList[assetOne][assetTwo] = bounds;
            chunkSizeWhiteList[assetTwo][assetOne] = bounds;
        }

        // Expected length of a chunk auction, assuming the auction goes 2% beyond initial fair
        // value. Used to validate TWAP Auction length won't exceed Set's rebalanceFailPeriod.
        // Not using SafeMath due to compilation issues related to constructor size
        require(
            _auctionPeriod < -uint256(1) / (_rangeStart + AUCTION_COMPLETION_BUFFER),
            "TWAPAuction.constructor: Auction period too long."
        );

        expectedChunkAuctionLength = _auctionPeriod * (_rangeStart + AUCTION_COMPLETION_BUFFER) /
            (_rangeStart + _rangeEnd);

        require(
            expectedChunkAuctionLength > 0,
            "TWAPAuction.constructor: Expected auction length must exceed 0."
        );
    }

    /* ============ Internal Functions ============ */

    /**
     * Populates the TWAPState struct and initiates first chunk auction.
     *
     * @param _twapAuction                  TWAPAuction State object
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     * @param _startingCurrentSetQuantity   Quantity of currentSet to rebalance
     * @param _chunkSizeValue               Value of chunk size in terms of currency represented by
     *                                          the oracleWhiteList
     * @param _chunkAuctionPeriod           Time between chunk auctions
     */
    function initializeTWAPAuction(
        TWAPState storage _twapAuction,
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        uint256 _chunkSizeValue,
        uint256 _chunkAuctionPeriod
    )
        internal
    {
        // Initialize first chunk auction with the currentSetQuantity to populate LinearAuction struct
        // This will be overwritten by the initial chunk auction quantity
        LinearAuction.initializeLinearAuction(
            _twapAuction.chunkAuction,
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity
        );

        // Calculate currency value of rebalance volume
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
            _chunkSizeValue
        );

        // Normalize the chunkSize and orderSize to ensure all values are a multiple of
        // the minimum bid
        uint256 minBid = _twapAuction.chunkAuction.auction.minimumBid;
        uint256 normalizedChunkSize = chunkSize.div(minBid).mul(minBid);
        uint256 totalOrderSize = _startingCurrentSetQuantity.div(minBid).mul(minBid);

        // Initialize the first chunkAuction to the normalized chunk size
        _twapAuction.chunkAuction.auction.startingCurrentSets = normalizedChunkSize;
        _twapAuction.chunkAuction.auction.remainingCurrentSets = normalizedChunkSize;

        // Set TWAPState
        _twapAuction.orderSize = totalOrderSize;
        _twapAuction.orderRemaining = totalOrderSize.sub(normalizedChunkSize);
        _twapAuction.chunkSize = normalizedChunkSize;
        _twapAuction.lastChunkAuctionEnd = 0;
        _twapAuction.chunkAuctionPeriod = _chunkAuctionPeriod;
    }

    /**
     * Calculates size of next chunk auction and then starts then parameterizes the auction and overwrites
     * the previous auction state. The orderRemaining is updated to take into account the currentSets included
     * in the new chunk auction. Function can only be called provided the following conditions have been met:
     *  - Last chunk auction is finished (remainingCurrentSets < minimumBid)
     *  - There is still more collateral to auction off
     *  - The chunkAuctionPeriod has elapsed
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

        // Calculate next chunk auction size as min of chunkSize or orderRemaining
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

    /**
     * Validates that chunk size is within asset bounds and passed chunkAuctionLength
     * is unlikely to push TWAPAuction beyond rebalanceFailPeriod.
     *
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     * @param _startingCurrentSetQuantity   Quantity of currentSet to rebalance
     * @param _chunkSizeValue               Value of chunk size in terms of currency represented by
     *                                          the oracleWhiteList
     * @param _chunkAuctionPeriod           Time between chunk auctions
     */
    function validateLiquidatorData(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        uint256 _chunkSizeValue,
        uint256 _chunkAuctionPeriod
    )
        internal
        view
    {
        // Calculate currency value of rebalance volume
        uint256 rebalanceVolume = LiquidatorUtils.calculateRebalanceVolume(
            _currentSet,
            _nextSet,
            oracleWhiteList,
            _startingCurrentSetQuantity
        );

        BoundsLibrary.Bounds memory volumeBounds = getVolumeBoundsFromCollateral(_currentSet, _nextSet);

        validateTWAPParameters(
            _chunkSizeValue,
            _chunkAuctionPeriod,
            rebalanceVolume,
            volumeBounds
        );
    }

    /**
     * Validates passed in parameters for TWAP auction
     *
     * @param _chunkSizeValue           Value of chunk size in terms of currency represented by
     *                                      the oracleWhiteList
     * @param _chunkAuctionPeriod       Time between chunk auctions
     * @param _rebalanceVolume          Value of collateral being rebalanced
     * @param _assetPairVolumeBounds    Volume bounds of asset pair
     */
    function validateTWAPParameters(
        uint256 _chunkSizeValue,
        uint256 _chunkAuctionPeriod,
        uint256 _rebalanceVolume,
        BoundsLibrary.Bounds memory _assetPairVolumeBounds
    )
        internal
        view
    {
        // Bounds and chunkSizeValue denominated in currency value
        require(
            _assetPairVolumeBounds.isWithin(_chunkSizeValue),
            "TWAPAuction.validateTWAPParameters: Passed chunk size must be between bounds."
        );

        // Want to make sure that the expected length of the auction is less than the rebalanceFailPeriod
        // or else a legitimate auction could be failed. Calculated as such:
        // expectedTWAPTime = numChunkAuctions * expectedChunkAuctionLength + (numChunkAuctions - 1) *
        // chunkAuctionPeriod
        uint256 numChunkAuctions = _rebalanceVolume.divCeil(_chunkSizeValue);
        uint256 expectedTWAPAuctionTime = numChunkAuctions.mul(expectedChunkAuctionLength)
            .add(numChunkAuctions.sub(1).mul(_chunkAuctionPeriod));

        uint256 rebalanceFailPeriod = IRebalancingSetTokenV3(msg.sender).rebalanceFailPeriod();

        require(
            expectedTWAPAuctionTime < rebalanceFailPeriod,
            "TWAPAuction.validateTWAPParameters: Expected auction duration exceeds allowed length."
        );
    }

    /**
     * The next chunk auction can begin when the previous auction has completed, there are still currentSets to
     * rebalance, and the auction period has elapsed.
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
        uint256 totalRemainingSets = calculateTotalSetsRemaining(_twapAuction);

        // Check that total remaining sets is greater than minimumBid
        return totalRemainingSets >= _twapAuction.chunkAuction.auction.minimumBid;
    }

    /**
     * Calculates chunkSize of auction in current Set terms
     *
     * @param _totalSetAmount       Total amount of Sets being auctioned
     * @param _rebalanceVolume      The total currency value being auctioned
     * @param _chunkSizeValue       Value of chunk size in currency terms
     */
    function calculateChunkSize(
        uint256 _totalSetAmount,
        uint256 _rebalanceVolume,
        uint256 _chunkSizeValue
    )
        internal
        view
        returns (uint256)
    {
        // Since solidity rounds down anything equal to 1 will require at least one auction
        // equal to the chunkSizeValue
        if (_rebalanceVolume.div(_chunkSizeValue) >= 1) {
            return _totalSetAmount.mul(_chunkSizeValue).div(_rebalanceVolume);
        } else {
            return _totalSetAmount;
        }
    }

    /**
     * Calculates the total remaining sets in the auction between the currently underway chunk auction and
     * the Sets that have yet to be included in a chunk auction.
     *
     * @param _twapAuction                  TWAPAuction State object
     */
    function calculateTotalSetsRemaining(TWAPAuction.TWAPState storage _twapAuction)
        internal
        view
        returns (uint256)
    {
        return _twapAuction.orderRemaining.add(_twapAuction.chunkAuction.auction.remainingCurrentSets);
    }

    /**
     * Returns asset pair volume bounds based on passed in collateral Sets.
     *
     * @param _currentSet                   The Set to rebalance from
     * @param _nextSet                      The Set to rebalance to
     */
    function getVolumeBoundsFromCollateral(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        internal
        view
        returns (BoundsLibrary.Bounds memory)
    {
        // Get set components
        address[] memory currentSetComponents = _currentSet.getComponents();
        address[] memory nextSetComponents = _nextSet.getComponents();

        address firstComponent = currentSetComponents [0];
        address secondComponent = currentSetComponents.length > 1 ? currentSetComponents [1] :
            nextSetComponents [0] != firstComponent ? nextSetComponents [0] : nextSetComponents [1];

        return chunkSizeWhiteList[firstComponent][secondComponent];
    }

    function parseLiquidatorData(
        bytes memory _liquidatorData
    )
        internal
        pure
        returns (uint256, uint256)
    {
        return abi.decode(_liquidatorData, (uint256, uint256));
    }
}