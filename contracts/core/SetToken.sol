/*
    Copyright 2018 Set Labs Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

pragma solidity 0.4.24;


import { DetailedERC20 } from "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import { StandardToken } from "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { ISetFactory } from "./interfaces/ISetFactory.sol";


/**
 * @title SetToken
 * @author Set Protocol
 *
 * Implementation of the basic {Set} token.
 */
contract SetToken is
    StandardToken,
    DetailedERC20
{
    using SafeMath for uint256;

    /* ============ Constants ============ */

    string constant COMPONENTS_INPUT_MISMATCH = "Components and units must be the same length.";
    string constant COMPONENTS_MISSING = "Components must not be empty.";
    string constant INVALID_COMPONENT_UNIT = "Unit declarations must be non-zero.";
    string constant INVALID_COMPONENT_ADDRESS = "Components must have non-zero address.";
    string constant INVALID_NATURAL_UNIT = "Natural unit does not work with component decimals.";
    string constant INVALID_SENDER = "Sender is not permitted to perform this function.";
    string constant UNITS_MISSING = "Units must not be empty.";
    string constant ZERO_QUANTITY = "Quantity must be greater than zero.";

    /* ============ Structs ============ */

    struct Component {
        address address_;
        uint unit_;
    }

    /* ============ State Variables ============ */

    uint public naturalUnit;
    Component[] public components;

    // Mapping of componentHash to isComponent
    mapping(bytes32 => bool) internal isComponent;

    // Address of the Factory contract that created the SetToken
    address public factory;

    /* ============ Modifiers ============ */

    modifier isCore() {
        require(
            msg.sender == ISetFactory(factory).core(),
            INVALID_SENDER
        );
        _;
    }

    // Confirm that all inputs for creating a set are valid
    modifier areValidCreationParameters(address[] _components, uint[] _units) {
        // Confirm an empty _components array is not passed
        require(
            _components.length > 0,
            COMPONENTS_MISSING
        );

        // Confirm an empty _quantities array is not passed
        require(
            _units.length > 0,
            UNITS_MISSING
        );

        // Confirm there is one quantity for every token address
        require(
            _components.length == _units.length,
            COMPONENTS_INPUT_MISMATCH
        );
        _;
    }

    modifier isPositive(uint _quantity) {
        require(
            _quantity > 0,
            ZERO_QUANTITY
        );
        _;
    }

    modifier isValidDestination(address _to) {
        require(_to != address(0));
        require(_to != address(this));
        _;
    }

    /* ============ Constructor ============ */

    /**
     * Constructor function for {Set} token
     *
     * As looping operations are expensive, checking for duplicates will be on the onus of the application developer
     *
     * @param _components address[] A list of component address which you want to include
     * @param _units uint[] A list of quantities in gWei of each component (corresponds to the {Set} of _components)
     * @param _naturalUnit uint The minimum multiple of Sets that can be issued or redeeemed
     * @param _name string The Set's name
     * @param _symbol string the Set's symbol
     */
    constructor(
        address _factory,
        address[] _components,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    )
        public
        DetailedERC20(_name, _symbol, 18)
        isPositive(_naturalUnit)
        areValidCreationParameters(_components, _units)
    {
        // NOTE: It will be the onus of developers to check whether the addressExists
        // are in fact ERC20 addresses
        uint8 minDecimals = 18;
        uint8 currentDecimals;
        for (uint16 i = 0; i < _units.length; i++) {
            // Check that all units are non-zero. Negative numbers will underflow
            uint currentUnits = _units[i];
            require(
                currentUnits > 0,
                INVALID_COMPONENT_UNIT
            );

            // Check that all addresses are non-zero
            address currentComponent = _components[i];
            require(
                currentComponent != address(0),
                INVALID_COMPONENT_ADDRESS
            );

            // Figure out which of the components has the minimum decimal value
            /* solium-disable-next-line security/no-low-level-calls */
            if (currentComponent.call(bytes4(keccak256("decimals()")))) {
                currentDecimals = DetailedERC20(currentComponent).decimals();
                minDecimals = currentDecimals < minDecimals ? currentDecimals : minDecimals;
            } else {
                // If one of the components does not implement decimals, we assume the worst
                // and set minDecimals to 0
                minDecimals = 0;
            }

            // Check the component has not already been added
            require(!tokenIsComponent(currentComponent));

            // add component to isComponent mapping
            isComponent[keccak256(abi.encodePacked(currentComponent))] = true;

            components.push(Component({
                address_: currentComponent,
                unit_: currentUnits
            }));
        }

        // This is the minimum natural unit possible for a Set with these components.
        require(
            _naturalUnit >= uint(10) ** (18 - minDecimals),
            INVALID_NATURAL_UNIT
        );

        factory = _factory;
        naturalUnit = _naturalUnit;
    }

    /* ============ Public Functions ============ */

    /*
     * Mint set token for given address.
     * Can only be called by authorized contracts.
     *
     * @param  _issuer      The address of the issuing account
     * @param  _quantity    The number of sets to attribute to issuer
     */
    function mint(
        address _issuer,
        uint _quantity
    )
        external
        isCore
    {
        // Update token balance of the issuer
        balances[_issuer] = balances[_issuer].add(_quantity);

        // Update the total supply of the set token
        totalSupply_ = totalSupply_.add(_quantity);
    }

    /*
     * Burn set token for given address.
     * Can only be called by authorized contracts.
     *
     * @param  _from        The address of the redeeming account
     * @param  _quantity    The number of sets to burn from redeemer
     */
    function burn(
        address _from,
        uint _quantity
    )
        external
        isCore
        isPositive(_quantity)
    {
        require(balances[_from] >= _quantity);

        balances[_from] = balances[_from].sub(_quantity);
        totalSupply_ = totalSupply_.sub(_quantity);

        emit Transfer(_from, address(0), _quantity);
    }

    /* ============ Getters ============ */

    function getComponents()
        public
        view
        returns(address[])
    {
        address[] memory componentAddresses = new address[](components.length);
        for (uint16 i = 0; i < components.length; i++) {
            componentAddresses[i] = components[i].address_;
        }
        return componentAddresses;
    }

    function getUnits()
        public
        view
        returns(uint[])
    {
        uint[] memory units = new uint[](components.length);
        for (uint16 i = 0; i < components.length; i++) {
            units[i] = components[i].unit_;
        }
        return units;
    }

    /* ============ Transfer Overrides ============ */

    function transfer(
        address _to,
        uint256 _value
    )
        public
        isValidDestination(_to)
        returns (bool)
    {
        return super.transfer(_to, _value);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    )
        public
        isValidDestination(_to)
        returns (bool)
    {
        return super.transferFrom(_from, _to, _value);
    }

    /* ============ Private Helpers ============ */

    function tokenIsComponent(
        address _tokenAddress
    )
        view
        internal
        returns (bool)
    {
        return isComponent[keccak256(abi.encodePacked(_tokenAddress))];
    }
}
