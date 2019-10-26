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

export interface Auction {
  minimumBid: Auction;
  startTime: BigNumber;
  startingCurrentSets: BigNumber;
  remainingCurrentSets: BigNumber;
  combinedTokenArray: Address[];
  combinedCurrentSetUnits: BigNumber[];
  combinedNextSetUnits: BigNumber[];
}

export function getLinearAuction(input: any): LinearAuction {
  return {
    auction: {
      minimumBid: input.auction.minimumBid,
      startTime: input.auction.startTime,
      startingCurrentSets: input.auction.startingCurrentSets,
      remainingCurrentSets: input.auction.remainingCurrentSets,
      combinedTokenArray: input.auction.combinedTokenArray,
      combinedCurrentSetUnits: input.auction.combinedCurrentSetUnits,
      combinedNextSetUnits: input.auction.combinedNextSetUnits,
    },
    endTime: input.endTime,
    startPrice: input.startPrice,
    endPrice: input.endPrice,
  }
}