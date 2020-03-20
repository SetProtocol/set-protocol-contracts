import { BigNumber } from 'bignumber.js';
import { Address, Log } from 'set-protocol-utils';

export function getExpectedFeeActualizationLog(
  rebalancingSetToken: Address,
  newHighWatermark: BigNumber,
  profitFee: BigNumber,
  streamingFee: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'FeeActualization',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      newHighWatermark,
      profitFee,
      streamingFee,
    },
  }];
}

export function getExpectedFeeInitializationLog(
  rebalancingSetToken: Address,
  profitFeePeriod: BigNumber,
  highWatermarkResetPeriod: BigNumber,
  profitFeePercentage: BigNumber,
  streamingFeePercentage: BigNumber,
  highWatermark: BigNumber,
  lastProfitFeeTimestamp: BigNumber,
  lastStreamingFeeTimestamp: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'FeeInitialization',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      profitFeePeriod,
      highWatermarkResetPeriod,
      profitFeePercentage,
      streamingFeePercentage,
      highWatermark,
      lastProfitFeeTimestamp,
      lastStreamingFeeTimestamp,
    },
  }];
}

export function getExpectedFeeAdjustmentLog(
  rebalancingSetToken: Address,
  feeType: BigNumber,
  newFeePercentage: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'FeeAdjustment',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      feeType,
      newFeePercentage,
    },
  }];
}