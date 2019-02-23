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

import { ExchangeRedemptionLibrary } from "../lib/ExchangeRedemptionLibrary.sol";
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
 * The Exchange Redeek Module facilitates the exchangeRedemption function which allows
 * the redemption of a Set using exchange orders
 */
contract ExchangeRedemptionModule is
    ModuleCoreState,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event LogExchangeRedemption(
      address setAddress,
      address indexed callerAddress,
      address redemptionToken,
      uint256 quantity,
      uint256 redemptionTokenAmount
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

    /* ============ Public Functions ============ */

    /**
     * Performs trades via exchange wrappers to sell components and redeen a Set to the caller
     *
     * @param _exchangeRedemptionData                   A Struct containing exchange issue metadata
     * @param _orderData                           Bytes array containing the exchange orders to execute
     */
    function exchangeRedemption(
        ExchangeRedemptionLibrary.ExchangeRedemptionParams memory _exchangeRedemptionData,
        bytes _orderData
    )
        public
        nonReentrant
    {

        // Ensures validity of exchangeRedemption data parameters
        validateExchangeRedemption(_exchangeRedemptionData);

        // Redeem Set inside of Vault. This is done to save on gas transfer since redeeming to
        // the module then the exchange will require 2n transfers (where n = no. of tokens)v
        coreInstance.redeemInVault(
            _exchangeRedemptionData.setAddress,
            _exchangeRedemptionData.quantity
        );

        // Calculate correct amount of redemption tokens to be given
        uint256 requiredBalanceAfterExchanging = calculateRequiredBalance(
            _exchangeRedemptionData
        );

        // Execute exchange orders
        uint256 redemptionTokenAmountUsed = executeExchangeOrders(
            _orderData,
            _exchangeRedemptionData.redemptionToken
        );

        // Check correct amount of redemption tokens were given
        assertPostExchangeTokenBalance(
            _exchangeRedemptionData,
            requiredBalanceAfterExchanging,
            redemptionTokenAmountUsed
        );

        // Emit the log event
        emit LogExchangeRedemption(
            _exchangeRedemptionData.setAddress,
            msg.sender,
            _exchangeRedemptionData.redemptionToken,
            _exchangeRedemptionData.quantity,
            _exchangeRedemptionData.redemptionTokenAmount
        );

    }

    /* ============ Private Functions ============ */

    /**
     * Execute the exchange orders by parsing the order data and facilitating the transfers.
     * Each header represents a batch of orders from a particular exchange (0x, Kyber etc).
     *
     * @param _orderData                Bytes array containing the exchange orders to execute on
     * @param _redemptionTokenAddress   Address of the token to receive all funds in
     * @return redemptionTokenUsed      Amount of redemption token given after executing orders
     */

    function executeExchangeOrders(
        bytes _orderData,
        address _redemptionTokenAddress
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
            address exchangeWrapper = coreInstance.exchangeIds(header.exchange);

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

            // Call withdrawTo/withdrawModule to the exchangeWrapper

            // Construct the Exchange Data struct for callExchange interface
            ExchangeWrapperLibrary.ExchangeData memory exchangeData = ExchangeWrapperLibrary.ExchangeData({
                maker: msg.sender,
                taker: msg.sender,
                makerToken: _redemptionTokenAddress,
                makerAssetAmount: header.makerTokenAmount,
                orderCount: header.orderCount,
                fillQuantity: header.makerTokenAmount
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

    function assertPostExchangeTokenBalance(
        ExchangeRedemptionLibrary.ExchangeRedemptionParams _exchangeRedemptionData,
        uint256 _requiredBalance,
        uint256 _redemptionTokenAmountUsed
    )
        private
        view
    {

    }

    /**
     * Calculate the users's balance of the redemption token after the exchange orders have
     * been executed correctly
     */

    function calculateRequiredBalance(
        ExchangeRedemptionLibrary.ExchangeRedemptionParams _exchangeRedemptionData
    )
        private
        view
        returns (uint256)
    {

        uint256 tokenBalance = vaultInstance.getOwnerBalance(
            _exchangeRedemptionData.redemptionToken,
            msg.sender
        );

        return tokenBalance + _exchangeRedemptionData.redemptionTokenAmount;

    }

    /**
     * Validates exchangeRedemption inputs
     *
     * @param  _exchangeRedemptionData      Exchange redemption object containing exchange data
     */
    function validateExchangeRedemption(
        ExchangeRedemptionLibrary.ExchangeRedemptionParams _exchangeRedemptionData
    )
        private
        view
    {
        // Verify Set was created by Core and is enabled
        require(
            coreInstance.validSets(_exchangeRedemptionData.setAddress),
            "ExchangeRedemptionModule.validateOrder: Invalid or disabled SetToken address"
        );

        // Make sure redemption Token amount is greater than 0
        require(
            _exchangeRedemptionData.redemptionTokenAmount > 0,
            "ExchangeRedemptionModule.validateOrder: Maker token amount must be positive"
        );

        // Validate the redemption quantity
        ExchangeValidationLibrary.validateIssueQuantity(
            _exchangeRedemptionData.setAddress,
            _exchangeRedemptionData.quantity
        );

        // Validate required component fields and amounts
        ExchangeValidationLibrary.validateRequiredComponents(
            _exchangeRedemptionData.setAddress,
            _exchangeRedemptionData.requiredComponents,
            _exchangeRedemptionData.requiredComponentAmounts
        );
    }

}
