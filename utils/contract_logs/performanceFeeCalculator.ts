import { BigNumber } from 'bignumber.js';
import { Address, Log } from 'set-protocol-utils';

export function getExpectedFeeActualizedLog(
  rebalancingSetToken: Address,
  newHighWatermark: BigNumber,
  profitFee: BigNumber,
  streamingFee: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'FeeActualized',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      newHighWatermark,
      profitFee,
      streamingFee,
    },
  }];
}