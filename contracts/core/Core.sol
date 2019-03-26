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

import { CoreAccounting } from "./extensions/CoreAccounting.sol";
import { CoreAdmin } from "./extensions/CoreAdmin.sol";
import { CoreFactory } from "./extensions/CoreFactory.sol";
import { CoreIssuance } from "./extensions/CoreIssuance.sol";
import { CoreModuleInteraction } from "./extensions/CoreModuleInteraction.sol";
import { ITransferProxy } from "./interfaces/ITransferProxy.sol";
import { IVault } from "./interfaces/IVault.sol";


/**
 * @title Core
 * @author Set Protocol
 *
 * The Core contract acts as a coordinator handling issuing, redeeming, and
 * creating Sets, as well as all collateral flows throughout the system. Core
 * is also responsible for tracking state and exposing methods to modules
 */
 /* solium-disable-next-line no-empty-blocks */
contract Core is
    CoreAccounting,
    CoreAdmin,
    CoreFactory,
    CoreIssuance,
    CoreModuleInteraction
{
    /**
     * Constructor function for Core
     *
     * @param _transferProxy       The address of the transfer proxy
     * @param _vault               The address of the vault
     */
    constructor(
        address _transferProxy,
        address _vault
    )
        public
    {
        // Commit passed address to transferProxyAddress state variable
        state.transferProxy = _transferProxy;

        // Instantiate instance of transferProxy
        state.transferProxyInstance = ITransferProxy(_transferProxy);

        // Commit passed address to vault state variable
        state.vault = _vault;

        // Instantiate instance of vault
        state.vaultInstance = IVault(_vault);
    }
}
