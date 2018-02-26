pragma solidity 0.4.18;


/**
 * @title Set interface
 */
contract Set {
  function issue(uint quantity) public returns (bool success);
  function redeem(uint quantity) public returns (bool success);

  event LogIssuance(
    address indexed _sender,
    uint indexed _quantity
  );

  event LogRedemption(
    address indexed _sender,
    uint indexed _quantity
  );
}
