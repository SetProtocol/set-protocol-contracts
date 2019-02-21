'use strict';

import expect from 'expect';

import {
  getContractCode,
  getNetworkName,
  getNetworkId,
  getContractAddress,
  findDependency
} from '../utils/output-helper';

import { getWeb3Instance } from '../utils/blockchain';

import { ExchangeIssueModule } from '../../artifacts/ts/ExchangeIssueModule';
import { IssuanceOrderModule } from '../../artifacts/ts/IssuanceOrderModule';
import { RebalanceAuctionModule } from '../../artifacts/ts/RebalanceAuctionModule';
import { TakerWalletWrapper } from '../../artifacts/ts/TakerWalletWrapper';
import { RebalancingTokenIssuanceModule } from '../../artifacts/ts/RebalancingTokenIssuanceModule';
import { ZeroExExchangeWrapper } from '../../artifacts/ts/ZeroExExchangeWrapper';
import { PayableExchangeIssue } from '../../artifacts/ts/PayableExchangeIssue';
import { KyberNetworkWrapper } from '../../artifacts/ts/KyberNetworkWrapper';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';
import { ConstantAuctionPriceCurve } from '../../artifacts/ts/ConstantAuctionPriceCurve';

import dependencies from '../dependencies';
import networkConstants from '../network-constants';
import constants from '../constants';

describe('Deployment: Modules', () => {

  let web3;
  const networkId = getNetworkId();
  const networkName = getNetworkName();

  let coreAddress;
  let vaultAddress;
  let transferProxyAddress;

  before(async () => {
    web3 = await getWeb3Instance();
    coreAddress = await getContractAddress('Core');
    vaultAddress = await getContractAddress('Vault');
    transferProxyAddress = await getContractAddress('TransferProxy');
  });

  describe('Exchange Issue', () => {

    /**
     * Check if ExchangeIssueModule has been deployed with the following:
     * - Core
     * - TransferProxy
     * - Vault
     */

    let exchangeIssueContract;

    before(async () => {
      const exchangeIssueAddress = await getContractAddress('ExchangeIssueModule');
      exchangeIssueContract = new web3.eth.Contract(ExchangeIssueModule.abi, exchangeIssueAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode('ExchangeIssueModule', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await exchangeIssueContract.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the transfer proxy', async () => {
      const retrievedTransferProxyAddress = await exchangeIssueContract.methods.transferProxy().call();
      expect(retrievedTransferProxyAddress).toEqual(transferProxyAddress);
    });

    it('got deployed with the vault', async () => {
      const retrievedVaultAddress = await exchangeIssueContract.methods.vault().call();
      expect(retrievedVaultAddress).toEqual(vaultAddress);
    });

  });

  describe('Issuance Order Module', () => {

    /**
     * Check if the IssuanceOrderModule has been deployed with the following:
     * - Core
     * - TransferProxy
     * - Vault
     * - SignatureValidator
     */

    let issuanceOrderModule;

    before(async () => {
      const exchangeIssueAddress = await getContractAddress('IssuanceOrderModule');
      issuanceOrderModule = new web3.eth.Contract(IssuanceOrderModule.abi, exchangeIssueAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode('IssuanceOrderModule', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await issuanceOrderModule.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the transfer proxy', async () => {
      const retrievedTransferProxyAddress = await issuanceOrderModule.methods.transferProxy().call();
      expect(retrievedTransferProxyAddress).toEqual(transferProxyAddress);
    });

    it('got deployed with the vault', async () => {
      const retrievedVaultAddress = await issuanceOrderModule.methods.vault().call();
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
      const rebalanceAuctionAddress = await getContractAddress('RebalanceAuctionModule');
      rebalanceAuctionModule = new web3.eth.Contract(RebalanceAuctionModule.abi, rebalanceAuctionAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode('RebalanceAuctionModule', web3);
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
      const rebalanceAuctionAddress = await getContractAddress('RebalancingTokenIssuanceModule');
      rebalanceTokenIssuanceModule = new web3.eth.Contract(RebalancingTokenIssuanceModule.abi, rebalanceAuctionAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode('RebalancingTokenIssuanceModule', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await rebalanceTokenIssuanceModule.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the transfer proxy', async () => {
      const retrievedTransferProxyAddress = await rebalanceTokenIssuanceModule.methods.transferProxy().call();
      expect(retrievedTransferProxyAddress).toEqual(transferProxyAddress);
    });

    it('got deployed with the vault', async () => {
      const retrievedVaultAddress = await rebalanceTokenIssuanceModule.methods.vault().call();
      expect(retrievedVaultAddress).toEqual(vaultAddress);
    });

  });

  describe('Taker Wallet Wrapper', () => {

    /**
     * Check if the TakerWalletWrapper has been deployed with the following:
     * - Core
     * - TransferProxy
     */

    let takerWalletWrapper;

    before(async () => {
      const rebalanceAuctionAddress = await getContractAddress('TakerWalletWrapper');
      takerWalletWrapper = new web3.eth.Contract(TakerWalletWrapper.abi, rebalanceAuctionAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode('TakerWalletWrapper', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('got deployed with core', async () => {
      const retrievedCoreAddress = await takerWalletWrapper.methods.core().call();
      expect(retrievedCoreAddress).toEqual(coreAddress);
    });

    it('got deployed with the transfer proxy', async () => {
      const retrievedTransferProxyAddress = await takerWalletWrapper.methods.transferProxy().call();
      expect(retrievedTransferProxyAddress).toEqual(transferProxyAddress);
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
      const kyberWrapperAddress = await getContractAddress('KyberNetworkWrapper');
      kyberWrapper = new web3.eth.Contract(KyberNetworkWrapper.abi, kyberWrapperAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode('KyberNetworkWrapper', web3);
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
      const kyberWrapperAddress = await getContractAddress('ZeroExExchangeWrapper');
      zeroExWrapper = new web3.eth.Contract(ZeroExExchangeWrapper.abi, kyberWrapperAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode('ZeroExExchangeWrapper', web3);
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
     * Check if the PayableExchangeIssue has been deployed with:
     * - Core
     * - TransferProxy
     * - ExchangeIssueModel
     * - WrappedEtherAddress
     */

    let payableExchangeWrapper;

    before(async () => {
      const payableExchangeAddress = await getContractAddress('PayableExchangeIssue');
      payableExchangeWrapper = new web3.eth.Contract(PayableExchangeIssue.abi, payableExchangeAddress);
    });

    it('finds a valid contract at the address', async () => {
      const code = await getContractCode('PayableExchangeIssue', web3);
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

    it('got deployed with the exchange issue module', async () => {
      const retrievedExchangeIssueAddress = await payableExchangeWrapper.methods.exchangeIssueModule().call();
      const exchangeIssueModel = await getContractAddress('ExchangeIssueModule');
      expect(retrievedExchangeIssueAddress).toEqual(exchangeIssueModel);
    });

    it('got deployed with the correct wETH address', async () => {
      const retrievedWETHAddress = await payableExchangeWrapper.methods.weth().call();
      const WETHAddress = await findDependency('WETH');
      expect(retrievedWETHAddress).toEqual(WETHAddress);
    });

  });

  describe('Linear Auction Price Curve', () => {

    /**
     * Check if the LinearAuctionPriceCurve has been deployed with the appropriate settings
     */

    if (!networkConstants.linearAuctionPriceCurve[networkName]) {
      console.log(networkConstants.linearAuctionPriceCurve);
      console.log(networkName);
      console.log(getNetworkName());
      return;
    }

    let linearAuctionPriceCurveContract;

    before(async () => {
      const linearAuctionPriceCurveAddress = await getContractAddress('LinearAuctionPriceCurve');
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

  describe('Constant Auction Price Curve', () => {

     /**
      * Check if the ConstantAuctionPriceCurve has been deployed with the appropriate settings
      */

    if (!networkConstants.constantsAuctionPriceCurve[networkName]) {
      return;
    }

    let constantAuctionPriceCurveContract;

    before(async () => {
      const constantAuctionPriceCurveAddress = await getContractAddress('ConstantAuctionPriceCurve');
      constantAuctionPriceCurveContract = new web3.eth.Contract(
        ConstantAuctionPriceCurve.abi,
        constantAuctionPriceCurveAddress
      );
    });

    it('deployed with the correct price denominator', async () => {
      const retrievedPriceDenominator = await constantAuctionPriceCurveContract.methods.priceDenominator().call();
      expect(parseInt(retrievedPriceDenominator)).toEqual(constants.DEFAULT_AUCTION_PRICE_DENOMINATOR);
    });

    it('deployed with the correct price numerator', async () => {
      const retrievedPriceNumerator = await constantAuctionPriceCurveContract.methods.priceNumerator().call();
      expect(parseInt(retrievedPriceNumerator)).toEqual(constants.DEFAULT_AUCTION_PRICE_NUMERATOR);
    });

  });

});