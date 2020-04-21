import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  OracleWhiteListContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '../contracts';
import { getContractInstance, importArtifactsFromSource, txnFrom } from '../web3Helper';
import {
  AUCTION_CURVE_DENOMINATOR,
  ONE_HUNDRED,
  SCALE_FACTOR,
  ZERO
} from '../constants';
import { ether, gWei } from '@utils/units';

import { CoreHelper } from './coreHelper';
import { ERC20Helper } from './erc20Helper';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from './valuationHelper';

export class RebalanceTestSetup {
  private _contractOwnerAddress: Address;
  private _coreHelper: CoreHelper;
  private _erc20Helper: ERC20Helper;
  private _oracleHelper: OracleHelper;

  public core: CoreMockContract;
  public transferProxy: TransferProxyContract;
  public vault: VaultContract;
  public setTokenFactory: SetTokenFactoryContract;

  public component1: StandardTokenMockContract;
  public component2: StandardTokenMockContract;
  public component3: StandardTokenMockContract;

  public component1Price: BigNumber;
  public component2Price: BigNumber;
  public component3Price: BigNumber;

  public set1: SetTokenContract;
  public set2: SetTokenContract;

  public set1Components: Address[];
  public set2Components: Address[];

  public set1Units: BigNumber[];
  public set2Units: BigNumber[];

  public set1NaturalUnit: BigNumber;
  public set2NaturalUnit: BigNumber;

  public component1Oracle: UpdatableOracleMockContract;
  public component2Oracle: UpdatableOracleMockContract;
  public component3Oracle: UpdatableOracleMockContract;

  public oracleWhiteList: OracleWhiteListContract;

  constructor(
    contractOwnerAddress: Address,
    coreHelper: CoreHelper,
    erc20Helper: ERC20Helper,
    oracleHelper: OracleHelper
  ) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._coreHelper = coreHelper;
    this._erc20Helper = erc20Helper;
    this._oracleHelper = oracleHelper;
  }

  /* ============ Deployment ============ */

  public async initialize(
    from: Address = this._contractOwnerAddress
  ): Promise<void> {
    this.transferProxy = await this._coreHelper.deployTransferProxyAsync();
    this.vault = await this._coreHelper.deployVaultAsync();
    this.core = await this._coreHelper.deployCoreMockAsync(this.transferProxy, this.vault);

    this.setTokenFactory = await this._coreHelper.deploySetTokenFactoryAsync(this.core.address);
    await this._coreHelper.setDefaultStateAndAuthorizationsAsync(
      this.core,
      this.vault,
      this.transferProxy,
      this.setTokenFactory,
    );

    this.component1 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress);
    this.component2 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress);
    this.component3 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress);

    this.set1Components = [this.component1.address, this.component2.address];
    this.set1Units = [gWei(1), gWei(1)];
    this.set1NaturalUnit = gWei(1);
    this.set1 = await this._coreHelper.createSetTokenAsync(
      this.core,
      this.setTokenFactory.address,
      this.set1Components,
      this.set1Units,
      this.set1NaturalUnit,
    );

    this.set2Components = [this.component1.address, this.component2.address];
    this.set2Units = [gWei(1), gWei(0.5)];
    this.set2NaturalUnit = gWei(2);
    this.set2 = await this._coreHelper.createSetTokenAsync(
      this.core,
      this.setTokenFactory.address,
      this.set2Components,
      this.set2Units,
      this.set2NaturalUnit,
    );

    this.component1Price = ether(1);
    this.component2Price = ether(2);
    this.component3Price = ether(1);

    this.component1Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component1Price);
    this.component2Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component2Price);
    this.component3Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component3Price);

    this.oracleWhiteList = await this._coreHelper.deployOracleWhiteListAsync(
      [this.component1.address, this.component2.address, this.component3.address],
      [this.component1Oracle.address, this.component2Oracle.address, this.component3Oracle.address],
    );
  }
}
