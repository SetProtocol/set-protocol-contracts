pragma solidity 0.4.23;


/**
 * @title Set interface
 */
contract SetInterface {

  /**
   * @dev Function to convert component into {Set} Tokens
   *
   * Please note that the user's ERC20 component must be approved by
   * their ERC20 contract to transfer their components to this contract.
   *
   * @param _quantity uint The quantity of Sets desired to issue in Wei as a multiple of naturalUnit
   */
  function issue(uint _quantity) public returns (bool success);
  
  /**
   * @dev Function to convert {Set} Tokens into underlying components
   *
   * The ERC20 components do not need to be approved to call this function
   *
   * @param _quantity uint The quantity of Sets desired to redeem in Wei as a multiple of naturalUnit
   */
  function redeem(uint _quantity) public returns (bool success);

  event LogIssuance(
    address indexed _sender,
    uint _quantity
  );

  event LogRedemption(
    address indexed _sender,
    uint _quantity
  );
}
