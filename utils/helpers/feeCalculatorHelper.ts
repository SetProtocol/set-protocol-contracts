import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';

import {
  FixedRebalanceFeeCalculatorContract,
  SetTokenContract,
} from '../contracts';
import { getContractInstance, txnFrom } from '../web3Helper';
import {
  ZERO,
} from '../constants';
import {
  LinearAuction,
  TokenFlow
} from '../auction';

const FixedRebalanceFeeCalculator = artifacts.require('FixedRebalanceFeeCalculator');

import { ERC20Helper } from './erc20Helper';

const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const {
  SET_FULL_TOKEN_UNITS,
} = SetUtils.CONSTANTS;

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
