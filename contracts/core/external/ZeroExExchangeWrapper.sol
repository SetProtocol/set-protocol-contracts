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
