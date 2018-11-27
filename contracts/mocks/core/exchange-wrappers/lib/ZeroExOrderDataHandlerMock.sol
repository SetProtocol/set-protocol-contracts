pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ZeroExOrderDataHandler } from "../../../../core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol";
import { LibBytes } from "../../../../external/0x/LibBytes.sol";
import { LibOrder } from "../../../../external/0x/Exchange/libs/LibOrder.sol";


// Mock class implementing internal OrderHandler methods
contract ZeroExOrderDataHandlerMock {
    using SafeMath for uint256;
    using LibBytes for bytes;

    function parseOrderHeader(
        bytes _ordersData,
        uint256 _offset
    )
        external
        pure
        returns (uint256, uint256, address)
    {
        ZeroExOrderDataHandler.OrderHeader memory header = ZeroExOrderDataHandler.parseOrderHeader(
            _ordersData,
            _offset
        );

        return (header.signatureLength, header.fillAmount, header.makerTokenAddress);
    }

    function parseZeroExOrder(
        bytes _ordersData,
        address _makerTokenAddress,
        address _takerTokenAddress,
        uint256 _offset
    )
        external
        pure
        returns(address[4], uint256[6], bytes, bytes)
    {
        ZeroExOrderDataHandler.OrderHeader memory header = ZeroExOrderDataHandler.parseOrderHeader(
            _ordersData,
            _offset
        );

        LibOrder.Order memory order = ZeroExOrderDataHandler.parseZeroExOrder(
            _ordersData,
            _makerTokenAddress,
            _takerTokenAddress,
            _offset.add(header.signatureLength).add(96)
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
