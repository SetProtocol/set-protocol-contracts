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

pragma solidity 0.5.4;

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CoreOperationState } from "./CoreOperationState.sol";
import { CoreState } from "../lib/CoreState.sol";
import { IssuanceLibrary } from "../lib/IssuanceLibrary.sol";
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
        uint256[] memory componentTransferValues = redeemAndDecrementVault(
            _set,
            msg.sender,
            _quantity
        );

        // Calculate the withdraw and increment quantities to specified address
        uint256[] memory incrementTokenOwnerValues;
        uint256[] memory withdrawToValues;
        (
            incrementTokenOwnerValues,
            withdrawToValues
        ) = IssuanceLibrary.calculateWithdrawAndIncrementQuantities(
            componentTransferValues,
            _toExclude
        );

        address[] memory components = ISetToken(_set).getComponents();

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
        whenOperational
    {
        // Verify Set was created by Core and is enabled
        require(
            state.validSets[_set],
            "Core: Invalid Set"
        );

        // Declare interface variables
        ISetToken setToken = ISetToken(_set);

        // Validate quantity is multiple of natural unit
        require(
            _quantity % setToken.naturalUnit() == 0,
            "Core: Invalid quantity"
        );

        // Fetch set token properties
        uint256 naturalUnit = setToken.naturalUnit();
        address[] memory components = setToken.getComponents();
        uint256[] memory units = setToken.getUnits();

        // Calculate component quantities to issue
        uint256[] memory requiredComponentQuantities = IssuanceLibrary.calculateTransferValues(
            units,
            naturalUnit,
            _quantity
        );

        // Calculate the withdraw and increment quantities to caller
        uint256[] memory decrementTokenOwnerValues;
        uint256[] memory depositValues;
        (
            decrementTokenOwnerValues,
            depositValues
        ) = IssuanceLibrary.calculateDepositAndDecrementQuantities(
            components,
            requiredComponentQuantities,
            _componentOwner,
            state.vault
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
        uint256[] memory componentTransferValues = redeemAndDecrementVault(
            _set,
            _burnAddress,
            _quantity
        );

        // Increment the component amount
        address[] memory components = ISetToken(_set).getComponents();
        state.vaultInstance.batchIncrementTokenOwner(
            components,
            _incrementAddress,
            componentTransferValues
        );
    }

   /**
     * Private method that validates inputs, redeems Set, and decrements
     * the components in the vault
     *
     * @param _set               Address of the Set to redeem
     * @param _burnAddress       Address to burn tokens from
     * @param _quantity          Number of tokens to redeem     
     * @return componentTransferValues       Transfer value of components
     */
    function redeemAndDecrementVault(
        address _set,
        address _burnAddress,
        uint256 _quantity
    )
        private
        returns (uint256[] memory)
    {
        // Verify Set was created by Core and is enabled
        require(
            state.validSets[_set],
            "Core: Invalid Set"
        );

        ISetToken setToken = ISetToken(_set);
        address[] memory components = setToken.getComponents();
        uint256[] memory units = setToken.getUnits();
        uint256 naturalUnit = setToken.naturalUnit();

        // Validate quantity is multiple of natural unit
        require(
            _quantity % naturalUnit == 0,
            "Core: Invalid quantity"
        );

        // Burn the Set token (thereby decrementing the Set balance)
        setToken.burn(
            _burnAddress,
            _quantity
        );

        // Calculate component quantities to redeem
        uint256[] memory componentQuantities = IssuanceLibrary.calculateTransferValues(
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

        return componentQuantities;
    }
}
