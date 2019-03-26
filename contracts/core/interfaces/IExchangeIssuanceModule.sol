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

import { ExchangeIssuanceLibrary } from "../modules/lib/ExchangeIssuanceLibrary.sol";

/**
 * @title IExchangeIssuanceModule
 * @author Set Protocol
 *
 * Interface for executing orders and issuing and redeeming a Set
 */
interface IExchangeIssuanceModule {

    function exchangeIssue(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams calldata _exchangeIssuanceParams,
        bytes calldata _orderData
    )
        external;


    function exchangeRedeem(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams calldata _exchangeIssuanceParams,
        bytes calldata _orderData
    )
        external;
}
