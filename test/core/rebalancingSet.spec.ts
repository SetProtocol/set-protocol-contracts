import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '../../utils/chaiSetup';
import { BigNumberSetup } from '../../utils/bigNumberSetup';
import {
  RebalancingTokenContract,
  StandardTokenMockContract,
  SetTokenFactoryContract,
} from '../../utils/contracts';
import { Blockchain } from '../../utils/blockchain';
import { ether } from '../../utils/units';
import { ZERO, DEFAULT_GAS, NULL_ADDRESS } from '../../utils/constants';
import { assertLogEquivalence, getFormattedLogsFromTxHash } from '../../utils/logs';
import {
  getExpectedTransferLog,
  getExpectedNewManagerAddedLog,
  getExpectedRebalanceProposedLog,
  getExpectedRebalanceStartedLog,
} from '../../utils/contract_logs/rebalancingSet';
import { expectRevertError, assertTokenBalance } from '../../utils/tokenAssertions';
import { CoreWrapper } from '../../utils/coreWrapper';
import { ERC20Wrapper } from '../../utils/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const RebalancingToken = artifacts.require('RebalancingToken');

contract('RebalancingToken', accounts => {
  const [
    deployerAccount,
    coreAccount,
    managerAccount,
    factoryAccount,
    libraryAccount,
    otherAccount,
  ] = accounts;

  let rebalancingToken: RebalancingTokenContract;
  let components: StandardTokenMockContract[] = [];
  let factory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const blockchain = new Blockchain(web3);

  before(async () => {
    await blockchain.saveSnapshotAsync();
    ABIDecoder.addABI(RebalancingToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(RebalancingToken.abi);
    await blockchain.revertAsync();
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
      subjectInitialUnitShares = ether(1);
      subjectProposalPeriod = new BigNumber(100000);
      subjectRebalanceInterval = new BigNumber(100000);
    });

    async function subject(): Promise<RebalancingTokenContract> {
      return coreWrapper.deployRebalancingTokenAsync(
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
      rebalancingToken = await subject();

      const rebalancingTokenName = await rebalancingToken.name.callAsync();
      expect(rebalancingTokenName).to.equal(subjectName);
    });

    it('creates a set with the correct symbol', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenSymbol = await rebalancingToken.symbol.callAsync();
      expect(rebalancingTokenSymbol).to.equal(subjectSymbol);
    });

    it('creates a set with the correct factory', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenFactory = await rebalancingToken.factory.callAsync();
      expect(rebalancingTokenFactory).to.equal(subjectFactory);
    });

    it('creates a set with the correct manager', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenManager = await rebalancingToken.manager.callAsync();
      expect(rebalancingTokenManager).to.equal(subjectManager);
    });

    it('creates a set with the correct initialSet', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenInitialSet = await rebalancingToken.currentSet.callAsync();
      expect(rebalancingTokenInitialSet).to.equal(subjectInitialSet);
    });

    it('creates a set with the correct initialUnitShares', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenInitialUnitShares = await rebalancingToken.unitShares.callAsync();
      expect(rebalancingTokenInitialUnitShares).to.be.bignumber.equal(subjectInitialUnitShares);
    });

    it('creates a set with the correct proposalPeriod', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenProposalPeriod = await rebalancingToken.proposalPeriod.callAsync();
      expect(rebalancingTokenProposalPeriod).to.be.bignumber.equal(subjectProposalPeriod);
    });

    it('creates a set with the correct rebalanceInterval', async () => {
      rebalancingToken = await subject();

      const rebalancingInterval = await rebalancingToken.rebalanceInterval.callAsync();
      expect(rebalancingInterval).to.be.bignumber.equal(subjectRebalanceInterval);
    });

    it('sets the rebalancingToken state to Default (0)', async () => {
      rebalancingToken = await subject();

      const rebalancingTokenState = await rebalancingToken.rebalanceState.callAsync();
      const expectedState = ZERO;
      expect(rebalancingTokenState).to.be.bignumber.equal(expectedState);
    });

    describe('when the proposal period is too low', async () => {
      beforeEach(async () => {
        subjectProposalPeriod = new BigNumber(5000);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
    describe('when the rebalanceInterval is too low', async () => {
      beforeEach(async () => {
        subjectRebalanceInterval = new BigNumber(5000);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#mint', async () => {
    let rebalancingToken: RebalancingTokenContract;
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let newRebalancingToken: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialUnitShares = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingToken = await coreWrapper.deployRebalancingTokenAsync(
        factory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      newRebalancingToken = components[1].address;

      subjectIssuer = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = coreAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingToken.mint.sendTransactionAsync(
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingToken.balanceOf.callAsync(subjectIssuer);

      await subject();

      const expectedNewBalance = existingBalance.add(subjectQuantity);
      assertTokenBalance(rebalancingToken, expectedNewBalance, subjectIssuer);
    });

    it('updates the totalSupply_ correctly', async () => {
      const existingTokenSupply = await rebalancingToken.totalSupply.callAsync();

      await subject();

      const expectedTokenSupply = existingTokenSupply.add(subjectQuantity);
      const newTokenSupply = await rebalancingToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
    });

    it('emits a Transfer log denoting a minting', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          NULL_ADDRESS,
          subjectIssuer,
          subjectQuantity,
          rebalancingToken.address
        );

        await assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not Core', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when mint is called from Rebalance state', async () => {
      beforeEach(async () => {
        const auctionLibrary = libraryAccount;
        const curveCoefficient = ether(1);
        const auctionStartPrice = ether(5);
        const auctionPriceDivisor = ether(10);
        const caller = managerAccount;
        const timeFastForward = 100000;

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.propose.sendTransactionAsync(
          newRebalancingToken,
          auctionLibrary,
          curveCoefficient,
          auctionStartPrice,
          auctionPriceDivisor,
          { from: caller, gas: DEFAULT_GAS}
        );

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.rebalance.sendTransactionAsync(
          { from: caller, gas: DEFAULT_GAS }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#burn', async () => {
    let rebalancingToken: RebalancingTokenContract;
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let newRebalancingToken: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialUnitShares = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingToken = await coreWrapper.deployRebalancingTokenAsync(
        factory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      const mintedQuantity = ether(5);
      subjectBurner = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = coreAccount;

      newRebalancingToken = components[1].address;

      await rebalancingToken.mint.sendTransactionAsync(
        subjectBurner,
        mintedQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    });

    async function subject(): Promise<string> {
      return rebalancingToken.burn.sendTransactionAsync(
        subjectBurner,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingToken.balanceOf.callAsync(subjectBurner);

      await subject();

      const expectedNewBalance = existingBalance.sub(subjectQuantity);
      assertTokenBalance(rebalancingToken, expectedNewBalance, subjectBurner);
    });

    it('updates the totalSupply_ correctly', async () => {
      const existingTokenSupply = await rebalancingToken.totalSupply.callAsync();

      await subject();

      const expectedTokenSupply = existingTokenSupply.sub(subjectQuantity);
      const newTokenSupply = await rebalancingToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
    });

    it('emits a Transfer log denoting a minting', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          subjectBurner,
          NULL_ADDRESS,
          subjectQuantity,
          rebalancingToken.address
        );

        await assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not Core', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
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
        const auctionLibrary = libraryAccount;
        const curveCoefficient = ether(1);
        const auctionStartPrice = ether(5);
        const auctionPriceDivisor = ether(10);
        const caller = managerAccount;
        const timeFastForward = 100000;

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.propose.sendTransactionAsync(
          newRebalancingToken,
          auctionLibrary,
          curveCoefficient,
          auctionStartPrice,
          auctionPriceDivisor,
          { from: caller, gas: DEFAULT_GAS}
        );

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.rebalance.sendTransactionAsync(
          { from: caller, gas: DEFAULT_GAS }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#setManager', async () => {
    let rebalancingToken: RebalancingTokenContract;
    let subjectNewManager: Address;
    let subjectCaller: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialUnitShares = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingToken = await coreWrapper.deployRebalancingTokenAsync(
        factoryAccount,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      subjectNewManager = otherAccount,
      subjectCaller = manager;
    });

    async function subject(): Promise<string> {
      return rebalancingToken.setManager.sendTransactionAsync(
        subjectNewManager,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates to the new manager correctly', async () => {
      await subject();

      const expectedNewManager = await rebalancingToken.manager.callAsync();
      expect(subjectNewManager).to.equal(expectedNewManager);
    });

    it('emits the correct NewManagerAdded event', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedNewManagerAddedLog(
          subjectNewManager,
          subjectCaller,
          rebalancingToken.address
        );

        await assertLogEquivalence(formattedLogs, expectedLogs);
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

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialUnitShares = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingToken = await coreWrapper.deployRebalancingTokenAsync(
        factory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      const mintedQuantity = ether(5);
      subjectCaller = deployerAccount;
      subjectTokenReceiver = otherAccount;
      subjectQuantityToTransfer = ether(3);

      await rebalancingToken.mint.sendTransactionAsync(
        subjectCaller,
        mintedQuantity,
        { from: coreAccount },
      );
    });

    async function subject(): Promise<string> {
      return rebalancingToken.transfer.sendTransactionAsync(
        subjectTokenReceiver,
        subjectQuantityToTransfer,
        { from: subjectCaller },
      );
    }

    it('transfers the tokens to the right receiver', async () => {
      const existingReceiverBalance = await rebalancingToken.balanceOf.callAsync(subjectTokenReceiver);

      await subject();

      const newReceiverBalance = await rebalancingToken.balanceOf.callAsync(subjectTokenReceiver);
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
        subjectTokenReceiver = rebalancingToken.address;
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

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialUnitShares = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingToken = await coreWrapper.deployRebalancingTokenAsync(
        factory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      const mintedQuantity = ether(5);
      subjectCaller = deployerAccount;
      subjectTokenSender = deployerAccount;
      subjectTokenReceiver = otherAccount;
      subjectQuantityToTransfer = ether(3);

      await rebalancingToken.mint.sendTransactionAsync(
        subjectCaller,
        mintedQuantity,
        { from: coreAccount },
      );

      await erc20Wrapper.approveTransferAsync(rebalancingToken, subjectCaller, subjectCaller);
    });

    async function subject(): Promise<string> {
      return rebalancingToken.transferFrom.sendTransactionAsync(
        subjectTokenSender,
        subjectTokenReceiver,
        subjectQuantityToTransfer,
        { from: subjectCaller },
      );
    }

    it('transfers the tokens to the right receiver', async () => {
      const existingReceiverBalance = await rebalancingToken.balanceOf.callAsync(subjectTokenReceiver);

      await subject();

      const newReceiverBalance = await rebalancingToken.balanceOf.callAsync(subjectTokenReceiver);
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
        subjectTokenReceiver = rebalancingToken.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#propose', async () => {
    let rebalancingToken: RebalancingTokenContract;
    let subjectRebalancingToken: Address;
    let subjectAuctionLibrary: Address;
    let subjectCurveCoefficient: BigNumber;
    let subjectAuctionStartPrice: BigNumber;
    let subjectAuctionPriceDivisor: BigNumber;
    let subjectCaller: Address;
    let subjectTimeFastForward: number;
    let proposalPeriod: BigNumber;

    let newRebalancingToken: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialUnitShares = ether(1);
      const rebalanceInterval = new BigNumber(90000);
      proposalPeriod = new BigNumber(90000);

      rebalancingToken = await coreWrapper.deployRebalancingTokenAsync(
        factory.address,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      newRebalancingToken = components[1].address;

      subjectRebalancingToken = components[1].address;
      subjectAuctionLibrary = libraryAccount;
      subjectCurveCoefficient = ether(1);
      subjectAuctionStartPrice = ether(5);
      subjectAuctionPriceDivisor = ether(10);
      subjectCaller = managerAccount;
      subjectTimeFastForward = 100000;
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingToken.propose.sendTransactionAsync(
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

        const newRebalacingSet = await rebalancingToken.rebalancingSet.callAsync();
        expect(newRebalacingSet).to.equal(subjectRebalancingToken);
      });

      it('updates to the new auction library correctly', async () => {
        await subject();

        const newAuctionLibrary = await rebalancingToken.auctionLibrary.callAsync();
        expect(newAuctionLibrary).to.equal(subjectAuctionLibrary);
      });

      it('updates the curve coefficient correctly', async () => {
        await subject();

        const newCurveCoefficient = await rebalancingToken.curveCoefficient.callAsync();
        expect(newCurveCoefficient).to.be.bignumber.equal(subjectCurveCoefficient);
      });

      it('updates the auction start price correctly', async () => {
        await subject();

        const newAuctionStartPrice = await rebalancingToken.auctionStartPrice.callAsync();
        expect(newAuctionStartPrice).to.be.bignumber.equal(subjectAuctionStartPrice);
      });

      it('updates the auction price divisor correctly', async () => {
        await subject();

        const newAuctionPriceDivisor = await rebalancingToken.auctionPriceDivisor.callAsync();
        expect(newAuctionPriceDivisor).to.be.bignumber.equal(subjectAuctionPriceDivisor);
      });

      it('updates the rebalanceState to Proposal', async () => {
        await subject();

        const newRebalanceState = await rebalancingToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(new BigNumber(1));
      });

      it('emits the correct RebalanceProposed event', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);

        const proposalStartTime = await rebalancingToken.proposalStartTime.callAsync();
        const proposalEndTime = proposalStartTime.add(proposalPeriod);
        const expectedLogs = getExpectedRebalanceProposedLog(
          subjectRebalancingToken,
          subjectAuctionLibrary,
          proposalEndTime,
          rebalancingToken.address,
        );

          await assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('but the rebalance interval has not elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = 1000;
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
        const auctionLibrary = libraryAccount;
        const curveCoefficient = ether(1);
        const auctionStartPrice = ether(5);
        const auctionPriceDivisor = ether(10);
        const caller = managerAccount;
        const timeFastForward = 100000;

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.propose.sendTransactionAsync(
          newRebalancingToken,
          auctionLibrary,
          curveCoefficient,
          auctionStartPrice,
          auctionPriceDivisor,
          { from: caller, gas: DEFAULT_GAS}
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when propose is called from Rebalance state', async () => {
      beforeEach(async () => {
        const auctionLibrary = libraryAccount;
        const curveCoefficient = ether(1);
        const auctionStartPrice = ether(5);
        const auctionPriceDivisor = ether(10);
        const caller = managerAccount;
        const timeFastForward = 100000;

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.propose.sendTransactionAsync(
          newRebalancingToken,
          auctionLibrary,
          curveCoefficient,
          auctionStartPrice,
          auctionPriceDivisor,
          { from: caller, gas: DEFAULT_GAS}
        );

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.rebalance.sendTransactionAsync(
          { from: caller, gas: DEFAULT_GAS }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#rebalance', async () => {
    let rebalancingToken: RebalancingTokenContract;
    let subjectCaller: Address;
    let subjectTimeFastForward: number;
    let proposalPeriod: BigNumber;

    let initialSet: Address;
    let newRebalancingToken: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);

      const manager = managerAccount;
      const initialUnitShares = ether(1);
      const rebalanceInterval = new BigNumber(90000);
      proposalPeriod = new BigNumber(90000);
      initialSet = components[0].address;

      rebalancingToken = await coreWrapper.deployRebalancingTokenAsync(
        factoryAccount,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      newRebalancingToken = components[1].address;
      subjectCaller = managerAccount;
      subjectTimeFastForward = 100000;
    });

    async function subject(): Promise<string> {
      blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingToken.rebalance.sendTransactionAsync(
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
        const auctionLibrary = libraryAccount;
        const curveCoefficient = ether(1);
        const auctionStartPrice = ether(5);
        const auctionPriceDivisor = ether(10);
        const caller = managerAccount;
        const timeFastForward = 100000;

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.propose.sendTransactionAsync(
          newRebalancingToken,
          auctionLibrary,
          curveCoefficient,
          auctionStartPrice,
          auctionPriceDivisor,
          { from: caller, gas: DEFAULT_GAS}
        );
      });

      it('updates the rebalanceState to Rebalance', async () => {
        await subject();

        const newRebalanceState = await rebalancingToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(new BigNumber(2));
      });

      it('emits the correct RebalanceProposed event', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRebalanceStartedLog(
          initialSet,
          newRebalancingToken,
          rebalancingToken.address,
        );

        await assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('but not enough time has passed before proposal period has elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = 1000;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when rebalance is called from Rebalance State', async () => {
      beforeEach(async () => {
        const auctionLibrary = libraryAccount;
        const curveCoefficient = ether(1);
        const auctionStartPrice = ether(5);
        const auctionPriceDivisor = ether(10);
        const caller = managerAccount;
        const timeFastForward = 100000;

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.propose.sendTransactionAsync(
          newRebalancingToken,
          auctionLibrary,
          curveCoefficient,
          auctionStartPrice,
          auctionPriceDivisor,
          { from: caller, gas: DEFAULT_GAS}
        );

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.rebalance.sendTransactionAsync(
          { from: caller, gas: DEFAULT_GAS }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#settlement', async () => {
    let rebalancingToken: RebalancingTokenContract;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let initialSet: Address;
    let newRebalancingToken: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);

      const manager = managerAccount;
      const initialUnitShares = ether(1);
      const rebalanceInterval = new BigNumber(90000);
      proposalPeriod = new BigNumber(90000);
      initialSet = components[0].address;

      newRebalancingToken = components[1].address;
      subjectCaller = managerAccount;

      rebalancingToken = await coreWrapper.deployRebalancingTokenAsync(
        factoryAccount,
        manager,
        initialSet,
        initialUnitShares,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );
    });

    async function subject(): Promise<string> {
      return rebalancingToken.settlement.sendTransactionAsync(
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
        const auctionLibrary = libraryAccount;
        const curveCoefficient = ether(1);
        const auctionStartPrice = ether(5);
        const auctionPriceDivisor = ether(10);
        const caller = managerAccount;
        const timeFastForward = 100000;

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.propose.sendTransactionAsync(
          newRebalancingToken,
          auctionLibrary,
          curveCoefficient,
          auctionStartPrice,
          auctionPriceDivisor,
          { from: caller, gas: DEFAULT_GAS}
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settlement is called from Rebalance State', async () => {
      beforeEach(async () => {
        const auctionLibrary = libraryAccount;
        const curveCoefficient = ether(1);
        const auctionStartPrice = ether(5);
        const auctionPriceDivisor = ether(10);
        const caller = managerAccount;
        const timeFastForward = 100000;

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.propose.sendTransactionAsync(
          newRebalancingToken,
          auctionLibrary,
          curveCoefficient,
          auctionStartPrice,
          auctionPriceDivisor,
          { from: caller, gas: DEFAULT_GAS}
        );

        blockchain.increaseTimeAsync(timeFastForward);
        await rebalancingToken.rebalance.sendTransactionAsync(
          { from: caller, gas: DEFAULT_GAS }
        );
      });

      it('updates the rebalanceState to Default', async () => {
        await subject();

        const newRebalanceState = await rebalancingToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(new BigNumber(0));
      });

      it('updates the currentSet to rebalancing set', async () => {
        await subject();

        const newCurrentSet = await rebalancingToken.currentSet.callAsync();
        expect(newCurrentSet).to.equal(newRebalancingToken);
      });
    });

    // describe('when settlement is called and remaining current sets is not zero', async () => {
    //   beforeEach(async () => {
    //     subjectTimeFastForward = 1000;
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });
  });
});
