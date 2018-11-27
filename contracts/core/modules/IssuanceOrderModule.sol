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
import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ExchangeHeaderLibrary } from "../lib/ExchangeHeaderLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IExchangeWrapper } from "../interfaces/IExchangeWrapper.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ISignatureValidator } from "../interfaces/ISignatureValidator.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { OrderLibrary } from "../lib/OrderLibrary.sol";


/**
 * @title Core Issuance Order
 * @author Set Protocol
 *
 * The Core Issuance Order extension houses all functions related to the filling and
 * canceling of issuance orders.
 */
contract IssuanceOrderModule is
    ReentrancyGuard
{
    using SafeMath for uint256;
    using Math for uint256;

    /* ============ State Variables ============ */

    // Address of core contract
    address public core;

    // Address of transferProxy contract
    address public transferProxy;

    // Address of vault contract
    address public vault;

    // Mapping of filled Issuance Orders
    mapping(bytes32 => uint256) public orderFills;

    // Mapping of canceled Issuance Orders
    mapping(bytes32 => uint256) public orderCancels;

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

    /* ============ Constructor ============ */

    /**
     * Constructor function for IssuanceOrderModule
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
    {
        // Commit passed address to core state variable
        core = _core;

        // Commit passed address to transferProxy state variable
        transferProxy = _transferProxy;

        // Commit passed address to vault state variable
        vault = _vault;
    }

    /* ============ External Functions ============ */

    /**
     * Fill an issuance order
     *
     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]
     * @param  _values                    [quantity, makerTokenAmount, expiration, makerRelayerFee, takerRelayerFee, salt]
     * @param  _requiredComponents        Components required for the issuance order
     * @param  _requiredComponentAmounts  Component amounts required for the issuance order
     * @param  _fillQuantity              Quantity of set to be filled
     * @param  _signature                 Bytes with v, r and s segments of ECDSA signature
     * @param _orderData                  Bytes array containing the exchange orders to execute
     */
    function fillOrder(
        address[5] _addresses,
        uint256[6] _values,
        address[] _requiredComponents,
        uint256[] _requiredComponentAmounts,
        uint256 _fillQuantity,
        bytes _signature,
        bytes _orderData
    )
        external
        nonReentrant
    {
        // Create IssuanceOrder struct
        OrderLibrary.IssuanceOrder memory order = OrderLibrary.constructOrder(
            _addresses,
            _values,
            _requiredComponents,
            _requiredComponentAmounts
        );

        uint256 executeQuantity = calculateExecuteQuantity(
            order,
            _fillQuantity
        );

        // Checks the signature, order, and execution quantity validity
        validateFillOrder(
            order,
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
            order,
            fractionFilled,
            _orderData
        );

        // Issue Set
        ICore(core).issueModule(
            order.makerAddress,
            order.setAddress,
            executeQuantity
        );
    }

    /**
     * Cancel an issuance order
     *
     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]
     * @param  _values                    [quantity, makerTokenAmount, expiration, makerRelayerFee, takerRelayerFee, salt]
     * @param  _requiredComponents        Components required for the issuance order
     * @param  _requiredComponentAmounts  Component amounts required for the issuance order
     * @param  _cancelQuantity            Quantity of set to be canceled
     */
    function cancelOrder(
        address[5] _addresses,
        uint256[6] _values,
        address[] _requiredComponents,
        uint256[] _requiredComponentAmounts,
        uint256 _cancelQuantity
    )
        external
        nonReentrant
    {
        // Create IssuanceOrder struct
        OrderLibrary.IssuanceOrder memory order = OrderLibrary.constructOrder(
            _addresses,
            _values,
            _requiredComponents,
            _requiredComponentAmounts
        );

        uint256 cancelledAmount = calculateExecuteQuantity(
            order,
            _cancelQuantity
        );

        // Make sure cancel order comes from maker
        require(
            order.makerAddress == msg.sender,
            "IssuanceOrderModule.cancelOrder: Unauthorized sender"
        );

        require(
            cancelledAmount % ISetToken(order.setAddress).naturalUnit() == 0,
            "IssuanceOrderModule.cancelOrder: Cancel amount must be multiple of natural unit"
        );

        require(
            cancelledAmount > 0,
            "IssuanceOrderModule.cancelOrder: Cancel amount must be greater than 0"
        );

        // Verify order is valid
        OrderLibrary.validateOrder(
            order,
            core
        );

        // Tally cancel in orderCancels mapping
        orderCancels[order.orderHash] = orderCancels[order.orderHash].add(cancelledAmount);

        // Emit cancel order event
        emit LogCancel(
            order.setAddress,
            order.makerAddress,
            order.makerToken,
            order.relayerAddress,
            cancelledAmount,
            order.orderHash
        );
    }

    /* ============ Private Functions ============ */

    /**
     * Makes assertions regarding the executability of the order
     *
     * @param _order                   Bytes array containing the exchange orders to execute
     * @param _executeQuantity         Quantity of the issuance order to execute
     * @param _signature               Bytes array containing the order signature to validate
     */
    function validateFillOrder(
        OrderLibrary.IssuanceOrder memory _order,
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
        if (orderFills[_order.orderHash] == 0) {
            ISignatureValidator(ICore(core).signatureValidator()).validateSignature(
                _order.orderHash,
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
            address exchangeWrapper = ICore(core).exchanges(header.exchange);

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
            ITransferProxy(transferProxy).transfer(
                _makerTokenAddress,
                makerTokenAmount,
                _makerAddress,
                exchangeWrapper
            );

            // Call Exchange
            callExchange(
                [_makerAddress, msg.sender, _makerTokenAddress],
                [makerTokenAmount, header.orderCount, _fractionFilled.filled, _fractionFilled.attempted],
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
     * Calls exchange to execute trades and deposits fills into Vault for issuanceOrder maker.
     *
     * maker                            Issuance order maker
     * taker                            Issuance order taker
     * makerToken                       Address of maker token used in exchange orders
     * makerAssetAmount                 Amount of issuance order maker token to use on this exchange
     * orderCount                       Expected number of orders to execute
     * fillQuantity                     Quantity of Set to be filled
     * attemptedfillQuantity            Quantity of Set taker attempted to fill
     *
     * @param  _addresses               [maker, taker, makerToken]
     * @param  _values                  [makerAssetAmount, orderCount, fillQuantity, attemptedFillQuantity]
     * @param  _exchange                Address of exchange wrapper being called
     * @param  _bodyData                Arbitrary bytes data for orders to be executed on exchange
     */
    function callExchange(
        address[3] _addresses,
        uint256[4] _values,
        address _exchange,
        bytes _bodyData
    )
        private
    {
        // Call Exchange
        address[] memory componentFillTokens = new address[](_values[1]);
        uint256[] memory componentFillAmounts = new uint256[](_values[1]);
        (componentFillTokens, componentFillAmounts) = IExchangeWrapper(_exchange).exchange(
            _addresses,
            _values,
            _bodyData
        );

        // Transfer component tokens from wrapper to vault
        ICore(core).batchDepositModule(
            _exchange,
            _addresses[0],
            componentFillTokens,
            componentFillAmounts
        );        
    }

    /**
     * Check exchange orders acquire correct amount of tokens. Settle accounts for taker
     * and relayer.
     *
     * @param  _order                   IssuanceOrder object containing order params
     * @param  _fractionFilled          Fraction of original quantity filled
     * @param  _orderData               Bytestring encoding all exchange order data
     */
    function settleOrder(
        OrderLibrary.IssuanceOrder _order,
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
            _fractionFilled.filled,
            requiredMakerTokenAmount,
            makerTokenAmountUsed
        );

        // Tally fill in orderFills mapping
        orderFills[_order.orderHash] = orderFills[_order.orderHash].add(_fractionFilled.filled);
    }

    /**
     * Calculate and send tokens to taker and relayer
     *
     * @param  _order                          IssuanceOrder object containing order params
     * @param  _fillQuantity                   Quantity of Set to be filled
     * @param  _requiredMakerTokenAmount       Max amount of maker token available to fill orders
     * @param  _makerTokenUsed                 Amount of maker token used to fill order
     */
    function settleAccounts(
        OrderLibrary.IssuanceOrder _order,
        uint256 _fillQuantity,
        uint256 _requiredMakerTokenAmount,
        uint256 _makerTokenUsed
    )
        private
    {
        // Send left over maker token balance to taker, if greater than 0
        uint256 leftoverMakerToken = _requiredMakerTokenAmount.sub(_makerTokenUsed);
        if (leftoverMakerToken > 0) {
            ITransferProxy(transferProxy).transfer(
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
            _order.orderHash
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
        //Declare transferProxy interface variable
        ITransferProxy transferProxyInstance = ITransferProxy(transferProxy);

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
        // Verify maker token used is less than amount allocated that user signed
        require(
            _makerTokenAmountUsed <= _requiredMakerTokenAmount,
            "IssuanceOrderModule.settleOrder: Maker token used exceeds allotted limit"
        );

        // Check that maker's component tokens in Vault have been incremented correctly
        for (uint256 i = 0; i < _order.requiredComponents.length; i++) {
            uint256 currentBal = IVault(vault).getOwnerBalance(
                _order.requiredComponents[i],
                _order.makerAddress
            );
            require(
                currentBal >= _requiredBalances[i],
                "IssuanceOrderModule.settleOrder: Insufficient component tokens acquired"
            );
        }        
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
        // Calculate amount of component tokens required to issue
        uint256[] memory requiredBalances = new uint256[](_order.requiredComponents.length);
        for (uint256 i = 0; i < _order.requiredComponents.length; i++) {
            // Get current vault balances
            uint256 tokenBalance = IVault(vault).getOwnerBalance(
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
     * @param  _executeQuantity         Amount of order taker is executing
     * @return uint256                  Quantity that can be filled or cancelled
     */
    function calculateExecuteQuantity(
        OrderLibrary.IssuanceOrder _order,
        uint256 _executeQuantity
    )
        internal
        view
        returns (uint256)
    {
        uint256 closedOrderAmount = orderFills[_order.orderHash].add(orderCancels[_order.orderHash]);
        uint256 openOrderAmount = _order.quantity.sub(closedOrderAmount);
        
        return openOrderAmount.min(_executeQuantity);
    }
}
