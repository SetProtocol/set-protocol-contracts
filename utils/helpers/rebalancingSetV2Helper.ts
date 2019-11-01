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
  VaultContract,
  WhiteListContract,
} from '../contracts';
import { BigNumber } from 'bignumber.js';

import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_UNIT_SHARES,
  ONE_DAY_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '../constants';
import { extractNewSetTokenAddressFromLogs } from '../contract_logs/core';

import { getWeb3 } from '../web3Helper';

import { RebalancingHelper } from './rebalancingHelper';

const web3 = getWeb3();
const RebalancingSetTokenV2 = artifacts.require('RebalancingSetTokenV2');

declare type CoreLikeContract = CoreMockContract | CoreContract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);

export class RebalancingSetV2Helper extends RebalancingHelper {

  /* ============ Deployment ============ */

  public async deployRebalancingSetTokenV2Async(
    factory: Address,
    tokenManager: Address,
    liquidator: Address,
    initialSet: Address,
    componentWhiteList: Address,
    initialShareRatio: BigNumber,
    initialNaturalUnit: BigNumber,
    proposalPeriod: BigNumber,
    rebalanceInterval: BigNumber,
    rebalanceFailPeriod: BigNumber,
    lastRebalanceTimestamp: BigNumber,
    name: string = 'Rebalancing Set',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenV2Contract> {
    const truffleRebalancingToken = await RebalancingSetTokenV2.new(
      factory,
      tokenManager,
      liquidator,
      initialSet,
      componentWhiteList,
      initialShareRatio,
      initialNaturalUnit,
      [proposalPeriod, rebalanceInterval, rebalanceFailPeriod, lastRebalanceTimestamp],
      name,
      symbol,
      { from, gas: DEFAULT_GAS },
    );

    const rebalancingToken = new RebalancingSetTokenV2Contract(
      new web3.eth.Contract(truffleRebalancingToken.abi, truffleRebalancingToken.address),
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
    initialSet: Address,
    proposalPeriod: BigNumber,
    failRebalancePeriod: BigNumber,
    lastRebalanceTimestamp: BigNumber,
    initialUnitShares: BigNumber = DEFAULT_UNIT_SHARES,
  ): Promise<RebalancingSetTokenV2Contract> {
    // Generate defualt rebalancingSetToken params
    const rebalanceInterval = ONE_DAY_IN_SECONDS;
    const callData = SetUtils.generateRebalancingSetTokenV2CallData(
      manager,
      liquidator,
      proposalPeriod,
      rebalanceInterval,
      failRebalancePeriod,
      lastRebalanceTimestamp,
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

  public async defaultTransitionToProposeV2Async(
    core: CoreLikeContract,
    rebalancingComponentWhiteList: WhiteListContract,
    rebalancingSetToken: RebalancingSetTokenV2Contract,
    nextSetToken: SetTokenContract,
    caller: Address
  ): Promise<void> {
    const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
    await this._coreHelper.addTokensToWhiteList(
      nextSetTokenComponentAddresses,
      rebalancingComponentWhiteList
    );

    // Transition to propose
    await this.transitionToProposeV2Async(
      core,
      rebalancingSetToken,
      nextSetToken,
      caller,
    );
  }

  public async transitionToProposeV2Async(
    core: CoreLikeContract,
    rebalancingSetToken: RebalancingSetTokenV2Contract,
    nextSetToken: SetTokenContract,
    caller: Address
  ): Promise<void> {
    // Transition to propose, auctionLibrary MUST be approved priceLibrary on Core already
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.propose.sendTransactionAsync(
      nextSetToken.address,
      { from: caller, gas: DEFAULT_GAS}
    );
  }

  public async transitionToRebalanceV2Async(
    core: CoreLikeContract,
    rebalancingSetToken: RebalancingSetTokenV2Contract,
    nextSetToken: SetTokenContract,
    caller: Address
  ): Promise<void> {
    await this.transitionToProposeV2Async(
      core,
      rebalancingSetToken,
      nextSetToken,
      caller
    );

    // Transition to rebalance
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.startRebalance.sendTransactionAsync(
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  public async transitionToDrawdownV2Async(
    core: CoreLikeContract,
    rebalancingSetToken: RebalancingSetTokenV2Contract,
    rebalanceAuctionModule: RebalanceAuctionModuleContract,
    liquidatorMock: LiquidatorMockContract,
    nextSetToken: SetTokenContract,
    manager: Address,
    caller: Address = this._tokenOwnerAddress,
  ): Promise<void> {
    await this.transitionToRebalanceV2Async(
      core,
      rebalancingSetToken,
      nextSetToken,
      manager
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

  public async getNextSetIssueQuantity(
    nextSetToken: SetTokenContract,
    rebalancingSetToken: RebalancingSetTokenV2Contract,
    vault: VaultContract,
  ): Promise<BigNumber> {
    // Calculate max Set issue amount
    const maxIssueAmount = await this.calculateMaxIssueAmount(
      nextSetToken,
      rebalancingSetToken,
      vault,
    );

    const nextSetTokenNaturalUnit = await nextSetToken.naturalUnit.callAsync();

    return maxIssueAmount.div(nextSetTokenNaturalUnit);
  }

  public async calculateMaxIssueAmount(
    nextSetToken: SetTokenContract,
    rebalancingSetToken: RebalancingSetTokenV2Contract,
    vault: VaultContract,
  ): Promise<BigNumber> {
    // Start with a big number
    let maxIssueAmount = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

    const naturalUnit = await nextSetToken.naturalUnit.callAsync();
    const components = await nextSetToken.getComponents.callAsync();
    const units = await nextSetToken.getUnits.callAsync();

    for (let i = 0; i < components.length; i++) {
      const componentVaultBalance = await vault.getOwnerBalance.callAsync(
        rebalancingSetToken.address,
        components[i],
      );

      const impliedIssueAmount = componentVaultBalance.div(units[i]).mul(naturalUnit);

      if (impliedIssueAmount.lt(maxIssueAmount)) {
        maxIssueAmount = impliedIssueAmount;
      }
    }

    return maxIssueAmount;
  }
}
