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

import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { ERC20 } from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import { AddressArrayUtils } from "../lib/AddressArrayUtils.sol";
import { Bytes32 } from "../lib/Bytes32.sol";
import { CommonMath } from "../lib/CommonMath.sol";
import { ERC20Wrapper } from "../lib/ERC20Wrapper.sol";
import { IAuctionPriceCurve } from "./lib/auction-price-libraries/IAuctionPriceCurve.sol";
import { ICore } from "./interfaces/ICore.sol";
import { IRebalancingSetFactory } from "./interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "./interfaces/ISetToken.sol";
import { IVault } from "./interfaces/IVault.sol";


/**
 * @title SetToken
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

    /* ============ Enums ============ */

    enum State { Default, Proposal, Rebalance }

    /* ============ State Variables ============ */

    address public factory;
    // All rebalancingSetTokens have same natural unit, still allows for
    // small amounts to be issued and attempts to reduce slippage as much
    // as possible.
    uint256 constant public naturalUnit = 10 ** 10;
    address public manager;
    State public rebalanceState;

    // State updated after every rebalance
    address public currentSet;
    uint256 public unitShares;
    uint256 public lastRebalanceTimestamp;

    // Fee setting, values in basis points
    uint256 public entranceFee;
    uint256 public rebalanceFee;

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
     * @param _entranceFee               Entrance fee as a percentage of initialSet when minting the Rebalancing Set
     * @param _rebalanceFee              Rebalance fee as a percentage of the nextSet when rebalance is settled
     * @param _name                      The bytes32 encoded name of the new RebalancingSetToken
     * @param _symbol                    The bytes32 encoded symbol of the new RebalancingSetToken
     */

    constructor(
        address _factory,
        address _manager,
        address _initialSet,
        uint256 _initialUnitShares,
        uint256 _proposalPeriod,
        uint256 _rebalanceInterval,
        uint256 _entranceFee,
        uint256 _rebalanceFee,
        bytes32 _name,
        bytes32 _symbol
    )
        public
        ERC20Detailed(
            _name.bytes32ToString(),
            _symbol.bytes32ToString(),
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

        factory = _factory;
        manager = _manager;
        entranceFee = _entranceFee;
        rebalanceFee = _rebalanceFee;
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
     * @param _auctionStartPrice            The price to start the auction at
     * @param _auctionPriceDivisor          The granularity with which the prices change
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
        ICore core = ICore(IRebalancingSetFactory(factory).core());

        // Make sure it is manager that is proposing the rebalance
        require(
            msg.sender == manager,
            "RebalancingSetToken.propose: Sender must be manager"
        );

        // New proposal cannot be made during a rebalance period
        require(
            rebalanceState != State.Rebalance,
            "RebalancingSetToken.propose: State must not be Rebalance"
        );

        // Make sure enough time has passed from last rebalance to start a new proposal
        require(
            block.timestamp >= lastRebalanceTimestamp.add(rebalanceInterval),
            "RebalancingSetToken.propose: Rebalance interval not elapsed"
        );

        // Check that new proposed Set is valid Set created by Core
        require(
            core.validSets(_nextSet),
            "RebalancingSetToken.propose: Invalid or disabled proposed SetToken address"
        );

        // Check that the auction library is a valid priceLibrary tracked by Core
        require(
            core.validPriceLibraries(_auctionLibrary),
            "RebalancingSetToken.propose: Invalid or disabled PriceLibrary address"
        );

        // Assert price divisor is non-zero, ensuring a positive slope
        require(
            _auctionPriceDivisor > 0,
            "RebalancingSetToken.propose: Price divisor must be positive"
        );

        // Assert curve coefficient > 0, ensuring a positive slope
        require(
            _curveCoefficient > 0,
            "RebalancingSetToken.propose: Coefficient curve must be positive"
        );

        // Check that the propoosed set natural unit is a multiple of current set natural unit, or vice versa.
        // Done to make sure that when calculating token units there will are no rounding errors.
        uint256 currentNaturalUnit = ISetToken(currentSet).naturalUnit();
        uint256 nextSetNaturalUnit = ISetToken(_nextSet).naturalUnit();
        require(
            Math.max(currentNaturalUnit, nextSetNaturalUnit) %
            Math.min(currentNaturalUnit, nextSetNaturalUnit) == 0,
            "RebalancingSetToken.propose: Invalid proposed Set natural unit"
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
    function startRebalance()
        external
    {
        // Must be in "Proposal" state before going into "Rebalance" state
        require(
            rebalanceState == State.Proposal,
            "RebalancingSetToken.rebalance: State must be Proposal"
        );

        // Be sure the full proposal period has elapsed
        require(
            block.timestamp >= proposalStartTime.add(proposalPeriod),
            "RebalancingSetToken.rebalance: Proposal period not elapsed"
        );

        // Create token arrays needed for auction
        auctionSetUp();

        // Get currentSet natural unit
        uint256 currentSetNaturalUnit = ISetToken(currentSet).naturalUnit();

        // Get core address from factory and create core interface
        ICore core = ICore(IRebalancingSetFactory(factory).core());

        // Get remainingCurrentSets and make it divisible by currentSet natural unit
        remainingCurrentSets = IVault(core.vault()).getOwnerBalance(
            currentSet,
            this
        );
        remainingCurrentSets = remainingCurrentSets.div(currentSetNaturalUnit).mul(currentSetNaturalUnit);

        // Redeem current set held by rebalancing token in vault
        core.redeemInVault(currentSet, remainingCurrentSets);

        // Update state parameters
        auctionStartTime = block.timestamp;
        rebalanceState = State.Rebalance;

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
        // Must be in Rebalance state to call settlement
        require(
            rebalanceState == State.Rebalance,
            "RebalancingSetToken.settleRebalance: State must be Rebalance"
        );

        // Make sure all currentSets have been rebalanced
        require(
            remainingCurrentSets < minimumBid,
            "RebalancingSetToken.settleRebalance: Rebalance not completed"
        );

        // Creating pointer to Core to Issue next set and Deposit into vault and to nextSet token
        // to transfer fees
        ICore core = ICore(IRebalancingSetFactory(factory).core());
        ISetToken nextSetInstance = ISetToken(nextSet);
        address protocolAddress = core.protocolAddress();

        // Issue nextSet to RebalancingSetToken
        uint256 issueAmount;
        uint256 totalFees;
        uint256 managerFee;
        uint256 protocolFee;
        (issueAmount, unitShares, totalFees) = calculateNextSetIssueQuantity();

        // Issue nextSet to RebalancingSetToken
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

        // Deposit newly created nextSets in Vault net of fees
        core.deposit(
            nextSet,
            issueAmount.sub(totalFees)
        );

        // If fees greater than 0, distribute
        if (totalFees > 0) {
            // Calculate fee split between protocol and manager
            (managerFee, protocolFee) = calculateFeeSplit(totalFees);

            // Transfer fees to manager
            nextSetInstance.transfer(
                manager,
                managerFee
            );

            // If necessary, transfer fees to protocolAddress
            if (protocolFee > 0) {
                nextSetInstance.transfer(
                    protocolAddress,
                    protocolFee
                );                
            }
        }

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
        require(
            msg.sender == IRebalancingSetFactory(factory).core(),
            "RebalancingSetToken.placeBid: Sender must be core"
        );

        // Confirm in Rebalance State
        require(
            rebalanceState == State.Rebalance,
            "RebalancingSetToken.placeBid: State must be Rebalance"
        );

        // Make sure that bid amount is multiple of minimum bid amount
        require(
            _quantity % minimumBid == 0,
            "RebalancingSetToken.placeBid: Must bid multiple of minimum bid"
        );

        // Make sure that bid Amount is less than remainingCurrentSets
        require(
            _quantity <= remainingCurrentSets,
            "RebalancingSetToken.placeBid: Bid exceeds remaining current sets"
        );

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
        require(
            rebalanceState == State.Rebalance,
            "RebalancingSetToken.getBidPrice: State must be Rebalance"
        );

        // Declare unit arrays in memory
        uint256[] memory inflowUnitArray = new uint256[](combinedTokenArray.length);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenArray.length);

        // Get bid conversion price, currently static placeholder for calling auctionlibrary
        uint256 priceNumerator = IAuctionPriceCurve(auctionLibrary).getCurrentPrice(
            auctionStartTime,
            auctionStartPrice,
            curveCoefficient
        );

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

                // Set outflow amount to 0 for component i, since tokens need to be injected in rebalance
                outflowUnitArray[i] = 0;
            } else {
                // Calculate outflow amount
                outflowUnitArray[i] = unitsMultiplier.mul(
                    currentUnit.mul(priceNumerator).sub(nextUnit.mul(auctionPriceDivisor))
                ).div(priceNumerator);

                // Set inflow amount to 0 for component i, since tokens need to be returned in rebalance
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
        require(
            msg.sender == IRebalancingSetFactory(factory).core(),
            "RebalancingSetToken.mint: Sender must be core"
        );

        // Check that set is not in Rebalancing State
        require(
            rebalanceState != State.Rebalance,
            "RebalancingSetToken.mint: Cannot mint during Rebalance"
        );

        uint256 issuerTotal;
        uint256 managerFee;
        uint256 protocolFee;

        if (entranceFee > 0) {
            // Calculate total fees and remaining issuer total
            uint256 totalFees = calculateTotalFees(_quantity, entranceFee);
            issuerTotal = _quantity.sub(totalFees);

            (managerFee, protocolFee) = calculateFeeSplit(totalFees);

            _mint(manager, managerFee);
        } else {
            issuerTotal = _quantity;
        }

        // Update token balance of the manager
        _mint(_issuer, issuerTotal);

        if (protocolFee > 0) {
            // Get protocol address and add fees to protocol and issuer
            address protocolAddress = ICore(IRebalancingSetFactory(factory).core()).protocolAddress();
            _mint(protocolAddress, protocolFee);
        }
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
        require(
            msg.sender == IRebalancingSetFactory(factory).core(),
            "RebalancingSetToken.burn: Sender must be core"
        );

        // Check that set is not in Rebalancing State
        require(
            rebalanceState != State.Rebalance,
            "RebalancingSetToken.burn: Cannot burn during Rebalance"
        );

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
        public
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

        minimumBid = Math.max(
            currentSetNaturalUnit.mul(auctionPriceDivisor),
            nextSetNaturalUnit.mul(auctionPriceDivisor)
        );

        for (uint256 i = 0; i < combinedTokenArray.length; i++) {
            // Check if component in arrays and get index if it is
            (uint256 indexCurrent, bool isInCurrent) = oldComponents.indexOf(combinedTokenArray[i]);
            (uint256 indexRebalance, bool isInNext) = newComponents.indexOf(combinedTokenArray[i]);

            // Compute and push unit amounts of token in currentSet, push 0 if not in set
            if (isInCurrent) {
                memoryCombinedCurrentUnits[i] = computeTransferValue(currentSetUnits[indexCurrent], currentSetNaturalUnit);
            } else {
                memoryCombinedCurrentUnits[i] = uint256(0);
            }

            // Compute and push unit amounts of token in nextSet, push 0 if not in set
            if (isInNext) {
                memoryCombinedNextSetUnits[i] = computeTransferValue(nextSetUnits[indexRebalance], nextSetNaturalUnit);
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
     *
     * @return  uint256    Amount of nextSets to issue
     * @return  uint256    New unitShares for the rebalancingSetToken
     * @return  uint256    Total fees of the rebalance
     */
    function calculateNextSetIssueQuantity()
        private
        returns (uint256, uint256, uint256)
    {
        // Collect data necessary to compute issueAmounts
        uint256 nextNaturalUnit = ISetToken(nextSet).naturalUnit();
        address[] memory nextComponents = ISetToken(nextSet).getComponents();
        uint256[] memory nextUnits = ISetToken(nextSet).getUnits();
        uint256 maxIssueAmount = CommonMath.maxUInt256();

        // Set up vault interface
        address vaultAddress = ICore(IRebalancingSetFactory(factory).core()).vault();
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
        uint256 naturalUnitsOutstanding = totalSupply().div(naturalUnit);

        // Issue amount of Sets that is closest multiple of nextNaturalUnit to the maxIssueAmount
        // Since the initial division will round down to the nearest whole number when we multiply
        // by that same number we will return the closest multiple less than the maxIssueAmount
        uint256 issueAmount = maxIssueAmount.div(nextNaturalUnit).mul(nextNaturalUnit);
        uint256 totalFees = calculateTotalFees(issueAmount, rebalanceFee);

        // Divide final issueAmount by naturalUnitsOutstanding to get newUnitShares
        uint256 newUnitShares = issueAmount.sub(totalFees).div(naturalUnitsOutstanding);
        return (issueAmount, newUnitShares, totalFees);
    }


    /**
     * Function to calculate the transfer value of a component given 1 Set
     *
     * @param   _unit           Units of the component token
     * @param   _naturalUnit    Natural unit of the Set token
     * @return  uint256         Amount of tokens per minimumBid/auctionPriceDivisor
     */
    function computeTransferValue(
        uint256 _unit,
        uint256 _naturalUnit
    )
        private
        returns (uint256)
    {
        return minimumBid.mul(_unit).div(_naturalUnit).div(auctionPriceDivisor);
    }

    /**
     * Function to calculate the total amount of fees owed
     *
     * @param   _quantity       Amount of Sets to take fees from
     * @param   _managerFee     Fee, in basis points, to be taken from base amount of Sets
     * @return  uint256         Amount of Set to be taken for fees
     */
    function calculateTotalFees(
        uint256 _quantity,
        uint256 _managerFee
    )
        private
        returns (uint256)
    {
        return _quantity.mul(_managerFee).div(10000);
    }

    /**
     * Function to calculate splitting fees between manager and protocol
     *
     * @param   _totalFees    Total amount of fees to split up
     * @return  uint256      Amount of tokens to send to manager
     * @return  uint256      Amount of tokens to send to protocol
     */
    function calculateFeeSplit(
        uint256 _totalFees
    )
        private
        returns (uint256, uint256)
    {
        uint256 protocolFee = _totalFees.mul(ICore(IRebalancingSetFactory(factory).core()).protocolFee())
            .div(10000);
        uint256 managerFee = _totalFees.sub(protocolFee);

        return (managerFee, protocolFee);
    }
}
