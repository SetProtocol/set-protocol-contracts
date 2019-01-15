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
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CoreOperationState } from "./CoreOperationState.sol";
import { CoreState } from "../lib/CoreState.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";


/**
 * @title Core Issuance
 * @author Set Protocol
 *
 * The CoreIssuance contract contains function related to issuing and redeeming Sets.
 */
contract CoreIssuance is
    CoreState,
    CoreOperationState,
    ReentrancyGuard
{
    // Use SafeMath library for all uint256 arithmetic
    using SafeMath for uint256;

    /* ============ External Functions ============ */

    /**
     * Issues a specified Set for a specified quantity to the caller
     * using the caller's components from the wallet and vault.
     *
     * @param  _set          Address of the Set to issue
     * @param  _quantity     Number of tokens to issue
     */
    function issue(
        address _set,
        uint256 _quantity
    )
        external
        nonReentrant
        whenOperational
    {
        issueInternal(
            msg.sender,
            msg.sender,
            _set,
            _quantity
        );
    }

    /**
     * Converts user's components into Set Token's held directly in Vault
     *
     * @param _set          Address of the Set
     * @param _quantity     Number of tokens to redeem
     */
    function issueInVault(
        address _set,
        uint256 _quantity
    )
        external
        nonReentrant
    {
        issueInVaultInternal(
            msg.sender,
            _set,
            _quantity
        );
    }

    /**
     * Issues a specified Set for a specified quantity to the recipient
     * using the caller's components from the wallet and vault.
     *
     * @param  _recipient    Address to issue to
     * @param  _set          Address of the Set to issue
     * @param  _quantity     Number of tokens to issue
     */
    function issueTo(
        address _recipient,
        address _set,
        uint256 _quantity
    )
        external
        nonReentrant
        whenOperational
    {
        issueInternal(
            msg.sender,
            _recipient,
            _set,
            _quantity
        );
    }

    /**
     * Exchange Set tokens for underlying components
     *
     * @param  _set          Address of the Set to redeem
     * @param  _quantity     Number of tokens to redeem
     */
    function redeem(
        address _set,
        uint256 _quantity
    )
        external
        nonReentrant
    {
        redeemInternal(
            msg.sender,
            msg.sender,
            _set,
            _quantity
        );
    }

    /**
     * Composite method to redeem and withdraw with a single transaction
     *
     * Normally, you should expect to be able to withdraw all of the tokens.
     * However, some have central abilities to freeze transfers (e.g. EOS). _toExclude
     * allows you to optionally specify which component tokens to exclude when
     * redeeming. They will remain in the vault under the users' addresses.
     *
     * @param _set          Address of the Set
     * @param _to           Address to withdraw or attribute tokens to
     * @param _quantity     Number of tokens to redeem
     * @param _toExclude    Mask of indexes of tokens to exclude from withdrawing
     */
    function redeemAndWithdrawTo(
        address _set,
        address _to,
        uint256 _quantity,
        uint256 _toExclude
    )
        external
        nonReentrant
    {
        ISetToken setToken = ISetToken(_set);

        // Verify Set was created by Core and is enabled
        require(
            state.validSets[_set],
            "Core.redeemAndWithdraw: Invalid or disabled SetToken address"
        );

        // Validate quantity is multiple of natural unit
        require(
            _quantity % setToken.naturalUnit() == 0,
            "Core.redeemAndWithdraw: Quantity must be multiple of natural unit"
        );

        // Burn the Set token (thereby decrementing the SetToken balance)
        setToken.burn(
            msg.sender,
            _quantity
        );

        // Fetch Set token properties
        uint256 naturalUnit = setToken.naturalUnit();
        address[] memory components = setToken.getComponents();
        uint256[] memory units = setToken.getUnits();
        
        // Calculate component quantities to redeem
        uint256[] memory componentQuantities = calculateTransferValues(
            units,
            naturalUnit,
            _quantity
        );

        // Decrement components from Set's possession
        state.vaultInstance.batchDecrementTokenOwner(
            components,
            _set,
            componentQuantities
        );

        // Calculate the withdraw and increment quantities to specified address
        (
            uint256[] memory incrementTokenOwnerValues,
            uint256[] memory withdrawToValues
        ) = calculateWithdrawAndIncrementQuantities(
            componentQuantities,
            _toExclude
        );

        // Increment excluded components to the specified address
        state.vaultInstance.batchIncrementTokenOwner(
            components,
            _to,
            incrementTokenOwnerValues
        );

        // Withdraw non-excluded components and attribute to specified address
        state.vaultInstance.batchWithdrawTo(
            components,
            _to,
            withdrawToValues
        );
    }

    /**
     * Convert Set tokens held in the vault into underlying components in vault
     *
     * @param _set          Address of the Set
     * @param _quantity     Number of tokens to redeem
     */
    function redeemInVault(
        address _set,
        uint256 _quantity
    )
        external
        nonReentrant
    {
        // Decrement ownership of Set token in the vault
        state.vaultInstance.decrementTokenOwner(
            _set,
            msg.sender,
            _quantity
        );

        redeemInternal(
            state.vault,
            msg.sender,
            _set,
            _quantity
        );
    }

    /**
     * Redeem Set token and return components to specified recipient
     *
     * @param _recipient    Recipient of Set being issued
     * @param _set          Address of the Set
     * @param _quantity     Number of tokens to redeem
     */
    function redeemTo(
        address _recipient,
        address _set,
        uint256 _quantity
    )
        external
        nonReentrant
    {
        redeemInternal(
            msg.sender,
            _recipient,
            _set,
            _quantity
        );
    }

    /* ============ Internal Functions ============ */

    /**
     * Exchange components for Set tokens, accepting any owner
     * Used in issue, issueTo, and issueInVaultInternal
     *
     * @param  _componentOwner  Address to use tokens from
     * @param  _setRecipient    Address to issue Set to
     * @param  _set             Address of the Set to issue
     * @param  _quantity        Number of tokens to issue
     */
    function issueInternal(
        address _componentOwner,
        address _setRecipient,
        address _set,
        uint256 _quantity
    )
        internal
    {
        // Verify Set was created by Core and is enabled
        require(
            state.validSets[_set],
            "Core.issue: Invalid or disabled SetToken address"
        );

        // Declare interface variables
        ISetToken setToken = ISetToken(_set);

        // Validate quantity is multiple of natural unit
        require(
            _quantity % setToken.naturalUnit() == 0,
            "Core.issue: Quantity must be multiple of natural unit"
        );

        // Fetch set token properties
        uint256 naturalUnit = setToken.naturalUnit();
        address[] memory components = setToken.getComponents();
        uint256[] memory units = setToken.getUnits();

        // Calculate component quantities to issue
        uint256[] memory requiredComponentQuantities = calculateTransferValues(
            units,
            naturalUnit,
            _quantity
        );

        // Calculate the withdraw and increment quantities to caller
        (
            uint256[] memory decrementTokenOwnerValues,
            uint256[] memory depositValues
        ) = calculateDepositAndDecrementQuantities(
            components,
            requiredComponentQuantities,
            _componentOwner
        );

        // Decrement components used for issuance in vault
        state.vaultInstance.batchDecrementTokenOwner(
            components,
            _componentOwner,
            decrementTokenOwnerValues
        );

        // Deposit tokens used for issuance into vault
        state.transferProxyInstance.batchTransfer(
            components,
            depositValues,
            _componentOwner,
            state.vault
        );

        // Increment the vault balance of the set token for the components
        state.vaultInstance.batchIncrementTokenOwner(
            components,
            _set,
            requiredComponentQuantities
        );

        // Issue set token
        setToken.mint(
            _setRecipient,
            _quantity
        );
    }

    /**
     * Converts recipient's components into Set Tokens held directly in Vault.
     * Used in issueInVault
     *
     * @param _recipient    Address to issue to
     * @param _set          Address of the Set
     * @param _quantity     Number of tokens to issue
     */
    function issueInVaultInternal(
        address _recipient,
        address _set,
        uint256 _quantity
    )
        internal
    {
        issueInternal(
            _recipient,
            state.vault,
            _set,
            _quantity
        );

        // Increment ownership of Set token in the vault
        state.vaultInstance.incrementTokenOwner(
            _set,
            _recipient,
            _quantity
        );
    }

    /**
     * Exchange Set tokens for underlying components
     * Used in redeem, redeemInVault, and redeemTo
     *
     * @param _burnAddress       Address to burn tokens from
     * @param _incrementAddress  Address to increment component tokens to
     * @param _set               Address of the Set to redeem
     * @param _quantity          Number of tokens to redeem
     */
    function redeemInternal(
        address _burnAddress,
        address _incrementAddress,
        address _set,
        uint256 _quantity
    )
        internal
    {
        // Verify Set was created by Core and is enabled
        require(
            state.validSets[_set],
            "Core.redeem: Invalid or disabled SetToken address"
        );

        // Declare interface variables
        ISetToken setToken = ISetToken(_set);

        // Validate quantity is multiple of natural unit
        uint256 naturalUnit = setToken.naturalUnit();
        require(
            _quantity % naturalUnit == 0,
            "Core.redeem: Quantity must be multiple of natural unit"
        );

        // Burn the Set token (thereby decrementing the SetToken balance)
        setToken.burn(
            _burnAddress,
            _quantity
        );

        // Fetch Set token properties
        address[] memory components = setToken.getComponents();
        uint256[] memory units = setToken.getUnits();
        uint256[] memory tokenValues = calculateTransferValues(
            units,
            naturalUnit,
            _quantity
        );

        // Decrement the Set amount
        state.vaultInstance.batchDecrementTokenOwner(
            components,
            _set,
            tokenValues
        );

        // Increment the component amount
        state.vaultInstance.batchIncrementTokenOwner(
            components,
            _incrementAddress,
            tokenValues
        );
    }

    /**
     * Calculate the quantities required to deposit and decrement during issuance. Takes into account
     * the tokens an owner already has in the vault.
     *
     * @param _components                           Addresses of components
     * @param _componentQuantities                  Component quantities to increment and withdraw
     * @param _owner                                Address to deposit and decrement quantities from
     * @return uint256[] decrementQuantities        Quantities to decrement from vault
     * @return uint256[] depositQuantities          Quantities to deposit into the vault
     */
    function calculateDepositAndDecrementQuantities(
        address[] _components,
        uint256[] _componentQuantities,
        address _owner
    )
        private
        view
        returns (
            uint256[] /* decrementtQuantities */,
            uint256[] /* depositQuantities */
        )
    {
        uint256 componentCount = _components.length;
        uint256[] memory decrementTokenOwnerValues = new uint256[](componentCount);
        uint256[] memory depositQuantities = new uint256[](componentCount);

        for (uint256 i = 0; i < componentCount; i++) {
            // Fetch component quantity in vault
            uint256 vaultBalance = state.vaultInstance.getOwnerBalance(
                _components[i],
                _owner
            );

            // If the vault holds enough components, decrement the full amount
            if (vaultBalance >= _componentQuantities[i]) {
                decrementTokenOwnerValues[i] = _componentQuantities[i];
            } else {
                // User has less than required amount, decrement the vault by full balance
                if (vaultBalance > 0) {
                    decrementTokenOwnerValues[i] = vaultBalance;
                }

                depositQuantities[i] = _componentQuantities[i].sub(vaultBalance);
            }
        }

        return (
            decrementTokenOwnerValues,
            depositQuantities
        );
    }

    /**
     * Calculate the quantities required to withdraw and increment during redeem and withdraw. Takes into
     * account a bitmask exclusion parameter.
     *
     * @param _componentQuantities                  Component quantities to increment and withdraw
     * @param _toExclude                            Mask of indexes of tokens to exclude from withdrawing
     * @return uint256[] incrementQuantities        Quantities to increment in vault
     * @return uint256[] withdrawQuantities         Quantities to withdraw from vault
     */
    function calculateWithdrawAndIncrementQuantities(
        uint256[] _componentQuantities,
        uint256 _toExclude
    )
        private
        pure
        returns (
            uint256[] /* incrementQuantities */,
            uint256[] /* withdrawQuantities */
        )
    {
        uint256 componentCount = _componentQuantities.length;
        uint256[] memory incrementTokenOwnerValues = new uint256[](componentCount);
        uint256[] memory withdrawToValues = new uint256[](componentCount);

        // Loop through and decrement vault balances for the set, withdrawing if requested
        for (uint256 i = 0; i < componentCount; i++) {
            // Calculate bit index of current component
            uint256 componentBitIndex = 2 ** i;

            // Transfer to user unless component index is included in _toExclude
            if ((_toExclude & componentBitIndex) != 0) {
                incrementTokenOwnerValues[i] = _componentQuantities[i];
            } else {
                withdrawToValues[i] = _componentQuantities[i];
            }
        }

        return (
            incrementTokenOwnerValues,
            withdrawToValues
        );
    }

    /**
     * Calculate the transfer values components given quantity of Set
     *
     * @param _componentUnits   The units of the component token
     * @param _naturalUnit      The natural unit of the Set token
     * @param _quantity         The number of tokens being redeem
     * @return uint256[]        Transfer value in base units of the Set
     */
    function calculateTransferValues(
        uint256[] _componentUnits,
        uint256 _naturalUnit,
        uint256 _quantity
    )
        internal
        pure
        returns (uint256[])
    {
        uint256[] memory tokenValues = new uint256[](_componentUnits.length);

        // Transfer the underlying tokens to the corresponding token balances
        for (uint256 i = 0; i < _componentUnits.length; i++) {
            tokenValues[i] = _quantity.mul(_componentUnits[i]).div(_naturalUnit);
        }

        return tokenValues;
    }
}
