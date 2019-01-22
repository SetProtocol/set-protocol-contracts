require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import {
  BidTxn,
  BTCETHMultipleRebalanceWrapper,
  FullRebalanceProgram,
  GeneralRebalancingData,
  IssueRedeemSchedule,
  SingleRebalanceCycleScenario,
  TokenPrices
} from './btcEthMultipleRebalanceHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const RebalanceAuctionModule = artifacts.require('RebalanceAuctionModule');
// const { expect } = chai;
const blockchain = new Blockchain(web3);
// const setTestUtils = new SetTestUtils(web3);
// const web3Utils = new Web3Utils(web3);


contract('Rebalancing BTC-ETH 50/50', accounts => {

  let btcEthRebalanceWrapper: BTCETHMultipleRebalanceWrapper;

  // Initial MKR Price Feed Values
  const BTC_PRICE_INITIAL = new BigNumber(3.711).mul(10 ** 21);
  const ETH_PRICE_INITIAL = new BigNumber(1.28).mul(10 ** 20);

  const BTC_PRICE_PROPOSAL = BTC_PRICE_INITIAL.mul(1.1);

  // Rebalancing Set Details
  const REBALANCING_SET_NATURAL_UNIT = new BigNumber(10 ** 10);

  // Issue Quantity
  const BTC_ETH_ISSUE_QUANTITY = new BigNumber(10 ** 18);

  // Rebalancing Details
  const SECONDS_PER_DAY = new BigNumber(86400);
  const REBALANCE_INTERVAL = new BigNumber(28).mul(SECONDS_PER_DAY);
  const PROPOSAL_PERIOD = new BigNumber(1).mul(SECONDS_PER_DAY);
  const TIME_TO_PIVOT = SECONDS_PER_DAY;
  const PRICE_DENOMINATOR = new BigNumber(1000);

  // Bid Assumptions
  const MINIMUM_BID = PRICE_DENOMINATOR.mul(REBALANCING_SET_NATURAL_UNIT);
  const BID_ONE_PRICE = new BigNumber(1052);
  const BID_TWO_PRICE = new BigNumber(1067);
  const UNROUNDED_BID_ONE_QUANTITY = BTC_ETH_ISSUE_QUANTITY.div(2);
  const UNROUNDED_BID_TWO_QUANTITY = BTC_ETH_ISSUE_QUANTITY.div(2).minus(MINIMUM_BID);
  const BID_ONE_QUANTITY = UNROUNDED_BID_ONE_QUANTITY.minus(UNROUNDED_BID_ONE_QUANTITY.modulo(MINIMUM_BID));
  const BID_TWO_QUANTITY = UNROUNDED_BID_TWO_QUANTITY.minus(UNROUNDED_BID_TWO_QUANTITY.modulo(MINIMUM_BID));

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

    const proposalPeriod = PROPOSAL_PERIOD;
    const rebalanceInterval = REBALANCE_INTERVAL;
    const auctionTimeToPivot = TIME_TO_PIVOT;
    const generalRebalancingData: GeneralRebalancingData = {
      proposalPeriod,
      rebalanceInterval,
      auctionTimeToPivot,
      createdBaseSets: [],
    };

    const issueRedeemSchedule: IssueRedeemSchedule = {
      issuances: [],
      redemptions: [],
    };
    const priceUpdate: TokenPrices = {
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
    const biddingSchedule: BidTxn[] = [bidTxnOne, bidTxnTwo];
    const cycleScenario: SingleRebalanceCycleScenario = {
      issueRedeemSchedule,
      priceUpdate,
      biddingSchedule,
    };

    const rebalanceIterations = 1;

    const scenarioData: FullRebalanceProgram = {
      generalRebalancingData,
      rebalanceIterations,
      cycleData: [cycleScenario],
    };

    btcEthRebalanceWrapper = new BTCETHMultipleRebalanceWrapper(accounts, scenarioData);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  async function subject(): Promise<void> {
    return btcEthRebalanceWrapper.runFullRebalanceProgram();
  }

  describe('rebalances with 2 bids', async () => {
    it.only('creates a set with the correct name', async () => {
      await subject();

      console.log(btcEthRebalanceWrapper.returnContractInfo());
    });
  });
});