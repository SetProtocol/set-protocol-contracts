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
    using SafeMath for uint256;

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

    /**
     * If a Rebalancing Set Token Rebalance has failed (it includes paused token or exceeds gas limits)
     * and been put in Drawdown state, user's can withdraw their portion of the components collateralizing
     * the Rebalancing Set Token. This burns the user's portion of the Rebalancing Set Token.
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token to withdraw from
     */
    function withdrawFromFailedRebalance(
        address _rebalancingSetToken
    )
        external
        nonReentrant
    {
        // Create Rebalancing Set Token instance
        IRebalancingSetToken rebalancingSetToken = IRebalancingSetToken(_rebalancingSetToken);

        // Make sure the rebalancingSetToken is tracked by Core
        require(
            coreInstance.validSets(_rebalancingSetToken),
            "RebalanceAuctionModule.bid: Invalid or disabled SetToken address"
        );

        // Get combinedTokenArray from RebalancingSetToken
        address[] memory combinedTokenArray = rebalancingSetToken.getCombinedTokenArray();

        // Get Rebalancing Set Token's total supply
        uint256 setTotalSupply = rebalancingSetToken.totalSupply();

        // Get caller's balance
        uint256 callerBalance = rebalancingSetToken.balanceOf(msg.sender);

        // Get RebalancingSetToken component amounts and calculate caller's portion of each token
        uint256 transferArrayLength = combinedTokenArray.length;
        uint256[] memory componentTransferAmount = new uint256[](transferArrayLength);
        for (uint256 i = 0; i < transferArrayLength; i++) {
            uint256 tokenCollateralAmount = vaultInstance.getOwnerBalance(
                combinedTokenArray[i],
                _rebalancingSetToken
            );
            componentTransferAmount[i] = tokenCollateralAmount.mul(callerBalance).div(setTotalSupply);
        }

        // Burn caller's balance of Rebalancing Set Token
        rebalancingSetToken.burn(
            msg.sender,
            callerBalance
        );
        
        // Transfer token amounts to caller in Vault from Rebalancing Set Token
        vaultInstance.batchTransferBalance(
            combinedTokenArray,
            _rebalancingSetToken,
            msg.sender,
            componentTransferAmount
        );
    }
}
