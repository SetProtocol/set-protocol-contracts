/*
    Copyright 2019 Set Labs Inc.

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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CommonMath } from "../../../lib/CommonMath.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";


/**
 * @title Issuance
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
contract Issuance is 
    RebalancingSetState
{
    using SafeMath for uint256;
    using CommonMath for uint256;


    /* ============ Internal Functions ============ */

    function validateMint()
        internal
        view
    {
        require(
            msg.sender == address(core),
            "Mint: Sender must be core"
        );

        require(
            rebalanceState != RebalancingLibrary.State.Rebalance,
            "Mint: Cannot mint during Rebalance"
        );

        require(
            rebalanceState != RebalancingLibrary.State.Drawdown,
            "Mint: Cannot mint during Drawdown"
        );
    }

    function validateBurn()
        internal
        view
    {
        require(
            rebalanceState != RebalancingLibrary.State.Rebalance,
            "Burn: Cannot burn during Rebalance"
        );

        if (rebalanceState == RebalancingLibrary.State.Drawdown) {
            // In Drawdown Sets can only be burned as part of the withdrawal process
            require(
                core.validModules(msg.sender),
                "Burn: Set cannot be redeemed during Drawdown"
            );
        } else {
            // When in non-Rebalance or Drawdown state, check that function caller is Core
            // so that Sets can be redeemed
            require(
                msg.sender == address(core),
                "Burn: Sender must be core"
            );
        }
    }
}
