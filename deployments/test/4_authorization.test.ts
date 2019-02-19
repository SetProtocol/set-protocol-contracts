'use strict';

import * as chai from 'chai';

import { getContractCode, getNetworkName, getNetworkId, getContractAddress } from "../utils/output-helper";
import { getWeb3Instance } from '../utils/blockchain';

import { Core } from '../../artifacts/ts/Core';
import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Vault } from '../../artifacts/ts/Vault';
import { WhiteList } from '../../artifacts/ts/WhiteList';
import { IssuanceOrderModule } from '../../artifacts/ts/IssuanceOrderModule';
import { ExchangeIssueModule } from '../../artifacts/ts/ExchangeIssueModule';

import dependencies from '../dependencies';
import networkConstants from '../network-constants';
import constants from '../constants';

describe('Deployment: Authorization', () => {

  let web3;
  let networkId;
  let networkName = getNetworkName();

  let coreAddress;
  let vaultAddress;

  let coreContract;

  beforeAll(async () => {
    web3 = await getWeb3Instance();
    networkId = await getNetworkId();

    coreAddress = await getContractAddress('Core');
    vaultAddress = await getContractAddress('Vault');

    coreContract = new web3.eth.Contract(Core.abi, coreAddress);
  });

  describe('Timelocks', () => { 

    /**
     * Need to check whether a time lock was applied to the following contracts:
     * - Core
     * - TransferProxy
     * - Vault
     * - Whitelist
     * - Issuance Order Module
     */

    let expectedTimeLockPeriod = networkConstants.timeLockPeriod[networkName];

    test('correct timelock applied to core', async () => {
      const timelock = await coreContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

    test('correct timelock applied to transfer proxy', async () => {
      const transferProxyAddress = await getContractAddress('TransferProxy');
      const transferProxyContract = new web3.eth.Contract(TransferProxy.abi, transferProxyAddress);
      const timelock = await transferProxyContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

    test('correct timelock applied to vault', async () => {
      const vaultContract = new web3.eth.Contract(Vault.abi, vaultAddress);
      const timelock = await vaultContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

    test('correct timelock applied to white list', async () => {
      const whiteListAddress = await getContractAddress('WhiteList');
      const vaultContract = new web3.eth.Contract(WhiteList.abi, whiteListAddress);
      const timelock = await vaultContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

    test('correct timelock applied to issuance order module', async () => {
      const issuanceOrderModuleAddress = await getContractAddress('IssuanceOrderModule');
      const issueanceOrderModuleContract = new web3.eth.Contract(IssuanceOrderModule.abi, issuanceOrderModuleAddress);
      const timelock = await issueanceOrderModuleContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

  });

  describe('Authorized Vault addresses', () => {

    /**
     * Check if Vault has the following contracts as authorized addresses:
     * - Core
     * - ExchangeIssueModule
     * - IssuanceOrderModule
     * - RebalancingAuctionModule
     * - RebalancingTokenIssuanceModule
     */

    let vaultContract;
    let authorisedAddresses;

    beforeAll(async () => {
      vaultContract = new web3.eth.Contract(Vault.abi, vaultAddress);
      authorisedAddresses = await vaultContract.methods.getAuthorizedAddresses().call();
    });

    test('vault contains core as authorised address', async () => {
      expect(authorisedAddresses).toContain(coreAddress)
    });

    test('vault contains exchange issue module as an authorised address', async () => {
      const exchangeIssueModuleAddress = await getContractAddress('ExchangeIssueModule');
      expect(authorisedAddresses).toContain(exchangeIssueModuleAddress);
    });

    test('vault contains issuance order module as an authorised address', async () => {
      const exchangeIssueModuleAddress = await getContractAddress('IssuanceOrderModule');
      expect(authorisedAddresses).toContain(exchangeIssueModuleAddress);
    });

    test('vault contains rebalance auction module as an authorised address', async () => {
      const rebalanceAuctionModuleAddress = await getContractAddress('RebalanceAuctionModule');
      expect(authorisedAddresses).toContain(rebalanceAuctionModuleAddress);
    });

    test('vault contains rebalancing token issuance module as an authorised address', async () => {
      const rebalanceTokenIssueAddress = await getContractAddress('RebalancingTokenIssuanceModule');
      expect(authorisedAddresses).toContain(rebalanceTokenIssueAddress);
    });

  });

  describe('Authorized Transfer Proxy addresses', () => {

    /**
     * Check if the following contracts have the Transfer Proxy as an authorized address:
     * - Core
     * - TakerWalletWrapper
     * - ExchangeIssueModule
     * - IssuanceOrderModule
     * - RebalancingAuctionModule
     * - RebalancingTokenIssuanceModule
     */

    let transferProxyContract;
    let authorisedAddresses;

    beforeAll(async () => {
      transferProxyContract = new web3.eth.Contract(TransferProxy.abi, vaultAddress);
      authorisedAddresses = await transferProxyContract.methods.getAuthorizedAddresses().call();
    });

    test('transfer proxy contains core as authorised address', async () => {
      expect(authorisedAddresses).toContain(coreAddress)
    });

    test('transfer proxy contains exchange issue module as an authorised address', async () => {
      const exchangeIssueModuleAddress = await getContractAddress('ExchangeIssueModule');
      expect(authorisedAddresses).toContain(exchangeIssueModuleAddress);
    });

    test('vault contains issuance order module as an authorised address', async () => {
      const exchangeIssueModuleAddress = await getContractAddress('IssuanceOrderModule');
      expect(authorisedAddresses).toContain(exchangeIssueModuleAddress);
    });

    test('transfer proxy contains taker wallet wrapper as an authorised address', async () => {
      const takerWalletAddress = await getContractAddress('TakerWalletWrapper');
      expect(authorisedAddresses).toContain(takerWalletAddress);
    });

    test('transfer proxy contains rebalance auction module as an authorised address', async () => {
      const rebalanceAuctionModuleAddress = await getContractAddress('RebalanceAuctionModule');
      expect(authorisedAddresses).toContain(rebalanceAuctionModuleAddress);
    });

    test('transfer proxy contains rebalancing token issuance module as an authorised address', async () => {
      const rebalanceTokenIssueAddress = await getContractAddress('RebalancingTokenIssuanceModule');
      expect(authorisedAddresses).toContain(rebalanceTokenIssueAddress);
    });

  });

  describe('Factories in Core', () => {

    /**
     * Check if the following factories are registered with Core:
     * - SetTokenFactory
     * - RebalancingSetTokenFactory
     */

    let factories;

    beforeAll(async () => {
      factories = await coreContract.methods.factories().call();
    });

    test('core contains set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      expect(factories).toContain(setTokenFactoryAddress);
    });

    test('core contains rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
      expect(factories).toContain(rebalancingSetTokenFactoryAddress);
    });

  });

  describe('Modules in Core', () => {

    /**
     * Check if the following modules have been added to Core:
     * - ExchangeIssueModule
     * - IssuanceOrderModule
     * - RebalanceAuctionModule
     * - RebalancingTokenIssuanceModule
     */

    let modules;

    beforeAll(async () => {
      modules = await coreContract.methods.modules().call();
    });

    test('core contains exchange issue module', async () => {
      const exchangeIssueModuleAddress = await getContractAddress('ExchangeIssueModule');
      expect(modules).toContain(exchangeIssueModuleAddress);
    });

    test('core contains issuance order module', async () => {
      const issuanceOrderModuleAddress = await getContractAddress('IssuanceOrderModule');
      expect(modules).toContain(issuanceOrderModuleAddress);
    });

    test('core contains rebalancing auction module', async () => {
      const rebalanceAuctionModule = await getContractAddress('RebalanceAuctionModule');
      expect(modules).toContain(rebalanceAuctionModule);
    });

    test('core contains rebalancing token issuance module', async () => {
      const rebalanceTokenIssuanceModuleAddress = await getContractAddress('RebalancingTokenIssuanceModule');
      expect(modules).toContain(rebalanceTokenIssuanceModuleAddress);
    });

  });

  describe('Exchanges in Core', () => {

    /**
     * Check if the following exchange wrappers have been added to core:
     * - ZeroExExchangeWrapper
     * - KyberNetworkWrapper
     * - TakerWalletWrapper
     */
    
    let exchanges;

    beforeAll(async () => {
      exchanges = await coreContract.methods.exchanges().call();
    });

    test('core contains zero ex exchange wrapper', async () => {
      const zeroExAddress = await getContractAddress('ZeroExExchangeWrapper');
      expect(exchanges).toContain(zeroExAddress);
    });

    test('core contains kyber network exchange wrapper', async () => {
      const kyberNetworkAddress = await getContractAddress('KyberNetworkWrapper');
      expect(kyberNetworkAddress).toContain(kyberNetworkAddress);
    });

    test('core contains taker wallet exchange wrapper', async () => {
      const takerWalletAddress = await getContractAddress('TakerWalletWrapper');
      expect(takerWalletAddress).toContain(takerWalletAddress);
    });

  });

  describe('Price Libraries in Core', () => {

    /**
     * Check if the following price libraries have been added to Core:
     * - LinearAuctionPriceCurve
     * - ConstantAuctionPriceCurve
     */

    let priceLibraries;

    beforeAll(async () => {
      priceLibraries = await coreContract.methods.priceLibraries().call();
    });

    test('core contains linear auction price curve', async () => {
      if (!networkConstants.linearAuctionPriceCurve[networkName]) {
        return;
      }
      const linearAuctionPriceCurveAddress = await getContractAddress('LinearAuctionPriceCurve');
      expect(priceLibraries).toContain(linearAuctionPriceCurveAddress);

    });

    test('core contains constant auction price curve', async () => {
      if (!networkConstants.constantsAuctionPriceCurve[networkName]) {
        return;
      }
      const constantAuctionPriceCurveAddress = await getContractAddress('ConstantAuctionPriceCurve');
      expect(priceLibraries).toContain(constantAuctionPriceCurveAddress);      
    });

  });

});