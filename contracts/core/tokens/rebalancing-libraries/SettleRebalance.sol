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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

import { CommonMath } from "../../../lib/CommonMath.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IVault } from "../../interfaces/IVault.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";
import { SetTokenLibrary } from "../../lib/SetTokenLibrary.sol";


/**
 * @title SettleRebalance
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
contract SettleRebalance is 
    ERC20,
    RebalancingSetState
{
    using SafeMath for uint256;

    /* ============ Internal Functions ============ */
    function validateSettleRebalance()
        internal
    {
        // Must be in Rebalance state to call settlement
        require(
            rebalanceState == RebalancingLibrary.State.Rebalance,
            "RebalancingSetToken.settleRebalance: State must be Rebalance"
        );
    }

    function issueNextSet()
        internal
    {
        // Calculate next Set quantities
        uint256 issueAmount;
        uint256 nextUnitShares;
        (
            issueAmount,
            nextUnitShares
        ) = calculateNextSetIssueQuantity();

        require(
            nextUnitShares > 0,
            "RebalancingSetToken.settleRebalance: Failed rebalance, unitshares equals 0. Call endFailedAuction."
        );

        // Issue nextSet to RebalancingSetToken
        core.issueInVault(
            address(nextSet),
            issueAmount
        );
    }

    function liquidatorSettleRebalance()
        internal
    {
        liquidator.settleRebalance();
    }


    function transitionToDefault()
        internal
    {
        // Update other state parameters
        currentSet = nextSet;
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Default;
        nextSet = ISetToken(address(0));
        hasBidded = false;
        rebalanceIndex = rebalanceIndex.add(1);
    }

    /**
     * Calculate the amount of nextSets to issue by using the component amounts in the
     * vault, unitShares following from this calculation.
     *
     * @return  uint256             Amount of nextSets to issue
     * @return  uint256             New unitShares for the rebalancingSetToken
     */
    function calculateNextSetIssueQuantity()
        internal
        view
        returns (uint256, uint256)
    {
        // Collect data necessary to compute issueAmounts
        SetTokenLibrary.SetDetails memory nextSetToken = SetTokenLibrary.getSetDetails(address(nextSet));
        uint256 maxIssueAmount = calculateMaxIssueAmount(nextSetToken);

        // Calculate the amount of naturalUnits worth of rebalancingSetToken outstanding
        uint256 naturalUnitsOutstanding = totalSupply().div(naturalUnit);

        // Issue amount of Sets that is closest multiple of nextNaturalUnit to the maxIssueAmount
        // Since the initial division will round down to the nearest whole number when we multiply
        // by that same number we will return the closest multiple less than the maxIssueAmount
        uint256 issueAmount = maxIssueAmount.div(nextSetToken.naturalUnit).mul(nextSetToken.naturalUnit);

        // Divide final issueAmount by naturalUnitsOutstanding to get newUnitShares
        uint256 newUnitShares = issueAmount.div(naturalUnitsOutstanding);
        return (issueAmount, newUnitShares);
    }

    /**
     * Get the maximum possible issue amount of nextSet based on number of components owned by rebalancing
     * set token.
     *
     * @param _setToken         nextSet details
     * @return uint256          maxIssueAmount
     */
    function calculateMaxIssueAmount(
        SetTokenLibrary.SetDetails memory _setToken
    )
        internal
        view
        returns (uint256)
    {
        uint256 maxIssueAmount = CommonMath.maxUInt256();

        for (uint256 i = 0; i < _setToken.components.length; i++) {
            // Get amount of components in vault owned by rebalancingSetToken
            uint256 componentAmount = vault.getOwnerBalance(
                _setToken.components[i],
                address(this)
            );

            // Calculate amount of Sets that can be issued from those components, if less than amount for other
            // components then set that as maxIssueAmount
            uint256 componentIssueAmount = componentAmount.div(_setToken.units[i]).mul(_setToken.naturalUnit);
            if (componentIssueAmount < maxIssueAmount) {
                maxIssueAmount = componentIssueAmount;
            }
        }

        return maxIssueAmount;
    }
}
