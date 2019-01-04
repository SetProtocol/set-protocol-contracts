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
import { ICore } from "../../interfaces/ICore.sol";
import { RebalancingHelperLibrary } from "../../lib/RebalancingHelperLibrary.sol";
import { StandardStartRebalanceLibrary } from "./StandardStartRebalanceLibrary.sol";


/**
 * @title StandardPlaceBidLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token placeBid function
 */
library StandardPlaceBidLibrary {
    using SafeMath for uint256;

    /* ============ Internal Functions ============ */

    /*
     * Place bid during rebalance auction. Can only be called by Core.
     *
     * @param _quantity                 The amount of currentSet to be rebalanced
     * @param _auctionLibrary           Auction library used in rebalance
     * @param _biddingParameters        Struct containing relevant data for calculating token flows
     * @param _coreInstance             Interface to interact with Core contract
     * @param _auctionParameters        Struct containing auction price curve parameters
     * @param _rebalanceState           State of rebalancing set token
     * @return inflowUnitArray          Array of amount of tokens inserted into system in bid
     * @return outflowUnitArray         Array of amount of tokens taken out of system in bid
     */
    function placeBid(
        uint256 _quantity,
        address _auctionLibrary,
        StandardStartRebalanceLibrary.BiddingParameters _biddingParameters,
        ICore _coreInstance,
        RebalancingHelperLibrary.AuctionPriceParameters _auctionParameters,
        RebalancingHelperLibrary.State _rebalanceState
    )
        internal
        returns (uint256[], uint256[])
    {
        // Make sure sender is a module
        require(
            _coreInstance.validModules(msg.sender),
            "RebalancingSetToken.placeBid: Sender must be approved module"
        );

        // Make sure that bid amount is multiple of minimum bid amount
        require(
            _quantity % _biddingParameters.minimumBid == 0,
            "RebalancingSetToken.placeBid: Must bid multiple of minimum bid"
        );

        // Make sure that bid Amount is less than remainingCurrentSets
        require(
            _quantity <= _biddingParameters.remainingCurrentSets,
            "RebalancingSetToken.placeBid: Bid exceeds remaining current sets"
        );

        return RebalancingHelperLibrary.getBidPrice(
            _quantity,
            _auctionLibrary,
            _biddingParameters,
            _auctionParameters,
            _rebalanceState
        );
    }  
}