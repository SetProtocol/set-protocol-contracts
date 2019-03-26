pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { ManagerLibrary } from "../../supplementary/rebalancing-manager/lib/ManagerLibrary.sol";

// Mock contract implementation of ManagerLibrary functions
contract ManagerLibraryMock {
    function calculateAuctionPriceParameters(
        uint256 _currentSetDollarAmount,
        uint256 _nextSetDollarAmount,
        uint256 _auctionLibraryPriceDivisor,
        uint256 _auctionTimeToPivot
    )
        external
        returns (uint256, uint256)
    {
        return ManagerLibrary.calculateAuctionPriceParameters(
            _currentSetDollarAmount,
            _nextSetDollarAmount,
            _auctionLibraryPriceDivisor,
            _auctionTimeToPivot
        );
    }
}
