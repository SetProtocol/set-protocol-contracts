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
 * @title ICore
 * @author Set Protocol
 *
 * The ICore Contract defines all the functions exposed in the Core through its
 * various extensions and is a light weight way to interact with the contract.
 */
interface ICore {
    /*
     * Get natural unit of Set
     *
     * @return  uint256       Natural unit of Set
     */
    function validSets(address)
        external
        view
        returns (bool);

    /**
     * Set vaultAddress. Can only be set by owner of Core.
     *
     * @param  _vault   The address of the Vault
     */
    function setVaultAddress(
        address _vault
    )
        external;

    /**
     * Set transferProxyAddress. Can only be set by owner of Core.
     *
     * @param  _transferProxy   The address of the TransferProxy
     */
    function setTransferProxyAddress(
        address _transferProxy
    )
        external;

    /**
     * Add a factory to the mapping of tracked factories.
     *
     * @param  _factory   The address of the SetTokenFactory to enable
     */
    function enableFactory(
        address _factory
    )
        external;

    /**
     * Disable a factory in the mapping of tracked factories.
     *
     * @param  _factory   The address of the SetTokenFactory to disable
     */
    function disableFactory(
        address _factory
    )
        external;

    /**
     * Disable a set token in the mapping of tracked set tokens.
     *
     * @param  _set   The address of the SetToken to remove
     */
    function disableSet(
        address _set
    )
        external;

    /**
     * Exchanges components for Set Tokens
     *
     * @param  _set          Address of set to issue
     * @param  _quantity     Quantity of set to issue
     */
    function issue(
        address _set,
        uint256 _quantity
    )
        external;

    /**
     * Function to convert Set Tokens into underlying components
     *
     * @param _set          The address of the Set token
     * @param _quantity     The number of tokens to redeem. Should be multiple of natural unit.
     */
    function redeem(
        address _set,
        uint256 _quantity
    )
        external;

    /**
     * Function to convert Set Tokens held in vault into underlying components
     *
     * @param _set          The address of the Set token
     * @param _quantity     The number of tokens to redeem. Should be multiple of natural unit.
     */
    function redeemInVault(
        address _set,
        uint256 _quantity
    )
        external;

    /**
     * Deposit multiple tokens to the vault. Quantities should be in the
     * order of the addresses of the tokens being deposited.
     *
     * @param  _tokens           Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to deposit
     */
    function batchDeposit(
        address[] _tokens,
        uint256[] _quantities
    )
        external;

    /**
     * Withdraw multiple tokens from the vault. Quantities should be in the
     * order of the addresses of the tokens being withdrawn.
     *
     * @param  _tokens            Array of the addresses of the ERC20 tokens
     * @param  _quantities        Array of the number of tokens to withdraw
     */
    function batchWithdraw(
        address[] _tokens,
        uint256[] _quantities
    )
        external;

    /**
     * Deposit any quantity of tokens into the vault.
     *
     * @param  _token           The address of the ERC20 token
     * @param  _quantity        The number of tokens to deposit
     */
    function deposit(
        address _token,
        uint256 _quantity
    )
        external;

    /**
     * Withdraw a quantity of tokens from the vault.
     *
     * @param  _token           The address of the ERC20 token
     * @param  _quantity        The number of tokens to withdraw
     */
    function withdraw(
        address _token,
        uint256 _quantity
    )
        public;

    /**
     * Deploys a new Set Token and adds it to the valid list of SetTokens
     *
     * @param  _factory              The address of the Factory to create from
     * @param  _components           The address of component tokens
     * @param  _units                The units of each component token
     * @param  _naturalUnit          The minimum unit to be issued or redeemed
     * @param  _name                 The bytes32 encoded name of the new Set
     * @param  _symbol               The bytes32 encoded symbol of the new Set
     * @param  _callData             Byte string containing additional call parameters
     * @return setTokenAddress       The address of the new Set
     */
    function create(
        address _factory,
        address[] _components,
        uint256[] _units,
        uint256 _naturalUnit,
        string _name,
        string _symbol,
        bytes _callData
    )
        external
        returns(address);

    /**
     * Fill an issuance order
     *
     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]
     * @param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]
     * @param  _requiredComponents        Components required for the issuance order
     * @param  _requiredComponentAmounts  Component amounts required for the issuance order
     * @param  _fillQuantity              Quantity of set to be filled
     * @param  _v                         v element of ECDSA signature
     * @param  sigBytes                   Array with r and s segments of ECDSA signature
     * @param _orderData                  Bytes array containing the exchange orders to execute
     */
    function fillOrder(
        address[5] _addresses,
        uint[5] _values,
        address[] _requiredComponents,
        uint[] _requiredComponentAmounts,
        uint _fillQuantity,
        uint8 _v,
        bytes32[] sigBytes,
        bytes _orderData
    )
        external;

    /**
     * Cancel an issuance order
     *
     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]
     * @param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]
     * @param  _requiredComponents        Components required for the issuance order
     * @param  _requiredComponentAmounts  Component amounts required for the issuance order
     * @param  _cancelQuantity            Quantity of set to be canceled
     */
    function cancelOrder(
        address[5] _addresses,
        uint[5] _values,
        address[] _requiredComponents,
        uint[] _requiredComponentAmounts,
        uint _cancelQuantity
    )
        external;
}
