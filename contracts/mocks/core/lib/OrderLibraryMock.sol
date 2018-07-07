pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { OrderLibrary } from "../../../core/lib/OrderLibrary.sol";

// Mock contract implementation of OrderLibrary functions
contract OrderLibraryMock {
    function testGenerateOrderHash(
        address[5] _addresses,
        uint[5] _values
    )
        public
        pure
        returns(bytes32)
    {
        return OrderLibrary.generateOrderHash(
            _addresses,
            _values
        );
    }

    function testValidateSignature(
        bytes32 _orderHash,
        address _signerAddress,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    )
        public
        pure
        returns(bool)
    {
        return OrderLibrary.validateSignature(
            _orderHash,
            _signerAddress,
            _v,
            _r,
            _s
        );
    }
}

