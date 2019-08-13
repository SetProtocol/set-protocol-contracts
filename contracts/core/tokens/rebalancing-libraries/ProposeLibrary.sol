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

pragma solidity 0.5.7;
pragma experimental "ABIEncoderV2";

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { IAuctionPriceCurve } from "../../lib/auction-price-libraries/IAuctionPriceCurve.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { IRebalancingSetFactory } from "../../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IWhiteList } from "../../interfaces/IWhiteList.sol";
import { RebalancingLibrary } from "../../lib/RebalancingLibrary.sol";


/**
 * @title ProposeLibrary
 * @author Set Protocol
 *
 * Default implementation of Rebalancing Set Token propose function
 */
library ProposeLibrary {
    using SafeMath for uint256;

    /* ============ Structs ============ */

    struct ProposalContext {
        address manager;
        address currentSet;
        address coreAddress;
        address componentWhitelist;
        address factoryAddress;
        uint256 lastRebalanceTimestamp;
        uint256 rebalanceInterval;
        uint8 rebalanceState;
    }

    /* ============ Internal Functions ============ */

    /**
     * Function used to validate inputs to propose function
     *
     * @param _nextSet                    The Set to rebalance into
     * @param _auctionLibrary             The library used to calculate the Dutch Auction price
     * @param _proposalContext            Rebalancing Set Token state parameters needed for proposal validation
     */
    function validateProposal(
        address _nextSet,
        address _auctionLibrary,
        ProposalContext memory _proposalContext,
        RebalancingLibrary.AuctionPriceParameters memory _auctionPriceParameters
    )
        public
    {
        ICore coreInstance = ICore(_proposalContext.coreAddress);
        IRebalancingSetFactory factoryInstance = IRebalancingSetFactory(_proposalContext.factoryAddress);

        // Make sure it is manager that is proposing the rebalance
        require(
            msg.sender == _proposalContext.manager,
            "ProposeLibrary.validateProposal: Sender must be manager"
        );

        // New Proposal can only be made in Default and Proposal state
        require(
            _proposalContext.rebalanceState == uint8(RebalancingLibrary.State.Default) ||
            _proposalContext.rebalanceState == uint8(RebalancingLibrary.State.Proposal),
            "ProposeLibrary.validateProposal: State must be in Propose or Default"
        );

        // Make sure enough time has passed from last rebalance to start a new proposal
        require(
            block.timestamp >= _proposalContext.lastRebalanceTimestamp.add(
                _proposalContext.rebalanceInterval
            ),
            "ProposeLibrary.validateProposal: Rebalance interval not elapsed"
        );

        // Check that new proposed Set is valid Set created by Core
        require(
            coreInstance.validSets(_nextSet),
            "ProposeLibrary.validateProposal: Invalid or disabled proposed SetToken address"
        );

        // Check proposed components on whitelist. This is to ensure managers are unable to add contract addresses
        // to a propose that prohibit the set from carrying out an auction i.e. a token that only the manager possesses
        require(
            IWhiteList(
                _proposalContext.componentWhitelist
            ).areValidAddresses(ISetToken(_nextSet).getComponents()),
            "ProposeLibrary.validateProposal: Proposed set contains invalid component token"
        );

        // Check that the auction library is a valid priceLibrary tracked by Core
        require(
            coreInstance.validPriceLibraries(_auctionLibrary),
            "ProposeLibrary.validateProposal: Invalid or disabled PriceLibrary address"
        );

        // Check that auctionTimeToPivot is greater than or equal to 6 hours
        require(
            _auctionPriceParameters.auctionTimeToPivot >= factoryInstance.minimumTimeToPivot(),
            "ProposeLibrary.validateProposal: Time to pivot must be greater than minimum"
        );

        // Check that auctionTimeToPivot is less than or equal to 3 days
        require(
            _auctionPriceParameters.auctionTimeToPivot <= factoryInstance.maximumTimeToPivot(),
            "ProposeLibrary.validateProposal: Time to pivot must be greater than maximum"
        );

        // Check that the proposed set natural unit is a multiple of current set natural unit, or vice versa.
        // Done to make sure that when calculating token units there will are no rounding errors.
        uint256 currentNaturalUnit = ISetToken(_proposalContext.currentSet).naturalUnit();
        uint256 nextSetNaturalUnit = ISetToken(_nextSet).naturalUnit();
        require(
            Math.max(currentNaturalUnit, nextSetNaturalUnit).mod(
                Math.min(currentNaturalUnit, nextSetNaturalUnit)
            ) == 0,
            "ProposeLibrary.validateProposal: Invalid proposed Set natural unit"
        );

        // Check that pivot price is compliant with library restrictions
        IAuctionPriceCurve(_auctionLibrary).validateAuctionPriceParameters(
            _auctionPriceParameters
        );
    }
}
