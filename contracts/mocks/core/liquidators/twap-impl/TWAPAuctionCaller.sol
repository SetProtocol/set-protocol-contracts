pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { TWAPAuction } from "../../../../core/liquidators/twap-impl/TWAPAuction.sol";


// Mock contract implementation of Auction with extra functions for testing
contract TWAPAuctionCaller {
    ITWAPAuction public twapAuction;
    uint256 public failAuctionPeriod;

    constructor(
        ITWAPAuction _twapAuction,
        uint256 _failAuctionPeriod
    )
        public
    {
        twapAuction = _twapAuction;
        failAuctionPeriod = _failAuctionPeriod;
    }

    function validateLiquidatorData(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        TWAPAuction.TWAPLiquidatorData memory _liquidatorData
    )
        public
    {
        twapAuction.testValidateLiquidatorData(
            _currentSet,
            _nextSet,
            _startingCurrentSetQuantity,
            _liquidatorData
        );
    }
}

interface ITWAPAuction{
    function testValidateLiquidatorData(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity,
        TWAPAuction.TWAPLiquidatorData calldata _liquidatorData
    )
        external;
}