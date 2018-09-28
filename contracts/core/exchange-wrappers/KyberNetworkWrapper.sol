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
import { Authorizable } from "../../lib/Authorizable.sol";
import { ERC20Wrapper as ERC20 } from "../../lib/ERC20Wrapper.sol";
import { KyberNetworkProxyInterface } from "../../external/KyberNetwork/KyberNetworkProxyInterface.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";


/**
 * @title KyberNetworkWrapper
 * @author Set Protocol
 *
 * The KyberNetworkWrapper contract wrapper to interface with KyberNetwork for reserve liquidity
 */
contract KyberNetworkWrapper is
    Authorizable
{
    using LibBytes for bytes;
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    address public kyberNetworkProxy;
    address public setTransferProxy;

    // ============ Structs ============

    struct KyberTrade {
        address sourceToken;
        address destinationToken;
        uint256 sourceTokenQuantity;
        uint256 minimumConversionRate;
        uint256 maxDestinationQuantity;
    }

    /* ============ Constructor ============ */

    /**
     * Initialize exchange wrapper with required addresses to facilitate Kyber trades
     *
     * @param  _kyberNetworkProxy    KyberNetwork contract for filling orders
     * @param  _setTransferProxy     Set Protocol transfer proxy contract
     */
    constructor(
        address _kyberNetworkProxy,
        address _setTransferProxy
    )
        public
        Authorizable(2592000) // about 4 weeks
    {
        kyberNetworkProxy = _kyberNetworkProxy;
        setTransferProxy = _setTransferProxy;
    }

    /* ============ Public Functions ============ */

    /**
     * IExchangeWrapper interface delegate method.
     *
     * Parses and executes Kyber trades. Depending on conversion rate, Kyber trades may result in change.
     * We currently pass change back to the issuance order maker, exploring how it can safely be passed to the taker.
     *
     *
     * @param  _maker               Address of issuance order signer to conform to IExchangeWrapper
     * -- Unused address of fillOrder caller to conform to IExchangeWrapper --
     * @param  _makerToken          Address of maker token used in exchange orders
     * @param  _makerAssetAmount    Amount of issuance order maker token to use on this exchange
     * @param  _tradeCount          Amount of trades in exchange request
     * @param  _tradesData          Byte string containing (multiple) Kyber trades
     * @return address[]            Array of token addresses traded for
     * @return uint256[]            Array of token amounts traded for
     */
    function exchange(
        address _maker,
        address,
        address _makerToken,
        uint256 _makerAssetAmount,
        uint256 _tradeCount,
        bytes _tradesData
    )
        external
        onlyAuthorized
        returns (address[], uint256[])
    {
        // Ensure the issuance order maker token is allowed to be transferred by KyberNetworkProxy as the source token
        ERC20.ensureAllowance(
            _makerToken,
            address(this),
            kyberNetworkProxy,
            _makerAssetAmount
        );

        address[] memory componentTokensReceived = new address[](_tradeCount);
        uint256[] memory componentTokensAmounts = new uint256[](_tradeCount);

        // Parse and execute the trade at the current offset via the KyberNetworkProxy, each kyber trade is 160 bytes
        for (uint256 i = 0; i < _tradeCount; i++) {
            (componentTokensReceived[i], componentTokensAmounts[i]) = tradeOnKyberReserve(
                _tradesData,
                i.mul(160)
            );
        }

        // Transfer any unused or remainder maker token back to the issuance order user
        uint remainderSourceToken = ERC20.balanceOf(_makerToken, this);
        if (remainderSourceToken > 0) {
            ERC20.transfer(
                _makerToken,
                _maker,
                remainderSourceToken
            );
        }

        return (
            componentTokensReceived,
            componentTokensAmounts
        );
    }

    /* ============ Private ============ */

    /**
     * Parses and executes Kyber trade
     *
     * @param  _tradesData     Kyber trade parameter struct
     * @param  _offset         Start of current Kyber trade to execute
     * @return address         Address of set component to trade for
     * @return uint256         Amount of set component received in trade
     */
    function tradeOnKyberReserve(
        bytes _tradesData,
        uint256 _offset
    )
        private
        returns (address, uint256)
    {
        // Parse Kyber trade at the current offset
        KyberTrade memory trade = parseKyberTrade(
            _tradesData,
            _offset
        );

        uint256 destinationTokenQuantity = KyberNetworkProxyInterface(kyberNetworkProxy).trade(
            trade.sourceToken,
            trade.sourceTokenQuantity,
            trade.destinationToken,
            address(this),
            trade.maxDestinationQuantity,
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
     * | sourceToken                | 0                             |
     * | destinationToken           | 32                            |
     * | sourceTokenQuantity        | 64                            |
     * | minimumConversionRate      | 98                            |
     * | maxDestinationQuantity     | 128                           |
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
            mstore(trade,           mload(tradeDataStart))           // sourceToken
            mstore(add(trade, 32),  mload(add(tradeDataStart, 32)))  // destinationToken
            mstore(add(trade, 64),  mload(add(tradeDataStart, 64)))  // sourceTokenQuantity
            mstore(add(trade, 96),  mload(add(tradeDataStart, 96)))  // minimumConversionRate
            mstore(add(trade, 128), mload(add(tradeDataStart, 128))) // maxDestinationQuantity
        }

        return trade;
    }
}
