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
        bytes32[] memory _assetPairHashes,
        BoundsLibrary.Bounds[] memory _assetPairBounds
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
    {}

    function testInitializeTWAPAuction(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        TWAPAuction.TWAPLiquidatorData calldata _liquidatorData
    )
        external
    {
        initializeTWAPAuction(
            twapState,
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            _liquidatorData
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
        returns (TWAPAuction.TWAPLiquidatorData memory)
    {
        return TWAPAuction.parseLiquidatorData(_liquidatorData);
    }

    function testValidateLiquidatorData(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        TWAPLiquidatorData calldata _liquidatorData
    )
        external
    {
        TWAPAuction.validateLiquidatorData(
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            _liquidatorData
        );
    }

    function testValidateNextChunkAuction()
        external
    {
        TWAPAuction.validateNextChunkAuction(twapState);
    }

    function testGetAssetPairHashFromCollateral(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        external
        view
        returns (bytes32)
    {
        return TWAPAuction.getAssetPairHashFromCollateral(_currentSet, _nextSet);
    }

    function testGetAssetPairHash(
        address _assetOne,
        address _assetTwo
    )
        external
        view
        returns (bytes32)
    {
        return TWAPAuction.getAssetPairHash(_assetOne, _assetTwo);
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