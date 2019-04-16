require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import {
  BITETH_BTC_DOMINANT,
  BITETH_ETH_DOMINANT,
  BTCDAI_BTD,
  ETHDAI_BTD,
  SHORT_TERM_BTCDAI_BTD,
  SHORT_TERM_ETHDAI_BTD,
} from './inputs';

import {
  AssetScenario,
} from './types';

import { RebalanceScenariosWrapper } from './deployedSetScenarioRunner';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const RebalanceAuctionModule = artifacts.require('RebalanceAuctionModule');
const blockchain = new Blockchain(web3);


contract('Deployed Set Scenarios', accounts => {

  let rebalanceScenariosWrapper: RebalanceScenariosWrapper;
  let scenarioData: AssetScenario;

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(RebalanceAuctionModule.abi);
    ABIDecoder.addABI(RebalancingSetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(RebalanceAuctionModule.abi);
    ABIDecoder.removeABI(RebalancingSetToken.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    rebalanceScenariosWrapper = new RebalanceScenariosWrapper(accounts, scenarioData);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  async function subject(): Promise<void> {
    return rebalanceScenariosWrapper.runFullRebalanceProgram();
  }

  describe('BTCETH_BTC_DOMINANT', async () => {
    before(async () => {
      scenarioData = BITETH_BTC_DOMINANT;
    });

    it('works', async () => {
      await subject();
    });
  });

  describe('BITETH_ETH_DOMINANT', async () => {
    before(async () => {
      scenarioData = BITETH_ETH_DOMINANT;
    });

    it('works', async () => {
      await subject();
    });
  });

  describe('BTCDAI_BTD', async () => {
    before(async () => {
      scenarioData = BTCDAI_BTD;
    });

    it('works', async () => {
      await subject();
    });
  });

  describe('SHORT_TERM_BTCDAI_BTD', async () => {
    before(async () => {
      scenarioData = SHORT_TERM_BTCDAI_BTD;
    });

    it('works', async () => {
      await subject();
    });
  });

  describe('ETHDAI_BTD', async () => {
    before(async () => {
      scenarioData = ETHDAI_BTD;
    });

    it('works', async () => {
      await subject();
    });
  });

  describe('SHORT_TERM_ETHDAI_BTD', async () => {
    before(async () => {
      scenarioData = SHORT_TERM_ETHDAI_BTD;
    });

    it('works', async () => {
      await subject();
    });
  });
});