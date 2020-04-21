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
import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";

import { ICore } from "../interfaces/ICore.sol";
import { IRebalancingSetFactory } from "../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";
import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";
import { FailAuctionLibrary } from "./rebalancing-libraries/FailAuctionLibrary.sol";
import { PlaceBidLibrary } from "./rebalancing-libraries/PlaceBidLibrary.sol";
import { ProposeLibrary } from "./rebalancing-libraries/ProposeLibrary.sol";
import { SettleRebalanceLibrary } from "./rebalancing-libraries/SettleRebalanceLibrary.sol";
import { StartRebalanceLibrary } from "./rebalancing-libraries/StartRebalanceLibrary.sol";


/**
 * @title RebalancingSetToken
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set token.
 */
contract RebalancingSetToken is
    ERC20,
    ERC20Detailed
{
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Dependency variables
    address public core;
    address public factory;
    address public vault;
    address public componentWhiteListAddress;

    // Core and Vault instances
    ICore private coreInstance;
    IVault private vaultInstance;
    IWhiteList private componentWhiteListInstance;

    uint256 public naturalUnit;
    address public manager;
    RebalancingLibrary.State public rebalanceState;

    // State updated after every rebalance
    address public currentSet;
    uint256 public unitShares;
    uint256 public lastRebalanceTimestamp;

    // State governing rebalance cycle
    uint256 public proposalPeriod;
    uint256 public rebalanceInterval;

    // State to track proposal period
    uint256 public proposalStartTime;

    // State needed for auction/rebalance
    address public nextSet;
    address public auctionLibrary;
    uint256 public startingCurrentSetAmount;
    RebalancingLibrary.AuctionPriceParameters public auctionPriceParameters;
    RebalancingLibrary.BiddingParameters public biddingParameters;

    // To be used if token put into Drawdown State
    address[] public failedAuctionWithdrawComponents;

    /* ============ Events ============ */

    event NewManagerAdded(
        address newManager,
        address oldManager
    );

    event RebalanceProposed(
        address nextSet,
        address indexed auctionLibrary,
        uint256 indexed proposalPeriodEndTime
    );

    event RebalanceStarted(
        address oldSet,
        address newSet
    );

    /* ============ Constructor ============ */

    /**
     * Constructor function for Rebalancing Set Token
     *
     * @param _factory                   Factory used to create the Rebalancing Set
     * @param _manager                   Manager of the Rebalancing Set
     * @param _initialSet                Initial set that collateralizes the Rebalancing set
     * @param _initialUnitShares         Units of currentSet that equals one share
     * @param _naturalUnit               The minimum multiple of Sets that can be issued or redeemed
     * @param _proposalPeriod            Amount of time for users to inspect a rebalance proposal
     * @param _rebalanceInterval         Minimum amount of time between rebalances
     * @param _componentWhiteList        Address of component WhiteList contract
     * @param _name                      The name of the new RebalancingSetToken
     * @param _symbol                    The symbol of the new RebalancingSetToken
     */

    constructor(
        address _factory,
        address _manager,
        address _initialSet,
        uint256 _initialUnitShares,
        uint256 _naturalUnit,
        uint256 _proposalPeriod,
        uint256 _rebalanceInterval,
        address _componentWhiteList,
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
        // Require initial unit shares is non-zero
        require(
            _initialUnitShares > 0,
            "RebalancingSetToken.constructor: Unit shares must be positive"
        );

        IRebalancingSetFactory tokenFactory = IRebalancingSetFactory(_factory);

        require(
            _naturalUnit >= tokenFactory.minimumNaturalUnit(),
            "RebalancingSetToken.constructor: Natural Unit too low"
        );

        require(
            _naturalUnit <= tokenFactory.maximumNaturalUnit(),
            "RebalancingSetToken.constructor: Natural Unit too large"
        );

        // Require manager address is non-zero
        require(
            _manager != address(0),
            "RebalancingSetToken.constructor: Invalid manager address"
        );

        // Require minimum rebalance interval and proposal period from factory
        require(
            _proposalPeriod >= tokenFactory.minimumProposalPeriod(),
            "RebalancingSetToken.constructor: Proposal period too short"
        );
        require(
            _rebalanceInterval >= tokenFactory.minimumRebalanceInterval(),
            "RebalancingSetToken.constructor: Rebalance interval too short"
        );

        core = IRebalancingSetFactory(_factory).core();
        coreInstance = ICore(core);
        vault = coreInstance.vault();
        vaultInstance = IVault(vault);
        componentWhiteListAddress = _componentWhiteList;
        componentWhiteListInstance = IWhiteList(_componentWhiteList);
        factory = _factory;
        manager = _manager;
        currentSet = _initialSet;
        unitShares = _initialUnitShares;
        naturalUnit = _naturalUnit;

        proposalPeriod = _proposalPeriod;
        rebalanceInterval = _rebalanceInterval;
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Default;
    }

    /* ============ Public Functions ============ */

    /**
     * Function used to set the terms of the next rebalance and start the proposal period
     *
     * @param _nextSet                      The Set to rebalance into
     * @param _auctionLibrary               The library used to calculate the Dutch Auction price
     * @param _auctionTimeToPivot           The amount of time for the auction to go ffrom start to pivot price
     * @param _auctionStartPrice            The price to start the auction at
     * @param _auctionPivotPrice            The price at which the price curve switches from linear to exponential
     */
    function propose(
        address _nextSet,
        address _auctionLibrary,
        uint256 _auctionTimeToPivot,
        uint256 _auctionStartPrice,
        uint256 _auctionPivotPrice
    )
        external
    {
        // Put together auction price parameters
        RebalancingLibrary.AuctionPriceParameters memory auctionPriceParams =
            RebalancingLibrary.AuctionPriceParameters({
                auctionTimeToPivot: _auctionTimeToPivot,
                auctionStartPrice: _auctionStartPrice,
                auctionPivotPrice: _auctionPivotPrice,
                auctionStartTime: 0
            });

        // Create ProposeAuctionParameters
        ProposeLibrary.ProposalContext memory proposalContext =
            ProposeLibrary.ProposalContext({
                manager: manager,
                currentSet: currentSet,
                coreAddress: core,
                componentWhitelist: componentWhiteListAddress,
                factoryAddress: factory,
                lastRebalanceTimestamp: lastRebalanceTimestamp,
                rebalanceInterval: rebalanceInterval,
                rebalanceState: uint8(rebalanceState)
            });

        // Validate proposal inputs and initialize auctionPriceParameters
        ProposeLibrary.validateProposal(
            _nextSet,
            _auctionLibrary,
            proposalContext,
            auctionPriceParams
        );

        // Update state parameters
        auctionPriceParameters = auctionPriceParams;
        nextSet = _nextSet;
        auctionLibrary = _auctionLibrary;
        proposalStartTime = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Proposal;

        emit RebalanceProposed(
            _nextSet,
            _auctionLibrary,
            proposalStartTime.add(proposalPeriod)
        );
    }

    /*
     * Initiate rebalance for the rebalancing set if the proposal period has elapsed after
     * a proposal.
     */
    function startRebalance()
        external
    {
        // Validate the correct rebalance state and time elapsed
        StartRebalanceLibrary.validateStartRebalance(
            proposalStartTime,
            proposalPeriod,
            uint8(rebalanceState)
        );

        // Redeem currentSet and set up biddingParameters
        biddingParameters = StartRebalanceLibrary.redeemCurrentSetAndGetBiddingParameters(
            currentSet,
            nextSet,
            auctionLibrary,
            core,
            vault
        );

        // Update state parameters
        startingCurrentSetAmount = biddingParameters.remainingCurrentSets;
        auctionPriceParameters.auctionStartTime = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Rebalance;

        emit RebalanceStarted(currentSet, nextSet);
    }

    /*
     * Initiate settlement for the rebalancing set. Full functionality now returned to
     * set owners
     *
     */
    function settleRebalance()
        external
    {
        // Settle the rebalance and mint next Sets
        unitShares = SettleRebalanceLibrary.settleRebalance(
            totalSupply(),
            biddingParameters.remainingCurrentSets,
            biddingParameters.minimumBid,
            naturalUnit,
            nextSet,
            core,
            vault,
            uint8(rebalanceState)
        );

        // Update other state parameters
        currentSet = nextSet;
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Default;
        clearAuctionState();
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
        PlaceBidLibrary.validatePlaceBid(
            _quantity,
            core,
            biddingParameters
        );

        // Place bid and get back inflow and outflow arrays
        uint256[] memory inflowUnitArray;
        uint256[] memory outflowUnitArray;
        (
            inflowUnitArray,
            outflowUnitArray
        ) = getBidPrice(_quantity);

        // Update remainingCurrentSet figure to account for placed bid
        biddingParameters.remainingCurrentSets = biddingParameters.remainingCurrentSets.sub(_quantity);

        return (biddingParameters.combinedTokenArray, inflowUnitArray, outflowUnitArray);
    }

    /*
     * Fail an auction that doesn't complete before reaching the pivot price. Move to Drawdown state
     * if bids have been placed. Reset to Default state if no bids placed.
     *
     */
    function endFailedAuction()
        external
    {
        uint256 calculatedUnitShares;
        (
            ,
            calculatedUnitShares
        ) = SettleRebalanceLibrary.calculateNextSetIssueQuantity(
            totalSupply(),
            naturalUnit,
            nextSet,
            vault
        );

        // Fail auction and either reset to Default state or kill Rebalancing Set Token and enter Drawdown
        // state
        uint8 integerRebalanceState = FailAuctionLibrary.endFailedAuction(
            startingCurrentSetAmount,
            calculatedUnitShares,
            currentSet,
            core,
            auctionPriceParameters,
            biddingParameters,
            uint8(rebalanceState)
        );
        rebalanceState = RebalancingLibrary.State(integerRebalanceState);

        // Reset lastRebalanceTimestamp to now
        lastRebalanceTimestamp = block.timestamp;

        // Save combined token arrays to failedAuctionWithdrawComponents
        failedAuctionWithdrawComponents = biddingParameters.combinedTokenArray;

        // Clear auction state
        clearAuctionState();
    }

    /*
     * Get token inflows and outflows required for bid. Also the amount of Rebalancing
     * Sets that would be generated.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function getBidPrice(
        uint256 _quantity
    )
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        return PlaceBidLibrary.getBidPrice(
            _quantity,
            auctionLibrary,
            biddingParameters,
            auctionPriceParameters,
            uint8(rebalanceState)
        );
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
        // Check that function caller is Core
        require(
            msg.sender == core,
            "RebalancingSetToken.mint: Sender must be core"
        );

        // Check that set is not in Rebalance State
        require(
            rebalanceState != RebalancingLibrary.State.Rebalance,
            "RebalancingSetToken.mint: Cannot mint during Rebalance"
        );

        // Check that set is not in Drawdown State
        require(
            rebalanceState != RebalancingLibrary.State.Drawdown,
            "RebalancingSetToken.mint: Cannot mint during Drawdown"
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
            "RebalancingSetToken.burn: Cannot burn during Rebalance"
        );

        // Check to see if state is Drawdown
        if (rebalanceState == RebalancingLibrary.State.Drawdown) {
            // In Drawdown Sets can only be burned as part of the withdrawal process
            require(
                coreInstance.validModules(msg.sender),
                "RebalancingSetToken.burn: Set cannot be redeemed during Drawdown"
            );
        } else {
            // When in non-Rebalance or Drawdown state, check that function caller is Core
            // so that Sets can be redeemed
            require(
                msg.sender == core,
                "RebalancingSetToken.burn: Sender must be core"
            );
        }

        _burn(_from, _quantity);
    }

    /*
     * Set new manager address
     *
     * @param  _newManager       The address of the new manager account
     */
    function setManager(
        address _newManager
    )
        external
    {
        require(
            msg.sender == manager,
            "RebalancingSetToken.setManager: Sender must be the manager"
        );

        emit NewManagerAdded(_newManager, manager);
        manager = _newManager;
    }

    /* ============ Getter Functions ============ */

    /*
     * Get addresses of setToken underlying the Rebalancing Set
     *
     * @return  componentAddresses       Array of currentSet
     */
    function getComponents()
        external
        view
        returns (address[] memory)
    {
        address[] memory components = new address[](1);
        components[0] = currentSet;
        return components;
    }

    /*
     * Get unitShares of Rebalancing Set
     *
     * @return  units       Array of component unit
     */
    function getUnits()
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory units = new uint256[](1);
        units[0] = unitShares;
        return units;
    }

    /*
     * Get biddingParameters of Rebalancing Set
     *
     * @return  biddingParams       Object with bidding information
     */
    function getBiddingParameters()
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory biddingParams = new uint256[](2);
        biddingParams[0] = biddingParameters.minimumBid;
        biddingParams[1] = biddingParameters.remainingCurrentSets;
        return biddingParams;
    }

    /*
     * Get auctionPriceParameters of Rebalancing Set
     *
     * @return  auctionParams       Object with auction information
     */
    function getAuctionPriceParameters()
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory auctionParams = new uint256[](4);
        auctionParams[0] = auctionPriceParameters.auctionStartTime;
        auctionParams[1] = auctionPriceParameters.auctionTimeToPivot;
        auctionParams[2] = auctionPriceParameters.auctionStartPrice;
        auctionParams[3] = auctionPriceParameters.auctionPivotPrice;
        return auctionParams;
    }

    /*
     * Checks to make sure address is the current set of the RebalancingSetToken.
     * Conforms to the ISetToken Interface.
     *
     * @param  _tokenAddress     Address of token being checked
     * @return  bool             True if token is the current Set
     */
    function tokenIsComponent(
        address _tokenAddress
    )
        external
        view
        returns (bool)
    {
        return _tokenAddress == currentSet;
    }

    /*
     * Get combinedTokenArray of Rebalancing Set
     *
     * @return  combinedTokenArray
     */
    function getCombinedTokenArrayLength()
        external
        view
        returns (uint256)
    {
        return biddingParameters.combinedTokenArray.length;
    }

    /*
     * Get combinedTokenArray of Rebalancing Set
     *
     * @return  combinedTokenArray
     */
    function getCombinedTokenArray()
        external
        view
        returns (address[] memory)
    {
        return biddingParameters.combinedTokenArray;
    }

    /*
     * Get combinedCurrentUnits of Rebalancing Set
     *
     * @return  combinedCurrentUnits
     */
    function getCombinedCurrentUnits()
        external
        view
        returns (uint256[] memory)
    {
        return biddingParameters.combinedCurrentUnits;
    }

    /*
     * Get combinedNextSetUnits of Rebalancing Set
     *
     * @return  combinedNextSetUnits
     */
    function getCombinedNextSetUnits()
        external
        view
        returns (uint256[] memory)
    {
        return biddingParameters.combinedNextSetUnits;
    }

    /*
     * Get failedAuctionWithdrawComponents of Rebalancing Set
     *
     * @return  failedAuctionWithdrawComponents
     */
    function getFailedAuctionWithdrawComponents()
        external
        view
        returns (address[] memory)
    {
        return failedAuctionWithdrawComponents;
    }

    /* ============ Internal Functions ============ */

    /*
     * Reset auction specific state after failed or successful rebalance
     */
    function clearAuctionState()
        internal
    {
        nextSet = address(0);
        auctionLibrary = address(0);
        startingCurrentSetAmount = 0;
        delete auctionPriceParameters;
        delete biddingParameters;
    }
}
