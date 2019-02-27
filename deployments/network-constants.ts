import constants from './constants';

export default {
  minimumRebalanceInterval: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_MINUTE_IN_SECONDS,
    development: constants.ONE_MINUTE_IN_SECONDS,
  },
  minimumRebalanceProposalPeriod: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_MINUTE_IN_SECONDS,
    development: constants.ONE_MINUTE_IN_SECONDS,
  },
  minimumRebalanceTimeToPivot: {
    main: (constants.ONE_DAY_IN_SECONDS / 4),
    kovan: 0,
    development: 0,
  },
  maximumRebalanceTimeToPivot: {
    main: (constants.ONE_DAY_IN_SECONDS * 3),
    kovan: (constants.ONE_DAY_IN_SECONDS  * 3),
    development: (constants.ONE_DAY_IN_SECONDS * 3),
  },
  bitEthProposalPeriod: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  bitEthRebalanceInterval: {
    main: constants.THIRTY_DAYS_IN_SECONDS,
    kovan: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  bitEthRebalanceManagerAuctionTimeToPivot: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_HOUR_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  bitEthRebalanceManagerAllocationUpperBound: {
    main: 52,
    kovan: 50,
    development: 50,
  },
  bitEthRebalanceManagerAllocationLowerBound: {
    main: 48,
    kovan: 50,
    development: 50,
  },
  ethDaiProposalPeriod: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  ethDaiRebalanceInterval: {
    main: constants.THIRTY_DAYS_IN_SECONDS,
    kovan: constants.THIRTY_MINUTES_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  ethDaiRebalanceManagerAuctionTimeToPivot: {
    main: constants.ONE_DAY_IN_SECONDS,
    kovan: constants.ONE_HOUR_IN_SECONDS,
    development: constants.ONE_DAY_IN_SECONDS,
  },
  ethDaiRebalanceManagerAllocationUpperBound: {
    main: 60,
    kovan: 50,
    development: 50,
  },
  ethDaiRebalanceManagerAllocationLowerBound: {
    main: 40,
    kovan: 50,
    development: 50,
  },
  timeLockPeriod: {
    main: 0,
    kovan: 0,
    development: 0,
  },
  linearAuctionPriceCurve: {
    main: true,
    kovan: true,
    development: true,
  },
  constantsAuctionPriceCurve: {
    main: false,
    kovan: true,
    development: true,
  },
};