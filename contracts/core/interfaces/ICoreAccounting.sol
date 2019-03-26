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


/**
 * @title ICoreAccounting
 * @author Set Protocol
 *
 * The ICoreAccounting Contract defines all the functions exposed in the CoreIssuance
 * extension.
 */
contract ICoreAccounting {

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
        uint[] memory _quantities
    )
        internal;

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
        internal;
}
