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

import { RebalancingSettlement } from "./rebalancing-v2/RebalancingSettlement.sol";
import { IncentiveFee } from "./rebalancing-v3/IncentiveFee.sol";
import { RebalancingSetTokenV2 } from "./RebalancingSetTokenV2.sol";


/**
 * @title RebalancingSetTokenV3
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set token V2. Major improvements vs. V2 include:
 * - Separating incentive fees from the settlement process.
 */
contract RebalancingSetTokenV3 is
    IncentiveFee,
    RebalancingSetTokenV2
{
    /* ============ Constructor ============ */

    /**
     * Constructor function for Rebalancing Set Token
     *
     * addressConfig [factory, manager, liquidator, initialSet, componentWhiteList, 
     *                liquidatorWhiteList, feeRecipient, rebalanceFeeCalculator]
     * [0]factory                   Factory used to create the Rebalancing Set
     * [1]manager                   Address that is able to propose the next Set
     * [2]liquidator                Address of the liquidator contract
     * [3]initialSet                Initial set that collateralizes the Rebalancing set
     * [4]componentWhiteList        Whitelist that nextSet components are checked against during propose
     * [5]liquidatorWhiteList       Whitelist of valid liquidators
     * [6]feeRecipient              Address that receives any incentive fees
     * [7]rebalanceFeeCalculator    Address to retrieve rebalance fee during settlement
     *
     * uintConfig [initialUnitShares, naturalUnit, rebalanceInterval, rebalanceFailPeriod, 
     *             lastRebalanceTimestamp, entryFee]
     * [0]initialUnitShares         Units of currentSet that equals one share
     * [1]naturalUnit               The minimum multiple of Sets that can be issued or redeemed
     * [2]rebalanceInterval:        Minimum amount of time between rebalances
     * [3]rebalanceFailPeriod:      Time after auctionStart where something in the rebalance has gone wrong
     * [4]lastRebalanceTimestamp:   Time of the last rebalance; Allows customized deployments
     * [5]entryFee:                 Mint fee represented in a scaled decimal value (e.g. 100% = 1e18, 1% = 1e16)
     *
     * @param _addressConfig             List of configuration addresses
     * @param _uintConfig                List of uint addresses
     * @param _name                      The name of the new RebalancingSetTokenV2
     * @param _symbol                    The symbol of the new RebalancingSetTokenV2
     */
    constructor(
        address[8] memory _addressConfig,
        uint256[6] memory _uintConfig,
        string memory _name,
        string memory _symbol
    )
        public
        RebalancingSetTokenV2(
            _addressConfig,
            _uintConfig,
            _name,
            _symbol
        )
    {}

    /*
     * After a successful rebalance, the new Set is issued. If there is a rebalance fee,
     * the fee is paid via inflation of the Rebalancing Set to the feeRecipient.
     * Full issuance functionality is now returned to set owners.
     *
     * Anyone can call this function.
     */
    function settleRebalance()
        external
    {
        RebalancingSettlement.validateRebalancingSettlement();

        uint256 issueQuantity = RebalancingSettlement.calculateSetIssueQuantity(nextSet);
        uint256 newUnitShares = RebalancingSettlement.calculateNextSetNewUnitShares(issueQuantity);

        // The unit shares must result in a quantity greater than the number of natural units outstanding
        validateUnitShares(newUnitShares);

        RebalancingSettlement.issueNextSet(issueQuantity);

        liquidator.settleRebalance();

        // Rebalance index is the current vs next rebalance
        emit RebalanceSettled(
            address(0),      // No longer used
            0,               // No longer used
            0,               // No longer used
            rebalanceIndex,
            issueQuantity,
            newUnitShares
        );

        RebalancingSettlement.transitionToDefault(newUnitShares);
    }

    function actualizeFee()
        external
    {
        // Calculates fees and mints Rebalancing Set to the feeRecipient, increasing supply
        (uint256 feePercent, uint256 feeQuantity) = RebalancingSettlement.handleFees();

        uint256 newUnitShares = calculateNewUnitShares();

        // The unit shares must result in a quantity greater than the number of natural units outstanding
        validateUnitShares(newUnitShares);

        // Set the new unit shares
        unitShares = newUnitShares;

        // Emit event
        emit IncentiveFeePaid(
            feeRecipient,
            feeQuantity,
            feePercent,
            newUnitShares
        );
    }

    /* ============ V3 Internal Functions ============ */

    function validateUnitShares(uint256 _newUnitShares) internal view {
        // The unit shares must result in a quantity greater than the number of natural units outstanding
        require(
            _newUnitShares > 0,
            "Unitshares is 0"
        );        
    }
}
