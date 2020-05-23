/*
    Copyright 2020 Set Labs Inc.

    Licensed under the Apache License,
        Version 2.0 (the "License");
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
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";
import { IOracle } from "set-protocol-oracles/contracts/meta-oracles/interfaces/IOracle.sol";

import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
import { SetUSDValuation } from "../impl/SetUSDValuation.sol";


/**
 * @title LiquidatorUtils
 * @author Set Protocol
 *
 * Contract of generic utils functions that can be used by liquidators and supporting contracts.
 */
library LiquidatorUtils {
    using SafeMath for uint256;
    using CommonMath for uint256;

    /* ============ Internal Functions ============ */

    /**
     * Calculate the rebalance volume as the difference in allocation percentages between two, tw0-asset
     * allocations times market cap. This function only works for Sets containing the two same assets,
     * either explicitly or implicitly (one of the Sets has 0 allocation for one of the assets).
     *
     * rebalanceVolume = currentSetValue * currentSetQty * abs(currentSetAllocation-nextSetAllocation)
     *
     * @param _currentSet               The Set to rebalance from
     * @param _nextSet                  The Set to rebalance to
     * @param _oracleWhiteList          OracleWhiteList used for valuation
     * @param _currentSetQuantity       Quantity of currentSet to rebalance
     * @return                          Rebalance volume
     */
    function calculateRebalanceVolume(
        ISetToken _currentSet,
        ISetToken _nextSet,
        IOracleWhiteList _oracleWhiteList,
        uint256 _currentSetQuantity
    )
        internal
        view
        returns (uint256)
    {
        // Calculate currency value of current set
        uint256 currentSetValue = SetUSDValuation.calculateSetTokenDollarValue(
            _currentSet,
            _oracleWhiteList
        );

        // Calculate allocationAsset's current set allocation in 18 decimal scaled percentage
        address allocationAsset = _currentSet.getComponents()[0];
        uint256 currentSetAllocation = calculateAssetAllocation(
            _currentSet,
            _oracleWhiteList,
            allocationAsset
        );

        // Calculate allocationAsset's next set allocation in 18 decimal scaled percentage. If asset is not
        // in nextSet, returns 0.
        uint256 nextSetAllocation = calculateAssetAllocation(
            _nextSet,
            _oracleWhiteList,
            allocationAsset
        );

        // Get allocation change
        uint256 allocationChange = currentSetAllocation > nextSetAllocation ?
            currentSetAllocation.sub(nextSetAllocation) :
            nextSetAllocation.sub(currentSetAllocation);

        // Return rebalance volume by multiplying allocationChange by Set market cap, deScaling to avoid
        // overflow potential, still have 18 decimals of precision
        return currentSetValue.mul(_currentSetQuantity).deScale().mul(allocationChange).deScale();
    }

    /**
     * Calculate the allocation percentage of passed asset in Set
     *
     * @param  _setToken            Set being evaluated
     * @param  _oracleWhiteList     OracleWhiteList used for valuation
     * @param  _asset               Asset that's allocation being calculated
     * @return                      18 decimal scaled allocation percentage
     */
    function calculateAssetAllocation(
        ISetToken _setToken,
        IOracleWhiteList _oracleWhiteList,
        address _asset
    )
        internal
        view
        returns (uint256)
    {
        address[] memory components = _setToken.getComponents();

        // Get index of asset and return if asset in Set
        (
            uint256 assetIndex,
            bool isInSet
        ) = AddressArrayUtils.indexOf(components, _asset);

        // Calculate allocation of asset if multiple assets and asset is in Set
        if (isInSet && components.length > 1) {
            uint256 setNaturalUnit = _setToken.naturalUnit();
            uint256[] memory setUnits = _setToken.getUnits();

            uint256 assetValue;
            uint256 setValue = 0;
            for (uint256 i = 0; i < components.length; i++) {
                address currentComponent = components[i];

                address oracle = _oracleWhiteList.getOracleAddressByToken(currentComponent);
                uint256 price = IOracle(oracle).read();
                uint256 decimals = ERC20Detailed(currentComponent).decimals();

                // Calculate currency value of single component in Set
                uint256 componentValue = SetUSDValuation.calculateTokenAllocationAmountUSD(
                    price,
                    setNaturalUnit,
                    setUnits[i],
                    decimals
                );

                // Add currency value of single component to running currency value tally
                setValue = setValue.add(componentValue);
                if (i == assetIndex) {assetValue = componentValue;}
            }

            return assetValue.scale().div(setValue);
        } else {
            // Since Set only has one asset, if its included then must be 100% else 0%
            return isInSet ? CommonMath.scaleFactor() : 0;
        }
    }
}