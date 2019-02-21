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

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ExchangeRedemptionLibrary } from "../lib/ExchangeRedemptionLibrary.sol";
import { ExchangeHeaderLibrary } from "../lib/ExchangeHeaderLibrary.sol";
import { ExchangeValidationLibrary } from "../lib/ExchangeValidationLibrary.sol";
import { ExchangeWrapperLibrary } from "../lib/ExchangeWrapperLibrary.sol";
import { IExchangeWrapper } from "../interfaces/IExchangeWrapper.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { LibBytes } from "../../external/0x/LibBytes.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title Exchange Redeem Module
 * @author Set Protocol
 *
 * The Exchange Redeek Module facilitates the exchangeRedemption function which allows
 * the redemption of a Set using exchange orders
 */
contract ExchangeRedemptionModule is
    ModuleCoreState,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event LogExchangeRedemption(
      address setAddress,
      address indexed callerAddress,
      address redemptionToken,
      uint256 quantity,
      uint256 redemptionTokenAmount
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for ExchangeIssueModule
     *
     * @param _core                The address of Core
     * @param _transferProxy       The address of transferProxy
     * @param _vault               The address of Vault
     */
    constructor(
        address _core,
        address _transferProxy,
        address _vault
    )
        public
        ModuleCoreState(
            _core,
            _transferProxy,
            _vault
        )
    {}

    /* ============ Public Functions ============ */

    function exchangeRedemption(
        ExchangeRedemptionLibrary.ExchangeRedemptionParams memory _exchangeRedemptionData,
        bytes _orderData
    )
        public
        nonReentrant
    {

    }

    /* ============ Private Functions ============ */

}
