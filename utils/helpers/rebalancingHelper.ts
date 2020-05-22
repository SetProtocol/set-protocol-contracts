import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  ConstantAuctionPriceCurveContract,
  CoreContract,
  CoreMockContract,
  LinearAuctionPriceCurveContract,
  SetTokenContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenV2Contract,
  UpdatableConstantAuctionPriceCurveContract,
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
  DEFAULT_AUCTION_PRICE_DIVISOR,
  DEFAULT_REBALANCE_START_PRICE,
  DEFAULT_REBALANCE_TIME_TO_PIVOT,
} from '../constants';
import { extractNewSetTokenAddressFromLogs } from '../contract_logs/core';

import { Blockchain } from '../blockchain';
import { getWeb3, getContractInstance, importArtifactsFromSource, txnFrom } from '../web3Helper';

import { CoreHelper } from './coreHelper';
import { ERC20Helper } from './erc20Helper';

const web3 = getWeb3();
const ConstantAuctionPriceCurve = importArtifactsFromSource('ConstantAuctionPriceCurve');
const LinearAuctionPriceCurve = importArtifactsFromSource('LinearAuctionPriceCurve');
const RebalancingSetToken = importArtifactsFromSource('RebalancingSetToken');
const SetToken = importArtifactsFromSource('SetToken');
const UpdatableConstantAuctionPriceCurve = importArtifactsFromSource('UpdatableConstantAuctionPriceCurve');

declare type CoreLikeContract = CoreMockContract | CoreContract;
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const {
  SET_FULL_TOKEN_UNITS,
} = SetUtils.CONSTANTS;

export class RebalancingHelper {
  public _tokenOwnerAddress: Address;
  public _coreHelper: CoreHelper;
  public _erc20Helper: ERC20Helper;
  public _blockchain: Blockchain;

  constructor(
    tokenOwnerAddress: Address,
    coreHelper: CoreHelper,
    erc20Helper: ERC20Helper,
    blockchain: Blockchain,
  ) {
    this._tokenOwnerAddress = tokenOwnerAddress;

    this._coreHelper = coreHelper;
    this._erc20Helper = erc20Helper;
    this._blockchain = blockchain;
  }

  /* ============ Deployment ============ */

  public async deployRebalancingSetTokenAsync(
    factory: Address,
    tokenManager: Address,
    initialSet: Address,
    initialShareRatio: BigNumber,
    initialNaturalUnit: BigNumber,
    proposalPeriod: BigNumber,
    rebalanceCoolOffPeriod: BigNumber,
    rebalancingComponentWhiteListAddress: Address,
    name: string = 'Rebalancing Set',
    symbol: string = 'RBSET',
    from: Address = this._tokenOwnerAddress
  ): Promise<RebalancingSetTokenContract> {
    await this._coreHelper.linkRebalancingLibrariesAsync(RebalancingSetToken);

    const truffleRebalancingToken = await RebalancingSetToken.new(
      factory,
      tokenManager,
      initialSet,
      initialShareRatio,
      initialNaturalUnit,
      proposalPeriod,
      rebalanceCoolOffPeriod,
      rebalancingComponentWhiteListAddress,
      name,
      symbol,
      txnFrom(from)
    );

    const rebalancingToken = new RebalancingSetTokenContract(
      new web3.eth.Contract(truffleRebalancingToken.abi, truffleRebalancingToken.address),
      txnFrom(from)
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

    const txHash = await core.createSet.sendTransactionAsync(
      factory,
      componentAddresses,
      units,
      naturalUnit,
      encodedName,
      encodedSymbol,
      callData,
      txnFrom(from),
    );

    const logs = await setTestUtils.getLogsFromTxHash(txHash);
    const setAddress = extractNewSetTokenAddressFromLogs(logs);

    return await RebalancingSetTokenContract.at(
      setAddress,
      web3,
      txnFrom(from)
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

    const components = await this._erc20Helper.deployTokensAsync(tokenCount + 1, from);
    await this._erc20Helper.approveTransfersAsync(components, transferProxy, from);

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
      const setToken = await this._coreHelper.createSetTokenAsync(
        core,
        factory,
        setComponentAddresses,
        setComponentUnits,
        naturalUnit,
      );

      await setToken.approve.sendTransactionAsync(
        transferProxy,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        txnFrom(from)
      );

      setTokenArray.push(setToken);
    }

    return setTokenArray;
  }

  public async issueRebalancingSetFromBaseComponentsAsync(
    core: CoreLikeContract,
    transferProxyAddress: Address,
    rebalancingSetAddress: Address,
    rebalancingSetQuantity: BigNumber,
    from: Address = this._tokenOwnerAddress,
  ): Promise<void> {
      const rebalancingSet = await this._coreHelper.getRebalancingInstanceFromAddress(rebalancingSetAddress);
      const currentSetAddress = await rebalancingSet.currentSet.callAsync();
      const currentSetInstance = await this._coreHelper.getSetInstance(currentSetAddress);

      const baseSetNaturalUnit = await currentSetInstance.naturalUnit.callAsync();

      const rebalancingSetUnitShares = await rebalancingSet.unitShares.callAsync();
      const rebalancingSetNaturalUnit = await rebalancingSet.naturalUnit.callAsync();
      const currentSetRequiredAmountUnrounded = rebalancingSetQuantity
                                         .mul(rebalancingSetUnitShares)
                                         .div(rebalancingSetNaturalUnit)
                                         .round(0, 3);
      const currentSetRequiredAmount = currentSetRequiredAmountUnrounded.sub(
        currentSetRequiredAmountUnrounded.modulo(baseSetNaturalUnit)
      ).add(baseSetNaturalUnit);

      await core.issue.sendTransactionAsync(
        currentSetAddress,
        currentSetRequiredAmount,
        txnFrom(from),
      );

      await currentSetInstance.approve.sendTransactionAsync(
        transferProxyAddress,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        txnFrom(from),
      );
      await core.issue.sendTransactionAsync(
        rebalancingSet.address,
        rebalancingSetQuantity,
        txnFrom(from),
      );
  }

  public async redeemRebalancingSetToBaseComponentsAsync(
    core: CoreLikeContract,
    transferProxyAddress: Address,
    rebalancingSetAddress: Address,
    rebalancingSetQuantity: BigNumber,
    from: Address = this._tokenOwnerAddress,
  ): Promise<void> {
    const rebalancingSet = await this._coreHelper.getRebalancingInstanceFromAddress(rebalancingSetAddress);
    const currentSetAddress = await rebalancingSet.currentSet.callAsync();
    const currentSetInstance = await this._coreHelper.getSetInstance(currentSetAddress);

    const baseSetNaturalUnit = await currentSetInstance.naturalUnit.callAsync();

    const rebalancingSetUnitShares = await rebalancingSet.unitShares.callAsync();
    const rebalancingSetNaturalUnit = await rebalancingSet.naturalUnit.callAsync();
    const currentSetRequiredAmountUnrounded = rebalancingSetQuantity
                                       .mul(rebalancingSetUnitShares)
                                       .div(rebalancingSetNaturalUnit)
                                       .round(0, 3);
    const currentSetRequiredAmount = currentSetRequiredAmountUnrounded.sub(
      currentSetRequiredAmountUnrounded.modulo(baseSetNaturalUnit)
    );

    await core.redeemAndWithdrawTo.sendTransactionAsync(
      rebalancingSet.address,
      from,
      rebalancingSetQuantity,
      new BigNumber(0),
      txnFrom(from),
    );

    await core.redeemAndWithdrawTo.sendTransactionAsync(
      currentSetAddress,
      from,
      currentSetRequiredAmount,
      new BigNumber(0),
      txnFrom(from),
    );
  }

  /* ============ Price Libraries ============ */

  public async deployLinearAuctionPriceCurveAsync(
    priceDivisor: BigNumber,
    usesStartPrice: boolean,
    from: Address = this._tokenOwnerAddress
  ): Promise<LinearAuctionPriceCurveContract> {
    const truffleLinearAuctionPriceCurve = await LinearAuctionPriceCurve.new(
      priceDivisor,
      usesStartPrice,
      txnFrom(from),
    );

    return new LinearAuctionPriceCurveContract(
      getContractInstance(truffleLinearAuctionPriceCurve),
      txnFrom(from)
    );
  }

  public async deployConstantAuctionPriceCurveAsync(
    priceNumerator: BigNumber,
    priceDivisor: BigNumber,
    from: Address = this._tokenOwnerAddress
  ): Promise<ConstantAuctionPriceCurveContract> {
    const truffleConstantAuctionPriceCurve = await ConstantAuctionPriceCurve.new(
      priceNumerator,
      priceDivisor,
      txnFrom(from),
    );

    return new ConstantAuctionPriceCurveContract(
      getContractInstance(truffleConstantAuctionPriceCurve),
      txnFrom(from)
    );
  }

  public async deployUpdatableConstantAuctionPriceCurveAsync(
    priceNumerator: BigNumber,
    priceDivisor: BigNumber,
    from: Address = this._tokenOwnerAddress
  ): Promise<UpdatableConstantAuctionPriceCurveContract> {
    const truffleUpdatableConstantAuctionPriceCurve = await UpdatableConstantAuctionPriceCurve.new(
      priceNumerator,
      priceDivisor,
      txnFrom(from),
    );

    return new UpdatableConstantAuctionPriceCurveContract(
      new web3.eth.Contract(
        truffleUpdatableConstantAuctionPriceCurve.abi,
        truffleUpdatableConstantAuctionPriceCurve.address
       ),
      txnFrom(from)
    );
  }

  public async addPriceLibraryAsync(
    core: CoreLikeContract,
    priceLibrary: ConstantAuctionPriceCurveContract | LinearAuctionPriceCurveContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<void> {
    await core.addPriceLibrary.sendTransactionAsync(
      priceLibrary.address,
      txnFrom(from)
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
    const callData = SetUtils.generateRebalancingSetTokenCallData(
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
    const auctionTimeToPivot = DEFAULT_REBALANCE_TIME_TO_PIVOT;
    const auctionStartPrice = DEFAULT_REBALANCE_START_PRICE;
    const auctionPivotPrice = DEFAULT_AUCTION_PRICE_NUMERATOR;

    const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
    await this._coreHelper.addTokensToWhiteList(
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
    // Transition to propose, auctionLibrary MUST be approved priceLibrary on Core already
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

  public async bidAndWithdrawAsync(
    rebalanceAuctionModule: RebalanceAuctionModuleContract,
    rebalancingSetTokenAddress: Address,
    bidQuantity: BigNumber,
    allowPartialFill: boolean = false,
    caller: Address = this._tokenOwnerAddress,
  ): Promise<void> {
    await rebalanceAuctionModule.bidAndWithdraw.sendTransactionAsync(
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
    const priceDivisor = DEFAULT_AUCTION_PRICE_DIVISOR;

    // Calculate the inflows and outflow arrays
    const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
    const minimumBid = new BigNumber(biddingParameters[0]);
    const coefficient = minimumBid.div(priceDivisor);
    const effectiveQuantity = quantity.div(priceNumerator);

    for (let i = 0; i < combinedCurrentUnits.length; i++) {
      const flow = combinedRebalanceUnits[i].mul(priceDivisor).sub(combinedCurrentUnits[i].mul(priceNumerator));
      if (flow.greaterThan(0)) {
        inflowArray.push(effectiveQuantity.mul(flow).div(coefficient).round(0, 3));
        outflowArray.push(new BigNumber(0));
      } else {
        outflowArray.push(
          flow.mul(new BigNumber(-1)).mul(effectiveQuantity).div(coefficient).round(0, 3)
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
    rebalancingSetToken: (RebalancingSetTokenContract | RebalancingSetTokenV2Contract),
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
    priceDivisorParam: BigNumber,
  ): any {
    let priceNumerator: BigNumber;
    let priceDivisor: BigNumber;
    const timeIncrementsToZero = new BigNumber(1000);

    if (elapsedTime.lessThanOrEqualTo(auctionTimeToPivot)) {
      priceNumerator = elapsedTime.mul(auctionPivotPrice).div(auctionTimeToPivot).round(0, 3);
      priceDivisor = priceDivisorParam;
    } else {
      const timeIncrements = elapsedTime.sub(auctionTimeToPivot).div(30).round(0, 3);

      if (timeIncrements.lessThan(timeIncrementsToZero)) {
        priceNumerator = auctionPivotPrice;
        priceDivisor = priceDivisorParam.sub(timeIncrements.mul(priceDivisorParam).div(1000).round(0, 3));
      } else {
        priceDivisor = new BigNumber(1);
        priceNumerator = auctionPivotPrice.add(auctionPivotPrice.mul(timeIncrements.sub(1000)));
      }
    }
    return {
      priceNumerator,
      priceDivisor,
    };
  }

  public getExpectedOpenLinearAuctionPrice(
    elapsedTime: BigNumber,
    auctionTimeToPivot: BigNumber,
    auctionStartPrice: BigNumber,
    auctionPivotPrice: BigNumber,
    priceDivisorParam: BigNumber,
  ): any {
    let priceNumerator: BigNumber;
    let priceDivisor: BigNumber;
    const timeIncrementsToZero = new BigNumber(1000);

    if (elapsedTime.lessThanOrEqualTo(auctionTimeToPivot)) {
      priceNumerator = auctionStartPrice.add(
        elapsedTime.mul(
          auctionPivotPrice.sub(auctionStartPrice)
        ).div(auctionTimeToPivot).round(0, 3)
      );

      priceDivisor = priceDivisorParam;
    } else {
      const timeIncrements = elapsedTime.sub(auctionTimeToPivot).div(30).round(0, 3);

      if (timeIncrements.lessThan(timeIncrementsToZero)) {
        priceNumerator = auctionPivotPrice;
        priceDivisor = priceDivisorParam.sub(timeIncrements.mul(priceDivisorParam).div(1000).round(0, 3));
      } else {
        priceDivisor = new BigNumber(1);
        priceNumerator = auctionPivotPrice.add(auctionPivotPrice.mul(timeIncrements.sub(1000)));
      }
    }
    return {
      priceNumerator,
      priceDivisor,
    };
  }

  public getExpectedGeneralNextSetParameters(
    tokenOnePrice: BigNumber,
    tokenTwoPrice: BigNumber,
    tokenOneMultiplier: BigNumber,
    tokenTwoMultiplier: BigNumber,
    decimalDifference: BigNumber,
    pricePrecision: BigNumber
  ): any {
    let units: BigNumber[];

    const naturalUnit: BigNumber = pricePrecision.mul(decimalDifference);
    if (tokenTwoPrice.greaterThanOrEqualTo(tokenOnePrice)) {
      const tokenOneUnits = tokenTwoPrice.mul(decimalDifference).mul(pricePrecision).div(tokenOnePrice).round(0, 3);
      units = [tokenOneMultiplier.mul(tokenOneUnits), tokenTwoMultiplier.mul(pricePrecision)];
    } else {
      const tokenTwoUnits = tokenOnePrice.mul(pricePrecision).div(tokenTwoPrice).round(0, 3);
      units = [pricePrecision.mul(decimalDifference).mul(tokenOneMultiplier), tokenTwoUnits.mul(tokenTwoMultiplier)];
    }

    return {
      units,
      naturalUnit,
    };
  }

  public async getExpectedGeneralAuctionParameters(
    tokenOnePrice: BigNumber,
    tokenTwoPrice: BigNumber,
    tokenOneMultiplier: BigNumber,
    tokenTwoMultiplier: BigNumber,
    tokenOneDecimals: BigNumber,
    tokenTwoDecimals: BigNumber,
    pricePrecision: BigNumber,
    auctionTimeToPivot: BigNumber,
    currentSetToken: SetTokenContract,
  ): Promise<any> {
    const THIRTY_MINUTES_IN_SECONDS = new BigNumber(30 * 60);

    const nextSetParams = this.getExpectedGeneralNextSetParameters(
      tokenOnePrice,
      tokenTwoPrice,
      tokenOneMultiplier,
      tokenTwoMultiplier,
      tokenOneDecimals.div(tokenTwoDecimals),
      pricePrecision,
    );

    const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();
    const currentSetUnits = await currentSetToken.getUnits.callAsync();

    const currentSetDollarAmount = this.computeTokenValue(
      currentSetUnits,
      currentSetNaturalUnit,
      tokenOnePrice,
      tokenTwoPrice,
      tokenOneDecimals,
      tokenTwoDecimals,
    );

    const nextSetDollarAmount = this.computeTokenValue(
      nextSetParams['units'],
      nextSetParams['naturalUnit'],
      tokenOnePrice,
      tokenTwoPrice,
      tokenOneDecimals,
      tokenTwoDecimals,
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
      getContractInstance(SetToken, setTokenAddress),
      { from: this._tokenOwnerAddress },
    );
  }

  private computeTokenValue(
    units: BigNumber[],
    naturalUnit: BigNumber,
    tokenOnePrice: BigNumber,
    tokenTwoPrice: BigNumber,
    tokenOneDecimals: BigNumber,
    tokenTwoDecimals: BigNumber,
  ): BigNumber {
    const tokenOneUnitsInFullToken = SET_FULL_TOKEN_UNITS.mul(units[0]).div(naturalUnit).round(0, 3);
    const tokenTwoUnitsInFullToken = SET_FULL_TOKEN_UNITS.mul(units[1]).div(naturalUnit).round(0, 3);

    const tokenOneDollarAmount = this.computeTokenDollarAmount(
      tokenOnePrice,
      tokenOneUnitsInFullToken,
      tokenOneDecimals
    );
    const tokenTwoDollarAmount = this.computeTokenDollarAmount(
      tokenTwoPrice,
      tokenTwoUnitsInFullToken,
      tokenTwoDecimals
    );

    return tokenOneDollarAmount.add(tokenTwoDollarAmount);
  }

  private computeTokenDollarAmount(
    tokenPrice: BigNumber,
    unitsInFullSet: BigNumber,
    tokenDecimals: BigNumber,
  ): BigNumber {
    const VALUE_TO_CENTS_CONVERSION = new BigNumber(10 ** 16);

    return tokenPrice
             .mul(unitsInFullSet)
             .div(tokenDecimals)
             .div(VALUE_TO_CENTS_CONVERSION)
             .round(0, 3);
  }

  /* ============ Bidding Convenience functions ============ */
  public getTimeToFairValue(
    auctionTimeToPivot: BigNumber
  ): BigNumber {
    return auctionTimeToPivot.div(2);
  }

  public async calculateCurrentSetBidQuantity(
    startingCurrentSets: BigNumber,
    percentToBid: number,
    minimumBid: BigNumber,
  ): Promise<BigNumber> {
    const bidQuantity = startingCurrentSets.mul(percentToBid).div(100);
    const normalizedQuantity = bidQuantity.div(minimumBid).round(0, 3).mul(minimumBid);

    return normalizedQuantity;
  }


  /* ============ Set Token Convenience function ============ */
  public async getRebalancingSetInstance(
     rebalancingSetTokenAddress: Address,
     from: Address = this._tokenOwnerAddress,
  ): Promise<RebalancingSetTokenContract> {
    return new RebalancingSetTokenContract(
      getContractInstance(RebalancingSetToken, rebalancingSetTokenAddress),
      txnFrom(from)
    );
  }
}
