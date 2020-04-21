import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  TWAPLiquidatorContract,
} from '../contracts';
import { getContractInstance, importArtifactsFromSource, txnFrom } from '../web3Helper';
import {
  AUCTION_CURVE_DENOMINATOR,
  ONE_HUNDRED,
  SCALE_FACTOR,
  ZERO
} from '../constants';
import {
  LinearAuction,
  TokenFlow
} from '../auction';
import { ether } from '../units';

const TWAPLiquidator = importArtifactsFromSource('TWAPLiquidator');

import { ERC20Helper } from './erc20Helper';
import { ValuationHelper } from './valuationHelper';

export class LiquidatorHelperFelix {
  private _contractOwnerAddress: Address;
  private _erc20Helper: ERC20Helper;
  private _valuationHelper: ValuationHelper;

  constructor(
    contractOwnerAddress: Address,
    erc20Helper: ERC20Helper,
    valuationHelper: ValuationHelper
  ) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._erc20Helper = erc20Helper;
    this._valuationHelper = valuationHelper;
  }

  /* ============ Deployment ============ */

  public async deployTWAPLiquidatorAsync(
    core: Address,
    oracleWhiteList: Address,
    auctionPeriod: BigNumber,
    rangeStart: BigNumber,
    rangeEnd: BigNumber,
    // TODO: Add more
    name: string,
    from: Address = this._contractOwnerAddress
  ): Promise<TWAPLiquidatorContract> {
    const twapLiquidator = await TWAPLiquidator.new(
      core,
      oracleWhiteList,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      name,
      txnFrom(from)
    );

    return new TWAPLiquidatorContract(
      getContractInstance(twapLiquidator),
      txnFrom(from)
    );
  }
}
