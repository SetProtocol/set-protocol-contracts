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

import { RebalancingToken } from "./RebalancingToken.sol";
import { IFactory } from "./interfaces/IFactory.sol";
import { ISetToken } from "./interfaces/ISetToken.sol";
import { LibBytes } from "../external/0x/LibBytes.sol";


/**
 * @title SetTokenFactory
 * @author Set Protocol
 *
 * RebalancingTokenFactory is a smart contract used to deploy new RebalancingToken contracts.
 * RebalancingTokens deployed by the factory can only have their mint and burn functions
 * called by Core
 */
contract RebalancingTokenFactory {
    using LibBytes for bytes;

    /* ============ State Variables ============ */

    // Address of the Core contract
    address public core;

    // Array of tracked SetTokens
    address[] public rebalancingTokens;

    // ============ Structs ============

    struct InitRebalancingParameters {
        address manager;
        uint256 proposalPeriod;
        uint256 rebalanceInterval;
    }

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

    /* ============ Public Functions ============ */

    /**
     * Deploys a new RebalancingToken contract, conforming to IFactory
     * Can only be called by core contracts.
     *
     *
     * | Data                       | Location                      |
     * |----------------------------|-------------------------------|
     * | manager                    | 32                            |
     * | proposalPeriod             | 64                            |
     * | rebalanceInterval          | 96                            |
     * 
     * @param  _components     The address of component tokens
     * @param  _units          The units of each component token
     * @param  _               Unused natural unit parameters, passed in to conform to IFactory
     * @param  _name           The name of the new RebalancingToken
     * @param  _symbol         The symbol of the new RebalancingToken
     * @param  _callData       Byte string containing additional call parameters
     * @return setToken        The address of the newly created SetToken
     */
    function create(
        address[] _components,
        uint256[] _units,
        uint256 _,
        string _name,
        string _symbol,
        bytes _callData
    )
        external
        returns (address)
    {
        // Expecting caller to be Core
        require(msg.sender == core);

        // Retrieve address of initial Set for rebalancing token
        address startingSet = _components[0];

        // Validate the initial Set in the rebalancing token
        validateStartingSet(
            startingSet
        );

        // Parse _callData for additional parameters
        InitRebalancingParameters memory parameters = parseRebalanceSetCallData(
            _callData
        );

        // Create a new SetToken contract
        address rebalancingToken = new RebalancingToken(
            this,
            parameters.manager,
            startingSet,
            _units[0],
            parameters.proposalPeriod,
            parameters.rebalanceInterval,
            _name,
            _symbol
        );

        rebalancingTokens.push(rebalancingToken);

        return rebalancingToken;
    }

    /* ============ Private Functions ============ */

    function parseRebalanceSetCallData(
        bytes _callData
    )
        private
        returns (InitRebalancingParameters memory)
    {
        InitRebalancingParameters memory parameters;

        assembly {
            mstore(parameters,           mload(add(_callData, 32)))  // manager
            mstore(add(parameters, 32),  mload(add(_callData, 64)))  // proposalPeriod
            mstore(add(parameters, 64),  mload(add(_callData, 96)))  // rebalanceInterval
        }

        return parameters;
    }

    function validateStartingSet(
        address _startingSet
    )
        private
    {
        ISetToken setToken = ISetToken(_startingSet);
        IFactory setTokenFactory = IFactory(setToken.factory());

        // Expect Set to rebalance to be valid and enabled Set
        require(setTokenFactory.core() == core && setTokenFactory.isSetValid(_startingSet));
    }
}
