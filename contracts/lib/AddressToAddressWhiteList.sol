/*
    Copyright 2020 Set Labs Inc.

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

pragma solidity 0.5.7;

import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";
import { TimeLockUpgradeV2 } from "set-protocol-contract-utils/contracts/lib/TimeLockUpgradeV2.sol";


/**
 * @title AddressToAddressWhiteList
 * @author Set Protocol
 *
 * WhiteList that matches addresses to other addresses
 */
contract AddressToAddressWhiteList is
    TimeLockUpgradeV2
{
    using AddressArrayUtils for address[];

    /* ============ State Variables ============ */

    address[] public keys;
    mapping(address => address) public whitelist;

    /* ============ Events ============ */

    event PairAdded(
        address indexed key,
        address value
    );

    event PairRemoved(
        address indexed key,
        address value
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for AddressToAddressWhiteList
     *
     * Allow initial addresses to be passed in so a separate transaction is not required for each.
     * Each key type address passed is matched with a corresponding value type token address at the same index.
     * The _initialKeys and _initialValues arrays must be equal length.
     *
     * @param _initialKeys         Starting set of key type addresses to whitelist
     * @param _initialValues       Starting set of value type addresses to whitelist
     */
    constructor(
        address[] memory _initialKeys,
        address[] memory _initialValues
    )
        public
    {
        require(
            _initialKeys.length == _initialValues.length,
            "AddressToAddressWhiteList.constructor: Address array lengths must match."
        );

        // Add each of initial addresses to state
        for (uint256 i = 0; i < _initialKeys.length; i++) {
            address keyTypeAddressToAdd = _initialKeys[i];

            // Require keys are unique
            require(
                whitelist[keyTypeAddressToAdd] == address(0),
                "AddressToAddressWhiteList.constructor: Key must be unique."
            );

            // Require values are non zero addresses
            require(
                _initialValues[i] != address(0),
                "AddressToAddressWhiteList.constructor: Value must be non zero."
            );

            keys.push(keyTypeAddressToAdd);
            whitelist[keyTypeAddressToAdd] = _initialValues[i];
        }
    }

    /* ============ External Functions ============ */

    /**
     * Add an address to the whitelist
     *
     * @param _key     Key type address to add to the whitelist
     * @param _value   Value type address to add to the whitelist under _key
     */
    function addPair(
        address _key,
        address _value
    )
        external
        timeLockUpgrade
    {
        require(
            whitelist[_key] == address(0),
            "AddressToAddressWhiteList.addPair: Address pair already exists."
        );

        require(
            _value != address(0),
            "AddressToAddressWhiteList.addPair: Value must be non zero."
        );

        keys.push(_key);
        whitelist[_key] = _value;

        emit PairAdded(_key, _value);
    }

    /**
     * Remove a address to address pair from the whitelist
     *
     * @param _key    Key type address to remove to the whitelist
     */
    function removePair(
        address _key
    )
        external
        timeLockUpgrade
    {
        address valueToRemove = whitelist[_key];

        require(
            valueToRemove != address(0),
            "AddressToAddressWhiteList.removePair: key type address is not current whitelisted."
        );

        keys = keys.remove(_key);
        whitelist[_key] = address(0);

        emit PairRemoved(_key, valueToRemove);
    }

    /**
     * Edit value type address associated with a key
     *
     * @param _key       Key type address to add to the whitelist
     * @param _value     Value type address to add to the whitelist under _key
     */
    function editPair(
        address _key,
        address _value
    )
        external
        timeLockUpgrade
    {
        require(
            whitelist[_key] != address(0),
            "AddressToAddressWhiteList.editPair: Address pair must exist."
        );

        require(
            _value != address(0),
            "AddressToAddressWhiteList.editPair: New value must be non zero."
        );

        emit PairRemoved(
            _key,
            whitelist[_key]
        );

        // Set new value type address for passed key type address
        whitelist[_key] = _value;

        emit PairAdded(
            _key,
            _value
        );
    }

    /**
     * Return array of all whitelisted addresses
     *
     * @return address[]      Array of key type addresses
     */
    function validAddresses()
        external
        view
        returns (address[] memory)
    {
        return keys;
    }

    /**
     * Return array of value type addresses based on passed in key type addresses 
     *
     * @param  _key                Array of key type addresses to get value type addresses for
     * @return address[]           Array of value type addresses
     */
    function getValues(
        address[] calldata _key
    )
        external
        view
        returns (address[] memory)
    {
        // Get length of passed array
        uint256 arrayLength = _key.length;

        // Instantiate value type addresses array
        address[] memory values = new address[](arrayLength);

        for (uint256 i = 0; i < arrayLength; i++) {
            // Get value type address for key type address at index i
            values[i] = getValue(
                _key[i]
            );
        }

        return values;       
    }

    /**
     * Return value type address associated with a passed key type address 
     *
     * @param  _key               Address of key type
     * @return address            Address associated with _key 
     */
    function getValue(
        address _key
    )
        public
        view
        returns (address)
    {
        // Require key to have matching value type address
        require(
            whitelist[_key] != address(0),
            "AddressToAddressWhiteList.getValue: No value for that address."
        );

        // Return address associated with key
        return whitelist[_key];       
    }

    /**
     * Verifies an array of addresses against the whitelist
     *
     * @param  _keys                Array of key type addresses to check if value exists
     * @return bool                 Whether all addresses in the list are whitelisted
     */
    function areValidAddresses(
        address[] calldata _keys
    )
        external
        view
        returns (bool)
    {
        // Get length of passed array
        uint256 arrayLength = _keys.length;

        for (uint256 i = 0; i < arrayLength; i++) {
            // Return false if key type address doesn't have matching value type address
            if (whitelist[_keys[i]] == address(0)) {
                return false;
            }
        }

        return true;
    }
}