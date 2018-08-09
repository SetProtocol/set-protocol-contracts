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

import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { CoreState } from "../lib/CoreState.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";


/**
 * @title Core Issuance
 * @author Set Protocol
 *
 * The CoreIssuance contract contains function related to issuing and
 * redeeming Sets.
 */
contract CoreIssuance is
    CoreState
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
     * Exchanges components for Set Tokens
     *
     * @param  _set          Address of set to issue
     * @param  _quantity     Quantity of set to issue
     */
    function issue(
        address _set,
        uint256 _quantity
    )
        external
    {
        // Verify Set was created by Core and is enabled
        require(state.validSets[_set]);

        // Validate quantity is multiple of natural unit
        require(_quantity % ISetToken(_set).naturalUnit() == 0);

        // Run issueInternal
        issueInternal(
            msg.sender,
            _set,
            _quantity
        );
    }

    /**
     * Function to convert Set Tokens into underlying components
     *
     * @param _set          The address of the Set token
     * @param _quantity     The number of tokens to redeem
     */
    function redeem(
        address _set,
        uint256 _quantity
    )
        external
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
     * However, some have central abilities to freeze transfers (e.g. EOS). _toWithdraw
     * allows you to optionally specify which component tokens to transfer
     * back to the user. The rest will remain in the vault under the users' addresses.
     *
     * @param _set          The address of the Set token
     * @param _quantity     The number of tokens to redeem
     * @param _toWithdraw   Mask of indexes of tokens to withdraw
     */
    function redeemAndWithdraw(
        address _set,
        uint256 _quantity,
        uint256 _toWithdraw
    )
        external
    {
        // Declare interface variables
        ISetToken setToken = ISetToken(_set);
        IVault vault = IVault(state.vault);

        // Verify Set was created by Core and is enabled
        require(state.validSets[_set]);

        // Validate quantity is multiple of natural unit
        require(_quantity % setToken.naturalUnit() == 0);

        // Burn the Set token (thereby decrementing the SetToken balance)
        setToken.burn(msg.sender, _quantity);

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
                _set,
                components[i],
                componentQuantity
            );

            // Calculate bit index of current component
            uint256 componentBitIndex = 2 ** i;

            // Transfer to user if component is included in _toWithdraw
            if ((_toWithdraw & componentBitIndex) != 0) {
                // Call Vault to withdraw tokens from Vault to user
                vault.withdrawTo(
                    components[i],
                    msg.sender,
                    componentQuantity
                );
            } else {
                // Otherwise, increment the component amount for the user
                vault.incrementTokenOwner(
                    msg.sender,
                    components[i],
                    componentQuantity
                );
            }
        }
    }

    /**
     * Function to convert Set Tokens held in the vault into underlying components in vault
     *
     * @param _set          The address of the Set token
     * @param _quantity     The number of tokens to redeem
     */
    function redeemInVault(
        address _set,
        uint _quantity
    )
        external
    {
        // Decrement ownership of Set token in the vault
        IVault(state.vault).decrementTokenOwner(
            msg.sender,
            _set,
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
     * Exchanges components for Set Tokens, accepting any owner
     *
     * @param  _owner        Address to issue set to
     * @param  _set          Address of set to issue
     * @param  _quantity     Quantity of set to issue
     */
    function issueInternal(
        address _owner,
        address _set,
        uint256 _quantity
    )
        internal
    {
        // Declare interface variables
        ISetToken setToken = ISetToken(_set);
        IVault vault = IVault(state.vault);

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
                _owner,
                components[i]
            );

            if (vaultBalance >= requiredComponentQuantity) {
                // Decrement vault balance by the required component quantity
                vault.decrementTokenOwner(
                    _owner,
                    components[i],
                    requiredComponentQuantity
                );
            } else {
                // User has less than required amount, decrement the vault by full balance
                if (vaultBalance > 0) {
                    vault.decrementTokenOwner(
                        _owner,
                        components[i],
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
                _set,
                components[i],
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
     * Function to convert Set Tokens into underlying components
     *
     * @param _burnAddress  The address to burn Set token from
     * @param _set          The address of the Set token
     * @param _quantity     The number of tokens to redeem
     */
    function redeemInternal(
        address _burnAddress,
        address _set,
        uint _quantity
    )
        internal
    {
        // Declare interface variables
        ISetToken setToken = ISetToken(_set);
        IVault vault = IVault(state.vault);

        // Verify Set was created by Core and is enabled
        require(state.validSets[_set]);

        // Validate quantity is multiple of natural unit
        require(_quantity % setToken.naturalUnit() == 0);

        // Burn the Set token (thereby decrementing the SetToken balance)
        setToken.burn(_burnAddress, _quantity);

        // Fetch Set token properties
        uint naturalUnit = setToken.naturalUnit();
        address[] memory components = setToken.getComponents();
        uint[] memory units = setToken.getUnits();

        // Transfer the underlying tokens to the corresponding token balances
        for (uint16 i = 0; i < components.length; i++) {
            address currentComponent = components[i];

            // Calculate redeemable amount of tokens
            uint tokenValue = calculateTransferValue(
                units[i],
                naturalUnit,
                _quantity
            );

            // Decrement the Set amount
            vault.decrementTokenOwner(
                _set,
                currentComponent,
                tokenValue
            );

            // Increment the component amount
            vault.incrementTokenOwner(
                msg.sender,
                currentComponent,
                tokenValue
            );
        }
    }

    /**
     * Function to calculate the transfer value of a component given quantity of Set
     *
     * @param _componentUnits   The units of the component token
     * @param _naturalUnit      The natural unit of the Set token
     * @param _quantity         The number of tokens being redeem
     */
    function calculateTransferValue(
        uint256 _componentUnits,
        uint256 _naturalUnit,
        uint256 _quantity
    )
        pure
        internal
        returns (uint256)
    {
        return _quantity.div(_naturalUnit).mul(_componentUnits);
    }
}
