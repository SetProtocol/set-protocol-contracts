pragma solidity ^0.4.11;


import '../../contracts/lib/StandardToken.sol';


// mock class using BasicToken
contract StandardTokenMock is StandardToken {

  function StandardTokenMock(address initialAccount, uint256 initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}