import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';

import {
  AuctionMockContract,
  OracleWhiteListContract,
  LiquidatorMockContract,
  SetTokenContract,
  UpdatableOracleMockContract,
} from '../contracts';
import { getWeb3, getContractInstance } from '../web3Helper';
import {
  DEFAULT_GAS,
  ZERO,
} from '../constants';

const web3 = getWeb3();
const AuctionMock = artifacts.require('AuctionMock');
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
    const auctionMock = await AuctionMock.new(
      { from },
    );

    return new AuctionMockContract(
      new web3.eth.Contract(auctionMock.abi, auctionMock.address),
      { from },
    );
  }

  public async deployLiquidatorMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<LiquidatorMockContract> {
    const liquidatorMock = await LiquidatorMock.new(
      { from },
    );

    return new LiquidatorMockContract(
      new web3.eth.Contract(liquidatorMock.abi, liquidatorMock.address),
      { from },
    );
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
