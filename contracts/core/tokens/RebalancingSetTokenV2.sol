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

import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

import { ICore } from "../interfaces/ICore.sol";
import { ILiquidator } from "../interfaces/ILiquidator.sol";
import { IRebalancingSetFactory } from "../interfaces/IRebalancingSetFactory.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { IVault } from "../interfaces/IVault.sol";
import { IWhiteList } from "../interfaces/IWhiteList.sol";
import { RebalancingSetState } from "./rebalancing-libraries/RebalancingSetState.sol";
import { RebalancingSetLifecycle } from "./rebalancing-libraries/RebalancingSetLifecycle.sol";
import { RebalancingLibrary } from "../lib/RebalancingLibrary.sol";


/**
 * @title RebalancingSetTokenV2
 * @author Set Protocol
 *
 * Implementation of Rebalancing Set token.
 */
contract RebalancingSetTokenV2 is
    ERC20Detailed,
    RebalancingSetState,
    RebalancingSetLifecycle
{

    /* ============ Constructor ============ */

    /**
     * Constructor function for Rebalancing Set Token
     *
     * @param _factory                   Factory used to create the Rebalancing Set
     * @param _manager                   Manager of the Rebalancing Set
     * @param _initialSet                Initial set that collateralizes the Rebalancing set
     * @param _initialUnitShares         Units of currentSet that equals one share
     * @param _naturalUnit               The minimum multiple of Sets that can be issued or redeemed
     * @param _proposalPeriod            Amount of time for users to inspect a rebalance proposal
     * @param _rebalanceInterval         Minimum amount of time between rebalances
     * @param _componentWhiteList        Address of component WhiteList contract
     * @param _name                      The name of the new RebalancingSetTokenV2
     * @param _symbol                    The symbol of the new RebalancingSetTokenV2
     */

    constructor(
        IRebalancingSetFactory _factory,
        address _manager,
        ILiquidator _liquidator,
        ISetToken _initialSet,
        uint256 _initialUnitShares,
        uint256 _naturalUnit,
        uint256 _proposalPeriod,
        uint256 _rebalanceInterval,
        IWhiteList _componentWhiteList,
        string memory _name,
        string memory _symbol
    )
        public
        ERC20Detailed(
            _name,
            _symbol,
            18
        )
    {
        // Require initial unit shares is non-zero
        require(
            _initialUnitShares > 0,
            "RebalancingSetTokenV2.constructor: Unit shares must be positive"
        );

        require(
            _naturalUnit >= _factory.minimumNaturalUnit(),
            "RebalancingSetTokenV2.constructor: Natural Unit too low"
        );

        require(
            _naturalUnit <= _factory.maximumNaturalUnit(),
            "RebalancingSetTokenV2.constructor: Natural Unit too large"
        );

        // Require manager address is non-zero
        require(
            _manager != address(0),
            "RebalancingSetTokenV2.constructor: Invalid manager address"
        );

        // Require minimum rebalance interval and proposal period from factory
        require(
            _proposalPeriod >= _factory.minimumProposalPeriod(),
            "RebalancingSetTokenV2.constructor: Proposal period too short"
        );
        require(
            _rebalanceInterval >= _factory.minimumRebalanceInterval(),
            "RebalancingSetTokenV2.constructor: Rebalance interval too short"
        );

        // TODO: Check that the liquidator is valid
        liquidator = _liquidator;

        core = ICore(_factory.core());
        vault = IVault(core.vault());
        componentWhiteList = _componentWhiteList;
        factory = _factory;
        manager = _manager;
        currentSet = _initialSet;
        unitShares = _initialUnitShares;
        naturalUnit = _naturalUnit;

        proposalPeriod = _proposalPeriod;
        rebalanceInterval = _rebalanceInterval;
        lastRebalanceTimestamp = block.timestamp;
        rebalanceState = RebalancingLibrary.State.Default;
    }
}
