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

import { BackwardsCompatability } from "./rebalancing-v2/BackwardsCompatability.sol";
import { FailRebalance } from "./rebalancing-v2/FailRebalance.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { IRebalancingSetFactory } from "../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { Issuance } from "./rebalancing-v2/Issuance.sol";
import { IVault } from "../interfaces/IVault.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";
import { PlaceBid } from "./rebalancing-v2/PlaceBid.sol";
import { Propose } from "./rebalancing-v2/Propose.sol";
import { Rebalance } from "../lib/Rebalance.sol";
import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./rebalancing-v2/RebalancingSetState.sol";
import { SettleRebalance } from "./rebalancing-v2/SettleRebalance.sol";
import { StartRebalance } from "./rebalancing-v2/StartRebalance.sol";


/**
 * @title RebalancingSetTokenV2
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set token V2. Major improvements vs. V1 include:
 * - Decouple the Rebalancing Set state and rebalance state from the rebalance execution (e.g. auction)
 *   This allows us to rapidly iterate and build new liquidation mechanisms for rebalances.
 * - The Set retains ability to fail an auction if the minimum fail time has elapsed.
 * - RebalanceAuctionModule execution should be backwards compatible with V1. 
 * - Bidding and auction parameters state no longer live on this contract. They live on the liquidator
 *   BackwardsComptability is used to allow retrieving of previous supported states.
 * - Re-proposals are no longer allowed. Instead, managers cancel proposals and then propose again
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
     * @param _rebalanceConfig           0 - proposalPeriod: Time for users to inspect a rebalance proposal
     *                                   1 - rebalanceInterval: Minimum amount of time between rebalances
     *                                   2 - rebalanceFailPeriod: Time after auctionStart 
     *                                      where something in the rebalance has ovviously gone wrong
     *                                   3 - lastRebalanceTimestamp: Time of the last rebalance
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
        uint256[4] memory _rebalanceConfig,
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
        lastRebalanceTimestamp = _rebalanceConfig[3];
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
        Propose.validateProposal(_nextSet);

        Propose.liquidatorProcessProposal(_nextSet);

        Propose.transitionToProposal(_nextSet);
    }

    /**
     * Reverts an existing proposal. Can only be called by the manager during the 
     * proposal phase.
     */
    function cancelProposal()
        external
        onlyManager
    {
        Propose.validateCancelProposal();

        Propose.liquidatorCancelProposal();

        Propose.revertProposal();
    }

    /*
     * Initiates the rebalance in coordination with the Liquidator contract. 
     * In this step, we redeem the currentSet and pass relevant information
     * to the liquidator.
     *
     * Can only be called if the proposal period has elapsed.
     *
     * Anyone can call this function.
     */
    function startRebalance()
        external
    {
        validateStartRebalance();

        uint256 startingCurrentSetQuantity = calculateStartingSetQuantity();

        StartRebalance.redeemCurrentSet(startingCurrentSetQuantity);

        StartRebalance.liquidatorStartRebalance(startingCurrentSetQuantity);

        StartRebalance.transitionToRebalance();
    }

    /*
     * Get token inflows and outflows required for bid from the Liquidator.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     */
    function getBidPrice(
        uint256 _quantity
    )
        public
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        PlaceBid.validateGetBidPrice(_quantity);

        return Rebalance.decomposeTokenFlow(
            liquidator.getBidPrice(address(this), _quantity)
        );
    }

    /*
     * Place bid during rebalance auction. 
     * 
     * The intended caller is the RebalanceAuctionModule, which must be approved by Core.
     * Call Flow:
     * RebalanceAuctionModule -> RebalancingSetTokenV2 -> Liquidator
     *
     * @param _quantity                 The amount of currentSet to be rebalanced
     */
    function placeBid(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        PlaceBid.validatePlaceBid(_quantity);

        // Place bid and get back inflow and outflow arrays
        Rebalance.TokenFlow memory tokenFlow = liquidator.placeBid(_quantity);

        PlaceBid.updateHasBiddedIfNecessary();

        return Rebalance.decomposeTokenFlow(tokenFlow);
    }

    /*
     * After a successful rebalance, the new Set is issued. 
     * Full issuance functionality is now returned to set owners.
     *
     * Anyone can call this function.
     */
    function settleRebalance()
        external
    {
        uint256 issueQuantity = SettleRebalance.calculateNextSetIssueQuantity();
        uint256 newUnitShares = SettleRebalance.calculateNextSetNewUnitShares(issueQuantity);

        SettleRebalance.validateSettleRebalance(newUnitShares);

        SettleRebalance.issueNextSet(issueQuantity);

        liquidator.settleRebalance();

        SettleRebalance.transitionToDefault(newUnitShares);
    }

    /*
     * Ends a rebalance if there are any signs that there is a failure. 
     * Possible failure reasons:
     * 1. The rebalance has elapsed the failRebalancePeriod
     * 2. The liquidator responds that the rebalance has failed
     * 
     * Move to Drawdown state if bids have been placed. Reset to Default state if no bids placed.
     */
    function endFailedRebalance()
        public
    {
        FailRebalance.validateFailRebalance();

        RebalancingLibrary.State newRebalanceState = FailRebalance.getNewRebalanceState();

        liquidator.endFailedRebalance();

        FailRebalance.transitionToNewState(newRebalanceState);
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
        Issuance.validateMint();

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
        Issuance.validateBurn();

        _burn(_from, _quantity);
    }

    /* ============ Backwards Compatability ============ */

    /*
     * Alias for endFailedRebalance
     */
    function endFailedAuction() external {
        endFailedRebalance();
    }
}
