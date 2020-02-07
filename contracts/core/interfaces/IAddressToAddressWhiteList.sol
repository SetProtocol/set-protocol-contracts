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

/**
 * @title IAddressToAddressWhiteList
 * @author Set Protocol
 *
 * The IAddressToAddressWhiteList interface exposes the whitelist mapping to check components
 */
interface IAddressToAddressWhiteList {

    /* ============ External Functions ============ */

    /**
     * Returns value of key type address passed in (not in array form)
     *
     * @param  _keyTypeAddress     Address to check
     * @return bool                Whether passed in address is whitelisted
     */
    function addressToAddressWhiteList(
        address _keyTypeAddress
    )
        external
        view
        returns (address);

    /**
     * Verifies an array of key type addresses against the whitelist
     *
     * @param  _addresses    Array of addresses to verify
     * @return bool          Whether all addresses in the list are whitelisted
     */
    function areValidAddresses(
        address[] calldata _addresses
    )
        external
        view
        returns (bool);

    /**
     * Return array of addresses based on passed in key type addresses 
     *
     * @param  _keyTypeAddresses  Array of addresses to mapped addresses for
     * @return address[]          Array of value type addresses
     */
    function getAddressValuesByKeys(
        address[] calldata _keyTypeAddresses
    )
        external
        view
        returns (address[] memory);

    function getAddressValueByKey(
        address _keyTypeAddress
    )
        external
        view
        returns (address);

    function validAddresses()
        external
        view
        returns (address[] memory);
}
