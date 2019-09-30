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
pragma experimental "ABIEncoderV2";

import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

import { ICore } from "../../interfaces/ICore.sol";
import { ILiquidator } from "../../interfaces/ILiquidator.sol";
import { IRebalancingSetFactory } from "../../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IVault } from "../../interfaces/IVault.sol";
import { IWhiteList } from "../../interfaces/IWhiteList.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./RebalancingSetState.sol";
import { Propose } from "./Propose.sol";


/**
 * @title RebalancingSetLifecycle
 * @author Set Protocol
 *
 * The RebalancingSetLifecycle 
 */
contract RebalancingSetLifecycle is
    ERC20,
    RebalancingSetState,
    Propose
{

    event RebalanceStarted(
        address oldSet,
        address newSet
    );
    /* ============ External Functions ============ */

    /**
     * Function used to set the terms of the next rebalance and start the proposal period
     *
     * @param _nextSet                      The Set to rebalance into
     */
    function propose(
        ISetToken _nextSet
    )
        external
    {
        // Validate proposal
        validateProposal(_nextSet);

        // TODO: Call liquidator's propose

        transitionToProposal(_nextSet);
    }

    // /*
    //  * Initiate rebalance for the rebalancing set if the proposal period has elapsed after
    //  * a proposal.
    //  */
    // function startRebalance()
    //     external
    // {
    //     // Validate the correct rebalance state and time elapsed
    //     StartRebalanceLibrary.validateStartRebalance(
    //         proposalStartTime,
    //         proposalPeriod,
    //         uint8(rebalanceState)
    //     );

    //     // Redeem currentSet and set up biddingParameters
    //     StartRebalanceLibrary.redeemCurrentSetAndGetBiddingParameters(
    //         currentSet,
    //         nextSet,
    //         auctionLibrary,
    //         core,
    //         vault
    //     );

    //     // Update state parameters
    //     startingCurrentSetAmount = biddingParameters.remainingCurrentSets;
    //     rebalanceStartTime = block.timestamp;
    //     rebalanceState = RebalancingLibrary.State.Rebalance;

    //     emit RebalanceStarted(currentSet, nextSet);
    // }

    // /*
    //  * Initiate settlement for the rebalancing set. Full functionality now returned to
    //  * set owners
    //  *
    //  */
    // function settleRebalance()
    //     external
    // {
    //     // Settle the rebalance and mint next Sets
    //     unitShares = SettleRebalanceLibrary.settleRebalance(
    //         totalSupply(),
    //         biddingParameters.remainingCurrentSets,
    //         biddingParameters.minimumBid,
    //         naturalUnit,
    //         nextSet,
    //         core,
    //         vault,
    //         uint8(rebalanceState)
    //     );

    //     // Update other state parameters
    //     currentSet = nextSet;
    //     lastRebalanceTimestamp = block.timestamp;
    //     rebalanceState = RebalancingLibrary.State.Default;
    //     clearAuctionState();
    // }

    // /*
    //  * Place bid during rebalance auction. Can only be called by Core.
    //  *
    //  * @param _quantity                 The amount of currentSet to be rebalanced
    //  * @return combinedTokenArray       Array of token addresses invovled in rebalancing
    //  * @return inflowUnitArray          Array of amount of tokens inserted into system in bid
    //  * @return outflowUnitArray         Array of amount of tokens taken out of system in bid
    //  */
    // function placeBid(
    //     uint256 _quantity
    // )
    //     external
    //     returns (address[] memory, uint256[] memory, uint256[] memory)
    // {
    //     // Validate bid quantity and module is sender
    //     PlaceBidLibrary.validatePlaceBid(
    //         _quantity,
    //         core,
    //         biddingParameters
    //     );

    //     // Place bid and get back inflow and outflow arrays
    //     uint256[] memory inflowUnitArray;
    //     uint256[] memory outflowUnitArray;
    //     (
    //         inflowUnitArray,
    //         outflowUnitArray
    //     ) = getBidPrice(_quantity);

    //     // Update remainingCurrentSet figure to account for placed bid
    //     biddingParameters.remainingCurrentSets = biddingParameters.remainingCurrentSets.sub(_quantity);

    //     return (biddingParameters.combinedTokenArray, inflowUnitArray, outflowUnitArray);
    // }

    // /*
    //  * Fail an auction that doesn't complete before reaching the pivot price. Move to Drawdown state
    //  * if bids have been placed. Reset to Default state if no bids placed.
    //  *
    //  */
    // function endFailedAuction()
    //     external
    // {
    //     uint256 calculatedUnitShares;
    //     (
    //         ,
    //         calculatedUnitShares
    //     ) = SettleRebalanceLibrary.calculateNextSetIssueQuantity(
    //         totalSupply(),
    //         naturalUnit,
    //         nextSet,
    //         vault
    //     );

    //     // Fail auction and either reset to Default state or kill Rebalancing Set Token and enter Drawdown
    //     // state
    //     uint8 integerRebalanceState = FailAuctionLibrary.endFailedAuction(
    //         startingCurrentSetAmount,
    //         calculatedUnitShares,
    //         currentSet,
    //         core,
    //         auctionPriceParameters,
    //         biddingParameters,
    //         uint8(rebalanceState)
    //     );
    //     rebalanceState = RebalancingLibrary.State(integerRebalanceState);

    //     // Reset lastRebalanceTimestamp to now
    //     lastRebalanceTimestamp = block.timestamp;

    //     // Save combined token arrays to failedAuctionWithdrawComponents
    //     failedAuctionWithdrawComponents = biddingParameters.combinedTokenArray;

    //     // Clear auction state
    //     clearAuctionState();
    // }

    /*
     * Get token inflows and outflows required for bid. Also the amount of Rebalancing
     * Sets that would be generated.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    // function getBidPrice(
    //     uint256 _quantity
    // )
    //     public
    //     view
    //     returns (uint256[] memory, uint256[] memory)
    // {
    //     return PlaceBidLibrary.getBidPrice(
    //         _quantity,
    //         auctionLibrary,
    //         biddingParameters,
    //         auctionPriceParameters,
    //         uint8(rebalanceState)
    //     );
    // }

    /*
     * Mint set token for given address.
     * Can only be called by Core contract.
     *
     * @param  _issuer      The address of the issuing account
     * @param  _quantity    The number of sets to attribute to issuer
     */
    function mint(
        address _issuer,
        uint256 _quantity
    )
        external
    {
        // Check that function caller is Core
        require(
            msg.sender == address(core),
            "RebalancingSetTokenV2.mint: Sender must be core"
        );

        // Check that set is not in Rebalance State
        require(
            rebalanceState != RebalancingLibrary.State.Rebalance,
            "RebalancingSetTokenV2.mint: Cannot mint during Rebalance"
        );

        // Check that set is not in Drawdown State
        require(
            rebalanceState != RebalancingLibrary.State.Drawdown,
            "RebalancingSetTokenV2.mint: Cannot mint during Drawdown"
        );

        // Update token balance of the manager
        _mint(_issuer, _quantity);
    }

    /*
     * Burn set token for given address.
     * Can only be called by authorized contracts.
     *
     * @param  _from        The address of the redeeming account
     * @param  _quantity    The number of sets to burn from redeemer
     */
    function burn(
        address _from,
        uint256 _quantity
    )
        external
    {
        // Check that set is not in Rebalancing State
        require(
            rebalanceState != RebalancingLibrary.State.Rebalance,
            "RebalancingSetTokenV2.burn: Cannot burn during Rebalance"
        );

        // Check to see if state is Drawdown
        if (rebalanceState == RebalancingLibrary.State.Drawdown) {
            // In Drawdown Sets can only be burned as part of the withdrawal process
            require(
                core.validModules(msg.sender),
                "RebalancingSetTokenV2.burn: Set cannot be redeemed during Drawdown"
            );
        } else {
            // When in non-Rebalance or Drawdown state, check that function caller is Core
            // so that Sets can be redeemed
            require(
                msg.sender == address(core),
                "RebalancingSetTokenV2.burn: Sender must be core"
            );
        }

        _burn(_from, _quantity);
    }

    /* ============ Internal Functions ============ */

    // /*
    //  * Reset auction specific state after failed or successful rebalance
    //  */
    // function clearAuctionState()
    //     internal
    // {
    //     nextSet = address(0);
    //     startingCurrentSetAmount = 0;
    // }
}
