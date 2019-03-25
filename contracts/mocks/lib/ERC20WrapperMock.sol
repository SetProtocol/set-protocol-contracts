pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";

// Mock contract implementation of ERC20WrapperMock functions
contract ERC20WrapperMock {
    function testEnsureAllowance(
        address _token,
        address _owner,
        address _spender,
        uint256 _quantity
    )
        external
    {
        ERC20Wrapper.ensureAllowance(
            _token,
            _owner,
            _spender,
            _quantity
        );
    }
}
