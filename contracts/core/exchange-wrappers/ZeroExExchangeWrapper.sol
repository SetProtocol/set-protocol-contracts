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

import { Authorizable } from "../../lib/Authorizable.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { ERC20Wrapper as ERC20 } from "../../lib/ERC20Wrapper.sol";
import { IExchange as ZeroExExchange } from "../../external/0x/Exchange/interfaces/IExchange.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { LibFillResults as ZeroExFillResults } from "../../external/0x/Exchange/libs/LibFillResults.sol";
import { LibOrder as ZeroExOrder } from "../../external/0x/Exchange/libs/LibOrder.sol";
import { ZeroExOrderDataHandler as OrderHandler } from "./lib/ZeroExOrderDataHandler.sol";


/**
 * @title ZeroExExchangeWrapper
 * @author Set Protocol
 *
 * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2
 */
contract ZeroExExchangeWrapper is
    Authorizable
{
    using SafeMath for uint256;
    using LibBytes for bytes;

    /* ============ State Variables ============ */

    address public zeroExExchange;
    address public zeroExProxy;
    address public setTransferProxy;

    /* ============ Constructor ============ */

    /**
     * Initialize exchange wrapper with required addresses to facilitate 0x orders
     *
     * @param  _zeroExExchange     0x Exchange contract for filling orders
     * @param  _zeroExProxy        0x Proxy contract for transferring
     * @param  _setTransferProxy   Set Protocol transfer proxy contract
     */
    constructor(
        address _zeroExExchange,
        address _zeroExProxy,
        address _setTransferProxy
    )
        public
        Authorizable(2592000) // about 4 weeks
    {
        zeroExExchange = _zeroExExchange;
        zeroExProxy = _zeroExProxy;
        setTransferProxy = _setTransferProxy;
    }

    /* ============ Public Functions ============ */

    /**
     * IExchangeWrapper interface delegate method.
     * Parses 0x exchange orders and transfers tokens from taker's wallet.
     *
     * TODO: We are currently assuming no taker fee. Add in taker fee going forward
     *
     * @param  _             Unused address of fillOrder caller to conform to IExchangeWrapper
     * @param  _orderCount   Amount of orders in exchange request
     * @param  _ordersData   Byte string containing (multiple) 0x wrapper orders
     * @return address[]     Array of token addresses executed in orders
     * @return uint256[]     Array of token amounts executed in orders
     */
    function exchange(
        address _,
        uint256 _orderCount,
        bytes _ordersData
    )
        external
        onlyAuthorized
        returns (address[], uint256[])
    {
        address[] memory takerTokens = new address[](_orderCount);
        uint256[] memory takerAmounts = new uint256[](_orderCount);

        uint256 scannedBytes = 0;
        for (uint256 i = 0; i < _orderCount; i++) {
            // Parse header of current wrapper order
            OrderHandler.OrderHeader memory header = OrderHandler.parseOrderHeader(
                _ordersData,
                scannedBytes
            );

            // Helper reduce math, keeping the position of the start of the next 0x order body
            uint256 orderBodyStart = scannedBytes.add(header.signatureLength).add(160);

            // Grab signature of current wrapper order after the header of length 160 and before the start of the body
            bytes memory signature = _ordersData.slice(
                scannedBytes.add(160),
                orderBodyStart
            );

            // Parse 0x order of current wrapper order
            ZeroExOrder.Order memory order = OrderHandler.parseZeroExOrder(
                _ordersData,
                header,
                orderBodyStart
            );

            // Fill the order via the 0x exchange
            (takerTokens[i], takerAmounts[i]) = fillZeroExOrder(
                order,
                signature,
                header
            );

            // Update current bytes
            scannedBytes = orderBodyStart.add(header.orderLength);
        }

        return (
            takerTokens,
            takerAmounts
        );
    }

    /* ============ Private ============ */

    /**
     * Executes 0x order from signed order data
     *
     * @param  _order             0x order struct
     * @param  _signature         Signature for order
     * @param  _header            Struct containing wrapper order header data for order
     * @return TakerFillResults   0x fill order structs
     */
    function fillZeroExOrder(
        ZeroExOrder.Order memory _order,
        bytes memory _signature,
        OrderHandler.OrderHeader memory _header
    )
        private
        returns (address, uint256)
    {
        // Ensure the maker token is allowed to be transferred by ZeroEx Proxy
        address takerToken = OrderHandler.parseERC20TokenAddress(_order.takerAssetData);
        ERC20.ensureAllowance(
            takerToken,
            address(this),
            zeroExProxy,
            _order.takerAssetAmount
        );

        ZeroExFillResults.FillResults memory fillResults = ZeroExExchange(zeroExExchange).fillOrKillOrder(
            _order,
            _header.fillAmount,
            _signature
        );

        // Ensure the maker token is allowed to be transferred by Set TransferProxy
        address makerToken = OrderHandler.parseERC20TokenAddress(_order.makerAssetData);
        ERC20.ensureAllowance(
            makerToken,
            address(this),
            setTransferProxy,
            _order.makerAssetAmount
        );

        return (
            makerToken,
            fillResults.makerAssetFilledAmount
        );
    }
}
