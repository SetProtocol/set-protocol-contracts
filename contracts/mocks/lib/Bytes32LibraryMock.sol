pragma solidity 0.5.7;

import { Bytes32Library } from "../../lib/Bytes32Library.sol";

contract Bytes32LibraryMock {
    function testBytes32ToBytes(bytes32 data)
        external
        pure
        returns (bytes memory)
    {
        return Bytes32Library.bytes32ToBytes(data);
    }

    function testBytes32ToString(bytes32 data)
        external
        pure
        returns (string memory)
    {
        return Bytes32Library.bytes32ToString(data);
    }
}
