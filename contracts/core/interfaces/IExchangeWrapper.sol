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

import { ExchangeWrapperLibraryV2 } from "../lib/ExchangeWrapperLibraryV2.sol";

/**
 * @title IExchangeWrapper
 * @author Set Protocol
 *
 * Interface for executing an order with an exchange wrapper
 */
interface IExchangeWrapper {

    /* ============ External Functions ============ */

    /**
     * Exchange some amount of makerToken for takerToken.
     *
     * maker                            Issuance order maker
     * taker                            Issuance order taker
     * makerToken                       Address of maker token used in exchange orders
     * makerAssetAmount                 Amount of issuance order maker token to use on this exchange
     * orderCount                       Expected number of orders to execute
     * fillQuantity                     Quantity of Set to be filled
     * attemptedFillQuantity            Quantity of Set taker attempted to fill
     *
     * @param  _orderData               Arbitrary bytes data for any information to pass to the exchange
     */
    function exchange(
        ExchangeWrapperLibraryV2.ExchangeData calldata _exchangeData,
        bytes calldata _orderData
    )
        external
        returns (ExchangeWrapperLibraryV2.ExchangeResults memory);
}
