pragma solidity 0.5.7;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract NoDecimalTokenMock is ERC20 {
  string public name;
  string public symbol;

  constructor(
    address initialAccount,
    uint256 initialBalance,
    string memory _name,
    string memory _symbol)
    public
  {
    _mint(initialAccount, initialBalance);
    name = _name;
    symbol = _symbol;
  }
}
