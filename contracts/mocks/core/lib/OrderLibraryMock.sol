pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { OrderLibrary } from "../../../core/lib/OrderLibrary.sol";

// Mock contract implementation of OrderLibrary functions
contract OrderLibraryMock {
    function testGetEIP712OrderSchemaHash()
        external
        pure
        returns (bytes32)
    {
        return OrderLibrary.getEIP712OrderSchemaHash();
    }

    function testGenerateOrderHash(
        OrderLibrary.IssuanceOrder memory _order
    )
        public
        pure
        returns (bytes32)
    {
        return OrderLibrary.generateOrderHash(
            _order
        );
    }

    function getPartialAmount(
        uint256 _principal,
        uint256 _numerator,
        uint256 _denominator
    )
        external
        pure
        returns (uint256)
    {
        return OrderLibrary.getPartialAmount(
            _principal,
            _numerator,
            _denominator
        );
    }

    function validateOrder(
        OrderLibrary.IssuanceOrder memory _order,
        address _core
    )
        public
        view
    {
        OrderLibrary.validateOrder(
            _order,
            _core
        );
    }
}
