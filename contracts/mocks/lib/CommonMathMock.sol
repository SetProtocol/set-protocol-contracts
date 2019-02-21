pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";

import { CommonMath } from "../../lib/CommonMath.sol";

// Mock contract implementation of CommonMathMock functions
contract CommonMathMock {
    function testMaxUInt256()
        external
        pure
        returns(uint256)
    {
        return CommonMath.maxUInt256();
    }

     function testGetPartialAmount(
        uint256 _principal,
        uint256 _numerator,
        uint256 _denominator
    )
        external
        pure
        returns (uint256)
    {
    	return CommonMath.getPartialAmount(
    		_principal,
    		_numerator,
    		_denominator
		);
    }
}
