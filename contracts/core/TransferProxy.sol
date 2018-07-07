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
 * @title TransferProxy
 * @author Set Protocol
 *
 * The proxy contract is responsible for updating token balances to assist with issuance
 * and filling issuance orders.
 */

contract TransferProxy is
    Authorizable
{
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ No Constructor ============ */

    /* ============ External Functions ============ */

    /**
     * Transfers tokens from an address (that has set allowance on the proxy).
     * Can only be called by authorized core contracts.
     *
     * @param  _tokenAddress   The address of the ERC20 token
     * @param  _quantity       The number of tokens to transfer
     * @param  _from           The address to transfer from
     * @param  _to             The address to transfer to
     */
    function transfer(
        address _tokenAddress,
        uint _quantity,
        address _from,
        address _to
    )
        external
        onlyAuthorized
    {
        // Retrieve current balance of token for the receiver
        uint existingBalance = ERC20Wrapper.balanceOf(
            _tokenAddress,
            _to
        );

        // Call specified ERC20 contract to transfer tokens (via proxy).
        ERC20Wrapper.transferFrom(
            _tokenAddress,
            _from,
            _to,
            _quantity
        );

        // Get new balance of transferred token for receiver
        uint newBalance = ERC20Wrapper.balanceOf(
            _tokenAddress,
            _to
        );

        // Verify transfer quantity is reflected in balance
        require(newBalance == existingBalance.add(_quantity));
    }
}
