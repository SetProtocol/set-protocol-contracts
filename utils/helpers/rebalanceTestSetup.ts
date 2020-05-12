import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  OracleWhiteListContract,
  RebalanceAuctionModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  RebalancingSetTokenV3FactoryContract,
  WhiteListContract,
  FixedFeeCalculatorContract,
} from '../contracts';
import { ether } from '../units';

import { CoreHelper } from './coreHelper';
import { ERC20Helper } from './erc20Helper';
import { OracleHelper } from 'set-protocol-oracles';
import { FeeCalculatorHelper } from './feeCalculatorHelper';

export class RebalanceTestSetup {
  private _contractOwnerAddress: Address;
  private _coreHelper: CoreHelper;
  private _erc20Helper: ERC20Helper;
  private _oracleHelper: OracleHelper;
  private _feeCalculatorHelper: FeeCalculatorHelper;

  public core: CoreMockContract;
  public transferProxy: TransferProxyContract;
  public vault: VaultContract;
  public setTokenFactory: SetTokenFactoryContract;
  public rebalanceAuctionModule: RebalanceAuctionModuleContract;
  public rebalancingFactory: RebalancingSetTokenV3FactoryContract;
  public rebalancingComponentWhiteList: WhiteListContract;
  public liquidatorWhitelist: WhiteListContract;
  public fixedFeeCalculator: FixedFeeCalculatorContract;
  public feeCalculatorWhitelist: WhiteListContract;

  public component1: StandardTokenMockContract;
  public component2: StandardTokenMockContract;
  public component3: StandardTokenMockContract;

  public component1Price: BigNumber;
  public component2Price: BigNumber;
  public component3Price: BigNumber;

  public set1: SetTokenContract;
  public set2: SetTokenContract;
  public set3: SetTokenContract;

  public set1Components: Address[];
  public set2Components: Address[];
  public set3Components: Address[];

  public set1Units: BigNumber[];
  public set2Units: BigNumber[];
  public set3Units: BigNumber[];

  public set1NaturalUnit: BigNumber;
  public set2NaturalUnit: BigNumber;
  public set3NaturalUnit: BigNumber;

  public component1Oracle: UpdatableOracleMockContract;
  public component2Oracle: UpdatableOracleMockContract;
  public component3Oracle: UpdatableOracleMockContract;

  public oracleWhiteList: OracleWhiteListContract;

  constructor(
    contractOwnerAddress: Address,
  ) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._coreHelper = new CoreHelper(this._contractOwnerAddress, this._contractOwnerAddress);
    this._erc20Helper = new ERC20Helper(this._contractOwnerAddress);
    this._oracleHelper = new OracleHelper(this._contractOwnerAddress);
    this._feeCalculatorHelper = new FeeCalculatorHelper(this._contractOwnerAddress);
  }

  /* ============ Deployment ============ */

  public async initialize(
    from: Address = this._contractOwnerAddress
  ): Promise<void> {
    await this.initializeCore();

    // Ether
    this.component1 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress, 18);

    // USDC
    this.component2 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress, 6);

    // BTC
    this.component3 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress, 8);

    this.set1Components = [this.component1.address, this.component2.address];
    this.set1Units = [new BigNumber(10 ** 13), new BigNumber(1280)];
    this.set1NaturalUnit = new BigNumber(10 ** 13);
    this.set1 = await this._coreHelper.createSetTokenAsync(
      this.core,
      this.setTokenFactory.address,
      this.set1Components,
      this.set1Units,
      this.set1NaturalUnit,
    );

    this.set2Components = [this.component1.address, this.component2.address];
    this.set2Units = [new BigNumber(10 ** 13), new BigNumber(5120)];
    this.set2NaturalUnit = new BigNumber(10 ** 13);
    this.set2 = await this._coreHelper.createSetTokenAsync(
      this.core,
      this.setTokenFactory.address,
      this.set2Components,
      this.set2Units,
      this.set2NaturalUnit,
    );

    this.set3Components = [this.component1.address, this.component3.address];
    this.set3Units = [new BigNumber(10 ** 13), new BigNumber(5120)];
    this.set3NaturalUnit = new BigNumber(10 ** 13);
    this.set3 = await this._coreHelper.createSetTokenAsync(
      this.core,
      this.setTokenFactory.address,
      this.set3Components,
      this.set3Units,
      this.set3NaturalUnit,
    );

    this.component1Price = ether(128);
    this.component2Price = ether(1);
    this.component3Price = ether(7500);

    this.component1Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component1Price);
    this.component2Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component2Price);
    this.component3Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component3Price);

    this.oracleWhiteList = await this._coreHelper.deployOracleWhiteListAsync(
      [this.component1.address, this.component2.address, this.component3.address],
      [this.component1Oracle.address, this.component2Oracle.address, this.component3Oracle.address],
    );

    await this._coreHelper.addTokensToWhiteList(
      [this.component1.address, this.component2.address, this.component3.address],
      this.rebalancingComponentWhiteList,
    );

    await this._erc20Helper.approveTransfersAsync(
      [this.component1, this.component2, this.component3],
      this.transferProxy.address
    );
  }

  public async initializeCore(
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

    this.rebalanceAuctionModule = await this._coreHelper.deployRebalanceAuctionModuleAsync(this.core, this.vault);
    await this._coreHelper.addModuleAsync(this.core, this.rebalanceAuctionModule.address);

    this.rebalancingComponentWhiteList = await this._coreHelper.deployWhiteListAsync();
    this.liquidatorWhitelist = await this._coreHelper.deployWhiteListAsync();
    this.feeCalculatorWhitelist = await this._coreHelper.deployWhiteListAsync();
    this.rebalancingFactory = await this._coreHelper.deployRebalancingSetTokenV3FactoryAsync(
      this.core.address,
      this.rebalancingComponentWhiteList.address,
      this.liquidatorWhitelist.address,
      this.feeCalculatorWhitelist.address,
    );
    await this._coreHelper.addFactoryAsync(this.core, this.rebalancingFactory);

    this.fixedFeeCalculator = await this._feeCalculatorHelper.deployFixedFeeCalculatorAsync();
    await this._coreHelper.addAddressToWhiteList(this.fixedFeeCalculator.address, this.feeCalculatorWhitelist);
  }
}
