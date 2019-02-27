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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ExchangeIssueLibrary } from "../../lib/ExchangeIssueLibrary.sol";
import { ExchangeHeaderLibrary } from "../../lib/ExchangeHeaderLibrary.sol";
import { ExchangeValidationLibrary } from "../../lib/ExchangeValidationLibrary.sol";
import { ExchangeWrapperLibrary } from "../../lib/ExchangeWrapperLibrary.sol";
import { IExchangeWrapper } from "../../interfaces/IExchangeWrapper.sol";
import { ModuleCoreState } from "./ModuleCoreState.sol";


/**
 * @title ExchangeExecution
 * @author Set Protocol
 *
 * The ExchangeExecution contract is an inherited contract that sets permissions on certain function calls
 * through the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.
 */
contract ExchangeExecution is
    ModuleCoreState
{
    using SafeMath for uint256;

     /* ============ Private Functions ============ */

    /**
     * Execute the exchange orders by parsing the order data and facilitating the transfers. Each
     * header represents a batch of orders for a particular exchange (0x, Kyber)
     *
     * @param _orderData               Bytes array containing the exchange orders to execute
     */
    function executeExchangeOrders(
        bytes memory _orderData
    )
        internal
    {
        // Bitmask integer of called exchanges. Acts as a lock
        uint256 calledExchanges = 0;
        
        uint256 scannedBytes = 0;
        while (scannedBytes < _orderData.length) {
            // Parse exchange header based on scannedBytes
            ExchangeHeaderLibrary.ExchangeHeader memory header = ExchangeHeaderLibrary.parseExchangeHeader(
                _orderData,
                scannedBytes
            );

            // Get exchange address from state mapping based on header exchange info
            address exchangeWrapper = coreInstance.exchangeIds(header.exchange);

            // Verify exchange address is registered
            require(
                exchangeWrapper != address(0),
                "ExchangeIssueModule.executeExchangeOrders: Invalid or disabled Exchange address"
            );

            // Verify exchange has not already been called
            uint256 exchangeBitIndex = 2 ** header.exchange;
            require(
                (calledExchanges & exchangeBitIndex) == 0,
                "ExchangeIssueModule.executeExchangeOrders: Exchange already called"
            );

            // Calculate the exchange data length
            uint256 exchangeDataLength = header.orderDataBytesLength.add(
                ExchangeHeaderLibrary.EXCHANGE_HEADER_LENGTH()
            );

            // Read the order body based on order data length info in header plus the length of the header
            bytes memory bodyData = ExchangeHeaderLibrary.sliceBodyData(
                _orderData,
                scannedBytes,
                exchangeDataLength
            );

            // Construct the Exchange Data struct for callExchange interface
            ExchangeWrapperLibrary.ExchangeData memory exchangeData = ExchangeWrapperLibrary.ExchangeData({
                caller: msg.sender,
                orderCount: header.orderCount
            });

            // Call Exchange
            ExchangeWrapperLibrary.callExchange(
                core,
                exchangeData,
                exchangeWrapper,
                bodyData
            );

            // Update scanned bytes with header and body lengths
            scannedBytes = scannedBytes.add(exchangeDataLength);

            // Increment bit of current exchange
            calledExchanges = calledExchanges.add(exchangeBitIndex);
        }
    }

    /**
     * Check exchange orders acquire correct amount of tokens and orders do not over use
     * the payment tokens
     *
     * @param  _exchangeIssueData           IssuanceOrder object containing order params
     * @param  _requiredBalances            Array of required balances for each component
     *                                       after exchange orders are executed
     */
    function assertPostExchangeTokenBalances(
        ExchangeIssueLibrary.ExchangeIssueParams memory _exchangeIssueData,
        uint256[] memory _requiredBalances
    )
        internal
        view
    {
        // Check that sender's component tokens in Vault have been incremented correctly
        ExchangeValidationLibrary.validateReceiveTokenBalances(
            vault,
            _exchangeIssueData.receiveTokens,
            _requiredBalances,
            msg.sender
        );
    }

    function transferSentTokensToExchangeWrappers(
        uint8[] memory _sentTokenExchanges,
        address[] memory _sentTokens,
        uint256[] memory _sentTokenAmounts
    )
        internal
    {
        for (uint256 i = 0; i < _sentTokens.length; i++) {
            // Get exchange address from state mapping based on header exchange info
            address exchangeWrapper = coreInstance.exchangeIds(_sentTokenExchanges[i]);

            coreInstance.transferModule(
                _sentTokens[i],
                _sentTokenAmounts[i],
                msg.sender,
                exchangeWrapper
            );
        }
    }

    /**
     * Calculates the's users balance of tokens required after exchange orders have been executed
     *
     * @param  _exchangeIssueData       Exchange Issue object containing exchange data
     * @return uint256[]                Expected token balances after order execution
     */
    function calculateReceiveTokenBalances(
        ExchangeIssueLibrary.ExchangeIssueParams memory _exchangeIssueData
    )
        internal
        view
        returns (uint256[] memory)
    {
        // Calculate amount of component tokens required to issue
        uint256[] memory requiredBalances = new uint256[](_exchangeIssueData.receiveTokens.length);
        for (uint256 i = 0; i < _exchangeIssueData.receiveTokens.length; i++) {
            // Get current vault balances
            uint256 tokenBalance = vaultInstance.getOwnerBalance(
                _exchangeIssueData.receiveTokens[i],
                msg.sender
            );

            // Amount of component tokens to be added to Vault
            uint256 requiredAddition = _exchangeIssueData.receiveTokenAmounts[i];

            // Required vault balances after exchange order executed
            requiredBalances[i] = tokenBalance.add(requiredAddition);
        }

        return requiredBalances;
    }

    /**
     * Validates exchangeIssue inputs
     *
     * @param  _exchangeIssueData       Exchange Issue object containing exchange data
     */
    function validateExchangeIssueParams(
        ExchangeIssueLibrary.ExchangeIssueParams memory _exchangeIssueData
    )
        internal
        view
    {
        // Verify Set was created by Core and is enabled
        require(
            coreInstance.validSets(_exchangeIssueData.setAddress),
            "ExchangeIssueModule.validateOrder: Invalid or disabled SetToken address"
        );

        // Validate sent token data
        ExchangeValidationLibrary.validateSentTokenParams(
            core,
            _exchangeIssueData.sentTokenExchanges,
            _exchangeIssueData.sentTokens,
            _exchangeIssueData.sentTokenAmounts
        );

        // Validate the issue quantity
        ExchangeValidationLibrary.validateIssueQuantity(
            _exchangeIssueData.setAddress,
            _exchangeIssueData.quantity
        );

        // Validate required component fields and amounts
        ExchangeValidationLibrary.validateReceiveTokens(
            _exchangeIssueData.setAddress,
            _exchangeIssueData.receiveTokens,
            _exchangeIssueData.receiveTokenAmounts
        );
    }
}
