import constants from '../constants';
import BigNumber from 'bignumber.js';

export function calculateInitialSetUnits() {
  let units = [];
  let naturalUnit: BigNumber = new BigNumber(0);

  const WBTC_PRICE = constants.WBTC.PRICE;
  const WBTC_MULTIPLIER = constants.WBTC.MULTIPLIER;
  const WETH_MULTIPLIER = constants.WETH.MULTIPLIER;
  const WETH_PRICE = constants.WETH.PRICE;
  const DECIMAL_DIFFERENCE_MULTIPLIER = constants.WETH.FULL_TOKEN_UNITS.div(constants.WBTC.FULL_TOKEN_UNITS);
  const PRICE_PRECISION = constants.PRICE_PRECISION;

  if (WBTC_PRICE.greaterThanOrEqualTo(WETH_PRICE)) {
    const ethUnits = WBTC_PRICE.mul(DECIMAL_DIFFERENCE_MULTIPLIER).div(WETH_PRICE).round(0, 3);
    units = [
      constants.DEFAULT_WBTC_UNIT.mul(WBTC_MULTIPLIER).toNumber(),
      ethUnits.mul(WETH_MULTIPLIER).toNumber(),
    ];
    naturalUnit = constants.DEFAULT_REBALANCING_NATURAL_UNIT;
  } else {
    const btcUnits = WETH_PRICE.mul(PRICE_PRECISION).div(WBTC_PRICE).round(0, 3);
    const ethUnits = PRICE_PRECISION.mul(DECIMAL_DIFFERENCE_MULTIPLIER);
    units = [
      btcUnits.mul(WBTC_MULTIPLIER).toNumber(),
      ethUnits.mul(WETH_MULTIPLIER).toNumber(),
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
  initialSetNaturalUnit,
  tokenOneName,
  tokenTwoName,
) {
  const tokenOne = constants[tokenOneName];
  const tokenTwo = constants[tokenTwoName];

  const tokenOneUnitsInFullToken = constants.SET_FULL_TOKEN_UNITS
                                .mul(initialSetUnits[0])
                                .div(initialSetNaturalUnit)
                                .round(0, 3);
  const tokenTwoUnitsInFullToken = constants.SET_FULL_TOKEN_UNITS
                                .mul(initialSetUnits[1])
                                .div(initialSetNaturalUnit)
                                .round(0, 3);

  const btcDollarAmount = tokenOne.PRICE
                            .mul(tokenOneUnitsInFullToken)
                            .div(tokenOne.FULL_TOKEN_UNITS)
                            .round(0, 3);

  const ethDollarAmount = tokenTwo.PRICE
                            .mul(tokenTwoUnitsInFullToken)
                            .div(tokenTwo.FULL_TOKEN_UNITS)
                            .round(0, 3);

  const initialSetDollarAmount = btcDollarAmount.add(ethDollarAmount);
  return [constants.REBALANCING_SET_USD_PRICE
          .div(initialSetDollarAmount)
          .mul(constants.DEFAULT_REBALANCING_NATURAL_UNIT)
          .round(0, 3)];
}

export function calculateETHDaiInitialSetUnits(
): any {
  let units: BigNumber[];
  const PRICE_PRECISION = constants.PRICE_PRECISION;
  const tokenOnePrice = constants.DAI.PRICE;
  const tokenTwoPrice = constants.WETH.PRICE;
  const tokenOneMultiplier = constants.DAI.MULTIPLIER;
  const tokenTwoMultiplier = constants.WETH.MULTIPLIER;
  const decimalDifference = constants.DAI.FULL_TOKEN_UNITS.div(constants.WETH.FULL_TOKEN_UNITS);

  const naturalUnit: BigNumber = PRICE_PRECISION.mul(decimalDifference);
  if (tokenTwoPrice.greaterThanOrEqualTo(tokenOnePrice)) {
    const tokenOneUnits = tokenTwoPrice.mul(decimalDifference).mul(PRICE_PRECISION).div(tokenOnePrice).round(0, 3);
    units = [tokenOneMultiplier.mul(tokenOneUnits), tokenTwoMultiplier.mul(PRICE_PRECISION)];
  } else {
    const tokenTwoUnits = tokenOnePrice.mul(PRICE_PRECISION).div(tokenTwoPrice).round(0, 3);
    units = [PRICE_PRECISION.mul(decimalDifference).mul(tokenOneMultiplier), tokenTwoUnits];
  }

  return {
    units,
    naturalUnit,
  };
}