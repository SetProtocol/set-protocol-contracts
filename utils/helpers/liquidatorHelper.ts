import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';

import {
  AuctionMockContract,
  ExponentialPivotAuctionMockContract,
  ExponentialPivotAuctionLiquidatorContract,
  OracleWhiteListContract,
  LinearAuctionMockContract,
  LiquidatorMockContract,
  SetTokenContract,
} from '../contracts';
import { getContractInstance } from '../web3Helper';
import {
  ZERO,
} from '../constants';
import {
  LinearAuction
} from '../auction';

const AuctionMock = artifacts.require('AuctionMock');
const ExponentialPivotAuctionMock = artifacts.require('ExponentialPivotAuctionMock');
const ExponentialPivotAuctionLiquidator = artifacts.require('ExponentialPivotAuctionLiquidator');
const LinearAuctionMock = artifacts.require('LinearAuctionMock');
const LiquidatorMock = artifacts.require('LiquidatorMock');

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
    const auctionMock = await AuctionMock.new({ from });

    return new AuctionMockContract(getContractInstance(auctionMock), { from });
  }

  public async deployLinearAuctionMockAsync(
    oracleWhiteList: Address,
    pricePrecision: BigNumber,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<LinearAuctionMockContract> {
    const linearAuctionMock = await LinearAuctionMock.new(
      oracleWhiteList,
      pricePrecision,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      { from }
    );

    return new LinearAuctionMockContract(getContractInstance(linearAuctionMock), { from });
  }

  public async deployExponentialPivotAuctionLiquidatorAsync(
    core: Address,
    oracleWhiteList: Address,
    pricePrecision: BigNumber,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    name: string,
    from: Address = this._contractOwnerAddress
  ): Promise<ExponentialPivotAuctionLiquidatorContract> {
    const exponentialAuctionLiquidator = await ExponentialPivotAuctionLiquidator.new(
      core,
      oracleWhiteList,
      pricePrecision,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      name,
      { from }
    );

    return new ExponentialPivotAuctionLiquidatorContract(
      getContractInstance(exponentialAuctionLiquidator),
      { from }
    );
  }

  public async deployExponentialPivotAuctionMockAsync(
    oracleWhiteList: Address,
    pricePrecision: BigNumber,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    from: Address = this._contractOwnerAddress
  ): Promise<ExponentialPivotAuctionMockContract> {
    const exponentialAuctionMock = await ExponentialPivotAuctionMock.new(
      oracleWhiteList,
      pricePrecision,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      { from }
    );

    return new ExponentialPivotAuctionMockContract(getContractInstance(exponentialAuctionMock), { from });
  }

  public async deployLiquidatorMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<LiquidatorMockContract> {
    const liquidatorMock = await LiquidatorMock.new({ from });

    return new LiquidatorMockContract(getContractInstance(liquidatorMock), { from });
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

  public calculateExponentialPivotNumerator(
    linearAuction: LinearAuction,
    timestamp: BigNumber,
    auctionPeriod: BigNumber,
    pricePrecision: BigNumber,
  ): BigNumber {
    const MAX_THIRTY_SECOND_PERIODS = new BigNumber(1000);
    const THIRTY_SECONDS = new BigNumber(30);

    const { endPrice, auction } = linearAuction;
    const elapsed = timestamp.sub(auction.startTime);
    const thirtySecondPeriods = elapsed.sub(auctionPeriod).div(THIRTY_SECONDS).round(0, 3);

    if (elapsed.lte(auctionPeriod)) {
      return this.calculateCurrentPrice(linearAuction, timestamp, auctionPeriod);
    } else if (thirtySecondPeriods.lt(MAX_THIRTY_SECOND_PERIODS)) {
      return endPrice;
    } else {
      const extension = endPrice.mul(thirtySecondPeriods).sub(MAX_THIRTY_SECOND_PERIODS);
      return endPrice.add(extension);
    }
  }

  public calculateExponentialPivotDenominator(
    linearAuction: LinearAuction,
    timestamp: BigNumber,
    auctionPeriod: BigNumber,
    pricePrecision: BigNumber,
  ): BigNumber {
    const MAX_THIRTY_SECOND_PERIODS = new BigNumber(1000);
    const THIRTY_SECONDS = new BigNumber(30);

    const elapsed = timestamp.sub(linearAuction.auction.startTime);
    const thirtySecondPeriods = elapsed.sub(auctionPeriod).div(THIRTY_SECONDS);

    if (elapsed.lte(auctionPeriod)) {
      return pricePrecision;
    } else if (thirtySecondPeriods.lt(MAX_THIRTY_SECOND_PERIODS)) {
      return pricePrecision
              .sub(thirtySecondPeriods)
              .mul(pricePrecision)
              .div(MAX_THIRTY_SECOND_PERIODS);
    } else {
      return new BigNumber(1);
    }
  }

  public calculateStartPrice(
    fairValue: BigNumber,
    rangeStart: BigNumber,
  ): BigNumber {
    const negativeRange = fairValue.mul(rangeStart).div(100).round(0, 3);
    return fairValue.sub(negativeRange);
  }

  public calculateEndPrice(
    fairValue: BigNumber,
    rangeEnd: BigNumber,
  ): BigNumber {
    const positiveRange = fairValue.mul(rangeEnd).div(100).round(0, 3);
    return fairValue.add(positiveRange);
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

    return nextSetUSDValue.mul(pricePrecision).div(currentSetUSDValue).round(0, 3);
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

}
