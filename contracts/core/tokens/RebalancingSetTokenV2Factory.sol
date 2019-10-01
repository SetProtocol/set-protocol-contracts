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
pragma experimental "ABIEncoderV2";

import { Bytes32Library } from "../../lib/Bytes32Library.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { RebalancingSetTokenV2 } from "./RebalancingSetTokenV2.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IRebalancingSetFactory } from "../interfaces/IRebalancingSetFactory.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";


/**
 * @title RebalancingSetTokenV2Factory
 * @author Set Protocol
 *
 * RebalancingSetTokenV2Factory is a smart contract used to deploy new RebalancingSetTokenV2 contracts.
 * RebalancingSetTokenV2s deployed by the factory can only have their mint and burn functions
 * called by Core
 */
contract RebalancingSetTokenV2Factory {
    using LibBytes for bytes;
    using Bytes32Library for bytes32;

    /* ============ State Variables ============ */

    // Address of the Core contract used to verify factory when creating a Set
    ICore public core;

    // Address of the WhiteList contract used to verify the tokens in a rebalance proposal
    IWhiteList public rebalanceComponentWhitelist;

    // Minimum amount of time between rebalances in seconds
    uint256 public minimumRebalanceInterval;

    // Minimum amount of time users can review proposals
    uint256 public minimumProposalPeriod;

    // Maximum fail auction period
    uint256 public minimumFailRebalancePeriod;

    // Minimum number for the token natural unit
    // The bounds are used for calculations of unitShares and in settlement
    uint256 public minimumNaturalUnit;

    // Maximum number for the token natural unit
    uint256 public maximumNaturalUnit;

    // ============ Structs ============

    struct InitRebalancingParameters {
        address manager;
        ILiquidator liquidator;
        uint256 proposalPeriod;
        uint256 rebalanceInterval;
        uint256 rebalanceFailPeriod;
    }

    /* ============ Constructor ============ */

    /**
     * Set core. Also requires a minimum rebalance interval and minimum proposal periods that are enforced
     * on RebalancingSetTokenV2
     *
     * @param  _core                       Address of deployed core contract
     * @param  _componentWhitelist         Address of deployed whitelist contract
     * @param  _minimumRebalanceInterval   Minimum amount of time between rebalances in seconds
     * @param  _minimumProposalPeriod      Minimum amount of time users can review proposals in seconds
     * @param  _minimumNaturalUnit         Minimum number for the token natural unit
     * @param  _maximumNaturalUnit         Maximum number for the token natural unit
     */
    constructor(
        ICore _core,
        IWhiteList _componentWhitelist,
        uint256 _minimumRebalanceInterval,
        uint256 _minimumProposalPeriod,
        uint256 _minimumFailRebalancePeriod,
        uint256 _minimumNaturalUnit,
        uint256 _maximumNaturalUnit
    )
        public
    {
        core = _core;
        rebalanceComponentWhitelist = _componentWhitelist;
        minimumRebalanceInterval = _minimumRebalanceInterval;
        minimumProposalPeriod = _minimumProposalPeriod;
        minimumFailRebalancePeriod = _minimumFailRebalancePeriod;
        minimumNaturalUnit = _minimumNaturalUnit;
        maximumNaturalUnit = _maximumNaturalUnit;
    }

    /* ============ Public Functions ============ */

    /**
     * Deploys a new RebalancingSetTokenV2 contract, conforming to IFactory
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
     * -- Unused natural unit parameters, passed in to conform to IFactory --
     * @param  _name           The bytes32 encoded name of the new RebalancingSetTokenV2
     * @param  _symbol         The bytes32 encoded symbol of the new RebalancingSetTokenV2
     * @param  _callData       Byte string containing additional call parameters
     * @return setToken        The address of the newly created SetToken
     */
    function createSet(
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
        // Expecting caller to be Core
        require(
            msg.sender == address(core),
            "RebalancingSetTokenV2Factory.create: Sender must be core"
        );

        // Ensure component array only includes one address which will be the currentSet
        require(
            _components.length == 1,
            "RebalancingSetTokenV2Factory.create: Components must be length 1"
        );

        // Ensure units array only includes one uint which will be the starting unitShares
        require(
            _units.length == 1,
            "RebalancingSetTokenV2Factory.create: Units must be length 1"
        );

        // Ensure unitShares is not set to 0
        require(
            _units[0] > 0,
            "RebalancingSetTokenV2Factory.create: UnitShares must be greater than zero"
        );

        // Retrieve address of initial Set for rebalancing token
        address startingSet = _components[0];

        // Expect Set to rebalance to be valid and enabled Set
        require(
            core.validSets(startingSet),
            "RebalancingSetTokenV2Factory.create: Invalid or disabled SetToken address"
        );

        require(
            _naturalUnit >= minimumNaturalUnit,
            "RebalancingSetTokenV2Factory.create: Natural Unit too low"
        );

        require(
            _naturalUnit <= maximumNaturalUnit,
            "RebalancingSetTokenV2Factory.create: Natural Unit too large"
        );

        // Parse _callData for additional parameters
        InitRebalancingParameters memory parameters = parseRebalanceSetCallData(
            _callData
        );

        // Require manager address is non-zero
        require(
            parameters.manager != address(0),
            "RebalancingSetTokenV2Factory.create: Invalid manager address"
        );

        // Require liquidator address is non-zero
        require(
            address(parameters.liquidator) != address(0),
            "RebalancingSetTokenV2Factory.create: Invalid liquidator address"
        );

        // Require minimum rebalance interval and proposal period
        require(
            parameters.proposalPeriod >= minimumProposalPeriod,
            "RebalancingSetTokenV2Factory.create: Proposal period too short"
        );

        require(
            parameters.rebalanceInterval >= minimumRebalanceInterval,
            "RebalancingSetTokenV2Factory.create: Rebalance interval too short"
        ); 

        require(
            parameters.rebalanceFailPeriod >= minimumFailRebalancePeriod,
            "RebalancingSetTokenV2Factory.create: Fail Period too short"
        );

        // TODO: Check that the liquidator is valid and approved by Core

        // Create a new SetToken contract
        return address(
            new RebalancingSetTokenV2(
                IRebalancingSetFactory(address(this)),
                parameters.manager,
                parameters.liquidator,
                ISetToken(startingSet),
                rebalanceComponentWhitelist,
                _units[0],
                _naturalUnit,
                [parameters.proposalPeriod, parameters.rebalanceInterval, parameters.rebalanceFailPeriod],
                _name.bytes32ToString(),
                _symbol.bytes32ToString()
            )
        );
    }

    /* ============ Private Functions ============ */

    function parseRebalanceSetCallData(
        bytes memory _callData
    )
        private
        pure
        returns (InitRebalancingParameters memory)
    {
        InitRebalancingParameters memory parameters;

        assembly {
            mstore(parameters,           mload(add(_callData, 32)))   // manager
            mstore(add(parameters, 32),  mload(add(_callData, 64)))   // liquidator
            mstore(add(parameters, 64),  mload(add(_callData, 96)))   // proposalPeriod
            mstore(add(parameters, 96),  mload(add(_callData, 128)))  // rebalanceInterval
            mstore(add(parameters, 128),  mload(add(_callData, 160))) // rebalanceFailPeriod
        }

        return parameters;
    }
}
