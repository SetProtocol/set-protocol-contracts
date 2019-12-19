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

import { ICore } from "../interfaces/ICore.sol";
import { IFeeCalculator } from "../interfaces/IFeeCalculator.sol";
// import { LibBytes } from "../external/0x/LibBytes.sol";
import { SetTokenLibrary } from "../lib/SetTokenLibrary.sol";


/**
 * @title FixedRebalanceFeeCalculator
 * @author Set Protocol
 *
 * The transferProxy contract is responsible for moving tokens through the system to
 * assist with issuance and usage from modules.
 */

contract FixedRebalanceFeeCalculator is IFeeCalculator {
    // using LibBytes for bytes;
    using SafeMath for uint256;

    ICore public core;
    mapping(address => uint256) public fees;

    /* ============ Modifier ============ */
    modifier isValidSet() {
        // TODO - Add test for SetTokenLibrary
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
        isValidSet
    {
        // Can only be initialized once

        uint256 rebalanceFee = parseFeeCalculatorData(_feeCalculatorData);

        validateRebalanceFee(rebalanceFee);
        
        fees[msg.sender] = rebalanceFee;
    }

    /**
     *
     */
    function getFeeScaled()
        external
        view
        isValidSet
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
        // Validate fees are greater than 0, multiple of 10^15, less than scaled value
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
            // mstore(rebalanceFee, mload(_feeCalculatorData.contentAddress()))
            rebalanceFee := mload(add(_feeCalculatorData, 32))
        }

        return rebalanceFee;
    }
}
