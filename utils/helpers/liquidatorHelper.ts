import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';

import {
  AuctionMockContract,
  LinearAuctionLiquidatorContract,
  LinearAuctionMockContract,
  LiquidatorMockContract,
  LiquidatorProxyContract,
  OracleWhiteListContract,
  SetTokenContract,
  TwoAssetPriceBoundedLinearAuctionMockContract,
} from '../contracts';
import { getContractInstance, txnFrom } from '../web3Helper';
import {
  AUCTION_CURVE_DENOMINATOR,
  ONE_HUNDRED,
  SCALE_FACTOR,
  ZERO
} from '../constants';
import {
  LinearAuction,
  TokenFlow
} from '../auction';
import { ether } from '../units';

const AuctionMock = artifacts.require('AuctionMock');
const LinearAuctionLiquidator = artifacts.require('LinearAuctionLiquidator');
const LinearAuctionMock = artifacts.require('LinearAuctionMock');
const LiquidatorMock = artifacts.require('LiquidatorMock');
const LiquidatorProxy = artifacts.require('LiquidatorProxy');
const TwoAssetPriceBoundedLinearAuctionMock = artifacts.require('TwoAssetPriceBoundedLinearAuctionMock');

import { ERC20Helper } from './erc20Helper';
import { LibraryMockHelper } from './libraryMockHelper';

const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const {
  SET_FULL_TOKEN_UNITS,
} = SetUtils.CONSTANTS;

export class LiquidatorHelper {
  private _contractOwnerAddress: Address;
  private _erc20Helper: ERC20Helper;
  private _libraryMockHelper: LibraryMockHelper;

  constructor(contractOwnerAddress: Address, erc20Helper: ERC20Helper) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._erc20Helper = erc20Helper;
    this._libraryMockHelper = new LibraryMockHelper(contractOwnerAddress);
  }

  /* ============ Deployment ============ */

  public async deployAuctionMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<AuctionMockContract> {
    const auctionMock = await AuctionMock.new(txnFrom(from));

    return new AuctionMockContract(getContractInstance(auctionMock), txnFrom(from));
  }

  public async deployLiquidatorProxyAsync(
    liquidator: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<LiquidatorProxyContract> {
    const liquidatorProxy = await LiquidatorProxy.new(liquidator, txnFrom(from));

    return new LiquidatorProxyContract(getContractInstance(liquidatorProxy), txnFrom(from));
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

  public async deployLiquidatorMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<LiquidatorMockContract> {
    const liquidatorMock = await LiquidatorMock.new(txnFrom(from));

    return new LiquidatorMockContract(getContractInstance(liquidatorMock), txnFrom(from));
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

    const [assetOneDecimals, assetTwoDecimals] = await this.getTokensDecimalsAsync(
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
    const [assetOneDecimals, assetTwoDecimals] = await this.getTokensDecimalsAsync(
      linearAuction.auction.combinedTokenArray
    );

    const assetOneFullUnit = new BigNumber(10 ** assetOneDecimals.toNumber());
    const assetTwoFullUnit = new BigNumber(10 ** assetTwoDecimals.toNumber());

    const [assetOnePrice, assetTwoPrice] = await this.getComponentPricesAsync(
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
      startPairPrice = assetPairPrice.mul(ONE_HUNDRED.sub(startBound)).div(ONE_HUNDRED);
    } else {
      startPairPrice = assetPairPrice.mul(ONE_HUNDRED.add(startBound)).div(ONE_HUNDRED);
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
      endPairPrice = assetPairPrice.mul(ONE_HUNDRED.add(endBound)).div(ONE_HUNDRED);
    } else {
      endPairPrice = assetPairPrice.mul(ONE_HUNDRED.sub(endBound)).div(ONE_HUNDRED);
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
    const currentSetUSDValue = await this.calculateSetTokenValueAsync(currentSetToken, oracleWhiteList);
    const nextSetUSDValue = await this.calculateSetTokenValueAsync(nextSetToken, oracleWhiteList);

    return nextSetUSDValue.mul(SCALE_FACTOR).div(currentSetUSDValue).round(0, 3);
  }

  public async calculateSetTokenValueAsync(
    setToken: SetTokenContract,
    oracleWhiteList: OracleWhiteListContract,
    from: Address = this._contractOwnerAddress,
  ): Promise<BigNumber> {
    const componentTokens = await setToken.getComponents.callAsync();

    const tokenPrices = await this.getComponentPricesAsync(
      componentTokens,
      oracleWhiteList
    );
    const componentUnits = await setToken.getUnits.callAsync();
    const setNaturalUnit = await setToken.naturalUnit.callAsync();
    const componentDecimals = await this.getTokensDecimalsAsync(componentTokens);

    let setTokenPrice = ZERO;
    for (let i = 0; i < componentUnits.length; i++) {
      const tokenUnitsInFullSet = SET_FULL_TOKEN_UNITS
                                    .mul(componentUnits[i])
                                    .div(setNaturalUnit)
                                    .round(0, 3);
      const componentValue = this.computeTokenDollarAmount(
        tokenPrices[i],
        tokenUnitsInFullSet,
        componentDecimals[i],
      );
      setTokenPrice = setTokenPrice.add(componentValue);
    }

    return setTokenPrice;
  }

  public async getTokensDecimalsAsync(
    tokens: Address[],
  ): Promise<BigNumber[]> {
    const tokenInstances = await this._erc20Helper.retrieveTokenInstancesAsync(
      tokens
    );

    const tokenDecimalPromises = _.map(tokenInstances, async token => {
      return await token.decimals.callAsync();
    });
    return await Promise.all(tokenDecimalPromises);
  }

  public async getComponentPricesAsync(
    components: Address[],
    oracleWhiteList: OracleWhiteListContract,
    from: Address = this._contractOwnerAddress
  ): Promise<BigNumber[]> {
    const componentOracles = await oracleWhiteList.getOracleAddressesByToken.callAsync(components);

    const oracleInstances = _.map(componentOracles, address => {
      return this._libraryMockHelper.getUpdatableOracleMockInstance(address);
    });

    const oraclePricePromises = _.map(oracleInstances, async oracle => {
      return await oracle.read.callAsync();
    });
    return await Promise.all(oraclePricePromises);
  }

  private computeTokenDollarAmount(
    tokenPrice: BigNumber,
    unitsInFullSet: BigNumber,
    tokenDecimals: BigNumber,
  ): BigNumber {
    return tokenPrice
             .mul(unitsInFullSet)
             .div(10 ** tokenDecimals.toNumber())
             .round(0, 3);
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

}
