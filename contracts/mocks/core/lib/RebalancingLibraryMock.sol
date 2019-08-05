pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { RebalancingLibrary } from "../../../core/lib/RebalancingLibrary.sol";

// Mock contract implementation of RebalancingLibrary functions
contract RebalancingLibraryMock {
    function testComputeTransferValue(
        uint256 _unit,
        uint256 _naturalUnit,
        uint256 _minimumBid,
        address _auctionLibrary
    )
        public
        view
        returns (uint256)
    {
        return RebalancingLibrary.computeTransferValue(
            _unit,
            _naturalUnit,
            _minimumBid,
            _auctionLibrary
        );
    }
}
