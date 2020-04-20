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

import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";

import { ISetToken } from "../../core/interfaces/ISetToken.sol";
import { ILiquidator } from "../../core/interfaces/ILiquidator.sol";
import { Rebalance } from "../../core/lib/Rebalance.sol";
import { RebalancingLibrary } from "../../core/lib/RebalancingLibrary.sol";

/**
 * @title LiquidatorMock
 * @author Set Protocol
 *
 */
contract LiquidatorMock is
    ILiquidator
{
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    // Legacy Data
    RebalancingLibrary.AuctionPriceParameters private auctionPriceParams;

    uint256 constant public priceDivisor = 1000;
    uint256 public priceNumerator = 1000;

    ISetToken public currentSet;
    ISetToken public nextSet;

    uint256 private _minimumBid;

    uint256 public startRebalanceTime;
    uint256 private _startingCurrentSetAmount;
    uint256 private _remainingCurrentSets;

    address[] private _combinedTokenArray;
    uint256[] private _combinedCurrentUnits;
    uint256[] private _combinedNextSetUnits;

    uint256 public placeBidQuantity;

    bool public hasSettled;
    bool public hasFailed;
    bool public endFailedRebalanceHasBeenCalled;

    bytes public liquidatorData;

    /* ============ External Functions ============ */

    function getBidPrice(
        address _set,
        uint256 _quantity
    )
        external
        view
        returns (Rebalance.TokenFlow memory)
    {
        uint256[] memory inflowUnits = getInflowTokenTransferValues(nextSet, _quantity, _combinedNextSetUnits);
        uint256[] memory outflowUnits = getTransferValues(currentSet, _quantity, _combinedCurrentUnits);

        return Rebalance.composeTokenFlow(
            _combinedTokenArray,
            inflowUnits,
            outflowUnits
        );        
    }

    function placeBid(
        uint256 _quantity
    )
        external
        returns (Rebalance.TokenFlow memory)
    {
        placeBidQuantity = _quantity;

        // Subtract remaining Sets
        _remainingCurrentSets = _remainingCurrentSets.sub(_quantity);

        // Inflow = quantity (currentSet) * units / naturalUnit
        uint256[] memory inflowUnits = getInflowTokenTransferValues(nextSet, _quantity, _combinedNextSetUnits);
        uint256[] memory outflowUnits = getTransferValues(currentSet, _quantity, _combinedCurrentUnits);

        return Rebalance.composeTokenFlow(
            _combinedTokenArray,
            inflowUnits,
            outflowUnits
        );
    }

    function startRebalance(
        ISetToken _currentSet,
        ISetToken _nextSet,
        uint256 startingCurrentSetAmount_,
        bytes calldata _liquidatorData
    )
        external
    {
        liquidatorData = _liquidatorData;

        currentSet = _currentSet;
        nextSet = _nextSet;

        startRebalanceTime = block.timestamp;
        _startingCurrentSetAmount = startingCurrentSetAmount_;
        _remainingCurrentSets = _startingCurrentSetAmount;

        _minimumBid = calculateMinimumBid(_currentSet, _nextSet);

        // Set the combined token array
        address[] memory currentSetComponents = _currentSet.getComponents();
        address[] memory nextSetComponents = _nextSet.getComponents();
        _combinedTokenArray = currentSetComponents.union(nextSetComponents);

        _combinedCurrentUnits = getCombinedUnitsArray(_currentSet, _combinedTokenArray);
        _combinedNextSetUnits = getCombinedUnitsArray(_nextSet, _combinedTokenArray);
    }

    function setAuctionPriceParameters(
        uint256 _auctionStartTime,
        uint256 _auctionTimeToPivot,
        uint256 _auctionStartPrice,
        uint256 _auctionPivotPrice
    ) external {
        auctionPriceParams.auctionStartTime = _auctionStartTime;
        auctionPriceParams.auctionTimeToPivot = _auctionTimeToPivot;
        auctionPriceParams.auctionStartPrice = _auctionStartPrice;
        auctionPriceParams.auctionPivotPrice = _auctionPivotPrice;
    }

    function settleRebalance() external {
        hasSettled = true;
    }

    function hasRebalanceFailed(address _set) external view returns (bool) {
        return hasFailed;
    }

    function endFailedRebalance() external {
        endFailedRebalanceHasBeenCalled = true;
    }

    /* ============ Setter Functions ============ */

    function setHasFailed(bool _hasFailed) external {
        hasFailed = _hasFailed;
    }

    function setPriceNumerator(uint256 _priceNumerator) external {
        priceNumerator = _priceNumerator;
    }

    /* ============ Getter Functions ============ */

    function auctionPriceParameters(address _set)
        external
        view
        returns (RebalancingLibrary.AuctionPriceParameters memory)
    {
        return auctionPriceParams;
    }

    function getAuctionPriceParameters(address _set)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory auctionParams = new uint256[](4);
        auctionParams[0] = auctionPriceParams.auctionStartTime;
        auctionParams[1] = auctionPriceParams.auctionTimeToPivot;
        auctionParams[2] = auctionPriceParams.auctionStartPrice;
        auctionParams[3] = auctionPriceParams.auctionPivotPrice;
        return auctionParams;
    }

    function minimumBid(address _set) external view returns (uint256) {
        return _minimumBid;
    }

    function remainingCurrentSets(address _set) external view returns (uint256) {
        return _remainingCurrentSets;
    }

    function startingCurrentSets(address _set) external view returns (uint256) {
        return _startingCurrentSetAmount;
    }

    function getCombinedTokenArray(address _set) external view returns (address[] memory) {
        return _combinedTokenArray;
    }
 
    function getCombinedCurrentSetUnits(address _set) external view returns (uint256[] memory) {
        return _combinedCurrentUnits;
    }

    function getCombinedNextSetUnits(address _set) external view returns (uint256[] memory) {
        return _combinedNextSetUnits;
    }

    /* ============ Private Functions ============ */

    function getCombinedUnitsArray(
        ISetToken _setToken,
        address[] memory combinedTokenArray_
    )
        private
        view
        returns (uint256[] memory)
    {
        uint256[] memory combinedUnits = new uint256[](combinedTokenArray_.length);

        for (uint256 i = 0; i < combinedTokenArray_.length; i++) {
            address currentComponent = combinedTokenArray_[i];

            (uint256 indexCurrent, bool isComponent) = _setToken.getComponents().indexOf(currentComponent);

            combinedUnits[i] = isComponent ? _setToken.getUnits()[indexCurrent] : 0;
        }

        return combinedUnits;
    }

    function getInflowTokenTransferValues(
        ISetToken _setToken,
        uint256 _quantity,
        uint256[] memory _combinedUnits        
    )
        private
        view
        returns(uint256[] memory)
    {
        uint256[] memory unpricedInflowTokens = getTransferValues(
            _setToken,
            _quantity,
            _combinedUnits
        );

        for (uint256 i = 0; i < unpricedInflowTokens.length; i++) {
            unpricedInflowTokens[i] = unpricedInflowTokens[i].mul(priceNumerator).div(priceDivisor);
        }

        return unpricedInflowTokens;
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
