import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogPayableExchangeIssue(
  rebalancingSetAddress: Address,
  callerAddress: Address,
  paymentTokenAddress: Address,
  rebalancingSetQuantity: BigNumber,
  paymentTokenReturned: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogPayableExchangeIssue',
    address: contractAddress,
    args: {
      rebalancingSetAddress,
      callerAddress,
      paymentTokenAddress,
      rebalancingSetQuantity,
      paymentTokenReturned,
    },
  }];
}

export function LogPayableExchangeRedeem(
  rebalancingSetAddress: Address,
  callerAddress: Address,
  outputTokenAddress: Address,
  rebalancingSetQuantity: BigNumber,
  outputTokenQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogPayableExchangeRedeem',
    address: contractAddress,
    args: {
      rebalancingSetAddress,
      callerAddress,
      outputTokenAddress,
      rebalancingSetQuantity,
      outputTokenQuantity,
    },
  }];
}
