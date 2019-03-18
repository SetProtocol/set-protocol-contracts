pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { CoreIssuanceLibrary } from "../../../core/lib/CoreIssuanceLibrary.sol";

// Mock contract implementation of CoreIssuanceLibraryMock functions
contract CoreIssuanceLibraryMock {
    function testCalculateTransferValues(
        uint256[] memory _componentUnits,
        uint256 _naturalUnit,
        uint256 _quantity
    )
        public
        pure
        returns (uint256[] memory)
    {
        return CoreIssuanceLibrary.calculateTransferValues(
            _componentUnits,
            _naturalUnit,
            _quantity
        );
    }
}
