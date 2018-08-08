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
contract ZeroExExchangeWrapper {
    using SafeMath for uint256;

    /* ============ Structs ============ */

    struct TakerFillResults {
        address token;
        uint256 fillAmount;
    }

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
     * @param  _taker              Taker wallet address
     * @param  _orderCount         Amount of orders in exchange request
     * @param  _orderData          Encoded taker wallet order data
     * @return Array of token addresses executed in orders
     * @return Array of token amounts executed in orders
     */
    function exchange(
        address _taker,
        uint256 _orderCount,
        bytes _orderData
    )
        external
        returns (address[], uint256[])
    {
        address[] memory takerTokens = new address[](_orderCount);
        uint256[] memory takerAmounts = new uint256[](_orderCount);

        uint256 orderNum = 0;
        uint256 offset = 0;
        while (offset < _orderData.length) {
            bytes memory zeroExOrder = OrderHandler.sliceOrderBody(_orderData, offset);
            
            TakerFillResults memory takerFillResults = fillZeroExOrder(zeroExOrder);

            // TODO: optimize so that fill results are aggregated on a per-token basis
            takerTokens[orderNum] = takerFillResults.token;
            takerAmounts[orderNum] = takerFillResults.fillAmount;

            // Update current bytes
            offset += OrderHandler.getZeroExOrderDataLength(_orderData, offset);
            orderNum += 1;
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
     * @param  _zeroExOrderData   Bytes array for a 0x order, its signature, and the fill amount
     */
    function fillZeroExOrder(
        bytes memory _zeroExOrderData
    )
        private
        returns (TakerFillResults memory)
    {
        OrderHandler.OrderHeader memory header = OrderHandler.parseOrderHeader(_zeroExOrderData);
        bytes memory signature = OrderHandler.parseSignature(header.signatureLength, _zeroExOrderData);
        ZeroExOrder.Order memory order = OrderHandler.parseZeroExOrder(_zeroExOrderData);

        // Ensure the maker token is allowed to be transferred by ZeroEx Proxy
        address takerToken = OrderHandler.parseERC20TokenAddress(order.takerAssetData);
        ERC20.ensureAllowance(
            takerToken,
            address(this),
            zeroExProxy,
            order.takerAssetAmount
        );

        ZeroExFillResults.FillResults memory fillResults = ZeroExExchange(zeroExExchange).fillOrKillOrder(
            order,
            header.fillAmount,
            signature
        );

        // Ensure the maker token is allowed to be transferred by Set TransferProxy
        address makerToken = OrderHandler.parseERC20TokenAddress(order.makerAssetData);
        ERC20.ensureAllowance(
            makerToken,
            address(this),
            setTransferProxy,
            order.makerAssetAmount
        );

        return TakerFillResults({
            token: takerToken,
            fillAmount: fillResults.takerAssetFilledAmount
        });
    }
}
