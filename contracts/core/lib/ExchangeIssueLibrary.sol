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

pragma solidity 0.4.25;
pragma experimental "ABIEncoderV2";


/**
 * @title ExchangeIssueLibrary
 * @author Set Protocol
 *
 * This library contains functions and structs to assist with parsing exchange issue data
 */
library ExchangeIssueLibrary {
    // ============ Structs ============

    struct ExchangeIssueParams {
        address setAddress;
        address paymentToken;
        uint256 paymentTokenAmount;
        uint256 quantity;
        address[] requiredComponents;
        uint256[] requiredComponentAmounts;
    }
}
