pragma solidity 0.4.23;
pragma experimental ABIEncoderV2;


import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "./external/SafeMathUint256.sol";
import "./lib/Set.sol";


/**
 * @title {Set}
 * @author Felix Feng
 * @dev Implementation of the basic {Set} token.
 */
contract SetToken is StandardToken, DetailedERC20("", "", 18), Set {
  using SafeMathUint256 for uint256;

  ///////////////////////////////////////////////////////////
  /// Data Structures
  ///////////////////////////////////////////////////////////
  struct Component {
    address address_;
    uint unit_;
  }

  struct UnredeemedComponent {
    uint balance;
    bool isRedeemed;
  }

  ///////////////////////////////////////////////////////////
  /// States
  ///////////////////////////////////////////////////////////
  uint public naturalUnit;
  Component[] public components;
  mapping(address => bool) internal isComponent;
  // Mapping of token address -> user address -> UnredeemedComponent
  mapping(address => mapping(address => UnredeemedComponent)) public unredeemedComponents;


  ///////////////////////////////////////////////////////////
  /// Events
  ///////////////////////////////////////////////////////////
  event LogPartialRedemption(
    address indexed _sender,
    uint indexed _quantity,
    address[] _excludedComponents
  );

  event LogRedeemExcluded(
    address indexed _sender,
    address[] _components
  );

  ///////////////////////////////////////////////////////////
  /// Modifiers
  ///////////////////////////////////////////////////////////
  modifier hasSufficientBalance(uint quantity) {
    // Check that the sender has sufficient components
    // Since the component length is defined ahead of time, this is not 
    // an unbounded loop
    require(balances[msg.sender] >= quantity, "User does not have sufficient balance");
    _;
  }

  modifier validDestination(address _to) {
    require(_to != address(0));
    require(_to != address(this));
    _;
  }

  modifier isMultipleOfNaturalUnit(uint _quantity) {
    require((_quantity % naturalUnit) == 0);
    _;
  }

  modifier isNonZero(uint _quantity) {
    require(_quantity > 0);
    _;
  }

  /**
   * @dev Constructor Function for the issuance of an {Set} token
   * @param _components address[] A list of component address which you want to include
   * @param _units uint[] A list of quantities in gWei of each component (corresponds to the {Set} of _components)
   */
  constructor(address[] _components, uint[] _units, uint _naturalUnit) public {
    // There must be component present
    require(_components.length > 0, "Component length needs to be great than 0");

    // There must be an array of units
    require(_units.length > 0, "Units must be greater than 0");

    // The number of components must equal the number of units
    require(_components.length == _units.length, "Component and unit lengths must be the same");

    require(_naturalUnit > 0);
    naturalUnit = _naturalUnit;

    // As looping operations are expensive, checking for duplicates will be
    // on the onus of the application developer

    // NOTE: It will be the onus of developers to check whether the addressExists
    // are in fact ERC20 addresses
    for (uint i = 0; i < _units.length; i++) {
      // Check that all units are non-zero. Negative numbers will underflow
      uint currentUnits = _units[i];
      require(currentUnits > 0, "Unit declarations must be non-zero");

      // Check that all addresses are non-zero
      address currentComponent = _components[i];
      require(currentComponent != address(0), "Components must have non-zero address");

      // add component to isComponent mapping
      isComponent[currentComponent] = true;

      components.push(Component({
        address_: currentComponent,
        unit_: currentUnits  
      }));
    }
  }

  // Prevent Ether from being sent to the contract
  function () payable {
    revert();
  }

  ///////////////////////////////////////////////////////////
  /// Set Functions
  ///////////////////////////////////////////////////////////

  /**
   * @dev Function to convert component into {Set} Tokens
   *
   * Please note that the user's ERC20 component must be approved by
   * their ERC20 contract to transfer their components to this contract.
   *
   * @param quantity uint The quantity of component desired to convert in Wei
   */
  function issue(uint quantity)
    isMultipleOfNaturalUnit(quantity)
    isNonZero(quantity)
    public returns (bool success) {
    // Transfers the sender's components to the contract
    // Since the component length is defined ahead of time, this is not 
    // an unbounded loop
    for (uint i = 0; i < components.length; i++) {
      address currentComponent = components[i].address_;
      uint currentUnits = components[i].unit_;

      uint transferValue = calculateTransferValue(currentUnits, quantity);

      assert(ERC20(currentComponent).transferFrom(msg.sender, this, transferValue));
    }

    mint(quantity);

    emit LogIssuance(msg.sender, quantity);

    return true;
  }

  /**
   * @dev Function to convert {Set} Tokens into underlying components
   *
   * The ERC20 components do not need to be approved to call this function
   *
   * @param quantity uint The quantity of Sets desired to redeem in Wei
   */
  function redeem(uint quantity)
    public
    isMultipleOfNaturalUnit(quantity)
    hasSufficientBalance(quantity)
    isNonZero(quantity)
    returns (bool success)
  {
    burn(quantity);

    for (uint i = 0; i < components.length; i++) {
      address currentComponent = components[i].address_;
      uint currentUnits = components[i].unit_;

      uint transferValue = calculateTransferValue(currentUnits, quantity);

      // The transaction will fail if any of the components fail to transfer
      assert(ERC20(currentComponent).transfer(msg.sender, transferValue));
    }

    emit LogRedemption(msg.sender, quantity);

    return true;
  }

  /**
   * @dev Function to withdraw a portion of the component tokens of a Set
   *
   * This function should be used in the event that a component token has been
   * paused for transfer temporarily or permanently. This allows users a
   * method to withdraw tokens in the event that one token has been frozen
   *
   * @param quantity uint The quantity of Sets desired to redeem in Wei
   * @param excludedComponents address[] The list of tokens to exclude
   */
  function partialRedeem(uint quantity, address[] excludedComponents)
    public
    isMultipleOfNaturalUnit(quantity)
    isNonZero(quantity)
    hasSufficientBalance(quantity)
    returns (bool success)
  {
    // Excluded tokens should be less than the number of components
    // Otherwise, use the normal redeem function
    require(
      excludedComponents.length < components.length,
      "Excluded component length must be less than component length"
    );
    require(excludedComponents.length > 0, "Excluded components must be non-zero");

    burn(quantity);

    for (uint i = 0; i < components.length; i++) {
      bool isExcluded = false;

      uint transferValue = calculateTransferValue(components[i].unit_, quantity);

      // This is unideal to do a doubly nested loop, but the number of excludedComponents
      // should generally be a small number
      for (uint j = 0; j < excludedComponents.length; j++) {
        address currentExcluded = excludedComponents[j];

        // Check that excluded token is indeed a component in this contract
        assert(isComponent[currentExcluded]);

        // If the token is excluded, add to the user's unredeemed component value
        if (components[i].address_ == currentExcluded) {
          // Check whether component is already redeemed; Ensures duplicate excludedComponents
          // has not been inputted.
          bool currentIsRedeemed = unredeemedComponents[components[i].address_][msg.sender].isRedeemed;
          assert(currentIsRedeemed == false);

          unredeemedComponents[components[i].address_][msg.sender].balance += transferValue;

          // Mark redeemed to ensure no duplicates
          unredeemedComponents[components[i].address_][msg.sender].isRedeemed = true;

          isExcluded = true;
        }
      }

      if (!isExcluded) {
        assert(ERC20(components[i].address_).transfer(msg.sender, transferValue));  
      }
    }

    // Mark all excluded components not redeemed
    for (uint k = 0; k < excludedComponents.length; k++) {
      address currentExcludedToUnredeem = excludedComponents[k];
      unredeemedComponents[currentExcludedToUnredeem][msg.sender].isRedeemed = false;
    }

    emit LogPartialRedemption(msg.sender, quantity, excludedComponents);

    return true;
  }

  /**
   * @dev Function to withdraw tokens that have previously been excluded when calling
   * the redeemExcluded method
   *
   * This function should be used to retrieve tokens that have previously excluded
   * when calling the redeemExcluded function.
   *
   * @param componentsToRedeem address[] The list of tokens to redeem
   * @param quantities uint[] The quantity of Sets desired to redeem in Wei
   */
  function redeemExcluded(address[] componentsToRedeem, uint[] quantities)
    public
    returns (bool success)
  {
    require(quantities.length > 0, "Quantities must be non-zero");
    require(componentsToRedeem.length > 0, "Components redeemed must be non-zero");
    require(quantities.length == componentsToRedeem.length, "Lengths must be the same");

    for (uint i = 0; i < quantities.length; i++) {
      address currentComponent = componentsToRedeem[i];
      uint currentQuantity = quantities[i];

      // Check there is enough balance
      uint remainingBalance = unredeemedComponents[currentComponent][msg.sender].balance;
      require(remainingBalance >= currentQuantity);

      // To prevent re-entrancy attacks, decrement the user's Set balance
      unredeemedComponents[currentComponent][msg.sender].balance = remainingBalance.sub(currentQuantity);

      assert(ERC20(currentComponent).transfer(msg.sender, currentQuantity));
    }

    emit LogRedeemExcluded(msg.sender, componentsToRedeem);

    return true;
  }

  ///////////////////////////////////////////////////////////
  /// Getters
  ///////////////////////////////////////////////////////////

  function componentCount() public view returns(uint componentsLength) {
    return components.length;
  }

  function getComponents() public view returns(address[]) {
    address[] memory componentAddresses = new address[](components.length);
    for (uint i = 0; i < components.length; i++) {
        componentAddresses[i] = components[i].address_;
    }
    return componentAddresses;
  }

  function getUnits() public view returns(uint[]) {
    uint[] memory units = new uint[](components.length);
    for (uint i = 0; i < components.length; i++) {
        units[i] = components[i].unit_;
    }
    return units;
  }

  ///////////////////////////////////////////////////////////
  /// Transfer Updates
  ///////////////////////////////////////////////////////////
  function transfer(address _to, uint256 _value) validDestination(_to) public returns (bool) {
    return super.transfer(_to, _value);
  }

  function transferFrom(address _from, address _to, uint256 _value) validDestination(_to) public returns (bool) {
    return super.transferFrom(_from, _to, _value);
  }

  ///////////////////////////////////////////////////////////
  /// Private Function
  ///////////////////////////////////////////////////////////

  function calculateTransferValue(uint currentUnits, uint quantity) internal returns(uint) {
    return quantity.div(naturalUnit).mul(currentUnits);
  }

  function mint(uint quantity) internal {
    // If successful, increment the balance of the user’s {Set} token
    balances[msg.sender] = balances[msg.sender].add(quantity);

    // Increment the total token supply
    totalSupply_ = totalSupply_.add(quantity);
  }

  function burn(uint quantity) internal {
    balances[msg.sender] = balances[msg.sender].sub(quantity);
    totalSupply_ = totalSupply_.sub(quantity);
  }
}
