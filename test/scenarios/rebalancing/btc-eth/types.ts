import { Address } from 'set-protocol-utils';
import { BigNumber } from 'set-protocol-utils';

export interface IssuanceSchedule {
  issuances: IssuanceTxn[];
  redemptions: IssuanceTxn[];
}

export interface UserAccountData {
  bidderOne: Address;
  bidderTwo: Address;
  bidderThree: Address;
  bidderFour: Address;
  bidderFive: Address;
  tokenOwnerOne: Address;
  tokenOwnerTwo: Address;
  tokenOwnerThree: Address;
  tokenOwnerFour: Address;
  tokenOwnerFive: Address;
  bidders: Address[];
  tokenOwners: Address[];
}

export interface TokenBalances {
  WBTC: BigNumber;
  WETH: BigNumber;
  RebalancingSet: BigNumber;
}

export interface UserTokenBalances {
  bidderOne: TokenBalances;
  bidderTwo: TokenBalances;
  bidderThree: TokenBalances;
  bidderFour: TokenBalances;
  bidderFive: TokenBalances;
  tokenOwnerOne: TokenBalances;
  tokenOwnerTwo: TokenBalances;
  tokenOwnerThree: TokenBalances;
  tokenOwnerFour: TokenBalances;
  tokenOwnerFive: TokenBalances;
}

export interface GasProfiler {
  coreMock?: BigNumber;
  transferProxy?: BigNumber;
  vault?: BigNumber;
  rebalanceAuctionModule?: BigNumber;
  factory?: BigNumber;
  rebalancingComponentWhiteList?: BigNumber;
  rebalancingFactory?: BigNumber;
  linearAuctionPriceCurve?: BigNumber;
  btcethRebalancingManager?: BigNumber;
  addTokenToWhiteList?: BigNumber;
  createInitialBaseSet?: BigNumber;
  createRebalancingSet?: BigNumber;
  issueInitialBaseSet?: BigNumber;
  issueRebalancingSet?: BigNumber;
  redeemRebalancingSet?: BigNumber;
  proposeRebalance?: BigNumber;
  startRebalance?: BigNumber;
  bid?: BigNumber;
  settleRebalance?: BigNumber;
}

export interface TokenPrices {
  WBTCPrice: BigNumber;
  WETHPrice: BigNumber;
}

export interface BidTxn {
  sender: Address;
  amount: BigNumber;
  price: BigNumber;
}

export interface IssuanceTxn {
  sender: Address;
  amount: BigNumber;
}

export interface InitializationParameters {
  btcMultiplier: BigNumber;
  ethMultiplier: BigNumber;
  lowerAllocationBound: BigNumber;
  upperAllocationBound: BigNumber;
  initialTokenPrices: TokenPrices;
  initialSetIssueQuantity: BigNumber;
  initialSetUnits: BigNumber[];
  initialSetNaturalUnit: BigNumber;
  rebalancingSetIssueQuantity: BigNumber;
  rebalancingSetUnitShares: BigNumber[];
  rebalancingSetNaturalUnit: BigNumber;
  proposalPeriod: BigNumber;
  rebalanceInterval: BigNumber;
  auctionTimeToPivot: BigNumber;
  priceDivisor: BigNumber;
}

export interface GeneralRebalancingData {
  baseSets: Address[];
  minimumBid: BigNumber;
  initialRemainingSets: BigNumber;
}

export interface SingleRebalanceCycleScenario {
  issueRedeemSchedule: IssuanceSchedule;
  priceUpdate: TokenPrices;
  biddingSchedule: BidTxn[];
}

export interface FullRebalanceProgram {
  rebalanceIterations: number;
  initializationParams: InitializationParameters;
  generalRebalancingData: GeneralRebalancingData;
  cycleData: SingleRebalanceCycleScenario[];
}

export interface DataOutput {
  collateralizingSets?: BigNumber[];
  issuedRebalancingSets?: BigNumber[];
  rebalanceFairValues?: BigNumber[];
  rebalancingSetComponentDust?: TokenBalances[];
  rebalancingSetBaseSetDust?: BigNumber[];
  gasProfile: GasProfiler;
}