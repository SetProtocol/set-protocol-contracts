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


/**
 * @title ExchangeWrapperLibrary
 * @author Set Protocol
 *
 * This library contains structs and functions to assist executing orders on third party exchanges
 *
 * CHANGELOG
 * - Removes functions that result in circular dependencies when trying to flatten.
 * - Functions using this library mainly use it for the structs
 */
library ExchangeWrapperLibraryV2 {

    // ============ Structs ============

    /**
     * caller                           Original user initiating transaction
     * orderCount                       Expected number of orders to execute
     */
    struct ExchangeData {
        address caller;
        uint256 orderCount;
    }

    /**
     * components                       A list of the acquired components from exchange wrapper
     * componentQuantities              A list of the component quantities acquired
     */
    struct ExchangeResults {
        address[] receiveTokens;
        uint256[] receiveTokenAmounts;
    }
}
