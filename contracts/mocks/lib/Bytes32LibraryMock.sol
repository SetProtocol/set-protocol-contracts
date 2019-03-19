pragma solidity 0.5.4;

import { Bytes32Library } from "../../lib/Bytes32Library.sol";

contract Bytes32LibraryMock {
    function testBytes32LibraryToBytes(bytes32 data)
        external
        pure
        returns (bytes memory)
    {
        return Bytes32Library.bytes32ToBytes(data);
    }

    function testBytes32LibraryToString(bytes32 data)
        external
        pure
        returns (string memory)
    {
        return Bytes32Library.bytes32ToString(data);
    }
}
