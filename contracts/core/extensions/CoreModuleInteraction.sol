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

pragma solidity 0.4.25;

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { ICoreAccounting } from "../interfaces/ICoreAccounting.sol";
import { ICoreIssuance } from "../interfaces/ICoreIssuance.sol";

/**
 * @title CoreModularInteraction
 * @author Set Protocol
 *
 * Extension used to expose internal accounting functions to module
 */


contract CoreModuleInteraction is
    ICoreAccounting,
    ICoreIssuance,
    ReentrancyGuard
{
    /**
     * Exposes internal function that deposits a quantity of tokens to the vault and attributes
     * the tokens respectively, to system modules.
     *
     * @param  _token           Address of token being deposited
     * @param  _from            Address to transfer tokens from
     * @param  _to              Address to credit for deposit
     * @param  _quantity        Amount of tokens to deposit
     */
    function depositModule(
        address _token,
        address _from,
        address _to,
        uint256 _quantity
    )
        external
    {
        depositInternal(
            _token,
            _from,
            _to,
            _quantity
        );
    }

    /**
     * Exposes internal function that withdraws a quantity of tokens from the vault and
     * deattributes the tokens respectively, to system modules.
     *
     * @param  _token           Address of token being withdrawn
     * @param  _from            Address to decredit for withdraw
     * @param  _to              Address to transfer tokens to
     * @param  _quantity        Amount of tokens to withdraw
     */
    function withdrawModule(
        address _token,
        address _from,
        address _to,
        uint256 _quantity
    )
        external
    {
        withdrawInternal(
            _token,
            _from,
            _to,
            _quantity
        );
    }

    /**
     * Exposes internal function that deposits multiple tokens to the vault, to system
     * modules. Quantities should be in the order of the addresses of the tokens being
     * deposited.
     *
     * @param  _from              Address to transfer tokens from
     * @param  _to                Address to credit for deposits
     * @param  _tokens            Array of the addresses of the tokens being deposited
     * @param  _quantities        Array of the amounts of tokens to deposit
     */
    function batchDepositModule(
        address _from,
        address _to,
        address[] _tokens,
        uint256[] _quantities
    )
        external
    {
        batchDepositInternal(
            _from,
            _to,
            _tokens,
            _quantities
        );
    }

    /**
     * Exposes internal function that withdraws multiple tokens from the vault, to system
     * modules. Quantities should be in the order of the addresses of the tokens being withdrawn.
     *
     * @param  _from              Address to decredit for withdrawals
     * @param  _to                Address to transfer tokens to
     * @param  _tokens            Array of the addresses of the tokens being withdrawn
     * @param  _quantities        Array of the amounts of tokens to withdraw
     */
    function batchWithdrawModule(
        address _from,
        address _to,
        address[] _tokens,
        uint256[] _quantities
    )
        external
    {
        batchWithdrawInternal(
            _from,
            _to,
            _tokens,
            _quantities
        );
    }

    /**
     * Expose internal function that exchanges components for Set tokens,
     * accepting any owner, to system modules
     *
     * @param  _owner        Address to issue tokens to
     * @param  _set          Address of the Set to issue
     * @param  _quantity     Number of tokens to issue
     */
    function issueModule(
        address _owner,
        address _set,
        uint256 _quantity
    )
        external
    {
        issueInternal(
            _owner,
            _set,
            _quantity
        );
    }
}