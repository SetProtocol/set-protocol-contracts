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
pragma experimental "ABIEncoderV2";

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ExchangeExecution } from "./lib/ExchangeExecution.sol";
import { ExchangeIssuanceLibrary } from "../lib/ExchangeIssuanceLibrary.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title ExchangeIssuanceModule
 * @author Set Protocol
 *
 * The Exchange Issue Module facilitates the exchangeIssue function which allows
 * the issuance of a Set using exchange orders
 */
contract ExchangeIssuanceModule is
    ModuleCoreState,
    ExchangeExecution,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event LogExchangeIssue(
        address setAddress,
        address indexed callerAddress,
        uint256 quantity,
        address[] sentTokens,
        uint256[] sentTokenAmounts
    );

    event LogExchangeRedeem(
        address setAddress,
        address indexed callerAddress,
        uint256 quantity,
        address[] receiveTokens,
        uint256[] receiveTokenAmounts
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for ExchangeIssuanceModule
     *
     * @param _core                The address of Core
     * @param _vault               The address of Vault
     */
    constructor(
        address _core,
        address _vault
    )
        public
        ModuleCoreState(
            _core,
            _vault
        )
    {}

    /* ============ Public Functions ============ */

    /**
     * Performs trades via exchange wrappers to acquire components and issues a Set to the caller
     *
     * @param _exchangeIssuanceParams                A Struct containing exchange interact metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function exchangeIssue(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        // Ensures validity of exchangeIssue data parameters
        validateExchangeIssuanceParams(_exchangeIssuanceParams);

        // Validate that all receiveTokens are components
        validateTokensAreComponents(
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.receiveTokens
        );

        // Send the sent tokens to the appropriate exchanges
        transferSentTokensToExchangeWrappers(
            _exchangeIssuanceParams.sentTokenExchangeIds,
            _exchangeIssuanceParams.sentTokens,
            _exchangeIssuanceParams.sentTokenAmounts
        );

        executeOrders(_exchangeIssuanceParams, _orderData);

        // Issue Set to the caller
        coreInstance.issueModule(
            msg.sender,
            msg.sender,
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.quantity
        );

        emit LogExchangeIssue(
            _exchangeIssuanceParams.setAddress,
            msg.sender,
            _exchangeIssuanceParams.quantity,
            _exchangeIssuanceParams.sentTokens,
            _exchangeIssuanceParams.sentTokenAmounts
        );
    }

    /**
     * Redeems a Set and performs trades via exchange wrappers to acquire receive tokens to the caller
     *
     * @param _exchangeIssuanceParams                A Struct containing exchange interact metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function exchangeRedeem(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        // Validate ExchangeRedeemParams
        validateExchangeIssuanceParams(_exchangeIssuanceParams);

        // Validate that all sentTokens are components
        validateTokensAreComponents(
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.sentTokens
        );

        // Redeem Set to this contract in the vault
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.quantity
        );

        // Send the sent tokens to the appropriate exchanges
        withdrawSentTokensFromVaultToExchangeWrappers(
            _exchangeIssuanceParams.sentTokenExchangeIds,
            _exchangeIssuanceParams.sentTokens,
            _exchangeIssuanceParams.sentTokenAmounts
        );

        // Executes the orders, depositing tokens into the Vault to the user
        executeOrders(_exchangeIssuanceParams, _orderData);

        // Withdraw Sent tokens from the Vault to the user
        coreInstance.batchWithdrawModule(
            msg.sender,
            msg.sender,
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );

        emit LogExchangeRedeem(
            _exchangeIssuanceParams.setAddress,
            msg.sender,
            _exchangeIssuanceParams.quantity,
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Validates exchange interact data, calculates required tokens to receive, sends payment tokens to
     * exchange wrappers, executes orders, and checks post-exchange balances.
     *
     * @param _exchangeIssuanceParams                A Struct containing exchange interact metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function executeOrders(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams,
        bytes memory _orderData
    )
        private
    {
        // Calculate expected component balances to issue after exchange orders executed
        uint256[] memory requiredBalances = calculateReceiveTokenBalances(
            _exchangeIssuanceParams
        );

        // Execute exchange orders
        executeExchangeOrders(_orderData);

        // Check that sender's component tokens in Vault have been incremented correctly
        ExchangeIssuanceLibrary.validatePostExchangeReceiveTokenBalances(
            vault,
            _exchangeIssuanceParams.receiveTokens,
            requiredBalances,
            msg.sender
        );
    }

    /**
     * Transfers sent tokens from the user to the appropriate exchange wrapper. Used in exchange
     * issue.
     *
     * @param _sentTokenExchangeIds              Array of integers corresponding to Exchange wrapper Ids
     * @param _sentTokens                      Array of addresses of the payment tokens
     * @param _sentTokenAmounts                Array of amounts of sent Tokens
     */
    function transferSentTokensToExchangeWrappers(
        uint8[] memory _sentTokenExchangeIds,
        address[] memory _sentTokens,
        uint256[] memory _sentTokenAmounts
    )
        private
    {
        for (uint256 i = 0; i < _sentTokens.length; i++) {
            // Get exchange address from state mapping based on header exchange info
            address exchangeWrapper = coreInstance.exchangeIds(_sentTokenExchangeIds[i]);

            coreInstance.transferModule(
                _sentTokens[i],
                _sentTokenAmounts[i],
                msg.sender,
                exchangeWrapper
            );
        }
    }

    /**
     * Transfers sent tokens from the Vault to the appropriate exchange wrappers. Used in
     * exchange redeem.
     *
     * @param _sentTokenExchangeIds              Array of integers corresponding to Exchange wrapper Ids
     * @param _sentTokens                      Array of addresses of the payment tokens
     * @param _sentTokenAmounts                Array of amounts of sent Tokens
     */
    function withdrawSentTokensFromVaultToExchangeWrappers(
        uint8[] memory _sentTokenExchangeIds,
        address[] memory _sentTokens,
        uint256[] memory _sentTokenAmounts
    )
        private
    {
        for (uint256 i = 0; i < _sentTokens.length; i++) {
            // Get exchange address from state mapping based on header exchange info
            address exchangeWrapper = coreInstance.exchangeIds(_sentTokenExchangeIds[i]);

            // Withdraw sent tokens from vault (owned by this contract) to the exchange wrapper
            coreInstance.withdrawModule(
                address(this),
                exchangeWrapper,
                _sentTokens[i],
                _sentTokenAmounts[i]
            );
        }
    }
}
