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

import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";
import { TimeLockUpgrade } from "set-protocol-contract-utils/contracts/lib/TimeLockUpgrade.sol";

import { CoreState } from "../lib/CoreState.sol";


/**
 * @title CoreAdmin
 * @author Set Protocol
 *
 * The CoreAdmin contract contains methods to alter state of variables that track
 * Core dependency addresses.
 */
contract CoreAdmin is
    Ownable,
    CoreState,
    TimeLockUpgrade
{
    using AddressArrayUtils for address[];

    /* ============ Events ============ */

    event FactoryAdded(
        address _factory
    );

    event FactoryRemoved(
        address _factory
    );

    event ExchangeAdded(
        uint8 _exchangeId,
        address _exchange
    );

    event ExchangeRemoved(
        uint8 _exchangeId
    );

    event ModuleAdded(
        address _module
    );

    event ModuleRemoved(
        address _module
    );

    event SetDisabled(
        address _set
    );

    event SetReenabled(
        address _set
    );

    event PriceLibraryAdded(
        address _priceLibrary
    );

    event PriceLibraryRemoved(
        address _priceLibrary
    );

    /* ============ External Functions ============ */

    /**
     * Add a factory from the mapping of tracked factories.
     * Can only be called by owner of Core.
     *
     * @param  _factory   Address of the factory conforming to ISetFactory
     */
    function addFactory(
        address _factory
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        require(
            !state.validFactories[_factory]
        );

        state.validFactories[_factory] = true;

        state.factories = state.factories.append(_factory);

        emit FactoryAdded(
            _factory
        );
    }

    /**
     * Remove a factory from the mapping of tracked factories.
     * Can only be called by owner of Core.
     *
     * @param  _factory   Address of the factory conforming to ISetFactory
     */
    function removeFactory(
        address _factory
    )
        external
        onlyOwner
    {
        require(
            state.validFactories[_factory]
        );

        state.factories = state.factories.remove(_factory);

        state.validFactories[_factory] = false;

        emit FactoryRemoved(
            _factory
        );
    }

    /**
     * Add an exchange address with the mapping of tracked exchanges.
     * Can only be called by owner of Core.
     *
     * @param _exchangeId   Enumeration of exchange within the mapping
     * @param _exchange     Address of the exchange conforming to IExchangeWrapper
     */
    function addExchange(
        uint8 _exchangeId,
        address _exchange
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        require(
            state.exchangeIds[_exchangeId] == address(0)
        );

        state.exchangeIds[_exchangeId] = _exchange;

        state.exchanges = state.exchanges.append(_exchange);

        emit ExchangeAdded(
            _exchangeId,
            _exchange
        );
    }

    /**
     * Remove an exchange address with the mapping of tracked exchanges.
     * Can only be called by owner of Core.
     *
     * @param _exchangeId   Enumeration of exchange within the mapping
     * @param _exchange     Address of the exchange conforming to IExchangeWrapper
     */
    function removeExchange(
        uint8 _exchangeId,
        address _exchange
    )
        external
        onlyOwner
    {
        require(
            state.exchangeIds[_exchangeId] != address(0) &&
            state.exchangeIds[_exchangeId] == _exchange
        );

        state.exchanges = state.exchanges.remove(_exchange);

        state.exchangeIds[_exchangeId] = address(0);

        emit ExchangeRemoved(
            _exchangeId
        );
    }

    /**
     * Add a module address with the mapping of tracked modules.
     * Can only be called by owner of Core.
     *
     * @param _module     Address of the module
     */
    function addModule(
        address _module
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        require(
            !state.validModules[_module]
        );

        state.validModules[_module] = true;

        state.modules = state.modules.append(_module);

        emit ModuleAdded(
            _module
        );
    }

    /**
     * Remove a module address with the mapping of tracked modules.
     * Can only be called by owner of Core.
     *
     * @param _module   Enumeration of module within the mapping
     */
    function removeModule(
        address _module
    )
        external
        onlyOwner
    {
        require(
            state.validModules[_module]
        );

        state.modules = state.modules.remove(_module);

        state.validModules[_module] = false;

        emit ModuleRemoved(
            _module
        );
    }

    /**
     * Disables a Set from the mapping and array of tracked Sets.
     * Can only be called by owner of Core.
     *
     * @param  _set       Address of the Set
     */
    function disableSet(
        address _set
    )
        external
        onlyOwner
    {
        require(
            state.validSets[_set]
        );

        state.setTokens = state.setTokens.remove(_set);

        state.validSets[_set] = false;

        state.disabledSets[_set] = true;

        emit SetDisabled(
            _set
        );
    }

    /**
     * Enables a Set from the mapping and array of tracked Sets if it has been previously disabled
     * Can only be called by owner of Core.
     *
     * @param  _set       Address of the Set
     */
    function reenableSet(
        address _set
    )
        external
        onlyOwner
    {
        require(
            state.disabledSets[_set]
        );

        state.setTokens = state.setTokens.append(_set);

        state.validSets[_set] = true;

        state.disabledSets[_set] = false;

        emit SetReenabled(
            _set
        );
    }

    /**
     * Add a price library from the mapping of tracked price libraries.
     * Can only be called by owner of Core.
     *
     * @param  _priceLibrary   Address of the price library
     */
    function addPriceLibrary(
        address _priceLibrary
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        require(
            !state.validPriceLibraries[_priceLibrary]
        );

        state.validPriceLibraries[_priceLibrary] = true;

        state.priceLibraries = state.priceLibraries.append(_priceLibrary);

        emit PriceLibraryAdded(
            _priceLibrary
        );
    }

    /**
     * Remove a price library from the mapping of tracked price libraries.
     * Can only be called by owner of Core.
     *
     * @param  _priceLibrary   Address of the price library
     */
    function removePriceLibrary(
        address _priceLibrary
    )
        external
        onlyOwner
    {
        require(
            state.validPriceLibraries[_priceLibrary]
        );

        state.priceLibraries = state.priceLibraries.remove(_priceLibrary);

        state.validPriceLibraries[_priceLibrary] = false;

        emit PriceLibraryRemoved(
            _priceLibrary
        );
    }
}
