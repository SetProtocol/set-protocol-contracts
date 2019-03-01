import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogExchangeIssue(
  setAddress: Address,
  callerAddress: Address,
  quantity: BigNumber,
  sendTokens: Address[],
  sendTokenAmounts: BigNumber[],
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogExchangeIssue',
    address: contractAddress,
    args: {
      setAddress,
      callerAddress,
      quantity,
      sendTokens,
      sendTokenAmounts,
    },
  }];
}

export function LogExchangeRedeem(
  setAddress: Address,
  callerAddress: Address,
  quantity: BigNumber,
  receiveTokens: Address[],
  receiveTokenAmounts: BigNumber[],
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogExchangeRedeem',
    address: contractAddress,
    args: {
      setAddress,
      callerAddress,
      quantity,
      receiveTokens,
      receiveTokenAmounts,
    },
  }];
}
