pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { CommonMath } from "../../lib/CommonMath.sol";

// Mock contract implementation of OrderLibrary functions
contract CommonMathMock {
    function testMaxUInt256()
        external
        pure
        returns(uint256)
    {
        return CommonMath.maxUInt256();
    }
}
