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

import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";


/**
 * @title PlaceBid
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
contract PlaceBid is 
    RebalancingSetState
{
    using SafeMath for uint256;

    /* ============ Internal Functions ============ */

    /*
     * Validate Place bid during rebalance auction. Can only be called by Core.
     *
     * @param _quantity                 The amount of currentSet to be rebalanced
     */
    function validatePlaceBid(
        uint256 _quantity
    )
        internal
        view
    {
        // Make sure sender is a module
        require(
            core.validModules(msg.sender),
            "RebalancingSetToken.placeBid: Sender must be approved module"
        );

        validateGetBidPrice(_quantity);
    }

    /*
     * Place bid during rebalance auction. Can only be called by Core.
     *
     * @param _quantity                 The amount of currentSet to be rebalanced
     */
    function validateGetBidPrice(
        uint256 _quantity
    )
        internal
        view
    {
        // Make sure that bid amount is greater than zero
        require(
            _quantity > 0,
            "RebalancingSetToken.placeBid: Bid must be > 0"
        );

        // Confirm in Rebalance State
        require(
            rebalanceState == RebalancingLibrary.State.Rebalance,
            "RebalancingSetToken.getBidPrice: State must be Rebalance"
        );
    }

    function updateHasBiddedIfNecessary()
        internal
    {
        if (!hasBidded) {
            hasBidded = true;
        }
    }

}
