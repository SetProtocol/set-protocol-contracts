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

import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";


/**
 * @title ExchangeValidationLibrary
 * @author Set Protocol
 *
 * The ExchangeValidationLibrary contains functions for validating exchange order data
 */
library ExchangeValidationLibrary {

    /**
     * Validates that the quantity to issue is positive and a multiple of the Set natural unit.
     *
     * @param _set                The address of the Set
     * @param _quantity           The quantity of Sets to issue
     */
    function validateIssueQuantity(
        address _set,
        uint256 _quantity
    )
        internal
        view
    {
        // Make sure quantity to issue is greater than 0
        require(
            _quantity > 0,
            "ExchangeValidationLibrary.validateIssueQuantity: Quantity must be positive"
        );

        // Make sure Issue quantity is multiple of the Set natural unit
        require(
            _quantity % ISetToken(_set).naturalUnit() == 0,
            "ExchangeValidationLibrary.validateIssueQuantity: Quantity must be multiple of natural unit"
        );
    }

    /**
     * Validates that the required Components and amounts are valid components and positive
     *
     * @param _set                          The address of the Set
     * @param _requiredComponents           The addresses of components required for issuance
     * @param _requiredComponentAmounts     The quantities of components required for issuance
     */
    function validateRequiredComponents(
        address _set,
        address[] _requiredComponents,
        uint256[] _requiredComponentAmounts
    )
        internal
        view
    {
        uint256 requiredComponentsCount = _requiredComponents.length;

        // Make sure required components array is non-empty
        require(
            requiredComponentsCount > 0,
            "ExchangeValidationLibrary.validateRequiredComponents: Required components must not be empty"
        );

        // Make sure required components and required component amounts are equal length
        require(
            requiredComponentsCount == _requiredComponentAmounts.length,
            "ExchangeValidationLibrary.validateRequiredComponents: Required components and amounts must be equal length"
        );

        for (uint256 i = 0; i < requiredComponentsCount; i++) {
            // Make sure all required components are members of the Set
            require(
                ISetToken(_set).tokenIsComponent(_requiredComponents[i]),
                "ExchangeValidationLibrary.validateRequiredComponents: Component must be a member of Set");

            // Make sure all required component amounts are non-zero
            require(
                _requiredComponentAmounts[i] > 0,
                "ExchangeValidationLibrary.validateRequiredComponents: Component amounts must be positive"
            );
        }
    }

    /**
     * Validates that the tokens used during issuance does not exceed tokens available
     *
     * @param _tokensUsed                The quantities of payment or maker token used
     * @param _tokensAvailable           The quantities of payment or maker token available
     */
    function validateTokenUsage(
        uint256 _tokensUsed,
        uint256 _tokensAvailable
    )
        internal
        view
    {
        // Verify token used is less than amount allocated
        require(
            _tokensUsed <= _tokensAvailable,
            "ExchangeValidationLibrary.validateTokenUsage: Payment token used exceeds allotted limit"
        );
    }

    /**
     * Validates that the tokens used during issuance does not exceed tokens available
     *
     * @param _vault                        The address of the Vault
     * @param _requiredComponents           The addresses of components required for issuance
     * @param _requiredBalances             The quantities of components required for issuance
     * @param _userToCheck                  The address of the user
     */
    function validateRequiredComponentBalances(
        address _vault,
        address[] _requiredComponents,
        uint256[] _requiredBalances,
        address _userToCheck
    )
        internal
        view
    {
        // Get vault instance
        IVault vault = IVault(_vault);

        // Check that maker's component tokens in Vault have been incremented correctly
        for (uint256 i = 0; i < _requiredComponents.length; i++) {
            uint256 currentBal = vault.getOwnerBalance(
                _requiredComponents[i],
                _userToCheck
            );

            require(
                currentBal >= _requiredBalances[i],
                "ExchangeValidationLibrary.validateRequiredComponentBalances: Insufficient component tokens acquired"
            );
        }
    }
}