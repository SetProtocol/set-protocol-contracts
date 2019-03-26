pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";

// Mock contract implementation of CommonMathMock functions
contract ERC20WrapperMock {
    function allowance(
        address _token,
        address _owner,
        address _spender
    )
        external
        view
        returns (uint256)
    {
        return ERC20Wrapper.allowance(_token, _owner, _spender);
    }

    function approve(
        address _token,
        address _spender,
        uint256 _quantity
    )
        external
    {
        ERC20Wrapper.approve(_token, _spender, _quantity);
    }

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
