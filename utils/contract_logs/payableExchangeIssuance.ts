import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogPayableExchangeIssue(
  setAddress: Address,
  callerAddress: Address,
  etherQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogPayableExchangeIssue',
    address: contractAddress,
    args: {
      setAddress,
      callerAddress,
      etherQuantity,
    },
  }];
}

export function LogPayableExchangeRedeem(
  setAddress: Address,
  callerAddress: Address,
  etherQuantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogPayableExchangeRedeem',
    address: contractAddress,
    args: {
      setAddress,
      callerAddress,
      etherQuantity,
    },
  }];
}
