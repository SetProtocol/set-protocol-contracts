/*
    Copyright 2019 Set Labs Inc.

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

import { ISocialTradingManager } from "set-protocol-strategies/contracts/managers/interfaces/ISocialTradingManager.sol";
import { SocialTradingLibrary } from "set-protocol-strategies/contracts/managers/lib/SocialTradingLibrary.sol";

import { IFeeCalculator } from "../../core/interfaces/IFeeCalculator.sol";
import { IRebalancingSetTokenV2 } from "../../core/interfaces/IRebalancingSetTokenV2.sol";
import { RebalancingLibrary } from "../../core/lib/RebalancingLibrary.sol";
import { ISetToken } from "../../core/interfaces/ISetToken.sol";


/**
 * @title TradingPoolViewer
 * @author Set Protocol
 *
 * Interfaces for fetching multiple TradingPool state in a single read. Includes state
 * specific to managing pool as well as underlying RebalancingSetTokenV2 state.
 */
contract TradingPoolViewer {

    struct RebalancingSetInfo {
        address manager;
        address feeRecipient;
        ISetToken currentSet;
        IFeeCalculator rebalanceFeeCalculator;
        uint256 unitShares;
        uint256 naturalUnit;
        uint256 rebalanceInterval;
        uint256 entryFee;
        uint256 lastRebalanceTimestamp;
        RebalancingLibrary.State rebalanceState;
        string name;
        string symbol;
    }

    struct CollateralSetInfo {
        address[] components;
        uint256[] units;
        uint256 naturalUnit;      
    }

    function fetchNewTradingPoolDetails(
        IRebalancingSetTokenV2 _tradingPool
    )
        external
        returns (SocialTradingLibrary.PoolInfo memory, RebalancingSetInfo memory, CollateralSetInfo memory)
    {
        RebalancingSetInfo memory rebalancingSetInfo = RebalancingSetInfo({
            manager: _tradingPool.manager(),
            feeRecipient: _tradingPool.feeRecipient(),
            currentSet: _tradingPool.currentSet(),
            rebalanceFeeCalculator: _tradingPool.rebalanceFeeCalculator(),
            unitShares: _tradingPool.unitShares(),
            naturalUnit: _tradingPool.naturalUnit(),
            rebalanceInterval: _tradingPool.rebalanceInterval(),
            entryFee: _tradingPool.entryFee(),
            lastRebalanceTimestamp: _tradingPool.lastRebalanceTimestamp(),
            rebalanceState: _tradingPool.rebalanceState(),
            name: _tradingPool.name(),
            symbol: _tradingPool.symbol()
        });

        SocialTradingLibrary.PoolInfo memory poolInfo = ISocialTradingManager(rebalancingSetInfo.manager).pools(
            address(_tradingPool)
        );

        ISetToken collateralInstance = rebalancingSetInfo.currentSet;

        CollateralSetInfo memory collateralSetInfo = CollateralSetInfo({
            components: collateralInstance.getComponents(),
            units: collateralInstance.getUnits(),
            naturalUnit: collateralInstance.naturalUnit()
        });

        return (poolInfo, rebalancingSetInfo, collateralSetInfo);
    }
}
