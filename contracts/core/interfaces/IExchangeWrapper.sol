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
     * attemptedfillQuantity            Quantity of Set taker attempted to fill
     * @param  _addresses               [maker, taker, makerToken]
     * @param  _values                  [makerAssetAmount, orderCount, fillQuantity, attemptedFillQuantity]
     * @param  _orderData               Arbitrary bytes data for any information to pass to the exchange
     * @return  address[]               The addresses of required components
     * @return  uint256[]               The quantities of required components retrieved by the wrapper
     */
    function exchange(
        address[3] _addresses,
        uint256[4] _values,
        bytes _orderData
    )
        external
        returns (address[], uint256[]);
}
