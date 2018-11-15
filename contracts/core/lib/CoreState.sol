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

        // Mapping of exchange enumeration to address
        mapping(uint8 => address) exchanges;

        // Address of the TransferProxy contract
        address transferProxy;

        // Address of the Vault contract
        address vault;

        // Mapping of approved modules
        mapping(address => bool) validModules;

        // Address of the Signature Validator contract
        address signatureValidator;

        // Protocol address for fee accrual
        address protocolAddress;

        // Protocol rebalancing fees in basis points of manager's fees
        uint256 protocolFee;

        // Mapping of tracked SetToken factories
        mapping(address => bool) validFactories;

        // Mapping of tracked SetTokens
        mapping(address => bool) validSets;

        // Mapping of tracked disabled SetTokens
        mapping(address => bool) disabledSets;

        // Array of tracked SetTokens
        address[] setTokens;

        // Mapping of tracked rebalancing price libraries
        mapping(address => bool) validPriceLibraries;

        // Timelock Upgrade Period in seconds
        uint256 timeLockPeriod;

        // Mapping of upgradable units and initialized timelock
        mapping(bytes32 => uint256) timeLockedUpgrades;
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
        public
        view
        returns(uint8)
    {
        return state.operationState;
    }

    /**
     * Return address belonging to given exchangeId.
     *
     * @param  _exchangeId       ExchangeId number
     * @return address           Address belonging to given exchangeId
     */
    function exchanges(
        uint8 _exchangeId
    )
        public
        view
        returns(address)
    {
        return state.exchanges[_exchangeId];
    }

    /**
     * Return transferProxy address.
     *
     * @return address       transferProxy address
     */
    function transferProxy()
        public
        view
        returns(address)
    {
        return state.transferProxy;
    }

    /**
     * Return vault address
     *
     * @return address        vault address
     */
    function vault()
        public
        view
        returns(address)
    {
        return state.vault;
    }

    /**
     * Return signatureValidator address
     *
     * @return address        signatureValidator address
     */
    function signatureValidator()
        public
        view
        returns(address)
    {
        return state.signatureValidator;
    }

    /**
     * Return current protocol fee in basis points
     *
     * @return uint256   Protocol fee in basis points of the manager's rebalancing fees
     */
    function protocolFee()
        public
        view
        returns(uint256)
    {
        return state.protocolFee;
    }

    /**
     * Get protocol address
     *
     * @return address        protocol address
     */
    function protocolAddress()
        public
        view
        returns(address)
    {
        return state.protocolAddress;
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
        public
        view
        returns(bool)
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
        public
        view
        returns(bool)
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
        public
        view
        returns(bool)
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
        public
        view
        returns(bool)
    {
        return state.disabledSets[_set];
    }

    /**
     * Return array of all valid Set Tokens.
     *
     * @return address[]      Array of valid Set Tokens
     */
    function setTokens()
        public
        view
        returns(address[])
    {
        return state.setTokens;
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
        public
        view
        returns(bool)
    {
        return state.validPriceLibraries[_priceLibrary];
    }

    /**
     * Return time lock period.
     *
     * @return uint256      Time in seconds of minimum upgrade period
     */
    function timeLockPeriod()
        public
        view
        returns(uint256)
    {
        return state.timeLockPeriod;
    }

    /**
     * Return amount of Issuance Order already canceled
     *
     * @param  _upgradeHash        Hash of upgrade call data
     * @return uint256             Amount of Issuance Order canceled
     */
    function timeLockedUpgrades(
        bytes32 _upgradeHash
    )
        public
        view
        returns(uint256)
    {
        return state.timeLockedUpgrades[_upgradeHash];
    }
}
