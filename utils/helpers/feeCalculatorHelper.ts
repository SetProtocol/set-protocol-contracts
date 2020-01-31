import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  FeeCalculatorMockContract,
  FixedFeeCalculatorContract,
  FixedFeeCalculatorMockContract,
  OracleWhiteListContract,
  PerformanceFeeCalculatorContract,
  RebalancingSetFeeMockContract,
} from '../contracts';
import { getWeb3, getContractInstance, txnFrom } from '../web3Helper';
import { ether } from '@utils/units';
import {
  ONE_YEAR_IN_SECONDS,
  ZERO
} from '../constants';

import { ValuationHelper } from '@utils/helpers/valuationHelper';

const FixedFeeCalculator = artifacts.require('FixedFeeCalculator');
const FixedFeeCalculatorMock = artifacts.require('FixedFeeCalculatorMock');
const FeeCalculatorMock = artifacts.require('FeeCalculatorMock');
const PerformanceFeeCalculator = artifacts.require('PerformanceFeeCalculator');
const RebalancingSetFeeMock = artifacts.require('RebalancingSetFeeMock');

const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;

export class FeeCalculatorHelper {
  private _contractOwnerAddress: Address;
  private _valuationHelper: ValuationHelper;

  constructor(contractOwnerAddress: Address, valuationHelper: ValuationHelper) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._valuationHelper = valuationHelper;
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

  public generatePerformanceFeeCallData(
    profitFrequency: BigNumber,
    highWatermarkResetFrequency: BigNumber,
    profitFeePercentage: BigNumber,
    streamingFeePercentage: BigNumber,
  ): string {
    return SetTestUtils.bufferArrayToHex([
      SetUtils.paddedBufferForBigNumber(profitFrequency),
      SetUtils.paddedBufferForBigNumber(highWatermarkResetFrequency),
      SetUtils.paddedBufferForBigNumber(profitFeePercentage),
      SetUtils.paddedBufferForBigNumber(streamingFeePercentage),
    ]);
  }

  public async calculateAccruedFeesAsync(
    feeState: any,
    rebalancingSetToken: RebalancingSetFeeMockContract,
    oracleWhiteList: OracleWhiteListContract,
    timeStamp: BigNumber
  ): Promise<BigNumber> {
    const rebalancingSetValue = await this._valuationHelper.calculateRebalancingSetTokenValueAsync(
      rebalancingSetToken,
      oracleWhiteList
    );

    const elapsedTime = timeStamp.sub(new BigNumber(feeState.lastStreamingFeeTimestamp));

    const streamingFee = this.calculateAccruedStreamingFee(new BigNumber(feeState.streamingFeePercentage), elapsedTime);

    let profitFee: BigNumber = ZERO;
    if (timeStamp.sub(new BigNumber(feeState.lastProfitFeeTimestamp)).gt(new BigNumber(feeState.profitFeeFrequency))) {
      profitFee = this.calculateAccruedProfitFeeAsync(feeState, rebalancingSetValue, streamingFee);
    }

    return profitFee.add(streamingFee);
  }

  public async calculateNewHighWatermarkAsync(
    feeState: any,
    rebalancingSetToken: RebalancingSetFeeMockContract,
    oracleWhiteList: OracleWhiteListContract,
    timeStamp: BigNumber
  ): Promise<BigNumber> {
    const rebalancingSetValue = await this._valuationHelper.calculateRebalancingSetTokenValueAsync(
      rebalancingSetToken,
      oracleWhiteList
    );

    const elapsedTime = timeStamp.sub(new BigNumber(feeState.lastStreamingFeeTimestamp));

    const streamingFee = this.calculateAccruedStreamingFee(new BigNumber(feeState.streamingFeePercentage), elapsedTime);

    return rebalancingSetValue.mul(ether(1).sub(streamingFee)).div(ether(1)).round(0, 3);
  }

  public calculateAccruedProfitFeeAsync(
    feeState: any,
    rebalancingSetValue: BigNumber,
    streamingFee: BigNumber
  ): BigNumber {

    const postStreamingValue = rebalancingSetValue.mul(ether(1).sub(streamingFee)).div(ether(1)).round(0, 3);

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
