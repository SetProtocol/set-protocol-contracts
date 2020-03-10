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
pragma experimental ABIEncoderV2;

import { PerformanceFeeLibrary } from "../fee-calculators/lib/PerformanceFeeLibrary.sol";

/**
 * @title IPerformanceFeeCalculator
 * @author Set Protocol
 *
 * Interface for accessing state on PerformanceFeeCalculator (function calls defined in IFeeCalculator)
 */
interface IPerformanceFeeCalculator {

    /* ============ External Functions ============ */

    function feeState(
        address _rebalancingSetToken
    )
        external
        view
        returns (PerformanceFeeLibrary.FeeState memory);

    function getCalculatedFees(
        address _setAddress
    )
        external
        view
        returns (uint256, uint256);
}
