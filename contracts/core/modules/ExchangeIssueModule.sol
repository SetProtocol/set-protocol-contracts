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

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ExchangeIssueLibrary } from "../lib/ExchangeIssueLibrary.sol";
import { ExchangeHeaderLibrary } from "../lib/ExchangeHeaderLibrary.sol";
import { ExchangeValidationLibrary } from "../lib/ExchangeValidationLibrary.sol";
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
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event LogExchangeIssue(
        address setAddress,
        address indexed callerAddress,
        address paymentToken,
        uint256 quantity,
        uint256 paymentTokenAmount
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for ExchangeIssueModule
     *
     * @param _core                The address of Core
     * @param _transferProxy       The address of transferProxy
     * @param _vault               The address of Vault
     */
    constructor(
        address _core,
        address _transferProxy,
        address _vault
    )
        public
        ModuleCoreState(
            _core,
            _transferProxy,
            _vault
        )
    {}

    /* ============ External Functions ============ */

    /**
     * Performs trades via exchange wrappers to acquire components and issues a Set to the caller
     *
     * @param _exchangeIssueData                   A Struct containing exchange issue metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function exchangeIssue(
        ExchangeIssueLibrary.ExchangeIssueParams memory _exchangeIssueData,
        bytes _orderData
    )
        public
        nonReentrant
    {        
        // Ensures validity of exchangeIssue data parameters
        validateExchangeIssue(_exchangeIssueData);

        // Calculate expected component balances to issue after exchange orders executed
        uint256[] memory requiredBalances = calculateRequiredTokenBalances(
            _exchangeIssueData
        );

        // Execute exchange orders
        uint256 paymentokenAmountUsed = executeExchangeOrders(
            _orderData,
            _exchangeIssueData.paymentToken
        );

        // Check that the correct amount of tokens were sourced using payment token
        assertPostExchangeTokenBalances(
            _exchangeIssueData,
            requiredBalances,
            paymentokenAmountUsed
        );

        // Issue Set to the caller
        coreInstance.issueModule(
            msg.sender,
            msg.sender,
            _exchangeIssueData.setAddress,
            _exchangeIssueData.quantity
        );

        emit LogExchangeIssue(
            _exchangeIssueData.setAddress,
            msg.sender,
            _exchangeIssueData.paymentToken,
            _exchangeIssueData.quantity,
            _exchangeIssueData.paymentTokenAmount
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Execute the exchange orders by parsing the order data and facilitating the transfers. Each
     * header represents a batch of orders for a particular exchange (0x, Kyber)
     *
     * @param _orderData               Bytes array containing the exchange orders to execute
     * @param _paymentTokenAddress     Address of payment token to use to execute exchange orders
     * @return paymentTokenUsed        Amount of payment token used to execute orders
     */
    function executeExchangeOrders(
        bytes _orderData,
        address _paymentTokenAddress
    )
        private
        returns (uint256)
    {
        uint256 scannedBytes = 0;
        uint256 paymentTokenUsed = 0;
        while (scannedBytes < _orderData.length) {
            // Parse exchange header based on scannedBytes
            ExchangeHeaderLibrary.ExchangeHeader memory header = ExchangeHeaderLibrary.parseExchangeHeader(
                _orderData,
                scannedBytes
            );

            // Get exchange address from state mapping based on header exchange info
            address exchangeWrapper = coreInstance.exchanges(header.exchange);

            // Verify exchange address is registered
            require(
                exchangeWrapper != address(0),
                "ExchangeIssueModule.executeExchangeOrders: Invalid or disabled Exchange address"
            );

            // Read the order body based on order data length info in header plus the length of the header (128)
            uint256 exchangeDataLength = header.orderDataBytesLength.add(128);
            bytes memory bodyData = ExchangeHeaderLibrary.sliceBodyData(
                _orderData,
                scannedBytes,
                exchangeDataLength
            );

            // Transfer maker token to Exchange Wrapper to execute exchange orders
            // Using maker token from signed issuance order to prevent malicious encoding of another maker token
            transferProxyInstance.transfer(
                _paymentTokenAddress,
                header.makerTokenAmount,
                msg.sender,
                exchangeWrapper
            );

            // Construct the Exchange Data struct for callExchange interface
            ExchangeWrapperLibrary.ExchangeData memory exchangeData = ExchangeWrapperLibrary.ExchangeData({
                maker: msg.sender,
                taker: msg.sender,
                makerToken: _paymentTokenAddress,
                makerAssetAmount: header.makerTokenAmount,
                orderCount: header.orderCount,
                fillQuantity: header.makerTokenAmount,
                attemptedFillQuantity: header.makerTokenAmount
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
            paymentTokenUsed = paymentTokenUsed.add(header.makerTokenAmount);
        }

        return paymentTokenUsed;
    }

    /**
     * Check exchange orders acquire correct amount of tokens and orders do not over use
     * the payment tokens
     *
     * @param  _exchangeIssueData           IssuanceOrder object containing order params
     * @param  _requiredBalances            Array of required balances for each component
                                              after exchange orders are executed
     * @param  _paymentTokenAmountUsed      Amount of maker token used to source tokens
     */
    function assertPostExchangeTokenBalances(
        ExchangeIssueLibrary.ExchangeIssueParams _exchangeIssueData,
        uint256[] _requiredBalances,
        uint256 _paymentTokenAmountUsed
    )
        private
        view
    {
        // Verify maker token used is less than amount allocated
        ExchangeValidationLibrary.validateTokenUsage(
            _paymentTokenAmountUsed,
            _exchangeIssueData.paymentTokenAmount
        );

        // Check that sender's component tokens in Vault have been incremented correctly
        ExchangeValidationLibrary.validateRequiredComponentBalances(
            vault,
            _exchangeIssueData.requiredComponents,
            _requiredBalances,
            msg.sender
        );   
    }

    /**
     * Calculates the's users balance of tokens required after exchange orders have been executed
     *
     * @param  _exchangeIssueData       Exchange Issue object containing exchange data
     * @return uint256[]                Expected token balances after order execution
     */
    function calculateRequiredTokenBalances(
        ExchangeIssueLibrary.ExchangeIssueParams _exchangeIssueData
    )
        private
        view
        returns (uint256[])
    {
        // Calculate amount of component tokens required to issue
        uint256[] memory requiredBalances = new uint256[](_exchangeIssueData.requiredComponents.length);
        for (uint256 i = 0; i < _exchangeIssueData.requiredComponents.length; i++) {
            // Get current vault balances
            uint256 tokenBalance = vaultInstance.getOwnerBalance(
                _exchangeIssueData.requiredComponents[i],
                msg.sender
            );

            // Amount of component tokens to be added to Vault
            uint256 requiredAddition = _exchangeIssueData.requiredComponentAmounts[i];

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
    function validateExchangeIssue(
        ExchangeIssueLibrary.ExchangeIssueParams _exchangeIssueData
    )
        private
        view
    {
        // Verify Set was created by Core and is enabled
        require(
            coreInstance.validSets(_exchangeIssueData.setAddress),
            "ExchangeIssueModule.validateOrder: Invalid or disabled SetToken address"
        );

        // Make sure payment Token amount is greater than 0
        require(
            _exchangeIssueData.paymentTokenAmount > 0,
            "ExchangeIssueModule.validateOrder: Maker token amount must be positive"
        );

        // Validate the issue quantity
        ExchangeValidationLibrary.validateIssueQuantity(
            _exchangeIssueData.setAddress,
            _exchangeIssueData.quantity
        );

        // Validate required component fields and amounts
        ExchangeValidationLibrary.validateRequiredComponents(
            _exchangeIssueData.setAddress,
            _exchangeIssueData.requiredComponents,
            _exchangeIssueData.requiredComponentAmounts
        );
    }
}
