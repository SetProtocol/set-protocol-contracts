pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { CompoundUtils } from "../../lib/CompoundUtils.sol";

// Mock contract implementation of CompoundUtils functions
contract CompoundUtilsMock {
    function testConvertCTokenToUnderlying(
        uint256 _cTokenUnits,
        uint256 _exchangeRate
    )
        external
        pure
        returns (uint256)
    {
        return CompoundUtils.convertCTokenToUnderlying(
            _cTokenUnits,
            _exchangeRate
        );
    }
}