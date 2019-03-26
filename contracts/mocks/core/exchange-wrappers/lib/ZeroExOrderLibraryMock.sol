pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ZeroExOrderLibrary } from "../../../../core/exchange-wrappers/lib/ZeroExOrderLibrary.sol";
import { LibBytes } from "../../../../external/0x/LibBytes.sol";
import { LibOrder } from "../../../../external/0x/Exchange/libs/LibOrder.sol";


// Mock class implementing internal OrderHandler methods
contract ZeroExOrderLibraryMock {
    using SafeMath for uint256;
    using LibBytes for bytes;

    function parseOrderHeader(
        bytes calldata _ordersData,
        uint256 _offset
    )
        external
        pure
        returns (uint256, uint256)
    {
        ZeroExOrderLibrary.OrderHeader memory header = ZeroExOrderLibrary.parseOrderHeader(
            _ordersData,
            _offset
        );

        return (header.signatureLength, header.fillAmount);
    }

    function parseZeroExOrder(
        bytes calldata _ordersData,
        uint256 _offset
    )
        external
        pure
        returns (address[4] memory, uint256[6] memory, bytes memory, bytes memory)
    {
        ZeroExOrderLibrary.OrderHeader memory header = ZeroExOrderLibrary.parseOrderHeader(
            _ordersData,
            _offset
        );

        LibOrder.Order memory order = ZeroExOrderLibrary.parseZeroExOrder(
            _ordersData,
            _offset.add(header.signatureLength).add(64)
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
