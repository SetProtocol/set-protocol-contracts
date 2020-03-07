import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  CoreContract,
  CoreMockContract,
  SetTokenContract,
  RebalancingSetTokenV3Contract,
  VaultContract,
} from '../contracts';
import { BigNumber } from 'bignumber.js';

import {
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_UNIT_SHARES,
  ONE_DAY_IN_SECONDS,
  ZERO,
} from '../constants';
import { extractNewSetTokenAddressFromLogs } from '../contract_logs/core';
import { getWeb3, getContractInstance, importArtifactsFromSource } from '../web3Helper';

import { RebalancingSetV2Helper } from './rebalancingSetV2Helper';

const web3 = getWeb3();
const RebalancingSetTokenV3 = importArtifactsFromSource('RebalancingSetTokenV3');

declare type CoreLikeContract = CoreMockContract | CoreContract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);

export class RebalancingSetV3Helper extends RebalancingSetV2Helper {

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
  public async deployRebalancingSetTokenV3Async(
    addressConfig: Address[],
    bigNumberConfig: BigNumber[],
    name: string = 'Rebalancing Set',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenV3Contract> {
    const truffleRebalancingToken = await RebalancingSetTokenV3.new(
      addressConfig,
      bigNumberConfig,
      name,
      symbol,
      { from, gas: DEFAULT_GAS },
    );

    const rebalancingToken = new RebalancingSetTokenV3Contract(
      getContractInstance(truffleRebalancingToken),
      { from, gas: DEFAULT_GAS },
    );

    return rebalancingToken;
  }

  public async createRebalancingTokenV3Async(
    core: CoreLikeContract,
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    callData: string = '',
    name: string = 'Rebalancing Set Token',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress,
  ): Promise<RebalancingSetTokenV3Contract> {
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

    return await RebalancingSetTokenV3Contract.at(
      setAddress,
      web3,
      { from }
    );
  }

  public async createDefaultRebalancingSetTokenV3Async(
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
  ): Promise<RebalancingSetTokenV3Contract> {
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
    return await this.createRebalancingTokenV3Async(
      core,
      factory,
      [initialSet],
      [initialUnitShares],
      DEFAULT_REBALANCING_NATURAL_UNIT,
      callData,
    );
  }

  public async getExpectedIncentiveFeeUnitShares(
    rebalancingSetToken: RebalancingSetTokenV3Contract,
    currentSet: SetTokenContract,
    vault: VaultContract
  ): Promise<BigNumber> {
    const totalSupply = await rebalancingSetToken.totalSupply.callAsync();
    const naturalUnit = await rebalancingSetToken.naturalUnit.callAsync();

    const currentSetAmount = await vault.getOwnerBalance.callAsync(
      currentSet.address,
      rebalancingSetToken.address,
    );

    return currentSetAmount.mul(naturalUnit).div(totalSupply).round(0, 2);
  }

  public generateRebalancingSetTokenV3CallData(
    managerAddress: Address,
    liquidatorAddress: Address,
    feeRecipient: Address,
    rebalanceFeeCalculator: Address,
    rebalanceInterval: BigNumber,
    failRebalancePeriod: BigNumber,
    lastRebalanceTimestamp: BigNumber,
    entryFee: BigNumber,
    rebalanceFeeCalculatorCalldata: Buffer[],
  ): string {
    return SetTestUtils.bufferArrayToHex([
      SetUtils.paddedBufferForPrimitive(managerAddress),
      SetUtils.paddedBufferForPrimitive(liquidatorAddress),
      SetUtils.paddedBufferForPrimitive(feeRecipient),
      SetUtils.paddedBufferForPrimitive(rebalanceFeeCalculator),
      SetUtils.paddedBufferForBigNumber(rebalanceInterval),
      SetUtils.paddedBufferForBigNumber(failRebalancePeriod),
      SetUtils.paddedBufferForBigNumber(lastRebalanceTimestamp),
      SetUtils.paddedBufferForBigNumber(entryFee),
    ].concat(rebalanceFeeCalculatorCalldata));
  }
}
