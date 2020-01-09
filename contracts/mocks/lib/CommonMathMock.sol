pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { CommonMath } from "../../lib/CommonMath.sol";

// Mock contract implementation of CommonMathMock functions
contract CommonMathMock {
    function testMaxUInt256()
        external
        pure
        returns (uint256)
    {
        return CommonMath.maxUInt256();
    }

    function testSafePower(
        uint256 a,
        uint256 pow
    )
        external
        pure
        returns (uint256 result)
    {
        return CommonMath.safePower(a, pow);
    }

    function testScaleFactor()
        external
        pure
        returns (uint256 result)
    {
        return CommonMath.scaleFactor();
    }

    function testScale(
        uint256 a
    )
        external
        pure
        returns (uint256 result)
    {
        return CommonMath.scale(a);
    }

    function testDeScale(
        uint256 a
    )
        external
        pure
        returns (uint256 result)
    {
        return CommonMath.deScale(a);
    }

    function testDivCeil(
        uint256 a,
        uint256 b
    )
        external
        pure
        returns(uint256)
    {
        return CommonMath.divCeil(a, b);
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

    function testCeilLog10(uint256 _value)
        external
        pure
        returns(uint256)
    {
        return CommonMath.ceilLog10(_value);
    }
}
