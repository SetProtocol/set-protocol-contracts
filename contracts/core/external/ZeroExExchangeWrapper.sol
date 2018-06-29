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



/**
 * @title ZeroExExchangeWrapper
 * @author Set Protocol
 *
 * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2
 */
contract ZeroExExchangeWrapper
{
    using SafeMath for uint256;

    /* ============ Constants ============ */



    /* ============ Structs ============ */
    struct Order {
        address makerAddress;           // Address that created the order.
        address takerAddress;           // Address that is allowed to fill the order. If set to 0, any address is allowed to fill the order.
        address feeRecipientAddress;    // Address that will recieve fees when order is filled.
        address senderAddress;          // Address that is allowed to call Exchange contract methods that affect this order. If set to 0, any address is allowed to call these methods.
        uint256 makerAssetAmount;       // Amount of makerAsset being offered by maker. Must be greater than 0.
        uint256 takerAssetAmount;       // Amount of takerAsset being bid on by maker. Must be greater than 0.
        uint256 makerFee;               // Amount of ZRX paid to feeRecipient by maker when order is filled. If set to 0, no transfer of ZRX from maker to feeRecipient will be attempted.
        uint256 takerFee;               // Amount of ZRX paid to feeRecipient by taker when order is filled. If set to 0, no transfer of ZRX from taker to feeRecipient will be attempted.
        uint256 expirationTimeSeconds;  // Timestamp in seconds at which order expires.
        uint256 salt;                   // Arbitrary number to facilitate uniqueness of the order's hash.
        bytes makerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring makerAsset. The last byte references the id of this proxy.
        bytes takerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring takerAsset. The last byte references the id of this proxy.
    }


    /* ============ State Variables ============ */
    address public ZERO_EX_EXCHANGE;
    address public ZERO_EX_PROXY;


    /* ============ Modifiers ============ */


    /* ============ Constructor ============ */
    constructor(
        address _zeroExExchange,
        address _zeroExProxy,
    )
        public
    {
        ZERO_EX_EXCHANGE = _zeroExExchange;
        ZERO_EX_PROXY = _zeroExProxy;
    }


    /* ============ Public Functions ============ */
    function exchange(
        address tradeOriginator,
        bytes orderData
    )
        external
        returns (uint256)
    {
        // Parse header for fill Amount


        Order memory order = parseZeroExOrder(orderData);

        // Move the required takerToken into the wrapper

        // Ensure allowance
    }

    /* ============ Getters ============ */


    /* ============ Private Helpers ============ */

    function parseZeroExOrder(bytes orderData)
        private
        pure
        returns (Order memory)
    {
        Order memory order;



        return order;
    }

}
