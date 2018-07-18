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

pragma solidity 0.4.24;
pragma experimental "ABIEncoderV2";


import { Math } from "zeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { CoreModifiers } from "../lib/CoreSharedModifiers.sol";
import { CoreState } from "../lib/CoreState.sol";
import { ExchangeHandler } from "../lib/ExchangeHandler.sol";
import { ICoreAccounting } from "../interfaces/ICoreAccounting.sol";
import { ICoreIssuance } from "../interfaces/ICoreIssuance.sol";
import { IExchange } from "../interfaces/IExchange.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { IVault } from "../interfaces/IVault.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { OrderLibrary } from "../lib/OrderLibrary.sol";


/**
 * @title CoreIssuanceOrder
 * @author Set Protocol
 *
 * The Core Issuance Order extension houses all functions related to the filling and
 * canceling issuance orders.
 *
 */
contract CoreIssuanceOrder is
    ICoreIssuance,
    ICoreAccounting,
    CoreState,
    CoreModifiers
{
    using SafeMath for uint256;
    using Math for uint256;

    /* ============ Constants ============ */

    uint256 constant EXCHANGE_HEADER_LENGTH = 160;

    string constant INVALID_CANCEL_ORDER = "Only maker can cancel order.";
    string constant INVALID_EXCHANGE = "Exchange does not exist.";
    string constant INVALID_FILL_AMOUNT = "Fill amount must be equal or less than open order amount.";
    string constant INVALID_QUANTITY = "Quantity must be multiple of the natural unit of the set.";
    string constant INVALID_SIGNATURE = "Invalid order signature.";
    string constant POSITIVE_AMOUNT_REQUIRED = "Quantity should be greater than 0.";
    string constant ORDER_EXPIRED = "This order has expired.";

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

    /* ============ External Functions ============ */

    /**
     * Fill an issuance order
     *
     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]
     * @param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]
     * @param  _fillQuantity   Quantity of set to be filled
     * @param  _v              v element of ECDSA signature
     * @param  sigBytes        Array with r and s segments of ECDSA signature
     * @param _orderData       Bytes array containing the exchange orders to execute
     */
    function fillOrder(
        address[5] _addresses,
        uint[5] _values,
        address[] _requiredComponents,
        uint[] _requiredComponentAmounts,
        uint _fillQuantity,
        uint8 _v,
        bytes32[] sigBytes,
        bytes _orderData
    )
        external
    {
        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({
            setAddress: _addresses[0],
            makerAddress: _addresses[1],
            makerToken: _addresses[2],
            relayerAddress: _addresses[3],
            relayerToken: _addresses[4],
            quantity: _values[0],
            makerTokenAmount: _values[1],
            expiration: _values[2],
            relayerTokenAmount: _values[3],
            salt: _values[4],
            requiredComponents: _requiredComponents,
            requiredComponentAmounts: _requiredComponentAmounts,
            orderHash: OrderLibrary.generateOrderHash(
                _addresses,
                _values,
                _requiredComponents,
                _requiredComponentAmounts
            )
        });

        // Verify signature is authentic
        require(
            OrderLibrary.validateSignature(
                order.orderHash,
                order.makerAddress,
                _v,
                sigBytes[0], // r
                sigBytes[1] // s
            ),
            INVALID_SIGNATURE
        );

        // Verify order is valid and return amount to be filled
        validateOrder(
            order,
            _fillQuantity
        );

        // Settle Order
        settleOrder(order, _fillQuantity, _orderData);

        //Issue Settle
        issueInternal(
            order.makerAddress,
            order.setAddress,
            _fillQuantity
        );
    }

    /**
     * Cancel an issuance order
     *
     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]
     * @param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]
     * @param  _cancelQuantity Quantity of set to be filled
     */
    function cancelOrder(
        address[5] _addresses,
        uint[5] _values,
        address[] _requiredComponents,
        uint[] _requiredComponentAmounts,
        uint _cancelQuantity
    )
        external
        isPositiveQuantity(_cancelQuantity)
    {
        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({
            setAddress: _addresses[0],
            makerAddress: _addresses[1],
            makerToken: _addresses[2],
            relayerAddress: _addresses[3],
            relayerToken: _addresses[4],
            quantity: _values[0],
            makerTokenAmount: _values[1],
            expiration: _values[2],
            relayerTokenAmount: _values[3],
            salt: _values[4],
            requiredComponents: _requiredComponents,
            requiredComponentAmounts: _requiredComponentAmounts,
            orderHash: OrderLibrary.generateOrderHash(
                _addresses,
                _values,
                _requiredComponents,
                _requiredComponentAmounts
            )
        });

        // Make sure cancel order comes from maker
        require(order.makerAddress == msg.sender, INVALID_CANCEL_ORDER);

        // Verify order is valid
        validateOrder(
            order,
            _cancelQuantity
        );

        // Determine amount to cancel
        uint closedOrderAmount = state.orderFills[order.orderHash].add(state.orderCancels[order.orderHash]);
        uint openOrderAmount = order.quantity.sub(closedOrderAmount);
        uint canceledAmount = openOrderAmount.min256(_cancelQuantity);

        // Tally cancel in orderCancels mapping
        state.orderCancels[order.orderHash] = state.orderCancels[order.orderHash].add(canceledAmount);

        emit LogCancel(
            order.setAddress,
            order.makerAddress,
            order.makerToken,
            order.relayerAddress,
            canceledAmount,
            order.orderHash
        );

    }

    /* ============ Private Functions ============ */

    /**
     * Execute the exchange orders by parsing the order data and facilitating the transfers. Each
     * header represents a batch of orders for a particular exchange (0x, KNC, taker). Additional
     * information such as makerToken is encoded so it can be used to facilitate exchange orders
     *
     * @param _orderData   Bytes array containing the exchange orders to execute
     */
    function executeExchangeOrders(
        bytes _orderData,
        address _makerAddress
    )
        private
        returns (uint256)
    {
        uint256 scannedBytes;
        uint256 makerTokenUsed;
        while (scannedBytes < _orderData.length) {
            // Read the next exchange order header
            bytes memory headerData = LibBytes.slice(
                _orderData,
                scannedBytes,
                scannedBytes.add(EXCHANGE_HEADER_LENGTH)
            );
            ExchangeHandler.ExchangeHeader memory header = ExchangeHandler.parseExchangeHeader(
                headerData
            );

            // Get exchange address from state mapping based on header exchange info
            address exchange = state.exchanges[header.exchange];

            // Verify exchange address is registered
            require(
                exchange != address(0),
                INVALID_EXCHANGE
            );

            // Read the order body based on header order length info
            uint256 exchangeDataLength = header.totalOrdersLength.add(EXCHANGE_HEADER_LENGTH);
            bytes memory bodyData = LibBytes.slice(
                _orderData,
                scannedBytes.add(EXCHANGE_HEADER_LENGTH),
                scannedBytes.add(exchangeDataLength)
            );

            // Transfer header.makerTokenAmount to Exchange Wrapper
            ITransferProxy(state.transferProxyAddress).transfer(
                header.makerTokenAddress,
                header.makerTokenAmount,
                _makerAddress,
                exchange
            );

            // Call Exchange
            address[] memory componentFillTokens = new address[](header.orderCount);
            uint[] memory componentFillAmounts = new uint[](header.orderCount);
            (componentFillTokens, componentFillAmounts) = IExchange(exchange).exchange(
                msg.sender,
                header.orderCount,
                bodyData
            );

            // Transfer component tokens from wrapper to vault
            batchDepositInternal(
                exchange,
                _makerAddress,
                componentFillTokens,
                componentFillAmounts
            );

            // Update scanned bytes with header and body lengths
            scannedBytes = scannedBytes.add(exchangeDataLength);
            makerTokenUsed += header.makerTokenAmount;
        }

        return makerTokenUsed;
    }

    /**
     * Validate order params are still valid
     *
     * @param  _order              IssuanceOrder object containing order params
     * @param  _executeQuantity    Quantity of Set to be filled
     */
    function validateOrder(
        OrderLibrary.IssuanceOrder _order,
        uint _executeQuantity
    )
        private
        view
        isValidSet(_order.setAddress)
        isPositiveQuantity(_executeQuantity)
    {
        // Make sure makerTokenAmount and Set Token to issue is greater than 0.
        require(
            _order.makerTokenAmount > 0 && _order.quantity > 0,
            POSITIVE_AMOUNT_REQUIRED
        );
        // Make sure the order hasn't expired
        require(
            block.timestamp <= _order.expiration,
            ORDER_EXPIRED
        );

        // Make sure IssuanceOrder quantity is multiple of natural unit
        require(
            _order.quantity % ISetToken(_order.setAddress).naturalUnit() == 0,
            INVALID_QUANTITY
        );

        // Make sure fill or cancel quantity is multiple of natural unit
        require(
            _executeQuantity % ISetToken(_order.setAddress).naturalUnit() == 0,
            INVALID_QUANTITY
        );
    }

    function settleAccounts(
        OrderLibrary.IssuanceOrder _order,
        uint _fillQuantity,
        uint _requiredMakerTokenAmount,
        uint _makerTokenUsed
    )
        private
    {
        // Calculate amount to send to taker
        uint toTaker = _requiredMakerTokenAmount.sub(_makerTokenUsed);

        // Send left over maker token balance to taker
        ITransferProxy(state.transferProxyAddress).transfer(
            _order.makerToken,
            toTaker,
            _order.makerAddress,
            msg.sender
        );

        // Calculate fees required
        uint requiredFees = _order.relayerTokenAmount.mul(_fillQuantity).div(_order.quantity);

        //Send fees to relayer
        ITransferProxy(state.transferProxyAddress).transfer(
            _order.relayerToken,
            requiredFees,
            _order.makerAddress,
            _order.relayerAddress
        );
        ITransferProxy(state.transferProxyAddress).transfer(
            _order.relayerToken,
            requiredFees,
            msg.sender,
            _order.relayerAddress
        );

        emit LogFill(
            _order.setAddress,
            _order.makerAddress,
            msg.sender,
            _order.makerToken,
            _order.relayerAddress,
            _order.relayerToken,
            _fillQuantity,
            toTaker,
            requiredFees.mul(2),
            _order.orderHash
        );
    }

    function settleOrder(
        OrderLibrary.IssuanceOrder _order,
        uint _fillQuantity,
        bytes _orderData
    )
        private
    {
        // Check to make sure open order amount equals _fillQuantity
        uint closedOrderAmount = state.orderFills[_order.orderHash].add(state.orderCancels[_order.orderHash]);
        uint openOrderAmount = _order.quantity.sub(closedOrderAmount);
        require(
            openOrderAmount >= _fillQuantity,
            INVALID_FILL_AMOUNT
        );

        uint[] memory requiredBalances = new uint[](_order.requiredComponents.length);

        // Calculate amount of maker token required
        // Look into rounding errors
        uint requiredMakerTokenAmount = _order.makerTokenAmount.mul(_fillQuantity).div(_order.quantity);

        // Calculate amount of component tokens required to issue
        for (uint16 i = 0; i < _order.requiredComponents.length; i++) {
            // Get current vault balances
            uint tokenBalance = IVault(state.vaultAddress).getOwnerBalance(
                _order.makerAddress,
                _order.requiredComponents[i]
            );

            // Amount of component tokens to be added to Vault
            uint requiredAddition = _order.requiredComponentAmounts[i].mul(_fillQuantity).div(_order.quantity);

            // Required vault balances after exchange order executed
            requiredBalances[i] = tokenBalance.add(requiredAddition);
        }

        // Execute exchange orders
        uint makerTokenAmountUsed = executeExchangeOrders(_orderData, _order.makerAddress);

        // Check that maker's component tokens in Vault have been incremented correctly
        for (i = 0; i < _order.requiredComponents.length; i++) {
            uint currentBal = IVault(state.vaultAddress).getOwnerBalance(
                _order.makerAddress,
                _order.requiredComponents[i]
            );
            require(currentBal >= requiredBalances[i]);
        }

        settleAccounts(
            _order,
            _fillQuantity,
            requiredMakerTokenAmount,
            makerTokenAmountUsed
        );

        // Tally fill in orderFills mapping
        state.orderFills[_order.orderHash] = state.orderFills[_order.orderHash].add(_fillQuantity);
    }
}
