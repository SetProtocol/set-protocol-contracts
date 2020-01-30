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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { Bytes32Library } from "../../../lib/Bytes32Library.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { IWhiteList } from "../../interfaces/IWhiteList.sol";
import { LibBytes } from "../../../external/0x/LibBytes.sol";


/*
 * We segmented the FactoryUtils into it's own library to lower RebalancingSetTokenV3Factory
 * deployed bytecode size.
 */
library FactoryUtilsLibrary {
    using SafeMath for uint256;
    using LibBytes for bytes;
    using Bytes32Library for bytes32;

    struct InitRebalancingParameters {
        address manager;
        address liquidator;
        address feeRecipient;
        address rebalanceFeeCalculator;
        uint256 rebalanceInterval;
        uint256 rebalanceFailPeriod;
        uint256 lastRebalanceTimestamp;
        uint256 entryFee;
        bytes rebalanceFeeCalculatorData;
    }

    /*
     * Performs set calldata validations
     */
    function validateRebalanceSetCalldata(
        InitRebalancingParameters memory _parameters,
        address liquidatorWhitelist,
        address feeCalculatorWhitelist,
        uint256 minimumRebalanceInterval,
        uint256 minimumFailRebalancePeriod,
        uint256 maximumFailRebalancePeriod
    )
        public
        view
    {
        require(
            _parameters.manager != address(0),
            "Bad manager"
        );

        require(
            _parameters.lastRebalanceTimestamp <= block.timestamp,
            "Bad RebalanceTimestamp"
        );

        // Require liquidator address is non-zero and is whitelisted by the liquidatorWhitelist
        require(
            _parameters.liquidator != address(0) && 
            IWhiteList(liquidatorWhitelist).whiteList(_parameters.liquidator),
            "Bad liquidator"
        );

        // Require rebalance fee is whitelisted by the liquidatorWhitelist
        require(
            IWhiteList(feeCalculatorWhitelist).whiteList(address(_parameters.rebalanceFeeCalculator)),
            "Bad fee calculator"
        );

        require(
            _parameters.rebalanceInterval >= minimumRebalanceInterval,
            "Bad Rebalance interval"
        ); 

        require(
            _parameters.rebalanceFailPeriod >= minimumFailRebalancePeriod &&
            _parameters.rebalanceFailPeriod <= maximumFailRebalancePeriod,
            "Bad Fail Period"
        );
    }

    /**
     * Parses the calldata, which is configured as follows:
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
     */
    function parseRebalanceSetCallData(
        bytes memory _callData
    )
        public
        pure
        returns (InitRebalancingParameters memory)
    {
        InitRebalancingParameters memory parameters;

        assembly {
            mstore(parameters,           mload(add(_callData, 32)))   // manager
            mstore(add(parameters, 32),  mload(add(_callData, 64)))   // liquidator
            mstore(add(parameters, 64),  mload(add(_callData, 96)))   // feeRecipient
            mstore(add(parameters, 96),  mload(add(_callData, 128)))  // rebalanceFeeCalculator
            mstore(add(parameters, 128), mload(add(_callData, 160)))  // rebalanceInterval
            mstore(add(parameters, 160), mload(add(_callData, 192)))  // rebalanceFailPeriod
            mstore(add(parameters, 192), mload(add(_callData, 224)))  // lastRebalanceTimestamp
            mstore(add(parameters, 224), mload(add(_callData, 256)))  // entryFee
        }

        // Extracts the fee calculator data from the remaining calldata
        parameters.rebalanceFeeCalculatorData = _callData.slice(256, _callData.length);

        return parameters;
    }
}

