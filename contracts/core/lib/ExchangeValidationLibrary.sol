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

import { ICore } from "../interfaces/ICore.sol";
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
     * @param _receiveTokens           The addresses of components required for issuance
     * @param _receiveTokenAmounts     The quantities of components required for issuance
     */
    function validateReceiveTokens(
        address _set,
        address[] memory _receiveTokens,
        uint256[] memory _receiveTokenAmounts
    )
        internal
        view
    {
        uint256 receiveTokensCount = _receiveTokens.length;

        // Make sure required components array is non-empty
        require(
            receiveTokensCount > 0,
            "ExchangeValidationLibrary.validateReceiveTokens: Receive tokens must not be empty"
        );

        // Make sure required components and required component amounts are equal length
        require(
            receiveTokensCount == _receiveTokenAmounts.length,
            "ExchangeValidationLibrary.validateReceiveTokens: Receive tokens and amounts must be equal length"
        );

        for (uint256 i = 0; i < receiveTokensCount; i++) {
            // Make sure all required component amounts are non-zero
            require(
                _receiveTokenAmounts[i] > 0,
                "ExchangeValidationLibrary.validateReceiveTokens: Component amounts must be positive"
            );
        }
    }

    /**
     * Validates that the tokens used during issuance does not exceed tokens available
     *
     * @param _vault                        The address of the Vault
     * @param _receiveTokens           The addresses of components required for issuance
     * @param _requiredBalances             The quantities of components required for issuance
     * @param _userToCheck                  The address of the user
     */
    function validateReceiveTokenBalances(
        address _vault,
        address[] memory _receiveTokens,
        uint256[] memory _requiredBalances,
        address _userToCheck
    )
        internal
        view
    {
        // Get vault instance
        IVault vault = IVault(_vault);

        // Check that caller's receive tokens in Vault have been incremented correctly
        for (uint256 i = 0; i < _receiveTokens.length; i++) {
            uint256 currentBal = vault.getOwnerBalance(
                _receiveTokens[i],
                _userToCheck
            );

            require(
                currentBal >= _requiredBalances[i],
                "ExchangeValidationLibrary.validateReceiveTokenBalances: Insufficient receive tokens acquired"
            );
        }
    }

    /**
     * Validates that the sent tokens inputs are valid
     *
     * @param _core                         The address of Core
     * @param _sentTokenExchanges           The list of integers representing exchanges wrappers
     * @param _sentTokens                   The address of the sent tokens
     * @param _sentTokenAmounts             The quantities of sent tokens
     */
    function validateSentTokenParams(
        address _core,
        uint8[] memory _sentTokenExchanges,
        address[] memory _sentTokens,
        uint256[] memory _sentTokenAmounts
    )
        internal
        view
    {
        require(
            _sentTokenExchanges.length == _sentTokens.length && 
            _sentTokens.length == _sentTokenAmounts.length,
            "ExchangeValidationLibrary.validateSentTokenParams: Sent token inputs must be of the same length"
        );

        for (uint256 i = 0; i < _sentTokenExchanges.length; i++) {
            // Make sure all exchanges are valid
            require(
                ICore(_core).exchangeIds(_sentTokenExchanges[i]) != address(0),
                "ExchangeValidationLibrary.validateSentTokenParams: Must be valid exchange"
            );

            // Make sure all sent token amounts are non-zero
            require(
                _sentTokenAmounts[i] > 0,
                "ExchangeValidationLibrary.validateSentTokenParams: Sent amounts must be positive"
            );
        }
    }

  /**
     * Validates that passed in tokens are all components of the Set
     *
     * @param _setAddress               Address of the Set
     * @param _tokens                   List of tokens to check
     */
    function validateTokensAreComponents(
        address _set,
        address[] memory _tokens
    )
        internal
        view
    {
        for (uint256 i = 0; i < _tokens.length; i++) {
            // Make sure all required tokens are members of the Set
            require(
                ISetToken(_set).tokenIsComponent(_tokens[i]),
                "ExchangeValidationLibrary.validateTokensAreComponents: Component must be a member of Set"
            );

        }
    }
}
