pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { CoreTimeLockUpgrade } from "../../../core/extensions/CoreTimeLockUpgrade.sol";
import { CoreInternal } from "../../../core/extensions/CoreInternal.sol";
import { CoreState } from "../../../core/lib/CoreState.sol";

// Mock contract implementation of CoreTimeLockUpgrade functions
contract CoreTimeLockUpgradeMock is
    CoreState,
    CoreInternal,
    CoreTimeLockUpgrade
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

