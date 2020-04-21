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
pragma experimental "ABIEncoderV2";

import { Bytes32Library } from "set-protocol-contract-utils/contracts/lib/Bytes32Library.sol";

import { FactoryUtilsLibrary } from "./rebalancing-v3/FactoryUtilsLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { IRebalancingSetTokenV2 } from "../interfaces/IRebalancingSetTokenV2.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { RebalancingSetTokenV2Factory } from "./RebalancingSetTokenV2Factory.sol";
import { RebalancingSetTokenV3 } from "./RebalancingSetTokenV3.sol";
import { SetTokenLibrary } from "../lib/SetTokenLibrary.sol";


/**
 * @title RebalancingSetTokenV3Factory
 * @author Set Protocol
 *
 * RebalancingSetTokenV3Factory is a smart contract used to deploy new RebalancingSetTokenV3 contracts.
 */
contract RebalancingSetTokenV3Factory is RebalancingSetTokenV2Factory {

    /* ============ Constructor ============ */

    /**
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
        RebalancingSetTokenV2Factory(
            _core,
            _componentWhitelist,
            _liquidatorWhitelist,
            _feeCalculatorWhitelist,
            _minimumRebalanceInterval,
            _minimumFailRebalancePeriod,
            _maximumFailRebalancePeriod,
            _minimumNaturalUnit,
            _maximumNaturalUnit
        )
    {}

    /* ============ External Functions ============ */

    /**
     * Overrides the RebalancingSetTokenV2Factory createSet function.
     *
     * Deploys a new RebalancingSetTokenV3 contract, conforming to IFactory
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
     * @param  _naturalUnit    Minimum issuable amount of the RebalancingSetTokenV3
     * @param  _name           The bytes32 encoded name of the new RebalancingSetTokenV3
     * @param  _symbol         The bytes32 encoded symbol of the new RebalancingSetTokenV3
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
        SetTokenLibrary.SetDetails memory rebalancingSetDetails = SetTokenLibrary.SetDetails({
            naturalUnit: _naturalUnit,
            components: _components,
            units: _units
        });

        FactoryUtilsLibrary.validateRebalancingSet(
            rebalancingSetDetails,
            address(core),
            msg.sender,
            minimumNaturalUnit,
            maximumNaturalUnit
        );

        // Parse the calldata
        FactoryUtilsLibrary.InitRebalancingParameters memory parameters =
            FactoryUtilsLibrary.parseRebalanceSetCallData(_callData);

        // Ensure validity of rebalancing Set calldata
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
                    _components[0],                            // initialSet
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

        // Initializes the RebalancingSetToken using the V2 interface (as the interface has not changed)
        IRebalancingSetTokenV2(rebalancingSet).initialize(parameters.rebalanceFeeCalculatorData);

        return rebalancingSet;
    }
}
