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

import { ReentrancyGuard } from "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ICore } from "../interfaces/ICore.sol";
import { IRebalancingSetToken } from "../interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";
import { ModuleCoreState } from "./lib/ModuleCoreState.sol";


/**
 * @title RebalanceAuctionModule
 * @author Set Protocol
 *
 * The RebalanceAuctionModule is a smart contract that exposes bidding and failed rebalance functionality.
 */
contract RebalanceAuctionModule is
    ModuleCoreState,
    ReentrancyGuard
{
    using SafeMath for uint256;

    /* ============ Events ============ */

    event BidPlaced(
        address indexed rebalancingSetToken,
        address indexed bidder,
        uint256 executionQuantity,
        address[] combinedTokenAddresses,
        uint256[] inflowTokenUnits,
        uint256[] outflowTokenUnits
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for RebalanceAuctionModule
     *
     * @param _core       The address of Core
     * @param _vault      The address of Vault
     */
    constructor(
        address _core,
        address _vault
    )
        public
        ModuleCoreState(
            _core,
            _vault
        )
    {}

    /* ============ Public Functions ============ */

    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token
     * The tokens are attributed to the user in the vault.
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     * @param  _allowPartialFill       Set to true if want to partially fill bid when quantity
                                       is greater than currentRemainingSets
     */
    function bid(
        address _rebalancingSetToken,
        uint256 _quantity,
        bool _allowPartialFill
    )
        external
        nonReentrant
    {
        // If user allows partial fills calculate partial fill (if necessary)
        uint256 executionQuantity = calculateExecutionQuantity(
            _rebalancingSetToken,
            _quantity,
            _allowPartialFill
        );

        // Place bid and retrieve token inflows and outflows
        address[] memory tokenArray;
        uint256[] memory inflowUnitArray;
        uint256[] memory outflowUnitArray;
        (
            tokenArray,
            inflowUnitArray,
            outflowUnitArray
        ) = IRebalancingSetToken(_rebalancingSetToken).placeBid(executionQuantity);

        // Retrieve tokens from bidder and deposit in vault for rebalancing set token
        coreInstance.batchDepositModule(
            msg.sender,
            _rebalancingSetToken,
            tokenArray,
            inflowUnitArray
        );

        // Transfer ownership of tokens in vault from rebalancing set token to bidder
        coreInstance.batchTransferBalanceModule(
            tokenArray,
            _rebalancingSetToken,
            msg.sender,
            outflowUnitArray
        );

        // Log bid placed event
        emit BidPlaced(
            _rebalancingSetToken,
            msg.sender,
            executionQuantity,
            tokenArray,
            inflowUnitArray,
            outflowUnitArray
        );
    }

    /**
     * Bid on rebalancing a given quantity of sets held by a rebalancing token
     * The tokens are returned to the user.
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     * @param  _allowPartialFill       Set to true if want to partially fill bid when quantity
                                       is greater than currentRemainingSets
     */
    function bidAndWithdraw(
        address _rebalancingSetToken,
        uint256 _quantity,
        bool _allowPartialFill
    )
        external
        nonReentrant
    {
        // If user allows partial fills calculate partial fill (if necessary)
        uint256 executionQuantity = calculateExecutionQuantity(
            _rebalancingSetToken,
            _quantity,
            _allowPartialFill
        );

        // Place bid and retrieve token inflows and outflows
        address[] memory tokenArray;
        uint256[] memory inflowUnitArray;
        uint256[] memory outflowUnitArray;
        (
            tokenArray,
            inflowUnitArray,
            outflowUnitArray
        ) = IRebalancingSetToken(_rebalancingSetToken).placeBid(executionQuantity);

        // Retrieve tokens from bidder and deposit in vault for rebalancing set token
        coreInstance.batchDepositModule(
            msg.sender,
            _rebalancingSetToken,
            tokenArray,
            inflowUnitArray
        );

        // Withdraw tokens from Rebalancing Set Token vault account to bidder
        coreInstance.batchWithdrawModule(
            _rebalancingSetToken,
            msg.sender,
            tokenArray,
            outflowUnitArray
        );

        // Log bid placed event
        emit BidPlaced(
            _rebalancingSetToken,
            msg.sender,
            executionQuantity,
            tokenArray,
            inflowUnitArray,
            outflowUnitArray
        );
    }

    /**
     * If a Rebalancing Set Token Rebalance has failed (it includes paused token or exceeds gas limits)
     * and been put in Drawdown state, user's can withdraw their portion of the components collateralizing
     * the Rebalancing Set Token. This burns the user's portion of the Rebalancing Set Token.
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token to withdraw from
     */
    function redeemFromFailedRebalance(
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
            "RebalanceAuctionModule.redeemFromFailedRebalance: Invalid or disabled SetToken address"
        );

        // Get getFailedAuctionWithdrawComponents from RebalancingSetToken
        address[] memory withdrawComponents = rebalancingSetToken.getFailedAuctionWithdrawComponents();

        // Get Rebalancing Set Token's total supply
        uint256 setTotalSupply = rebalancingSetToken.totalSupply();

        // Get caller's balance
        uint256 callerBalance = rebalancingSetToken.balanceOf(msg.sender);

        // Get RebalancingSetToken component amounts and calculate caller's portion of each token
        uint256 transferArrayLength = withdrawComponents.length;
        uint256[] memory componentTransferAmount = new uint256[](transferArrayLength);
        for (uint256 i = 0; i < transferArrayLength; i++) {
            uint256 tokenCollateralAmount = vaultInstance.getOwnerBalance(
                withdrawComponents[i],
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
        coreInstance.batchTransferBalanceModule(
            withdrawComponents,
            _rebalancingSetToken,
            msg.sender,
            componentTransferAmount
        );
    }

    /* ============ Internal Functions ============ */

    /**
     * Get execution quantity in event bid quantity exceeds remainingCurrentSets
     *
     * @param  _rebalancingSetToken    Address of the rebalancing token being bid on
     * @param  _quantity               Number of currentSets to rebalance
     * @param  _allowPartialFill       Set to true if want to partially fill bid when quantity
                                       is greater than currentRemainingSets
     * @return executionQuantity       Array of token addresses invovled in rebalancing
     */
    function calculateExecutionQuantity(
        address _rebalancingSetToken,
        uint256 _quantity,
        bool _allowPartialFill
    )
        internal
        view
        returns (uint256)
    {
        // Make sure the rebalancingSetToken is tracked by Core
        require(
            coreInstance.validSets(_rebalancingSetToken),
            "RebalanceAuctionModule.bid: Invalid or disabled SetToken address"
        );

        // Receive bidding parameters of current auction
        uint256[] memory biddingParameters = IRebalancingSetToken(_rebalancingSetToken).getBiddingParameters();
        uint256 minimumBid = biddingParameters[0];
        uint256 remainingCurrentSets = biddingParameters[1];

        if (_allowPartialFill && _quantity > remainingCurrentSets) {     
            // If quantity is greater than remainingCurrentSets round amount to nearest multiple of
            // minimumBid that is less than remainingCurrentSets
            uint256 executionQuantity = remainingCurrentSets.div(minimumBid).mul(minimumBid);
            return executionQuantity;
        } else {
            return _quantity;
        }
    }
}
