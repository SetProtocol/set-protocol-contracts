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


/**
 * @title PerformanceFeeLibrary
 * @author Set Protocol
 *
 * The PerformanceFeeLibrary contains struct definition for feeState so it can
 * be used elsewhere.
 */
library PerformanceFeeLibrary {

    /* ============ Structs ============ */

    struct FeeState {
        uint256 profitFeePeriod;                // Time required between accruing profit fees
        uint256 highWatermarkResetPeriod;       // Time required after last profit fee to reset high watermark
        uint256 profitFeePercentage;            // Percent of profits that accrue to manager
        uint256 streamingFeePercentage;         // Percent of Set that accrues to manager each year
        uint256 highWatermark;                  // Value of Set at last profit fee accrual
        uint256 lastProfitFeeTimestamp;         // Timestamp last profit fee was accrued
        uint256 lastStreamingFeeTimestamp;      // Timestamp last streaming fee was accrued
    }
}