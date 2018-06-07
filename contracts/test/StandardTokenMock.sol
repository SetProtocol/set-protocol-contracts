pragma solidity 0.4.24;


import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


// mock class using BasicToken
contract StandardTokenMock is StandardToken {
  uint256 public decimals = 18;
  string public name;
  string public symbol;
  uint256 public totalSupply;

  constructor(
    address initialAccount,
    uint256 initialBalance,
    string _name,
    string _symbol)
    public
  {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
    name = _name;
    symbol = _symbol;
  }

}
