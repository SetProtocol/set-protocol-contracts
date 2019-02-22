import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogExchangeRedemption(
  setAddress: Address,
  callerAddress: Address,
  redemptionToken: Address,
  quantity: BigNumber,
  redemptionTokenAmount: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogExchangeRedemption',
    address: contractAddress,
    args: {
      setAddress,
      callerAddress,
      redemptionToken,
      quantity,
      redemptionTokenAmount,
    },
  }];
}
