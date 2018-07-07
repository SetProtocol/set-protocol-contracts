pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";

// Mock contract implementation of OrderLibrary functions
contract ERC20WrapperMock {
    function allowance(
        address _token,
        address _owner,
        address _spender
    )
        public
        returns (uint256)
    {
        return ERC20Wrapper.allowance(_token, _owner, _spender);
    }

    function approve(
        address _token,
        address _spender,
        uint256 _quantity
    )
        public
    {
        ERC20Wrapper.approve(_token, _spender, _quantity);
    }
}
