/*
    Copyright 2018 Set Labs Inc.

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
import { ConstantAuctionPriceCurve } from "./ConstantAuctionPriceCurve.sol";

/**
 * @title UpdatableConstantAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used in rebalancing auction testing to return consistent price.
 * !!!!!!!!!!!!! DO NOT DEPLOY !!!!!!!!!!!!!
 *
 */

contract UpdatableConstantAuctionPriceCurve is ConstantAuctionPriceCurve {

    constructor(
        uint256 _priceNumerator,
        uint256 _priceDivisor
    )
        public
        ConstantAuctionPriceCurve(
            _priceNumerator,
            _priceDivisor
        )
    {}

    /*
     * Update constant auction price
     *
     * @param _newPrice  Price to update to
     */
    function updatePrice(
        uint256 _newPrice
    )
        public
    {
        priceNumerator = _newPrice;
    }
}
