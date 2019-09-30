require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  SetTokenContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  UpdatableConstantAuctionPriceCurveContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_UNIT_SHARES,
  ZERO,
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DIVISOR,
  DEFAULT_REBALANCING_NATURAL_UNIT,
} from '@utils/constants';
import {
  getExpectedTransferLog,
  getExpectedNewManagerAddedLog,
  getExpectedRebalanceProposedLog,
  getExpectedRebalanceStartedLog,
} from '@utils/contract_logs/rebalancingSetToken';
import { expectRevertError, assertTokenBalanceAsync } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetTokenV2 = artifacts.require('RebalancingSetTokenV2');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('RebalancingSetState', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    fakeTokenAccount,
    invalidAccount,
    fakeModuleAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV2Contract;
  let components: StandardTokenMockContract[] = [];

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenV2FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let constantAuctionPriceCurve: UpdatableConstantAuctionPriceCurveContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingHelper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
    ABIDecoder.addABI(RebalancingSetTokenV2.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalancingSetTokenV2.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);
    rebalanceAuctionModule = await coreHelper.deployRebalanceAuctionModuleAsync(coreMock, vault);
    await coreHelper.addModuleAsync(coreMock, rebalanceAuctionModule.address);

    factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectFactory: Address;
    let subjectManager: Address;
    let subjectLiquidator: Address;
    let subjectInitialSet: Address;
    let subjectComponentWhiteList: Address;
    let subjectInitialUnitShares: BigNumber;
    let subjectNaturalUnit: BigNumber;
    let subjectProposalPeriod: BigNumber;
    let subjectRebalanceInterval: BigNumber;
    let subjectFailPeriod: BigNumber;
    const subjectName: string = 'Rebalancing Set';
    const subjectSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      subjectFactory = rebalancingFactory.address;
      subjectManager = managerAccount;
      subjectLiquidator = fakeModuleAccount;
      subjectInitialSet = components[0].address,
      subjectComponentWhiteList = rebalancingComponentWhiteList.address;
      subjectInitialUnitShares = DEFAULT_UNIT_SHARES;
      subjectNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      subjectProposalPeriod = ONE_DAY_IN_SECONDS;
      subjectRebalanceInterval = ONE_DAY_IN_SECONDS.mul(2);
      subjectFailPeriod = ONE_DAY_IN_SECONDS.mul(3);
    });

    async function subject(): Promise<RebalancingSetTokenV2Contract> {
      return rebalancingHelper.deployRebalancingSetTokenV2Async(
        subjectFactory,
        subjectManager,
        subjectLiquidator,
        subjectInitialSet,
        subjectComponentWhiteList,
        subjectInitialUnitShares,
        subjectNaturalUnit,
        subjectProposalPeriod,
        subjectRebalanceInterval,
        subjectFailPeriod,
        subjectName,
        subjectSymbol,
      );
    }

    it('creates a set with the correct name', async () => {
      rebalancingSetToken = await subject();

      const tokenName = await rebalancingSetToken.name.callAsync();
      expect(tokenName).to.equal(subjectName);
    });

    it('creates a set with the correct symbol', async () => {
      rebalancingSetToken = await subject();

      const tokenSymbol = await rebalancingSetToken.symbol.callAsync();
      expect(tokenSymbol).to.equal(subjectSymbol);
    });

    it('creates a set with the correct factory', async () => {
      rebalancingSetToken = await subject();

      const tokenFactory = await rebalancingSetToken.factory.callAsync();
      expect(tokenFactory).to.equal(subjectFactory);
    });

    it('creates a set with the correct manager', async () => {
      rebalancingSetToken = await subject();

      const tokenManager = await rebalancingSetToken.manager.callAsync();
      expect(tokenManager).to.equal(subjectManager);
    });

    it('creates a set with the correct liquidator', async () => {
      rebalancingSetToken = await subject();

      const liquidator = await rebalancingSetToken.liquidator.callAsync();
      expect(liquidator).to.equal(subjectLiquidator);
    });

    it('creates a set with the correct initialSet', async () => {
      rebalancingSetToken = await subject();

      const tokenInitialSet = await rebalancingSetToken.currentSet.callAsync();
      expect(tokenInitialSet).to.equal(subjectInitialSet);
    });

    it('creates a set with the correct initial unit shares', async () => {
      rebalancingSetToken = await subject();

      const tokenInitialUnitShares = await rebalancingSetToken.unitShares.callAsync();
      expect(tokenInitialUnitShares).to.be.bignumber.equal(subjectInitialUnitShares);
    });

    it('creates a set with the correct proposal period', async () => {
      rebalancingSetToken = await subject();

      const tokenProposalPeriod = await rebalancingSetToken.proposalPeriod.callAsync();
      expect(tokenProposalPeriod).to.be.bignumber.equal(subjectProposalPeriod);
    });

    it('creates a set with the correct rebalance interval', async () => {
      rebalancingSetToken = await subject();

      const rebalancingInterval = await rebalancingSetToken.rebalanceInterval.callAsync();
      expect(rebalancingInterval).to.be.bignumber.equal(subjectRebalanceInterval);
    });

    it('creates a set with the correct rebalance fail Period', async () => {
      rebalancingSetToken = await subject();

      const rebalanceFailPeriod = await rebalancingSetToken.rebalanceFailPeriod.callAsync();
      expect(rebalanceFailPeriod).to.be.bignumber.equal(subjectFailPeriod);
    });

    it('sets the rebalancingSetToken state to Default', async () => {
      rebalancingSetToken = await subject();

      const tokenState = await rebalancingSetToken.rebalanceState.callAsync();
      expect(tokenState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
    });

    it('should have an empty failedAuctionWithdrawComponents', async () => {
      rebalancingSetToken = await subject();

      const expectedComponents = [];

      const withdrawComponents = await rebalancingSetToken.getFailedAuctionWithdrawComponents.callAsync();
      expect(JSON.stringify(withdrawComponents)).to.equal(JSON.stringify(expectedComponents));
    });

    describe('when the proposal period is less than one day in seconds', async () => {
      beforeEach(async () => {
        subjectProposalPeriod = new BigNumber(5000);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the rebalanceInterval is less than one day in seconds', async () => {
      beforeEach(async () => {
        subjectRebalanceInterval = new BigNumber(5000);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the initial unit shares is 0', async () => {
      beforeEach(async () => {
        subjectInitialUnitShares = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

   describe('when the initial natural unit is less than the minimum', async () => {
      beforeEach(async () => {
        subjectNaturalUnit = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

   describe('when the initial natural unit is greater than the maximum', async () => {
      beforeEach(async () => {
        subjectNaturalUnit = new BigNumber(10 ** 15);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the manager address is null', async () => {
      beforeEach(async () => {
        subjectManager = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getComponents', async () => {
    let subjectCaller: Address;
    let initialSet: Address;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      initialSet = components[0].address;
      const manager = managerAccount;
      const liquidator = fakeModuleAccount;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const failPeriod = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenV2Async(
        rebalancingFactory.address,
        manager,
        liquidator,
        initialSet,
        rebalancingComponentWhiteList.address,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        failPeriod,
      );

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string[]> {
      return rebalancingSetToken.getComponents.callAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('returns the correct component array', async () => {
      const components = await subject();

      expect([initialSet]).to.deep.equal(components);
    });
  });

  describe('#getUnits', async () => {
    let subjectCaller: Address;
    let initialUnitShares: BigNumber;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      const liquidator = fakeModuleAccount;
      initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const failPeriod = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenV2Async(
        rebalancingFactory.address,
        manager,
        liquidator,
        initialSet,
        rebalancingComponentWhiteList.address,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        failPeriod,
      );

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getUnits.callAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('returns the correct unit array', async () => {
      const units = await subject();

      expect(units).to.be.instanceof(Array);
      expect(1).to.equal(units.length);
      expect(initialUnitShares).to.be.bignumber.equal(units[0]);
    });
  });

  describe('#tokenIsComponent', async () => {
    let subjectCaller: Address;
    let subjectComponent: Address;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      const liquidator = fakeModuleAccount;      
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const failPeriod = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenV2Async(
        rebalancingFactory.address,
        manager,
        liquidator,
        initialSet,
        rebalancingComponentWhiteList.address,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        failPeriod,
      );

      subjectCaller = managerAccount;
      subjectComponent = subjectComponent || initialSet;
    });

    async function subject(): Promise<boolean> {
      return rebalancingSetToken.tokenIsComponent.callAsync(
        subjectComponent,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('returns true', async () => {
      const isComponentOfSet = await subject();

      expect(isComponentOfSet);
    });

    describe('when the subject token is not a component', async () => {
      before(async () => {
        subjectComponent = fakeTokenAccount;
      });

      after(async () => {
        subjectComponent = undefined;
      });

      it('returns false', async () => {
        const isComponentOfSet = await subject();

        expect(!isComponentOfSet);
      });
    });
  });

  describe('#setManager', async () => {
    let rebalancingSetToken: RebalancingSetTokenV2Contract;
    let subjectNewManager: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      const liquidator = fakeModuleAccount;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const failPeriod = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenV2Async(
        rebalancingFactory.address,
        manager,
        liquidator,
        initialSet,
        rebalancingComponentWhiteList.address,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        failPeriod,
      );

      subjectNewManager = otherAccount,
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.setManager.sendTransactionAsync(
        subjectNewManager,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates to the new manager correctly', async () => {
      await subject();

      const expectedNewManager = await rebalancingSetToken.manager.callAsync();
      expect(subjectNewManager).to.equal(expectedNewManager);
    });

    it('emits the correct NewManagerAdded event', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedNewManagerAddedLog(
          subjectNewManager,
          subjectCaller,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the current manager', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
