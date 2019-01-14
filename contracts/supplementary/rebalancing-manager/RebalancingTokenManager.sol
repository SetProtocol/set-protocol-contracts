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
import { AddressArrayUtils } from "../lib/AddressArrayUtils.sol";
import { IRebalancingSetToken } from "../../core/interfaces/IRebalancingSetToken.sol";
import { ICore } from "../../core/interfaces/ICore.sol";
import { ISetToken } from "../../core/interfaces/ISetToken.sol";
import { RebalancingHelperLibrary } from "../../core/lib/RebalancingHelperLibrary.sol";


/**
 * @title LinearAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used to manage a Rebalancing Set Token
 */
contract RebalancingTokenManager {

    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Constants ============ */

    uint256 constant pricePrecision = 100;
    uint256 constant btcDecimals = 8;
    uint256 constant ethDecimals = 18;

    /* ============ State Variabales ============ */

    address public btcPriceFeedAddress;
    address public ethPriceFeedAddress;
    address public btcAddress;
    address public ethAddress;
    address public setTokenFactory;
    ICore coreInterface;

    address public auctionLibrary;
    uint256 public auctionTimeToPivot;
    address public currentSetAddress;

    /* ============ Constructor ============ */

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
        ICore coreInterface = ICore(_coreAddress);
        btcPriceFeedAddress = _btcPriceFeedAddress;
        ethPriceFeedAddress = _ethPriceFeedAddress;
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
     */
    function proposeNewRebalance(
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
        uint256 auctionPivotPrice = checkSufficientAllocationChange(btcPrice, ethPrice);

        // Create new Set Token that collateralizes Rebalancing Set Token
        address nextSetAddress = createNewAllocationSetToken(btcPrice, ethPrice);

        // Propose new allocation to Rebalancing Set Token
        rebalancingSetInterface.propose(
            nextSetAddress,
            auctionLibrary,
            auctionTimeToPivot,
            0,                      // auctionStartPrice is forced to 0 in Rebalancing Set Token implementation
            auctionPivotPrice
        );
    }

    /* ============ Internal ============ */

    function queryPriceData()
        private
        view
        returns (uint256, uint256)
    {
        // Get prices from oracles

        // Cast bytes32 prices to uint256
    }

    function checkSufficientAllocationChange(
        uint256 _btcPrice,
        uint256 _ethPrice
    )
        private
        view
        returns (uint256)
    {
        // Create current set interface
        ISetToken currentSetTokenInterface = ISetToken(currentSetAddress);

        address[] memory currentSetComponents = currentSetTokenInterface.getComponents();
        uint256[] memory currentSetUnits = currentSetTokenInterface.getUnits();

        uint256 btcIndex = currentSetComponents.indexOf(btcAddress);
        uint256 btcUnits = currentSetUnits[btcIndex];

        uint256 ethIndex = currentSetComponents.indexOf(ethAddress);
        uint256 ethUnits = currentSetUnits[ethIndex];

        uint256 btcDollarAmount = btcUnits.mul(_btcPrice).div(uint256(10**btcDecimals));
        uint256 ethDollarAmount = ethUnits.mul(_ethPrice).div(uint256(10**ethDecimals));
        uint256 totalDollarAmount = btcDollarAmount.add(ethDollarAmount);

        require(
            btcDollarAmount.mul(100).div(totalDollarAmount) > 52,
            "RebalancingTokenManager.proposeNewRebalance: Allocation must be further away from 50 percent"
        );

        return 1;
    }

    function createNewAllocationSetToken(
        uint256 _btcPrice,
        uint256 _ethPrice
    )
        private
        returns (address)
    {
        // Determine set token parameters
        uint256[2] memory units; 
        address[2] memory components = [btcAddress, ethAddress];
        uint256 naturalUnit;
        uint256 decimalDiffMultiplier = 10**(ethDecimals.sub(btcDecimals));

        if (_btcPrice >= _ethPrice) {
            // Calculate ethereum units, determined by the following equation:
            // (btcPrice/ethPrice)*(10**(ethDecimal-btcDecimal)) 
            uint256 ethUnits = _btcPrice.mul(decimalDiffMultiplier).div(_ethPrice);

            // Create unit array and define natural unit
            address[] units = [1, ethUnits];
            naturalUnit = uint256(10**10);            
        } else {
            // Calculate btc units as (ethPrice/btcPrice)*100. 100 is used to add 
            // precision. The increase in unit amounts is offset by increasing the
            // naturalUnit by two orders of magnitude so that issuance cost is still
            // roughly the same
            uint256 ethBtcPrice = _ethPrice.mul(pricePrecision).div(_btcPrice);

            // Create unit array and define natural unit
            address[] components = [ethBtcPrice, pricePrecision.mul(decimalDiffMultiplier)]; 
            naturalUnit = uint256(10**12);           
        }
        
        return coreInterface.create(
            setTokenFactory,
            components,
            units,
            naturalUnit,
            abi.encodePacked("btceth", bytes32(block.timestamp)),
            abi.encodePacked("btceth", bytes32(block.timestamp)),
            bytes32("")
        );
    }
}