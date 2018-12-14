import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogExchangeIssue(
  setAddress: Address,
  callerAddress: Address,
  paymentToken: Address,
  quantity: BigNumber,
  paymentTokenAmount: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogExchangeIssue',
    address: contractAddress,
    args: {
      setAddress,
      callerAddress,
      paymentToken,
      quantity,
      paymentTokenAmount,
    },
  }];
}
