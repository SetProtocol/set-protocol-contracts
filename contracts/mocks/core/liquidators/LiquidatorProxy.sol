pragma solidity 0.5.7;

import { ILiquidator } from "../../../core/interfaces/ILiquidator.sol";
import { ISetToken } from "../../../core/interfaces/ISetToken.sol";

// Mock contract implementation of Auction with extra functions for testing
contract LiquidatorProxy {
    ILiquidator public liquidator;

    uint256[] private inflow;
    uint256[] private outflow;
    address[] private combinedTokenArray;

    constructor(
        ILiquidator _liquidator
    )
        public
    {
        liquidator = _liquidator;
    }

    function startRebalance(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
    {
        liquidator.startRebalance(
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity
        );
    }

    function settleRebalance() external {
        liquidator.settleRebalance();
    }

    function endFailedRebalance() external {
        liquidator.endFailedRebalance();
    }

    function placeBid(uint256 _quantity) external {
        (
            address[] memory combinedTokens, 
            uint256[] memory inflowArray, 
            uint256[] memory outflowArray
        ) = liquidator.placeBid(_quantity);

        combinedTokenArray = combinedTokens;
        inflow = inflowArray;
        outflow = outflowArray;
    }

    function getBidPrice(
        address _set,
        uint256 _quantity
    )
        external
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        return liquidator.getBidPrice(_set, _quantity);
    }

    function getInflow() external view returns(uint256[] memory) {
        return inflow;
    }
    function getOutflow() external view returns(uint256[] memory) {
        return outflow;
    }
    function getCombinedTokenArray() external view returns(address[] memory) {
        return combinedTokenArray;
    }
}

