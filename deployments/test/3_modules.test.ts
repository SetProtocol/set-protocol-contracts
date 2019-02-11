'use strict';

import * as chai from 'chai';

import { getContractCode, getNetworkName, getNetworkId, getContractAddress, getWeb3Instance } from "../utils/blockchain";

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
  let networkId = getNetworkId();
  let networkName = getNetworkName();

  let coreAddress;
  let vaultAddress;
  let transferProxyAddress;

  beforeAll(async () => {
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

    beforeAll(async () => {
      let exchangeIssueAddress = await getContractAddress('ExchangeIssueModule');
      exchangeIssueContract = new web3.eth.Contract(ExchangeIssueModule.abi, exchangeIssueAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('ExchangeIssueModule', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await exchangeIssueContract.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    })

    test('got deployed with the transfer proxy', async () => {
      let retrievedTransferProxyAddress = await exchangeIssueContract.methods.transferProxy().call();
      expect(transferProxyAddress).toEqual(retrievedTransferProxyAddress);
    })

    test('got deployed with the vault', async () => {
      let retrievedVaultAddress = await exchangeIssueContract.methods.vault().call();
      expect(vaultAddress).toEqual(retrievedVaultAddress);
    })

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

    beforeAll(async () => {
      let exchangeIssueAddress = await getContractAddress('IssuanceOrderModule');
      issuanceOrderModule = new web3.eth.Contract(IssuanceOrderModule.abi, exchangeIssueAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('IssuanceOrderModule', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await issuanceOrderModule.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    test('got deployed with the transfer proxy', async () => {
      let retrievedTransferProxyAddress = await issuanceOrderModule.methods.transferProxy().call();
      expect(transferProxyAddress).toEqual(retrievedTransferProxyAddress);
    });

    test('got deployed with the vault', async () => {
      let retrievedVaultAddress = await issuanceOrderModule.methods.vault().call();
      expect(vaultAddress).toEqual(retrievedVaultAddress);
    });

  });

  describe('Rebalancing Auction Module', () => {

    /**
     * Check if the RebalanceAuctionModule has been deployed with the following:
     * - Core
     * - Vault
     */
    
    let rebalanceAuctionModule;

    beforeAll(async () => {
      let rebalanceAuctionAddress = await getContractAddress('RebalanceAuctionModule');
      rebalanceAuctionModule = new web3.eth.Contract(RebalanceAuctionModule.abi, rebalanceAuctionAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('RebalanceAuctionModule', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await rebalanceAuctionModule.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });
    
    test('got deployed with the vault', async () => {
      let retrievedVaultAddress = await rebalanceAuctionModule.methods.vault().call();
      expect(vaultAddress).toEqual(retrievedVaultAddress);
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

    beforeAll(async () => {
      let rebalanceAuctionAddress = await getContractAddress('RebalancingTokenIssuanceModule');
      rebalanceTokenIssuanceModule = new web3.eth.Contract(RebalancingTokenIssuanceModule.abi, rebalanceAuctionAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('RebalancingTokenIssuanceModule', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await rebalanceTokenIssuanceModule.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    test('got deployed with the transfer proxy', async () => {
      let retrievedTransferProxyAddress = await rebalanceTokenIssuanceModule.methods.transferProxy().call();
      expect(transferProxyAddress).toEqual(retrievedTransferProxyAddress);
    });

    test('got deployed with the vault', async () => {
      let retrievedVaultAddress = await rebalanceTokenIssuanceModule.methods.vault().call();
      expect(vaultAddress).toEqual(retrievedVaultAddress);
    });

  });

  describe('Taker Wallet Wrapper', () => {

    /**
     * Check if the TakerWalletWrapper has been deployed with the following:
     * - Core
     * - TransferProxy
     */

    let takerWalletWrapper;

    beforeAll(async () => {
      let rebalanceAuctionAddress = await getContractAddress('TakerWalletWrapper');
      takerWalletWrapper = new web3.eth.Contract(TakerWalletWrapper.abi, rebalanceAuctionAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('TakerWalletWrapper', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await takerWalletWrapper.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    test('got deployed with the transfer proxy', async () => {
      let retrievedTransferProxyAddress = await takerWalletWrapper.methods.transferProxy().call();
      expect(transferProxyAddress).toEqual(retrievedTransferProxyAddress);
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

    beforeAll(async () => {
      let kyberWrapperAddress = await getContractAddress('KyberNetworkWrapper');
      kyberWrapper = new web3.eth.Contract(KyberNetworkWrapper.abi, kyberWrapperAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('KyberNetworkWrapper', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await kyberWrapper.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    test('got deployed with the kyber network proxy', async () => {
      let retrievedKyberNetworkProxy = await kyberWrapper.methods.kyberNetworkProxy().call();
      let kyberNetworkProxyAddress = dependencies.KYBER_PROXY[networkId];
      expect(kyberNetworkProxyAddress).toEqual(retrievedKyberNetworkProxy);
    });

    test('got deployed with the transfer proxy', async () => {
      let retrievedTransferProxyAddress = await kyberWrapper.methods.setTransferProxy().call();
      expect(transferProxyAddress).toEqual(retrievedTransferProxyAddress);
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

    beforeAll(async () => {
      let kyberWrapperAddress = await getContractAddress('ZeroExExchangeWrapper');
      zeroExWrapper = new web3.eth.Contract(ZeroExExchangeWrapper.abi, kyberWrapperAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('ZeroExExchangeWrapper', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await zeroExWrapper.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    test('got deployed with the zero ex exchange', async () => {
      let retrievedZeroExExchange = await zeroExWrapper.methods.zeroExExchange().call();
      let zeroExExchangeAddress = dependencies.ZERO_EX_EXCHANGE[networkId];
      expect(zeroExExchangeAddress).toEqual(retrievedZeroExExchange);
    });

    test('got deployed with the zero ex transfer proxy', async () => {
      let retrievedZeroExTransferProxy = await zeroExWrapper.methods.zeroExProxy().call();
      let zeroExTransferProxyAddress = dependencies.ZERO_EX_PROXY[networkId];
      expect(zeroExTransferProxyAddress).toEqual(retrievedZeroExTransferProxy);
    });

    test('got deployed with the zero ex token', async () => {
      let retrievedZeroExToken= await zeroExWrapper.methods.zeroExToken().call();
      let zeroExTokenAddress = dependencies.ZERO_EX_ZRX[networkId];
      expect(zeroExTokenAddress).toEqual(retrievedZeroExToken);
    });

    test('got deployed with the transfer proxy', async () => {
      let retrievedTransferProxyAddress = await zeroExWrapper.methods.setTransferProxy().call();
      expect(transferProxyAddress).toEqual(retrievedTransferProxyAddress);
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

    beforeAll(async () => {
      let payableExchangeAddress = await getContractAddress('PayableExchangeIssue');
      payableExchangeWrapper = new web3.eth.Contract(PayableExchangeIssue.abi, payableExchangeAddress);
    });

    test('finds a valid contract at the address', async () => {
      let code = await getContractCode('PayableExchangeIssue', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('got deployed with core', async () => {
      let retrievedCoreAddress = await payableExchangeWrapper.methods.core().call();
      expect(coreAddress).toEqual(retrievedCoreAddress);
    });

    test('got deployed with the transfer proxy', async () => {
      let retrievedTransferProxyAddress = await payableExchangeWrapper.methods.transferProxy().call();
      expect(transferProxyAddress).toEqual(retrievedTransferProxyAddress);
    });

    test('got deployed with the exchange issue module', async () => {
      let retrievedExchangeIssueAddress = await payableExchangeWrapper.methods.exchangeIssueModule().call();
      let exchangeIssueModel = await getContractAddress("ExchangeIssueModule");
      expect(exchangeIssueModel).toEqual(retrievedExchangeIssueAddress);
    });

    test('got deployed with the correct wETH address', async () => {
      let retrievedWETHAddress = await payableExchangeWrapper.methods.weth().call();
      let WETHAddress = dependencies.WETH[networkId];
      expect(WETHAddress).toEqual(retrievedWETHAddress);
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

    beforeAll(async () => {
      let linearAuctionPriceCurveAddress = await getContractAddress('LinearAuctionPriceCurve');
      linearAuctionPriceCurveContract = new web3.eth.Contract(LinearAuctionPriceCurve.abi, linearAuctionPriceCurveAddress);
    });

    test('deployed with the correct price denominator', async () => {
      let retrievedPriceDenominator = await linearAuctionPriceCurveContract.methods.priceDenominator().call();
      expect(parseInt(retrievedPriceDenominator)).toEqual(constants.DEFAULT_AUCTION_PRICE_DENOMINATOR);
    });

    test('deployed with the uses start price parameter as true', async () => {
      let retrievedUseStartPrice = await linearAuctionPriceCurveContract.methods.usesStartPrice().call();
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

    beforeAll(async () => {
      let constantAuctionPriceCurveAddress = await getContractAddress('ConstantAuctionPriceCurve');
      constantAuctionPriceCurveContract = new web3.eth.Contract(ConstantAuctionPriceCurve.abi, constantAuctionPriceCurveAddress);
    });

    test('deployed with the correct price denominator', async () => {
      let retrievedPriceDenominator = await constantAuctionPriceCurveContract.methods.priceDenominator().call();
      expect(parseInt(retrievedPriceDenominator)).toEqual(constants.DEFAULT_AUCTION_PRICE_DENOMINATOR);
    });

    test('deployed with the correct price numerator', async () => {
      let retrievedPriceNumerator = await constantAuctionPriceCurveContract.methods.priceNumerator().call();
      expect(parseInt(retrievedPriceNumerator)).toEqual(constants.DEFAULT_AUCTION_PRICE_NUMERATOR);
    });

  });

});