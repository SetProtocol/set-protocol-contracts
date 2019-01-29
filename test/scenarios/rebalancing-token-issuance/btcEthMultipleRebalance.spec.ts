require('module-alias/register');

import * as chai from 'chai';
import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import {
  BidTxn,
  BTCETHMultipleRebalanceWrapper,
  DataOutput,
  FullRebalanceProgram,
  GeneralRebalancingData,
  InitializationParameters,
  IssuanceTxn,
  IssueRedeemSchedule,
  RedemptionTxn,
  SingleRebalanceCycleScenario,
  TokenPrices
} from './btcEthMultipleRebalanceHelper';

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

  // Initial MKR Price Feed Values
  const BTC_PRICE_INITIAL = new BigNumber(3.711).mul(10 ** 21);
  const ETH_PRICE_INITIAL = new BigNumber(1.28).mul(10 ** 20);

  const BTC_PRICE_PROPOSAL = BTC_PRICE_INITIAL.mul(1.1);

  // Base Component Constants
  const WBTC_DECIMALS = 8;
  const WETH_DECIMALS = 18;
  const DECIMAL_DIFFERENCE = WETH_DECIMALS - WBTC_DECIMALS;
  const ETH_DECIMAL_EXPONENTIATION = new BigNumber(10 ** DECIMAL_DIFFERENCE);

  // Base Set Details
  const BTC_ETH_NATURAL_UNIT = new BigNumber(10 ** 10);
  const INITIAL_BTC_UNIT = new BigNumber(1);
  const INITIAL_ETH_UNIT = BTC_PRICE_INITIAL
                            .div(ETH_PRICE_INITIAL)
                            .mul(ETH_DECIMAL_EXPONENTIATION)
                            .mul(INITIAL_BTC_UNIT);

  // Rebalancing Set Details
  const REBALANCING_SET_UNIT_SHARES = new BigNumber(1.35).mul(10 ** 6);
  const REBALANCING_SET_NATURAL_UNIT = new BigNumber(10 ** 10);

  // Issue Quantity
  const BTC_ETH_ISSUE_QUANTITY = new BigNumber(10 ** 18);
  const UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY = BTC_ETH_ISSUE_QUANTITY
                                                    .mul(REBALANCING_SET_NATURAL_UNIT)
                                                    .div(REBALANCING_SET_UNIT_SHARES);

  // Round the number to a certain precision w/o rounding up
  const REBALANCING_SET_ISSUE_QUANTITY = UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY
    .minus(UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY.modulo(REBALANCING_SET_NATURAL_UNIT));

  // Rebalancing Details
  const SECONDS_PER_DAY = new BigNumber(86400);
  const REBALANCE_INTERVAL = new BigNumber(28).mul(SECONDS_PER_DAY);
  const PROPOSAL_PERIOD = new BigNumber(1).mul(SECONDS_PER_DAY);
  const TIME_TO_PIVOT = SECONDS_PER_DAY;
  const PRICE_DENOMINATOR = new BigNumber(1000);

  // Bid Assumptions

  const BID_ONE_PRICE = new BigNumber(0.004776);
  const BID_TWO_PRICE = new BigNumber(0.019102);
  const BID_ONE_QUANTITY = new BigNumber(0.5);
  const BID_TWO_QUANTITY = new BigNumber(0.5);

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

    // Rebalancing Cycle 1
    const issueRedeemScheduleOne: IssueRedeemSchedule = {
      issuances: [],
      redemptions: [],
    };
    const priceUpdateOne: TokenPrices = {
      WBTCPrice: BTC_PRICE_PROPOSAL,
      WETHPrice: ETH_PRICE_INITIAL,
    };
    const bidTxnOne: BidTxn = {
      sender: accounts[1],
      amount: BID_ONE_QUANTITY,
      price: BID_ONE_PRICE,
    };
    const bidTxnTwo: BidTxn = {
      sender: accounts[2],
      amount: BID_TWO_QUANTITY,
      price: BID_TWO_PRICE,
    };
    const biddingScheduleOne: BidTxn[] = [bidTxnOne, bidTxnTwo];
    const cycleScenarioOne: SingleRebalanceCycleScenario = {
      issueRedeemSchedule: issueRedeemScheduleOne,
      priceUpdate: priceUpdateOne,
      biddingSchedule: biddingScheduleOne,
    };

    // Rebalancing Cycle 2
    const issueTxnOne: IssuanceTxn = {
      sender: accounts[5],
      amount: new BigNumber(10 ** 21),
    };
    const redeemTxnOne: RedemptionTxn = {
      sender: accounts[6],
      amount: new BigNumber(5 * 10 ** 20),
    };
    const issueRedeemScheduleTwo: IssueRedeemSchedule = {
      issuances: [issueTxnOne],
      redemptions: [redeemTxnOne],
    };
    const priceUpdateTwo: TokenPrices = {
      WBTCPrice: new BigNumber(3.983).mul(10 ** 22),
      WETHPrice: new BigNumber(1.15).mul(10 ** 21),
    };
    const cycleTwoBidTxnOne: BidTxn = {
      sender: accounts[3],
      amount: new BigNumber(0.2),
      price: new BigNumber(-0.005),
    };
    const cycleTwoBidTxnTwo: BidTxn = {
      sender: accounts[4],
      amount: new BigNumber(0.6),
      price: new BigNumber(0.01),
    };
    const cycleTwoBidTxnThree: BidTxn = {
      sender: accounts[2],
      amount: new BigNumber(0.2),
      price: new BigNumber(0.015),
    };
    const biddingScheduleTwo: BidTxn[] = [cycleTwoBidTxnOne, cycleTwoBidTxnTwo, cycleTwoBidTxnThree];
    const cycleScenarioTwo: SingleRebalanceCycleScenario = {
      issueRedeemSchedule: issueRedeemScheduleTwo,
      priceUpdate: priceUpdateTwo,
      biddingSchedule: biddingScheduleTwo,
    };

    // Create Full Rebalance Object
    const btcMultiplier = new BigNumber(1);
    const ethMultiplier = new BigNumber(1);
    const initialTokenPrices: TokenPrices = {
      WBTCPrice: BTC_PRICE_INITIAL,
      WETHPrice: ETH_PRICE_INITIAL,
    };
    const initializationParams: InitializationParameters = {
      btcMultiplier,
      ethMultiplier,
      initialTokenPrices,
      initialSetIssueQuantity: BTC_ETH_ISSUE_QUANTITY,
      initialSetUnits: [INITIAL_BTC_UNIT, INITIAL_ETH_UNIT],
      initialSetNaturalUnit: BTC_ETH_NATURAL_UNIT,
      rebalancingSetIssueQuantity: REBALANCING_SET_ISSUE_QUANTITY,
      rebalancingSetUnitShares: [REBALANCING_SET_UNIT_SHARES],
      proposalPeriod: PROPOSAL_PERIOD,
      rebalanceInterval: REBALANCE_INTERVAL,
      auctionTimeToPivot: TIME_TO_PIVOT,
      priceDenominator: PRICE_DENOMINATOR,
    };

    const generalRebalancingData: GeneralRebalancingData = {
      baseSets: [],
      minimumBid: new BigNumber(0),
      initialRemainingSets: new BigNumber(0),
    };
    const cycleData = [cycleScenarioOne, cycleScenarioTwo];
    const rebalanceIterations = 2;

    scenarioData = {
      rebalanceIterations,
      initializationParams,
      generalRebalancingData,
      cycleData,
    };

    btcEthRebalanceWrapper = new BTCETHMultipleRebalanceWrapper(accounts, scenarioData);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  async function subject(): Promise<DataOutput> {
    return btcEthRebalanceWrapper.runFullRebalanceProgram();
  }

  describe.only('for multiple rebalance cycles', async () => {
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