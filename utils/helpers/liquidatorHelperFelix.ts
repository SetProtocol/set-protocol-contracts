import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  TWAPLiquidatorContract,
} from '../contracts';
import {
  coerceStructBNValuesToString,
  getContractInstance,
  importArtifactsFromSource,
  txnFrom,
} from '../web3Helper';
import {
  AssetChunkSizeBounds,
} from '../auction';

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
    assetPairHashes: string[],
    assetPairBounds: AssetChunkSizeBounds[],
    name: string,
    from: Address = this._contractOwnerAddress
  ): Promise<TWAPLiquidatorContract> {
    const assetPairBoundsStr = [];
    for (let i = 0; i < assetPairBounds.length; i++) {
      assetPairBoundsStr.push(coerceStructBNValuesToString(assetPairBounds[i]));
    }

    const twapLiquidator = await TWAPLiquidator.new(
      core,
      oracleWhiteList,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairHashes,
      assetPairBoundsStr,
      name,
      txnFrom(from)
    );

    return new TWAPLiquidatorContract(
      getContractInstance(twapLiquidator),
      txnFrom(from)
    );
  }
}
