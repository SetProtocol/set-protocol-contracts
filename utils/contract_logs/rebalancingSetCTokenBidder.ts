import { Address, Log } from 'set-protocol-utils';

export function BidPlacedCToken(
  rebalancingSetToken: Address,
  bidder: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'BidPlacedCToken',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      bidder,
    },
  }];
}
