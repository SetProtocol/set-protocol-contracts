import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { LiquidatorMockContract, SetTokenContract } from '../contracts';
import { getWeb3 } from '../web3Helper';

const web3 = getWeb3();
const LiquidatorMock = artifacts.require('LiquidatorMock');


export class LiquidatorHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployLiquidatorMock(
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

}
