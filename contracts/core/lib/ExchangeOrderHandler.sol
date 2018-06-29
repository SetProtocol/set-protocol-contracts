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


/**
 * @title ExchangeOrderHandler
 * @author Set Protocol
 *
 * This library contains functions and structs to assist with parsing exchange orders data
 */
library ExchangeOrderHandler {

    // ============ Structs ============

    struct IssuanceOrder {
        address setToken;
        uint256 quantity;
        address makerToken;
        uint256 makerTokenAmount;
        uint256 expiration;
        address feeToken;
        uint256 feeAmount;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    struct ExchangeOrdersHeader {
        uint8 orderCount;
    }

    struct ExchangeOrderBody {
        uint8 exchange;
        uint8 orderLength;
    }

    // ============ Internal Functions ============

    /**
     * Function to convert bytes into ExchangeOrdersHeader
     *
     * Skipping the first 32 bytes in an array which stores the length
     *
     * @param _orderHeader            Bytes representing the order header information
     * @return ExchangeOrdersHeader   Struct containing exchange order header data
     */
    function parseExchangeOrdersHeader(
        bytes _orderHeader
    )
        internal
        pure
        returns (ExchangeOrdersHeader memory)
    {
        ExchangeOrdersHeader memory header;

        assembly {
            mstore(header, mload(add(_orderHeader, 32))) // orderCount
        }

        return header;
    }

    /**
     * Function to convert bytes into ExchangeOrderBody
     *
     * This will always trail an ExchangeOrderHeader, so we don't need to skip
     * the first 32. See Notes in parseExchangeOrdersHeader
     *
     * @param _orderBody           Bytes representing the order body information
     * @return ExchangeOrderBody   Struct containing exchange order body data
     */
    function parseExchangeOrderBody(
        bytes _orderBody
    )
        internal
        pure
        returns (ExchangeOrderBody memory)
    {
        ExchangeOrderBody memory body;

        assembly {
            mstore(body,          mload(add(_orderBody, 32))) // exchange
            mstore(add(body, 32), mload(add(_orderBody, 64))) // orderLength
        }

        return body;
    }
}
