import * as _ from 'lodash';
import * as ethUtil from 'ethereumjs-util';
import { BigNumber } from 'bignumber.js';
import {
  SetProtocolUtils,
  Address,
  Bytes,
}  from 'set-protocol-utils';

export interface LinearAuction {
  auction: Auction;
  endTime: BigNumber;
  startPrice: BigNumber;
  endPrice: BigNumber;
}

export interface TokenFlows {
  addresses: Address[];
  inflow: BigNumber[];
  outflow: BigNumber[];
}

export interface Auction {
  minimumBid: BigNumber;
  startTime: BigNumber;
  startingCurrentSets: BigNumber;
  remainingCurrentSets: BigNumber;
  combinedTokenArray: Address[];
  combinedCurrentSetUnits: BigNumber[];
  combinedNextSetUnits: BigNumber[];
}

export function getLinearAuction(input: any): LinearAuction {
  const {
    minimumBid,
    startTime,
    startingCurrentSets,
    remainingCurrentSets,
    combinedCurrentSetUnits,
    combinedNextSetUnits,
  } = input.auction;

  return {
    auction: {
      minimumBid: new BigNumber(minimumBid),
      startTime: new BigNumber(startTime),
      startingCurrentSets: new BigNumber(startingCurrentSets),
      remainingCurrentSets: new BigNumber(remainingCurrentSets),
      combinedTokenArray: input.auction.combinedTokenArray,
      combinedCurrentSetUnits: combinedCurrentSetUnits.map(v => new BigNumber(v)),
      combinedNextSetUnits: combinedNextSetUnits.map(v => new BigNumber(v)),
    },
    endTime: new BigNumber(input.endTime),
    startPrice: new BigNumber(input.startPrice),
    endPrice: new BigNumber(input.endPrice),
  }
}