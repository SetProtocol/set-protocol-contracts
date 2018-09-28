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
    using LibBytes for bytes;
    using SafeMath for uint256;

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
     * Parses 0x exchange orders and executes them for Set component tokens
     *
     * TODO: We are currently assuming no taker fee. Add in taker fee going forward
     *
     * -- Unused address of issuance order signer to conform to IExchangeWrapper --
     * -- Unused address of fillOrder caller to conform to IExchangeWrapper --
     * @param  _makerToken          Address of maker token used in exchange orders
     * @param  _makerAssetAmount    Amount of issuance order maker token to use on this exchange
     * @param  _orderCount          Amount of orders in exchange request
     * @param  _ordersData          Byte string containing (multiple) 0x wrapper orders
     * @return address[]            Array of Set component token addresses executed in orders
     * @return uint256[]            Array of Set component token amounts executed in orders
     */
    function exchange(
        address,
        address,
        address _makerToken,
        uint256 _makerAssetAmount,
        uint256 _orderCount,
        bytes _ordersData
    )
        external
        onlyAuthorized
        returns (address[], uint256[])
    {
        // Ensure the taker token is allowed to be transferred by ZeroEx Proxy
        ERC20.ensureAllowance(
            _makerToken,
            address(this),
            zeroExProxy,
            _makerAssetAmount
        );

        address[] memory componentTokensReceived = new address[](_orderCount);
        uint256[] memory componentTokensAmounts = new uint256[](_orderCount);

        uint256 scannedBytes = 0;
        for (uint256 i = 0; i < _orderCount; i++) {

            // Fill the order via the 0x exchange
            uint256 bytesScanned;
            (componentTokensReceived[i], componentTokensAmounts[i], bytesScanned) = fillZeroExOrder(
                _ordersData,
                scannedBytes
            );

            ERC20.ensureAllowance(
                componentTokensReceived[i],
                address(this),
                setTransferProxy,
                componentTokensAmounts[i]
            );

            // Update current bytes
            scannedBytes = bytesScanned;
        }

        return (
            componentTokensReceived,
            componentTokensAmounts
        );
    }

    /* ============ Private ============ */

    /**
     * Parses and executes 0x order from orders data bytes
     *
     * @param  _ordersData        Byte string containing (multiple) 0x wrapper orders
     * @param  _offset            Start of current 0x order to fill
     * @return address            Address of set component (0x makerToken) in 0x order
     * @return uint256            Amount of 0x order makerTokenAmount received
     */
    function fillZeroExOrder(
        bytes _ordersData,
        uint256 _offset
    )
        private
        returns (address, uint256, uint256)
    {
        // Parse header of current wrapper order
        OrderHandler.OrderHeader memory header = OrderHandler.parseOrderHeader(
            _ordersData,
            _offset
        );

        // Helper to reduce math, keeping the position of the start of the next 0x order body
        uint256 orderBodyStart = _offset.add(header.signatureLength).add(160);

        // Grab signature of current wrapper order after the header of length 160 and before the start of the body
        bytes memory signature = _ordersData.slice(
            _offset.add(160),
            orderBodyStart
        );

        // Parse 0x order of current wrapper order
        ZeroExOrder.Order memory order = OrderHandler.parseZeroExOrder(
            _ordersData,
            header,
            orderBodyStart
        );

        ZeroExFillResults.FillResults memory fillResults = ZeroExExchange(zeroExExchange).fillOrKillOrder(
            order,
            header.fillAmount,
            signature
        );

        return (
            OrderHandler.parseERC20TokenAddress(order.makerAssetData),
            fillResults.makerAssetFilledAmount,
            orderBodyStart.add(header.orderLength)
        );
    }
}
