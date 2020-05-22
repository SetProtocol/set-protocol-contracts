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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { AuctionGetters } from "../impl/AuctionGetters.sol";
import { TWAPAuction } from "./TWAPAuction.sol";


/**
 * @title TWAPAuctionGetters
 * @author Set Protocol
 *
 * Contract containing getters for receiving data from TWAPAuction.TWAPState struct. The twapAuction()
 * getter is implemented in the inheriting contract.
 */
contract TWAPAuctionGetters is AuctionGetters {
    using SafeMath for uint256;

    function getOrderSize(address _set) external view returns (uint256) {
        return twapAuction(_set).orderSize;
    }

    function getOrderRemaining(address _set) external view returns (uint256) {
        return twapAuction(_set).orderRemaining;
    }

    function getChunkSize(address _set) external view returns (uint256) {
        return twapAuction(_set).chunkSize;
    }

    function getChunkAuctionPeriod(address _set) external view returns (uint256) {
        return twapAuction(_set).chunkAuctionPeriod;
    }

    function getLastChunkAuctionEnd(address _set) external view returns (uint256) {
        return twapAuction(_set).lastChunkAuctionEnd;
    }

    function twapAuction(address _set) internal view returns(TWAPAuction.TWAPState storage);
}