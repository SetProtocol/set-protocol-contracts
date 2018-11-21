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

        // Verify signature is authentic, if already been filled before skip to save gas
        if (orderFills[order.orderHash] == 0) {
            ISignatureValidator(ICore(core).signatureValidator()).validateSignature(
                order.orderHash,
                order.makerAddress,
                _signature
            );            
        }

        // Verify order is valid and return amount to be filled
        validateOrder(
            order,
            _fillQuantity
        );

        // Settle Order
        settleOrder(
            order,
            _fillQuantity,
            _orderData
        );

        // Issue Set
        ICore(core).issueModule(
            order.makerAddress,
            order.setAddress,
            _fillQuantity
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
        // Check that quantity submitted is greater than 0
        require(
            _cancelQuantity > 0,
            "IssuanceOrderModule.cancelOrder: Quantity must be positive"
        );

        // Create IssuanceOrder struct
        OrderLibrary.IssuanceOrder memory order = OrderLibrary.constructOrder(
            _addresses,
            _values,
            _requiredComponents,
            _requiredComponentAmounts
        );

        // Make sure cancel order comes from maker
        require(
            order.makerAddress == msg.sender,
            "IssuanceOrderModule.cancelOrder: Unauthorized sender"
        );

        // Verify order is valid
        validateOrder(
            order,
            _cancelQuantity
        );

        // Determine amount to cancel
        uint256 closedOrderAmount = orderFills[order.orderHash].add(orderCancels[order.orderHash]);
        uint256 openOrderAmount = order.quantity.sub(closedOrderAmount);
        uint256 canceledAmount = openOrderAmount.min(_cancelQuantity);

        // Tally cancel in orderCancels mapping
        orderCancels[order.orderHash] = orderCancels[order.orderHash].add(canceledAmount);

        // Emit cancel order event
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
     * header represents a batch of orders for a particular exchange (0x, Kyber, taker)
     *
     * @param _orderData           Bytes array containing the exchange orders to execute
     * @param _makerAddress        Issuance order maker address
     * @param _makerTokenAddress   Address of maker token to use to execute exchange orders
     * @return makerTokenUsed      Amount of maker token used to execute orders
     */
    function executeExchangeOrders(
        bytes _orderData,
        address _makerAddress,
        address _makerTokenAddress
    )
        private
        returns (uint256)
    {
        ICore coreInstance = ICore(core);
        uint256 scannedBytes;
        uint256 makerTokenUsed;
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

            // Transfer maker token to Exchange Wrapper to execute exchange orders
            // Using maker token from signed issuance order to prevent malicious encoding of another maker token
            ITransferProxy(transferProxy).transfer(
                _makerTokenAddress,
                header.makerTokenAmount,
                _makerAddress,
                exchangeWrapper
            );

            // Call Exchange
            address[] memory componentFillTokens = new address[](header.orderCount);
            uint256[] memory componentFillAmounts = new uint256[](header.orderCount);
            (componentFillTokens, componentFillAmounts) = IExchangeWrapper(exchangeWrapper).exchange(
                _makerAddress,
                msg.sender,
                _makerTokenAddress,
                header.makerTokenAmount,
                header.orderCount,
                bodyData
            );

            // Transfer component tokens from wrapper to vault
            coreInstance.batchDepositModule(
                exchangeWrapper,
                _makerAddress,
                componentFillTokens,
                componentFillAmounts
            );

            // Update scanned bytes with header and body lengths
            scannedBytes = scannedBytes.add(exchangeDataLength);
            makerTokenUsed = makerTokenUsed.add(header.makerTokenAmount);
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
        uint256 _executeQuantity
    )
        private
        view
    {
        // Declare set interface variable
        ISetToken set = ISetToken(_order.setAddress);

        // Verify Set was created by Core and is enabled
        require(
            ICore(core).validSets(_order.setAddress),
            "IssuanceOrderModule.validateOrder: Invalid or disabled SetToken address"
        );

        // Make sure makerTokenAmount is greater than 0
        require(
            _order.makerTokenAmount > 0,
            "IssuanceOrderModule.validateOrder: Maker token amount must be positive"
        );

        // Make sure quantity to issue is greater than 0
        require(
            _order.quantity > 0,
            "IssuanceOrderModule.validateOrder: Quantity must be positive"
        );

        // Make sure the order hasn't expired
        require(
            block.timestamp <= _order.expiration,
            "IssuanceOrderModule.validateOrder: Order expired"
        );

        // Declare set interface variable
        uint256 setNaturalUnit = set.naturalUnit();

        // Make sure IssuanceOrder quantity is multiple of natural unit
        require(
            _order.quantity % setNaturalUnit == 0,
            "IssuanceOrderModule.validateOrder: Quantity must be multiple of natural unit"
        );

        // Make sure fill or cancel quantity is multiple of natural unit
        require(
            _executeQuantity % setNaturalUnit == 0,
            "IssuanceOrderModule.validateOrder: Execute amount must be multiple of natural unit"
        );

        address[] memory requiredComponents = _order.requiredComponents;
        uint256[] memory requiredComponentAmounts = _order.requiredComponentAmounts;

        // Make sure required components array is non-empty
        require(
            _order.requiredComponents.length > 0,
            "IssuanceOrderModule.validateOrder: Required components must not be empty"
        );

        // Make sure required components and required component amounts are equal length
        require(
            requiredComponents.length == requiredComponentAmounts.length,
            "IssuanceOrderModule.validateOrder: Required components and amounts must be equal length"
        );

        for (uint256 i = 0; i < requiredComponents.length; i++) {
            // Make sure all required components are members of the Set
            require(
                set.tokenIsComponent(requiredComponents[i]),
                "IssuanceOrderModule.validateOrder: Component must be a member of Set");

            // Make sure all required component amounts are non-zero
            require(
                requiredComponentAmounts[i] > 0,
                "IssuanceOrderModule.validateOrder: Component amounts must be positive"
            );
        }
    }

    /**
     * Check exchange orders acquire correct amount of tokens. Settle accounts for taker
     * and relayer.
     *
     * @param  _order               IssuanceOrder object containing order params
     * @param  _fillQuantity        Quantity of Set to be filled
     * @param  _orderData           Bytestring encoding all exchange order data
     */
    function settleOrder(
        OrderLibrary.IssuanceOrder _order,
        uint256 _fillQuantity,
        bytes _orderData
    )
        private
    {
        // Declare IVault interface as variable
        IVault vaultInstance = IVault(vault);

        // Check to make sure open order amount equals _fillQuantity
        uint256 closedOrderAmount = orderFills[_order.orderHash].add(orderCancels[_order.orderHash]);

        // Open order amount is greater than or equal to closed order amount
        require(
            _order.quantity.sub(closedOrderAmount) >= _fillQuantity,
            "IssuanceOrderModule.settleOrder: Fill amount exceeds order available quantity"
        );

        uint256[] memory requiredBalances = new uint256[](_order.requiredComponents.length);

        // Calculate amount of maker token required
        uint256 requiredMakerTokenAmount = OrderLibrary.getPartialAmount(
            _order.makerTokenAmount,
            _fillQuantity,
            _order.quantity
        );

        // Calculate amount of component tokens required to issue
        for (uint16 i = 0; i < _order.requiredComponents.length; i++) {
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

        // Execute exchange orders
        uint256 makerTokenAmountUsed = executeExchangeOrders(
            _orderData,
            _order.makerAddress,
            _order.makerToken
        );

        // Verify maker token used is less than amount allocated that user signed
        require(
            makerTokenAmountUsed <= requiredMakerTokenAmount,
            "IssuanceOrderModule.settleOrder: Maker token used exceeds allotted limit"
        );

        // Check that maker's component tokens in Vault have been incremented correctly
        for (i = 0; i < _order.requiredComponents.length; i++) {
            uint256 currentBal = vaultInstance.getOwnerBalance(
                _order.requiredComponents[i],
                _order.makerAddress
            );
            require(
                currentBal >= requiredBalances[i],
                "IssuanceOrderModule.settleOrder: Insufficient component tokens acquired"
            );
        }

        // Settle relayer and taker accounts
        settleAccounts(
            _order,
            _fillQuantity,
            requiredMakerTokenAmount,
            makerTokenAmountUsed
        );

        // Tally fill in orderFills mapping
        orderFills[_order.orderHash] = orderFills[_order.orderHash].add(_fillQuantity);
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

        uint256 makerFee;
        uint256 takerFee;

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
}
