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

/**
 * @title IRebalanceAuctionModule
 * @author Set Protocol
 *
 * The IRebalanceAuctionModule interface provides a light-weight, structured way to interact with the
 * RebalanceAuctionModule contract from another contract.
 */

interface IRebalanceAuctionModule {
    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token
     * The tokens are returned to the user.
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     * @param  _allowPartialFill       Set to true if want to partially fill bid when quantity
     *                                 is greater than currentRemainingSets
     */
    function bidAndWithdraw(
        address _rebalancingSetToken,
        uint256 _quantity,
        bool _allowPartialFill
    )
        external;
}
