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
import { IRebalancingSetToken } from "../../core/interfaces/IRebalancingSetToken.sol";
import { RebalancingHelperLibrary } from "../../core/lib/RebalancingHelperLibrary.sol";


/**
 * @title LinearAuctionPriceCurve
 * @author Set Protocol
 *
 * Contract used to manage a Rebalancing Set Token
 */
contract RebalancingTokenManager {

    using SafeMath for uint256;

    /* ============ State Variabales ============ */

    address btcPriceFeedAddress;
    address ethPriceFeedAddress;

    address auctionLibrary;
    uint256 auctionTimeToPivot;

    /* ============ Constructor ============ */

    constructor(
        address _auctionLibrary,
        uint256 _auctionTimeToPivot
    )
        public
    {
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

        // Create new Set Token that collateralizes Rebalancing Set Token
        (
            address nextSetAddress,
            uint256 auctionPivotPrice
        ) = createNewAllocationSetToken(btcPrice, ethPrice);

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

    }

    function createNewAllocationSetToken(
        uint256 btcPrice,
        uint256 ethPrice
    )
        private
        returns (address, uint256)
    {
        // Require that allocation has changed sufficiently enough to justify rebalance
    }
}