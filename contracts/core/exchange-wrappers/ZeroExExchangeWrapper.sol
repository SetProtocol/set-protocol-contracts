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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonMath } from "../../lib/CommonMath.sol";
import { ERC20Wrapper as ERC20 } from "../../lib/ERC20Wrapper.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IExchange as ZeroExExchange } from "../../external/0x/Exchange/interfaces/IExchange.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { LibFillResults as ZeroExFillResults } from "../../external/0x/Exchange/libs/LibFillResults.sol";
import { LibOrder as ZeroExOrder } from "../../external/0x/Exchange/libs/LibOrder.sol";
import { OrderLibrary } from "../lib/OrderLibrary.sol";
import { ZeroExOrderDataHandler as OrderHandler } from "./lib/ZeroExOrderDataHandler.sol";


/**
 * @title ZeroExExchangeWrapper
 * @author Set Protocol
 *
 * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2
 */
contract ZeroExExchangeWrapper {
    using LibBytes for bytes;
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    address public core;
    address public zeroExExchange;
    address public zeroExProxy;
    address public zeroExToken;
    address public setTransferProxy;

    /* ============ Constructor ============ */

    /**
     * Initialize exchange wrapper with required addresses to facilitate 0x orders
     *
     * @param _core                 Deployed Core contract
     * @param _zeroExExchange       0x Exchange contract for filling orders
     * @param _zeroExProxy          0x Proxy contract for transferring
     * @param _zeroExToken          ZRX token contract addressed used for 0x relayer fees
     * @param _setTransferProxy     Set Protocol transfer proxy contract
     */
    constructor(
        address _core,
        address _zeroExExchange,
        address _zeroExProxy,
        address _zeroExToken,
        address _setTransferProxy
    )
        public
    {
        core = _core;
        zeroExExchange = _zeroExExchange;
        zeroExProxy = _zeroExProxy;
        zeroExToken = _zeroExToken;
        setTransferProxy = _setTransferProxy;

        // Approve transfer of 0x token from this wrapper in the event of zeroExOrder relayer fees
        ERC20.approve(
            _zeroExToken,
            _zeroExProxy,
            CommonMath.maxUInt256()
        );
    }

    /* ============ Public Functions ============ */

    /**
     * IExchangeWrapper interface delegate method.
     * Parses 0x exchange orders and executes them for Set component tokens
     *
     * -- Unused address of issuance order signer to conform to IExchangeWrapper --
     * @param  _takerAddress        Address of user filling the issuance order with 0x orders
     * @param  _makerToken          Address of maker token used in exchange orders
     * @param  _makerAssetAmount    Amount of issuance order maker token to use on this exchange
     * @param  _orderCount          Amount of orders in exchange request
     * @param  _ordersData          Byte string containing (multiple) 0x wrapper orders
     * @return address[]            Array of Set component token addresses executed in orders
     * @return uint256[]            Array of Set component token amounts executed in orders
     */
    function exchange(
        address,
        address _takerAddress,
        address _makerToken,
        uint256 _makerAssetAmount,
        uint256 _orderCount,
        bytes _ordersData
    )
        external
        returns (address[], uint256[])
    {
        require(
            ICore(core).validModules(msg.sender),
            "ZeroExExchangeWrapper.exchange: Sender must be approved module"
        );

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
                _takerAddress,
                _makerToken,
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
     * @param  _issuanceOrderFiller  Address of user filling the issuance order with 0x orders
     * @param  _takerToken           Taker token address (issuance order maker token) of 0x order
     * @param  _ordersData           Byte string containing (multiple) 0x wrapper orders
     * @param  _offset               Start of current 0x order to fill
     * @return address               Address of set component (0x makerToken) in 0x order
     * @return uint256               Amount of 0x order makerTokenAmount received
     * @return uint256               Bytes of _ordersData scanned as part of this order
     */
    function fillZeroExOrder(
        address _issuanceOrderFiller,
        address _takerToken,
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
        uint256 orderBodyStart = _offset.add(header.signatureLength).add(96);

        // Grab signature of current wrapper order after the header of length 96 and before the start of the body
        bytes memory signature = _ordersData.slice(
            _offset.add(96),
            orderBodyStart
        );

        // Parse 0x order of current wrapper order
        ZeroExOrder.Order memory order = OrderHandler.parseZeroExOrder(
            _ordersData,
            header.makerTokenAddress,
            _takerToken,
            orderBodyStart
        );

        // Tranfer ZRX fee from taker if applicable
        if (order.takerFee > 0) {
            transferRelayerFee(
                order.takerFee,
                order.takerAssetAmount,
                _issuanceOrderFiller,
                header.fillAmount
            );
        }

        // Fill 0x order via their Exchange contract
        ZeroExFillResults.FillResults memory fillResults = ZeroExExchange(zeroExExchange).fillOrKillOrder(
            order,
            header.fillAmount,
            signature
        );

        return (
            header.makerTokenAddress,
            fillResults.makerAssetFilledAmount,
            orderBodyStart.add(320)
        );
    }

    /**
     * Transfers fees from the issuance order filler to this wrapper in the event of taker relayer fees on the 0x order
     *
     * @param  _takerFee                   Taker fee of the 0x order
     * @param  _takerAssetAmount           Taker asset of the original
     * @param  _issuanceOrderFiller        Address of issuance order taker who is supploying ZRX
     * @param  _fillAmount                 Amount of takerAssetAmount to fill to calculate partial fee
     */
    function transferRelayerFee(
        uint256 _takerFee,
        uint256 _takerAssetAmount,
        address _issuanceOrderFiller,
        uint256 _fillAmount
    )
        private
    {
        // Calculate amount of taker fee to transfer if fill quantity of 0x order is not for the full takerAssetAmount
        uint256 takerFeeToTransfer = OrderLibrary.getPartialAmount(
            _takerFee,
            _fillAmount,
            _takerAssetAmount
        );

        // Transfer ZRX from issuance order taker to this wrapper
        ERC20.transferFrom(
            zeroExToken,
            _issuanceOrderFiller,
            address(this),
            takerFeeToTransfer
        );
    }
}
