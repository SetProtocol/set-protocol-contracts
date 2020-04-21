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
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

import { ICore } from "../../interfaces/ICore.sol";
import { IVault } from "../../interfaces/IVault.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";


/**
 * @title FailAuctionLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token endFailedAuction function
 */
library FailAuctionLibrary {
    using SafeMath for uint256;

    /**
     * Fail an auction that doesn't complete before reaching the pivot price. Move to Drawdown state
     * if bids have been placed. Reset to Default state if no bids placed.
     *
     * @param _startingCurrentSetAmount     Amount of current set at beginning or rebalance
     * @param _calculatedUnitShares         Calculated unitShares amount if rebalance were to be settled
     * @param _currentSet                   The Set that failed to rebalance
     * @param _coreAddress                  Core address
     * @param _auctionPriceParameters       Struct containing auction price curve parameters
     * @param _biddingParameters            Struct containing relevant data for calculating token flows
     * @param _rebalanceState               State rebalancing set token is in
     * @return                              State of Rebalancing Set after function called
     */
    function endFailedAuction(
        uint256 _startingCurrentSetAmount,
        uint256 _calculatedUnitShares,
        address _currentSet,
        address _coreAddress,
        RebalancingLibrary.AuctionPriceParameters memory _auctionPriceParameters,
        RebalancingLibrary.BiddingParameters memory _biddingParameters,
        uint8 _rebalanceState
    )
        public
        returns (uint8)
    {
        // Token must be in Rebalance State
        require(
            _rebalanceState ==  uint8(RebalancingLibrary.State.Rebalance),
            "RebalanceAuctionModule.endFailedAuction: Rebalancing Set Token must be in Rebalance State"
        );

        // Calculate timestamp when pivot is reached
        uint256 revertAuctionTime = _auctionPriceParameters.auctionStartTime.add(
            _auctionPriceParameters.auctionTimeToPivot
        );

        // Make sure auction has gone past pivot point
        require(
            block.timestamp >= revertAuctionTime,
            "RebalanceAuctionModule.endFailedAuction: Can only be called after auction reaches pivot"
        );

        uint8 newRebalanceState;
        /**
         * If not enough sets have been bid on then allow auction to fail where no bids being registered
         * returns the rebalancing set token to pre-auction state and some bids being registered puts the
         * rebalancing set token in Drawdown mode.
         *
         * However, if enough sets have been bid on. Then allow auction to fail and enter Drawdown state if
         * and only if the calculated post-auction unitShares is equal to 0.
         */
        if (_biddingParameters.remainingCurrentSets >= _biddingParameters.minimumBid) {
            // Check if any bids have been placed
            if (_startingCurrentSetAmount == _biddingParameters.remainingCurrentSets) {
                // If bid not placed, reissue current Set
                ICore(_coreAddress).issueInVault(
                    _currentSet,
                    _startingCurrentSetAmount
                );

                // Set Rebalance Set Token state to Default
                newRebalanceState = uint8(RebalancingLibrary.State.Default);
            } else {
                // Set Rebalancing Set Token to Drawdown state
                newRebalanceState = uint8(RebalancingLibrary.State.Drawdown);
            }
        } else {
            // If settleRebalance can be called then endFailedAuction can't be unless calculatedUnitShares
            // equals 0
            require(
                _calculatedUnitShares == 0,
                "RebalancingSetToken.endFailedAuction: Cannot be called if rebalance is viably completed"
            );

            // If calculated unitShares equals 0 set to Drawdown state
            newRebalanceState = uint8(RebalancingLibrary.State.Drawdown);
        }

        return newRebalanceState;
    }
}
