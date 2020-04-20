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
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";
import { ScaleValidations } from "set-protocol-contract-utils/contracts/lib/ScaleValidations.sol";

import { ICore } from "../interfaces/ICore.sol";
import { IFeeCalculator } from "../interfaces/IFeeCalculator.sol";
import { SetTokenLibrary } from "../lib/SetTokenLibrary.sol";


/**
 * @title FixedFeeCalculator
 * @author Set Protocol
 *
 * Smart contract that stores and returns fees (represented as scaled decimal values).
 * Meant to be used with a RebalancingSetTokenV2
 */
contract FixedFeeCalculator is IFeeCalculator {
    using SafeMath for uint256;

    /* ============ State Variables ============ */

    // Mapping between an address and its initialization state
    mapping(address => bool) public isInitialized;

    // Mapping between an address and its current fee
    mapping(address => uint256) public fees;

    /* ============ External Functions ============ */

    /**
     * Initializes the rebalance fee for the caller. Fee is represented as a scaled decimal value.
     * (e.g. 1% = 10 ** 18, 0.1% = 10 ** 17)
     * Intended to be called by a RebalancingSetTokenV2 during initialization.
     *
     * @param _feeCalculatorData       Bytes encoded data about the fee for the sender
     */
    function initialize(
        bytes calldata _feeCalculatorData
    )
        external
    {
        // Sender fee must not already be initialized
        require(!isInitialized[msg.sender], "Must not be initialized");

        uint256 fee = parseFeeCalculatorData(_feeCalculatorData);

        validateFee(fee);
        
        fees[msg.sender] = fee;
        isInitialized[msg.sender] = true;
    }

    /**
     * Returns the fee initialized by the sender. Implicitly returns 0 if the fee has not bee initialized.
     */
    function getFee()
        external
        view
        returns(uint256)
    {
        return fees[msg.sender];
    }

    /**
     * Same as getFee, but a non-view function.
     */
    function updateAndGetFee()
        external
        returns(uint256)
    {
        return fees[msg.sender];
    }

    /*
     * Validate then set new streaming fee.
     *
     * @param  _newFeePercentage       Fee type and new streaming fee encoded in bytes
     */
    function adjustFee(
        bytes calldata _newFeePercentage
    )
        external
    {
        fees[msg.sender] = parseFeeCalculatorData(_newFeePercentage);
    }

    /* ============ Private Functions ============ */

    /**
     * Fee should not exceed 100% and should be a multiple of a basis point.
     *
     * @param _fee       Fee value represented as scaled value
     */
    function validateFee(
        uint256 _fee
    )
        private
        view
    {
        ScaleValidations.validateLessThanEqualOneHundredPercent(_fee);
        
        ScaleValidations.validateMultipleOfBasisPoint(_fee);
    }

    /**
     * Function to convert the feeCalculator bytes data to the fee
     *
     * @param _feeCalculatorData       Bytes encoded data about the fee for the sender
     * @return _fee                    Parsed fee value represented as scaled value
     */
    function parseFeeCalculatorData(
        bytes memory _feeCalculatorData
    )
        private
        pure
        returns (uint256)
    {
        uint256 fee;

        assembly {
            fee := mload(add(_feeCalculatorData, 32))
        }

        return fee;
    }
}
