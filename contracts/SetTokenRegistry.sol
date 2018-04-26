pragma solidity 0.4.23;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./lib/Set.sol";
import "./lib/SetFactory.sol";
import "./lib/AddressArrayUtils.sol";

/**
 * @title {Set} Registry
 * @author Felix Feng
 * @dev Implementation of the {Set} registry.
 */
contract SetTokenRegistry is Ownable {
  using AddressArrayUtils for address[];

  struct SetMetadata {
    address setAddress;
    string name;
    string symbol;
  }

  ///////////////////////////////////////////////////////////
  /// States
  ///////////////////////////////////////////////////////////
  SetFactory setFactory;
  address[] public setAddresses;
  mapping (address => SetMetadata) public sets;
  mapping (bytes32 => address) public setAddressByHashedSymbol;
  mapping (bytes32 => address) public setAddressByHashedName;

  ///////////////////////////////////////////////////////////
  /// Events
  ///////////////////////////////////////////////////////////

  event SetTokenCreated(address indexed sender, address indexed setAddress, string name, string symbol);
  event SetTokenAdded(address indexed sender, address indexed setAddress, string name, string symbol);
  event SetTokenRemoved(address indexed sender, address indexed setAddress, string name, string symbol);

  ///////////////////////////////////////////////////////////
  /// Modifiers
  ///////////////////////////////////////////////////////////

  modifier nameDoesNotExist(string _name) {
    require(setAddressByHashedName[keccak256(_name)] == address(0));
    _;
  }

  modifier symbolDoesNotExist(string _symbol) {
    require(setAddressByHashedSymbol[keccak256(_symbol)] == address(0));
    _;
  }

  modifier setDoesNotExist(address _setAddress) {
    require(sets[_setAddress].setAddress == address(0));
    _;
  }

  /**
   * @dev Constructor Function for the {Set} registry
   */
  constructor(SetFactory _setFactory) public {
    setFactory = _setFactory;
  }

  ///////////////////////////////////////////////////////////
  /// Registry Functions
  ///////////////////////////////////////////////////////////

  /**
   * @dev Function creates a new {Set} and add to registry
   */
  function create(address[] _tokens, uint[] _units, string _name, string _symbol)
    public
    nameDoesNotExist(_name)
    symbolDoesNotExist(_symbol)
    returns(address newSetTokenAddress)
  {
    // Instantiate that contract
    Set newSetToken = Set(setFactory.createSet(_tokens, _units));

    // Add to the list of set addresses
    setAddresses.push(address(newSetToken));

    // Add to the mapping of set metadata
    sets[address(newSetToken)] = SetMetadata({
      setAddress: address(newSetToken),
      name: _name,
      symbol: _symbol
    });

    modifyAddressByName(_name, address(newSetToken));
    modifyAddressBySymbol(_symbol, address(newSetToken));

    emit SetTokenCreated(msg.sender, newSetToken, _name, _symbol);

    return newSetToken;
  }

  /**
   * @dev Function adds an existing {Set} to the registry
   */
  function add(address _set, string _name, string _symbol)
    public
    nameDoesNotExist(_name)
    symbolDoesNotExist(_symbol)
    setDoesNotExist(_set)
    onlyOwner
    returns (bool success)
  {
    setAddresses.push(_set);
    sets[_set] = SetMetadata({
      setAddress: _set,
      name: _name,
      symbol: _symbol
    });

    modifyAddressByName(_name, _set);
    modifyAddressBySymbol(_symbol, _set);

    emit SetTokenAdded(msg.sender, _set, _name, _symbol);

    return true;
  }

  /**
   * @dev Function remove a {Set} from the registry
   */
  function remove(address _set, uint _setAddressIndex)
    public
    onlyOwner
    returns(bool success)
  {
    require(_set == setAddresses[_setAddressIndex]);

    SetMetadata memory set = sets[_set];

    emit SetTokenRemoved(
      msg.sender,
      _set,
      set.name,
      set.symbol
    );

    modifyAddressByName(set.name, address(0));
    modifyAddressBySymbol(set.symbol, address(0));

    // Remove from metadata
    delete sets[_set];

    setAddresses.removeByIndex(_setAddressIndex);

    return true;
  }

  ///////////////////////////////////////////////////////////
  /// Setters / Modify to avoid confusion with {Set}
  ///////////////////////////////////////////////////////////
  // function modifySetName(address _Set, string _name) public onlyOwner returns(bool success) {  }

  // function modifySetSymbol(address _Set, string _symbol) public onlyOwner returns(bool success) {}

  ///////////////////////////////////////////////////////////
  /// Getters
  ///////////////////////////////////////////////////////////
  function getSetAddresses() public view returns(address[]) {
    return setAddresses;
  }

  function getSetAddressBySymbol(string _setSymbol)
    public
    view
    returns(address setAddress)
  {
    return setAddressByHashedSymbol[keccak256(_setSymbol)];
  }

  function getSetCount() public view returns(uint length) {
    return setAddresses.length;
  }

  // NOTE: these functions may push 
  function getSetAddressByName(string _name)
    public
    view
    returns(address setAddress)
  {
    return setAddressByHashedName[keccak256(_name)];
  }

  /**
   * @dev Gets a list of set metadata using a set address
   */
  function getSetMetadata(address _set)
    public
    view
    returns(
      address, // set address
      string, // name;
      string // symbol;
    )
  {
    SetMetadata memory set = sets[_set];
    return (
      set.setAddress,
      set.name,
      set.symbol
    );
  }

  ///////////////////////////////////////////////////////////
  /// Private Function
  ///////////////////////////////////////////////////////////

  function modifyAddressByName(string _name, address _set) private returns(bool success) {
    setAddressByHashedName[keccak256(_name)] = _set;
  }

  function modifyAddressBySymbol(string _symbol, address _set) private returns(bool success) {
    setAddressByHashedSymbol[keccak256(_symbol)] = _set;
  }
}
