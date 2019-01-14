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

pragma solidity 0.4.25;

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

import { CoreState } from "../lib/CoreState.sol";
import { ICoreAccounting } from "../interfaces/ICoreAccounting.sol";
import { ICoreIssuance } from "../interfaces/ICoreIssuance.sol";

/**
 * @title CoreModularInteraction
 * @author Set Protocol
 *
 * Extension used to expose internal accounting functions to module
 */


contract CoreModuleInteraction is
    ICoreAccounting,
    ICoreIssuance,
    CoreState,
    ReentrancyGuard
{
    /**
     * Exposes internal function that deposits multiple tokens to the vault, to system
     * modules. Quantities should be in the order of the addresses of the tokens being
     * deposited.
     *
     * @param  _from              Address to transfer tokens from
     * @param  _to                Address to credit for deposits
     * @param  _tokens            Array of the addresses of the tokens being deposited
     * @param  _quantities        Array of the amounts of tokens to deposit
     */
    function batchDepositModule(
        address _from,
        address _to,
        address[] _tokens,
        uint256[] _quantities
    )
        external
    {
        // Require that only modules can call function
        require(
            state.validModules[msg.sender],
            "Core.batchDepositModule: Sender not recognized module"
        );

        batchDepositInternal(
            _from,
            _to,
            _tokens,
            _quantities
        );
    }

    /**
     * Exposes internal function that withdraws multiple tokens from the vault, to system
     * modules. Quantities should be in the order of the addresses of the tokens being withdrawn.
     *
     * @param  _from              Address to decredit for withdrawals
     * @param  _to                Address to transfer tokens to
     * @param  _tokens            Array of the addresses of the tokens being withdrawn
     * @param  _quantities        Array of the amounts of tokens to withdraw
     */
    function batchWithdrawModule(
        address _from,
        address _to,
        address[] _tokens,
        uint256[] _quantities
    )
        external
    {
        // Require that only modules can call function
        require(
            state.validModules[msg.sender],
            "Core.batchWithdrawModule: Sender not recognized module"
        );

        batchWithdrawInternal(
            _from,
            _to,
            _tokens,
            _quantities
        );
    }

    /**
     * Expose internal function that exchanges components for Set tokens,
     * accepting any owner, to system modules
     *
     * @param  _componentOwner  Address to use tokens from
     * @param  _setRecipient    Address to issue Set to
     * @param  _set          Address of the Set to issue
     * @param  _quantity     Number of tokens to issue
     */
    function issueModule(
        address _componentOwner,
        address _setRecipient,
        address _set,
        uint256 _quantity
    )
        external
    {
        // Require that only modules can call function
        require(
            state.validModules[msg.sender],
            "Core.issueModule: Sender not recognized module"
        );

        issueInternal(
            _componentOwner,
            _setRecipient,
            _set,
            _quantity
        );
    }

    /**
     * Converts recipient's components into Set Token's held directly in Vault
     *
     * @param _recipient    Address to issue to
     * @param _set          Address of the Set
     * @param _quantity     Number of tokens to redeem
     */
    function issueInVaultModule(
        address _recipient,
        address _set,
        uint256 _quantity
    )
        external
        nonReentrant
    {
        // Require that only modules can call function
        require(
            state.validModules[msg.sender],
            "Core.issueModule: Sender not recognized module"
        );

        issueInVaultInternal(
            _recipient,
            _set,
            _quantity
        );
    }

    /**
     * Expose internal function that exchanges Set tokens for components,
     * accepting any owner, to system modules
     *
     * @param  _burnAddress         Address to burn token from
     * @param  _incrementAddress    Address to increment component tokens to
     * @param  _set                 Address of the Set to redeem
     * @param  _quantity            Number of tokens to redeem
     */
    function redeemModule(
        address _burnAddress,
        address _incrementAddress,
        address _set,
        uint256 _quantity
    )
        external
    {
        // Require that only modules can call function
        require(
            state.validModules[msg.sender],
            "Core.redeemModule: Sender not recognized module"
        );

        redeemInternal(
            _burnAddress,
            _incrementAddress,
            _set,
            _quantity
        );
    }
}