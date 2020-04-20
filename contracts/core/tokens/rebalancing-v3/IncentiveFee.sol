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
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

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
    using CommonMath for uint256;

    /* ============ Events ============ */

    event IncentiveFeePaid(
        address indexed feeRecipient,
        uint256 feeQuantity,
        uint256 feePercentage,
        uint256 newUnitShares
    );

    /* ============ Internal Functions ============ */

    /**
     * Calculates the fee and mints the rebalancing SetToken quantity to the recipient.
     * The minting is done without an increase to the total collateral controlled by the
     * rebalancing SetToken. In effect, the existing holders are paying the fee via inflation.
     *
     * @return feePercentage
     * @return feeQuantity
     */
    function handleFees()
        internal
        returns (uint256, uint256)
    {
        // Represents a decimal value scaled by 1e18 (e.g. 100% = 1e18 and 1% = 1e16)
        uint256 feePercent = rebalanceFeeCalculator.updateAndGetFee();
        uint256 feeQuantity = calculateIncentiveFeeInflation(feePercent);

        if (feeQuantity > 0) {
            ERC20._mint(feeRecipient, feeQuantity);
        }

        return (feePercent, feeQuantity);
    }

    /**
     * Returns the new incentive fee. The calculation for the fee involves implying
     * mint quantity so that the feeRecipient owns the fee percentage of the entire
     * supply of the Set.
     *
     * The formula to solve for fee is:
     * feeQuantity / feeQuantity + totalSupply = fee / scaleFactor
     *
     * The simplified formula utilized below is:
     * feeQuantity = fee * totalSupply / (scaleFactor - fee)
     *
     * @param   _feePercentage          Fee levied to feeRecipient
     * @return  uint256                 New RebalancingSet issue quantity
     */
    function calculateIncentiveFeeInflation(
        uint256 _feePercentage
    )
        internal
        view
        returns(uint256)
    {
        // fee * totalSupply
        uint256 a = _feePercentage.mul(totalSupply());

        // ScaleFactor (10e18) - fee
        uint256 b = CommonMath.scaleFactor().sub(_feePercentage);

        return a.div(b);
    }

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

        return currentSetAmount.mul(naturalUnit).divCeil(totalSupply());
    }
}
