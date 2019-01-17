require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, SetProtocolTestUtils, Web3Utils } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  BTCETHRebalancingManagerContract,
  CoreMockContract,
  LinearAuctionPriceCurveContract,
  MedianContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
  WethMockContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DENOMINATOR,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { OracleWrapper } from '@utils/wrappers/oracleWrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const RebalanceAuctionModule = artifacts.require('RebalanceAuctionModule');
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const web3Utils = new Web3Utils(web3);


contract('Rebalancing BTC-ETH 50/50', accounts => {
  const [
    deployerAccount,
    issuerAccount,
    bidderOneAccount,
    bidderTwoAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let factory: SetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
  let linearAuctionPriceCurve: LinearAuctionPriceCurveContract;
  let btcethRebalancingManager: BTCETHRebalancingManagerContract;
  let btcMedianizer: MedianContract;
  let ethMedianizer: MedianContract;

  let wrappedBTC: StandardTokenMockContract;
  let wrappedETH: WethMockContract;
  let baseBtcEthSet: SetTokenContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const rebalancingWrapper = new RebalancingWrapper(
    deployerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );
  const oracleWrapper = new OracleWrapper(deployerAccount);

  // Initial MKR Price Feed Values
  const BTC_PRICE_INITIAL = new BigNumber(3.711).mul(10 ** 21);
  const ETH_PRICE_INITIAL = new BigNumber(1.28).mul(10 ** 20);

  const BTC_PRICE_PROPOSAL = BTC_PRICE_INITIAL.mul(1.1);

  // Base Component Constants
  const WBTC_DECIMALS = 8;
  const WETH_DECIMALS = 18;
  const DECIMAL_DIFFERENCE = 18 - 8;
  const ETH_DECIMAL_EXPONENTIATION = new BigNumber(10 ** DECIMAL_DIFFERENCE);

  // Base Set Details
  const BTC_ETH_NATURAL_UNIT = new BigNumber(10 ** 10);
  const BTC_ETH_FULL_TOKEN_QUANTITY = new BigNumber(10 ** 18);
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
  const REQUIRED_WETH = BTC_ETH_ISSUE_QUANTITY.div(BTC_ETH_NATURAL_UNIT).mul(INITIAL_ETH_UNIT);
  const REBALANCING_SET_ISSUE_QUANTITY = BTC_ETH_ISSUE_QUANTITY
                                           .mul(REBALANCING_SET_UNIT_SHARES)
                                           .div(REBALANCING_SET_NATURAL_UNIT);

  // Rebalancing Details
  const SECONDS_PER_DAY = new BigNumber(86400);
  const REBALANCE_INTERVAL = new BigNumber(28).mul(SECONDS_PER_DAY);
  const PROPOSAL_PERIOD = new BigNumber(1).mul(SECONDS_PER_DAY);

  // Auction Constants
  const PRICE_DENOMINATOR = new BigNumber(1000);
  const TIME_TO_PIVOT = SECONDS_PER_DAY;

  // Bid Assumptions
  const SECONDS_TO_FAIR_VALUE = TIME_TO_PIVOT.div(2);
  const BID_ONE_TIME_AFTER_FAIR_VALUE = new BigNumber(900);
  const BID_TWO_TIME_AFTER_FAIR_VALUE = new BigNumber(3600);
  const BID_ONE_MAX_INFLOW_ETH = new BigNumber(0.7).mul(10 ** 18);
  const BID_TWO_MAX_INFLOW_ETH = new BigNumber(0.5).mul(10 ** 18);
  const BID_ONE_QUANTITY = REBALANCING_SET_ISSUE_QUANTITY.div(2);
  const BID_TWO_QUANTITY = REBALANCING_SET_ISSUE_QUANTITY.div(2);

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

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    coreMock = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    rebalanceAuctionModule = await coreWrapper.deployRebalanceAuctionModuleAsync(coreMock, vault);
    await coreWrapper.addModuleAsync(coreMock, rebalanceAuctionModule.address);

    factory = await coreWrapper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreWrapper.deployWhiteListAsync();
    rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );
    linearAuctionPriceCurve = await rebalancingWrapper.deployLinearAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_DENOMINATOR,
    );

    btcMedianizer = await oracleWrapper.deployMedianizerAsync();
    await oracleWrapper.addPriceFeedOwnerToMedianizer(btcMedianizer, deployerAccount);
    ethMedianizer = await oracleWrapper.deployMedianizerAsync();
    await oracleWrapper.addPriceFeedOwnerToMedianizer(ethMedianizer, deployerAccount);

    wrappedBTC = await erc20Wrapper.deployTokenAsync(deployerAccount, 8);
    wrappedETH = await erc20Wrapper.deployWrappedEtherAsync(deployerAccount);

    await coreWrapper.addTokensToWhiteList(
      [wrappedBTC.address, wrappedETH.address],
      rebalancingComponentWhiteList
    );

    btcethRebalancingManager = await rebalancingWrapper.deployBTCETHRebalancingManagerAsync(
      coreMock.address,
      btcMedianizer.address,
      ethMedianizer.address,
      wrappedBTC.address,
      wrappedETH.address,
      factory.address,
      linearAuctionPriceCurve.address,
      TIME_TO_PIVOT,
    );

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreWrapper.addFactoryAsync(coreMock, rebalancingFactory);
    await coreWrapper.addAuthorizationAsync(vault, rebalanceAuctionModule.address);

    baseBtcEthSet = await coreWrapper.createSetTokenAsync(
      coreMock,
      factory.address,
      [wrappedBTC.address, wrappedETH.address],
      [INITIAL_BTC_UNIT, INITIAL_ETH_UNIT],
      BTC_ETH_NATURAL_UNIT,
    );

    console.log("Proposal period before encoding", PROPOSAL_PERIOD.toString());
    console.log("RB Interval before encoding", REBALANCE_INTERVAL.toString());

    const rebalancingSetCallData = SetUtils.generateRSetTokenCallData(
      btcethRebalancingManager.address,
      PROPOSAL_PERIOD,
      REBALANCE_INTERVAL,
    );

    rebalancingSetToken = await rebalancingWrapper.createRebalancingTokenAsync(
      coreMock,
      rebalancingFactory.address,
      [baseBtcEthSet.address],
      [REBALANCING_SET_UNIT_SHARES],
      REBALANCING_SET_NATURAL_UNIT,
      rebalancingSetCallData,
    );

    await oracleWrapper.updateMedianizerPriceAsync(
      btcMedianizer,
      BTC_PRICE_INITIAL,
      SetProtocolTestUtils.generateTimestamp(1000),
    );

    await oracleWrapper.updateMedianizerPriceAsync(
      ethMedianizer,
      ETH_PRICE_INITIAL,
      SetProtocolTestUtils.generateTimestamp(1000),
    );

    await rebalancingWrapper.addPriceLibraryAsync(
      coreMock,
      linearAuctionPriceCurve,
    );

    console.log("1");

    await erc20Wrapper.approveTransfersAsync(
      [wrappedBTC],
      transferProxy.address
    );

    console.log("2");

    await wrappedETH.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    console.log("3");

    // Mint WETH
    await wrappedETH.deposit.sendTransactionAsync(
      {
        from: deployerAccount,
        value: REQUIRED_WETH.toString(),
      }
    );

    console.log("4");

    // Issue Rebalancing Set to the the deployer
    await coreMock.issue.sendTransactionAsync(
      baseBtcEthSet.address,
      BTC_ETH_ISSUE_QUANTITY,
    );

    console.log("5");

    await baseBtcEthSet.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    console.log("6");

    // Issue Rebalancing Set to the the deployer
    await coreMock.issue.sendTransactionAsync(
      rebalancingSetToken.address,
      REBALANCING_SET_ISSUE_QUANTITY,
    );

    console.log("7");

    await oracleWrapper.updateMedianizerPriceAsync(
      btcMedianizer,
      BTC_PRICE_PROPOSAL,
      SetProtocolTestUtils.generateTimestamp(1000),
    );

    await oracleWrapper.updateMedianizerPriceAsync(
      ethMedianizer,
      ETH_PRICE_INITIAL,
      SetProtocolTestUtils.generateTimestamp(1000),
    );

    // Fast forward the rebalance interval
    await web3Utils.increaseTime(REBALANCE_INTERVAL.plus(1).toNumber());

    console.log("8");

    // Call propose from Rebalance Manager
    await btcethRebalancingManager.propose.sendTransactionAsync(
      rebalancingSetToken.address,
    );

    console.log("Proposal increase time figure", PROPOSAL_PERIOD.plus(1).toNumber());

    const proposalPeriod = await rebalancingSetToken.proposalPeriod.callAsync();
    const rebalanceInterval = await rebalancingSetToken.rebalanceInterval.callAsync();

    console.log("RB proposal period", proposalPeriod.toString());
    console.log("RB rebalance interval", rebalanceInterval.toString());

    await web3Utils.increaseTime(PROPOSAL_PERIOD.mul(2).toNumber());

    console.log("9");

    await rebalancingSetToken.startRebalance.sendTransactionAsync();

    console.log("10");

    // await web3Utils.increaseTime(SECONDS_TO_FAIR_VALUE.plus(1).toNumber());

    // // Move time to X after Fair Value
    // await web3Utils.increaseTime(SECONDS_TO_FAIR_VALUE.plus(1).toNumber());


    // console.log("11");

    // // Perform Bid 1
    // await wrappedETH.approve.sendTransactionAsync(
    //   transferProxy.address,
    //   UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    //   { from: bidderOneAccount }
    // );

    // // Mint WETH
    // await wrappedETH.deposit.sendTransactionAsync(
    //   {
    //     from: deployerAccount,
    //     value: BID_ONE_MAX_INFLOW_ETH.toString(),
    //   }
    // );

    // await rebalanceAuctionModule.bid.sendTransactionAsync(
    //   rebalancingSetToken.address,
    //   BID_ONE_QUANTITY,
    //   {
    //     from: deployerAccount,
    //   }
    // );

    // Move time to X after Fair Value
    // Perform Bid 2


  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('rebalances with 2 bids', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetTokenQuantityToIssue: BigNumber;

    beforeEach(async () => {
    });

    async function subject(): Promise<string> {
      console.log("100");


      return rebalancingSetToken.settleRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should work', async () => {
      await subject();
    });

    
  });
});
