'use strict';

import expect from 'expect';

import { getContractCode } from '../utils/output-helper';
import { getWeb3Instance } from '../utils/blockchain';

describe('Deployment: Libraries', () => {

  let web3;

  before(async () => {
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
     * - PayableExchangeIssuance
     */

    it('finds a valid library at the address', async () => {
      const code = await getContractCode('ERC20Wrapper', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('ExchangeIssuanceLibrary', () => {

    /**
     * Deployed the ExchangeIssuanceLibrary then check it got linked with the following contracts:
     * - PayableExchangeIssuance
     */

    it('finds a valid library at the address', async () => {
      const code = await getContractCode('ExchangeIssuanceLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('IssuanceLibrary', () => {

    it('finds a valid library at the address', async () => {
      const code = await getContractCode('IssuanceLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('Rebalancing Libraries', () => {

    /**
     * Deployed the RebalancingHelperLibrary
     */

    it('finds a valid RebalancingHelperLibrary at the address', async () => {
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

    it('finds a valid StandardProposeLibrary at the address', async () => {
      const code = await getContractCode('StandardProposeLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardStartRebalanceLibrary at the address', async () => {
      const code = await getContractCode('StandardStartRebalanceLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardPlaceBidLibrary at the address', async () => {
      const code = await getContractCode('StandardPlaceBidLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardSettleRebalanceLibrary at the address', async () => {
      const code = await getContractCode('StandardSettleRebalanceLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardFailAuctionLibrary at the address', async () => {
      const code = await getContractCode('StandardFailAuctionLibrary', web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });
});