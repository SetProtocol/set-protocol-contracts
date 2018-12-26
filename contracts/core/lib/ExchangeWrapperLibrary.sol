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

import { ICore } from "../interfaces/ICore.sol";
import { IExchangeWrapper } from "../interfaces/IExchangeWrapper.sol";
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
     * maker                            Issuance order maker
     * taker                            Issuance order taker
     * makerToken                       Address of maker token used in exchange orders
     * makerAssetAmount                 Amount of issuance order maker token to use on this exchange
     * orderCount                       Expected number of orders to execute
     * fillQuantity                     Quantity of Set to be filled
     * attemptedFillQuantity            Quantity of Set taker attempted to fill
     */
    struct ExchangeData {
        address maker;
        address taker;                
        address makerToken;           
        uint256 makerAssetAmount;     
        uint256 orderCount;           
        uint256 fillQuantity;         
        uint256 attemptedFillQuantity;
    }

    /**
     * components                       A list of the acquired components from exchange wrapper
     * componentQuantities              A list of the component quantities acquired
     */
    struct ExchangeResults {
        address[] components;
        uint256[] componentQuantities;
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
        ExchangeData memory _exchangeData,
        address _exchangeWrapper,
        bytes _bodyData
    )
        internal
    {
        // Call Exchange
        ExchangeResults memory exchangeResults = IExchangeWrapper(_exchangeWrapper).exchange(
            _exchangeData,
            _bodyData
        );

        // Transfer component tokens from wrapper to vault
        ICore(_core).batchDepositModule(
            _exchangeWrapper,
            _exchangeData.maker,
            exchangeResults.components,
            exchangeResults.componentQuantities
        );        
    }
}
