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
import { Authorizable } from "../lib/Authorizable.sol";
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
        external
        onlyAuthorized
    {
        // Retrieve current balance of token for the vault
        uint256 existingVaultBalance = ERC20Wrapper.balanceOf(
            _token,
            this
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
            this
        );
        // Check to make sure current balances are as expected
        require(newVaultBalance == existingVaultBalance.sub(_quantity));
    }

    /*
     * Increment quantity owned of a token for a given address. Can
     * only be called by authorized core contracts.
     *
     * @param  _owner           The address of the token owner
     * @param  _token           The address of the ERC20 token
     * @param  _quantity        The number of tokens to attribute to owner
     */
    function incrementTokenOwner(
        address _owner,
        address _token,
        uint256 _quantity
    )
        external
        onlyAuthorized
    {
        // Increment balances state variable adding _quantity to user's token amount
        balances[_token][_owner] = balances[_token][_owner].add(_quantity);
    }

    /*
     * Decrement quantity owned of a token for a given address. Can only
     * be called by authorized core contracts.
     *
     * @param  _owner           The address of the token owner
     * @param  _token           The address of the ERC20 token
     * @param  _quantity        The number of tokens to deattribute to owner
     */
    function decrementTokenOwner(
        address _owner,
        address _token,
        uint256 _quantity
    )
        external
        onlyAuthorized
    {
        // Require that user has enough unassociated tokens to withdraw tokens or issue Set
        require(balances[_token][_owner] >= _quantity);

        // Decrement balances state variable subtracting _quantity to user's token amount
        balances[_token][_owner] = balances[_token][_owner].sub(_quantity);
    }

    /**
     * Transfers tokens associated with one account to another account in the vault
     *
     * @param  _to             Address token being transferred to
     * @param  _from           Address token being transferred from
     * @param  _token          Address of token being transferred
     * @param  _quantity       Amount of tokens being transferred
     */

    function internalTransfer(
        address _to,
        address _from,
        address _token,
        uint256 _quantity
    )
        external
        onlyAuthorized
    {
        // Require that user has enough unassociated tokens to withdraw tokens or issue Set
        require(balances[_token][_from] >= _quantity);

        // Decrement balances state variable subtracting _quantity to user's token amount
        balances[_token][_from] = balances[_token][_from].sub(_quantity);

        // Increment balances state variable adding _quantity to user's token amount
        balances[_token][_to] = balances[_token][_to].add(_quantity);
    }

    /*
     * Get balance of particular contract for owner.
     *
     * @param  _owner           The address of the token owner
     * @param  _token           The address of the ERC20 token
     */
    function getOwnerBalance(
        address _owner,
        address _token
    )
        external
        view
        returns (uint256)
    {
        // Return owners token balance
        return balances[_token][_owner];
    }
}
