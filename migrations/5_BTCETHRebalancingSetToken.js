require('module-alias/register');

const SetProtocolUtils = require('set-protocol-utils');
const BigNumber = SetProtocolUtils.BigNumber;
const SetUtils = SetProtocolUtils.SetProtocolUtils;

const BTCETHRebalancingManager = artifacts.require('BTCETHRebalancingManager');
const Core = artifacts.require("Core");
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
const RebalancingSetTokenFactory = artifacts.require("RebalancingSetTokenFactory");
const SetTokenFactory = artifacts.require("SetTokenFactory");
const WbtcMock = artifacts.require("StandardTokenMock");
const WethMock = artifacts.require("WethMock");

// Time constants
const ONE_DAY_IN_SECONDS = new BigNumber(86400);
const THIRTY_DAYS_IN_SECONDS = new BigNumber(2592000);
const THIRTY_MINUTES_IN_SECONDS = new BigNumber(1800);
const ONE_HOUR_IN_SECONDS = new BigNumber(3600);

// Unit and naturalUnit constants
const DEFAULT_REBALANCING_NATURAL_UNIT = new BigNumber(10 ** 10);
const ETH_DOMINANT_REBALANCING_NATURAL_UNIT = new BigNumber(10 ** 12);
const DEFAULT_SET_NATURAL_UNIT = new BigNumber(10 ** 10);
const DEFAULT_WBTC_UNIT = new BigNumber(1);
const SET_FULL_TOKEN_UNITS = new BigNumber(10 ** 18);
const WBTC_FULL_TOKEN_UNITS = new BigNumber(10 ** 8);
const WETH_FULL_TOKEN_UNITS = new BigNumber(10 ** 18);

// Decimal and price multiplier constants
const DECIMAL_DIFFERENCE_MULTIPLIER = WETH_FULL_TOKEN_UNITS.div(WBTC_FULL_TOKEN_UNITS);
const PRICE_PRECISION = new BigNumber(100);

// Contract Addresses
const WBTC_MEDIANIZER_ADDRESS_KOVAN = '0x02186378d8e723e11643b4cd520e31655be3b0e9';
const WBTC_MEDIANIZER_ADDRESS_TESTRPC = '0x2002d3812f58e35f0ea1ffbf80a75a38c32173fa'; // Dummy address
const WBTC_MEDIANIZER_ADDRESS_MAINNET = '';

const WETH_MEDIANIZER_ADDRESS_KOVAN = '0x9Fe0D478D0E290d50EF8DFc08760C4ad9D2C7AE9';
const WETH_MEDIANIZER_ADDRESS_TESTRPC = '0x2002d3812f58e35f0ea1ffbf80a75a38c32174fa'; // Dummy address
const WETH_MEDIANIZER_ADDRESS_MAINNET = '';

const WBTC_ADDRESS_KOVAN = '0x595f8DaB94b9c718cbf5c693cD539Fd00b286D3d';
const WBTC_ADDRESS_MAINNET = '';

const WETH_ADDRESS_KOVAN = '0x4C5E0CAbAA6B376D565cF2be865a03F43E361770';
const WETH_ADDRESS_MAINNET = '';

/* ============ INPUTS: CHANGE TO ALTER DEPLOYMENT ============ */

// Price Constants: CHANGE THESE TO ALTER INITAL ALLOCATION
const WBTC_PRICE = new BigNumber(3711);
const WETH_PRICE = new BigNumber(128);
const WBTC_MULTIPLIER = new BigNumber(1);
const WETH_MULTIPLIER = new BigNumber(1);
const REBALANCING_SET_USD_PRICE = new BigNumber(100);

// Token names and symbols
const INITIAL_SET_NAME = "BTCETH";
const INITIAL_SET_SYMBOL = "BTCETH";
const REBALANCING_SET_NAME = "BitEth Set";
const REBALANCING_SET_SYMBOL = "BTCETH";

module.exports = function(deployer, network, accounts) {
  if (network == "development" || network == "coverage") {
    console.log("Exiting - Network is development");
    return;
  }

  deployer.then(() => deployBTCETHRebalancingSet(deployer, network));
};

async function deployBTCETHRebalancingSet(deployer, network) {

  switch(network) {
    case 'main':
      wbtcMedianizerAddress = WBTC_MEDIANIZER_ADDRESS_MAINNET;
      wethMedianizerAddress = WETH_MEDIANIZER_ADDRESS_MAINNET;
      wbtcAddress = WBTC_ADDRESS_MAINNET;
      wethAddress = WETH_ADDRESS_MAINNET;
      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalanceInterval = THIRTY_DAYS_IN_SECONDS;
      auctionTimeToPivot = ONE_DAY_IN_SECONDS;
      break;
    case 'kovan':
    case 'kovan-fork':
      wbtcMedianizerAddress = WBTC_MEDIANIZER_ADDRESS_KOVAN;
      wethMedianizerAddress = WETH_MEDIANIZER_ADDRESS_KOVAN;
      wbtcAddress = WBTC_ADDRESS_KOVAN;
      wethAddress = WETH_ADDRESS_KOVAN;
      proposalPeriod = THIRTY_MINUTES_IN_SECONDS;
      rebalanceInterval = THIRTY_MINUTES_IN_SECONDS;
      auctionTimeToPivot = ONE_HOUR_IN_SECONDS;
      break;

    case 'ropsten':
    case 'ropsten-fork':

    case 'development':
      wbtcMedianizerAddress = WBTC_MEDIANIZER_ADDRESS_TESTRPC;
      wethMedianizerAddress = WETH_MEDIANIZER_ADDRESS_TESTRPC;
      wbtcAddress = WbtcMock.address;
      wethAddress = WethMock.address;
      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalanceInterval = ONE_DAY_IN_SECONDS; 
      auctionTimeToPivot = ONE_DAY_IN_SECONDS 
      break;
  }

  // Deploy BTCETHRebalancingManager
  await deployer.deploy(
    BTCETHRebalancingManager,
    Core.address,
    wbtcMedianizerAddress,
    wethMedianizerAddress,
    wbtcAddress,
    wethAddress,
    SetTokenFactory.address,
    LinearAuctionPriceCurve.address,
    auctionTimeToPivot,
    WBTC_MULTIPLIER,
    WETH_MULTIPLIER
  );

  // Create and deploy original collateralizing Set for BitEthRebalancingSetToken
  console.log("Deploying initial collateralizing Set for BitEthRebalancingSetToken.");

  const initialSetComponents = [wbtcAddress, wethAddress];
  const initialSetParams = calculateInitialSetUnits();
  
  const initialSetName = SetUtils.stringToBytes(INITIAL_SET_NAME);
  const initialSetSymbol = SetUtils.stringToBytes(INITIAL_SET_SYMBOL);
  const initialSetCallData = SetUtils.stringToBytes("");
  
  const core = await Core.deployed();
  const initialSetOutput = await core.create(
    SetTokenFactory.address,
    initialSetComponents,
    initialSetParams['units'],
    initialSetParams['naturalUnit'],
    initialSetName,
    initialSetSymbol,
    initialSetCallData,
  );

  const initialSetAddress = initialSetOutput.logs[0].args._setTokenAddress;
  console.log("Deployed at", initialSetAddress);

  // Create and deploy BitEthRebalancingSetToken
  console.log("Deploying BitEthRebalancingSetToken. Manager is", BTCETHRebalancingManager.address);

  const rebalancingSetComponents = [initialSetAddress];
  const rebalancingSetUnitShares = calculateRebalancingSetUnitShares(
    initialSetParams['units'],
    initialSetParams['naturalUnit'],
  );
  
  const rebalancingSetNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
  const rebalancingSetName = SetUtils.stringToBytes(REBALANCING_SET_NAME);
  const rebalancingSetSymbol = SetUtils.stringToBytes(REBALANCING_SET_SYMBOL);
  const rebalancingSetCallData = SetUtils.generateRSetTokenCallData(
    BTCETHRebalancingManager.address,
    proposalPeriod,
    rebalanceInterval,
  );
  
  const rebalancingSetOutput = await core.create(
    RebalancingSetTokenFactory.address,
    rebalancingSetComponents,
    rebalancingSetUnitShares,
    rebalancingSetNaturalUnit,
    rebalancingSetName,
    rebalancingSetSymbol,
    rebalancingSetCallData,
  );

  const rebalancingSetAddress = rebalancingSetOutput.logs[0].args._setTokenAddress;
  console.log("BitEthRebalancingSetToken deployed at", rebalancingSetAddress);
  console.log("Deployed BitEthRebalancingSetToken has unitShares:", rebalancingSetUnitShares[0]);
}

function calculateInitialSetUnits() {
  let units = [];
  let naturalUnit = 0;
  if (WBTC_PRICE.greaterThanOrEqualTo(WETH_PRICE)) {
    const ethUnits = WBTC_PRICE.mul(DECIMAL_DIFFERENCE_MULTIPLIER).div(WETH_PRICE).round(0, 3);
    units = [
      DEFAULT_WBTC_UNIT.mul(WBTC_MULTIPLIER).toNumber(),
      ethUnits.mul(WETH_MULTIPLIER).toNumber()
    ];
    naturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT.toNumber();
  } else {
    const btcUnits = WETH_PRICE.mul(PRICE_PRECISION).div(WBTC_PRICE).round(0, 3);
    const ethUnits = PRICE_PRECISION.mul(DECIMAL_DIFFERENCE_MULTIPLIER);
    units = [
      btcUnits.mul(WBTC_MULTIPLIER).toNumber(),
      ethUnits.mul(WETH_MULTIPLIER).toNumber()
    ];
    naturalUnit = ETH_DOMINANT_REBALANCING_NATURAL_UNIT;
  }

  return {
    units,
    naturalUnit,
  };
}

function calculateRebalancingSetUnitShares(
  initialSetUnits,
  initialSetNaturalUnit
) {
  const btcUnitsInFullToken = SET_FULL_TOKEN_UNITS
                                .mul(initialSetUnits[0])
                                .div(initialSetNaturalUnit)
                                .round(0, 3);
  const ethUnitsInFullToken = SET_FULL_TOKEN_UNITS
                                .mul(initialSetUnits[1])
                                .div(initialSetNaturalUnit)
                                .round(0, 3);

  const btcDollarAmount = WBTC_PRICE.mul(btcUnitsInFullToken).div(WBTC_FULL_TOKEN_UNITS).round(0, 3);
  const ethDollarAmount = WETH_PRICE.mul(ethUnitsInFullToken).div(WETH_FULL_TOKEN_UNITS).round(0, 3);

  const initialSetDollarAmount = btcDollarAmount.add(ethDollarAmount);
  return [REBALANCING_SET_USD_PRICE
          .div(initialSetDollarAmount)
          .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
          .round(0,3)
          .toNumber()]; 
}
