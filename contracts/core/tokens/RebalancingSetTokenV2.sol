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
import { Initializable } from "zos-lib/contracts/Initializable.sol";

import { BackwardCompatibility } from "./rebalancing-v2/BackwardCompatibility.sol";
import { RebalancingFailure } from "./rebalancing-v2/RebalancingFailure.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IFeeCalculator } from "../interfaces/IFeeCalculator.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { IRebalancingSetFactory } from "../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { Issuance } from "./rebalancing-v2/Issuance.sol";
import { IVault } from "../interfaces/IVault.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";
import { RebalancingBid } from "./rebalancing-v2/RebalancingBid.sol";
import { Rebalance } from "../lib/Rebalance.sol";
import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";
import { RebalancingSetState } from "./rebalancing-v2/RebalancingSetState.sol";
import { RebalancingSettlement } from "./rebalancing-v2/RebalancingSettlement.sol";
import { RebalancingStart } from "./rebalancing-v2/RebalancingStart.sol";


/**
 * @title RebalancingSetTokenV2
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set token V2. Major improvements vs. V1 include:
 * - Decouple the Rebalancing Set state and rebalance state from the rebalance execution (e.g. auction)
 *   This allows us to rapidly iterate and build new liquidation mechanisms for rebalances.
 * - Proposals are removed in favor of starting an auction directly.
 * - The Set retains ability to fail an auction if the minimum fail time has elapsed.
 * - RebalanceAuctionModule execution should be backwards compatible with V1. 
 * - Bidding and auction parameters state no longer live on this contract. They live on the liquidator
 *   BackwardsComptability is used to allow retrieving of previous supported states.
 * - Introduces entry and rebalance fees, where rebalance fees are configurable based on an external
 *   fee calculator contract
 */
contract RebalancingSetTokenV2 is
    ERC20,
    ERC20Detailed,
    Initializable,
    RebalancingSetState,
    BackwardCompatibility,
    Issuance,
    RebalancingStart,
    RebalancingBid,
    RebalancingSettlement,
    RebalancingFailure
{

    /* ============ Constructor ============ */

    /**
     * Constructor function for Rebalancing Set Token
     *
     * addressConfig [factory, manager, liquidator, initialSet, componentWhiteList, 
     *                liquidatorWhiteList, feeRecipient, rebalanceFeeCalculator]
     * [0]factory                   Factory used to create the Rebalancing Set
     * [1]manager                   Address that is able to propose the next Set
     * [2]liquidator                Address of the liquidator contract
     * [3]initialSet                Initial set that collateralizes the Rebalancing set
     * [4]componentWhiteList        Whitelist that nextSet components are checked against during propose
     * [5]liquidatorWhiteList       Whitelist of valid liquidators
     * [6]feeRecipient              Address that receives any incentive fees
     * [7]rebalanceFeeCalculator    Address to retrieve rebalance fee during settlement
     *
     * uintConfig [initialUnitShares, naturalUnit, rebalanceInterval, rebalanceFailPeriod, 
     *             lastRebalanceTimestamp, entryFee]
     * [0]initialUnitShares         Units of currentSet that equals one share
     * [1]naturalUnit               The minimum multiple of Sets that can be issued or redeemed
     * [2]rebalanceInterval:        Minimum amount of time between rebalances
     * [3]rebalanceFailPeriod:      Time after auctionStart where something in the rebalance has gone wrong
     * [4]lastRebalanceTimestamp:   Time of the last rebalance; Allows customized deployments
     * [5]entryFee:                 Mint fee represented in a scaled decimal value (e.g. 100% = 1e18, 1% = 1e16)
     *
     * @param _addressConfig             List of configuration addresses
     * @param _uintConfig                List of uint addresses
     * @param _name                      The name of the new RebalancingSetTokenV2
     * @param _symbol                    The symbol of the new RebalancingSetTokenV2
     */
    constructor(
        address[8] memory _addressConfig,
        uint256[6] memory _uintConfig,
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
        factory = IRebalancingSetFactory(_addressConfig[0]);
        manager = _addressConfig[1];
        liquidator = ILiquidator(_addressConfig[2]);
        currentSet = ISetToken(_addressConfig[3]);
        componentWhiteList = IWhiteList(_addressConfig[4]);
        liquidatorWhiteList = IWhiteList(_addressConfig[5]);
        feeRecipient = _addressConfig[6];
        rebalanceFeeCalculator = IFeeCalculator(_addressConfig[7]);

        unitShares = _uintConfig[0];
        naturalUnit = _uintConfig[1];
        rebalanceInterval = _uintConfig[2];
        rebalanceFailPeriod = _uintConfig[3];
        lastRebalanceTimestamp = _uintConfig[4];
        entryFee = _uintConfig[5];

        core = ICore(factory.core());
        vault = IVault(core.vault());
        rebalanceState = RebalancingLibrary.State.Default;
    }

    /*
     * Intended to be called during creation by the RebalancingSetTokenFactory. Can only be initialized
     * once. This implementation initializes the rebalance fee.
     *
     *
     * @param _rebalanceFeeCalldata       Bytes encoded rebalance fee represented as a scaled percentage value
     */
    function initialize(
        bytes calldata _rebalanceFeeCalldata
    )
        external
        initializer
    {
        rebalanceFeeCalculator.initialize(_rebalanceFeeCalldata);
    }

   /* ============ External Functions ============ */

    /*
     * Initiates the rebalance in coordination with the Liquidator contract. 
     * In this step, we redeem the currentSet and pass relevant information
     * to the liquidator.
     *
     * @param _nextSet                      The Set to rebalance into
     * @param _liquidatorData               Bytecode formatted data with liquidator-specific arguments
     *
     * Can only be called if the rebalance interval has elapsed.
     * Can only be called by manager.
     */
    function startRebalance(
        ISetToken _nextSet,
        bytes calldata _liquidatorData
    )
        external
        onlyManager
    {
        RebalancingStart.validateStartRebalance(_nextSet);

        uint256 startingCurrentSetQuantity = RebalancingStart.calculateStartingSetQuantity();

        core.redeemInVault(address(currentSet), startingCurrentSetQuantity);

        RebalancingStart.liquidatorRebalancingStart(_nextSet, startingCurrentSetQuantity, _liquidatorData);

        RebalancingStart.transitionToRebalance(_nextSet);

        emit RebalanceStarted(
            address(currentSet),
            address(nextSet),
            rebalanceIndex,
            startingCurrentSetQuantity
        );
    }

    /*
     * Get token inflows and outflows required for bid from the Liquidator.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @return inflowUnitArray          Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray         Array of amount of tokens taken out of system in bid
     */
    function getBidPrice(
        uint256 _quantity
    )
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        RebalancingBid.validateGetBidPrice(_quantity);

        return Rebalance.decomposeTokenFlowToBidPrice(
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
        RebalancingBid.validatePlaceBid(_quantity);

        // Place bid and get back inflow and outflow arrays
        Rebalance.TokenFlow memory tokenFlow = liquidator.placeBid(_quantity);

        RebalancingBid.updateHasBiddedIfNecessary();

        return Rebalance.decomposeTokenFlow(tokenFlow);
    }

    /*
     * After a successful rebalance, the new Set is issued. If there is a rebalance fee,
     * the fee is paid via inflation of the Rebalancing Set to the feeRecipient.
     * Full issuance functionality is now returned to set owners.
     *
     * Anyone can call this function.
     */
    function settleRebalance()
        external
    {
        RebalancingSettlement.validateRebalancingSettlement();

        uint256 issueQuantity = RebalancingSettlement.calculateSetIssueQuantity(nextSet);

        // Calculates fees and mints Rebalancing Set to the feeRecipient, increasing supply
        (uint256 feePercent, uint256 feeQuantity) = RebalancingSettlement.handleFees();

        uint256 newUnitShares = RebalancingSettlement.calculateNextSetNewUnitShares(issueQuantity);

        // The unit shares must result in a quantity greater than the number of natural units outstanding
        require(
            newUnitShares > 0,
            "Failed: unitshares is 0."
        );

        RebalancingSettlement.issueNextSet(issueQuantity);

        liquidator.settleRebalance();

        // Rebalance index is the current vs next rebalance
        emit RebalanceSettled(
            feeRecipient,
            feeQuantity,
            feePercent,
            rebalanceIndex,
            issueQuantity,
            newUnitShares
        );

        RebalancingSettlement.transitionToDefault(newUnitShares);

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
        RebalancingFailure.validateFailRebalance();

        RebalancingLibrary.State newRebalanceState = RebalancingFailure.getNewRebalanceState();

        liquidator.endFailedRebalance();

        RebalancingFailure.transitionToNewState(newRebalanceState);
    }

    /*
     * Mint set token for given address. If there if is an entryFee, calculates the fee and mints
     * the rebalancing SetToken to the feeRecipient.
     * 
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

        uint256 issueQuantityNetOfFees = Issuance.handleEntryFees(_quantity);

        ERC20._mint(_issuer, issueQuantityNetOfFees);
    }

    /*
     * Burn set token for given address. Can only be called by authorized contracts.
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

        ERC20._burn(_from, _quantity);
    }

    /* ============ Backwards Compatability ============ */

    /*
     * Alias for endFailedRebalance
     */
    function endFailedAuction() external {
        endFailedRebalance();
    }
}
