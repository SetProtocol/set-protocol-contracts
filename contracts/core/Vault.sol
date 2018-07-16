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


import { Authorizable } from "../lib/Authorizable.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
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

    /* ============ Constants ============ */

    // Error messages
    string constant INSUFFICIENT_BALANCE = "User does not have sufficient balance.";

    /* ============ State Variables ============ */

    // Mapping of token address to map of owner address to balance.
    mapping (address => mapping (address => uint256)) public balances;


    /* ============ Modifiers ============ */

    // Checks to make sure a valid account to withdrawTo is given.
    modifier isValidDestination(address _to) {
        // Confirm address is not null
        require(_to != address(0));
        // Confirm address is not Vault address
        require(_to != address(this));
        _;
    }

    /*
     * Checks to make sure a positive quantity of tokens is being withdrawn
     * or decremented/incremented
     */
    modifier isNonZero(uint _quantity) {
        // Confirm quantity is greater than zero
        require(_quantity > 0);
        _;
    }

    /* ============ No Constructor ============ */

    /* ============ Public Functions ============ */

    /*
     * Withdraws user's unassociated tokens to user account. Can only be
     * called by authorized core contracts.
     *
     * @param  _tokenAddress   The address of the ERC20 token
     * @param  _to             The address to transfer token to
     * @param  _quantity       The number of tokens to transfer
     */
    function withdrawTo(
        address _tokenAddress,
        address _to,
        uint _quantity
    )
        external
        onlyAuthorized
        isNonZero(_quantity)
        isValidDestination(_to)
    {
        // Retrieve current balance of token for the vault
        uint existingVaultBalance = ERC20Wrapper.balanceOf(
            _tokenAddress,
            this
        );

        // Call specified ERC20 token contract to transfer tokens from Vault to user
        ERC20Wrapper.transfer(
            _tokenAddress,
            _to,
            _quantity
        );

        // Verify transfer quantity is reflected in balance
        uint newVaultBalance = ERC20Wrapper.balanceOf(
            _tokenAddress,
            this
        );
        require(newVaultBalance == existingVaultBalance.sub(_quantity));
    }

    /*
     * Increment quantity owned of a token for a given address. Can
     * only be called by authorized core contracts.
     *
     * @param  _owner           The address of the token owner
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to attribute to owner
     */
    function incrementTokenOwner(
        address _owner,
        address _tokenAddress,
        uint _quantity
    )
        external
        onlyAuthorized
    {
        // Increment balances state variable adding _quantity to user's token amount
        balances[_tokenAddress][_owner] = balances[_tokenAddress][_owner].add(_quantity);
    }

    /*
     * Decrement quantity owned of a token for a given address. Can only
     * be called by authorized core contracts.
     *
     * @param  _owner           The address of the token owner
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to deattribute to owner
     */
    function decrementTokenOwner(
        address _owner,
        address _tokenAddress,
        uint _quantity
    )
        external
        onlyAuthorized
        isNonZero(_quantity)
    {
        // Require that user has enough unassociated tokens to withdraw tokens or issue Set
        require(
            balances[_tokenAddress][_owner] >= _quantity,
            INSUFFICIENT_BALANCE
        );

        // Decrement balances state variable subtracting _quantity to user's token amount
        balances[_tokenAddress][_owner] = balances[_tokenAddress][_owner].sub(_quantity);
    }

    /* ============ Getter Functions ============ */

    /*
     * Get balance of particular contract for owner.
     *
     * @param  _owner           The address of the token owner
     * @param  _tokenAddress    The address of the ERC20 token
     */
    function getOwnerBalance(
        address _owner,
        address _tokenAddress
    )
        external
        view
        returns (uint256)
    {
        // Return owners token balance
        return balances[_tokenAddress][_owner];
    }
}
