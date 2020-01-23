import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function BidPlacedWithEth(
  rebalancingSetToken: Address,
  bidder: Address,
  quantity: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'BidPlacedWithEth',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      bidder,
      quantity,
    },
  }];
}
