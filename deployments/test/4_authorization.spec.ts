'use strict';

import expect from 'expect';

import { getNetworkConstant, getContractAddress } from '../utils/output-helper';
import { getWeb3Instance } from '../utils/blockchain';

import { Core } from '../../artifacts/ts/Core';
import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Vault } from '../../artifacts/ts/Vault';
import { WhiteList } from '../../artifacts/ts/WhiteList';

import networkConstants from '../network-constants';

describe('Deployment: Authorization', () => {

  let web3;
  const networkName = getNetworkConstant();

  let coreAddress;
  let vaultAddress;

  let coreContract;

  before(async () => {
    web3 = await getWeb3Instance();

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

    const expectedTimeLockPeriod = networkConstants.timeLockPeriod[networkName];

    it('correct timelock applied to core', async () => {
      const timelock = await coreContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

    it('correct timelock applied to transfer proxy', async () => {
      const transferProxyAddress = await getContractAddress('TransferProxy');
      const transferProxyContract = new web3.eth.Contract(TransferProxy.abi, transferProxyAddress);
      const timelock = await transferProxyContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

    it('correct timelock applied to vault', async () => {
      const vaultContract = new web3.eth.Contract(Vault.abi, vaultAddress);
      const timelock = await vaultContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

    it('correct timelock applied to white list', async () => {
      const whiteListAddress = await getContractAddress('WhiteList');
      const vaultContract = new web3.eth.Contract(WhiteList.abi, whiteListAddress);
      const timelock = await vaultContract.methods.timeLockPeriod().call();
      expect(parseInt(timelock)).toEqual(expectedTimeLockPeriod);
    });

  });

  describe('Authorized Vault addresses', () => {

    /**
     * Check if Vault has the following contracts as authorized addresses:
     * - Core
     * - ExchangeIssuanceModule
     * - RebalancingAuctionModule
     * - RebalancingTokenIssuanceModule
     */

    let vaultContract;
    let authorisedAddresses;

    before(async () => {
      vaultContract = new web3.eth.Contract(Vault.abi, vaultAddress);
      authorisedAddresses = await vaultContract.methods.getAuthorizedAddresses().call();
    });

    it('vault contains core as authorised address', async () => {
      expect(authorisedAddresses).toContain(coreAddress);
    });
  });

  describe('Authorized Transfer Proxy addresses', () => {

    /**
     * Check if the following contracts have the Transfer Proxy as an authorized address:
     * - Core
     * - TakerWalletWrapper
     * - ExchangeIssuanceModule
     * - IssuanceOrderModule
     * - RebalancingAuctionModule
     * - RebalancingTokenIssuanceModule
     */

    let transferProxyContract;
    let authorisedAddresses;

    before(async () => {
      const transferProxyAddress = await getContractAddress('TransferProxy');
      transferProxyContract = new web3.eth.Contract(TransferProxy.abi, transferProxyAddress);
      authorisedAddresses = await transferProxyContract.methods.getAuthorizedAddresses().call();
    });

    it('transfer proxy contains core as authorised address', async () => {
      expect(authorisedAddresses).toContain(coreAddress);
    });
  });

  describe('Factories in Core', () => {

    /**
     * Check if the following factories are registered with Core:
     * - SetTokenFactory
     * - RebalancingSetTokenFactory
     */

    let factories;

    before(async () => {
      factories = await coreContract.methods.factories().call();
    });

    it('core contains set token factory', async () => {
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      expect(factories).toContain(setTokenFactoryAddress);
    });

    it('core contains rebalancing set token factory', async () => {
      const rebalancingSetTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
      expect(factories).toContain(rebalancingSetTokenFactoryAddress);
    });

  });

  describe('Modules in Core', () => {

    /**
     * Check if the following modules have been added to Core:
     * - ExchangeIssuanceModule
     * - IssuanceOrderModule
     * - RebalanceAuctionModule
     * - RebalancingTokenIssuanceModule
     */

    let modules;

    before(async () => {
      modules = await coreContract.methods.modules().call();
    });

    it('core contains exchange issuance module', async () => {
      const exchangeIssueModuleAddress = await getContractAddress('ExchangeIssuanceModule');
      expect(modules).toContain(exchangeIssueModuleAddress);
    });

    it('core contains rebalancing auction module', async () => {
      const rebalanceAuctionModule = await getContractAddress('RebalanceAuctionModule');
      expect(modules).toContain(rebalanceAuctionModule);
    });

    it('core contains rebalancing token issuance module', async () => {
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

    before(async () => {
      exchanges = await coreContract.methods.exchanges().call();
    });

    it('core contains zero ex exchange wrapper', async () => {
      const zeroExAddress = await getContractAddress('ZeroExExchangeWrapper');
      expect(exchanges).toContain(zeroExAddress);
    });

    it('core contains kyber network exchange wrapper', async () => {
      const kyberNetworkAddress = await getContractAddress('KyberNetworkWrapper');
      expect(kyberNetworkAddress).toContain(kyberNetworkAddress);
    });

    it('core contains taker wallet exchange wrapper', async () => {
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

    before(async () => {
      priceLibraries = await coreContract.methods.priceLibraries().call();
    });

    it('core contains linear auction price curve', async () => {
      if (!networkConstants.linearAuctionPriceCurve[networkName]) {
        return;
      }
      const linearAuctionPriceCurveAddress = await getContractAddress('LinearAuctionPriceCurve');
      expect(priceLibraries).toContain(linearAuctionPriceCurveAddress);

    });
  });

});