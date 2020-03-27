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

import { SocialTradingLibrary } from "./SocialTradingLibrary.sol";
import { ISocialAllocator } from "./ISocialAllocator.sol";

import { IRebalancingSetTokenV2 } from "../../core/interfaces/IRebalancingSetTokenV2.sol";
import { ISetToken } from "../../core/interfaces/ISetToken.sol";

/**
 * @title SocialTradingManagerMock
 * @author Set Protocol
 *
 * Mock for SocialTradingManager to test viewer.
 */
contract SocialTradingManagerMock {
    mapping(address => SocialTradingLibrary.PoolInfo) public pools;

    function updateRecord(
        address _tradingPool,
        address _trader,
        ISocialAllocator _allocator,
        uint256 _currentAllocation
    )
        external
    {
        pools[_tradingPool].trader = _trader;
        pools[_tradingPool].allocator = _allocator;
        pools[_tradingPool].currentAllocation = _currentAllocation;
    }

    function rebalance(
        IRebalancingSetTokenV2 _tradingPool,
        ISetToken _nextSet,
        uint256 _newAllocation,
        bytes calldata _liquidatorData
    )
        external
    {
        _tradingPool.startRebalance(address(_nextSet), _liquidatorData);

        pools[address(_tradingPool)].currentAllocation = _newAllocation;
    }

    function updateFee(
        address _tradingPool,
        uint256 _newFee
    )
        external
    {
        pools[_tradingPool].newEntryFee = _newFee;
        pools[_tradingPool].feeUpdateTimestamp = block.timestamp;
    }
}
