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


import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import { TimeLockUpgradeV2 } from "./TimeLockUpgradeV2.sol";
import { AddressArrayUtils } from "./AddressArrayUtils.sol";


/**
 * @title AddressToAddressWhiteList
 * @author Set Protocol
 *
 * WhiteList that matches whitelisted an address to another addresses
 */
contract AddressToAddressWhiteList is
    Ownable,
    TimeLockUpgradeV2
{
    using AddressArrayUtils for address[];

    /* ============ State Variables ============ */

    address[] public addresses;
    mapping(address => address) public addressToAddressWhiteList;

    /* ============ Events ============ */

    event AddressToAddressPairAdded(
        address _keyTypeAddress,
        address _valueTypeAddress
    );

    event AddressToAddressPairRemoved(
        address _keyTypeAddress,
        address _valueTypeAddress
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for AddressToAddressWhiteList
     *
     * Allow initial addresses to be passed in so a separate transaction is not required for each.
     * Each key type address passed is matched with a corresponding value type token address at the same index.
     * The _initialKeyTypeAddresses and _initialValueTypeAddresses arrays must be equal length.
     *
     * @param _initialKeyTypeAddresses         Starting set of key type addresses to whitelist
     * @param _initialValueTypeAddresses       Starting set of value type addresses to whitelist
     */
    constructor(
        address[] memory _initialKeyTypeAddresses,
        address[] memory _initialValueTypeAddresses
    )
        public
    {
        require(
            _initialKeyTypeAddresses.length == _initialValueTypeAddresses.length,
            "AddressToAddressWhiteList.constructor: Address array lengths must match."
        );

        // Add each of initial addresses to state
        for (uint256 i = 0; i < _initialKeyTypeAddresses.length; i++) {
            address keyTypeAddressToAdd = _initialKeyTypeAddresses[i];

            addresses.push(keyTypeAddressToAdd);
            addressToAddressWhiteList[keyTypeAddressToAdd] = _initialValueTypeAddresses[i];
        }
    }

    /* ============ External Functions ============ */

    /**
     * Add an address to the whitelist
     *
     * @param _keyTypeAddress     Key type address to add to the whitelist
     * @param _valueTypeAddress   Value type address to add to the whitelist under _keyTypeAddress
     */
    function addAddressToAddressPair(
        address _keyTypeAddress,
        address _valueTypeAddress
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        require(
            addressToAddressWhiteList[_keyTypeAddress] == address(0),
            "AddressToAddressWhiteList.addAddressToAddressPair: Address pair already exists."
        );

        addresses.push(_keyTypeAddress);
        addressToAddressWhiteList[_keyTypeAddress] = _valueTypeAddress;

        emit AddressToAddressPairAdded(_keyTypeAddress, _valueTypeAddress);
    }

    /**
     * Remove a address to address pair from the whitelist
     *
     * @param _keyTypeAddress    Key type address to remove to the whitelist
     */
    function removeAddressToAddressPair(
        address _keyTypeAddress
    )
        external
        onlyOwner
    {
        address valueTypeAddress = addressToAddressWhiteList[_keyTypeAddress];

        require(
            valueTypeAddress != address(0),
            "AddressToAddressWhiteList.removeAddressToAddressPair: key type address is not current whitelisted."
        );

        addresses = addresses.remove(_keyTypeAddress);
        addressToAddressWhiteList[_keyTypeAddress] = address(0);

        emit AddressToAddressPairRemoved(_keyTypeAddress, valueTypeAddress);
    }

    /**
     * Edit value type address associated with a key
     *
     * @param _keyTypeAddress       Key type address to add to the whitelist
     * @param _valueTypeAddress     Value type address to add to the whitelist under _keyTypeAddress
     */
    function editAddressToAddressPair(
        address _keyTypeAddress,
        address _valueTypeAddress
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        require(
            addressToAddressWhiteList[_keyTypeAddress] != address(0),
            "AddressToAddressWhiteList.editAddressToAddressPair: Address pair must exist."
        );

        // Set new value type address for passed key type address
        addressToAddressWhiteList[_keyTypeAddress] = _valueTypeAddress;

        emit AddressToAddressPairAdded(
            _keyTypeAddress,
            _valueTypeAddress
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
        return addresses;
    }

    /**
     * Return array of value type addresses based on passed in key type addresses 
     *
     * @param  _keyTypeAddresses   Array of key type addresses to get value type addresses for
     * @return address[]           Array of value type addresses
     */
    function getAddressValuesByKeys(
        address[] calldata _keyTypeAddresses
    )
        external
        view
        returns (address[] memory)
    {
        // Get length of passed array
        uint256 arrayLength = _keyTypeAddresses.length;

        // Check that passed array length is greater than 0
        require(
            arrayLength > 0,
            "AddressToAddressWhiteList.getAddressValuesByKeys: Array length must be greater than 0."
        );

        // Instantiate value type addresses array
        address[] memory valueTypeAddresses = new address[](arrayLength);

        for (uint256 i = 0; i < arrayLength; i++) {
            // Get value type address for key type address at index i
            valueTypeAddresses[i] = getAddressValueByKey(
                _keyTypeAddresses[i]
            );
        }

        return valueTypeAddresses;       
    }

    /**
     * Return value type address associated with a passed key type address 
     *
     * @param  _keyTypeAddress    Address of key type
     * @return address            Address associated with _keyTypeAddress 
     */
    function getAddressValueByKey(
        address _keyTypeAddress
    )
        public
        view
        returns (address)
    {
        // Require key to have matching value type address
        require(
            addressToAddressWhiteList[_keyTypeAddress] != address(0),
            "AddressToAddressWhiteList.getAddressValueByKey: No value for that address."
        );

        // Return address associated with key
        return addressToAddressWhiteList[_keyTypeAddress];       
    }

    /**
     * Verifies an array of addresses against the whitelist
     *
     * @param  _keyTypeAddresses    Array of key type addresses to check if value exists
     * @return bool                 Whether all addresses in the list are whitelisted
     */
    function areValidAddresses(
        address[] calldata _keyTypeAddresses
    )
        external
        view
        returns (bool)
    {
        // Get length of passed array
        uint256 arrayLength = _keyTypeAddresses.length;

        // Check that passed array length is greater than 0
        require(
            arrayLength > 0,
            "AddressToAddressWhiteList.areValidAddresses: Array length must be greater than 0."
        );

        for (uint256 i = 0; i < arrayLength; i++) {
            // Return false if key type address doesn't have matching value type address
            if (addressToAddressWhiteList[_keyTypeAddresses[i]] == address(0)) {
                return false;
            }
        }

        return true;
    }
}