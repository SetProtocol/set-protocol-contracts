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
 * @title BackwardsCompatability
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
contract BackwardsCompatability is 
    RebalancingSetState
{
    /* ============ Getters ============ */

    function getAuctionPriceParameters() external view returns (uint256[] memory) {
        return liquidator.getAuctionPriceParameters();
    }

    function getCombinedCurrentUnits() external view returns (uint256[] memory) {
        return liquidator.getCombinedCurrentUnits();
    }

    function getCombinedNextSetUnits() external view returns (uint256[] memory) {
        return liquidator.getCombinedNextSetUnits();
    }

    function getCombinedTokenArray() external view returns (address[] memory) {
        return liquidator.getCombinedTokenArray();
    }

    /*
     * Retrieves the combinedTokenArray from Liquidator and returns the length
     */    
    function getCombinedTokenArrayLength() external view returns (uint256) {
        return liquidator.getCombinedTokenArray().length;
    }

    function startingCurrentSetAmount() external view returns (uint256) {
        return liquidator.startingCurrentSetAmount();
    }

    function auctionPriceParameters() external view
        returns (RebalancingLibrary.AuctionPriceParameters memory)
    {
        return liquidator.auctionPriceParameters();
    }

    function auctionLibrary() external view returns (address) {
        return liquidator.auctionLibrary();
    }

    /*
     * Since structs with arrays cannot be retrieved, we return 
     * minimumBid and remainingCurrentSets separately.
     *
     * @return  biddingParams       Array with minimumBid and remainingCurrentSets
     */
    function getBiddingParameters() public view returns (uint256[] memory) {
        uint256[] memory biddingParams = new uint256[](2);
        biddingParams[0] = liquidator.minimumBid();
        biddingParams[1] = liquidator.remainingCurrentSets();
        return biddingParams;
    }

    function biddingParameters() external view returns (uint256[] memory) {
        return getBiddingParameters();
    }

    function getFailedAuctionWithdrawComponents() external view returns (address[] memory) {
        return failedRebalanceComponents;
    }
}
