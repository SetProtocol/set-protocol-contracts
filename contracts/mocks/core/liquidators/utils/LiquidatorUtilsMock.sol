pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";
import { LiquidatorUtils } from "../../../../core/liquidators/utils/LiquidatorUtils.sol";


// Mock contract implementation of LiquidatorUtils
contract LiquidatorUtilsMock {

    function testCalculateRebalanceVolume(
        ISetToken _currentSet,
        ISetToken _nextSet,
        IOracleWhiteList _oracleWhiteList,
        uint256 _currentSetQuantity
    )
        external
        view
        returns (uint256)
    {
        return LiquidatorUtils.calculateRebalanceVolume(
            _currentSet,
            _nextSet,
            _oracleWhiteList,
            _currentSetQuantity
        );
    }

    function testCalculateAssetAllocation(
        ISetToken _setToken,
        IOracleWhiteList _oracleWhiteList,
        address _asset
    )
        external
        view
        returns (uint256)
    {
        return LiquidatorUtils.calculateAssetAllocation(
            _setToken,
            _oracleWhiteList,
            _asset
        );
    }
}