import { BigNumber } from 'bignumber.js';
import { Address, Log } from 'set-protocol-utils';

export function getExpectedFeeActualizedLog(
  rebalancingSetToken: Address,
  newHighWatermark: BigNumber,
  inflationFee: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'FeeActualized',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      newHighWatermark,
      inflationFee,
    },
  }];
}