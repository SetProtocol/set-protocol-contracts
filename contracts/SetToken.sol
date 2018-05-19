pragma solidity 0.4.23;
pragma experimental ABIEncoderV2;


import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./lib/AddressArrayUtils.sol";
import "./lib/SetInterface.sol";


/**
 * @title {Set}
 * @author Felix Feng
 * @dev Implementation of the basic {Set} token.
 */
contract SetToken is StandardToken, DetailedERC20("", "", 18), SetInterface {
  using SafeMath for uint256;
  using AddressArrayUtils for address[];

  ///////////////////////////////////////////////////////////
  /// Data Structures
  ///////////////////////////////////////////////////////////
  struct Component {
    address address_;
    uint unit_;
  }

  ///////////////////////////////////////////////////////////
  /// States
  ///////////////////////////////////////////////////////////
  uint public naturalUnit;
  Component[] public components;

  // Mapping of componentHash to isComponent
  mapping(bytes32 => bool) internal isComponent;
  // Mapping of index of component -> user address -> balance
  mapping(uint => mapping(address => uint)) internal unredeemedBalances;


  ///////////////////////////////////////////////////////////
  /// Events
  ///////////////////////////////////////////////////////////
  event LogPartialRedemption(
    address indexed _sender,
    uint _quantity,
    bytes32 _excludedComponents
  );

  event LogRedeemExcluded(
    address indexed _sender,
    bytes32 _components
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
  constructor(address[] _components, uint[] _units, uint _naturalUnit)
    isNonZero(_naturalUnit)
    public {
    // There must be component present
    require(_components.length > 0, "Component length needs to be great than 0");

    // There must be an array of units
    require(_units.length > 0, "Units must be greater than 0");

    // The number of components must equal the number of units
    require(_components.length == _units.length, "Component and unit lengths must be the same");

    naturalUnit = _naturalUnit;

    // As looping operations are expensive, checking for duplicates will be
    // on the onus of the application developer

    // NOTE: It will be the onus of developers to check whether the addressExists
    // are in fact ERC20 addresses
    for (uint16 i = 0; i < _units.length; i++) {
      // Check that all units are non-zero. Negative numbers will underflow
      uint currentUnits = _units[i];
      require(currentUnits > 0, "Unit declarations must be non-zero");

      // Check that all addresses are non-zero
      address currentComponent = _components[i];
      require(currentComponent != address(0), "Components must have non-zero address");

      // Check the component has not already been added
      require(!tokenIsComponent(currentComponent));

      // add component to isComponent mapping
      isComponent[keccak256(currentComponent)] = true;

      components.push(Component({
        address_: currentComponent,
        unit_: currentUnits
      }));
    }
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
   * @param _quantity uint The quantity of Sets desired to issue in Wei as a multiple of naturalUnit
   */
  function issue(uint _quantity)
    isMultipleOfNaturalUnit(_quantity)
    isNonZero(_quantity)
    public returns (bool success) {
    // Transfers the sender's components to the contract
    // Since the component length is defined ahead of time, this is not
    // an unbounded loop
    for (uint16 i = 0; i < components.length; i++) {
      address currentComponent = components[i].address_;
      uint currentUnits = components[i].unit_;

      uint preTransferBalance = ERC20(currentComponent).balanceOf(this);

      uint transferValue = calculateTransferValue(currentUnits, _quantity);
      require(ERC20(currentComponent).transferFrom(msg.sender, this, transferValue));

      // Check that preTransferBalance + transfer value is the same as postTransferBalance
      uint postTransferBalance = ERC20(currentComponent).balanceOf(this);
      assert(preTransferBalance.add(transferValue) == postTransferBalance);
    }

    mint(_quantity);

    emit LogIssuance(msg.sender, _quantity);

    return true;
  }

  /**
   * @dev Function to convert {Set} Tokens into underlying components
   *
   * The ERC20 components do not need to be approved to call this function
   *
   * @param _quantity uint The quantity of Sets desired to redeem in Wei as a multiple of naturalUnit
   */
  function redeem(uint _quantity)
    public
    isMultipleOfNaturalUnit(_quantity)
    hasSufficientBalance(_quantity)
    isNonZero(_quantity)
    returns (bool success)
  {
    burn(_quantity);

    for (uint16 i = 0; i < components.length; i++) {
      address currentComponent = components[i].address_;
      uint currentUnits = components[i].unit_;

      uint preTransferBalance = ERC20(currentComponent).balanceOf(this);

      uint transferValue = calculateTransferValue(currentUnits, _quantity);
      require(ERC20(currentComponent).transfer(msg.sender, transferValue));

      // Check that preTransferBalance + transfer value is the same as postTransferBalance
      uint postTransferBalance = ERC20(currentComponent).balanceOf(this);
      assert(preTransferBalance.sub(transferValue) == postTransferBalance);
    }

    emit LogRedemption(msg.sender, _quantity);

    return true;
  }

  /**
   * @dev Function to withdraw a portion of the component tokens of a Set
   *
   * This function should be used in the event that a component token has been
   * paused for transfer temporarily or permanently. This allows users a
   * method to withdraw tokens in the event that one token has been frozen.
   *
   * The mask can be computed by summing the powers of 2 of indexes of components to exclude.
   * For example, to exclude the 0th, 1st, and 3rd components, we pass in the hex of
   * 1 + 2 + 8 = 11, padded to length 32 i.e. 0x000000000000000000000000000000000000000000000000000000000000000b
   *
   * @param _quantity uint The quantity of Sets desired to redeem in Wei
   * @param _componentsToExclude bytes32 Hex of bitmask of components to exclude
   */
  function partialRedeem(uint _quantity, bytes32 _componentsToExclude)
    public
    isMultipleOfNaturalUnit(_quantity)
    isNonZero(_quantity)
    hasSufficientBalance(_quantity)
    returns (bool success)
  {
    // Excluded tokens should be less than the number of components
    // Otherwise, use the normal redeem function
    require(_componentsToExclude > 0, "Excluded components must be non-zero");

    burn(_quantity);

    for (uint16 i = 0; i < components.length; i++) {
      uint transferValue = calculateTransferValue(components[i].unit_, _quantity);

      // Exclude tokens if 2 raised to the power of their indexes in the components
      // array results in a non zero value following a bitwise AND
      if (_componentsToExclude & bytes32(2 ** i) > 0) {
        unredeemedBalances[i][msg.sender] += transferValue;
      } else {
        uint preTransferBalance = ERC20(components[i].address_).balanceOf(this);

        require(ERC20(components[i].address_).transfer(msg.sender, transferValue));

        // Check that preTransferBalance + transfer value is the same as postTransferBalance
        uint postTransferBalance = ERC20(components[i].address_).balanceOf(this);
        assert(preTransferBalance.sub(transferValue) == postTransferBalance);
      }
    }

    emit LogPartialRedemption(msg.sender, _quantity, _componentsToExclude);

    return true;
  }

  /**
   * @dev Function to withdraw tokens that have previously been excluded when calling
   * the partialRedeem method

   * The mask can be computed by summing the powers of 2 of indexes of components to redeem.
   * For example, to redeem the 0th, 1st, and 3rd components, we pass in the hex of
   * 1 + 2 + 8 = 11, padded to length 32 i.e. 0x000000000000000000000000000000000000000000000000000000000000000b
   *
   * @param _componentsToRedeem bytes32 Hex of bitmask of components to redeem
   */
  function redeemExcluded(bytes32 _componentsToRedeem)
    public
    returns (bool success)
  {
    require(_componentsToRedeem > 0, "Components to redeem must be non-zero");

    for (uint16 i = 0; i < components.length; i++) {
      if (_componentsToRedeem & bytes32(2 ** i) > 0) {
        address currentComponent = components[i].address_;
        uint remainingBalance = unredeemedBalances[i][msg.sender];

        // To prevent re-entrancy attacks, decrement the user's Set balance
        unredeemedBalances[i][msg.sender] = 0;

        require(ERC20(currentComponent).transfer(msg.sender, remainingBalance));
      }
    }

    emit LogRedeemExcluded(msg.sender, _componentsToRedeem);

    return true;
  }

  ///////////////////////////////////////////////////////////
  /// Getters
  ///////////////////////////////////////////////////////////
  function getComponents() public view returns(address[]) {
    address[] memory componentAddresses = new address[](components.length);
    for (uint16 i = 0; i < components.length; i++) {
        componentAddresses[i] = components[i].address_;
    }
    return componentAddresses;
  }

  function getUnits() public view returns(uint[]) {
    uint[] memory units = new uint[](components.length);
    for (uint16 i = 0; i < components.length; i++) {
        units[i] = components[i].unit_;
    }
    return units;
  }

  function getUnredeemedBalance(address _componentAddress, address _userAddress) public view returns (uint256) {
    require(tokenIsComponent(_componentAddress));

    uint componentIndex;

    for (uint i = 0; i < components.length; i++) {
      if (components[i].address_ == _componentAddress) {
        componentIndex = i;
      }
    }

    return unredeemedBalances[componentIndex][_userAddress];
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

  function tokenIsComponent(address _tokenAddress) view internal returns (bool) {
    return isComponent[keccak256(_tokenAddress)];
  }

  function calculateTransferValue(uint componentUnits, uint quantity) view internal returns(uint) {
    return quantity.div(naturalUnit).mul(componentUnits);
  }

  function mint(uint quantity) internal {
    balances[msg.sender] = balances[msg.sender].add(quantity);
    totalSupply_ = totalSupply_.add(quantity);
    emit Transfer(address(0), msg.sender, quantity);
  }

  function burn(uint quantity) internal {
    balances[msg.sender] = balances[msg.sender].sub(quantity);
    totalSupply_ = totalSupply_.sub(quantity);
    emit Transfer(msg.sender, address(0), quantity);
  }
}
