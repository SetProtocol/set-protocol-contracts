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

pragma solidity 0.4.24;


import { SafeMath } from "zeppelin-solidity/contracts/math/SafeMath.sol";
import { ICoreIssuance } from "../interfaces/ICoreIssuance.sol";
import { CoreModifiers } from "../lib/CoreSharedModifiers.sol";


/**
 * @title CoreIssuanceOrder
 * @author Set Protocol
 *
 * The Core Issuance Order extension houses all functions related to the filling and
 * canceling issuance orders.
 *
 */
contract CoreIssuanceOrder is
    CoreModifiers,
    ICoreIssuance
{
    using SafeMath for uint256;

    function fillOrder(
        address _maker,
        address _setAddress,
        uint _quantity
    )
        public
        isValidSet(_setAddress)
        isPositiveQuantity(_quantity)
        isNaturalUnitMultiple(_quantity, _setAddress)
    {
        //Issue Set
        issueInternal(_maker, _setAddress, _quantity);
    }
}