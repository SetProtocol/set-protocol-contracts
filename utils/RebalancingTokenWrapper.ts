import * as _ from 'lodash';
import { Address, SetProtocolUtils, SetProtocolTestUtils } from 'set-protocol-utils';

import {
  CoreContract,
  CoreMockContract,
  SetTokenContract,
  RebalancingSetTokenContract,
  VaultContract
} from './contracts';
import { BigNumber } from 'bignumber.js';

import { ether } from './units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_UNIT_SHARES,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  AUCTION_TIME_INCREMENT
} from './constants';

import { CoreWrapper } from './coreWrapper';
import { ERC20Wrapper } from './erc20Wrapper';
import { Blockchain } from './blockchain';

declare type CoreLikeContract = CoreMockContract | CoreContract;

export class RebalancingTokenWrapper {
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

  public async createDefaultRebalancingSetTokenAsync(
    core: CoreLikeContract,
    factory: Address,
    manager: Address,
    initialSet: Address,
    proposalPeriod: BigNumber,
  ): Promise<RebalancingSetTokenContract> {
    // Generate defualt rebalancingSetToken params
    const initialUnitShares = DEFAULT_UNIT_SHARES;
    const rebalanceInterval = ONE_DAY_IN_SECONDS;
    const callData = SetProtocolTestUtils.bufferArrayToHex([
      SetProtocolUtils.paddedBufferForPrimitive(manager),
      SetProtocolUtils.paddedBufferForBigNumber(proposalPeriod),
      SetProtocolUtils.paddedBufferForBigNumber(rebalanceInterval),
    ]);

    // Create rebalancingSetToken
    return await this._coreWrapper.createRebalancingTokenAsync(
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
    const unitShares = issueAmount.div(naturalUnitsOutstanding).round(0, 3);
    return {unitShares, issueAmount};
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
