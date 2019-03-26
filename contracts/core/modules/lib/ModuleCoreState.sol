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
 * @title ModuleCoreState
 * @author Set Protocol
 *
 * The ModuleCoreState library maintains Core-related state for modules
 */
contract ModuleCoreState {

    /* ============ State Variables ============ */

    // Address of core contract
    address public core;

    // Address of vault contract
    address public vault;

    // Instance of core contract
    ICore public coreInstance;

    // Instance of vault contract
    IVault public vaultInstance;

    /* ============ Public Getters ============ */

    /**
     * Constructor function for ModuleCoreState
     *
     * @param _core                The address of Core
     * @param _vault               The address of Vault
     */
    constructor(
        address _core,
        address _vault
    )
        public
    {
        // Commit passed address to core state variable
        core = _core;

        // Commit passed address to coreInstance state variable
        coreInstance = ICore(_core);

        // Commit passed address to vault state variable
        vault = _vault;

        // Commit passed address to vaultInstance state variable
        vaultInstance = IVault(_vault);
    }
}
