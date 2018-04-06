pragma solidity ^0.4.19;


import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./lib/Set.sol";


/**
 * @title {Set}
 * @author Felix Feng
 * @dev Implementation of the basic {Set} token.
 */
contract SetToken is StandardToken, DetailedERC20("", "", 18), Set {
  using SafeMath for uint256;

  uint256 public totalSupply;

  address[] public components;
  uint[] public units;

  /**
   * @dev Constructor Function for the issuance of an {Set} token
   * @param _components address[] A list of component address which you want to include
   * @param _units uint[] A list of quantities in gWei of each component (corresponds to the {Set} of _components)
   */
  function SetToken(address[] _components, uint[] _units, string _name, string _symbol) public {
    // There must be component present
    require(_components.length > 0);

    // There must be an array of units
    require(_units.length > 0);

    // The number of components must equal the number of units
    require(_components.length == _units.length);

    for (uint i = 0; i < _units.length; i++) {
      // Check that all units are non-zero. Negative numbers will underflow
      uint currentUnits = _units[i];
      require(currentUnits > 0);

      // Check that all addresses are non-zero
      address currentComponent = _components[i];
      require(currentComponent != address(0));
    }

    // As looping operations are expensive, checking for duplicates will be
    // on the onus of the application developer

    // NOTE: It will be the onus of developers to check whether the addressExists
    // are in fact ERC20 addresses

    components = _components;
    units = _units;
    name = _name;
    symbol = _symbol;
  }

  /**
   * @dev Function to convert component into {Set} Tokens
   *
   * Please note that the user's ERC20 component must be approved by
   * their ERC20 contract to transfer their components to this contract.
   *
   * @param quantity uint The quantity of component desired to convert in Wei
   */
  function issue(uint quantity) public returns (bool success) {
    // Transfers the sender's components to the contract
    for (uint i = 0; i < components.length; i++) {
      address currentComponent = components[i];
      uint currentUnits = units[i];

      // Transfer value is defined as the currentUnits (in GWei)
      // multiplied by quantity in Wei divided by the units of gWei.
      // We do this to allow fractional units to be defined
      uint transferValue = currentUnits.mul(quantity).div(10**9);

      // Protect against the case that the gWei divisor results in a value that is 
      // 0 and the user is able to generate Sets without sending a balance
      assert(transferValue > 0);

      assert(ERC20(currentComponent).transferFrom(msg.sender, this, transferValue));
    }

    // If successful, increment the balance of the user’s {Set} token
    balances[msg.sender] = balances[msg.sender].add(quantity);

    // Increment the total token supply
    totalSupply = totalSupply.add(quantity);

    LogIssuance(msg.sender, quantity);

    return true;
  }

  /**
   * @dev Function to convert {Set} Tokens into underlying components
   *
   * The ERC20 components do not need to be approved to call this function
   *
   * @param quantity uint The quantity of components desired to redeem in Wei
   */
  function redeem(uint quantity) public returns (bool success) {
    // Check that the sender has sufficient components
    require(balances[msg.sender] >= quantity);

    // To prevent re-entrancy attacks, decrement the user's Set balance
    balances[msg.sender] = balances[msg.sender].sub(quantity);

    // Decrement the total token supply
    totalSupply = totalSupply.sub(quantity);

    for (uint i = 0; i < components.length; i++) {
      address currentComponent = components[i];
      uint currentUnits = units[i];

      // The transaction will fail if any of the components fail to transfer
      uint transferValue = currentUnits.mul(quantity).div(10**9);

      // Protect against the case that the gWei divisor results in a value that is 
      // 0 and the user is able to generate Sets without sending a balance
      assert(transferValue > 0);

      assert(ERC20(currentComponent).transfer(msg.sender, transferValue));
    }

    LogRedemption(msg.sender, quantity);

    return true;
  }

  function componentCount() public view returns(uint componentsLength) {
    return components.length;
  }

  function getComponents() public view returns(address[]) {
    return components;
  }

  function getUnits() public view returns(uint[]) {
    return units;
  }
}
