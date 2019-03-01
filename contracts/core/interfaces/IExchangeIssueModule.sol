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

pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { ExchangeInteractLibrary } from "../lib/ExchangeInteractLibrary.sol";

/**
 * @title IExchangeIssueModule
 * @author Set Protocol
 *
 * Interface for executing orders and issuing a Set
 */
interface IExchangeIssueModule {
    function exchangeIssue(
        ExchangeInteractLibrary.ExchangeInteractData calldata _exchangeInteractData,
        bytes calldata _orderData
    )
        external;
}
