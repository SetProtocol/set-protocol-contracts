import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function BidPlaced(
  rebalancingSetToken: Address,
  bidder: Address,
  rebalancingSetQuantity: BigNumber,
  combinedTokenAddresses: Address[],
  inflowTokenUnits: BigNumber[],
  outflowTokenUnits: BigNumber[],
  contractAddress: Address,
): Log[] {
  return [{
    event: 'BidPlaced',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      bidder,
      rebalancingSetQuantity,
      combinedTokenAddresses,
      inflowTokenUnits,
      outflowTokenUnits,
    },
  }];
}
