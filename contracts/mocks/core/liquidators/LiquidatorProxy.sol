pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { ILiquidator } from "../../../core/interfaces/ILiquidator.sol";
import { ISetToken } from "../../../core/interfaces/ISetToken.sol";
import { Rebalance } from "../../../core/lib/Rebalance.sol";
import { TWAPAuction } from "../../../core/liquidators/twap-impl/TWAPAuction.sol";


// Mock contract implementation of Auction with extra functions for testing
contract LiquidatorProxy {
    ILiquidator public liquidator;

    uint256[] private inflow;
    uint256[] private outflow;
    address[] private combinedTokenArray;

    uint256 public rebalanceFailPeriod;

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
        uint256 _startingCurrentSetQuantity,
        bytes calldata _liquidatorData
    )
        external
    {
        liquidator.startRebalance(
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            _liquidatorData
        );
    }

    function settleRebalance() external {
        liquidator.settleRebalance();
    }

    function endFailedRebalance() external {
        liquidator.endFailedRebalance();
    }

    function placeBid(uint256 _quantity) external {
        Rebalance.TokenFlow memory tokenFlow = liquidator.placeBid(_quantity);

        combinedTokenArray = tokenFlow.addresses;
        inflow = tokenFlow.inflow;
        outflow = tokenFlow.outflow;
    }

    function getBidPrice(
        address _set,
        uint256 _quantity
    )
        external
        view
        returns (Rebalance.TokenFlow memory)
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

    function setAuctionFailPeriod(uint256 _newFailPeriod) external {
        rebalanceFailPeriod = _newFailPeriod;
    }
}

