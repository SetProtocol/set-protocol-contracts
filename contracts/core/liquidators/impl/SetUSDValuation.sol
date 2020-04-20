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

import { ERC20Detailed } from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import { Math } from "openzeppelin-solidity/contracts/math/Math.sol";
import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { AddressArrayUtils } from "set-protocol-contract-utils/contracts/lib/AddressArrayUtils.sol";
import { IOracle } from "set-protocol-oracles/contracts/meta-oracles/interfaces/IOracle.sol";

import { ICore } from "../../interfaces/ICore.sol";
import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
import { IRebalancingSetTokenV2 } from "../../interfaces/IRebalancingSetTokenV2.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { SetMath } from "../../lib/SetMath.sol";


/**
 * @title SetUSDValuation
 * @author Set Protocol
 *
 * Utility functions to derive the USD value of a Set and its components
 */
library SetUSDValuation {
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    uint256 constant public SET_FULL_UNIT = 10 ** 18;

    /* ============ SetToken Valuation Helpers ============ */


    /**
     * Calculates value of RebalancingSetToken.
     *
     * @return uint256        Streaming fee
     */
    function calculateRebalancingSetValue(
        address _rebalancingSetTokenAddress,
        IOracleWhiteList _oracleWhitelist
    )
        internal
        view
        returns (uint256)
    {
        IRebalancingSetTokenV2 rebalancingSetToken = IRebalancingSetTokenV2(_rebalancingSetTokenAddress);

        uint256 unitShares = rebalancingSetToken.unitShares();
        uint256 naturalUnit = rebalancingSetToken.naturalUnit();
        ISetToken currentSet = rebalancingSetToken.currentSet();

        // Calculate collateral value
        uint256 collateralValue = calculateSetTokenDollarValue(
            currentSet,
            _oracleWhitelist
        );

        // Value of rebalancing set is collateralValue times unitShares divided by naturalUnit
        return collateralValue.mul(unitShares).div(naturalUnit);
    }

    /*
     * Calculates the USD Value of a full unit Set Token
     *
     * @param  _set                 Instance of SetToken
     * @param  _oracleWhiteList     Instance of oracle whitelist
     * @return uint256              The USD value of the Set (in cents)
     */
    function calculateSetTokenDollarValue(
        ISetToken _set,
        IOracleWhiteList _oracleWhitelist
    )
        internal
        view
        returns (uint256)
    {
        uint256 setDollarAmount = 0;

        address[] memory components = _set.getComponents();
        uint256[] memory units = _set.getUnits();
        uint256 naturalUnit = _set.naturalUnit();

        // Loop through assets
        for (uint256 i = 0; i < components.length; i++) {
            address currentComponent = components[i];

            address oracle = _oracleWhitelist.getOracleAddressByToken(currentComponent);
            uint256 price = IOracle(oracle).read();
            uint256 decimals = ERC20Detailed(currentComponent).decimals();

            // Calculate dollar value of single component in Set
            uint256 tokenDollarValue = calculateTokenAllocationAmountUSD(
                price,
                naturalUnit,
                units[i],
                decimals
            );

            // Add value of single component to running component value tally
            setDollarAmount = setDollarAmount.add(tokenDollarValue);
        }

        return setDollarAmount;
    }

    /*
     * Get USD value of one component in a Set to 18 decimals
     *
     * @param  _tokenPrice          The 18 decimal value of one full token
     * @param  _naturalUnit         The naturalUnit of the set being component belongs to
     * @param  _unit                The unit of the component in the set
     * @param  _tokenDecimal        The component token's decimal value
     * @return uint256              The USD value of the component's allocation in the Set
     */
    function calculateTokenAllocationAmountUSD(
        uint256 _tokenPrice,
        uint256 _naturalUnit,
        uint256 _unit,
        uint256 _tokenDecimal
    )
        internal
        pure
        returns (uint256)
    {
        uint256 tokenFullUnit = 10 ** _tokenDecimal;

        // Calculate the amount of component base units are in one full set token
        uint256 componentUnitsInFullToken = SetMath.setToComponent(
            SET_FULL_UNIT,
            _unit,
            _naturalUnit
        );
        
        // Return value of component token in one full set token, to 18 decimals
        uint256 allocationUSDValue = _tokenPrice
            .mul(componentUnitsInFullToken)
            .div(tokenFullUnit);

        require(
            allocationUSDValue > 0,
            "SetUSDValuation.calculateTokenAllocationAmountUSD: Value must be > 0"
        );

        return allocationUSDValue;
    }
}