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

import { CoreState } from "../lib/CoreState.sol";
import { ISetFactory } from "../interfaces/ISetFactory.sol";


/**
 * @title CoreFactory
 * @author Set Protocol
 *
 * The CoreFactory contract contains Set Token creation operations
 */
contract CoreFactory is
    CoreState
{
    /* ============ Events ============ */

    event SetTokenCreated(
        address indexed _setTokenAddress,
        address _factory,
        address[] _components,
        uint256[] _units,
        uint256 _naturalUnit,
        bytes32 _name,
        bytes32 _symbol
    );

    /* ============ External Functions ============ */

    /**
     * Deploys a new Set Token and adds it to the valid list of SetTokens
     *
     * @param  _factory              The address of the Factory to create from
     * @param  _components           The address of component tokens
     * @param  _units                The units of each component token
     * @param  _naturalUnit          The minimum unit to be issued or redeemed
     * @param  _name                 The bytes32 encoded name of the new Set
     * @param  _symbol               The bytes32 encoded symbol of the new Set
     * @param  _callData             Byte string containing additional call parameters
     * @return setTokenAddress       The address of the new Set
     */
    function createSet(
        address _factory,
        address[] calldata _components,
        uint256[] calldata _units,
        uint256 _naturalUnit,
        bytes32 _name,
        bytes32 _symbol,
        bytes calldata _callData
    )
        external
        returns (address)
    {
        // Verify Factory is linked to Core
        require(
            state.validFactories[_factory],
            "CreateSet"
        );

        // Create the Set
        address newSetTokenAddress = ISetFactory(_factory).createSet(
            _components,
            _units,
            _naturalUnit,
            _name,
            _symbol,
            _callData
        );

        // Add Set to the mapping of tracked Sets
        state.validSets[newSetTokenAddress] = true;

        // Add Set to the array of tracked Sets
        state.setTokens.push(newSetTokenAddress);

        // Emit Set Token creation log
        emit SetTokenCreated(
            newSetTokenAddress,
            _factory,
            _components,
            _units,
            _naturalUnit,
            _name,
            _symbol
        );

        return newSetTokenAddress;
    }
}
