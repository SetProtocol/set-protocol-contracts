'use strict';

import expect from 'expect';

import {
  getContractCode,
  getNetworkId,
  getContractAddress,
  findDependency,
  getNetworkConstant
} from '../utils/output-helper';

import { calculateInitialSetUnits, calculateGeneralInitialSetUnits } from '../utils/rebalancing';
import { getWeb3Instance } from '../utils/blockchain';

import { BTCDaiRebalancingManager } from '../../artifacts/ts/BTCDaiRebalancingManager';
import { BTCETHRebalancingManager } from '../../artifacts/ts/BTCETHRebalancingManager';
import { ETHDaiRebalancingManager } from '../../artifacts/ts/ETHDaiRebalancingManager';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';
import { RebalancingSetToken } from '../../artifacts/ts/RebalancingSetToken';
import { SetToken } from '../../artifacts/ts/SetToken';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { WhiteList } from '../../artifacts/ts/WhiteList';

import { DEPLOYED_TOKEN } from '../contractNames';
import dependencies from '../dependencies';
import constants from '../constants';
import networkConstants from '../network-constants';

describe('Deployment: Rebalancing', () => {

  let web3;
  const networkId = getNetworkId();
  const networkName = getNetworkConstant();

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
      const rebalancingMangerAddress = await getContractAddress(BTCETHRebalancingManager.contractName);
      rebalancingManagerContract = new web3.eth.Contract(BTCETHRebalancingManager.abi, rebalancingMangerAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(BTCETHRebalancingManager.contractName, web3);
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
      const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
      const receivedSetTokenFactoryAddress = await rebalancingManagerContract.methods.setTokenFactory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    it('rebalancing manager has correct auction price library instance', async() => {
      const linearAuctionPriceLibrary = await getContractAddress(LinearAuctionPriceCurve.contractName);
      const receivedLinearAuctionPriceAddress = await rebalancingManagerContract.methods.auctionLibrary().call();
      expect(receivedLinearAuctionPriceAddress).toContain(linearAuctionPriceLibrary);

    });

    it('rebalancing manager has correct wBTC multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.btcMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.BITETH.WBTC_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wETH multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.ethMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.BITETH.WETH_MULTIPLIER.toString());
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
      const initialCollateralSetAddress = await getContractAddress(DEPLOYED_TOKEN.BitEthInitialCollateralSet);
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(DEPLOYED_TOKEN.BitEthInitialCollateralSet, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('collateralized set should have have the correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
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
      const bitEthRebalancingSetTokenAddress = await getContractAddress(DEPLOYED_TOKEN.BitEthRebalancingSetToken);
      bitEthRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, bitEthRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(DEPLOYED_TOKEN.BitEthRebalancingSetToken, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
      const receivedSetTokenFactory = await bitEthRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress(DEPLOYED_TOKEN.BitEthInitialCollateralSet);
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
      const whiteListAddress = await getContractAddress(WhiteList.contractName);
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
     * Check if the ETHDaiRebalancingManager was deployed correctly with the following:
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
      const rebalancingMangerAddress = await getContractAddress(ETHDaiRebalancingManager.contractName);
      rebalancingManagerContract = new web3.eth.Contract(ETHDaiRebalancingManager.abi, rebalancingMangerAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(ETHDaiRebalancingManager.contractName, web3);
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
      const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
      const receivedSetTokenFactoryAddress = await rebalancingManagerContract.methods.setTokenFactory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    it('rebalancing manager has correct auction price library instance', async() => {
      const linearAuctionPriceLibrary = await getContractAddress(LinearAuctionPriceCurve.contractName);
      const receivedLinearAuctionPriceAddress = await rebalancingManagerContract.methods.auctionLibrary().call();
      expect(receivedLinearAuctionPriceAddress).toContain(linearAuctionPriceLibrary);

    });

    it('rebalancing manager has correct Dai multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.daiMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.ETHDAI_BTD.DAI_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wETH multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.ethMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.ETHDAI_BTD.WETH_MULTIPLIER.toString());
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
    const calculatedUnitShares = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WETH.PRICE,
      constants.ETHDAI_BTD.DAI_MULTIPLIER,
      constants.ETHDAI_BTD.WETH_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WETH.FULL_TOKEN_UNITS,
      constants.ETHDAI_BTD.PRICE_PRECISION,
    );

    before(async () => {
      const initialCollateralSetAddress = await getContractAddress(DEPLOYED_TOKEN.ETHDaiInitialCollateralSet);
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(DEPLOYED_TOKEN.ETHDaiInitialCollateralSet, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('collateralized set should have have the correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
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
      const ethDaiRebalancingSetTokenAddress = await getContractAddress(DEPLOYED_TOKEN.ETHDaiRebalancingSetToken);
      ethDaiRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, ethDaiRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode('BitEthRebalancingSetToken', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
      const receivedSetTokenFactory = await ethDaiRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress(DEPLOYED_TOKEN.ETHDaiInitialCollateralSet);
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
      const whiteListAddress = await getContractAddress(WhiteList.contractName);
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

  describe('BTCDai Rebalancing Manager', () => {

    /**
     * Check if the BTCDaiRebalancingManager was deployed correctly with the following:
     * - Core
     * - wbtcMedianizerAddress
     * - daiAddress
     * - wbtcAddress
     * - SetTokenFactory
     * - LinearAuctionPriceCurve
     * - auctionTimeToPivot
     * - DAI_MULTIPLIER
     * - WBTC_MULTIPLIER
     * - lowerBound
     * - upperBound
     */

    let rebalancingManagerContract;

    before(async () => {
      const rebalancingMangerAddress = await getContractAddress(BTCDaiRebalancingManager.contractName);
      rebalancingManagerContract = new web3.eth.Contract(BTCDaiRebalancingManager.abi, rebalancingMangerAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(BTCDaiRebalancingManager.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalancing manager has correct wBTC medianizer address', async () => {
      const wBTCMedianizerAddress = dependencies.WBTC_MEDIANIZER[networkId];
      const receivedBTCMedianzierAddress = await rebalancingManagerContract.methods.btcPriceFeed().call();
      expect(receivedBTCMedianzierAddress).toEqual(wBTCMedianizerAddress);
    });

    it('rebalancing manager has correct Dai address', async () => {
      const daiAddress = await findDependency('DAI');
      const receivedDaiAddress = await rebalancingManagerContract.methods.daiAddress().call();
      expect(receivedDaiAddress).toEqual(daiAddress);
    });

    it('rebalancing manger has correct wBTC address', async () => {
      const wBTCAddress = await findDependency('WBTC');
      const receivedBTCAddress = await rebalancingManagerContract.methods.btcAddress().call();
      expect(receivedBTCAddress).toEqual(wBTCAddress);
    });

    it('rebalancing manager has correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
      const receivedSetTokenFactoryAddress = await rebalancingManagerContract.methods.setTokenFactory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    it('rebalancing manager has correct auction price library instance', async() => {
      const linearAuctionPriceLibrary = await getContractAddress(LinearAuctionPriceCurve.contractName);
      const receivedLinearAuctionPriceAddress = await rebalancingManagerContract.methods.auctionLibrary().call();
      expect(receivedLinearAuctionPriceAddress).toContain(linearAuctionPriceLibrary);
    });

    it('rebalancing manager has correct auctionTimeToPivot', async () => {
      const receivedAuctionTimeToPivot = await rebalancingManagerContract.methods.auctionTimeToPivot().call();
      const auctionTimeToPivot = networkConstants.btcDaiRebalanceManagerAuctionTimeToPivot[networkName].toString();
      expect(receivedAuctionTimeToPivot.toString()).toEqual(auctionTimeToPivot);
    });

    it('rebalancing manager has correct Dai multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.daiMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.BTCDAI_BTD.DAI_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wBTC multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.btcMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(constants.BTCDAI_BTD.WBTC_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct lower bound', async () => {
      const receivevdLowerBound = await rebalancingManagerContract.methods.maximumLowerThreshold().call();
      const lowerBound = networkConstants.btcDaiRebalanceManagerAllocationLowerBound[networkName].toString();
      expect(receivevdLowerBound.toString()).toEqual(lowerBound);
    });

    it('rebalancing manager has correct upper bound', async () => {
      const receivedUpperBound = await rebalancingManagerContract.methods.minimumUpperThreshold().call();
      const upperBound = networkConstants.btcDaiRebalanceManagerAllocationUpperBound[networkName].toString();
      expect(receivedUpperBound.toString()).toEqual(upperBound);
    });
  });

  describe('BTCDai Initial Collateralized Set', () => {

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
    const calculatedUnitShares = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WBTC.PRICE,
      constants.BTCDAI_BTD.DAI_MULTIPLIER,
      constants.BTCDAI_BTD.WBTC_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WBTC.FULL_TOKEN_UNITS,
      constants.BTCDAI_BTD.PRICE_PRECISION,
    );

    before(async () => {
      const initialCollateralSetAddress = await getContractAddress(DEPLOYED_TOKEN.BTCDaiInitialCollateralSet);
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(DEPLOYED_TOKEN.BTCDaiInitialCollateralSet, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('collateralized set should have have the correct set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
      const receivedSetTokenFactoryAddress = await initialCollateralisedSet.methods.factory().call();
      expect(receivedSetTokenFactoryAddress).toEqual(setTokenFactoryAddress);
    });

    it('collateralized set should have the correct components', async () => {
      const wBTCAddress = await findDependency('WBTC');
      const daiAddress = await findDependency('DAI');

      const setTokenComponents = [daiAddress, wBTCAddress];
      const receivedSetComponents = await initialCollateralisedSet.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    it('collateralized set should have the correct natural unit', async () => {
      const receivedNaturalUnit = await initialCollateralisedSet.methods.naturalUnit().call();
      expect(receivedNaturalUnit.toString()).toEqual(calculatedUnitShares['naturalUnit'].toString());
    });

    it('collateralized set should have the correct set name', async () => {
      const receivedSetName = await initialCollateralisedSet.methods.name().call();
      expect(receivedSetName).toEqual('BTCDAI');
    });

    it('collateralized set should have the correct set symbol', async () => {
      const receivedSetSymbol = await initialCollateralisedSet.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('BTCDAI');
    });
  });

  describe('BTCDai Rebalanced Set Token', () => {

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

    let btcDaiRebalancingSetToken;

    before(async () => {
      const btcDaiRebalancingSetTokenAddress = await getContractAddress(DEPLOYED_TOKEN.BTCDaiRebalancingSetToken);
      btcDaiRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, btcDaiRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode('BitEthRebalancingSetToken', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
      const receivedSetTokenFactory = await btcDaiRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress(DEPLOYED_TOKEN.BTCDaiInitialCollateralSet);
      const setTokenComponents = [collateralSetAddress];
      const receivedSetComponents = await btcDaiRebalancingSetToken.methods.getComponents().call();
      expect(receivedSetComponents).toEqual(setTokenComponents);
    });

    it('rebalanced set should have the correct natural unit', async () => {
      const receivedNaturalUnits = await btcDaiRebalancingSetToken.methods.naturalUnit().call();
      expect(receivedNaturalUnits.toString()).toEqual(constants.DEFAULT_REBALANCING_NATURAL_UNIT.toString());
    });

    it('rebalanced set should have the correct proposal period', async () => {
      const receivedProposalPeriod = await btcDaiRebalancingSetToken.methods.proposalPeriod().call();
      expect(receivedProposalPeriod.toString()).toEqual(networkConstants.btcDaiProposalPeriod[networkName].toString());
    });

    it('rebalanced set should have the correct rebalance interval', async () => {
      const receivedRebalanceInterval = await btcDaiRebalancingSetToken.methods.rebalanceInterval().call();
      expect(
        receivedRebalanceInterval.toString()
      ).toEqual(
        networkConstants.btcDaiRebalanceInterval[networkName].toString()
      );
    });

    it('rebalanced set should have the correct manager contract', async () => {
      const managerAddress = await getContractAddress(BTCDaiRebalancingManager.contractName);
      const receivedManagerAddress = await btcDaiRebalancingSetToken.methods.manager().call();
      expect(receivedManagerAddress).toEqual(managerAddress);
    });

    it('rebalanced set should have the correct whitelist contract', async () => {
      const whiteListAddress = await getContractAddress(WhiteList.contractName);
      const receivedWhiteListAddress = await btcDaiRebalancingSetToken.methods.componentWhiteListAddress().call();
      expect(receivedWhiteListAddress).toEqual(whiteListAddress);
    });

    it('rebalanced set should have the correct set name', async () => {
      const receivedSetName = await btcDaiRebalancingSetToken.methods.name().call();
      expect(receivedSetName).toEqual('BTD BTCDai Set');
    });

    it('rebalanced set should have the correct set symbol', async () => {
      const receivedSetSymbol = await btcDaiRebalancingSetToken.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('BTCDai');
    });
  });
});