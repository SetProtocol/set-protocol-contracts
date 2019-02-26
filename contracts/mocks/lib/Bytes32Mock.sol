pragma solidity 0.5.4;

import { Bytes32 } from "../../lib/Bytes32.sol";

contract Bytes32Mock {
    function testBytes32ToBytes(bytes32 data)
        external
        pure
        returns (bytes memory)
    {
        return Bytes32.bytes32ToBytes(data);
    }

    function testBytes32ToString(bytes32 data)
        external
        pure
        returns (string memory)
    {
        return Bytes32.bytes32ToString(data);
    }
}
