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
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { IVault } from "../interfaces/IVault.sol";


/**
 * @title IssuanceLibrary
 * @author Set Protocol
 *
 * This library contains functions for calculating 
 */
library IssuanceLibrary {

    using SafeMath for uint256;

    /**
     * Calculate the quantities required to deposit and decrement during issuance. Takes into account
     * the tokens an owner already has in the vault.
     *
     * @param _components                           Addresses of components
     * @param _componentQuantities                  Component quantities to increment and withdraw
     * @param _owner                                Address to deposit and decrement quantities from
     * @param _vault                                Address to vault
     * @return uint256[] decrementQuantities        Quantities to decrement from vault
     * @return uint256[] depositQuantities          Quantities to deposit into the vault
     */
    function calculateDepositAndDecrementQuantities(
        address[] _components,
        uint256[] _componentQuantities,
        address _owner,
        address _vault
    )
        external
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
            uint256 vaultBalance = IVault(_vault).getOwnerBalance(
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
        external
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
        external
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
