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
import { IOracle } from "set-protocol-strategies/contracts/meta-oracles/interfaces/IOracle.sol";

import { Auction } from "../../../../core/liquidators/impl/Auction.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";
import { TwoAssetAuctionBoundsCalculator } from "../../../../core/liquidators/impl/TwoAssetAuctionBoundsCalculator.sol";

/**
 * @title TwoAssetAuctionBoundsCalculator
 * @author Set Protocol
 *
 */
contract TwoAssetAuctionBoundsCalculatorMock is TwoAssetAuctionBoundsCalculator {

	Auction.Setup public auctionInfo;

    constructor(
        IOracleWhiteList _oracleWhiteList
    )
        public
        TwoAssetAuctionBoundsCalculator(_oracleWhiteList)
    {}

    function calculateAuctionBoundDifferenceMock(
        uint256 _fairValue,
        uint256 _rangeStart
    )
        external
        view
        returns (uint256)
    {
    	return calculateAuctionBoundDifference(auctionInfo, _fairValue, _rangeStart);
    }

    function parameterizeAuction(
    	address[] calldata _combinedTokenArray,
    	uint256[] calldata _combinedCurrentSetUnits,
    	uint256[] calldata _combinedNextSetUnits
    )
    	external
    {
    	auctionInfo.combinedTokenArray = _combinedTokenArray;
    	auctionInfo.combinedCurrentSetUnits = _combinedCurrentSetUnits;
    	auctionInfo.combinedNextSetUnits = _combinedNextSetUnits;
    }

    function getCombinedTokenArray()
    	external
    	view
    	returns(address[] memory)
    {
    	return auctionInfo.combinedTokenArray;
    }
}