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
import { CoreModifiers } from "../lib/CoreSharedModifiers.sol";
import { CoreState } from "../lib/CoreState.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";


/**
 * @title Core Accounting
 * @author Set Protocol
 *
 * The CoreAccounting contract interfaces with the vault and transfer transfer proxies
 * for storage of tokenized assets
 */
contract CoreAccounting is
    CoreState,
    CoreModifiers
{
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ Constants ============ */

    string constant ADDRESSES_MISSING = "Addresses must not be empty.";
    string constant BATCH_INPUT_MISMATCH = "Addresses and quantities must be the same length.";
    string constant QUANTITES_MISSING = "Quantities must not be empty.";
    string constant ZERO_QUANTITY = "Quantity must be greater than zero.";

    /* ============ Modifiers ============ */

    // Confirm that all inputs are valid for batch transactions
    modifier isValidBatchTransaction(address[] _tokenAddresses, uint[] _quantities) {
        // Confirm an empty _addresses array is not passed
        require(
            _tokenAddresses.length > 0,
            ADDRESSES_MISSING
        );

        // Confirm an empty _quantities array is not passed
        require(
            _quantities.length > 0,
            QUANTITES_MISSING
        );

        // Confirm there is one quantity for every token address
        require(
            _tokenAddresses.length == _quantities.length,
            BATCH_INPUT_MISMATCH
        );
        _;
    }

    /* ============ Public Functions ============ */

    /**
     * Deposit multiple tokens to the vault. Quantities should be in the
     * order of the addresses of the tokens being deposited.
     *
     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to deposit
     */
    function batchDeposit(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        external
        isValidBatchTransaction(_tokenAddresses, _quantities)
    {
        // Call internal batch deposit function
        batchDepositInternal(
            msg.sender,
            msg.sender,
            _tokenAddresses,
            _quantities
        );
    }

    /**
     * Withdraw multiple tokens from the vault. Quantities should be in the
     * order of the addresses of the tokens being withdrawn.
     *
     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens
     * @param  _quantities        Array of the number of tokens to withdraw
     */
    function batchWithdraw(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        external
        isValidBatchTransaction(_tokenAddresses, _quantities)
    {
        // For each token and quantity pair, run withdraw function
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            withdraw(
                _tokenAddresses[i],
                _quantities[i]
            );
        }
    }

    /**
     * Deposit any quantity of tokens into the vault.
     *
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to deposit
     */
    function deposit(
        address _tokenAddress,
        uint _quantity
    )
        public
        isPositiveQuantity(_quantity)
    {
        // Call TransferProxy contract to transfer user tokens to Vault
        depositInternal(
            msg.sender,
            msg.sender,
            _tokenAddress,
            _quantity
        );
    }

    /**
     * Withdraw a quantity of tokens from the vault.
     *
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to withdraw
     */
    function withdraw(
        address _tokenAddress,
        uint _quantity
    )
        public
    {
        // Call Vault contract to deattribute tokens to user
        IVault(state.vaultAddress).decrementTokenOwner(
            msg.sender,
            _tokenAddress,
            _quantity
        );

        // Call Vault to withdraw tokens from Vault to user
        IVault(state.vaultAddress).withdrawTo(
            _tokenAddress,
            msg.sender,
            _quantity
        );
    }

    /* ============ Internal Functions ============ */

    /**
     * Deposit any quantity of tokens into the vault.
     *
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to deposit
     */
    function depositInternal(
        address _from,
        address _to,
        address _tokenAddress,
        uint _quantity
    )
        internal
    {
        // Call TransferProxy contract to transfer user tokens to Vault
        ITransferProxy(state.transferProxyAddress).transfer(
            _tokenAddress,
            _quantity,
            _from,
            state.vaultAddress
        );

        // Call Vault contract to attribute deposited tokens to user
        IVault(state.vaultAddress).incrementTokenOwner(
            _to,
            _tokenAddress,
            _quantity
        );
    }

    /**
     * Deposit multiple tokens to the vault. Quantities should be in the
     * order of the addresses of the tokens being deposited.
     *
     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to deposit
     */
    function batchDepositInternal(
        address _from,
        address _to,
        address[] _tokenAddresses,
        uint[] _quantities
    )
        internal
    {
        // For each token and quantity pair, run deposit function
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            depositInternal(
                _from,
                _to,
                _tokenAddresses[i],
                _quantities[i]
            );
        }
    }
}
