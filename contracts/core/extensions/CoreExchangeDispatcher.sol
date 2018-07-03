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

import { Ownable } from "zeppelin-solidity/contracts/ownership/Ownable.sol";
import { CoreState } from "../lib/CoreState.sol";


/**
 * @title Core Exchange Dispatcher
 * @author Set Protocol
 *
 * The CoreExchangeDispatcher factilitates updating permissible exchanges
 * that are used in filling issuance orders. See CoreState.State.exchanges
 */
contract CoreExchangeDispatcher is
    Ownable,
    CoreState
{

    /* ============ Events ============ */

    // Logs registration of new exchange
    event ExchangeRegistered(
        uint8 _exchangeId,
        address _exchange
    );

    /* ============ Setter Functions ============ */

    /**
     * Register exchange address into mapping of exchanges 
     *
     * @param _exchangeId   Enumeration of exchange
     * @param _exchange     Exchange address to set
     */
    function registerExchange(
        uint8 _exchangeId,
        address _exchange
    )
        external
        onlyOwner
    {
        // Add asset proxy and log registration.
        state.exchanges[_exchangeId] = _exchange;

        // Add asset proxy and log registration.
        emit ExchangeRegistered(
            _exchangeId,
            _exchange
        );
    }
}
