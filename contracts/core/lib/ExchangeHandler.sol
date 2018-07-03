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
 * @title ExchangeHandler
 * @author Set Protocol
 *
 * This library contains functions and structs to assist with parsing exchange orders data
 */
library ExchangeHandler {

    // ============ Structs ============

    struct OrderHeader {
        uint8 exchange;
        uint256 orderLength;
    }

    // ============ Internal Functions ============

    /**
     * Function to convert bytes into OrderHeader
     *
     * This will always trail an ExchangeOrderHeader, so we don't need to skip
     * the first 32. See Notes in parseExchangeOrdersHeader
     *
     * @param _headerData   Bytes representing the order body information
     * @return OrderHeader  Struct containing exchange order body data
     */
    function parseOrderHeader(
        bytes _headerData
    )
        internal
        pure
        returns (OrderHeader memory)
    {
        OrderHeader memory header;

        assembly {
            mstore(header,          mload(add(_headerData, 32))) // exchange
            mstore(add(header, 32), mload(add(_headerData, 64))) // orderLength
        }

        return header;
    }
}
