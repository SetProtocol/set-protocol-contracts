import { Address } from 'set-protocol-utils';
import { BigNumber } from 'set-protocol-utils';

export interface AssetScenario {
  scenarioCount: number;
  assetOne: string;
  assetTwo: string;
  assetOneMedianizer: string;
  assetTwoMedianizer: string;
  rebalancingSetName: string;
  collateralSetName: string;
  managerName: string;
  issuerAccounts: number[];
  bidderAccounts: number[];
  managerConfig: ManagerConfig;
  rebalancingSetConfig: RebalancingSetConfig;
  priceSchedule: PriceSchedule;
  issuanceSchedule: NewIssuanceSchedule;
  biddingSchedule: (BidTransaction[])[];
}

export interface ManagerConfig {
  pricePrecision: BigNumber;
  assetOneMultiplier: BigNumber;
  assetTwoMultiplier: BigNumber;
  lowerAllocationBound: BigNumber;
  upperAllocationBound: BigNumber;
  auctionTimeToPivot: BigNumber;
}

export interface RebalancingSetConfig {
  naturalUnit: BigNumber;
  rebalanceInterval: BigNumber;
  proposalPeriod: BigNumber;
  initialPriceTarget: BigNumber;
  initialAssetOnePrice: BigNumber;
  initialAssetTwoPrice: BigNumber;
  initialSetNaturalUnit: BigNumber;
  initialSetIssuances: NewIssuanceTxn[];
}

export interface NewIssuanceSchedule {
  issuances: (NewIssuanceTxn[])[];
  redemptions: (NewIssuanceTxn[])[];
}

export interface NewIssuanceTxn {
  sender: number;  // Account number
  amount: BigNumber;
}

export interface PriceSchedule {
  assetOne: BigNumber[];
  assetTwo: BigNumber[];
}

export interface BidTransaction {
  sender: number;
  percentRemainingToBid: number;
  secondsFromFairValue: BigNumber;
}
