pragma solidity 0.5.7;

import { SetUSDValuation } from "../../../../core/liquidators/impl/SetUSDValuation.sol";
import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";

contract SetUSDValuationMock {

    function calculateSetTokenDollarValue(
        ISetToken _set,
        IOracleWhiteList _oracleWhitelist
    )
        external
        returns(uint256)
    {
        return SetUSDValuation.calculateSetTokenDollarValue(_set, _oracleWhitelist);
    }

    function calculateTokenAllocationAmountUSD(
        uint256 _tokenPrice,
        uint256 _naturalUnit,
        uint256 _unit,
        uint256 _tokenDecimal
    )
        external
        returns(uint256)
    {
        return SetUSDValuation.calculateTokenAllocationAmountUSD(
            _tokenPrice,
            _naturalUnit,
            _unit,
            _tokenDecimal
        );
    }

}

