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

import { IRebalancingSetToken } from "../../core/interfaces/IRebalancingSetToken.sol";

/**
 * @title PlaceBidMock
 * @author Set Protocol
 *
 * The PlaceBidMock
 */
contract PlaceBidMock
{
    address[] private storedCombinedTokenArray;
    uint256[] private inflowUnits;
    uint256[] private outflowUnits;

    /* ============ External Functions ============ */

    function mockPlaceBid(
        IRebalancingSetToken _rebalancingSetToken,
        uint256 _quantity
    )
        external
    {
        (
            address[] memory combinedTokenArray,
            uint256[] memory inflowUnitArray,
            uint256[] memory outflowUnitArray
        ) = _rebalancingSetToken.placeBid(_quantity);

        storedCombinedTokenArray = combinedTokenArray;
        inflowUnits = inflowUnitArray;
        outflowUnits = outflowUnitArray;
    }

    function getCombinedTokenArray()
        external
        view
        returns (address[] memory)
    {
        return storedCombinedTokenArray;
    }

    function getInflowUnits()
        external
        view
        returns (uint256[] memory)
    {
        return inflowUnits;
    }

    function getOutflowUnits()
        external
        view
        returns (uint256[] memory)
    {
        return outflowUnits;
    }
}
