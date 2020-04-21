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

pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ExchangeWrapperLibrary } from "../lib/ExchangeWrapperLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IExchange } from "../../external/0x/Exchange/interfaces/IExchange.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { LibFillResults } from "../../external/0x/Exchange/libs/LibFillResults.sol";
import { LibOrder } from "../../external/0x/Exchange/libs/LibOrder.sol";
import { ZeroExOrderLibrary } from "./lib/ZeroExOrderLibrary.sol";


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
        ERC20Wrapper.approve(
            _zeroExToken,
            _zeroExProxy,
            CommonMath.maxUInt256()
        );
    }

    /* ============ Public Functions ============ */

    /**
     * Parses 0x exchange orders and executes them for Set component tokens
     *
     *
     * @param  _exchangeData            Standard exchange wrapper interface object containing exchange metadata
     * @param  _ordersData              Arbitrary bytes data for any information to pass to the exchange
     * @return ExchangeWrapperLibrary.ExchangeResults  Struct containing component acquisition results
     */
    function exchange(
        ExchangeWrapperLibrary.ExchangeData memory _exchangeData,
        bytes memory _ordersData
    )
        public
        returns (ExchangeWrapperLibrary.ExchangeResults memory)
    {
        require(
            ICore(core).validModules(msg.sender),
            "ZeroExExchangeWrapper.exchange: Sender must be approved module"
        );

        uint256 tradesCount = _exchangeData.orderCount;
        address[] memory sendTokens = new address[](tradesCount);
        address[] memory receiveTokens = new address[](tradesCount);
        uint256[] memory receiveTokenAmounts = new uint256[](tradesCount);

        uint256 scannedBytes = 0;
        for (uint256 i = 0; i < _exchangeData.orderCount; i++) {
            ZeroExOrderLibrary.ZeroExOrderInformation memory orderInformation;
            uint256 orderBodyStart;

            // Parse order i's information
            (orderInformation, orderBodyStart) = parseOrderInformation(
                _ordersData,
                scannedBytes
            );

            // Track the send tokens to ensure any leftovers are returned to the user
            sendTokens[i] = orderInformation.takerToken;

            // Fill the order via the 0x exchange
            (receiveTokens[i], receiveTokenAmounts[i]) = fillZeroExOrder(
                _exchangeData.caller,
                orderInformation
            );

            // Ensure the received token can be transfered via the Set transfer proxy
            ERC20Wrapper.ensureAllowance(
                receiveTokens[i],
                address(this),
                setTransferProxy,
                receiveTokenAmounts[i]
            );

            // Update current bytes
            scannedBytes = orderBodyStart.add(384);
        }

        // Return leftover send tokens to the original caller
        ExchangeWrapperLibrary.returnLeftoverSendTokens(
            sendTokens,
            _exchangeData.caller
        );

        return ExchangeWrapperLibrary.ExchangeResults({
            receiveTokens: receiveTokens,
            receiveTokenAmounts: receiveTokenAmounts
        });
    }

    /* ============ Private ============ */

    /**
     * Parses and executes 0x order from orders data bytes
     *
     * @param  _caller                  Address of user issuing or redeeming using 0x orders
     * @param  _orderInformation        Object with parsed 0x order, signature, header, and maker/taker tokens
     * @return address                  Address of set component (0x makerToken) in 0x order
     * @return uint256                  Amount of 0x order makerTokenAmount received
     */
    function fillZeroExOrder(
        address _caller,
        ZeroExOrderLibrary.ZeroExOrderInformation memory _orderInformation
    )
        private
        returns (address, uint256)
    {
        LibOrder.Order memory order = _orderInformation.order;
        ZeroExOrderLibrary.OrderHeader memory header = _orderInformation.header;

        // Ensure the taker token is allowed to be transferred by ZeroEx Proxy
        ERC20Wrapper.ensureAllowance(
            _orderInformation.takerToken,
            address(this),
            zeroExProxy,
            order.takerAssetAmount
        );

        // Calculate actual fill amount
        uint256 zeroExFillAmount = header.fillAmount;

        // Tranfer ZRX fee from taker if applicable
        if (order.takerFee > 0) {
            transferRelayerFee(
                order.takerFee,
                order.takerAssetAmount,
                _caller,
                zeroExFillAmount
            );
        }

        // Fill 0x order via their Exchange contract
        LibFillResults.FillResults memory fillResults = IExchange(zeroExExchange).fillOrKillOrder(
            order,
            zeroExFillAmount,
            header.signature
        );

        return (
            _orderInformation.makerToken,
            fillResults.makerAssetFilledAmount
        );
    }

    /**
     * Transfers fees from the caller to this wrapper in the event of taker relayer fees on the 0x order
     *
     * @param  _takerFee                   Taker fee of the 0x order
     * @param  _takerAssetAmount           Taker asset of the original
     * @param  _caller                     Address of original caller who is supploying ZRX
     * @param  _fillAmount                 Amount of takerAssetAmount to fill to calculate partial fee
     */
    function transferRelayerFee(
        uint256 _takerFee,
        uint256 _takerAssetAmount,
        address _caller,
        uint256 _fillAmount
    )
        private
    {
        // Calculate amount of taker fee to transfer if fill quantity of 0x order is not for the full takerAssetAmount
        uint256 takerFeeToTransfer = CommonMath.getPartialAmount(
            _takerFee,
            _fillAmount,
            _takerAssetAmount
        );

        // Transfer ZRX from the caller to this wrapper
        ERC20Wrapper.transferFrom(
            zeroExToken,
            _caller,
            address(this),
            takerFeeToTransfer
        );
    }

    /**
     * Parses 0x order and returns order with offset in bytestring to parse next order
     *
     * @param  _ordersData              Arbitrary bytes data for any information to pass to the exchange
     * @param  _offset                  Where to start the parsing of the _ordersData bytestring
     * @return ZeroExOrderInformation   Object with parsed 0x order, signature, header, and maker/taker tokens
     * @return uint256                  Tracks how many bytes in _ordersData have been parsed
     */
    function parseOrderInformation(
        bytes memory _ordersData,
        uint256 _offset
    )
        private
        pure
        returns (ZeroExOrderLibrary.ZeroExOrderInformation memory, uint256)
    {
        // Parse header of current wrapper order
        ZeroExOrderLibrary.OrderHeader memory header = ZeroExOrderLibrary.parseOrderHeader(
            _ordersData,
            _offset
        );

        // Helper to reduce math, keeping the position of the start of the next 0x order body
        uint256 orderBodyStart = _offset.add(header.signatureLength).add(64);

        // Grab signature of current wrapper order after the header of length 64 and before the start of the body
        header.signature = _ordersData.slice(
            _offset.add(64),
            orderBodyStart
        );

        // Parse 0x order of current wrapper order
        LibOrder.Order memory order = ZeroExOrderLibrary.parseZeroExOrder(_ordersData, orderBodyStart);
        address makerToken = ZeroExOrderLibrary.parseMakerTokenFromZeroExOrder(_ordersData, orderBodyStart);
        address takerToken = ZeroExOrderLibrary.parseTakerTokenFromZeroExOrder(_ordersData, orderBodyStart);

        ZeroExOrderLibrary.ZeroExOrderInformation memory orderInformation = ZeroExOrderLibrary.ZeroExOrderInformation({
            header: header,
            order: order,
            makerToken: makerToken,
            takerToken: takerToken
        });

        return (orderInformation, orderBodyStart);
    }
}
