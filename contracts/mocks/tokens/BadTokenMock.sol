pragma solidity 0.4.24;


import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


// mock class using BasicToken
contract BadTokenMock is StandardToken {
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

  /**
  * @dev Transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    // BAD TOKEN which does not update balances properly

    emit Transfer(msg.sender, _to, _value);
    return true;
  }
}
