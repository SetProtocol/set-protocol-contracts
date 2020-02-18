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
     * @param  _key     Address to check
     * @return bool                Whether passed in address is whitelisted
     */
    function whitelist(
        address _key
    )
        external
        view
        returns (address);

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
        returns (bool);

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
        returns (address[] memory);

    /**
     * Return value type address associated with a passed key type address 
     *
     * @param  _key               Address of key type
     * @return address            Address associated with _key 
     */
    function getValue(
        address _key
    )
        external
        view
        returns (address);

    /**
     * Return array of all whitelisted addresses
     *
     * @return address[]      Array of key type addresses
     */
    function validAddresses()
        external
        view
        returns (address[] memory);
}
