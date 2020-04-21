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
 * @title TransferProxy
 * @author Set Protocol
 *
 * The transferProxy contract is responsible for moving tokens through the system to
 * assist with issuance and usage from modules.
 */

contract TransferProxy is
    Authorizable
{
    using SafeMath for uint256;

    /* ============ External Functions ============ */

    /**
     * Transfers tokens from an address (that has set allowance on the proxy).
     * Can only be called by Core.
     *
     * @param  _token          The address of the ERC20 token
     * @param  _quantity       The number of tokens to transfer
     * @param  _from           The address to transfer from
     * @param  _to             The address to transfer to
     */
    function transfer(
        address _token,
        uint256 _quantity,
        address _from,
        address _to
    )
        public
        onlyAuthorized
    {
        // Call specified ERC20 contract to transfer tokens (via proxy).
        if (_quantity > 0) {
            // Retrieve current balance of token for the receiver
            uint256 existingBalance = ERC20Wrapper.balanceOf(
                _token,
                _to
            );

            ERC20Wrapper.transferFrom(
                _token,
                _from,
                _to,
                _quantity
            );

            // Get new balance of transferred token for receiver
            uint256 newBalance = ERC20Wrapper.balanceOf(
                _token,
                _to
            );

            // Verify transfer quantity is reflected in balance
            require(
                newBalance == existingBalance.add(_quantity),
                "TransferProxy.transfer: Invalid post transfer balance"
            );
        }
    }

    /**
     * Transfers tokens from an address (that has set allowance on the proxy).
     * Can only be called by Core.
     *
     * @param  _tokens         The addresses of the ERC20 token
     * @param  _quantities     The numbers of tokens to transfer
     * @param  _from           The address to transfer from
     * @param  _to             The address to transfer to
     */
    function batchTransfer(
        address[] calldata _tokens,
        uint256[] calldata _quantities,
        address _from,
        address _to
    )
        external
        onlyAuthorized
    {
        // Storing token count to local variable to save on invocation
        uint256 tokenCount = _tokens.length;

        // Confirm and empty _tokens array is not passed
        require(
            tokenCount > 0,
            "TransferProxy.batchTransfer: Tokens must not be empty"
        );

        // Confirm there is one quantity for every token address
        require(
            tokenCount == _quantities.length,
            "TransferProxy.batchTransfer: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            if (_quantities[i] > 0) {
                transfer(
                    _tokens[i],
                    _quantities[i],
                    _from,
                    _to
                );
            }
        }
    }

}
