pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { ZeroExOrderDataHandler } from "../../core/external/lib/ZeroExOrderDataHandler.sol";


// Mock class implementing internal OrderHandler methods
contract MockZeroExOrderDataHandlerLibrary {
    function parseOrderDataHeader(bytes _orderData)
        public
        pure
        returns (uint256[4])
    {
        ZeroExOrderDataHandler.ZeroExHeader memory header = ZeroExOrderDataHandler.parseOrderHeader(_orderData);
        return [
            header.signatureLength,
            header.orderLength,
            header.makerAssetDataLength,
            header.takerAssetDataLength
        ];
    }

    function parseFillAmount(bytes _orderData)
        public
        pure
        returns (uint256)
    {
        return ZeroExOrderDataHandler.parseFillAmount(_orderData);
    }

    function parseSignature(bytes _orderData)
        public
        pure
        returns (bytes)
    {
        ZeroExOrderDataHandler.ZeroExHeader memory header = ZeroExOrderDataHandler.parseOrderHeader(_orderData);
        uint256 signatureLength = header.signatureLength;
        return ZeroExOrderDataHandler.sliceSignature(_orderData, signatureLength);
    }

    function parseZeroExOrderData(bytes _orderData)
        public
        pure
        returns(address[4], uint256[6], bytes, bytes)
    {
        ZeroExOrderDataHandler.Order memory order = ZeroExOrderDataHandler.parseZeroExOrderData(_orderData);

        return (
            [
                order.makerAddress,
                order.takerAddress,
                order.feeRecipientAddress,
                order.senderAddress
            ],
            [
                order.makerAssetAmount,
                order.takerAssetAmount,
                order.makerFee,
                order.takerFee,
                order.expirationTimeSeconds,
                order.salt
            ],
            order.makerAssetData,
            order.takerAssetData
        );
    }    
}
