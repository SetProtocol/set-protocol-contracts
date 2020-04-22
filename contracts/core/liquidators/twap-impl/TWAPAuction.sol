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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { BoundsLibrary } from "set-protocol-contract-utils/contracts/lib/BoundsLibrary.sol";

import { LinearAuction } from "../impl/LinearAuction.sol";
import { IOracleWhiteList } from "../../../core/interfaces/IOracleWhiteList.sol";
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
            chunkSizeWhiteList[_assetPairHashes[i]] = _assetPairBounds[i];
        }

        expectedChunkAuctionLength = _auctionPeriod
            .mul(_rangeStart.add(AUCTION_COMPLETION_BUFFER))
            .div(_rangeStart.add(_rangeEnd));
    }

}