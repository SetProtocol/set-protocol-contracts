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
pragma experimental "ABIEncoderV2";


import { Authorizable } from "../lib/Authorizable.sol";
import { ERC20 } from "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";


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
    using SafeMath for uint256;

    /* ============ Constants ============ */

    string constant INSUFFICIENT_BALANCE = "User does not have sufficient balance.";

    /* ============ State Variables ============ */

    // Mapping of token address to map of owner address to balance.
    mapping (address => mapping (address => uint256)) public balances;

    
    /* ============ Modifiers ============ */

    modifier isValidDestination(address _to) {
        require(_to != address(0));
        require(_to != address(this));
        _;
    }

    modifier isNonZero(uint _quantity) {
        require(_quantity > 0);
        _;
    }

    /* ============ No Constructor ============ */

    /* ============ Public Functions ============ */

    /*
     * Withdraws a contract to an address. Can only be called by
     * authorized core contracts.
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
        ERC20(_tokenAddress).transfer(
            _to,
            _quantity
        );
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
        isNonZero(_quantity)
    {
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
        require(
            balances[_tokenAddress][_owner] >= _quantity,
            INSUFFICIENT_BALANCE
        );

        balances[_tokenAddress][_owner] = balances[_tokenAddress][_owner].sub(_quantity);
    }

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
        return balances[_tokenAddress][_owner];
    }
}
