const constants = require('./constants');

var config = {
  minimumRebalanceInterval: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_MINUTE_IN_SECONDS,
    testing: constants.ONE_MINUTE_IN_SECONDS
  },
  minimumProposalPeriod: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_MINUTE_IN_SECONDS,
    testing: constants.ONE_MINUTE_IN_SECONDS
  },
  minimumTimeToPivot: {
    main: (constants.ONE_DAY_IN_SECONDS / 4),
    kovan: 0,
    testing: 0
  },
  maximumTimeToPivot: {
    main: (constants.ONE_DAY_IN_SECONDS * 3),
    kovan: (constants.ONE_DAY_IN_SECONDS  * 3),
    testing: (constants.ONE_DAY_IN_SECONDS * 3)
  },
  timeLockPeriod: {
    main: 0,
    kovan: 0,
    testing: 0,
  },
  linearAuctionPriceCurve: {
    main: true,
    kovan: true,
    testing: true
  },
  constantsAuctionPriceCurve: {
    main: false,
    kovan: true,
    testing: true
  },
  rebalancingSetProposalPeriod: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.THIRTY_MINUTES_IN_SECONDS,
    testing: constants.ONE_DAY_IN_SECONDS
  },
  rebalancingSetRebalanceInterval: {
    main: constants.THIRTY_DAYS_IN_SECONDS,
    kovan: constants.THIRTY_MINUTES_IN_SECONDS,
    testing: constants.ONE_DAY_IN_SECONDS
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
    testing: 50
  }
}

module.exports = config;