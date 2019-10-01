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

import { ISetToken } from "../../core/interfaces/ISetToken.sol";
import { ILiquidator } from "../../core/interfaces/ILiquidator.sol";

/**
 * @title LiquidatorMock
 * @author Set Protocol
 *
 * The LiquidatorMock
 */
contract LiquidatorMock is
    ILiquidator
{

    ISetToken public currentSet;
    ISetToken public nextSet;


    /* ============ External Functions ============ */

    function processProposal(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        external
    {
        currentSet = _currentSet;
        nextSet = _nextSet;

        // Mock should..
            // Set the currentSet/nextSet as needed
            // Calculate the combinedTokenArray
    }

    function getBidPrice(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory);

    function placeBid(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory);

    function startRebalance(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external;

    function settleRebalance()
        external;

    function endFailedRebalance()
        external
        returns (bool);
}
