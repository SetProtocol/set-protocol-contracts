pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { Auction } from "../../../../core/liquidators/impl/Auction.sol";
import { LinearAuction } from "../../../../core/liquidators/impl/LinearAuction.sol";
import { ExponentialPivotAuction } from "../../../../core/liquidators/impl/ExponentialPivotAuction.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";
import { Rebalance } from "../../../../core/lib/Rebalance.sol";

contract ExponentialPivotAuctionMock is ExponentialPivotAuction {
    LinearAuction.State public auction;

    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _pricePrecision,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd
    )
        public
        ExponentialPivotAuction(
            _pricePrecision,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd,
            _oracleWhiteList            
        )
    {}

    function initializeLinearAuction(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
    {
        super.initializeLinearAuction(auction, _currentSet, _nextSet, _startingCurrentSetQuantity);
    }

    function reduceRemainingCurrentSets(uint256 _quantity) external {
        super.reduceRemainingCurrentSets(auction.auction, _quantity);
    }

    function getPrice() external view returns(Rebalance.Price memory) {
        return super.getPrice(auction);
    }
}

