import * as _ from 'lodash';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  LinearAuctionLiquidatorContract,
  OracleWhiteListContract,
  RebalanceAuctionModuleContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  RebalancingSetTokenV3Contract,
  RebalancingSetTokenV3FactoryContract,
  WhiteListContract,
  FixedFeeCalculatorContract,
} from '../contracts';
import { Blockchain } from '../blockchain';
import { ether } from '../units';
import { ONE_HOUR_IN_SECONDS } from '../constants';
import { getWeb3 } from '../web3Helper';

import { CoreHelper } from './coreHelper';
import { ERC20Helper } from './erc20Helper';
import { OracleHelper } from 'set-protocol-oracles';
import { FeeCalculatorHelper } from './feeCalculatorHelper';
import { LiquidatorHelper } from './liquidatorHelper';
import { ValuationHelper } from './valuationHelper';

const web3 = getWeb3();
const blockchain = new Blockchain(web3);

export interface BaseSetConfig {
  set1Components?: Address[];
  set2Components?: Address[];
  set3Components?: Address[];
  set1Units?: BigNumber[];
  set2Units?: BigNumber[];
  set3Units?: BigNumber[];
  set1NaturalUnit?: BigNumber;
  set2NaturalUnit?: BigNumber;
  set3NaturalUnit?: BigNumber;
}

export interface PriceUpdate {
  component1Price?: BigNumber;
  component2Price?: BigNumber;
  component3Price?: BigNumber;
}

export interface ComponentConfig {
  component1Price?: BigNumber;
  component2Price?: BigNumber;
  component3Price?: BigNumber;
  component1Decimals?: number;
  component2Decimals?: number;
  component3Decimals?: number;
}

export class RebalanceTestSetup {
  private _contractOwnerAddress: Address;
  private _coreHelper: CoreHelper;
  private _erc20Helper: ERC20Helper;
  private _oracleHelper: OracleHelper;
  private _liquidatorHelper: LiquidatorHelper;
  private _valuationHelper: ValuationHelper;
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
  public linearAuctionLiquidator: LinearAuctionLiquidatorContract;

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

  public rebalancingSetToken: RebalancingSetTokenV3Contract;

  constructor(
    contractOwnerAddress: Address,
  ) {
    this._contractOwnerAddress = contractOwnerAddress;
    this._coreHelper = new CoreHelper(this._contractOwnerAddress, this._contractOwnerAddress);
    this._erc20Helper = new ERC20Helper(this._contractOwnerAddress);
    this._oracleHelper = new OracleHelper(this._contractOwnerAddress);
    this._feeCalculatorHelper = new FeeCalculatorHelper(this._contractOwnerAddress);
    this._valuationHelper = new ValuationHelper(
      this._contractOwnerAddress,
      this._coreHelper,
      this._erc20Helper,
      this._oracleHelper
    );

    this._liquidatorHelper = new LiquidatorHelper(this._contractOwnerAddress, this._erc20Helper, this._valuationHelper);
  }

  /* ============ Deployment ============ */

  public async initialize(
    from: Address = this._contractOwnerAddress
  ): Promise<void> {
    await this.initializeCore();

    await this.initializeComponents();

    await this.initializeBaseSets();
  }

  public async initializeBaseSets(config: BaseSetConfig = {}): Promise<void> {
    this.set1Components = config.set1Components ||  [this.component1.address, this.component2.address];
    this.set1Units = config.set1Units || [new BigNumber(10 ** 13), new BigNumber(1280)];
    this.set1NaturalUnit = config.set1NaturalUnit || new BigNumber(10 ** 13);
    this.set1 = await this._coreHelper.createSetTokenAsync(
      this.core,
      this.setTokenFactory.address,
      this.set1Components,
      this.set1Units,
      this.set1NaturalUnit,
    );

    this.set2Components = config.set2Components || [this.component1.address, this.component2.address];
    this.set2Units = config.set2Units || [new BigNumber(10 ** 13), new BigNumber(5120)];
    this.set2NaturalUnit = config.set2NaturalUnit || new BigNumber(10 ** 13);
    this.set2 = await this._coreHelper.createSetTokenAsync(
      this.core,
      this.setTokenFactory.address,
      this.set2Components,
      this.set2Units,
      this.set2NaturalUnit,
    );

    this.set3Components = config.set3Components || [this.component1.address, this.component3.address];
    this.set3Units = config.set3Units || [new BigNumber(10 ** 13), new BigNumber(5120)];
    this.set3NaturalUnit = config.set3NaturalUnit || new BigNumber(10 ** 13);
    this.set3 = await this._coreHelper.createSetTokenAsync(
      this.core,
      this.setTokenFactory.address,
      this.set3Components,
      this.set3Units,
      this.set3NaturalUnit,
    );
  }

  public async initializeComponents(config: ComponentConfig = {}): Promise<void> {
    const component1Decimals = config.component1Decimals || 18;
    const component2Decimals = config.component2Decimals || 6;
    const component3Decimals = config.component3Decimals || 8;

    this.component1 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress, component1Decimals);

    this.component2 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress, component2Decimals);

    this.component3 = await this._erc20Helper.deployTokenAsync(this._contractOwnerAddress, component3Decimals);

    this.component1Price = config.component1Price || ether(128);
    this.component2Price = config.component2Price || ether(1);
    this.component3Price = config.component3Price || ether(7500);

    this.component1Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component1Price);
    this.component2Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component2Price);
    this.component3Oracle = await this._oracleHelper.deployUpdatableOracleMockAsync(this.component3Price);

    await this.oracleWhiteList.addTokenOraclePair.sendTransactionAsync(
      this.component1.address,
      this.component1Oracle.address,
    );
    await this.oracleWhiteList.addTokenOraclePair.sendTransactionAsync(
      this.component2.address,
      this.component2Oracle.address,
    );
    await this.oracleWhiteList.addTokenOraclePair.sendTransactionAsync(
      this.component3.address,
      this.component3Oracle.address,
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
    this.oracleWhiteList = await this._coreHelper.deployOracleWhiteListAsync();
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

    // Hardcoding values for now
    const auctionPeriod = ONE_HOUR_IN_SECONDS.mul(4);
    const rangeStart = new BigNumber(1); // 10% below fair value
    const rangeEnd = new BigNumber(21); // 10% above fair value
    const name = 'liquidator';

    this.linearAuctionLiquidator = await this._liquidatorHelper.deployLinearAuctionLiquidatorAsync(
      this.core.address,
      this.oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      name,
    );
    await this._coreHelper.addAddressToWhiteList(this.linearAuctionLiquidator.address, this.liquidatorWhitelist);
    console.log(
      'Core: ' + this.core.address,
      'TransferProxy: ' + this.transferProxy.address,
      'Vault: ' + this.vault.address,
      'SetTokenFactory: ' + this.setTokenFactory.address,
      'RebalanceAuctionModule: ' + this.rebalanceAuctionModule.address,
      'RebalancingComponentWhiteList: ' + this.rebalancingComponentWhiteList.address,
      'OracleWhiteList: ' + this.oracleWhiteList.address,
      'LiquidatorWhiteList: ' + this.liquidatorWhitelist.address,
      'FeeCalculatorWhiteList: ' + this.feeCalculatorWhitelist.address,
      'RebalancingFactory: ' + this.rebalancingFactory.address,
      'FixedFeeCalculator: ' + this.fixedFeeCalculator.address,
      'LinearAuctionLiquidator: ' + this.linearAuctionLiquidator.address
    );
  }

  public setRebalancingSet(
    rebalancingSet: RebalancingSetTokenV3Contract
  ): void {
    this.rebalancingSetToken = rebalancingSet;
  }

  public async mintRebalancingSets(
    rebalancingSetQuantity: BigNumber,
  ): Promise<void> {
      const rebalancingNaturalUnit = await this.rebalancingSetToken.naturalUnit.callAsync();
      const currentSet = await this.rebalancingSetToken.currentSet.callAsync();
      const [currentSetUnit] = await this.rebalancingSetToken.getUnits.callAsync();
      const curSetNaturalUnit = await this.set1.naturalUnit.callAsync();
      const currentSetRequired = rebalancingSetQuantity
                                  .mul(currentSetUnit)
                                  .div(rebalancingNaturalUnit)
                                  .div(curSetNaturalUnit).round(0, 3)
                                  .mul(curSetNaturalUnit)
                                  .mul(2); // Ensure there is enough minted for safe measure

      // Issue currentSetToken
      await this.core.issue.sendTransactionAsync(
        currentSet,
        currentSetRequired,
        {from: this._contractOwnerAddress }
      );

      const currentSetERC20Instance = await this._erc20Helper.getTokenInstanceAsync(currentSet);
      await this._erc20Helper.approveTransfersAsync([currentSetERC20Instance], this.transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await this.core.issue.sendTransactionAsync(this.rebalancingSetToken.address, rebalancingSetQuantity);
  }

  public async approveComponentsToAddress(toApprove: Address): Promise<void> {
    await this._erc20Helper.approveTransfersAsync(
      [this.component1, this.component2, this.component3],
      toApprove
    );
  }

  public async jumpTimeAndUpdateOracles(
    timeIncrease: BigNumber,
    newPrices: PriceUpdate,
  ): Promise<void> {
    await blockchain.increaseTimeAsync(timeIncrease);
    await blockchain.mineBlockAsync();

    if (newPrices.component1Price) {
      await this.component1Oracle.updatePrice.sendTransactionAsync(newPrices.component1Price);
    }

    if (newPrices.component2Price) {
      await this.component2Oracle.updatePrice.sendTransactionAsync(newPrices.component2Price);
    }

    if (newPrices.component3Price) {
      await this.component3Oracle.updatePrice.sendTransactionAsync(newPrices.component3Price);
    }
  }
}
