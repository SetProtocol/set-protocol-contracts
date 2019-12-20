import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  FeeCalculatorMockContract,
  FixedRebalanceFeeCalculatorContract,
} from '../contracts';
import { getWeb3, getContractInstance, txnFrom } from '../web3Helper';

const FixedRebalanceFeeCalculator = artifacts.require('FixedRebalanceFeeCalculator');
const FeeCalculatorMock = artifacts.require('FeeCalculatorMock');

const web3 = getWeb3();

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

  public async deployFeeCalculatorMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<FeeCalculatorMockContract> {
    const feeCalculatorMock = await FeeCalculatorMock.new(txnFrom(from));

    return new FeeCalculatorMockContract(getContractInstance(feeCalculatorMock), txnFrom(from));
  }

  public generateFixedRebalanceFeeCallData(
    feeQuantity: BigNumber
  ): string {
    return web3.utils.padLeft(web3.utils.numberToHex(feeQuantity.toString()), 64);
  }
}
