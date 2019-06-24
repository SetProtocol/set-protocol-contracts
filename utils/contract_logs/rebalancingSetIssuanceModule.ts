import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogRebalancingSetIssue(
  rebalancingSetAddress: Address,
  callerAddress: Address,
  rebalancingSetQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogRebalancingSetIssue',
    address: contractAddress,
    args: {
      rebalancingSetAddress,
      callerAddress,
      rebalancingSetQuantity,
    },
  }];
}

export function LogRebalancingSetRedeem(
  rebalancingSetAddress: Address,
  callerAddress: Address,
  rebalancingSetQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogRebalancingSetRedeem',
    address: contractAddress,
    args: {
      rebalancingSetAddress,
      callerAddress,
      rebalancingSetQuantity,
    },
  }];
}
