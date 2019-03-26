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

import { LibBytes } from "../../../external/0x/LibBytes.sol";
import { LibOrder } from "../../../external/0x/Exchange/libs/LibOrder.sol";


/**
 * @title ZeroExOrderLibrary
 * @author Set Protocol
 *
 * This library contains functions and structs to assist with parsing 0x wrapper order data
 *
 * The layout of each wrapper order is in the table below. "ordersData" always refers to one or more byte strings,
 * each containing all of these columns concatenated together. Each of the parse methods (header/body) below takes
 * the entire ordersData along with an offset to parse the next (header/body) specified by the offset. This saves
 * from having to do redudant memCopies to isolate the bytes containing the data to parse.
 *
 * | Section | Data                  | Offset              | Length          | Contents                      |
 * |---------|-----------------------|---------------------|-----------------|-------------------------------|
 * | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |
 * |         | fillAmount            | 32                  | 64              | Taker asset fill amouint      |
 * | Body    | signature             | 64                  | signatureLength | Signature in bytes            |
 * |         | order                 | 64+signatureLength  | 384             | ZeroEx Order                  |
 */
library ZeroExOrderLibrary {
    using LibBytes for bytes;
    using SafeMath for uint256;

    // ============ Structs ============

    struct OrderHeader {
        uint256 signatureLength;
        uint256 fillAmount;
        bytes signature;
    }

    struct ZeroExOrderInformation {
        OrderHeader header;
        LibOrder.Order order;
        address makerToken;
        address takerToken;
    }

    // ============ Internal Functions ============

    /*
     * Parses the header from order byte array
     * Can only be called by authorized contracts.
     *
     * @param  _ordersData   Byte array of order data
     * @param  _offset       Offset to start scanning for order header
     * @return OrderHeader   Struct containing wrapper order header data
     */
    function parseOrderHeader(
        bytes memory _ordersData,
        uint256 _offset
    )
        internal
        pure
        returns (OrderHeader memory)
    {
        OrderHeader memory header;

        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);

        assembly {
            mstore(header,           mload(orderDataStart))           // signatureLength
            mstore(add(header, 32),  mload(add(orderDataStart, 32)))  // fillAmount
        }

        return header;
    }

    /*
     * Parses the bytes array into ZeroEx order
     *
     * | Data                       | Location                      |
     * |----------------------------|-------------------------------|
     * | makerAddress               | 0                             |
     * | takerAddress               | 32                            |
     * | feeRecipientAddress        | 64                            |
     * | senderAddress              | 96                            |
     * | makerAssetAmount           | 128                           |
     * | takerAssetAmount           | 160                           |
     * | makerFee                   | 192                           |
     * | takerFee                   | 224                           |
     * | expirationTimeSeconds      | 256                           |
     * | salt                       | 288                           |
     * | makerToken                 | 320                           |
     * | takerToken                 | 352                           |
     *
     * @param  _ordersData          Byte array of (multiple) 0x wrapper orders
     * @param  _offset              Offset to start scanning for 0x order body
     * @return LibOrder.Order       0x order struct
     */
    function parseZeroExOrder(
        bytes memory _ordersData,
        uint256 _offset
    )
        internal
        pure
        returns (LibOrder.Order memory)
    {
        LibOrder.Order memory order;
        address makerTokenAddress;
        address takerTokenAddress;

        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);

        assembly {
            mstore(order,           mload(orderDataStart))            // maker
            mstore(add(order, 32),  mload(add(orderDataStart, 32)))   // taker
            mstore(add(order, 64),  mload(add(orderDataStart, 64)))   // feeRecipient
            mstore(add(order, 96),  mload(add(orderDataStart, 96)))   // senderAddress
            mstore(add(order, 128), mload(add(orderDataStart, 128)))  // makerAssetAmount
            mstore(add(order, 160), mload(add(orderDataStart, 160)))  // takerAssetAmount
            mstore(add(order, 192), mload(add(orderDataStart, 192)))  // makerFee
            mstore(add(order, 224), mload(add(orderDataStart, 224)))  // takerFee
            mstore(add(order, 256), mload(add(orderDataStart, 256)))  // expirationUnixTimestampSec
            mstore(add(order, 288), mload(add(orderDataStart, 288)))  // salt
            makerTokenAddress := mload(add(orderDataStart, 320))      // makerToken
            takerTokenAddress := mload(add(orderDataStart, 352))      // takerToken
        }

        order.makerAssetData = tokenAddressToAssetData(makerTokenAddress);
        order.takerAssetData = tokenAddressToAssetData(takerTokenAddress);

        return order;
    }
    /*
     * Parses the maker token from the ZeroEx order
     *
     * @param  _ordersData          Byte array of (multiple) 0x wrapper orders
     * @param  _offset              Offset to start scanning for 0x order body
     * @return makerTokenAddress
     */
    function parseMakerTokenFromZeroExOrder(
        bytes memory _ordersData,
        uint256 _offset
    )
        internal
        pure
        returns (address)
    {
        address makerTokenAddress;

        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);

        assembly {
            makerTokenAddress := mload(add(orderDataStart, 320))      // makerToken
        }

        return makerTokenAddress;
    }

    /*
     * Parses the taker token from the ZeroEx order
     *
     * @param  _ordersData          Byte array of (multiple) 0x wrapper orders
     * @param  _offset              Offset to start scanning for 0x order body
     * @return takerTokenAddress
     */
    function parseTakerTokenFromZeroExOrder(
        bytes memory _ordersData,
        uint256 _offset
    )
        internal
        pure
        returns (address)
    {
        address takerTokenAddress;

        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);

        assembly {
            takerTokenAddress := mload(add(orderDataStart, 352))      // takerToken
        }

        return takerTokenAddress;
    }

    /*
     * Encodes an ERC20 token address into 0x asset data
     *
     * @param  _tokenAddress    Address of token to encode into 0x asset data
     * @return bytes            0x asset data representation of a token
     */
    function tokenAddressToAssetData(
        address _tokenAddress
    )
        private
        pure
        returns (bytes memory)
    {
        bytes memory result = new bytes(36);

        // padded version of bytes4(keccak256("ERC20Token(address)"));
        bytes32 selector = 0xf47261b000000000000000000000000000000000000000000000000000000000;

        assembly {
            mstore(add(result, 32), selector)
            mstore(add(result, 36), _tokenAddress)
        }

        return result;
    }
}
