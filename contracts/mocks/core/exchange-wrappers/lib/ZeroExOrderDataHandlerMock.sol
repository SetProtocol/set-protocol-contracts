pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { ZeroExOrderDataHandler } from "../../../../core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol";
import { LibBytes } from "../../../../external/0x/LibBytes.sol";
import { LibOrder } from "../../../../external/0x/Exchange/libs/LibOrder.sol";


// Mock class implementing internal OrderHandler methods
contract ZeroExOrderDataHandlerMock {
    using SafeMath for uint256;
    using LibBytes for bytes;

    function parseERC20TokenAddress(
        bytes _assetData
    )
        public
        returns (address)
    {
        return ZeroExOrderDataHandler.parseERC20TokenAddress(_assetData);
    }

    function parseOrderHeader(
        bytes _ordersData,
        uint256 _offset
    )
        public
        pure
        returns (uint256[5])
    {
        ZeroExOrderDataHandler.OrderHeader memory header = ZeroExOrderDataHandler.parseOrderHeader(
            _ordersData,
            _offset
        );
        
        return [
            header.signatureLength,
            header.orderLength,
            header.makerAssetDataLength,
            header.takerAssetDataLength,
            header.fillAmount
        ];
    }

    function parseZeroExOrder(
        bytes _ordersData,
        uint256 _offset
    )
        public
        pure
        returns(address[4], uint256[6], bytes, bytes)
    {
        ZeroExOrderDataHandler.OrderHeader memory header = ZeroExOrderDataHandler.parseOrderHeader(
            _ordersData,
            _offset
        );

        LibOrder.Order memory order = ZeroExOrderDataHandler.parseZeroExOrder(
            _ordersData,
            header,
            _offset.add(header.signatureLength).add(160)
        );

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
