import constants from '../constants';
import BigNumber from 'bignumber.js';

export function calculateInitialSetUnits() {
  let units = [];
  let naturalUnit: BigNumber = new BigNumber(0);

  let WBTC_PRICE = constants.WBTC_PRICE;
  let WBTC_MULTIPLIER = constants.WBTC_MULTIPLIER;
  let WETH_MULTIPLIER = constants.WETH_MULTIPLIER;
  let WETH_PRICE = constants.WETH_PRICE;
  let DECIMAL_DIFFERENCE_MULTIPLIER = constants.WETH_FULL_TOKEN_UNITS.div(constants.WBTC_FULL_TOKEN_UNITS);
  let PRICE_PRECISION = constants.PRICE_PRECISION;

  if (WBTC_PRICE.greaterThanOrEqualTo(WETH_PRICE)) {
    const ethUnits = WBTC_PRICE.mul(DECIMAL_DIFFERENCE_MULTIPLIER).div(WETH_PRICE).round(0, 3);
    units = [
      constants.DEFAULT_WBTC_UNIT.mul(WBTC_MULTIPLIER).toNumber(),
      ethUnits.mul(WETH_MULTIPLIER).toNumber()
    ];
    naturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
  } else {
    const btcUnits = WETH_PRICE.mul(PRICE_PRECISION).div(WBTC_PRICE).round(0, 3);
    const ethUnits = PRICE_PRECISION.mul(DECIMAL_DIFFERENCE_MULTIPLIER);
    units = [
      btcUnits.mul(WBTC_MULTIPLIER).toNumber(),
      ethUnits.mul(WETH_MULTIPLIER).toNumber()
    ];
    naturalUnit = constants.WETH_DOMINANT_REBALANCING_NATURAL_UNIT;
  }

  return {
    units,
    naturalUnit,
  };
}

export function calculateRebalancingSetUnitShares(
  initialSetUnits,
  initialSetNaturalUnit
) {
  const btcUnitsInFullToken = constants.SET_FULL_TOKEN_UNITS
                                .mul(initialSetUnits[0])
                                .div(initialSetNaturalUnit)
                                .round(0, 3);
  const ethUnitsInFullToken = constants.SET_FULL_TOKEN_UNITS
                                .mul(initialSetUnits[1])
                                .div(initialSetNaturalUnit)
                                .round(0, 3);

  const btcDollarAmount = constants.WBTC_PRICE.mul(btcUnitsInFullToken).div(constants.WBTC_FULL_TOKEN_UNITS).round(0, 3);
  const ethDollarAmount = constants.WETH_PRICE.mul(ethUnitsInFullToken).div(constants.WETH_FULL_TOKEN_UNITS).round(0, 3);

  const initialSetDollarAmount = btcDollarAmount.add(ethDollarAmount);
  return [constants.REBALANCING_SET_USD_PRICE
          .div(initialSetDollarAmount)
          .mul(constants.DEFAULT_REBALANCING_NATURAL_UNIT)
          .round(0,3)]; 
}