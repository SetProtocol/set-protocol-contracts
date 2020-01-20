pragma solidity 0.5.7;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract BadCTokenMock is ERC20 {
  uint256 constant public decimals = 18;
  string public name;
  string public symbol;
  address public underlyingToken;

  constructor(
    address initialAccount,
    uint256 initialBalance,
    string memory _name,
    string memory _symbol
  )
    public
  {
    _mint(initialAccount, initialBalance);
    name = _name;
    symbol = _symbol;
  }

  /**
  * @dev Mint function that returns a nonzero number which is an error on Compound
  * @param _value The amount of cTokens to be minted.
  */
  function mint(uint256 _value) public returns (uint256) {
    return 1;
  }

  /**
  * @dev Redeem function that returns a nonzero number which is an error on Compound
  * @param _value The amount of cTokens to be redeemed.
  */
  function redeem(uint256 _value) public returns (uint256) {
    return 1;
  }

  function exchangeRateCurrent()
    public
    returns (uint256)
  {
    return 200000000000000;
  }

  function exchangeRateStored()
    public
    view
    returns (uint256)
  {
    return 200000000000000;
  }
}
