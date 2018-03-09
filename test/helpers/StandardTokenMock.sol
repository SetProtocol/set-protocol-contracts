pragma solidity ^0.4.19;


import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


// mock class using BasicToken
contract StandardTokenMock is StandardToken {
  string public name;
  string public symbol;
  uint256 public totalSupply;

  function StandardTokenMock(
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
