'use strict';

import expect from 'expect';

import { CONTRACT } from '../contractNames';
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
      const code = await getContractCode(CONTRACT.ERC20Wrapper, web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('ExchangeIssuanceLibrary', () => {

    /**
     * Deployed the ExchangeIssuanceLibrary then check it got linked with the following contracts:
     * - PayableExchangeIssuance
     */

    it('finds a valid library at the address', async () => {
      const code = await getContractCode(CONTRACT.ExchangeIssuanceLibrary, web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('CoreIssuanceLibrary', () => {

    it('finds a valid library at the address', async () => {
      const code = await getContractCode(CONTRACT.CoreIssuanceLibrary, web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });

  describe('Rebalancing Libraries', () => {

    /**
     * Deployed the RebalancingHelperLibrary
     */

    it('finds a valid RebalancingHelperLibrary at the address', async () => {
      const code = await getContractCode(CONTRACT.RebalancingHelperLibrary, web3);
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
      const code = await getContractCode(CONTRACT.StandardProposeLibrary, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardStartRebalanceLibrary at the address', async () => {
      const code = await getContractCode(CONTRACT.StandardStartRebalanceLibrary, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardPlaceBidLibrary at the address', async () => {
      const code = await getContractCode(CONTRACT.StandardPlaceBidLibrary, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardSettleRebalanceLibrary at the address', async () => {
      const code = await getContractCode(CONTRACT.StandardSettleRebalanceLibrary, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardFailAuctionLibrary at the address', async () => {
      const code = await getContractCode(CONTRACT.StandardFailAuctionLibrary, web3);
      expect(code.length).toBeGreaterThan(3);
    });

  });
});