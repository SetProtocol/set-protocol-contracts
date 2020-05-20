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
pragma experimental ABIEncoderV2;

import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";
import { CommonMath } from "set-protocol-contract-utils/contracts/lib/CommonMath.sol";
import { ScaleValidations } from "set-protocol-contract-utils/contracts/lib/ScaleValidations.sol";

import { ICore } from "../interfaces/ICore.sol";
import { IFeeCalculator } from "../interfaces/IFeeCalculator.sol";
import { IOracleWhiteList } from "../interfaces/IOracleWhiteList.sol";
import { IRebalancingSetTokenV2 } from "../interfaces/IRebalancingSetTokenV2.sol";
import { ISetToken } from "../interfaces/ISetToken.sol";
import { PerformanceFeeLibrary } from "./lib/PerformanceFeeLibrary.sol";
import { SetUSDValuation } from "../liquidators/impl/SetUSDValuation.sol";


/**
 * @title PerformanceFeeCalculator
 * @author Set Protocol
 *
 * Smart contract that stores and returns fees (represented as scaled decimal values). Fees are
 * determined based on performance of the Set and a streaming fee. Set values can be denominated
 * in any any asset based on oracle white list used in deploy.
 *
 * CHANGELOG:
 * - 5/17/2020: Update adjustFee function to update high watermark to prevent unexpected fee actualizations
 *              when the profitFee was initially 0. We also disallow changing the profit fee if the the fee period
 *              has not elapsed.
 */
contract PerformanceFeeCalculator is IFeeCalculator {

    using SafeMath for uint256;
    using CommonMath for uint256;

    /* ============ Enums ============ */

    enum FeeType { StreamingFee, ProfitFee }

    /* ============ Events ============ */

    event FeeActualization(
        address indexed rebalancingSetToken,
        uint256 newHighWatermark,
        uint256 profitFee,
        uint256 streamingFee
    );

    event FeeInitialization(
        address indexed rebalancingSetToken,
        uint256 profitFeePeriod,
        uint256 highWatermarkResetPeriod,
        uint256 profitFeePercentage,
        uint256 streamingFeePercentage,
        uint256 highWatermark,
        uint256 lastProfitFeeTimestamp,
        uint256 lastStreamingFeeTimestamp
    );

    event FeeAdjustment(
        address indexed rebalancingSetToken,
        FeeType feeType,
        uint256 newFeePercentage
    );

    /* ============ Structs ============ */

    struct InitFeeParameters {
        uint256 profitFeePeriod;
        uint256 highWatermarkResetPeriod;
        uint256 profitFeePercentage;
        uint256 streamingFeePercentage;
    }

    /* ============ Constants ============ */
    // 365.25 days used to represent the year
    uint256 private constant ONE_YEAR_IN_SECONDS = 365.25 days;
    uint256 private constant ONE_HUNDRED_PERCENT = 1e18;
    uint256 private constant ZERO = 0;

    /* ============ State Variables ============ */
    ICore public core;
    IOracleWhiteList public oracleWhiteList;
    uint256 public maximumProfitFeePercentage;
    uint256 public maximumStreamingFeePercentage;
    mapping(address => PerformanceFeeLibrary.FeeState) public feeState;

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
        uint256 highWatermark = SetUSDValuation.calculateRebalancingSetValue(msg.sender, oracleWhiteList);

        // Set fee state for new caller
        PerformanceFeeLibrary.FeeState storage feeInfo = feeState[msg.sender];

        feeInfo.profitFeePeriod = parameters.profitFeePeriod;
        feeInfo.highWatermarkResetPeriod = parameters.highWatermarkResetPeriod;
        feeInfo.profitFeePercentage = parameters.profitFeePercentage;
        feeInfo.streamingFeePercentage = parameters.streamingFeePercentage;
        feeInfo.lastProfitFeeTimestamp = block.timestamp;
        feeInfo.lastStreamingFeeTimestamp = block.timestamp;
        feeInfo.highWatermark = highWatermark;

        emit FeeInitialization(
            msg.sender,
            parameters.profitFeePeriod,
            parameters.highWatermarkResetPeriod,
            parameters.profitFeePercentage,
            parameters.streamingFeePercentage,
            highWatermark,
            block.timestamp,
            block.timestamp
        );
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
        (
            uint256 streamingFee,
            uint256 profitFee
        ) = calculateFees(msg.sender);

        return streamingFee.add(profitFee);
    }

    /**
     * Returns calculated streaming and profit fee.
     *
     * @param  _setAddress          Address of Set to get fees
     * @return  uint256             Streaming Fee
     * @return  uint256             Profit Fee
     */
    function getCalculatedFees(
        address _setAddress
    )
        external
        view
        returns (uint256, uint256)
    {
        (
            uint256 streamingFee,
            uint256 profitFee
        ) = calculateFees(_setAddress);

        return (streamingFee, profitFee);
    }

    /*
     * Calculates total inflation percentage in order to accrue fees to manager. Profit fee calculations
     * are net of streaming fees, so streaming fees are applied first then profit fees are calculated.
     * Additionally, fee state is set timestamps are updated for each fee type and the high watermark is
     * reset if time since last profit fee exceeds the highWatermarkResetPeriod.
     *
     * @return  uint256       Percent inflation of supply
     */
    function updateAndGetFee()
        external
        returns (uint256)
    {
        (
            uint256 streamingFee,
            uint256 profitFee
        ) = calculateFees(msg.sender);

        // Update fee state based off fees collected
        updateFeeState(msg.sender, streamingFee, profitFee);

        emit FeeActualization(
            msg.sender,
            highWatermark(msg.sender),
            profitFee,
            streamingFee
        );

        return streamingFee.add(profitFee);
    }

    /*
     * Validate then set new streaming fee.
     *
     * @param  _newFeeData       Fee type and new streaming fee encoded in bytes
     */
    function adjustFee(
        bytes calldata _newFeeData
    )
        external
    {
        (
            FeeType feeIdentifier,
            uint256 feePercentage
        ) = parseNewFeeCallData(_newFeeData);

        // Since only two fee options and anything feeType integer passed that is not 0 or 1 will revert in
        // parsing can make this a simple if...else... statement
        if (feeIdentifier == FeeType.StreamingFee) {
            validateStreamingFeePercentage(feePercentage);

            feeState[msg.sender].streamingFeePercentage = feePercentage;
        } else {
            validateProfitFeePercentage(feePercentage);

            // IMPORTANT: In the case that a profit fee is initially 0 and is set to a non-zero number,
            // the actualizeFee / updateFeeState function does not update the high watermark
            // Thus, we need to reset the high water mark here so that users do not pay for profit fees
            // since inception.
            uint256 rebalancingSetValue = SetUSDValuation.calculateRebalancingSetValue(msg.sender, oracleWhiteList);
            uint256 existingHighwatermark = feeState[msg.sender].highWatermark;
            if (rebalancingSetValue > existingHighwatermark) {
                // In the case the profit fee period hasn't elapsed, disallow changing fees
                require(
                    exceedsProfitFeePeriod(msg.sender),
                    "PerformanceFeeCalculator.adjustFee: ProfitFeePeriod must have elapsed to update fee"
                );

                feeState[msg.sender].lastProfitFeeTimestamp = block.timestamp;
                feeState[msg.sender].highWatermark = rebalancingSetValue;
            }

            feeState[msg.sender].profitFeePercentage = feePercentage;
        }

        emit FeeAdjustment(msg.sender, feeIdentifier, feePercentage);
    }

    /* ============ Internal Functions ============ */

    /**
     * Updates fee state after a fee has been accrued. Streaming timestamp is always updated. Profit timestamp
     * is only updated if profit fee is collected. High watermark timestamp is updated if profit fee collected
     * or if a highWatermarkResetPeriod amount of time has passed since last profit fee collection.
     *
     * @param  _setAddress          Address of Set to have feeState updated
     * @param  _streamingFee        Calculated streaming fee percentage
     * @param  _profitFee           Calculated profit fee percentage
     */
    function updateFeeState(
        address _setAddress,
        uint256 _streamingFee,
        uint256 _profitFee
    )
        internal
    {
        // Set streaming fee timestamp
        feeState[_setAddress].lastStreamingFeeTimestamp = block.timestamp;

        uint256 rebalancingSetValue = SetUSDValuation.calculateRebalancingSetValue(_setAddress, oracleWhiteList);
        uint256 postStreamingValue = calculatePostStreamingValue(rebalancingSetValue, _streamingFee);

        // If profit fee then set new high watermark and profit fee timestamp
        if (_profitFee > 0) {
            feeState[_setAddress].lastProfitFeeTimestamp = block.timestamp;
            feeState[_setAddress].highWatermark = postStreamingValue;
        } else if (timeSinceLastProfitFee(_setAddress) >= highWatermarkResetPeriod(_setAddress)) {
            // If no profit fee and last profit fee was more than highWatermarkResetPeriod seconds ago then reset
            // high watermark
            feeState[_setAddress].highWatermark = postStreamingValue;
            feeState[_setAddress].lastProfitFeeTimestamp = block.timestamp;
        }
    }

    /*
     * Validates fee parameters. Ensures that both fees are below the max fee percentages and that they are
     * multiples of a basis point. Also makes sure highWatermarkResetPeriod is greater than profitFeePeriod.
     */
    function validateFeeParameters(
        InitFeeParameters memory parameters
    )
        internal
        view
    {
        // Validate fee amounts
        validateStreamingFeePercentage(parameters.streamingFeePercentage);
        validateProfitFeePercentage(parameters.profitFeePercentage);

        // WARNING: This require has downstream effects on security assumptions for updating and accruing fees.
        // Removing it allows highWatermarks to be reset, potentially cancelling fee collections or allowing traders
        // to apply higher profitFee to Set gains.
        require(
            parameters.highWatermarkResetPeriod >= parameters.profitFeePeriod,
            "PerformanceFeeCalculator.validateFeeParameters: Fee collection frequency must exceed highWatermark reset."
        );
    }

    /*
     * Validates streaming fee is less than maximum allowed and multiple of basis point.
     */
    function validateStreamingFeePercentage(
        uint256 _streamingFee
    )
        internal
        view
    {
        require(
            _streamingFee <= maximumStreamingFeePercentage,
            "PerformanceFeeCalculator.validateStreamingFeePercentage: Streaming fee exceeds maximum."
        );

        ScaleValidations.validateMultipleOfBasisPoint(_streamingFee);
    }

    /*
     * Validates profit fee is less than maximum allowed and multiple of basis point.
     */
    function validateProfitFeePercentage(
        uint256 _profitFee
    )
        internal
        view
    {
        require(
            _profitFee <= maximumProfitFeePercentage,
            "PerformanceFeeCalculator.validateProfitFeePercentage: Profit fee exceeds maximum."
        );

        ScaleValidations.validateMultipleOfBasisPoint(_profitFee);
    }

    /**
     * Verifies caller is valid Set. Calculates and returns streaming and profit fee.
     *
     * @param  _setAddress          Address of Set to have feeState updated
     * @return  uint256             Streaming Fee
     * @return  uint256             Profit Fee
     */
    function calculateFees(
        address _setAddress
    )
        internal
        view
        returns (uint256, uint256)
    {
        require(
            core.validSets(_setAddress),
            "PerformanceFeeCalculator.calculateFees: Caller must be valid RebalancingSetToken."
        );

        uint256 streamingFee = calculateStreamingFee(_setAddress);

        uint256 profitFee = calculateProfitFee(_setAddress, streamingFee);

        return (streamingFee, profitFee);
    }

    /**
     * Calculates streaming fee by multiplying streamingFeePercentage by the elapsed amount of time since the last fee
     * was collected divided by one year in seconds, since the fee is a yearly fee.
     *
     * @param  _setAddress          Address of Set to have feeState updated
     * @return uint256              Streaming fee
     */
    function calculateStreamingFee(
        address _setAddress
    )
        internal
        view
        returns(uint256)
    {
        uint256 timeSinceLastFee = block.timestamp.sub(lastStreamingFeeTimestamp(_setAddress));

        // Streaming fee is streaming fee times years since last fee
        return timeSinceLastFee.mul(streamingFeePercentage(_setAddress)).div(ONE_YEAR_IN_SECONDS);
    }

    /**
     * Calculates profit fee net of streaming fee. Value of rebalancing Set is determined then streaming fee subtracted,
     * to get postStreamingValue. This value is compared to the highWatermark, if greater than highWatermark multiply by
     * profitFeePercentage and divide by rebalancingSetValue to get inflation from profit fees. If postStreamingValue does
     * not exceed highWatermark then return 0.
     *
     * @param  _setAddress          Address of Set to have feeState updated
     * @param  _streamingFee        Calculated streaming fee percentage
     * @return uint256              Streaming fee
     */
    function calculateProfitFee(
        address _setAddress,
        uint256 _streamingFee
    )
        internal
        view
        returns(uint256)
    {
        // If time since last profit fee exceeds profitFeePeriod then calculate profit fee else 0.
        if (exceedsProfitFeePeriod(_setAddress)) {
            // Calculate post streaming value and get high watermark
            uint256 rebalancingSetValue = SetUSDValuation.calculateRebalancingSetValue(_setAddress, oracleWhiteList);
            uint256 postStreamingValue = calculatePostStreamingValue(rebalancingSetValue, _streamingFee);
            uint256 highWatermark = highWatermark(_setAddress);

            // Subtract high watermark from post streaming fee value, unless less than 0 set to 0
            uint256 gainedValue = postStreamingValue > highWatermark ? postStreamingValue.sub(highWatermark) : 0;

            // Determine percent fee in terms of current rebalancing Set value
            return gainedValue.mul(profitFeePercentage(_setAddress)).div(rebalancingSetValue);
        } else {
            return 0;
        }
    }

   /**
     * Calculates Rebalancing Set Token value after streaming fees accounted for.
     *
     * @param  _rebalancingSetValue         Pre-fee value of Set
     * @param  _streamingFee                Calculated streaming fee percentage
     * @return  uint256                     Post streaming fee value
     */
    function calculatePostStreamingValue(
        uint256 _rebalancingSetValue,
        uint256 _streamingFee
    )
        internal
        view
        returns (uint256)
    {
        return _rebalancingSetValue.sub(_rebalancingSetValue.mul(_streamingFee).deScale());
    }

    /**
     * Checks if time since last profit fee exceeds profitFeePeriod
     *
     * @return  bool
     */
    function exceedsProfitFeePeriod(address _set) internal view returns (bool) {
        return timeSinceLastProfitFee(_set) > profitFeePeriod(_set);
    }

    /**
     * Checks if time since last profit fee exceeds profitFeePeriod
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

    function profitFeePeriod(address _set) internal view returns (uint256) {
        return feeState[_set].profitFeePeriod;
    }

    function highWatermark(address _set) internal view returns(uint256) {
        return feeState[_set].highWatermark;
    }

    function highWatermarkResetPeriod(address _set) internal view returns(uint256) {
        return feeState[_set].highWatermarkResetPeriod;
    }

    /* ============ Private Functions ============ */

    /**
     * Parses passed in fee parameters from bytestring.
     *
     * | CallData                     | Location                      |
     * |------------------------------|-------------------------------|
     * | profitFeePeriod              | 32                            |
     * | highWatermarkResetPeriod     | 64                            |
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
        return abi.decode (_callData, (InitFeeParameters));
    }

    /**
     * Parses passed in fee parameters from bytestring. If passed feeType number exceeds number of
     *  enum items function will revert.
     *
     * | CallData                     | Location                      |
     * |------------------------------|-------------------------------|
     * | feeType                      | 32                            |
     * | feePercentage                | 64                            |
     *
     * @param  _callData            Byte string containing fee parameter data
     * @return feeParameters        Fee parameters
     */
    function parseNewFeeCallData(
        bytes memory _callData
    )
        private
        pure
        returns (FeeType, uint256)
    {
        (
            uint8 feeType,
            uint256 feePercentage
        ) = abi.decode (_callData, (uint8, uint256));

        require(
            feeType < 2,
            "PerformanceFeeCalculator.parseNewFeeCallData: Fee type invalid"
        );

        return (FeeType(feeType), feePercentage);
    }
}