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
import { AddressArrayUtils } from "cryptofin-solidity/contracts/array-utils/AddressArrayUtils.sol";


/**
 * @title Core Internal
 * @author Set Protocol
 *
 * The CoreInternal contract contains methods to alter state of variables that track
 * Core dependency addresses.
 */
contract CoreInternal is
    Ownable,
    CoreState
{
    using AddressArrayUtils for address[];

    /* ============ Events ============ */

    // Logs registration of new exchange conforming to IExchangeWrapper
    event ExchangeRegistered(
        uint8 _exchangeId,
        address _exchange
    );

    // Logs factory registration change. Factory must conform to ISetFactory
    event FactoryRegistrationChanged(
        address _factory,
        bool _status
    );

    // Logs a change in the registration of a Set
    event SetRegistrationChanged(
        address _set,
        bool _status
    );

    // Logs when the protocol fee status has been updated
    event FeeStatusChange(
        address _sender,
        bool _newStatus
    );

    // Logs price library registration change. Library must conform to IAuctionPriceCurve
    event PriceLibraryRegistrationChanged(
        address _priceLibrary,
        bool _status
    );

    /* ============ External Functions ============ */

    /**
     * Add or remove a factory to the mapping of tracked factories. Can only be set by
     * owner of Core
     *
     * @param  _factory   Address of the contract conforming to ISetFactory
     * @param  _enabled   Enable or disable the factory
     */
    function registerFactory(
        address _factory,
        bool _enabled
    )
        external
        onlyOwner
    {
        state.validFactories[_factory] = _enabled;

        emit FactoryRegistrationChanged(
            _factory,
            _enabled
        );
    }

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

    /**
     * Add or remove a Set to the mapping and array of tracked Sets. Can
     * only be called by owner of Core.
     *
     * @param  _set       The address of the Set
     * @param  _enabled   Enable or disable the Set
     */
    function registerSet(
        address _set,
        bool _enabled
    )
        external
        onlyOwner
    {
        // Only execute if target enabled state is opposite of current state
        // This is to prevent arbitrary addresses from being added to validSets
        // if they were never enabled before
        if (_enabled != state.validSets[_set]) {
            if (_enabled) {
                // Add the Set to setTokens array (we know it doesn't already exist in the array)
                state.setTokens.push(_set);
            } else {
                // Remove the Set from setTokens array
                state.setTokens = state.setTokens.remove(_set);
            }

            // Mark the Set respectively in validSets mapping
            state.validSets[_set] = _enabled;
        }

        emit SetRegistrationChanged(
            _set,
            _enabled
        );
    }

    /**
     * Adds or removes a price library to the mapping of tracked price libraries. Can only be mutated by
     * owner of Core
     *
     * @param  _priceLibrary   Address of contract Price Library to enable or disable
     * @param  _enabled        Whether the pricing library is enabled for use in proposal cycle
     */
    function registerPriceLibrary(
        address _priceLibrary,
        bool _enabled
    )
        external
        onlyOwner
    {
        state.validPriceLibraries[_priceLibrary] = _enabled;

        emit PriceLibraryRegistrationChanged(
            _priceLibrary,
            _enabled
        );
    }

    /**
     * Change address that rebalancing protocol fees accrue to
     *
     * @param  _protocolAddress   The protcol fee address
     */
    function setProtocolAddress(
        address _protocolAddress
    )
        external
        onlyOwner
    {
        // Find and remove factory from factories array
        state.protocolAddress = _protocolAddress;
    }

    /**
     * Turn protocol fees on for collecting rebalancing fees
     *
     * @param  _enable   Indicate whether to turn fees on or off
     */
    function setFeesEnabled(
        bool _enable
    )
        external
        onlyOwner
    {
        // Set feesEnabled
        state.feesEnabled = _enable;

        emit FeeStatusChange(msg.sender, state.feesEnabled);
    }
}
