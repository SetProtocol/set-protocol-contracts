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

import { ERC20Wrapper as ERC20 } from "../../lib/ERC20Wrapper.sol";
import { ExchangeWrapperLibrary } from "../lib/ExchangeWrapperLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { KyberNetworkProxyInterface } from "../../external/KyberNetwork/KyberNetworkProxyInterface.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { OrderLibrary } from "../lib/OrderLibrary.sol";


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

    // ============ Structs ============

    struct KyberTrade {
        address destinationToken;
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
     * @param  _makerToken        Address of maker token used in exchange orders
     * @param  _componentToken    Address of set component token to trade for
     * @param  _quantity          Amount of maker token to exchange for component token
     * @return uint256            Conversion rate in wei
     * @return uint256            Slippage in wei
     */
    function conversionRate(
        address _makerToken,
        address _componentToken,
        uint256 _quantity
    )
        external
        view
        returns (uint256, uint256)
    {
        uint256 rate;
        uint256 slippage;
        (rate, slippage) = KyberNetworkProxyInterface(kyberNetworkProxy).getExpectedRate(
            _makerToken,
            _componentToken,
            _quantity
        );

        return (
            rate,
            slippage
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
        ExchangeWrapperLibrary.ExchangeData _exchangeData,
        bytes _tradesData
    )
        public
        returns (ExchangeWrapperLibrary.ExchangeResults)
    {
        require(
            ICore(core).validModules(msg.sender),
            "KyberNetworkWrapper.exchange: Sender must be approved module"
        );

        // Ensure the issuance order maker token is allowed to be transferred by KyberNetworkProxy as the source token
        ERC20.ensureAllowance(
            _exchangeData.makerToken,
            address(this),
            kyberNetworkProxy,
            _exchangeData.makerAssetAmount
        );

        OrderLibrary.FractionFilled memory fractionFilled = OrderLibrary.FractionFilled({
            filled: _exchangeData.fillQuantity,
            attempted: _exchangeData.attemptedFillQuantity
        });

        uint256 tradesCount = _exchangeData.orderCount;
        address[] memory componentTokensReceived = new address[](tradesCount);
        uint256[] memory componentTokensAmounts = new uint256[](tradesCount);

        // Parse and execute the trade at the current offset via the KyberNetworkProxy, each kyber trade is 128 bytes
        for (uint256 i = 0; i < tradesCount; i++) {
            (componentTokensReceived[i], componentTokensAmounts[i]) = tradeOnKyberReserve(
                _exchangeData.makerToken,
                _tradesData,
                i.mul(128),
                fractionFilled
            );
        }

        settleLeftoverMakerToken(
            _exchangeData.makerToken,
            _exchangeData.maker
        );

        return ExchangeWrapperLibrary.ExchangeResults({
            components: componentTokensReceived,
            componentQuantities: componentTokensAmounts
        });
    }

    /* ============ Private ============ */

    /**
     * Parses and executes Kyber trade
     *
     * @param _sourceToken              Address of issuance order maker token to use as source token in Kyber trade
     * @param  _tradesData              Kyber trade parameter struct
     * @param  _offset                  Start of current Kyber trade to execute
     * @param  _fractionFilled          Fraction of the issuance order that has been filled
     * @return address                  Address of set component to trade for
     * @return uint256                  Amount of set component received in trade
     */
    function tradeOnKyberReserve(
        address _sourceToken,
        bytes _tradesData,
        uint256 _offset,
        OrderLibrary.FractionFilled _fractionFilled
    )
        private
        returns (address, uint256)
    {
        // Parse Kyber trade at the current offset
        KyberTrade memory trade = parseKyberTrade(
            _tradesData,
            _offset
        );

        // Calculate actual source token used and actual max destination quantity
        uint256 sourceTokenQuantityToTrade = OrderLibrary.getPartialAmount(
            trade.sourceTokenQuantity,
            _fractionFilled.filled,
            _fractionFilled.attempted
        );

        uint256 destinationQuantityToTradeFor = OrderLibrary.getPartialAmount(
            trade.maxDestinationQuantity,
            _fractionFilled.filled,
            _fractionFilled.attempted
        );

        // Execute Kyber trade via deployed KyberNetworkProxy contract
        uint256 destinationTokenQuantity = KyberNetworkProxyInterface(kyberNetworkProxy).trade(
            _sourceToken,
            sourceTokenQuantityToTrade,
            trade.destinationToken,
            address(this),
            destinationQuantityToTradeFor,
            trade.minimumConversionRate,
            0
        );

        // Ensure the destination token is allowed to be transferred by Set TransferProxy
        ERC20.ensureAllowance(
            trade.destinationToken,
            address(this),
            setTransferProxy,
            destinationTokenQuantity
        );

        return (
            trade.destinationToken,
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
     * | minimumConversionRate      | 64                            |
     * | maxDestinationQuantity     | 96                            |
     *
     * @param  _tradesData    Byte array of (multiple) Kyber trades
     * @param  _offset        Offset to start scanning for Kyber trade body
     * @return KyberTrade     KyberTrade struct
     */
    function parseKyberTrade(
        bytes _tradesData,
        uint256 _offset
    )
        private
        pure
        returns (KyberTrade memory)
    {
        KyberTrade memory trade;

        uint256 tradeDataStart = _tradesData.contentAddress().add(_offset);

        assembly {
            mstore(trade,           mload(tradeDataStart))           // destinationToken
            mstore(add(trade, 32),  mload(add(tradeDataStart, 32)))  // sourceTokenQuantity
            mstore(add(trade, 64),  mload(add(tradeDataStart, 64)))  // minimumConversionRate
            mstore(add(trade, 96),  mload(add(tradeDataStart, 96)))  // maxDestinationQuantity
        }

        return trade;
    }

    /**
     * Checks if any maker tokens leftover and transfers to maker
     *
     * @param _makerToken       Address of maker token
     * @param _maker            Address of issuance order maker
     */
    function settleLeftoverMakerToken(
        address _makerToken,
        address _maker
    )
        private
    {
        // Transfer any unused or remainder maker token back to the issuance order user
        uint256 remainderMakerToken = ERC20.balanceOf(_makerToken, this);
        if (remainderMakerToken > 0) {
            ERC20.transfer(
                _makerToken,
                _maker,
                remainderMakerToken
            );
        }        
    }
}
