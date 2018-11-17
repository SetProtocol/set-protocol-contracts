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
import { CoreState } from "../lib/CoreState.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";
import { CoreOperationState } from "./CoreOperationState.sol";


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

    /* ============ Events ============ */

    event IssuanceComponentDeposited(
        address indexed _setToken,
        address indexed _component,
        uint256 _quantity
    );

    /* ============ External Functions ============ */

    /**
     * Exchange components for Set tokens
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
     * @param _quantity     Number of tokens to redeem
     * @param _toExclude    Mask of indexes of tokens to exclude from withdrawing
     */
    function redeemAndWithdraw(
        address _set,
        uint256 _quantity,
        uint256 _toExclude
    )
        external
        nonReentrant
    {
        // Verify Set was created by Core and is enabled
        require(
            state.validSets[_set],
            "Core.redeemAndWithdraw: Invalid or disabled SetToken address"
        );

        // Declare interface variables
        ISetToken setToken = ISetToken(_set);
        IVault vault = IVault(state.vault);

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

        // Loop through and decrement vault balances for the set, withdrawing if requested
        for (uint256 i = 0; i < components.length; i++) {
            // Calculate quantity to transfer
            uint256 componentQuantity = calculateTransferValue(
                units[i],
                naturalUnit,
                _quantity
            );

            // Decrement the component amount owned by the Set
            vault.decrementTokenOwner(
                components[i],
                _set,
                componentQuantity
            );

            // Calculate bit index of current component
            uint256 componentBitIndex = 2 ** i;

            // Transfer to user unless component index is included in _toExclude
            if ((_toExclude & componentBitIndex) != 0) {
                // Just increment vault balance for user for component
                vault.incrementTokenOwner(
                    components[i],
                    msg.sender,
                    componentQuantity
                );
            } else {
                // Call Vault to withdraw tokens from Vault to user
                vault.withdrawTo(
                    components[i],
                    msg.sender,
                    componentQuantity
                );
            }
        }
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
        IVault(state.vault).decrementTokenOwner(
            _set,
            msg.sender,
            _quantity
        );

        redeemInternal(
            state.vault,
            _set,
            _quantity
        );
    }

    /* ============ Internal Functions ============ */

    /**
     * Exchange components for Set tokens, accepting any owner
     *
     * @param  _owner        Address to issue tokens to
     * @param  _set          Address of the Set to issue
     * @param  _quantity     Number of tokens to issue
     */
    function issueInternal(
        address _owner,
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
        IVault vault = IVault(state.vault);

        // Validate quantity is multiple of natural unit
        require(
            _quantity % setToken.naturalUnit() == 0,
            "Core.issue: Quantity must be multiple of natural unit"
        );

        // Fetch set token properties
        uint256 naturalUnit = setToken.naturalUnit();
        address[] memory components = setToken.getComponents();
        uint256[] memory units = setToken.getUnits();

        // Inspect vault for required component quantity
        for (uint256 i = 0; i < components.length; i++) {
            // Calculate required component quantity
            uint256 requiredComponentQuantity = calculateTransferValue(
                units[i],
                naturalUnit,
                _quantity
            );

            // Fetch component quantity in vault
            uint256 vaultBalance = vault.getOwnerBalance(
                components[i],
                _owner
            );

            if (vaultBalance >= requiredComponentQuantity) {
                // Decrement vault balance by the required component quantity
                vault.decrementTokenOwner(
                    components[i],
                    _owner,
                    requiredComponentQuantity
                );
            } else {
                // User has less than required amount, decrement the vault by full balance
                if (vaultBalance > 0) {
                    vault.decrementTokenOwner(
                        components[i],
                        _owner,
                        vaultBalance
                    );
                }

                // Calculate remainder to deposit
                uint256 amountToDeposit = requiredComponentQuantity.sub(vaultBalance);

                // Transfer the remainder component quantity required to vault
                ITransferProxy(state.transferProxy).transfer(
                    components[i],
                    requiredComponentQuantity.sub(vaultBalance),
                    _owner,
                    state.vault
                );

                // Log transfer of component from issuer wallet
                emit IssuanceComponentDeposited(
                    _set,
                    components[i],
                    amountToDeposit
                );
            }

            // Increment the vault balance of the set token for the component
            vault.incrementTokenOwner(
                components[i],
                _set,
                requiredComponentQuantity
            );
        }

        // Issue set token
        setToken.mint(
            _owner,
            _quantity
        );
    }

    /**
     * Exchange Set tokens for underlying components
     *
     * @param _burnAddress  Address to redeem and burn tokens from
     * @param _set          Address of the Set to redeem
     * @param _quantity     Number of tokens to redeem
     */
    function redeemInternal(
        address _burnAddress,
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
        IVault vault = IVault(state.vault);

        // Validate quantity is multiple of natural unit
        require(
            _quantity % setToken.naturalUnit() == 0,
            "Core.redeem: Quantity must be multiple of natural unit"
        );

        // Burn the Set token (thereby decrementing the SetToken balance)
        setToken.burn(
            _burnAddress,
            _quantity
        );

        // Fetch Set token properties
        uint256 naturalUnit = setToken.naturalUnit();
        address[] memory components = setToken.getComponents();
        uint256[] memory units = setToken.getUnits();

        // Transfer the underlying tokens to the corresponding token balances
        for (uint256 i = 0; i < components.length; i++) {
            // Calculate redeemable amount of tokens
            uint256 tokenValue = calculateTransferValue(
                units[i],
                naturalUnit,
                _quantity
            );

            // Decrement the Set amount
            vault.decrementTokenOwner(
                components[i],
                _set,
                tokenValue
            );

            // Increment the component amount
            vault.incrementTokenOwner(
                components[i],
                msg.sender,
                tokenValue
            );
        }
    }

    /**
     * Calculate the transfer value of a component given quantity of Set
     *
     * @param _componentUnits   The units of the component token
     * @param _naturalUnit      The natural unit of the Set token
     * @param _quantity         The number of tokens being redeem
     * @return uint256          Transfer value in base units of the Set
     */
    function calculateTransferValue(
        uint256 _componentUnits,
        uint256 _naturalUnit,
        uint256 _quantity
    )
        internal
        pure
        returns (uint256)
    {
        return _quantity.mul(_componentUnits).div(_naturalUnit);
    }
}
