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

import { RebalancingSetToken } from "./RebalancingSetToken.sol";
import { ICore } from "./interfaces/ICore.sol";
import { LibBytes } from "../external/0x/LibBytes.sol";


/**
 * @title RebalancingSetTokenFactory
 * @author Set Protocol
 *
 * RebalancingSetTokenFactory is a smart contract used to deploy new RebalancingSetToken contracts.
 * RebalancingSetTokens deployed by the factory can only have their mint and burn functions
 * called by Core
 */
contract RebalancingSetTokenFactory {
    using LibBytes for bytes;

    /* ============ State Variables ============ */

    // Address of the Core contract used to verify factory when creating a Set
    address public core;

    // Minimum amount of time between rebalances in seconds
    uint256 public minimumRebalanceInterval;

    // Minimum amount of time users can review proposals
    uint256 public minimumProposalPeriod;

    // ============ Structs ============

    struct InitRebalancingParameters {
        address manager;
        uint256 rebalanceInterval;
        uint256 proposalPeriod;
        uint256 entranceFee;
        uint256 rebalanceFee;
    }

    /* ============ Constructor ============ */

    /**
     * Set core. Also requires a minimum rebalance interval and minimum proposal periods that are enforced
     * on RebalancingSetToken
     *
     * @param  _core                       Address of deployed core contract
     * @param  _minimumRebalanceInterval   Minimum amount of time between rebalances in seconds
     * @param  _minimumProposalPeriod      Minimum amount of time users can review proposals in seconds
     */
    constructor(
        address _core,
        uint256 _minimumRebalanceInterval,
        uint256 _minimumProposalPeriod
    )
        public
    {
        core = _core;
        minimumRebalanceInterval = _minimumRebalanceInterval;
        minimumProposalPeriod = _minimumProposalPeriod;
    }

    /* ============ Public Functions ============ */

    /**
     * Deploys a new RebalancingSetToken contract, conforming to IFactory
     * Can only be called by core contracts.
     *
     *
     * | Data                       | Location                      |
     * |----------------------------|-------------------------------|
     * | manager                    | 32                            |
     * | proposalPeriod             | 64                            |
     * | rebalanceInterval          | 96                            |
     * | entranceFee                | 128                           |
     * | rebalanceFee               | 160                           |
     *
     * @param  _components     The address of component tokens
     * @param  _units          The units of each component token
     * -- Unused natural unit parameters, passed in to conform to IFactory --
     * @param  _name           The bytes32 encoded name of the new RebalancingSetToken
     * @param  _symbol         The bytes32 encoded symbol of the new RebalancingSetToken
     * @param  _callData       Byte string containing additional call parameters
     * @return setToken        The address of the newly created SetToken
     */
    function create(
        address[] _components,
        uint256[] _units,
        uint256,
        bytes32 _name,
        bytes32 _symbol,
        bytes _callData
    )
        external
        returns (address)
    {
        // Expecting caller to be Core
        require(msg.sender == core, "ONLY_CORE_CAN_CREATE_REBAL_SET");

        // Ensure components and units length are 1
        require(_components.length == 1 && _units.length == 1, "ARRAY_LENGTHS_MUST_BE_ONE");

        // Retrieve address of initial Set for rebalancing token
        address startingSet = _components[0];

        // Expect Set to rebalance to be valid and enabled Set
        require(ICore(core).validSets(startingSet), "INITIAL_SET_INVALID");

        // Parse _callData for additional parameters
        InitRebalancingParameters memory parameters = parseRebalanceSetCallData(
            _callData
        );

        // Create a new SetToken contract
        return new RebalancingSetToken(
            this,
            parameters.manager,
            startingSet,
            _units[0],
            parameters.proposalPeriod,
            parameters.rebalanceInterval,
            parameters.entranceFee,
            parameters.rebalanceFee,
            _name,
            _symbol
        );
    }

    /* ============ Private Functions ============ */

    function parseRebalanceSetCallData(
        bytes _callData
    )
        private
        pure
        returns (InitRebalancingParameters memory)
    {
        InitRebalancingParameters memory parameters;

        assembly {
            mstore(parameters,           mload(add(_callData, 32)))   // manager
            mstore(add(parameters, 32),  mload(add(_callData, 64)))   // proposalPeriod
            mstore(add(parameters, 64),  mload(add(_callData, 96)))   // rebalanceInterval
            mstore(add(parameters, 96),  mload(add(_callData, 128)))  // entranceFee
            mstore(add(parameters, 128), mload(add(_callData, 160)))  // rebalanceFee
        }

        return parameters;
    }
}
