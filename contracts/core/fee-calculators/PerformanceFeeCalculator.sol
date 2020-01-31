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

    event FeeAcutalized(
        address indexed rebalancingSetToken,
        uint256 oldHighWatermark,
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
        require(
            core.validSets(msg.sender),
            "PerformanceFeeCalculator.initialize: Caller must be valid Set."
        );

        InitFeeParameters memory parameters = parsePerformanceFeeCallData(_feeCalculatorData);

        validateFeeParameters(parameters);

        feeState[msg.sender].profitFeeFrequency = parameters.profitFeeFrequency;
        feeState[msg.sender].highWatermarkResetFrequency = parameters.highWatermarkResetFrequency;
        feeState[msg.sender].profitFeePercentage = parameters.profitFeePercentage;
        feeState[msg.sender].streamingFeePercentage = parameters.streamingFeePercentage;
        feeState[msg.sender].lastProfitFeeTimestamp = block.timestamp;
        feeState[msg.sender].lastStreamingFeeTimestamp = block.timestamp;
        feeState[msg.sender].highWatermark = calculateRebalancingSetValue(msg.sender);
    }

    function getFee()
        external
        view
        returns (uint256)
    {
        uint256 streamingFee = calculateStreamingFee();

        uint256 profitFee = 0;
        if (exceedsProfitFeeFrequency()) {
            profitFee = calculateProfitFee(streamingFee);
        }

        return streamingFee.add(profitFee);
    }

    function updateAndGetFee()
        external
        returns (uint256)
    {
        uint256 streamingFee = calculateStreamingFee();

        uint256 profitFee = 0;
        if (exceedsProfitFeeFrequency()) {
            profitFee = calculateProfitFee(streamingFee);
        }

        updateFeeState(streamingFee, profitFee);

        return streamingFee.add(profitFee);
    }

    /* ============ Private Functions ============ */

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

    function calculateStreamingFee()
        internal
        view
        returns(uint256)
    {
        uint256 timeSinceLastFee = block.timestamp.sub(lastStreamingFeeTimestamp());

        return timeSinceLastFee.mul(streamingFeePercentage()).div(ONE_YEAR_IN_SECONDS);
    }

    function calculateProfitFee(uint256 _streamingFee)
        internal
        view
        returns(uint256)
    {
        uint256 rebalancingSetValue = calculateRebalancingSetValue(msg.sender);
        uint256 postStreamingValue = rebalancingSetValue.mul(ONE_HUNDRED_PERCENT.sub(_streamingFee)).deScale(); 
        uint256 highWatermark = highWatermark();

        uint256 gainedValue = postStreamingValue > highWatermark ? postStreamingValue.sub(highWatermark) : 0;

        return gainedValue.mul(profitFeePercentage()).div(rebalancingSetValue);
    }

    function calculateRebalancingSetValue(
        address _rebalancingSetTokenAddress
    )
        internal
        view
        returns (uint256)
    {
        IRebalancingSetTokenV2 rebalancingSetToken = IRebalancingSetTokenV2(_rebalancingSetTokenAddress);

        uint256 unitShares = rebalancingSetToken.unitShares();
        uint256 naturalUnit = rebalancingSetToken.naturalUnit();
        ISetToken currentSet = rebalancingSetToken.currentSet();

        uint256 collateralValue = SetUSDValuation.calculateSetTokenDollarValue(
            currentSet,
            oracleWhiteList
        );

        return collateralValue.mul(unitShares).div(naturalUnit);
    }

    function updateFeeState(
        uint256 _streamingFee,
        uint256 _profitFee
    )
        internal
    {
        feeState[msg.sender].lastStreamingFeeTimestamp = block.timestamp;

        uint256 rebalancingSetValue = calculateRebalancingSetValue(msg.sender);
        uint256 postStreamingValue = rebalancingSetValue.mul(ONE_HUNDRED_PERCENT.sub(_streamingFee)).deScale(); 
        if (_profitFee > 0) {
            feeState[msg.sender].lastProfitFeeTimestamp = block.timestamp;
            feeState[msg.sender].highWatermark = postStreamingValue;
        }

        if (block.timestamp.sub(lastProfitFeeTimestamp()) >= highWatermarkResetFrequency()) {
            feeState[msg.sender].highWatermark = postStreamingValue;
        }
    }

    function exceedsProfitFeeFrequency() internal view returns (bool) {
        return block.timestamp.sub(lastProfitFeeTimestamp()) > profitFeeFrequency();
    }

    function lastStreamingFeeTimestamp() internal view returns (uint256) {
        return feeState[msg.sender].lastStreamingFeeTimestamp;
    }

    function lastProfitFeeTimestamp() internal view returns (uint256) {
        return feeState[msg.sender].lastProfitFeeTimestamp;
    }

    function streamingFeePercentage() internal view returns (uint256) {
        return feeState[msg.sender].streamingFeePercentage;
    }

    function profitFeePercentage() internal view returns (uint256) {
        return feeState[msg.sender].profitFeePercentage;
    }

    function profitFeeFrequency() internal view returns (uint256) {
        return feeState[msg.sender].profitFeeFrequency;
    }

    function highWatermark() internal view returns(uint256) {
        return feeState[msg.sender].highWatermark;
    }

    function highWatermarkResetFrequency() internal view returns(uint256) {
        return feeState[msg.sender].highWatermarkResetFrequency;
    }
}