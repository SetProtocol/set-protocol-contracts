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
import { ISetFactory } from "./interfaces/ISetFactory.sol";

/**
 * @title SetToken
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set token.
 */


contract RebalancingToken is
    StandardToken,
    DetailedERC20
{
    using SafeMath for uint256;

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
        string _name,
        string _symbol
    )
        public
        DetailedERC20(_name, _symbol, 18)
    {
        // Require day long proposal period
        require(_proposalPeriod > 86400);

        // Require one day between end of rebalance and proposing another rebalance
        require(_rebalanceInterval > 86400);

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
        require(rebalanceState == State.Default);

        // Make sure enough time has passed from last rebalance to start a new proposal
        require(block.timestamp >= lastRebalanceTimestamp.add(rebalanceInterval));

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
        // All current sets must be auctioned off for auction to end
        require(remainingCurrentSets == 0);

        // Must be in Rebalance state to call settlement
        require(rebalanceState == State.Rebalance);

        // Set current set to be rebalancing set
        currentSet = rebalancingSet;

        // Update state parameters
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = State.Default;
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

    /*
     * Get addresses of setToken underlying the Rebalancing Set
     *
     * @return  componentAddresses       Array of currentSet
     */
    function getComponents()
        external
        view
        returns(address[1])
    {
        return [currentSet];
    }

    /*
     * Get unitShares of Rebalancing Set
     *
     * @return  units       Array of component unit
     */
    function getUnits()
        external
        view
        returns(uint256[1])
    {
        return [unitShares];
    }

    /* ============ Transfer Overrides ============ */

    /*
     * ERC20 like transfer function but checks destination is valid
     *
     * @param  _to        The address to send Set to
     * @param  _value     The number of Sets to send
     * @return  bool      True on successful transfer
     */
    function transfer(
        address _to,
        uint256 _value
    )
        public
        returns (bool)
    {
        // Confirm address is not this address
        require(_to != address(this));

        // Use inherited transfer function
        return super.transfer(_to, _value);
    }

    /*
     * ERC20 like transferFrom function but checks destination is valid
     *
     * @param  _from      The address to send Set from
     * @param  _to        The address to send Set to
     * @param  _value     The number of Sets to send
     * @return  bool      True on successful transfer
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    )
        public
        returns (bool)
    {
        // Confirm address is not this address
        require(_to != address(this));

        // Use inherited transferFrom function
        return super.transferFrom(_from, _to, _value);
    }
}
