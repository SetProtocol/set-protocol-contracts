pragma solidity 0.5.7;

import { TimeLockUpgradeV3 } from "../../lib/TimeLockUpgradeV3.sol";

// Mock contract implementation of TimeLockUpgradeV3 functions
contract TimeLockUpgradeV3Mock is
    TimeLockUpgradeV3
{
    uint256 public testUint;

    function testTimeLockUpgradeV3(
        uint256 _testUint
    )
        external
        timeLockUpgradeV3(msg.sender, callerIsOwner)
    {
        testUint = _testUint;
    }

    function callerIsOwner(
        address _caller
    )
        internal
        returns (bool)
    {
        return _caller == owner();
    }
}