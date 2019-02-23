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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { IAuctionPriceCurve } from "../../lib/auction-price-libraries/IAuctionPriceCurve.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { IRebalancingSetFactory } from "../../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IWhiteList } from "../../interfaces/IWhiteList.sol";
import { RebalancingHelperLibrary } from "../../lib/RebalancingHelperLibrary.sol";


/**
 * @title StandardProposeLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
library StandardProposeLibrary {
    using SafeMath for uint256;

    /* ============ Structs ============ */

    struct ProposeAuctionParameters {
        address manager;
        address currentSet;
        address coreAddress;
        uint256 lastRebalanceTimestamp;
        uint256 rebalanceInterval;
        uint8 rebalanceState;
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
     * @param _componentWhiteListAddress    Component WhiteList address
     * @param _proposeParameters            Rebalancing Set Token state parameters needed to execute logic
     * @return                              Struct containing auction price curve parameters
     */
    function propose(
        address _nextSet,
        address _auctionLibrary,
        uint256 _auctionTimeToPivot,
        uint256 _auctionStartPrice,
        uint256 _auctionPivotPrice,
        address _factoryAddress,
        address _componentWhiteListAddress,
        ProposeAuctionParameters memory _proposeParameters
    )
        public
        returns (RebalancingHelperLibrary.AuctionPriceParameters)
    {
        ICore coreInstance = ICore(_proposeParameters.coreAddress);
        IRebalancingSetFactory factoryInstance = IRebalancingSetFactory(_factoryAddress);

        // Make sure it is manager that is proposing the rebalance
        require(
            msg.sender == _proposeParameters.manager,
            "RebalancingSetToken.propose: Sender must be manager"
        );

        // New Proposal can only be made in Default and Proposal state
        require(
            _proposeParameters.rebalanceState == uint8(RebalancingHelperLibrary.State.Default) ||
            _proposeParameters.rebalanceState == uint8(RebalancingHelperLibrary.State.Proposal),
            "RebalancingSetToken.propose: State must be in Propose or Default"
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
            coreInstance.validSets(_nextSet),
            "RebalancingSetToken.propose: Invalid or disabled proposed SetToken address"
        );

        // Check proposed components on whitelist. This is to ensure managers are unable to add contract addresses
        // to a propose that prohibit the set from carrying out an auction i.e. a token that only the manager possesses
        require(
            IWhiteList(_componentWhiteListAddress).areValidAddresses(ISetToken(_nextSet).getComponents()),
            "RebalancingSetToken.propose: Proposed set contains invalid component token"
        );

        // Check that the auction library is a valid priceLibrary tracked by Core
        require(
            coreInstance.validPriceLibraries(_auctionLibrary),
            "RebalancingSetToken.propose: Invalid or disabled PriceLibrary address"
        );

        // Check that time to pivot is greater than 6 hours
        require(
            _auctionTimeToPivot > factoryInstance.minimumTimeToPivot(),
            "RebalancingSetToken.propose: Time to pivot must be greater than minimum defined on factory"
        );

        // Check that time to pivot is less than 3 days
        require(
            _auctionTimeToPivot < factoryInstance.maximumTimeToPivot(),
            "RebalancingSetToken.propose: Time to pivot must be greater than maximum defined on factory"
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
