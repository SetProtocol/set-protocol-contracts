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
import { ExchangeHeaderLibrary } from "../lib/ExchangeHeaderLibrary.sol";
import { ExchangeInteractLibrary } from "../lib/ExchangeInteractLibrary.sol";
import { ExchangeWrapperLibrary } from "../lib/ExchangeWrapperLibrary.sol";
import { IExchangeWrapper } from "../interfaces/IExchangeWrapper.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title Exchange Issue Module
 * @author Set Protocol
 *
 * The Exchange Issue Module facilitates the exchangeIssue function which allows
 * the issuance of a Set using exchange orders
 */
contract ExchangeIssueModule is
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

    /* ============ Constructor ============ */

    /**
     * Constructor function for ExchangeIssueModule
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
    function exchangeIssue(
        ExchangeInteractLibrary.ExchangeInteractData memory _exchangeInteractData,
        bytes memory _orderData
    )
        public
        nonReentrant
    {
        validateAndExecuteOrders(_exchangeInteractData, _orderData);

        // Issue Set to the caller
        coreInstance.issueModule(
            msg.sender,
            msg.sender,
            _exchangeInteractData.setAddress,
            _exchangeInteractData.quantity
        );

        emit LogExchangeIssue(
            _exchangeInteractData.setAddress,
            msg.sender,
            _exchangeInteractData.quantity,
            _exchangeInteractData.sentTokens,
            _exchangeInteractData.sentTokenAmounts
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Validates exchange interact data, calculates required tokens to receive, sends payment tokens to
     * exchange wrappers, executes orders, and checks post-exchange balances.
     *
     * @param _exchangeInteractData                A Struct containing exchange interact metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function validateAndExecuteOrders(
        ExchangeInteractLibrary.ExchangeInteractData memory _exchangeInteractData,
        bytes memory _orderData
    )
        private
    {
        // Ensures validity of exchangeIssue data parameters
        validateExchangeInteractData(_exchangeInteractData);

        // Validate that all receiveTokens are components
        validateTokensAreComponents(
            _exchangeInteractData.setAddress,
            _exchangeInteractData.receiveTokens
        );

        // Calculate expected component balances to issue after exchange orders executed
        uint256[] memory requiredBalances = calculateReceiveTokenBalances(
            _exchangeInteractData
        );

        // Send the sent tokens to the appropriate exchanges
        transferSentTokensToExchangeWrappers(
            _exchangeInteractData.sentTokenExchangeIds,
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

    /**
     * Transfers sent tokens from the user to the appropriate exchange wrapper
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
}
