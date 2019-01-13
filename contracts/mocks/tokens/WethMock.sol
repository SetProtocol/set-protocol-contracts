pragma solidity 0.4.25;

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
}