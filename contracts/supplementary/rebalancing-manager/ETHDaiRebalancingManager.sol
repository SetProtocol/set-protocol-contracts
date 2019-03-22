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

pragma solidity 0.5.4;
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "../../lib/AddressArrayUtils.sol";
import { ICore } from "../../core/interfaces/ICore.sol";
import { IMedian } from "../../external/DappHub/interfaces/IMedian.sol";
import { IRebalancingSetToken } from "../../core/interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../../core/interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../core/lib/RebalancingLibrary.sol";
import { ManagerLibrary } from "./lib/ManagerLibrary.sol";

/**
 * @title ETHDaiRebalancingManager
 * @author Set Protocol
 *
 * Contract used to manage a ETHDai Rebalancing Set Token
 */
contract ETHDaiRebalancingManager {

    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Constants ============ */

    uint256 constant PRICE_PRECISION = 100;
    uint256 constant AUCTION_LIB_PRICE_DIVISOR = 1000;
    
    // Equal to $1 
    uint256 constant DAI_PRICE = 10 ** 18;
    uint256 constant DAI_DECIMALS = 18;
    uint256 constant ETH_DECIMALS = 18;

    /* ============ State Variables ============ */

    address public daiAddress;
    address public ethAddress;
    address public setTokenFactory;

    address public ethPriceFeed;

    address public coreAddress;

    address public auctionLibrary;
    uint256 public auctionTimeToPivot;
    uint256 public daiMultiplier;
    uint256 public ethMultiplier;

    uint256 public maximumLowerThreshold;
    uint256 public minimumUpperThreshold;

    /* ============ Events ============ */

    event LogManagerProposal(
        uint256 ethPrice
    );

    /* ============ Constructor ============ */

    /*
     * Rebalancing Token Manager constructor.
     * The multipliers are used to calculate the allocation of the set token. Allocation
     * is determined by a simple equation:
     *      daiAllocation = daiMultiplier/(daiMultiplier + ethMultiplier)
     * Furthermore the total USD cost of any new Set Token allocation can be found from the
     * following equation:
     *      SetTokenUSDPrice = (daiMultiplier + ethMultiplier)*max(ethPrice, daiPrice)
     *
     * @param  _coreAddress             The address of the Core contract
     * @param  _ethPriceFeedAddress     The address of ETH medianizer
     * @param  _daiAddress              The address of the Dai contract
     * @param  _ethAddress              The address of the wrapped ETH contract
     * @param  _setTokenFactory         The address of the SetTokenFactory
     * @param  _auctionLibrary          The address of auction price curve to use in rebalance
     * @param  _auctionTimeToPivot      The amount of time until pivot reached in rebalance
     * @param  _multipliers             Token multipliers used to determine allocation
     * @param  _allocationBounds        Bounds to stop proposal if not enough deviation from expected allocation
     *                                  set to be [lowerBound, upperBound]
     */
    constructor(
        address _coreAddress,
        address _ethPriceFeedAddress,
        address _daiAddress,
        address _ethAddress,
        address _setTokenFactory,
        address _auctionLibrary,
        uint256 _auctionTimeToPivot,
        uint256[2] memory _multipliers,
        uint256[2] memory _allocationBounds
    )
        public
    {
        require(
            _allocationBounds[1] >= _allocationBounds[0],
            "RebalancingTokenManager.constructor: Upper allocation bound must be greater than lower."
        );
        
        coreAddress = _coreAddress;

        ethPriceFeed = _ethPriceFeedAddress;

        daiAddress = _daiAddress;
        ethAddress = _ethAddress;
        setTokenFactory = _setTokenFactory;

        auctionLibrary = _auctionLibrary;
        auctionTimeToPivot = _auctionTimeToPivot;
        daiMultiplier = _multipliers[0];
        ethMultiplier = _multipliers[1];

        maximumLowerThreshold = _allocationBounds[0];
        minimumUpperThreshold = _allocationBounds[1];
    }

    /* ============ External ============ */

    /*
     * When allowed on RebalancingSetToken, anyone can call for a new rebalance proposal
     *
     * @param  _rebalancingSetTokenAddress     The address of Rebalancing Set Token to propose new allocation
     */
    function propose(
        address _rebalancingSetTokenAddress
    )
        external
    {
        // Create interface to interact with RebalancingSetToken
        IRebalancingSetToken rebalancingSetInterface = IRebalancingSetToken(_rebalancingSetTokenAddress);

        // Require that enough time has passed from last rebalance
        uint256 lastRebalanceTimestamp = rebalancingSetInterface.lastRebalanceTimestamp();
        uint256 rebalanceInterval = rebalancingSetInterface.rebalanceInterval();
        require(
            block.timestamp >= lastRebalanceTimestamp.add(rebalanceInterval),
            "RebalancingTokenManager.proposeNewRebalance: Rebalance interval not elapsed"
        );

        // Require that Rebalancing Set Token is in Default state, won't allow for re-proposals
        // because malicious actor could prevent token from ever rebalancing
        require(
            rebalancingSetInterface.rebalanceState() == RebalancingLibrary.State.Default,
            "RebalancingTokenManager.proposeNewRebalance: State must be in Default"
        );

        // Get price data
        uint256 ethPrice = ManagerLibrary.queryPriceData(ethPriceFeed);

        // Require that allocation has changed sufficiently enough to justify rebalance
        uint256 currentSetDollarAmount = checkSufficientAllocationChange(
            ethPrice,
            rebalancingSetInterface.currentSet()
        );
        
        // Create new Set Token that collateralizes Rebalancing Set Token
        (
            address nextSetAddress,
            uint256 auctionStartPrice,
            uint256 auctionPivotPrice
        ) = createNewAllocationSetToken(
            ethPrice,
            currentSetDollarAmount
        );
        
        // Propose new allocation to Rebalancing Set Token
        rebalancingSetInterface.propose(
            nextSetAddress,
            auctionLibrary,
            auctionTimeToPivot,
            auctionStartPrice,
            auctionPivotPrice
        );

        emit LogManagerProposal(
            ethPrice
        );
    }

    /* ============ Internal ============ */

    /*
     * Check there has been a sufficient change in allocation as defined by maximumUpperThreshold
     * and minimumLowerThreshold and return USD value of currentSet.
     *
     * @param  _ethPrice              The 18 decimal value of one full ETH
     * @param  _currentSetAddress     The address of the Rebalancing Set Token's currentSet
     * @return                        The currentSet's USD value (in cents)
     */
    function checkSufficientAllocationChange(
        uint256 _ethPrice,
        address _currentSetAddress
    )
        private
        view
        returns (uint256)
    {
        // Create current set interface
        ISetToken currentSetTokenInterface = ISetToken(_currentSetAddress);

        // Get naturalUnit and units of currentSet
        uint256 currentSetNaturalUnit = currentSetTokenInterface.naturalUnit();
        uint256[] memory currentSetUnits = currentSetTokenInterface.getUnits();

        // Calculate dai dollar value in currentSet (in cents)
        uint256 daiDollarAmount = ManagerLibrary.calculateTokenAllocationAmountUSD(
            DAI_PRICE,
            currentSetNaturalUnit,
            currentSetUnits[0],
            DAI_DECIMALS
        );

        uint256[] memory assetPrices = new uint256[](2);
        assetPrices[0] = DAI_PRICE;
        assetPrices[1] = _ethPrice;

        uint256[] memory assetDecimals = new uint256[](2);
        assetDecimals[0] = DAI_DECIMALS;
        assetDecimals[1] = ETH_DECIMALS;

        uint256 currentSetDollarAmount = ManagerLibrary.calculateSetTokenDollarValue(
            assetPrices,
            currentSetNaturalUnit,
            currentSetUnits,
            assetDecimals
        );

        // Require that the allocation has changed enough to trigger buy or sell
        require(
            daiDollarAmount.mul(100).div(currentSetDollarAmount) >= minimumUpperThreshold ||
            daiDollarAmount.mul(100).div(currentSetDollarAmount) < maximumLowerThreshold,
            "RebalancingTokenManager.proposeNewRebalance: Allocation must be further away from 50 percent"
        );

        return currentSetDollarAmount;
    }

    /*
     * Determine units and naturalUnit of nextSet to propose, calculate auction parameters, and
     * create nextSet
     *
     * @param  _ethPrice                    The 18 decimal value of one full ETH
     * @param  _currentSetDollarAmount      The USD value of the Rebalancing Set Token's currentSet
     * @return address                      The address of nextSet
     * @return uint256                      The auctionStartPrice for rebalance auction
     * @return uint256                      The auctionPivotPrice for rebalance auction
     */
    function createNewAllocationSetToken(
        uint256 _ethPrice,
        uint256 _currentSetDollarAmount
    )
        private
        returns (address, uint256, uint256)
    {
        // Calculate the nextSet units and naturalUnit, determine dollar value of nextSet
        (
            uint256 nextSetNaturalUnit,
            uint256 nextSetDollarAmount,
            uint256[] memory nextSetUnits
        ) = calculateNextSetUnits(
            _ethPrice
        );

        // Calculate the auctionStartPrice and auctionPivotPrice of rebalance auction using dollar value
        // of both the current and nextSet
        (
            uint256 auctionStartPrice,
            uint256 auctionPivotPrice
        ) = ManagerLibrary.calculateAuctionPriceParameters(
            _currentSetDollarAmount,
            nextSetDollarAmount,
            AUCTION_LIB_PRICE_DIVISOR,
            auctionTimeToPivot
        );
        
        // Create static components array
        address[] memory nextSetComponents = new address[](2);
        nextSetComponents[0] = daiAddress;
        nextSetComponents[1] = ethAddress;

        // Create the nextSetToken contract that collateralized the Rebalancing Set Token once rebalance
        // is finished
        address nextSetAddress = ICore(coreAddress).createSet(
            setTokenFactory,
            nextSetComponents,
            nextSetUnits,
            nextSetNaturalUnit,
            bytes32("DAIETH"),
            bytes32("DAIETH"),
            ""
        );

        return (nextSetAddress, auctionStartPrice, auctionPivotPrice);
    }

    /*
     * Determine units and naturalUnit of nextSet to propose
     *
     * @param  _ethPrice          The 18 decimal value of one full ETH
     * @return uint256            The naturalUnit of nextSet
     * @return uint256            The dollar value of nextSet
     * @return uint256[]          The units of nextSet
     */
    function calculateNextSetUnits(
        uint256 _ethPrice
    )
        private
        returns (uint256, uint256, uint256[] memory)
    {
        // Initialize set token parameters
        uint256[] memory units = new uint256[](2);
        uint256 nextSetDollarAmount;
        uint256 nextSetNaturalUnit = PRICE_PRECISION;

        if (_ethPrice >= DAI_PRICE) {
            // Dai units is equal the USD Ethereum price
            uint256 daiUnits = _ethPrice.mul(PRICE_PRECISION).div(DAI_PRICE);

            // Create unit array and define natural unit
            units[0] = daiUnits.mul(daiMultiplier);
            units[1] = ethMultiplier.mul(PRICE_PRECISION);          
        } else {
            // Calculate dai units as (daiPrice/ethPrice)*100. 100 is used to add 
            // precision.
            uint256 ethDaiPrice = DAI_PRICE.mul(PRICE_PRECISION).div(_ethPrice);

            // Create unit array and define natural unit
            units[0] = daiMultiplier.mul(PRICE_PRECISION); 
            units[1] = ethDaiPrice.mul(ethMultiplier);         
        }

        // Calculate the nextSet dollar value (in cents)
        nextSetDollarAmount = calculateSetTokenPriceUSD(
            _ethPrice,
            nextSetNaturalUnit,
            units
        ); 

        return (nextSetNaturalUnit, nextSetDollarAmount, units);
    }

    /*
     * Get USD value of one set
     *
     * @param  _ethPrice            The 18 decimal value of one full ETH
     * @param  _naturalUnit         The naturalUnit of the set being valued
     * @param  _units               The units of the set being valued
     * @return uint256              The USD value of the set (in cents)
     */
    function calculateSetTokenPriceUSD(
        uint256 _ethPrice,
        uint256 _naturalUnit,
        uint256[] memory _units
    )
        private
        view
        returns (uint256)
    {
        // Calculate daiDollarAmount of one Set Token (in cents) 
        uint256 daiDollarAmount = ManagerLibrary.calculateTokenAllocationAmountUSD(
            DAI_PRICE,
            _naturalUnit,
            _units[0],
            DAI_DECIMALS
        );

        // Calculate ethDollarAmount of one Set Token (in cents)
        uint256 ethDollarAmount = ManagerLibrary.calculateTokenAllocationAmountUSD(
            _ethPrice,
            _naturalUnit,
            _units[1],
            ETH_DECIMALS
        );

        // Return sum of two components USD value (in cents)
        return daiDollarAmount.add(ethDollarAmount);        
    }
}