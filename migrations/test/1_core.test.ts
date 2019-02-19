'use strict';

import * as chai from 'chai';

import { getWeb3Instance} from "../utils/blockchain";

import { Core } from '../../artifacts/ts/Core';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';
import { WhiteList } from '../../artifacts/ts/WhiteList';

import dependencies from '../dependencies';
import networkConstants from '../network-constants';
import { getNetworkId, getNetworkName, getContractCode, getContractAddress, findDependency } from '../utils/output-helper';

describe('Deployment: Core', () => {
  
  let web3;
  let coreAddress;
  let networkId = getNetworkId();
  let networkName = getNetworkName();

  beforeAll(async () => {
    web3 = await getWeb3Instance();
    coreAddress = await getContractAddress('Core');
  });

  describe('Vault', () => {

    /** 
     * Check it actually got deployed
     */

    test('finds a valid contract at the address', async () => {
      const code = await getContractCode('Vault', web3);
      expect(code.length).toBeGreaterThan(2);
    });
  });

  describe('Transfer Proxy', () => {

    /** 
     * Check it actually got deployed
     */

    test('finds a valid contract at the address', async () => {
      const code = await getContractCode('TransferProxy', web3);
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
      const coreAddress = await getContractAddress('Core');
      coreContract = new web3.eth.Contract(Core.abi, coreAddress);
    });

    test('finds a valid contract at the address', async () => {
      const code = await getContractCode('Core', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with the transfer proxy', async () => {
      const coreState = await coreContract.methods.state().call();
      const transferProxyAddress = await getContractAddress('TransferProxy');
      expect(coreState.transferProxy).toEqual(transferProxyAddress);
    });

    test('got deployed with the vault', async () => {
      const coreState = await coreContract.methods.state().call();
      const vaultAddress = await getContractAddress('Vault');
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
      const setTokenFactoryAddress = await getContractAddress('SetTokenFactory');
      setTokenFactoryContract = new web3.eth.Contract(SetTokenFactory.abi, setTokenFactoryAddress);
    });

    test('finds a valid contract at the address', async () => {
      const code = await getContractCode('SetTokenFactory', web3);
      expect(code.length).toBeGreaterThan(2);
    })

    test('got deployed with core', async () => {
      const retrievedCoreAddress = await setTokenFactoryContract.methods.core().call();
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
      const whitelistAddress = await getContractAddress('WhiteList');
      whitelistContract = new web3.eth.Contract(WhiteList.abi, whitelistAddress);
    });

    test('finds a valid contract at the address', async () => {
      const code = await getContractCode('WhiteList', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with wETH and wBTC to begin with', async () => {
      const whitelistAddresses = await whitelistContract.methods.validAddresses().call();
      const WBTCAddress = await findDependency('WBTC');
      const WETHAddress = await findDependency('WETH');

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
      const rebalancingTokenFactoryAddress = await getContractAddress('RebalancingSetTokenFactory');
      rebalancingTokenFactoryContract = new web3.eth.Contract(RebalancingSetTokenFactory.abi, rebalancingTokenFactoryAddress);
    });

    test('finds a valid contract at the address', async () => {
      const code = await getContractCode('RebalancingSetTokenFactory', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      const retrievedCoreAddress = await rebalancingTokenFactoryContract.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    test('got deployed with the whitelist', async () => {
      const retrievedWhitelistAddress = await rebalancingTokenFactoryContract.methods.rebalanceComponentWhitelist().call();
      const whitelistAddress = await getContractAddress('WhiteList');
      expect(retrievedWhitelistAddress).toEqual(whitelistAddress);
    });

    test('correct minimum rebalance interval was set', async () => {
      const retrievedRebalanceInterval = await rebalancingTokenFactoryContract.methods.minimumRebalanceInterval().call();
      const rebalanceInterval = await networkConstants.minimumRebalanceInterval[networkName];
      expect(parseInt(retrievedRebalanceInterval)).toEqual(rebalanceInterval);
    });

    test('correct minimum prosalPeriod was set', async () => {
      const retrievedProposalPeriod = await rebalancingTokenFactoryContract.methods.minimumProposalPeriod().call();
      const proposalPeriod = await networkConstants.minimumProposalPeriod[networkName];
      expect(parseInt(retrievedProposalPeriod)).toEqual(proposalPeriod);
    });

    test('correct minimum rebalance interval was set', async () => {
      const retrievedMinimumTimeToPivot = await rebalancingTokenFactoryContract.methods.minimumTimeToPivot().call();
      const minimumTimeToPivot = await networkConstants.minimumTimeToPivot[networkName];
      expect(parseInt(retrievedMinimumTimeToPivot)).toEqual(minimumTimeToPivot);
    });

    test('correct minimum rebalance interval was set', async () => {
      const retrievedMaximumTimeToPivot = await rebalancingTokenFactoryContract.methods.maximumTimeToPivot().call();
      const maximumTimeToPivot = await networkConstants.maximumTimeToPivot[networkName];
      expect(parseInt(retrievedMaximumTimeToPivot)).toEqual(maximumTimeToPivot);
    });

  });

});