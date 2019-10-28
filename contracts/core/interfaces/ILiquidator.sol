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

import { ISetToken } from "./ISetToken.sol";
import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";

/**
 * @title ILiquidator
 * @author Set Protocol
 *
 * The ILiquidator
 */
interface ILiquidator {

    /* ============ External Functions ============ */

    function processProposal(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        external;

    function cancelProposal()
        external;

    function getBidPrice(
        address _set,
        uint256 _quantity
    )
        external
        view
        returns (address[] memory, uint256[] memory, uint256[] memory);

    function placeBid(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory);

    function startRebalance(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external;

    function settleRebalance()
        external;

    function hasRebalanceFailed()
        external
        view
        returns (bool);        

    function endFailedRebalance() external;

    /* ============ Backwards Compatability Getters ============ */

    function auctionLibrary(
        address _set
    )
        external
        view
        returns (address);

    // ----------------------------------------------------------------------
    // Auction Price Parameters
    // ----------------------------------------------------------------------

    function getAuctionPriceParameters(address _set)
        external
        view
        returns (uint256[] memory);

    function auctionPriceParameters(address _set)
        external
        view
        returns (RebalancingLibrary.AuctionPriceParameters memory);

    // ----------------------------------------------------------------------
    // Bidding Parameters
    // ----------------------------------------------------------------------

    function minimumBid(address _set)
        external
        view
        returns (uint256);

    function remainingCurrentSets(address _set)
        external
        view
        returns (uint256);

    function getCombinedCurrentUnits(address _set)
        external
        view
        returns (uint256[] memory);

    function getCombinedNextSetUnits(address _set)
        external
        view
        returns (uint256[] memory);

    function getCombinedTokenArray(address _set)
        external
        view
        returns (address[] memory);

    function startingCurrentSetAmount(address _set)
        external
        view
        returns (uint256);
}
