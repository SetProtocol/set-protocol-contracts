pragma solidity 0.4.25;

import { Bytes32 } from "../../lib/Bytes32.sol";

contract Bytes32Mock {
    function testBytes32ToBytes(bytes32 data)
        external
        pure
        returns(bytes)
    {
        return Bytes32.bytes32ToBytes(data);
    }

    function testBytes32ToString(bytes32 data)
        external
        pure
        returns(string)
    {
        return Bytes32.bytes32ToString(data);
    }
}
