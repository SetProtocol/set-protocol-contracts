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

import { ICore } from "../interfaces/ICore.sol";
import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";
import { RebalancingHelperLibrary } from "../lib/RebalancingHelperLibrary.sol";
import { StandardStartRebalanceLibrary } from "../tokens/rebalancing-libraries/StandardStartRebalanceLibrary.sol";


/**
 * @title Core Rebalance Auction
 * @author Set Protocol
 *
 * The CoreBidding extension exposes a bid endpoint for use in the RebalancingSetToken
 * auction process.
 */
contract RebalanceAuctionModule is
    ReentrancyGuard
{

    /* ============ State Variables ============ */

    // Address of Core contract
    address public core;

    ICore public coreInstance;

    // Address of Vault contract
    address public vault;

    IVault public vaultInstance;

    
    /* ============ Events ============ */

    event BidPlaced(
        address bidder,
        uint256 quantity
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for IssuanceOrderModule
     *
     * @param _core       The address of Core
     * @param _vault       The address of Vault
     */
    constructor(
        address _core,
        address _vault
    )
        public
    {
        // Commit passed address to core state variable
        core = _core;

        coreInstance = ICore(_core);

        // Commit passed address to vault state variable
        vault = _vault;

        vaultInstance = IVault(_vault);
    }

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
        // Create rebalancingSetToken and Core instances
        IRebalancingSetToken rebalancingSetToken = IRebalancingSetToken(_rebalancingSetToken);

        // Make sure the rebalancingSetToken is tracked by Core
        require(
            coreInstance.validSets(_rebalancingSetToken),
            "RebalanceAuctionModule.bid: Invalid or disabled SetToken address"
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
        coreInstance.batchDepositModule(
            msg.sender,
            _rebalancingSetToken,
            tokenArray,
            inflowUnitArray
        );

        // Transfer ownership of tokens in vault from rebalancing set token to bidder
        vaultInstance.batchTransferBalance(
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
