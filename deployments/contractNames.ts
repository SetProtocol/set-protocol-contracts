import BigNumber from 'bignumber.js';
import { DeployedSetInfo } from '../types/deployment_stage_interface';

export const DEPLOYED_SETS_INFO = {
  BTCDAI_BTD: {
    PRICE_PRECISION: new BigNumber(100),
    DAI_MULTIPLIER: new BigNumber(1),
    WBTC_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'BTCDaiRebalancingManager',
    COLLATERAL_NAME: 'BTCDaiInitialCollateralSet',
    SET_NAME: 'BTCDaiRebalancingSetToken',
    SET_SYMBOL: 'BTCDai'
  },

  ETHDAI_BTD: {
    PRICE_PRECISION: new BigNumber(100),
    DAI_MULTIPLIER: new BigNumber(1),
    WETH_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'ETHDaiRebalancingManager',
    COLLATERAL_NAME: 'ETHDaiInitialCollateralSet',
    SET_NAME: 'ETHDaiRebalancingSetToken',
    SET_SYMBOL: 'ETHDai'
  },

  BITETHSPLIT: {
    PRICE_PRECISION: new BigNumber(100),
    WBTC_MULTIPLIER: new BigNumber(1),
    WETH_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'BTCETH5050RebalancingManager',
    COLLATERAL_NAME: 'BitEth5050CollateralSet',
    SET_NAME: 'BitEth5050RebalancingSetToken',
    SET_SYMBOL: 'BTCETH5050'
  } as DeployedSetInfo,

  BITETH_BTC_DOMINANT: {
    PRICE_PRECISION: new BigNumber(100),
    WBTC_MULTIPLIER: new BigNumber(3),
    WETH_MULTIPLIER: new BigNumber(1),
    MANAGER_NAME: 'BTCETH7525RebalancingManager',
    COLLATERAL_NAME: 'BitEth7525CollateralSet',
    SET_NAME: 'BitEth7525RebalancingSetToken',
    SET_SYMBOL: 'BTCETH7525'
  } as DeployedSetInfo,

  BITETH_ETH_DOMINANT: {
    PRICE_PRECISION: new BigNumber(100),
    WBTC_MULTIPLIER: new BigNumber(1),
    WETH_MULTIPLIER: new BigNumber(3),
    MANAGER_NAME: 'BTCETH2575SplitRebalancingManager',
    COLLATERAL_NAME: 'BitEth2575CollateralSet',
    SET_NAME: 'BitEth2575RebalancingSetToken',
    SET_SYMBOL: 'BTCETH2575'
  } as DeployedSetInfo,
}

export const DEPENDENCY = {
  DAI: 'DAI',
  KYBER_PROXY: 'KYBER_PROXY',
  WBTC: 'WBTC',
  WBTC_MEDIANIZER: 'WBTC_MEDIANIZER',
  WETH: 'WETH',  
  WETH_MEDIANIZER: 'WETH_MEDIANIZER',
  ZERO_EX_EXCHANGE: 'ZERO_EX_EXCHANGE',
  ZERO_EX_PROXY: 'ZERO_EX_PROXY',
  ZERO_EX_ZRX: 'ZERO_EX_ZRX',
};