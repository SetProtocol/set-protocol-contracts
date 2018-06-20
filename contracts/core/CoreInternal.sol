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
import { CoreState } from "./lib/CoreState.sol";


/**
 * @title Core Internal
 * @author Set Protocol
 *
 * The CoreInternal contract contains methods to alter state that tracks contract
 * addresses that need to interact with Core.
 */
contract CoreInternal is
    Ownable,
    CoreState
{
    /* ============ Setter Functions ============ */

    /**
     * Set vaultAddress. Can only be set by owner of Core.
     *
     * @param  _vaultAddress   The address of the Vault
     */
    function setVaultAddress(
        address _vaultAddress
    )
        external
        onlyOwner
    {
        // Commit passed address to vaultAddress state variable
        state.vaultAddress = _vaultAddress;
    }

    /**
     * Set transferProxyAddress. Can only be set by owner of Core.
     *
     * @param  _transferProxyAddress   The address of the TransferProxy
     */
    function setTransferProxyAddress(
        address _transferProxyAddress
    )
        external
        onlyOwner
    {
        // Commit passed address to transferProxyAddress state variable
        state.transferProxyAddress = _transferProxyAddress;
    }

    /**
     * Add a factory to the mapping of tracked factories.
     *
     * @param  _factoryAddress   The address of the SetTokenFactory to enable
     */
    function enableFactory(
        address _factoryAddress
    )
        external
        onlyOwner
    {
        state.validFactories[_factoryAddress] = true;
    }

    /**
     * Disable a factory in the mapping of tracked factories.
     *
     * @param  _factoryAddress   The address of the SetTokenFactory to disable
     */
    function disableFactory(
        address _factoryAddress
    )
        external
        onlyOwner
    {
        state.validFactories[_factoryAddress] = false;
    }

    /**
     * Disable a set token in the mapping of tracked set tokens.
     *
     * @param  _setAddress   The address of the SetToken to remove
     */
    function disableSet(
        address _setAddress
    )
        external
        onlyOwner
    {
        state.validSets[_setAddress] = false;
    }
}
