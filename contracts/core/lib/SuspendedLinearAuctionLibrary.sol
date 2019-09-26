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


/**
 * @title SuspendedParametersLibrary
 * @author Set Protocol
 *
 * The SuspendedParametersLibrary contains functions for facilitating the rebalancing process for
 * Rebalancing Set Tokens. Removes the old calculation functions
 *
 */
library SuspendedLinearAuctionLibrary {


    /* ============ Structs ============ */

    struct SuspendedPriceParameters {
        uint256 lastCriticalBidTime;
        uint256 lastCriticalBidNumerator;
        uint256 lastCriticalBidRemainingShares;
        uint256 suspensionTime;
        uint256 auctionFailTime;
        uint256 criticalThreshold;
    }
}
