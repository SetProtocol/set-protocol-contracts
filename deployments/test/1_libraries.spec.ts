'use strict';

import expect from 'expect';

import { CoreIssuanceLibrary } from '../../artifacts/ts/CoreIssuanceLibrary';
import { ERC20Wrapper } from '../../artifacts/ts/ERC20Wrapper';
import { ExchangeIssuanceLibrary } from '../../artifacts/ts/ExchangeIssuanceLibrary';
import { RebalancingLibrary } from '../../artifacts/ts/RebalancingLibrary';
import { FailAuctionLibrary } from '../../artifacts/ts/FailAuctionLibrary';
import { PlaceBidLibrary } from '../../artifacts/ts/PlaceBidLibrary';
import { ProposeLibrary } from '../../artifacts/ts/ProposeLibrary';
import { SettleRebalanceLibrary } from '../../artifacts/ts/SettleRebalanceLibrary';
import { StartRebalanceLibrary } from '../../artifacts/ts/StartRebalanceLibrary';

import { getContractCode } from '../utils/output-helper';
import { getWeb3Instance } from '../utils/blockchain';

describe('Deployment: Libraries', () => {

  let web3;

  before(async () => {
    web3 = await getWeb3Instance();
  });

  describe('ERC20Wrapper', () => {
    it('finds a valid library at the address', async () => {
      const code = await getContractCode(ERC20Wrapper.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });
  });

  describe('ExchangeIssuanceLibrary', () => {
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
    it('finds a valid RebalancingLibrary at the address', async () => {
      const code = await getContractCode(RebalancingLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid ProposeLibrary at the address', async () => {
      const code = await getContractCode(ProposeLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid StartRebalanceLibrary at the address', async () => {
      const code = await getContractCode(StartRebalanceLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid PlaceBidLibrary at the address', async () => {
      const code = await getContractCode(PlaceBidLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid SettleRebalanceLibrary at the address', async () => {
      const code = await getContractCode(SettleRebalanceLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });

    it('finds a valid FailAuctionLibrary at the address', async () => {
      const code = await getContractCode(FailAuctionLibrary.contractName, web3);
      expect(code.length).toBeGreaterThan(3);
    });
  });
});