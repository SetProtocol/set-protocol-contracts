import { BigNumber } from 'bignumber.js';
import { Address, Log } from '../../types/common';


export function getExpectedTransferLog(
  from: Address,
  to: Address,
  value: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'Transfer',
    address: contractAddress,
    args: {
      from,
      to,
      value,
    },
  }];
}