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
    uint256 constant DECIMAL_DIFF_MULTIPLIER = 10 ** 10;

    /* ============ State Variables ============ */

    address public btcAddress;
    address public ethAddress;
    address public setTokenFactory;

    address public btcPriceFeed;
    address public ethPriceFeed;

    address public coreAddress;

    address public auctionLibrary;
    uint256 public auctionTimeToPivot;
    uint256 public btcMultiplier;
    uint256 public ethMultiplier;

    uint256 public maximumLowerThreshold;
    uint256 public minimumUpperThreshold;

    /* ============ Events ============ */

    event LogManagerProposal(
        uint256 btcPrice,
        uint256 ethPrice
    );

    /* ============ Constructor ============ */

    /*
     * Rebalancing Token Manager constructor.
     * The multipliers are used to calculate the allocation of the set token. Allocation
     * is determined by a simple equation:
     *      btcAllocation = btcMultiplier/(btcMultiplier + ethMultiplier)
     * Furthermore the total USD cost of any new Set Token allocation can be found from the
     * following equation:
     *      SetTokenUSDPrice = (btcMultiplier + ethMultiplier)*max(ethPrice, btcPrice)
     *
     * @param  _coreAddress             The address of the Core contract
     * @param  _btcPriceFeedAddress     The address of BTC medianizer
     * @param  _ethPriceFeedAddress     The address of ETH medianizer
     * @param  _btcAddress              The address of the wrapped BTC contract
     * @param  _ethAddress              The address of the wrapped ETH contract
     * @param  _setTokenFactory         The address of the SetTokenFactory
     * @param  _auctionLibrary          The address of auction price curve to use in rebalance
     * @param  _auctionTimeToPivot      The amount of time until pivot reached in rebalance
     * @param  _btcMultiplier           With _ethMultiplier, the ratio amount of wbtc to include
     * @param  _ethMultiplier           With _btcMultiplier, the ratio amount of weth to include
     */
    constructor(
        address _coreAddress,
        address _btcPriceFeedAddress,
        address _ethPriceFeedAddress,
        address _btcAddress,
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

        btcPriceFeed = _btcPriceFeedAddress;
        ethPriceFeed = _ethPriceFeedAddress;

        btcAddress = _btcAddress;
        ethAddress = _ethAddress;
        setTokenFactory = _setTokenFactory;

        auctionLibrary = _auctionLibrary;
        auctionTimeToPivot = _auctionTimeToPivot;
        btcMultiplier = _multipliers[0];
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

        ManagerLibrary.validateManagerPropose(rebalancingSetInterface);

        // Get price data
        uint256 btcPrice = ManagerLibrary.queryPriceData(btcPriceFeed);
        uint256 ethPrice = ManagerLibrary.queryPriceData(ethPriceFeed);

        // Require that allocation has changed sufficiently enough to justify rebalance
        uint256 currentSetDollarAmount = checkSufficientAllocationChange(
            btcPrice,
            ethPrice,
            rebalancingSetInterface.currentSet()
        );

        // Create new Set Token that collateralizes Rebalancing Set Token
        // address nextSetAddress;
        (
            address nextSetAddress,
            uint256 nextSetDollarAmount
        ) = createNewAllocationSetToken(
            btcPrice,
            ethPrice
        );

        // Calculate the auctionStartPrice and auctionPivotPrice of rebalance auction using dollar value
        // of both the current and nextSet
        uint256 auctionStartPrice;
        uint256 auctionPivotPrice;
        (
            auctionStartPrice,
            auctionPivotPrice
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
            btcPrice,
            ethPrice
        );
    }

    /* ============ Internal ============ */

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
        uint256 btcDollarAmount = ManagerLibrary.calculateTokenAllocationAmountUSD(
            _btcPrice,
            currentSetNaturalUnit,
            currentSetUnits[0],
            BTC_DECIMALS
        );

        uint256[] memory assetPrices = new uint256[](2);
        assetPrices[0] = _btcPrice;
        assetPrices[1] = _ethPrice;

        uint256[] memory assetDecimals = new uint256[](2);
        assetDecimals[0] = BTC_DECIMALS;
        assetDecimals[1] = ETH_DECIMALS;

        uint256 currentSetDollarAmount = ManagerLibrary.calculateSetTokenDollarValue(
            assetPrices,
            currentSetNaturalUnit,
            currentSetUnits,
            assetDecimals
        );

        // Require that the allocation has changed more than 2% in order for a rebalance to be called
        require(
            btcDollarAmount.mul(100).div(currentSetDollarAmount) >= minimumUpperThreshold ||
            btcDollarAmount.mul(100).div(currentSetDollarAmount) < maximumLowerThreshold,
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
     * @return address                      The address of nextSet
     * @return uint256                      The USD value of the nextSet
     */
    function createNewAllocationSetToken(
        uint256 _btcPrice,
        uint256 _ethPrice
    )
        private
        returns (address, uint256)
    {
        // Calculate the nextSet units and naturalUnit, determine dollar value of nextSet
        uint256 nextSetNaturalUnit;
        uint256 nextSetDollarAmount;
        uint256[] memory nextSetUnits;
        (
            nextSetNaturalUnit,
            nextSetDollarAmount,
            nextSetUnits
        ) = calculateNextSetUnits(
            _btcPrice,
            _ethPrice
        );

        // Create static components array
        address[] memory nextSetComponents = new address[](2);
        nextSetComponents[0] = btcAddress;
        nextSetComponents[1] = ethAddress;

        // Create the nextSetToken contract that collateralized the Rebalancing Set Token once rebalance
        // is finished
        address nextSetAddress = ICore(coreAddress).createSet(
            setTokenFactory,
            nextSetComponents,
            nextSetUnits,
            nextSetNaturalUnit,
            bytes32("BTCETH"),
            bytes32("BTCETH"),
            ""
        );

        return (nextSetAddress, nextSetDollarAmount);
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
        view
        returns (uint256, uint256, uint256[] memory)
    {
        // Initialize set token parameters
        uint256 nextSetNaturalUnit;
        uint256[] memory nextSetUnits = new uint256[](2);

        if (_btcPrice >= _ethPrice) {
            // Calculate ethereum nextSetUnits, determined by the following equation:
            // (btcPrice / ethPrice) * (10 ** (ethDecimal - btcDecimal))
            uint256 ethUnits = _btcPrice.mul(DECIMAL_DIFF_MULTIPLIER).div(_ethPrice);

            // Create unit array and define natural unit
            nextSetUnits[0] = btcMultiplier;
            nextSetUnits[1] = ethUnits.mul(ethMultiplier);
            nextSetNaturalUnit = 10 ** 10;
        } else {
            // Calculate btc nextSetUnits as (ethPrice / btcPrice) * 100. 100 is used to add
            // precision. The increase in unit amounts is offset by increasing the
            // nextSetNaturalUnit by two orders of magnitude so that issuance cost is still
            // roughly the same
            uint256 ethBtcPrice = _ethPrice.mul(PRICE_PRECISION).div(_btcPrice);

            // Create unit array and define natural unit
            nextSetUnits[0] = ethBtcPrice.mul(btcMultiplier);
            nextSetUnits[1] = PRICE_PRECISION.mul(DECIMAL_DIFF_MULTIPLIER).mul(ethMultiplier);
            nextSetNaturalUnit = 10 ** 12;
        }

        uint256[] memory assetPrices = new uint256[](2);
        assetPrices[0] = _btcPrice;
        assetPrices[1] = _ethPrice;

        uint256[] memory assetDecimals = new uint256[](2);
        assetDecimals[0] = BTC_DECIMALS;
        assetDecimals[1] = ETH_DECIMALS;

        uint256 nextSetDollarAmount = ManagerLibrary.calculateSetTokenDollarValue(
            assetPrices,
            nextSetNaturalUnit,
            nextSetUnits,
            assetDecimals
        );

        return (nextSetNaturalUnit, nextSetDollarAmount, nextSetUnits);
    }
}
