/*
    Copyright 2019 Set Labs Inc.

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
 * @title IOracleWhiteList
 * @author Set Protocol
 *
 * The IWhiteList interface exposes the whitelist mapping to check components
 */
interface IOracleWhiteList {

    /* ============ External Functions ============ */

    /**
     * Returns oracle of passed token address (not in array form)
     *
     * @param  _tokenAddress       Address to check
     * @return bool                Whether passed in address is whitelisted
     */
    function oracleWhiteList(
        address _tokenAddress
    )
        external
        view
        returns (address);

    /**
     * Verifies an array of token addresses against the whitelist
     *
     * @param  _addresses    Array of addresses to verify
     * @return bool          Whether all addresses in the list are whitelsited
     */
    function areValidAddresses(
        address[] calldata _addresses
    )
        external
        view
        returns (bool);

    /**
     * Return array of oracle addresses based on passed in token addresses 
     *
     * @param  _tokenAddresses    Array of token addresses to get oracle addresses for
     * @return address[]          Array of oracle addresses
     */
    function getOracleAddressesByToken(
        address[] calldata _tokenAddresses
    )
        external
        view
        returns (address[] memory);

    function getOracleAddressByToken(
        address _token
    )
        external
        view
        returns (address);
}
