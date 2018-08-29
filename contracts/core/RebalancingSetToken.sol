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

import { DetailedERC20 } from "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { StandardToken } from "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import { ICore } from "./interfaces/ICore.sol";
import { ISetFactory } from "./interfaces/ISetFactory.sol";
import { Bytes32 } from "../lib/Bytes32.sol";
import { ISetToken } from "./interfaces/ISetToken.sol";
import { AddressArrayUtils } from "../external/cryptofin/AddressArrayUtils.sol";


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
    uint256 public naturalUnit = 1;
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
    address public rebalancingSet;
    address public auctionLibrary;
    uint256 public auctionPriceDivisor;
    uint256 public auctionStartPrice;
    uint256 public curveCoefficient;
    address[] public combinedTokenArray;
    uint256[] public combinedCurrentUnits;
    uint256[] public combinedRebalanceUnits;
    uint256 public remainingCurrentSets;
    uint256 public rebalanceSetSupply;

    /* ============ Events ============ */

    event NewManagerAdded(
        address newManager,
        address oldManager
    );

    event RebalanceProposed(
        address rebalancingSet,
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
     * @param _rebalancingSet               The Set to rebalance into
     * @param _auctionLibrary               The library used to calculate the Dutch Auction price
     * @param _curveCoefficient             The slope (or convexity) of the price curve
     * @param _auctionPriceDivisor          The granularity with which the prices change
     * @param _auctionStartPrice            The price to start the auction at
     */
    function propose(
        address _rebalancingSet,
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
        require(ICore(ISetFactory(factory).core()).validSets(_rebalancingSet));

        // Set auction parameters
        rebalancingSet = _rebalancingSet;
        auctionLibrary = _auctionLibrary;
        curveCoefficient = _curveCoefficient;
        auctionStartPrice = _auctionStartPrice;
        auctionPriceDivisor = _auctionPriceDivisor;

        // Update state parameters
        proposalStartTime = block.timestamp;
        rebalanceState = State.Proposal;

        emit RebalanceProposed(
            _rebalancingSet,
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
        parseUnitArrays();

        // Get core address
        address core = ISetFactory(factory).core();

        // Calculate remainingCurrentSets
        remainingCurrentSets = unitShares.mul(totalSupply_);

        // Redeem current set held by rebalancing token in vault
        ICore(core).redeemInVault(currentSet, remainingCurrentSets);

        // Update state parameters
        auctionStartTime = block.timestamp;
        rebalanceState = State.Rebalance;

        emit RebalanceStarted(currentSet, rebalancingSet);
    }

    /*
     * Initiate settlement for the rebalancing set. Full functionality now returned to
     * set owners.
     *
     */
    function settlement()
        external
    {
        // Must be in Rebalance state to call settlement
        require(rebalanceState == State.Rebalance);

        // Set current set to be rebalancing set
        currentSet = rebalancingSet;

        // Update state parameters
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = State.Default;
    }

    /*
     * Place bid during rebalance auction. Can only be called by Core.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @return address[]              Array of token addresses invovled in rebalancing
     * @return uint256[]              Array of amount of tokens inserted into system in bid
     * @return uint256[]              Array of amount of tokens taken out of system in bid
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

        // Make sure that quantity remaining is
        uint256 filled_quantity;
        if (_quantity < remainingCurrentSets) {
            filled_quantity = _quantity;
        } else {
            filled_quantity = remainingCurrentSets;
        }

        uint256[] memory inflowUnitArray = new uint256[](combinedTokenArray.length);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenArray.length);
        uint256 rebalanceSetsAdded;

        (inflowUnitArray, outflowUnitArray, rebalanceSetsAdded) = getBidPrice(filled_quantity);

        remainingCurrentSets = remainingCurrentSets.sub(filled_quantity);
        rebalanceSetSupply = rebalanceSetSupply.add(rebalanceSetsAdded);
        return (combinedTokenArray, inflowUnitArray, outflowUnitArray);
    }

    /*
     * Get token inflows and outflows required for bid. Also the amount of Rebalancing
     * Sets that would be generated.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @return uint256[]              Array of amount of tokens inserted into system in bid
     * @return uint256[]              Array of amount of tokens taken out of system in bid
     * @return uint256                Amount of rebalancingSets traded into
     */
    function getBidPrice(
        uint256 _quantity
    )
        public
        view
        returns (uint256[], uint256[], uint256)
    {
        // Confirm in Rebalance State
        require(rebalanceState == State.Rebalance);

        // Declare unit arrays in memory
        uint256[] memory inflowUnitArray = new uint256[](combinedTokenArray.length);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenArray.length);

        // Get bid conversion price
        uint256 priceNumerator = 1;
        uint256 priceDivisor = 1;

        for (uint256 i=0; i < combinedTokenArray.length; i++) {
            uint256 rebalanceUnit = combinedRebalanceUnits[i];
            uint256 currentUnit = combinedCurrentUnits[i];

            // If rebalance greater than currentUnit*price token inflow, else token outflow
            if (rebalanceUnit > currentUnit.mul(priceNumerator).div(priceDivisor)) {
                inflowUnitArray[i] = _quantity.mul(rebalanceUnit.sub(
                    priceNumerator.mul(currentUnit).div(priceDivisor)
                )).div(10**18);
                outflowUnitArray[i] = 0;
            } else {
                outflowUnitArray[i] = _quantity.mul(
                    priceNumerator.mul(currentUnit).div(priceDivisor).sub(rebalanceUnit).div(10**18)
                );
                inflowUnitArray[i] = 0;
            }
        }
        // Calculate amount of currentSets traded for rebalancingSets
        uint256 rebalanceSetsAdded = _quantity.mul(priceDivisor).div(priceNumerator);
        return (inflowUnitArray, outflowUnitArray, rebalanceSetsAdded);
    }

    /*
     * Mint set token for given address.
     * Can only be called by authorized contracts.
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
     * Get combinedRebalanceUnits of Rebalancing Set
     *
     * @return  combinedRebalanceUnits
     */
    function getCombinedRebalanceUnits()
        external
        view
        returns(uint256[])
    {
        return combinedRebalanceUnits;
    }

    /* ============ Internal Functions ============ */
    function parseUnitArrays()
        internal
    {
        // Create interfaces for interacting with sets
        ISetToken currentSetInterface = ISetToken(currentSet);
        ISetToken rebalancingSetInterface = ISetToken(rebalancingSet);

        // Create combined token Array
        address[] memory oldComponents = currentSetInterface.getComponents();
        address[] memory newComponents = rebalancingSetInterface.getComponents();
        combinedTokenArray = oldComponents.union(newComponents);

        // Get naturalUnit of both sets
        uint256 currentSetNaturalUnit = currentSetInterface.naturalUnit();
        uint256 rebalancingSetNaturalUnit = rebalancingSetInterface.naturalUnit();

        // Get units arrays for both sets
        uint256[] memory currentSetUnits = currentSetInterface.getUnits();
        uint256[] memory rebalancingSetUnits = rebalancingSetInterface.getUnits();

        for (uint256 i=0; i < combinedTokenArray.length; i++) {
            // Check if component in arrays and get index if it is
            (uint256 indexCurrent, bool isInCurrent) = oldComponents.indexOf(combinedTokenArray[i]);
            (uint256 indexRebalance, bool isInRebalance) = newComponents.indexOf(combinedTokenArray[i]);

            // Compute and push unit amounts of token in currentSet, push 0 if not in set
            if (isInCurrent) {
                combinedCurrentUnits.push(
                    computeUnits(currentSetUnits[indexCurrent], currentSetNaturalUnit)
                );
            } else {
                combinedCurrentUnits.push(uint256(0));
            }

            // Compute and push unit amounts of token in rebalancingSet, push 0 if not in set
            if (isInRebalance) {
                combinedRebalanceUnits.push(
                    computeUnits(rebalancingSetUnits[indexRebalance], rebalancingSetNaturalUnit)
                );
            } else {
                combinedRebalanceUnits.push(uint256(0));
            }
        }
    }

    /**
     * Function to calculate the transfer value of a component given 1 Set
     *
     * @param _unit             The units of the component token
     * @param _naturalUnit      The natural unit of the Set token
     */
    function computeUnits(
        uint256 _unit,
        uint256 _naturalUnit
    )
        internal
        returns (uint256)
    {
        uint256 coefficient = uint256(10) ** uint256(18);
        return coefficient.mul(_unit).div(_naturalUnit);
    }
}
