pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { ZeroExOrderDataHandler } from "../../core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol";
import { LibBytes } from "../../external/LibBytes.sol";
import { LibOrder } from "../../external/0x/Exchange/libs/LibOrder.sol";


// Mock class implementing internal OrderHandler methods
contract MockZeroExOrderDataHandlerLibrary {
    using LibBytes for bytes;

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
        return ZeroExOrderDataHandler.sliceSignature(_orderData);
    }

    function parseZeroExOrderData(bytes _orderData)
        public
        pure
        returns(address[4], uint256[6], bytes, bytes)
    {
        LibOrder.Order memory order = ZeroExOrderDataHandler.parseZeroExOrder(_orderData);

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

    function parseERC20TokenAddress(bytes _assetData)
        public
        returns (address)
    {
        address tokenAddress = ZeroExOrderDataHandler.parseERC20TokenAddress(_assetData);
        return tokenAddress;
    }
}
