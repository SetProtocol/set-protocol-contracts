import constants from '../constants';
import BigNumber from 'bignumber.js';

export function calculateInitialSetUnits() {
  let units = [];
  let naturalUnit: BigNumber = new BigNumber(0);

  const WBTC_PRICE = constants.WBTC.PRICE;
  const WBTC_MULTIPLIER = constants.BITETH.WBTC_MULTIPLIER;
  const WETH_MULTIPLIER = constants.BITETH.WETH_MULTIPLIER;
  const WETH_PRICE = constants.WETH.PRICE;
  const DECIMAL_DIFFERENCE_MULTIPLIER = constants.WETH.FULL_TOKEN_UNITS.div(constants.WBTC.FULL_TOKEN_UNITS);
  const PRICE_PRECISION = constants.BITETH.PRICE_PRECISION;

  if (WBTC_PRICE.greaterThanOrEqualTo(WETH_PRICE)) {
    const ethUnits = WBTC_PRICE.mul(DECIMAL_DIFFERENCE_MULTIPLIER).div(WETH_PRICE).round(0, 3);
    units = [
      constants.DEFAULT_WBTC_UNIT.mul(WBTC_MULTIPLIER).toNumber(),
      ethUnits.mul(WETH_MULTIPLIER).toNumber(),
    ];
    naturalUnit = constants.DEFAULT_COLLATERAL_NATURAL_UNIT;
  } else {
    const btcUnits = WETH_PRICE.mul(PRICE_PRECISION).div(WBTC_PRICE).round(0, 3);
    const ethUnits = PRICE_PRECISION.mul(DECIMAL_DIFFERENCE_MULTIPLIER);
    units = [
      btcUnits.mul(WBTC_MULTIPLIER).toNumber(),
      ethUnits.mul(WETH_MULTIPLIER).toNumber(),
    ];
    naturalUnit = constants.WETH_DOMINANT_COLLATERAL_NATURAL_UNIT;
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

  const tokenOneDollarAmount = tokenOne.PRICE
                            .mul(tokenOneUnitsInFullToken)
                            .div(tokenOne.FULL_TOKEN_UNITS)
                            .round(0, 3);

  const tokenTwoDollarAmount = tokenTwo.PRICE
                            .mul(tokenTwoUnitsInFullToken)
                            .div(tokenTwo.FULL_TOKEN_UNITS)
                            .round(0, 3);

  const initialSetDollarAmount = tokenOneDollarAmount.add(tokenTwoDollarAmount);
  return [constants.REBALANCING_SET_USD_PRICE
          .div(initialSetDollarAmount)
          .mul(constants.DEFAULT_REBALANCING_NATURAL_UNIT)
          .round(0, 3)];
}

export function calculateGeneralInitialSetUnits(
  tokenOnePrice,
  tokenTwoPrice,
  tokenOneMultiplier,
  tokenTwoMultiplier,
  tokenOneDecimal,
  tokenTwoDecimal,
  pricePrecision,
): any {
  let units: BigNumber[];
  const decimalDifference = tokenOneDecimal.div(tokenTwoDecimal);

  const naturalUnit: BigNumber = pricePrecision.mul(decimalDifference);
  if (tokenTwoPrice.greaterThanOrEqualTo(tokenOnePrice)) {
    const tokenOneUnits = tokenTwoPrice.mul(decimalDifference).mul(pricePrecision).div(tokenOnePrice).round(0, 3);
    units = [tokenOneMultiplier.mul(tokenOneUnits), tokenTwoMultiplier.mul(pricePrecision)];
  } else {
    const tokenTwoUnits = tokenOnePrice.mul(pricePrecision).div(tokenTwoPrice).round(0, 3);
    units = [pricePrecision.mul(decimalDifference).mul(tokenOneMultiplier), tokenTwoUnits.mul(tokenTwoMultiplier)];
  }

  return {
    units,
    naturalUnit,
  };
}