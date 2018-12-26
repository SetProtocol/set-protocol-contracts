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

import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ExchangeWrapperLibrary } from "../lib/ExchangeWrapperLibrary.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ITransferProxy } from "../interfaces/ITransferProxy.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { OrderLibrary } from "../lib/OrderLibrary.sol";


/**
 * @title TakerWalletWrapper
 * @author Set Protocol
 *
 * The TakerWalletWrapper contract wrapper to transfer tokens directly from order taker
 */
contract TakerWalletWrapper {
    using LibBytes for bytes;
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    address public core;
    address public transferProxy;

    /* ============ Constructor ============ */

    /**
     * Sets the transferProxy and Core address for the contract
     *
     * @param _core                 Deployed Core contract
     * @param _transferProxy        Address of current transferProxy
     */
    constructor(
        address _core,
        address _transferProxy
    )
        public
    {
        core = _core;
        transferProxy = _transferProxy;
    }

    /* ============ Public Functions ============ */

    /**
     * The TakerWalletWrapper contract wrapper to transfer tokens directly from order taker
     *
     * @param  _exchangeData            Standard exchange wrapper interface object containing exchange metadata
     * @param  _transfersData           Arbitrary bytes data for any information to pass to the exchange
     * @return ExchangeWrapperLibrary.ExchangeResults  Struct containing component acquisition results
     */
    function exchange(
        ExchangeWrapperLibrary.ExchangeData _exchangeData,
        bytes _transfersData
    )
        public
        returns(ExchangeWrapperLibrary.ExchangeResults)
    {
        require(
            ICore(core).validModules(msg.sender),
            "TakerWalletWrapper.exchange: Sender must be approved module"
        );

        OrderLibrary.FractionFilled memory fractionFilled = OrderLibrary.FractionFilled({
            filled: _exchangeData.fillQuantity,
            attempted: _exchangeData.attemptedFillQuantity
        });

        uint256 numOrders = _exchangeData.orderCount;
        address[] memory takerTokens = new address[](numOrders);
        uint256[] memory takerTokenAmounts = new uint256[](numOrders);

        uint256 scannedBytes = 0;
        while (scannedBytes < _transfersData.length) {
            // Record taker token and amount to return values
            uint256 orderCount = scannedBytes >> 6;

            // Transfer the tokens from the taker
            (takerTokens[orderCount], takerTokenAmounts[orderCount]) = transferFromTaker(
                _exchangeData.taker,
                scannedBytes,
                fractionFilled,
                _transfersData
            );

            // Update scanned bytes with length of each transfer request (64)
            scannedBytes = scannedBytes.add(64);
        }

        return ExchangeWrapperLibrary.ExchangeResults({
            components: takerTokens,
            componentQuantities: takerTokenAmounts
        });
    }

    /* ============ Private ============ */

    /**
     * Parses and executes transfer from the issuance order taker's wallet
     *
     * @param  _taker                   Taker wallet to transfer components from
     * @param  _offset                  Offset to start scanning for current transfer
     * @param  _fractionFilled          Fraction of the issuance order that has been filled
     * @param  _transfersData           Byte array of (multiple) taker wallet transfers
     * @return address                  Address of token transferred
     * @return uint256                  Amount of the token transferred
     */
    function transferFromTaker(
        address _taker,
        uint256 _offset,
        OrderLibrary.FractionFilled _fractionFilled,
        bytes _transfersData
    )
        private
        returns (address, uint256)
    {
        uint256 transferDataStart = _offset.add(32);

        // Read the next transfer
        address takerToken;
        uint256 takerTokenAmount;
        assembly {
            takerToken := mload(add(_transfersData, transferDataStart))
            takerTokenAmount := mload(add(_transfersData, add(transferDataStart, 32)))
        }

        uint256 takerTokenExecutionAmount = OrderLibrary.getPartialAmount(
            takerTokenAmount,
            _fractionFilled.filled,
            _fractionFilled.attempted
        );

        // Transfer from taker's wallet to this wrapper
        ITransferProxy(transferProxy).transfer(
            takerToken,
            takerTokenExecutionAmount,
            _taker,
            address(this)
        );

        // Ensure the component token is allowed to be transferred by Set TransferProxy
        ERC20Wrapper.ensureAllowance(
            takerToken,
            address(this),
            transferProxy,
            takerTokenExecutionAmount
        );

        return (takerToken, takerTokenExecutionAmount);
    }
}
