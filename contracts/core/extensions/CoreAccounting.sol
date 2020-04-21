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

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonValidationsLibrary } from "set-protocol-contract-utils/contracts/lib/CommonValidationsLibrary.sol";

import { CoreOperationState } from "./CoreOperationState.sol";
import { CoreState } from "../lib/CoreState.sol";


/**
 * @title CoreAccounting
 * @author Set Protocol
 *
 * The CoreAccounting contract interfaces with the vault and transfer proxies for
 * storage of tokenized assets.
 */
contract CoreAccounting is
    CoreState,
    CoreOperationState,
    ReentrancyGuard
{
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ External Functions ============ */

    /**
     * Deposit a quantity of tokens to the vault and attribute to sender.
     *
     * @param  _token           Address of the token
     * @param  _quantity        Amount of tokens to deposit
     */
    function deposit(
        address _token,
        uint256 _quantity
    )
        external
        nonReentrant
        whenOperational
    {
        // Don't deposit if quantity <= 0
        if (_quantity > 0) {
            // Call TransferProxy contract to transfer user tokens to Vault
            state.transferProxyInstance.transfer(
                _token,
                _quantity,
                msg.sender,
                state.vault
            );

            // Call Vault contract to attribute deposited tokens to user
            state.vaultInstance.incrementTokenOwner(
                _token,
                msg.sender,
                _quantity
            );
        }
    }

    /**
     * Withdraw a quantity of tokens from the vault and deattribute from sender.
     *
     * @param  _token           Address of the token
     * @param  _quantity        Amount of tokens to withdraw
     */
    function withdraw(
        address _token,
        uint256 _quantity
    )
        external
        nonReentrant
    {
        // Don't withdraw if quantity <= 0
        if (_quantity > 0) {
            // Call Vault contract to deattribute withdrawn tokens from user
            state.vaultInstance.decrementTokenOwner(
                _token,
                msg.sender,
                _quantity
            );

            // Call Vault contract to withdraw tokens from Vault to user
            state.vaultInstance.withdrawTo(
                _token,
                msg.sender,
                _quantity
            );
        }
    }

    /**
     * Deposit multiple tokens to the vault and attribute to sender.
     * Quantities should be in the order of the addresses of the tokens being deposited.
     *
     * @param  _tokens            Array of the addresses of the tokens
     * @param  _quantities        Array of the amounts of tokens to deposit
     */
    function batchDeposit(
        address[] calldata _tokens,
        uint256[] calldata _quantities
    )
        external
        nonReentrant
        whenOperational
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
     * Withdraw multiple tokens from the vault and deattribute from sender.
     * Quantities should be in the order of the addresses of the tokens being withdrawn.
     *
     * @param  _tokens            Array of the addresses of the tokens
     * @param  _quantities        Array of the amounts of tokens to withdraw
     */
    function batchWithdraw(
        address[] calldata _tokens,
        uint256[] calldata _quantities
    )
        external
        nonReentrant
    {
        // Call internal batch withdraw function
        batchWithdrawInternal(
            msg.sender,
            msg.sender,
            _tokens,
            _quantities
        );
    }

    /**
     * Transfer tokens associated with the sender's account in vault to another user's
     * account in vault.
     *
     * @param  _token           Address of token being transferred
     * @param  _to              Address of user receiving tokens
     * @param  _quantity        Amount of tokens being transferred
     */
    function internalTransfer(
        address _token,
        address _to,
        uint256 _quantity
    )
        external
        nonReentrant
        whenOperational
    {
        state.vaultInstance.transferBalance(
            _token,
            msg.sender,
            _to,
            _quantity
        );
    }

    /* ============ Internal Functions ============ */

    /**
     * Internal function that deposits multiple tokens to the vault.
     * Quantities should be in the order of the addresses of the tokens being deposited.
     *
     * @param  _from              Address to transfer tokens from
     * @param  _to                Address to credit for deposits
     * @param  _tokens            Array of the addresses of the tokens being deposited
     * @param  _quantities        Array of the amounts of tokens to deposit
     */
    function batchDepositInternal(
        address _from,
        address _to,
        address[] memory _tokens,
        uint256[] memory _quantities
    )
        internal
        whenOperational
    {
        // Confirm an empty _tokens or quantity array is not passed
        CommonValidationsLibrary.validateNonEmpty(_tokens);

        // Confirm there is one quantity for every token address
        CommonValidationsLibrary.validateEqualLength(_tokens, _quantities);

        state.transferProxyInstance.batchTransfer(
            _tokens,
            _quantities,
            _from,
            state.vault
        );

        state.vaultInstance.batchIncrementTokenOwner(
            _tokens,
            _to,
            _quantities
        );
    }

    /**
     * Internal function that withdraws multiple tokens from the vault.
     * Quantities should be in the order of the addresses of the tokens being withdrawn.
     *
     * @param  _from              Address to decredit for withdrawals
     * @param  _to                Address to transfer tokens to
     * @param  _tokens            Array of the addresses of the tokens being withdrawn
     * @param  _quantities        Array of the amounts of tokens to withdraw
     */
    function batchWithdrawInternal(
        address _from,
        address _to,
        address[] memory _tokens,
        uint256[] memory _quantities
    )
        internal
    {
        // Confirm an empty _tokens or quantity array is not passed
        CommonValidationsLibrary.validateNonEmpty(_tokens);

        // Confirm there is one quantity for every token address
        CommonValidationsLibrary.validateEqualLength(_tokens, _quantities);

        // Call Vault contract to deattribute withdrawn tokens from user
        state.vaultInstance.batchDecrementTokenOwner(
            _tokens,
            _from,
            _quantities
        );

        // Call Vault contract to withdraw tokens from Vault to user
        state.vaultInstance.batchWithdrawTo(
            _tokens,
            _to,
            _quantities
        );
    }
}
