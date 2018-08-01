pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { ZeroExOrderDataHandler } from "../../../../core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol";
import { LibBytes } from "../../../../external/0x/LibBytes.sol";
import { LibOrder } from "../../../../external/0x/Exchange/libs/LibOrder.sol";


// Mock class implementing internal OrderHandler methods
contract ZeroExOrderDataHandlerMock {
    using LibBytes for bytes;

    function parseERC20TokenAddress(bytes _assetData)
        public
        returns (address)
    {
        return ZeroExOrderDataHandler.parseERC20TokenAddress(_assetData);
    }

    function parseOrderHeader(bytes _orderData)
        public
        pure
        returns (uint256[5])
    {
        ZeroExOrderDataHandler.OrderHeader memory header = ZeroExOrderDataHandler.parseOrderHeader(_orderData);
        
        return [
            header.signatureLength,
            header.orderLength,
            header.makerAssetDataLength,
            header.takerAssetDataLength,
            header.fillAmount
        ];
    }

    function parseSignature(
        uint256 _signatureLength,
        bytes _orderData
    )
        public
        pure
        returns (bytes)
    {
        return ZeroExOrderDataHandler.parseSignature(_signatureLength, _orderData);
    }

    function parseZeroExOrder(bytes _orderData)
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
}
