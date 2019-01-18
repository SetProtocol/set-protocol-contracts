import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

export function LogManagerProposal(
  auctionStartPrice: BigNumber,
  auctionPivotPrice: BigNumber,
  btcPrice: BigNumber,
  ethPrice: BigNumber,
  currentSetDollarAmount: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'LogManagerProposal',
    address: contractAddress,
    args: {
      auctionStartPrice,
      auctionPivotPrice,
      btcPrice,
      ethPrice,
      currentSetDollarAmount,
    },
  }];
}
