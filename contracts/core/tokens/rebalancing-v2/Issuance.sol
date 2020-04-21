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

import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

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
    ERC20,
    RebalancingSetState
{
    using SafeMath for uint256;
    using CommonMath for uint256;

    /* ============ Internal Functions ============ */

    /*
     * Validate call to mint new Rebalancing Set Token
     *
     *  - Make sure caller is Core
     *  - Make sure state is not Rebalance or Drawdown
     */
    function validateMint()
        internal
        view
    {
        validateCallerIsCore();

        validateRebalanceStateIs(RebalancingLibrary.State.Default);
    }

    /*
     * Validate call to burn Rebalancing Set Token
     *
     *  - Make sure state is not Rebalance or Drawdown
     *  - Make sure sender is module when in drawdown, core otherwise
     */
    function validateBurn()
        internal
        view
    {
        validateRebalanceStateIsNot(RebalancingLibrary.State.Rebalance);

        if (rebalanceState == RebalancingLibrary.State.Drawdown) {
            // In Drawdown Sets can only be burned as part of the withdrawal process
            validateCallerIsModule();
        } else {
            // When in non-Rebalance or Drawdown state, check that function caller is Core
            // so that Sets can be redeemed
            validateCallerIsCore();
        }
    }
    /*
     * Calculates entry fees and mints the feeRecipient a portion of the issue quantity.
     *
     * @param  _quantity              The number of rebalancing SetTokens the issuer mints
     * @return issueQuantityNetOfFees Quantity of rebalancing SetToken to mint issuer net of fees 
     */
    function handleEntryFees(
        uint256 _quantity
    )
        internal
        returns(uint256)
    {
        // The entryFee is a scaled decimal figure by 10e18. We multiply the fee by the quantity
        // Then descale by 10e18
        uint256 fee = _quantity.mul(entryFee).deScale();

        if (fee > 0) {
            ERC20._mint(feeRecipient, fee);

            emit EntryFeePaid(feeRecipient, fee);
        }

        // Return the issue quantity less fees
        return _quantity.sub(fee);
    }
}
