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

pragma solidity 0.5.4;

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";


library ArrayValidations {
    using SafeMath for uint256;

    /**
     * Calculates and returns the maximum value for a uint256
     *
     * @return  The maximum value for uint256
     */
    function validateNonEmpty(
        address[] memory _arr1
    )
        public
        pure
    {
        require(
            _arr1.length > 0,
            "Address array length must be > 0"
        ); 
    }

    function validateEqualLength(
        address[] memory _addressArray,
        uint256[] memory _uint256Array
    )
        public
        pure
    {
        require(
            _addressArray.length == _uint256Array.length,
            "Input length mismatch"
        );
    }
}

