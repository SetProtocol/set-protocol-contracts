/*
    Copyright 2020 Set Labs Inc.

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
import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "../rebalancing-v2/RebalancingSetState.sol";


/**
 * @title IncentiveFee
 * @author Set Protocol
 */
contract IncentiveFee is 
    ERC20,
    RebalancingSetState
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event IncentiveFeePaid(
        address indexed feeRecipient,
        uint256 feeQuantity,
        uint256 feePercentage,
        uint256 newUnitShares
    );

    /* ============ Internal Functions ============ */

    /*
     * The Rebalancing SetToken must be in Default state.
     */
    function validateFeeActualization() internal view {
        validateRebalanceStateIs(RebalancingLibrary.State.Default);
    }

    /*
     * After the minting of new inflation fees, the unit shares must be updated.
     * The formula is as follows:
     * newUnitShares = currentSetAmount * rebalanceSetNaturalUnit / rebalanceSetTotalSupply
     */
    function calculateNewUnitShares() internal view returns(uint256) {
        uint256 currentSetAmount = vault.getOwnerBalance(
            address(currentSet),
            address(this)
        );

        return currentSetAmount.mul(naturalUnit).div(totalSupply());
    }
}