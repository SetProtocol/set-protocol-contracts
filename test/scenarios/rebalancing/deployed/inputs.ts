require('module-alias/register');

import { BigNumber } from 'set-protocol-utils';
import { ZERO } from '@utils/constants';

import { AssetScenario } from './types';
import CONSTANTS from '../constants';

import deploymentConstants from '../../../../deployments/constants';

import { DEPLOYED_SETS_INFO, DEPENDENCY } from '@deployments/deployedContractParameters';

const BITETH_BTC_DOMINANT_CONFIG = DEPLOYED_SETS_INFO.BITETH_BTC_DOMINANT;
const BITETH_ETH_DOMINANT_CONFIG = DEPLOYED_SETS_INFO.BITETH_ETH_DOMINANT;
const BTCDAI_BTD_CONFIG = DEPLOYED_SETS_INFO.BTCDAI_LONG_TERM_BTD;
const ETHDAI_BTD_CONFIG = DEPLOYED_SETS_INFO.ETHDAI_LONG_TERM_BTD;

export const BITETH_BTC_DOMINANT: AssetScenario  = {
  scenarioCount: 8,
  assetOne: DEPENDENCY.WBTC,
  assetTwo: DEPENDENCY.WETH,
  assetOneMedianizer: DEPENDENCY.WBTC_MEDIANIZER,
  assetTwoMedianizer: DEPENDENCY.WETH_MEDIANIZER,
  rebalancingSetName: BITETH_BTC_DOMINANT_CONFIG.SET_NAME,
  collateralSetName: BITETH_BTC_DOMINANT_CONFIG.COLLATERAL_NAME,
  managerName: BITETH_BTC_DOMINANT_CONFIG.MANAGER_NAME,
  issuerAccounts: [1, 2],
  bidderAccounts: [3, 4],
  managerConfig: {
    pricePrecision: BITETH_BTC_DOMINANT_CONFIG.PRICE_PRECISION,
    assetOneMultiplier: BITETH_BTC_DOMINANT_CONFIG.WBTC_MULTIPLIER,
    assetTwoMultiplier: BITETH_BTC_DOMINANT_CONFIG.WETH_MULTIPLIER,
    lowerAllocationBound: new BigNumber(BITETH_BTC_DOMINANT_CONFIG.ALLOCATION_LOWER_BOUND.production),
    upperAllocationBound: new BigNumber(BITETH_BTC_DOMINANT_CONFIG.ALLOCATION_UPPER_BOUND.production),
    auctionTimeToPivot: new BigNumber(BITETH_BTC_DOMINANT_CONFIG.AUCTION_TIME_TO_PIVOT.production),
  },
  rebalancingSetConfig: {
    naturalUnit: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    rebalanceInterval: CONSTANTS.THIRTY_DAYS_IN_SECONDS,
    proposalPeriod: CONSTANTS.SECONDS_PER_DAY,
    initialPriceTarget: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    initialAssetOnePrice: deploymentConstants.WBTC.PRICE.mul(10 ** 18),
    initialAssetTwoPrice: deploymentConstants.WETH.PRICE.mul(10 ** 18),
    initialSetNaturalUnit: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    initialSetIssuances: [
      { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
      { sender: 2, amount: new BigNumber(1).mul(10 ** 19) },
    ],
  },
  priceSchedule: {
    assetOne: [
      new BigNumber(5000).mul(10 ** 18),
      new BigNumber(5000).mul(10 ** 18),
      new BigNumber(10000).mul(10 ** 18),
      new BigNumber(4000).mul(10 ** 18),
      new BigNumber(4000).mul(10 ** 18),
      new BigNumber(3000).mul(10 ** 18),
      new BigNumber(2000).mul(10 ** 18),
      new BigNumber(4000).mul(10 ** 18),
    ],
    assetTwo: [
      new BigNumber(150).mul(10 ** 18),
      new BigNumber(300).mul(10 ** 18),
      new BigNumber(1000).mul(10 ** 18),
      new BigNumber(1000).mul(10 ** 18),
      new BigNumber(600).mul(10 ** 18),
      new BigNumber(500).mul(10 ** 18),
      new BigNumber(2500).mul(10 ** 18),
      new BigNumber(1000).mul(10 ** 18),
    ],
  },
  issuanceSchedule: {
    issuances: [
      [], // Month 1
      [ // Month 2
        { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 3
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 4
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 5
      [], // Month 6
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 7
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 8
    ],
    redemptions: [
      [  // Month 1
        { sender: 1, amount: new BigNumber(1).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 2
      [ // Month 3
        { sender: 1, amount: new BigNumber(1).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 4
      [], // Month 5
      [
        { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ], // Month 6
      [], // Month 7
      [], // Month 8
    ],
  },
  biddingSchedule: [
    [ // Month 1
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      {
        sender: 4,
        percentRemainingToBid: 51,
        secondsFromFairValue: ZERO, // 51% is used to capture any remaining dust needed to complete
                                    // the auction
      },
    ],
    [ // Month 2
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: new BigNumber(-3600) },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: new BigNumber(-3600) },
    ],
    [ // Month 3
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 4
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: new BigNumber(3600) },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: new BigNumber(3600) },
    ],
    [ // Month 5
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 6
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 7
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 8
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
  ],
};

export const BITETH_ETH_DOMINANT: AssetScenario  = {
  scenarioCount: 8,
  assetOne: DEPENDENCY.WBTC,
  assetTwo: DEPENDENCY.WETH,
  assetOneMedianizer: DEPENDENCY.WBTC_MEDIANIZER,
  assetTwoMedianizer: DEPENDENCY.WETH_MEDIANIZER,
  rebalancingSetName: BITETH_ETH_DOMINANT_CONFIG.SET_NAME,
  collateralSetName: BITETH_ETH_DOMINANT_CONFIG.COLLATERAL_NAME,
  managerName: BITETH_ETH_DOMINANT_CONFIG.MANAGER_NAME,
  issuerAccounts: [1, 2],
  bidderAccounts: [3, 4],
  managerConfig: {
    pricePrecision: BITETH_ETH_DOMINANT_CONFIG.PRICE_PRECISION,
    assetOneMultiplier: BITETH_ETH_DOMINANT_CONFIG.WBTC_MULTIPLIER,
    assetTwoMultiplier: BITETH_ETH_DOMINANT_CONFIG.WETH_MULTIPLIER,
    lowerAllocationBound: new BigNumber(BITETH_ETH_DOMINANT_CONFIG.ALLOCATION_LOWER_BOUND.production),
    upperAllocationBound: new BigNumber(BITETH_ETH_DOMINANT_CONFIG.ALLOCATION_UPPER_BOUND.production),
    auctionTimeToPivot: new BigNumber(BITETH_ETH_DOMINANT_CONFIG.AUCTION_TIME_TO_PIVOT.production),
  },
  rebalancingSetConfig: {
    naturalUnit: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    rebalanceInterval: CONSTANTS.THIRTY_DAYS_IN_SECONDS,
    proposalPeriod: CONSTANTS.SECONDS_PER_DAY,
    initialPriceTarget: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    initialAssetOnePrice: deploymentConstants.WBTC.PRICE.mul(10 ** 18),
    initialAssetTwoPrice: deploymentConstants.WETH.PRICE.mul(10 ** 18),
    initialSetNaturalUnit: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    initialSetIssuances: [
      { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
      { sender: 2, amount: new BigNumber(1).mul(10 ** 19) },
    ],
  },
  priceSchedule: {
    assetOne: [
      new BigNumber(5000).mul(10 ** 18),
      new BigNumber(5000).mul(10 ** 18),
      new BigNumber(10000).mul(10 ** 18),
      new BigNumber(4000).mul(10 ** 18),
      new BigNumber(4000).mul(10 ** 18),
      new BigNumber(1500).mul(10 ** 18),
      new BigNumber(1000).mul(10 ** 18),
      new BigNumber(4000).mul(10 ** 18),
    ],
    assetTwo: [
      new BigNumber(150).mul(10 ** 18),
      new BigNumber(300).mul(10 ** 18),
      new BigNumber(1000).mul(10 ** 18),
      new BigNumber(1000).mul(10 ** 18),
      new BigNumber(700).mul(10 ** 18),
      new BigNumber(600).mul(10 ** 18),
      new BigNumber(1100).mul(10 ** 18),
      new BigNumber(1000).mul(10 ** 18),
    ],
  },
  issuanceSchedule: {
    issuances: [
      [], // Month 1
      [ // Month 2
        { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 3
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 4
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 5
      [], // Month 6
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 7
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 8
    ],
    redemptions: [
      [  // Month 1
        { sender: 1, amount: new BigNumber(1).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 2
      [ // Month 3
        { sender: 1, amount: new BigNumber(1).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 4
      [], // Month 5
      [
        { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ], // Month 6
      [], // Month 7
      [], // Month 8
    ],
  },
  biddingSchedule: [
    [ // Month 1
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      {
        sender: 4,
        percentRemainingToBid: 51,
        secondsFromFairValue: ZERO, // 51% is used to capture any remaining dust needed to complete
                                    // the auction
      },
    ],
    [ // Month 2
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: new BigNumber(-3600) },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: new BigNumber(-3600) },
    ],
    [ // Month 3
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 4
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: new BigNumber(3600) },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: new BigNumber(3600) },
    ],
    [ // Month 5
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 6
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 7
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 8
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
  ],
};

export const BTCDAI_BTD: AssetScenario  = {
  scenarioCount: 8,
  assetOne: DEPENDENCY.WBTC,
  assetTwo: DEPENDENCY.DAI,
  assetOneMedianizer: DEPENDENCY.WBTC_MEDIANIZER,
  assetTwoMedianizer: undefined,
  rebalancingSetName: BTCDAI_BTD_CONFIG.SET_NAME,
  collateralSetName: BTCDAI_BTD_CONFIG.COLLATERAL_NAME,
  managerName: BTCDAI_BTD_CONFIG.MANAGER_NAME,
  issuerAccounts: [1, 2],
  bidderAccounts: [3, 4],
  managerConfig: {
    pricePrecision: BTCDAI_BTD_CONFIG.PRICE_PRECISION,
    assetOneMultiplier: BTCDAI_BTD_CONFIG.WBTC_MULTIPLIER,
    assetTwoMultiplier: BTCDAI_BTD_CONFIG.DAI_MULTIPLIER,
    lowerAllocationBound: new BigNumber(BTCDAI_BTD_CONFIG.ALLOCATION_LOWER_BOUND.production),
    upperAllocationBound: new BigNumber(BTCDAI_BTD_CONFIG.ALLOCATION_UPPER_BOUND.production),
    auctionTimeToPivot: new BigNumber(BTCDAI_BTD_CONFIG.AUCTION_TIME_TO_PIVOT.production),
  },
  rebalancingSetConfig: {
    naturalUnit: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    rebalanceInterval: CONSTANTS.THIRTY_DAYS_IN_SECONDS,
    proposalPeriod: CONSTANTS.SECONDS_PER_DAY,
    initialPriceTarget: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    initialAssetOnePrice: deploymentConstants.WBTC.PRICE.mul(10 ** 18),
    initialAssetTwoPrice: deploymentConstants.DAI.PRICE.mul(10 ** 18),
    initialSetNaturalUnit: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    initialSetIssuances: [
      { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
      { sender: 2, amount: new BigNumber(1).mul(10 ** 19) },
    ],
  },
  priceSchedule: {
    assetOne: [
      new BigNumber(8000).mul(10 ** 18),
      new BigNumber(20000).mul(10 ** 18),
      new BigNumber(10000).mul(10 ** 18),
      new BigNumber(4000).mul(10 ** 18),
      new BigNumber(1500).mul(10 ** 18),
      new BigNumber(500).mul(10 ** 18),
      new BigNumber(300).mul(10 ** 18),
      new BigNumber(100).mul(10 ** 18),
    ],
    assetTwo: [
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
    ],
  },
  issuanceSchedule: {
    issuances: [
      [], // Month 1
      [ // Month 2
        { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 3
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 4
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 5
      [], // Month 6
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 7
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 8
    ],
    redemptions: [
      [  // Month 1
        { sender: 1, amount: new BigNumber(1).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 2
      [ // Month 3
        { sender: 1, amount: new BigNumber(1).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 4
      [], // Month 5
      [
        { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ], // Month 6
      [], // Month 7
      [], // Month 8
    ],
  },
  biddingSchedule: [
    [ // Month 1
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      {
        sender: 4,
        percentRemainingToBid: 51,
        secondsFromFairValue: ZERO, // 51% is used to capture any remaining dust needed to complete
                                    // the auction
      },
    ],
    [ // Month 2
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: new BigNumber(-3600) },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: new BigNumber(-3600) },
    ],
    [ // Month 3
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 4
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: new BigNumber(3600) },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: new BigNumber(3600) },
    ],
    [ // Month 5
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 6
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 7
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 8
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
  ],
};

export const ETHDAI_BTD: AssetScenario  = {
  scenarioCount: 8,
  assetOne: DEPENDENCY.WETH,
  assetTwo: DEPENDENCY.DAI,
  assetOneMedianizer: DEPENDENCY.WETH_MEDIANIZER,
  assetTwoMedianizer: undefined,
  rebalancingSetName: ETHDAI_BTD_CONFIG.SET_NAME,
  collateralSetName: ETHDAI_BTD_CONFIG.COLLATERAL_NAME,
  managerName: ETHDAI_BTD_CONFIG.MANAGER_NAME,
  issuerAccounts: [1, 2],
  bidderAccounts: [3, 4],
  managerConfig: {
    pricePrecision: ETHDAI_BTD_CONFIG.PRICE_PRECISION,
    assetOneMultiplier: ETHDAI_BTD_CONFIG.WETH_MULTIPLIER,
    assetTwoMultiplier: ETHDAI_BTD_CONFIG.DAI_MULTIPLIER,
    lowerAllocationBound: new BigNumber(ETHDAI_BTD_CONFIG.ALLOCATION_LOWER_BOUND.production),
    upperAllocationBound: new BigNumber(ETHDAI_BTD_CONFIG.ALLOCATION_UPPER_BOUND.production),
    auctionTimeToPivot: new BigNumber(ETHDAI_BTD_CONFIG.AUCTION_TIME_TO_PIVOT.production),
  },
  rebalancingSetConfig: {
    naturalUnit: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    rebalanceInterval: CONSTANTS.THIRTY_DAYS_IN_SECONDS,
    proposalPeriod: CONSTANTS.SECONDS_PER_DAY,
    initialPriceTarget: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    initialAssetOnePrice: deploymentConstants.WETH.PRICE.mul(10 ** 18),
    initialAssetTwoPrice: deploymentConstants.DAI.PRICE.mul(10 ** 18),
    initialSetNaturalUnit: CONSTANTS.DEFAULT_REBALANCING_NATURAL_UNIT,
    initialSetIssuances: [
      { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
      { sender: 2, amount: new BigNumber(1).mul(10 ** 19) },
    ],
  },
  priceSchedule: {
    assetOne: [
      new BigNumber(300).mul(10 ** 18),
      new BigNumber(500).mul(10 ** 18),
      new BigNumber(200).mul(10 ** 18),
      new BigNumber(1000).mul(10 ** 18),
      new BigNumber(5000).mul(10 ** 18),
      new BigNumber(1500).mul(10 ** 18),
      new BigNumber(500).mul(10 ** 18),
      new BigNumber(200).mul(10 ** 18),
    ],
    assetTwo: [
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
      new BigNumber(1).mul(10 ** 18),
    ],
  },
  issuanceSchedule: {
    issuances: [
      [], // Month 1
      [ // Month 2
        { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 3
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 4
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 5
      [], // Month 6
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 7
      [{ sender: 1, amount: new BigNumber(5).mul(10 ** 18) }], // Month 8
    ],
    redemptions: [
      [  // Month 1
        { sender: 1, amount: new BigNumber(1).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 2
      [ // Month 3
        { sender: 1, amount: new BigNumber(1).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ],
      [], // Month 4
      [], // Month 5
      [
        { sender: 1, amount: new BigNumber(5).mul(10 ** 18) },
        { sender: 2, amount: new BigNumber(2).mul(10 ** 18) },
      ], // Month 6
      [], // Month 7
      [], // Month 8
    ],
  },
  biddingSchedule: [
    [ // Month 1
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      {
        sender: 4,
        percentRemainingToBid: 51,
        secondsFromFairValue: ZERO, // 51% is used to capture any remaining dust needed to complete
                                    // the auction
      },
    ],
    [ // Month 2
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: new BigNumber(-3600) },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: new BigNumber(-3600) },
    ],
    [ // Month 3
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 4
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: new BigNumber(3600) },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: new BigNumber(3600) },
    ],
    [ // Month 5
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 6
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 7
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
    [ // Month 8
      { sender: 3, percentRemainingToBid: 50, secondsFromFairValue: ZERO },
      { sender: 4, percentRemainingToBid: 51, secondsFromFairValue: ZERO },
    ],
  ],
};
