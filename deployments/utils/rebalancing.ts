import constants from '../constants';
import BigNumber from 'bignumber.js';

export function calculateInitialSetUnits(
  btcMultiplier,
  ethMultiplier,
  pricePrecision,
) {
  let units = [];
  let naturalUnit: BigNumber = new BigNumber(0);

  const BTC_PRICE = constants.WBTC.PRICE;
  const ETH_PRICE = constants.WETH.PRICE;
  const DECIMAL_DIFFERENCE_MULTIPLIER = constants.WETH.FULL_TOKEN_UNITS.div(constants.WBTC.FULL_TOKEN_UNITS);

  if (BTC_PRICE.greaterThanOrEqualTo(ETH_PRICE)) {
    const ethUnits = BTC_PRICE.mul(DECIMAL_DIFFERENCE_MULTIPLIER).div(ETH_PRICE).round(0, 3);
    units = [
      constants.DEFAULT_WBTC_UNIT.mul(btcMultiplier).toNumber(),
      ethUnits.mul(ethMultiplier).toNumber(),
    ];
    naturalUnit = constants.DEFAULT_COLLATERAL_NATURAL_UNIT;
  } else {
    const btcUnits = ETH_PRICE.mul(pricePrecision).div(BTC_PRICE).round(0, 3);
    const ethUnits = pricePrecision.mul(DECIMAL_DIFFERENCE_MULTIPLIER);
    units = [
      btcUnits.mul(btcMultiplier).toNumber(),
      ethUnits.mul(ethMultiplier).toNumber(),
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

export function calculateAllocationBounds(
  checkedTokenMultiplier,
  otherTokenMultiplier,
  lowerBound,
  upperBound,
): string[] {
  const allocationLowerBound = checkedTokenMultiplier
                                   .div(checkedTokenMultiplier.add(otherTokenMultiplier))
                                   .mul(new BigNumber(100))
                                   .sub(lowerBound);
  const allocationUpperBound = checkedTokenMultiplier
                                   .div(checkedTokenMultiplier.add(otherTokenMultiplier))
                                   .mul(new BigNumber(100))
                                   .add(upperBound);
  return [allocationLowerBound.toString(), allocationUpperBound.toString()];
}