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


/**
 * @title ICore
 * @author Set Protocol
 *
 * The ICore Contract defines all the functions exposed in the Core through its
 * various extensions and is a light weight way to interact with the contract.
 */
interface ICore {
    /**
     * Return transferProxy address.
     *
     * @return address       transferProxy address
     */
    function transferProxy()
        public
        view
        returns(address);

    /**
     * Return vault address.
     *
     * @return address       vault address
     */
    function vault()
        public
        view
        returns(address);

    /**
     * Return address belonging to given exchangeId.
     *
     * @param  _exchangeId       ExchangeId number
     * @return address           Address belonging to given exchangeId
     */
    function exchanges(
        uint8 _exchangeId
    )
        public
        view
        returns(address);

    /**
     * Get protocol address
     *
     * @return address        protocol address
     */
    function protocolAddress()
        public
        view
        returns(address);

    /**
     * Return current protocol fee in basis points
     *
     * @return uint256   Protocol fee in basis points of the manager's rebalancing fees
     */
    function protocolFee()
        public
        view
        returns(uint256);

    /*
     * Returns if valid set
     *
     * @return  bool      Returns true if Set created through Core and isn't disabled
     */
    function validSets(address)
        external
        view
        returns (bool);

    /*
     * Returns if valid module
     *
     * @return  bool      Returns true if valid module
     */
    function validModules(address)
        external
        view
        returns (bool);

    /**
     * Return boolean indicating if address is a valid Rebalancing Price Library.
     *
     * @param  _priceLibrary    Price library address
     * @return bool             Boolean indicating if valid Price Library
     */
    function validPriceLibraries(
        address _priceLibrary
    )
        public
        view
        returns(bool);

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
     * Add or remove a factory to the mapping of tracked factories. Can only be set by
     * owner of Core
     *
     * @param  _factory   Address of the contract conforming to ISetFactory
     * @param  _enabled   Enable or disable the factory
     */
    function registerFactory(
        address _factory,
        bool _enabled
    )
        external;

    /**
     * Add or remove a Set to the mapping and array of tracked Sets. Can
     * only be called by owner of Core.
     *
     * @param  _set       The address of the Set
     * @param  _enabled   Enable or disable the Set
     */
    function registerSet(
        address _set,
        bool _enabled
    )
        external;

    /**
     * Adds or removes a price library to the mapping of tracked price libraries. Can only be set by
     * owner of Core
     *
     * @param  _priceLibrary   Address of contract Price Library to enable or disable
     * @param  _enabled        Whether the pricing library is enabled for use in proposal cycle
     */
    function registerPriceLibrary(
        address _priceLibrary,
        bool _enabled
    )
        external;

    /**
     * Return signatureValidator address
     *
     * @return address        signatureValidator address
     */
    function signatureValidator()
        public
        view
        returns(address);

    /**
     * Change address of the Signature Validator contract
     *
     * @param  _signatureValidator   Address of the Signature Validator library
     */
    function setSignatureValidator(
        address _signatureValidator
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
        external;

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
        external;

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
        external;

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
        external;

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
        external;
}
