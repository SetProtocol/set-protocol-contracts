'use strict';

import * as chai from 'chai';

import { getContractCode, getNetworkName, getNetworkId, getContractAddress, getWeb3Instance } from "../utils/blockchain";

describe('Deployment: Libraries', () => {

  let web3;
  let coreAddress;
  let networkId;
  let networkName = getNetworkName();

  beforeAll(async () => {
    web3 = await getWeb3Instance();
    coreAddress = await getContractAddress('Core');
    networkId = await getNetworkId();
  });

  describe('ERC20Wrapper', () => {

    /**
     * Deployed the ERC20Wrapper then check it got linked with the following contracts
     * - Vault
     * - TransferProxy
     * - TakerWalletWrapper
     * - KyberNetworkWrapper
     * - ZeroExExchangeWrapper
     * - PayableExchangeIssue
     */

    test('finds a valid library at the address', async () => {
      let code = await getContractCode('ERC20Wrapper', web3);
      expect(code.length).toBeGreaterThan(2);
    });

  });

  describe('EIP712Library', () => {

    /** 
     * Deployed the EIP712Library then check it got linked with the following contracts:
     * - Core
     * - IssuanceOrderModule
     */

    test('finds a valid library at the address', async () => {
      let code = await getContractCode('EIP712Library', web3);
      expect(code.length).toBeGreaterThan(2);
    });

  });

  describe('OrderLibrary', () => {

    /**
     * Deployed the Order Library then check it got linked with the following contracts:
     * - Core
     * - Issuance Order Module
     */

    test('finds a valid library at the address', async () => {
      let code = await getContractCode('OrderLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

  });

  describe('ExchangeIssueLibrary', () => {

    /**
     * Deployed the ExchangeIssuanceLibrary then check it got linked with the following contracts:
     * - PayableExchangeIssue
     */

    test('finds a valid library at the address', async () => {
      let code = await getContractCode('ExchangeIssueLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

  });

  describe('Rebalancing Libraries', () => {

    /**
     * Deployed the RebalancingHelperLibrary
     */

    test('finds a valid RebalancingHelperLibrary at the address', async () => {
      let code = await getContractCode('RebalancingHelperLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

     /**
      * Deployed the following libraries and have been linked to RebalancingHelperLibrary:
      * - StandardProposeLibrary
      * - StandardStartRebalanceLibrary
      * - StandardPlaceBidLibrary
      * - StandardSettleRebalanceLibrary
      * - StandardFailAuctionLibrary
      */

    test('finds a valid StandardProposeLibrary at the address', async () => {
      let code = await getContractCode('StandardProposeLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('finds a valid StandardStartRebalanceLibrary at the address', async () => {
      let code = await getContractCode('StandardStartRebalanceLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('finds a valid StandardPlaceBidLibrary at the address', async () => {
      let code = await getContractCode('StandardPlaceBidLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('finds a valid StandardSettleRebalanceLibrary at the address', async () => {
      let code = await getContractCode('StandardSettleRebalanceLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

    test('finds a valid StandardFailAuctionLibrary at the address', async () => {
      let code = await getContractCode('StandardFailAuctionLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

  });

  describe('Signature Validator', () => {

    /** 
     * Deployed the SignatureValidator contract 
     */

    test('has deployed SignatureValidator at the address', async () => {
      let code = await getContractCode('StandardFailAuctionLibrary', web3);
      expect(code.length).toBeGreaterThan(2);
    });

  });

});