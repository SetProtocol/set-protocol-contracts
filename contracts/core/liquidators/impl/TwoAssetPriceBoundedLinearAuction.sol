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
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { IOracle } from "set-protocol-strategies/contracts/meta-oracles/interfaces/IOracle.sol";

import { Auction } from "./Auction.sol";
import { LinearAuction } from "./LinearAuction.sol";
import { CommonMath } from "../../../lib/CommonMath.sol";
import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";


/**
 * @title TwoAssetPriceBoundedLinearAuction
 * @author Set Protocol
 *
 */
contract TwoAssetPriceBoundedLinearAuction is LinearAuction {
    using SafeMath for uint256;
    using CommonMath for uint256;

    struct AssetInfo {
        uint256 assetPrice;
        uint256 fullUnit;
    }

    uint256 constant private ONE_HUNDRED = 100;

    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd
    )
        public
        LinearAuction(
            _oracleWhiteList,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd
        )
    {}

    /**
     * Calculates the linear auction start price with a scaled value
     */
    function calculateStartPrice(
        State storage _linearAuction,
        uint256 _fairValueScaled
    )
        internal
        view
        returns(uint256)
    {
        uint256 startDifference = calculateAuctionBoundDifference(
            _linearAuction.auction,
            _fairValueScaled,
            rangeStart
        );

        return _fairValueScaled.sub(startDifference);
    }

    /**
     * Calculates the linear auction end price with a scaled value
     */
    function calculateEndPrice(
        State storage _linearAuction,
        uint256 _fairValueScaled
    )
        internal
        view
        returns(uint256)
    {
        uint256 endDifference = calculateAuctionBoundDifference(
            _linearAuction.auction,
            _fairValueScaled,
            rangeStart
        );

        return _fairValueScaled.add(endDifference);
    }


    function calculateAuctionBoundDifference(
        Auction.Setup storage _auction,
        uint256 _fairValue,
        uint256 _boundValue
    )
        internal
        view
        returns (uint256)
    {
        AssetInfo memory baseAsset = getAssetInfo(_auction.combinedTokenArray[0]);
        AssetInfo memory quoteAsset = getAssetInfo(_auction.combinedTokenArray[1]);

        uint256 numDifferential;
        if (_auction.combinedNextSetUnits[0].scale() > _fairValue.mul(_auction.combinedCurrentSetUnits[0])) {
            numDifferential = _auction.combinedNextSetUnits[0].scale().sub(_fairValue.mul(_auction.combinedCurrentSetUnits[0]));
        } else {
            numDifferential = _fairValue.mul(_auction.combinedCurrentSetUnits[0]).sub(_auction.combinedNextSetUnits[0].scale());
        }

        uint256 denomDifferential;
        if (_auction.combinedNextSetUnits[0].mul(_auction.combinedCurrentSetUnits[1]) > _auction.combinedNextSetUnits[1].mul(_auction.combinedCurrentSetUnits[0])) {
            denomDifferential = _auction.combinedNextSetUnits[0].mul(_auction.combinedCurrentSetUnits[1]).sub(_auction.combinedNextSetUnits[1].mul(_auction.combinedCurrentSetUnits[0]));
        } else {
            denomDifferential = _auction.combinedNextSetUnits[1].mul(_auction.combinedCurrentSetUnits[0]).sub(_auction.combinedNextSetUnits[0].mul(_auction.combinedCurrentSetUnits[1]));
        }

        uint256 calcNumerator = quoteAsset.fullUnit
            .mul(numDifferential)
            .mul(_boundValue)
            .mul(baseAsset.assetPrice)
            .div(quoteAsset.assetPrice)
            .div(ONE_HUNDRED);

        uint256 calcDenominator = baseAsset.fullUnit.mul(denomDifferential).scale();

        return calcNumerator.scale().div(calcDenominator).mul(numDifferential).deScale();
    }

    function getAssetInfo(address _asset) internal view returns(AssetInfo memory) {
        address assetOracle = oracleWhiteList.getOracleAddressByToken(_asset);
        uint256 assetPrice = IOracle(assetOracle).read();

        uint256 decimals = ERC20Detailed(_asset).decimals();

        return AssetInfo({
            assetPrice: assetPrice,
            fullUnit: CommonMath.safePower(10, decimals)
        });
    }
}