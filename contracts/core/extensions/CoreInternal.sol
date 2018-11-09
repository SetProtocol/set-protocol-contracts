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

import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
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

    // Logs a factory registration change; factory must conform to ISetFactory
    event FactoryRegistrationChanged(
        address _factory,
        bool _status
    );

    // Logs an exchange registration; exchange must conform to IExchangeWrapper
    event ExchangeRegistered(
        uint8 _exchangeId,
        address _exchange
    );

    // Logs a Set registration change
    event SetRegistrationChanged(
        address _set,
        bool _status
    );

    // Logs a price library registration change; library must conform to IAuctionPriceCurve
    event PriceLibraryRegistrationChanged(
        address _priceLibrary,
        bool _status
    );

    // Logs a protocol fee change
    event ProtocolFeeChanged(
        address _sender,
        uint256 _fee
    );

    /* ============ External Functions ============ */

    /**
     * Add or remove a factory from the mapping of tracked factories.
     * Can only be called by owner of Core.
     *
     * @param  _factory   Address of the factory conforming to ISetFactory
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
     * Register an exchange address with the mapping of tracked exchanges.
     * Can only be called by owner of Core.
     *
     * @param _exchangeId   Enumeration of exchange within the mapping
     * @param _exchange     Address of the exchange conforming to IExchangeWrapper
     */
    function registerExchange(
        uint8 _exchangeId,
        address _exchange
    )
        external
        onlyOwner
    {
        state.exchanges[_exchangeId] = _exchange;

        emit ExchangeRegistered(
            _exchangeId,
            _exchange
        );
    }

    /**
     * Add or remove a Set from the mapping and array of tracked Sets.
     * Can only be called by owner of Core.
     *
     * @param  _set       Address of the Set
     * @param  _enabled   Enable or disable the Set
     */
    function registerSet(
        address _set,
        bool _enabled
    )
        external
        onlyOwner
    {
        /**
         * Only execute if target enabled state is opposite of current state.
         * This is to prevent arbitrary addresses from being added to validSets if they
         * were never enabled before.
         */
        if (_enabled != state.validSets[_set]) {
            if (_enabled) {
                // We know it doesn't already exist in the array
                state.setTokens.push(_set);
            } else {
                // We know it already exists in the array
                state.setTokens = state.setTokens.remove(_set);
            }

            state.validSets[_set] = _enabled;
        }

        emit SetRegistrationChanged(
            _set,
            _enabled
        );
    }

    /**
     * Add or remove a price library from the mapping of tracked price libraries.
     * Can only be called by owner of Core.
     *
     * @param  _priceLibrary   Address of the price library
     * @param  _enabled        Enable or disable the price library
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
     * Change address that rebalancing protocol fees accrue to.
     * Can only be called by owner of Core.
     *
     * @param  _protocolAddress   The protcol fee address
     */
    function setProtocolFeeRecipient(
        address _protocolAddress
    )
        external
        onlyOwner
    {
        state.protocolAddress = _protocolAddress;
    }

    /**
     * Update protocol fee.
     * Can only be called by owner of Core.
     *
     * @param  _fee   Protocol fee in basis points of manager's rebalancing fee
     */
    function setProtocolFee(
        uint256 _fee
    )
        external
        onlyOwner
    {
        state.protocolFee = _fee;

        emit ProtocolFeeChanged(
            msg.sender,
            _fee
        );
    }
}
