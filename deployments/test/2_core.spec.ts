'use strict';

import expect from 'expect';

import { getWeb3Instance } from '../utils/blockchain';

import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Core } from '../../artifacts/ts/Core';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { WhiteList } from '../../artifacts/ts/WhiteList';
import { Vault } from '../../artifacts/ts/Vault';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';

import { DEPENDENCY } from '../contractNames';
import networkConstants from '../network-constants';
import {
  getNetworkConstant,
  getContractCode,
  getContractAddress,
  findDependency
} from '../utils/output-helper';

describe('Deployment: Core', () => {

  let web3;
  let coreAddress;
  const networkName = getNetworkConstant();

  before(async () => {
    web3 = await getWeb3Instance();
    coreAddress = await getContractAddress(Core.contractName);
  });

  describe('Vault', () => {

    /**
     * Check it actually got deployed
     */

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(Vault.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });
  });

  describe('Transfer Proxy', () => {

    /**
     * Check it actually got deployed
     */

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(TransferProxy.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });
  });

  describe('Core', () => {

    /** Check it got deployed with:
     * - TransferProxy
     * - Vault
     */

    let coreContract;

    before(async () => {
      const coreAddress = await getContractAddress(Core.contractName);
      coreContract = new web3.eth.Contract(Core.abi, coreAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(Core.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with the transfer proxy', async () => {
      const coreState = await coreContract.methods.state().call();
      const transferProxyAddress = await getContractAddress(TransferProxy.contractName);
      expect(coreState.transferProxy).toEqual(transferProxyAddress);
    });

    it('got deployed with the vault', async () => {
      const coreState = await coreContract.methods.state().call();
      const vaultAddress = await getContractAddress(Vault.contractName);
      expect(coreState.vault).toEqual(vaultAddress);
    });
  });

  describe('Set Token Factory', () => {

    /**
     * Check it got deployed with:
     * - Core
     */

    let setTokenFactoryContract;

    before(async () => {
      const setTokenFactoryAddress = await getContractAddress(SetTokenFactory.contractName);
      setTokenFactoryContract = new web3.eth.Contract(SetTokenFactory.abi, setTokenFactoryAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(SetTokenFactory.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
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

    before(async () => {
      const whitelistAddress = await getContractAddress(WhiteList.contractName);
      whitelistContract = new web3.eth.Contract(WhiteList.abi, whitelistAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(WhiteList.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with wETH and wBTC to begin with', async () => {
      const whitelistAddresses = await whitelistContract.methods.validAddresses().call();
      const WBTCAddress = await findDependency(DEPENDENCY.WBTC);
      const WETHAddress = await findDependency(DEPENDENCY.WETH);
      const daiAddress = await findDependency(DEPENDENCY.DAI);

      expect(whitelistAddresses).toContain(WBTCAddress);
      expect(whitelistAddresses).toContain(WETHAddress);
      expect(whitelistAddresses).toContain(daiAddress);
      expect(whitelistAddresses.length).toEqual(3);
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

    before(async () => {
      const rebalancingTokenFactoryAddress = await getContractAddress(RebalancingSetTokenFactory.contractName);
      rebalancingTokenFactoryContract = new web3.eth.Contract(
        RebalancingSetTokenFactory.abi,
        rebalancingTokenFactoryAddress
      );
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(RebalancingSetTokenFactory.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress =
        await rebalancingTokenFactoryContract.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    it('got deployed with the whitelist', async () => {
      const retrievedWhitelistAddress =
        await rebalancingTokenFactoryContract.methods.rebalanceComponentWhitelist().call();
      const whitelistAddress = await getContractAddress(WhiteList.contractName);
      expect(retrievedWhitelistAddress).toEqual(whitelistAddress);
    });

    it('correct minimum rebalance interval was set', async () => {
      const retrievedRebalanceInterval =
        await rebalancingTokenFactoryContract.methods.minimumRebalanceInterval().call();
      const rebalanceInterval = await networkConstants.minimumRebalanceInterval[networkName];
      expect(parseInt(retrievedRebalanceInterval)).toEqual(rebalanceInterval);
    });

    it('correct minimum prosalPeriod was set', async () => {
      const retrievedProposalPeriod =
        await rebalancingTokenFactoryContract.methods.minimumProposalPeriod().call();
      const proposalPeriod = await networkConstants.minimumRebalanceProposalPeriod[networkName];
      expect(parseInt(retrievedProposalPeriod)).toEqual(proposalPeriod);
    });

    it('correct minimum rebalance interval was set', async () => {
      const retrievedMinimumTimeToPivot =
        await rebalancingTokenFactoryContract.methods.minimumTimeToPivot().call();
      const minimumTimeToPivot = await networkConstants.minimumRebalanceTimeToPivot[networkName];
      expect(parseInt(retrievedMinimumTimeToPivot)).toEqual(minimumTimeToPivot);
    });

    it('correct minimum rebalance interval was set', async () => {
      const retrievedMaximumTimeToPivot =
        await rebalancingTokenFactoryContract.methods.maximumTimeToPivot().call();
      const maximumTimeToPivot = await networkConstants.maximumRebalanceTimeToPivot[networkName];
      expect(parseInt(retrievedMaximumTimeToPivot)).toEqual(maximumTimeToPivot);
    });
  });
});