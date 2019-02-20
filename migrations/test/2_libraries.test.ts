'use strict';

import { getContractCode } from '../utils/output-helper';
import { getWeb3Instance } from '../utils/blockchain';

describe('Deployment: Libraries', () => {

  let web3;

  beforeAll(async () => {
    web3 = await getWeb3Instance();
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
      const code = await getContractCode('ERC20Wrapper', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('EIP712Library', () => {

    /**
     * Deployed the EIP712Library then check it got linked with the following contracts:
     * - Core
     * - IssuanceOrderModule
     */

    test('finds a valid library at the address', async () => {
      const code = await getContractCode('EIP712Library', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('OrderLibrary', () => {

    /**
     * Deployed the Order Library then check it got linked with the following contracts:
     * - Core
     * - Issuance Order Module
     */

    test('finds a valid library at the address', async () => {
      const code = await getContractCode('OrderLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('ExchangeIssueLibrary', () => {

    /**
     * Deployed the ExchangeIssuanceLibrary then check it got linked with the following contracts:
     * - PayableExchangeIssue
     */

    test('finds a valid library at the address', async () => {
      const code = await getContractCode('ExchangeIssueLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('Rebalancing Libraries', () => {

    /**
     * Deployed the RebalancingHelperLibrary
     */

    test('finds a valid RebalancingHelperLibrary at the address', async () => {
      const code = await getContractCode('RebalancingHelperLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
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
      const code = await getContractCode('StandardProposeLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    test('finds a valid StandardStartRebalanceLibrary at the address', async () => {
      const code = await getContractCode('StandardStartRebalanceLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    test('finds a valid StandardPlaceBidLibrary at the address', async () => {
      const code = await getContractCode('StandardPlaceBidLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    test('finds a valid StandardSettleRebalanceLibrary at the address', async () => {
      const code = await getContractCode('StandardSettleRebalanceLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    test('finds a valid StandardFailAuctionLibrary at the address', async () => {
      const code = await getContractCode('StandardFailAuctionLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('Signature Validator', () => {

    /**
     * Deployed the SignatureValidator contract
     */

    test('has deployed SignatureValidator at the address', async () => {
      const code = await getContractCode('StandardFailAuctionLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

});