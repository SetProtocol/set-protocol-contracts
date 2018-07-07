pragma solidity 0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract DummyToken is MintableToken {
  using SafeMath for uint;
  string public name;
  string public symbol;
  uint public decimals;

  constructor(
    string _name,
    string _symbol,
    uint _decimals,
    uint _totalSupply)
    public
  {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply_ = _totalSupply;
    balances[msg.sender] = _totalSupply;
  }

  function setBalance(address _target, uint _value) public onlyOwner {
    uint currBalance = balanceOf(_target);
    if (_value < currBalance) {
        totalSupply_ = totalSupply_.sub(currBalance.sub(_value));
    } else {
        totalSupply_ = totalSupply_.add(_value.sub(currBalance));
    }
    balances[_target] = _value;
  }
}
