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
pragma experimental "ABIEncoderV2";

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CoreOperationState } from "./CoreOperationState.sol";
import { CoreState } from "../lib/CoreState.sol";
import { CoreIssuanceLibrary } from "../lib/CoreIssuanceLibrary.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { SetTokenLibrary } from "../lib/SetTokenLibrary.sol";


/**
 * @title CoreIssuance
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

    /* ============ Events ============ */

    event SetIssued(
        address _setAddress,
        uint256 _quantity
    );

    event SetRedeemed(
        address _setAddress,
        uint256 _quantity
    );

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
     * Converts user's components into Set Tokens owned by the user and stored in Vault
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
     * Exchange Set tokens for underlying components to the user held in the Vault.
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
        ) = CoreIssuanceLibrary.calculateWithdrawAndIncrementQuantities(
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
     * Convert the caller's Set tokens held in the vault into underlying components to the user
     * held in the Vault.
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
     * Redeem Set token and return components to specified recipient. The components
     * are left in the vault after redemption in the recipient's name.
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
     * The tokens minted are held by the recipient specified in _setRecipient.
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
            "IssueInternal"
        );

        // Validate quantity is multiple of natural unit
        SetTokenLibrary.isMultipleOfSetNaturalUnit(_set, _quantity);

        SetTokenLibrary.SetDetails memory setToken = SetTokenLibrary.getSetDetails(_set);

        // Calculate component quantities required to issue
        uint256[] memory requiredComponentQuantities = CoreIssuanceLibrary.calculateRequiredComponentQuantities(
            setToken.units,
            setToken.naturalUnit,
            _quantity
        );

        // Calculate the withdraw and increment quantities to caller
        uint256[] memory decrementTokenOwnerValues;
        uint256[] memory depositValues;
        (
            decrementTokenOwnerValues,
            depositValues
        ) = CoreIssuanceLibrary.calculateDepositAndDecrementQuantities(
            setToken.components,
            requiredComponentQuantities,
            _componentOwner,
            state.vault
        );

        // Decrement components used for issuance in vault
        state.vaultInstance.batchDecrementTokenOwner(
            setToken.components,
            _componentOwner,
            decrementTokenOwnerValues
        );

        // Deposit tokens used for issuance into vault
        state.transferProxyInstance.batchTransfer(
            setToken.components,
            depositValues,
            _componentOwner,
            state.vault
        );

        // Increment the vault balance of the set token for the components
        state.vaultInstance.batchIncrementTokenOwner(
            setToken.components,
            _set,
            requiredComponentQuantities
        );

        // Issue set token
        ISetToken(_set).mint(
            _setRecipient,
            _quantity
        );

        emit SetIssued(
            _set,
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
     * Exchange Set tokens for underlying components. Components are attributed in the vault.
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
        uint256[] memory componentQuantities = redeemAndDecrementVault(
            _set,
            _burnAddress,
            _quantity
        );

        // Increment the component amount
        address[] memory components = ISetToken(_set).getComponents();
        state.vaultInstance.batchIncrementTokenOwner(
            components,
            _incrementAddress,
            componentQuantities
        );
    }

   /**
     * Private method that validates inputs, redeems Set, and decrements
     * the components in the vault
     *
     * @param _set                  Address of the Set to redeem
     * @param _burnAddress          Address to burn tokens from
     * @param _quantity             Number of tokens to redeem     
     * @return componentQuantities  Transfer value of components
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
            "RedeemAndDecrementVault"
        );

        // Validate quantity is multiple of natural unit
        SetTokenLibrary.isMultipleOfSetNaturalUnit(_set, _quantity);

        // Burn the Set token (thereby decrementing the Set balance)
        ISetToken(_set).burn(
            _burnAddress,
            _quantity
        );

        SetTokenLibrary.SetDetails memory setToken = SetTokenLibrary.getSetDetails(_set);

        // Calculate component quantities to redeem
        uint256[] memory componentQuantities = CoreIssuanceLibrary.calculateRequiredComponentQuantities(
            setToken.units,
            setToken.naturalUnit,
            _quantity
        );

        // Decrement components from Set's possession
        state.vaultInstance.batchDecrementTokenOwner(
            setToken.components,
            _set,
            componentQuantities
        );

        emit SetRedeemed(
            _set,
            _quantity
        );

        return componentQuantities;
    }
}
