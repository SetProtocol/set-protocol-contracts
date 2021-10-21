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


import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { Authorizable } from "set-protocol-contract-utils/contracts/lib/Authorizable.sol";

import { ERC20Wrapper } from "../lib/ERC20Wrapper.sol";


/**
 * @title Vault
 * @author Set Protocol
 *
 * The vault contract is responsible for holding all funds and keeping track of the
 * fund state and which Sets own which funds.
 *
 */

contract Vault is
    Authorizable
{
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Mapping of token address to map of owner or Set address to balance.
    // Example of mapping below:
    // +--------------+---------------------+--------+
    // | TokenAddress | Set OR User Address | Amount |
    // +--------------+---------------------+--------+
    // | TokenA       | User 0x123          |    500 |
    // |              | User 0xABC          |    300 |
    // |              | Set  0x456          |   1000 |
    // | TokenB       | User 0xDEF          |    100 |
    // |              | Set  0xSET          |    700 |
    // +--------------+---------------------+--------+
    mapping (address => mapping (address => uint256)) public balances;

    /* ============ External Functions ============ */

    /*
     * Withdraws user's unassociated tokens to user account. Can only be
     * called by authorized core contracts.
     *
     * @param  _token          The address of the ERC20 token
     * @param  _to             The address to transfer token to
     * @param  _quantity       The number of tokens to transfer
     */
    function withdrawTo(
        address _token,
        address _to,
        uint256 _quantity
    )
        public
        onlyAuthorized
    {
        if (_quantity > 0) {
            // Retrieve current balance of token for the vault
            uint256 existingVaultBalance = ERC20Wrapper.balanceOf(
                _token,
                address(this)
            );

            // Call specified ERC20 token contract to transfer tokens from Vault to user
            ERC20Wrapper.transfer(
                _token,
                _to,
                _quantity
            );

            // Verify transfer quantity is reflected in balance
            uint256 newVaultBalance = ERC20Wrapper.balanceOf(
                _token,
                address(this)
            );
            // Check to make sure current balances are as expected
            require(
                newVaultBalance == existingVaultBalance.sub(_quantity),
                "Vault.withdrawTo: Invalid post withdraw balance"
            );            
        }
    }

    /*
     * Increment quantity owned of a token for a given address. Can
     * only be called by authorized core contracts.
     *
     * @param  _token           The address of the ERC20 token
     * @param  _owner           The address of the token owner
     * @param  _quantity        The number of tokens to attribute to owner
     */
    function incrementTokenOwner(
        address _token,
        address _owner,
        uint256 _quantity
    )
        public
        onlyAuthorized
    {
        if (_quantity > 0) {
            // Increment balances state variable adding _quantity to user's token amount
            balances[_token][_owner] = balances[_token][_owner].add(_quantity);    
        }
    }

    /*
     * Decrement quantity owned of a token for a given address. Can only
     * be called by authorized core contracts.
     *
     * @param  _token           The address of the ERC20 token
     * @param  _owner           The address of the token owner
     * @param  _quantity        The number of tokens to distribute to owner
     */
    function decrementTokenOwner(
        address _token,
        address _owner,
        uint256 _quantity
    )
        public
        onlyAuthorized
    {
        // Require that user has enough unassociated tokens to withdraw tokens or issue Set
        require(
            balances[_token][_owner] >= _quantity,
            "Vault.decrementTokenOwner: Insufficient token balance"
        );

        if (_quantity > 0) {
            // Decrement balances state variable subtracting _quantity to user's token amount
            balances[_token][_owner] = balances[_token][_owner].sub(_quantity);    
        }
    }

    /**
     * Transfers tokens associated with one account to another account in the vault
     *
     * @param  _token          Address of token being transferred
     * @param  _from           Address token being transferred from
     * @param  _to             Address token being transferred to
     * @param  _quantity       Amount of tokens being transferred
     */

    function transferBalance(
        address _token,
        address _from,
        address _to,
        uint256 _quantity
    )
        public
        onlyAuthorized
    {
        if (_quantity > 0) {
            // Require that user has enough unassociated tokens to withdraw tokens or issue Set
            require(
                balances[_token][_from] >= _quantity,
                "Vault.transferBalance: Insufficient token balance"
            );

            // Decrement balances state variable subtracting _quantity to user's token amount
            balances[_token][_from] = balances[_token][_from].sub(_quantity);

            // Increment balances state variable adding _quantity to user's token amount
            balances[_token][_to] = balances[_token][_to].add(_quantity);            
        }
    }

    /*
     * Withdraws user's unassociated tokens to user account. Can only be
     * called by authorized core contracts.
     *
     * @param  _tokens          The addresses of the ERC20 tokens
     * @param  _to              The address of the recipient
     * @param  _quantities      The numbers of tokens to attribute to owner
     */
    function batchWithdrawTo(
        address[] calldata _tokens,
        address _to,
        uint256[] calldata _quantities
    )
        external
        onlyAuthorized
    {
        // Storing token count to local variable to save on invocation
        uint256 tokenCount = _tokens.length;

        // Confirm and empty _tokens array is not passed
        require(
            tokenCount > 0,
            "Vault.batchWithdrawTo: Tokens must not be empty"
        );

        // Confirm there is one quantity for every token address
        require(
            tokenCount == _quantities.length,
            "Vault.batchWithdrawTo: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            withdrawTo(
                _tokens[i],
                _to,
                _quantities[i]
            );
        }
    }

    /*
     * Increment quantites owned of a collection of tokens for a given address. Can
     * only be called by authorized core contracts.
     *
     * @param  _tokens          The addresses of the ERC20 tokens
     * @param  _owner           The address of the token owner
     * @param  _quantities      The numbers of tokens to attribute to owner
     */
    function batchIncrementTokenOwner(
        address[] calldata _tokens,
        address _owner,
        uint256[] calldata _quantities
    )
        external
        onlyAuthorized
    {
        // Storing token count to local variable to save on invocation
        uint256 tokenCount = _tokens.length;

        // Confirm and empty _tokens array is not passed
        require(
            tokenCount > 0,
            "Vault.batchIncrementTokenOwner: Tokens must not be empty"
        );

        // Confirm there is one quantity for every token address
        require(
            tokenCount == _quantities.length,
            "Vault.batchIncrementTokenOwner: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            incrementTokenOwner(
                _tokens[i],
                _owner,
                _quantities[i]
            );
        }
    }

    /*
     * Decrements quantites owned of a collection of tokens for a given address. Can
     * only be called by authorized core contracts.
     *
     * @param  _tokens          The addresses of the ERC20 tokens
     * @param  _owner           The address of the token owner
     * @param  _quantities      The numbers of tokens to attribute to owner
     */
    function batchDecrementTokenOwner(
        address[] calldata _tokens,
        address _owner,
        uint256[] calldata _quantities
    )
        external
        onlyAuthorized
    {
        // Storing token count to local variable to save on invocation
        uint256 tokenCount = _tokens.length;

        // Confirm and empty _tokens array is not passed
        require(
            tokenCount > 0,
            "Vault.batchDecrementTokenOwner: Tokens must not be empty"
        );

        // Confirm there is one quantity for every token address
        require(
            tokenCount == _quantities.length,
            "Vault.batchDecrementTokenOwner: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            decrementTokenOwner(
                _tokens[i],
                _owner,
                _quantities[i]
            );
        }
    }

    /**
     * Transfers tokens associated with one account to another account in the vault
     *
     * @param  _tokens           Addresses of tokens being transferred
     * @param  _from             Address tokens being transferred from
     * @param  _to               Address tokens being transferred to
     * @param  _quantities       Amounts of tokens being transferred
     */
    function batchTransferBalance(
        address[] calldata _tokens,
        address _from,
        address _to,
        uint256[] calldata _quantities
    )
        external
        onlyAuthorized
    {
        // Storing token count to local variable to save on invocation
        uint256 tokenCount = _tokens.length;

        // Confirm and empty _tokens array is not passed
        require(
            tokenCount > 0,
            "Vault.batchTransferBalance: Tokens must not be empty"
        );

        // Confirm there is one quantity for every token address
        require(
            tokenCount == _quantities.length,
            "Vault.batchTransferBalance: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            transferBalance(
                _tokens[i],
                _from,
                _to,
                _quantities[i]
            );
        }
    }

    /*
     * Get balance of particular contract for owner.
     *
     * @param  _token           The address of the ERC20 token
     * @param  _owner           The address of the token owner
     */
    function getOwnerBalance(
        address _token,
        address _owner
    )
        external
        view
        returns (uint256)
    {
        // Return owners token balance
        return balances[_token][_owner];
    }
}
