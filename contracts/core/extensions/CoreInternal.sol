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
import { AddressArrayUtils } from "../../external/cryptofin/AddressArrayUtils.sol";


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
    /* ============ External Functions ============ */

    /**
     * Set vaultAddress. Can only be set by owner of Core.
     *
     * @param  _vault   The address of the Vault
     */
    function setVaultAddress(
        address _vault
    )
        external
        onlyOwner
    {
        // Commit passed address to vaultAddress state variable
        state.vault = _vault;
    }

    /**
     * Set transferProxyAddress. Can only be set by owner of Core.
     *
     * @param  _transferProxy   The address of the TransferProxy
     */
    function setTransferProxyAddress(
        address _transferProxy
    )
        external
        onlyOwner
    {
        // Commit passed address to transferProxyAddress state variable
        state.transferProxy = _transferProxy;
    }

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
        require(state.validFactories[_factory]);

        // Mark as false in validFactories mapping
        state.validFactories[_factory] = false;

        // Find and remove factory from factories array
        state.factories = AddressArrayUtils.remove(state.factories, _factory);
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
        require(state.validSets[_set]);

        // Mark as false in validSet mapping
        state.validSets[_set] = false;

        // Find and remove from setTokens array
        state.setTokens = AddressArrayUtils.remove(state.setTokens, _set);
    }
}
