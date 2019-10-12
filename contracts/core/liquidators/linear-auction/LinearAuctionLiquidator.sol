/*
    Copyright 2019 Set Labs Inc.

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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { AddressArrayUtils } from "../../../lib/AddressArrayUtils.sol";
import { GeneralAuction } from "../GeneralAuction.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
import { LinearAuction } from "./LinearAuction.sol";
import { SetTokenLibrary } from "../../lib/SetTokenLibrary.sol";


/**
 * @title LinearAuctionLiquidator
 * @author Set Protocol
 *
 * Contract that holds all the state and functionality required for setting up, returning prices, and tearing
 * down linear auction rebalances for RebalancingSetTokens.
 */
contract LinearAuctionLiquidator is
    GeneralAuction,
    LinearAuction
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ Modifier ============ */
    modifier callerValidSet() {
        // Check that calling address is a valid set
        require(
            coreInstance.validSets(msg.sender),
            "LinearAuctionLiquidator: Invalid or disabled proposed SetToken address"
        );

        _;
    }

    /**
     * LinearAuctionLiquidator constructor
     *
     * @param _coreInstance                 Core instance
     * @param _oracleWhiteListInstance      Oracle WhiteList instance
     * @param _pricePrecision               Price precision used in auctions
     * @param _timeToPivot                  Time spent in linear auction curve
     * @param _auctionSpeed                 Time spent exploring 1% change in price
     * @param _name                         Descriptive name of Liquidator
     */
    constructor(
        ICore _coreInstance,
        IOracleWhiteList _oracleWhiteListInstance,
        uint256 _pricePrecision,
        uint256 _timeToPivot,
        uint256 _auctionSpeed,
        string memory _name
    )
        public
        GeneralAuction(
            _coreInstance,
            _oracleWhiteListInstance,
            _pricePrecision,
            _name
        )
        LinearAuction(
            _timeToPivot,
            _auctionSpeed
        )
    {}

    /* ============ External Functions ============ */

    function processProposal(
        address _currentSet,
        address _nextSet
    )
        external
        // callerValidSet
    {
        // Get set details for currentSet and nextSet (units, components, natural units)
        SetTokenLibrary.SetDetails memory currentSetDetails = SetTokenLibrary.getSetDetails(_currentSet);
        SetTokenLibrary.SetDetails memory nextSetDetails = SetTokenLibrary.getSetDetails(_nextSet);

        // Create combinedTokenArray in memory
        address[] memory memCombinedTokenArray = currentSetDetails.components.union(
            nextSetDetails.components
        );

        // Check that all components in the rebalance have a matching oracle
        require(
            oracleWhiteListInstance.areValidAddresses(memCombinedTokenArray),
            "LinearAuctionLiquidator.processProposal: Passed token does not have matching oracle."
        );

        // Retrieve component prices of each SetToken
        uint256[] memory currentSetComponentPrices = getComponentPrices(
            currentSetDetails.components
        );
        uint256[] memory nextSetComponentPrices = getComponentPrices(
            nextSetDetails.components
        );

        // Retrieve component decimals of each SetToken
        uint256[] memory currentSetComponentDecimals = getComponentDecimals(
            currentSetDetails.components
        );
        uint256[] memory nextSetComponentDecimals = getComponentDecimals(
            nextSetDetails.components
        );

        // Get dollar value of both collateral SetTokens
        uint256 currentSetDollarValue = calculateSetTokenDollarValue(
            currentSetDetails,
            currentSetComponentPrices,
            currentSetComponentDecimals
        );
        uint256 nextSetDollarValue = calculateSetTokenDollarValue(
            nextSetDetails,
            nextSetComponentPrices,
            nextSetComponentDecimals
        );

        // Calculate and set auction startPrice and pivotPrice
        calculateAuctionPriceParameters(
            currentSetDollarValue,
            nextSetDollarValue,
            pricePrecision
        );

        // Set combinedTokenArray
        generalAuctionDetails[msg.sender].combinedTokenArray = memCombinedTokenArray;
    }

    function cancelProposal()
        external
        // callerValidSet
    {
        clearAuctionState();
    }

    function startRebalance(
        address _currentSet,
        address _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
        // callerValidSet
    {
        // Get set details for currentSet and nextSet (units, components, natural units)
        SetTokenLibrary.SetDetails memory currentSet = SetTokenLibrary.getSetDetails(_currentSet);
        SetTokenLibrary.SetDetails memory nextSet = SetTokenLibrary.getSetDetails(_nextSet);

        // Calcualate minimumBid and keep in memory
        uint256 minimumBid = calculateMinimumBid(
            currentSet.naturalUnit,
            nextSet.naturalUnit
        );

        // Require remainingCurrentSets to be greater than minimumBid otherwise no bidding would
        // be allowed
        require(
            _startingCurrentSetQuantity >= minimumBid,
            "LinearAuctionLiquidator.startRebalance: Not enough collateral to rebalance"
        );

        // Commit minimumBid to storage to use in future calculations
        generalAuctionDetails[msg.sender].minimumBid = minimumBid;

        // Create combinedNextSetUnits and combinedCurrentUnits and save to storage
        calculateCombinedUnitArrays(
            currentSet,
            nextSet
        );

        generalAuctionDetails[msg.sender].startingCurrentSets = _startingCurrentSetQuantity;
        generalAuctionDetails[msg.sender].remainingCurrentSets = _startingCurrentSetQuantity;
        linearAuctionDetails[msg.sender].startTime = block.timestamp;
    }

    function placeBid(
        uint256 _quantity
    )
        external
        // callerValidSet
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        validateBidQuantity(_quantity);

        // Update remainingCurrentSet figure to account for placed bid
        generalAuctionDetails[msg.sender].remainingCurrentSets = 
            generalAuctionDetails[msg.sender].remainingCurrentSets.sub(_quantity);

        return getBidPrice(_quantity);
    }

    function getBidPrice(
        uint256 _quantity
    )
        public
        // callerValidSet
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        // Get bid conversion price, currently static placeholder for calling auctionlibrary
        (
            uint256 currentPriceRatioNumerator,
            uint256 currentPriceRatioDenominator
        ) = getCurrentPriceRatio(
            pricePrecision
        );

        // Return arrays reprsenting token inflows and outflows required to complete bid at current
        // price for passed in quantity
        return createTokenFlowArrays(
            _quantity,
            currentPriceRatioNumerator,
            currentPriceRatioDenominator
        );
    }

    function settleRebalance()
        external
        // callerValidSet
    {
        // Make sure all currentSets have been rebalanced
        require(
            generalAuctionDetails[msg.sender].remainingCurrentSets <
            generalAuctionDetails[msg.sender].minimumBid,
            "LinearAuctionLiquidator.settleRebalance: Rebalance not completed"
        );

        clearAuctionState();
    }

    function endFailedRebalance()
        external
        // callerValidSet
    {
        clearAuctionState();
    }

    function hasRebalanceFailed()
        external
        view
        // callerValidSet
        returns (bool)    
    {
        // Calculate timestamp when pivot is reached
        uint256 revertAuctionTime = linearAuctionDetails[msg.sender].startTime.add(
            timeToPivot
        );

        // Make sure auction has gone past pivot point
        bool pivotTimeExceeded = block.timestamp >= revertAuctionTime;

        // Make sure more than minimumBid amount of currentSets remains
        bool setsNotAuctioned = generalAuctionDetails[msg.sender].remainingCurrentSets >=
            generalAuctionDetails[msg.sender].minimumBid;

        // Make sure auction has gone past pivot point
        return (pivotTimeExceeded && setsNotAuctioned);
    }

    /* ============ Getters Functions ============ */
    function getCombinedTokenArray()
        external
        view
        returns (address[] memory)
    {
        return generalAuctionDetails[msg.sender].combinedTokenArray;
    }

    function getCombinedCurrentSetUnits()
        external
        view
        returns (uint256[] memory)
    {
        return generalAuctionDetails[msg.sender].combinedCurrentSetUnits;
    }

    function getCombinedNextSetUnits()
        external
        view
        returns (uint256[] memory)
    {
        return generalAuctionDetails[msg.sender].combinedNextSetUnits;
    }

    /* ============ Internal Functions ============ */
    function clearAuctionState()
        internal
    {
        delete generalAuctionDetails[msg.sender];
        delete linearAuctionDetails[msg.sender];
    }
}