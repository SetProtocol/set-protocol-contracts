require('module-alias/register');

import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Web3Utils } from 'set-protocol-utils';
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
const blockchain = new Blockchain(web3);
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const web3Utils = new Web3Utils(web3);

interface UserAccountData {
  bidderOne: Address;
  bidderTwo: Address;
  bidderThree: Address;
  bidderFour: Address;
  bidderFive: Address;
  tokenOwnerOne: Address;
  tokenOwnerTwo: Address;
  tokenOwnerThree: Address;
  tokenOwnerFour: Address;
  tokenOwnerFive: Address;
  bidders: Address[];
  tokenOwners: Address[];
}

interface TokenBalances {
  WBTC: BigNumber;
  WETH: BigNumber;
  RebalancingSet: BigNumber;
}

interface UserTokenBalances {
  bidderOne: TokenBalances;
  bidderTwo: TokenBalances;
  bidderThree: TokenBalances;
  bidderFour: TokenBalances;
  bidderFive: TokenBalances;
  tokenOwnerOne: TokenBalances;
  tokenOwnerTwo: TokenBalances;
  tokenOwnerThree: TokenBalances;
  tokenOwnerFour: TokenBalances;
  tokenOwnerFive: TokenBalances;
}

export interface IssuanceTxn {
  sender: Address;
  amount: BigNumber;
}

export interface RedemptionTxn {
  sender: Address;
  amount: BigNumber;
}

export interface IssueRedeemSchedule {
  issuances: IssuanceTxn[];
  redemptions: RedemptionTxn[];
}

export interface TokenPrices {
  WBTCPrice: BigNumber;
  WETHPrice: BigNumber;
}

export interface BidTxn {
  sender: Address;
  amount: BigNumber;
  price: BigNumber;
}

export interface GeneralRebalancingData {
  proposalPeriod: BigNumber;
  rebalanceInterval: BigNumber;
  auctionTimeToPivot: BigNumber;
  createdBaseSets: Address[];
}

export interface SingleRebalanceCycleScenario {
  issueRedeemSchedule: IssueRedeemSchedule;
  priceUpdate: TokenPrices;
  biddingSchedule: BidTxn[];
}

export interface FullRebalanceProgram {
  rebalanceIterations: number;
  generalRebalancingData: GeneralRebalancingData;
  cycleData: SingleRebalanceCycleScenario[];
}

// Initial MKR Price Feed Values
const BTC_PRICE_INITIAL = new BigNumber(3.711).mul(10 ** 21);
const ETH_PRICE_INITIAL = new BigNumber(1.28).mul(10 ** 20);

// Base Component Constants
const WBTC_DECIMALS = 8;
const WETH_DECIMALS = 18;
const DECIMAL_DIFFERENCE = WBTC_DECIMALS - WETH_DECIMALS;
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

// Auction Constants
const TIME_TO_PIVOT = SECONDS_PER_DAY;

export class BTCETHMultipleRebalanceWrapper {
  private _accounts: UserAccountData;
  private _rebalanceProgram: FullRebalanceProgram;

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

  constructor(otherAccounts: Address[], rebalanceProgram: FullRebalanceProgram) {
    this._contractOwnerAddress = otherAccounts[0];
    this._accounts = this._createAccountPersonalitiesAsync(otherAccounts);
    this._rebalanceProgram = rebalanceProgram;

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

  public async runFullRebalanceProgram(): Promise<void> {
    await this.deployAndAuthorizeCoreContractsAsync();
    await this.createRebalancingSetToken();
    await this.distributeTokensAndMintSets();
    await this.runRebalanceScenario(this._rebalanceProgram.cycleData[0]);
  }

  public async deployAndAuthorizeCoreContractsAsync(
    deployerAccount: Address = this._contractOwnerAddress,
  ): Promise<void> {
    // Deploy core contracts
    this._transferProxy = await this._coreWrapper.deployTransferProxyAsync();
    this._vault = await this._coreWrapper.deployVaultAsync();
    this._coreMock = await this._coreWrapper.deployCoreMockAsync(this._transferProxy, this._vault);
    this._rebalanceAuctionModule = await this._coreWrapper.deployRebalanceAuctionModuleAsync(
      this._coreMock,
      this._vault
    );
    await this._coreWrapper.addModuleAsync(this._coreMock, this._rebalanceAuctionModule.address);

    this._factory = await this._coreWrapper.deploySetTokenFactoryAsync(this._coreMock.address);
    this._rebalancingComponentWhiteList = await this._coreWrapper.deployWhiteListAsync();
    this._rebalancingFactory = await this._coreWrapper.deployRebalancingSetTokenFactoryAsync(
      this._coreMock.address,
      this._rebalancingComponentWhiteList.address,
    );
    this._linearAuctionPriceCurve = await this._rebalancingWrapper.deployLinearAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_DENOMINATOR,
      true
    );

    // Deploy Oracles and set initial prices
    this._btcMedianizer = await this._oracleWrapper.deployMedianizerAsync();
    await this._oracleWrapper.addPriceFeedOwnerToMedianizer(this._btcMedianizer, deployerAccount);
    this._ethMedianizer = await this._oracleWrapper.deployMedianizerAsync();
    await this._oracleWrapper.addPriceFeedOwnerToMedianizer(this._ethMedianizer, deployerAccount);

    await this._oracleWrapper.updateMedianizerPriceAsync(
      this._btcMedianizer,
      BTC_PRICE_INITIAL,
      SetTestUtils.generateTimestamp(1000),
    );
    await this._oracleWrapper.updateMedianizerPriceAsync(
      this._ethMedianizer,
      ETH_PRICE_INITIAL,
      SetTestUtils.generateTimestamp(1000),
    );

    // Deploy WBTC, WETH and add tokens to whitelise
    this._wrappedBTC = await this._erc20Wrapper.deployTokenAsync(deployerAccount, 8);
    this._wrappedETH = await this._erc20Wrapper.deployWrappedEtherAsync(deployerAccount);

    await this._coreWrapper.addTokensToWhiteList(
      [this._wrappedBTC.address, this._wrappedETH.address],
      this._rebalancingComponentWhiteList
    );

    // Deploy manager contract
    this._btcethRebalancingManager = await this._rebalancingWrapper.deployBTCETHRebalancingManagerAsync(
      this._coreMock.address,
      this._btcMedianizer.address,
      this._ethMedianizer.address,
      this._wrappedBTC.address,
      this._wrappedETH.address,
      this._factory.address,
      this._linearAuctionPriceCurve.address,
      TIME_TO_PIVOT,
    );

    // Add authorizations to system
    await this._coreWrapper.setDefaultStateAndAuthorizationsAsync(
      this._coreMock,
      this._vault,
      this._transferProxy,
      this._factory
    );
    await this._coreWrapper.addFactoryAsync(this._coreMock, this._rebalancingFactory);
    await this._coreWrapper.addAuthorizationAsync(this._vault, this._rebalanceAuctionModule.address);
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
      [INITIAL_BTC_UNIT, INITIAL_ETH_UNIT],
      BTC_ETH_NATURAL_UNIT,
    );

    const rebalancingSetCallData = SetUtils.generateRSetTokenCallData(
      this._btcethRebalancingManager.address,
      PROPOSAL_PERIOD,
      REBALANCE_INTERVAL,
    );

    this._rebalancingSetToken = await this._rebalancingWrapper.createRebalancingTokenAsync(
      this._coreMock,
      this._rebalancingFactory.address,
      [this._initialBtcEthSet.address],
      [REBALANCING_SET_UNIT_SHARES],
      REBALANCING_SET_NATURAL_UNIT,
      rebalancingSetCallData,
    );
  }

  public async distributeTokensAndMintSets(): Promise<void> {
    // Issue Rebalancing Sets using _contractOwnerAddress tokens and distrubuted to owner group
    await this._issueAndDistributeRebalancingSetsAsync();

    // Distribute tokens to bidding accounts
    await this._distributeBtcAndEthToBiddersAsync();
  }

  public async runRebalanceScenario(
    scenario: SingleRebalanceCycleScenario,
  ): Promise<void> {
    // For each rebalance iteration

    // Issue and Redeem Sets
    await this._executeIssueRedeemScheduleAsync(scenario.issueRedeemSchedule);

    // Run Proposal (change prices) and transtion to rebalance
    await this._proposeAndTransitionToRebalanceAsync(scenario.priceUpdate);

    // Run bidding program
    await this._executeBiddingScheduleAsync(scenario.biddingSchedule);

    // Finish rebalance cycle and log outputs
    await this._settleRebalanceAndLogState();
  }

  public returnContractInfo(): Address {
    return this._rebalancingSetToken.address;
  }

  /* ============ Private ============ */

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
    await this._coreMock.issue.sendTransactionAsync(
      this._initialBtcEthSet.address,
      BTC_ETH_ISSUE_QUANTITY,
    );

    await this._initialBtcEthSet.approve.sendTransactionAsync(
      this._transferProxy.address,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
    );

    // Issue Rebalancing Set to the the deployer
    await this._coreMock.issue.sendTransactionAsync(
      this._rebalancingSetToken.address,
      REBALANCING_SET_ISSUE_QUANTITY,
    );

    // Transfer RebalancingSetToken amounts to bidders
    const transferRebalancingSetPromises = _.map(
      this._accounts.tokenOwners,
      address => this._rebalancingSetToken.transfer.sendTransactionAsync(
        address,
        REBALANCING_SET_ISSUE_QUANTITY.div(5),
        { from: this._contractOwnerAddress },
      )
    );
    await Promise.all(transferRebalancingSetPromises);
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

  private async _executeIssueRedeemScheduleAsync(
    scehdule: IssueRedeemSchedule,
  ): Promise<void> {
    // Execute issuances
    const issuancePromises = _.map(
      scehdule.issuances,
      txn => this._coreMock.issue.sendTransactionAsync(
        this._rebalancingSetToken.address,
        txn.amount,
        { from: txn.sender },
      )
    );
    await Promise.all(issuancePromises);

    // Execute Redemptions
    const redemptionPromises = _.map(
      scehdule.redemptions,
      txn => this._coreMock.redeem.sendTransactionAsync(
        this._rebalancingSetToken.address,
        txn.amount,
        { from: txn.sender },
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
    await web3Utils.increaseTime(REBALANCE_INTERVAL.plus(1).toNumber());

    // Call propose from Rebalance Manager and log new base set
    await this._btcethRebalancingManager.propose.sendTransactionAsync(
      this._rebalancingSetToken.address,
    );
    this._rebalanceProgram.generalRebalancingData.createdBaseSets.push(
      await this._rebalancingSetToken.nextSet.callAsync()
    );

    await web3Utils.increaseTime(PROPOSAL_PERIOD.mul(2).toNumber());

    await this._rebalancingSetToken.startRebalance.sendTransactionAsync();
  }

  private async _executeBiddingScheduleAsync(
    scehdule: BidTxn[],
  ): Promise<void> {
    let cumulativeTime: number = 0;
    for (let i = 0; i < scehdule.length; i++) {
      const bid = scehdule[i];
      const bidTime = await this._calculateImpliedBidTimeAsync(bid.price);
      const timeJump = bidTime - cumulativeTime;

      await web3Utils.increaseTime(timeJump);

      await this._rebalanceAuctionModule.bid.sendTransactionAsync(
        this._rebalancingSetToken.address,
        bid.amount,
        {
          from: bid.sender,
        }
      );
      cumulativeTime += timeJump;
    }
  }

  private async _settleRebalanceAndLogState(): Promise<void> {
    await this._rebalancingSetToken.settleRebalance.sendTransactionAsync();

    console.log(
      await this._vault.getOwnerBalance.callAsync(
        this._rebalanceProgram.generalRebalancingData.createdBaseSets[0],
        this._rebalancingSetToken.address
      )
    );

    this._returnAllUserTokenBalancesAsync();
  }

  private async _calculateImpliedBidTimeAsync(
    bidPrice: BigNumber,
  ): Promise<number> {
    const auctionPriceParameters = await this._rebalancingSetToken.auctionParameters.callAsync();
    const auctionTimeToPivot = this._rebalanceProgram.generalRebalancingData.auctionTimeToPivot;
    const auctionStartPrice = new BigNumber(auctionPriceParameters[2]);
    const auctionPivotPrice = new BigNumber(auctionPriceParameters[3]);
    const linearPriceDifference = auctionPivotPrice.sub(auctionStartPrice);

    const bidTime = (bidPrice.sub(auctionStartPrice)).mul(auctionTimeToPivot)
      .div(linearPriceDifference).round(0, 3);

    return bidTime.toNumber();
  }

  private async _returnAllUserTokenBalancesAsync(): Promise<UserTokenBalances> {
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

  private async _getTokenBalancesAsync(
    userAddress: Address,
  ): Promise<TokenBalances> {
    let userBalances: TokenBalances;

    const WBTC = await this._wrappedBTC.balanceOf.callAsync(userAddress);
    const WETH = await this._wrappedETH.balanceOf.callAsync(userAddress);
    const RebalancingSet = await this._rebalancingSetToken.balanceOf.callAsync(userAddress);

    userBalances = {
      WBTC,
      WETH,
      RebalancingSet,
    };
    return userBalances;
  }
}