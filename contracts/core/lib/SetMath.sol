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

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title SetMath
 * @author Set Protocol
 */
library SetMath {
    using SafeMath for uint256;

    
    /**
     * Converts SetToken quantity to component quantity
     */
    function setToComponent(
        uint256 _setQuantity,
        uint256 _componentUnit,
        uint256 _naturalUnit
    ) 
        internal
        pure
        returns(uint256)
    {
        return _setQuantity.mul(_componentUnit).div(_naturalUnit);
    }

    /**
     * Converts component quantity to Set quantity
     */
    function componentToSet(
        uint256 _componentQuantity,
        uint256 _componentUnit,
        uint256 _naturalUnit
    ) 
        internal
        pure
        returns(uint256)
    {
        return _componentQuantity.mul(_naturalUnit).div(_componentUnit);
    }
}