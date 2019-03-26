import BigNumber from 'bignumber.js';

const SECONDS_PER_DAY = new BigNumber(86400);

export default {
  // TIME: {
  SECONDS_PER_DAY: SECONDS_PER_DAY,
  THIRTY_DAYS_IN_SECONDS: SECONDS_PER_DAY.mul(30),

  // PROTOCOL
  PRICE_DIVISOR: new BigNumber(1000),

  // Price Feed
  PRICE_FEED_TRUNCATION: new BigNumber(10 ** 18),

  // BASE_SET
  SET_FULL_TOKEN_UNITS: new BigNumber(10 ** 18),

  // REBALANCING_SET
  DEFAULT_REBALANCING_NATURAL_UNIT: new BigNumber(10 ** 6),
  REBALANCING_SET_USD_PRICE: new BigNumber(100),
  REBALANCE_INTERVAL: new BigNumber(28).mul(SECONDS_PER_DAY),
  PROPOSAL_PERIOD: new BigNumber(1).mul(SECONDS_PER_DAY),
  TIME_TO_PIVOT: new BigNumber(SECONDS_PER_DAY),

  // MANAGER
  DEFAULT_COLLATERAL_NATURAL_UNIT: new BigNumber(10 ** 10),
  WETH_DOMINANT_COLLATERAL_NATURAL_UNIT: new BigNumber(10 ** 12),
  // ASSET
  WBTC: {
    DECIMALS: 8,
    FULL_UNIT: new BigNumber(10 ** 8),
    DEFAULT_UNIT: new BigNumber(1),
    INITIAL_FEED_PRICE: new BigNumber(3.711).mul(10 ** 21),
  },
  WETH: {
    DECIMALS: 18,
    FULL_UNIT: new BigNumber(10 ** 18),
    INITIAL_FEED_PRICE: new BigNumber(1.28).mul(10 ** 20),
  },
  DAI: {
    DECIMALS: 18,
    FULL_UNIT: new BigNumber(10 ** 18),
  }
};