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

import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { IOracle } from "set-protocol-oracles/contracts/meta-oracles/interfaces/IOracle.sol";

import { LinearAuction } from "../../../../core/liquidators/impl/LinearAuction.sol";
import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";
import { TwoAssetPriceBoundedLinearAuction } from "../../../../core/liquidators/impl/TwoAssetPriceBoundedLinearAuction.sol";

/**
 * @title TwoAssetPriceBoundedLinearAuction
 * @author Set Protocol
 *
 */
contract TwoAssetPriceBoundedLinearAuctionMock is TwoAssetPriceBoundedLinearAuction {

	LinearAuction.State public auctionInfo;

    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd
    )
        public
        TwoAssetPriceBoundedLinearAuction(
            _oracleWhiteList,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd
        )
    {}

    // To test
    function validateTwoAssetPriceBoundedAuctionMock(ISetToken _currentSet,ISetToken _nextSet) external view {
        validateTwoAssetPriceBoundedAuction(_currentSet, _nextSet);
    }

    function calculateMinimumBid(ISetToken _currentSet, ISetToken _nextSet) external returns(uint256) {
        auctionInfo.auction.maxNaturalUnit = Math.max(
            _currentSet.naturalUnit(),
            _nextSet.naturalUnit()
        );

        return super.calculateMinimumBid(auctionInfo.auction, _currentSet, _nextSet);
    }

    function calculateStartPriceMock() external view returns(uint256) {   
        ISetToken currentSet = ISetToken(address(0));
        ISetToken nextSet = ISetToken(address(0));
        return super.calculateStartPrice(auctionInfo.auction, currentSet, nextSet);
    }

    function calculateEndPriceMock() external view returns(uint256) {    
        ISetToken currentSet = ISetToken(address(0));
        ISetToken nextSet = ISetToken(address(0));
        return super.calculateEndPrice(auctionInfo.auction, currentSet, nextSet);
    }

    function parameterizeAuction(
    	address[] calldata _combinedTokenArray,
    	uint256[] calldata _combinedCurrentSetUnits,
    	uint256[] calldata _combinedNextSetUnits
    )
    	external
    {
    	auctionInfo.auction.combinedTokenArray = _combinedTokenArray;
    	auctionInfo.auction.combinedCurrentSetUnits = _combinedCurrentSetUnits;
    	auctionInfo.auction.combinedNextSetUnits = _combinedNextSetUnits;
    }

    function getCombinedTokenArray()
    	external
    	view
    	returns(address[] memory)
    {
    	return auctionInfo.auction.combinedTokenArray;
    }
}