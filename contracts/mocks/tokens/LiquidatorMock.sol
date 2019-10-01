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
import { AddressArrayUtils } from "../../lib/AddressArrayUtils.sol";

/**
 * @title LiquidatorMock
 * @author Set Protocol
 *
 * The LiquidatorMock
 */
contract LiquidatorMock
    // ILiquidator
{
    using AddressArrayUtils for address[];

    ISetToken public currentSet;
    ISetToken public nextSet;

    uint256 public startRebalanceTime;
    uint256 public startingCurrentSetQuantity;

    address public startRebalanceCurrentSet;
    address public startRebalanceNextSet;

    address[] public combinedTokenArray;
    uint256[] public combinedCurrentUnits;
    uint256[] public combinedNextSetUnits;


    /* ============ External Functions ============ */

    function processProposal(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        external
    {
        currentSet = _currentSet;
        nextSet = _nextSet;
    }

    // function getBidPrice(
    //     uint256 _quantity
    // )
    //     external
    //     returns (address[] memory, uint256[] memory, uint256[] memory);

    // function placeBid(
    //     uint256 _quantity
    // )
    //     external
    //     returns (address[] memory, uint256[] memory, uint256[] memory);

    function startRebalance(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
    {
        startRebalanceTime = block.timestamp;
        startingCurrentSetQuantity = _startingCurrentSetQuantity;

        // Set the combined token array
        address[] memory currentSetComponents = _currentSet.getComponents();
        address[] memory nextSetComponents = _nextSet.getComponents();
        combinedTokenArray = currentSetComponents.union(nextSetComponents);

        combinedCurrentUnits = getCombinedUnitsArray(_currentSet, combinedTokenArray);
        combinedNextSetUnits = getCombinedUnitsArray(_nextSet, combinedTokenArray);
    }

    // function settleRebalance()
    //     external;

    // function endFailedRebalance()
    //     external
    //     returns (bool);

    function getCombinedTokenArray()
        external
        view
        returns (address[] memory)
    {
        return combinedTokenArray;
    }

    function getCombinedCurrentUnits()
        external
        view
        returns (uint256[] memory)
    {
        return combinedCurrentUnits;
    }

    function getCombinedNextSetUnits()
        external
        view
        returns (uint256[] memory)
    {
        return combinedNextSetUnits;
    }

    function getCombinedUnitsArray(
        ISetToken _setToken,
        address[] memory _combinedTokenArray
    )
        private
        returns (uint256[] memory)
    {
        uint256[] memory combinedUnits = new uint256[](_combinedTokenArray.length);

        for (uint256 i = 0; i < _combinedTokenArray.length; i++) {
            address currentComponent = _combinedTokenArray[i];

            (uint256 indexCurrent, bool isComponent) = _setToken.getComponents().indexOf(currentComponent);

            combinedUnits[i] = isComponent ? _setToken.getUnits()[indexCurrent] : 0;
        }

        return combinedUnits;
    }
}
