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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "../../lib/AddressArrayUtils.sol";
import { ICore } from "../../core/interfaces/ICore.sol";
import { IMedian } from "../../external/DappHub/interfaces/IMedian.sol";
import { IRebalancingSetToken } from "../../core/interfaces/IRebalancingSetToken.sol";
import { ISetToken } from "../../core/interfaces/ISetToken.sol";
import { RebalancingHelperLibrary } from "../../core/lib/RebalancingHelperLibrary.sol";


/**
 * @title BTCETHRebalancingManager
 * @author Set Protocol
 *
 * Contract used to manage a BTCETH Rebalancing Set Token
 */
contract BTCETHRebalancingManager {

    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Constants ============ */

    uint256 constant PRICE_PRECISION = 100;
    uint256 constant AUCTION_LIB_PRICE_DIVISOR = 1000;
    uint256 constant BTC_DECIMALS = 8;
    uint256 constant ETH_DECIMALS = 18;
    uint256 constant SET_TOKEN_DECIMALS = 18;
    uint256 constant DECIMAL_DIFF_MULTIPLIER = 10**10;
    uint256 constant THIRTY_MINUTES_IN_SECONDS = 1800;

    /* ============ State Variabales ============ */

    address public btcAddress;
    address public ethAddress;
    address public setTokenFactory;
    IMedian public btcPriceFeed;
    IMedian public ethPriceFeed;
    ICore coreInterface;

    address public auctionLibrary;
    uint256 public auctionTimeToPivot;

    /* ============ Constructor ============ */

    /*
     * Rebalancing Token Manager constructor
     *
     * @param  _coreAddress             The address of the Core contract
     * @param  _btcPriceFeedAddress     The address of BTC medianize
     * @param  _ethPriceFeedAddress     The address of ETH medianize
     * @param  _btcAddress              The address of the wrapped BTC contract
     * @param  _ethAddress              The address of the wrapped ETH contract
     * @param  _setTokenFactory         The address of the SetTokenFactory
     * @param  _auctionLibrary          The address of auction price curve to use in rebalance
     * @param  _auctionTimeToPivot      The amount of time until pivot reached in rebalance
     */
    constructor(
        address _coreAddress,
        address _btcPriceFeedAddress,
        address _ethPriceFeedAddress,
        address _btcAddress,
        address _ethAddress,
        address _setTokenFactory,
        address _auctionLibrary,
        uint256 _auctionTimeToPivot
    )
        public
    {
        coreInterface = ICore(_coreAddress);
        btcPriceFeed = IMedian(_btcPriceFeedAddress);
        ethPriceFeed = IMedian(_ethPriceFeedAddress);
        btcAddress = _btcAddress;
        ethAddress = _ethAddress;
        setTokenFactory = _setTokenFactory;

        auctionLibrary = _auctionLibrary;
        auctionTimeToPivot = _auctionTimeToPivot;
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
            rebalancingSetInterface.rebalanceState() == RebalancingHelperLibrary.State.Default,
            "RebalancingTokenManager.proposeNewRebalance: State must be in Default"
        );

        // Get price data
        (
            uint256 btcPrice,
            uint256 ethPrice
        ) = queryPriceData();

        // Require that allocation has changed sufficiently enough to justify rebalance
        uint256 currentSetDollarAmount = checkSufficientAllocationChange(
            btcPrice,
            ethPrice,
            rebalancingSetInterface.currentSet()
        );
        
        // Create new Set Token that collateralizes Rebalancing Set Token
        (
            address nextSetAddress,
            uint256 auctionStartPrice,
            uint256 auctionPivotPrice
        ) = createNewAllocationSetToken(
            btcPrice,
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
    }

    /* ============ Internal ============ */
    /*
     * Query price feeds for wbtc and weth, return as uint256
     *
     */
    function queryPriceData()
        private
        view
        returns (uint256, uint256)
    {
        // Get prices from oracles
        bytes32 btcPriceBytes = btcPriceFeed.read();
        bytes32 ethPriceBytes = ethPriceFeed.read();

        // Cast bytes32 prices to uint256
        uint256 btcPrice = uint256(btcPriceBytes);
        uint256 ethPrice = uint256(ethPriceBytes);

        return(btcPrice, ethPrice);
    }

    /*
     * Check there has been a sufficient change in allocation (greater than 2%) and return
     * USD value of currentSet.
     *
     * @param  _btcPrice              The 18 decimal value of one full BTC
     * @param  _ethPrice              The 18 decimal value of one full ETH
     * @param  _currentSetAddress     The address of the Rebalancing Set Token's currentSet
     * @return                        The currentSet's USD value (in cents)
     */
    function checkSufficientAllocationChange(
        uint256 _btcPrice,
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

        // Calculate wbtc dollar value in currentSet (in cents)
        uint256 btcDollarAmount = calculateTokenAllocationAmountUSD(
            _btcPrice,
            currentSetNaturalUnit,
            currentSetUnits[0],
            BTC_DECIMALS
        );

        // Calculate weth dollar value in currentSet (in cents)
        uint256 ethDollarAmount = calculateTokenAllocationAmountUSD(
            _ethPrice,
            currentSetNaturalUnit,
            currentSetUnits[1],
            ETH_DECIMALS
        );

        // Total dollar value of currentSet (in cents)
        uint256 currentSetDollarAmount = btcDollarAmount.add(ethDollarAmount);

        // Require that the allocation has changed more than 2% in order for a rebalance to be called
        require(
            btcDollarAmount.mul(100).div(currentSetDollarAmount) >= 52 ||
            btcDollarAmount.mul(100).div(currentSetDollarAmount) < 48,
            "RebalancingTokenManager.proposeNewRebalance: Allocation must be further away from 50 percent"
        );

        return currentSetDollarAmount;
    }

    /*
     * Determine units and naturalUnit of nextSet to propose, calculate auction parameters, and
     * create nextSet
     *
     * @param  _btcPrice                    The 18 decimal value of one full BTC
     * @param  _ethPrice                    The 18 decimal value of one full ETH
     * @param  _currentSetDollarAmount      The USD value of the Rebalancing Set Token's currentSet
     * @return address                      The address of nextSet
     * @return uint256                      The auctionStartPrice for rebalance auction
     * @return uint256                      The auctionPivotPrice for rebalance auction
     */
    function createNewAllocationSetToken(
        uint256 _btcPrice,
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
            _btcPrice,
            _ethPrice
        );

        // Calculate the auctionStartPrice and auctionPivotPrice of rebalance auction using dollar value
        // of both the current and nextSet
        (
            uint256 auctionStartPrice,
            uint256 auctionPivotPrice
        ) = calculateAuctionPriceParameters(
            _currentSetDollarAmount,
            nextSetDollarAmount
        );
        
        // Create static components array
        address[] memory nextSetComponents = new address[](2);
        nextSetComponents[0] = btcAddress;
        nextSetComponents[1] = ethAddress;

        // Create the nextSetToken contract that collateralized the Rebalancing Set Token once rebalance
        // is finished
        address nextSetAddress = coreInterface.create(
            setTokenFactory,
            nextSetComponents,
            nextSetUnits,
            nextSetNaturalUnit,
            bytes32("BTCETH"),
            bytes32("BTCETH"),
            ""
        );

        return(nextSetAddress, auctionStartPrice, auctionPivotPrice);
    }

    /*
     * Determine units and naturalUnit of nextSet to propose
     *
     * @param  _btcPrice          The 18 decimal value of one full BTC
     * @param  _ethPrice          The 18 decimal value of one full ETH
     * @return uint256            The naturalUnit of nextSet
     * @return uint256            The dollar value of nextSet
     * @return uint256[]          The units of nextSet
     */
    function calculateNextSetUnits(
        uint256 _btcPrice,
        uint256 _ethPrice
    )
        private
        returns (uint256, uint256, uint256[])
    {
        // Initialize set token parameters
        uint256 naturalUnit;
        uint256[] memory units = new uint256[](2);
        uint256 nextSetDollarAmount;

        if (_btcPrice >= _ethPrice) {
            // Calculate ethereum units, determined by the following equation:
            // (btcPrice/ethPrice)*(10**(ethDecimal-btcDecimal)) 
            uint256 ethUnits = _btcPrice.mul(DECIMAL_DIFF_MULTIPLIER).div(_ethPrice);

            // Create unit array and define natural unit
            units[0] = 1;
            units[1] = ethUnits;
            naturalUnit = uint256(10**10);

            // Calculate the nextSet dollar value (in cents)
            nextSetDollarAmount = calculateSetTokenPriceUSD(
                _btcPrice,
                _ethPrice,
                naturalUnit,
                units
            );           
        } else {
            // Calculate btc units as (ethPrice/btcPrice)*100. 100 is used to add 
            // precision. The increase in unit amounts is offset by increasing the
            // naturalUnit by two orders of magnitude so that issuance cost is still
            // roughly the same
            uint256 ethBtcPrice = _ethPrice.mul(PRICE_PRECISION).div(_btcPrice);

            // Create unit array and define natural unit
            units[0] = ethBtcPrice; 
            units[1] = PRICE_PRECISION.mul(DECIMAL_DIFF_MULTIPLIER);
            naturalUnit = uint256(10**12); 

            // Calculate the nextSet dollar value (in cents)
            nextSetDollarAmount = calculateSetTokenPriceUSD(
                _btcPrice,
                _ethPrice,
                naturalUnit,
                units
            );          
        }

        return(naturalUnit, nextSetDollarAmount, units);
    }

    /*
     * Determine units and naturalUnit of nextSet to propose
     *
     * @param  _currentSetDollarAmount      The 18 decimal value of one currenSet
     * @param  _nextSetDollarAmount         The 18 decimal value of one nextSet
     * @return uint256                      The auctionStartPrice for rebalance auction
     * @return uint256                      The auctionPivotPrice for rebalance auction
     */
    function calculateAuctionPriceParameters(
        uint256 _currentSetDollarAmount,
        uint256 _nextSetDollarAmount
    )
        private
        returns (uint256, uint256)
    {
        // Determine fair value of nextSet/currentSet and put in terms of auction library price divisor
        uint256 fairValue = _nextSetDollarAmount.mul(AUCTION_LIB_PRICE_DIVISOR).div(_currentSetDollarAmount);
        // Calculate how much one percent slippage from fair value is
        uint256 onePercentSlippage = fairValue.div(100);

        // Calculate how many 30 minute periods are in auctionTimeToPivot
        uint256 thirtyMinutePeriods = auctionTimeToPivot.div(THIRTY_MINUTES_IN_SECONDS);
        // Since we are targeting a 1% slippage every 30 minutes the price range is defined as
        // the price of a 1% move multipled by the amount of 30 second intervals in the auctionTimeToPivot
        // This value is then divided by two to get half the price range
        uint256 halfPriceRange = thirtyMinutePeriods.mul(onePercentSlippage).div(2);

        // Auction start price is fair value minus half price range to center the auction at fair value
        uint256 auctionStartPrice = fairValue.sub(halfPriceRange);
        // Auction pivot price is fair value plus half price range to center the auction at fair value
        uint256 auctionPivotPrice = fairValue.add(halfPriceRange);

        return (auctionStartPrice, auctionPivotPrice);
    }

    /*
     * Get USD value of one set
     *
     * @param  _btcPrice            The 18 decimal value of one full BTC
     * @param  _ethPrice            The 18 decimal value of one full ETH
     * @param  _naturalUnit         The naturalUnit of the set being valued
     * @param  _units               The units of the set being valued
     * @return uint256              The USD value of the set (in cents)
     */
    function calculateSetTokenPriceUSD(
        uint256 _btcPrice,
        uint256 _ethPrice,
        uint256 _naturalUnit,
        uint256[] _units
    )
        private
        returns (uint256)
    {
        // Calculate btcDollarAmount of one Set Token (in cents) 
        uint256 btcDollarAmount = calculateTokenAllocationAmountUSD(
            _btcPrice,
            _naturalUnit,
            _units[0],
            BTC_DECIMALS
        );

        // Calculate ethDollarAmount of one Set Token (in cents)
        uint256 ethDollarAmount = calculateTokenAllocationAmountUSD(
            _ethPrice,
            _naturalUnit,
            _units[1],
            ETH_DECIMALS
        );

        // Return sum of two components USD value (in cents)
        return btcDollarAmount.add(ethDollarAmount);        
    }

    /*
     * Get USD value of one component in a Set
     *
     * @param  _tokenPrice          The 18 decimal value of one full token
     * @param  _naturalUnit         The naturalUnit of the set being component belongs to
     * @param  _unit                The unit of the component in the set
     * @param  _tokenDecimals       The component token's decimal value
     * @return uint256              The USD value of the component's allocation in the Set (in cents)
     */
    function calculateTokenAllocationAmountUSD(
        uint256 _tokenPrice,
        uint256 _naturalUnit,
        uint256 _unit,
        uint256 _tokenDecimals
    )
        private
        returns (uint256)
    {
        // Calculate the amount of component base units are in one full set token
        uint256 componentUnitsInFullToken = _unit.mul(uint256(10**SET_TOKEN_DECIMALS)).div(_naturalUnit);

        // Return value of component token in one full set token, divide by 10**16 to turn tokenPrice into cents
        return _tokenPrice.mul(componentUnitsInFullToken).div(uint256(10**_tokenDecimals)).div(uint256(10**16));
    }
}