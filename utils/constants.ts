import { BigNumber } from 'bignumber.js';
import { ether } from '../utils/units';

export const AUCTION_TIME_INCREMENT = new BigNumber(30); // Unix seconds
export const DEFAULT_AUCTION_PRICE_NUMERATOR = new BigNumber(1374);
export const DEFAULT_AUCTION_PRICE_DIVISOR = new BigNumber(1000);
export const DEFAULT_GAS = 19000000;
export const DEFAULT_MOCK_TOKEN_DECIMALS = 18;
export const DEFAULT_SUSPENDED_MIN_AUCTION_FAIL_TIME = new BigNumber(1800); // 30 mins
export const DEFAULT_SUSPENDED_MAX_AUCTION_FAIL_TIME = new BigNumber(172800); // 48 hours
export const DEFAULT_REBALANCE_START_PRICE = new BigNumber(500);
export const DEFAULT_REBALANCE_TIME_TO_PIVOT = new BigNumber(100000);
export const DEFAULT_REBALANCING_NATURAL_UNIT = new BigNumber(10 ** 6);
export const DEFAULT_REBALANCING_MINIMUM_NATURAL_UNIT = new BigNumber(10 ** 4);
export const DEFAULT_REBALANCING_MAXIMUM_NATURAL_UNIT = new BigNumber(10 ** 12);
export const DEFAULT_UNIT_SHARES = new BigNumber(10 ** 6);
export const DEPLOYED_TOKEN_QUANTITY: BigNumber = ether(100000000000);
export const ONE: BigNumber = new BigNumber(1);
export const ONE_DAY_IN_SECONDS = new BigNumber(86400);
export const STANDARD_COMPONENT_UNIT = ether(1);
export const STANDARD_NATURAL_UNIT = ether(1);
export const STANDARD_QUANTITY_ISSUED: BigNumber = ether(10);
export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);
export const ZERO: BigNumber = new BigNumber(0);
