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

import { BoundsLibrary } from "set-protocol-contract-utils/contracts/lib/BoundsLibrary.sol";

import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";
import { TWAPAuction } from "../../../../core/liquidators/twap-impl/TWAPAuction.sol";


/**
 * @title TwoAssetPriceBoundedLinearAuction
 * @author Set Protocol
 *
 */
contract TWAPAuctionMock is TWAPAuction {

    TWAPAuction.TWAPState public twapState;

    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd,
        TWAPAuction.AssetPairVolumeBounds[] memory _assetPairVolumeBounds
    )
        public
        TWAPAuction(
            _oracleWhiteList,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd,
            _assetPairVolumeBounds
        )
    {}

    function testInitializeTWAPAuction(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        uint256 _chunkSizeValue,
        uint256 _chunkAuctionPeriod
    )
        external
    {
        initializeTWAPAuction(
            twapState,
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            _chunkSizeValue,
            _chunkAuctionPeriod
        );
    }

    function testAuctionNextChunk()
        external
    {
        auctionNextChunk(twapState);
    }

    function testParseLiquidatorData(
        bytes calldata _liquidatorData
    )
        external
        pure
        returns (uint256, uint256)
    {
        return TWAPAuction.parseLiquidatorData(_liquidatorData);
    }

    function testValidateLiquidatorData(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        uint256 _chunkSizeValue,
        uint256 _chunkAuctionPeriod
    )
        external
    {
        TWAPAuction.validateLiquidatorData(
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            _chunkSizeValue,
            _chunkAuctionPeriod
        );
    }

    function testValidateNextChunkAuction()
        external
    {
        TWAPAuction.validateNextChunkAuction(twapState);
    }

    function testGetVolumeBoundsFromCollateral(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        external
        view
        returns (BoundsLibrary.Bounds memory)
    {
        return TWAPAuction.getVolumeBoundsFromCollateral(_currentSet, _nextSet);
    }

    /* ============ Setters ============ */
    function setRemainingCurrentSets(
        uint256 _value
    )
        external
    {
        twapState.chunkAuction.auction.remainingCurrentSets = _value;
    }

    function setLastChunkAuctionEnd(
        uint256 _value
    )
        external
    {
        twapState.lastChunkAuctionEnd = _value;
    }
}