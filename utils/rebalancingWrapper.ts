import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  ConstantAuctionPriceCurveContract,
  CoreContract,
  CoreMockContract,
  LinearAuctionPriceCurveContract,
  SetTokenContract,
  RebalancingSetTokenContract,
  VaultContract
} from './contracts';
import { BigNumber } from 'bignumber.js';

import { ether } from './units';
import {
  AUCTION_TIME_INCREMENT,
  DEFAULT_GAS,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_UNIT_SHARES,
  ONE_DAY_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO,
} from './constants';
import { extractNewSetTokenAddressFromLogs } from './contract_logs/core';

import { CoreWrapper } from './coreWrapper';
import { ERC20Wrapper } from './erc20Wrapper';
import { Blockchain } from './blockchain';
import {
  getWeb3,
} from './web3Helper';

const web3 = getWeb3();
const ConstantAuctionPriceCurve = artifacts.require('ConstantAuctionPriceCurve');
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');

declare type CoreLikeContract = CoreMockContract | CoreContract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);

export class RebalancingWrapper {
  private _tokenOwnerAddress: Address;
  private _coreWrapper: CoreWrapper;
  private _erc20Wrapper: ERC20Wrapper;
  private _blockchain: Blockchain;

  constructor(
    tokenOwnerAddress: Address,
    coreWrapper: CoreWrapper,
    erc20Wrapper: ERC20Wrapper,
    blockchain: Blockchain,
  ) {
    this._tokenOwnerAddress = tokenOwnerAddress;

    this._coreWrapper = coreWrapper;
    this._erc20Wrapper = erc20Wrapper;
    this._blockchain = blockchain;
  }

  public async deployRebalancingSetTokenAsync(
    factory: Address,
    tokenManager: Address,
    initialSet: Address,
    initialShareRatio: BigNumber,
    proposalPeriod: BigNumber,
    rebalanceCoolOffPeriod: BigNumber,
    entranceFee: BigNumber,
    rebalanceFee: BigNumber,
    name: string = 'Rebalancing Set',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenContract> {
    const encodedName = SetUtils.stringToBytes(name);
    const encodedSymbol = SetUtils.stringToBytes(symbol);

    const truffleRebalancingToken = await RebalancingSetToken.new(
      factory,
      tokenManager,
      initialSet,
      initialShareRatio,
      proposalPeriod,
      rebalanceCoolOffPeriod,
      entranceFee,
      rebalanceFee,
      encodedName,
      encodedSymbol,
      { from, gas: DEFAULT_GAS },
    );

    const rebalancingToken = new RebalancingSetTokenContract(
      new web3.eth.Contract(truffleRebalancingToken.abi, truffleRebalancingToken.address),
      { from, gas: DEFAULT_GAS },
    );

    return rebalancingToken;
  }

  public async createRebalancingTokenAsync(
    core: CoreLikeContract,
    factory: Address,
    componentAddresses: Address[],
    units: BigNumber[],
    naturalUnit: BigNumber,
    callData: string = '',
    name: string = 'Rebalancing Set Token',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress,
  ): Promise<RebalancingSetTokenContract> {
    const encodedName = SetUtils.stringToBytes(name);
    const encodedSymbol = SetUtils.stringToBytes(symbol);

    const txHash = await core.create.sendTransactionAsync(
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

    return await RebalancingSetTokenContract.at(
      setAddress,
      web3,
      { from }
    );
  }

  public async createSetTokensAsync(
    core: CoreLikeContract,
    factory: Address,
    transferProxy: Address,
    tokenCount: number,
    naturalUnits: BigNumber[] = undefined,
    from: Address = this._tokenOwnerAddress,
  ): Promise<SetTokenContract[]> {
    let naturalUnit: BigNumber;
    const setTokenArray: SetTokenContract[] = [];

    const components = await this._erc20Wrapper.deployTokensAsync(tokenCount + 1, this._tokenOwnerAddress);
    await this._erc20Wrapper.approveTransfersAsync(components, transferProxy);

    const indexArray = _.times(tokenCount, Number);
    for (const index in indexArray) {
      let minimumDecimal: number;
      const idx = Number(index);
      const componentOneDecimal = await components[idx].decimals.callAsync();
      const componentTwoDecimal = await components[idx + 1].decimals.callAsync();

      // Determine minimum natural unit if not passed in
      if (naturalUnits) {
        naturalUnit = naturalUnits[idx];
        minimumDecimal = 18 - naturalUnit.e;
      } else {
        minimumDecimal = Math.min(componentOneDecimal.toNumber(), componentTwoDecimal.toNumber());
        naturalUnit = new BigNumber(10 ** (18 - minimumDecimal));
      }

      // Get Set component and component units
      const setComponents = components.slice(idx, idx + 2);
      const setComponentAddresses = _.map(setComponents, token => token.address);
      const setComponentUnits: BigNumber[] = [
        new BigNumber(10 ** (componentOneDecimal.toNumber() - minimumDecimal)).mul(new BigNumber(idx + 1)),
        new BigNumber(10 ** (componentTwoDecimal.toNumber() - minimumDecimal)).mul(new BigNumber(idx + 1)),
      ];

      // Create Set token
      const setToken = await this._coreWrapper.createSetTokenAsync(
        core,
        factory,
        setComponentAddresses,
        setComponentUnits,
        naturalUnit,
      );

      setTokenArray.push(setToken);
    }

    return setTokenArray;
  }

  /* ============ Price Libraries ============ */

  public async deployLinearAuctionPriceCurveAsync(
    from: Address = this._tokenOwnerAddress
  ): Promise<LinearAuctionPriceCurveContract> {
    const truffleLinearAuctionPriceCurve = await LinearAuctionPriceCurve.new(
      { from },
    );

    return new LinearAuctionPriceCurveContract(
      new web3.eth.Contract(truffleLinearAuctionPriceCurve.abi, truffleLinearAuctionPriceCurve.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployConstantAuctionPriceCurveAsync(
    price: BigNumber,
    from: Address = this._tokenOwnerAddress
  ): Promise<ConstantAuctionPriceCurveContract> {
    const truffleConstantAuctionPriceCurve = await ConstantAuctionPriceCurve.new(
      price,
      { from },
    );

    return new ConstantAuctionPriceCurveContract(
      new web3.eth.Contract(truffleConstantAuctionPriceCurve.abi, truffleConstantAuctionPriceCurve.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async enablePriceLibraryAsync(
    core: CoreLikeContract,
    priceLibrary: ConstantAuctionPriceCurveContract | LinearAuctionPriceCurveContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<void> {
    await core.enablePriceLibrary.sendTransactionAsync(
      priceLibrary.address,
      { from }
    );
  }

  public async createDefaultRebalancingSetTokenAsync(
    core: CoreLikeContract,
    factory: Address,
    manager: Address,
    initialSet: Address,
    proposalPeriod: BigNumber,
    entranceFee: BigNumber = ZERO,
    rebalanceFee: BigNumber = ZERO,
    initialUnitShares: BigNumber = DEFAULT_UNIT_SHARES,
  ): Promise<RebalancingSetTokenContract> {
    // Generate defualt rebalancingSetToken params
    const rebalanceInterval = ONE_DAY_IN_SECONDS;
    const callData = SetUtils.generateRebalancingSetTokenCallData(
      manager,
      proposalPeriod,
      rebalanceInterval,
      entranceFee,
      rebalanceFee
    );

    // Create rebalancingSetToken
    return await this.createRebalancingTokenAsync(
      core,
      factory,
      [initialSet],
      [initialUnitShares],
      DEFAULT_REBALANCING_NATURAL_UNIT,
      callData,
    );
  }

  public async defaultTransitionToProposeAsync(
    rebalancingSetToken: RebalancingSetTokenContract,
    newRebalancingSetToken: Address,
    auctionLibrary: Address,
    caller: Address
  ): Promise<void> {
    // Generate default propose params
    const curveCoefficient = ether(1);
    const auctionStartPrice = new BigNumber(500);
    const auctionPriceDivisor = new BigNumber(1000);

    // Transition to propose
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.propose.sendTransactionAsync(
      newRebalancingSetToken,
      auctionLibrary,
      curveCoefficient,
      auctionStartPrice,
      auctionPriceDivisor,
      { from: caller, gas: DEFAULT_GAS}
    );
  }

  public async defaultTransitionToRebalanceAsync(
    rebalancingSetToken: RebalancingSetTokenContract,
    newRebalancingSetToken: Address,
    auctionLibrary: Address,
    caller: Address
  ): Promise<void> {
    // Transition to propose
    await this.defaultTransitionToProposeAsync(
      rebalancingSetToken,
      newRebalancingSetToken,
      auctionLibrary,
      caller
    );

    // Transition to rebalance
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.rebalance.sendTransactionAsync(
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  public async constructInflowOutflowArraysAsync(
    rebalancingSetToken: RebalancingSetTokenContract,
    quantity: BigNumber,
    priceNumerator: BigNumber,
  ): Promise<any> {
    const inflowArray: BigNumber[] = [];
    const outflowArray: BigNumber[] = [];

    // Get unit arrays
    const combinedCurrentUnits = await rebalancingSetToken.getCombinedCurrentUnits.callAsync();
    const combinedRebalanceUnits = await rebalancingSetToken.getCombinedNextSetUnits.callAsync();

    // Define price
    const priceDivisor = new BigNumber(1000);

    // Calculate the inflows and outflow arrays
    const minimumBid = await rebalancingSetToken.minimumBid.callAsync();
    const coefficient = minimumBid.div(priceDivisor);
    const effectiveQuantity = quantity.mul(priceDivisor).div(priceNumerator);

    for (let i = 0; i < combinedCurrentUnits.length; i++) {
      const flow = combinedRebalanceUnits[i].mul(priceDivisor).sub(combinedCurrentUnits[i].mul(priceNumerator));
      if (flow.greaterThan(0)) {
        inflowArray.push(effectiveQuantity.mul(flow).div(coefficient).round(0, 3).div(priceDivisor).round(0, 3));
        outflowArray.push(new BigNumber(0));
      } else {
        outflowArray.push(
          flow.mul(effectiveQuantity).div(coefficient).round(0, 3).div(priceDivisor).round(0, 3).mul(new BigNumber(-1))
        );
        inflowArray.push(new BigNumber(0));
      }
    }
    return {inflowArray, outflowArray};
  }

  // Used to construct expected combined unit arrays made during propose calls
  public async constructCombinedUnitArrayAsync(
    rebalancingSetToken: RebalancingSetTokenContract,
    targetSetToken: SetTokenContract,
    otherSetToken: SetTokenContract
  ): Promise<BigNumber[]> {
    // Get target set tokens units and natural units of both set tokens
    const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
    const setTokenComponents = await targetSetToken.getComponents.callAsync();
    const setTokenUnits = await targetSetToken.getUnits.callAsync();
    const targetSetNaturalUnit = await targetSetToken.naturalUnit.callAsync();
    const otherSetNaturalUnit = await otherSetToken.naturalUnit.callAsync();

    // Calculate minimumBidAmount
    const maxNaturalUnit = Math.max(targetSetNaturalUnit.toNumber(), otherSetNaturalUnit.toNumber());

    // Create combined unit array for target Set
    const combinedSetTokenUnits: BigNumber[] = [];
    combinedTokenArray.forEach(address => {
      const index = setTokenComponents.indexOf(address);
      if (index != -1) {
        const totalTokenAmount = setTokenUnits[index].mul(maxNaturalUnit).div(targetSetNaturalUnit);
        combinedSetTokenUnits.push(totalTokenAmount);
      } else {
        combinedSetTokenUnits.push(new BigNumber(0));
      }
    });
    return combinedSetTokenUnits;
  }

  public async getExpectedUnitSharesAndIssueAmount(
    rebalancingSetToken: RebalancingSetTokenContract,
    newSet: SetTokenContract,
    vault: VaultContract
  ): Promise<any> {
    // Gather data needed for calculations
    const totalSupply = await rebalancingSetToken.totalSupply.callAsync();
    const rebalancingNaturalUnit = await rebalancingSetToken.naturalUnit.callAsync();
    const rebalanceFee = await rebalancingSetToken.rebalanceFee.callAsync();
    const newSetNaturalUnit = await newSet.naturalUnit.callAsync();
    const components = await newSet.getComponents.callAsync();
    const units = await newSet.getUnits.callAsync();

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
    const naturalUnitsOutstanding = totalSupply.div(rebalancingNaturalUnit);
    // Calculate unitShares by finding how many natural units worth of the rebalancingSetToken have been issued
    // Divide maxIssueAmount by this to find unitShares, remultiply unitShares by issued amount of rebalancing-
    // SetToken in natural units to get amount of new Sets to issue
    const issueAmount = maxIssueAmount.div(newSetNaturalUnit).round(0, 3).mul(newSetNaturalUnit);
    const totalFees = issueAmount.mul(rebalanceFee).div(10000).round(0, 3);
    const unitShares = issueAmount.sub(totalFees).div(naturalUnitsOutstanding).round(0, 3);
    return {unitShares, issueAmount, totalFees};
  }

  public async setProtocolAddressAndEnableFees(
    core: CoreLikeContract,
    protocolAddress: Address,
  ): Promise<void> {
    await core.setProtocolAddress.sendTransactionAsync(
      protocolAddress,
      { from: this._tokenOwnerAddress },
    );

    await core.setFeesEnabled.sendTransactionAsync(
      true,
      { from: this._tokenOwnerAddress },
    );
  }

  public separateProtocolAndManagerFees(
    totalFees: BigNumber,
    protocolFee: BigNumber,
  ): any {
    const protocolAmount = totalFees.mul(protocolFee).round(0, 3);
    const managerAmount = totalFees.sub(protocolAmount);
    return { protocolAmount, managerAmount };
  }

  public getExpectedLinearAuctionPrice(
    elapsedTime: BigNumber,
    curveCoefficient: BigNumber,
    auctionStartPrice: BigNumber
  ): BigNumber {
    const elaspedTimeFromStart = elapsedTime.div(AUCTION_TIME_INCREMENT).round(0, 3);
    const expectedPrice = curveCoefficient.mul(elaspedTimeFromStart).add(auctionStartPrice);
    return expectedPrice;
  }
}
