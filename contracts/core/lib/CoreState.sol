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

import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";


/**
 * @title CoreState
 * @author Set Protocol
 *
 * The CoreState library maintains all state for the Core contract thus
 * allowing it to operate across multiple mixins.
 */
contract CoreState {

    /* ============ Structs ============ */

    struct State {
        // Protocol state of operation
        uint8 operationState;

        // Address of the TransferProxy contract
        address transferProxy;

        // Address of the Vault contract
        address vault;

        // Instance of transferProxy contract
        ITransferProxy transferProxyInstance;

        // Instance of Vault Contract
        IVault vaultInstance;

        // Mapping of exchange enumeration to address
        mapping(uint8 => address) exchangeIds;

        // Mapping of approved modules
        mapping(address => bool) validModules;

        // Mapping of tracked SetToken factories
        mapping(address => bool) validFactories;

        // Mapping of tracked rebalancing price libraries
        mapping(address => bool) validPriceLibraries;

        // Mapping of tracked SetTokens
        mapping(address => bool) validSets;

        // Mapping of tracked disabled SetTokens
        mapping(address => bool) disabledSets;

        // Array of tracked SetTokens
        address[] setTokens;

        // Array of tracked modules
        address[] modules;

        // Array of tracked factories
        address[] factories;

        // Array of tracked exchange wrappers
        address[] exchanges;

        // Array of tracked auction price libraries
        address[] priceLibraries;
    }

    /* ============ State Variables ============ */

    State public state;

    /* ============ Public Getters ============ */

    /**
     * Return uint8 representing the operational state of the protocol
     *
     * @return uint8           Uint8 representing the operational state of the protocol
     */
    function operationState()
        external
        view
        returns (uint8)
    {
        return state.operationState;
    }

    /**
     * Return address belonging to given exchangeId.
     *
     * @param  _exchangeId       ExchangeId number
     * @return address           Address belonging to given exchangeId
     */
    function exchangeIds(
        uint8 _exchangeId
    )
        external
        view
        returns (address)
    {
        return state.exchangeIds[_exchangeId];
    }

    /**
     * Return transferProxy address.
     *
     * @return address       transferProxy address
     */
    function transferProxy()
        external
        view
        returns (address)
    {
        return state.transferProxy;
    }

    /**
     * Return vault address
     *
     * @return address        vault address
     */
    function vault()
        external
        view
        returns (address)
    {
        return state.vault;
    }

    /**
     * Return boolean indicating if address is valid factory.
     *
     * @param  _factory       Factory address
     * @return bool           Boolean indicating if enabled factory
     */
    function validFactories(
        address _factory
    )
        external
        view
        returns (bool)
    {
        return state.validFactories[_factory];
    }

    /**
     * Return boolean indicating if address is valid module.
     *
     * @param  _module        Factory address
     * @return bool           Boolean indicating if enabled factory
     */
    function validModules(
        address _module
    )
        external
        view
        returns (bool)
    {
        return state.validModules[_module];
    }

    /**
     * Return boolean indicating if address is valid Set.
     *
     * @param  _set           Set address
     * @return bool           Boolean indicating if valid Set
     */
    function validSets(
        address _set
    )
        external
        view
        returns (bool)
    {
        return state.validSets[_set];
    }

    /**
     * Return boolean indicating if address is a disabled Set.
     *
     * @param  _set           Set address
     * @return bool           Boolean indicating if is a disabled Set
     */
    function disabledSets(
        address _set
    )
        external
        view
        returns (bool)
    {
        return state.disabledSets[_set];
    }

    /**
     * Return boolean indicating if address is a valid Rebalancing Price Library.
     *
     * @param  _priceLibrary    Price library address
     * @return bool             Boolean indicating if valid Price Library
     */
    function validPriceLibraries(
        address _priceLibrary
    )
        external
        view
        returns (bool)
    {
        return state.validPriceLibraries[_priceLibrary];
    }

    /**
     * Return array of all valid Set Tokens.
     *
     * @return address[]      Array of valid Set Tokens
     */
    function setTokens()
        external
        view
        returns (address[] memory)
    {
        return state.setTokens;
    }

    /**
     * Return array of all valid Modules.
     *
     * @return address[]      Array of valid modules
     */
    function modules()
        external
        view
        returns (address[] memory)
    {
        return state.modules;
    }

    /**
     * Return array of all valid factories.
     *
     * @return address[]      Array of valid factories
     */
    function factories()
        external
        view
        returns (address[] memory)
    {
        return state.factories;
    }

    /**
     * Return array of all valid exchange wrappers.
     *
     * @return address[]      Array of valid exchange wrappers
     */
    function exchanges()
        external
        view
        returns (address[] memory)
    {
        return state.exchanges;
    }

    /**
     * Return array of all valid price libraries.
     *
     * @return address[]      Array of valid price libraries
     */
    function priceLibraries()
        external
        view
        returns (address[] memory)
    {
        return state.priceLibraries;
    }
}
