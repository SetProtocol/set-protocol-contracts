'use strict';

import * as chai from 'chai';

import { getWeb3Instance, getContractAddress, getContractCode, getNetworkId, getNetworkName } from "../utils/blockchain";

import { Core } from '../../artifacts/ts/Core';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';
import { WhiteList } from '../../artifacts/ts/WhiteList';

import dependencies from '../dependencies';
import networkConstants from '../network-constants';

describe('Deployment: Core', () => {
  
  let web3;
  let coreAddress;
  let networkId;
  let networkName = getNetworkName();

  beforeAll(async () => {
    web3 = await getWeb3Instance();
    coreAddress = await getContractAddress('Core');
    networkId = await getNetworkId();
  });

  describe('Vault', () => {

    /** 
     * Check it actually got deployed
     */

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('Vault', web3);
      expect(code.length).toBeGreaterThan(2);
    });
  });

  describe('Transfer Proxy', () => {

    /** 
     * Check it actually got deployed
     */

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('TransferProxy', web3);
      expect(code.length).toBeGreaterThan(2);
    });

  });

  describe('Core', () => {

    /** Check it got deployed with:
     * - TransferProxy
     * - Vault
     */

    let coreContract;

    beforeAll(async () => {
      let coreAddress = await getContractAddress('Core');
      coreContract = new web3.eth.Contract(Core.abi, coreAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('Core', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with the transfer proxy', async () => {
      let coreState = await coreContract.methods.state().call();
      let transferProxyAddress = await getContractAddress('TransferProxy');
      expect(coreState.transferProxy).toEqual(transferProxyAddress);
    });

    test('got deployed with the vault', async () => {
      let coreState = await coreContract.methods.state().call();
      let vaultAddress = await getContractAddress('Vault');
      expect(coreState.vault).toEqual(vaultAddress);
    });

  });

  describe('Set Token Factory', () => {

    /**
     * Check it got deployed with:
     * - Core
     */ 

    let setTokenFactoryContract;

    beforeAll(async () => {
      let setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      setTokenFactoryContract = new web3.eth.Contract(SetTokenFactory.abi, setTokenFactoryAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('SetTokenFactory', web3);
      expect(code.length).toBeGreaterThan(2);
    })

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await setTokenFactoryContract.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

  });

  describe('White List', () => {

    /**
     * Check it got deployed and the initial token whitelist contains:
     * - wETH and wBTC
     */

    let whitelistContract;

    beforeAll(async () => {
      let whitelistAddress = await getContractAddress('WhiteList');
      whitelistContract = new web3.eth.Contract(WhiteList.abi, whitelistAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('WhiteList', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with wETH and wBTC to begin with', async () => {
      let whitelistAddresses = await whitelistContract.methods.validAddresses().call();
      let WBTCAddress = dependencies.WBTC[networkId];
      let WETHAddress = dependencies.WETH[networkId];

      expect(whitelistAddresses).toContain(WBTCAddress);
      expect(whitelistAddresses).toContain(WETHAddress);
      expect(whitelistAddresses.length).toEqual(2);
    });

  });

  describe('Set Rebalancing Token Factory', () => {

    /**
     * Check it got deployed with the following environment specific variables:
     * - Core
     * - Whitelist
     * - minimumRebalanceInterval
     * - minimalProposalPeriod
     * - minimumTimeToPivot
     * - maximumTimeToPivot
     */

    let rebalancingTokenFactoryContract;

    beforeAll(async () => {
      let rebalancingTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
      rebalancingTokenFactoryContract = new web3.eth.Contract(RebalancingSetTokenFactory.abi, rebalancingTokenFactoryAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('RebalancingSetTokenFactory', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await rebalancingTokenFactoryContract.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    test('got deployed with the whitelist', async () => {
      let retrievedWhitelistAddress = await rebalancingTokenFactoryContract.methods.rebalanceComponentWhitelist().call();
      let whitelistAddress = await getContractAddress('WhiteList');
      expect(retrievedWhitelistAddress).toEqual(whitelistAddress);
    });

    test('correct minimum rebalance interval was set', async () => {
      let retrievedRebalanceInterval = await rebalancingTokenFactoryContract.methods.minimumRebalanceInterval().call();
      let rebalanceInterval = await networkConstants.minimumRebalanceInterval[networkName];
      expect(parseInt(retrievedRebalanceInterval)).toEqual(rebalanceInterval);
    });

    test('correct minimum prosalPeriod was set', async () => {
      let retrievedProposalPeriod = await rebalancingTokenFactoryContract.methods.minimumProposalPeriod().call();
      let proposalPeriod = await networkConstants.minimumProposalPeriod[networkName];
      expect(parseInt(retrievedProposalPeriod)).toEqual(proposalPeriod);
    });

    test('correct minimum rebalance interval was set', async () => {
      let retrievedMinimumTimeToPivot = await rebalancingTokenFactoryContract.methods.minimumTimeToPivot().call();
      let minimumTimeToPivot = await networkConstants.minimumTimeToPivot[networkName];
      expect(parseInt(retrievedMinimumTimeToPivot)).toEqual(minimumTimeToPivot);
    });

    test('correct minimum rebalance interval was set', async () => {
      let retrievedMaximumTimeToPivot = await rebalancingTokenFactoryContract.methods.maximumTimeToPivot().call();
      let maximumTimeToPivot = await networkConstants.maximumTimeToPivot[networkName];
      expect(parseInt(retrievedMaximumTimeToPivot)).toEqual(maximumTimeToPivot);
    });

  });

});