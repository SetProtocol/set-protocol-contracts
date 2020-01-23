import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function BidPlacedCToken(
  rebalancingSetToken: Address,
  bidder: Address,
  quantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'BidPlacedCToken',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      bidder,
      quantity,
    },
  }];
}
