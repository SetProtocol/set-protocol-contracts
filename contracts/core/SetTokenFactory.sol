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

import { SetToken } from "./SetToken.sol";


/**
 * @title SetTokenFactory
 * @author Set Protocol
 *
 * SetTokenFactory is a smart contract used to deploy new SetToken contracts.
 * SetTokens deployed by the factory can only have their mint and burn functions
 * called by Core
 */
contract SetTokenFactory {

    /* ============ State Variables ============ */

    // Address of the Core contract
    address public core;

    // Array of tracked SetTokens
    address[] public setTokens;

    // Mapping of tracked SetTokens
    mapping(address => bool) public validSets;

    /* ============ Events ============ */

    event SetTokenCreated(
        address indexed _setTokenAddress,
        address[] _components,
        uint256[] _units,
        uint256 _naturalUnit,
        string _name,
        string _symbol
    );

    /* ============ Constructor ============ */

    /**
     * Set core
     *
     * @param  _core   The address of deployed core contract
     */
    constructor(
        address _core
    )
        public
    {
        core = _core;
    }

    /* ============ External Functions ============ */

    /**
     * Deploys a new SetToken contract.
     * Can only be called by authorized core contracts.
     *
     * @param  _components     The address of component tokens
     * @param  _units          The units of each component token
     * @param  _naturalUnit    The minimum unit to be issued or redeemed
     * @param  _name           The name of the new Set
     * @param  _symbol         The symbol of the new Set
     * @param  _callData       Unused byte string containing additional call parameters
     * @return setToken        The address of the newly created SetToken
     */
    function create(
        address[] _components,
        uint256[] _units,
        uint256 _naturalUnit,
        string _name,
        string _symbol,
        bytes _callData
    )
        external
        returns (address)
    {
        // Expecting caller to be Core
        require(msg.sender == core);

        // Create a new SetToken contract
        address setToken = new SetToken(
            this,
            _components,
            _units,
            _naturalUnit,
            _name,
            _symbol
        );

        // Add Set to the mapping of tracked Sets
        validSets[setToken] = true;

        // Add Set to the array of tracked Sets
        setTokens.push(setToken);

        // Emit Set Token creation log
        emit SetTokenCreated(
            setToken,
            _components,
            _units,
            _naturalUnit,
            _name,
            _symbol
        );

        return setToken;
    }

    /**
     * Disable a set token in the mapping of tracked set tokens. Can only be called by Core
     *
     * @param  _set   The address of the SetToken to disable
     */
    function disableSet(
        address _set
    )
        external
    {
        // Expecting caller to be Core
        require(msg.sender == core);

        // Verify SetToken is enabled
        require(validSets[_set]);

        // Mark as false in validSet mapping
        validSets[_set] = false;

        // Find and remove from setTokens array
        for (uint256 i = 0; i < setTokens.length; i++) {
            if (setTokens[i] == _set) {
                setTokens[i] = setTokens[setTokens.length - 1];
                setTokens.length -= 1;
                break;
            }
        }
    }

    /**
     * Check mapping for Set validity
     *
     * @param  _set   The address of the SetToken to verify
     */
    function isSetValid(
        address _set
    )
        external
        view
        returns (bool)
    {
        return validSets[_set];
    }
}
