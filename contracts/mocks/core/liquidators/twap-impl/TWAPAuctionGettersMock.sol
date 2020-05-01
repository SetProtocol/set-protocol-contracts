pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { Auction } from "../../../../core/liquidators/impl/Auction.sol";
import { TWAPAuction } from "../../../../core/liquidators/twap-impl/TWAPAuction.sol";
import { TWAPAuctionGetters } from "../../../../core/liquidators/twap-impl/TWAPAuctionGetters.sol";


// Mock contract implementation of AuctionGetters with extra functions for testing
contract TWAPAuctionGettersMock is TWAPAuctionGetters {
    struct TestTWAPGetters {
        uint256 orderSize;
        uint256 orderRemaining;
        uint256 lastChunkAuctionEnd;
        uint256 chunkAuctionPeriod;
        uint256 chunkSize;
        uint256 remainingCurrentSets;
    }

    Auction.Setup public auctionState;
    TWAPAuction.TWAPState public twapAuctionState;

    function setState(TestTWAPGetters memory _state) public {
        twapAuctionState.orderSize = _state.orderSize;
        twapAuctionState.orderRemaining = _state.orderRemaining;
        twapAuctionState.lastChunkAuctionEnd = _state.lastChunkAuctionEnd;
        twapAuctionState.chunkAuctionPeriod = _state.chunkAuctionPeriod;
        twapAuctionState.chunkSize = _state.chunkSize;
        auctionState.remainingCurrentSets = _state.remainingCurrentSets;
    }

    function twapAuction(address _set) internal view returns(TWAPAuction.TWAPState storage) {
        return twapAuctionState;
    }

    function auction(address _set) internal view returns(Auction.Setup storage) {
        return auctionState;
    }
}