/*
    Copyright 2019 Set Labs Inc.

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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";

import { ERC20Wrapper } from "../../../lib/ERC20Wrapper.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { ModuleCoreStateV2 } from "./ModuleCoreStateV2.sol";


/**
 * @title TokenFlush
 * @author Set Protocol
 *
 * The TokenFlush contains utility functions to send tokens and base SetTokens from the
 * Vault or Contract to a specified user address
 */
contract TokenFlush is 
    ModuleCoreStateV2
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    // ============ Internal ============

    /**
     * Checks the base SetToken balances on the contract and sends
     * any positive quantity to the user directly or into the Vault
     * depending on the keepChangeInVault flag.
     *
     * @param _baseSetAddress             The address of the base SetToken
     * @param _returnAddress              The address to send excess tokens to
     * @param  _keepChangeInVault         Boolean signifying whether excess base SetToken is transfered to the user 
     *                                     or left in the vault
     */
    function returnExcessBaseSetFromContract(
        address _baseSetAddress,
        address _returnAddress,
        bool _keepChangeInVault
    )
        internal
    {
        uint256 baseSetQuantity = ERC20Wrapper.balanceOf(_baseSetAddress, address(this));
        
        if (baseSetQuantity > 0) { 
            if (_keepChangeInVault) {
                // Ensure base SetToken allowance
                ERC20Wrapper.ensureAllowance(
                    _baseSetAddress,
                    address(this),
                    address(transferProxyInstance),
                    baseSetQuantity
                );

                // Deposit base SetToken to the user
                coreInstance.depositModule(
                    address(this),
                    _returnAddress,
                    _baseSetAddress,
                    baseSetQuantity
                );
            } else {
                // Transfer directly to the user
                ERC20Wrapper.transfer(
                    _baseSetAddress,
                    _returnAddress,
                    baseSetQuantity
                );
            }
        }
    }

    /**
     * Checks the base SetToken balances in the Vault and sends
     * any positive quantity to the user directly or into the Vault
     * depending on the keepChangeInVault flag.
     *
     * @param _baseSetAddress             The address of the base SetToken
     * @param _returnAddress              The address to send excess tokens to
     * @param  _keepChangeInVault         Boolean signifying whether excess base SetToken is transfered to the user 
     *                                     or left in the vault
     */
    function returnExcessBaseSetInVault(
        address _baseSetAddress,
        address _returnAddress,
        bool _keepChangeInVault
    )
        internal
    {
        // Return base SetToken if any that are in the Vault
        uint256 baseSetQuantityInVault = vaultInstance.getOwnerBalance(
            _baseSetAddress,
            address(this)
        );
        
        if (baseSetQuantityInVault > 0) { 
            if (_keepChangeInVault) {
                // Transfer ownership within the vault to the user
                coreInstance.internalTransfer(
                    _baseSetAddress,
                    _returnAddress,
                    baseSetQuantityInVault
                );
            } else {
                // Transfer ownership directly to the user
                coreInstance.withdrawModule(
                    address(this),
                    _returnAddress,
                    _baseSetAddress,
                    baseSetQuantityInVault
                );
            }
        }
    } 

    /**
     * Withdraw any base Set components to the user from the contract.
     *
     * @param _baseSetToken               Instance of the Base SetToken
     * @param _returnAddress              The address to send excess tokens to
     */
    function returnExcessComponentsFromContract(
        ISetToken _baseSetToken,
        address _returnAddress
    )
        internal
    {
        // Return base Set components
        address[] memory baseSetComponents = _baseSetToken.getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            uint256 withdrawQuantity = ERC20Wrapper.balanceOf(baseSetComponents[i], address(this));
            if (withdrawQuantity > 0) {
                ERC20Wrapper.transfer(
                    baseSetComponents[i],
                    _returnAddress,
                    withdrawQuantity
                );
            }
        }         
    }

    /**
     * Any base Set components in the Vault are returned to the caller.
     *
     * @param _baseSetToken               Instance of the Base SetToken
     * @param _returnAddress              The address to send excess tokens to
     */
    function returnExcessComponentsFromVault(
        ISetToken _baseSetToken,
        address _returnAddress
    )
        internal
    {
        // Return base Set components not used in issuance of base set
        address[] memory baseSetComponents = _baseSetToken.getComponents();
        for (uint256 i = 0; i < baseSetComponents.length; i++) {
            uint256 vaultQuantity = vaultInstance.getOwnerBalance(baseSetComponents[i], address(this));
            if (vaultQuantity > 0) {
                coreInstance.withdrawModule(
                    address(this),
                    _returnAddress,
                    baseSetComponents[i],
                    vaultQuantity
                );
            }
        }
    }   
}
