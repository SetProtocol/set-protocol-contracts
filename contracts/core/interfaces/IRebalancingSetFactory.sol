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

pragma solidity 0.5.7;

import { ISetFactory } from "./ISetFactory.sol";
import { IWhiteList } from "./IWhiteList.sol";


/**
 * @title IRebalancingSetFactory
 * @author Set Protocol
 *
 * The IRebalancingSetFactory interface provides operability for authorized contracts
 * to interact with RebalancingSetTokenFactory
 */
contract IRebalancingSetFactory is
    ISetFactory
{
    /**
     * Getter for minimumRebalanceInterval of RebalancingSetTokenFactory, used
     * to enforce rebalanceInterval when creating a RebalancingSetToken
     *
     * @return uint256    Minimum amount of time between rebalances in seconds
     */
    function minimumRebalanceInterval()
        external
        returns (uint256);

    /**
     * Getter for minimumProposalPeriod of RebalancingSetTokenFactory, used
     * to enforce proposalPeriod when creating a RebalancingSetToken
     *
     * @return uint256    Minimum amount of time users can review proposals in seconds
     */
    function minimumProposalPeriod()
        external
        returns (uint256);

    /**
     * Getter for minimumTimeToPivot of RebalancingSetTokenFactory, used
     * to enforce auctionTimeToPivot when proposing a rebalance
     *
     * @return uint256    Minimum amount of time before auction pivot reached
     */
    function minimumTimeToPivot()
        external
        returns (uint256);

    /**
     * Getter for maximumTimeToPivot of RebalancingSetTokenFactory, used
     * to enforce auctionTimeToPivot when proposing a rebalance
     *
     * @return uint256    Maximum amount of time before auction pivot reached
     */
    function maximumTimeToPivot()
        external
        returns (uint256);

    /**
     * Getter for minimumNaturalUnit of RebalancingSetTokenFactory
     *
     * @return uint256    Minimum natural unit
     */
    function minimumNaturalUnit()
        external
        returns (uint256);

    /**
     * Getter for maximumNaturalUnit of RebalancingSetTokenFactory
     *
     * @return uint256    Maximum Minimum natural unit
     */
    function maximumNaturalUnit()
        external
        returns (uint256);

    /**
     * Getter for rebalanceAuctionModule address on RebalancingSetTokenFactory
     *
     * @return address      Address of rebalanceAuctionModule
     */
    function rebalanceAuctionModule()
        external
        returns (address);
}
