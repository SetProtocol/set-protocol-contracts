import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '../../utils/chaiSetup';
import { BigNumberSetup } from '../../utils/bigNumberSetup';
import {
  CoreMockContract,
  SetTokenContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '../../utils/contracts';
import { Blockchain } from '../../utils/blockchain';
import { ether } from '../../utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_UNIT_SHARES,
} from '../../utils/constants';
import {
  getExpectedTransferLog,
  getExpectedNewManagerAddedLog,
  getExpectedRebalanceProposedLog,
  getExpectedRebalanceStartedLog,
} from '../../utils/contract_logs/rebalancingSetToken';
import { expectRevertError, assertTokenBalance } from '../../utils/tokenAssertions';
import { CoreWrapper } from '../../utils/coreWrapper';
import { ERC20Wrapper } from '../../utils/erc20Wrapper';
import { RebalancingTokenWrapper } from '../../utils/RebalancingTokenWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('RebalancingSetToken', accounts => {
  const [
    deployerAccount,
    coreAccount,
    managerAccount,
    factoryAccount,
    libraryAccount,
    otherAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;
  let components: StandardTokenMockContract[] = [];

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const blockchain = new Blockchain(web3);
  const rebalancingTokenWrapper = new RebalancingTokenWrapper(
    deployerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  before(async () => {
    await blockchain.saveSnapshotAsync();
    ABIDecoder.addABI(CoreMock.abi);
    ABIDecoder.addABI(RebalancingSetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalancingSetToken.abi);
    await blockchain.revertAsync();
  });

  beforeEach(async () => {
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    coreMock = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    factory = await coreWrapper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(coreMock.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreWrapper.enableFactoryAsync(coreMock, rebalancingFactory);
  });

  describe('#constructor', async () => {
    let subjectFactory: Address;
    let subjectManager: Address;
    let subjectInitialSet: Address;
    let subjectInitialUnitShares: BigNumber;
    let subjectProposalPeriod: BigNumber;
    let subjectRebalanceInterval: BigNumber;
    const subjectName: string = 'Rebalancing Set';
    const subjectSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      subjectFactory = factoryAccount;
      subjectManager = managerAccount;
      subjectInitialSet = components[0].address,
      subjectInitialUnitShares = DEFAULT_UNIT_SHARES;
      subjectProposalPeriod = ONE_DAY_IN_SECONDS;
      subjectRebalanceInterval = ONE_DAY_IN_SECONDS;
    });

    async function subject(): Promise<RebalancingSetTokenContract> {
      return coreWrapper.deployRebalancingSetTokenAsync(
        subjectFactory,
        subjectManager,
        subjectInitialSet,
        subjectInitialUnitShares,
        subjectProposalPeriod,
        subjectRebalanceInterval,
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

      rebalancingSetToken = await coreWrapper.deployRebalancingSetTokenAsync(
        factoryAccount,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
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

      rebalancingSetToken = await coreWrapper.deployRebalancingSetTokenAsync(
        factoryAccount,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
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

  describe('#mint: Called on Rebalancing Token', async () => {
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      const naturalUnit: BigNumber = ether(2);
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      const currentComponentAddresses = _.map(components, token => token.address);
      const currentComponentUnits = _.map(components, () => naturalUnit.mul(2)); // Multiple of naturalUnit
      const currentSetToken = await coreWrapper.createSetTokenAsync(
        coreMock,
        factory.address,
        currentComponentAddresses,
        currentComponentUnits,
        naturalUnit,
      );

      const manager = managerAccount;
      const initialSet = currentSetToken.address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      const rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(coreAccount);
      await coreWrapper.enableFactoryAsync(coreMock, rebalancingFactory);

      rebalancingSetToken = await coreWrapper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
      );

      subjectIssuer = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = coreAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.mint.sendTransactionAsync(
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingSetToken.balanceOf.callAsync(subjectIssuer);

      await subject();

      const expectedNewBalance = existingBalance.add(subjectQuantity);
      assertTokenBalance(rebalancingSetToken, expectedNewBalance, subjectIssuer);
    });

    describe('when the caller is not Core', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#mint: Called from CoreMock', async () => {
    let rebalancingSetToken: RebalancingSetTokenContract;
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let newRebalancingSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address
      );
      const currentSetToken = setTokens[0];
      newRebalancingSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
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
      assertTokenBalance(rebalancingSetToken, expectedNewBalance, subjectIssuer);
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
        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          newRebalancingSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#burn: Called on Rebalancing Token', async () => {
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      const naturalUnit: BigNumber = ether(2);
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address);

      const currentComponentAddresses = _.map(components, token => token.address);
      const currentComponentUnits = _.map(components, () => naturalUnit.mul(2)); // Multiple of naturalUnit
      const currentSetToken = await coreWrapper.createSetTokenAsync(
        coreMock,
        factory.address,
        currentComponentAddresses,
        currentComponentUnits,
        naturalUnit,
      );

      const manager = managerAccount;
      const initialSet = currentSetToken.address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      const rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(coreAccount);
      await coreWrapper.enableFactoryAsync(coreMock, rebalancingFactory);

      rebalancingSetToken = await coreWrapper.deployRebalancingSetTokenAsync(
        rebalancingFactory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
      );

      subjectIssuer = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = coreAccount;

      return rebalancingSetToken.mint.sendTransactionAsync(
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.burn.sendTransactionAsync(
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingSetToken.balanceOf.callAsync(subjectIssuer);

      await subject();

      const expectedNewBalance = existingBalance.sub(subjectQuantity);
      assertTokenBalance(rebalancingSetToken, expectedNewBalance, subjectIssuer);
    });

    describe('when the caller is not Core', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#burn: Called from CoreMock', async () => {
    let rebalancingSetToken: RebalancingSetTokenContract;
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let newRebalancingSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address
      );
      const currentSetToken = setTokens[0];
      newRebalancingSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
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

      await coreMock.mint.sendTransactionAsync(
        rebalancingSetToken.address,
        subjectBurner,
        mintedQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
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
      assertTokenBalance(rebalancingSetToken, expectedNewBalance, subjectBurner);
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
        // Must burn otherwise won't get through rebalance call
        // TO DO: Instead of mint call issue in set up.
        coreMock.burn.sendTransactionAsync(
          rebalancingSetToken.address,
          subjectBurner,
          subjectQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS}
        );

        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          newRebalancingSetToken.address,
          libraryAccount,
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

      rebalancingSetToken = await coreWrapper.deployRebalancingSetTokenAsync(
        factoryAccount,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
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

  describe('#transfer', async () => {
    let subjectCaller: Address;
    let subjectTokenReceiver: Address;
    let subjectQuantityToTransfer: BigNumber;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync(coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await coreWrapper.deployRebalancingSetTokenAsync(
        factory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
      );

      const mintedQuantity = ether(5);
      subjectCaller = deployerAccount;
      subjectTokenReceiver = otherAccount;
      subjectQuantityToTransfer = ether(3);

      await rebalancingSetToken.mint.sendTransactionAsync(
        subjectCaller,
        mintedQuantity,
        { from: coreAccount },
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.transfer.sendTransactionAsync(
        subjectTokenReceiver,
        subjectQuantityToTransfer,
        { from: subjectCaller },
      );
    }

    it('transfers the tokens to the right receiver', async () => {
      const existingReceiverBalance = await rebalancingSetToken.balanceOf.callAsync(subjectTokenReceiver);

      await subject();

      const newReceiverBalance = await rebalancingSetToken.balanceOf.callAsync(subjectTokenReceiver);
      const expectedReceiverBalance = existingReceiverBalance.add(subjectQuantityToTransfer);
      expect(newReceiverBalance).to.be.bignumber.equal(expectedReceiverBalance);
    });

    describe('when the destination is null address', async () => {
      beforeEach(async () => {
        subjectTokenReceiver = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the destination is set token address', async () => {
      beforeEach(async () => {
        subjectTokenReceiver = rebalancingSetToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#transferFrom', async () => {
    let subjectCaller: Address;
    let subjectTokenReceiver: Address;
    let subjectTokenSender: Address;
    let subjectQuantityToTransfer: BigNumber;

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync(coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await coreWrapper.deployRebalancingSetTokenAsync(
        factory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
      );

      const mintedQuantity = ether(5);
      subjectCaller = deployerAccount;
      subjectTokenSender = deployerAccount;
      subjectTokenReceiver = otherAccount;
      subjectQuantityToTransfer = ether(3);

      await rebalancingSetToken.mint.sendTransactionAsync(
        subjectCaller,
        mintedQuantity,
        { from: coreAccount },
      );

      await erc20Wrapper.approveTransferAsync(rebalancingSetToken, subjectCaller, subjectCaller);
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.transferFrom.sendTransactionAsync(
        subjectTokenSender,
        subjectTokenReceiver,
        subjectQuantityToTransfer,
        { from: subjectCaller },
      );
    }

    it('transfers the tokens to the right receiver', async () => {
      const existingReceiverBalance = await rebalancingSetToken.balanceOf.callAsync(subjectTokenReceiver);

      await subject();

      const newReceiverBalance = await rebalancingSetToken.balanceOf.callAsync(subjectTokenReceiver);
      const expectedReceiverBalance = existingReceiverBalance.add(subjectQuantityToTransfer);
      expect(newReceiverBalance).to.be.bignumber.equal(expectedReceiverBalance);
    });

    describe('when the destination is null address', async () => {
      beforeEach(async () => {
        subjectTokenReceiver = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the destination is set token address', async () => {
      beforeEach(async () => {
        subjectTokenReceiver = rebalancingSetToken.address;
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
    let newRebalancingSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address
      );
      currentSetToken = setTokens[0];
      newRebalancingSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      subjectRebalancingToken = newRebalancingSetToken.address;
      subjectAuctionLibrary = libraryAccount;
      subjectCurveCoefficient = ether(1);
      subjectAuctionStartPrice = ether(5);
      subjectAuctionPriceDivisor = ether(10);
      subjectCaller = managerAccount;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);
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

        const newRebalacingSet = await rebalancingSetToken.rebalancingSet.callAsync();
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

      it('creates the correct combinedTokenArray', async () => {
        const oldSet = await currentSetToken.getComponents.callAsync();
        const newSet = await newRebalancingSetToken.getComponents.callAsync();

        await subject();

        const expectedCombinedTokenArray = _.union(oldSet, newSet);
        expectedCombinedTokenArray.forEach(async (expectAddress, index) => {
          const actualAddress = await rebalancingSetToken.combinedTokenArray.callAsync(new BigNumber(index));
          expect(actualAddress).to.be.bignumber.equal(expectAddress);
        });
      });

      it('creates the correct combinedCurrentUnits', async () => {
        await subject();

        const expectedCombinedCurrentUnits = await rebalancingTokenWrapper.constructCombinedUnitArrayAsync(
          rebalancingSetToken,
          currentSetToken
        );
        const actualCombinedCurrentUnits = await rebalancingSetToken.getCombinedCurrentUnits.callAsync();
        expect(JSON.stringify(actualCombinedCurrentUnits)).to.eql(JSON.stringify(expectedCombinedCurrentUnits));
      });

      it('creates the correct combinedRebalanceUnits', async () => {
        await subject();

        const expectedCombinedRebalanceUnits = await rebalancingTokenWrapper.constructCombinedUnitArrayAsync(
          rebalancingSetToken,
          newRebalancingSetToken
        );
        const actualCombinedRebalanceUnits = await rebalancingSetToken.getCombinedRebalanceUnits.callAsync();
        expect(JSON.stringify(actualCombinedRebalanceUnits)).to.eql(JSON.stringify(expectedCombinedRebalanceUnits));
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
    });

    describe('when propose is called from Proposal state', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToProposeAsync(
          rebalancingSetToken,
          newRebalancingSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when propose is called from Rebalance state', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          newRebalancingSetToken.address,
          libraryAccount,
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

    let currentSetToken: SetTokenContract;
    let newRebalancingSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address
      );
      currentSetToken = setTokens[0];
      newRebalancingSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

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
        await rebalancingTokenWrapper.defaultTransitionToProposeAsync(
          rebalancingSetToken,
          newRebalancingSetToken.address,
          libraryAccount,
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
          newRebalancingSetToken.address,
          rebalancingSetToken.address,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
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
        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          newRebalancingSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#settlement', async () => {
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let newRebalancingSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address
      );
      const currentSetToken = setTokens[0];
      newRebalancingSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.settlement.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when settlement is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settlement is called from Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToProposeAsync(
          rebalancingSetToken,
          newRebalancingSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settlement is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          newRebalancingSetToken.address,
          libraryAccount,
          managerAccount
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
        expect(newCurrentSet).to.equal(newRebalancingSetToken.address);
      });
    });
  });
});
