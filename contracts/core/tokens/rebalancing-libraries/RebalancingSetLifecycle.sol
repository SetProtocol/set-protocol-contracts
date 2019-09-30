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
import { Issuance } from "./Issuance.sol";
import { PlaceBid } from "./PlaceBid.sol";
import { Propose } from "./Propose.sol";
import { StartRebalance } from "./StartRebalance.sol";
import { SettleRebalance } from "./SettleRebalance.sol";
import { RebalancingLifecycleLibrary } from "./RebalancingLifecycleLibrary.sol";



/**
 * @title RebalancingSetLifecycle
 * @author Set Protocol
 *
 * The RebalancingSetLifecycle 
 */
contract RebalancingSetLifecycle is
    ERC20,
    RebalancingSetState,
    Propose,
    StartRebalance,
    Issuance,
    PlaceBid,
    SettleRebalance
{

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
        validateProposal(_nextSet);

        liquidatorValidateProposal(_nextSet);

        transitionToProposal(_nextSet);
    }

    /*
     * Initiate rebalance for the rebalancing set if the proposal period has elapsed after
     * a proposal.
     */
    function startRebalance()
        external
    {
        validateStartRebalance();

        uint256 startingCurrentSetQuantity = redeemCurrentSet();

        liquidatorStartRebalance(startingCurrentSetQuantity);

        transitionToRebalance();
    }

    /*
     * Initiate settlement for the rebalancing set. Full functionality now returned to
     * set owners
     *
     */
    function settleRebalance()
        external
    {
        validateSettleRebalance();

        issueNextSet();

        liquidatorSettleRebalance();

        transitionToDefault();
    }

    /*
     * Place bid during rebalance auction. Can only be called by Core.
     *
     * @param _quantity                 The amount of currentSet to be rebalanced
     * @return combinedTokenArray       Array of token addresses invovled in rebalancing
     * @return inflowUnitArray          Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray         Array of amount of tokens taken out of system in bid
     */
    function placeBid(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        // Validate bid quantity and module is sender
        validatePlaceBid(_quantity);

        // Place bid and get back inflow and outflow arrays
        (
            address[] memory combinedTokenArray,
            uint256[] memory inflowUnitArray,
            uint256[] memory outflowUnitArray
        ) = liquidator.placeBid(_quantity);

        updateHasBiddedIfNecessary();

        return (combinedTokenArray, inflowUnitArray, outflowUnitArray);
    }

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
     * @return combinedTokenArray       Array of token addresses invovled in rebalancing
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function getBidPrice(
        uint256 _quantity
    )
        public
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        validateGetBidPrice(_quantity);

        return liquidator.getBidPrice(_quantity);
    }


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
        validateMint();

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
        validateBurn();

        _burn(_from, _quantity);
    }
}
