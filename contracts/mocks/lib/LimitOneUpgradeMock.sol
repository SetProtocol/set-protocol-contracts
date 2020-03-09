pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { LimitOneUpgrade } from "../../lib/LimitOneUpgrade.sol";

// Mock contract implementation of LimitOneUpgrade functions
contract LimitOneUpgradeMock is
    LimitOneUpgrade
{
    uint256 public testUint;

    function testLimitOneUpgrade(
        address _upgradeAddress,
        uint256 _testUint
    )
        external
        limitOneUpgrade(_upgradeAddress)
        timeLockUpgrade
    {
        testUint = _testUint;
    }

    function removeRegisteredUpgrade(
        address _upgradeAddress,
        bytes32 _upgradeHash
    )
        external
    {
        removeRegisteredUpgradeInternal(_upgradeAddress, _upgradeHash);
    }
}