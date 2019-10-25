pragma solidity 0.5.7;

import { SetValuation } from "../../../../core/liquidators/impl/SetValuation.sol";
import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";

contract SetValuationMock {

    function calculateSetTokenDollarValue(
        ISetToken _set,
        IOracleWhiteList _oracleWhitelist
    )
        external
        returns(uint256)
    {
        return SetValuation.calculateSetTokenDollarValue(_set, _oracleWhitelist);
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
        return SetValuation.calculateTokenAllocationAmountUSD(
            _tokenPrice,
            _naturalUnit,
            _unit,
            _tokenDecimal
        );
    }

}

