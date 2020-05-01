/*
    Copyright 2020 Set Labs Inc.

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

import { Auction } from "./Auction.sol";


/**
 * @title AuctionGetters
 * @author Set Protocol
 *
 * Contract containing getters for receiving data from Auction.Setup struct. The auction() getter is implemented in the
 * inheriting contract.
 */
contract AuctionGetters {

    function minimumBid(address _set) external view returns (uint256) {
        return auction(_set).minimumBid;
    }

    function remainingCurrentSets(address _set) external view returns (uint256) {
        return auction(_set).remainingCurrentSets;
    }

    function startingCurrentSets(address _set) external view returns (uint256) {
        return auction(_set).startingCurrentSets;
    }

    function getCombinedTokenArray(address _set) external view returns (address[] memory) {
        return auction(_set).combinedTokenArray;
    }

    function getCombinedCurrentSetUnits(address _set) external view returns (uint256[] memory) {
        return auction(_set).combinedCurrentSetUnits;
    }

    function getCombinedNextSetUnits(address _set) external view returns (uint256[] memory) {
        return auction(_set).combinedNextSetUnits;
    }

    function auction(address _set) internal view returns(Auction.Setup storage);
}