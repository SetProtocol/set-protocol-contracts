pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { UnrestrictedTimeLockUpgrade } from "../../lib/UnrestrictedTimeLockUpgrade.sol";

// Mock contract implementation of UnrestrictedTimeLockUpgrade functions
contract UnrestrictedTimeLockUpgradeMock is
    UnrestrictedTimeLockUpgrade
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

    function removeRegisteredUpgrade(
        bytes32 _upgradeHash
    )
        external
        onlyOwner
    {
        removeRegisteredUpgradeInternal(_upgradeHash);
    }
}

