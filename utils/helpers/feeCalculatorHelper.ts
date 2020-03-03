import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  FeeCalculatorMockContract,
  FixedFeeCalculatorContract,
  FixedFeeCalculatorMockContract,
  PerformanceFeeCalculatorContract,
  RebalancingSetFeeMockContract,
} from '../contracts';
import { getWeb3, getContractInstance, importArtifactsFromSource, txnFrom } from '../web3Helper';
import { ether } from '../units';
import {
  ONE_YEAR_IN_SECONDS,
  ZERO
} from '../constants';


const FixedFeeCalculator = importArtifactsFromSource('FixedFeeCalculator');
const FixedFeeCalculatorMock = importArtifactsFromSource('FixedFeeCalculatorMock');
const FeeCalculatorMock = importArtifactsFromSource('FeeCalculatorMock');
const PerformanceFeeCalculator = importArtifactsFromSource('PerformanceFeeCalculator');
const RebalancingSetFeeMock = importArtifactsFromSource('RebalancingSetFeeMock');

const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;

export class FeeCalculatorHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployFixedFeeCalculatorAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<FixedFeeCalculatorContract> {
    const feeCalculator = await FixedFeeCalculator.new(txnFrom(from));

    return new FixedFeeCalculatorContract(getContractInstance(feeCalculator), txnFrom(from));
  }

  public async deployFixedFeeCalculatorMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<FixedFeeCalculatorMockContract> {
    const feeCalculator = await FixedFeeCalculatorMock.new(txnFrom(from));

    return new FixedFeeCalculatorMockContract(getContractInstance(feeCalculator), txnFrom(from));
  }

  public async deployPerformanceFeeCalculatorAsync(
    core: Address,
    oracleWhiteList: Address,
    maxProfitFeePercentage: BigNumber,
    maxStreamingFeePercentage: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<PerformanceFeeCalculatorContract> {
    const feeCalculator = await PerformanceFeeCalculator.new(
      core,
      oracleWhiteList,
      maxProfitFeePercentage,
      maxStreamingFeePercentage,
      txnFrom(from)
    );

    return new PerformanceFeeCalculatorContract(getContractInstance(feeCalculator), txnFrom(from));
  }

  public async deployFeeCalculatorMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<FeeCalculatorMockContract> {
    const feeCalculatorMock = await FeeCalculatorMock.new(txnFrom(from));

    return new FeeCalculatorMockContract(getContractInstance(feeCalculatorMock), txnFrom(from));
  }

  public async deployRebalancingSetFeeMockAsync(
    unitShares: BigNumber,
    naturalUnit: BigNumber,
    currentSet: Address,
    feeCalculator: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<RebalancingSetFeeMockContract> {
    const rebalancingSetMock = await RebalancingSetFeeMock.new(
      unitShares,
      naturalUnit,
      currentSet,
      feeCalculator,
      txnFrom(from)
    );

    return new RebalancingSetFeeMockContract(getContractInstance(rebalancingSetMock), txnFrom(from));
  }

  public generateFixedRebalanceFeeCallData(
    feeQuantity: BigNumber
  ): string {
    return web3.utils.padLeft(web3.utils.numberToHex(feeQuantity.toString()), 64);
  }

  public generateAdjustFeeCallData(
    feeType: BigNumber,
    newFeePercentage: BigNumber,
  ): string {
    return SetTestUtils.bufferArrayToHex([
      SetUtils.paddedBufferForBigNumber(feeType),
      SetUtils.paddedBufferForBigNumber(newFeePercentage),
    ]);
  }

  public generatePerformanceFeeCallData(
    profitPeriod: BigNumber,
    highWatermarkResetPeriod: BigNumber,
    profitFeePercentage: BigNumber,
    streamingFeePercentage: BigNumber,
  ): string {
    return SetTestUtils.bufferArrayToHex([
      SetUtils.paddedBufferForBigNumber(profitPeriod),
      SetUtils.paddedBufferForBigNumber(highWatermarkResetPeriod),
      SetUtils.paddedBufferForBigNumber(profitFeePercentage),
      SetUtils.paddedBufferForBigNumber(streamingFeePercentage),
    ]);
  }

  public generatePerformanceFeeCallDataBuffer(
    profitPeriod: BigNumber,
    highWatermarkResetPeriod: BigNumber,
    profitFeePercentage: BigNumber,
    streamingFeePercentage: BigNumber,
  ): Buffer[] {
    return [
      SetUtils.paddedBufferForBigNumber(profitPeriod),
      SetUtils.paddedBufferForBigNumber(highWatermarkResetPeriod),
      SetUtils.paddedBufferForBigNumber(profitFeePercentage),
      SetUtils.paddedBufferForBigNumber(streamingFeePercentage),
    ];
  }

  public async calculateAccruedFeesAsync(
    feeState: any,
    rebalancingSetTokenValue: BigNumber,
    timeStamp: BigNumber
  ): Promise<BigNumber> {
    const elapsedTime = timeStamp.sub(new BigNumber(feeState.lastStreamingFeeTimestamp));

    const streamingFee = this.calculateAccruedStreamingFee(new BigNumber(feeState.streamingFeePercentage), elapsedTime);

    let profitFee: BigNumber = ZERO;
    if (timeStamp.sub(new BigNumber(feeState.lastProfitFeeTimestamp)).gt(new BigNumber(feeState.profitFeePeriod))) {
      profitFee = this.calculateAccruedProfitFeeAsync(feeState, rebalancingSetTokenValue, streamingFee);
    }

    return profitFee.add(streamingFee);
  }

  public async calculateNewHighWatermarkAsync(
    feeState: any,
    rebalancingSetTokenValue: BigNumber,
    timeStamp: BigNumber
  ): Promise<BigNumber> {
    const elapsedTime = timeStamp.sub(new BigNumber(feeState.lastStreamingFeeTimestamp));

    const streamingFee = this.calculateAccruedStreamingFee(new BigNumber(feeState.streamingFeePercentage), elapsedTime);

    return rebalancingSetTokenValue.sub(rebalancingSetTokenValue.mul(streamingFee).div(ether(1)).round(0, 3));
  }

  public calculateAccruedProfitFeeAsync(
    feeState: any,
    rebalancingSetValue: BigNumber,
    streamingFee: BigNumber
  ): BigNumber {
    const postStreamingValue = rebalancingSetValue.sub(rebalancingSetValue.mul(streamingFee).div(ether(1)).round(0, 3));

    const gainedValue = postStreamingValue.gt(feeState.highWatermark) ?
      postStreamingValue.sub(feeState.highWatermark) :
      ZERO;

    return gainedValue.mul(feeState.profitFeePercentage).div(rebalancingSetValue).round(0, 3);
  }

  public calculateAccruedStreamingFee(
    streamingFee: BigNumber,
    elapsedTime: BigNumber
  ): BigNumber {
    return elapsedTime.mul(streamingFee).div(ONE_YEAR_IN_SECONDS).round(0, 3);
  }
}
