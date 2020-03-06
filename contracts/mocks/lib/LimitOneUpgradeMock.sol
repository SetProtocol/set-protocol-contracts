pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { LimitOneUpgrade } from "../../lib/LimitOneUpgrade.sol";

// Mock contract implementation of LimitOneUpgrade functions
contract LimitOneUpgradeMock is
    LimitOneUpgrade
{
    uint256 public testUint;

    function testLimitOneUpgrade(
        uint256 _testUint
    )
        external
        limitOneUpgrade(msg.sender)
        timeLockUpgrade
    {
        testUint = _testUint;
    }
}