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
pragma experimental "ABIEncoderV2";

import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { AddressArrayUtils } from "../../lib/AddressArrayUtils.sol";
import { Bytes32 } from "../../lib/Bytes32.sol";
import { CommonMath } from "../../lib/CommonMath.sol";
import { ERC20Wrapper } from "../../lib/ERC20Wrapper.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IRebalancingSetFactory } from "../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";
import { RebalancingHelperLibrary } from "../lib/RebalancingHelperLibrary.sol";
import { StandardFailAuctionLibrary } from "./rebalancing-libraries/StandardFailAuctionLibrary.sol";
import { StandardPlaceBidLibrary } from "./rebalancing-libraries/StandardPlaceBidLibrary.sol";
import { StandardProposeLibrary } from "./rebalancing-libraries/StandardProposeLibrary.sol";
import { StandardSettleRebalanceLibrary } from "./rebalancing-libraries/StandardSettleRebalanceLibrary.sol";
import { StandardStartRebalanceLibrary } from "./rebalancing-libraries/StandardStartRebalanceLibrary.sol";


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
    using Bytes32 for bytes32;
    using AddressArrayUtils for address[];

    /* ============ Constants ============ */

    uint256 constant REBALANCING_NATURAL_UNIT = 10 ** 10;
    uint256 constant MIN_AUCTION_TIME_TO_PIVOT = 21600;
    uint256 constant MAX_AUCTION_TIME_TO_PIVOT = 259200;

    /* ============ Enums ============ */

    enum State { Default, Proposal, Rebalance }

    /* ============ State Variables ============ */
    
    // Dependency variables
    address public core;
    address public factory;
    address public vault;

    // Core and Vault instances
    ICore private coreInstance;
    IVault private vaultInstance;
    IWhiteList private componentWhiteListInstance;

    // All rebalancingSetTokens have same natural unit, still allows for
    // small amounts to be issued and attempts to reduce slippage as much
    // as possible.
    uint256 public naturalUnit = REBALANCING_NATURAL_UNIT;
    address public manager;
    RebalancingHelperLibrary.State public rebalanceState;

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
    RebalancingHelperLibrary.AuctionPriceParameters public auctionParameters;
    StandardStartRebalanceLibrary.BiddingParameters public biddingParameters;

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
        uint256 _proposalPeriod,
        uint256 _rebalanceInterval,
        address _componentWhiteList,
        string _name,
        string _symbol
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

        // Require manager address is non-zero
        require(
            _manager != address(0),
            "RebalancingSetToken.constructor: Invalid manager address"
        );

        // Require minimum rebalance interval and proposal period from factory
        IRebalancingSetFactory tokenFactory = IRebalancingSetFactory(_factory);
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
        componentWhiteListInstance = IWhiteList(_componentWhiteList);
        factory = _factory;
        manager = _manager;
        currentSet = _initialSet;
        unitShares = _initialUnitShares;

        proposalPeriod = _proposalPeriod;
        rebalanceInterval = _rebalanceInterval;
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = RebalancingHelperLibrary.State.Default;
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
        // Create ProposeAuctionParameters
        StandardProposeLibrary.ProposeAuctionParameters memory proposeParameters =
            StandardProposeLibrary.ProposeAuctionParameters({
                manager: manager,
                currentSet: currentSet,
                lastRebalanceTimestamp: lastRebalanceTimestamp,
                rebalanceInterval: rebalanceInterval,
                coreInstance: coreInstance,
                rebalanceState: rebalanceState
            });

        // Validate proposal inputs and initialize auctionParameters
        auctionParameters = StandardProposeLibrary.propose(
            _nextSet,
            _auctionLibrary,
            _auctionTimeToPivot,
            _auctionStartPrice,
            _auctionPivotPrice,
            componentWhiteListInstance,
            proposeParameters
        );

        // Update state parameters
        nextSet = _nextSet;
        auctionLibrary = _auctionLibrary;
        proposalStartTime = block.timestamp;
        rebalanceState = RebalancingHelperLibrary.State.Proposal;

        emit RebalanceProposed(
            _nextSet,
            _auctionLibrary,
            proposalStartTime.add(proposalPeriod)
        );
    }

    /*
     * Initiate rebalance for the rebalancing set. Users can now submit bids.
     *
     */
    function startRebalance()
        external
    {
        // Redeem currentSet and define biddingParameters
        biddingParameters = StandardStartRebalanceLibrary.startRebalance(
            currentSet,
            nextSet,
            auctionLibrary,
            proposalStartTime,
            proposalPeriod,
            coreInstance,
            vaultInstance,
            rebalanceState
        );

        // Update state parameters
        startingCurrentSetAmount = biddingParameters.remainingCurrentSets;
        auctionParameters.auctionStartTime = block.timestamp;
        rebalanceState = RebalancingHelperLibrary.State.Rebalance;

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
        unitShares = StandardSettleRebalanceLibrary.settleRebalance(
            totalSupply(),
            biddingParameters.remainingCurrentSets,
            biddingParameters.minimumBid,
            naturalUnit,
            nextSet,
            manager,
            coreInstance,
            vaultInstance,
            rebalanceState
        );

        // Update other state parameters
        currentSet = nextSet;
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = RebalancingHelperLibrary.State.Default;
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
        returns (address[], uint256[], uint256[])
    {
        // Place bid and get back inflow and outflow arrays
        (
            uint256[] memory inflowUnitArray,
            uint256[] memory outflowUnitArray
        ) = StandardPlaceBidLibrary.placeBid(
            _quantity,
            auctionLibrary,
            biddingParameters,
            coreInstance,
            auctionParameters,
            rebalanceState
        );

        // Update remaining Set figure to transact
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
        // Fail auction and either reset to Default state or kill Rebalancing Set Token and enter Drawdown
        // state
        rebalanceState = StandardFailAuctionLibrary.endFailedAuction(
            startingCurrentSetAmount,
            currentSet,
            coreInstance,
            auctionParameters,
            biddingParameters,
            rebalanceState
        );

        // Reset lastRebalanceTimestamp to now
        lastRebalanceTimestamp = block.timestamp;
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
        returns (uint256[], uint256[])
    {
        return RebalancingHelperLibrary.getBidPrice(
            _quantity,
            auctionLibrary,
            biddingParameters, 
            auctionParameters,
            rebalanceState
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
            rebalanceState != RebalancingHelperLibrary.State.Rebalance,
            "RebalancingSetToken.mint: Cannot mint during Rebalance"
        );

        // Check that set is not in Drawdown State
        require(
            rebalanceState != RebalancingHelperLibrary.State.Drawdown,
            "RebalancingSetToken.mint: Cannot mint during Rebalance"
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
            rebalanceState != RebalancingHelperLibrary.State.Rebalance,
            "RebalancingSetToken.burn: Cannot burn during Rebalance"
        );

        // Check to see if state is Drawdown
        if (rebalanceState == RebalancingHelperLibrary.State.Drawdown) {
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
        returns(address[])
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
        returns(uint256[])
    {
        uint256[] memory units = new uint256[](1);
        units[0] = unitShares;
        return units;
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
        returns(uint256)
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
        returns(address[])
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
        returns(uint256[])
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
        returns(uint256[])
    {
        return biddingParameters.combinedNextSetUnits;
    }
}
