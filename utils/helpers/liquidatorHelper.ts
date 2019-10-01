import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';

import { LiquidatorMockContract } from '../contracts';
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
}
