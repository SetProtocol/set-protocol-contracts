import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { AuctionMockContract, LiquidatorMockContract, SetTokenContract } from '../contracts';
import { getWeb3 } from '../web3Helper';

const web3 = getWeb3();
const AuctionMock = artifacts.require('AuctionMock');
const LiquidatorMock = artifacts.require('LiquidatorMock');


export class LiquidatorHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
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

}
