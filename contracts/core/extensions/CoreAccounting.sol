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
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";


/**
 * @title Core Accounting
 * @author Set Protocol
 *
 * The CoreAccounting contract interfaces with the vault and transfer proxies
 * for storage of tokenized assets
 */
contract CoreAccounting is
    CoreState
{
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ External Functions ============ */

    /**
     * Deposit any quantity of tokens into the vault and attribute to sender.
     *
     * @param  _token           The address of the ERC20 token
     * @param  _quantity        The number of tokens to deposit
     */
    function deposit(
        address _token,
        uint256 _quantity
    )
        external
    {
        // Call internal deposit function
        depositInternal(
            msg.sender,
            msg.sender,
            _token,
            _quantity
        );
    }

    /**
     * Withdraw a quantity of tokens from the vault.
     *
     * @param  _token           The address of the ERC20 token
     * @param  _quantity        The number of tokens to withdraw
     */
    function withdraw(
        address _token,
        uint256 _quantity
    )
        public
    {
        // Declare interface variavle for vault
        IVault vault = IVault(state.vault);

        // Call Vault contract to deattribute tokens to user
        vault.decrementTokenOwner(
            msg.sender,
            _token,
            _quantity
        );

        // Call Vault to withdraw tokens from Vault to user
        vault.withdrawTo(
            _token,
            msg.sender,
            _quantity
        );
    }

    /**
     * Deposit multiple tokens to the vault and attribute to sender.
     * Quantities should be in the order of the addresses of the tokens being deposited.
     *
     * @param  _tokens           Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to deposit
     */
    function batchDeposit(
        address[] _tokens,
        uint256[] _quantities
    )
        external
    {
        // Call internal batch deposit function
        batchDepositInternal(
            msg.sender,
            msg.sender,
            _tokens,
            _quantities
        );
    }

    /**
     * Withdraw multiple tokens from the vault. Quantities should be in the
     * order of the addresses of the tokens being withdrawn.
     *
     * @param  _tokens            Array of the addresses of the ERC20 tokens
     * @param  _quantities        Array of the number of tokens to withdraw
     */
    function batchWithdraw(
        address[] _tokens,
        uint256[] _quantities
    )
        external
    {
        // Confirm an empty _tokens array is not passed
        require(_tokens.length > 0);

        // Confirm an empty _quantities array is not passed
        require(_quantities.length > 0);

        // Confirm there is one quantity for every token address
        require(_tokens.length == _quantities.length);

        // For each token and quantity pair, run withdraw function
        for (uint256 i = 0; i < _tokens.length; i++) {
            withdraw(
                _tokens[i],
                _quantities[i]
            );
        }
    }

    /* ============ Internal Functions ============ */

    /**
     * Deposit any quantity of tokens into the vault.
     *
     * @param  _from            Address depositing token
     * @param  _to              Address to credit for deposit
     * @param  _token           Address of token being deposited
     * @param  _quantity        The number of tokens to deposit
     */
    function depositInternal(
        address _from,
        address _to,
        address _token,
        uint256 _quantity
    )
        internal
    {
        // Call TransferProxy contract to transfer user tokens to Vault
        ITransferProxy(state.transferProxy).transfer(
            _token,
            _quantity,
            _from,
            state.vault
        );

        // Call Vault contract to attribute deposited tokens to user
        IVault(state.vault).incrementTokenOwner(
            _to,
            _token,
            _quantity
        );
    }

    /**
     * Deposit multiple tokens to the vault. Quantities should be in the
     * order of the addresses of the tokens being deposited.
     *
     * @param  _from            Address depositing tokens
     * @param  _to              Address to credit for deposits
     * @param  _tokens          Addresses of tokens being deposited
     * @param  _quantities      The quantities of tokens to deposit
     */
    function batchDepositInternal(
        address _from,
        address _to,
        address[] _tokens,
        uint256[] _quantities
    )
        internal
    {
        // Confirm and empty _tokens array is not passed
        require(_tokens.length > 0);

        // Confirm an empty _quantities array is not passed
        require(_quantities.length > 0);

        // Confirm there is one quantity for every token address
        require(_tokens.length == _quantities.length);

        // For each token and quantity pair, run depositInternal function
        for (uint256 i = 0; i < _tokens.length; i++) {
            depositInternal(
                _from,
                _to,
                _tokens[i],
                _quantities[i]
            );
        }
    }
}
