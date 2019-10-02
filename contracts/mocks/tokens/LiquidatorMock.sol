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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

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
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    uint256 constant public priceDivisor = 1000;

    ISetToken public currentSet;
    ISetToken public nextSet;

    
    uint256 public minimumBid;

    uint256 public startRebalanceTime;
    uint256 public startingCurrentSetQuantity;
    uint256 public remainingCurrentSets;

    ISetToken public startRebalanceCurrentSet;
    ISetToken public startRebalanceNextSet;

    address[] public combinedTokenArray;
    uint256[] public combinedCurrentUnits;
    uint256[] public combinedNextSetUnits;

    uint256 public placeBidQuantity;

    bool public hasSettled;
    bool public hasFailed;
    bool public endFailedRebalanceHasBeenCalled;

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

    function getBidPrice(
        uint256 _quantity
    )
        external
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        uint256[] memory inflowUnits = getTransferValues(nextSet, _quantity, combinedNextSetUnits);
        uint256[] memory outflowUnits = getTransferValues(currentSet, _quantity, combinedCurrentUnits);

        return (
            combinedTokenArray,
            inflowUnits,
            outflowUnits
        );        
    }

    function placeBid(
        uint256 _quantity
    )
        external
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        placeBidQuantity = _quantity;

        // Subtract remaining Sets
        remainingCurrentSets = remainingCurrentSets.sub(_quantity);

        // Inflow = quantity (currentSet) * units / naturalUnit
        uint256[] memory inflowUnits = getTransferValues(nextSet, _quantity, combinedNextSetUnits);
        uint256[] memory outflowUnits = getTransferValues(currentSet, _quantity, combinedCurrentUnits);

        return (
            combinedTokenArray,
            inflowUnits,
            outflowUnits
        );
    }

    function startRebalance(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 _startingCurrentSetQuantity
    )
        external
    {
        startRebalanceNextSet = _nextSet;
        startRebalanceCurrentSet = _currentSet;

        startRebalanceTime = block.timestamp;
        startingCurrentSetQuantity = _startingCurrentSetQuantity;
        remainingCurrentSets = startingCurrentSetQuantity;

        minimumBid = calculateMinimumBid(currentSet, nextSet);

        // Set the combined token array
        address[] memory currentSetComponents = _currentSet.getComponents();
        address[] memory nextSetComponents = _nextSet.getComponents();
        combinedTokenArray = currentSetComponents.union(nextSetComponents);

        combinedCurrentUnits = getCombinedUnitsArray(_currentSet, combinedTokenArray);
        combinedNextSetUnits = getCombinedUnitsArray(_nextSet, combinedTokenArray);
    }

    function settleRebalance()
        external
    {
        hasSettled = true;
    }

    function setHasFailed(bool _hasFailed)
        external
    {
        hasFailed = _hasFailed;
    }

    function endFailedRebalance()
        external
        returns (bool)
    {
        endFailedRebalanceHasBeenCalled = true;

        return hasFailed;
    }

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

    function getTransferValues(
        ISetToken _setToken,
        uint256 _quantity,
        uint256[] memory _combinedUnits
    ) 
        private
        view
        returns (uint256[] memory)
    {
        uint256 naturalUnit = _setToken.naturalUnit();

        uint256[] memory transferValues = new uint256[](_combinedUnits.length);

        for (uint256 i = 0; i < _combinedUnits.length; i++) {
            transferValues[i] = _quantity.mul(_combinedUnits[i]).div(naturalUnit);
        }

        return transferValues;
    }

    function calculateMinimumBid(
        ISetToken _currentSet,
        ISetToken _nextSet
    )
        private
        view
        returns (uint256)
    {
        uint256 currentSetNaturalUnit = _currentSet.naturalUnit();
        uint256 nextSetNaturalUnit = _nextSet.naturalUnit();

        return Math.max(
            currentSetNaturalUnit.mul(priceDivisor),
            nextSetNaturalUnit.mul(priceDivisor)
        );
    }
}
