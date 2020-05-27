require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  LinearAuctionLiquidatorContract,
  LiquidatorUtilsMockContract,
  OracleWhiteListContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { ether, gWei } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { SCALE_FACTOR, ZERO } from '@utils/constants';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('LiquidatorUtils', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let core: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const oracleHelper = new OracleHelper(ownerAccount);
  const valuationHelper = new ValuationHelper(ownerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper, valuationHelper);

  let oracleWhiteList: OracleWhiteListContract;
  let liquidatorUtils: LiquidatorUtilsMockContract;

  let component1: StandardTokenMockContract;
  let component2: StandardTokenMockContract;

  let component1Price: BigNumber;
  let component2Price: BigNumber;

  let set1: SetTokenContract;
  let set2: SetTokenContract;
  let set3: SetTokenContract;

  let set1Components: Address[];
  let set2Components: Address[];
  let set3Components: Address[];

  let set1Units: BigNumber[];
  let set2Units: BigNumber[];
  let set3Units: BigNumber[];

  let set1NaturalUnit: BigNumber;
  let set2NaturalUnit: BigNumber;
  let set3NaturalUnit: BigNumber;

  let component1Oracle: UpdatableOracleMockContract;
  let component2Oracle: UpdatableOracleMockContract;

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(LinearAuctionLiquidatorContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    component1 = await erc20Helper.deployTokenAsync(ownerAccount, 18);
    component2 = await erc20Helper.deployTokenAsync(ownerAccount, 8);

    set1Components = [component1.address, component2.address];
    set1Units = [gWei(10), new BigNumber(1)];
    set1NaturalUnit = gWei(10);
    set1 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set1Components,
      set1Units,
      set1NaturalUnit,
    );

    set2Components = [component1.address, component2.address];
    set2Units = [gWei(20), new BigNumber(1)];
    set2NaturalUnit = gWei(20);
    set2 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set2Components,
      set2Units,
      set2NaturalUnit,
    );

    set3Components = [component2.address];
    set3Units = [new BigNumber(1)];
    set3NaturalUnit = gWei(10);
    set3 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set3Components,
      set3Units,
      set3NaturalUnit,
    );

    component1Price = ether(1);
    component2Price = ether(2);

    component1Oracle = await oracleHelper.deployUpdatableOracleMockAsync(component1Price);
    component2Oracle = await oracleHelper.deployUpdatableOracleMockAsync(component2Price);

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [component1.address, component2.address],
      [component1Oracle.address, component2Oracle.address],
    );

    liquidatorUtils = await liquidatorHelper.deployLiquidatorUtilsMockAsync();
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(LinearAuctionLiquidatorContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#calculateRebalanceVolume', async () => {
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectOracleWhiteList: Address;
    let subjectCurrentSetQuantity: BigNumber;

    beforeEach(async () => {
      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
      subjectCurrentSetQuantity = ether(100);
      subjectOracleWhiteList = oracleWhiteList.address;
    });

    async function subject(): Promise<BigNumber> {
      return liquidatorUtils.testCalculateRebalanceVolume.callAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectOracleWhiteList,
        subjectCurrentSetQuantity,
      );
    }

    it('returns the correct rebalance volume', async () => {
      const rebalanceVolume = await subject();

      const expectedRebalanceVolume = await liquidatorHelper.calculateRebalanceVolumeAsync(
        set1,
        set2,
        oracleWhiteList,
        subjectCurrentSetQuantity
      );

      expect(rebalanceVolume).to.be.bignumber.equal(expectedRebalanceVolume);
    });

    describe('for an allocation with 100%', async () => {
      beforeEach(async () => {
        subjectCurrentSet = set3.address;
      });

      it('returns the asset allocation', async () => {
        const rebalanceVolume = await subject();

        const expectedRebalanceVolume = await liquidatorHelper.calculateRebalanceVolumeAsync(
          set3,
          set2,
          oracleWhiteList,
          subjectCurrentSetQuantity
        );

        expect(rebalanceVolume).to.be.bignumber.equal(expectedRebalanceVolume);
      });
    });
  });

  describe('#calculateAssetAllocation', async () => {
    let subjectCurrentSet: Address;
    let subjectOracleWhiteList: Address;
    let subjectAsset: Address;

    beforeEach(async () => {
      subjectCurrentSet = set1.address;
      subjectOracleWhiteList = oracleWhiteList.address;
      subjectAsset = component1.address;
    });

    async function subject(): Promise<BigNumber> {
      return liquidatorUtils.testCalculateAssetAllocation.callAsync(
        subjectCurrentSet,
        subjectOracleWhiteList,
        subjectAsset,
      );
    }

    it('returns the asset allocation', async () => {
      const allocationPercentage = await subject();

      const expectedAllocationPercentage = await liquidatorHelper.calculateAssetAllocationAsync(
        set1,
        oracleWhiteList,
        component1.address
      );

      expect(allocationPercentage).to.be.bignumber.equal(expectedAllocationPercentage);
    });

    describe('for the different Set', async () => {
      beforeEach(async () => {
        subjectCurrentSet = set2.address;
      });

      it('returns the asset allocation', async () => {
        const allocationPercentage = await subject();

        const expectedAllocationPercentage = await liquidatorHelper.calculateAssetAllocationAsync(
          set2,
          oracleWhiteList,
          component1.address
        );

        expect(allocationPercentage).to.be.bignumber.equal(expectedAllocationPercentage);
      });
    });

    describe('for Sets with one asset', async () => {

      beforeEach(async () => {
        subjectCurrentSet = set3.address;
      });

      describe('when asset is in Set', async () => {
        beforeEach(async () => {
          subjectAsset = component2.address;
        });

        it('returns the asset allocation', async () => {
          const allocationPercentage = await subject();

          expect(allocationPercentage).to.be.bignumber.equal(SCALE_FACTOR);
        });
      });

      describe('when asset is not in Set', async () => {
        beforeEach(async () => {
          subjectAsset = component1.address;
        });

        it('returns the asset allocation', async () => {
          const allocationPercentage = await subject();

          expect(allocationPercentage).to.be.bignumber.equal(ZERO);
        });
      });
    });
  });
});