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

import { ERC20Viewer } from "./lib/ERC20Viewer.sol";
import { RebalancingSetTokenViewer } from "./lib/RebalancingSetTokenViewer.sol";
import { TradingPoolViewer } from "./lib/TradingPoolViewer.sol";


/**
 * @title ProtocolViewer
 * @author Set Protocol
 *
 * Collection of view methods across various contracts in the SetProtocol system that make reads
 * to commonly fetch batches of state possible in a single eth_call. This reduces latency and
 * prevents inconsistent state from being read across multiple Ethereum nodes.
 */
 /* solium-disable-next-line no-empty-blocks */
contract ProtocolViewer is
    ERC20Viewer,
    RebalancingSetTokenViewer,
    TradingPoolViewer
{}
