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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "../../lib/AddressArrayUtils.sol";
import { ICore } from "../../core/interfaces/ICore.sol";
import { IRebalancingSetToken } from "../../core/interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../../core/interfaces/ISetToken.sol";
import { RebalancingLibrary } from "../../core/lib/RebalancingLibrary.sol";
import { ManagerLibrary } from "./lib/ManagerLibrary.sol";


/**
 * @title BTCDaiRebalancingManager
 * @author Set Protocol
 *
 * Contract used to manage a BTCDai Rebalancing Set Token
 */
contract BTCDaiRebalancingManager {

    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Constants ============ */

    uint256 constant PRICE_PRECISION = 1;
    uint256 constant AUCTION_LIB_PRICE_DIVISOR = 1000;
    
    // Equal to $1 
    uint256 constant DAI_PRICE = 10 ** 18;
    uint256 constant DAI_DECIMALS = 18;
    uint256 constant BTC_DECIMALS = 8;
    uint256 constant DECIMAL_DIFF_MULTIPLIER = 10 ** 10;

    /* ============ State Variables ============ */

    address public daiAddress;
    address public btcAddress;
    address public setTokenFactory;

    address public btcPriceFeed;

    address public coreAddress;

    address public auctionLibrary;
    uint256 public auctionTimeToPivot;
    uint256 public daiMultiplier;
    uint256 public btcMultiplier;

    uint256 public maximumLowerThreshold;
    uint256 public minimumUpperThreshold;

    /* ============ Events ============ */

    event LogManagerProposal(
        uint256 btcPrice
    );

    /* ============ Constructor ============ */

    /*
     * Rebalancing Token Manager constructor.
     * The multipliers are used to calculate the allocation of the set token. Allocation
     * is determined by a simple equation:
     *      daiAllocation = daiMultiplier/(daiMultiplier + btcMultiplier)
     * Furthermore the total USD cost of any new Set Token allocation can be found from the
     * following equation:
     *      SetTokenUSDPrice = (daiMultiplier + btcMultiplier)*max(btcPrice, daiPrice)
     *
     * @param  _coreAddress             The address of the Core contract
     * @param  _btcPriceFeedAddress     The address of btc medianizer
     * @param  _daiAddress              The address of the Dai contract
     * @param  _btcAddress              The address of the wrapped btc contract
     * @param  _setTokenFactory         The address of the SetTokenFactory
     * @param  _auctionLibrary          The address of auction price curve to use in rebalance
     * @param  _auctionTimeToPivot      The amount of time until pivot reached in rebalance
     * @param  _multipliers             Token multipliers used to determine allocation
     * @param  _allocationBounds        Bounds to stop proposal if not enough deviation from expected allocation
     *                                  set to be [lowerBound, upperBound]
     */
    constructor(
        address _coreAddress,
        address _btcPriceFeedAddress,
        address _daiAddress,
        address _btcAddress,
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

        btcPriceFeed = _btcPriceFeedAddress;

        daiAddress = _daiAddress;
        btcAddress = _btcAddress;
        setTokenFactory = _setTokenFactory;

        auctionLibrary = _auctionLibrary;
        auctionTimeToPivot = _auctionTimeToPivot;
        daiMultiplier = _multipliers[0];
        btcMultiplier = _multipliers[1];

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
        // Make sure the rebalancingSetToken is tracked by Core
        require(
            ICore(coreAddress).validSets(_rebalancingSetTokenAddress),
            "RebalanceAuctionModule.bid: Invalid or disabled SetToken address"
        );

        // Create interface to interact with RebalancingSetToken
        IRebalancingSetToken rebalancingSetInterface = IRebalancingSetToken(_rebalancingSetTokenAddress);

        ManagerLibrary.validateManagerPropose(rebalancingSetInterface);

        // Get price data
        uint256 btcPrice = ManagerLibrary.queryPriceData(btcPriceFeed);

        // Require that allocation has changed sufficiently enough to justify rebalance
        uint256 currentSetDollarAmount = checkSufficientAllocationChange(
            btcPrice,
            rebalancingSetInterface.currentSet()
        );
        
        // Create new Set Token that collateralizes Rebalancing Set Token
        (
            address nextSetAddress,
            uint256 nextSetDollarAmount
        ) = createNewAllocationSetToken(btcPrice);

        // Calculate the auctionStartPrice and auctionPivotPrice of rebalance auction using dollar value
        // of both the current and nextSet
        (
            uint256 auctionStartPrice,
            uint256 auctionPivotPrice
        ) = ManagerLibrary.calculateAuctionPriceParameters(
            currentSetDollarAmount,
            nextSetDollarAmount,
            AUCTION_LIB_PRICE_DIVISOR,
            auctionTimeToPivot
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
            btcPrice
        );
    }

    /* ============ Internal ============ */
    
    /*
     * Check there has been a sufficient change in allocation as defined by maximumUpperThreshold
     * and minimumLowerThreshold and return USD value of currentSet.
     *
     * @param  _btcPrice              The 18 decimal dollar value of one full BTC
     * @param  _currentSetAddress     The address of the Rebalancing Set Token's currentSet
     * @return                        The currentSet's USD value (in cents)
     */
    function checkSufficientAllocationChange(
        uint256 _btcPrice,
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

        // // Calculate dai dollar value in currentSet (in cents)
        uint256 daiDollarAmount = ManagerLibrary.calculateTokenAllocationAmountUSD(
            DAI_PRICE,
            currentSetNaturalUnit,
            currentSetUnits[0],
            DAI_DECIMALS
        );

        uint256[] memory assetPrices = new uint256[](2);
        assetPrices[0] = DAI_PRICE;
        assetPrices[1] = _btcPrice;

        uint256[] memory assetDecimals = new uint256[](2);
        assetDecimals[0] = DAI_DECIMALS;
        assetDecimals[1] = BTC_DECIMALS;

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
     * @param  _btcPrice                    The 18 decimal dollar value of one full BTC
     * @return address                      The address of nextSet
     * @return uint256                      The dollar value of the nextSet
     */
    function createNewAllocationSetToken(
        uint256 _btcPrice
    )
        private
        returns (address, uint256)
    {
        // Calculate the nextSet units and naturalUnit, determine dollar value of nextSet
        (
            uint256 nextSetNaturalUnit,
            uint256 nextSetDollarAmount,
            uint256[] memory nextSetUnits
        ) = calculateNextSetUnits(
            _btcPrice
        );
        
        // Create static components array
        address[] memory nextSetComponents = new address[](2);
        nextSetComponents[0] = daiAddress;
        nextSetComponents[1] = btcAddress;

        // Create the nextSetToken contract that collateralized the Rebalancing Set Token once rebalance
        // is finished
        address nextSetAddress = ICore(coreAddress).createSet(
            setTokenFactory,
            nextSetComponents,
            nextSetUnits,
            nextSetNaturalUnit,
            bytes32("DAIBTC"),
            bytes32("DAIBTC"),
            ""
        );

        return (nextSetAddress, nextSetDollarAmount);
    }

    /*
     * Determine units and naturalUnit of nextSet to propose
     *
     * @param  _btcPrice          The 18 decimal value of one full BTC
     * @return uint256            The naturalUnit of nextSet
     * @return uint256            The dollar value of nextSet
     * @return uint256[]          The units of nextSet
     */
    function calculateNextSetUnits(
        uint256 _btcPrice
    )
        private
        returns (uint256, uint256, uint256[] memory)
    {
        // Initialize set token parameters
        uint256[] memory nextSetUnits = new uint256[](2);
        uint256 nextSetNaturalUnit = DECIMAL_DIFF_MULTIPLIER.mul(PRICE_PRECISION);

        if (_btcPrice >= DAI_PRICE) {
            // Dai nextSetUnits is equal the USD Bitcoin price
            uint256 daiUnits = _btcPrice.mul(DECIMAL_DIFF_MULTIPLIER).div(DAI_PRICE);

            // Create unit array and define natural unit
            nextSetUnits[0] = daiUnits.mul(daiMultiplier).mul(PRICE_PRECISION);
            nextSetUnits[1] = btcMultiplier.mul(PRICE_PRECISION);          
        } else {
            // Calculate btc nextSetUnits as (daiPrice/btcPrice)*100. 100 is used to add 
            // precision.
            uint256 btcDaiPrice = DAI_PRICE.mul(PRICE_PRECISION).div(_btcPrice);

            // Create unit array and define natural unit
            nextSetUnits[0] = daiMultiplier.mul(DECIMAL_DIFF_MULTIPLIER).mul(PRICE_PRECISION); 
            nextSetUnits[1] = btcDaiPrice.mul(btcMultiplier);        
        }

        uint256[] memory assetPrices = new uint256[](2);
        assetPrices[0] = DAI_PRICE;
        assetPrices[1] = _btcPrice;

        uint256[] memory assetDecimals = new uint256[](2);
        assetDecimals[0] = DAI_DECIMALS;
        assetDecimals[1] = BTC_DECIMALS;

        uint256 nextSetDollarAmount = ManagerLibrary.calculateSetTokenDollarValue(
            assetPrices,
            nextSetNaturalUnit,
            nextSetUnits,
            assetDecimals
        );

        return (nextSetNaturalUnit, nextSetDollarAmount, nextSetUnits);
    }
}