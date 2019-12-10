import * as _ from 'lodash';
import { BigNumber } from 'bignumber.js';
import {
  Address,
}  from 'set-protocol-utils';

export interface LinearAuction {
  auction: Auction;
  endTime: BigNumber;
  startPriceScaled: BigNumber;
  endPriceScaled: BigNumber;
}

export interface Price {
  numerator: BigNumber;
  denominator: BigNumber;
}

export interface TokenFlow {
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
    startPriceScaled: new BigNumber(input.startPriceScaled),
    endPriceScaled: new BigNumber(input.endPriceScaled),
  };
}