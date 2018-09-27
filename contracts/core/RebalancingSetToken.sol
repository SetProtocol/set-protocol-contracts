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

pragma solidity 0.4.24;

import { AddressArrayUtils } from "cryptofin-solidity/contracts/array-utils/AddressArrayUtils.sol";
import { DetailedERC20 } from "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import { Math } from "zeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { StandardToken } from "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import { Bytes32 } from "../lib/Bytes32.sol";
import { CommonMath } from "../lib/CommonMath.sol";
import { ERC20Wrapper } from "../lib/ERC20Wrapper.sol";
import { ICore } from "./interfaces/ICore.sol";
import { ISetFactory } from "./interfaces/ISetFactory.sol";
import { ISetToken } from "./interfaces/ISetToken.sol";
import { IVault } from "./interfaces/IVault.sol";


/**
 * @title SetToken
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set token.
 */
contract RebalancingSetToken is
    StandardToken,
    DetailedERC20
{
    using SafeMath for uint256;
    using Bytes32 for bytes32;
    using AddressArrayUtils for address[];

    /* ============ Enums ============ */

    enum State { Default, Proposal, Rebalance }

    /* ============ State Variables ============ */

    address public factory;
    // All rebalancingSetTokens have same natural unit, still allows for
    // small amounts to be issued and attempts to reduce slippage as much
    // as possible.
    uint256 public naturalUnit = 10**10;
    address public manager;
    State public rebalanceState;

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
    uint256 public auctionStartTime;
    address public nextSet;
    address public auctionLibrary;
    uint256 public auctionPriceDivisor;
    uint256 public auctionStartPrice;
    uint256 public minimumBid;
    uint256 public curveCoefficient;
    address[] public combinedTokenArray;
    uint256[] public combinedCurrentUnits;
    uint256[] public combinedNextSetUnits;
    uint256 public remainingCurrentSets;
    uint256 public rebalanceSetSupply;

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
     *
     * @param _factory                      The factory used to create the Rebalancing Set
     * @param _manager                      The manager of the Rebalancing Set
     * @param _initialSet                   The initial set that collateralizes the Rebalancing set
     * @param _initialUnitShares            How much of a Set (in gWei) equals one share
     * @param _proposalPeriod               Amount of time for users to inspect a rebalance proposal
     * @param _rebalanceInterval            The minimum amount of time between rebalances
     * @param _name                         The Rebalancing Set's name
     * @param _symbol                       The Rebalancing Set's symbol
     */

    constructor(
        address _factory,
        address _manager,
        address _initialSet,
        uint256 _initialUnitShares,
        uint256 _proposalPeriod,
        uint256 _rebalanceInterval,
        bytes32 _name,
        bytes32 _symbol
    )
        public
        DetailedERC20(
            _name.bytes32ToString(),
            _symbol.bytes32ToString(),
            18
        )
    {
        // Require day long proposal period
        require(_proposalPeriod >= 86400);

        // Require one day between end of rebalance and proposing another rebalance
        require(_rebalanceInterval >= 86400);

        factory = _factory;
        manager = _manager;
        currentSet = _initialSet;
        unitShares = _initialUnitShares;

        proposalPeriod = _proposalPeriod;
        rebalanceInterval = _rebalanceInterval;
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = State.Default;
    }

    /* ============ Public Functions ============ */

    /**
     * Function used to set the terms of the next rebalance and start the proposal period
     *
     *
     * @param _nextSet                      The Set to rebalance into
     * @param _auctionLibrary               The library used to calculate the Dutch Auction price
     * @param _curveCoefficient             The slope (or convexity) of the price curve
     * @param _auctionPriceDivisor          The granularity with which the prices change
     * @param _auctionStartPrice            The price to start the auction at
     */
    function propose(
        address _nextSet,
        address _auctionLibrary,
        uint256 _curveCoefficient,
        uint256 _auctionStartPrice,
        uint256 _auctionPriceDivisor
    )
        external
    {

        // Make sure it is manager that is proposing the rebalance
        require(msg.sender == manager);

        // New proposal cannot be made during a rebalance period
        require(rebalanceState != State.Rebalance);

        // Make sure enough time has passed from last rebalance to start a new proposal
        require(block.timestamp >= lastRebalanceTimestamp.add(rebalanceInterval));

        // Check that new proposed Set is valid Set created by Core
        require(ICore(ISetFactory(factory).core()).validSets(_nextSet));

        // Check that the propoosed set natural unit is a multiple of current set natural unit, or vice versa.
        // Done to make sure that when calculating token units there will are no rounding errors.
        uint256 currentNaturalUnit = ISetToken(currentSet).naturalUnit();
        uint256 nextSetNaturalUnit = ISetToken(_nextSet).naturalUnit();
        require(
            Math.max256(currentNaturalUnit, nextSetNaturalUnit) %
            Math.min256(currentNaturalUnit, nextSetNaturalUnit) == 0
        );

        // Set auction parameters
        nextSet = _nextSet;
        auctionLibrary = _auctionLibrary;
        curveCoefficient = _curveCoefficient;
        auctionStartPrice = _auctionStartPrice;
        auctionPriceDivisor = _auctionPriceDivisor;

        // Update state parameters
        proposalStartTime = block.timestamp;
        rebalanceState = State.Proposal;

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
    function rebalance()
        external
    {
        // Must be in "Proposal" state before going into "Rebalance" state
        require(rebalanceState == State.Proposal);

        // Be sure the full proposal period has elapsed
        require(block.timestamp >= proposalStartTime.add(proposalPeriod));

        // Create token arrays needed for auction
        auctionSetUp();

        // Get core address from factory
        address core = ISetFactory(factory).core();

        // Calculate remainingCurrentSets
        remainingCurrentSets = unitShares.mul(totalSupply_).div(naturalUnit);

        // Redeem current set held by rebalancing token in vault
        ICore(core).redeemInVault(currentSet, remainingCurrentSets);

        // Update state parameters
        auctionStartTime = block.timestamp;
        rebalanceState = State.Rebalance;

        emit RebalanceStarted(currentSet, nextSet);
    }

    /*
     * Initiate settlement for the rebalancing set. Full functionality now returned to
     * set owners.
     *
     */
    function settleRebalance()
        external
    {
        // Must be in Rebalance state to call settlement
        require(rebalanceState == State.Rebalance);

        // Make sure all currentSets have been rebalanced
        require(remainingCurrentSets < minimumBid);

        // Creating pointer to Core to Issue next set and Deposit into vault
        ICore core = ICore(ISetFactory(factory).core());

        // Issue nextSet to RebalancingSetToken
        uint256 issueAmount;
        (issueAmount, unitShares) = calculateNextSetIssueQuantity();
        core.issue(
            nextSet,
            issueAmount
        );

        // Ensure transfer proxy has enough spender allowance to move issued nextSet to vault
        ERC20Wrapper.ensureAllowance(
            nextSet,
            this,
            core.transferProxy(),
            issueAmount
        );

        // Deposit newly created nextSets in Vault
        core.deposit(
            nextSet,
            issueAmount
        );

        // Set current set to be rebalancing set
        currentSet = nextSet;

        // Update state parameters
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = State.Default;
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
        // Make sure sender is Core
        require(msg.sender == ISetFactory(factory).core());

        // Confirm in Rebalance State
        require(rebalanceState == State.Rebalance);

        // Make sure that bid amount is multiple of minimum bid amount
        require(_quantity % minimumBid == 0);

        // Make sure that bid Amount is less than remainingCurrentSets
        require(_quantity <= remainingCurrentSets);

        // Calculate token inflow and outflow arrays
        uint256[] memory inflowUnitArray = new uint256[](combinedTokenArray.length);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenArray.length);

        (inflowUnitArray, outflowUnitArray) = getBidPrice(_quantity);

        remainingCurrentSets = remainingCurrentSets.sub(_quantity);
        return (combinedTokenArray, inflowUnitArray, outflowUnitArray);
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
        // Confirm in Rebalance State
        require(rebalanceState == State.Rebalance);

        // Declare unit arrays in memory
        uint256[] memory inflowUnitArray = new uint256[](combinedTokenArray.length);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenArray.length);

        // Get bid conversion price, currently static placeholder for calling auctionlibrary
        uint256 priceNumerator = 1374;

        // Normalized quantity amount
        uint256 unitsMultiplier = _quantity.div(minimumBid).mul(auctionPriceDivisor);

        for (uint256 i = 0; i < combinedTokenArray.length; i++) {
            uint256 nextUnit = combinedNextSetUnits[i];
            uint256 currentUnit = combinedCurrentUnits[i];

            /*
             * Below is a mathematically simplified formula for calculating token inflows and
             * outflows, the following is it's derivation:
             * token_flow = (bidQuantity/price)*(nextUnit - price*currentUnit)
             *
             * Where,
             * 1) price = (priceNumerator/auctionPriceDivisor),
             * 2) nextUnit and currentUnit are the amount of component i needed for a
             * standardAmount of sets to be rebalanced where one standardAmount =
             * max(natural unit nextSet, natural unit currentSet), and
             * 3) bidQuantity is a normalized amount in terms of the standardAmount used
             * to calculate nextUnit and currentUnit. This is represented by the unitsMultiplier
             * variable.
             *
             * Given these definitions we can derive the below formula as follows:
             * token_flow = (unitsMultiplier/(priceNumerator/auctionPriceDivisor))*
             * (nextUnit - (priceNumerator/auctionPriceDivisor)*currentUnit)
             *
             * We can then multiply this equation by (auctionPriceDivisor/auctionPriceDivisor)
             * which simplifies the above equation to:
             *
             * (unitsMultiplier/priceNumerator)* (nextUnit*auctionPriceDivisor - currentUnit*priceNumerator)
             *
             * This is the equation seen below, but since unsigned integers are used we must check to see if
             * nextUnit*auctionPriceDivisor > currentUnit*priceNumerator, otherwise those two terms must be
             * flipped in the equation.
             */
            if (nextUnit.mul(auctionPriceDivisor) > currentUnit.mul(priceNumerator)) {
                inflowUnitArray[i] = unitsMultiplier.mul(
                    nextUnit.mul(auctionPriceDivisor).sub(currentUnit.mul(priceNumerator))
                ).div(priceNumerator);

                // Set outflow amount to 0 for component i
                outflowUnitArray[i] = 0;
            } else {
                // Calculate outflow amount
                outflowUnitArray[i] = unitsMultiplier.mul(
                    currentUnit.mul(priceNumerator).sub(nextUnit.mul(auctionPriceDivisor))
                ).div(priceNumerator);

                // Set inflow amount to 0 for component i
                inflowUnitArray[i] = 0;
            }
        }
        return (inflowUnitArray, outflowUnitArray);
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
        require(msg.sender == ISetFactory(factory).core());

        // Check that set is not in Rebalancing State
        require(rebalanceState != State.Rebalance);

        // Update token balance of the issuer
        balances[_issuer] = balances[_issuer].add(_quantity);

        // Update the total supply of the set token
        totalSupply_ = totalSupply_.add(_quantity);

        // Emit a transfer log with from address being 0 to indicate mint
        emit Transfer(address(0), _issuer, _quantity);
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
        // Check that function caller is Core
        require(msg.sender == ISetFactory(factory).core());

        // Check that set is not in Rebalancing State
        require(rebalanceState != State.Rebalance);

        // Require user has tokens to burn
        require(balances[_from] >= _quantity);

        // Update token balance of user
        balances[_from] = balances[_from].sub(_quantity);

        // Update total supply of Set Token
        totalSupply_ = totalSupply_.sub(_quantity);

        // Emit a transfer log with to address being 0 indicating burn
        emit Transfer(_from, address(0), _quantity);
    }

    /*
     * Set new manager address
     *
     * @param  _newManager       The address of the redeeming account
     */
    function setManager(
        address _newManager
    )
        external
    {
        require(msg.sender == manager);

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
     * Get combinedTokenArray of Rebalancing Set
     *
     * @return  combinedTokenArray
     */
    function getCombinedTokenArrayLength()
        external
        view
        returns(uint256)
    {
        return combinedTokenArray.length;
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
        return combinedTokenArray;
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
        return combinedCurrentUnits;
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
        return combinedNextSetUnits;
    }

    /* ============ Internal Functions ============ */
    /**
     * Create array that represents all components in currentSet and nextSet.
     * Calcualate unit difference between both sets relative to the largest natural
     * unit of the two sets.
     */
    function auctionSetUp()
        private
    {
        // Create interfaces for interacting with sets
        ISetToken currentSetInstance = ISetToken(currentSet);
        ISetToken nextSetInstance = ISetToken(nextSet);

        // Create combined token Array
        address[] memory oldComponents = currentSetInstance.getComponents();
        address[] memory newComponents = nextSetInstance.getComponents();
        combinedTokenArray = oldComponents.union(newComponents);

        // Get naturalUnit of both sets
        uint256 currentSetNaturalUnit = currentSetInstance.naturalUnit();
        uint256 nextSetNaturalUnit = nextSetInstance.naturalUnit();

        // Get units arrays for both sets
        uint256[] memory currentSetUnits = currentSetInstance.getUnits();
        uint256[] memory nextSetUnits = nextSetInstance.getUnits();

        // Create memory version of combinedNextSetUnits and combinedCurrentUnits to only make one
        // call to storage once arrays have been created
        uint256[] memory memoryCombinedCurrentUnits = new uint256[](combinedTokenArray.length);
        uint256[] memory memoryCombinedNextSetUnits = new uint256[](combinedTokenArray.length);

        minimumBid = Math.max256(
            currentSetNaturalUnit.mul(auctionPriceDivisor),
            nextSetNaturalUnit.mul(auctionPriceDivisor)
        );

        for (uint256 i=0; i < combinedTokenArray.length; i++) {
            // Check if component in arrays and get index if it is
            (uint256 indexCurrent, bool isInCurrent) = oldComponents.indexOf(combinedTokenArray[i]);
            (uint256 indexRebalance, bool isInNext) = newComponents.indexOf(combinedTokenArray[i]);

            // Compute and push unit amounts of token in currentSet, push 0 if not in set
            if (isInCurrent) {
                memoryCombinedCurrentUnits[i] = computeUnits(currentSetUnits[indexCurrent], currentSetNaturalUnit);
            } else {
                memoryCombinedCurrentUnits[i] = uint256(0);
            }

            // Compute and push unit amounts of token in nextSet, push 0 if not in set
            if (isInNext) {
                memoryCombinedNextSetUnits[i] = computeUnits(nextSetUnits[indexRebalance], nextSetNaturalUnit);
            } else {
                memoryCombinedNextSetUnits[i] = uint256(0);
            }
        }

        // Set combinedCurrentUnits and combinedNextSetUnits to memory versions of arrays
        combinedCurrentUnits = memoryCombinedCurrentUnits;
        combinedNextSetUnits = memoryCombinedNextSetUnits;
    }

    /**
     * Calculate the amount of nextSets to issue by using the component amounts in the
     * vault, unitShares following from this calculation.
     * @return uint256              Amount of nextSets to issue
     * @return uint256              New unitShares for the rebalancingSetToken
     */
    function calculateNextSetIssueQuantity()
        private
        returns (uint256, uint256)
    {
        // Collect data necessary to compute issueAmounts
        uint256 nextNaturalUnit = ISetToken(nextSet).naturalUnit();
        address[] memory nextComponents = ISetToken(nextSet).getComponents();
        uint256[] memory nextUnits = ISetToken(nextSet).getUnits();
        uint256 maxIssueAmount = CommonMath.maxUInt256();

        // Set up vault interface
        address vaultAddress = ICore(ISetFactory(factory).core()).vault();
        IVault vault = IVault(vaultAddress);

        for (uint256 i = 0; i < nextComponents.length; i++) {
            // Get amount of components in vault owned by rebalancingSetToken
            uint256 componentAmount = vault.getOwnerBalance(
                nextComponents[i],
                this
            );

            // Calculate amount of Sets that can be issued from those components, if less than amount for other
            // components then set that as maxIssueAmount
            uint256 componentIssueAmount = componentAmount.div(nextUnits[i]).mul(nextNaturalUnit);
            if (componentIssueAmount < maxIssueAmount) {
                maxIssueAmount = componentIssueAmount;
            }
        }

        // Calculate the amount of naturalUnits worth of rebalancingSetToken outstanding
        uint256 naturalUnitsOutstanding = totalSupply_.div(naturalUnit);

        // Issue amount of Sets that is closest multiple of nextNaturalUnit to the maxIssueAmount
        // Since the initial division will round down to the nearest whole number when we multiply
        // by that same number we will return the closest multiple less than the maxIssueAmount
        uint256 issueAmount = maxIssueAmount.div(nextNaturalUnit).mul(nextNaturalUnit);

        // Divide final issueAmount by naturalUnitsOutstanding to get newUnitShares
        uint256 newUnitShares = issueAmount.div(naturalUnitsOutstanding);
        return (issueAmount, newUnitShares);
    }


    /**
     * Function to calculate the transfer value of a component given 1 Set
     *
     * @param _unit             The units of the component token
     * @param _naturalUnit      The natural unit of the Set token
     * @return uint256          Amount of tokens per minimumBid/auctionPriceDivisor
     */
    function computeUnits(
        uint256 _unit,
        uint256 _naturalUnit
    )
        private
        returns (uint256)
    {
        return minimumBid.mul(_unit).div(_naturalUnit).div(auctionPriceDivisor);
    }
}
