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

import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { IRebalancingSetFactory } from "../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";
import { RebalancingSetState } from "./rebalancing-v2/RebalancingSetState.sol";
import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";
import { Issuance } from "./rebalancing-v2/Issuance.sol";
import { BackwardsCompatability } from "./rebalancing-v2/BackwardsCompatability.sol";
import { PlaceBid } from "./rebalancing-v2/PlaceBid.sol";
import { Propose } from "./rebalancing-v2/Propose.sol";
import { StartRebalance } from "./rebalancing-v2/StartRebalance.sol";
import { FailRebalance } from "./rebalancing-v2/FailRebalance.sol";
import { SettleRebalance } from "./rebalancing-v2/SettleRebalance.sol";


/**
 * @title RebalancingSetTokenV2
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set token V2. Major improvements vs. V1 include:
 * - Decouple the Rebalancing Set state and rebalance state from the rebalance execution (e.g. auction)
 *   This allows us to rapidly iterate and build new liquidation mechanisms for rebalances.
 * - RebalanceAuctionModule execution should be backwards compatible with V1. 
 * - Bidding and auction parameters state no longer live on this contract. They live on the liquidator
 * - Re-proposals are no longer allowed. Instead, one would cancel a proposal and then propose again
 */
contract RebalancingSetTokenV2 is
    ERC20,
    ERC20Detailed,
    RebalancingSetState,
    BackwardsCompatability,
    Issuance,
    Propose,
    StartRebalance,
    PlaceBid,
    SettleRebalance,
    FailRebalance
{

    /* ============ Constructor ============ */

    /**
     * Constructor function for Rebalancing Set Token
     *
     * @param _factory                   Factory used to create the Rebalancing Set
     * @param _manager                   Address that is able to propose the next Set
     * @param _liquidator                Address of the liquidator contract
     * @param _initialSet                Initial set that collateralizes the Rebalancing set
     * @param _componentWhiteList        Whitelist that nextSet components are checked against during propose
     * @param _initialUnitShares         Units of currentSet that equals one share
     * @param _naturalUnit               The minimum multiple of Sets that can be issued or redeemed
     * @param _rebalanceConfig           [_proposalPeriod, _rebalanceInterval, _rebalanceFailPeriod]
     *                                   _proposalPeriod: Time for users to inspect a rebalance proposal
     *                                   _rebalanceInterval: Minimum amount of time between rebalances
     *                                   _rebalanceFailPeriod: Time after auctionStart 
     *                                      where something in the rebalance has ovviously gone wrong
     * @param _name                      The name of the new RebalancingSetTokenV2
     * @param _symbol                    The symbol of the new RebalancingSetTokenV2
     */
    constructor(
        IRebalancingSetFactory _factory,
        address _manager,
        ILiquidator _liquidator,
        ISetToken _initialSet,
        IWhiteList _componentWhiteList,
        uint256 _initialUnitShares,
        uint256 _naturalUnit,
        uint256[3] memory _rebalanceConfig,
        string memory _name,
        string memory _symbol
    )
        public
        ERC20Detailed(
            _name,
            _symbol,
            18
        )
    {
        core = ICore(_factory.core());
        vault = IVault(core.vault());
        componentWhiteList = _componentWhiteList;
        factory = _factory;
        liquidator = _liquidator;
        manager = _manager;
        currentSet = _initialSet;
        unitShares = _initialUnitShares;
        naturalUnit = _naturalUnit;

        proposalPeriod = _rebalanceConfig[0];
        rebalanceInterval = _rebalanceConfig[1];
        rebalanceFailPeriod = _rebalanceConfig[2];

        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Default;
    }

   /* ============ External Functions ============ */

    /**
     * Set the terms of the next rebalance and transitions the Set to the proposal period.
     * Can only be called after the rebalance interval has elapsed since the last rebalance.
     * 
     * @param _nextSet                      The Set to rebalance into
     */
    function propose(
        ISetToken _nextSet
    )
        external
        onlyManager
    {
        validateProposal(_nextSet);

        liquidatorProcessProposal(_nextSet);

        transitionToProposal(_nextSet);
    }

    /**
     * Reverts an existing proposal. Can only be called by the manager during the 
     * proposal phase.
     */
    function cancelProposal()
        external
        onlyManager
    {
        validateCancelProposal();

        liquidatorCancelProposal();

        revertProposal();
    }

    /*
     * Initiates the rebalance. Can only be called if the proposal period has elapsed after
     * a proposal.
     *
     * Anyone can call this function.
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
     * Get token inflows and outflows required for bid. Also the amount of Rebalancing
     * Sets that would be generated.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @return combinedTokenArray     Array of token addresses invovled in rebalancing
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function getBidPrice(
        uint256 _quantity
    )
        public
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        validateGetBidPrice(_quantity);

        return liquidator.getBidPrice(_quantity);
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

    /*
     * Initiate settlement for the rebalancing set. Full functionality now returned to
     * set owners
     *
     * * Anyone can call this function.
     */
    function settleRebalance()
        external
    {
        (
            uint256 issueQuantity,
            uint256 newUnitShares
        ) = calculateNextSetIssueQuantity();

        validateSettleRebalance(newUnitShares);

        issueNextSet(issueQuantity);

        liquidatorSettleRebalance();

        transitionToDefault(newUnitShares);
    }

    /*
     * Fail an auction that doesn't complete before reaching the pivot price. Move to Drawdown state
     * if bids have been placed. Reset to Default state if no bids placed.
     *
     */
    function endFailedRebalance()
        external
    {
        validateFailRebalance();

        handleFailedRebalance();
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
