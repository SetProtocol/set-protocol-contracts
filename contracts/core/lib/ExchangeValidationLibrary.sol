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
 * The ExchangeValidationLibrary contains functions for validating exchange order information
 */
library ExchangeValidationLibrary {

    function validateIssueQuantity(
        ISetToken _set,
        uint256 _quantity
    )
        public
        view
    {
       // Make sure quantity to issue is greater than 0
        require(
            _quantity > 0,
            "ExchangeValidationLibrary.validateIssueQuantity: Quantity must be positive"
        );

        // Make sure IssuanceOrder quantity is multiple of natural unit
        require(
            _quantity % _set.naturalUnit() == 0,
            "ExchangeValidationLibrary.validateIssueQuantity: Quantity must be multiple of natural unit"
        );
    }

    function validateRequiredComponents(
        ISetToken _set,
        address[] _requiredComponents,
        uint256[] _requiredComponentAmounts
    )
        public
        view
    {
        // Make sure required components array is non-empty
        require(
            _requiredComponents.length > 0,
            "ExchangeValidationLibrary.validateRequiredComponents: Required components must not be empty"
        );

        // Make sure required components and required component amounts are equal length
        require(
            _requiredComponents.length == _requiredComponentAmounts.length,
            "ExchangeValidationLibrary.validateRequiredComponents: Required components and amounts must be equal length"
        );

        for (uint256 i = 0; i < _requiredComponents.length; i++) {
            // Make sure all required components are members of the Set
            require(
                _set.tokenIsComponent(_requiredComponents[i]),
                "ExchangeValidationLibrary.validateRequiredComponents: Component must be a member of Set");

            // Make sure all required component amounts are non-zero
            require(
                _requiredComponentAmounts[i] > 0,
                "ExchangeValidationLibrary.validateRequiredComponents: Component amounts must be positive"
            );
        }
    }

    function validateTokenUsage(
        uint256 _tokensUsed,
        uint256 _requiredTokens
    )
        public
        view
    {
        // Verify token used is less than amount allocated
        require(
            _tokensUsed <= _requiredTokens,
            "ExchangeValidationLibrary.validateTokenUsage: Payment token used exceeds allotted limit"
        );
    }

    function validateRequiredComponentBalances(
        IVault _vaultInstance,
        address[] _requiredComponents,
        uint256[] _requiredBalances,
        address _userToCheck
    )
        public
        view
    {
        // Check that maker's component tokens in Vault have been incremented correctly
        for (uint256 i = 0; i < _requiredComponents.length; i++) {
            uint256 currentBal = _vaultInstance.getOwnerBalance(
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