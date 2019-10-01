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
pragma experimental "ABIEncoderV2";

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

import { ISetToken } from "../../interfaces/ISetToken.sol";
import { IVault } from "../../interfaces/IVault.sol";


/**
 * @title RebalancingLifecycleLibrary
 * @author Set Protocol
 *
 * This library contains functions and structs to assist with parsing exchange orders data
 */
library RebalancingLifecycleLibrary {
    using SafeMath for uint256;

    /**
     * 
     *
     */
    function calculateStartingSetQuantity(
        IVault _vault,
        ISetToken _currentSet
    )
        internal
        view
        returns (uint256)
    {
        // Get startingCurrentSets and make it divisible by currentSet natural unit
        uint256 currentSetBalance = _vault.getOwnerBalance(address(_currentSet), address(this));

        // Calculates the set's natural unit
        uint256 currentSetNaturalUnit = _currentSet.naturalUnit();

        // Rounds the redemption quantity to a multiple of the current Set natural unit and sets variable
        return currentSetBalance.div(currentSetNaturalUnit).mul(currentSetNaturalUnit);
    }
}
