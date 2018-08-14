import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '../../utils/chaiSetup';
import { BigNumberSetup } from '../../utils/bigNumberSetup';
import {
  RebalancingSetContract,
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
const RebalancingSet = artifacts.require('RebalancingSet');

contract('RebalancingSet', accounts => {
  const [
    deployerAccount,
    coreAccount,
    managerAccount,
    factoryAccount,
    libraryAccount,
    otherAccount,
  ] = accounts;

  let rebalancingSet: RebalancingSetContract;
  let components: StandardTokenMockContract[] = [];
  let factory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const blockchain = new Blockchain(web3);

  before(async () => {
    ABIDecoder.addABI(RebalancingSet.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(RebalancingSet.abi);
  });

  describe('#constructor', async () => {
    let subjectFactory: Address;
    let subjectManager: Address;
    let subjectInitialSet: Address;
    let subjectInitialShareRatio: BigNumber;
    let subjectProposalPeriod: BigNumber;
    let subjectRebalanceInterval: BigNumber;
    const subjectName: string = 'Rebalancing Set';
    const subjectSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      subjectFactory = factoryAccount;
      subjectManager = managerAccount;
      subjectInitialSet = components[0].address,
      subjectInitialShareRatio = ether(1);
      subjectProposalPeriod = new BigNumber(100000);
      subjectRebalanceInterval = new BigNumber(100000);
    });

    async function subject(): Promise<RebalancingSetContract> {
      return coreWrapper.deployRebalancingSetAsync(
        subjectFactory,
        subjectManager,
        subjectInitialSet,
        subjectInitialShareRatio,
        subjectProposalPeriod,
        subjectRebalanceInterval,
        subjectName,
        subjectSymbol,
      );
    }

    it('creates a set with the correct name', async () => {
      rebalancingSet = await subject();

      const rebalancingSetName = await rebalancingSet.name.callAsync();
      expect(rebalancingSetName).to.equal(subjectName);
    });

    it('creates a set with the correct symbol', async () => {
      rebalancingSet = await subject();

      const rebalancingSetSymbol = await rebalancingSet.symbol.callAsync();
      expect(rebalancingSetSymbol).to.equal(subjectSymbol);
    });

    it('creates a set with the correct factory', async () => {
      rebalancingSet = await subject();

      const rebalancingSetFactory = await rebalancingSet.factory.callAsync();
      expect(rebalancingSetFactory).to.equal(subjectFactory);
    });

    it('creates a set with the correct manager', async () => {
      rebalancingSet = await subject();

      const rebalancingSetManager = await rebalancingSet.manager.callAsync();
      expect(rebalancingSetManager).to.equal(subjectManager);
    });

    it('creates a set with the correct initialSet', async () => {
      rebalancingSet = await subject();

      const rebalancingSetInitialSet = await rebalancingSet.currentSet.callAsync();
      expect(rebalancingSetInitialSet).to.equal(subjectInitialSet);
    });

    it('creates a set with the correct initialShareRatio', async () => {
      rebalancingSet = await subject();

      const rebalancingSetInitialShareRatio = await rebalancingSet.shareRatio.callAsync();
      expect(rebalancingSetInitialShareRatio).to.be.bignumber.equal(subjectInitialShareRatio);
    });

    it('creates a set with the correct proposalPeriod', async () => {
      rebalancingSet = await subject();

      const rebalancingSetProposalPeriod = await rebalancingSet.proposalPeriod.callAsync();
      expect(rebalancingSetProposalPeriod).to.be.bignumber.equal(subjectProposalPeriod);
    });

    it('creates a set with the correct rebalanceInterval', async () => {
      rebalancingSet = await subject();

      const rebalancingInterval = await rebalancingSet.rebalanceInterval.callAsync();
      expect(rebalancingInterval).to.be.bignumber.equal(subjectRebalanceInterval);
    });

    it('sets the rebalancingSet state to Default (0)', async () => {
      rebalancingSet = await subject();

      const rebalancingSetState = await rebalancingSet.rebalanceState.callAsync();
      const expectedState = ZERO;
      expect(rebalancingSetState).to.be.bignumber.equal(expectedState);
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
    let rebalancingSet: RebalancingSetContract;
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialShareRatio = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingSet = await coreWrapper.deployRebalancingSetAsync(
        factory.address,
        manager,
        initialSet,
        initialShareRatio,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      subjectIssuer = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = coreAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSet.mint.sendTransactionAsync(
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingSet.balanceOf.callAsync(subjectIssuer);

      await subject();

      const expectedNewBalance = existingBalance.add(subjectQuantity);
      assertTokenBalance(rebalancingSet, expectedNewBalance, subjectIssuer);
    });

    it('updates the totalSupply_ correctly', async () => {
      const existingTokenSupply = await rebalancingSet.totalSupply.callAsync();

      await subject();

      const expectedTokenSupply = existingTokenSupply.add(subjectQuantity);
      const newTokenSupply = await rebalancingSet.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
    });

    it('emits a Transfer log denoting a minting', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          NULL_ADDRESS,
          subjectIssuer,
          subjectQuantity,
          rebalancingSet.address
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

    // describe('when the rebalance token is in "Rebalancing" state', async () => {
    //   beforeEach(async () => {
    //     subjectRebalanceCoolOffPeriod = new BigNumber(5000);
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });
  });

  describe('#burn', async () => {
    let rebalancingSet: RebalancingSetContract;
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialShareRatio = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingSet = await coreWrapper.deployRebalancingSetAsync(
        factory.address,
        manager,
        initialSet,
        initialShareRatio,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      const mintedQuantity = ether(5);
      subjectBurner = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = coreAccount;

      await rebalancingSet.mint.sendTransactionAsync(
        subjectBurner,
        mintedQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSet.burn.sendTransactionAsync(
        subjectBurner,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingSet.balanceOf.callAsync(subjectBurner);

      await subject();

      const expectedNewBalance = existingBalance.sub(subjectQuantity);
      assertTokenBalance(rebalancingSet, expectedNewBalance, subjectBurner);
    });

    it('updates the totalSupply_ correctly', async () => {
      const existingTokenSupply = await rebalancingSet.totalSupply.callAsync();

      await subject();

      const expectedTokenSupply = existingTokenSupply.sub(subjectQuantity);
      const newTokenSupply = await rebalancingSet.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
    });

    it('emits a Transfer log denoting a minting', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          subjectBurner,
          NULL_ADDRESS,
          subjectQuantity,
          rebalancingSet.address
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

    // describe('when the rebalance token is in "Rebalancing" state', async () => {
    //   beforeEach(async () => {
    //     subjectRebalanceCoolOffPeriod = new BigNumber(5000);
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });
  });

  describe('#setManager', async () => {
    let rebalancingSet: RebalancingSetContract;
    let subjectNewManager: Address;
    let subjectCaller: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(1, deployerAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialShareRatio = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingSet = await coreWrapper.deployRebalancingSetAsync(
        factoryAccount,
        manager,
        initialSet,
        initialShareRatio,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      subjectNewManager = otherAccount,
      subjectCaller = manager;
    });

    async function subject(): Promise<string> {
      return rebalancingSet.setManager.sendTransactionAsync(
        subjectNewManager,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates to the new manager correctly', async () => {
      await subject();

      const expectedNewManager = await rebalancingSet.manager.callAsync();
      expect(subjectNewManager).to.equal(expectedNewManager);
    });

    it('emits the correct NewManagerAdded event', async () => {
        const txHash = await subject();

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedNewManagerAddedLog(
          subjectNewManager,
          subjectCaller,
          rebalancingSet.address
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
      const initialShareRatio = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingSet = await coreWrapper.deployRebalancingSetAsync(
        factory.address,
        manager,
        initialSet,
        initialShareRatio,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      const mintedQuantity = ether(5);
      subjectCaller = deployerAccount;
      subjectTokenReceiver = otherAccount;
      subjectQuantityToTransfer = ether(3);

      await rebalancingSet.mint.sendTransactionAsync(
        subjectCaller,
        mintedQuantity,
        { from: coreAccount },
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSet.transfer.sendTransactionAsync(
        subjectTokenReceiver,
        subjectQuantityToTransfer,
        { from: subjectCaller },
      );
    }

    it('transfers the tokens to the right receiver', async () => {
      const existingReceiverBalance = await rebalancingSet.balanceOf.callAsync(subjectTokenReceiver);

      await subject();

      const newReceiverBalance = await rebalancingSet.balanceOf.callAsync(subjectTokenReceiver);
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
        subjectTokenReceiver = rebalancingSet.address;
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
      const initialShareRatio = ether(1);
      const proposalPeriod = new BigNumber(100000);
      const rebalanceInterval = new BigNumber(100000);

      rebalancingSet = await coreWrapper.deployRebalancingSetAsync(
        factory.address,
        manager,
        initialSet,
        initialShareRatio,
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

      await rebalancingSet.mint.sendTransactionAsync(
        subjectCaller,
        mintedQuantity,
        { from: coreAccount },
      );

      await erc20Wrapper.approveTransferAsync(rebalancingSet, subjectCaller, subjectCaller);
    });

    async function subject(): Promise<string> {
      return rebalancingSet.transferFrom.sendTransactionAsync(
        subjectTokenSender,
        subjectTokenReceiver,
        subjectQuantityToTransfer,
        { from: subjectCaller },
      );
    }

    it('transfers the tokens to the right receiver', async () => {
      const existingReceiverBalance = await rebalancingSet.balanceOf.callAsync(subjectTokenReceiver);

      await subject();

      const newReceiverBalance = await rebalancingSet.balanceOf.callAsync(subjectTokenReceiver);
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
        subjectTokenReceiver = rebalancingSet.address;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#propose', async () => {
    let rebalancingSet: RebalancingSetContract;
    let subjectRebalancingSet: Address;
    let subjectAuctionLibrary: Address;
    let subjectCurveCoefficient: BigNumber;
    let subjectAuctionStartPrice: BigNumber;
    let subjectAuctionPriceDivisor: BigNumber;
    let subjectCaller: Address;
    let subjectTimeFastForward: number;
    let proposalPeriod: BigNumber;

    let mintedQuantity: BigNumber;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const manager = managerAccount;
      const initialSet = components[0].address;
      const initialShareRatio = ether(1);
      const rebalanceInterval = new BigNumber(90000);
      proposalPeriod = new BigNumber(90000);

      rebalancingSet = await coreWrapper.deployRebalancingSetAsync(
        factory.address,
        manager,
        initialSet,
        initialShareRatio,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      mintedQuantity = ether(5);
      await rebalancingSet.mint.sendTransactionAsync(
        otherAccount,
        mintedQuantity,
        { from: coreAccount, gas: DEFAULT_GAS}
      );

      subjectRebalancingSet = components[1].address;
      subjectAuctionLibrary = libraryAccount;
      subjectCurveCoefficient = ether(1);
      subjectAuctionStartPrice = ether(5);
      subjectAuctionPriceDivisor = ether(10);
      subjectCaller = managerAccount;
      subjectTimeFastForward = 100000;
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSet.propose.sendTransactionAsync(
        subjectRebalancingSet,
        subjectAuctionLibrary,
        subjectCurveCoefficient,
        subjectAuctionStartPrice,
        subjectAuctionPriceDivisor,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates to the new rebalancing set correctly', async () => {
      await subject();

      const newRebalacingSet = await rebalancingSet.rebalancingSet.callAsync();
      expect(newRebalacingSet).to.equal(subjectRebalancingSet);
    });

    it('updates to the new auction library correctly', async () => {
      await subject();

      const newAuctionLibrary = await rebalancingSet.auctionLibrary.callAsync();
      expect(newAuctionLibrary).to.equal(subjectAuctionLibrary);
    });

    it('updates the curve coefficient correctly', async () => {
      await subject();

      const newCurveCoefficient = await rebalancingSet.curveCoefficient.callAsync();
      expect(newCurveCoefficient).to.be.bignumber.equal(subjectCurveCoefficient);
    });

    it('updates the auction start price correctly', async () => {
      await subject();

      const newAuctionStartPrice = await rebalancingSet.auctionStartPrice.callAsync();
      expect(newAuctionStartPrice).to.be.bignumber.equal(subjectAuctionStartPrice);
    });

    it('updates the auction price divisor correctly', async () => {
      await subject();

      const newAuctionPriceDivisor = await rebalancingSet.auctionPriceDivisor.callAsync();
      expect(newAuctionPriceDivisor).to.be.bignumber.equal(subjectAuctionPriceDivisor);
    });

    it('calculates the remainingCurrentSet correctly', async () => {
      await subject();

      const currentSetAmount = await rebalancingSet.remainingCurrentSets.callAsync();
      expect(currentSetAmount).to.be.bignumber.equal(mintedQuantity);
    });

    it('updates the rebalanceState to Proposal', async () => {
      await subject();

      const newRebalanceState = await rebalancingSet.rebalanceState.callAsync();
      expect(newRebalanceState).to.be.bignumber.equal(new BigNumber(1));
    });

    it('emits the correct RebalanceProposed event', async () => {
      const txHash = await subject();

      const formattedLogs = await getFormattedLogsFromTxHash(txHash);

      const proposalStartTime = await rebalancingSet.proposalStartTime.callAsync();
      const proposalEndTime = proposalStartTime.add(proposalPeriod);
      const expectedLogs = getExpectedRebalanceProposedLog(
        subjectRebalancingSet,
        subjectAuctionLibrary,
        proposalEndTime,
        rebalancingSet.address,
      );

        await assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when propose is called before the rebalanceInterval has elapsed', async () => {
      beforeEach(async () => {
        subjectTimeFastForward = 1000;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when propose is called by someone other than the manager', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    // describe('when propose is called from Rebalance state', async () => {
    //   beforeEach(async () => {
    //     subjectCaller = otherAccount;
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });

    // describe('when propose is called from Proposal state', async () => {
    //   beforeEach(async () => {
    //     subjectCaller = otherAccount;
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });
  });

  describe('#rebalance', async () => {
    let rebalancingSet: RebalancingSetContract;
    let subjectCaller: Address;
    let subjectTimeFastForward: number;
    let proposalPeriod: BigNumber;

    let initialSet: Address;
    let newRebalancingSet: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);

      const manager = managerAccount;
      const initialShareRatio = ether(1);
      const rebalanceInterval = new BigNumber(90000);
      proposalPeriod = new BigNumber(90000);
      initialSet = components[0].address;

      rebalancingSet = await coreWrapper.deployRebalancingSetAsync(
        factoryAccount,
        manager,
        initialSet,
        initialShareRatio,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      newRebalancingSet = components[1].address;
      const auctionLibrary = libraryAccount;
      const curveCoefficient = ether(1);
      const auctionStartPrice = ether(5);
      const auctionPriceDivisor = ether(10);
      const caller = managerAccount;
      const timeFastForward = 100000;

      blockchain.increaseTimeAsync(timeFastForward);
      await rebalancingSet.propose.sendTransactionAsync(
        newRebalancingSet,
        auctionLibrary,
        curveCoefficient,
        auctionStartPrice,
        auctionPriceDivisor,
        { from: caller, gas: DEFAULT_GAS}
      );

      subjectCaller = managerAccount;
      subjectTimeFastForward = 100000;
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSet.rebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the rebalanceState to Rebalance', async () => {
      await subject();

      const newRebalanceState = await rebalancingSet.rebalanceState.callAsync();
      expect(newRebalanceState).to.be.bignumber.equal(new BigNumber(2));
    });

    it('emits the correct RebalanceProposed event', async () => {
      const txHash = await subject();

      const formattedLogs = await getFormattedLogsFromTxHash(txHash);
      const expectedLogs = getExpectedRebalanceStartedLog(
        initialSet,
        newRebalancingSet,
        rebalancingSet.address,
      );

        await assertLogEquivalence(formattedLogs, expectedLogs);
    });

    // describe('when rebalance is called from Default State', async () => {
    //   beforeEach(async () => {
    //     subjectTimeFastForward = 1000;
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });

    // describe('when rebalance is called from Rebalance State', async () => {
    //   beforeEach(async () => {
    //     subjectTimeFastForward = 1000;
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });

    describe('when rebalance is called before proposal period has elapsed', async () => {
      beforeEach(async () => {
        subjectTimeFastForward = 1000;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#settlement', async () => {
    let rebalancingSet: RebalancingSetContract;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let initialSet: Address;
    let newRebalancingSet: Address;

    const setName: string = 'Rebalancing Set';
    const setSymbol: string = 'RBSET';

    beforeEach(async () => {
      components = await erc20Wrapper.deployTokensAsync(2, deployerAccount);

      const manager = managerAccount;
      const initialShareRatio = ether(1);
      const rebalanceInterval = new BigNumber(90000);
      proposalPeriod = new BigNumber(90000);
      initialSet = components[0].address;

      rebalancingSet = await coreWrapper.deployRebalancingSetAsync(
        factoryAccount,
        manager,
        initialSet,
        initialShareRatio,
        proposalPeriod,
        rebalanceInterval,
        setName,
        setSymbol,
      );

      newRebalancingSet = components[1].address;
      const auctionLibrary = libraryAccount;
      const curveCoefficient = ether(1);
      const auctionStartPrice = ether(5);
      const auctionPriceDivisor = ether(10);
      const caller = managerAccount;
      const timeFastForward = 100000;

      blockchain.increaseTimeAsync(timeFastForward);
      await rebalancingSet.propose.sendTransactionAsync(
        newRebalancingSet,
        auctionLibrary,
        curveCoefficient,
        auctionStartPrice,
        auctionPriceDivisor,
        { from: caller, gas: DEFAULT_GAS}
      );

      blockchain.increaseTimeAsync(timeFastForward);
      await rebalancingSet.rebalance.sendTransactionAsync(
        { from: caller, gas: DEFAULT_GAS }
      );

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSet.settlement.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the rebalanceState to Default', async () => {
      await subject();

      const newRebalanceState = await rebalancingSet.rebalanceState.callAsync();
      expect(newRebalanceState).to.be.bignumber.equal(new BigNumber(0));
    });

    it('updates the currentSet to rebalancing set', async () => {
      await subject();

      const newCurrentSet = await rebalancingSet.currentSet.callAsync();
      expect(newCurrentSet).to.equal(newRebalancingSet);
    });

    // it('updates the shareRatio', async () => {
    //   await subject();

    //   const newCurrentSet = await rebalancingSet.currentSet.callAsync()
    //   expect(newCurrentSet).to.equal(newRebalancingSet);
    // });

    // it('emits the correct RebalanceFinished event', async () => {
    //   const txHash = await subject();

    //   const formattedLogs = await getFormattedLogsFromTxHash(txHash);
    //   const expectedLogs = getExpectedRebalanceFinishedLog(
    //     newRebalancingSet,
    //     ZERO,
    //     rebalancingSet.address,
    //   );

    //     await assertLogEquivalence(formattedLogs, expectedLogs);
    // });

    // describe('when settlement is called from Default State', async () => {
    //   beforeEach(async () => {
    //     subjectTimeFastForward = 1000;
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });

    // describe('when settlement is called from Proposal State', async () => {
    //   beforeEach(async () => {
    //     subjectTimeFastForward = 1000;
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });

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
