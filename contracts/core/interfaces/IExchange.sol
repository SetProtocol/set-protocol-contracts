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

pragma solidity 0.4.24;


/**
 * @title IExchange
 * @author Set Protocol
 *
 * Interface for executing an order with an exchange wrapper
 */
interface IExchange {

    /* ============ External Functions ============ */

    /**
     * Exchange some amount of makerToken for takerToken.
     *
     * @param  _taker       Issuance order taker
     * @param  _orderCount  Expected number of orders to execute
     * @param  _orderData   Arbitrary bytes data for any information to pass to the exchange
     */
    function exchange(
        address _taker,
        uint _orderCount,
        bytes _orderData
    )
        external
        returns (address[], uint256[]);
}
