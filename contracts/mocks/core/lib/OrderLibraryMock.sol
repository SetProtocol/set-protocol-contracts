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
        address[5] _addresses,
        uint[6] _values,
        address[] _requiredComponents,
        uint[] _requiredComponentAmounts
    )
        external
        pure
        returns (bytes32)
    {
        return OrderLibrary.generateOrderHash(
            _addresses,
            _values,
            _requiredComponents,
            _requiredComponentAmounts
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
        address[5] _addresses,
        uint256[6] _values,
        address[] _requiredComponents,
        uint256[] _requiredComponentAmounts,
        address _core
    )
        external
        view
    {
        OrderLibrary.IssuanceOrder memory order = OrderLibrary.constructOrder(
            _addresses,
            _values,
            _requiredComponents,
            _requiredComponentAmounts
        );

        OrderLibrary.validateOrder(
            order,
            _core
        );
    }
}
