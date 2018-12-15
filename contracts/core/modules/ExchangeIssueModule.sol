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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ExchangeHeaderLibrary } from "../lib/ExchangeHeaderLibrary.sol";
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
    using Math for uint256;

    /* ============ State Variables ============ */

    /* ============ Struct ============ */

    struct ExchangeIssue {
        address setAddress;
        address paymentToken;
        uint256 paymentTokenAmount;
        uint256 quantity;
        address[] requiredComponents;
        uint256[] requiredComponentAmounts;
    }

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
     * Fill an issuance order
     *
     */
    function exchangeIssue(
        ExchangeIssue memory _exchangeIssueData,
        bytes _orderData
    )
        public
        nonReentrant
    {        
        validateExchangeIssue(_exchangeIssueData);

        // Calculate require balances to issue after exchange orders executed
        uint256[] memory requiredBalances = calculateRequiredTokenBalances(
            _exchangeIssueData
        );

        // Execute exchange orders
        uint256 paymentokenAmountUsed = executeExchangeOrders(
            _orderData,
            _exchangeIssueData.paymentToken
        );

        // Check that the correct amount of tokens were sourced using allotment of maker token
        assertPostExchangeTokenBalances(
            _exchangeIssueData,
            requiredBalances,
            paymentokenAmountUsed
        );

        // Issue Set
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
     * header represents a batch of orders for a particular exchange (0x, Kyber, taker)
     *
     * @param _orderData               Bytes array containing the exchange orders to execute
     * @param _paymentTokenAddress       Address of maker token to use to execute exchange orders
     * @return makerTokenUsed          Amount of maker token used to execute orders
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

            // Parse next exchange header based on scannedBytes
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
            bytes memory bodyData = LibBytes.slice(
                _orderData,
                scannedBytes.add(128),
                scannedBytes.add(exchangeDataLength)
            );

            // Transfer maker token to Exchange Wrapper to execute exchange orders
            // Using maker token from signed issuance order to prevent malicious encoding of another maker token
            transferProxyInstance.transfer(
                _paymentTokenAddress,
                header.makerTokenAmount,
                msg.sender,
                exchangeWrapper
            );

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
            callExchange(
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
     * Calls exchange to execute trades and deposits fills into Vault for issuanceOrder maker.
     *
     *
     * @param  _exchangeData            Standard exchange wrapper interface object containing exchange metadata
     * @param  _exchange                Address of exchange wrapper being called
     * @param  _bodyData                Arbitrary bytes data for orders to be executed on exchange
     */
    function callExchange(
        ExchangeWrapperLibrary.ExchangeData memory _exchangeData,
        address _exchange,
        bytes _bodyData
    )
        private
    {
        // Call Exchange
        address[] memory componentFillTokens = new address[](_exchangeData.orderCount);
        uint256[] memory componentFillAmounts = new uint256[](_exchangeData.orderCount);
        (componentFillTokens, componentFillAmounts) = IExchangeWrapper(_exchange).exchange(
            _exchangeData,
            _bodyData
        );

        // Transfer component tokens from wrapper to vault
        coreInstance.batchDepositModule(
            _exchange,
            _exchangeData.maker,
            componentFillTokens,
            componentFillAmounts
        );        
    }

    /**
     * Check exchange orders acquire correct amount of tokens and taker doesn't over use
     * the issuance order maker's tokens
     *
     * @param  _exchangeIssueData                       IssuanceOrder object containing order params
     * @param  _requiredBalances            Array of required balances for each component
                                            after exchange orders are executed
     * @param  _paymentTokenAmountUsed        Amount of maker token used to source tokens
     */
    function assertPostExchangeTokenBalances(
        ExchangeIssue _exchangeIssueData,
        uint256[] _requiredBalances,
        uint256 _paymentTokenAmountUsed
    )
        private
        view
    {
        // Verify maker token used is less than amount allocated that user signed
        require(
            _paymentTokenAmountUsed <= _exchangeIssueData.paymentTokenAmount,
            "ExchangeIssueModule.settleOrder: Maker token used exceeds allotted limit"
        );

        // Check that maker's component tokens in Vault have been incremented correctly
        for (uint256 i = 0; i < _exchangeIssueData.requiredComponents.length; i++) {
            uint256 currentBal = vaultInstance.getOwnerBalance(
                _exchangeIssueData.requiredComponents[i],
                msg.sender
            );
            require(
                currentBal >= _requiredBalances[i],
                "ExchangeIssueModule.settleOrder: Insufficient component tokens acquired"
            );
        }        
    }

    /**
     * Check exchange orders acquire correct amount of tokens and taker doesn't over use
     * the issuance order maker's tokens
     *
     * @return uint256[]                Array of required token balances after order execution
     */
    function calculateRequiredTokenBalances(
        ExchangeIssue _exchangeIssueData
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

    function validateExchangeIssue(
        ExchangeIssue _exchangeIssueData
    )
        private
        view
    {
        // Declare set interface variable
        ISetToken set = ISetToken(_exchangeIssueData.setAddress);

        // Verify Set was created by Core and is enabled
        require(
            coreInstance.validSets(_exchangeIssueData.setAddress),
            "ExchangeIssueModule.validateOrder: Invalid or disabled SetToken address"
        );

        // Make sure makerTokenAmount is greater than 0
        require(
            _exchangeIssueData.paymentTokenAmount > 0,
            "ExchangeIssueModule.validateOrder: Maker token amount must be positive"
        );

        // Make sure quantity to issue is greater than 0
        require(
            _exchangeIssueData.quantity > 0,
            "ExchangeIssueModule.validateOrder: Quantity must be positive"
        );

        // Declare set interface variable
        uint256 setNaturalUnit = set.naturalUnit();

        // Make sure IssuanceOrder quantity is multiple of natural unit
        require(
            _exchangeIssueData.quantity % setNaturalUnit == 0,
            "ExchangeIssueModule.validateOrder: Quantity must be multiple of natural unit"
        );

        address[] memory requiredComponents = _exchangeIssueData.requiredComponents;
        uint256[] memory requiredComponentAmounts = _exchangeIssueData.requiredComponentAmounts;

        // Make sure required components array is non-empty
        require(
            requiredComponents.length > 0,
            "ExchangeIssueModule.validateOrder: Required components must not be empty"
        );

        // Make sure required components and required component amounts are equal length
        require(
            requiredComponents.length == requiredComponentAmounts.length,
            "ExchangeIssueModule.validateOrder: Required components and amounts must be equal length"
        );

        for (uint256 i = 0; i < requiredComponents.length; i++) {
            // Make sure all required components are members of the Set
            require(
                set.tokenIsComponent(requiredComponents[i]),
                "ExchangeIssueModule.validateOrder: Component must be a member of Set");

            // Make sure all required component amounts are non-zero
            require(
                requiredComponentAmounts[i] > 0,
                "ExchangeIssueModule.validateOrder: Component amounts must be positive"
            );
        }
    }
}
