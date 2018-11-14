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

pragma solidity 0.4.25;

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CoreState } from "../lib/CoreState.sol";
import { ICoreAccounting } from "../interfaces/ICoreAccounting.sol";
import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";


/**
 * @title Core Rebalance Auction
 * @author Set Protocol
 *
 * The CoreBidding extension exposes a bid endpoint for use in the RebalancingSetToken
 * auction process.
 */
contract CoreRebalanceAuction is
    ICoreAccounting,
    CoreState,
    ReentrancyGuard
{
    
    /* ============ Events ============ */

    event BidPlaced(
        address bidder,
        uint256 quantity
    );

    /* ============ Public Functions ============ */

    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     */
    function bid(
        address _rebalancingSetToken,
        uint256 _quantity
    )
        external
        nonReentrant
    {
        IRebalancingSetToken rebalancingSetToken = IRebalancingSetToken(_rebalancingSetToken);

        // Make sure the rebalancingSetToken is tracked by Core
        require(
            state.validSets[_rebalancingSetToken],
            "Core.bid: Invalid or disabled SetToken address"
        );

        // Get amount of tokens to transfer to instantiate arrays
        uint256 totalComponents = rebalancingSetToken.getCombinedTokenArrayLength();

        // Instantiate arrays
        address[] memory tokenArray = new address[](totalComponents);
        uint256[] memory inflowUnitArray = new uint256[](totalComponents);
        uint256[] memory outflowUnitArray = new uint256[](totalComponents);

        // Receive addresses of tokens involved and arrays of inflow/outflow associated with each token
        (tokenArray, inflowUnitArray, outflowUnitArray) = rebalancingSetToken.placeBid(_quantity);

        // Retrieve tokens from bidder and deposit in vault for rebalancing set token
        batchDepositInternal(
            msg.sender,
            _rebalancingSetToken,
            tokenArray,
            inflowUnitArray
        );

        // Transfer ownership of tokens in vault from rebalancing set token to bidder
        IVault(state.vault).batchTransferBalance(
            tokenArray,
            _rebalancingSetToken,
            msg.sender,
            outflowUnitArray
        );

        // Log bid placed event
        emit BidPlaced(
            msg.sender,
            _quantity
        );
    }
}
