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

import { LinearAuction } from "../impl/LinearAuction.sol";
import { TwoAssetPriceBoundedLinearAuction } from "../impl/TwoAssetPriceBoundedLinearAuction.sol";


/**
 * @title TWAPAuction
 * @author Set Protocol
 *
 * Contract for executing TWAP Auctions fropm initializing to moving to the next chunk auction. Inherits from
 * TwoAssetPriceBoundedLinearAuction
 */
contract TWAPAuction is TwoAssetPriceBoundedLinearAuction {

    /* ============ Structs ============ */
    struct TWAPState {
        LinearAuction.State chunkAuction;
        uint256 orderSize;
        uint256 orderRemaining;
        uint256 lastChunkAuctionEnd;
        uint256 chunkAuctionPeriod;
        uint256 chunkSize;
    }
}