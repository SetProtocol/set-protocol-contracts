import constants from './constants';

export default {
  minimumRebalanceInterval: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.ONE_MINUTE_IN_SECONDS,
    development: constants.ONE_MINUTE_IN_SECONDS,
  },
  minimumRebalanceProposalPeriod: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.ONE_MINUTE_IN_SECONDS,
    development: constants.ONE_MINUTE_IN_SECONDS,
  },
  minimumRebalanceTimeToPivot: {
    production: (constants.ONE_DAY_IN_SECONDS / 4),
    staging: 0,
    development: 0,
  },
  maximumRebalanceTimeToPivot: {
    production: (constants.ONE_DAY_IN_SECONDS * 3),
    staging: (constants.ONE_DAY_IN_SECONDS  * 3),
    development: (constants.ONE_DAY_IN_SECONDS * 3),
  },
  bitEthProposalPeriod: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  bitEthRebalanceInterval: {
    production: constants.THIRTY_DAYS_IN_SECONDS,
    staging: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  bitEthRebalanceManagerAuctionTimeToPivot: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.ONE_HOUR_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  bitEthRebalanceManagerAllocationUpperBound: {
    production: 2,
    staging: 0,
    development: 0,
  },
  bitEthRebalanceManagerAllocationLowerBound: {
    production: 2,
    staging: 0,
    development: 0,
  },
  ethDaiProposalPeriod: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  ethDaiRebalanceInterval: {
    production: constants.THIRTY_DAYS_IN_SECONDS,
    staging: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  ethDaiRebalanceManagerAuctionTimeToPivot: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.ONE_HOUR_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  ethDaiRebalanceManagerAllocationUpperBound: {
    production: 10,
    staging: 0,
    development: 0,
  },
  ethDaiRebalanceManagerAllocationLowerBound: {
    production: 10,
    staging: 0,
    development: 0,
  },
  btcDaiProposalPeriod: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  btcDaiRebalanceInterval: {
    production: constants.THIRTY_DAYS_IN_SECONDS,
    staging: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  btcDaiRebalanceManagerAuctionTimeToPivot: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.ONE_HOUR_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  btcDaiRebalanceManagerAllocationUpperBound: {
    production: 10,
    staging: 0,
    development: 0,
  },
  btcDaiRebalanceManagerAllocationLowerBound: {
    production: 10,
    staging: 0,
    development: 0,
  },
  timeLockPeriod: {
    production: 0,
    staging: 0,
    development: 0,
  },
  linearAuctionPriceCurve: {
    production: true,
    staging: true,
    development: true,
  },
  constantsAuctionPriceCurve: {
    production: false,
    staging: true,
    development: true,
  },
};