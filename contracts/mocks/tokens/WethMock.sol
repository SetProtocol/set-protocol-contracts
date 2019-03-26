pragma solidity 0.5.7;

import "canonical-weth/contracts/WETH9.sol";

contract WethMock is WETH9 {
	constructor(
	    address initialAccount,
	    uint256 initialBalance
    )
	    public
	{
	    balanceOf[initialAccount] = initialBalance;
	}

    function changeAllowanceProxy(address _owner, address _spender, uint256 _value) public {
        require(_spender != address(0));
        require(_owner != address(0));

        allowance[_owner][_spender] = _value;
        emit Approval(_owner, _spender, _value);
    }
}
