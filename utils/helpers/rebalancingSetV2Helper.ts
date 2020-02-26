import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  CoreContract,
  CoreMockContract,
  LiquidatorMockContract,
  SetTokenContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV3Contract,
  VaultContract,
  WhiteListContract,
} from '../contracts';
import { BigNumber } from 'bignumber.js';

import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_UNIT_SHARES,
  EMPTY_BYTESTRING,
  ONE_DAY_IN_SECONDS,
  SCALE_FACTOR,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO,
} from '../constants';
import { extractNewSetTokenAddressFromLogs } from '../contract_logs/core';
import { ether } from '../units';
import { getWeb3, getContractInstance, importArtifactsFromSource, txnFrom } from '../web3Helper';

import { RebalancingHelper } from './rebalancingHelper';

const web3 = getWeb3();
const RebalancingSetTokenV2 = importArtifactsFromSource('RebalancingSetTokenV2');

declare type CoreLikeContract = CoreMockContract | CoreContract;
declare type RebalancingV2LikeContract = RebalancingSetTokenV2Contract | RebalancingSetTokenV3Contract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);

export class RebalancingSetV2Helper extends RebalancingHelper {

  /* ============ Deployment ============ */

  /**
   * addressConfig [factory, manager, liquidator, initialSet, componentWhiteList,
   *                liquidatorWhiteList, feeRecipient]
   * [0]factory                   Factory used to create the Rebalancing Set
   * [1]manager                   Address that is able to propose the next Set
   * [2]liquidator                Address of the liquidator contract
   * [3]initialSet                Initial set that collateralizes the Rebalancing set
   * [4]componentWhiteList        Whitelist that nextSet components are checked against during propose
   * [5]liquidatorWhiteList       Whitelist of valid liquidators
   * [6]feeRecipient              Address that receives any incentive fees
   *
   * uintConfig [unitShares, naturalUnit, rebalanceInterval, rebalanceFailPeriod, lastRebalanceTimestamp,
   *             entryFee, rebalanceFee]
   * [0]initialUnitShares         Units of currentSet that equals one share
   * [1]naturalUnit               The minimum multiple of Sets that can be issued or redeemed
   * [2]rebalanceInterval:        Minimum amount of time between rebalances
   * [3]rebalanceFailPeriod:      Time after auctionStart where something in the rebalance has gone wrong
   * [4]lastRebalanceTimestamp:   Time of the last rebalance; Allows customized deployments
   * [5]entryFee:                 Mint fee represented in a scaled percentage value
   * [6]rebalanceFee:             Rebalance fee represented in a scaled percentage value
   *
   */
  public async deployRebalancingSetTokenV2Async(
    addressConfig: Address[],
    bigNumberConfig: BigNumber[],
    name: string = 'Rebalancing Set',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenV2Contract> {
    const truffleRebalancingToken = await RebalancingSetTokenV2.new(
      addressConfig,
      bigNumberConfig,
      name,
      symbol,
      { from, gas: DEFAULT_GAS },
    );

    const rebalancingToken = new RebalancingSetTokenV2Contract(
      getContractInstance(truffleRebalancingToken),
      { from, gas: DEFAULT_GAS },
    );

    return rebalancingToken;
  }

  public async createRebalancingTokenV2Async(
    core: CoreLikeContract,
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    callData: string = '',
    name: string = 'Rebalancing Set Token',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress,
  ): Promise<RebalancingSetTokenV2Contract> {
    const encodedName = SetUtils.stringToBytes(name);
    const encodedSymbol = SetUtils.stringToBytes(symbol);

    const txHash = await core.createSet.sendTransactionAsync(
      factory,
      componentAddresses,
      units,
      naturalUnit,
      encodedName,
      encodedSymbol,
      callData,
      { from },
    );

    const logs = await setTestUtils.getLogsFromTxHash(txHash);
    const setAddress = extractNewSetTokenAddressFromLogs(logs);

    return await RebalancingSetTokenV2Contract.at(
      setAddress,
      web3,
      { from }
    );
  }

  public async createDefaultRebalancingSetTokenV2Async(
    core: CoreLikeContract,
    factory: Address,
    manager: Address,
    liquidator: Address,
    feeRecipient: Address,
    rebalanceFeeCalculator: Address,
    initialSet: Address,
    failRebalancePeriod: BigNumber,
    lastRebalanceTimestamp: BigNumber,
    entryFee: BigNumber = ZERO,
    rebalanceFee: BigNumber = ZERO,
    initialUnitShares: BigNumber = DEFAULT_UNIT_SHARES,
  ): Promise<RebalancingSetTokenV2Contract> {
    // Generate defualt rebalancingSetToken params
    const rebalanceInterval = ONE_DAY_IN_SECONDS;
    const rebalanceFeeCallData = SetUtils.generateFixedFeeCalculatorCalldata(rebalanceFee);

    const callData = SetUtils.generateRebalancingSetTokenV2CallData(
      manager,
      liquidator,
      feeRecipient,
      rebalanceFeeCalculator,
      rebalanceInterval,
      failRebalancePeriod,
      lastRebalanceTimestamp,
      entryFee,
      rebalanceFeeCallData,
    );

    // Create rebalancingSetToken
    return await this.createRebalancingTokenV2Async(
      core,
      factory,
      [initialSet],
      [initialUnitShares],
      DEFAULT_REBALANCING_NATURAL_UNIT,
      callData,
    );
  }

  public async transitionToRebalanceV2Async(
    core: CoreLikeContract,
    rebalancingComponentWhiteList: WhiteListContract,
    rebalancingSetToken: RebalancingV2LikeContract,
    nextSetToken: SetTokenContract,
    caller: Address,
    liquidatorData: string = EMPTY_BYTESTRING,

  ): Promise<void> {
    const currentSupply = await rebalancingSetToken.totalSupply.callAsync();
    if (currentSupply.eq(new BigNumber(0))) {
      const currentSetMintQuantity = ether(8);
      const currentSetToken = await rebalancingSetToken.currentSet.callAsync();

      // Issue currentSetToken
      await core.issue.sendTransactionAsync(
        currentSetToken,
        currentSetMintQuantity,
        txnFrom(caller)
      );

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetQuantityToIssue = ether(7);
      await core.issue.sendTransactionAsync(
        rebalancingSetToken.address,
        rebalancingSetQuantityToIssue,
        txnFrom(caller)
      );
    }

    const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
    await this._coreHelper.addTokensToWhiteList(
      nextSetTokenComponentAddresses,
      rebalancingComponentWhiteList
    );

    // Transition to rebalance
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.startRebalance.sendTransactionAsync(
      nextSetToken.address,
      liquidatorData,
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  public async transitionToDrawdownV2Async(
    core: CoreLikeContract,
    rebalancingComponentWhiteList: WhiteListContract,
    rebalancingSetToken: RebalancingV2LikeContract,
    rebalanceAuctionModule: RebalanceAuctionModuleContract,
    liquidatorMock: LiquidatorMockContract,
    nextSetToken: SetTokenContract,
    manager: Address,
    liquidatorData: string = EMPTY_BYTESTRING,
    caller: Address = this._tokenOwnerAddress,
  ): Promise<void> {
    await this.transitionToRebalanceV2Async(
      core,
      rebalancingComponentWhiteList,
      rebalancingSetToken,
      nextSetToken,
      manager,
      liquidatorData,
    );

    const minimumBid = await liquidatorMock.minimumBid.callAsync(rebalancingSetToken.address);
    await this.placeBidAsync(
      rebalanceAuctionModule,
      rebalancingSetToken.address,
      minimumBid,
    );

    // Transition to rebalance
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.endFailedRebalance.sendTransactionAsync(
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  public async failRebalanceToDrawdownAsync(
    rebalancingSetToken: RebalancingV2LikeContract,
    liquidatorMock: LiquidatorMockContract,
    rebalanceAuctionModule: RebalanceAuctionModuleContract,
    caller: Address = this._tokenOwnerAddress,
  ): Promise<void> {
    const minimumBid = await liquidatorMock.minimumBid.callAsync(rebalancingSetToken.address);
    await this.placeBidAsync(
      rebalanceAuctionModule,
      rebalancingSetToken.address,
      minimumBid,
    );

    // Transition to rebalance
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.endFailedRebalance.sendTransactionAsync(
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  public async placeBidAsync(
    rebalanceAuctionModule: RebalanceAuctionModuleContract,
    rebalancingSetTokenAddress: Address,
    bidQuantity: BigNumber,
    allowPartialFill: boolean = false,
    caller: Address = this._tokenOwnerAddress,
  ): Promise<void> {
    await rebalanceAuctionModule.bid.sendTransactionAsync(
      rebalancingSetTokenAddress,
      bidQuantity,
      allowPartialFill,
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  public async endFailedRebalanceAsync(
    rebalancingSetToken: RebalancingSetTokenContract,
    caller: Address = this._tokenOwnerAddress,
  ): Promise<void> {
    await rebalancingSetToken.endFailedAuction.sendTransactionAsync(
      { gas: DEFAULT_GAS },
    );
  }

  public async getFailedWithdrawComponentsAsync(
    nextSetToken: SetTokenContract,
    currentSetToken: SetTokenContract,
  ): Promise<Address[]> {
    const nextSetComponents: Address[] = await nextSetToken.getComponents.callAsync();
    const currentSetComponents: Address[] = await currentSetToken.getComponents.callAsync();

    return _.union(currentSetComponents, nextSetComponents);
  }

  public async getSetIssueQuantity(
    setToken: SetTokenContract,
    rebalancingSetToken: RebalancingV2LikeContract,
    vault: VaultContract,
  ): Promise<BigNumber> {
    // Calculate max Set issue amount
    const maxIssueAmount = await this.calculateMaxIssueAmount(
      setToken,
      rebalancingSetToken,
      vault,
    );

    const setTokenNaturalUnit = await setToken.naturalUnit.callAsync();

    return maxIssueAmount.div(setTokenNaturalUnit).round(0, 3).mul(setTokenNaturalUnit);
  }

  public async calculateMaxIssueAmount(
    nextSetToken: SetTokenContract,
    rebalancingSetToken: RebalancingV2LikeContract,
    vault: VaultContract,
  ): Promise<BigNumber> {
    // Start with a big number
    let maxIssueAmount = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

    const naturalUnit = await nextSetToken.naturalUnit.callAsync();
    const components = await nextSetToken.getComponents.callAsync();
    const units = await nextSetToken.getUnits.callAsync();

    for (let i = 0; i < components.length; i++) {
      const componentVaultBalance = await vault.getOwnerBalance.callAsync(
        components[i],
        rebalancingSetToken.address,
      );

      const impliedIssueAmount = componentVaultBalance.div(units[i]).mul(naturalUnit);

      if (impliedIssueAmount.lt(maxIssueAmount)) {
        maxIssueAmount = impliedIssueAmount;
      }
    }

    return maxIssueAmount;
  }

  // Simplified: quantity * fee / 10e18
  public async calculateEntryFee(
    rebalancingSetToken: RebalancingV2LikeContract,
    quantity: BigNumber
  ): Promise<BigNumber> {
    const entryFee = await rebalancingSetToken.entryFee.callAsync();

    return entryFee.mul(quantity).div(SCALE_FACTOR).round(0, 3);
  }

  // Fee is paid via inflation and ownership of the Set.
  // Math: newShares / (newShares + oldShares) = percentFee
  // Simplified: fee * oldShare / (scaleFactor - fee)
  public async calculateRebalanceFeeInflation(
    feePercentage: BigNumber,
    totalSupply: BigNumber
  ): Promise<BigNumber> {
    return feePercentage.mul(totalSupply).div(SCALE_FACTOR.sub(feePercentage)).round(0, 3);
  }

  public async getExpectedUnitSharesV2(
    core: CoreMockContract,
    rebalancingSetToken: RebalancingV2LikeContract,
    newSet: SetTokenContract,
    vault: VaultContract
  ): Promise<BigNumber> {
    // Gather data needed for calculations
    const totalSupply = await rebalancingSetToken.totalSupply.callAsync();
    const rebalancingNaturalUnit = await rebalancingSetToken.naturalUnit.callAsync();
    const newSetNaturalUnit = await newSet.naturalUnit.callAsync();
    const components = await newSet.getComponents.callAsync();
    const units = await newSet.getUnits.callAsync();
    const rebalanceFee = await rebalancingSetToken.rebalanceFee.callAsync();

    // Figure out how many new Sets can be issued from balance in Vault, if less than previously calculated
    // amount, then set that to maxIssueAmount
    let maxIssueAmount: BigNumber = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
    for (let i = 0; i < components.length; i++) {
      const componentAmount = await vault.getOwnerBalance.callAsync(components[i], rebalancingSetToken.address);
      const componentIssueAmount = componentAmount.div(units[i]).round(0, 3).mul(newSetNaturalUnit);

      if (componentIssueAmount.lessThan(maxIssueAmount)) {
        maxIssueAmount = componentIssueAmount;
      }
    }
    // Calculate unitShares by finding how many natural units worth of the rebalancingSetToken have been issued
    // Divide maxIssueAmount by this to find unitShares, remultiply unitShares by issued amount of rebalancing-
    // SetToken in natural units to get amount of new Sets to issue
    const issueAmount = maxIssueAmount.div(newSetNaturalUnit).round(0, 3).mul(newSetNaturalUnit);
    const rebalancingInflation = await this.calculateRebalanceFeeInflation(
      rebalanceFee,
      totalSupply
    );
    const postFeeTotalySupply = totalSupply.plus(rebalancingInflation);

    const naturalUnitsOutstanding = postFeeTotalySupply.div(rebalancingNaturalUnit);
    const unitShares = issueAmount.div(naturalUnitsOutstanding).round(0, 3);

    return unitShares;
  }
}
