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
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
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
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('RebalancingSetToken', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    fakeTokenAccount,
    invalidAccount,
    fakeModuleAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;
  let components: StandardTokenMockContract[] = [];

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
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
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(RebalancingSetTokenContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetTokenContract.getAbi());
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
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );
    constantAuctionPriceCurve = await rebalancingHelper.deployUpdatableConstantAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_NUMERATOR,
      DEFAULT_AUCTION_PRICE_DIVISOR,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
    await rebalancingHelper.addPriceLibraryAsync(coreMock, constantAuctionPriceCurve);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectFactory: Address;
    let subjectManager: Address;
    let subjectInitialSet: Address;
    let subjectInitialUnitShares: BigNumber;
    let subjectNaturalUnit: BigNumber;
    let subjectProposalPeriod: BigNumber;
    let subjectRebalanceInterval: BigNumber;
    let subjectComponentWhiteList: Address;
    const subjectName: string = 'Rebalancing Set';
    const subjectSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      subjectFactory = rebalancingFactory.address;
      subjectManager = managerAccount;
      subjectInitialSet = components[0].address,
      subjectInitialUnitShares = DEFAULT_UNIT_SHARES;
      subjectNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      subjectProposalPeriod = ONE_DAY_IN_SECONDS;
      subjectRebalanceInterval = ONE_DAY_IN_SECONDS;
      subjectComponentWhiteList = rebalancingComponentWhiteList.address;
    });

    async function subject(): Promise<RebalancingSetTokenContract> {
      return rebalancingHelper.deployRebalancingSetTokenAsync(
        subjectFactory,
        subjectManager,
        subjectInitialSet,
        subjectInitialUnitShares,
        subjectNaturalUnit,
        subjectProposalPeriod,
        subjectRebalanceInterval,
        subjectComponentWhiteList,
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

    it('sets the rebalancingSetToken state to Default', async () => {
      rebalancingSetToken = await subject();

      const tokenState = await rebalancingSetToken.rebalanceState.callAsync();
      expect(tokenState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
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
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        rebalancingComponentWhiteList.address,
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
      initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        rebalancingComponentWhiteList.address,
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
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        rebalancingComponentWhiteList.address,
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

  describe('#mint: Called on Rebalancing Token', async () => {
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      const setTokensToDeploy = 1;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );
      const currentSetToken = setTokens[0];

      const manager = managerAccount;
      const initialSet = currentSetToken.address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      const rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
      const rebalancingFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
        coreMock.address,
        rebalancingComponentWhiteList.address,
      );

      await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        rebalancingComponentWhiteList.address,
      );

      subjectIssuer = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = deployerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.mint.sendTransactionAsync(
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should revert since call is not from core', async () => {
      await expectRevertError(subject());
    });
  });

  describe('#mint: Called from CoreMock', async () => {
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let rebalancingSetToken: RebalancingSetTokenContract;
    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
      );

      subjectIssuer = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return coreMock.mint.sendTransactionAsync(
        rebalancingSetToken.address,
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingSetToken.balanceOf.callAsync(subjectIssuer);

      await subject();

      const expectedNewBalance = existingBalance.add(subjectQuantity);
      await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, subjectIssuer);
    });

    it('updates the totalSupply_ correctly', async () => {
      const existingTokenSupply = await rebalancingSetToken.totalSupply.callAsync();

      await subject();

      const expectedTokenSupply = existingTokenSupply.add(subjectQuantity);
      const newTokenSupply = await rebalancingSetToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
    });

    it('emits a Transfer log denoting a minting', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          NULL_ADDRESS,
          subjectIssuer,
          subjectQuantity,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when mint is called from Rebalance state', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

       it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

     describe('when mint is called from Drawdown State', async () => {
      beforeEach(async () => {
      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));


        const [bidQuantity] = await rebalancingSetToken.getBiddingParameters.callAsync();
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );

        await rebalancingHelper.endFailedRebalanceAsync(
          rebalancingSetToken
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#burn: Called on Rebalancing Token', async () => {
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      const mintedQuantity = ether(5);
      subjectBurner = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = managerAccount;

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(5), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, mintedQuantity);
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.burn.sendTransactionAsync(
        subjectBurner,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should revert because its not called through core', async () => {
      await expectRevertError(subject());
    });
  });

  describe('#burn: Called by Module', async () => {
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;

    beforeEach(async () => {
      await coreHelper.addModuleAsync(coreMock, fakeModuleAccount);

      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      const mintedQuantity = ether(5);
      subjectBurner = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = fakeModuleAccount;

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(5), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, mintedQuantity);
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.burn.sendTransactionAsync(
        subjectBurner,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should revert because its not called through core during non-Drawdown state', async () => {
      await expectRevertError(subject());
    });

    describe('when Module calls burn from Drawdown State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const bidQuantity = biddingParameters[0];
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );

        await rebalancingHelper.endFailedRebalanceAsync(
          rebalancingSetToken
        );
      });

      it('updates the totalSupply_ correctly', async () => {
        const existingTokenSupply = await rebalancingSetToken.totalSupply.callAsync();

        await subject();

        const expectedTokenSupply = existingTokenSupply.sub(subjectQuantity);
        const newTokenSupply = await rebalancingSetToken.totalSupply.callAsync();
        expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
      });
    });
  });

  describe('#burn: Called from CoreMock', async () => {
    let rebalancingSetToken: RebalancingSetTokenContract;
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      const mintedQuantity = ether(5);
      subjectBurner = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = managerAccount;

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(5), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, mintedQuantity);
    });

    async function subject(): Promise<string> {
      return coreMock.burn.sendTransactionAsync(
        rebalancingSetToken.address,
        subjectBurner,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingSetToken.balanceOf.callAsync(subjectBurner);

      await subject();

      const expectedNewBalance = existingBalance.sub(subjectQuantity);
      await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, subjectBurner);
    });

    it('updates the totalSupply_ correctly', async () => {
      const existingTokenSupply = await rebalancingSetToken.totalSupply.callAsync();

      await subject();

      const expectedTokenSupply = existingTokenSupply.sub(subjectQuantity);
      const newTokenSupply = await rebalancingSetToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
    });

    it('emits a Transfer log denoting a minting', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          subjectBurner,
          NULL_ADDRESS,
          subjectQuantity,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the user does not have enough shares to burn', async () => {
      beforeEach(async () => {
        subjectQuantity = ether(10);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when burn is called from Rebalance state', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when Core calls burn from Drawdown State', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const bidQuantity = biddingParameters[0];
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );

        await rebalancingHelper.endFailedRebalanceAsync(
          rebalancingSetToken
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#setManager', async () => {
    let rebalancingSetToken: RebalancingSetTokenContract;
    let subjectNewManager: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        rebalancingComponentWhiteList.address
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

  describe('#getCombinedTokenArrayLength', async () => {
    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );

      const currentSetToken = setTokens[0];
      const nextSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      await rebalancingHelper.defaultTransitionToRebalanceAsync(
        coreMock,
        rebalancingComponentWhiteList,
        rebalancingSetToken,
        nextSetToken,
        constantAuctionPriceCurve.address,
        managerAccount
      );
    });

    async function subject(): Promise<BigNumber> {
      return rebalancingSetToken.getCombinedTokenArrayLength.callAsync();
    }

    it('updates to the new rebalancing set correctly', async () => {
      const actualArrayLength = await subject();

      const expectedArrayLength = new BigNumber(3);
      expect(actualArrayLength).to.be.bignumber.equal(expectedArrayLength);
    });
  });

  describe('#propose', async () => {
    let subjectRebalancingToken: Address;
    let subjectAuctionLibrary: Address;
    let subjectAuctionTimeToPivot: BigNumber;
    let subjectAuctionStartPrice: BigNumber;
    let subjectAuctionPivotPrice: BigNumber;
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let reproposeRebalancingSetToken: SetTokenContract;
    let setTokens: SetTokenContract[];
    let naturalUnits: BigNumber[];

    beforeEach(async () => {
      const setTokensToDeploy = 3;
      setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        naturalUnits || undefined
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];
      reproposeRebalancingSetToken = setTokens[2];

      const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
      const reproposeRebalancingSetComponentAddresses = await reproposeRebalancingSetToken.getComponents.callAsync();
      const componentsToWhiteList = _.uniq(
        nextSetTokenComponentAddresses.concat(reproposeRebalancingSetComponentAddresses)
      );
      await coreHelper.addTokensToWhiteList(componentsToWhiteList, rebalancingComponentWhiteList);

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      subjectRebalancingToken = nextSetToken.address;
      subjectAuctionLibrary = constantAuctionPriceCurve.address;
      subjectAuctionTimeToPivot = new BigNumber(100000);
      subjectAuctionStartPrice = ether(5);
      subjectAuctionPivotPrice = DEFAULT_AUCTION_PRICE_NUMERATOR;
      subjectCaller = managerAccount;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSetToken.propose.sendTransactionAsync(
        subjectRebalancingToken,
        subjectAuctionLibrary,
        subjectAuctionTimeToPivot,
        subjectAuctionStartPrice,
        subjectAuctionPivotPrice,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when propose is called from the Default state', async () => {
      it('updates to the new rebalancing set correctly', async () => {
        await subject();

        const newRebalacingSet = await rebalancingSetToken.nextSet.callAsync();
        expect(newRebalacingSet).to.equal(subjectRebalancingToken);
      });

      it('updates to the new auction library correctly', async () => {
        await subject();

        const newAuctionLibrary = await rebalancingSetToken.auctionLibrary.callAsync();
        expect(newAuctionLibrary).to.equal(subjectAuctionLibrary);
      });

      it('updates the time to pivot correctly', async () => {
        await subject();

        const [, newAuctionTimeToPivot] = await rebalancingSetToken.getAuctionPriceParameters.callAsync();
        expect(newAuctionTimeToPivot).to.be.bignumber.equal(subjectAuctionTimeToPivot);
      });

      it('updates the auction start price correctly', async () => {
        await subject();

        const [, , newAuctionStartPrice] = await rebalancingSetToken.getAuctionPriceParameters.callAsync();
        expect(newAuctionStartPrice).to.be.bignumber.equal(subjectAuctionStartPrice);
      });

      it('updates the auction pivot price correctly', async () => {
        await subject();

        const [, , , newAuctionPivotPrice] = await rebalancingSetToken.getAuctionPriceParameters.callAsync();
        expect(newAuctionPivotPrice).to.be.bignumber.equal(subjectAuctionPivotPrice);
      });

      it('updates the rebalanceState to Proposal', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.PROPOSAL);
      });

      it('emits the correct RebalanceProposed event', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const proposalStartTime = await rebalancingSetToken.proposalStartTime.callAsync();
        const proposalEndTime = proposalStartTime.add(proposalPeriod);
        const expectedLogs = getExpectedRebalanceProposedLog(
          subjectRebalancingToken,
          subjectAuctionLibrary,
          proposalEndTime,
          rebalancingSetToken.address,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('when one of the components in the next set is not on the whitelist', async () => {
        beforeEach(async () => {
          const nextSetComponents = await nextSetToken.getComponents.callAsync();
          await rebalancingComponentWhiteList.removeAddress.sendTransactionAsync(
            nextSetComponents[0],
            { from: deployerAccount }
          );
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the rebalance interval has not elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = ONE_DAY_IN_SECONDS.sub(10);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when not by the token manager', async () => {
        beforeEach(async () => {
          subjectCaller = otherAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the auction library is not approved by Core', async () => {
        beforeEach(async () => {
          subjectAuctionLibrary = invalidAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the time to pivot is less than 21600', async () => {
        beforeEach(async () => {
          subjectAuctionTimeToPivot = ZERO;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the time to pivot is greater than 259200', async () => {
        beforeEach(async () => {
          subjectAuctionTimeToPivot = new BigNumber(300000);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the pivot price is less than .5', async () => {
        beforeEach(async () => {
          const pivotPrice = new BigNumber(.4);
          subjectAuctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(pivotPrice);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the pivot price is greater than 5', async () => {
        beforeEach(async () => {
          const pivotPrice = new BigNumber(6);
          subjectAuctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(pivotPrice);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the proposed nextSet is not approved by Core', async () => {
        beforeEach(async () => {
          subjectRebalancingToken = fakeTokenAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe("when the new proposed set's natural unit is not a multiple of the current set", async () => {
        before(async () => {
          // a setToken with natural unit ether(.003) and setToken with natural unit ether(.002) are being used
          naturalUnits = [ether(.003), ether(.002), ether(.001)];
        });

        after(async () => {
          naturalUnits = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when propose is called from Proposal state', async () => {
      let timeJump: BigNumber;

      beforeEach(async () => {
        const auctionTimeToPivot = new BigNumber(100000);
        const auctionStartPrice = new BigNumber(500);
        const auctionPivotPrice = DEFAULT_AUCTION_PRICE_NUMERATOR;

        await rebalancingHelper.transitionToProposeAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          auctionTimeToPivot,
          auctionStartPrice,
          auctionPivotPrice,
          managerAccount
        );

        subjectRebalancingToken = reproposeRebalancingSetToken.address;
        timeJump = new BigNumber(1000);
        await blockchain.increaseTimeAsync(timeJump);
      });

      it('updates to the new rebalancing set correctly', async () => {
        await subject();

        const newRebalancingSet = await rebalancingSetToken.nextSet.callAsync();
        expect(newRebalancingSet).to.equal(subjectRebalancingToken);
      });

      it('resets the proposalStartTime', async () => {
        const oldProposalStartTime = await rebalancingSetToken.proposalStartTime.callAsync();
        const minNewProposalStartTime = oldProposalStartTime.add(timeJump);

        await subject();
        const newProposalStartTime = await rebalancingSetToken.proposalStartTime.callAsync();
        expect(newProposalStartTime).to.be.bignumber.greaterThan(minNewProposalStartTime);
      });
    });

    describe('when propose is called from Rebalance state', async () => {
      beforeEach(async () => {
      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        const auctionTimeToPivot = new BigNumber(100000);
        const auctionStartPrice = new BigNumber(500);
        const auctionPivotPrice = DEFAULT_AUCTION_PRICE_NUMERATOR;

        await rebalancingHelper.transitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          auctionTimeToPivot,
          auctionStartPrice,
          auctionPivotPrice,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when propose is called from Drawdown State', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        const auctionTimeToPivot = new BigNumber(100000);
        const auctionStartPrice = new BigNumber(500);
        const auctionPivotPrice = DEFAULT_AUCTION_PRICE_NUMERATOR;

        await rebalancingHelper.transitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          auctionTimeToPivot,
          auctionStartPrice,
          auctionPivotPrice,
          managerAccount
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const bidQuantity = biddingParameters[0];
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );

        await rebalancingHelper.endFailedRebalanceAsync(
          rebalancingSetToken
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#startRebalance', async () => {
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetQuantityToIssue: BigNumber;
    let setTokenNaturalUnits: BigNumber[];

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        undefined || setTokenNaturalUnits
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      subjectCaller = managerAccount;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSetToken.startRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when startRebalance is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when startRebalance is called from Propose State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToProposeAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('updates the rebalanceState to Rebalance', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.REBALANCE);
      });

      it('emits the correct RebalanceProposed event', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRebalanceStartedLog(
          currentSetToken.address,
          nextSetToken.address,
          rebalancingSetToken.address,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      it('creates the correct combinedTokenArray', async () => {
        const oldSet = await currentSetToken.getComponents.callAsync();
        const newSet = await nextSetToken.getComponents.callAsync();

        await subject();

        const expectedCombinedTokenArray = _.union(oldSet, newSet);
        await Promise.all(
          expectedCombinedTokenArray.map(async (expectAddress, index) => {
            const tokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
            const actualAddress = tokenArray[index];
            expect(actualAddress).to.be.bignumber.equal(expectAddress);
          })
        );
      });

      it('creates the correct combinedCurrentUnits', async () => {
        await subject();

        const expectedCombinedCurrentUnits = await rebalancingHelper.constructCombinedUnitArrayAsync(
          rebalancingSetToken,
          currentSetToken,
          nextSetToken
        );
        const actualCombinedCurrentUnits = await rebalancingSetToken.getCombinedCurrentUnits.callAsync();
        expect(JSON.stringify(actualCombinedCurrentUnits)).to.eql(JSON.stringify(expectedCombinedCurrentUnits));
      });

      it('creates the correct combinedNextSetUnits', async () => {
        await subject();

        const expectedCombinedRebalanceUnits = await rebalancingHelper.constructCombinedUnitArrayAsync(
          rebalancingSetToken,
          nextSetToken,
          currentSetToken
        );
        const actualCombinedRebalanceUnits = await rebalancingSetToken.getCombinedNextSetUnits.callAsync();
        expect(JSON.stringify(actualCombinedRebalanceUnits)).to.eql(JSON.stringify(expectedCombinedRebalanceUnits));
      });

      it('calculates the correct remainingCurrentSets', async () => {
        const supply = await vault.getOwnerBalance.callAsync(currentSetToken.address, rebalancingSetToken.address);
        const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();

        await subject();

        const expectedRemainingCurrentSets = supply.div(currentSetNaturalUnit).round(0, 3).mul(currentSetNaturalUnit);
        const [, actualRemainingCurrentSets] = await rebalancingSetToken.getBiddingParameters.callAsync();
        expect(actualRemainingCurrentSets).to.be.bignumber.equal(expectedRemainingCurrentSets);
      });

      it('sets the correct startingCurrentSetAmount', async () => {
        await subject();

        const [, expectedStartingCurrentSetAmount] = await rebalancingSetToken.getBiddingParameters.callAsync();
        const actualStartingCurrentSetAmount = await rebalancingSetToken.startingCurrentSetAmount.callAsync();
        expect(actualStartingCurrentSetAmount).to.be.bignumber.equal(expectedStartingCurrentSetAmount);
      });

      it('redeemsInVault the currentSet', async () => {
        const supply = await vault.getOwnerBalance.callAsync(currentSetToken.address, rebalancingSetToken.address);
        const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();
        const currentSetTokenBalance = await vault.balances.callAsync(
          currentSetToken.address,
          rebalancingSetToken.address
        );

        await subject();

        const expectedRedeemableCurrentSets = supply.div(currentSetNaturalUnit).round(0, 3).mul(currentSetNaturalUnit);
        const expectedCurrentSetTokenBalance = currentSetTokenBalance.sub(expectedRedeemableCurrentSets);
        const actualCurrentSetTokenBalance = await vault.balances.callAsync(
          currentSetToken.address,
          rebalancingSetToken.address
        );
        expect(actualCurrentSetTokenBalance).to.be.bignumber.equal(expectedCurrentSetTokenBalance);
      });

      it('increments the balances of the currentSet components back to the rebalancingSetToken', async () => {
        const components = await currentSetToken.getComponents.callAsync();
        const naturalUnit = await currentSetToken.naturalUnit.callAsync();
        const componentUnits = await currentSetToken.getUnits.callAsync();

        const existingVaultBalancePromises = _.map(components, component =>
          vault.balances.callAsync(component, rebalancingSetToken.address),
        );
        const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

        await subject();

        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const redeemableCurrentSetTokens = new BigNumber(biddingParameters[1]);
        const expectedVaultBalances = _.map(components, (component, idx) => {
          const requiredQuantityToRedeem = redeemableCurrentSetTokens.div(naturalUnit).mul(componentUnits[idx]);
          return existingVaultBalances[idx].add(requiredQuantityToRedeem);
        });

        const newVaultBalancesPromises = _.map(components, component =>
          vault.balances.callAsync(component, rebalancingSetToken.address),
        );
        const newVaultBalances = await Promise.all(newVaultBalancesPromises);

        _.map(components, (component, idx) =>
          expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
        );
      });

      describe('when remainingCurrentSetToken amount is not multiple of currentSetToken', async () => {
        beforeEach(async () => {
          await coreMock.deposit.sendTransactionAsync(currentSetToken.address, ether(1), {from: deployerAccount});
          await coreMock.internalTransfer.sendTransactionAsync(
            currentSetToken.address,
            rebalancingSetToken.address,
            new BigNumber(1)
          );
        });

        it('redeemsInVault the currentSet', async () => {
          const supply = await vault.getOwnerBalance.callAsync(currentSetToken.address, rebalancingSetToken.address);
          const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();
          const currentSetTokenBalance = await vault.balances.callAsync(
            currentSetToken.address,
            rebalancingSetToken.address
          );

          await subject();

          const expectedRedeemableCurrentSets = supply.div(currentSetNaturalUnit).round(0, 3).mul(
            currentSetNaturalUnit
          );
          const expectedCurrentSetTokenBalance = currentSetTokenBalance.sub(expectedRedeemableCurrentSets);
          const actualCurrentSetTokenBalance = await vault.balances.callAsync(
            currentSetToken.address,
            rebalancingSetToken.address
          );

          expect(actualCurrentSetTokenBalance).to.be.bignumber.equal(expectedCurrentSetTokenBalance);
          expect(currentSetTokenBalance.mod(currentSetNaturalUnit)).to.be.bignumber.not.equal(new BigNumber(0));
        });
      });

      describe('when not enough time has passed before proposal period has elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = ONE_DAY_IN_SECONDS.sub(10);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when currentRemainingSets does not exceed the minimumBid amount', async () => {
        before(async () => {
          setTokenNaturalUnits = [new BigNumber(10 ** 14), new BigNumber(10 ** 14)];
        });

        beforeEach(async () => {
          const minimumBid = new BigNumber(10 ** 14).mul(1000);

          const redeemAmount = rebalancingSetQuantityToIssue.sub(minimumBid).add(DEFAULT_REBALANCING_NATURAL_UNIT);
          await coreMock.redeem.sendTransactionAsync(rebalancingSetToken.address, redeemAmount);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when startRebalance is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when startRebalance is called from Drawdown State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

        const [bidQuantity] = await rebalancingSetToken.getBiddingParameters.callAsync();
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );

        await rebalancingHelper.endFailedRebalanceAsync(
          rebalancingSetToken
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#settleRebalance', async () => {
    let subjectCaller: Address;

    let proposalPeriod: BigNumber;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let baseSetQuantityToIssue: BigNumber;
    let rebalancingSetQuantityToIssue: BigNumber = ether(7);
    let setTokenNaturalUnits: BigNumber[];
    let rebalancingSetUnitShares: BigNumber;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        undefined || setTokenNaturalUnits,
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
        undefined || rebalancingSetUnitShares,
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(
        currentSetToken.address,
        baseSetQuantityToIssue || ether(9),
        {from: deployerAccount},
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(
        rebalancingSetToken.address,
        rebalancingSetQuantityToIssue,
        {from: deployerAccount}
      );

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.settleRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when settleRebalance is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settleRebalance is called from Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToProposeAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settleRebalance is called from Rebalance State and all currentSets are rebalanced', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const bidQuantity = rebalancingSetQuantityToIssue;
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );
      });

      it('updates the rebalanceState to Default', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
      });

      it('updates the currentSet to rebalancing set', async () => {
        await subject();

        const newCurrentSet = await rebalancingSetToken.currentSet.callAsync();
        expect(newCurrentSet).to.equal(nextSetToken.address);
      });

      it('issues the nextSet to the rebalancingSetToken', async () => {
        const existingBalance = await vault.balances.callAsync(
          nextSetToken.address,
          rebalancingSetToken.address
        );
        const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const expectedBalance = existingBalance.add(settlementAmounts['issueAmount']);
        const newBalance = await vault.balances.callAsync(nextSetToken.address, rebalancingSetToken.address);
        expect(newBalance).to.be.bignumber.equal(expectedBalance);
      });

      it('decrements component balance for the rebalancingSetToken by the correct amount', async () => {
        const componentAddresses = await nextSetToken.getComponents.callAsync();
        const setNaturalUnit = await nextSetToken.naturalUnit.callAsync();
        const setComponentUnits = await nextSetToken.getUnits.callAsync();

        const existingVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          componentAddresses,
          vault,
          rebalancingSetToken.address
        );

        const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const quantityToIssue = settlementAmounts['issueAmount'];
        const expectedVaultBalances: BigNumber[] = [];
        setComponentUnits.forEach((component, idx) => {
          const requiredQuantityToIssue = quantityToIssue.div(setNaturalUnit).mul(component);
          expectedVaultBalances.push(existingVaultBalances[idx].sub(requiredQuantityToIssue));
        });

        const newVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          componentAddresses,
          vault,
          rebalancingSetToken.address
        );
        expect(JSON.stringify(newVaultBalances)).to.equal(JSON.stringify(expectedVaultBalances));
      });

      it('updates the unitShares amount correctly', async () => {
        const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(settlementAmounts['unitShares']);
      });

      it('clears the nextSet variable', async () => {
        await subject();

        const nextSet = await rebalancingSetToken.nextSet.callAsync();
        const expectedNextSet = 0;

        expect(nextSet).to.be.bignumber.equal(expectedNextSet);
      });

      it('clears the auctionLibrary variable', async () => {
        await subject();

        const auctionLibrary = await rebalancingSetToken.auctionLibrary.callAsync();
        const expectedAuctionLibrary = 0;

        expect(auctionLibrary).to.be.bignumber.equal(expectedAuctionLibrary);
      });

      it('clears the startingCurrentSetAmount variable', async () => {
        await subject();

        const startingCurrentSetAmount = await rebalancingSetToken.startingCurrentSetAmount.callAsync();
        const expectedstartingCurrentSetAmount = 0;

        expect(startingCurrentSetAmount).to.be.bignumber.equal(expectedstartingCurrentSetAmount);
      });

      it('clears the auctionParameters struct', async () => {
        await subject();

        const auctionParameters = await rebalancingSetToken.getAuctionPriceParameters.callAsync();
        const expectedAuctionParameters = [new BigNumber(0), new BigNumber(0), new BigNumber(0), new BigNumber(0)];

        expect(auctionParameters).to.deep.equal(expectedAuctionParameters);
      });

      it('clears the biddingParameters struct', async () => {
        await subject();

        const biddingParameters = await rebalancingSetToken.getBiddingParameters.callAsync();
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
        const combinedCurrentUnits = await rebalancingSetToken.getCombinedCurrentUnits.callAsync();
        const combinedNextSetUnits = await rebalancingSetToken.getCombinedNextSetUnits.callAsync();

        const expectedMinimumBid = 0;
        const expectedRemainingCurrentSets = 0;
        const expectedCombinedTokenArray = [];
        const expectedCombinedCurrentUnits = [];
        const expectedCombinedNextSetUnits = [];

        expect(biddingParameters[0]).to.be.bignumber.equal(expectedMinimumBid);
        expect(biddingParameters[1]).to.be.bignumber.equal(expectedRemainingCurrentSets);
        expect(combinedTokenArray).to.deep.equal(expectedCombinedTokenArray);
        expect(combinedCurrentUnits).to.deep.equal(expectedCombinedCurrentUnits);
        expect(combinedNextSetUnits).to.deep.equal(expectedCombinedNextSetUnits);
      });
    });

    describe('when settleRebalance is called and there are more than minimumBid amount of sets left', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe("when settleRebalance is called but issuable amount is less than nextSet's natural unit", async () => {
      before(async () => {
        setTokenNaturalUnits = [new BigNumber(10 ** 14), new BigNumber(10 ** 14)];
      });

      after(async () => {
        setTokenNaturalUnits = undefined;
      });

      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const newPrice = new BigNumber(8 * 10 ** 7);
        await constantAuctionPriceCurve.updatePrice.sendTransactionAsync(newPrice);

        const bidQuantity = rebalancingSetQuantityToIssue;
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settleRebalance is called but unitShares is 0', async () => {
      before(async () => {
        rebalancingSetUnitShares = new BigNumber(1);
        setTokenNaturalUnits = [new BigNumber(10 ** 14), new BigNumber(10 ** 14)];
        baseSetQuantityToIssue = new BigNumber(10 ** 27);
        rebalancingSetQuantityToIssue = new BigNumber(10 ** 27);
      });

      after(async () => {
        rebalancingSetUnitShares = undefined;
        setTokenNaturalUnits = undefined;
        baseSetQuantityToIssue = undefined;
        rebalancingSetQuantityToIssue = ether(7);
      });

      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const newPrice = new BigNumber(1001);
        await constantAuctionPriceCurve.updatePrice.sendTransactionAsync(newPrice);

        const bidQuantity = rebalancingSetQuantityToIssue.div(10 ** 10);
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settleRebalance is called from Drawdown State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

        const [bidQuantity] = await rebalancingSetToken.biddingParameters.callAsync();
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );

        await rebalancingHelper.endFailedRebalanceAsync(
          rebalancingSetToken
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#endFailedAuction', async () => {
    let subjectCaller: Address;

    let proposalPeriod: BigNumber;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;
    let rebalancingSetQuantityToIssue: BigNumber = ether(7);
    let setTokenNaturalUnits: BigNumber[];
    let baseSetQuantityToIssue: BigNumber;
    let rebalancingSetUnitShares: BigNumber;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        undefined || setTokenNaturalUnits,
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
        undefined || rebalancingSetUnitShares
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(
        currentSetToken.address,
        baseSetQuantityToIssue || ether(9),
        {from: deployerAccount}
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.endFailedAuction.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when endFailedAuction is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when endFailedAuction is called from Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToProposeAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when endFailedAuction is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      describe('and no bids have been placed', async () => {
        beforeEach(async () => {
          const defaultTimeToPivot = new BigNumber(100000);
          await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));
        });

        it('updates the rebalanceState to Default', async () => {
          await subject();

          const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
          expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
        });

        it('reissues the currentSet to the rebalancingSetToken', async () => {
          const existingBalance = await vault.balances.callAsync(
            currentSetToken.address,
            rebalancingSetToken.address
          );
          const startingCurrentSetAmount = await rebalancingSetToken.startingCurrentSetAmount.callAsync();

          await subject();

          const expectedBalance = existingBalance.add(startingCurrentSetAmount);
          const newBalance = await vault.balances.callAsync(currentSetToken.address, rebalancingSetToken.address);
          expect(newBalance).to.be.bignumber.equal(expectedBalance);
        });

        it('sets lastRebalanceTimestamp to block timestamp', async () => {
          const txHash = await subject();
          const txReceipt = await web3.eth.getTransactionReceipt(txHash);
          const blockData = await web3.eth.getBlock(txReceipt.blockHash);

          const newLastRebalanceTimestamp = await rebalancingSetToken.lastRebalanceTimestamp.callAsync();
          expect(newLastRebalanceTimestamp).to.be.bignumber.equal(blockData.timestamp);
        });

        it('clears the nextSet variable', async () => {
          await subject();

          const nextSet = await rebalancingSetToken.nextSet.callAsync();
          const expectedNextSet = 0;

          expect(nextSet).to.be.bignumber.equal(expectedNextSet);
        });

        it('clears the auctionLibrary variable', async () => {
          await subject();

          const auctionLibrary = await rebalancingSetToken.auctionLibrary.callAsync();
          const expectedAuctionLibrary = 0;

          expect(auctionLibrary).to.be.bignumber.equal(expectedAuctionLibrary);
        });

        it('clears the startingCurrentSetAmount variable', async () => {
          await subject();

          const startingCurrentSetAmount = await rebalancingSetToken.startingCurrentSetAmount.callAsync();
          const expectedstartingCurrentSetAmount = 0;

          expect(startingCurrentSetAmount).to.be.bignumber.equal(expectedstartingCurrentSetAmount);
        });

        it('clears the auctionParameters struct', async () => {
          await subject();

          const auctionParameters = await rebalancingSetToken.getAuctionPriceParameters.callAsync();
          const expectedAuctionParameters = [new BigNumber(0), new BigNumber(0), new BigNumber(0), new BigNumber(0)];

          expect(auctionParameters).to.deep.equal(expectedAuctionParameters);
        });

        it('clears the biddingParameters struct', async () => {
          await subject();

          const biddingParameters = await rebalancingSetToken.getBiddingParameters.callAsync();
          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
          const combinedCurrentUnits = await rebalancingSetToken.getCombinedCurrentUnits.callAsync();
          const combinedNextSetUnits = await rebalancingSetToken.getCombinedNextSetUnits.callAsync();

          const expectedMinimumBid = 0;
          const expectedRemainingCurrentSets = 0;
          const expectedCombinedTokenArray = [];
          const expectedCombinedCurrentUnits = [];
          const expectedCombinedNextSetUnits = [];

          expect(biddingParameters[0]).to.be.bignumber.equal(expectedMinimumBid);
          expect(biddingParameters[1]).to.be.bignumber.equal(expectedRemainingCurrentSets);
          expect(combinedTokenArray).to.deep.equal(expectedCombinedTokenArray);
          expect(combinedCurrentUnits).to.deep.equal(expectedCombinedCurrentUnits);
          expect(combinedNextSetUnits).to.deep.equal(expectedCombinedNextSetUnits);
        });
      });

      describe('and bids have been placed', async () => {
        beforeEach(async () => {
          const defaultTimeToPivot = new BigNumber(100000);
          await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

          const [bidQuantity] = await rebalancingSetToken.biddingParameters.callAsync();
          await rebalancingHelper.placeBidAsync(
            rebalanceAuctionModule,
            rebalancingSetToken.address,
            bidQuantity,
          );
        });

        it('updates the rebalanceState to Drawdown', async () => {
          await subject();

          const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
          expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DRAWDOWN);
        });

        it('clears the nextSet variable', async () => {
          await subject();

          const nextSet = await rebalancingSetToken.nextSet.callAsync();
          const expectedNextSet = 0;

          expect(nextSet).to.be.bignumber.equal(expectedNextSet);
        });

        it('clears the auctionLibrary variable', async () => {
          await subject();

          const auctionLibrary = await rebalancingSetToken.auctionLibrary.callAsync();
          const expectedAuctionLibrary = 0;

          expect(auctionLibrary).to.be.bignumber.equal(expectedAuctionLibrary);
        });

        it('clears the startingCurrentSetAmount variable', async () => {
          await subject();

          const startingCurrentSetAmount = await rebalancingSetToken.startingCurrentSetAmount.callAsync();
          const expectedstartingCurrentSetAmount = 0;

          expect(startingCurrentSetAmount).to.be.bignumber.equal(expectedstartingCurrentSetAmount);
        });

        it('clears the auctionParameters struct', async () => {
          await subject();

          const auctionParameters = await rebalancingSetToken.getAuctionPriceParameters.callAsync();
          const expectedAuctionParameters = [new BigNumber(0), new BigNumber(0), new BigNumber(0), new BigNumber(0)];

          expect(auctionParameters).to.deep.equal(expectedAuctionParameters);
        });

        it('clears the biddingParameters struct', async () => {
          await subject();

          const biddingParameters = await rebalancingSetToken.getBiddingParameters.callAsync();
          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
          const combinedCurrentUnits = await rebalancingSetToken.getCombinedCurrentUnits.callAsync();
          const combinedNextSetUnits = await rebalancingSetToken.getCombinedNextSetUnits.callAsync();

          const expectedMinimumBid = 0;
          const expectedRemainingCurrentSets = 0;
          const expectedCombinedTokenArray = [];
          const expectedCombinedCurrentUnits = [];
          const expectedCombinedNextSetUnits = [];

          expect(biddingParameters[0]).to.be.bignumber.equal(expectedMinimumBid);
          expect(biddingParameters[1]).to.be.bignumber.equal(expectedRemainingCurrentSets);
          expect(combinedTokenArray).to.deep.equal(expectedCombinedTokenArray);
          expect(combinedCurrentUnits).to.deep.equal(expectedCombinedCurrentUnits);
          expect(combinedNextSetUnits).to.deep.equal(expectedCombinedNextSetUnits);
        });

        it('moves combinedTokenArray to failedAuctionWithdrawComponents', async () => {
          const expectedWithdrawComponents = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          await subject();

          const withdrawComponents = await rebalancingSetToken.getFailedAuctionWithdrawComponents.callAsync();

          expect(withdrawComponents).to.deep.equal(expectedWithdrawComponents);
        });
      });

      describe('and issueAmount is insufficient', async () => {
        before(async () => {
          setTokenNaturalUnits = [new BigNumber(10 ** 14), new BigNumber(10 ** 14)];
        });

        after(async () => {
          setTokenNaturalUnits = undefined;
        });

        beforeEach(async () => {
          const newPrice = new BigNumber(8 * 10 ** 7);
          await constantAuctionPriceCurve.updatePrice.sendTransactionAsync(newPrice);

          const bidQuantity = rebalancingSetQuantityToIssue;
          await rebalancingHelper.placeBidAsync(
            rebalanceAuctionModule,
            rebalancingSetToken.address,
            bidQuantity,
          );

          const defaultTimeToPivot = new BigNumber(100000);
          await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));
        });

        it('updates the rebalanceState to Drawdown', async () => {
          await subject();

          const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
          expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DRAWDOWN);
        });
      });

      describe('but unitShares is 0', async () => {
        before(async () => {
          rebalancingSetUnitShares = new BigNumber(1);
          setTokenNaturalUnits = [new BigNumber(10 ** 14), new BigNumber(10 ** 14)];
          rebalancingSetQuantityToIssue = new BigNumber(10 ** 27);
          baseSetQuantityToIssue = new BigNumber(10 ** 27);
        });

        after(async () => {
          rebalancingSetUnitShares = undefined;
          setTokenNaturalUnits = undefined;
          rebalancingSetQuantityToIssue = ether(7);
          baseSetQuantityToIssue = undefined;
        });

        beforeEach(async () => {
          const newPrice = new BigNumber(1001);
          await constantAuctionPriceCurve.updatePrice.sendTransactionAsync(newPrice);

          const bidQuantity = rebalancingSetQuantityToIssue.div(10 ** 10);
          await rebalancingHelper.placeBidAsync(
            rebalanceAuctionModule,
            rebalancingSetToken.address,
            bidQuantity,
          );

          const defaultTimeToPivot = new BigNumber(100000);
          await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));
        });

        it('updates the rebalanceState to Drawdown', async () => {
          await subject();

          const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
          expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DRAWDOWN);
        });
      });

      describe('when pivot point has not been reached', async () => {
        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when auction could be settled', async () => {
        beforeEach(async () => {
          const defaultTimeToPivot = new BigNumber(100000);
          await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

          const bidQuantity = rebalancingSetQuantityToIssue;
          await rebalancingHelper.placeBidAsync(
            rebalanceAuctionModule,
            rebalancingSetToken.address,
            bidQuantity,
          );
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });
});
