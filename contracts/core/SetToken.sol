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
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { StandardToken } from "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import { ISetFactory } from "./interfaces/ISetFactory.sol";
import { Bytes32 } from "../lib/Bytes32.sol";


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
    using Bytes32 for bytes32;

    /* ============ Structs ============ */

    struct Component {
        address address_;
        uint256 unit_;
    }

    /* ============ State Variables ============ */

    uint256 public naturalUnit;
    Component[] public components;

    // Mapping of componentHash to isComponent
    mapping(address => bool) internal isComponent;

    // Address of the Factory contract that created the SetToken
    address public factory;

    /* ============ Constructor ============ */

    /**
     * Constructor function for {Set} token
     *
     * As looping operations are expensive, checking for duplicates will be on the onus of the application developer
     *
     * @param _factory          The factory used to create the Set Token
     * @param _components       A list of component address which you want to include
     * @param _units            A list of quantities in gWei of each component (corresponds to the {Set} of _components)
     * @param _naturalUnit      The minimum multiple of Sets that can be issued or redeeemed
     * @param _name             The Set's name
     * @param _symbol           The Set's symbol
     */
    constructor(
        address _factory,
        address[] _components,
        uint256[] _units,
        uint256 _naturalUnit,
        bytes32 _name,
        bytes32 _symbol
    )
        public
        DetailedERC20(
            _name.bytes32ToString(),
            _symbol.bytes32ToString(),
            18
        )
    {
        // Require naturalUnit passed is greater than 0
        require(_naturalUnit > 0, "INVALID_NATURAL_UNIT");

        // Confirm an empty _components array is not passed
        require(_components.length > 0, "EMPTY_ARRAY");

        // Confirm an empty _quantities array is not passed
        require(_units.length > 0, "EMPTY_ARRAY");

        // Confirm there is one quantity for every token address
        require(_components.length == _units.length, "ARRAYS_EQUAL_LENGTHS");

        // NOTE: It will be the onus of developers to check whether the addressExists
        // are in fact ERC20 addresses
        uint8 minDecimals = 18;
        uint8 currentDecimals;
        for (uint256 i = 0; i < _units.length; i++) {
            // Check that all units are non-zero
            uint256 currentUnits = _units[i];
            require(currentUnits > 0, "POSITIVE_QUANTITY_REQUIRED");

            // Check that all addresses are non-zero
            address currentComponent = _components[i];
            require(currentComponent != address(0), "INVALID_ADDRESS");

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
            require(!tokenIsComponent(currentComponent), "DUPLICATE_COMPONENT");

            // add component to isComponent mapping
            isComponent[currentComponent] = true;

            // Add component data to components struct array
            components.push(Component({
                address_: currentComponent,
                unit_: currentUnits
            }));
        }

        // This is the minimum natural unit possible for a Set with these components.
        require(_naturalUnit >= uint(10) ** (uint256(18).sub(minDecimals)), "INVALID_NATURAL_UNIT");

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
        uint256 _quantity
    )
        external
    {
        // Check that function caller is Core
        require(msg.sender == ISetFactory(factory).core(), "CALLER_NOT_CORE");

        // Update token balance of the issuer
        balances[_issuer] = balances[_issuer].add(_quantity);

        // Update the total supply of the set token
        totalSupply_ = totalSupply_.add(_quantity);

        // Emit a transfer log with from address being 0 to indicate mint
        emit Transfer(address(0), _issuer, _quantity);
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
        uint256 _quantity
    )
        external
    {
        // Check that function caller is Core
        require(msg.sender == ISetFactory(factory).core(), "CALLER_NOT_CORE");

        // Require user has tokens to burn
        require(balances[_from] >= _quantity, "INSUFFICIENT_BALANCE");

        // Update token balance of user
        balances[_from] = balances[_from].sub(_quantity);

        // Update total supply of Set Token
        totalSupply_ = totalSupply_.sub(_quantity);

        // Emit a transfer log with to address being 0 indicating burn
        emit Transfer(_from, address(0), _quantity);
    }

    /*
     * Get addresses of all components in the Set
     *
     * @return  componentAddresses       Array of component tokens
     */
    function getComponents()
        public
        view
        returns(address[])
    {
        address[] memory componentAddresses = new address[](components.length);

        // Iterate through components and get address of each component
        for (uint256 i = 0; i < components.length; i++) {
            componentAddresses[i] = components[i].address_;
        }
        return componentAddresses;
    }

    /*
     * Get units of all tokens in Set
     *
     * @return  units       Array of component units
     */
    function getUnits()
        public
        view
        returns(uint256[])
    {
        uint256[] memory units = new uint256[](components.length);

        // Iterate through components and get units of each component
        for (uint256 i = 0; i < components.length; i++) {
            units[i] = components[i].unit_;
        }
        return units;
    }

    /*
     * Checks to make sure token is component of Set
     *
     * @param  _tokenAddress     Address of token being checked
     * @return  bool             True if token is component of Set
     */
    function tokenIsComponent(
        address _tokenAddress
    )
        view
        public
        returns (bool)
    {
        return isComponent[_tokenAddress];
    }
}
