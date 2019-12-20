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

import { CommonMath } from "../../lib/CommonMath.sol";
import { ICore } from "../interfaces/ICore.sol";
import { IFeeCalculator } from "../interfaces/IFeeCalculator.sol";
import { SetTokenLibrary } from "../lib/SetTokenLibrary.sol";


/**
 * @title FixedRebalanceFeeCalculator
 * @author Set Protocol
 *
 * 
 */

contract FixedRebalanceFeeCalculator is IFeeCalculator {
    using SafeMath for uint256;

    uint256 public constant ONE_BASIS_POINT = 10 ** 14;

    ICore public core;
    mapping(address => uint256) public fees;

    /* ============ Modifier ============ */
    modifier onlyValidSet() {
        SetTokenLibrary.requireValidSet(core, msg.sender);
        _;
    }

    constructor(ICore _core) public {
        core = _core;
    }

    /* ============ External Functions ============ */

    function initialize(
        bytes calldata _feeCalculatorData
    )
        external
    {
        // Issue: can be called by random people
        // Can only be initialized once by the msg.sender not the function

        uint256 rebalanceFee = parseFeeCalculatorData(_feeCalculatorData);

        validateRebalanceFee(rebalanceFee);
        
        fees[msg.sender] = rebalanceFee;
    }

    /**
     *
     */
     // Do we need to validate that it is a valid Set?
    function getFee()
        external
        view
        onlyValidSet
        returns(uint256)
    {
        return fees[msg.sender];
    }

    /* ============ Private Functions ============ */

    function validateRebalanceFee(
        uint256 _rebalanceFee
    )
        internal
        view
    {
        // Value is equal or less than 100%
        require(
            _rebalanceFee <= CommonMath.scaleFactor(),
            "Fee must be equal or less than 100%"
        );

        // Validate fee is a multiple of 10^15 or 0.01%
        require(
            _rebalanceFee.mod(ONE_BASIS_POINT) == 0,
            "Fee must be multiple of 0.01%"
        );
    }


    function parseFeeCalculatorData(
        bytes memory _feeCalculatorData
    )
        private
        pure
        returns (uint256)
    {
        uint256 rebalanceFee;

        assembly {
            rebalanceFee := mload(add(_feeCalculatorData, 32))
        }

        return rebalanceFee;
    }
}
