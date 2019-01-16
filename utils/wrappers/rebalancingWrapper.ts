import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  BTCETHRebalancingManagerContract,
  ConstantAuctionPriceCurveContract,
  CoreContract,
  CoreMockContract,
  LinearAuctionPriceCurveContract,
  SetTokenContract,
  RebalancingSetTokenContract,
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
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DENOMINATOR,
} from '../constants';
import { extractNewSetTokenAddressFromLogs } from '../contract_logs/core';

import { Blockchain } from '../blockchain';
import { getWeb3 } from '../web3Helper';

import { CoreWrapper } from './coreWrapper';
import { ERC20Wrapper } from './erc20Wrapper';

const web3 = getWeb3();
const ConstantAuctionPriceCurve = artifacts.require('ConstantAuctionPriceCurve');
const LinearAuctionPriceCurve = artifacts.require('LinearAuctionPriceCurve');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const BTCETHRebalancingManager = artifacts.require('BTCETHRebalancingManager');
const SetToken = artifacts.require('SetToken');

declare type CoreLikeContract = CoreMockContract | CoreContract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const {
  SET_FULL_TOKEN_UNITS,
  WBTC_FULL_TOKEN_UNITS,
  WETH_FULL_TOKEN_UNITS,
} = SetUtils.CONSTANTS;

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
    rebalancingComponentWhiteListAddress: Address,
    name: string = 'Rebalancing Set',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenContract> {
    const truffleRebalancingToken = await RebalancingSetToken.new(
      factory,
      tokenManager,
      initialSet,
      initialShareRatio,
      proposalPeriod,
      rebalanceCoolOffPeriod,
      rebalancingComponentWhiteListAddress,
      name,
      symbol,
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
    priceDenominator: BigNumber,
    from: Address = this._tokenOwnerAddress
  ): Promise<LinearAuctionPriceCurveContract> {
    const truffleLinearAuctionPriceCurve = await LinearAuctionPriceCurve.new(
      priceDenominator,
      { from },
    );

    return new LinearAuctionPriceCurveContract(
      new web3.eth.Contract(truffleLinearAuctionPriceCurve.abi, truffleLinearAuctionPriceCurve.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployConstantAuctionPriceCurveAsync(
    priceNumerator: BigNumber,
    priceDenominator: BigNumber,
    from: Address = this._tokenOwnerAddress
  ): Promise<ConstantAuctionPriceCurveContract> {
    const truffleConstantAuctionPriceCurve = await ConstantAuctionPriceCurve.new(
      priceNumerator,
      priceDenominator,
      { from },
    );

    return new ConstantAuctionPriceCurveContract(
      new web3.eth.Contract(truffleConstantAuctionPriceCurve.abi, truffleConstantAuctionPriceCurve.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async addPriceLibraryAsync(
    core: CoreLikeContract,
    priceLibrary: ConstantAuctionPriceCurveContract | LinearAuctionPriceCurveContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<void> {
    await core.addPriceLibrary.sendTransactionAsync(
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
    initialUnitShares: BigNumber = DEFAULT_UNIT_SHARES,
  ): Promise<RebalancingSetTokenContract> {
    // Generate defualt rebalancingSetToken params
    const rebalanceInterval = ONE_DAY_IN_SECONDS;
    const callData = SetUtils.generateRSetTokenCallData(
      manager,
      proposalPeriod,
      rebalanceInterval,
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
    core: CoreLikeContract,
    rebalancingComponentWhiteList: WhiteListContract,
    rebalancingSetToken: RebalancingSetTokenContract,
    nextSetToken: SetTokenContract,
    auctionLibrary: Address,
    caller: Address
  ): Promise<void> {
    // Generate default propose params
    const auctionTimeToPivot = new BigNumber(100000);
    const auctionStartPrice = new BigNumber(500);
    const auctionPivotPrice = DEFAULT_AUCTION_PRICE_NUMERATOR;

    const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
    await this._coreWrapper.addTokensToWhiteList(
      nextSetTokenComponentAddresses,
      rebalancingComponentWhiteList
    );

    // Transition to propose
    await this.transitionToProposeAsync(
      core,
      rebalancingSetToken,
      nextSetToken,
      auctionLibrary,
      auctionTimeToPivot,
      auctionStartPrice,
      auctionPivotPrice,
      caller,
    );
  }

  public async transitionToProposeAsync(
    core: CoreLikeContract,
    rebalancingSetToken: RebalancingSetTokenContract,
    nextSetToken: SetTokenContract,
    auctionLibrary: Address,
    auctionTimeToPivot: BigNumber,
    auctionStartPrice: BigNumber,
    auctionPivotPrice: BigNumber,
    caller: Address
  ): Promise<void> {
    // Approve price library
    await core.addPriceLibrary.sendTransactionAsync(
      auctionLibrary,
      { from: this._tokenOwnerAddress, gas: DEFAULT_GAS}
    );

    // Transition to propose
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.propose.sendTransactionAsync(
      nextSetToken.address,
      auctionLibrary,
      auctionTimeToPivot,
      auctionStartPrice,
      auctionPivotPrice,
      { from: caller, gas: DEFAULT_GAS}
    );
  }

  public async defaultTransitionToRebalanceAsync(
    core: CoreLikeContract,
    rebalancingComponentWhiteList: WhiteListContract,
    rebalancingSetToken: RebalancingSetTokenContract,
    nextSetToken: SetTokenContract,
    auctionLibrary: Address,
    caller: Address
  ): Promise<void> {
    // Transition to propose
    await this.defaultTransitionToProposeAsync(
      core,
      rebalancingComponentWhiteList,
      rebalancingSetToken,
      nextSetToken,
      auctionLibrary,
      caller
    );

    // Transition to rebalance
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.startRebalance.sendTransactionAsync(
      { from: caller, gas: DEFAULT_GAS }
    );
  }

  public async transitionToRebalanceAsync(
    core: CoreLikeContract,
    rebalancingSetToken: RebalancingSetTokenContract,
    nextSetToken: SetTokenContract,
    auctionLibrary: Address,
    auctionTimeToPivot: BigNumber,
    auctionStartPrice: BigNumber,
    auctionPivotPrice: BigNumber,
    caller: Address
  ): Promise<void> {
    await this.transitionToProposeAsync(
      core,
      rebalancingSetToken,
      nextSetToken,
      auctionLibrary,
      auctionTimeToPivot,
      auctionStartPrice,
      auctionPivotPrice,
      caller
    );

    // Transition to rebalance
    await this._blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
    await rebalancingSetToken.startRebalance.sendTransactionAsync(
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
    const priceDivisor = DEFAULT_AUCTION_PRICE_DENOMINATOR;

    // Calculate the inflows and outflow arrays
    const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
    const minimumBid = new BigNumber(biddingParameters[0]);
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
    core: CoreMockContract,
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
    // Calculate unitShares by finding how many natural units worth of the rebalancingSetToken have been issued
    // Divide maxIssueAmount by this to find unitShares, remultiply unitShares by issued amount of rebalancing-
    // SetToken in natural units to get amount of new Sets to issue
    const issueAmount = maxIssueAmount.div(newSetNaturalUnit).round(0, 3).mul(newSetNaturalUnit);
    const naturalUnitsOutstanding = totalSupply.div(rebalancingNaturalUnit);
    const unitShares = issueAmount.div(naturalUnitsOutstanding).round(0, 3);

    return { unitShares, issueAmount };
  }

  public getExpectedLinearAuctionPrice(
    elapsedTime: BigNumber,
    auctionTimeToPivot: BigNumber,
    auctionPivotPrice: BigNumber,
    priceDivisor: BigNumber,
  ): any {
    let priceNumerator: BigNumber;
    let priceDenominator: BigNumber;
    const timeIncrementsToZero = new BigNumber(1000);

    if (elapsedTime.lessThanOrEqualTo(auctionTimeToPivot)) {
      priceNumerator = elapsedTime.mul(auctionPivotPrice).div(auctionTimeToPivot).round(0, 3);

      priceDenominator = priceDivisor;
    } else {
      const timeIncrements = elapsedTime.sub(auctionTimeToPivot).div(30).round(0, 3);

      if (timeIncrements.lessThan(timeIncrementsToZero)) {
        priceNumerator = auctionPivotPrice;
        priceDenominator = priceDivisor.sub(timeIncrements.mul(priceDivisor).div(1000).round(0, 3));
      } else {
        priceDenominator = new BigNumber(1);
        priceNumerator = auctionPivotPrice.add(auctionPivotPrice.mul(timeIncrements.sub(1000)));
      }
    }
    return {
      priceNumerator,
      priceDenominator,
    };
  }

  /* ============ Rebalancing Token Manager ============ */

  public async deployBTCETHRebalancingManagerAsync(
    coreAddress: Address,
    btcPriceFeedAddress: Address,
    ethPriceFeedAddress: Address,
    btcAddress: Address,
    ethAddress: Address,
    setTokenFactoryAddress: Address,
    auctionLibrary: Address,
    auctionTimeToPivot: BigNumber = new BigNumber(100000),
    from: Address = this._tokenOwnerAddress
  ): Promise<BTCETHRebalancingManagerContract> {
    const truffleRebalacingTokenManager = await BTCETHRebalancingManager.new(
      coreAddress,
      btcPriceFeedAddress,
      ethPriceFeedAddress,
      btcAddress,
      ethAddress,
      setTokenFactoryAddress,
      auctionLibrary,
      auctionTimeToPivot,
      { from },
    );

    return new BTCETHRebalancingManagerContract(
      new web3.eth.Contract(truffleRebalacingTokenManager.abi, truffleRebalacingTokenManager.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public getExpectedNextSetParameters(
    btcPrice: BigNumber,
    ethPrice: BigNumber,
  ): any {
    let units: BigNumber[];
    let naturalUnit: BigNumber;
    if (btcPrice.greaterThanOrEqualTo(ethPrice)) {
      const ethUnits = btcPrice.mul(new BigNumber(10 ** 10)).div(ethPrice).round(0, 3);
      units = [new BigNumber(1), ethUnits];
      naturalUnit = new BigNumber(10 ** 10);
    } else {
      const btcUnits = ethPrice.mul(new BigNumber(100)).div(btcPrice).round(0, 3);
      const ethUnits = new BigNumber(100).mul(new BigNumber(10 ** 10));
      units = [btcUnits, ethUnits];
      naturalUnit = new BigNumber(10 ** 12);
    }

    return {
      units,
      naturalUnit,
    };
  }

  public async getExpectedAuctionParameters(
    btcPrice: BigNumber,
    ethPrice: BigNumber,
    auctionTimeToPivot: BigNumber,
    currentSetToken: SetTokenContract,
  ): Promise<any> {
    const THIRTY_MINUTES_IN_SECONDS = new BigNumber(30 * 60);

    const nextSetParams = this.getExpectedNextSetParameters(
      btcPrice,
      ethPrice
    );

    const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();
    const currentSetUnits = await currentSetToken.getUnits.callAsync();

    const currentSetDollarAmount = this.computeTokenValue(
      currentSetUnits,
      currentSetNaturalUnit,
      btcPrice,
      ethPrice
    );

    const nextSetDollarAmount = this.computeTokenValue(
      nextSetParams['units'],
      nextSetParams['naturalUnit'],
      btcPrice,
      ethPrice
    );

    const fairValue = nextSetDollarAmount.div(currentSetDollarAmount).mul(1000).round(0, 3);
    const onePercentSlippage = fairValue.div(100).round(0, 3);

    const thirtyMinutePeriods = auctionTimeToPivot.div(THIRTY_MINUTES_IN_SECONDS).round(0, 3);
    const halfPriceRange = thirtyMinutePeriods.mul(onePercentSlippage).div(2).round(0, 3);

    const auctionStartPrice = fairValue.sub(halfPriceRange);
    const auctionPivotPrice = fairValue.add(halfPriceRange);

    return {
      auctionStartPrice,
      auctionPivotPrice,
    };
  }

  public async getExpectedSetTokenAsync(
    setTokenAddress: Address,
  ): Promise<SetTokenContract> {
    return new SetTokenContract(
      new web3.eth.Contract(SetToken.abi, setTokenAddress),
      { from: this._tokenOwnerAddress },
    );
  }

  private computeTokenValue(
    units: BigNumber[],
    naturalUnit: BigNumber,
    btcPrice: BigNumber,
    ethPrice: BigNumber,
  ): BigNumber {
    const btcUnitsInFullToken = SET_FULL_TOKEN_UNITS.mul(units[0]).div(naturalUnit).round(0, 3);
    const ethUnitsInFullToken = SET_FULL_TOKEN_UNITS.mul(units[1]).div(naturalUnit).round(0, 3);

    const btcDollarAmount = btcPrice.mul(btcUnitsInFullToken).div(WBTC_FULL_TOKEN_UNITS).round(0, 3);
    const ethDollarAmount = ethPrice.mul(ethUnitsInFullToken).div(WETH_FULL_TOKEN_UNITS).round(0, 3);

    return btcDollarAmount.add(ethDollarAmount);
  }
}
