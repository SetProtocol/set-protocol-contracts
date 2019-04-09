import constants from './constants';

export default {
  minimumRebalanceInterval: {
    production: constants.ONE_DAY_IN_SECONDS,
    staging: constants.ONE_MINUTE_IN_SECONDS,
    development: constants.ONE_MINUTE_IN_SECONDS,
  },
  minimumRebalanceProposalPeriod: {
    production: constants.ONE_HOUR_IN_SECONDS * 6,
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
  transferProxyTimeLockPeriod: {
    production: 7 * constants.ONE_DAY_IN_SECONDS,
    staging: 7 * constants.ONE_DAY_IN_SECONDS,
    development: 7 * constants.ONE_DAY_IN_SECONDS,
  },
  vaultTimeLockPeriod: {
    production: 7 * constants.ONE_DAY_IN_SECONDS,
    staging: 7 * constants.ONE_DAY_IN_SECONDS,
    development: 7 * constants.ONE_DAY_IN_SECONDS,
  },
  generalTimeLockPeriod: {
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