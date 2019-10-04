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


import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import { TimeLockUpgradeV2 } from "./TimeLockUpgradeV2.sol";
import { AddressArrayUtils } from "./AddressArrayUtils.sol";


/**
 * @title OracleWhiteList
 * @author Set Protocol
 *
 * WhiteList that matches whitelisted tokens to their on chain price oracle
 */
contract OracleWhiteList is
    Ownable,
    TimeLockUpgradeV2
{
    using AddressArrayUtils for address[];

    /* ============ State Variables ============ */

    address[] public addresses;
    mapping(address => address) public oracleWhiteList;

    /* ============ Events ============ */

    event TokenOraclePairAdded(
        address _tokenAddress,
        address _oracleAddress
    );

    event TokenOraclePairRemoved(
        address _tokenAddress,
        address _oracleAddress
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for OracleWhiteList
     *
     * Allow initial addresses to be passed in so a separate transaction is not required for each.
     * Each token address passed is matched with a corresponding oracle address at the same index.
     * The _initialTokenAddresses and _initialOracleAddresses arrays must be equal length.
     *
     * @param _initialTokenAddresses        Starting set of toke addresses to whitelist
     * @param _initialOracleAddresses       Starting set of oracle addresses to whitelist
     */
    constructor(
        address[] memory _initialTokenAddresses,
        address[] memory _initialOracleAddresses
    )
        public
    {
        // Require that token and oracle address arrays are of equal length
        require(
            _initialTokenAddresses.length == _initialOracleAddresses.length,
            "OracleWhiteList.constructor: Token and Oracle array lengths must match."
        );

        // Add each of initial addresses to state
        for (uint256 i = 0; i < _initialTokenAddresses.length; i++) {
            address tokenAddressToAdd = _initialTokenAddresses[i];

            addresses.push(tokenAddressToAdd);
            oracleWhiteList[tokenAddressToAdd] = _initialOracleAddresses[i];
        }
    }

    /* ============ External Functions ============ */

    /**
     * Add an address to the whitelist
     *
     * @param _tokenAddress    Token address to add to the whitelist
     * @param _oracleAddress   Oracle address to add to the whitelist under _tokenAddress
     */
    function addTokenOraclePair(
        address _tokenAddress,
        address _oracleAddress
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        // Require that token address doesn't have oracle already associated with it
        require(
            oracleWhiteList[_tokenAddress] == address(0),
            "OracleWhiteList.addTokenOraclePair: Token and Oracle pair already exists."
        );

        // Add token address to addresses array
        addresses.push(_tokenAddress);

        // Set oracle address for passed token address
        oracleWhiteList[_tokenAddress] = _oracleAddress;

        emit TokenOraclePairAdded(
            _tokenAddress,
            _oracleAddress
        );
    }

    /**
     * Remove a token oracle pair from the whitelist
     *
     * @param _tokenAddress    Token address to remove to the whitelist
     */
    function removeTokenOraclePair(
        address _tokenAddress
    )
        external
        onlyOwner
    {
        // get oracle address of passed token address
        address oracleAddress = oracleWhiteList[_tokenAddress];

        // Require that an oracle address exists for passed token address
        require(
            oracleAddress != address(0),
            "OracleWhiteList.removeTokenOraclePair: Token Address is not current whitelisted."
        );

        // Remove token address from addresses array
        addresses = addresses.remove(_tokenAddress);

        // Remove oracle associated with token address
        oracleWhiteList[_tokenAddress] = address(0);

        emit TokenOraclePairRemoved(
            _tokenAddress,
            oracleAddress
        );
    }

    /**
     * Edit oracle address associated with a token address
     *
     * @param _tokenAddress    Token address to add to the whitelist
     * @param _oracleAddress   Oracle address to add to the whitelist under _tokenAddress
     */
    function editTokenOraclePair(
        address _tokenAddress,
        address _oracleAddress
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        // Require that token address has oracle already associated with it
        require(
            oracleWhiteList[_tokenAddress] != address(0),
            "OracleWhiteList.addTokenOraclePair: Token and Oracle pair already exists."
        );

        // Set new oracle address for passed token address
        oracleWhiteList[_tokenAddress] = _oracleAddress;

        emit TokenOraclePairAdded(
            _tokenAddress,
            _oracleAddress
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
        returns (address[] memory)
    {
        // Get length of passed array
        uint256 arrayLength = _tokenAddresses.length;

        // Check that passed array length is greater than 0
        require(
            arrayLength > 0,
            "OracleWhiteList.areValidAddresses: Array length must be greater than 0."
        );

        // Instantiate oracle addresses array
        address[] memory oracleAddresses = new address[](arrayLength);

        for (uint256 i = 0; i < arrayLength; i++) {
            // Get oracle address for token address at index i
            oracleAddresses[i] = getOracleAddressByTokenInternal(
                _tokenAddresses[i]
            );
        }

        return oracleAddresses;       
    }

    /**
     * Verifies an array of addresses against the whitelist
     *
     * @param  _tokenAddresses    Array of token addresses to check if oracle exists
     * @return bool               Whether all addresses in the list are whitelsited
     */
    function areValidAddresses(
        address[] calldata _tokenAddresses
    )
        external
        view
        returns (bool)
    {
        // Get length of passed array
        uint256 arrayLength = _tokenAddresses.length;

        // Check that passed array length is greater than 0
        require(
            arrayLength > 0,
            "OracleWhiteList.areValidAddresses: Array length must be greater than 0."
        );

        for (uint256 i = 0; i < arrayLength; i++) {
            // Return false if token address doesn't have matching oracle address
            if (oracleWhiteList[_tokenAddresses[i]] == address(0)) {
                return false;
            }
        }

        return true;
    }

    /* ============ Internal Functions ============ */

    /**
     * Return oracle address associated with a passed token address 
     *
     * @param  _tokenAddress    Address of token
     * @return address          Address of oracle associated with token
     */
    function getOracleAddressByTokenInternal(
        address _tokenAddress
    )
        internal
        view
        returns (address)
    {
        // Require token address to have matching oracle address
        require(
            oracleWhiteList[_tokenAddress] != address(0),
            "OracleWhiteList.getOracleAddressFromToken: No Oracle for that address."
        );

        // Return oracle address associated with token address
        return oracleWhiteList[_tokenAddress];       
    }
}
