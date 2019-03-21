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
import { IAuctionPriceCurve } from "./auction-price-libraries/IAuctionPriceCurve.sol";

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

    struct BiddingParameters {
        uint256 minimumBid;
        uint256 remainingCurrentSets;
        uint256[] combinedCurrentUnits;
        uint256[] combinedNextSetUnits;
        address[] combinedTokenArray;
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
        public
        view
        returns (uint256)
    {
        uint256 priceDivisor = IAuctionPriceCurve(_auctionLibrary).priceDivisor();
        return _minimumBid.mul(_unit).div(_naturalUnit).div(priceDivisor);
    }
}
