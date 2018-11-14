import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function BidPlaced(
  bidder: Address,
  quantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'BidPlaced',
    address: contractAddress,
    args: {
      bidder,
      quantity,
    },
  }];
}
