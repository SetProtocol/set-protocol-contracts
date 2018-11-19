pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { TimeLockUpgrade } from "../../lib/TimeLockUpgrade.sol";

// Mock contract implementation of TimeLockUpgrade functions
contract TimeLockUpgradeMock is
    TimeLockUpgrade
{
    uint256 public testUint;

    function testTimeLockUpgrade(
        uint256 _testUint
    )
        public
        timeLockUpgrade
    {
        testUint = _testUint;
    }
}

