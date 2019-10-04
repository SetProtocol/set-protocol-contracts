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
 * all the same functions to allow upstream applications to make minimized changes
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
    /*
     * If supported in Liquidator, return auctionPriceParameters.
     *
     * @return  auctionParams       Object with auction information
     */
    function getAuctionPriceParameters()
        external
        view
        returns (uint256[] memory)
    {
        return liquidator.getAuctionPriceParameters();
    }

    /*
     * If supported in Liquidator, return combinedCurrentUnits.
     *
     * @return       uint256 Array of the currentSet units
     */
    function getCombinedCurrentUnits()
        external
        view
        returns (uint256[] memory)
    {
        return liquidator.getCombinedCurrentUnits();
    }

    /*
     * If supported in Liquidator, return combinedNextSetUnits.
     *
     * @return       uint256 Array of the nextSet units
     */
    function getCombinedNextSetUnits()
        external
        view
        returns (uint256[] memory)
    {
        return liquidator.getCombinedNextSetUnits();
    }

    /*
     * Get combinedTokenArray of Rebalancing Set
     *
     * @return  combinedTokenArray
     */
    function getCombinedTokenArray()
        external
        view
        returns (address[] memory)
    {
        return liquidator.getCombinedTokenArray();
    }

    /*
     * Get combinedTokenArray length of Rebalancing Set
     *
     * @return  combinedTokenArray length
     */
    function getCombinedTokenArrayLength()
        external
        view
        returns (uint256)
    {
        return liquidator.getCombinedTokenArray().length;
    }

    function startingCurrentSetAmount()
        external
        view
        returns (uint256)
    {
        return liquidator.startingCurrentSetAmount();
    }

    function auctionPriceParameters()
        external
        view
        returns (RebalancingLibrary.AuctionPriceParameters memory)
    {
        return liquidator.auctionPriceParameters();
    }

    function auctionLibrary()
        external
        view
        returns (address)
    {
        return liquidator.auctionLibrary();
    }

    /*
     * Get biddingParameters of Rebalancing Set for backwards compatability
     * with the RebalanceAuctionModule
     *
     * @return  biddingParams       Object with bidding information
     */
    function getBiddingParameters()
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory biddingParams = new uint256[](2);
        biddingParams[0] = liquidator.minimumBid();
        biddingParams[1] = liquidator.remainingCurrentSets();
        return biddingParams;
    }

    /*
     * Get failedAuctionWithdrawComponents of Rebalancing Set for backwards compatability
     * with the RebalanceAuctionModule
     *
     * @return  failedAuctionWithdrawComponents
     */
    function getFailedAuctionWithdrawComponents()
        external
        view
        returns (address[] memory)
    {
        return failedRebalanceComponents;
    }


}
