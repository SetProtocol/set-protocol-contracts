pragma solidity 0.4.23;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./interfaces/ISetToken.sol";
import "./interfaces/ISetFactory.sol";
import "../lib/AddressArrayUtils.sol";


/**
 * @title {Set} Registry
 * @author Felix Feng
 * @dev Implementation of the {Set} registry.
 */
contract SetTokenRegistry is Ownable {
    using AddressArrayUtils for address[];

    ///////////////////////////////////////////////////////////
    /// Data Structures
    ///////////////////////////////////////////////////////////

    struct SetMetadata {
        address setAddress;
        string name;
        string symbol;
    }
        
    ///////////////////////////////////////////////////////////
    /// States
    ///////////////////////////////////////////////////////////
    ISetFactory setFactory;
    address[] public setAddresses;
    mapping (address => SetMetadata) public sets;
    mapping (bytes32 => address) public setAddressByHashedSymbol;
    mapping (bytes32 => address) public setAddressByHashedName;

    ///////////////////////////////////////////////////////////
    /// Events
    ///////////////////////////////////////////////////////////

    event SetTokenCreated(
        address indexed sender,
        address indexed setAddress,
        string name,
        string symbol
    );
    event SetTokenAdded(
        address indexed sender,
        address indexed setAddress,
        string name,
        string symbol
    );
    event SetTokenRemoved(
        address indexed sender,
        address indexed setAddress,
        string name,
        string symbol
    );
    event SetTokenNameUpdated(
        address indexed sender,
        address indexed setAddress,
        string oldName,
        string newName
    );
    event SetTokenSymbolUpdated(
        address indexed sender,
        address indexed setAddress,
        string oldSymbol,
        string newSymbol
    );

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
    constructor(ISetFactory _setFactory) public {
        setFactory = _setFactory;
    }

    ///////////////////////////////////////////////////////////
    /// Registry Functions
    ///////////////////////////////////////////////////////////

    /**
    * @dev Function creates a new {Set} and add to registry
    */
    function create(
        address[] _tokens,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    )
        public
        nameDoesNotExist(_name)
        symbolDoesNotExist(_symbol)
        returns(address)
    {
        // Instantiate that contract
        ISetToken newSetToken = ISetToken(
            setFactory.createSet(
                _tokens,
                _units,
                _naturalUnit
            )
        );

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

        emit SetTokenCreated(
            msg.sender,
            newSetToken,
            _name,
            _symbol
        );

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
        returns (bool)
    {
        setAddresses.push(_set);
        sets[_set] = SetMetadata({
            setAddress: _set,
            name: _name,
            symbol: _symbol
        });

        modifyAddressByName(_name, _set);
        modifyAddressBySymbol(_symbol, _set);

        emit SetTokenAdded(
            msg.sender,
            _set, _name,
            _symbol
        );

        return true;
    }

    /**
    * @dev Function remove a {Set} from the registry
    */
    function remove(address _set, uint _setAddressIndex)
        public
        onlyOwner
        returns (bool)
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
    function modifySetName(
        address _set,
        string _name
    )
        public
        onlyOwner
        returns (bool)
    {
        string memory existingName = sets[address(_set)].name;
        modifyAddressByName(existingName, address(0));

        sets[address(_set)].name = _name;
        modifyAddressByName(_name, _set);

        emit SetTokenNameUpdated(
            msg.sender,
            _set,
            existingName,
            _name
        );

        return true;
    }

    function modifySetSymbol(
        address _set,
        string _symbol
    )
        public
        onlyOwner
        returns (bool)
    {
        string memory existingSymbol = sets[address(_set)].symbol;
        modifyAddressBySymbol(existingSymbol, address(0));

        sets[address(_set)].symbol = _symbol;
        modifyAddressBySymbol(_symbol, _set);

        emit SetTokenNameUpdated(
            msg.sender,
            _set,
            existingSymbol,
            _symbol
        );

        return true;
    }

    ///////////////////////////////////////////////////////////
    /// Getters
    ///////////////////////////////////////////////////////////
    function getSetAddresses()
        public
        view
        returns(address[])
    {
        return setAddresses;
    }

    function getSetAddressBySymbol(
        string _setSymbol
    )
        public
        view
        returns(address)
    {
        return setAddressByHashedSymbol[keccak256(_setSymbol)];
    }

    function getSetCount()
        public
        view
        returns(uint)
    {
        return setAddresses.length;
    }

    function getSetAddressByName(
        string _name
    )
        public
        view
        returns(address)
    {
        return setAddressByHashedName[keccak256(_name)];
    }

    /**
    * @dev Gets a list of set metadata using a set address
    */
    function getSetMetadata(
        address _set
    )
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

    function modifyAddressByName(
        string _name,
        address _set
    )
        private
        returns(bool)
    {
        setAddressByHashedName[keccak256(_name)] = _set;
        return true;
    }

    function modifyAddressBySymbol(
        string _symbol,
        address _set
    )
        private
        returns(bool)
    {
        setAddressByHashedSymbol[keccak256(_symbol)] = _set;
        return true;
    }
}
