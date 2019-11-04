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
 */
contract SettleRebalance is 
    ERC20,
    RebalancingSetState
{
    using SafeMath for uint256;

    /* ============ Internal Functions ============ */

    /*
     * Validates that the settle function can be called.
     *
     * @param  _nextUnitShares   The new implied unit shares
     */    
    function validateSettleRebalance(
        uint256 _nextUnitShares
    )
        internal
        view
    {
        require(
            rebalanceState == RebalancingLibrary.State.Rebalance,
            "Settle: State must be Rebalance"
        );

        // A rebalance can not have completed without a successful bid
        require(
            hasBidded,
            "Settle: No bids made"
        );

        // The unit shares must result in a quantity greater than the number of natural units outstanding
        require(
            _nextUnitShares > 0,
            "Settle: Failed rebalance, unitshares equals 0. Call endFailedRebalance."
        );
    }

    /*
     * Issue nextSet to RebalancingSetToken; The issued Set is held in the Vault
     *
     * @param  _issueQuantity   Quantity of next Set to issue
     */ 
    function issueNextSet(
        uint256 _issueQuantity
    )
        internal
    {
        core.issueInVault(
            address(nextSet),
            _issueQuantity
        );
    }

    /*
     * Updates state post-settlement.
     *
     * @param  _nextUnitShares   The new implied unit shares
     */        
    function transitionToDefault(
        uint256 _newUnitShares
    )
        internal
    {
        rebalanceState = RebalancingLibrary.State.Default;
        lastRebalanceTimestamp = block.timestamp;
        currentSet = nextSet;
        unitShares = _newUnitShares;
        rebalanceIndex = rebalanceIndex.add(1);
        
        nextSet = ISetToken(address(0));
        hasBidded = false;
    }

    /**
     * Calculate the amount of nextSets to issue by using the component amounts in the
     * vault.
     */
    function calculateNextSetIssueQuantity()
        internal
        view
        returns (uint256)
    {
        // Collect data necessary to compute issueAmounts
        SetTokenLibrary.SetDetails memory nextSetToken = SetTokenLibrary.getSetDetails(address(nextSet));
        uint256 maxIssueAmount = calculateMaxIssueAmount(nextSetToken);

        // Issue amount of Sets that is closest multiple of nextNaturalUnit to the maxIssueAmount
        // Since the initial division will round down to the nearest whole number when we multiply
        // by that same number we will return the closest multiple less than the maxIssueAmount
        uint256 issueAmount = maxIssueAmount.div(nextSetToken.naturalUnit).mul(nextSetToken.naturalUnit);

        return issueAmount;
    }

    /**
     * Calculates the new unitShares, defined as issueQuantity / naturalUnitsOutstanding
     *
     * @param  _issueQuantity   Amount of nextSets to issue
     *
     * @return  uint256             New unitShares for the rebalancingSetToken
     */
    function calculateNextSetNewUnitShares(
        uint256 _issueQuantity
    )
        internal
        view
        returns (uint256)
    {
        uint256 naturalUnitsOutstanding = calculateNaturalUnitsOutstanding();

        // Divide final issueAmount by naturalUnitsOutstanding to get newUnitShares
        return _issueQuantity.div(naturalUnitsOutstanding);
    }

    /* ============ Private Functions ============ */

    /**
     * Calculate the amount of naturalUnits worth of rebalancingSetToken outstanding.
     * 
     * NaturalUnitsOutstanding = totalSupply / naturalUnit
     *
     * @return  uint256             New unitShares for the rebalancingSetToken
     */
    function calculateNaturalUnitsOutstanding()
        private
        view
        returns (uint256)
    {
        return totalSupply().div(naturalUnit);
    }

    /**
     * Get the maximum possible issue amount of nextSet based on number of components owned by rebalancing
     * set token.
     */
    function calculateMaxIssueAmount(
        SetTokenLibrary.SetDetails memory _setToken
    )
        private
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
