'use strict';

import * as chai from 'chai';

import { getContractCode, getNetworkName, getNetworkId, getContractAddress, getWeb3Instance, findDependency } from "../utils/blockchain";

import { BTCETHRebalancingManager } from '../../artifacts/ts/BTCETHRebalancingManager';
import { SetToken } from '../../artifacts/ts/SetToken';
import { RebalancingSetToken } from '../../artifacts/ts/RebalancingSetToken';

import dependencies from '../dependencies';
import networkConstants from '../network-constants';
import constants from '../constants';

describe('Deployment: Rebalancing', () => {

  let web3;
  let networkId;
  let networkName = getNetworkName();

  beforeAll(async () => {
    web3 = await getWeb3Instance();
    networkId = await getNetworkId();
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
      let rebalancingMangerAddress = await getContractAddress('BitEthRebalanceManager');
      rebalancingManagerContract = new web3.eth.Contract(BTCETHRebalancingManager.abi, rebalancingMangerAddress);
    });

    test('find a valid contract at the address', async () => {
      let code = await getContractCode('BitEthRebalanceManager', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('rebalancing manager has correct wBTC medianizer address', async () => {
      let wBTCMedianizerAddress = dependencies.WBTC_MEDIANIZER[networkId];
      let receivedBTCMedianizerAddress = await rebalancingManagerContract.methods.btcPriceFeed().call();
      expect(receivedBTCMedianizerAddress).toEqual(wBTCMedianizerAddress);
    });

    test('rebalancing manager has correct wETH medianizer address', async () => {
      let wETHMedianizerAddress = dependencies.WETH_MEDIANIZER[networkId];
      let receivedETHMedianzierAddress = await rebalancingManagerContract.methods.ethPriceFeed().call();
      expect(receivedETHMedianzierAddress).toEqual(wETHMedianizerAddress);
    });

    test('rebalancing manager has correct wBTC address', async () => {
      let wBTCAddress = await findDependency('WBTC');
      let receivedBTCAddress = await rebalancingManagerContract.methods.btcAddress().call();
      expect(receivedBTCAddress).toEqual(wBTCAddress);
    });

    test('rebalancing manger has correct wETH address', async () => {
      let wETHAddress = await findDependency('WETH');
      let receivedETHAddress = await rebalancingManagerContract.methods.ethAddress().call();
      expect(receivedETHAddress).toEqual(wETHAddress);
    });

    test('rebalancing manager has correct set token factory', async () => {
      let setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      let receivedSetTokenFactoryAddress = await rebalancingManagerContract.methods.setTokenFactory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    test('rebalancing manager has correct linear auction price library instance', async() => {
      let linearAuctionPriceLibrary = await getContractAddress('LinearAuctionPriceCurve');
      let receivedLinearAuctionPriceAddress = await rebalancingManagerContract.methods.auctionLibrary().call();
      expect(receivedLinearAuctionPriceAddress).toEqual(linearAuctionPriceLibrary);
    });

    test('rebalancing manager has correct wBTC multiplier', async () => {
      // @TODO: Calculate correct amount
    });

    test('rebalancing manager has correct wETH multiplier', async () => {
      // @TODO: Calculate correct amount
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

    beforeAll(async () => {
      let initialCollateralSetAddress = await getContractAddress('InitialCollateralSet');
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    test('find a valid contract at the address', async () => {
      let code = await getContractCode('InitialCollateralSet', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('collateralized set should have have the correct set token factory', async () => {
      let setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      let receivedSetTokenFactoryAddress = await initialCollateralisedSet.methods.factory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    test('collateralized set should have the correct components', async () => {
      let wETHAddress = await findDependency('WETH');
      let wBTCAddress = await findDependency('WBTC');
      let setTokenComponents = [wBTCAddress, wETHAddress];
      let receivedSetComponents = await initialCollateralisedSet.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    test('collateralized set should have the correct unit shares', async () => {
      // @TODO: Calculate correct amount
    });
    
    test('collateralized set should have the correct natural unit', async () => {
      // @TODO: Calculate correct amount
    });

    test('collateralized set should have the correct set name', async () => {
      let receivedSetName = await initialCollateralisedSet.methods.name().call()
      expect(receivedSetName).toEqual('BitEth Set');
    });

    test('collateralized set should have the correct set symbol', async () => {
      let receivedSetSymbol = await initialCollateralisedSet.methods.symbol().call()
      expect(receivedSetSymbol).toEqual('BTCETH');
    });

    test('collateralized set should have the correct set call data', async () => {
      // @TODO: Calculate correct amount
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
      let bitEthRebalancingSetTokenAddress = await getContractAddress('BitEthRebalancingSetToken');
      bitEthRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, bitEthRebalancingSetTokenAddress);
    });

    test('find a valid contract at the address', async () => {
      let code = await getContractCode('BitEthRebalancingSetToken', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('rebalanced set should have have the correct rebalancing set token factory', async () => {
      let rebalancingSetTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
      let receivedSetTokenFactory = await bitEthRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    test('rebalanced set should have the correct components', async () => {
      let wETHAddress = await findDependency('WETH');
      let wBTCAddress = await findDependency('WBTC');
      let setTokenComponents = [wBTCAddress, wETHAddress];
      let receivedSetComponents = await bitEthRebalancingSetToken.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    test('rebalanced set should have the correct unit shares', async () => {
      // @TODO: Calculate correct amount
    });
    
    test('rebalanced set should have the correct natural unit', async () => {
      // @TODO: Calculate correct amount
    });

    test('rebalanced set should have the correct set name', async () => {
      let receivedSetName = await bitEthRebalancingSetToken.methods.name().call()
      expect(receivedSetName).toEqual('BTCETH');
    });

    test('rebalanced set should have the correct set symbol', async () => {
      let receivedSetSymbol = await bitEthRebalancingSetToken.methods.symbol().call()
      expect(receivedSetSymbol).toEqual('BTCETH');
    });

    test('rebalanced set should have the correct set call data', async () => {
      // @TODO: Calculate correct amount
    });

  });
  
});