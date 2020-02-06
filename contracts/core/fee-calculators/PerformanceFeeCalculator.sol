/*
    Copyright 2020 Set Labs Inc.

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
import { IOracleWhiteList } from "../interfaces/IOracleWhiteList.sol";
import { IRebalancingSetTokenV2 } from "../interfaces/IRebalancingSetTokenV2.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { ScaleValidations } from "../../lib/ScaleValidations.sol";
import { SetUSDValuation } from "../liquidators/impl/SetUSDValuation.sol";


/**
 * @title PerformanceFeeCalculator
 * @author Set Protocol
 *
 * Smart contract that stores and returns fees (represented as scaled decimal values). Fees are
 * determined based on performance of the Set and a streaming fee. Set values can be denominated
 * in any any asset based on oracle white list used in deploy.
 */
contract PerformanceFeeCalculator is IFeeCalculator {

    using SafeMath for uint256;
    using CommonMath for uint256;

    /* ============ Events ============ */

    event FeeActualized(
        address indexed rebalancingSetToken,
        uint256 newHighWatermark,
        uint256 inflationFee
    );

    /* ============ Structs ============ */
    struct FeeState {
        uint256 profitFeeFrequency;             // Time required between accruing profit fees
        uint256 highWatermarkResetFrequency;    // Time required after last profit fee to reset high watermark 
        uint256 profitFeePercentage;            // Percent of profits that accrue to manager
        uint256 streamingFeePercentage;         // Percent of Set that accrues to manager each year
        uint256 highWatermark;                  // Value of Set at last profit fee accrual
        uint256 lastProfitFeeTimestamp;         // Timestamp last profit fee was accrued
        uint256 lastStreamingFeeTimestamp;      // Timestamp last streaming fee was accrued
    }

    struct InitFeeParameters {
        uint256 profitFeeFrequency;
        uint256 highWatermarkResetFrequency;
        uint256 profitFeePercentage;
        uint256 streamingFeePercentage;        
    }

    /* ============ Constants ============ */
    // 365.25 days used to represent the year
    uint256 private constant ONE_YEAR_IN_SECONDS = 31557600;
    uint256 private constant ONE_HUNDRED_PERCENT = 1e18;

    /* ============ State Variables ============ */
    ICore public core;
    IOracleWhiteList public oracleWhiteList;
    uint256 public maximumProfitFeePercentage;
    uint256 public maximumStreamingFeePercentage;
    mapping(address => FeeState) public feeState;

    /* ============ Constructor ============ */

    /**
     * Constructor function for PerformanceFeeCalculator
     *
     * @param _core                                 Core instance
     * @param _oracleWhiteList                      Oracle white list instance
     * @param _maximumProfitFeePercentage           Maximum percent of profit fee scaled by 1e18
     *                                              (e.g. 100% = 1e18 and 1% = 1e16)
     * @param _maximumStreamingFeePercentage        Maximum percent of streaming fee scaled by 1e18
     *                                              (e.g. 100% = 1e18 and 1% = 1e16)
     */
    constructor(
        ICore _core,
        IOracleWhiteList _oracleWhiteList,
        uint256 _maximumProfitFeePercentage,
        uint256 _maximumStreamingFeePercentage
    )
        public
    {
        core = _core;
        oracleWhiteList = _oracleWhiteList;
        maximumProfitFeePercentage = _maximumProfitFeePercentage;
        maximumStreamingFeePercentage = _maximumStreamingFeePercentage;
    }

    /* ============ External Functions ============ */

    /*
     * Called by RebalancingSetToken, parses bytedata then assigns to correct FeeState struct. 
     *
     * @param  _feeCalculatorData       Bytestring encoding fee parameters for RebalancingSetToken
     */
    function initialize(
        bytes calldata _feeCalculatorData
    )
        external
    {
        // Parse fee data into struct
        InitFeeParameters memory parameters = parsePerformanceFeeCallData(_feeCalculatorData);

        // Validate fee data
        validateFeeParameters(parameters);

        // Set fee state for new caller
        feeState[msg.sender].profitFeeFrequency = parameters.profitFeeFrequency;
        feeState[msg.sender].highWatermarkResetFrequency = parameters.highWatermarkResetFrequency;
        feeState[msg.sender].profitFeePercentage = parameters.profitFeePercentage;
        feeState[msg.sender].streamingFeePercentage = parameters.streamingFeePercentage;
        feeState[msg.sender].lastProfitFeeTimestamp = block.timestamp;
        feeState[msg.sender].lastStreamingFeeTimestamp = block.timestamp;
        feeState[msg.sender].highWatermark = SetUSDValuation.calculateRebalancingSetValue(msg.sender, oracleWhiteList);
    }

    /*
     * Calculates total inflation percentage in order to accrue fees to manager. Profit fee calculations
     * are net of streaming fees, so streaming fees are applied first then profit fees are calculated.  
     *
     * @return  uint256       Percent inflation of supply
     */
    function getFee()
        external
        view
        returns (uint256)
    {
        require(
            core.validSets(msg.sender),
            "PerformanceFeeCalculator.getFee: Caller must be valid RebalancingSetToken."
        );

        uint256 streamingFee = calculateStreamingFee();

        uint256 profitFee = calculateProfitFee(streamingFee);

        return streamingFee.add(profitFee);
    }

    /*
     * Calculates total inflation percentage in order to accrue fees to manager. Profit fee calculations
     * are net of streaming fees, so streaming fees are applied first then profit fees are calculated. 
     * Additionally, fee state is set timestamps are updated for each fee type and the high watermark is
     * reset if time since last profit fee exceeds the highWatermarkResetFrequency. 
     *
     * @preturn  uint256       Percent inflation of supply
     */
    function updateAndGetFee()
        external
        returns (uint256)
    {
        require(
            core.validSets(msg.sender),
            "PerformanceFeeCalculator.getFee: Caller must be valid RebalancingSetToken."
        );

        uint256 streamingFee = calculateStreamingFee();

        uint256 profitFee = calculateProfitFee(streamingFee);

        // Update fee state based off fees collected
        updateFeeState(streamingFee, profitFee);

        emit FeeActualized(
            msg.sender,
            highWatermark(msg.sender),
            streamingFee.add(profitFee)
        );

        return streamingFee.add(profitFee);
    }

    /* ============ Private Functions ============ */

    /**
     * Updates fee state after a fee has been accrued. Streaming timestamp is always updated. Profit timestamp
     * is only updated if profit fee is collected. High watermark timestamp is updated if profit fee collected
     * or if a highWatermarkResetFrequency amount of time has passed since last profit fee collection.
     */
    function updateFeeState(
        uint256 _streamingFee,
        uint256 _profitFee
    )
        internal
    {
        // Set streaming fee timestamp
        feeState[msg.sender].lastStreamingFeeTimestamp = block.timestamp;

        uint256 rebalancingSetValue = SetUSDValuation.calculateRebalancingSetValue(msg.sender, oracleWhiteList);
        uint256 postStreamingValue = rebalancingSetValue.mul(ONE_HUNDRED_PERCENT.sub(_streamingFee)).deScale();

        // If profit fee then set new high watermark and profit fee timestamp
        if (_profitFee > 0) {
            feeState[msg.sender].lastProfitFeeTimestamp = block.timestamp;
            feeState[msg.sender].highWatermark = postStreamingValue;
        } else if (timeSinceLastProfitFee(msg.sender) >= highWatermarkResetFrequency(msg.sender)) {
            // If no profit fee and last profit fee was more than highWatermarkResetFrequency seconds ago then reset
            // high watermark
            feeState[msg.sender].highWatermark = postStreamingValue;
            feeState[msg.sender].lastProfitFeeTimestamp = block.timestamp;            
        }
    }

    /**
     * Parses passed in fee parameters from bytestring.
     *
     * 
     * | CallData                     | Location                      |
     * |------------------------------|-------------------------------|
     * | profitFeeFrequency           | 32                            |
     * | highWatermarkResetFrequency  | 64                            |
     * | profitFeePercentage          | 96                            |
     * | streamingFeePercentage       | 128                           |
     *
     * @param  _callData            Byte string containing fee parameter data
     * @return feeParameters        Fee parameters
     */
    function parsePerformanceFeeCallData(
        bytes memory _callData
    )
        private
        pure
        returns (InitFeeParameters memory)
    {
        InitFeeParameters memory parameters;

        assembly {
            mstore(parameters,           mload(add(_callData, 32)))   // profitFeeFrequency
            mstore(add(parameters, 32),  mload(add(_callData, 64)))   // highWatermarkResetFrequency
            mstore(add(parameters, 64),  mload(add(_callData, 96)))   // profitFeePercentage
            mstore(add(parameters, 96),  mload(add(_callData, 128)))  // streamingFeePercentage
        }

        return parameters;
    }

    /*
     * Validates fee parameters. Ensures that both fees are below the max fee percentages and that they are
     * multiples of a basis point. Also makes sure highWatermarkResetFrequency is greater than profitFeeFrequency.
     */
    function validateFeeParameters(
        InitFeeParameters memory parameters
    )
        private
        view
    {
        require(
            parameters.profitFeePercentage <= maximumProfitFeePercentage,
            "PerformanceFeeCalculator.validateFeeParameters: Profit fee exceeds maximum."
        );

        require(
            parameters.streamingFeePercentage <= maximumStreamingFeePercentage,
            "PerformanceFeeCalculator.validateFeeParameters: Streaming fee exceeds maximum."
        );

        ScaleValidations.validateMultipleOfBasisPoint(parameters.profitFeePercentage);
        ScaleValidations.validateMultipleOfBasisPoint(parameters.streamingFeePercentage);

        require(
            parameters.highWatermarkResetFrequency >= parameters.profitFeeFrequency,
            "PerformanceFeeCalculator.validateFeeParameters: Fee collection frequency must exceed highWatermark reset."
        );
    }

    /**
     * Calculates streaming fee by multiplying streamingFeePercentage by the elapsed amount of time since the last fee
     * was collected divided by one year in seconds, since the fee is a yearly fee.
     *
     * @return uint256        Streaming fee
     */
    function calculateStreamingFee()
        internal
        view
        returns(uint256)
    {
        uint256 timeSinceLastFee = block.timestamp.sub(lastStreamingFeeTimestamp(msg.sender));

        // Streaming fee is streaming fee times years since last fee
        return timeSinceLastFee.mul(streamingFeePercentage(msg.sender)).div(ONE_YEAR_IN_SECONDS);
    }

    /**
     * Calculates profit fee net of streaming fee. Value of rebalancing Set is determined then streaming fee subtracted,
     * to get postStreamingValue. This value is compared to the highWatermark, if greater than highWatermark multiply by
     * profitFeePercentage and divide by rebalancingSetValue to get inflation from profit fees. If postStreamingValue does
     * not exceed highWatermark then return 0.
     *
     * @return uint256        Streaming fee
     */
    function calculateProfitFee(uint256 _streamingFee)
        internal
        view
        returns(uint256)
    {
        // If time since last profit fee exceeds profitFeeFrequency then calculate profit fee else 0.
        if (exceedsProfitFeeFrequency(msg.sender)) {
            // Calculate post streaming value and get high watermark
            uint256 rebalancingSetValue = SetUSDValuation.calculateRebalancingSetValue(msg.sender, oracleWhiteList);
            uint256 postStreamingValue = rebalancingSetValue.mul(ONE_HUNDRED_PERCENT.sub(_streamingFee)).deScale(); 
            uint256 highWatermark = highWatermark(msg.sender);

            // Subtract high watermark from post streaming fee value, unless less than 0 set to 0
            uint256 gainedValue = postStreamingValue > highWatermark ? postStreamingValue.sub(highWatermark) : 0;

            // Determine percent fee in terms of current rebalancing Set value
            return gainedValue.mul(profitFeePercentage(msg.sender)).div(rebalancingSetValue);
        }

        return 0;
    }

    /**
     * Checks if time since last profit fee exceeds profitFeeFrequency
     *
     * @return  bool
     */
    function exceedsProfitFeeFrequency(address _set) internal view returns (bool) {
        return timeSinceLastProfitFee(_set) > profitFeeFrequency(_set);
    }

    /**
     * Checks if time since last profit fee exceeds profitFeeFrequency
     *
     * @return  uint256     Time since last profit fee accrued
     */
    function timeSinceLastProfitFee(address _set) internal view returns (uint256) {
        return block.timestamp.sub(lastProfitFeeTimestamp(_set));
    }

    function lastStreamingFeeTimestamp(address _set) internal view returns (uint256) {
        return feeState[_set].lastStreamingFeeTimestamp;
    }

    function lastProfitFeeTimestamp(address _set) internal view returns (uint256) {
        return feeState[_set].lastProfitFeeTimestamp;
    }

    function streamingFeePercentage(address _set) internal view returns (uint256) {
        return feeState[_set].streamingFeePercentage;
    }

    function profitFeePercentage(address _set) internal view returns (uint256) {
        return feeState[_set].profitFeePercentage;
    }

    function profitFeeFrequency(address _set) internal view returns (uint256) {
        return feeState[_set].profitFeeFrequency;
    }

    function highWatermark(address _set) internal view returns(uint256) {
        return feeState[_set].highWatermark;
    }

    function highWatermarkResetFrequency(address _set) internal view returns(uint256) {
        return feeState[_set].highWatermarkResetFrequency;
    }
}