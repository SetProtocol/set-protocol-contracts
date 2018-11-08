pragma solidity 0.4.25;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract NoDecimalTokenMock is ERC20 {
  string public name;
  string public symbol;

  constructor(
    address initialAccount,
    uint256 initialBalance,
    string _name,
    string _symbol)
    public
  {
    _mint(initialAccount, initialBalance);
    name = _name;
    symbol = _symbol;
  }
}
