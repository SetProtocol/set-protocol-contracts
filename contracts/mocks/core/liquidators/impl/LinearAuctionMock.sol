pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { LinearAuction } from "../../../../core/liquidators/impl/LinearAuction.sol";
import { IOracleWhiteList } from "../../../../core/interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";

contract LinearAuctionMock is LinearAuction {
    LinearAuction.State public auction;

    constructor(
        IOracleWhiteList _oracleWhiteList,
        uint256 _pricePrecision,
        uint256 _auctionPeriod,
        uint256 _rangeStart,
        uint256 _rangeEnd
    )
        public
        LinearAuction(
            _pricePrecision,
            _auctionPeriod,
            _rangeStart,
            _rangeEnd,
            _oracleWhiteList            
        )
    {}

    function validateSets(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        external
    {
        super.validateSets(auction, _currentSet, _nextSet);
    }

    function initializeLinearAuction(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
    {
        super.initializeLinearAuction(auction, _currentSet, _nextSet, _startingCurrentSetQuantity);
    }

    function validateBidQuantity(uint256 _quantity) external {
        super.validateBidQuantity(auction, _quantity);
    }

    function reduceRemainingCurrentSets(uint256 _quantity) external {
        super.reduceRemainingCurrentSets(auction, _quantity);
    }

    function validateAuctionCompletion() external {
        super.validateAuctionCompletion(auction);
    }

    function hasAuctionFailed() external view returns(bool) {
        return super.hasAuctionFailed(auction);
    }

    function getCurrentPriceRatio() external view returns(uint256, uint256) {
        return super.getCurrentPriceRatio(auction);
    }

    function getPricedTokenFlows(
        uint256 _quantity
    ) external view returns (address[] memory, uint256[] memory, uint256[] memory) {
        return super.getPricedTokenFlows(auction, _quantity);
    }

    function getLinearPrice() external view returns(uint256) {
        return super.getLinearPrice(auction);
    }
}

