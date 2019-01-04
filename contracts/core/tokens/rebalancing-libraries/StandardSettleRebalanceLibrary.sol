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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { CommonMath } from "../../../lib/CommonMath.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { IVault } from "../../interfaces/IVault.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingHelperLibrary } from "../../lib/RebalancingHelperLibrary.sol";


/**
 * @title StandardSettleRebalanceLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token placeBid function
 */
library StandardSettleRebalanceLibrary {
    using SafeMath for uint256;

    /* ============ Structs ============ */

    struct SetDetails {
        uint256 setNaturalUnit;
        uint256[] setUnits;
        address[] setComponents;
    }

    /* ============ Internal Functions ============ */

    /**
     * Calculate the amount of nextSets to issue by using the component amounts in the
     * vault, new unitShares follow from this calculation
     *
     * @param   _totalSupply            Total supply of rebalancing set token
     * @param   _remainingCurrentSets   Amount of currentSets remaining
     * @param   _minimumBid             Minimum bid allowed, used to see if valid settle
     * @param   _naturalUnit            Natural unit of rebalancing set token
     * @param   _nextSet                Address of next set
     * @param   _manager                Address of set manager
     * @param   _coreInstance           Interface to interact with Core contract
     * @param   _vaultInstance          Interface to interact with Vault contract
     * @return  uint256                 Amount of nextSets to issue
     */
    function settleRebalance(
        uint256 _totalSupply,
        uint256 _remainingCurrentSets,
        uint256 _minimumBid,
        uint256 _naturalUnit,
        address _nextSet,
        address _manager,
        ICore _coreInstance,
        IVault _vaultInstance,
        RebalancingHelperLibrary.State _rebalanceState
    )
        internal
        returns (uint256)
    {
        // Must be in Rebalance state to call settlement
        require(
            _rebalanceState == RebalancingHelperLibrary.State.Rebalance,
            "RebalancingSetToken.settleRebalance: State must be Rebalance"
        );

        // Make sure all currentSets have been rebalanced
        require(
            _remainingCurrentSets < _minimumBid,
            "RebalancingSetToken.settleRebalance: Rebalance not completed"
        );

        // Calculate next Set quantities
        (
            uint256 issueAmount,
            uint256 nextUnitShares
        ) = calculateNextSetIssueQuantity(
            _totalSupply,
            _naturalUnit,
            _nextSet,
            _vaultInstance
        );

        // Issue nextSet to RebalancingSetToken
        _coreInstance.issueInVault(
            _nextSet,
            issueAmount
        );

        return nextUnitShares;
    }

    /**
     * Calculate the amount of nextSets to issue by using the component amounts in the
     * vault, unitShares following from this calculation.
     *
     * @param   _totalSupply        Total supply of rebalancing set token
     * @param   _naturalUnit        Natural unit of rebalancing set token
     * @param   _nextSet            Address of next set
     * @param   _vaultInstance      Interface to interact with Vault contract
     * @return  uint256             Amount of nextSets to issue
     * @return  uint256             New unitShares for the rebalancingSetToken
     */
    function calculateNextSetIssueQuantity(
        uint256 _totalSupply,
        uint256 _naturalUnit,
        address _nextSet,
        IVault _vaultInstance
    )
        private
        returns (uint256, uint256)
    {
        // Collect data necessary to compute issueAmounts
        SetDetails memory setDetails = getUnderlyingSetDetails(_nextSet);
        uint256 maxIssueAmount = calculateMaxIssueAmount(
            setDetails,
            _vaultInstance
        );

        // Calculate the amount of naturalUnits worth of rebalancingSetToken outstanding
        uint256 naturalUnitsOutstanding = _totalSupply.div(_naturalUnit);

        // Issue amount of Sets that is closest multiple of nextNaturalUnit to the maxIssueAmount
        // Since the initial division will round down to the nearest whole number when we multiply
        // by that same number we will return the closest multiple less than the maxIssueAmount
        uint256 issueAmount = maxIssueAmount.div(setDetails.setNaturalUnit).mul(setDetails.setNaturalUnit);

        // Divide final issueAmount by naturalUnitsOutstanding to get newUnitShares
        uint256 newUnitShares = issueAmount.div(naturalUnitsOutstanding);
        return (issueAmount, newUnitShares);
    }

    /**
     * Create struct that holds set details for currentSet and nextSet (units, components, natural units).
     *
     * @param _setAddress    Address of set to get details from
     * @return               Struct that holds set details for currentSet and nextSet
     */
    function getUnderlyingSetDetails(
        address _setAddress
    )
        internal
        returns (SetDetails)
    {
        // Create set token interfaces
        ISetToken setInstance = ISetToken(_setAddress);

        return SetDetails({
            setNaturalUnit: setInstance.naturalUnit(),
            setUnits: setInstance.getUnits(),
            setComponents: setInstance.getComponents()
        });
    }

    /**
     * Get the maximum possible issue amount of nextSet based on number of components owned by rebalancing
     * set token.
     *
     * @param _setDetails       nextSet details
     * @param _vaultInstance    Interface to interact with Vault
     * @return uint256          maxIssueAmount
     */
    function calculateMaxIssueAmount(
        SetDetails _setDetails,
        IVault _vaultInstance
    )
        internal
        returns (uint256)
    {
        uint256 maxIssueAmount = CommonMath.maxUInt256();

        for (uint256 i = 0; i < _setDetails.setComponents.length; i++) {
            // Get amount of components in vault owned by rebalancingSetToken
            uint256 componentAmount = _vaultInstance.getOwnerBalance(
                _setDetails.setComponents[i],
                this
            );

            // Calculate amount of Sets that can be issued from those components, if less than amount for other
            // components then set that as maxIssueAmount
            uint256 componentIssueAmount = componentAmount.div(_setDetails.setUnits[i]).mul(_setDetails.setNaturalUnit);
            if (componentIssueAmount < maxIssueAmount) {
                maxIssueAmount = componentIssueAmount;
            }
        }

        return maxIssueAmount;       
    }
}
