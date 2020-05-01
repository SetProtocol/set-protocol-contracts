pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { Auction } from "../../../../core/liquidators/impl/Auction.sol";
import { AuctionGetters } from "../../../../core/liquidators/impl/AuctionGetters.sol";


// Mock contract implementation of AuctionGetters with extra functions for testing
contract AuctionGettersMock is AuctionGetters {

    Auction.Setup public auctionState;

    function auction(address _set) internal view returns(Auction.Setup storage) {
        return auctionState;
    }

    function setState(Auction.Setup memory _state) public {
        auctionState = _state;
    }
}