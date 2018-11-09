pragma solidity 0.4.25;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


// mock class using BasicToken
contract StandardTokenMock is ERC20 {
  uint256 public decimals;
  string public name;
  string public symbol;

  constructor(
    address initialAccount,
    uint256 initialBalance,
    string _name,
    string _symbol,
    uint256 _decimals)
    public
  {
    _mint(initialAccount, initialBalance);
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
  }
}
