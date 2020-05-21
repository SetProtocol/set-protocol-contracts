pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { TWAPAuction } from "../../../../core/liquidators/twap-impl/TWAPAuction.sol";


// Mock contract implementation of Auction with extra functions for testing
contract TWAPAuctionCaller {
    ITWAPAuction public twapAuction;
    uint256 public rebalanceFailPeriod;

    constructor(
        ITWAPAuction _twapAuction,
        uint256 _rebalanceFailPeriod
    )
        public
    {
        twapAuction = _twapAuction;
        rebalanceFailPeriod = _rebalanceFailPeriod;
    }

    function validateLiquidatorData(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        uint256 _chunkSizeValue,
        uint256 _chunkAuctionPeriod
    )
        public
    {
        twapAuction.testValidateLiquidatorData(
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            _chunkSizeValue,
            _chunkAuctionPeriod
        );
    }
}

interface ITWAPAuction{
    function testValidateLiquidatorData(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        uint256 _chunkSizeValue,
        uint256 _chunkAuctionPeriod
    )
        external;
}