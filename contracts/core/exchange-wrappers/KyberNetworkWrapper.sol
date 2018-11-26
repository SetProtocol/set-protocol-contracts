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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ERC20Wrapper as ERC20 } from "../../lib/ERC20Wrapper.sol";
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
     * maker                            Issuance order maker
     * ----------------- Unused -----------------
     * makerToken                       Address of maker token used in exchange orders
     * makerAssetAmount                 Amount of issuance order maker token to use on this exchange
     * orderCount                       Expected number of orders to execute
     * fillQuantity                     Quantity of Set to be filled
     * attemptedfillQuantity            Quantity of Set taker attempted to fill
     *
     * @param  _addresses               [maker, --, makerToken]
     * @param  _values                  [makerAssetAmount, orderCount, fillQuantity, attemptedFillQuantity]
     * @param  _tradesData              Arbitrary bytes data for any information to pass to the exchange
     * @return  address[]               The addresses of required components
     * @return  uint256[]               The quantities of required components retrieved by the wrapper
     */
    function exchange(
        address[3] _addresses,
        uint256[4] _values,
        bytes _tradesData
    )
        external
        returns (address[], uint256[])
    {
        require(
            ICore(core).validModules(msg.sender),
            "KyberNetworkWrapper.exchange: Sender must be approved module"
        );

        // Ensure the issuance order maker token is allowed to be transferred by KyberNetworkProxy as the source token
        ERC20.ensureAllowance(
            _addresses[2], // makerToken
            address(this),
            kyberNetworkProxy,
            _values[0] // makerAssetAmount
        );

        uint256 orderCount = _values[1];
        address[] memory componentTokensReceived = new address[](orderCount);
        uint256[] memory componentTokensAmounts = new uint256[](orderCount);

        // Parse and execute the trade at the current offset via the KyberNetworkProxy, each kyber trade is 128 bytes
        for (uint256 i = 0; i < orderCount; i++) {
            (componentTokensReceived[i], componentTokensAmounts[i]) = tradeOnKyberReserve(
                _addresses[2], // makerToken
                _tradesData,
                i.mul(128),
                _values[2], // fillQuantity
                _values[3] // attemptedFillQuantity
            );
        }

        settleLeftoverMakerToken(
            _addresses[2], // makerToken
            _addresses[0] // makerAddress
        );

        return (
            componentTokensReceived,
            componentTokensAmounts
        );
    }

    /* ============ Private ============ */

    /**
     * Parses and executes Kyber trade
     *
     * @param _sourceToken              Address of issuance order maker token to use as source token in Kyber trade
     * @param  _tradesData              Kyber trade parameter struct
     * @param  _offset                  Start of current Kyber trade to execute
     * @param  _fillQuantity            Quantity of Set to be filled
     * @param  _attemptedFillQuantity   Quantity of Set taker attempted to fill
     * @return address                  Address of set component to trade for
     * @return uint256                  Amount of set component received in trade
     */
    function tradeOnKyberReserve(
        address _sourceToken,
        bytes _tradesData,
        uint256 _offset,
        uint256 _fillQuantity,
        uint256 _attemptedFillQuantity
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
            _fillQuantity,
            _attemptedFillQuantity
        );

        uint256 destinationQuantityToTradeFor = OrderLibrary.getPartialAmount(
            trade.maxDestinationQuantity,
            _fillQuantity,
            _attemptedFillQuantity
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
