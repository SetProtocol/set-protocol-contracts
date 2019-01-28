require('module-alias/register');

const chai = require('chai');
const migrations = require("../../migrations/5_BTCETHRebalancingSetToken");
const { expect } = chai;

const BTCETHRebalancingManager = artifacts.require('BTCETHRebalancingManager');
const Core = artifacts.require('Core');
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const SetToken = artifacts.require('SetToken');
const SetTokenFactory = artifacts.require('SetTokenFactory');

const WbtcMock = artifacts.require('StandardTokenMock');
const WethMock = artifacts.require('WethMock');

const ONE_DAY_IN_SECONDS = 86400;
const EXPECTED_INITIAL_SET_UNITS = [1, 289921875000];
const EXPECTED_UNIT_SHARES = 134734572;

contract('BitEth: Deploy', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let initialSetToken;
  let bitEthRebalancingToken;
  let btcethRebalancingManager;
  let linearAuctionPriceCurve
  let wbtcMock;
  let wethMock;

  let rebalancingWrapper;

  before(async () => {
    const core = await Core.deployed();
    const setTokens = await core.setTokens.call();

    wbtcMock = await WbtcMock.deployed();
    wethMock = await WethMock.deployed();
    btcethRebalancingManager = await BTCETHRebalancingManager.deployed();
    linearAuctionPriceCurve = await LinearAuctionPriceCurve.deployed();
    initialSetToken = await SetToken.at(setTokens[0]);
    bitEthRebalancingToken = await RebalancingSetToken.at(setTokens[1]);
  });

  beforeEach(async () => {
    const core = await Core.deployed();
    const setTokens = await core.setTokens.call();

    wbtcMock = await WbtcMock.deployed();
    wethMock = await WethMock.deployed();
    initialSetToken = await SetToken.at(setTokens[0]);
    bitEthRebalancingToken = await RebalancingSetToken.at(setTokens[1]);
  });

  it('creates a linear price curve with correct priceDenominator', async () => {
    const priceDenominator = await linearAuctionPriceCurve.priceDenominator.call();
    const expectedPriceDenominator = 1000;
    
    expect(priceDenominator.toNumber()).to.eql(expectedPriceDenominator);
  });

  it('creates a linear price curve with correct usesStartPrice', async () => {
    const usesStartPrice = await linearAuctionPriceCurve.usesStartPrice.call();
    
    expect(usesStartPrice).to.eql(true);
  });

  it('creates a rebalancing manager with correct wbtc address', async () => {
    const wbtcAddress = await btcethRebalancingManager.btcAddress.call();
    
    expect(wbtcAddress).to.eql(WbtcMock.address);
  });

  it('creates a rebalancing manager with correct weth address', async () => {
    const wethAddress = await btcethRebalancingManager.ethAddress.call();
    
    expect(wethAddress).to.eql(WethMock.address);
  });

  it('creates a rebalancing manager with correct setTokenFactory', async () => {
    const setTokenFactory = await btcethRebalancingManager.setTokenFactory.call();
    
    expect(setTokenFactory).to.eql(SetTokenFactory.address);
  });

  it('creates a rebalancing manager with correct auctionLibrary', async () => {
    const auctionLibrary = await btcethRebalancingManager.auctionLibrary.call();
    
    expect(auctionLibrary).to.eql(LinearAuctionPriceCurve.address);
  });

  it('creates a rebalancing manager with correct auctionTimeToPivot', async () => {
    const auctionTimeToPivot = await btcethRebalancingManager.auctionTimeToPivot.call();
    const expectedAuctionTimeToPivot = ONE_DAY_IN_SECONDS;
    
    expect(auctionTimeToPivot.toNumber()).to.eql(expectedAuctionTimeToPivot);
  });

  it('creates an initial set with correct components', async () => {
    const components = await initialSetToken.getComponents.call();
    const expectedComponents = [wbtcMock.address, wethMock.address];
    
    expect(components).to.eql(expectedComponents);
  });

  it('creates an initial set with 50/50 allocation', async () => {
    const rawUnits = await initialSetToken.getUnits.call();
    const units = [rawUnits[0].toNumber(), rawUnits[1].toNumber()];
    
    expect(units).to.eql(EXPECTED_INITIAL_SET_UNITS);
  });

  it('creates a rebalancing set with correct manager', async () => {
    const manager = await bitEthRebalancingToken.manager.call();

    expect(manager).to.eql(BTCETHRebalancingManager.address);
  });

  it('creates a rebalancing set with correct components', async () => {
    const components = await bitEthRebalancingToken.getComponents.call();

    expect(components[0]).to.eql(initialSetToken.address);
  });

  it('creates a rebalancing set worth $100 USD', async () => {
    const rawUnits = await bitEthRebalancingToken.getUnits.call();
    const unitShares = rawUnits[0].toNumber();
    
    expect(unitShares).to.eql(EXPECTED_UNIT_SHARES);
  });
});