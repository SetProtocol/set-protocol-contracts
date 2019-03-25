pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { IERC20 } from "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";

// Mock contract implementation of CommonMathMock functions
contract ERC20WrapperMock {
    function ensureAllowance(
        address _token,
        address _owner,
        address _spender,
        uint256 _quantity
    )
        external
    {
        ERC20Wrapper.ensureAllowance(_token, _owner, _spender, _quantity);
    }
}
