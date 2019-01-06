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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { IAuctionPriceCurve } from "./auction-price-libraries/IAuctionPriceCurve.sol";
import { ICore } from "../interfaces/ICore.sol";
import { StandardStartRebalanceLibrary } from "../tokens/rebalancing-libraries/StandardStartRebalanceLibrary.sol";

/**
 * @title RebalancingHelperLibrary
 * @author Set Protocol
 *
 * The Rebalancing Helper Library contains functions for facilitating the rebalancing process for 
 * Rebalancing Set Tokens.
 *
 */


library RebalancingHelperLibrary {
    using SafeMath for uint256;

    /* ============ Enums ============ */

    enum State { Default, Proposal, Rebalance, Drawdown }    

    /* ============ Structs ============ */

    struct AuctionPriceParameters {
        uint256 auctionStartTime;
        uint256 auctionTimeToPivot;
        uint256 auctionStartPrice;
        uint256 auctionPivotPrice;
    }

    /**
     * Function to calculate the transfer value of a component given a standardized bid amount
     * (minimumBid/priceDivisor)
     *
     * @param   _unit           Units of the component token
     * @param   _naturalUnit    Natural unit of the Set token
     * @param   _minimumBid     Minimum bid amount
     * @return  uint256         Amount of tokens per standard bid amount (minimumBid/priceDivisor)
     */
    function computeTransferValue(
        uint256 _unit,
        uint256 _naturalUnit,
        uint256 _minimumBid,
        address _auctionLibrary
    )
        internal
        view
        returns (uint256)
    {
        uint256 priceDivisor = IAuctionPriceCurve(_auctionLibrary).priceDenominator();
        return _minimumBid.mul(_unit).div(_naturalUnit).div(priceDivisor);
    }

    /*
     * Get token inflows and outflows required for bid. Also the amount of Rebalancing
     * Sets that would be generated.
     *
     * @param _quantity               The amount of currentSet to be rebalanced
     * @param _auctionLibrary         Auction library used in rebalance
     * @param _biddingParameters      Struct containing relevant data for calculating token flows
     * @param _auctionParameters      Struct containing auction price curve parameters
     * @param _rebalanceState         State of rebalancing set token
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function getBidPrice(
        uint256 _quantity,
        address _auctionLibrary,
        StandardStartRebalanceLibrary.BiddingParameters _biddingParameters, 
        AuctionPriceParameters _auctionParameters,
        State _rebalanceState
    )
        internal
        returns (uint256[], uint256[])
    {
        // Confirm in Rebalance State
        require(
            _rebalanceState == RebalancingHelperLibrary.State.Rebalance,
            "RebalancingSetToken.getBidPrice: State must be Rebalance"
        );

        // Get bid conversion price, currently static placeholder for calling auctionlibrary
        (uint256 priceNumerator, uint256 priceDivisor) = IAuctionPriceCurve(_auctionLibrary).getCurrentPrice(
            _auctionParameters
        );

        // Normalized quantity amount
        uint256 unitsMultiplier = _quantity.div(_biddingParameters.minimumBid).mul(priceDivisor);

        // Calculate token flow arrays
        return createTokenFlowArrays(
            unitsMultiplier,
            priceNumerator,
            priceDivisor,
            _biddingParameters
        );
    }

    /*
     * Creates arrays of token inflows and outflows
     *
     * @param _unitsMultiplier        Bid amount normalized to number of standard bid amounts
     * @param _priceNumerator         The numerator of the price ratio
     * @param _priceDivisor           The denominator of the price ratio
     * @param _biddingParameters      Struct containing relevant data for calculating token flows
     * @return inflowUnitArray        Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray       Array of amount of tokens taken out of system in bid
     */
    function createTokenFlowArrays(
        uint256 _unitsMultiplier,
        uint256 _priceNumerator,
        uint256 _priceDivisor,
        StandardStartRebalanceLibrary.BiddingParameters _biddingParameters
    )
        internal
        returns (uint256[], uint256[])
    {
        // Declare unit arrays in memory
        uint256 combinedTokenCount = _biddingParameters.combinedTokenArray.length;
        uint256[] memory inflowUnitArray = new uint256[](combinedTokenCount);
        uint256[] memory outflowUnitArray = new uint256[](combinedTokenCount);

        // Cycle through each token in combinedTokenArray, calculate inflow/outflow and store
        // result in array
        for (uint256 i = 0; i < combinedTokenCount; i++) {
            (
                inflowUnitArray[i],
                outflowUnitArray[i]
            ) = calculateTokenFlows(
                _biddingParameters.combinedCurrentUnits[i],
                _biddingParameters.combinedNextSetUnits[i],
                _unitsMultiplier,
                _priceNumerator,
                _priceDivisor
            );
        } 

        return (inflowUnitArray, outflowUnitArray);       
    }

    /*
     * Calculates token inflow/outflow for single component in combinedTokenArray
     *
     * @param _currentUnit          Amount of token i in currentSet per standard bid amount
     * @param _nextSetUnit          Amount of token i in nextSet per standard bid amount
     * @param _unitsMultiplier      Bid amount normalized to number of standard bid amounts
     * @param _priceNumerator       The numerator of the price ratio
     * @param _priceDenominator     The denominator of the price ratio
     * @return inflowUnit           Amount of token i transferred into the system
     * @return outflowUnit          Amount of token i transferred to the bidder
     */
    function calculateTokenFlows(
        uint256 _currentUnit,
        uint256 _nextSetUnit,
        uint256 _unitsMultiplier,
        uint256 _priceNumerator,
        uint256 _priceDivisor
    )
        internal
        returns (uint256, uint256)
    {
        /*
         * Below is a mathematically simplified formula for calculating token inflows and
         * outflows, the following is it's derivation:
         * token_flow = (bidQuantity/price)*(nextUnit - price*currentUnit)
         *
         * Where,
         * 1) price = (priceNumerator/priceDivisor),
         * 2) nextUnit and currentUnit are the amount of component i needed for a
         * standardAmount of sets to be rebalanced where one standardAmount =
         * max(natural unit nextSet, natural unit currentSet), and
         * 3) bidQuantity is a normalized amount in terms of the standardAmount used
         * to calculate nextUnit and currentUnit. This is represented by the unitsMultiplier
         * variable.
         *
         * Given these definitions we can derive the below formula as follows:
         * token_flow = (unitsMultiplier/(priceNumerator/priceDivisor))*
         * (nextUnit - (priceNumerator/priceDivisor)*currentUnit)
         *
         * We can then multiply this equation by (priceDivisor/priceDivisor)
         * which simplifies the above equation to:
         *
         * (unitsMultiplier/priceNumerator)* (nextUnit*priceDivisor - currentUnit*priceNumerator)
         *
         * This is the equation seen below, but since unsigned integers are used we must check to see if
         * nextUnit*priceDivisor > currentUnit*priceNumerator, otherwise those two terms must be
         * flipped in the equation.
         */
        uint256 inflowUnit;
        uint256 outflowUnit;

        // Use if statement to check if token inflow or outflow
        if (_nextSetUnit.mul(_priceDivisor) > _currentUnit.mul(_priceNumerator)) {
            // Calculate inflow amount
            inflowUnit = _unitsMultiplier.mul(
                _nextSetUnit.mul(_priceDivisor).sub(_currentUnit.mul(_priceNumerator))
            ).div(_priceNumerator);

            // Set outflow amount to 0 for component i, since tokens need to be injected in rebalance
            outflowUnit = 0;
        } else {
            // Calculate outflow amount
            outflowUnit = _unitsMultiplier.mul(
                _currentUnit.mul(_priceNumerator).sub(_nextSetUnit.mul(_priceDivisor))
            ).div(_priceNumerator);

            // Set inflow amount to 0 for component i, since tokens need to be returned in rebalance
            inflowUnit = 0;
        }

        return (inflowUnit, outflowUnit);       
    }
}
