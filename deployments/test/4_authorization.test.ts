'use strict';

describe('Deployment: Authorization', () => {

  describe('Apply timelocks', () => { 

    /**
     * Need to check whether a time lock was applied to the following contracts:
     * - Core
     * - TransferProxy
     * - Vault
     * - Whitelist
     * - Issuance Order Module
     */

  });

  describe('Add Authorized Vault addresses', () => {

    /**
     * Check if the following contracts have the Vault as an authorized address:
     * - Core
     * - ExchangeIssueModule
     * - IssuanceOrderModule
     * - RebalancingAuctionModule
     * - RebalancingTokenIssuanceModule
     */

  });

  describe('Add Authorized Transfer Proxy addresses', () => {

    /**
     * Check if the following contracts have the Transfer Proxy as an authorized address:
     * - Core
     * - TakerWalletWrapper
     * - ExchangeIssueModule
     * - IssuanceOrderModule
     * - RebalancingAuctionModule
     * - RebalancingTokenIssuanceModule
     */

  });

  describe('Register Factories with Core', () => {

    /**
     * Check if the following factories are registered with Core:
     * - SetTokenFactory
     * - RebalancingSetTokenFactory
     */

  });

  describe('Add Modules to Core', () => {

    /**
     * Check if the following modules have been added to Core:
     * - ExchangeIssueModule
     * - IssuanceOrderModule
     * - RebalanceAuctionModule
     * - RebalancingTokenIssuanceModule
     */

  });

  describe('Register Exchanges with Core', () => {

    /**
     * Check if the following exchange wrappers have been added to core:
     * - ZeroExExchangeWrapper
     * - KyberNetworkWrapper
     * - TakerWalletWrapper
     */

  });

  describe('Register Price Libraries with Core', () => {

    /**
     * Check if the following price libraries have been added to Core:
     * - LinearAuctionPriceCurve
     * - ConstantAuctionPriceCurve
     */

  });

});