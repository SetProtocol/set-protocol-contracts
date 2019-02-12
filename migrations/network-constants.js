const constants = require('./constants');

var config = {
  minimumRebalanceInterval: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_MINUTE_IN_SECONDS,
    development: constants.ONE_MINUTE_IN_SECONDS
  },
  minimumProposalPeriod: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_MINUTE_IN_SECONDS,
    development: constants.ONE_MINUTE_IN_SECONDS
  },
  minimumTimeToPivot: {
    main: (constants.ONE_DAY_IN_SECONDS / 4),
    kovan: 0,
    development: 0
  },
  maximumTimeToPivot: {
    main: (constants.ONE_DAY_IN_SECONDS * 3),
    kovan: (constants.ONE_DAY_IN_SECONDS  * 3),
    development: (constants.ONE_DAY_IN_SECONDS * 3)
  },
  timeLockPeriod: {
    main: 0,
    kovan: 0,
    development: 0,
  },
  linearAuctionPriceCurve: {
    main: true,
    kovan: true,
    development: true
  },
  constantsAuctionPriceCurve: {
    main: false,
    kovan: true,
    development: true
  },
  rebalancingSetProposalPeriod: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS
  },
  rebalancingSetRebalanceInterval: {
    main: constants.THIRTY_DAYS_IN_SECONDS,
    kovan: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS
  },
  rebalancingSetAuctionTimeToPivot: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_HOUR_IN_SECONDS,
    main: constants.ONE_DAY_IN_SECONDS
  },
  networkId: {
    main: 1,
    ropsten: 3,
    kovan: 42,
    development: 531
  }
}

module.exports = config;