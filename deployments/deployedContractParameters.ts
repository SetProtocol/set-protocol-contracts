import BigNumber from 'bignumber.js';
import { ETHDaiDeployedSetInfo, BTCDaiDeployedSetInfo, BitEthDeployedSetInfo } from '../types/deployment_stage_interface';
import constants from './constants';

export const DEPLOYED_SETS_INFO = {
  BTCDAI_LONG_TERM_BTD: {
    PRICE_PRECISION: new BigNumber(1),
    DAI_MULTIPLIER: new BigNumber(1),
    WBTC_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'LTBTCDaiRebalancingManager',
    COLLATERAL_NAME: 'LTBTCDaiInitialCollateralSet',
    SET_NAME: 'LTBTCDaiRebalancingSetToken',
    SET_SYMBOL: 'LTBTCDai',
    PROPOSAL_PERIOD: {
      production: constants.ONE_HOUR_IN_SECONDS*8,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    REBALANCE_INTERVAL: {
      production: constants.ONE_DAY_IN_SECONDS*14,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    AUCTION_TIME_TO_PIVOT: {
      production: constants.ONE_DAY_IN_SECONDS,
      staging: constants.ONE_HOUR_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    ALLOCATION_LOWER_BOUND: {
      production: 6, // These values are in terms of DAI vs ETH in BITETH
      staging: 0,
      development: 0,
    },
    ALLOCATION_UPPER_BOUND: {
      production: 12,
      staging: 0,
      development: 0,
    }
  } as BTCDaiDeployedSetInfo,

  BTCDAI_SHORT_TERM_BTD: {
    PRICE_PRECISION: new BigNumber(1),
    DAI_MULTIPLIER: new BigNumber(1),
    WBTC_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'STBTCDaiRebalancingManager',
    COLLATERAL_NAME: 'STBTCDaiInitialCollateralSet',
    SET_NAME: 'STBTCDaiRebalancingSetToken',
    SET_SYMBOL: 'STBTCDai',
    PROPOSAL_PERIOD: {
      production: constants.ONE_HOUR_IN_SECONDS*8,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    REBALANCE_INTERVAL: {
      production: constants.ONE_DAY_IN_SECONDS*14,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    AUCTION_TIME_TO_PIVOT: {
      production: constants.ONE_DAY_IN_SECONDS,
      staging: constants.ONE_HOUR_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    ALLOCATION_LOWER_BOUND: {
      production: 6, // These values are in terms of DAI vs ETH in BITETH
      staging: 0,
      development: 0,
    },
    ALLOCATION_UPPER_BOUND: {
      production: 6,
      staging: 0,
      development: 0,
    }
  } as BTCDaiDeployedSetInfo,

  ETHDAI_LONG_TERM_BTD: {
    PRICE_PRECISION: new BigNumber(100),
    DAI_MULTIPLIER: new BigNumber(1),
    WETH_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'LTETHDaiRebalancingManager',
    COLLATERAL_NAME: 'LTETHDaiInitialCollateralSet',
    SET_NAME: 'LTETHDaiRebalancingSetToken',
    SET_SYMBOL: 'LTETHDai',
    PROPOSAL_PERIOD: {
      production: constants.ONE_HOUR_IN_SECONDS*8,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    REBALANCE_INTERVAL: {
      production: constants.ONE_DAY_IN_SECONDS*14,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    AUCTION_TIME_TO_PIVOT: {
      production: constants.ONE_DAY_IN_SECONDS,
      staging: constants.ONE_HOUR_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    ALLOCATION_LOWER_BOUND: {
      production: 8, // These values are in terms of DAI vs ETH in BITETH
      staging: 0,
      development: 0,
    },
    ALLOCATION_UPPER_BOUND: {
      production: 17,
      staging: 0,
      development: 0,
    }
  } as ETHDaiDeployedSetInfo,

  ETHDAI_SHORT_TERM_BTD: {
    PRICE_PRECISION: new BigNumber(100),
    DAI_MULTIPLIER: new BigNumber(1),
    WETH_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'STETHDaiRebalancingManager',
    COLLATERAL_NAME: 'STETHDaiInitialCollateralSet',
    SET_NAME: 'STETHDaiRebalancingSetToken',
    SET_SYMBOL: 'STETHDai',
    PROPOSAL_PERIOD: {
      production: constants.ONE_HOUR_IN_SECONDS*8,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    REBALANCE_INTERVAL: {
      production: constants.ONE_DAY_IN_SECONDS*14,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    AUCTION_TIME_TO_PIVOT: {
      production: constants.ONE_DAY_IN_SECONDS,
      staging: constants.ONE_HOUR_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    ALLOCATION_LOWER_BOUND: {
      production: 7, // These values are in terms of DAI vs ETH in BITETH
      staging: 0,
      development: 0,
    },
    ALLOCATION_UPPER_BOUND: {
      production: 8,
      staging: 0,
      development: 0,
    }
  } as ETHDaiDeployedSetInfo,

  BITETHSPLIT: {
    PRICE_PRECISION: new BigNumber(100),
    WBTC_MULTIPLIER: new BigNumber(1),
    WETH_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'BTCETH5050RebalancingManager',
    COLLATERAL_NAME: 'BitEth5050CollateralSet',
    SET_NAME: 'BitEth5050RebalancingSetToken',
    SET_SYMBOL: 'BTCETH5050',
    PROPOSAL_PERIOD: {
      production: constants.ONE_HOUR_IN_SECONDS*8,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    REBALANCE_INTERVAL: {
      production: constants.THIRTY_DAYS_IN_SECONDS,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    AUCTION_TIME_TO_PIVOT: {
      production: constants.ONE_DAY_IN_SECONDS,
      staging: constants.ONE_HOUR_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    ALLOCATION_LOWER_BOUND: {
      production: 2,
      staging: 0,
      development: 0,
    },
    ALLOCATION_UPPER_BOUND: {
      production: 2,
      staging: 0,
      development: 0,
    }
  } as BitEthDeployedSetInfo,

  BITETH_BTC_DOMINANT: {
    PRICE_PRECISION: new BigNumber(100),
    WBTC_MULTIPLIER: new BigNumber(3),
    WETH_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'BTCETH7525RebalancingManager',
    COLLATERAL_NAME: 'BitEth7525CollateralSet',
    SET_NAME: 'BitEth7525RebalancingSetToken',
    SET_SYMBOL: 'BTCETH7525',
    PROPOSAL_PERIOD: {
      production: constants.ONE_HOUR_IN_SECONDS*8,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    REBALANCE_INTERVAL: {
      production: constants.THIRTY_DAYS_IN_SECONDS,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    AUCTION_TIME_TO_PIVOT: {
      production: constants.ONE_DAY_IN_SECONDS,
      staging: constants.ONE_HOUR_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    ALLOCATION_LOWER_BOUND: {
      production: 2,
      staging: 0,
      development: 0,
    },
    ALLOCATION_UPPER_BOUND: {
      production: 2,
      staging: 0,
      development: 0,
    }
  } as BitEthDeployedSetInfo,

  BITETH_ETH_DOMINANT: {
    PRICE_PRECISION: new BigNumber(100),
    WBTC_MULTIPLIER: new BigNumber(1),
    WETH_MULTIPLIER: new BigNumber(3),
    MANAGER_NAME: 'BTCETH2575RebalancingManager',
    COLLATERAL_NAME: 'BitEth2575CollateralSet',
    SET_NAME: 'BitEth2575RebalancingSetToken',
    SET_SYMBOL: 'BTCETH2575',
    PROPOSAL_PERIOD: {
      production: constants.ONE_HOUR_IN_SECONDS*8,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    REBALANCE_INTERVAL: {
      production: constants.THIRTY_DAYS_IN_SECONDS,
      staging: constants.THIRTY_MINUTES_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    AUCTION_TIME_TO_PIVOT: {
      production: constants.ONE_DAY_IN_SECONDS,
      staging: constants.ONE_HOUR_IN_SECONDS,
      development: constants.ONE_DAY_IN_SECONDS,
    },
    ALLOCATION_LOWER_BOUND: {
      production: 2,
      staging: 0,
      development: 0,
    },
    ALLOCATION_UPPER_BOUND: {
      production: 2,
      staging: 0,
      development: 0,
    }
  } as BitEthDeployedSetInfo,
}

export const DEPENDENCY = {
  DAI: 'DAI',
  KYBER_PROXY: 'KYBER_PROXY',
  MULTI_SIG_OWNER: 'MULTI_SIG_OWNER',
  WBTC: 'WBTC',
  WBTC_MEDIANIZER: 'WBTC_MEDIANIZER',
  WETH: 'WETH',  
  WETH_MEDIANIZER: 'WETH_MEDIANIZER',
  ZERO_EX_EXCHANGE: 'ZERO_EX_EXCHANGE',
  ZERO_EX_PROXY: 'ZERO_EX_PROXY',
  ZERO_EX_ZRX: 'ZERO_EX_ZRX',
};