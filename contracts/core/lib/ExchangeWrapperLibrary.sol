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
import { ICore } from "../interfaces/ICore.sol";
import { IExchangeWrapper } from "../interfaces/IExchangeWrapper.sol";
import { ExchangeWrapperLibraryV2 } from "./ExchangeWrapperLibraryV2.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";


/**
 * @title ExchangeWrapperLibrary
 * @author Set Protocol
 *
 * This library contains structs and functions to assist executing orders on third party exchanges
 */
library ExchangeWrapperLibrary {

    // ============ Structs ============

    /**
     * caller                           Original user initiating transaction
     * orderCount                       Expected number of orders to execute
     */
    struct ExchangeData {
        address caller;
        uint256 orderCount;
    }

    /**
     * receiveTokens                    A list of the acquired components from exchange wrapper
     * receiveTokenAmounts              A list of the component quantities acquired
     */
    struct ExchangeResults {
        address[] receiveTokens;
        uint256[] receiveTokenAmounts;
    }

    /**
     * Checks if any send tokens leftover and transfers to caller
     * @param  _sendTokens    The addresses of send tokens
     * @param  _caller        The address of the original transaction caller
     */
    function returnLeftoverSendTokens(
        address[] memory _sendTokens,
        address _caller
    )
        internal
    {
        for (uint256 i = 0; i < _sendTokens.length; i++) {
            // Transfer any unused or remainder send token back to the caller
            uint256 remainderSendToken = ERC20Wrapper.balanceOf(_sendTokens[i], address(this));
            if (remainderSendToken > 0) {
                ERC20Wrapper.transfer(
                    _sendTokens[i],
                    _caller,
                    remainderSendToken
                );
            }
        }
    }

    /**
     * Calls exchange to execute trades and deposits fills into Vault for issuanceOrder maker.
     *
     *
     * @param  _core                    Address of Core
     * @param  _exchangeData            Standard exchange wrapper interface object containing exchange metadata
     * @param  _exchangeWrapper         Address of exchange wrapper being called
     * @param  _bodyData                Arbitrary bytes data for orders to be executed on exchange
     */
    function callExchange(
        address _core,
        ExchangeWrapperLibraryV2.ExchangeData memory _exchangeData,
        address _exchangeWrapper,
        bytes memory _bodyData
    )
        internal
    {
        // Call Exchange
        ExchangeWrapperLibraryV2.ExchangeResults memory exchangeResults = IExchangeWrapper(_exchangeWrapper).exchange(
            _exchangeData,
            _bodyData
        );

        // Transfer receiveToken tokens from wrapper to vault
        ICore(_core).batchDepositModule(
            _exchangeWrapper,
            _exchangeData.caller,
            exchangeResults.receiveTokens,
            exchangeResults.receiveTokenAmounts
        );
    }
}
