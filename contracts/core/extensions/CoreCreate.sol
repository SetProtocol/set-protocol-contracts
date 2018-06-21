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

import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { CoreState } from "../lib/CoreState.sol";
import { ISetFactory } from "../interfaces/ISetFactory.sol";


/**
 * @title Core Create
 * @author Set Protocol
 *x
 * The CoreCreate contract contains public set token operations
 */
contract CoreCreate is
    CoreState
{
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ Constants ============ */

    string constant INVALID_FACTORY = "Factory is disabled or does not exist.";

    /* ============ Events ============ */

    event SetTokenCreated(
        address indexed _setTokenAddress,
        address _factoryAddress,
        address[] _components,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    );

    /* ============ Modifiers ============ */

    modifier isValidFactory(address _factoryAddress) {
        require(
            state.validFactories[_factoryAddress],
            INVALID_FACTORY
        );
        _;
    }

    /* ============ Public Functions ============ */

    /**
     * Deploys a new Set Token and adds it to the valid list of SetTokens
     *
     * @param  _factoryAddress  address       The address of the Factory to create from
     * @param  _components      address[]     The address of component tokens
     * @param  _units           uint[]        The units of each component token
     * @param  _naturalUnit     uint          The minimum unit to be issued or redeemed
     * @param  _name            string        The name of the new Set
     * @param  _symbol          string        The symbol of the new Set
     * @return setTokenAddress address        The address of the new Set
     */
    function create(
        address _factoryAddress,
        address[] _components,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    )
        public
        isValidFactory(_factoryAddress)
        returns (address)
    {
        // Create the Set
        address newSetTokenAddress = ISetFactory(_factoryAddress).create(
            _components,
            _units,
            _naturalUnit,
            _name,
            _symbol
        );

        // Add Set to the list of tracked Sets
        state.validSets[newSetTokenAddress] = true;

        emit SetTokenCreated(
            newSetTokenAddress,
            _factoryAddress,
            _components,
            _units,
            _naturalUnit,
            _name,
            _symbol
        );

        return newSetTokenAddress;
    }
}
