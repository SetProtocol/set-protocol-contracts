import { Address, Log } from 'set-protocol-utils';

export function BidPlacedWithEth(
  rebalancingSetToken: Address,
  bidder: Address,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'BidPlacedWithEth',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      bidder,
    },
  }];
}
