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

import { IRebalancingSetToken } from "../../core/interfaces/IRebalancingSetToken.sol";
import { RebalancingLibrary } from "../../core/lib/RebalancingLibrary.sol";


/**
 * @title RebalancingSetTokenViewer
 * @author Set Protocol
 *
 * Interfaces for fetching multiple RebalancingSetToken state in a single read
 */
contract RebalancingSetTokenViewer {

    /*
     * Fetches all RebalancingSetToken state associated with a rebalance proposal
     *
     * @param  _rebalancingSetToken           RebalancingSetToken contract instance
     * @return RebalancingLibrary.State       Current rebalance state on the RebalancingSetToken
     * @return address[]                      Auction proposal library and next allocation SetToken addresses
     * @return uint256[]                      Auction time to pivot, start price, and pivot price
     */
    function fetchRebalanceProposalStateAsync(
        IRebalancingSetToken _rebalancingSetToken
    )
        external
        returns (RebalancingLibrary.State, address[] memory, uint256[] memory)
    {
        // Fetch the RebalancingSetToken's current rebalance state
        RebalancingLibrary.State rebalanceState = _rebalancingSetToken.rebalanceState();

        // Create return address arrays
        address[] memory auctionAddressParams = new address[](2);
        // Fetch the addresses associated with the current rebalance
        auctionAddressParams[0] = _rebalancingSetToken.nextSet();
        auctionAddressParams[1] = _rebalancingSetToken.auctionLibrary();
        
        // Create return integer array
        uint256[] memory auctionIntegerParams = new uint256[](4);
        auctionIntegerParams[0] = _rebalancingSetToken.proposalStartTime();

        // Fetch the current rebalance's proposal parameters
        uint256[] memory auctionParameters = _rebalancingSetToken.getAuctionPriceParameters();
        auctionIntegerParams[1] = auctionParameters[1]; // auctionTimeToPivot
        auctionIntegerParams[2] = auctionParameters[2]; // auctionStartPrice
        auctionIntegerParams[3] = auctionParameters[3]; // auctionPivotPrice

        return (rebalanceState, auctionAddressParams, auctionIntegerParams);
    }

    /*
     * Fetches all RebalancingSetToken state associated with a new rebalance auction
     *
     * @param  _rebalancingSetToken           RebalancingSetToken contract instance
     * @return RebalancingLibrary.State       Current rebalance state on the RebalancingSetToken
     * @return uint256[]                      Starting current set, start time, minimum bid, and remaining current sets
     */
    function fetchRebalanceAuctionStateAsync(
        IRebalancingSetToken _rebalancingSetToken
    )
        external
        returns (RebalancingLibrary.State, uint256[] memory)
    {
        // Fetch the RebalancingSetToken's current rebalance state
        RebalancingLibrary.State rebalanceState = _rebalancingSetToken.rebalanceState();

        // Fetch the current rebalance's startingCurrentSetAmount
        uint256[] memory auctionIntegerParams = new uint256[](4);
        auctionIntegerParams[0] = _rebalancingSetToken.startingCurrentSetAmount();

        // Fetch the current rebalance's auction parameters which are made up of various auction times and prices
        uint256[] memory auctionParameters = _rebalancingSetToken.getAuctionPriceParameters();
        auctionIntegerParams[1] = auctionParameters[0]; // auctionStartTime

        // Fetch the current rebalance's bidding parameters which includes the minimum bid and the remaining shares
        uint256[] memory biddingParameters = _rebalancingSetToken.getBiddingParameters();
        auctionIntegerParams[2] = biddingParameters[0]; // minimumBid
        auctionIntegerParams[3] = biddingParameters[1]; // remainingCurrentSets

        return (rebalanceState, auctionIntegerParams);
    }
}
