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
 * @title CoreState
 * @author Set Protocol
 *
 * The CoreState library maintains all state for the Core contract thus
 * allowing it to operate across multiple mixins.
 */
contract CoreState {

    /* ============ Structs ============ */

    struct State {
        // Mapping of exchange enumeration to address
        mapping(uint8 => address) exchanges;

        // Address of the TransferProxy contract
        address transferProxy;

        // Address of the Vault contract
        address vault;

        // Mapping of tracked SetToken factories
        mapping(address => bool) validFactories;

        // Array of tracked SetToken factories
        address[] factories;

        // Mapping of filled Issuance Orders
        mapping(bytes32 => uint) orderFills;

        // Mapping of canceled Issuance Orders
        mapping(bytes32 => uint) orderCancels;
    }

    /* ============ State Variables ============ */

    State public state;

    /* ============ Public Getters ============ */

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
     * Return array of all enabled factories.
     *
     * @return address[]      Array of enabled factories
     */
    function factories()
        public
        view
        returns(address[])
    {
        return state.factories;
    }

    /**
     * Return amount of Issuance Order already filled
     *
     * @param  _orderHash       Issuance Order orderHash
     * @return uint256             Amount of Issuance Order filled
     */
    function orderFills(
        bytes32 _orderHash
    )
        public
        view
        returns(uint256)
    {
        return state.orderFills[_orderHash];
    }

    /**
     * Return amount of Issuance Order already canceled
     *
     * @param  _orderHash       Issuance Order orderHash
     * @return uint256             Amount of Issuance Order canceled
     */
    function orderCancels(
        bytes32 _orderHash
    )
        public
        view
        returns(uint256)
    {
        return state.orderCancels[_orderHash];
    }
}
