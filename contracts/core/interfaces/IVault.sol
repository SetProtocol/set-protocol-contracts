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

/**
 * @title IVault
 * @author Set Protocol
 *
 * The IVault interface provides a light-weight, structured way to interact with the Vault
 * contract from another contract.
 */
interface IVault {

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
        external;

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
        external;

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
        external;

    /**
     * Transfers tokens associated with one account to another account in the vault
     *
     * @param  _to             Address token being transferred to
     * @param  _from           Address token being transferred from
     * @param  _token          Address of token being transferred
     * @param  _quantity       Amount of tokens being transferred
     */

    function transferBalance(
        address _to,
        address _from,
        address _token,
        uint256 _quantity
    )
        external;

    /*
     * Get balance of particular contract for owner.
     *
     * @param  _owner    The address of the token owner
     * @param  _token    The address of the ERC20 token
     */
    function getOwnerBalance(
        address _owner,
        address _token
    )
        external
        returns (uint256);
}
