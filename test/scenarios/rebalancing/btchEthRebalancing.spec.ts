require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'set-protocol-utils';
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
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const web3Utils = new Web3Utils(web3);


contract('Rebalancing BTC-ETH 50/50', accounts => {
  const [
    deployerAccount,
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
  const BID_ONE_MAX_INFLOW_ETH = new BigNumber(8).mul(10 ** 17);
  const BID_TWO_MAX_INFLOW_ETH = new BigNumber(5).mul(10 ** 17);
  const UNROUNDED_BID_ONE_QUANTITY = BTC_ETH_ISSUE_QUANTITY.div(2);
  const UNROUNDED_BID_TWO_QUANTITY = BTC_ETH_ISSUE_QUANTITY.div(2).minus(MINIMUM_BID);
  const BID_ONE_QUANTITY = UNROUNDED_BID_ONE_QUANTITY.minus(UNROUNDED_BID_ONE_QUANTITY.modulo(MINIMUM_BID));
  const BID_TWO_QUANTITY = UNROUNDED_BID_TWO_QUANTITY.minus(UNROUNDED_BID_TWO_QUANTITY.modulo(MINIMUM_BID));
  const MAX_SLIPPAGE = new BigNumber(0.015); // 1 Percent Slippage

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
      true,
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

    const btcMultiplier = new BigNumber(1);
    const ethMultiplier = new BigNumber(1);
    btcethRebalancingManager = await rebalancingWrapper.deployBTCETHRebalancingManagerAsync(
      coreMock.address,
      btcMedianizer.address,
      ethMedianizer.address,
      wrappedBTC.address,
      wrappedETH.address,
      factory.address,
      linearAuctionPriceCurve.address,
      TIME_TO_PIVOT,
      [btcMultiplier, ethMultiplier],
      [new BigNumber(48), new BigNumber(52)],
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

    await erc20Wrapper.approveTransfersAsync(
      [wrappedBTC],
      transferProxy.address
    );

    await wrappedETH.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    // Mint WETH
    await wrappedETH.deposit.sendTransactionAsync(
      {
        from: deployerAccount,
        value: REQUIRED_WETH.toString(),
      }
    );

    // Issue Rebalancing Set to the the deployer
    await coreMock.issue.sendTransactionAsync(
      baseBtcEthSet.address,
      BTC_ETH_ISSUE_QUANTITY,
    );

    await baseBtcEthSet.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    // Issue Rebalancing Set to the the deployer
    await coreMock.issue.sendTransactionAsync(
      rebalancingSetToken.address,
      REBALANCING_SET_ISSUE_QUANTITY,
    );

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

    // Call propose from Rebalance Manager
    await btcethRebalancingManager.propose.sendTransactionAsync(
      rebalancingSetToken.address,
    );

    await web3Utils.increaseTime(PROPOSAL_PERIOD.plus(1).toNumber());

    await rebalancingSetToken.startRebalance.sendTransactionAsync();

    // Move time to X after Fair Value
    await web3Utils.increaseTime(SECONDS_TO_FAIR_VALUE.plus(BID_ONE_TIME_AFTER_FAIR_VALUE).plus(1).toNumber());

    // Perform Bid 1
    await wrappedETH.approve.sendTransactionAsync(
      transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      { from: bidderOneAccount }
    );

    // Mint WETH
    await wrappedETH.deposit.sendTransactionAsync(
      {
        from: bidderOneAccount,
        value: BID_ONE_MAX_INFLOW_ETH.toString(),
      }
    );

    await rebalanceAuctionModule.bid.sendTransactionAsync(
      rebalancingSetToken.address,
      BID_ONE_QUANTITY,
      {
        from: bidderOneAccount,
      }
    );

    // Move time to X after Fair Value
    await web3Utils.increaseTime(BID_TWO_TIME_AFTER_FAIR_VALUE
                                  .minus(BID_ONE_TIME_AFTER_FAIR_VALUE)
                                  .toNumber()
    );

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

    await rebalanceAuctionModule.bid.sendTransactionAsync(
      rebalancingSetToken.address,
      BID_TWO_QUANTITY,
      {
        from: bidderTwoAccount,
      }
    );
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('settles the rebalance after 2 bids', async () => {
    async function subject(): Promise<string> {
      return rebalancingSetToken.settleRebalance.sendTransactionAsync();
    }

    it('should shouldnt exceed 1% slippage', async () => {
      await subject();

      const newBaseSetAddress = await rebalancingSetToken.currentSet.callAsync();
      const newBaseSetInstance = await coreWrapper.getSetInstance(newBaseSetAddress);

      const [bitcoinUnit, etherUnit] = await newBaseSetInstance.getUnits.callAsync();

      const newBaseSetNaturalUnit = await newBaseSetInstance.naturalUnit.callAsync();

      const currentSetRBSetBalance = await vault.getOwnerBalance.callAsync(
        newBaseSetAddress,
        rebalancingSetToken.address
      );

      const ownedBTCBalance = currentSetRBSetBalance.mul(bitcoinUnit).div(newBaseSetNaturalUnit);

      const ownedETHBalance = currentSetRBSetBalance.mul(etherUnit).div(newBaseSetNaturalUnit);

      const btcValue = ownedBTCBalance.mul(BTC_PRICE_PROPOSAL).div(10 ** WBTC_DECIMALS);
      const ethValue = ownedETHBalance.mul(ETH_PRICE_INITIAL).div(10 ** WETH_DECIMALS);
      const totalValue = btcValue.plus(ethValue);

      const percentOfPreRebalanceValue = totalValue.div(PRE_REBALANCE_VALUE);

      const slippage = new BigNumber(1).minus(percentOfPreRebalanceValue);

      expect(slippage).to.bignumber.be.lessThan(MAX_SLIPPAGE);

    });

    it('should be in the right rebalance state', async () => {
      await subject();

      const rebalanceState = await rebalancingSetToken.rebalanceState.callAsync();

      expect(rebalanceState).to.bignumber.equal(0);
    });

    it('should have the correct next Set BTC units', async () => {
      const expectedBTCUnit = new BigNumber(1);

      await subject();

      const newBaseSetAddress = await rebalancingSetToken.currentSet.callAsync();
      const newBaseSetInstance = await coreWrapper.getSetInstance(newBaseSetAddress);

      const [bitcoinUnit] = await newBaseSetInstance.getUnits.callAsync();
      expect(bitcoinUnit).to.bignumber.equal(expectedBTCUnit);
    });

    it('should have the correct next Set WETH units', async () => {
      const expecetdEtherUnit = new BigNumber(318914062500);
      await subject();

      const newBaseSetAddress = await rebalancingSetToken.currentSet.callAsync();
      const newBaseSetInstance = await coreWrapper.getSetInstance(newBaseSetAddress);

      const [, etherUnit] = await newBaseSetInstance.getUnits.callAsync();
      expect(etherUnit).to.bignumber.equal(expecetdEtherUnit);
    });

    it('should increase bidder ones BTC Balance by a minimum amount', async () => {
      const MINIMUM_BTC_OUTFLOW = new BigNumber(0.0247).mul(10 ** WBTC_DECIMALS);

      // Instead of checking balance, we have to check the vault
      const preBidBitcoinBalance = await wrappedBTC.balanceOf.callAsync(bidderOneAccount);

      await subject();

      const btcVaultBalance = await vault.getOwnerBalance.callAsync(wrappedBTC.address, bidderOneAccount);

      await coreMock.withdraw.sendTransactionAsync(wrappedBTC.address, btcVaultBalance, { from: bidderOneAccount });

      const postBidBitcoinBalance = await wrappedBTC.balanceOf.callAsync(bidderOneAccount);

      const bitcoinAcquired = postBidBitcoinBalance.minus(preBidBitcoinBalance);

      expect(bitcoinAcquired).to.bignumber.be.greaterThan(MINIMUM_BTC_OUTFLOW);
    });

    it('should decrease bidder ones WETH Balance by a maximum amount', async () => {
      const MAXIMUM_ETH_INFLOW = new BigNumber(0.7).mul(10 ** WETH_DECIMALS);

      const preBidWethBalance = await wrappedETH.balanceOf.callAsync(bidderOneAccount);

      await subject();

      const postBidWethBalance = await wrappedETH.balanceOf.callAsync(bidderOneAccount);

      const wethSpent = preBidWethBalance.minus(postBidWethBalance);

      expect(wethSpent).to.bignumber.be.lessThan(MAXIMUM_ETH_INFLOW);
    });

    it('should increase bidder twos BTC Balance by a minimum amount', async () => {
      const MINIMUM_BTC_OUTFLOW = new BigNumber(0.03).mul(10 ** WBTC_DECIMALS);

      // Instead of checking balance, we have to check the vault
      const preBidBitcoinBalance = await wrappedBTC.balanceOf.callAsync(bidderTwoAccount);

      await subject();

      const btcVaultBalance = await vault.getOwnerBalance.callAsync(wrappedBTC.address, bidderTwoAccount);

      await coreMock.withdraw.sendTransactionAsync(wrappedBTC.address, btcVaultBalance, { from: bidderTwoAccount });

      const postBidBitcoinBalance = await wrappedBTC.balanceOf.callAsync(bidderTwoAccount);

      const bitcoinAcquired = postBidBitcoinBalance.minus(preBidBitcoinBalance);

      expect(bitcoinAcquired).to.bignumber.be.greaterThan(MINIMUM_BTC_OUTFLOW);
    });

    it('should decrease bidder two WETH Balance by a maximum amount', async () => {
      const MAXIMUM_ETH_INFLOW = new BigNumber(0.5).mul(10 ** WETH_DECIMALS);

      const preBidWethBalance = await wrappedETH.balanceOf.callAsync(bidderTwoAccount);

      await subject();

      const postBidWethBalance = await wrappedETH.balanceOf.callAsync(bidderTwoAccount);

      const wethSpent = preBidWethBalance.minus(postBidWethBalance);

      expect(wethSpent).to.bignumber.be.lessThan(MAXIMUM_ETH_INFLOW);
    });
  });
});
