require('module-alias/register');

import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Web3Utils } from 'set-protocol-utils';
import { BigNumber } from 'set-protocol-utils';

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
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '@utils/constants';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import {
  UserAccountData,
  TokenBalances,
  UserTokenBalances,
  IssuanceTxn,
  IssuanceSchedule,
  TokenPrices,
  BidTxn,
  SingleRebalanceCycleScenario,
  FullRebalanceProgram,
  DataOutput,
} from './types';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { OracleWrapper } from '@utils/wrappers/oracleWrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const blockchain = new Blockchain(web3);
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const web3Utils = new Web3Utils(web3);

export class BTCETHMultipleRebalanceWrapper {
  private _accounts: UserAccountData;
  private _rebalanceProgram: FullRebalanceProgram;
  private _dataLogger: DataOutput;

  private _contractOwnerAddress: Address;
  private _coreWrapper: CoreWrapper;
  private _erc20Wrapper: ERC20Wrapper;
  private _oracleWrapper: OracleWrapper;
  private _rebalancingWrapper: RebalancingWrapper;

  private _rebalancingSetToken: RebalancingSetTokenContract;

  private _coreMock: CoreMockContract;
  private _transferProxy: TransferProxyContract;
  private _vault: VaultContract;
  private _rebalanceAuctionModule: RebalanceAuctionModuleContract;
  private _factory: SetTokenFactoryContract;
  private _rebalancingComponentWhiteList: WhiteListContract;
  private _rebalancingFactory: RebalancingSetTokenFactoryContract;
  private _linearAuctionPriceCurve: LinearAuctionPriceCurveContract;
  private _btcethRebalancingManager: BTCETHRebalancingManagerContract;
  private _btcMedianizer: MedianContract;
  private _ethMedianizer: MedianContract;

  private _wrappedBTC: StandardTokenMockContract;
  private _wrappedETH: WethMockContract;
  private _initialBtcEthSet: SetTokenContract;

  constructor(otherAccounts: Address[], rebalanceProgram: FullRebalanceProgram, profileGas: boolean = false) {
    this._contractOwnerAddress = otherAccounts[0];
    this._accounts = this._createAccountPersonalitiesAsync(otherAccounts);
    this._validateScenarioObject(rebalanceProgram);
    this._rebalanceProgram = rebalanceProgram;
    this._dataLogger = {
      collateralizingSets: [],
      issuedRebalancingSets: [],
      rebalanceFairValues: [],
      rebalancingSetBaseSetDust: [],
      rebalancingSetComponentDust: [],
      gasProfile: {},
    };

    this._coreWrapper = new CoreWrapper(this._contractOwnerAddress, this._contractOwnerAddress);
    this._erc20Wrapper = new ERC20Wrapper(this._contractOwnerAddress);
    this._rebalancingWrapper = new RebalancingWrapper(
      this._contractOwnerAddress,
      this._coreWrapper,
      this._erc20Wrapper,
      blockchain
    );
    this._oracleWrapper = new OracleWrapper(this._contractOwnerAddress);
  }

  public async runFullRebalanceProgram(): Promise<DataOutput> {
    await this.deployAndAuthorizeCoreContractsAsync();
    await this.createRebalancingSetToken();
    await this.distributeTokensAndMintSets();
    await this.runRebalanceScenario(this._rebalanceProgram.cycleData);
    return this._dataLogger;
  }

  public async deployAndAuthorizeCoreContractsAsync(
    deployerAccount: Address = this._contractOwnerAddress,
  ): Promise<void> {
    // Deploy core contracts
    this._transferProxy = await this._coreWrapper.deployTransferProxyAsync();
    this._dataLogger.gasProfile.transferProxy = await this._extractGasCostFromLatestBlockAsync();

    this._vault = await this._coreWrapper.deployVaultAsync();
    this._dataLogger.gasProfile.vault = await this._extractGasCostFromLatestBlockAsync();

    this._coreMock = await this._coreWrapper.deployCoreMockAsync(this._transferProxy, this._vault);
    this._dataLogger.gasProfile.coreMock = await this._extractGasCostFromLatestBlockAsync();

    this._rebalanceAuctionModule = await this._coreWrapper.deployRebalanceAuctionModuleAsync(
      this._coreMock,
      this._vault
    );
    this._dataLogger.gasProfile.rebalanceAuctionModule = await this._extractGasCostFromLatestBlockAsync();

    await this._coreWrapper.addModuleAsync(this._coreMock, this._rebalanceAuctionModule.address);

    this._factory = await this._coreWrapper.deploySetTokenFactoryAsync(this._coreMock.address);
    this._dataLogger.gasProfile.factory = await this._extractGasCostFromLatestBlockAsync();

    this._rebalancingComponentWhiteList = await this._coreWrapper.deployWhiteListAsync();
    this._dataLogger.gasProfile.rebalancingComponentWhiteList = await this._extractGasCostFromLatestBlockAsync();

    this._rebalancingFactory = await this._coreWrapper.deployRebalancingSetTokenFactoryAsync(
      this._coreMock.address,
      this._rebalancingComponentWhiteList.address,
    );
    this._dataLogger.gasProfile.rebalancingFactory = await this._extractGasCostFromLatestBlockAsync();

    this._linearAuctionPriceCurve = await this._rebalancingWrapper.deployLinearAuctionPriceCurveAsync(
      this._rebalanceProgram.initializationParams.priceDivisor,
      true
    );
    this._dataLogger.gasProfile.linearAuctionPriceCurve = await this._extractGasCostFromLatestBlockAsync();

    // Deploy Oracles and set initial prices
    this._btcMedianizer = await this._oracleWrapper.deployMedianizerAsync();
    await this._oracleWrapper.addPriceFeedOwnerToMedianizer(this._btcMedianizer, deployerAccount);
    this._ethMedianizer = await this._oracleWrapper.deployMedianizerAsync();
    await this._oracleWrapper.addPriceFeedOwnerToMedianizer(this._ethMedianizer, deployerAccount);

    await this._oracleWrapper.updateMedianizerPriceAsync(
      this._btcMedianizer,
      this._rebalanceProgram.initializationParams.initialTokenPrices.WBTCPrice,
      SetTestUtils.generateTimestamp(1000),
    );
    await this._oracleWrapper.updateMedianizerPriceAsync(
      this._ethMedianizer,
      this._rebalanceProgram.initializationParams.initialTokenPrices.WETHPrice,
      SetTestUtils.generateTimestamp(1000),
    );

    // Deploy WBTC, WETH and add tokens to whitelise
    this._wrappedBTC = await this._erc20Wrapper.deployTokenAsync(deployerAccount, 8);
    this._wrappedETH = await this._erc20Wrapper.deployWrappedEtherAsync(deployerAccount);

    await this._coreWrapper.addTokensToWhiteList(
      [this._wrappedBTC.address, this._wrappedETH.address],
      this._rebalancingComponentWhiteList
    );
    this._dataLogger.gasProfile.addTokenToWhiteList = await this._extractGasCostFromLatestBlockAsync();

    // Deploy manager contract
    this._btcethRebalancingManager = await this._rebalancingWrapper.deployBTCETHRebalancingManagerAsync(
      this._coreMock.address,
      this._btcMedianizer.address,
      this._ethMedianizer.address,
      this._wrappedBTC.address,
      this._wrappedETH.address,
      this._factory.address,
      this._linearAuctionPriceCurve.address,
      this._rebalanceProgram.initializationParams.auctionTimeToPivot,
      [
        this._rebalanceProgram.initializationParams.btcMultiplier,
        this._rebalanceProgram.initializationParams.ethMultiplier,
      ],
      [
        this._rebalanceProgram.initializationParams.lowerAllocationBound,
        this._rebalanceProgram.initializationParams.upperAllocationBound,
      ]
    );
    this._dataLogger.gasProfile.btcethRebalancingManager = await this._extractGasCostFromLatestBlockAsync();

    // Add authorizations to system
    await this._coreWrapper.setDefaultStateAndAuthorizationsAsync(
      this._coreMock,
      this._vault,
      this._transferProxy,
      this._factory
    );
    await this._coreWrapper.addFactoryAsync(this._coreMock, this._rebalancingFactory);
    await this._rebalancingWrapper.addPriceLibraryAsync(
      this._coreMock,
      this._linearAuctionPriceCurve,
    );
  }

  public async createRebalancingSetToken(): Promise<void> {
    this._initialBtcEthSet = await this._coreWrapper.createSetTokenAsync(
      this._coreMock,
      this._factory.address,
      [this._wrappedBTC.address, this._wrappedETH.address],
      this._rebalanceProgram.initializationParams.initialSetUnits,
      this._rebalanceProgram.initializationParams.initialSetNaturalUnit,
    );
    this._dataLogger.gasProfile.createInitialBaseSet = await this._extractGasCostFromLatestBlockAsync();
    this._rebalanceProgram.generalRebalancingData.baseSets.push(
      this._initialBtcEthSet.address
    );

    const rebalancingSetCallData = SetUtils.generateRebalancingSetTokenCallData(
      this._btcethRebalancingManager.address,
      this._rebalanceProgram.initializationParams.proposalPeriod,
      this._rebalanceProgram.initializationParams.rebalanceInterval,
    );

    this._rebalancingSetToken = await this._rebalancingWrapper.createRebalancingTokenAsync(
      this._coreMock,
      this._rebalancingFactory.address,
      [this._initialBtcEthSet.address],
      this._rebalanceProgram.initializationParams.rebalancingSetUnitShares,
      this._rebalanceProgram.initializationParams.rebalancingSetNaturalUnit,
      rebalancingSetCallData,
    );
    this._dataLogger.gasProfile.createRebalancingSet = await this._extractGasCostFromLatestBlockAsync();
  }

  public async distributeTokensAndMintSets(): Promise<void> {
    // Issue Rebalancing Sets using _contractOwnerAddress tokens and distrubuted to owner group
    await this._issueAndDistributeRebalancingSetsAsync();

    // Distribute tokens to bidding accounts
    await this._distributeBtcAndEthToBiddersAsync();
  }

  public async runRebalanceScenario(
    scenarios: SingleRebalanceCycleScenario[],
  ): Promise<void> {
    // For each rebalance iteration
    for (let i = 0; i < this._rebalanceProgram.rebalanceIterations; i++) {
      const scenario = scenarios[i];

      // Issue and Redeem Sets
      await this._executeIssuanceScheduleAsync(scenario.issueRedeemSchedule);

      // Run Proposal (change prices) and transtion to rebalance
      await this._proposeAndTransitionToRebalanceAsync(scenario.priceUpdate);

      // Run bidding program
      await this._executeBiddingScheduleAsync(scenario.biddingSchedule, scenario.priceUpdate);
      // Finish rebalance cycle and log outputs
      await this._settleRebalanceAndLogState();
    }
  }

  public async returnAllUserTokenBalancesAsync(): Promise<UserTokenBalances> {
    let allUserTokenBalances: UserTokenBalances;

    const bidderOne = await this._getTokenBalancesAsync(this._accounts.bidderOne);
    const bidderTwo = await this._getTokenBalancesAsync(this._accounts.bidderTwo);
    const bidderThree = await this._getTokenBalancesAsync(this._accounts.bidderThree);
    const bidderFour = await this._getTokenBalancesAsync(this._accounts.bidderFour);
    const bidderFive = await this._getTokenBalancesAsync(this._accounts.bidderFive);

    const tokenOwnerOne = await this._getTokenBalancesAsync(this._accounts.tokenOwnerOne);
    const tokenOwnerTwo = await this._getTokenBalancesAsync(this._accounts.tokenOwnerTwo);
    const tokenOwnerThree = await this._getTokenBalancesAsync(this._accounts.tokenOwnerThree);
    const tokenOwnerFour = await this._getTokenBalancesAsync(this._accounts.tokenOwnerFour);
    const tokenOwnerFive = await this._getTokenBalancesAsync(this._accounts.tokenOwnerFive);

    allUserTokenBalances = {
      bidderOne,
      bidderTwo,
      bidderThree,
      bidderFour,
      bidderFive,
      tokenOwnerOne,
      tokenOwnerTwo,
      tokenOwnerThree,
      tokenOwnerFour,
      tokenOwnerFive,
    };
    return allUserTokenBalances;
  }

  /* ============ Private ============ */

  private _validateScenarioObject(
    rebalanceProgram: FullRebalanceProgram,
  ): void {
    if (rebalanceProgram.rebalanceIterations != rebalanceProgram.cycleData.length) {
      throw new Error('Provided rebalance iterations does not match cycle data');
    }

    let lastBidPrice: BigNumber;
    for (let i = 0; i < rebalanceProgram.rebalanceIterations; i++) {
      lastBidPrice = new BigNumber(-1);
      for (let j = 0; j < rebalanceProgram.cycleData[i].biddingSchedule.length; j++) {
        const bid = rebalanceProgram.cycleData[i].biddingSchedule[j];
        if (lastBidPrice.greaterThan(bid.price)) {
          throw new Error('Bids must be placed in ascending price order');
        }
        lastBidPrice = bid.price;
      }
    }
  }

  private _createAccountPersonalitiesAsync(
    accounts: Address[],
  ): UserAccountData {
    const personalities = {
      bidderOne: accounts[1],
      bidderTwo: accounts[2],
      bidderThree: accounts[3],
      bidderFour: accounts[4],
      bidderFive: accounts[5],
      tokenOwnerOne: accounts[6],
      tokenOwnerTwo: accounts[7],
      tokenOwnerThree: accounts[8],
      tokenOwnerFour: accounts[9],
      tokenOwnerFive: accounts[10],
      bidders: accounts.slice(1, 6),
      tokenOwners: accounts.slice(6, 11),
    };

    return personalities;
  }

  private async _issueAndDistributeRebalancingSetsAsync(): Promise<void> {
    // Approve transfers for WBTC and WETH
    await this._erc20Wrapper.approveTransfersAsync(
      [this._wrappedBTC],
      this._transferProxy.address
    );

    await this._wrappedETH.approve.sendTransactionAsync(
      this._transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    // Issue Rebalancing Set to the the deployer
    const txHashIssueBase = await this._coreMock.issue.sendTransactionAsync(
      this._initialBtcEthSet.address,
      this._rebalanceProgram.initializationParams.initialSetIssueQuantity,
    );
    this._dataLogger.gasProfile.issueInitialBaseSet = await this._extractGasCostAsync(
      txHashIssueBase
    );

    await this._initialBtcEthSet.approve.sendTransactionAsync(
      this._transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    // Issue Rebalancing Set to the the deployer
    const txHashIssueRebalancing = await this._coreMock.issue.sendTransactionAsync(
      this._rebalancingSetToken.address,
      this._rebalanceProgram.initializationParams.rebalancingSetIssueQuantity,
    );
    this._dataLogger.gasProfile.issueRebalancingSet = await this._extractGasCostAsync(
      txHashIssueRebalancing
    );

    // Transfer RebalancingSetToken amounts to bidders
    const transferRebalancingSetPromises = _.map(
      this._accounts.tokenOwners,
      address => this._rebalancingSetToken.transfer.sendTransactionAsync(
        address,
        this._rebalanceProgram.initializationParams.rebalancingSetIssueQuantity.div(5),
        { from: this._contractOwnerAddress },
      )
    );
    await Promise.all(transferRebalancingSetPromises);

    this._dataLogger.collateralizingSets.push(
      await this._vault.getOwnerBalance.callAsync(
        this._initialBtcEthSet.address,
        this._rebalancingSetToken.address,
      )
    );

    this._dataLogger.issuedRebalancingSets.push(
      await this._rebalancingSetToken.totalSupply.callAsync()
    );
  }

  private async _distributeBtcAndEthToBiddersAsync(): Promise<void> {
    // Transfer WBTC amounts to bidders
    const transferWBTCPromises = _.map(
      this._accounts.bidders,
      address => this._wrappedBTC.transfer.sendTransactionAsync(
        address,
        new BigNumber(10 ** 19),
        { from: this._contractOwnerAddress },
      )
    );
    await Promise.all(transferWBTCPromises);

    // Transfer WETH amounts to bidders
    const transferWETHPromises = _.map(
      this._accounts.bidders,
      address => this._wrappedETH.transfer.sendTransactionAsync(
        address,
        new BigNumber(10 ** 19),
        { from: this._contractOwnerAddress },
      )
    );
    await Promise.all(transferWETHPromises);

    // Approve WBTC amounts for bidders to transferProxy
    const approveWBTCPromises = _.map(
      this._accounts.bidders,
      address => this._wrappedBTC.approve.sendTransactionAsync(
        this._transferProxy.address,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: address },
      )
    );
    await Promise.all(approveWBTCPromises);

    // Approve WETH amounts for bidders to transferProxy
    const approveWETHPromises = _.map(
      this._accounts.bidders,
      address => this._wrappedETH.approve.sendTransactionAsync(
        this._transferProxy.address,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: address },
      )
    );
    await Promise.all(approveWETHPromises);
  }

  private async _executeIssuanceScheduleAsync(
    scehdule: IssuanceSchedule,
  ): Promise<void> {
    // Execute issuances
    const issuancePromises = _.map(
      scehdule.issuances,
      txn => this._issueRebalancingSetsAsync(
        txn,
      )
    );
    await Promise.all(issuancePromises);

    // Execute redemptions
    const redemptionPromises = _.map(
      scehdule.redemptions,
      txn => this._redeemRebalancingSetsAsync(
        txn,
      )
    );
    await Promise.all(redemptionPromises);
  }

  private async _proposeAndTransitionToRebalanceAsync(
    newPrices: TokenPrices,
  ): Promise<void> {

    await this._oracleWrapper.updateMedianizerPriceAsync(
      this._btcMedianizer,
      newPrices.WBTCPrice,
      SetTestUtils.generateTimestamp(1000),
    );


    await this._oracleWrapper.updateMedianizerPriceAsync(
      this._ethMedianizer,
      newPrices.WETHPrice,
      SetTestUtils.generateTimestamp(1000),
    );

    // Fast forward the rebalance interval
    await web3Utils.increaseTime(
      this._rebalanceProgram.initializationParams.rebalanceInterval.plus(1).toNumber()
    );


    // Call propose from Rebalance Manager and log propose data
    const txHashPropose = await this._btcethRebalancingManager.propose.sendTransactionAsync(
      this._rebalancingSetToken.address,
    );
    await this._logPostProposeDataAsync(txHashPropose);

    await web3Utils.increaseTime(
      this._rebalanceProgram.initializationParams.proposalPeriod.mul(2).toNumber()
    );


    const txHashStartRebalance = await this._rebalancingSetToken.startRebalance.sendTransactionAsync();
    await this._logPostStartRebalanceDataAsync(txHashStartRebalance);

  }

  private async _executeBiddingScheduleAsync(
    schedule: BidTxn[],
    tokenPrices: TokenPrices,
  ): Promise<void> {
    let cumulativeTime: number = 0;

    for (let i = 0; i < schedule.length; i++) {
      const bid = schedule[i];

      const bidPrice = await this._calculateImpliedBidPriceAsync(bid.price, tokenPrices);
      const bidTime = await this._calculateImpliedBidTimeAsync(bidPrice);
      const timeJump = bidTime - cumulativeTime;

      const bidAmount = this._calculateImpliedBidAmount(bid.amount);
      await web3Utils.increaseTime(timeJump);

      await this._rebalanceAuctionModule.bid.sendTransactionAsync(
        this._rebalancingSetToken.address,
        bidAmount,
        false,
        { from: bid.sender }
      );
      cumulativeTime += timeJump;
    }

    await this._executeBidCleanUpAsync(schedule[schedule.length - 1].sender);
  }

  private async _settleRebalanceAndLogState(): Promise<void> {
    const txHashSettle = await this._rebalancingSetToken.settleRebalance.sendTransactionAsync();
    this._dataLogger.gasProfile.settleRebalance = await this._extractGasCostAsync(
      txHashSettle
    );


    this._dataLogger.collateralizingSets.push(
      await this._vault.getOwnerBalance.callAsync(
        this._getRecentBaseSet(),
        this._rebalancingSetToken.address,
      )
    );

    this._dataLogger.issuedRebalancingSets.push(
      await this._rebalancingSetToken.totalSupply.callAsync()
    );

    this._dataLogger.rebalancingSetBaseSetDust.push(
      await this._vault.getOwnerBalance.callAsync(
        this._rebalanceProgram.generalRebalancingData.baseSets.slice(-2)[0],
        this._rebalancingSetToken.address
      )
    );

    this._dataLogger.rebalancingSetComponentDust.push(
      await this._getTokenBalancesAsync(
        this._rebalancingSetToken.address
      )
    );
  }

  private async _issueRebalancingSetsAsync(
    issuance: IssuanceTxn,
  ): Promise<void> {
    const currentSetInstance = await this._rebalancingWrapper.getExpectedSetTokenAsync(
      this._getRecentBaseSet()
    );
    const currentSetNaturalUnit = await currentSetInstance.naturalUnit.callAsync();

    const rebalancingSetUnitShares = await this._rebalancingSetToken.unitShares.callAsync();
    const rebalancingSetNaturalUnit = await this._rebalancingSetToken.naturalUnit.callAsync();
    const currentSetRequiredAmountUnrounded = issuance.amount
                                       .mul(rebalancingSetUnitShares)
                                       .div(rebalancingSetNaturalUnit)
                                       .round(0, 3);
    const currentSetRequiredAmount = currentSetRequiredAmountUnrounded.sub(
      currentSetRequiredAmountUnrounded.modulo(currentSetNaturalUnit)
    ).add(currentSetNaturalUnit);

    await this._coreMock.issue.sendTransactionAsync(
      currentSetInstance.address,
      currentSetRequiredAmount,
      { from: issuance.sender },
    );
    await currentSetInstance.approve.sendTransactionAsync(
      this._transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      { from: issuance.sender },
    );
    await this._coreMock.issue.sendTransactionAsync(
      this._rebalancingSetToken.address,
      issuance.amount,
      { from: issuance.sender },
    );
  }

  private async _redeemRebalancingSetsAsync(
    redemption: IssuanceTxn,
  ): Promise<void> {
    const txHashRedeem = await this._coreMock.redeem.sendTransactionAsync(
      this._rebalancingSetToken.address,
      redemption.amount,
      { from: redemption.sender },
    );

    this._dataLogger.gasProfile.redeemRebalancingSet = await this._extractGasCostAsync(
      txHashRedeem
    );
  }

  private async _calculateImpliedBidPriceAsync(
    percentFromFairValue: BigNumber,
    tokenPrices: TokenPrices,
  ): Promise<BigNumber> {
    const auctionPriceParameters = await this._rebalancingSetToken.getAuctionPriceParameters.callAsync();
    const auctionStartPrice = auctionPriceParameters[2];
    const auctionPivotPrice = auctionPriceParameters[3];

    const fairValue = (auctionStartPrice.add(auctionPivotPrice)).div(2).round(0, 3);
    return fairValue.mul(percentFromFairValue.add(1)).round(0, 4);
  }

  private async _calculateImpliedBidTimeAsync(
    bidPrice: BigNumber,
  ): Promise<number> {
    const auctionPriceParameters = await this._rebalancingSetToken.getAuctionPriceParameters.callAsync();
    const auctionTimeToPivot = this._rebalanceProgram.initializationParams.auctionTimeToPivot;
    const auctionStartPrice = auctionPriceParameters[2];
    const auctionPivotPrice = auctionPriceParameters[3];
    const linearPriceDifference = auctionPivotPrice.sub(auctionStartPrice);

    const bidTime = (bidPrice.sub(auctionStartPrice)).mul(auctionTimeToPivot)
      .div(linearPriceDifference).round(0, 3);

    return bidTime.toNumber();
  }

  private _calculateImpliedBidAmount(
    bidAmount: BigNumber,
  ): BigNumber {
    const initialRemainingSets = this._rebalanceProgram.generalRebalancingData.initialRemainingSets;
    const unroundedBidAmount = initialRemainingSets.mul(bidAmount);

    return unroundedBidAmount.sub(
      unroundedBidAmount.modulo(this._rebalanceProgram.generalRebalancingData.minimumBid)
    );
  }

  private async _executeBidCleanUpAsync(
    lastBidder: Address,
  ): Promise<void> {
    const biddingParameters = await this._rebalancingSetToken.getBiddingParameters.callAsync();
    const bidAmount = biddingParameters[1].sub(
      biddingParameters[1].modulo(this._rebalanceProgram.generalRebalancingData.minimumBid)
    );

    if (bidAmount.greaterThan(0)) {
      const txHashBid = await this._rebalanceAuctionModule.bid.sendTransactionAsync(
        this._rebalancingSetToken.address,
        bidAmount,
        false,
        { from: lastBidder }
      );
      this._dataLogger.gasProfile.bid = await this._extractGasCostAsync(
        txHashBid
      );
    }
  }

  private async _getTokenBalancesAsync(
    userAddress: Address,
  ): Promise<TokenBalances> {
    let userBalances: TokenBalances;

    const WBTCWallet = await this._wrappedBTC.balanceOf.callAsync(userAddress);
    const WBTCVault = await this._vault.getOwnerBalance.callAsync(this._wrappedBTC.address, userAddress);
    const WETHWallet = await this._wrappedETH.balanceOf.callAsync(userAddress);
    const WETHVault = await this._vault.getOwnerBalance.callAsync(this._wrappedETH.address, userAddress);
    const RebalancingSet = await this._rebalancingSetToken.balanceOf.callAsync(userAddress);

    userBalances = {
      WBTC: WBTCWallet.add(WBTCVault),
      WETH: WETHWallet.add(WETHVault),
      RebalancingSet,
    };
    return userBalances;
  }

  private async _extractGasCostAsync(
    txHash: string,
  ): Promise<BigNumber> {
    const issueReceipt = await web3.eth.getTransactionReceipt(txHash);
    return issueReceipt.gasUsed;
  }

  private async _extractGasCostFromLatestBlockAsync(): Promise<BigNumber> {
    const block = await web3.eth.getBlock('latest');

    const txHash = block.transactions[0];
    return this._extractGasCostAsync(txHash);
  }

  private async _logPostProposeDataAsync(txHash: string): Promise<void> {
    this._dataLogger.gasProfile.proposeRebalance = await this._extractGasCostAsync(
      txHash
    );
    this._rebalanceProgram.generalRebalancingData.baseSets.push(
      await this._rebalancingSetToken.nextSet.callAsync()
    );

    const auctionPriceParameters = await this._rebalancingSetToken.getAuctionPriceParameters.callAsync();
    const auctionStartPrice = auctionPriceParameters[2];
    const auctionPivotPrice = auctionPriceParameters[3];
    this._dataLogger.rebalanceFairValues.push(
      (auctionStartPrice.add(auctionPivotPrice)).div(2).round(0, 3)
    );
  }

  private async _logPostStartRebalanceDataAsync(txHash: string): Promise<void> {
    this._dataLogger.gasProfile.startRebalance = await this._extractGasCostAsync(
      txHash
    );

    const biddingParameters = await this._rebalancingSetToken.getBiddingParameters.callAsync();
    this._rebalanceProgram.generalRebalancingData.minimumBid = biddingParameters[0];
    this._rebalanceProgram.generalRebalancingData.initialRemainingSets = biddingParameters[1];
  }

  private _getRecentBaseSet(): Address {
    return this._rebalanceProgram.generalRebalancingData.baseSets.slice(-1)[0];
  }

  
}