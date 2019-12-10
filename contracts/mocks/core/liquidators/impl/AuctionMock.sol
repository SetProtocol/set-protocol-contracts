pragma solidity 0.5.7;

import { Auction } from "../../../../core/liquidators/impl/Auction.sol";
import { ISetToken } from "../../../../core/interfaces/ISetToken.sol";

// Mock contract implementation of Auction with extra functions for testing
contract AuctionMock is Auction {
    Auction.Setup public auction;

    constructor()
        public
    {}

    function initializeAuction(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
    {
        super.initializeAuction(auction, _currentSet, _nextSet, _startingCurrentSetQuantity);
    }

    function reduceRemainingCurrentSets(
        uint256 _quantity
    )
        external
    {
        super.reduceRemainingCurrentSets(auction, _quantity);
    }

    function validateBidQuantity(
        uint256 _quantity
    )
        external
    {
        super.validateBidQuantity(auction, _quantity);
    }

    function validateAuctionCompletion() external {
        super.validateAuctionCompletion(auction);
    }

    function isAuctionActive() external view returns(bool) {
        return super.isAuctionActive(auction);
    }

    function combinedTokenArray() external view returns(address[] memory) {
        return auction.combinedTokenArray;
    }

    function combinedCurrentSetUnits() external view returns(uint256[] memory) {
        return auction.combinedCurrentSetUnits;
    }

    function combinedNextSetUnits() external view returns(uint256[] memory) {
        return auction.combinedNextSetUnits;
    }
}

