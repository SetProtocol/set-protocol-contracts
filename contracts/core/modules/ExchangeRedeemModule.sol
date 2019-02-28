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
import { ExchangeIssueLibrary } from "../lib/ExchangeIssueLibrary.sol";
import { ExchangeHeaderLibrary } from "../lib/ExchangeHeaderLibrary.sol";
import { ExchangeValidationLibrary } from "../lib/ExchangeValidationLibrary.sol";
import { ExchangeWrapperLibrary } from "../lib/ExchangeWrapperLibrary.sol";
import { IExchangeWrapper } from "../interfaces/IExchangeWrapper.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title Exchange Redeem Module
 * @author Set Protocol
 *
 * The Exchange Redeem Module facilitates the exchangeRedeem function which allows
 * the redemption of a Set using exchange orders into specified tokens
 */
contract ExchangeRedeemModule is
    ModuleCoreState,
    ExchangeExecution,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event LogRedeemIssue(
        address setAddress,
        address indexed callerAddress,
        uint256 quantity,
        address[] receiveTokens,
        uint256[] receiveTokenAmounts
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for ExchangeRedeemModule
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
     * @param _exchangeInteractData                A Struct containing exchange interact metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function exchangeRedeem(
        ExchangeIssueLibrary.ExchangeIssueParams memory _exchangeInteractData,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        // Validate ExchangeRedeemParams
        validateExchangeIssueParams(_exchangeInteractData);
        validateSentTokensAreComponents(_exchangeInteractData);

        // Redeem Set to this contract in the vault
        coreInstance.redeemModule(
            msg.sender,
            address(this),
            _exchangeInteractData.setAddress,
            _exchangeInteractData.quantity
        );

        executeOrders(_exchangeInteractData, _orderData);

        // Withdraw Sent tokens to the user
        coreInstance.batchWithdrawModule(
            msg.sender,
            msg.sender,
            _exchangeInteractData.receiveTokens,
            _exchangeInteractData.receiveTokenAmounts
        );

        emit LogRedeemIssue(
            _exchangeInteractData.setAddress,
            msg.sender,
            _exchangeInteractData.quantity,
            _exchangeInteractData.sentTokens,
            _exchangeInteractData.sentTokenAmounts
        );
    }

    /**
     * Validates exchange interact data, calculates required tokens to receive, sends payment tokens to
     * exchange wrappers, executes orders, and checks post-exchange balances.
     *
     * @param _exchangeInteractData                A Struct containing exchange interact metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function executeOrders(
        ExchangeIssueLibrary.ExchangeIssueParams memory _exchangeInteractData,
        bytes memory _orderData
    )
        private
    {
        // Calculate expected component balances to issue after exchange orders executed
        uint256[] memory requiredBalances = calculateReceiveTokenBalances(
            _exchangeInteractData
        );

        // Send the sent tokens to the appropriate exchanges
        withdrawSentTokensFromVaultToExchangeWrappers(
            _exchangeInteractData.sentTokenExchanges,
            _exchangeInteractData.sentTokens,
            _exchangeInteractData.sentTokenAmounts
        );

        // Execute exchange orders
        executeExchangeOrders(_orderData);

        // Check that the correct amount of tokens were sourced using payment token
        assertPostExchangeReceiveBalances(
            _exchangeInteractData,
            requiredBalances
        );
    }

    function withdrawSentTokensFromVaultToExchangeWrappers(
        uint8[] memory _sentTokenExchanges,
        address[] memory _sentTokens,
        uint256[] memory _sentTokenAmounts
    )
        internal
    {
        address[] memory exchangeWrappers;

        for (uint256 i = 0; i < _sentTokens.length; i++) {
            // Get exchange address from state mapping based on header exchange info
            address exchangeWrapper = coreInstance.exchangeIds(_sentTokenExchanges[i]);

            coreInstance.withdrawModule(
                address(this),
                exchangeWrapper,
                _sentTokens[i],
                _sentTokenAmounts[i]
            );
        }
    }

    function validateSentTokensAreComponents(
         ExchangeIssueLibrary.ExchangeIssueParams memory _exchangeInteractData
    )
        internal
        view
    {
        address[] memory sentTokens = _exchangeInteractData.sentTokens;
        address setAddress = _exchangeInteractData.setAddress;
        for (uint256 i = 0; i < sentTokens.length; i++) {
            // Make sure all required components are members of the Set
            require(
                ISetToken(setAddress).tokenIsComponent(sentTokens[i]),
                "ExchangeRedeemModule.validateSentTokensAreComponents: Component must be a member of Set"
            );

        }
    }
}
