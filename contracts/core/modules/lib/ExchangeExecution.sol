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

pragma solidity 0.5.7;

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

import { ExchangeHeaderLibrary } from "../../lib/ExchangeHeaderLibrary.sol";
import { ExchangeIssuanceLibrary } from "./ExchangeIssuanceLibrary.sol";
import { ExchangeWrapperLibrary } from "../../lib/ExchangeWrapperLibrary.sol";
import { ExchangeWrapperLibraryV2 } from "../../lib/ExchangeWrapperLibraryV2.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { ModuleCoreState } from "./ModuleCoreState.sol";


/**
 * @title ExchangeExecution
 * @author Set Protocol
 *
 * The ExchangeExecution contract exposes functions that allow validation and execution of exchange orders.
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
        // Bitmask integer of called exchanges. Acts as a lock so that duplicate exchange headers are not passed in.
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
                "ExchangeExecution.executeExchangeOrders: Invalid or disabled Exchange address"
            );

            // Verify exchange has not already been called
            uint256 exchangeBitIndex = CommonMath.safePower(2, header.exchange);
            require(
                (calledExchanges & exchangeBitIndex) == 0,
                "ExchangeExecution.executeExchangeOrders: Exchange already called"
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
            ExchangeWrapperLibraryV2.ExchangeData memory exchangeData = ExchangeWrapperLibraryV2.ExchangeData({
                caller: msg.sender,
                orderCount: header.orderCount
            });

            // Execute orders using the appropriate exchange wrappers
            ExchangeWrapperLibrary.callExchange(
                core,
                exchangeData,
                exchangeWrapper,
                bodyData
            );

            // Update scanned bytes with header and body lengths
            scannedBytes = scannedBytes.add(exchangeDataLength);

            // Increment bit of current exchange to ensure non-duplicate entries
            calledExchanges = calledExchanges.add(exchangeBitIndex);
        }
    }

    /**
     * Calculates the user's balance of tokens required after exchange orders have been executed
     *
     * @param  _exchangeIssuanceParams       A Struct containing exchange issuance metadata
     * @return uint256[]                     Expected token balances after order execution
     */
    function calculateReceiveTokenBalances(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams
    )
        internal
        view
        returns (uint256[] memory)
    {
        // Calculate amount of receive tokens required
        uint256[] memory requiredBalances = new uint256[](_exchangeIssuanceParams.receiveTokens.length);
        for (uint256 i = 0; i < _exchangeIssuanceParams.receiveTokens.length; i++) {
            // Get the user's current vault balances
            uint256 tokenBalance = vaultInstance.getOwnerBalance(
                _exchangeIssuanceParams.receiveTokens[i],
                msg.sender
            );

            // Amount of receive tokens to be added to Vault
            uint256 requiredAddition = _exchangeIssuanceParams.receiveTokenAmounts[i];

            // Required vault balances after exchange order execution
            requiredBalances[i] = tokenBalance.add(requiredAddition);
        }

        return requiredBalances;
    }

    /**
     * Validates exchangeIssueParam inputs
     *
     * @param  _exchangeIssuanceParams       A Struct containing exchange issuance metadata
     */
    function validateExchangeIssuanceParams(
        ExchangeIssuanceLibrary.ExchangeIssuanceParams memory _exchangeIssuanceParams
    )
        internal
        view
    {
        // Verify Set was created by Core and is enabled
        require(
            coreInstance.validSets(_exchangeIssuanceParams.setAddress),
            "ExchangeExecution.validateExchangeIssuanceParams: Invalid or disabled SetToken address"
        );

        // Validate the issuance quantity
        ExchangeIssuanceLibrary.validateQuantity(
            _exchangeIssuanceParams.setAddress,
            _exchangeIssuanceParams.quantity
        );

        // Validate send token data
        ExchangeIssuanceLibrary.validateSendTokenParams(
            core,
            _exchangeIssuanceParams.sendTokenExchangeIds,
            _exchangeIssuanceParams.sendTokens,
            _exchangeIssuanceParams.sendTokenAmounts
        );

        // Validate receive token inputs
        ExchangeIssuanceLibrary.validateReceiveTokens(
            _exchangeIssuanceParams.receiveTokens,
            _exchangeIssuanceParams.receiveTokenAmounts
        );
    }
}
