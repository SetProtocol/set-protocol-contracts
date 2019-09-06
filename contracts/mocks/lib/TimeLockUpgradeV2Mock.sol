pragma solidity 0.5.7;

import { TimeLockUpgradeV2 } from "../../lib/TimeLockUpgradeV2.sol";

// Mock contract implementation of TimeLockUpgradeV2 functions
contract TimeLockUpgradeV2Mock is
    TimeLockUpgradeV2
{
    uint256 public testUint;

    function testTimeLockUpgrade(
        uint256 _testUint
    )
        external
        timeLockUpgrade
    {
        testUint = _testUint;
    }
}

