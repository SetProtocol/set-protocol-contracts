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
  ConstantAuctionPriceCurveContract,
  SetTokenContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenFactoryContract,
  SignatureValidatorContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import { DEFAULT_GAS, ONE_DAY_IN_SECONDS, DEFAULT_UNIT_SHARES, ZERO, DEFAULT_AUCTION_PRICE } from '@utils/constants';
import {
  getExpectedTransferLog,
  getExpectedNewManagerAddedLog,
  getExpectedRebalanceProposedLog,
  getExpectedRebalanceStartedLog,
} from '@utils/contract_logs/rebalancingSetToken';
import { expectRevertError, assertTokenBalanceAsync } from '@utils/tokenAssertions';
import { CoreWrapper } from '@utils/coreWrapper';
import { ERC20Wrapper } from '@utils/erc20Wrapper';
import { RebalancingWrapper } from '@utils/rebalancingWrapper';
import { getWeb3 } from '@utils/web3Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('RebalancingSetToken', accounts => {
  const [
    deployerAccount,
    coreAccount,
    managerAccount,
    otherAccount,
    fakeTokenAccount,
    protocolAccount,
    invalidAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;
  let components: StandardTokenMockContract[] = [];

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let signatureValidator: SignatureValidatorContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
  let constantAuctionPriceCurve: ConstantAuctionPriceCurveContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const rebalancingWrapper = new RebalancingWrapper(
    deployerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
    ABIDecoder.addABI(RebalancingSetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalancingSetToken.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    signatureValidator = await coreWrapper.deploySignatureValidatorAsync();
    coreMock = await coreWrapper.deployCoreMockAsync(transferProxy, vault, signatureValidator);
    factory = await coreWrapper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(coreMock.address);
    constantAuctionPriceCurve = await rebalancingWrapper.deployConstantAuctionPriceCurveAsync(DEFAULT_AUCTION_PRICE);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreWrapper.registerFactoryAsync(coreMock, rebalancingFactory, true);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectFactory: Address;
    let subjectManager: Address;
    let subjectInitialSet: Address;
    let subjectInitialUnitShares: BigNumber;
    let subjectProposalPeriod: BigNumber;
    let subjectRebalanceInterval: BigNumber;
    let subjectEntranceFee: BigNumber;
    let subjectRebalanceFee: BigNumber;
    const subjectName: string = 'Rebalancing Set';
    const subjectSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      subjectFactory = rebalancingFactory.address;
      subjectManager = managerAccount;
      subjectInitialSet = components[0].address,
      subjectInitialUnitShares = DEFAULT_UNIT_SHARES;
      subjectProposalPeriod = ONE_DAY_IN_SECONDS;
      subjectRebalanceInterval = ONE_DAY_IN_SECONDS;
      subjectEntranceFee = new BigNumber(10000);
      subjectRebalanceFee = new BigNumber(25000);
    });

    async function subject(): Promise<RebalancingSetTokenContract> {
      return rebalancingWrapper.deployRebalancingSetTokenAsync(
        subjectFactory,
        subjectManager,
        subjectInitialSet,
        subjectInitialUnitShares,
        subjectProposalPeriod,
        subjectRebalanceInterval,
        subjectEntranceFee,
        subjectRebalanceFee,
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

    it ('creates a set with the correct entrance fee', async () => {
      rebalancingSetToken = await subject();

      const entranceFee = await rebalancingSetToken.entranceFee.callAsync();
      expect(entranceFee).to.be.bignumber.equal(subjectEntranceFee);
    });

    it ('creates a set with the correct rebalance fee', async () => {
      rebalancingSetToken = await subject();

      const rebalanceFee = await rebalancingSetToken.rebalanceFee.callAsync();
      expect(rebalanceFee).to.be.bignumber.equal(subjectRebalanceFee);
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
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      initialSet = components[0].address;
      const manager = managerAccount;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const entranceFee = ZERO;
      const rebalanceFee = ZERO;

      rebalancingSetToken = await rebalancingWrapper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        entranceFee,
        rebalanceFee,
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
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const entranceFee = ZERO;
      const rebalanceFee = ZERO;

      rebalancingSetToken = await rebalancingWrapper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        entranceFee,
        rebalanceFee,
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
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const entranceFee = ZERO;
      const rebalanceFee = ZERO;

      rebalancingSetToken = await rebalancingWrapper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        entranceFee,
        rebalanceFee,
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
      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );
      const currentSetToken = setTokens[0];

      const manager = managerAccount;
      const initialSet = currentSetToken.address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const entranceFee = ZERO;
      const rebalanceFee = ZERO;

      const rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(coreAccount);
      await coreWrapper.registerFactoryAsync(coreMock, rebalancingFactory, true);

      rebalancingSetToken = await rebalancingWrapper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        entranceFee,
        rebalanceFee,
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
    let rebalancingSetToken: RebalancingSetTokenContract;
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let entranceFee: BigNumber = new BigNumber(10);
    let protocolFeeBasisPoints: BigNumber;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );
      const currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
        entranceFee,
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

      const feeAmount = subjectQuantity.mul(entranceFee).div(10000).round(0, 3);
      const expectedNewBalance = existingBalance.add(subjectQuantity.sub(feeAmount));
      await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, subjectIssuer);
    });

    it('updates the balances of the manager correctly', async () => {
      const existingBalance = await rebalancingSetToken.balanceOf.callAsync(managerAccount);

      await subject();

      const feeAmount = subjectQuantity.mul(entranceFee).div(10000).round(0, 3);
      const expectedNewBalance = existingBalance.add(feeAmount);
      await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, managerAccount);
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

        const feeAmount = subjectQuantity.mul(entranceFee).div(10000).round(0, 3);
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          NULL_ADDRESS,
          subjectIssuer,
          subjectQuantity.sub(feeAmount),
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when mint is called and protocol fee is applied', async () => {
      beforeEach(async () => {
        protocolFeeBasisPoints = new BigNumber(100);
        await rebalancingWrapper.setProtocolAddressAndFees(coreMock, protocolAccount, protocolFeeBasisPoints);
      });

      it('updates the balances of the user correctly', async () => {
        const existingBalance = await rebalancingSetToken.balanceOf.callAsync(subjectIssuer);

        await subject();

        const feeAmount = subjectQuantity.mul(entranceFee).div(10000).round(0, 3);
        const expectedNewBalance = existingBalance.add(subjectQuantity.sub(feeAmount));
        await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, subjectIssuer);
      });

      it('updates the balances of the manager correctly', async () => {
        const existingBalance = await rebalancingSetToken.balanceOf.callAsync(managerAccount);

        await subject();

        const totalFeeAmount = subjectQuantity.mul(entranceFee).div(10000).round(0, 3);
        const protocolFeeAmount = totalFeeAmount.mul(protocolFeeBasisPoints).div(10000).round(0, 3);
        const expectedNewBalance = existingBalance.add(totalFeeAmount.sub(protocolFeeAmount));
        await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, managerAccount);
      });

      it('updates the balances of the protocol correctly', async () => {
        const existingBalance = await rebalancingSetToken.balanceOf.callAsync(protocolAccount);

        await subject();

        const totalFeeAmount = subjectQuantity.mul(entranceFee).div(10000).round(0, 3);
        const protocolFeeAmount = totalFeeAmount.mul(protocolFeeBasisPoints).div(10000).round(0, 3);
        const expectedNewBalance = existingBalance.add(protocolFeeAmount);
        await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, protocolAccount);
      });

      it('updates the totalSupply_ correctly', async () => {
        const existingTokenSupply = await rebalancingSetToken.totalSupply.callAsync();

        await subject();

        const expectedTokenSupply = existingTokenSupply.add(subjectQuantity);
        const newTokenSupply = await rebalancingSetToken.totalSupply.callAsync();
        expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
      });
    });

    describe('when mint is called and no fees are applied', async () => {
      before(async () => {
        entranceFee = ZERO;
      });

      after(async () => {
        entranceFee = new BigNumber(10);
      });

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
    });

    describe('when mint is called and no fees are applied but protocol fee is active', async () => {
      before(async () => {
        entranceFee = ZERO;
      });

      beforeEach(async () => {
        protocolFeeBasisPoints = new BigNumber(100);
        await rebalancingWrapper.setProtocolAddressAndFees(coreMock, protocolAccount, protocolFeeBasisPoints);
      });

      after(async () => {
        entranceFee = new BigNumber(10);
      });

      it('updates the balances of the user correctly', async () => {
        const existingBalance = await rebalancingSetToken.balanceOf.callAsync(subjectIssuer);

        await subject();

        const expectedNewBalance = existingBalance.add(subjectQuantity);
        await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, subjectIssuer);
      });

      it('no fees are added to protocol account', async () => {
        const existingBalance = await rebalancingSetToken.balanceOf.callAsync(protocolAccount);

        await subject();

        const expectedNewBalance = existingBalance.add(ZERO);
        await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, protocolAccount);
      });

      it('updates the totalSupply_ correctly', async () => {
        const existingTokenSupply = await rebalancingSetToken.totalSupply.callAsync();

        await subject();

        const expectedTokenSupply = existingTokenSupply.add(subjectQuantity);
        const newTokenSupply = await rebalancingSetToken.totalSupply.callAsync();
        expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
      });
    });

    describe('when mint is called from Rebalance state', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
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
      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
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
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);

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

  describe('#burn: Called from CoreMock', async () => {
    let rebalancingSetToken: RebalancingSetTokenContract;
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
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
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);

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
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
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
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const entranceFee = ZERO;
      const rebalanceFee = ZERO;

      rebalancingSetToken = await rebalancingWrapper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        entranceFee,
        rebalanceFee,
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

  describe('#propose', async () => {
    let subjectRebalancingToken: Address;
    let subjectAuctionLibrary: Address;
    let subjectCurveCoefficient: BigNumber;
    let subjectAuctionStartPrice: BigNumber;
    let subjectAuctionPriceDivisor: BigNumber;
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
      setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        naturalUnits || undefined
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];
      reproposeRebalancingSetToken = setTokens[2];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      subjectRebalancingToken = nextSetToken.address;
      subjectAuctionLibrary = constantAuctionPriceCurve.address;
      subjectCurveCoefficient = ether(1);
      subjectAuctionStartPrice = ether(5);
      subjectAuctionPriceDivisor = ether(10);
      subjectCaller = managerAccount;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);

      await rebalancingWrapper.registerPriceLibraryAsync(
        coreMock,
        constantAuctionPriceCurve,
        true,
      );
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSetToken.propose.sendTransactionAsync(
        subjectRebalancingToken,
        subjectAuctionLibrary,
        subjectCurveCoefficient,
        subjectAuctionStartPrice,
        subjectAuctionPriceDivisor,
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

      it('updates the curve coefficient correctly', async () => {
        await subject();

        const newCurveCoefficient = await rebalancingSetToken.curveCoefficient.callAsync();
        expect(newCurveCoefficient).to.be.bignumber.equal(subjectCurveCoefficient);
      });

      it('updates the auction start price correctly', async () => {
        await subject();

        const newAuctionStartPrice = await rebalancingSetToken.auctionStartPrice.callAsync();
        expect(newAuctionStartPrice).to.be.bignumber.equal(subjectAuctionStartPrice);
      });

      it('updates the auction price divisor correctly', async () => {
        await subject();

        const newAuctionPriceDivisor = await rebalancingSetToken.auctionPriceDivisor.callAsync();
        expect(newAuctionPriceDivisor).to.be.bignumber.equal(subjectAuctionPriceDivisor);
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

      describe('but the rebalance interval has not elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = ONE_DAY_IN_SECONDS.sub(10);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but not by the token manager', async () => {
        beforeEach(async () => {
          subjectCaller = otherAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but the auction library is not approved by Core', async () => {
        beforeEach(async () => {
          subjectAuctionLibrary = invalidAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but the auction library is 0', async () => {
        beforeEach(async () => {
          subjectAuctionPriceDivisor = ZERO;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but the curve coefficient is 0', async () => {
        beforeEach(async () => {
          subjectCurveCoefficient = ZERO;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but the proposed nextSet is not approved by Core', async () => {
        beforeEach(async () => {
          subjectRebalancingToken = fakeTokenAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe("but the new proposed set's natural unit is not a multiple of the current set", async () => {
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
        await rebalancingWrapper.defaultTransitionToProposeAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
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
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#rebalance', async () => {
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;
    let proposalPeriod: BigNumber;
    let initialUnitShares: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetQuantityToIssue: BigNumber;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokenNaturalUnits = [ether(.07), ether(.007)];
      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        setTokenNaturalUnits,
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
        undefined, // Entrance Fee
        undefined, // Rebalance Fee
        initialUnitShares || undefined
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(7), {from: deployerAccount});
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(.7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      subjectCaller = managerAccount;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSetToken.rebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when rebalance is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when rebalance is called from Propose State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToProposeAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
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
            const actualAddress = await rebalancingSetToken.combinedTokenArray.callAsync(new BigNumber(index));
            expect(actualAddress).to.be.bignumber.equal(expectAddress);
          })
        );
      });

      it('creates the correct combinedCurrentUnits', async () => {
        await subject();

        const expectedCombinedCurrentUnits = await rebalancingWrapper.constructCombinedUnitArrayAsync(
          rebalancingSetToken,
          currentSetToken,
          nextSetToken
        );
        const actualCombinedCurrentUnits = await rebalancingSetToken.getCombinedCurrentUnits.callAsync();
        expect(JSON.stringify(actualCombinedCurrentUnits)).to.eql(JSON.stringify(expectedCombinedCurrentUnits));
      });

      it('creates the correct combinedRebalanceUnits', async () => {
        await subject();

        const expectedCombinedRebalanceUnits = await rebalancingWrapper.constructCombinedUnitArrayAsync(
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
        const actualRemainingCurrentSets = await rebalancingSetToken.remainingCurrentSets.callAsync();
        expect(actualRemainingCurrentSets).to.be.bignumber.equal(expectedRemainingCurrentSets);
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

        const redeemableCurrentSetTokens = await rebalancingSetToken.remainingCurrentSets.callAsync();
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
        before(async () => {
          initialUnitShares = new BigNumber(1.2).mul(new BigNumber(10 ** 9));
        });

        after(async () => {
          initialUnitShares = undefined;
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

      describe('but not enough time has passed before proposal period has elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = ONE_DAY_IN_SECONDS.sub(10);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when rebalance is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
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
    let entranceFee: BigNumber;
    let rebalanceFee: BigNumber;

    let nextSetToken: SetTokenContract;
    let rebalancingSetQuantityToIssue: BigNumber;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );
      const currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      entranceFee = ZERO;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
        entranceFee || new BigNumber(10),
        rebalanceFee,
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

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
        await rebalancingWrapper.defaultTransitionToProposeAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
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
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        await coreMock.bid.sendTransactionAsync(
          rebalancingSetToken.address,
          rebalancingSetQuantityToIssue
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
        const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const expectedBalance = existingBalance.add(settlementAmounts['issueAmount']).sub(
          settlementAmounts['totalFees']
         );
        const newBalance = await vault.balances.callAsync(nextSetToken.address, rebalancingSetToken.address);
        expect(newBalance).to.be.bignumber.equal(expectedBalance);
      });

      it('decrements component balance for the rebalancingSetToken by the correct amount', async () => {
        const componentAddresses = await nextSetToken.getComponents.callAsync();
        const setNaturalUnit = await nextSetToken.naturalUnit.callAsync();
        const setComponentUnits = await nextSetToken.getUnits.callAsync();

        const existingVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          componentAddresses,
          vault,
          rebalancingSetToken.address
        );

        const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
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

        const newVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          componentAddresses,
          vault,
          rebalancingSetToken.address
        );
        expect(JSON.stringify(newVaultBalances)).to.equal(JSON.stringify(expectedVaultBalances));
      });

      it('updates the unitShares amount correctly', async () => {
        const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(settlementAmounts['unitShares']);
      });

      it('transfers the correct fee amount to manager (protocol fees not turned on)', async () => {
        const managerExistingBalance = await nextSetToken.balanceOf.callAsync(managerAccount);
        const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        await assertTokenBalanceAsync(
          nextSetToken,
          managerExistingBalance.add(settlementAmounts['totalFees']),
          managerAccount
        );
      });

      describe('when settleRebalance is called and protocol fees have been turned on', async () => {
        let protocolFeeBasisPoints: BigNumber;

        beforeEach(async () => {
          protocolFeeBasisPoints = new BigNumber(100);
          await rebalancingWrapper.setProtocolAddressAndFees(coreMock, protocolAccount, protocolFeeBasisPoints);
        });

        it('transfers the correct fee amount to the manager and the protocol account address', async () => {
          const managerExistingBalance = await nextSetToken.balanceOf.callAsync(managerAccount);
          const protocolExistingBalance = await nextSetToken.balanceOf.callAsync(protocolAccount);
          const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
            coreMock,
            rebalancingSetToken,
            nextSetToken,
            vault
          );

          const feeAmounts = rebalancingWrapper.separateProtocolAndManagerFees(
            settlementAmounts['totalFees'],
            protocolFeeBasisPoints,
          );

          await subject();

          await assertTokenBalanceAsync(
            nextSetToken,
            managerExistingBalance.add(feeAmounts['managerAmount']),
            managerAccount
          );
          await assertTokenBalanceAsync(
            nextSetToken,
            protocolExistingBalance.add(feeAmounts['protocolAmount']),
            protocolAccount
          );
        });
      });

      describe('when settleRebalance is called and there is no manager fee', async () => {
        before(async () => {
          rebalanceFee = ZERO;
        });

        after(async () => {
          rebalanceFee = undefined;
        });

        it('issues the nextSet to the rebalancingSetToken', async () => {
          const existingBalance = await vault.balances.callAsync(
            nextSetToken.address,
            rebalancingSetToken.address
          );
          const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
            coreMock,
            rebalancingSetToken,
            nextSetToken,
            vault
          );

          await subject();

          const expectedBalance = existingBalance.add(settlementAmounts['issueAmount']);
          const newBalance = await vault.balances.callAsync(nextSetToken.address, rebalancingSetToken.address);

          expect(settlementAmounts['totalFees']).to.be.bignumber.equal(ZERO);
          expect(newBalance).to.be.bignumber.equal(expectedBalance);
        });

        it('updates the unitShares amount correctly', async () => {
          const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
            coreMock,
            rebalancingSetToken,
            nextSetToken,
            vault
          );

          await subject();

          const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
          expect(newUnitShares).to.be.bignumber.equal(settlementAmounts['unitShares']);
        });
      });

      describe('when settleRebalance is called and there is no manager fee but protocol fee is active', async () => {
        let protocolFeeBasisPoints: BigNumber;

        before(async () => {
          rebalanceFee = ZERO;
        });

      beforeEach(async () => {
        protocolFeeBasisPoints = new BigNumber(100);
        await rebalancingWrapper.setProtocolAddressAndFees(coreMock, protocolAccount, protocolFeeBasisPoints);
      });

        after(async () => {
          rebalanceFee = undefined;
        });

        it('issues the nextSet to the rebalancingSetToken', async () => {
          const existingBalance = await vault.balances.callAsync(
            nextSetToken.address,
            rebalancingSetToken.address
          );
          const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
            coreMock,
            rebalancingSetToken,
            nextSetToken,
            vault
          );

          await subject();

          const expectedBalance = existingBalance.add(settlementAmounts['issueAmount']);
          const newBalance = await vault.balances.callAsync(nextSetToken.address, rebalancingSetToken.address);

          expect(settlementAmounts['totalFees']).to.be.bignumber.equal(ZERO);
          expect(newBalance).to.be.bignumber.equal(expectedBalance);
        });

        it('no sets sent to protocol', async () => {
          const existingBalance = await vault.balances.callAsync(
            nextSetToken.address,
            protocolAccount
          );

          await subject();

          const newBalance = await vault.balances.callAsync(nextSetToken.address, protocolAccount);

          expect(newBalance).to.be.bignumber.equal(existingBalance);
        });

        it('updates the unitShares amount correctly', async () => {
          const settlementAmounts = await rebalancingWrapper.getExpectedUnitSharesAndIssueAmount(
            coreMock,
            rebalancingSetToken,
            nextSetToken,
            vault
          );

          await subject();

          const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
          expect(newUnitShares).to.be.bignumber.equal(settlementAmounts['unitShares']);
        });
      });
    });

    describe('when settleRebalance is called and there are more than minimumBid amount of sets left', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
