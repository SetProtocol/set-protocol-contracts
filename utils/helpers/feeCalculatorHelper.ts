import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';

import {
  FixedRebalanceFeeCalculatorContract,
} from '../contracts';
import { getContractInstance, txnFrom } from '../web3Helper';

const FixedRebalanceFeeCalculator = artifacts.require('FixedRebalanceFeeCalculator');


export class FeeCalculatorHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployFixedRebalanceFeeCalculatorAsync(
    core: Address,
    from: Address = this._contractOwnerAddress
  ): Promise<FixedRebalanceFeeCalculatorContract> {
    const feeCalculator = await FixedRebalanceFeeCalculator.new(core, txnFrom(from));

    return new FixedRebalanceFeeCalculatorContract(getContractInstance(feeCalculator), txnFrom(from));
  }
}
