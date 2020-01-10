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

import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";


/**
 * @title BackwardCompatibility
 * @author Set Protocol
 *
 * This module allows full backwards compatability with RebalancingSetTokenV1. It implements
 * all the same getter functions to allow upstream applications to make minimized changes
 * to support the new version.
 *
 * The following interfaces are not included:
 * - propose(address, address, uint256, uint256, uint256): Implementation would have
 *.    been a revert.
 * - biddingParameters: RebalancingSetToken V1 biddingParameters reverts on call
 */
contract BackwardCompatibility is 
    RebalancingSetState
{
    /* ============ Empty Variables ============ */
    
    // Deprecated auctionLibrary. Returns 0x00 to prevent reverts
    address public auctionLibrary;

    // Deprecated proposal period. Returns 0 to prevent reverts
    uint256 public proposalPeriod;

    // Deprecated proposal start time. Returns 0 to prevent reverts
    uint256 public proposalStartTime;

    /* ============ Getters ============ */

    function getAuctionPriceParameters() external view returns (uint256[] memory) {
        RebalancingLibrary.AuctionPriceParameters memory params = liquidator.auctionPriceParameters(
            address(this)
        );

        uint256[] memory auctionPriceParams = new uint256[](4);
        auctionPriceParams[0] = params.auctionStartTime;
        auctionPriceParams[1] = params.auctionTimeToPivot;
        auctionPriceParams[2] = params.auctionStartPrice;
        auctionPriceParams[3] = params.auctionPivotPrice;

        return auctionPriceParams;
    }

    function getCombinedCurrentUnits() external view returns (uint256[] memory) {
        return liquidator.getCombinedCurrentSetUnits(address(this));
    }

    function getCombinedNextSetUnits() external view returns (uint256[] memory) {
        return liquidator.getCombinedNextSetUnits(address(this));
    }

    function getCombinedTokenArray() external view returns (address[] memory) {
        return liquidator.getCombinedTokenArray(address(this));
    }

    function getCombinedTokenArrayLength() external view returns (uint256) {
        return liquidator.getCombinedTokenArray(address(this)).length;
    }

    function startingCurrentSetAmount() external view returns (uint256) {
        return liquidator.startingCurrentSets(address(this));
    }

    function auctionPriceParameters() external view
        returns (RebalancingLibrary.AuctionPriceParameters memory)
    {
        return liquidator.auctionPriceParameters(address(this));
    }

    /*
     * Since structs with arrays cannot be retrieved, we return 
     * minimumBid and remainingCurrentSets separately.
     *
     * @return  biddingParams       Array with minimumBid and remainingCurrentSets
     */
    function getBiddingParameters() public view returns (uint256[] memory) {
        uint256[] memory biddingParams = new uint256[](2);
        biddingParams[0] = liquidator.minimumBid(address(this));
        biddingParams[1] = liquidator.remainingCurrentSets(address(this));
        return biddingParams;
    }

    function biddingParameters()
        external
        view 
        returns (uint256, uint256)
    {
        uint256[] memory biddingParams = getBiddingParameters();
        return (biddingParams[0], biddingParams[1]);
    }

    function getFailedAuctionWithdrawComponents() external view returns (address[] memory) {
        return failedRebalanceComponents;
    }
}
