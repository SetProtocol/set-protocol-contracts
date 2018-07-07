pragma solidity 0.4.24;


import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";


// mock class using BasicToken
contract StandardTokenWithFeeMock is StandardToken {
  using SafeMath for uint256;

  uint256 public decimals = 18;
  string public name;
  string public symbol;
  uint256 public totalSupply;
  uint256 public fee;

  constructor(
    address initialAccount,
    uint256 initialBalance,
    string _name,
    string _symbol,
    uint256 _fee)
    public
  {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
    name = _name;
    symbol = _symbol;
    fee = _fee;
  }

  /**
   * @dev Transfer tokens from one address to another with a fee component
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amount of tokens to be transferred
   */
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[_from]);
    require(_value <= allowed[_from][msg.sender]);

    uint256 netValueMinusFee = _value.sub(fee);

    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(netValueMinusFee);
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
    emit Transfer(_from, _to, _value);
    return true;
  }

  /**
  * @dev transfer token for a specified address with a fee component applied to the send
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    uint256 netValuePlusFee = _value.add(fee);

    // SafeMath.sub will throw if there is not enough balance.
    balances[msg.sender] = balances[msg.sender].sub(netValuePlusFee);
    balances[_to] = balances[_to].add(_value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function setFee(uint256 _fee) public returns (bool) {
    fee = _fee;
  }
}
