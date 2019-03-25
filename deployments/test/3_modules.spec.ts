'use strict';

import expect from 'expect';

import {
  getContractCode,
  getNetworkId,
  getContractAddress,
  findDependency
} from '../utils/output-helper';

import { getWeb3Instance } from '../utils/blockchain';

import { Core } from '../../artifacts/ts/Core';
import { ExchangeIssuanceModule } from '../../artifacts/ts/ExchangeIssuanceModule';
import { KyberNetworkWrapper } from '../../artifacts/ts/KyberNetworkWrapper';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';
import { RebalancingSetExchangeIssuanceModule } from '../../artifacts/ts/RebalancingSetExchangeIssuanceModule';
import { RebalanceAuctionModule } from '../../artifacts/ts/RebalanceAuctionModule';
import { ZeroExExchangeWrapper } from '../../artifacts/ts/ZeroExExchangeWrapper';
import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Vault } from '../../artifacts/ts/Vault';

import { DEPENDENCY } from '../deployedContractParameters';
import dependencies from '../dependencies';
import constants from '../constants';

describe('Deployment: Modules', () => {

  let web3;
  const networkId = getNetworkId();

  let coreAddress;
  let vaultAddress;
  let transferProxyAddress;

  before(async () => {
    web3 = await getWeb3Instance();
    coreAddress = await getContractAddress(Core.contractName);
    vaultAddress = await getContractAddress(Vault.contractName);
    transferProxyAddress = await getContractAddress(TransferProxy.contractName);
  });

  describe('ExchangeIssuance', () => {

    /**
     * Check if ExchangeIssuanceModule has been deployed with the following:
     * - Core
     * - TransferProxy
     * - Vault
     */

    let exchangeIssuanceContract;

    before(async () => {
      const exchangeIssuanceAddress = await getContractAddress(ExchangeIssuanceModule.contractName);
      exchangeIssuanceContract = new web3.eth.Contract(ExchangeIssuanceModule.abi, exchangeIssuanceAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(ExchangeIssuanceModule.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await exchangeIssuanceContract.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the vault', async () => {
      const retrievedVaultAddress = await exchangeIssuanceContract.methods.vault().call();
      expect(retrievedVaultAddress).toEqual(vaultAddress);
    });
  });

  describe('Rebalancing Auction Module', () => {

    /**
     * Check if the RebalanceAuctionModule has been deployed with the following:
     * - Core
     * - Vault
     */

    let rebalanceAuctionModule;

    before(async () => {
      const rebalanceAuctionAddress = await getContractAddress(RebalanceAuctionModule.contractName);
      rebalanceAuctionModule = new web3.eth.Contract(RebalanceAuctionModule.abi, rebalanceAuctionAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(RebalanceAuctionModule.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await rebalanceAuctionModule.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the vault', async () => {
      const retrievedVaultAddress = await rebalanceAuctionModule.methods.vault().call();
      expect(retrievedVaultAddress).toEqual(vaultAddress);
    });
  });

  describe('Kyber Wrapper', () => {

    /**
     * Check if the Kyber Network proxy exists, if so check if KyberNetworkWrapper deployed with:
     * - Core
     * - KyberNetworkProxy
     * - TransferProxy
     */

    let kyberWrapper;

    before(async () => {
      const kyberWrapperAddress = await getContractAddress(KyberNetworkWrapper.contractName);
      kyberWrapper = new web3.eth.Contract(KyberNetworkWrapper.abi, kyberWrapperAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(KyberNetworkWrapper.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await kyberWrapper.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the kyber network proxy', async () => {
      const retrievedKyberNetworkProxy = await kyberWrapper.methods.kyberNetworkProxy().call();
      const kyberNetworkProxyAddress = dependencies.KYBER_PROXY[networkId];
      expect(retrievedKyberNetworkProxy).toEqual(kyberNetworkProxyAddress);
    });

    it('got deployed with the transfer proxy', async () => {
      const retrievedTransferProxyAddress = await kyberWrapper.methods.setTransferProxy().call();
      expect(retrievedTransferProxyAddress).toEqual(transferProxyAddress);
    });
  });

  describe('Zero Ex Exchange', () => {

    /**
     * Check if the ZeroEx addresses exist, if so check if ZeroExExchangeWrapper deployed with:
     * - Core
     * - ZeroExExchange
     * - ZeroExTransferProxy
     * - ZeroEXZRX
     * - TransferProxy
     */

    let zeroExWrapper;

    before(async () => {
      const kyberWrapperAddress = await getContractAddress(ZeroExExchangeWrapper.contractName);
      zeroExWrapper = new web3.eth.Contract(ZeroExExchangeWrapper.abi, kyberWrapperAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(ZeroExExchangeWrapper.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await zeroExWrapper.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the zero ex exchange', async () => {
      const retrievedZeroExExchange = await zeroExWrapper.methods.zeroExExchange().call();
      const zeroExExchangeAddress = dependencies.ZERO_EX_EXCHANGE[networkId];
      expect(retrievedZeroExExchange).toEqual(zeroExExchangeAddress);
    });

    it('got deployed with the zero ex transfer proxy', async () => {
      const retrievedZeroExTransferProxy = await zeroExWrapper.methods.zeroExProxy().call();
      const zeroExTransferProxyAddress = dependencies.ZERO_EX_PROXY[networkId];
      expect(retrievedZeroExTransferProxy).toEqual(zeroExTransferProxyAddress);
    });

    it('got deployed with the zero ex token', async () => {
      const retrievedZeroExToken = await zeroExWrapper.methods.zeroExToken().call();
      const zeroExTokenAddress = dependencies.ZERO_EX_ZRX[networkId];
      expect(retrievedZeroExToken).toEqual(zeroExTokenAddress);
    });

    it('got deployed with the set transfer proxy', async () => {
      const retrievedTransferProxyAddress = await zeroExWrapper.methods.setTransferProxy().call();
      expect(retrievedTransferProxyAddress).toEqual(transferProxyAddress);
    });
  });

  describe('RebalancingSetExchangeIssuanceModule', () => {

    /**
     * Check if the RebalancingSetExchangeIssuanceModule has been deployed with:
     * - Core
     * - TransferProxy
     * - ExchangeIssuanceModule
     * - WrappedEtherAddress
     */

    let rebalancingSetExchangeIssunace;

    before(async () => {
      const rebalancingSetExchangeIssuanceModule = await getContractAddress(
        RebalancingSetExchangeIssuanceModule.contractName
      );
      rebalancingSetExchangeIssunace = new web3.eth.Contract(
        RebalancingSetExchangeIssuanceModule.abi,
        rebalancingSetExchangeIssuanceModule
      );
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(RebalancingSetExchangeIssuanceModule.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await rebalancingSetExchangeIssunace.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the transfer proxy', async () => {
      const retrievedTransferProxyAddress = await rebalancingSetExchangeIssunace.methods.transferProxy().call();
      expect(retrievedTransferProxyAddress).toEqual(transferProxyAddress);
    });

    it('got deployed with the exchange issuance module', async () => {
      const retrievedExchangeIssueAddress = await rebalancingSetExchangeIssunace.methods.exchangeIssuanceModule()
                                                    .call();
      const exchangeIssueModel = await getContractAddress(ExchangeIssuanceModule.contractName);
      expect(retrievedExchangeIssueAddress).toEqual(exchangeIssueModel);
    });

    it('got deployed with the correct wETH address', async () => {
      const retrievedWETHAddress = await rebalancingSetExchangeIssunace.methods.weth().call();
      const WETHAddress = await findDependency(DEPENDENCY.WETH);
      expect(retrievedWETHAddress).toEqual(WETHAddress);
    });
  });

  describe('Linear Auction Price Curve', () => {

    /**
     * Check if the LinearAuctionPriceCurve has been deployed with the appropriate settings
     */

    let linearAuctionPriceCurveContract;

    before(async () => {
      const linearAuctionPriceCurveAddress = await getContractAddress(LinearAuctionPriceCurve.contractName);
      linearAuctionPriceCurveContract = new web3.eth.Contract(
        LinearAuctionPriceCurve.abi,
        linearAuctionPriceCurveAddress
      );
    });

    it('deployed with the correct price divisor', async () => {
      const retrievedPriceDivisor = await linearAuctionPriceCurveContract.methods.priceDivisor().call();
      expect(parseInt(retrievedPriceDivisor)).toEqual(constants.DEFAULT_AUCTION_PRICE_DIVISOR);
    });

    it('deployed with the uses start price parameter as true', async () => {
      const retrievedUseStartPrice = await linearAuctionPriceCurveContract.methods.usesStartPrice().call();
      expect(retrievedUseStartPrice).toEqual(true);
    });
  });
});