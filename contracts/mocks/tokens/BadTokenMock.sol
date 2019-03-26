pragma solidity 0.5.7;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


// mock class using BasicToken
contract BadTokenMock is ERC20 {
  uint256 constant public decimals = 18;
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

  /**
  * @dev Transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balanceOf(msg.sender));

    // BAD TOKEN which does not update balances properly

    emit Transfer(msg.sender, _to, _value);
    return true;
  }
}
