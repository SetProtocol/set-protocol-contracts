pragma solidity 0.5.7;

import { IFeeCalculator } from "../../../core/interfaces/IFeeCalculator.sol";
import { ISetToken } from "../../../core/interfaces/ISetToken.sol";


contract RebalancingSetFeeMock {
    uint256 public unitShares;
    uint256 public naturalUnit;
    ISetToken public currentSet;
    IFeeCalculator public feeCalculator;

    uint256 public fee;

    constructor(
        uint256 _unitShares,
        uint256 _naturalUnit,
        ISetToken _currentSet,
        IFeeCalculator _feeCalculator
    )
		public
	{
        unitShares = _unitShares;
        naturalUnit = _naturalUnit;
        currentSet = _currentSet;
        feeCalculator = _feeCalculator;
    }

    function initialize(
        bytes calldata _feeCallData
    )
        external
    {
        feeCalculator.initialize(_feeCallData);
    }

    function getFee()
        external
        view
        returns (uint256)
    {
        return feeCalculator.getFee();
    }

    function updateAndGetFee()
        external
    {
        fee = feeCalculator.updateAndGetFee();
    }

    function adjustFee(bytes calldata _newFeePercentage)
        external
    {
        feeCalculator.adjustFee(_newFeePercentage);
    }
}