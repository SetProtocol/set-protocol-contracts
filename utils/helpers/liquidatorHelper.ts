import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';

import {
  LinearAuctionLiquidatorContract,
  OracleWhiteListContract,
  SetTokenContract,
  UpdatableOracleMockContract,
} from '../contracts';
import { BigNumber } from 'bignumber.js';

import {
  DEFAULT_GAS,
  ZERO,
} from '../constants';

import { Blockchain } from '../blockchain';
import { getWeb3 } from '../web3Helper';

import { CoreHelper } from './coreHelper';
import { ERC20Helper } from './erc20Helper';

const web3 = getWeb3();
const LinearAuctionLiquidator = artifacts.require('LinearAuctionLiquidator');
const UpdatableOracleMock = artifacts.require('UpdatableOracleMock');

const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const {
  SET_FULL_TOKEN_UNITS,
} = SetUtils.CONSTANTS;

export class LiquidatorHelper {
  private _tokenOwnerAddress: Address;
  private _erc20Helper: ERC20Helper;

  constructor(
    tokenOwnerAddress: Address,
    coreHelper: CoreHelper,
    erc20Helper: ERC20Helper,
    blockchain: Blockchain,
  ) {
    this._tokenOwnerAddress = tokenOwnerAddress;

    this._erc20Helper = erc20Helper;
  }

  /* ============ Deploys and Instances ============ */

  public async deployLinearAuctionLiquidatorAsync(
    coreInstance: Address,
    oracleWhiteList: Address,
    priceDivisor: BigNumber,
    auctionTimeToPivot: BigNumber,
    auctionSpeed: BigNumber,
    name: string,
    from: Address = this._tokenOwnerAddress
  ): Promise<LinearAuctionLiquidatorContract> {
    const truffleLinearLiquidator = await LinearAuctionLiquidator.new(
      coreInstance,
      oracleWhiteList,
      priceDivisor,
      auctionTimeToPivot,
      auctionSpeed,
      name
    );

    return new LinearAuctionLiquidatorContract(
      new web3.eth.Contract(truffleLinearLiquidator.abi, truffleLinearLiquidator.address),
      { from, gas: DEFAULT_GAS },
    );
  }

  public async deployUpdatableOracleMocksAsync(
    startingPrices: BigNumber[],
    from: Address = this._tokenOwnerAddress
  ): Promise<UpdatableOracleMockContract[]> {
    const mockOracles: UpdatableOracleMockContract[] = [];
    const oraclePromises = _.map(startingPrices, async price => {
      return await UpdatableOracleMock.new(
        price,
        { from }
      );
    });

    await Promise.all(oraclePromises).then(oracles => {
      _.each(oracles, oracleMock => {
        mockOracles.push(new UpdatableOracleMockContract(
          new web3.eth.Contract(oracleMock.abi, oracleMock.address),
          { from }
        ));
      });
    });

    return mockOracles;
  }

  public getUpdatableOracleMockInstance(
     oracleAddress: Address,
     from: Address = this._tokenOwnerAddress,
  ): UpdatableOracleMockContract {
    return new UpdatableOracleMockContract(
      new web3.eth.Contract(UpdatableOracleMock.abi, oracleAddress),
      { from, gas: DEFAULT_GAS },
    );
  }

  /* ============ SetToken Info ============ */

  public async calculateSetTokenValueAsync(
    setToken: SetTokenContract,
    oracleWhiteList: OracleWhiteListContract,
    from: Address = this._tokenOwnerAddress,
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

  /* ============ Auction Calculations ============ */

  public calculateLinearAuctionParameters(
    currentSetValue: BigNumber,
    nextSetValue: BigNumber,
    priceDivisor: BigNumber,
    auctionTimeToPivot: BigNumber,
    auctionSpeed: BigNumber
  ): any {
    const fairValue = nextSetValue.mul(priceDivisor).div(currentSetValue).round(0, 3);
    const onePercentSlippage = fairValue.div(100).round(0, 3);

    const timeIncrements = auctionTimeToPivot.div(auctionSpeed).round(0, 3);
    const halfPriceRange = timeIncrements.mul(onePercentSlippage).div(2).round(0, 3);

    const auctionStartPrice = fairValue.sub(halfPriceRange);
    const auctionPivotPrice = fairValue.add(halfPriceRange);

    return {
      auctionStartPrice,
      auctionPivotPrice,
    };
  }

  public async calculateMinimumBidAsync(
    currentSet: SetTokenContract,
    nextSet: SetTokenContract,
    priceDivisor: BigNumber
  ): Promise<BigNumber> {
    const currentSetNaturalUnit = await currentSet.naturalUnit.callAsync();
    const nextSetNaturalUnit = await nextSet.naturalUnit.callAsync();

    return BigNumber.max(
      currentSetNaturalUnit.mul(priceDivisor),
      nextSetNaturalUnit.mul(priceDivisor)
    );
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

  public async constructInflowOutflowArraysAsync(
    liquidatorContract: LinearAuctionLiquidatorContract,
    quantity: BigNumber,
    priceNumerator: BigNumber,
    priceDenominator: BigNumber,
    caller: Address
  ): Promise<any> {
    const inflowArray: string[] = [];
    const outflowArray: string[] = [];

    // Get unit arrays
    const combinedCurrentUnits = await liquidatorContract.getCombinedCurrentSetUnits.callAsync( {from: caller} );
    const combinedRebalanceUnits = await liquidatorContract.getCombinedNextSetUnits.callAsync( {from: caller} );
    const pricePrecision = await liquidatorContract.pricePrecision.callAsync();

    // Calculate the inflows and outflow arrays;
    const [minimumBid, , ] = await liquidatorContract.generalAuctionDetails.callAsync(caller);
    const coefficient = new BigNumber(minimumBid).div(pricePrecision);
    const effectiveQuantity = quantity.div(priceNumerator);

    for (let i = 0; i < combinedCurrentUnits.length; i++) {
      const flow = combinedRebalanceUnits[i].mul(priceDenominator).sub(combinedCurrentUnits[i].mul(priceNumerator));
      if (flow.greaterThan(0)) {
        inflowArray.push(effectiveQuantity.mul(flow).div(coefficient).round(0, 3).toString());
        outflowArray.push('0');
      } else {
        outflowArray.push(
          flow.mul(new BigNumber(-1)).mul(effectiveQuantity).div(coefficient).round(0, 3).toString()
        );
        inflowArray.push('0');
      }
    }
    return {inflowArray, outflowArray};
  }

  /* ============ Getters ============ */

  public async getComponentPricesAsync(
    components: Address[],
    oracleWhiteList: OracleWhiteListContract,
    from: Address = this._tokenOwnerAddress
  ): Promise<BigNumber[]> {
    const componentOracles = await oracleWhiteList.getOracleAddressesByToken.callAsync(components);

    const oracleInstances = _.map(componentOracles, address => {
      return this.getUpdatableOracleMockInstance(address);
    });

    const oraclePricePromises = _.map(oracleInstances, async oracle => {
      return await oracle.read.callAsync();
    });
    return await Promise.all(oraclePricePromises);
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

  /* ============ General Calculations ============ */

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