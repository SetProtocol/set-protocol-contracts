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
pragma experimental "ABIEncoderV2";


import { DetailedERC20 } from "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import { ERC20 } from "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { StandardToken } from "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import "../lib/AddressArrayUtils.sol";


/**
 * @title {Set}
 * @author Felix Feng
 *
 * @dev Implementation of the basic {Set} token.
 *
 */
contract SetToken is
    StandardToken,
    DetailedERC20("", "", 18)
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Constants ============ */
    
    string constant COMPONENTS_INPUT_MISMATCH = "Components and units must be the same length.";
    string constant COMPONENTS_MISSING = "Components must not be empty.";
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

    /* ============ Modifiers ============ */

    modifier isMultipleOfNaturalUnit(uint _quantity) {
        require((_quantity % naturalUnit) == 0);
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

    modifier isNonZero(uint _quantity) {
        require(
            _quantity > 0,
            ZERO_QUANTITY
        );
        _;
    }


    modifier validDestination(address _to) {
        require(_to != address(0));
        require(_to != address(this));
        _;
    }

    /* ============ Constructor ============ */

    /**
     * @dev Constructor Function for the issuance of an {Set} token
     * @param _components address[] A list of component address which you want to include
     * @param _units uint[] A list of quantities in gWei of each component (corresponds to the {Set} of _components)
     */
    constructor(
        address[] _components,
        uint[] _units,
        uint _naturalUnit
    )
        public
        isNonZero(_naturalUnit)
        areValidCreationParameters(_components, _units)
    {
        // As looping operations are expensive, checking for duplicates will be
        // on the onus of the application developer

        // NOTE: It will be the onus of developers to check whether the addressExists
        // are in fact ERC20 addresses
        uint8 minDecimals = 18;
        uint8 currentDecimals;
        for (uint16 i = 0; i < _units.length; i++) {
            // Check that all units are non-zero. Negative numbers will underflow
            uint currentUnits = _units[i];
            require(currentUnits > 0, "Unit declarations must be non-zero");

            // Check that all addresses are non-zero
            address currentComponent = _components[i];
            require(currentComponent != address(0), "Components must have non-zero address");

            // Figure out which of the components has the minimum decimal value
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
            isComponent[keccak256(currentComponent)] = true;

            components.push(Component({
                address_: currentComponent,
                unit_: currentUnits
            }));
        }

        // This is the minimum natural unit possible for a Set with these components.
        require(
            _naturalUnit >= 10**(18 - minDecimals),
            "Set naturalUnit must be greater than minimum of component decimals"
        );

        naturalUnit = _naturalUnit;
    }

    /* ============ Public Functions ============ */

    function mint(
        uint quantity
    )
        external
    {
        balances[msg.sender] = balances[msg.sender].add(quantity);
        totalSupply_ = totalSupply_.add(quantity);
        emit Transfer(address(0), msg.sender, quantity);
    }

    function burn(
        uint quantity
    )
        external
    {
        balances[msg.sender] = balances[msg.sender].sub(quantity);
        totalSupply_ = totalSupply_.sub(quantity);
        emit Transfer(msg.sender, address(0), quantity);
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
        validDestination(_to)
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
        validDestination(_to)
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
        return isComponent[keccak256(_tokenAddress)];
    }

}
