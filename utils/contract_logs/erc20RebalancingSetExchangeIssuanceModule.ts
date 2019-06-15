import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogERC20ExchangeIssue(
  rebalancingSetAddress: Address,
  callerAddress: Address,
  paymentToken: Address,
  paymentTokenQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogERC20ExchangeIssue',
    address: contractAddress,
    args: {
      rebalancingSetAddress,
      callerAddress,
      paymentToken,
      paymentTokenQuantity,
    },
  }];
}

export function LogERC20ExchangeRedeem(
  rebalancingSetAddress: Address,
  callerAddress: Address,
  rebalancingSetQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogERC20ExchangeRedeem',
    address: contractAddress,
    args: {
      rebalancingSetAddress,
      callerAddress,
      rebalancingSetQuantity,
    },
  }];
}
