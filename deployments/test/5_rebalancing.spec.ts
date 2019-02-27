'use strict';

import expect from 'expect';

import {
  getContractCode,
  getNetworkId,
  getContractAddress,
  findDependency,
  getNetworkName
} from '../utils/output-helper';

import { calculateInitialSetUnits, calculateETHDaiInitialSetUnits } from '../utils/rebalancing';
import { getWeb3Instance } from '../utils/blockchain';

import { BTCETHRebalancingManager } from '../../artifacts/ts/BTCETHRebalancingManager';
import { ETHDaiRebalancingManager } from '../../artifacts/ts/ETHDaiRebalancingManager';
import { SetToken } from '../../artifacts/ts/SetToken';
import { RebalancingSetToken } from '../../artifacts/ts/RebalancingSetToken';

import dependencies from '../dependencies';
import constants from '../constants';
import networkConstants from '../network-constants';

describe('Deployment: Rebalancing', () => {

  let web3;
  const networkId = getNetworkId();
  const networkName = getNetworkName();

  before(async () => {
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

    before(async () => {
      const rebalancingMangerAddress = await getContractAddress('BitEthRebalanceManager');
      rebalancingManagerContract = new web3.eth.Contract(BTCETHRebalancingManager.abi, rebalancingMangerAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode('BitEthRebalanceManager', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalancing manager has correct wBTC medianizer address', async () => {
      const wBTCMedianizerAddress = dependencies.WBTC_MEDIANIZER[networkId];
      const receivedBTCMedianizerAddress = await rebalancingManagerContract.methods.btcPriceFeed().call();
      expect(receivedBTCMedianizerAddress).toEqual(wBTCMedianizerAddress);
    });

    it('rebalancing manager has correct wETH medianizer address', async () => {
      const wETHMedianizerAddress = dependencies.WETH_MEDIANIZER[networkId];
      const receivedETHMedianzierAddress = await rebalancingManagerContract.methods.ethPriceFeed().call();
      expect(receivedETHMedianzierAddress).toEqual(wETHMedianizerAddress);
    });

    it('rebalancing manager has correct wBTC address', async () => {
      const wBTCAddress = await findDependency('WBTC');
      const receivedBTCAddress = await rebalancingManagerContract.methods.btcAddress().call();
      expect(receivedBTCAddress).toEqual(wBTCAddress);
    });

    it('rebalancing manger has correct wETH address', async () => {
      const wETHAddress = await findDependency('WETH');
      const receivedETHAddress = await rebalancingManagerContract.methods.ethAddress().call();
      expect(receivedETHAddress).toEqual(wETHAddress);
    });

    it('rebalancing manager has correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      const receivedSetTokenFactoryAddress = await rebalancingManagerContract.methods.setTokenFactory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    it('rebalancing manager has correct auction price library instance', async() => {
      const linearAuctionPriceLibrary = await getContractAddress('LinearAuctionPriceCurve');
      const receivedLinearAuctionPriceAddress = await rebalancingManagerContract.methods.auctionLibrary().call();
      expect(receivedLinearAuctionPriceAddress).toContain(linearAuctionPriceLibrary);

    });

    it('rebalancing manager has correct wBTC multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.btcMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.WBTC.MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wETH multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.ethMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.WETH.MULTIPLIER.toString());
    });

    it('rebalancing manager has correct lower bound', async () => {
      const receivevdLowerBound = await rebalancingManagerContract.methods.maximumLowerThreshold().call();
      const lowerBound = networkConstants.bitEthRebalanceManagerAllocationLowerBound[networkName].toString();
      expect(receivevdLowerBound.toString()).toEqual(lowerBound);
    });

    it('rebalancing manager has correct upper bound', async () => {
      const receivedUpperBound = await rebalancingManagerContract.methods.minimumUpperThreshold().call();
      const upperBound = networkConstants.bitEthRebalanceManagerAllocationUpperBound[networkName].toString();
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

    before(async () => {
      const initialCollateralSetAddress = await getContractAddress('BitEthInitialCollateralSet');
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode('BitEthInitialCollateralSet', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('collateralized set should have have the correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      const receivedSetTokenFactoryAddress = await initialCollateralisedSet.methods.factory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    it('collateralized set should have the correct components', async () => {
      const wETHAddress = await findDependency('WETH');
      const wBTCAddress = await findDependency('WBTC');

      const setTokenComponents = [wBTCAddress, wETHAddress];
      const receivedSetComponents = await initialCollateralisedSet.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    it('collateralized set should have the correct natural unit', async () => {
      const receivedNaturalUnit = await initialCollateralisedSet.methods.naturalUnit().call();
      expect(receivedNaturalUnit.toString()).toEqual(calculatedUnitShares['naturalUnit'].toString());
    });

    it('collateralized set should have the correct set name', async () => {
      const receivedSetName = await initialCollateralisedSet.methods.name().call();
      expect(receivedSetName).toEqual('BTCETH');
    });

    it('collateralized set should have the correct set symbol', async () => {
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

    before(async () => {
      const bitEthRebalancingSetTokenAddress = await getContractAddress('BitEthRebalancingSetToken');
      bitEthRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, bitEthRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode('BitEthRebalancingSetToken', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
      const receivedSetTokenFactory = await bitEthRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress('BitEthInitialCollateralSet');
      const setTokenComponents = [collateralSetAddress];
      const receivedSetComponents = await bitEthRebalancingSetToken.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    it('rebalanced set should have the correct natural unit', async () => {
      const receivedNaturalUnits = await bitEthRebalancingSetToken.methods.naturalUnit().call();
      expect(receivedNaturalUnits.toString()).toEqual(constants.DEFAULT_REBALANCING_NATURAL_UNIT.toString());
    });

    it('rebalanced set should have the correct proposal period', async () => {
      const receivedProposalPeriod = await bitEthRebalancingSetToken.methods.proposalPeriod().call();
      expect(receivedProposalPeriod.toString()).toEqual(networkConstants.bitEthProposalPeriod[networkName].toString());
    });

    it('rebalanced set should have the correct rebalance interval', async () => {
      const receivedRebalanceInterval = await bitEthRebalancingSetToken.methods.rebalanceInterval().call();
      expect(
        receivedRebalanceInterval.toString()
      ).toEqual(
        networkConstants.bitEthRebalanceInterval[networkName].toString()
      );
    });

    it('rebalanced set should have the correct whitelist contract', async () => {
      const whiteListAddress = await getContractAddress('WhiteList');
      const receivedWhiteListAddress = await bitEthRebalancingSetToken.methods.componentWhiteListAddress().call();
      expect(receivedWhiteListAddress).toEqual(whiteListAddress);
    });

    it('rebalanced set should have the correct set name', async () => {
      const receivedSetName = await bitEthRebalancingSetToken.methods.name().call();
      expect(receivedSetName).toEqual('BitEth Set');
    });

    it('rebalanced set should have the correct set symbol', async () => {
      const receivedSetSymbol = await bitEthRebalancingSetToken.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('BTCETH');
    });
  });

  describe('ETHDai Rebalancing Manager', () => {

    /**
     * Check if the BTCETHRebalancingManager was deployed correctly with the following:
     * - Core
     * - wethMedianizerAddress
     * - daiAddress
     * - wethAddress
     * - SetTokenFactory
     * - LinearAuctionPriceCurve
     * - auctionTimeToPivot
     * - DAI_MULTIPLIER
     * - WETH_MULTIPLIER
     */

    let rebalancingManagerContract;

    before(async () => {
      const rebalancingMangerAddress = await getContractAddress('ETHDaiRebalanceManager');
      rebalancingManagerContract = new web3.eth.Contract(ETHDaiRebalancingManager.abi, rebalancingMangerAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode('ETHDaiRebalanceManager', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalancing manager has correct wETH medianizer address', async () => {
      const wETHMedianizerAddress = dependencies.WETH_MEDIANIZER[networkId];
      const receivedETHMedianzierAddress = await rebalancingManagerContract.methods.ethPriceFeed().call();
      expect(receivedETHMedianzierAddress).toEqual(wETHMedianizerAddress);
    });

    it('rebalancing manager has correct Dai address', async () => {
      const daiAddress = await findDependency('DAI');
      const receivedDaiAddress = await rebalancingManagerContract.methods.daiAddress().call();
      expect(receivedDaiAddress).toEqual(daiAddress);
    });

    it('rebalancing manger has correct wETH address', async () => {
      const wETHAddress = await findDependency('WETH');
      const receivedETHAddress = await rebalancingManagerContract.methods.ethAddress().call();
      expect(receivedETHAddress).toEqual(wETHAddress);
    });

    it('rebalancing manager has correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      const receivedSetTokenFactoryAddress = await rebalancingManagerContract.methods.setTokenFactory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    it('rebalancing manager has correct auction price library instance', async() => {
      const linearAuctionPriceLibrary = await getContractAddress('LinearAuctionPriceCurve');
      const receivedLinearAuctionPriceAddress = await rebalancingManagerContract.methods.auctionLibrary().call();
      expect(receivedLinearAuctionPriceAddress).toContain(linearAuctionPriceLibrary);

    });

    it('rebalancing manager has correct Dai multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.daiMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.DAI.MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wETH multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.ethMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.WETH.MULTIPLIER.toString());
    });

    it('rebalancing manager has correct lower bound', async () => {
      const receivevdLowerBound = await rebalancingManagerContract.methods.maximumLowerThreshold().call();
      const lowerBound = networkConstants.ethDaiRebalanceManagerAllocationLowerBound[networkName].toString();
      expect(receivevdLowerBound.toString()).toEqual(lowerBound);
    });

    it('rebalancing manager has correct upper bound', async () => {
      const receivedUpperBound = await rebalancingManagerContract.methods.minimumUpperThreshold().call();
      const upperBound = networkConstants.ethDaiRebalanceManagerAllocationUpperBound[networkName].toString();
      expect(receivedUpperBound.toString()).toEqual(upperBound);
    });
  });

  describe('ETHDai Initial Collateralized Set', () => {

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
    const calculatedUnitShares = calculateETHDaiInitialSetUnits();

    before(async () => {
      const initialCollateralSetAddress = await getContractAddress('ETHDaiInitialCollateralSet');
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode('ETHDaiInitialCollateralSet', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('collateralized set should have have the correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      const receivedSetTokenFactoryAddress = await initialCollateralisedSet.methods.factory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    it('collateralized set should have the correct components', async () => {
      const wETHAddress = await findDependency('WETH');
      const daiAddress = await findDependency('DAI');

      const setTokenComponents = [daiAddress, wETHAddress];
      const receivedSetComponents = await initialCollateralisedSet.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    it('collateralized set should have the correct natural unit', async () => {
      const receivedNaturalUnit = await initialCollateralisedSet.methods.naturalUnit().call();
      expect(receivedNaturalUnit.toString()).toEqual(calculatedUnitShares['naturalUnit'].toString());
    });

    it('collateralized set should have the correct set name', async () => {
      const receivedSetName = await initialCollateralisedSet.methods.name().call();
      expect(receivedSetName).toEqual('ETHDAI');
    });

    it('collateralized set should have the correct set symbol', async () => {
      const receivedSetSymbol = await initialCollateralisedSet.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('ETHDAI');
    });
  });

  describe('ETHDai Rebalanced Set Token', () => {

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

    let ethDaiRebalancingSetToken;

    before(async () => {
      const ethDaiRebalancingSetTokenAddress = await getContractAddress('ETHDaiRebalancingSetToken');
      ethDaiRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, ethDaiRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode('BitEthRebalancingSetToken', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
      const receivedSetTokenFactory = await ethDaiRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress('ETHDaiInitialCollateralSet');
      const setTokenComponents = [collateralSetAddress];
      const receivedSetComponents = await ethDaiRebalancingSetToken.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    it('rebalanced set should have the correct natural unit', async () => {
      const receivedNaturalUnits = await ethDaiRebalancingSetToken.methods.naturalUnit().call();
      expect(receivedNaturalUnits.toString()).toEqual(constants.DEFAULT_REBALANCING_NATURAL_UNIT.toString());
    });

    it('rebalanced set should have the correct proposal period', async () => {
      const receivedProposalPeriod = await ethDaiRebalancingSetToken.methods.proposalPeriod().call();
      expect(receivedProposalPeriod.toString()).toEqual(networkConstants.ethDaiProposalPeriod[networkName].toString());
    });

    it('rebalanced set should have the correct rebalance interval', async () => {
      const receivedRebalanceInterval = await ethDaiRebalancingSetToken.methods.rebalanceInterval().call();
      expect(
        receivedRebalanceInterval.toString()
      ).toEqual(
        networkConstants.ethDaiRebalanceInterval[networkName].toString()
      );
    });

    it('rebalanced set should have the correct whitelist contract', async () => {
      const whiteListAddress = await getContractAddress('WhiteList');
      const receivedWhiteListAddress = await ethDaiRebalancingSetToken.methods.componentWhiteListAddress().call();
      expect(receivedWhiteListAddress).toEqual(whiteListAddress);
    });

    it('rebalanced set should have the correct set name', async () => {
      const receivedSetName = await ethDaiRebalancingSetToken.methods.name().call();
      expect(receivedSetName).toEqual('BTD ETHDai Set');
    });

    it('rebalanced set should have the correct set symbol', async () => {
      const receivedSetSymbol = await ethDaiRebalancingSetToken.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('ETHDai');
    });
  });
});