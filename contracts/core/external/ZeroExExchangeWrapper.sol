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

pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { LibBytes } from "../../external/LibBytes.sol";
import { ZeroExOrderDataHandler as ZeroEx } from "./lib/ZeroExOrderDataHandler.sol";

/**
 * @title ZeroExExchangeWrapper
 * @author Set Protocol
 *
 * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2
 */
contract ZeroExExchangeWrapper
{
    using SafeMath for uint256;
    using LibBytes for bytes;

    /* ============ Constants ============ */



    /* ============ Structs ============ */


    /* ============ State Variables ============ */
    address public ZERO_EX_EXCHANGE;
    address public ZERO_EX_PROXY;


    /* ============ Modifiers ============ */


    /* ============ Constructor ============ */
    constructor(
        // address _zeroExExchange,
        // address _zeroExProxy,
    )
        public
    {
        // ZERO_EX_EXCHANGE = _zeroExExchange;
        // ZERO_EX_PROXY = _zeroExProxy;
    }


    /* ============ Public Functions ============ */
    function exchange(
        address tradeOriginator,
        bytes orderData
    )
        external
        returns (uint256)
    {
        
        // We construct the following to allow calling fillOrder on ZeroEx V2 Exchange
        // The layout of this orderData is in the table below.
        // 
        // | Section | Data                  | Offset              | Length          | Contents                      |
        // |---------|-----------------------|---------------------|-----------------|-------------------------------|
        // | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |
        // |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |
        // |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |
        // |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |
        // | Body    | fillAmount            | 128                 | 32              | taker asset fill amouint      |
        // |         | signature             | 160                 | signatureLength | signature in bytes            |
        // |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |


        // Parse fill Amount
        // uint256 fillAmount = parseFillAmount(_orderData);

        // Slice the signature out.

        // Slice the Order

        // Construct the order
        // Order memory order = parseZeroExOrder(orderData);

        // Move the required takerToken into the wrapper

        // Ensure allowance


        return 1;
    }

    /* ============ Getters ============ */


 

    /* ============ Private ============ */

}
