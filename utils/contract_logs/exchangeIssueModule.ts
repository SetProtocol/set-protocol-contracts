import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogExchangeIssue(
  setAddress: Address,
  callerAddress: Address,
  quantity: BigNumber,
  sentTokens: Address[],
  sentTokenAmounts: BigNumber[],
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogExchangeIssue',
    address: contractAddress,
    args: {
      setAddress,
      callerAddress,
      quantity,
      sentTokens,
      sentTokenAmounts,
    },
  }];
}
