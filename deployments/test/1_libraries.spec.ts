'use strict';

import expect from 'expect';

import { CoreIssuanceLibrary } from '../../artifacts/ts/CoreIssuanceLibrary';
import { ERC20Wrapper } from '../../artifacts/ts/ERC20Wrapper';
import { ExchangeIssuanceLibrary } from '../../artifacts/ts/ExchangeIssuanceLibrary';
import { RebalancingHelperLibrary } from '../../artifacts/ts/RebalancingHelperLibrary';
import { StandardFailAuctionLibrary } from '../../artifacts/ts/StandardFailAuctionLibrary';
import { StandardPlaceBidLibrary } from '../../artifacts/ts/StandardPlaceBidLibrary';
import { StandardProposeLibrary } from '../../artifacts/ts/StandardProposeLibrary';
import { StandardSettleRebalanceLibrary } from '../../artifacts/ts/StandardSettleRebalanceLibrary';
import { StandardStartRebalanceLibrary } from '../../artifacts/ts/StandardStartRebalanceLibrary';

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
      const code = await getContractCode(ERC20Wrapper.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });
  });

  describe('ExchangeIssuanceLibrary', () => {

    /**
     * Deployed the ExchangeIssuanceLibrary then check it got linked with the following contracts:
     * - PayableExchangeIssuance
     */

    it('finds a valid library at the address', async () => {
      const code = await getContractCode(ExchangeIssuanceLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });
  });

  describe('CoreIssuanceLibrary', () => {

    it('finds a valid library at the address', async () => {
      const code = await getContractCode(CoreIssuanceLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });
  });

  describe('Rebalancing Libraries', () => {

    /**
     * Deployed the RebalancingHelperLibrary
     */

    it('finds a valid RebalancingHelperLibrary at the address', async () => {
      const code = await getContractCode(RebalancingHelperLibrary.contractName, web3);
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
      const code = await getContractCode(StandardProposeLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardStartRebalanceLibrary at the address', async () => {
      const code = await getContractCode(StandardStartRebalanceLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardPlaceBidLibrary at the address', async () => {
      const code = await getContractCode(StandardPlaceBidLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardSettleRebalanceLibrary at the address', async () => {
      const code = await getContractCode(StandardSettleRebalanceLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StandardFailAuctionLibrary at the address', async () => {
      const code = await getContractCode(StandardFailAuctionLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });
  });
});