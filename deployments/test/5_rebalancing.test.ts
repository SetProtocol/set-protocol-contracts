'use strict';

import {
  getContractCode,
  getNetworkId,
  getContractAddress,
  findDependency,
  getNetworkName
} from '../utils/output-helper';

import { calculateInitialSetUnits } from '../utils/rebalancing';
import { getWeb3Instance } from '../utils/blockchain';

import { BTCETHRebalancingManager } from '../../artifacts/ts/BTCETHRebalancingManager';
import { SetToken } from '../../artifacts/ts/SetToken';
import { RebalancingSetToken } from '../../artifacts/ts/RebalancingSetToken';

import dependencies from '../dependencies';
import constants from '../constants';
import networkConstants from 'deployments/network-constants';

describe('Deployment: Rebalancing', () => {

  let web3;
  let networkId = getNetworkId();
  let networkName = getNetworkName();

  beforeAll(async () => {
    web3 = await getWeb3Instance();
  });

  describe('BTCETH Rebalancing Manager', () => {

    /**
     * Check if the BTCETHRebalancingManager was deployed correctly with the following:
     * - Core
     * - wbtcMedianizerAddress
     * - wethMedianizerAddress
     * - wbtcAddress
     * - wethAddress
     * - SetTokenFactory
     * - LinearAuctionPriceCurve
     * - auctionTimeToPivot
     * - WBTC_MULTIPLIER
     * - WETH_MULTIPLIER
     */

    let rebalancingManagerContract;

    beforeAll(async () => {
      const rebalancingMangerAddress = await getContractAddress('BitEthRebalanceManager');
      rebalancingManagerContract = new web3.eth.Contract(BTCETHRebalancingManager.abi, rebalancingMangerAddress);
    });

    test('find a valid contract at the address', async () => {
      const code = await getContractCode('BitEthRebalanceManager', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    test('rebalancing manager has correct wBTC medianizer address', async () => {
      const wBTCMedianizerAddress = dependencies.WBTC_MEDIANIZER[networkId];
      const receivedBTCMedianizerAddress = await rebalancingManagerContract.methods.btcPriceFeed().call();
      expect(receivedBTCMedianizerAddress).toEqual(wBTCMedianizerAddress);
    });

    test('rebalancing manager has correct wETH medianizer address', async () => {
      const wETHMedianizerAddress = dependencies.WETH_MEDIANIZER[networkId];
      const receivedETHMedianzierAddress = await rebalancingManagerContract.methods.ethPriceFeed().call();
      expect(receivedETHMedianzierAddress).toEqual(wETHMedianizerAddress);
    });

    test('rebalancing manager has correct wBTC address', async () => {
      const wBTCAddress = await findDependency('WBTC');
      const receivedBTCAddress = await rebalancingManagerContract.methods.btcAddress().call();
      expect(receivedBTCAddress).toEqual(wBTCAddress);
    });

    test('rebalancing manger has correct wETH address', async () => {
      const wETHAddress = await findDependency('WETH');
      const receivedETHAddress = await rebalancingManagerContract.methods.ethAddress().call();
      expect(receivedETHAddress).toEqual(wETHAddress);
    });

    test('rebalancing manager has correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      const receivedSetTokenFactoryAddress = await rebalancingManagerContract.methods.setTokenFactory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    test('rebalancing manager has correct auction price library instance', async() => {
      const linearAuctionPriceLibrary = await getContractAddress('LinearAuctionPriceCurve');
      const receivedLinearAuctionPriceAddress = await rebalancingManagerContract.methods.auctionLibrary().call();
      expect(receivedLinearAuctionPriceAddress).toContain(linearAuctionPriceLibrary);

    });

    test('rebalancing manager has correct wBTC multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.btcMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.WBTC_MULTIPLIER.toString());
    });

    test('rebalancing manager has correct wETH multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.ethMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.WETH_MULTIPLIER.toString());
    });

    test('rebalancing manager has correct lower bound', async () => {
      const receivevdLowerBound = await rebalancingManagerContract.methods.maximumLowerThreshold().call();
      let lowerBound = networkConstants.bitEthRebalanceManagerAllocationLowerBound[networkName].toString();
      expect(receivevdLowerBound.toString()).toEqual(lowerBound);
    });

    test('rebalancing manager has correct upper bound', async () => {
      const receivedUpperBound = await rebalancingManagerContract.methods.minimumUpperThreshold().call();
      let upperBound = networkConstants.bitEthRebalanceManagerAllocationUpperBound[networkName].toString();
      expect(receivedUpperBound.toString()).toEqual(upperBound);
    });

  });

  describe('Initial Collateralized Set', () => {

    /**
     * Check if there's a InitialCollateralSet address with the correct params:
     * - SetTokenFactory
     * - rebalancingSetComponents
     * - rebalancingSetUnitShares
     * - rebalancingSetNaturalUnit
     * - rebalancingSetName
     * - rebalancingSetSymbol
     * - rebalancingSetCallData
     */

    let initialCollateralisedSet;
    const calculatedUnitShares = calculateInitialSetUnits();

    beforeAll(async () => {
      const initialCollateralSetAddress = await getContractAddress('InitialCollateralSet');
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    test('find a valid contract at the address', async () => {
      const code = await getContractCode('InitialCollateralSet', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    test('collateralized set should have have the correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      const receivedSetTokenFactoryAddress = await initialCollateralisedSet.methods.factory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    test('collateralized set should have the correct components', async () => {
      const wETHAddress = await findDependency('WETH');
      const wBTCAddress = await findDependency('WBTC');

      const setTokenComponents = [wBTCAddress, wETHAddress];
      const receivedSetComponents = await initialCollateralisedSet.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    test('collateralized set should have the correct natural unit', async () => {
      const receivedNaturalUnit = await initialCollateralisedSet.methods.naturalUnit().call();
      expect(receivedNaturalUnit.toString()).toEqual(calculatedUnitShares['naturalUnit'].toString());
    });

    test('collateralized set should have the correct set name', async () => {
      const receivedSetName = await initialCollateralisedSet.methods.name().call();
      expect(receivedSetName).toEqual('BTCETH');
    });

    test('collateralized set should have the correct set symbol', async () => {
      const receivedSetSymbol = await initialCollateralisedSet.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('BTCETH');
    });

  });

  describe('Initial Rebalanced Set Token', () => {

    /**
     * CHeck if there's a rebalanced set with the correct params:
     * - RebalancingSetTokenFactory address
     * - rebalancingSetComponents
     * - rebalancingSetUnitShares
     * - rebalancingSetNaturalUnit
     * - rebalancingSetName
     * - rebalancingSetSymbol
     * - rebalancingSetCallData
     */

    let bitEthRebalancingSetToken;

    beforeAll(async () => {
      const bitEthRebalancingSetTokenAddress = await getContractAddress('BitEthRebalancingSetToken');
      bitEthRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, bitEthRebalancingSetTokenAddress);
    });

    test('find a valid contract at the address', async () => {
      const code = await getContractCode('BitEthRebalancingSetToken', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    test('rebalanced set should have have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
      const receivedSetTokenFactory = await bitEthRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    test('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress('InitialCollateralSet');
      const setTokenComponents = [collateralSetAddress];
      const receivedSetComponents = await bitEthRebalancingSetToken.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    test('rebalanced set should have the correct natural unit', async () => {
      const receivedNaturalUnits = await bitEthRebalancingSetToken.methods.naturalUnit().call();
      expect(receivedNaturalUnits.toString()).toEqual(constants.DEFAULT_REBALANCING_NATURAL_UNIT.toString());
    });

    test('rebalanced set should have the correct set name', async () => {
      const receivedSetName = await bitEthRebalancingSetToken.methods.name().call();
      expect(receivedSetName).toEqual('BitEth Set');
    });

    test('rebalanced set should have the correct set symbol', async () => {
      const receivedSetSymbol = await bitEthRebalancingSetToken.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('BTCETH');
    });

  });

});