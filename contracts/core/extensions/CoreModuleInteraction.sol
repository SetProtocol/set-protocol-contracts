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

import { CoreState } from "../lib/CoreState.sol";
import { ICoreAccounting } from "../interfaces/ICoreAccounting.sol";
import { ICoreIssuance } from "../interfaces/ICoreIssuance.sol";


/**
 * @title CoreModularInteraction
 * @author Set Protocol
 *
 * Extension used to expose internal accounting and issuance functions, vault, and proxy functions
 * to modules.
 */
contract CoreModuleInteraction is
    ICoreAccounting,
    ICoreIssuance,
    CoreState,
    ReentrancyGuard
{
    modifier onlyModule() {
        onlyModuleCallable();
        _;
    }

    function onlyModuleCallable() internal view {
        require(
            state.validModules[msg.sender],
            "OnlyModule"
        );
    }

    /**
     * Exposes internal function that deposits tokens to the vault, exposed to system
     * modules. Quantities should be in the order of the addresses of the tokens being
     * deposited.
     *
     * @param  _from              Address to transfer tokens from
     * @param  _to                Address to credit for deposits
     * @param  _token             Address of the token being deposited
     * @param  _quantity          Amount of tokens to deposit
     */
    function depositModule(
        address _from,
        address _to,
        address _token,
        uint256 _quantity
    )
        external
        onlyModule
    {
        address[] memory tokenArray = new address[](1);
        tokenArray[0] = _token;

        uint256[] memory quantityArray = new uint256[](1);
        quantityArray[0] = _quantity;

        batchDepositInternal(
            _from,
            _to,
            tokenArray,
            quantityArray
        );
    }

    /**
     * Exposes internal function that deposits multiple tokens to the vault, exposed to system
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
        address[] calldata _tokens,
        uint256[] calldata _quantities
    )
        external
        onlyModule
    {
        batchDepositInternal(
            _from,
            _to,
            _tokens,
            _quantities
        );
    }

    /**
     * Exposes internal function that withdraws multiple tokens to the vault, exposed to system
     * modules. Quantities should be in the order of the addresses of the tokens being
     * withdrawn.
     *
     * @param  _from              Address to decredit for withdrawals
     * @param  _to                Address to transfer tokens to
     * @param  _token             Address of the token being withdrawn
     * @param  _quantity          Amount of tokens to withdraw
     */
    function withdrawModule(
        address _from,
        address _to,
        address _token,
        uint256 _quantity
    )
        external
        onlyModule
    {        
        address[] memory tokenArray = new address[](1);
        tokenArray[0] = _token;

        uint256[] memory quantityArray = new uint256[](1);
        quantityArray[0] = _quantity;        

        batchWithdrawInternal(
            _from,
            _to,
            tokenArray,
            quantityArray
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
        address[] calldata _tokens,
        uint256[] calldata _quantities
    )
        external
        onlyModule
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
     * @param  _componentOwner  Address to use tokens from
     * @param  _setRecipient    Address to issue Set to
     * @param  _set          Address of the Set to issue
     * @param  _quantity     Number of tokens to issue
     */
    function issueModule(
        address _componentOwner,
        address _setRecipient,
        address _set,
        uint256 _quantity
    )
        external
        onlyModule
    {
        issueInternal(
            _componentOwner,
            _setRecipient,
            _set,
            _quantity
        );
    }

    /**
     * Converts recipient's components into Set Token's held directly in Vault
     *
     * @param _recipient    Address to issue to
     * @param _set          Address of the Set
     * @param _quantity     Number of tokens to redeem
     */
    function issueInVaultModule(
        address _recipient,
        address _set,
        uint256 _quantity
    )
        external
        onlyModule
    {
        issueInVaultInternal(
            _recipient,
            _set,
            _quantity
        );
    }

    /**
     * Expose internal function that exchanges Set tokens for components,
     * accepting any owner, to system modules
     *
     * @param  _burnAddress         Address to burn token from
     * @param  _incrementAddress    Address to increment component tokens to
     * @param  _set                 Address of the Set to redeem
     * @param  _quantity            Number of tokens to redeem
     */
    function redeemModule(
        address _burnAddress,
        address _incrementAddress,
        address _set,
        uint256 _quantity
    )
        external
        onlyModule
    {
        redeemInternal(
            _burnAddress,
            _incrementAddress,
            _set,
            _quantity
        );
    }

    /**
     * Expose vault function that increments user's balance in the vault.
     * Available to system modules
     *
     * @param  _tokens          The addresses of the ERC20 tokens
     * @param  _owner           The address of the token owner
     * @param  _quantities      The numbers of tokens to attribute to owner
     */
    function batchIncrementTokenOwnerModule(
        address[] calldata _tokens,
        address _owner,
        uint256[] calldata _quantities
    )
        external
        onlyModule
    {
        state.vaultInstance.batchIncrementTokenOwner(
            _tokens,
            _owner,
            _quantities
        );
    }

    /**
     * Expose vault function that decrement user's balance in the vault
     * Only available to system modules.
     *
     * @param  _tokens          The addresses of the ERC20 tokens
     * @param  _owner           The address of the token owner
     * @param  _quantities      The numbers of tokens to attribute to owner
     */
    function batchDecrementTokenOwnerModule(
        address[] calldata _tokens,
        address _owner,
        uint256[] calldata _quantities
    )
        external
        onlyModule
    {
        state.vaultInstance.batchDecrementTokenOwner(
            _tokens,
            _owner,
            _quantities
        );
    }

    /**
     * Expose vault function that transfer vault balances between users
     * Only available to system modules.
     *
     * @param  _tokens           Addresses of tokens being transferred
     * @param  _from             Address tokens being transferred from
     * @param  _to               Address tokens being transferred to
     * @param  _quantities       Amounts of tokens being transferred
     */
    function batchTransferBalanceModule(
        address[] calldata _tokens,
        address _from,
        address _to,
        uint256[] calldata _quantities
    )
        external
        onlyModule
    {
        state.vaultInstance.batchTransferBalance(
            _tokens,
            _from,
            _to,
            _quantities
        );
    }

    /**
     * Transfers token from one address to another using the transfer proxy.
     * Only available to system modules.
     *
     * @param  _token          The address of the ERC20 token
     * @param  _quantity       The number of tokens to transfer
     * @param  _from           The address to transfer from
     * @param  _to             The address to transfer to
     */
    function transferModule(
        address _token,
        uint256 _quantity,
        address _from,
        address _to
    )
        external
        onlyModule
    {
        state.transferProxyInstance.transfer(
            _token,
            _quantity,
            _from,
            _to
        );
    }

    /**
     * Expose transfer proxy function to transfer tokens from one address to another
     * Only available to system modules.
     *
     * @param  _tokens         The addresses of the ERC20 token
     * @param  _quantities     The numbers of tokens to transfer
     * @param  _from           The address to transfer from
     * @param  _to             The address to transfer to
     */
    function batchTransferModule(
        address[] calldata _tokens,
        uint256[] calldata _quantities,
        address _from,
        address _to
    )
        external
        onlyModule
    {
        state.transferProxyInstance.batchTransfer(
            _tokens,
            _quantities,
            _from,
            _to
        );
    }
}
