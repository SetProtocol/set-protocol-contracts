require('module-alias/register');

import * as _ from 'lodash';
import { BigNumber } from 'bignumber.js';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { SetProtocolTestUtils, Web3Utils } from 'set-protocol-utils';

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
import {
  DEFAULT_AUCTION_PRICE_DENOMINATOR,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '@utils/constants';
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
  const DECIMAL_DIFFERENCE = WETH_DECIMALS - WBTC_DECIMALS;
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
  const UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY = BTC_ETH_ISSUE_QUANTITY
                                                    .mul(REBALANCING_SET_NATURAL_UNIT)
                                                    .div(REBALANCING_SET_UNIT_SHARES);

  // Round the number to a certain precision w/o rounding up
  const REBALANCING_SET_ISSUE_QUANTITY = UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY
    .minus(UNROUNDED_REBALANCING_SET_ISSUE_QUANTITY.modulo(REBALANCING_SET_NATURAL_UNIT));


  // Pre-Rebalance Value
  const INITIAL_QUANTITY_BASE_SET = REBALANCING_SET_ISSUE_QUANTITY
                                      .mul(REBALANCING_SET_UNIT_SHARES)
                                      .div(REBALANCING_SET_NATURAL_UNIT);
  const INITIAL_BTC_VALUE = INITIAL_QUANTITY_BASE_SET
                              .mul(INITIAL_BTC_UNIT)
                              .div(BTC_ETH_NATURAL_UNIT)
                              .mul(BTC_PRICE_PROPOSAL)
                              .div(10 ** WBTC_DECIMALS);
  const INITIAL_ETH_VALUE = INITIAL_QUANTITY_BASE_SET
                              .mul(INITIAL_ETH_UNIT)
                              .div(BTC_ETH_NATURAL_UNIT)
                              .mul(ETH_PRICE_INITIAL)
                              .div(10 ** WETH_DECIMALS);
  const PRE_REBALANCE_VALUE = INITIAL_BTC_VALUE.plus(INITIAL_ETH_VALUE);

  console.log("Initial Quantity base set", INITIAL_QUANTITY_BASE_SET.toString());

  console.log("Initial BTC Value", INITIAL_BTC_VALUE.toString());
  console.log("Initial ETH Value", INITIAL_ETH_VALUE.toString());


  

  // Rebalancing Details
  const SECONDS_PER_DAY = new BigNumber(86400);
  const REBALANCE_INTERVAL = new BigNumber(28).mul(SECONDS_PER_DAY);
  const PROPOSAL_PERIOD = new BigNumber(1).mul(SECONDS_PER_DAY);

  // Auction Constants
  const PRICE_DENOMINATOR = new BigNumber(1000);
  const TIME_TO_PIVOT = SECONDS_PER_DAY;

  // Bid Assumptions
  const MINIMUM_BID = PRICE_DENOMINATOR.mul(REBALANCING_SET_NATURAL_UNIT);
  const SECONDS_TO_FAIR_VALUE = TIME_TO_PIVOT.div(2);
  const BID_ONE_TIME_AFTER_FAIR_VALUE = new BigNumber(900);
  const BID_TWO_TIME_AFTER_FAIR_VALUE = new BigNumber(3600);
  const BID_ONE_MAX_INFLOW_ETH = new BigNumber(0.8).mul(10 ** 18);
  const BID_TWO_MAX_INFLOW_ETH = new BigNumber(0.5).mul(10 ** 18);
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

    console.log('1');

    await erc20Wrapper.approveTransfersAsync(
      [wrappedBTC],
      transferProxy.address
    );

    console.log('2');

    await wrappedETH.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    console.log('3');

    // Mint WETH
    await wrappedETH.deposit.sendTransactionAsync(
      {
        from: deployerAccount,
        value: REQUIRED_WETH.toString(),
      }
    );

    console.log('4');

    // Issue Rebalancing Set to the the deployer
    await coreMock.issue.sendTransactionAsync(
      baseBtcEthSet.address,
      BTC_ETH_ISSUE_QUANTITY,
    );

    console.log('5');

    await baseBtcEthSet.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    console.log('6');

    // Issue Rebalancing Set to the the deployer
    await coreMock.issue.sendTransactionAsync(
      rebalancingSetToken.address,
      REBALANCING_SET_ISSUE_QUANTITY,
    );

    console.log('7');

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

    console.log('8');

    // Call propose from Rebalance Manager
    await btcethRebalancingManager.propose.sendTransactionAsync(
      rebalancingSetToken.address,
    );

    const proposalPeriod = await rebalancingSetToken.proposalPeriod.callAsync();
    const rebalanceInterval = await rebalancingSetToken.rebalanceInterval.callAsync();

    await web3Utils.increaseTime(PROPOSAL_PERIOD.plus(1).toNumber());

    console.log('9');

    await rebalancingSetToken.startRebalance.sendTransactionAsync();

    console.log('10');

    // Move time to fair value
    await web3Utils.increaseTime(SECONDS_TO_FAIR_VALUE.toNumber());

    // Move time to X after Fair Value
    await web3Utils.increaseTime(SECONDS_TO_FAIR_VALUE.plus(BID_ONE_TIME_AFTER_FAIR_VALUE).plus(1).toNumber());

    console.log('11');

    // Perform Bid 1
    await wrappedETH.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      { from: bidderOneAccount }
    );

    // Mint WETH
    await wrappedETH.deposit.sendTransactionAsync(
      {
        from: bidderTwoAccount,
        value: BID_ONE_MAX_INFLOW_ETH.toString(),
      }
    );

    console.log('11.1');

    await rebalanceAuctionModule.bid.sendTransactionAsync(
      rebalancingSetToken.address,
      BID_ONE_QUANTITY,
      {
        from: bidderTwoAccount,
      }
    );

    console.log('12');

    // Move time to X after Fair Value
    // await web3Utils.increaseTime(BID_TWO_TIME_AFTER_FAIR_VALUE
    //                               .minus(BID_ONE_TIME_AFTER_FAIR_VALUE)
    //                               .toNumber()
    // );

    // Perform Bid 2
    await wrappedETH.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      { from: bidderTwoAccount }
    );

    // Mint WETH
    await wrappedETH.deposit.sendTransactionAsync(
      {
        from: bidderTwoAccount,
        value: BID_TWO_MAX_INFLOW_ETH.toString(),
      }
    );

    console.log('12.1');

    await rebalanceAuctionModule.bid.sendTransactionAsync(
      rebalancingSetToken.address,
      BID_TWO_QUANTITY,
      {
        from: bidderTwoAccount,
      }
    );

    console.log('13');
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('rebalances and settles after 2 bids', async () => {

    beforeEach(async () => {
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.settleRebalance.sendTransactionAsync();
    }

    // it('should work', async () => {
    //   await subject();
    // });

    it('should shouldnt exceed 1% slippage', async () => {
      await subject();

      console.log("Pre balance value", PRE_REBALANCE_VALUE.toString());
      
      const newBaseSetAddress = await rebalancingSetToken.currentSet.callAsync();
      const newBaseSetInstance = await coreWrapper.getSetInstance(newBaseSetAddress);
      const currentSetUnitShares = await rebalancingSetToken.unitShares.callAsync();

      const [bitcoinUnit, etherUnit] = await newBaseSetInstance.getUnits.callAsync();
      console.log("New Units", bitcoinUnit.toString(), etherUnit.toString());

      const newBaseSetNaturalUnit = await newBaseSetInstance.naturalUnit.callAsync();
      
      const currentSetRBSetBalance = await vault.getOwnerBalance.callAsync(newBaseSetAddress, rebalancingSetToken.address);
      const ownedBTCBalance = currentSetRBSetBalance.mul(bitcoinUnit).div(newBaseSetNaturalUnit);

      const ownedETHBalance = currentSetRBSetBalance.mul(etherUnit).div(newBaseSetNaturalUnit);

      const btcValue = ownedBTCBalance.mul(BTC_PRICE_PROPOSAL).div(10 ** WBTC_DECIMALS);
      const ethValue = ownedETHBalance.mul(ETH_PRICE_INITIAL).div(10 ** WETH_DECIMALS);
      const totalValue = btcValue.plus(ethValue);

      console.log("BTC Value", btcValue.toString());
      console.log("ETH Value", ethValue.toString());

      // console.log("Sum Value")



    });


  });
});
