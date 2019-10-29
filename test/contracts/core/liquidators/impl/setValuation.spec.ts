require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  OracleWhiteListContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  SetValuationMockContract,
  TransferProxyContract,
  UpdatableOracleMockContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  ZERO,
} from '@utils/constants';
import { ether, gWei } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');

contract('SetValuation', accounts => {
  const [
    ownerAccount,
    functionCaller,
    whitelist,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalancingSetTokenFactory: RebalancingSetTokenFactoryContract;
  let setTokenFactory: SetTokenFactoryContract;
  let setValuationMock: SetValuationMockContract;
  let oracleWhiteList: OracleWhiteListContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const libraryMockHelper = new LibraryMockHelper(ownerAccount);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper);

  before(async () => {
    ABIDecoder.addABI(Core.abi);

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);

    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
    setValuationMock = await libraryMockHelper.deploySetValuationMockAsync();
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#calculateSetTokenDollarValue', async () => {
    let subjectSet: Address;
    let subjectOracle: Address;
    let subjectUnit: BigNumber;
    let subjectTokenDecimal: BigNumber;

    let component1: StandardTokenMockContract;
    let component2: StandardTokenMockContract;

    let component1Price: BigNumber;
    let component2Price: BigNumber;

    let component1Oracle: UpdatableOracleMockContract;
    let component2Oracle: UpdatableOracleMockContract;

    let set1: SetTokenContract;
    let set1Components: Address[];
    let set1Units: BigNumber[];
    let set1NaturalUnit: BigNumber;

    beforeEach(async () => {
      component1 = await erc20Helper.deployTokenAsync(ownerAccount);
      component2 = await erc20Helper.deployTokenAsync(ownerAccount);

      set1Components = [component1.address, component2.address];
      set1Units = [gWei(1), gWei(1)];
      set1NaturalUnit = gWei(1);
      set1 = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        set1Components,
        set1Units,
        set1NaturalUnit,
      );

      component1Price = ether(1);
      component2Price = ether(2);

      component1Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component1Price);
      component2Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component2Price);

      oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
        [component1.address, component2.address],
        [component1Oracle.address, component2Oracle.address],
      );

      subjectSet = set1.address;
      subjectOracle = oracleWhiteList.address;
    });

    async function subject(): Promise<BigNumber> {
      return setValuationMock.calculateSetTokenDollarValue.callAsync(
        subjectSet,
        subjectOracle,
      );
    }

    it('calculates the correct USD value', async () => {
      const result = await subject();

      const expectedResult = await liquidatorHelper.calculateSetTokenValueAsync(
        set1,
        oracleWhiteList,
      );

      expect(result).to.bignumber.equal(expectedResult);
    });    
  });

  describe('#calculateTokenAllocationAmountUSD', async () => {
    let subjectTokenPrice: BigNumber;
    let subjectNaturalUnit: BigNumber;
    let subjectUnit: BigNumber;
    let subjectTokenDecimal: BigNumber;

    beforeEach(async () => {
      subjectTokenPrice = ether(150);
      subjectNaturalUnit = gWei(1);
      subjectUnit = gWei(5);
      subjectTokenDecimal = new BigNumber(18);
    });

    async function subject(): Promise<BigNumber> {
      return setValuationMock.calculateTokenAllocationAmountUSD.callAsync(
        subjectTokenPrice,
        subjectNaturalUnit,
        subjectUnit,
        subjectTokenDecimal,
      );
    }

    it('calculates the correct USD value', async () => {
      const result = await subject();

      const setFullUnit = new BigNumber(10 ** 18);
      const tokenFullUnit = new BigNumber(10).pow(subjectTokenDecimal.toNumber());

      const componentUnits = subjectUnit
                              .mul(setFullUnit)
                              .div(subjectNaturalUnit)
                              .round(0, 3);

      const expectedResult = subjectTokenPrice
                              .mul(componentUnits)
                              .div(tokenFullUnit)
                              .round(0, 3);

      expect(result).to.bignumber.equal(expectedResult);
    });

    describe('when the value is not greater than 0', async () => {
      beforeEach(async () => {
        subjectTokenDecimal = ether(1);
        subjectNaturalUnit = ether(1)
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});