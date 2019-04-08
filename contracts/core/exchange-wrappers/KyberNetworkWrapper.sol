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

import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ExchangeWrapperLibrary } from "../lib/ExchangeWrapperLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { KyberNetworkProxyInterface } from "../../external/KyberNetwork/KyberNetworkProxyInterface.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";


/**
 * @title KyberNetworkWrapper
 * @author Set Protocol
 *
 * The KyberNetworkWrapper contract wrapper to interface with KyberNetwork for reserve liquidity
 */
contract KyberNetworkWrapper {
    using LibBytes for bytes;
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    address public core;
    address public kyberNetworkProxy;
    address public setTransferProxy;

    uint256 public KYBER_TRADE_LENGTH = 160;

    // ============ Structs ============

    struct KyberTrade {
        address destinationToken;
        address sourceToken;
        uint256 sourceTokenQuantity;
        uint256 minimumConversionRate;
        uint256 maxDestinationQuantity;
    }

    /* ============ Constructor ============ */

    /**
     * Initialize exchange wrapper with required addresses to facilitate Kyber trades
     *
     * @param  _core                 Deployed Core contract
     * @param  _kyberNetworkProxy    KyberNetwork contract for filling orders
     * @param  _setTransferProxy     Set Protocol transfer proxy contract
     */
    constructor(
        address _core,
        address _kyberNetworkProxy,
        address _setTransferProxy
    )
        public
    {
        core = _core;
        kyberNetworkProxy = _kyberNetworkProxy;
        setTransferProxy = _setTransferProxy;
    }

    /* ============ Public Functions ============ */

    /**
     * Returns the conversion rate between the issuance order maker token and the set component token
     * in 18 decimals, regardless of component token's decimals
     *
     * @param  _sourceTokens         Address of source token used in exchange orders
     * @param  _destinationTokens    Address of destination token to trade for
     * @param  _quantities           Amount of maker token to exchange for component token
     * @return uint256[]             Conversion rate in wei
     * @return uint256[]             Slippage in wei
     */
    function conversionRate(
        address[] calldata _sourceTokens,
        address[] calldata _destinationTokens,
        uint256[] calldata _quantities
    )
        external
        view
        returns (uint256[] memory, uint256[] memory)
    {
        uint256 rateCount = _sourceTokens.length;
        uint256[] memory expectedRates = new uint256[](rateCount);
        uint256[] memory slippageRates = new uint256[](rateCount);
        
        for (uint256 i = 0; i < rateCount; i++) {
            (expectedRates[i], slippageRates[i]) = KyberNetworkProxyInterface(kyberNetworkProxy).getExpectedRate(
                _sourceTokens[i],
                _destinationTokens[i],
                _quantities[i]
            );
        }

        return (
            expectedRates,
            slippageRates
        );
    }

    /**
     * IExchangeWrapper interface delegate method.
     *
     * Parses and executes Kyber trades. Depending on conversion rate, Kyber trades may result in change.
     * We currently pass change back to the issuance order maker, exploring how it can safely be passed to the taker.
     *
     *
     * @param  _exchangeData            Standard exchange wrapper interface object containing exchange metadata
     * @param  _tradesData              Arbitrary bytes data for any information to pass to the exchange
     * @return ExchangeWrapperLibrary.ExchangeResults  Struct containing component acquisition results
     */
    function exchange(
        ExchangeWrapperLibrary.ExchangeData memory _exchangeData,
        bytes memory _tradesData
    )
        public
        returns (ExchangeWrapperLibrary.ExchangeResults memory)
    {
        require(
            ICore(core).validModules(msg.sender),
            "KyberNetworkWrapper.exchange: Sender must be approved module"
        );

        uint256 tradesCount = _exchangeData.orderCount;
        address[] memory sendTokens = new address[](tradesCount);
        address[] memory receiveTokens = new address[](tradesCount);
        uint256[] memory receiveTokensAmounts = new uint256[](tradesCount);

        // Parse and execute the trade at the current offset via the KyberNetworkProxy, each kyber trade is 160 bytes
        for (uint256 i = 0; i < tradesCount; i++) {
            // Parse Kyber trade at the current offset
            KyberTrade memory trade = parseKyberTrade(
                _tradesData,
                i.mul(KYBER_TRADE_LENGTH)
            );

            // Ensure the caller's source token is allowed to be transferred by 
            // KyberNetworkProxy as the source token
            ERC20Wrapper.ensureAllowance(
                trade.sourceToken,
                address(this),
                kyberNetworkProxy,
                trade.sourceTokenQuantity
            );

            // Track the send tokens to ensure any leftovers are returned to the user
            sendTokens[i] = trade.sourceToken;

            // Execute Kyber trade
            (receiveTokens[i], receiveTokensAmounts[i]) = tradeOnKyberReserve(trade);
        }

        // Return leftover send tokens to the original caller
        ExchangeWrapperLibrary.returnLeftoverSendTokens(
            sendTokens,
            _exchangeData.caller
        );

        return ExchangeWrapperLibrary.ExchangeResults({
            receiveTokens: receiveTokens,
            receiveTokenAmounts: receiveTokensAmounts
        });
    }

    /* ============ Private ============ */

    /**
     * Parses and executes Kyber trade
     *
     * @return address                  Address of set component to trade for
     * @return uint256                  Amount of set component received in trade
     */
    function tradeOnKyberReserve(
        KyberTrade memory _trade
    )
        private
        returns (address, uint256)
    {
        // Execute Kyber trade via deployed KyberNetworkProxy contract
        uint256 destinationTokenQuantity = KyberNetworkProxyInterface(kyberNetworkProxy).trade(
            _trade.sourceToken,
            _trade.sourceTokenQuantity,
            _trade.destinationToken,
            address(this),
            _trade.maxDestinationQuantity,
            _trade.minimumConversionRate,
            address(0)
        );

        // Ensure the destination token is allowed to be transferred by Set TransferProxy
        ERC20Wrapper.ensureAllowance(
            _trade.destinationToken,
            address(this),
            setTransferProxy,
            destinationTokenQuantity
        );

        return (
            _trade.destinationToken,
            destinationTokenQuantity
        );
    }

    /*
     * Parses the bytes array for a Kyber trade
     *
     * | Data                       | Location                      |
     * |----------------------------|-------------------------------|
     * | destinationToken           | 0                             |
     * | sourceTokenQuantity        | 32                            |
     * | sourceTokenQuantity        | 64                            |
     * | minimumConversionRate      | 96                            |
     * | maxDestinationQuantity     | 128                           |
     *
     * @param  _tradesData    Byte array of (multiple) Kyber trades
     * @param  _offset        Offset to start scanning for Kyber trade body
     * @return KyberTrade     KyberTrade struct
     */
    function parseKyberTrade(
        bytes memory _tradesData,
        uint256 _offset
    )
        private
        pure
        returns (KyberTrade memory)
    {
        KyberTrade memory trade;

        uint256 tradeDataStart = _tradesData.contentAddress().add(_offset);

        assembly {
            mstore(trade,           mload(tradeDataStart))            // destinationToken
            mstore(add(trade, 32),  mload(add(tradeDataStart, 32)))   // sourceToken
            mstore(add(trade, 64),  mload(add(tradeDataStart, 64)))   // sourceTokenQuantity
            mstore(add(trade, 96),  mload(add(tradeDataStart, 96)))   // minimumConversionRate
            mstore(add(trade, 128), mload(add(tradeDataStart, 128)))  // maxDestinationQuantity
        }

        return trade;
    }
}
