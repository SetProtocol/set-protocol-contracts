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
     * @param  _maker                Issuance order maker
     * @param  _taker                Issuance order taker
     * @param  _makerToken           Address of maker token used in exchange orders
     * @param  _makerAssetAmount     Amount of issuance order maker token to use on this exchange
     * @param  _orderCount           Expected number of orders to execute
     * @param  _orderData            Arbitrary bytes data for any information to pass to the exchange
     * @return  address[]            The addresses of required components 
     * @return  uint256[]            The quantities of required components retrieved by the wrapper
     */
    function exchange(
        address _maker,
        address _taker,
        address _makerToken,
        uint256 _makerAssetAmount,
        uint256 _orderCount,
        bytes _orderData
    )
        external
        returns (address[], uint256[]);
}
