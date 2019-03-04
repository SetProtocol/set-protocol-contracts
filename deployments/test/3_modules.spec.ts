'use strict';

import expect from 'expect';

import {
  getContractCode,
  getNetworkId,
  getContractAddress,
  findDependency
} from '../utils/output-helper';

import { getWeb3Instance } from '../utils/blockchain';

import { ExchangeIssuanceModule } from '../../artifacts/ts/ExchangeIssuanceModule';
import { RebalanceAuctionModule } from '../../artifacts/ts/RebalanceAuctionModule';
import { RebalancingTokenIssuanceModule } from '../../artifacts/ts/RebalancingTokenIssuanceModule';
import { ZeroExExchangeWrapper } from '../../artifacts/ts/ZeroExExchangeWrapper';
import { PayableExchangeIssuance } from '../../artifacts/ts/PayableExchangeIssuance';
import { KyberNetworkWrapper } from '../../artifacts/ts/KyberNetworkWrapper';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';

import { CONTRACT, DEPENDENCY } from '../contractNames';
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
    coreAddress = await getContractAddress(CONTRACT.Core);
    vaultAddress = await getContractAddress(CONTRACT.Vault);
    transferProxyAddress = await getContractAddress(CONTRACT.TransferProxy);
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
      const exchangeIssuanceAddress = await getContractAddress(CONTRACT.ExchangeIssuanceModule);
      exchangeIssuanceContract = new web3.eth.Contract(ExchangeIssuanceModule.abi, exchangeIssuanceAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(CONTRACT.ExchangeIssuanceModule, web3);
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
      const rebalanceAuctionAddress = await getContractAddress(CONTRACT.RebalanceAuctionModule);
      rebalanceAuctionModule = new web3.eth.Contract(RebalanceAuctionModule.abi, rebalanceAuctionAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(CONTRACT.RebalanceAuctionModule, web3);
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

  describe('Rebalancing Token Issuance Module', () => {

    /**
     * Check if the RebalancingTokenIssuanceModule has been deployed with the following:
     * - Core
     * - TransferProxy
     * - Vault
     */

    let rebalanceTokenIssuanceModule;

    before(async () => {
      const rebalanceAuctionAddress = await getContractAddress(CONTRACT.RebalancingTokenIssuanceModule);
      rebalanceTokenIssuanceModule = new web3.eth.Contract(RebalancingTokenIssuanceModule.abi, rebalanceAuctionAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(CONTRACT.RebalancingTokenIssuanceModule, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await rebalanceTokenIssuanceModule.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the vault', async () => {
      const retrievedVaultAddress = await rebalanceTokenIssuanceModule.methods.vault().call();
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
      const kyberWrapperAddress = await getContractAddress(CONTRACT.KyberNetworkWrapper);
      kyberWrapper = new web3.eth.Contract(KyberNetworkWrapper.abi, kyberWrapperAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(CONTRACT.KyberNetworkWrapper, web3);
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
      const kyberWrapperAddress = await getContractAddress(CONTRACT.ZeroExExchangeWrapper);
      zeroExWrapper = new web3.eth.Contract(ZeroExExchangeWrapper.abi, kyberWrapperAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(CONTRACT.ZeroExExchangeWrapper, web3);
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

  describe('Payable Exchange', () => {

    /**
     * Check if the PayableExchangeIssuance has been deployed with:
     * - Core
     * - TransferProxy
     * - ExchangeIssuanceModule
     * - WrappedEtherAddress
     */

    let payableExchangeWrapper;

    before(async () => {
      const payableExchangeAddress = await getContractAddress(CONTRACT.PayableExchangeIssuance);
      payableExchangeWrapper = new web3.eth.Contract(PayableExchangeIssuance.abi, payableExchangeAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode(CONTRACT.PayableExchangeIssuance, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await payableExchangeWrapper.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the transfer proxy', async () => {
      const retrievedTransferProxyAddress = await payableExchangeWrapper.methods.transferProxy().call();
      expect(retrievedTransferProxyAddress).toEqual(transferProxyAddress);
    });

    it('got deployed with the exchange issuance module', async () => {
      const retrievedExchangeIssueAddress = await payableExchangeWrapper.methods.exchangeIssuanceModule().call();
      const exchangeIssueModel = await getContractAddress(CONTRACT.ExchangeIssuanceModule);
      expect(retrievedExchangeIssueAddress).toEqual(exchangeIssueModel);
    });

    it('got deployed with the correct wETH address', async () => {
      const retrievedWETHAddress = await payableExchangeWrapper.methods.weth().call();
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
      const linearAuctionPriceCurveAddress = await getContractAddress(CONTRACT.LinearAuctionPriceCurve);
      linearAuctionPriceCurveContract = new web3.eth.Contract(
        LinearAuctionPriceCurve.abi,
        linearAuctionPriceCurveAddress
      );
    });

    it('deployed with the correct price denominator', async () => {
      const retrievedPriceDenominator = await linearAuctionPriceCurveContract.methods.priceDenominator().call();
      expect(parseInt(retrievedPriceDenominator)).toEqual(constants.DEFAULT_AUCTION_PRICE_DENOMINATOR);
    });

    it('deployed with the uses start price parameter as true', async () => {
      const retrievedUseStartPrice = await linearAuctionPriceCurveContract.methods.usesStartPrice().call();
      expect(retrievedUseStartPrice).toEqual(true);
    });
  });
});