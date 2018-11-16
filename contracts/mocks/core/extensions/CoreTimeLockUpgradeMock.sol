pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { CoreInternal } from "../../../core/extensions/CoreInternal.sol";
import { CoreState } from "../../../core/lib/CoreState.sol";

// Mock contract implementation of CoreTimeLockUpgrade functions
contract CoreTimeLockUpgradeMock is
    CoreState,
    CoreInternal
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

