pragma solidity ^0.4.11;

import './lib/StandardToken.sol';
import './lib/ERC20.sol';
import './lib/SafeMath.sol';
import './lib/Set.sol';

/**
 * @title {Set}
 * @author Felix Feng
 * @dev Implementation of the basic {Set} token.
 */
contract SetToken is Set, StandardToken {
  address[] public tokens;
  uint[] public units;

  /**
   * @dev Constructor Function for the issuance of an {Set} token
   * @param _tokens address[] A list of token address which you want to include
   * @param _units uint[] A list of quantities of each token (corresponds to the {Set} of _tokens)
   */  
  function SetToken(address[] _tokens, uint[] _units) {
    // There must be tokens present
    require(_tokens.length > 0);
    
    // There must be an array of units
    require(_units.length > 0);
    
    // The number of tokens must equal the number of units
    require(_tokens.length == _units.length);

    // As looping operations are expensive, checking for duplicates will be
    // on the onus of the application developer

    // NOTE: It will be the onus of developers to check whether the addressExists
    // are in fact ERC20 addresses

    tokens = _tokens;
    units = _units;
  }


  /**
   * @dev Function to convert tokens into {Set} Tokens
   *
   * Please note that the user's ERC20 tokens must be approved by 
   * their ERC20 contract to transfer their tokens to this contract.
   *
   * @param quantity uint The quantity of tokens desired to convert
   */  
  function issue(uint quantity) public returns (bool success) {
    // Transfers the sender's tokens to the contract
    for (uint i = 0; i < tokens.length; i++) {
      address currentToken = tokens[i];
      uint currentUnits = units[i];

      // The transaction will fail if any of the tokens fail to transfer
      assert(ERC20(currentToken).transferFrom(msg.sender, this, currentUnits * quantity));      
    }

    // If successful, increment the balance of the user’s {Set} token
    balances[msg.sender] = SafeMath.add(balances[msg.sender], quantity);

    // Increment the total token supply
    totalSupply = SafeMath.add(totalSupply, quantity);

    LogIssuance(msg.sender, quantity);

    return true;
  }

  /**
   * @dev Function to convert {Set} Tokens into underlying tokens
   *
   * The ERC20 tokens do not need to be approved to call this function
   *
   * @param quantity uint The quantity of tokens desired to redeem
   */  
  function redeem(uint quantity) public returns (bool success) {
    // Check that the sender has sufficient tokens
    require(balances[msg.sender] >= quantity);

    for (uint i = 0; i < tokens.length; i++) {
      address currentToken = tokens[i];
      uint currentUnits = units[i];
      
      // The transaction will fail if any of the tokens fail to transfer
      assert(ERC20(currentToken).transfer(msg.sender, currentUnits * quantity));
    }

    // If successful, decrement the balance of the user’s {Set} token
    balances[msg.sender] = SafeMath.sub(balances[msg.sender], quantity);

    // Decrement the total token supply
    totalSupply = SafeMath.sub(totalSupply, quantity);

    LogRedemption(msg.sender, quantity);

    return true;
  }
}
