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
import { IExchange as ZeroEx } from "../../../external/0x/Exchange/interfaces/IExchange.sol";
import { LibBytes } from "../../../external/0x/LibBytes.sol";
import { LibOrder } from "../../../external/0x/Exchange/libs/LibOrder.sol";


/**
 * @title ZeroExOrderDataHandler
 * @author Set Protocol
 *
 * This library contains functions and structs to assist with parsing exchange orders data
 */
library ZeroExOrderDataHandler {
    using SafeMath for uint256;
    using LibBytes for bytes;

    // ============ Constants ============

    bytes4 constant ERC20_SELECTOR = bytes4(keccak256("ERC20Token(address)"));

    // ============ Structs ============

    // We construct the following to allow calling fillOrder on ZeroEx V2 Exchange
    // The layout of this orderData is in the table below.
    // 
    // | Section | Data                  | Offset              | Length          | Contents                      |
    // |---------|-----------------------|---------------------|-----------------|-------------------------------|
    // | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |
    // |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |
    // |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |
    // |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |
    // |         | fillAmount            | 128                 | 32              | taker asset fill amouint      |
    // | Body    | signature             | 160                 | signatureLength | signature in bytes            |
    // |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |

    struct OrderHeader {
        uint256 signatureLength;
        uint256 orderLength;
        uint256 makerAssetDataLength;
        uint256 takerAssetDataLength;
        uint256 fillAmount;
    }

    struct AssetDataAddresses {
        address makerTokenAddress;
        address takerTokenAddress;
    }

    // ============ Internal Functions ============

    /**
     * Parse token address from asset data
     *
     * @param _assetData   Encoded asset data
     * @return Address of ERC20 asset address
     */
    function parseERC20TokenAddress(bytes _assetData)
        internal
        pure
        returns(address)
    {
        // Ensure that the asset is ERC20
        require(_assetData.readBytes4(0) == ERC20_SELECTOR);

        // Return address
        return address(_assetData.readBytes32(4));
    }

    /*
     * Parses the header from order byte array
     * Can only be called by authorized contracts.
     *
     * @param  _orderData    Byte array of order data  
     * @return OrderHeader struct
     */
    function parseOrderHeader(bytes _orderData)
        internal
        pure
        returns (OrderHeader)
    {
        OrderHeader memory header;

        assembly {
            mstore(header,          mload(add(_orderData, 32)))  // signatureLength
            mstore(add(header, 32), mload(add(_orderData, 64)))  // orderLength
            mstore(add(header, 64), mload(add(_orderData, 96)))  // makerAssetDataLength
            mstore(add(header, 96), mload(add(_orderData, 128))) // takerAssetDataLength
            mstore(add(header, 128), mload(add(_orderData, 160))) // fillAmmount
        }

        return header;
    }

    /*
     * Parses the signature from order byte array
     *
     * @param  _signatureLength    Length of signature to slice from order data
     * @param  _ordersData         Byte array of order data
     * @return Byte array containing signature
     */
    function parseSignature(
        uint256 _signatureLength,
        bytes _orderData
    )
        internal
        pure
        returns (bytes)
    {
        bytes memory signature = _orderData.slice(160, _signatureLength.add(160));
        return signature;
    }

    /*
     * Parses the bytes array into ZeroEx order
     *
     * @param  _orderData    Byte array of order data
     * @return LibOrder.Order (0x order) struct
     */
    function parseZeroExOrder(bytes _orderData)
        internal
        pure
        returns(LibOrder.Order memory)
    {
        OrderHeader memory header = parseOrderHeader(_orderData);

        LibOrder.Order memory order = constructZeroExOrder(
            sliceZeroExOrder(
                _orderData,
                header.signatureLength,
                header.orderLength
            ),
            header.makerAssetDataLength,
            header.takerAssetDataLength
        );

        return order;
    }

    // ============ WIP Functions ============

    // Remove and put me into parseZeroExOrder
    function sliceZeroExOrder(
        bytes _orderData,
        uint256 _signatureLength,
        uint256 _orderLength
    )
        internal
        pure
        returns (bytes memory)
    {
        // 160 is the signature start length. The order starts with sig length
        uint256 orderStartAddress = _signatureLength.add(160);

        bytes memory order = _orderData.slice(
            orderStartAddress,
            orderStartAddress.add(_orderLength)
        );
        return order;
    }

    // | Data                       | Location |
    // |----------------------------|----------|
    // | maker                      | 0        |
    // | taker                      | 32       |
    // | feeRecipient               | 64       |
    // | senderAddress              | 96       |
    // | makerAssetAmount           | 128      |
    // | takerAssetAmount           | 160      |
    // | makerFee                   | 192      |
    // | takerFee                   | 224      |
    // | expirationUnixTimeStampSec | 256      |
    // | salt                       | 288      |
    // | makerAssetData             | 320      |
    // | takerAssetData             | 320      |

    // Remove and put me into parseZeroExOrder
    function constructZeroExOrder(
        bytes _zeroExOrder,
        uint256 _makerAssetDataLength,
        uint256 _takerAssetDataLength
    )
        internal
        pure
        returns (LibOrder.Order memory)
    {
        LibOrder.Order memory order;
        uint256 orderDataAddr = _zeroExOrder.contentAddress();

        assembly {
            mstore(order,           mload(orderDataAddr))           // maker
            mstore(add(order, 32),  mload(add(orderDataAddr, 32)))  // taker
            mstore(add(order, 64),  mload(add(orderDataAddr, 64)))  // feeRecipient
            mstore(add(order, 96),  mload(add(orderDataAddr, 96)))  // senderAddress
            mstore(add(order, 128), mload(add(orderDataAddr, 128))) // makerAssetAmount
            mstore(add(order, 160), mload(add(orderDataAddr, 160))) // takerAssetAmount
            mstore(add(order, 192), mload(add(orderDataAddr, 192))) // makerFee
            mstore(add(order, 224), mload(add(orderDataAddr, 224))) // takerFee
            mstore(add(order, 256), mload(add(orderDataAddr, 256))) // expirationUnixTimestampSec
            mstore(add(order, 288), mload(add(orderDataAddr, 288))) // salt
        }

        order.makerAssetData = _zeroExOrder.slice(320, _makerAssetDataLength.add(320));
        order.takerAssetData = _zeroExOrder.slice(_makerAssetDataLength.add(320), _makerAssetDataLength.add(320).add(_takerAssetDataLength));

        return order;       
    }

    // Figure out effective way to put this inside sliceOrderBody once ZeroExExchangeWrapper specs are in
    function getZeroExOrderDataLength(
        bytes _orderData,
        uint256 _offset
    )
        internal
        pure
        returns (uint256)
    {
        OrderHeader memory header;

        uint256 orderDataAddr = _orderData.contentAddress().add(_offset);

        assembly {
            mstore(header,          mload(orderDataAddr))          // signatureLength
            mstore(add(header, 32), mload(add(orderDataAddr, 32))) // orderLength
        }

        return header.signatureLength.add(160).add(header.orderLength);
    }

    function sliceOrderBody(bytes _ordersData, uint256 _offset)
        internal
        pure
        returns (bytes)
    {
        uint256 orderLength = getZeroExOrderDataLength(_ordersData, _offset);

        bytes memory orderBody = _ordersData.slice(
            _offset,
            _offset.add(orderLength)
        );
        return orderBody;
    }
}
