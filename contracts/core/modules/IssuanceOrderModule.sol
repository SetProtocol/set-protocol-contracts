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
import { Ownable } from "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ExchangeHeaderLibrary } from "../lib/ExchangeHeaderLibrary.sol";
import { ExchangeValidationLibrary } from "../lib/ExchangeValidationLibrary.sol";
import { ExchangeWrapperLibrary } from "../lib/ExchangeWrapperLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IExchangeWrapper } from "../interfaces/IExchangeWrapper.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ISignatureValidator } from "../interfaces/ISignatureValidator.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";
import { OrderLibrary } from "../lib/OrderLibrary.sol";
import { TimeLockUpgrade } from "../../lib/TimeLockUpgrade.sol";


/**
 * @title Core Issuance Order
 * @author Set Protocol
 *
 * The Core Issuance Order extension houses all functions related to the filling and
 * canceling of issuance orders.
 */
contract IssuanceOrderModule is
    ModuleCoreState,
    Ownable,
    TimeLockUpgrade,
    ReentrancyGuard
{
    using SafeMath for uint256;
    using Math for uint256;

    /* ============ State Variables ============ */

    // Mapping of filled Issuance Orders
    mapping(bytes32 => uint256) public orderFills;

    // Mapping of canceled Issuance Orders
    mapping(bytes32 => uint256) public orderCancels;

    // Address of signature validator
    address public signatureValidator;
    ISignatureValidator public signatureValidatorInstance;

    /* ============ Events ============ */

    event LogFill(
        address setAddress,
        address indexed makerAddress,
        address indexed takerAddress,
        address makerToken,
        address indexed relayerAddress,
        address relayerToken,
        uint256 quantityFilled,
        uint256 makerTokenToTaker,
        uint256 relayerTokenAmountPaid,
        bytes32 orderHash
    );

    event LogCancel(
        address setAddress,
        address indexed makerAddress,
        address makerToken,
        address indexed relayerAddress,
        uint256 quantityCanceled,
        bytes32 orderHash
    );

    event SignatureValidatorChanged(
        address _signatureValidator
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for IssuanceOrderModule
     *
     * @param _core                The address of Core
     * @param _transferProxy       The address of transferProxy
     * @param _vault               The address of Vault
     * @param _signatureValidator  The address of SignatureValidator
     */
    constructor(
        address _core,
        address _transferProxy,
        address _vault,
        address _signatureValidator
    )
        public
        ModuleCoreState(
            _core,
            _transferProxy,
            _vault
        )
    {
        // Commit the signature validator address and instance
        signatureValidator = _signatureValidator;
        signatureValidatorInstance = ISignatureValidator(signatureValidator);
    }

    /**
     * Change address of the Signature Validator contract
     *
     * @param  _signatureValidator   Address of the Signature Validator library
     */
    function setSignatureValidator(
        address _signatureValidator
    )
        external
        onlyOwner
        timeLockUpgrade
    {
        signatureValidator = _signatureValidator;

        emit SignatureValidatorChanged(
            _signatureValidator
        );
    }

    /* ============ External Functions ============ */

    /**
     * Fill an issuance order
     *
     * @param  _order                     Struct conforming to IssuanceOrder interface
     * @param  _fillQuantity              Quantity of set to be filled
     * @param  _signature                 Bytes with v, r and s segments of ECDSA signature
     * @param _orderData                  Bytes array containing the exchange orders to execute
     */
    function fillOrder(
        OrderLibrary.IssuanceOrder memory _order,
        uint256 _fillQuantity,
        bytes _signature,
        bytes _orderData
    )
        public
        nonReentrant
    {
        // Generate hash of issuance order
        bytes32 orderHash = OrderLibrary.generateOrderHash(
            _order
        );

        // Calculate fill up to quantity
        uint256 executeQuantity = calculateExecuteQuantity(
            _order,
            orderHash,
            _fillQuantity
        );

        // Checks the signature, order, and execution quantity validity
        validateFillOrder(
            _order,
            orderHash,
            executeQuantity,
            _signature
        );

        // Creates data structure that represents the fraction of issuance order filled
        OrderLibrary.FractionFilled memory fractionFilled = OrderLibrary.FractionFilled({
            filled: executeQuantity,
            attempted: _fillQuantity
        });
        
        // Settle Order
        settleOrder(
            _order,
            orderHash,
            fractionFilled,
            _orderData
        );

        // Issue Set
        coreInstance.issueModule(
            _order.makerAddress,
            _order.makerAddress,
            _order.setAddress,
            executeQuantity
        );
    }

    /**
     * Cancel an issuance order
     *
     * @param  _order                     Struct conforming to IssuanceOrder interface
     * @param  _cancelQuantity            Quantity of set to be canceled
     */
    function cancelOrder(
        OrderLibrary.IssuanceOrder memory _order,
        uint256 _cancelQuantity
    )
        public
        nonReentrant
    {
        // Create IssuanceOrder struct
        bytes32 orderHash = OrderLibrary.generateOrderHash(
            _order
        );

        // Calculate cancel up to quantity
        uint256 cancelledAmount = calculateExecuteQuantity(
            _order,
            orderHash,
            _cancelQuantity
        );

        // Make sure cancel order comes from maker, in lieu of verifying the signature since the order is for the maker
        require(
            _order.makerAddress == msg.sender,
            "IssuanceOrderModule.cancelOrder: Unauthorized sender"
        );

        // Cancel amount must be multiple of natural unit to prevent 
        require(
            cancelledAmount % ISetToken(_order.setAddress).naturalUnit() == 0,
            "IssuanceOrderModule.cancelOrder: Cancel amount must be multiple of natural unit"
        );

        // Fail early to prevent unnecessary state updates
        require(
            cancelledAmount > 0,
            "IssuanceOrderModule.cancelOrder: Cancel amount must be greater than 0"
        );

        // Verify order is valid and can still be cancelled
        OrderLibrary.validateOrder(
            _order,
            core
        );

        // Tally cancel in orderCancels mapping
        orderCancels[orderHash] = orderCancels[orderHash].add(cancelledAmount);

        // Emit cancel order event
        emit LogCancel(
            _order.setAddress,
            _order.makerAddress,
            _order.makerToken,
            _order.relayerAddress,
            cancelledAmount,
            orderHash
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Makes assertions regarding the executability of the order
     *
     * @param _order                   Bytes array containing the exchange orders to execute
     * @param _orderHash               EIP712 Hash of IssuanceOrder applied to the EIP712 Domain
     * @param _executeQuantity         Quantity of the issuance order to execute
     * @param _signature               Bytes array containing the order signature to validate
     */
    function validateFillOrder(
        OrderLibrary.IssuanceOrder memory _order,
        bytes32 _orderHash,
        uint256 _executeQuantity,
        bytes _signature
    )
        public
    {
        require(
            _executeQuantity > 0,
            "IssuanceOrderModule.fillOrder: Execute amount must be greater than 0"
        );

        require(
            _executeQuantity % ISetToken(_order.setAddress).naturalUnit() == 0,
            "IssuanceOrderModule.fillOrder: Execute amount must be multiple of natural unit"
        );

        // Verify signature is authentic, if already been filled before skip to save gas
        if (orderFills[_orderHash] == 0) {
            signatureValidatorInstance.validateSignature(
                _orderHash,
                _order.makerAddress,
                _signature
            );            
        }

        // Verify order is valid
        OrderLibrary.validateOrder(
            _order,
            core
        );
    }

    /**
     * Execute the exchange orders by parsing the order data and facilitating the transfers. Each
     * header represents a batch of orders for a particular exchange (0x, Kyber, taker)
     *
     * @param _orderData               Bytes array containing the exchange orders to execute
     * @param _makerAddress            Issuance order maker address
     * @param _makerTokenAddress       Address of maker token to use to execute exchange orders
     * @param _fractionFilled          Fraction of original fill quantity
     * @return makerTokenUsed          Amount of maker token used to execute orders
     */
    function executeExchangeOrders(
        bytes _orderData,
        address _makerAddress,
        address _makerTokenAddress,
        OrderLibrary.FractionFilled _fractionFilled
    )
        private
        returns (uint256)
    {
        uint256 scannedBytes = 0;
        uint256 makerTokenUsed = 0;
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
                "IssuanceOrderModule.executeExchangeOrders: Invalid or disabled Exchange address"
            );

            // Read the order body based on order data length info in header plus the length of the header (128)
            uint256 exchangeDataLength = header.orderDataBytesLength.add(128);
            bytes memory bodyData = LibBytes.slice(
                _orderData,
                scannedBytes.add(128),
                scannedBytes.add(exchangeDataLength)
            );

            // Calculate amount of makerToken actually needed
            uint256 makerTokenAmount = OrderLibrary.getPartialAmount(
                header.makerTokenAmount,
                _fractionFilled.filled,
                _fractionFilled.attempted
            );

            // Transfer maker token to Exchange Wrapper to execute exchange orders
            // Using maker token from signed issuance order to prevent malicious encoding of another maker token
            transferProxyInstance.transfer(
                _makerTokenAddress,
                makerTokenAmount,
                _makerAddress,
                exchangeWrapper
            );

            ExchangeWrapperLibrary.ExchangeData memory exchangeData = ExchangeWrapperLibrary.ExchangeData({
                maker: _makerAddress,
                taker: msg.sender,
                makerToken: _makerTokenAddress,
                makerAssetAmount: makerTokenAmount,
                orderCount: header.orderCount,
                fillQuantity: _fractionFilled.filled,
                attemptedFillQuantity: _fractionFilled.attempted
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
            makerTokenUsed = makerTokenUsed.add(makerTokenAmount);
        }

        return makerTokenUsed;
    }

    /**
     * Check exchange orders acquire correct amount of tokens. Settle accounts for taker
     * and relayer.
     *
     * @param  _order                   IssuanceOrder object containing order params
     * @param  _orderHash               EIP712 Hash of IssuanceOrder applied to the EIP712 Domain
     * @param  _fractionFilled          Fraction of original quantity filled
     * @param  _orderData               Bytestring encoding all exchange order data
     */
    function settleOrder(
        OrderLibrary.IssuanceOrder _order,
        bytes32 _orderHash,
        OrderLibrary.FractionFilled _fractionFilled,
        bytes _orderData
    )
        private
    {
        // Calculate amount of maker token required
        uint256 requiredMakerTokenAmount = OrderLibrary.getPartialAmount(
            _order.makerTokenAmount,
            _fractionFilled.filled,
            _order.quantity
        );

        // Calculate require balances to issue after exchange orders executed
        uint256[] memory requiredBalances = calculateRequiredTokenBalances(
            _order,
            _fractionFilled.filled
        );

        // Execute exchange orders
        uint256 makerTokenAmountUsed = executeExchangeOrders(
            _orderData,
            _order.makerAddress,
            _order.makerToken,
            _fractionFilled
        );

        // Check that the correct amount of tokens were sourced using allotment of maker token
        assertPostExchangeTokenBalances(
            _order,
            requiredBalances,
            requiredMakerTokenAmount,
            makerTokenAmountUsed
        );

        // Settle relayer and taker accounts
        settleAccounts(
            _order,
            _orderHash,
            _fractionFilled.filled,
            requiredMakerTokenAmount,
            makerTokenAmountUsed
        );

        // Tally fill in orderFills mapping
        orderFills[_orderHash] = orderFills[_orderHash].add(_fractionFilled.filled);
    }

    /**
     * Calculate and send tokens to taker and relayer
     *
     * @param  _order                          IssuanceOrder object containing order params
     * @param  _orderHash                      EIP712 Hash of IssuanceOrder applied to the EIP712 Domain
     * @param  _fillQuantity                   Quantity of Set to be filled
     * @param  _requiredMakerTokenAmount       Max amount of maker token available to fill orders
     * @param  _makerTokenUsed                 Amount of maker token used to fill order
     */
    function settleAccounts(
        OrderLibrary.IssuanceOrder _order,
        bytes32 _orderHash,
        uint256 _fillQuantity,
        uint256 _requiredMakerTokenAmount,
        uint256 _makerTokenUsed
    )
        private
    {
        // Send left over maker token balance to taker, if greater than 0
        uint256 leftoverMakerToken = _requiredMakerTokenAmount.sub(_makerTokenUsed);
        if (leftoverMakerToken > 0) {
            transferProxyInstance.transfer(
                _order.makerToken,
                leftoverMakerToken, // Required less used is amount sent to taker
                _order.makerAddress,
                msg.sender
            );        
        }

        uint256 relayerFees = 0;

        // Settle Relayer fees
        if (_order.relayerAddress != address(0)) {
            relayerFees = settleRelayerFees(
                _order,
                _fillQuantity
            );
        }

        // Emit fill order event
        emit LogFill(
            _order.setAddress,
            _order.makerAddress,
            msg.sender,
            _order.makerToken,
            _order.relayerAddress,
            _order.relayerToken,
            _fillQuantity,
            _requiredMakerTokenAmount.sub(_makerTokenUsed), // Required less used amount is sent to taker
            relayerFees,
            _orderHash
        );
    }

    /**
     * Calculate and send tokens to relayer (if necessary)
     *
     * @param  _order                      IssuanceOrder object containing order params
     * @param  _fillQuantity               Quantity of Set to be filled
     * @return uint256                     Amount of fees being sent to relayerAddress
     */
    function settleRelayerFees(
        OrderLibrary.IssuanceOrder _order,
        uint256 _fillQuantity
    )
        private
        returns (uint256)
    {
        uint256 makerFee = 0;
        uint256 takerFee = 0;

        if (_order.makerRelayerFee > 0) {
            // Calculate maker fees required
            makerFee = OrderLibrary.getPartialAmount(
                _order.makerRelayerFee,
                _fillQuantity,
                _order.quantity
            );

            // Send maker fees to relayer
            transferProxyInstance.transfer(
                _order.relayerToken,
                makerFee,
                _order.makerAddress,
                _order.relayerAddress
            );
        }

        if (_order.takerRelayerFee > 0) {
            // Calculate taker fees required
            takerFee = OrderLibrary.getPartialAmount(
                _order.takerRelayerFee,
                _fillQuantity,
                _order.quantity
            );
            // Send taker fees to relayer
            transferProxyInstance.transfer(
                _order.relayerToken,
                takerFee,
                msg.sender,
                _order.relayerAddress
            );
        }

        return makerFee.add(takerFee);
    }

    /**
     * Check exchange orders acquire correct amount of tokens and taker doesn't over use
     * the issuance order maker's tokens
     *
     * @param  _order                       IssuanceOrder object containing order params
     * @param  _requiredBalances            Array of required balances for each component
                                            after exchange orders are executed
     * @param  _requiredMakerTokenAmount    Max amount of maker token used to source tokens
     * @param  _makerTokenAmountUsed        Amount of maker token used to source tokens
     */
    function assertPostExchangeTokenBalances(
        OrderLibrary.IssuanceOrder _order,
        uint256[] _requiredBalances,
        uint256 _requiredMakerTokenAmount,
        uint256 _makerTokenAmountUsed
    )
        private
        view
    {
        // Verify maker token used is less than amount allocated to the maker
        ExchangeValidationLibrary.validateTokenUsage(
            _makerTokenAmountUsed,
            _requiredMakerTokenAmount
        );

        // Check that maker's component tokens in Vault have been incremented correctly
        ExchangeValidationLibrary.validateRequiredComponentBalances(
            vault,
            _order.requiredComponents,
            _requiredBalances,
            _order.makerAddress
        );         
    }

    /**
     * Check exchange orders acquire correct amount of tokens and taker doesn't over use
     * the issuance order maker's tokens
     *
     * @param  _order                   IssuanceOrder object containing order params
     * @param  _fillQuantity            Amount of order taker is filling
     * @return uint256[]                Array of required token balances after order execution
     */
    function calculateRequiredTokenBalances(
        OrderLibrary.IssuanceOrder _order,
        uint256 _fillQuantity
    )
        private
        view
        returns (uint256[])
    {
        // Storing component count to local variable to save on invocation
        uint256 requiredComponentCount = _order.requiredComponents.length;

        // Calculate amount of component tokens required to issue
        uint256[] memory requiredBalances = new uint256[](requiredComponentCount);
        for (uint256 i = 0; i < requiredComponentCount; i++) {
            // Get current vault balances
            uint256 tokenBalance = vaultInstance.getOwnerBalance(
                _order.requiredComponents[i],
                _order.makerAddress
            );

            // Amount of component tokens to be added to Vault
            uint256 requiredAddition = OrderLibrary.getPartialAmount(
                _order.requiredComponentAmounts[i],
                _fillQuantity,
                _order.quantity
            );

            // Required vault balances after exchange order executed
            requiredBalances[i] = tokenBalance.add(requiredAddition);
        }  

        return requiredBalances;      
    }

    /**
     * Calculates the execute quantity for a fill or cancel order. This is calculated
     * by taking the minimum of the open order amount and the user's input quantity.
     * We do this allow orders to be filled even if a small quantity has been cancelled
     * or filled ahead of this order.
     *
     * @param  _order                   IssuanceOrder object containing order params
     * @param  _orderHash               EIP712 Hash of IssuanceOrder applied to the EIP712 Domain
     * @param  _executeQuantity         Amount of order taker is executing
     * @return uint256                  Quantity that can be filled or cancelled
     */
    function calculateExecuteQuantity(
        OrderLibrary.IssuanceOrder _order,
        bytes32 _orderHash,
        uint256 _executeQuantity
    )
        internal
        view
        returns (uint256)
    {
        uint256 closedOrderAmount = orderFills[_orderHash].add(orderCancels[_orderHash]);
        uint256 openOrderAmount = _order.quantity.sub(closedOrderAmount);
        
        return openOrderAmount.min(_executeQuantity);
    }
}
