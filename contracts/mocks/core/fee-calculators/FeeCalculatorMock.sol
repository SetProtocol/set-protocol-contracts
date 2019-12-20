pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { IFeeCalculator } from "../../../core/interfaces/IFeeCalculator.sol";

contract FeeCalculatorMock {

    function testInitialize(
        address _feeCalculator,
        bytes calldata _feeCalculatorData
    )
        external
    {
        return IFeeCalculator(_feeCalculator).initialize(_feeCalculatorData);
    }

    function testGetFee(
        address _feeCalculator
    )
        external
        view
        returns(uint256)
    {
        return IFeeCalculator(_feeCalculator).getFee();
    }
}
