pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { OrderLibrary } from "../../../core/lib/OrderLibrary.sol";

// Mock contract implementation of OrderLibrary functions
contract OrderLibraryMock {
    function testGetEIP712OrderSchemaHash()
        public
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
        public
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
        public
        pure
        returns (uint256)
    {
        return OrderLibrary.getPartialAmount(
            _principal,
            _numerator,
            _denominator
        );
    }
}

