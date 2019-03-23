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

import { IMedian } from "../../../external/DappHub/interfaces/IMedian.sol";
import { IRebalancingSetToken } from "../../../core/interfaces/IRebalancingSetToken.sol";
import { RebalancingLibrary } from "../../../core/lib/RebalancingLibrary.sol";


/**
 * @title ManagerLibrary
 * @author Set Protocol
 *
 * The ManagerLibrary contains functions for helping Managers create proposals
 *
 */
library ManagerLibrary {
    using SafeMath for uint256;

    /*
     * Validates whether the Rebalancing Set is in the correct state and sufficient time has elapsed.
     *
     * @param  _rebalancingSetInterface      Instance of the Rebalancing Set Token
     */
    function validateManagerPropose(
        IRebalancingSetToken _rebalancingSetInterface
    )
        internal
    {
        // Require that enough time has passed from last rebalance
        uint256 lastRebalanceTimestamp = _rebalancingSetInterface.lastRebalanceTimestamp();
        uint256 rebalanceInterval = _rebalancingSetInterface.rebalanceInterval();
        require(
            block.timestamp >= lastRebalanceTimestamp.add(rebalanceInterval),
            "ManagerLibrary.proposeNewRebalance: Rebalance interval not elapsed"
        );

        // Require that Rebalancing Set Token is in Default state, won't allow for re-proposals
        // because malicious actor could prevent token from ever rebalancing
        require(
            _rebalancingSetInterface.rebalanceState() == RebalancingLibrary.State.Default,
            "ManagerLibrary.proposeNewRebalance: State must be in Default"
        );        
    }

    /*
     * Calculates the auction price parameters, utilizing targetting 1% slippage every 30 minutes
     * and auctions beginning +50% and -50% relative to fair value.
     *
     * @param  _currentSetDollarAmount      The 18 decimal value of one currenSet
     * @param  _nextSetDollarAmount         The 18 decimal value of one nextSet
     * @param  _auctionLibraryPriceDivisor  The auction library price divisor
     * @param  _auctionTimeToPivot          The auction time to pivot
     * @return uint256                      The auctionStartPrice for rebalance auction
     * @return uint256                      The auctionPivotPrice for rebalance auction
     */
    function calculateAuctionPriceParameters(
        uint256 _currentSetDollarAmount,
        uint256 _nextSetDollarAmount,
        uint256 _auctionLibraryPriceDivisor,
        uint256 _auctionTimeToPivot
    )
        internal
        view
        returns (uint256, uint256)
    {
        // Determine fair value of nextSet/currentSet and put in terms of auction library price divisor
        uint256 fairValue = _nextSetDollarAmount.mul(_auctionLibraryPriceDivisor).div(_currentSetDollarAmount);
        // Calculate how much one percent slippage from fair value is
        uint256 onePercentSlippage = fairValue.div(100);

        // Calculate how many 30 minute periods are in auctionTimeToPivot
        uint256 THIRTY_MINUTES_IN_SECONDS = 1800;
        uint256 thirtyMinutePeriods = _auctionTimeToPivot.div(THIRTY_MINUTES_IN_SECONDS);
        // Since we are targeting a 1% slippage every 30 minutes the price range is defined as
        // the price of a 1% move multiplied by the amount of 30 second intervals in the auctionTimeToPivot
        // This value is then divided by two to get half the price range
        uint256 halfPriceRange = thirtyMinutePeriods.mul(onePercentSlippage).div(2);

        // Auction start price is fair value minus half price range to center the auction at fair value
        uint256 auctionStartPrice = fairValue.sub(halfPriceRange);
        // Auction pivot price is fair value plus half price range to center the auction at fair value
        uint256 auctionPivotPrice = fairValue.add(halfPriceRange);

        return (auctionStartPrice, auctionPivotPrice);
    }

    /*
     * Query the Medianizer price feeds for a value that is returned as a Uint. Prices
     * have 18 decimals.
     *
     * @param  _priceFeedAddress            Address of the medianizer price feed
     * @return uint256                      The price from the price feed with 18 decimals
     */
    function queryPriceData(
        address _priceFeedAddress
    )
        internal
        view
        returns (uint256)
    {
        // Get prices from oracles
        bytes32 priceInBytes = IMedian(_priceFeedAddress).read();

        return uint256(priceInBytes);
    }

    /*
     * Calculates the USD Value of a Set Token - by taking the individual token prices, units
     * and decimals.
     *
     * @param  _tokenPrices         The 18 decimal values of components
     * @param  _naturalUnit         The naturalUnit of the set being component belongs to
     * @param  _units               The units of the components in the Set
     * @param  _tokenDecimals       The components decimal values
     * @return uint256              The USD value of the Set (in cents)
     */
    function calculateSetTokenDollarValue(
        uint256[] memory _tokenPrices,
        uint256 _naturalUnit,
        uint256[] memory _units,
        uint256[] memory _tokenDecimals
    )
        internal
        view
        returns (uint256)
    {
        uint256 setDollarAmount = 0;

        // Loop through assets
        for (uint256 i = 0; i < _tokenPrices.length; i++) {
            uint256 tokenDollarValue = calculateTokenAllocationAmountUSD(
                _tokenPrices[i],
                _naturalUnit,
                _units[i],
                _tokenDecimals[i]
            );

            setDollarAmount = setDollarAmount.add(tokenDollarValue);
        }

        return setDollarAmount;
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
        internal
        view
        returns (uint256)
    {
        uint256 SET_TOKEN_DECIMALS = 18;
        uint256 VALUE_TO_CENTS_CONVERSION = 10 ** 16;

        // Calculate the amount of component base units are in one full set token
        uint256 componentUnitsInFullToken = _unit
            .mul(10 ** SET_TOKEN_DECIMALS)
            .div(_naturalUnit);
        
        // Return value of component token in one full set token, divide by 10 ** 16 to turn tokenPrice into cents
        return _tokenPrice
            .mul(componentUnitsInFullToken)
            .div(10 ** _tokenDecimals)
            .div(VALUE_TO_CENTS_CONVERSION);
    }
}
