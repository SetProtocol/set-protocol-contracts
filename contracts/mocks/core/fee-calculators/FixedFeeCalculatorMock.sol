pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { FixedFeeCalculator } from "../../../core/fee-calculators/FixedFeeCalculator.sol";

contract FixedFeeCalculatorMock is FixedFeeCalculator {
    bool public isCalled;

    // Override updateAndGetFee to test
    function updateAndGetFee()
        external
        returns(uint256)
    {
        isCalled = true;

        return fees[msg.sender];
    }
}
