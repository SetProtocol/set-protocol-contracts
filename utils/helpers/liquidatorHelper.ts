import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import * as ethUtil from 'ethereumjs-util';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  AuctionMockContract,
  AuctionGettersMockContract,
  LinearAuctionLiquidatorContract,
  LinearAuctionMockContract,
  LiquidatorMockContract,
  LiquidatorProxyContract,
  LiquidatorUtilsMockContract,
  OracleWhiteListContract,
  SetTokenContract,
  TWAPAuctionCallerContract,
  TWAPAuctionMockContract,
  TWAPAuctionGettersMockContract,
  TWAPLiquidatorContract,
  TwoAssetPriceBoundedLinearAuctionMockContract,
} from '../contracts';
import {
  coerceStructBNValuesToString,
  getContractInstance,
  importArtifactsFromSource,
  txnFrom,
  getWeb3,
} from '../web3Helper';
import {
  AUCTION_CURVE_DENOMINATOR,
  SCALE_FACTOR,
  ZERO,
  ONE_DAY_IN_SECONDS,
} from '../constants';
import {
  AssetPairVolumeBounds,
  LinearAuction,
  TokenFlow
} from '../auction';
import { ether } from '../units';

const web3 = getWeb3();

const AuctionMock = importArtifactsFromSource('AuctionMock');
const AuctionGettersMock = importArtifactsFromSource('AuctionGettersMock');
const LinearAuctionLiquidator = importArtifactsFromSource('LinearAuctionLiquidator');
const LinearAuctionMock = importArtifactsFromSource('LinearAuctionMock');
const LiquidatorMock = importArtifactsFromSource('LiquidatorMock');
const LiquidatorProxy = importArtifactsFromSource('LiquidatorProxy');
const LiquidatorUtilsMock = importArtifactsFromSource('LiquidatorUtilsMock');
const TWAPAuctionCaller = importArtifactsFromSource('TWAPAuctionCaller');
const TWAPAuctionMock = importArtifactsFromSource('TWAPAuctionMock');
const TWAPAuctionGettersMock = importArtifactsFromSource('TWAPAuctionGettersMock');
const TWAPLiquidator = importArtifactsFromSource('TWAPLiquidator');
const TwoAssetPriceBoundedLinearAuctionMock = importArtifactsFromSource('TwoAssetPriceBoundedLinearAuctionMock');

import { ERC20Helper } from './erc20Helper';
import { ValuationHelper } from './valuationHelper';

const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;

export interface AuctionData {
  maxNaturalUnit: BigNumber;
  minimumBid: BigNumber;
  startTime: BigNumber;
  startingCurrentSets: BigNumber;
  remainingCurrentSets: BigNumber;
  combinedTokenArray: Address[];
  combinedCurrentSetUnits: BigNumber[];
  combinedNextSetUnits: BigNumber[];
}

export interface TestTWAPAuctionData {
  orderSize: BigNumber;
  orderRemaining: BigNumber;
  lastChunkAuctionEnd: BigNumber;
  chunkAuctionPeriod: BigNumber;
  chunkSize: BigNumber;
  remainingCurrentSets: BigNumber;
}

export class LiquidatorHelper {
  private _contractOwnerAddress: Address;
  private _erc20Helper: ERC20Helper;
  private _valuationHelper: ValuationHelper;

  constructor(
    contractOwnerAddress: Address,
    erc20Helper: ERC20Helper,
    valuationHelper: ValuationHelper
  ) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._erc20Helper = erc20Helper;
    this._valuationHelper = valuationHelper;
  }

  /* ============ Deployment ============ */

  public async deployAuctionMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<AuctionMockContract> {
    const auctionMock = await AuctionMock.new(txnFrom(from));

    return new AuctionMockContract(getContractInstance(auctionMock), txnFrom(from));
  }

  public async deployAuctionGettersMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<AuctionGettersMockContract> {
    const auctionGettersMock = await AuctionGettersMock.new(txnFrom(from));

    return new AuctionGettersMockContract(getContractInstance(auctionGettersMock), txnFrom(from));
  }

  public async deployTWAPAuctionGettersMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<TWAPAuctionGettersMockContract> {
    const twapAuctionGettersMock = await TWAPAuctionGettersMock.new(txnFrom(from));

    return new TWAPAuctionGettersMockContract(getContractInstance(twapAuctionGettersMock), txnFrom(from));
  }

  public async deployTWAPAuctionCallerAsync(
    liquidator: Address,
    failAuctionPeriod: BigNumber = ONE_DAY_IN_SECONDS,
    from: Address = this._contractOwnerAddress
  ): Promise<TWAPAuctionCallerContract> {
    const auctionCaller = await TWAPAuctionCaller.new(liquidator, failAuctionPeriod, txnFrom(from));

    return new TWAPAuctionCallerContract(getContractInstance(auctionCaller), txnFrom(from));
  }

  public async deployLiquidatorProxyAsync(
    liquidator: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<LiquidatorProxyContract> {
    const liquidatorProxy = await LiquidatorProxy.new(liquidator, txnFrom(from));

    return new LiquidatorProxyContract(getContractInstance(liquidatorProxy), txnFrom(from));
  }

  public async deployLiquidatorUtilsMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<LiquidatorUtilsMockContract> {
    const liquidatorUtilsMock = await LiquidatorUtilsMock.new(txnFrom(from));

    return new LiquidatorUtilsMockContract(getContractInstance(liquidatorUtilsMock), txnFrom(from));
  }

  public async deployLinearAuctionMockAsync(
    oracleWhiteList: Address,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<LinearAuctionMockContract> {
    const linearAuctionMock = await LinearAuctionMock.new(
      oracleWhiteList,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      txnFrom(from)
    );

    return new LinearAuctionMockContract(getContractInstance(linearAuctionMock), txnFrom(from));
  }

  public async deployLinearAuctionLiquidatorAsync(
    core: Address,
    oracleWhiteList: Address,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    name: string,
    from: Address = this._contractOwnerAddress
  ): Promise<LinearAuctionLiquidatorContract> {
    const linearAuctionLiquidator = await LinearAuctionLiquidator.new(
      core,
      oracleWhiteList,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      name,
      txnFrom(from)
    );

    return new LinearAuctionLiquidatorContract(
      getContractInstance(linearAuctionLiquidator),
      txnFrom(from)
    );
  }

  public async deployTWAPLiquidatorAsync(
    core: Address,
    oracleWhiteList: Address,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    assetPairBounds: AssetPairVolumeBounds[],
    name: string,
    from: Address = this._contractOwnerAddress
  ): Promise<TWAPLiquidatorContract> {
    const assetPairBoundsStr = [];
    for (let i = 0; i < assetPairBounds.length; i++) {
      assetPairBoundsStr.push(coerceStructBNValuesToString(assetPairBounds[i]));
    }

    const twapLiquidator = await TWAPLiquidator.new(
      core,
      oracleWhiteList,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairBoundsStr,
      name,
      txnFrom(from)
    );

    return new TWAPLiquidatorContract(
      getContractInstance(twapLiquidator),
      txnFrom(from)
    );
  }

  public async deployTwoAssetPriceBoundedLinearAuctionMock(
    oracleWhiteList: Address,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<TwoAssetPriceBoundedLinearAuctionMockContract> {
    const mockContract = await TwoAssetPriceBoundedLinearAuctionMock.new(
      oracleWhiteList,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      txnFrom(from)
    );

    return new TwoAssetPriceBoundedLinearAuctionMockContract(
      getContractInstance(mockContract),
      txnFrom(from)
    );
  }

  public async deployTWAPAuctionMock(
    oracleWhiteList: Address,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    assetPairBounds: AssetPairVolumeBounds[],
    from: Address = this._contractOwnerAddress
  ): Promise<TWAPAuctionMockContract> {
    const assetPairBoundsStr = [];
    for (let i = 0; i < assetPairBounds.length; i++) {
      assetPairBoundsStr.push(coerceStructBNValuesToString(assetPairBounds[i]));
    }

    const mockContract = await TWAPAuctionMock.new(
      oracleWhiteList,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairBoundsStr,
      txnFrom(from)
    );

    return new TWAPAuctionMockContract(
      getContractInstance(mockContract),
      txnFrom(from)
    );
  }

  public async deployLiquidatorMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<LiquidatorMockContract> {
    const liquidatorMock = await LiquidatorMock.new(txnFrom(from));

    return new LiquidatorMockContract(getContractInstance(liquidatorMock), txnFrom(from));
  }

  /* ============ Deploy Helpers ============ */
  public generateTWAPLiquidatorCalldata(
    usdChunkSize: BigNumber,
    chunkAuctionPeriod: BigNumber,
  ): string {
    return SetTestUtils.bufferArrayToHex([
      SetUtils.paddedBufferForBigNumber(usdChunkSize),
      SetUtils.paddedBufferForBigNumber(chunkAuctionPeriod),
    ]);
  }

  public generateAssetPairHashes(
    assetOne: Address,
    assetTwo: Address
  ): string {
    let hexString: string;
    const assetOneNum = new BigNumber(assetOne);
    const assetTwoNum = new BigNumber(assetTwo);
    if (assetOneNum.greaterThan(assetTwoNum)) {
      hexString =  SetTestUtils.bufferArrayToHex([
        ethUtil.toBuffer(assetTwo),
        ethUtil.toBuffer(assetOne),
      ]);
    } else {
      hexString =  SetTestUtils.bufferArrayToHex([
        ethUtil.toBuffer(assetOne),
        ethUtil.toBuffer(assetTwo),
      ]);
    }

    return web3.utils.soliditySha3(hexString);
  }

  /* ============ Bid-Related ============ */

  // Get bid transfer values
  public async getBidPriceValues(
    setToken: SetTokenContract,
    quantity: BigNumber,
    combinedUnits: BigNumber[]
  ): Promise<BigNumber[]> {
    const naturalUnit = await setToken.naturalUnit.callAsync();
    return combinedUnits.map(unit => unit.mul(quantity).div(naturalUnit));
  }

  public async constructCombinedUnitArrayAsync(
    setToken: SetTokenContract,
    combinedTokenArray: Address[],
    minimumBid: BigNumber,
  ): Promise<BigNumber[]> {
    const setTokenComponents = await setToken.getComponents.callAsync();
    const setTokenUnits = await setToken.getUnits.callAsync();
    const setTokenNaturalUnit = await setToken.naturalUnit.callAsync();

    // Create combined unit array for target Set
    const combinedSetTokenUnits: BigNumber[] = [];
    combinedTokenArray.forEach(address => {
      const index = setTokenComponents.indexOf(address);
      if (index != -1) {
        const totalTokenAmount = setTokenUnits[index].mul(minimumBid).div(setTokenNaturalUnit);
        combinedSetTokenUnits.push(totalTokenAmount);
      } else {
        combinedSetTokenUnits.push(new BigNumber(0));
      }
    });
    return combinedSetTokenUnits;
  }

  public async calculateMinimumBidAsync(
    linearAuction: LinearAuction,
    currentSet: SetTokenContract,
    nextSet: SetTokenContract,
    assetPairPrice: BigNumber,
  ): Promise<BigNumber> {
    const maxNaturalUnit = BigNumber.max(
      await currentSet.naturalUnit.callAsync(),
      await nextSet.naturalUnit.callAsync()
    );

    const [assetOneDecimals, assetTwoDecimals] = await this._erc20Helper.getTokensDecimalsAsync(
      linearAuction.auction.combinedTokenArray
    );

    const assetOneFullUnit = new BigNumber(10 ** assetOneDecimals.toNumber());
    const assetTwoFullUnit = new BigNumber(10 ** assetTwoDecimals.toNumber());

    const auctionFairValue = this.calculateAuctionBound(
      linearAuction,
      assetOneFullUnit,
      assetTwoFullUnit,
      assetPairPrice
    );

    const tokenFlow = this.constructTokenFlow(
      linearAuction,
      maxNaturalUnit.mul(ether(1)),
      auctionFairValue
    );

    const tokenFlowList = [
      BigNumber.max(tokenFlow.inflow[0], tokenFlow.outflow[0]),
      BigNumber.max(tokenFlow.inflow[1], tokenFlow.outflow[1]),
    ];

    let minimumBidMultiplier: BigNumber = ZERO;
    for (let i = 0; i < linearAuction.auction.combinedTokenArray.length; i++) {
      const currentMinBidMultiplier = ether(1000).div(tokenFlowList[i]).round(0, 2);
      minimumBidMultiplier = currentMinBidMultiplier.greaterThan(minimumBidMultiplier) ?
        currentMinBidMultiplier :
        minimumBidMultiplier;
    }

    return maxNaturalUnit.mul(minimumBidMultiplier);
  }

  public async calculateAuctionBoundsAsync(
    linearAuction: LinearAuction,
    startBound: BigNumber,
    endBound: BigNumber,
    oracleWhiteList: OracleWhiteListContract
  ): Promise<[BigNumber, BigNumber]> {
    const [assetOneDecimals, assetTwoDecimals] = await this._erc20Helper.getTokensDecimalsAsync(
      linearAuction.auction.combinedTokenArray
    );

    const assetOneFullUnit = new BigNumber(10 ** assetOneDecimals.toNumber());
    const assetTwoFullUnit = new BigNumber(10 ** assetTwoDecimals.toNumber());

    const [assetOnePrice, assetTwoPrice] = await this._valuationHelper.getComponentPricesAsync(
      linearAuction.auction.combinedTokenArray,
      oracleWhiteList
    );

    const startValue = this.calculateTwoAssetStartPrice(
      linearAuction,
      assetOneFullUnit,
      assetTwoFullUnit,
      assetOnePrice.div(assetTwoPrice),
      startBound
    );

    const endValue = this.calculateTwoAssetEndPrice(
      linearAuction,
      assetOneFullUnit,
      assetTwoFullUnit,
      assetOnePrice.div(assetTwoPrice),
      endBound
    );

    return [startValue, endValue];
  }

  public calculateTwoAssetStartPrice(
    linearAuction: LinearAuction,
    assetOneFullUnit: BigNumber,
    assetTwoFullUnit: BigNumber,
    assetPairPrice: BigNumber,
    startBound: BigNumber
  ): BigNumber {
    const auctionFairValue = this.calculateAuctionBound(
      linearAuction,
      assetOneFullUnit,
      assetTwoFullUnit,
      assetPairPrice
    );

    const tokenFlowIncreasing = this.isTokenFlowIncreasing(
      linearAuction.auction.combinedCurrentSetUnits[0],
      linearAuction.auction.combinedNextSetUnits[0],
      auctionFairValue
    );

    let startPairPrice: BigNumber;
    if (tokenFlowIncreasing) {
      startPairPrice = assetPairPrice.mul(ether(1).sub(startBound)).div(ether(1));
    } else {
      startPairPrice = assetPairPrice.mul(ether(1).add(startBound)).div(ether(1));
    }

    const startValue = this.calculateAuctionBound(
      linearAuction,
      assetOneFullUnit,
      assetTwoFullUnit,
      startPairPrice
    );
    return startValue;
  }

  public calculateTwoAssetEndPrice(
    linearAuction: LinearAuction,
    assetOneFullUnit: BigNumber,
    assetTwoFullUnit: BigNumber,
    assetPairPrice: BigNumber,
    endBound: BigNumber
  ): BigNumber {
    const auctionFairValue = this.calculateAuctionBound(
      linearAuction,
      assetOneFullUnit,
      assetTwoFullUnit,
      assetPairPrice
    );

    const tokenFlowIncreasing = this.isTokenFlowIncreasing(
      linearAuction.auction.combinedCurrentSetUnits[0],
      linearAuction.auction.combinedNextSetUnits[0],
      auctionFairValue
    );

    let endPairPrice: BigNumber;
    if (tokenFlowIncreasing) {
      endPairPrice = assetPairPrice.mul(ether(1).add(endBound)).div(ether(1));
    } else {
      endPairPrice = assetPairPrice.mul(ether(1).sub(endBound)).div(ether(1));
    }

    const endValue = this.calculateAuctionBound(
      linearAuction,
      assetOneFullUnit,
      assetTwoFullUnit,
      endPairPrice
    );
    return endValue;
  }

  public calculateAuctionBound(
    linearAuction: LinearAuction,
    assetOneFullUnit: BigNumber,
    assetTwoFullUnit: BigNumber,
    targetPrice: BigNumber
  ): BigNumber {

    const combinedNextUnitArray = linearAuction.auction.combinedNextSetUnits;
    const combinedCurrentUnitArray = linearAuction.auction.combinedCurrentSetUnits;

    const calcNumerator = combinedNextUnitArray[1].mul(AUCTION_CURVE_DENOMINATOR).div(assetTwoFullUnit).add(
      targetPrice.mul(combinedNextUnitArray[0]).mul(AUCTION_CURVE_DENOMINATOR).div(assetOneFullUnit)
    );

    const calcDenominator = combinedCurrentUnitArray[1].div(assetTwoFullUnit).add(
      targetPrice.mul(combinedCurrentUnitArray[0]).div(assetOneFullUnit)
    );

    return calcNumerator.div(calcDenominator).round(0, 3);
  }

  public isTokenFlowIncreasing(
    assetOneCurrentUnit: BigNumber,
    assetOneNextUnit: BigNumber,
    fairValue: BigNumber
  ): boolean {
    return assetOneNextUnit.mul(AUCTION_CURVE_DENOMINATOR).greaterThan(assetOneCurrentUnit.mul(fairValue));
  }

  public calculateCurrentPrice(
    linearAuction: LinearAuction,
    timestamp: BigNumber,
    auctionPeriod: BigNumber
  ): BigNumber {
    const elapsed = timestamp.sub(linearAuction.auction.startTime);
    const priceRange = new BigNumber(linearAuction.endPrice).sub(linearAuction.startPrice);
    const elapsedPrice = elapsed.mul(priceRange).div(auctionPeriod).round(0, 3);

    return new BigNumber(linearAuction.startPrice).add(elapsedPrice);
  }

  public async calculateFairValueAsync(
    currentSetToken: SetTokenContract,
    nextSetToken: SetTokenContract,
    oracleWhiteList: OracleWhiteListContract,
    from: Address = this._contractOwnerAddress,
  ): Promise<BigNumber> {
    const currentSetUSDValue = await this._valuationHelper.calculateSetTokenValueAsync(
      currentSetToken,
      oracleWhiteList
    );
    const nextSetUSDValue = await this._valuationHelper.calculateSetTokenValueAsync(nextSetToken, oracleWhiteList);

    return nextSetUSDValue.mul(SCALE_FACTOR).div(currentSetUSDValue).round(0, 3);
  }

  public constructTokenFlow(
    linearAuction: LinearAuction,
    quantity: BigNumber,
    priceScaled: BigNumber,
  ): TokenFlow {
    const inflow: BigNumber[] = [];
    const outflow: BigNumber[] = [];

    // Calculate the inflows and outflow arrays;
    const {
      combinedTokenArray,
      combinedCurrentSetUnits,
      combinedNextSetUnits,
      maxNaturalUnit,
    } = linearAuction.auction;

    const unitsMultiplier = quantity.div(maxNaturalUnit).round(0, 3);

    for (let i = 0; i < combinedCurrentSetUnits.length; i++) {
      const flow = combinedNextSetUnits[i].mul(SCALE_FACTOR).sub(combinedCurrentSetUnits[i].mul(priceScaled));
      if (flow.greaterThan(0)) {
        const inflowUnit = unitsMultiplier.mul(
          combinedNextSetUnits[i].mul(SCALE_FACTOR).sub(combinedCurrentSetUnits[i].mul(priceScaled))
        ).div(priceScaled).round(0, 3);
        inflow.push(inflowUnit);
        outflow.push(ZERO);
      } else {
        const outflowUnit = unitsMultiplier.mul(
          combinedCurrentSetUnits[i].mul(priceScaled).sub(combinedNextSetUnits[i].mul(SCALE_FACTOR))
        ).div(priceScaled).round(0, 3);
        outflow.push(outflowUnit);
        inflow.push(ZERO);
      }
    }
    return {
      addresses: combinedTokenArray,
      inflow,
      outflow,
    };
  }

  public async calculateChunkSize(
    currentSet: SetTokenContract,
    nextSet: SetTokenContract,
    oracleWhiteList: OracleWhiteListContract,
    currentSetQuantity: BigNumber,
    usdChunkSize: BigNumber,
  ): Promise<BigNumber> {
    const rebalanceVolume = await this.calculateRebalanceVolumeAsync(
      currentSet,
      nextSet,
      oracleWhiteList,
      currentSetQuantity
    );

    if (rebalanceVolume.div(usdChunkSize).greaterThanOrEqualTo(1)) {
      return currentSetQuantity.mul(usdChunkSize).div(rebalanceVolume).round(0, 3);
    } else {
      return currentSetQuantity;
    }
  }

  public calculateChunkAuctionMaximumBid(
    chunkAuctionSize: BigNumber,
    minimumBid: BigNumber,
  ): BigNumber {
    return chunkAuctionSize.div(minimumBid).round(0, 3).mul(minimumBid);
  }

  public async calculateRebalanceVolumeAsync(
    currentSet: SetTokenContract,
    nextSet: SetTokenContract,
    oracleWhiteList: OracleWhiteListContract,
    currentSetQuantity: BigNumber
  ): Promise<BigNumber> {
    const currentSetValue = await this._valuationHelper.calculateSetTokenValueAsync(currentSet, oracleWhiteList);
    const components = await currentSet.getComponents.callAsync();
    const allocationAsset = components[0];

    const currentSetAssetAllocation = await this.calculateAssetAllocationAsync(
      currentSet,
      oracleWhiteList,
      allocationAsset
    );
    const nextSetAssetAllocation = await this.calculateAssetAllocationAsync(nextSet, oracleWhiteList, allocationAsset);

    const allocationChange = currentSetAssetAllocation.sub(nextSetAssetAllocation).abs();
    return currentSetValue.mul(currentSetQuantity).mul(allocationChange).div(SCALE_FACTOR).div(SCALE_FACTOR);
  }

  public async calculateAssetAllocationAsync(
    setToken: SetTokenContract,
    oracleWhiteList: OracleWhiteListContract,
    asset: Address
  ): Promise<BigNumber> {
    const setValue = await this._valuationHelper.calculateSetTokenValueAsync(setToken, oracleWhiteList);

    const allocationValue = await this._valuationHelper.calculateAllocationValueAsync(setToken, oracleWhiteList, asset);

    return allocationValue.mul(ether(1)).div(setValue).round(0, 3);
  }
}
