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
import { IAuctionPriceCurve } from "../lib/auction-price-libraries/IAuctionPriceCurve.sol";
import { ICore } from "../interfaces/ICore.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { RebalancingHelperLibrary } from "../lib/RebalancingHelperLibrary.sol";


library StandardProposeLibrary {
    using SafeMath for uint256;

    /* ============ Constants ============ */
    uint256 constant MIN_AUCTION_TIME_TO_PIVOT = 21600;
    uint256 constant MAX_AUCTION_TIME_TO_PIVOT = 259200;

    /* ============ Structs ============ */
    struct ProposeAuctionParameters {
        address manager;
        address currentSet;
        uint256 lastRebalanceTimestamp;
        uint256 rebalanceInterval;
        ICore coreInstance;
        RebalancingHelperLibrary.State rebalanceState;
    }

    /* ============ Internal Functions ============ */

    /**
     * Function used to validate inputs to propose function and initialize auctionParameters struct
     *
     * @param _nextSet                      The Set to rebalance into
     * @param _auctionLibrary               The library used to calculate the Dutch Auction price
     * @param _auctionTimeToPivot           The amount of time for the auction to go ffrom start to pivot price
     * @param _auctionStartPrice            The price to start the auction at
     * @param _auctionPivotPrice            The price at which the price curve switches from linear to exponential
     * @param _proposeParameters            Rebalancing Set Token state parameters needed to execute logic
     */
    function propose(
        address _nextSet,
        address _auctionLibrary,
        uint256 _auctionTimeToPivot,
        uint256 _auctionStartPrice,
        uint256 _auctionPivotPrice,
        ProposeAuctionParameters memory _proposeParameters
    )
        internal
        returns (RebalancingHelperLibrary.AuctionPriceParameters)
    {
        // Make sure it is manager that is proposing the rebalance
        require(
            msg.sender == _proposeParameters.manager,
            "RebalancingSetToken.propose: Sender must be manager"
        );

        // New proposal cannot be made during a rebalance period
        require(
            _proposeParameters.rebalanceState != RebalancingHelperLibrary.State.Rebalance,
            "RebalancingSetToken.propose: State must not be Rebalance"
        );

        // Make sure enough time has passed from last rebalance to start a new proposal
        require(
            block.timestamp >= _proposeParameters.lastRebalanceTimestamp.add(
                _proposeParameters.rebalanceInterval
            ),
            "RebalancingSetToken.propose: Rebalance interval not elapsed"
        );

        // Check that new proposed Set is valid Set created by Core
        require(
            _proposeParameters.coreInstance.validSets(_nextSet),
            "RebalancingSetToken.propose: Invalid or disabled proposed SetToken address"
        );

        // Check that the auction library is a valid priceLibrary tracked by Core
        require(
            _proposeParameters.coreInstance.validPriceLibraries(_auctionLibrary),
            "RebalancingSetToken.propose: Invalid or disabled PriceLibrary address"
        );
        
        // Check that time to pivot is greater than 6 hours
        require(
            _auctionTimeToPivot > MIN_AUCTION_TIME_TO_PIVOT,
            "RebalancingSetToken.propose: Invalid time to pivot, must be greater than 6 hours" 
        );

        // Check that time to pivot is less than 3 days
        require(
            _auctionTimeToPivot < MAX_AUCTION_TIME_TO_PIVOT,
            "RebalancingSetToken.propose: Invalid time to pivot, must be less than 3 days" 
        );

        // Check that the propoosed set natural unit is a multiple of current set natural unit, or vice versa.
        // Done to make sure that when calculating token units there will are no rounding errors.
        uint256 currentNaturalUnit = ISetToken(_proposeParameters.currentSet).naturalUnit();
        uint256 nextSetNaturalUnit = ISetToken(_nextSet).naturalUnit();
        require(
            Math.max(currentNaturalUnit, nextSetNaturalUnit) %
            Math.min(currentNaturalUnit, nextSetNaturalUnit) == 0,
            "RebalancingSetToken.propose: Invalid proposed Set natural unit"
        );

        // Set auction parameters
        RebalancingHelperLibrary.AuctionPriceParameters memory auctionParameters = 
            RebalancingHelperLibrary.AuctionPriceParameters({
                auctionTimeToPivot: _auctionTimeToPivot,
                auctionStartPrice: _auctionStartPrice,
                auctionPivotPrice: _auctionPivotPrice,
                auctionStartTime: 0
            });

        // Check that pivot price is compliant with library restrictions
        IAuctionPriceCurve(_auctionLibrary).validateAuctionPriceParameters(
            auctionParameters
        );

        return auctionParameters;
    }
}