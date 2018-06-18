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
        // Address of the TransferProxy contract
        address transferProxyAddress;

        // Address of the Vault contract
        address vaultAddress;

        // Mapping of tracked SetToken factories
        mapping(address => bool) validFactories;

        // Mapping of tracked SetTokens
        mapping(address => bool) validSets;
    }

    /* ============ State Variables ============ */

    State public state;

    /* ============ Public Getters ============ */

    function transferProxyAddress()
        public
        view
        returns(address)
    {
        return state.transferProxyAddress;
    }

    function vaultAddress()
        public
        view
        returns(address)
    {
        return state.vaultAddress;
    }

    function validFactories(address _factory)
        public
        view
        returns(bool)
    {
        return state.validFactories[_factory];
    }

    function validSets(address _set)
        public
        view
        returns(bool)
    {
        return state.validSets[_set];
    }
}
