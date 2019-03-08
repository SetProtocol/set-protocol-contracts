'use strict';

import expect from 'expect';

import {
  getContractCode,
  getNetworkId,
  getContractAddress,
  findDependency,
  getNetworkConstant
} from '../utils/output-helper';

import { calculateInitialSetUnits, calculateGeneralInitialSetUnits, calculateAllocationBounds } from '../utils/rebalancing';
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

import { DEPLOYED_SETS_INFO } from '../contractNames';
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

  describe('BTCETH 75/25 Rebalancing Manager', () => {

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
    let expectedAllocationBounds;
    const setParams = DEPLOYED_SETS_INFO.BITETH_BTC_DOMINANT;

    before(async () => {
      const rebalancingMangerAddress = await getContractAddress(setParams.MANAGER_NAME);
      rebalancingManagerContract = new web3.eth.Contract(BTCETHRebalancingManager.abi, rebalancingMangerAddress);
      expectedAllocationBounds = calculateAllocationBounds(
        setParams.WBTC_MULTIPLIER,
        setParams.WETH_MULTIPLIER,
        networkConstants.bitEthRebalanceManagerAllocationLowerBound[networkName],
        networkConstants.bitEthRebalanceManagerAllocationUpperBound[networkName],
      );
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.MANAGER_NAME, web3);
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
      expect(receivedMultiplier.toString()).toEqual(setParams.WBTC_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wETH multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.ethMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(setParams.WETH_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct lower bound', async () => {
      const receivevdLowerBound = await rebalancingManagerContract.methods.maximumLowerThreshold().call();
      expect(receivevdLowerBound.toString()).toEqual(expectedAllocationBounds[0]);
    });

    it('rebalancing manager has correct upper bound', async () => {
      const receivedUpperBound = await rebalancingManagerContract.methods.minimumUpperThreshold().call();
      expect(receivedUpperBound.toString()).toEqual(expectedAllocationBounds[1]);
    });
  });

  describe('Initial BTCETH 75/25 Collateralized Set', () => {

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
    const setParams = DEPLOYED_SETS_INFO.BITETH_BTC_DOMINANT;
    const calculatedUnitShares = calculateInitialSetUnits(
      setParams.WBTC_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      setParams.PRICE_PRECISION
    );

    before(async () => {
      const initialCollateralSetAddress = await getContractAddress(setParams.COLLATERAL_NAME);
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.COLLATERAL_NAME, web3);
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
      expect(receivedSetName).toEqual(setParams.COLLATERAL_NAME);
    });

    it('collateralized set should have the correct set symbol', async () => {
      const receivedSetSymbol = await initialCollateralisedSet.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('BTCETH');
    });
  });

  describe('BTCETH 75/25 Rebalancing Set Token', () => {

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
    const setParams = DEPLOYED_SETS_INFO.BITETH_BTC_DOMINANT;

    before(async () => {
      const bitEthRebalancingSetTokenAddress = await getContractAddress(setParams.SET_NAME);
      bitEthRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, bitEthRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.SET_NAME, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
      const receivedSetTokenFactory = await bitEthRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress(setParams.COLLATERAL_NAME);
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
      expect(receivedSetName).toEqual(setParams.SET_NAME);
    });

    it('rebalanced set should have the correct set symbol', async () => {
      const receivedSetSymbol = await bitEthRebalancingSetToken.methods.symbol().call();
      expect(receivedSetSymbol).toEqual(setParams.SET_SYMBOL);
    });
  });

  describe('BTCETH 25/75 Rebalancing Manager', () => {

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
    let expectedAllocationBounds;
    const setParams = DEPLOYED_SETS_INFO.BITETH_ETH_DOMINANT;

    before(async () => {
      const rebalancingMangerAddress = await getContractAddress(setParams.MANAGER_NAME);
      rebalancingManagerContract = new web3.eth.Contract(BTCETHRebalancingManager.abi, rebalancingMangerAddress);
      expectedAllocationBounds = calculateAllocationBounds(
        setParams.WBTC_MULTIPLIER,
        setParams.WETH_MULTIPLIER,
        networkConstants.bitEthRebalanceManagerAllocationLowerBound[networkName],
        networkConstants.bitEthRebalanceManagerAllocationUpperBound[networkName],
      );
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.MANAGER_NAME, web3);
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
      expect(receivedMultiplier.toString()).toEqual(setParams.WBTC_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wETH multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.ethMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(setParams.WETH_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct lower bound', async () => {
      const receivevdLowerBound = await rebalancingManagerContract.methods.maximumLowerThreshold().call();
      expect(receivevdLowerBound.toString()).toEqual(expectedAllocationBounds[0]);
    });

    it('rebalancing manager has correct upper bound', async () => {
      const receivedUpperBound = await rebalancingManagerContract.methods.minimumUpperThreshold().call();
      expect(receivedUpperBound.toString()).toEqual(expectedAllocationBounds[1]);
    });
  });

  describe('Initial BTCETH 25/75 Collateralized Set', () => {

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
    const setParams = DEPLOYED_SETS_INFO.BITETH_ETH_DOMINANT;
    const calculatedUnitShares = calculateInitialSetUnits(
      setParams.WBTC_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      setParams.PRICE_PRECISION
    );

    before(async () => {
      const initialCollateralSetAddress = await getContractAddress(setParams.COLLATERAL_NAME);
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.COLLATERAL_NAME, web3);
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
      expect(receivedSetName).toEqual(setParams.COLLATERAL_NAME);
    });

    it('collateralized set should have the correct set symbol', async () => {
      const receivedSetSymbol = await initialCollateralisedSet.methods.symbol().call();
      expect(receivedSetSymbol).toEqual('BTCETH');
    });
  });

  describe('BTCETH 25/75 Rebalancing Set Token', () => {

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
    const setParams = DEPLOYED_SETS_INFO.BITETH_ETH_DOMINANT;

    before(async () => {
      const bitEthRebalancingSetTokenAddress = await getContractAddress(setParams.SET_NAME);
      bitEthRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, bitEthRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.SET_NAME, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
      const receivedSetTokenFactory = await bitEthRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress(setParams.COLLATERAL_NAME);
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
      expect(receivedSetName).toEqual(setParams.SET_NAME);
    });

    it('rebalanced set should have the correct set symbol', async () => {
      const receivedSetSymbol = await bitEthRebalancingSetToken.methods.symbol().call();
      expect(receivedSetSymbol).toEqual(setParams.SET_SYMBOL);
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
    let expectedAllocationBounds;
    const setParams = DEPLOYED_SETS_INFO.ETHDAI_BTD;

    before(async () => {
      const rebalancingMangerAddress = await getContractAddress(setParams.MANAGER_NAME);
      rebalancingManagerContract = new web3.eth.Contract(ETHDaiRebalancingManager.abi, rebalancingMangerAddress);
      expectedAllocationBounds = calculateAllocationBounds(
        setParams.DAI_MULTIPLIER,
        setParams.WETH_MULTIPLIER,
        networkConstants.ethDaiRebalanceManagerAllocationLowerBound[networkName],
        networkConstants.ethDaiRebalanceManagerAllocationUpperBound[networkName],
      );
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.MANAGER_NAME, web3);
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
      expect(receivedMultiplier.toString()).toEqual(setParams.DAI_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wETH multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.ethMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(setParams.WETH_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct lower bound', async () => {
      const receivevdLowerBound = await rebalancingManagerContract.methods.maximumLowerThreshold().call();
      expect(receivevdLowerBound.toString()).toEqual(expectedAllocationBounds[0]);
    });

    it('rebalancing manager has correct upper bound', async () => {
      const receivedUpperBound = await rebalancingManagerContract.methods.minimumUpperThreshold().call();
      expect(receivedUpperBound.toString()).toEqual(expectedAllocationBounds[1]);
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
    const setParams = DEPLOYED_SETS_INFO.ETHDAI_BTD;
    const calculatedUnitShares = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WETH.PRICE,
      setParams.DAI_MULTIPLIER,
      setParams.WETH_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WETH.FULL_TOKEN_UNITS,
      setParams.PRICE_PRECISION,
    );

    before(async () => {
      const initialCollateralSetAddress = await getContractAddress(setParams.COLLATERAL_NAME);
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.COLLATERAL_NAME, web3);
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
      expect(receivedSetName).toEqual(setParams.COLLATERAL_NAME);
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
    const setParams = DEPLOYED_SETS_INFO.ETHDAI_BTD;

    before(async () => {
      const ethDaiRebalancingSetTokenAddress = await getContractAddress(setParams.SET_NAME);
      ethDaiRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, ethDaiRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.SET_NAME, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
      const receivedSetTokenFactory = await ethDaiRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress(setParams.COLLATERAL_NAME);
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
      expect(receivedSetName).toEqual(setParams.SET_NAME);
    });

    it('rebalanced set should have the correct set symbol', async () => {
      const receivedSetSymbol = await ethDaiRebalancingSetToken.methods.symbol().call();
      expect(receivedSetSymbol).toEqual(setParams.SET_SYMBOL);
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
    let expectedAllocationBounds;
    const setParams = DEPLOYED_SETS_INFO.BTCDAI_BTD;

    before(async () => {
      const rebalancingMangerAddress = await getContractAddress(setParams.MANAGER_NAME);
      rebalancingManagerContract = new web3.eth.Contract(BTCDaiRebalancingManager.abi, rebalancingMangerAddress);
      expectedAllocationBounds = calculateAllocationBounds(
        setParams.DAI_MULTIPLIER,
        setParams.WBTC_MULTIPLIER,
        networkConstants.btcDaiRebalanceManagerAllocationLowerBound[networkName],
        networkConstants.btcDaiRebalanceManagerAllocationUpperBound[networkName],
      );
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.MANAGER_NAME, web3);
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
      expect(receivedMultiplier.toString()).toEqual(setParams.DAI_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct wBTC multiplier', async () => {
      const receivedMultiplier = await rebalancingManagerContract.methods.btcMultiplier().call();
      expect(receivedMultiplier.toString()).toEqual(setParams.WBTC_MULTIPLIER.toString());
    });

    it('rebalancing manager has correct lower bound', async () => {
      const receivevdLowerBound = await rebalancingManagerContract.methods.maximumLowerThreshold().call();
      expect(receivevdLowerBound.toString()).toEqual(expectedAllocationBounds[0]);
    });

    it('rebalancing manager has correct upper bound', async () => {
      const receivedUpperBound = await rebalancingManagerContract.methods.minimumUpperThreshold().call();
      expect(receivedUpperBound.toString()).toEqual(expectedAllocationBounds[1]);
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
    const setParams = DEPLOYED_SETS_INFO.BTCDAI_BTD;
    const calculatedUnitShares = calculateGeneralInitialSetUnits(
      constants.DAI.PRICE,
      constants.WBTC.PRICE,
      setParams.DAI_MULTIPLIER,
      setParams.WBTC_MULTIPLIER,
      constants.DAI.FULL_TOKEN_UNITS,
      constants.WBTC.FULL_TOKEN_UNITS,
      setParams.PRICE_PRECISION,
    );

    before(async () => {
      const initialCollateralSetAddress = await getContractAddress(setParams.COLLATERAL_NAME);
      initialCollateralisedSet = new web3.eth.Contract(SetToken.abi, initialCollateralSetAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.COLLATERAL_NAME, web3);
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
      expect(receivedSetName).toEqual(setParams.COLLATERAL_NAME);
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
    const setParams = DEPLOYED_SETS_INFO.BTCDAI_BTD;

    before(async () => {
      const btcDaiRebalancingSetTokenAddress = await getContractAddress(setParams.SET_NAME);
      btcDaiRebalancingSetToken = new web3.eth.Contract(RebalancingSetToken.abi, btcDaiRebalancingSetTokenAddress);
    });

    it('find a valid contract at the address', async () => {
      const code = await getContractCode(setParams.SET_NAME, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('rebalanced set should have have the correct rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
      const receivedSetTokenFactory = await btcDaiRebalancingSetToken.methods.factory().call();
      expect(receivedSetTokenFactory).toEqual(rebalancingSetTokenFactoryAddress);
    });

    it('rebalanced set should have the correct components', async () => {
      const collateralSetAddress = await getContractAddress(setParams.COLLATERAL_NAME);
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
      const managerAddress = await getContractAddress(setParams.MANAGER_NAME);
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
      expect(receivedSetName).toEqual(setParams.SET_NAME);
    });

    it('rebalanced set should have the correct set symbol', async () => {
      const receivedSetSymbol = await btcDaiRebalancingSetToken.methods.symbol().call();
      expect(receivedSetSymbol).toEqual(setParams.SET_SYMBOL);
    });
  });
});