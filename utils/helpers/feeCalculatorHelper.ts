import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  FeeCalculatorMockContract,
  FixedFeeCalculatorContract,
  FixedFeeCalculatorMockContract,
} from '../contracts';
import { getWeb3, getContractInstance, txnFrom } from '../web3Helper';

const FixedFeeCalculator = artifacts.require('FixedFeeCalculator');
const FixedFeeCalculatorMock = artifacts.require('FixedFeeCalculatorMock');
const FeeCalculatorMock = artifacts.require('FeeCalculatorMock');

const web3 = getWeb3();

export class FeeCalculatorHelper {
  private _contractOwnerAddress: Address;

  constructor(contractOwnerAddress: Address) {
    this._contractOwnerAddress = contractOwnerAddress;
  }

  /* ============ Deployment ============ */

  public async deployFixedFeeCalculatorAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<FixedFeeCalculatorContract> {
    const feeCalculator = await FixedFeeCalculator.new(txnFrom(from));

    return new FixedFeeCalculatorContract(getContractInstance(feeCalculator), txnFrom(from));
  }

  public async deployFixedFeeCalculatorMockAsync(
    from: Address = this._contractOwnerAddress
  ): Promise<FixedFeeCalculatorMockContract> {
    const feeCalculator = await FixedFeeCalculatorMock.new(txnFrom(from));

    return new FixedFeeCalculatorMockContract(getContractInstance(feeCalculator), txnFrom(from));
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
