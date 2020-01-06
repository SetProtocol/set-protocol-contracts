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
  ZERO,
  SCALE_FACTOR,
} from '../constants';
import {
  LinearAuction,
  TokenFlow
} from '../auction';
import { ether } from '@utils/units';

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
    oracleWhiteList: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<AuctionMockContract> {
    const auctionMock = await AuctionMock.new(oracleWhiteList, txnFrom(from));

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

  public async calculatePricePrecisionAsync(
    currentSet: SetTokenContract,
    nextSet: SetTokenContract,
    oracleWhiteList: OracleWhiteListContract
  ): Promise<BigNumber> {
    const currentSetValue = await this.calculateSetTokenValueAsync(currentSet, oracleWhiteList);
    const nextSetValue = await this.calculateSetTokenValueAsync(nextSet, oracleWhiteList);
    const minimumPricePrecision = new BigNumber(1000);

    if (currentSetValue.greaterThan(nextSetValue)) {
      const orderOfMag = this._libraryMockHelper.ceilLog10(currentSetValue.div(nextSetValue));

      return minimumPricePrecision.mul(10 ** (orderOfMag.toNumber() - 1));
    }

    return minimumPricePrecision;
  }

  public async constructCombinedUnitArrayAsync(
    setToken: SetTokenContract,
    combinedTokenArray: Address[],
    minimumBid: BigNumber,
    priceDivisor: BigNumber,
  ): Promise<BigNumber[]> {
    const setTokenComponents = await setToken.getComponents.callAsync();
    const setTokenUnits = await setToken.getUnits.callAsync();
    const setTokenNaturalUnit = await setToken.naturalUnit.callAsync();

    // Calculate minimumBidAmount
    const maxNaturalUnit = minimumBid.div(priceDivisor);

    // Create combined unit array for target Set
    const combinedSetTokenUnits: BigNumber[] = [];
    combinedTokenArray.forEach(address => {
      const index = setTokenComponents.indexOf(address);
      if (index != -1) {
        const totalTokenAmount = setTokenUnits[index].mul(maxNaturalUnit).div(setTokenNaturalUnit);
        combinedSetTokenUnits.push(totalTokenAmount);
      } else {
        combinedSetTokenUnits.push(new BigNumber(0));
      }
    });
    return combinedSetTokenUnits;
  }

  public async calculateAuctionBoundsAsync(
    combinedTokenArray: Address[],
    combinedCurrentUnitArray: BigNumber[],
    combinedNextUnitArray: BigNumber[],
    fairValue: BigNumber,
    startBound: BigNumber,
    endBound: BigNumber,
    oracleWhiteList: OracleWhiteListContract
  ): Promise<[BigNumber, BigNumber]> {
    const [assetOneDecimals, assetTwoDecimals] = await this.getTokensDecimalsAsync(combinedTokenArray);

    const assetOneFullUnit = new BigNumber(10 ** assetOneDecimals.toNumber());
    const assetTwoFullUnit = new BigNumber(10 ** assetTwoDecimals.toNumber());

    const [assetOnePrice, assetTwoPrice] = await this.getComponentPricesAsync(combinedTokenArray, oracleWhiteList);

    const startValue = this.calculateAuctionBound(
      combinedCurrentUnitArray,
      combinedNextUnitArray,
      assetOneFullUnit,
      assetTwoFullUnit,
      assetOnePrice.div(assetTwoPrice),
      fairValue,
      startBound
    );

    const endValue = this.calculateAuctionBound(
      combinedCurrentUnitArray,
      combinedNextUnitArray,
      assetOneFullUnit,
      assetTwoFullUnit,
      assetOnePrice.div(assetTwoPrice),
      fairValue,
      endBound
    );

    return [startValue, endValue];
  }

  public calculateAuctionBound(
    combinedCurrentUnitArray: BigNumber[],
    combinedNextUnitArray: BigNumber[],
    assetOneFullUnit: BigNumber,
    assetTwoFullUnit: BigNumber,
    assetPairPrice: BigNumber,
    fairValue: BigNumber,
    boundValue: BigNumber
  ): BigNumber {
    const numerator = (combinedNextUnitArray[0].mul(ether(1)).sub(fairValue.mul(combinedCurrentUnitArray[0]))).pow(2)
      .mul(assetTwoFullUnit)
      .mul(boundValue)
      .mul(assetPairPrice)
      .div(100);

    const denominator = combinedNextUnitArray[0].mul(combinedCurrentUnitArray[1]).sub(
        combinedNextUnitArray[1].mul(combinedCurrentUnitArray[0]))
      .mul(assetOneFullUnit)
      .mul(10 ** 18);

    return numerator.div(denominator).abs();
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

  public async calculateTwoAssetStartPrice(
    linearAuction: LinearAuction,
    fairValue: BigNumber,
    rangeStartPercentage: BigNumber,
    oracleWhiteList: OracleWhiteListContract,
  ): Promise<BigNumber> {
    const [startDifference] = await this.calculateAuctionBoundsAsync(
      linearAuction.auction.combinedTokenArray,
      linearAuction.auction.combinedCurrentSetUnits,
      linearAuction.auction.combinedNextSetUnits,
      fairValue,
      rangeStartPercentage,
      rangeStartPercentage, // Dummy value, unused
      oracleWhiteList
    );
    return fairValue.sub(startDifference);
  }

  public async calculateTwoAssetEndPrice(
    linearAuction: LinearAuction,
    fairValue: BigNumber,
    rangeEndPercentage: BigNumber,
    oracleWhiteList: OracleWhiteListContract,
  ): Promise<BigNumber> {
    const [, endDifference] = await this.calculateAuctionBoundsAsync(
      linearAuction.auction.combinedTokenArray,
      linearAuction.auction.combinedCurrentSetUnits,
      linearAuction.auction.combinedNextSetUnits,
      fairValue,
      rangeEndPercentage, // Dummy value, unused
      rangeEndPercentage,
      oracleWhiteList
    );
    return fairValue.add(endDifference);
  }

  public async calculateFairValueAsync(
    currentSetToken: SetTokenContract,
    nextSetToken: SetTokenContract,
    oracleWhiteList: OracleWhiteListContract,
    pricePrecision: BigNumber,
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
    pricePrecision: BigNumber,
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
      minimumBid,
    } = linearAuction.auction;

    const unitsMultiplier = quantity.div(minimumBid).round(0, 3).mul(pricePrecision);

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
