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
pragma experimental "ABIEncoderV2";

import { Bytes32Library } from "../../lib/Bytes32Library.sol";
import { FactoryUtilsLibrary } from "./rebalancing-v3/FactoryUtilsLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { IRebalancingSetTokenV2 } from "../interfaces/IRebalancingSetTokenV2.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { RebalancingSetTokenV3 } from "./RebalancingSetTokenV3.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";


/**
 * @title RebalancingSetTokenV3Factory
 * @author Set Protocol
 *
 * RebalancingSetTokenV3Factory is a smart contract used to deploy new RebalancingSetTokenV2 contracts.
 * RebalancingSetTokenV2s deployed by the factory can only have their mint and burn functions
 * called by Core
 */
contract RebalancingSetTokenV3Factory {
    using LibBytes for bytes;
    using Bytes32Library for bytes32;

    /* ============ State Variables ============ */

    // Address of the Core contract used to verify factory when creating a Set
    ICore public core;

    // Address of the WhiteList contract used to verify the tokens in a rebalance proposal
    IWhiteList public rebalanceComponentWhitelist;

    // Whitelist contract for approved liquidators
    IWhiteList public liquidatorWhitelist;

    // Whitelist contract for approved fee calcualtors
    IWhiteList public feeCalculatorWhitelist;

    // Minimum amount of time between rebalances in seconds
    uint256 public minimumRebalanceInterval;

    // Minimum fail auction period
    uint256 public minimumFailRebalancePeriod;

    // Maximum fail auction period
    uint256 public maximumFailRebalancePeriod;

    // Minimum number for the token natural unit
    // The bounds are used for calculations of unitShares and in settlement
    uint256 public minimumNaturalUnit;

    // Maximum number for the token natural unit
    uint256 public maximumNaturalUnit;

    /* ============ Constructor ============ */

    /**
     * Set core. Also requires a minimum rebalance interval and minimum proposal periods that are enforced
     * on RebalancingSetTokenV2
     *
     * @param  _core                       Address of deployed core contract
     * @param  _componentWhitelist         Address of component whitelist contract
     * @param  _liquidatorWhitelist        Address of liquidator whitelist contract
     * @param  _feeCalculatorWhitelist     Address of feeCalculator whitelist contract
     * @param  _minimumRebalanceInterval   Minimum amount of time between rebalances in seconds
     * @param  _minimumNaturalUnit         Minimum number for the token natural unit
     * @param  _maximumNaturalUnit         Maximum number for the token natural unit
     */
    constructor(
        ICore _core,
        IWhiteList _componentWhitelist,
        IWhiteList _liquidatorWhitelist,
        IWhiteList _feeCalculatorWhitelist,
        uint256 _minimumRebalanceInterval,
        uint256 _minimumFailRebalancePeriod,
        uint256 _maximumFailRebalancePeriod,
        uint256 _minimumNaturalUnit,
        uint256 _maximumNaturalUnit
    )
        public
    {
        core = _core;
        rebalanceComponentWhitelist = _componentWhitelist;
        liquidatorWhitelist = _liquidatorWhitelist;
        feeCalculatorWhitelist = _feeCalculatorWhitelist;
        minimumRebalanceInterval = _minimumRebalanceInterval;
        minimumFailRebalancePeriod = _minimumFailRebalancePeriod;
        maximumFailRebalancePeriod = _maximumFailRebalancePeriod;
        minimumNaturalUnit = _minimumNaturalUnit;
        maximumNaturalUnit = _maximumNaturalUnit;
    }

    /* ============ External Functions ============ */

    /**
     * Deploys a new RebalancingSetTokenV2 contract, conforming to IFactory
     * Can only be called by core contracts.
     *
     * 
     * | CallData                   | Location                      |
     * |----------------------------|-------------------------------|
     * | manager                    | 32                            |
     * | liquidator                 | 64                            |
     * | feeRecipient               | 96                            |
     * | rebalanceFeeCalculator     | 128                           |
     * | rebalanceInterval          | 160                           |
     * | rebalanceFailPeriod        | 192                           |
     * | entryFee                   | 224                           |
     * | rebalanceFeeCalculatorData | 256 to end                    |
     *
     * @param  _components     The address of component tokens
     * @param  _units          The units of each component token
     * -- Unused natural unit parameters, passed in to conform to IFactory --
     * @param  _name           The bytes32 encoded name of the new RebalancingSetTokenV2
     * @param  _symbol         The bytes32 encoded symbol of the new RebalancingSetTokenV2
     * @param  _callData       Byte string containing additional call parameters
     * 
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
        require(
            msg.sender == address(core),
            "Must be core"
        );

        // Ensure component array only includes one address which will be the currentSet
        require(
            _components.length == 1 && 
            _units.length == 1,
            "Components & units len != 1"
        );

        require(
            _units[0] > 0,
            "UnitShares not > 0"
        );

        address startingSet = _components[0];

        // Expect Set to rebalance to be valid and enabled Set
        require(
            core.validSets(startingSet),
            "Bad Set"
        );

        require(
            _naturalUnit >= minimumNaturalUnit && _naturalUnit <= maximumNaturalUnit,
            "Bad natural unit"
        );

        FactoryUtilsLibrary.InitRebalancingParameters memory parameters =
            FactoryUtilsLibrary.parseRebalanceSetCallData(_callData);

        FactoryUtilsLibrary.validateRebalanceSetCalldata(
            parameters,
            address(liquidatorWhitelist),
            address(feeCalculatorWhitelist),
            minimumRebalanceInterval,
            minimumFailRebalancePeriod,
            maximumFailRebalancePeriod
        );

        address rebalancingSet = address(
            new RebalancingSetTokenV3(
                [
                    address(this),                          // factory
                    parameters.manager,                     // manager
                    parameters.liquidator,                  // liquidator
                    startingSet,                            // initialSet
                    address(rebalanceComponentWhitelist),   // componentWhiteList
                    address(liquidatorWhitelist),           // liquidatorWhiteList
                    parameters.feeRecipient,                // feeRecipient
                    parameters.rebalanceFeeCalculator       // rebalanceFeeCalculator
                ],
                [
                    _units[0],                              // unitShares
                    _naturalUnit,                           // naturalUnit
                    parameters.rebalanceInterval,           // rebalanceInterval
                    parameters.rebalanceFailPeriod,         // rebalanceFailPeriod
                    parameters.lastRebalanceTimestamp,      // lastRebalanceTimestamp
                    parameters.entryFee                     // entryFee
                ],
                _name.bytes32ToString(),
                _symbol.bytes32ToString()
            )
        );

        // Initaializes the RebalancingSetToken
        IRebalancingSetTokenV2(rebalancingSet).initialize(parameters.rebalanceFeeCalculatorData);

        return rebalancingSet;
    }
}
