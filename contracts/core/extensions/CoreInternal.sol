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
    /* ============ External Functions ============ */

    /**
     * Add a factory to the mapping of tracked factories. Can only be set by
     * owner of Core.
     *
     * @param  _factory   The address of the SetTokenFactory to enable
     */
    function enableFactory(
        address _factory
    )
        external
        onlyOwner
    {
        // Mark as true in validFactories mapping
        state.validFactories[_factory] = true;

        // Add to factories array
        state.factories.push(_factory);
    }

    /**
     * Disable a factory in the mapping of tracked factories. Can only be disabled
     * by owner of Core.
     *
     * @param  _factory   The address of the SetTokenFactory to disable
     */
    function disableFactory(
        address _factory
    )
        external
        onlyOwner
    {
        // Verify Factory is linked to Core
        require(state.validFactories[_factory], "UNKNOWN_FACTORY");

        // Mark as false in validFactories mapping
        state.validFactories[_factory] = false;

        // Find and remove factory from factories array
        state.factories = state.factories.remove(_factory);
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
     */
    function enableFees()
        external
        onlyOwner
    {
        // Set feesEnabled to true
        state.feesEnabled = true;
    }
}
