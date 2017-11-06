pragma solidity ^0.4.11;

/**
 * @title Set interface
 */
contract Set {

  function issue(uint quantity) public returns (bool success);
  function redeem(uint quantity) public returns (bool success);

  event LogIssuance(address _sender, uint _quantity);
  event LogRedemption(address _sender, uint _quantity);

}