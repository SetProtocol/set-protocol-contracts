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
import { IOracle } from "set-protocol-strategies/contracts/meta-oracles/interfaces/IOracle.sol";

import { AddressArrayUtils } from "../../../lib/AddressArrayUtils.sol";
import { ICore } from "../../interfaces/ICore.sol";
import { IOracleWhiteList } from "../../interfaces/IOracleWhiteList.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";
import { SetTokenLibrary } from "../../lib/SetTokenLibrary.sol";


/**
 * @title SetValuation
 * @author Set Protocol
 *
 * Contract containing utility functions for liquidators that use auctions processes. Contains
 * helper functions to value collateral SetTokens and determine parameters used in bidding
 * processes. Meant to be inherited.
 */
contract SetValuation {
    using SafeMath for uint256;
    using AddressArrayUtils for address[];

    /* ============ SetToken Valuation Helpers ============ */

    /*
     * Calculates the USD Value of a Set Token
     *
     * @param  _setDetails          Struct containing pertinent details of Set
     * @param  _componentPrices     Array of prices for SetToken components
     * @return uint256              The USD value of the Set (in cents)
     */
    function calculateSetTokenDollarValue(
        ISetToken _set,
        IOracleWhitelist _oracleWhitelist
    )
        internal
        pure
        returns (uint256)
    {
        uint256 setDollarAmount = 0;

        SetTokenLibrary.SetDetails memory setDetails = SetTokenLibrary.getSetDetails(address(_set));

        // Loop through assets
        for (uint256 i = 0; i < components.length; i++) {
            address oracle = _oracleWhitelist.getOracle(address(_component));
            uint256 price = oracle.read();
            uint256 decimals = _component.decimals();

            // Calculate dollar value of single component in Set
            uint256 tokenDollarValue = calculateTokenAllocationAmountUSD(
                price,
                setDetails.naturalUnit,
                setDetails.units[i],
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
        uint256 SET_TOKEN_DECIMALS = 18;

        // Calculate the amount of component base units are in one full set token
        uint256 componentUnitsInFullToken = _unit
            .mul(10 ** SET_TOKEN_DECIMALS)
            .div(_naturalUnit);
        
        // Return value of component token in one full set token, to 18 decimals
        uint256 allocationUSDValue = _tokenPrice
            .mul(componentUnitsInFullToken)
            .div(10 ** _tokenDecimal);

        require(
            allocationUSDValue > 0,
            "SetValuation.calculateTokenAllocationAmountUSD: Value must be > 0"
        );

        return allocationUSDValue;
    }
}