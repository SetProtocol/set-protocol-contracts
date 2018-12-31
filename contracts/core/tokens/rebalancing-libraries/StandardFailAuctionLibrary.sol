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

import { CommonMath } from "../../../lib/CommonMath.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { IVault } from "../../interfaces/IVault.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { RebalancingHelperLibrary } from "../../lib/RebalancingHelperLibrary.sol";
import { StandardStartRebalanceLibrary } from "./StandardStartRebalanceLibrary.sol";


/**
 * @title StandardFailAuctionLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token endFailedAuction function
 */
library StandardFailAuctionLibrary {
    using SafeMath for uint256;


    function endFailedAuction(
        uint256 _startingCurrentSetAmount,
        RebalancingHelperLibrary.AuctionPriceParameters _auctionParameters,
        StandardStartRebalanceLibrary.BiddingParameters _biddingParameters,
        RebalancingHelperLibrary.State _rebalanceState
    )
        external
        returns (RebalancingHelperLibrary.State)
    {
        require(
            _rebalanceState ==  RebalancingHelperLibrary.State.Rebalance,
            "RebalanceAuctionModule.endFailedAuction: Rebalancing Set Token must be in Rebalance State"
        );

        uint256 revertAuctionTime = _auctionParameters.auctionStartTime.add(
            _auctionParameters.auctionTimeToPivot
        );

        require(
            block.timestamp >= revertAuctionTime,
            "RebalanceAuctionModule.endFailedAuction: Can only be called after auction reaches pivot"
        );

        RebalancingHelperLibrary.State _newRebalanceState;
        if (_startingCurrentSetAmount == _biddingParameters.remainingCurrentSets) {
            _newRebalanceState = RebalancingHelperLibrary.State.Default;
        } else {
            _newRebalanceState = RebalancingHelperLibrary.State.Drawdown;
        }

        return (_newRebalanceState);
    }
}