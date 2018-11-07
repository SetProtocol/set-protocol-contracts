/*
    Copyright 2018 Set Labs Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
pragma solidity 0.4.24;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


// mock class using BasicToken
contract StandardTokenWithFeeMock is ERC20 {
  using SafeMath for uint256;

  uint256 public decimals = 18;
  string public name;
  string public symbol;
  uint256 public fee;

  mapping (address => uint256) internal _balances;

  mapping (address => mapping (address => uint256)) internal _allowed;

  uint256 internal _totalSupply;

  constructor(
    address initialAccount,
    uint256 initialBalance,
    string _name,
    string _symbol,
    uint256 _fee)
    public
  {
    _mint(initialAccount, initialBalance);
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
    require(_value <= balanceOf(_from));
    require(_value <= allowance(_from, msg.sender));

    uint256 netValueMinusFee = _value.sub(fee);

    _balances[_from] = _balances[_from].sub(_value);
    _balances[_to] = _balances[_to].add(netValueMinusFee);
    _allowed[_from][msg.sender] = _allowed[_from][msg.sender].sub(_value);
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
    require(_value <= _balances[msg.sender]);

    uint256 netValuePlusFee = _value.add(fee);

    // SafeMath.sub will throw if there is not enough balance.
    _balances[msg.sender] = _balances[msg.sender].sub(netValuePlusFee);
    _balances[_to] = _balances[_to].add(_value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function setFee(uint256 _fee) public returns (bool) {
    fee = _fee;
  }
}
