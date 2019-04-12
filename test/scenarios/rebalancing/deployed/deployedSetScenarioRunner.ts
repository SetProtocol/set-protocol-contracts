require('module-alias/register');

import * as _ from 'lodash';
import { Address, Web3Utils } from 'set-protocol-utils';
import { BigNumber } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  MedianContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import CONSTANTS from '../constants';

import {
  AssetScenario,
  NewIssuanceTxn,
} from './types';

import { RebalancingScenarioValidations } from './validations';


import {
  findDependency,
  getContractAddress,
} from '@deployments/utils/output-helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { OracleWrapper } from '@utils/wrappers/oracleWrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const blockchain = new Blockchain(web3);
const web3Utils = new Web3Utils(web3);

const LARGE_QUANTITY_COMPONENT = new BigNumber(10 ** 30);

export class RebalanceScenariosWrapper {
  private _accounts: Address[];
  private _rebalanceProgram: AssetScenario;
  private _currentIteration: number;

  private _managerAddress: Address;

  private _contractOwnerAddress: Address;
  private _coreWrapper: CoreWrapper;
  private _erc20Wrapper: ERC20Wrapper;
  private _oracleWrapper: OracleWrapper;
  private _rebalancingWrapper: RebalancingWrapper;
  private _scenarioValidations: RebalancingScenarioValidations;

  private _rebalancingSetToken: RebalancingSetTokenContract;
  private _assetOne: StandardTokenMockContract;
  private _assetTwo: StandardTokenMockContract;

  private _core: CoreContract;
  private _transferProxy: TransferProxyContract;
  private _vault: VaultContract;
  private _rebalanceAuctionModule: RebalanceAuctionModuleContract;
  private _assetOneMedianizer: MedianContract;
  private _assetTwoMedianizer: MedianContract;

  constructor(accounts: Address[], rebalanceProgram: AssetScenario) {
    this._contractOwnerAddress = accounts[0];
    this._rebalanceProgram = rebalanceProgram;
    this._accounts = accounts;

    this._coreWrapper = new CoreWrapper(this._contractOwnerAddress, this._contractOwnerAddress);
    this._erc20Wrapper = new ERC20Wrapper(this._contractOwnerAddress);
    this._rebalancingWrapper = new RebalancingWrapper(
      this._contractOwnerAddress,
      this._coreWrapper,
      this._erc20Wrapper,
      blockchain
    );
    this._oracleWrapper = new OracleWrapper(this._contractOwnerAddress);

    this._scenarioValidations = new RebalancingScenarioValidations(accounts, rebalanceProgram);
  }

  public async runFullRebalanceProgram(): Promise<void> {
    await this.initialize();
    await this.runRebalanceScenarios();
  }

  public async initialize(): Promise<void> {
    await this._scenarioValidations.initialize();

    this._core = await this._coreWrapper.getDeployedCoreAsync();
    this._transferProxy = await this._coreWrapper.getDeployedTransferProxyAsync();
    this._vault = await this._coreWrapper.getDeployedVaultAsync();

    const {
      rebalancingSetName,
      assetOne,
      assetTwo,
      assetOneMedianizer,
      assetTwoMedianizer,
      managerName,
      rebalancingSetConfig,
    } = this._rebalanceProgram;

    const assetOneAddress = await findDependency(assetOne);
    const assetTwoAddress = await findDependency(assetTwo);
    const components = await this._erc20Wrapper.retrieveTokenInstancesAsync([assetOneAddress, assetTwoAddress]);
    this._assetOne = components[0];
    this._assetTwo = components[1];

    const rebalancingSetAddress = await getContractAddress(rebalancingSetName);
    this._rebalancingSetToken = await this._rebalancingWrapper.getRebalancingSetInstance(rebalancingSetAddress);

    if (assetOneMedianizer) {
      const assetOneMedianizerAddress = await getContractAddress(assetOneMedianizer);
      this._assetOneMedianizer = await this._oracleWrapper.getDeployedMedianizerAsync(assetOneMedianizerAddress);
      await this._oracleWrapper.addPriceFeedOwnerToMedianizer(this._assetOneMedianizer, this._contractOwnerAddress);

      const latestBlock = await web3.eth.getBlock('latest');
      const latestBlockTimestamp = new BigNumber(latestBlock.timestamp);

      await this._oracleWrapper.updateMedianizerPriceAsync(
        this._assetOneMedianizer,
        rebalancingSetConfig.initialAssetOnePrice,
        latestBlockTimestamp,
      );

      console.log(
        `Updating Oracle 1 to ${rebalancingSetConfig.initialAssetOnePrice} during initialization`
      );
    }

    if (assetTwoMedianizer) {
      const assetTwoMedianizerAddress = await getContractAddress(assetTwoMedianizer);
      this._assetTwoMedianizer = await this._oracleWrapper.getDeployedMedianizerAsync(assetTwoMedianizerAddress);
      await this._oracleWrapper.addPriceFeedOwnerToMedianizer(this._assetTwoMedianizer, this._contractOwnerAddress);

      const latestBlock = await web3.eth.getBlock('latest');
      const latestBlockTimestamp = new BigNumber(latestBlock.timestamp);

      await this._oracleWrapper.updateMedianizerPriceAsync(
        this._assetTwoMedianizer,
        rebalancingSetConfig.initialAssetTwoPrice,
        latestBlockTimestamp,
      );

      console.log(
        `Updating Oracle 2 to ${rebalancingSetConfig.initialAssetTwoPrice} during initialization`
      );
    }

    this._managerAddress = await getContractAddress(managerName);

    this._rebalanceAuctionModule = await this._coreWrapper.getDeployedRebalanceAuctionModuleAsync();

    await this.distributeComponentsAndSetRecipientApprovals();

    // Issue Rebalancing Sets using _contractOwnerAddress tokens and distrubuted to owner group
    await this.mintInitialSets();

    await this._scenarioValidations.validateInitialState();
  }

  public async runRebalanceScenarios(): Promise<void> {
    // For each rebalance iteration
    for (let i = 0; i < this._rebalanceProgram.scenarioCount; i++) {
      this._currentIteration = i;

      console.log('\n\n---------------------------- Running iteration: ', i, '----------------------------\n\n');

      // Update prices
      await this._updateOracles();

      // Issue and Redeem Sets
      await this.issueRebalancingSets();

      await this.redeemRebalancingSets();

      // Run Proposal (change prices) and transtion to rebalance
      await this.propose();

      await this.startRebalance();

      // Run bidding program
      await this.executeBids();

      // Finish rebalance cycle
      await this.settleRebalance();

      // Execute assertions

      // Log State
      await this.logState();
    }
  }

  /* ============ Private ============ */
  private async distributeComponentsAndSetRecipientApprovals(): Promise<void> {
    const {
      issuerAccounts,
      bidderAccounts,
    } = this._rebalanceProgram;

    const issuerAccountsAddresses: Address[] = _.map(issuerAccounts, accountNumber => this._accounts[accountNumber]);
    const bidderAccountAddresses: Address[] = _.map(bidderAccounts, accountNumber => this._accounts[accountNumber]);
    const recipients: string[] = _.union(issuerAccountsAddresses, bidderAccountAddresses);

    const components = [this._assetOne, this._assetTwo];

    for (let i = 0; i < recipients.length; i++) {
      // Send a large amount of components from the contract deployer to issuer accounts
      await this._erc20Wrapper.transferTokensAsync(
        components,
        recipients[i],
        LARGE_QUANTITY_COMPONENT,
      );

      // Approve components to the transfer proxy
      await this._erc20Wrapper.approveTransfersAsync(
        components,
        this._transferProxy.address,
        recipients[i],
      );
    }
  }

  private async mintInitialSets(): Promise<void> {
    const { rebalancingSetConfig } = this._rebalanceProgram;

    console.log('\n\n---------------------------- Initialization ----------------------------\n\n');

    await this.issueRebalancingSets(rebalancingSetConfig.initialSetIssuances);
  }

  public async _updateOracles(): Promise<void> {
    const { priceSchedule } = this._rebalanceProgram;
    const iterationNumber = this._currentIteration;



    if (this._assetOneMedianizer) {
      const latestBlock = await web3.eth.getBlock('latest');
      const latestBlockTimestamp = new BigNumber(latestBlock.timestamp);

      await this._oracleWrapper.updateMedianizerPriceAsync(
        this._assetOneMedianizer,
        priceSchedule.assetOne[iterationNumber],
        latestBlockTimestamp + 1, // Add one second to make sure txn doesn't error
      );
      console.log(
        `Updating Oracle 1 to ${priceSchedule.assetOne[iterationNumber]} at iteration ${iterationNumber}`
      );
    }

    if (this._assetTwoMedianizer) {
      const latestBlock = await web3.eth.getBlock('latest');
      const latestBlockTimestamp = new BigNumber(latestBlock.timestamp);

      await this._oracleWrapper.updateMedianizerPriceAsync(
        this._assetTwoMedianizer,
        priceSchedule.assetTwo[iterationNumber],
        latestBlockTimestamp + 1, // Add one second to make sure txn doesn't error
      );
      console.log(
        `Updating Oracle 2 to ${priceSchedule.assetTwo[iterationNumber]} at iteration ${iterationNumber}`
      );
    }
  }

  private async issueRebalancingSets(schedule?: NewIssuanceTxn[]): Promise<void> {
    let currentSchedule;

    if (schedule) {
      currentSchedule = schedule;
    } else {
      const { issuanceSchedule } = this._rebalanceProgram;
      currentSchedule = issuanceSchedule.issuances[this._currentIteration];
    }

    // Loop through issuance schedule and mint Sets from the corresponding sender
    for (let i = 0; i < currentSchedule.length; i++) {
      // Rebalancing Set Quantity
      const rebalancingSetQuantity = currentSchedule[i].amount;
      const sender = this._accounts[currentSchedule[i].sender];

      console.log(
        `Issuing ${rebalancingSetQuantity} RBSet to ${sender} at iteration ${this._currentIteration}`
      );

      await this._rebalancingWrapper.issueRebalancingSetFromBaseComponentsAsync(
        this._core,
        this._transferProxy.address,
        this._rebalancingSetToken.address,
        rebalancingSetQuantity,
        sender
      );
    }
  }

  private async redeemRebalancingSets(): Promise<void> {
    const { issuanceSchedule } = this._rebalanceProgram;
    const currentSchedule = issuanceSchedule.redemptions[this._currentIteration];

    // Loop through issuance schedule and mint Sets from the corresponding sender
    for (let i = 0; i < currentSchedule.length; i++) {
      // Rebalancing Set Quantity
      const rebalancingSetQuantity = currentSchedule[i].amount;
      const sender = this._accounts[currentSchedule[i].sender];

      console.log(
        `Redeeming ${rebalancingSetQuantity} RBSet to ${sender} at iteration ${this._currentIteration}`
      );

      await this._rebalancingWrapper.redeemRebalancingSetToBaseComponentsAsync(
        this._core,
        this._transferProxy.address,
        this._rebalancingSetToken.address,
        rebalancingSetQuantity,
        sender
      );
    }
  }

  private async propose(): Promise<void> {
    // Fast forward the rebalance interval
    await web3Utils.increaseTime(
      this._rebalanceProgram.rebalancingSetConfig.rebalanceInterval.plus(1).toNumber()
    );

    console.log('Calling propose on instance:', this._currentIteration);

    // Call propose from Rebalance Manager and log propose data
    await this._rebalancingWrapper.proposeOnManager(this._managerAddress, this._rebalancingSetToken.address);

    console.log('\n------------- Proposal ------------- ');
    const currentSet = await this._rebalancingSetToken.currentSet.callAsync();
    const currentSetInstance = await this._coreWrapper.getSetInstance(currentSet);
    const [currentSetAssetOneUnit, currentSetAssetTwoUnit] = await currentSetInstance.getUnits.callAsync();
    const currentSetNaturalUnit = await currentSetInstance.naturalUnit.callAsync();

    const nextSet = await this._rebalancingSetToken.nextSet.callAsync();
    const nextSetInstance = await this._coreWrapper.getSetInstance(nextSet);
    const [nextSetAssetOneUnit, nextSetAssetTwoUnit] = await nextSetInstance.getUnits.callAsync();
    const nextSetNaturalUnit = await nextSetInstance.naturalUnit.callAsync();

    const auctionPriceParameters = await this._rebalancingSetToken.getAuctionPriceParameters.callAsync();
    const auctionStartPrice = auctionPriceParameters[2];
    const auctionPivotPrice = auctionPriceParameters[3];
    const fairValue = auctionStartPrice.add(auctionPivotPrice).div(2).round(0, 3);

    console.log('Current Set Address:', currentSet);
    console.log('Current Set: Asset One Unit', currentSetAssetOneUnit.toString());
    console.log('Current Set: Asset Two Unit', currentSetAssetTwoUnit.toString());
    console.log('Current Set: Natural Unit', currentSetNaturalUnit.toString());

    console.log('Next Set Address:', nextSet);
    console.log('Next Set: Asset One Unit', nextSetAssetOneUnit.toString());
    console.log('Next Set: Asset Two Unit', nextSetAssetTwoUnit.toString());
    console.log('Next Set: Natural Unit', nextSetNaturalUnit.toString());
    console.log('Auction Start Price: ', auctionStartPrice.toString());
    console.log('Auction Pivot Price: ', auctionPivotPrice.toString());
    console.log('Auction Fair Value: ', fairValue.toString());
  }

  private async startRebalance(): Promise<void> {
    await web3Utils.increaseTime(
      this._rebalanceProgram.rebalancingSetConfig.proposalPeriod.plus(1).toNumber()
    );

    console.log('Starting rebalance', this._currentIteration);

    await this._rebalancingSetToken.startRebalance.sendTransactionAsync();

    console.log('\n------------- Start Rebalance ------------- ');
    const biddingParameters = await this._rebalancingSetToken.getBiddingParameters.callAsync();
    console.log('Minimum Bid', biddingParameters[0].toString());
    console.log('Initial Remaining Sets', biddingParameters[1].toString());
  }

  private async executeBids(): Promise<void> {
    const { biddingSchedule, managerConfig } = this._rebalanceProgram;

    const currentSchedule = biddingSchedule[this._currentIteration];

    let previousTimeJump = 0;

    const startingCurrentSets = await this._rebalancingSetToken.startingCurrentSetAmount.callAsync();

    const [minimumBid] = await this._rebalancingSetToken.getBiddingParameters.callAsync();

    for (let i = 0; i < currentSchedule.length; i++) {
      const { sender, percentRemainingToBid, secondsFromFairValue } = currentSchedule[i];

      // Note that if there are enough bids, we may not end the auction since there may
      // still be a multiple of the minimum bid remaining
      const bidQuantity = await this._rebalancingWrapper.calculateCurrentSetBidQuantity(
        startingCurrentSets,
        percentRemainingToBid,
        minimumBid,
      );

      const auctionTimeToPivot = new BigNumber(managerConfig.auctionTimeToPivot);

      const timeToFairValue = this._rebalancingWrapper.getTimeToFairValue(auctionTimeToPivot);
      const timeJump = timeToFairValue.plus(secondsFromFairValue).toNumber();

      if (timeJump > previousTimeJump) {
        const timeJumpValue = new BigNumber(timeJump).sub(previousTimeJump).toNumber();

        await web3Utils.increaseTime(timeJumpValue);
        previousTimeJump = timeJump;
      }

      console.log(`Executing Bid of quantity ${bidQuantity.toString()} from ${sender}`);

      await this._rebalanceAuctionModule.bidAndWithdraw.sendTransactionAsync(
        this._rebalancingSetToken.address,
        bidQuantity,
        true,
        { from: this._accounts[sender] }
      );
    }
  }

  private async settleRebalance(): Promise<void> {
    await this._rebalancingSetToken.settleRebalance.sendTransactionAsync();
  }

  private async logState(): Promise<void> {
    const iteration = this._currentIteration;

    // Log account balances of Set of issuers
    console.log('\n------------- Issuer Rebalancing Set Balances ------------- ');
    const issuers = this._rebalanceProgram.issuerAccounts;
    for (let i = 0; i < issuers.length; i++) {
      const issuerAddress = this._accounts[issuers[i]];

      const tokenBalance = await this._rebalancingSetToken.balanceOf.callAsync(issuerAddress);
      console.log(issuerAddress, ': ', tokenBalance.toString());
    }

    // Log component vault balances
    console.log('------------- Vault Balances ------------- ');
    const [assetOneVaultBalance, assetTwoVaultBalance] = await this._erc20Wrapper.getTokenBalances(
      [this._assetOne, this._assetTwo],
      this._vault.address
    );
    console.log('Asset One Vault Balance:', assetOneVaultBalance.toString());
    console.log('Asset Two Vault Balance:', assetTwoVaultBalance.toString());

    console.log('------------- Vault Value ------------- ');
    const assetOneName = this._rebalanceProgram.assetOne;
    const assetTwoName = this._rebalanceProgram.assetTwo;
    const {assetOne, assetTwo} = this._rebalanceProgram.priceSchedule;
    const assetOneValue = assetOneVaultBalance
                            .mul(assetOne[iteration])
                            .div(CONSTANTS.PRICE_FEED_TRUNCATION)
                            .div(CONSTANTS[assetOneName].FULL_UNIT);
    const assetTwoValue = assetTwoVaultBalance
                            .mul(assetTwo[iteration])
                            .div(CONSTANTS.PRICE_FEED_TRUNCATION)
                            .div(CONSTANTS[assetTwoName].FULL_UNIT);

    console.log('Asset One Value', assetOneValue.round(0, 3).toString());
    console.log('Asset Two Value', assetTwoValue.round(0, 3).toString());
    console.log('Total Value', assetOneValue.add(assetTwoValue).round(0, 3).toString());
  }
}