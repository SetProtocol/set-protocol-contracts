import { BigNumber } from 'set-protocol-utils';

import CONSTANTS from '../constants';

import {
  BidTxn,
  GeneralRebalancingData,
  InitializationParameters,
  IssuanceTxn,
  IssuanceSchedule,
  FullRebalanceProgram,
  SingleRebalanceCycleScenario,
  TokenPrices
} from './types';

export function getScenarioData(accounts): FullRebalanceProgram {
  const initializationParams: InitializationParameters = getInitializationData();

  const generalRebalancingData: GeneralRebalancingData = {
    baseSets: [],
    minimumBid: new BigNumber(0),
    initialRemainingSets: new BigNumber(0),
  };
  const cycleData = getCycleData(accounts);
  const rebalanceIterations = 2;

  return {
    rebalanceIterations,
    initializationParams,
    generalRebalancingData,
    cycleData,
  };
}

function getCycleData(accounts): SingleRebalanceCycleScenario[] {
  const BTC_PRICE_PROPOSAL = CONSTANTS.WBTC.INITIAL_FEED_PRICE.mul(1.1);

  // Bid Assumptions
  const BID_ONE_PRICE = new BigNumber(0.004776);
  const BID_TWO_PRICE = new BigNumber(0.019102);
  const BID_ONE_QUANTITY = new BigNumber(0.5);
  const BID_TWO_QUANTITY = new BigNumber(0.5);

  // Rebalancing Cycle 1
  const issueRedeemScheduleOne: IssuanceSchedule = {
    issuances: [],
    redemptions: [],
  };
  const priceUpdateOne: TokenPrices = {
    WBTCPrice: BTC_PRICE_PROPOSAL,
    WETHPrice: CONSTANTS.WETH.INITIAL_FEED_PRICE,
  };
  const bidTxnOne: BidTxn = {
    sender: accounts[1],
    amount: BID_ONE_QUANTITY,
    price: BID_ONE_PRICE,
  };
  const bidTxnTwo: BidTxn = {
    sender: accounts[2],
    amount: BID_TWO_QUANTITY,
    price: BID_TWO_PRICE,
  };
  const biddingScheduleOne: BidTxn[] = [bidTxnOne, bidTxnTwo];
  const cycleScenarioOne: SingleRebalanceCycleScenario = {
    issueRedeemSchedule: issueRedeemScheduleOne,
    priceUpdate: priceUpdateOne,
    biddingSchedule: biddingScheduleOne,
  };

    // Rebalancing Cycle 2
  const issueTxnOne: IssuanceTxn = {
    sender: accounts[5],
    amount: new BigNumber(10 ** 21),
  };
  const redeemTxnOne: IssuanceTxn = {
    sender: accounts[6],
    amount: new BigNumber(5 * 10 ** 20),
  };
  const issueRedeemScheduleTwo: IssuanceSchedule = {
    issuances: [issueTxnOne],
    redemptions: [redeemTxnOne],
  };
  const priceUpdateTwo: TokenPrices = {
    WBTCPrice: new BigNumber(3.983).mul(10 ** 22),
    WETHPrice: new BigNumber(1.15).mul(10 ** 21),
  };
  const cycleTwoBidTxnOne: BidTxn = {
    sender: accounts[3],
    amount: new BigNumber(0.2),
    price: new BigNumber(-0.005),
  };
  const cycleTwoBidTxnTwo: BidTxn = {
    sender: accounts[4],
    amount: new BigNumber(0.6),
    price: new BigNumber(0.01),
  };
  const cycleTwoBidTxnThree: BidTxn = {
    sender: accounts[2],
    amount: new BigNumber(0.2),
    price: new BigNumber(0.015),
  };
  const biddingScheduleTwo: BidTxn[] = [cycleTwoBidTxnOne, cycleTwoBidTxnTwo, cycleTwoBidTxnThree];
  const cycleScenarioTwo: SingleRebalanceCycleScenario = {
    issueRedeemSchedule: issueRedeemScheduleTwo,
    priceUpdate: priceUpdateTwo,
    biddingSchedule: biddingScheduleTwo,
  };

  return [cycleScenarioOne, cycleScenarioTwo];
}

function getInitializationData(): InitializationParameters {
  // Rebalancing Set Details
  const REBALANCING_SET_UNIT_SHARES = new BigNumber(1.35).mul(10 ** 6);
  const REBALANCING_SET_NATURAL_UNIT = new BigNumber(10 ** 10);

  // RB Manager Properties
  const btcMultiplier = new BigNumber(1);
  const ethMultiplier = new BigNumber(1);
  const lowerAllocationBound = new BigNumber(48);
  const upperAllocationBound = new BigNumber(48);

  // Rebalancing Details
  const REBALANCE_INTERVAL = new BigNumber(28).mul(CONSTANTS.SECONDS_PER_DAY);
  const PROPOSAL_PERIOD = new BigNumber(1).mul(CONSTANTS.SECONDS_PER_DAY);
  const TIME_TO_PIVOT = CONSTANTS.SECONDS_PER_DAY;
  const PRICE_DIVISOR = new BigNumber(1000);

  // Issue Quantity
  const BTC_ETH_ISSUE_QUANTITY = new BigNumber(10 ** 18);
  const UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY = BTC_ETH_ISSUE_QUANTITY
                                                  .mul(REBALANCING_SET_NATURAL_UNIT)
                                                  .div(REBALANCING_SET_UNIT_SHARES);

  // Round the number to a certain precision w/o rounding up
  const REBALANCING_SET_ISSUE_QUANTITY = UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY
    .minus(UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY
    .modulo(REBALANCING_SET_NATURAL_UNIT));

  // Base Component Constants
  const DECIMAL_DIFFERENCE = CONSTANTS.WETH.DECIMALS - CONSTANTS.WBTC.DECIMALS;
  const ETH_DECIMAL_EXPONENTIATION = new BigNumber(10 ** DECIMAL_DIFFERENCE);

  // Base Set Details
  const BTC_ETH_NATURAL_UNIT = new BigNumber(10 ** 10);
  const INITIAL_BTC_UNIT = new BigNumber(1);
  const INITIAL_ETH_UNIT = CONSTANTS.WBTC.INITIAL_FEED_PRICE
                          .div(CONSTANTS.WETH.INITIAL_FEED_PRICE)
                          .mul(ETH_DECIMAL_EXPONENTIATION)
                          .mul(CONSTANTS.WBTC.DEFAULT_UNIT);

  // Create Full Rebalance Object
  const initialTokenPrices: TokenPrices = {
    WBTCPrice: CONSTANTS.WBTC.INITIAL_FEED_PRICE,
    WETHPrice: CONSTANTS.WETH.INITIAL_FEED_PRICE,
  };
  return {
    btcMultiplier,
    ethMultiplier,
    lowerAllocationBound,
    upperAllocationBound,
    initialTokenPrices,
    initialSetIssueQuantity: BTC_ETH_ISSUE_QUANTITY,
    initialSetUnits: [INITIAL_BTC_UNIT, INITIAL_ETH_UNIT],
    initialSetNaturalUnit: BTC_ETH_NATURAL_UNIT,
    rebalancingSetIssueQuantity: REBALANCING_SET_ISSUE_QUANTITY,
    rebalancingSetUnitShares: [REBALANCING_SET_UNIT_SHARES],
    rebalancingSetNaturalUnit: REBALANCING_SET_NATURAL_UNIT,
    proposalPeriod: PROPOSAL_PERIOD,
    rebalanceInterval: REBALANCE_INTERVAL,
    auctionTimeToPivot: TIME_TO_PIVOT,
    priceDivisor: PRICE_DIVISOR,
  };
}

