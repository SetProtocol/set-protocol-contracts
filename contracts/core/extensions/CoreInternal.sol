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

    // Logs registration of new exchange
    event ExchangeRegistered(
        uint8 _exchangeId,
        address _exchange
    );

    event FeeStatusChange(
        address _sender,
        bool _newStatus
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
        if (_enabled) {
            state.factories.push(_factory);
        } else {
            require(state.validFactories[_factory], "UNKNOWN_FACTORY");

            state.factories = state.factories.remove(_factory);
        }

        state.validFactories[_factory] = _enabled;
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
     * Disable a set token in the mapping of tracked set tokens. Can only
     * be disables by owner of Core.
     *
     * @param  _set   The address of the SetToken to disable
     */
    function disableSet(
        address _set
    )
        external
        onlyOwner
    {
        // Verify Set was created by Core and is enabled
        require(state.validSets[_set], "UNKNOWN_SET");

        // Mark as false in validSet mapping
        state.validSets[_set] = false;

        // Find and remove from setTokens array
        state.setTokens = state.setTokens.remove(_set);
    }

    /**
     * Adds or removes a price library to the mapping of tracked price libraries. Can only be mutated by
     * owner of Core
     *
     * @param  _priceLibrary   Address of contract Price Library to enable or disable
     * @param  _enabled        Whether the pricing library is enabled for use in proposal cycle
     */
    function setPriceLibraryEnabled(
        address _priceLibrary,
        bool _enabled
    )
        external
        onlyOwner
    {
        // Mark as true or false in validPriceLibraries mapping
        state.validPriceLibraries[_priceLibrary] = _enabled;

        if (_enabled) {
            // Add to priceLibraries array
            state.priceLibraries.push(_priceLibrary);
        } else {
            // Remove from priceLibraries array
            state.priceLibraries = state.priceLibraries.remove(_priceLibrary);
        }
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
