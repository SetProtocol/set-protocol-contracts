import { BigNumber } from 'bignumber.js';
import { Address, Log } from 'set-protocol-utils';

export function getExpectedChunkAuctionIteratedLog(
  rebalancingSetToken: Address,
  orderRemaining: BigNumber,
  startingCurrentSets: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'ChunkAuctionIterated',
    address: contractAddress,
    args: {
      rebalancingSetToken,
      orderRemaining,
      startingCurrentSets,
    },
  }];
}

export function getExpectedChunkSizeBoundUpdatedLog(
  assetOne: Address,
  assetTwo: Address,
  lowerBound: BigNumber,
  upperBound: BigNumber,
  contractAddress: Address,
): Log[] {
  return [{
    event: 'ChunkSizeBoundUpdated',
    address: contractAddress,
    args: {
      assetOne,
      assetTwo,
      lowerBound,
      upperBound,
    },
  }];
}