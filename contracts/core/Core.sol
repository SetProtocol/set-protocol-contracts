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


import { Ownable } from "zeppelin-solidity/contracts/ownership/Ownable.sol";
import { TransferProxy } from "./TransferProxy.sol";
import { Vault } from "./Vault.sol";


/**
 * @title Core
 * @author Set Protocol
 *
 * The Core contract acts as a coordinator handling issuing, redeeming, and
 * creating Sets, as well as all collateral flows throughout the system.
 */

contract Core is
    Ownable
{
    /*
     * Constants
     */
    
    string constant ADDRESSES_MISSING = "Addresses must not be empty.";
    string constant QUANTITES_MISSING = "Quantities must not be empty.";
    string constant BATCH_INPUT_MISMATCH = "Addresses and quantities must be the same length.";

    /* ============ State Variables ============ */

    // Address of the TransferProxy contract
    address public transferProxyAddress;

    // Address of the Vault contract
    address public vaultAddress;

    /*
     * Modifiers
     */

    modifier isValidBatchTransaction(address[] _tokenAddresses, uint[] _quantities) {
        require(
            _tokenAddresses.length > 0,
            ADDRESSES_MISSING
        );
        require(
            _quantities.length > 0,
            QUANTITES_MISSING
        );
        require(
            _tokenAddresses.length == _quantities.length,
            BATCH_INPUT_MISMATCH
        );
        _;
    }


    /* ============ No Constructor ============ */

    /* ============ Setter Functions ============ */

    /**
     * Set vaultAddress. Can only be set by owner of Core.
     *
     * @param  _vaultAddress   The address of the Vault
     */

    function setVaultAddress(
        address _vaultAddress
    )
        external
        onlyOwner
    {
        vaultAddress = _vaultAddress;
    }

    /**
     * Set transferProxyAddress. Can only be set by owner of Core.
     *
     * @param  _transferProxyAddress   The address of the TransferProxy
     */

    function setTransferProxyAddress(
        address _transferProxyAddress
    )
        external
        onlyOwner
    {
        transferProxyAddress = _transferProxyAddress;
    }

    /* ============ Public Functions ============ */

    /**
     * Deposit multiple tokens to the vault. Quantities should be in the
     * order of the addresses of the tokens being deposited.
     *
     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to transfer
     */
    function batchDeposit(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        public
        isValidBatchTransaction(_tokenAddresses, _quantities)
    {
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            deposit(
                _tokenAddresses[i],
                _quantities[i]
            );
        }
    }

    /**
     * Withdraw multiple tokens from the vault. Quantities should be in the
     * order of the addresses of the tokens being withdrawn.
     *
     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens
     * @param  _quantities        Array of the number of tokens to transfer
     */
    function batchWithdraw(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        public
        isValidBatchTransaction(_tokenAddresses, _quantities)
    {
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            withdraw(
                _tokenAddresses[i],
                _quantities[i]
            );
        }
    }

    /**
     * Deposit any quantity of tokens into the vault.
     *
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to transfer
     */
    function deposit(
        address _tokenAddress,
        uint _quantity
    )
        public
    {
        TransferProxy(transferProxyAddress).transferToVault(
            msg.sender,
            _tokenAddress,
            _quantity
        );

        Vault(vaultAddress).incrementTokenOwner(
            msg.sender,
            _tokenAddress,
            _quantity
        );
    }

    /**
     * Withdraw a quantity of tokens from the vault.
     *
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to transfer
     */
    function withdraw(
        address _tokenAddress,
        uint _quantity
    )
        public
    {
        Vault(vaultAddress).decrementTokenOwner(
            msg.sender,
            _tokenAddress,
            _quantity
        );

        Vault(vaultAddress).withdrawTo(
            _tokenAddress,
            msg.sender,
            _quantity
        );
    }
}
