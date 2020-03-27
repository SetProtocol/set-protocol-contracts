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

import { ISocialAllocator } from "./ISocialAllocator.sol";


/**
 * @title SocialTradingLibrary
 * @author Set Protocol
 *
 * Library for use in SocialTrading system.
 */
library SocialTradingLibrary {

    /* ============ Structs ============ */
    struct PoolInfo {
        address trader;                 // Address allowed to make admin and allocation decisions
        ISocialAllocator allocator;     // Allocator used to make collateral Sets, defines asset pair being used
        uint256 currentAllocation;      // Current base asset allocation of tradingPool
        uint256 newEntryFee;            // New fee percentage to change to after time lock passes, defaults to 0
        uint256 feeUpdateTimestamp;     // Timestamp when fee update process can be finalized, defaults to maxUint256
    }
}
