pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";

import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";

// Mock contract implementation of OrderLibrary functions
contract ERC20WrapperMock {
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
