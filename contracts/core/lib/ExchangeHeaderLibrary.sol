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

import { LibBytes } from "../../external/0x/LibBytes.sol";


/**
 * @title ExchangeHeaderLibrary
 * @author Set Protocol
 *
 * This library contains functions and structs to assist with parsing exchange orders data
 */
library ExchangeHeaderLibrary {
    using LibBytes for bytes;
    using SafeMath for uint256;

    // ============ Structs ============

    struct ExchangeHeader {
        uint8 exchange;
        uint8 orderCount;
        uint256 orderDataBytesLength;
    }

    function EXCHANGE_HEADER_LENGTH()
        internal
        pure
        returns (uint256)
    {
        return uint256(96);
    }

    // ============ Internal Functions ============

    /**
     * Function to convert bytes into ExchangeHeader
     *
     * @param _orderData        Bytes representing the order body information
     * @param _offset           Bytes to offset orderData by
     * @return ExchangeHeader   Struct containing data for a batch of exchange orders
     */
    function parseExchangeHeader(
        bytes memory _orderData,
        uint256 _offset
    )
        internal
        pure
        returns (ExchangeHeader memory)
    {
        ExchangeHeader memory header;

        uint256 headerDataStart = _orderData.contentAddress().add(_offset);

        assembly {
            mstore(header,          mload(headerDataStart))            // exchange
            mstore(add(header, 32), mload(add(headerDataStart, 32)))   // orderCount
            mstore(add(header, 64), mload(add(headerDataStart, 64)))   // orderDataBytesLength
        }

        return header;
    }

    /**
     * Function to extract the exchange body from the order data
     *
     * @param _orderData                Bytes representing the exchange order information
     * @param _scannedBytes             Number representing the number of bytes already processed
     * @param _exchangeDataLength       Length of the exchange data from the exchange data header
     * @return ExchangeBody  Bytes representing the exchange body
     */
    function sliceBodyData(
        bytes memory _orderData,
        uint256 _scannedBytes,
        uint256 _exchangeDataLength
    )
        internal
        pure
        returns (bytes memory)
    {
        bytes memory bodyData = LibBytes.slice(
            _orderData,
            _scannedBytes.add(EXCHANGE_HEADER_LENGTH()),
            _scannedBytes.add(_exchangeDataLength)
        );

        return bodyData;
    }
}
