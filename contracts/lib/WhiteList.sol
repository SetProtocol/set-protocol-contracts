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

pragma solidity 0.5.7;


import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";
import { TimeLockUpgrade } from "set-protocol-contract-utils/contracts/lib/TimeLockUpgrade.sol";


/**
 * @title Whitelist
 * @author Set Protocol
 *
 * Generic whitelist for addresses
 */
contract WhiteList is
    Ownable,
    TimeLockUpgrade
{
    using AddressArrayUtils for address[];

    /* ============ State Variables ============ */

    address[] public addresses;
    mapping(address => bool) public whiteList;

    /* ============ Events ============ */

    event AddressAdded(
        address _address
    );

    event AddressRemoved(
        address _address
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for Whitelist
     *
     * Allow initial addresses to be passed in so a separate transaction is not required for each
     *
     * @param _initialAddresses    Starting set of addresses to whitelist
     */
    constructor(
        address[] memory _initialAddresses
    )
        public
    {
        // Add each of initial addresses to state
        for (uint256 i = 0; i < _initialAddresses.length; i++) {
            address addressToAdd = _initialAddresses[i];

            addresses.push(addressToAdd);
            whiteList[addressToAdd] = true;
        }
    }

    /* ============ External Functions ============ */

    /**
     * Add an address to the whitelist
     *
     * @param _address    Address to add to the whitelist
     */
    function addAddress(
        address _address
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        require(
            !whiteList[_address],
            "WhiteList.addAddress: Address has already been whitelisted."
        );

        addresses.push(_address);

        whiteList[_address] = true;

        emit AddressAdded(
            _address
        );
    }

    /**
     * Remove an address from the whitelist
     *
     * @param _address    Address to remove from the whitelist
     */
    function removeAddress(
        address _address
    )
        external
        onlyOwner
    {
        require(
            whiteList[_address],
            "WhiteList.removeAddress: Address is not current whitelisted."
        );

        addresses = addresses.remove(_address);

        whiteList[_address] = false;

        emit AddressRemoved(
            _address
        );
    }

    /**
     * Return array of all whitelisted addresses
     *
     * @return address[]      Array of addresses
     */
    function validAddresses()
        external
        view
        returns (address[] memory)
    {
        return addresses;
    }

    /**
     * Verifies an array of addresses against the whitelist
     *
     * @param  _addresses    Array of addresses to verify
     * @return bool          Whether all addresses in the list are whitelsited
     */
    function areValidAddresses(
        address[] calldata _addresses
    )
        external
        view
        returns (bool)
    {
        for (uint256 i = 0; i < _addresses.length; i++) {
            if (!whiteList[_addresses[i]]) {
                return false;
            }
        }

        return true;
    }
}
