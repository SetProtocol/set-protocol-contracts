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


import { Ownable } from "zeppelin-solidity/contracts/ownership/Ownable.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { ISetFactory } from "./interfaces/ISetFactory.sol";
import { ISetToken } from "./interfaces/ISetToken.sol";
import { ITransferProxy } from "./interfaces/ITransferProxy.sol";
import { IVault } from "./interfaces/IVault.sol";

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
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ Constants ============ */

    string constant ADDRESSES_MISSING = "Addresses must not be empty.";
    string constant BATCH_INPUT_MISMATCH = "Addresses and quantities must be the same length.";
    string constant INVALID_FACTORY = "Factory is disabled or does not exist.";
    string constant INVALID_QUANTITY = "Quantity must be multiple of the natural unit of the set.";
    string constant INVALID_SET = "Set token is disabled or does not exist.";
    string constant QUANTITES_MISSING = "Quantities must not be empty.";
    string constant ZERO_QUANTITY = "Quantity must be greater than zero.";

    /* ============ State Variables ============ */

    // Address of the TransferProxy contract
    address public transferProxyAddress;

    // Address of the Vault contract
    address public vaultAddress;

    // Mapping of tracked SetToken factories
    mapping(address => bool) public validFactories;

    // Mapping of tracked SetTokens
    mapping(address => bool) public validSets;

    /* ============ Events ============ */

    event LogCreate(
        address indexed _setTokenAddress,
        address _factoryAddress,
        address[] _components,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    );

    /* ============ Modifiers ============ */

    // Validate quantity is multiple of natural unit
    modifier isNaturalUnitMultiple(uint _quantity, address _setToken) {
        require(
            _quantity % ISetToken(_setToken).naturalUnit() == 0,
            INVALID_QUANTITY
        );
        _;
    }

    modifier isNonZero(uint _quantity) {
        require(
            _quantity > 0,
            ZERO_QUANTITY
        );
        _;
    }

    modifier isValidFactory(address _factoryAddress) {
        require(
            validFactories[_factoryAddress],
            INVALID_FACTORY
        );
        _;
    }

    // Verify set was created by core and is enabled
    modifier isValidSet(address _setAddress) {
        require(
            validSets[_setAddress],
            INVALID_SET
        );
        _;
    }

    // Confirm that all inputs are valid for batch transactions
    modifier isValidBatchTransaction(address[] _tokenAddresses, uint[] _quantities) {
        // Confirm an empty _addresses array is not passed
        require(
            _tokenAddresses.length > 0,
            ADDRESSES_MISSING
        );

        // Confirm an empty _quantities array is not passed
        require(
            _quantities.length > 0,
            QUANTITES_MISSING
        );

        // Confirm there is one quantity for every token address
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
        // Commit passed address to vaultAddress state variable
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
        // Commit passed address to transferProxyAddress state variable
        transferProxyAddress = _transferProxyAddress;
    }

    /**
     * Add a factory to the mapping of tracked factories.
     *
     * @param  _factoryAddress   The address of the SetTokenFactory to add
     */
    function addFactory(
        address _factoryAddress
    )
        external
        onlyOwner
    {
        validFactories[_factoryAddress] = true;
    }

    /**
     * Remove a factory to the mapping of tracked factories.
     *
     * @param  _factoryAddress   The address of the SetTokenFactory to remove
     */
    function removeFactory(
        address _factoryAddress
    )
        external
        onlyOwner
    {
        validFactories[_factoryAddress] = false;
    }

    /* ============ Public Functions ============ */

    /**
     * Issue
     *
     * @param  _setAddress    Address of set to issue
     * @param  _quantity      Quantity of set to issue
     */
    function issue(
        address _setAddress,
        uint _quantity
    )
        public
        isValidSet(_setAddress)
        isNaturalUnitMultiple(_quantity, _setAddress)
    {
        // Fetch set token components
        address[] memory components = ISetToken(_setAddress).getComponents();
        // Fetch set token component units
        uint[] memory units = ISetToken(_setAddress).getUnits();

        // Inspect vault for required component quantity
        for (uint16 i = 0; i < components.length; i++) {
            address component = components[i];
            uint unit = units[i];

            // Calculate required component quantity
            uint requiredComponentQuantity = calculateTransferValue(
                unit,
                ISetToken(_setAddress).naturalUnit(),
                _quantity
            );

            // Fetch component quantity in vault
            uint vaultBalance = IVault(vaultAddress).getOwnerBalance(msg.sender, component);
            if (vaultBalance >= requiredComponentQuantity) {
                // Decrement vault balance by the required component quantity
                IVault(vaultAddress).decrementTokenOwner(
                    msg.sender,
                    component,
                    requiredComponentQuantity
                );
            } else {
                // User has less than required amount, decrement the vault by full balance
                if (vaultBalance > 0) {
                    IVault(vaultAddress).decrementTokenOwner(
                        msg.sender,
                        component,
                        vaultBalance
                    );
                }

                // Transfer the remainder component quantity required to vault
                ITransferProxy(transferProxyAddress).transferToVault(
                    msg.sender,
                    component,
                    requiredComponentQuantity.sub(vaultBalance)
                );
            }

            // Increment the vault balance of the set token for the component
            IVault(vaultAddress).incrementTokenOwner(
                _setAddress,
                component,
                requiredComponentQuantity
            );
        }

        // Issue set token
        ISetToken(_setAddress).mint(msg.sender, _quantity);
    }

    /**
     * Deposit multiple tokens to the vault. Quantities should be in the
     * order of the addresses of the tokens being deposited.
     *
     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens
     * @param  _quantities       Array of the number of tokens to deposit
     */
    function batchDeposit(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        public
        isValidBatchTransaction(_tokenAddresses, _quantities)
    {
        // For each token and quantity pair, run deposit function
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
     * @param  _quantities        Array of the number of tokens to withdraw
     */
    function batchWithdraw(
        address[] _tokenAddresses,
        uint[] _quantities
    )
        public
        isValidBatchTransaction(_tokenAddresses, _quantities)
    {
        // For each token and quantity pair, run withdraw function
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
     * @param  _quantity        The number of tokens to deposit
     */
    function deposit(
        address _tokenAddress,
        uint _quantity
    )
        public
        isNonZero(_quantity)
    {
        // Call TransferProxy contract to transfer user tokens to Vault
        ITransferProxy(transferProxyAddress).transferToVault(
            msg.sender,
            _tokenAddress,
            _quantity
        );

        // Call Vault contract to attribute deposited tokens to user
        IVault(vaultAddress).incrementTokenOwner(
            msg.sender,
            _tokenAddress,
            _quantity
        );
    }

    /**
     * Withdraw a quantity of tokens from the vault.
     *
     * @param  _tokenAddress    The address of the ERC20 token
     * @param  _quantity        The number of tokens to withdraw
     */
    function withdraw(
        address _tokenAddress,
        uint _quantity
    )
        public
    {
        // Call Vault contract to deattribute tokens to user
        IVault(vaultAddress).decrementTokenOwner(
            msg.sender,
            _tokenAddress,
            _quantity
        );

        // Call Vault to withdraw tokens from Vault to user
        IVault(vaultAddress).withdrawTo(
            _tokenAddress,
            msg.sender,
            _quantity
        );
    }

    /**
     * Deploys a new Set Token and adds it to the valid list of SetTokens
     *
     * @param  _factoryAddress  address       The address of the Factory to create from
     * @param  _components      address[]     The address of component tokens
     * @param  _units           uint[]        The units of each component token
     * @param  _naturalUnit     uint          The minimum unit to be issued or redeemed
     * @param  _name            string        The name of the new Set
     * @param  _symbol          string        The symbol of the new Set
     * @return setTokenAddress address        The address of the new Set
     */
    function create(
        address _factoryAddress,
        address[] _components,
        uint[] _units,
        uint _naturalUnit,
        string _name,
        string _symbol
    )
        public
        isValidFactory(_factoryAddress)
        returns (address)
    {
        // Create the Set
        address newSetTokenAddress = ISetFactory(_factoryAddress).create(
            _components,
            _units,
            _naturalUnit,
            _name,
            _symbol
        );

        // Add Set to the list of tracked Sets
        validSets[newSetTokenAddress] = true;

        emit LogCreate(
            newSetTokenAddress,
            _factoryAddress,
            _components,
            _units,
            _naturalUnit,
            _name,
            _symbol
        );

        return newSetTokenAddress;
    }

    /**
     * Function to convert Set Tokens into underlying components
     *
     * @param _tokenAddress    The address of the Set token
     * @param _quantity        The number of tokens to redeem
     */
    function redeem(
        address _tokenAddress,
        uint _quantity
    )
        public
        isValidSet(_tokenAddress)
        isNonZero(_quantity)
    {
        // Check if multiple of naturalUnit
        uint naturalUnit = ISetToken(_tokenAddress).naturalUnit();
        require(isMultipleOfNaturalUnit(_quantity, naturalUnit));

        // Burn the Set token (thereby decrementing the SetToken balance)
        ISetToken(_tokenAddress).burn(msg.sender, _quantity);

        // Transfer the underlying tokens to the corresponding token balances
        address[] memory components = ISetToken(_tokenAddress).getComponents();
        uint[] memory units = ISetToken(_tokenAddress).getUnits();
        for (uint16 i = 0; i < components.length; i++) {
            address currentComponent = components[i];
            uint currentUnits = units[i];

            uint tokenValue = calculateTransferValue(
                currentUnits,
                naturalUnit,
                _quantity
            );
            // Increment the component amount
            IVault(vaultAddress).incrementTokenOwner(
                msg.sender,
                currentComponent,
                tokenValue
            );
        }
    }

    /* ============ Private Functions ============ */

    /**
     * Function to calculate the transfer value of a component given quantity of Set
     *
     * @param _componentUnits    The units of the component token
     * @param _naturalUnit       The natural unit of the Set token
     * @param _quantity          The number of tokens being redeem
     */
    function calculateTransferValue(
        uint _componentUnits,
        uint _naturalUnit,
        uint _quantity
    )
        pure
        internal
        returns(uint)
    {
        return _quantity.div(_naturalUnit).mul(_componentUnits);
    }

    function isMultipleOfNaturalUnit(
        uint _quantity,
        uint _naturalUnit
    )
        view
        internal
        returns(bool)
    {
        return (_quantity % _naturalUnit) == 0;
    }

}
