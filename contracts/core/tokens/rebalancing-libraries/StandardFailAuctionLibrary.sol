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
import { StandardStartRebalanceLibrary } from "./StandardStartRebalanceLibrary.sol";


/**
 * @title StandardFailAuctionLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token endFailedAuction function
 */
library StandardFailAuctionLibrary {
    using SafeMath for uint256;

    /**
     * Fail an auction that doesn't complete before reaching the pivot price. Move to Drawdown state
     * if bids have been placed. Reset to Default state if no bids placed.
     *
     * @param _startingCurrentSetAmount     Amount of current set at beginning or rebalance
     * @param _currentSet                   The Set that failed to rebalance
     * @param _coreInstance                 Interface to interact with Core contract
     * @param _auctionParameters            Struct containing auction price curve parameters
     * @param _biddingParameters            Struct containing relevant data for calculating token flows
     * @param _rebalanceState               State rebalancing set token is in
     * @return                              State of Rebalancing Set after function called
     */
    function endFailedAuction(
        uint256 _startingCurrentSetAmount,
        address _currentSet,
        ICore _coreInstance,
        RebalancingHelperLibrary.AuctionPriceParameters _auctionParameters,
        StandardStartRebalanceLibrary.BiddingParameters _biddingParameters,
        RebalancingHelperLibrary.State _rebalanceState
    )
        internal
        returns (RebalancingHelperLibrary.State)
    {
        // Token must be in Rebalance State
        require(
            _rebalanceState ==  RebalancingHelperLibrary.State.Rebalance,
            "RebalanceAuctionModule.endFailedAuction: Rebalancing Set Token must be in Rebalance State"
        );

        // Calculate timestamp when pivot is reached
        uint256 revertAuctionTime = _auctionParameters.auctionStartTime.add(
            _auctionParameters.auctionTimeToPivot
        );

        // Make sure auction has gone past pivot point
        require(
            block.timestamp >= revertAuctionTime,
            "RebalanceAuctionModule.endFailedAuction: Can only be called after auction reaches pivot"
        );

        // If settleRebalance can be called than endFailedAuction can't be
        require(
            _biddingParameters.remainingCurrentSets >= _biddingParameters.minimumBid,
            "RebalancingSetToken.endFailedAuction: Cannot be called if rebalance is completed"
        );

        // Declare rebalance state variable
        RebalancingHelperLibrary.State _newRebalanceState;

        // Check if any bids have been placed
        if (_startingCurrentSetAmount == _biddingParameters.remainingCurrentSets) {
            // If bid not placed, reissue current Set
            _coreInstance.issueInVault(
                _currentSet,
                _startingCurrentSetAmount
            );

            // Set Rebalance Set Token state to Default
            _newRebalanceState = RebalancingHelperLibrary.State.Default;
        } else {
            // Set Rebalancing Set Token to Drawdown state
            _newRebalanceState = RebalancingHelperLibrary.State.Drawdown;
        }

        return _newRebalanceState;
    }
}