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
    production: 52,
    staging: 50,
    development: 50,
  },
  bitEthRebalanceManagerAllocationLowerBound: {
    production: 48,
    staging: 50,
    development: 50,
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
    production: 60,
    staging: 50,
    development: 50,
  },
  ethDaiRebalanceManagerAllocationLowerBound: {
    production: 40,
    staging: 50,
    development: 50,
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