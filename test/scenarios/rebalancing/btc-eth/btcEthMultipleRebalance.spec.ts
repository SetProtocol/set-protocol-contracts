require('module-alias/register');

import * as chai from 'chai';
import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { getScenarioData } from './scenarioData';

import {
  DataOutput,
  FullRebalanceProgram,
} from './types';

import { BTCETHMultipleRebalanceWrapper } from './btcEthMultipleRebalanceHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const RebalanceAuctionModule = artifacts.require('RebalanceAuctionModule');
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('Multiple Rebalance BTC-ETH 50/50', accounts => {

  let btcEthRebalanceWrapper: BTCETHMultipleRebalanceWrapper;
  let scenarioData: FullRebalanceProgram;

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
    ABIDecoder.addABI(RebalanceAuctionModule.abi);
    ABIDecoder.addABI(RebalancingSetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalanceAuctionModule.abi);
    ABIDecoder.removeABI(RebalancingSetToken.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    scenarioData = getScenarioData(accounts);

    btcEthRebalanceWrapper = new BTCETHMultipleRebalanceWrapper(accounts, scenarioData);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  async function subject(): Promise<DataOutput> {
    return btcEthRebalanceWrapper.runFullRebalanceProgram();
  }

  describe('for multiple rebalance cycles', async () => {
    it('for first rebalance actual slippage is within 5% of expected slippage', async () => {
      const dataOutput = await subject();

      const expectedCollateral = dataOutput.collateralizingSets[0].mul(
        dataOutput.issuedRebalancingSets[1].div(dataOutput.issuedRebalancingSets[0])
      ).div(dataOutput.rebalanceFairValues[0]).mul(1000).round(0, 4);

      let expectedBidSlippage: BigNumber = new BigNumber(0);
      for (let i = 0; i < scenarioData.cycleData[0].biddingSchedule.length; i++) {
        const bid = scenarioData.cycleData[0].biddingSchedule[i];

        expectedBidSlippage = expectedBidSlippage.add(bid.amount.mul(bid.price));
      }

      const actualBidSlippage = new BigNumber(1).sub(
        dataOutput.collateralizingSets[1].div(expectedCollateral)
      ).toNumber();

      expect(actualBidSlippage).to.be.greaterThan(expectedBidSlippage.mul(.95).toNumber());
      expect(actualBidSlippage).to.be.lessThan(expectedBidSlippage.mul(1.05).toNumber());
    });

    it('for second rebalance actual slippage is within 5% of expected slippage', async () => {
      const dataOutput = await subject();

      const expectedCollateral = dataOutput.collateralizingSets[1].mul(
        dataOutput.issuedRebalancingSets[2].div(dataOutput.issuedRebalancingSets[1])
      ).div(dataOutput.rebalanceFairValues[1]).mul(1000).round(0, 4);

      let expectedBidSlippage: BigNumber = new BigNumber(0);
      for (let i = 0; i < scenarioData.cycleData[1].biddingSchedule.length; i++) {
        const bid = scenarioData.cycleData[1].biddingSchedule[i];

        expectedBidSlippage = expectedBidSlippage.add(bid.amount.mul(bid.price));
      }

      const actualBidSlippage = new BigNumber(1).sub(
        dataOutput.collateralizingSets[2].div(expectedCollateral)
      ).toNumber();

      expect(actualBidSlippage).to.be.greaterThan(expectedBidSlippage.mul(.95).toNumber());
      expect(actualBidSlippage).to.be.lessThan(expectedBidSlippage.mul(1.05).toNumber());
    });
  });
});