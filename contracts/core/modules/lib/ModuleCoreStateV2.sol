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

import { ICore } from "../../interfaces/ICore.sol";
import { ITransferProxy } from "../../interfaces/ITransferProxy.sol";
import { IVault } from "../../interfaces/IVault.sol";


/**
 * @title ModuleCoreStateV2
 * @author Set Protocol
 *
 * The ModuleCoreStateV2 library maintains Core-related state for modules.
 *
 * CHANGELOG
 * - Adds transferProxy to the tracked state
 * - Removes address variables
 *
 */
contract ModuleCoreStateV2 {

    /* ============ State Variables ============ */

    // Address of core contract
    ICore public coreInstance;

    // Address of vault contract
    IVault public vaultInstance;

    // Address of transferProxy contract
    ITransferProxy public transferProxyInstance;

    /* ============ Public Getters ============ */

    /**
     * Constructor function for ModuleCoreStateV2
     *
     * @param _core                The address of Core
     * @param _vault               The address of Vault
     * @param _transferProxy       The address of TransferProxy
     */
    constructor(
        ICore _core,
        IVault _vault,
        ITransferProxy _transferProxy
    )
        public
    {
        // Commit passed address to core state variable
        coreInstance = _core;

        // Commit passed address to vault state variable
        vaultInstance = _vault;

        // Commit passed address to vault state variable
        transferProxyInstance = _transferProxy;
    }
}
