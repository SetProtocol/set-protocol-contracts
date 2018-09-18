require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  SetTokenContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { CoreWrapper } from '@utils/coreWrapper';
import { ERC20Wrapper } from '@utils/erc20Wrapper';
import { RebalancingTokenWrapper } from '@utils/RebalancingTokenWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const { expect } = chai;
const blockchain = new Blockchain(web3);



contract('CoreRebalanceAuction', accounts => {
  const [
    deployerAccount,
    managerAccount,
    libraryAccount,
    bidderAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const rebalancingTokenWrapper = new RebalancingTokenWrapper(
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
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    coreMock = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    factory = await coreWrapper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(coreMock.address);

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreWrapper.enableFactoryAsync(coreMock, rebalancingFactory);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#bid', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetTokenQuantityToIssue: BigNumber;

    beforeEach(async () => {
      const naturalUnits = [ether(.001), ether(.0001)];

      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2,
        naturalUnits
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetTokenQuantityToIssue = ether(8);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

      // Determine minimum bid
      const decOne = await currentSetToken.naturalUnit.callAsync();
      const decTwo = await nextSetToken.naturalUnit.callAsync();
      const minBid = new BigNumber(Math.max(decOne.toNumber(), decTwo.toNumber()) * 1000);

      subjectCaller = deployerAccount;
      subjectQuantity = minBid;
      subjectRebalancingSetToken = rebalancingSetToken.address;
    });

    async function subject(): Promise<string> {
      return coreMock.bid.sendTransactionAsync(
        subjectRebalancingSetToken,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when bid is called and token is in Default state', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when bid is called and token is in Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToProposeAsync(
          rebalancingSetToken,
          nextSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when bid is called and token is in Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          nextSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('transfers the correct amount of tokens to the bidder in the Vault', async () => {
        const expectedTokenFlows = await rebalancingTokenWrapper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity
        );
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const oldReceiverBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          deployerAccount
        );

        await subject();

        const newReceiverBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          deployerAccount
        );
        const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
          balance.add(expectedTokenFlows['outflowArray'][index])
        );

        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });

      it('transfers the correct amount of tokens from the bidder to the rebalancing token in Vault', async () => {
        const expectedTokenFlows = await rebalancingTokenWrapper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity
        );
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const oldSenderBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );

        await subject();

        const newSenderBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );
        const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
          balance.add(expectedTokenFlows['inflowArray'][index]).sub(expectedTokenFlows['outflowArray'][index])
        );
        expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
      });

      it('subtracts the correct amount from remainingCurrentSets', async () => {
        const currentRemainingSets = await rebalancingSetToken.remainingCurrentSets.callAsync();

        await subject();

        const expectedRemainingSets = currentRemainingSets.sub(subjectQuantity);
        const newRemainingSets = await rebalancingSetToken.remainingCurrentSets.callAsync();
        expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
      });
    });
  });

  describe('#getBidPrice', async () => {
    let subjectCaller: Address;
    let subjectQuantity: BigNumber;
    let proposalPeriod: BigNumber;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      subjectCaller = managerAccount;
      subjectQuantity = ether(1);
    });

    async function subject(): Promise<any[]> {
      return rebalancingSetToken.getBidPrice.callAsync(
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when getBidPrice is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when getBidPrice is called from Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToProposeAsync(
          rebalancingSetToken,
          nextSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when getBidPrice is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          nextSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('returns the correct UnitArrays; using price=1.374', async () => {
        const expectedFlows = await rebalancingTokenWrapper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity
        );

        const arrays = await subject();

        expect(JSON.stringify(arrays[0])).to.equal(JSON.stringify(expectedFlows['inflowArray']));
        expect(JSON.stringify(arrays[1])).to.equal(JSON.stringify(expectedFlows['outflowArray']));
      });
    });
  });

  describe('#placeBid: Called from CoreMock', async () => {
    let subjectCaller: Address;
    let subjectQuantity: BigNumber;
    let amountToIssue: BigNumber;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      amountToIssue = ether(2);
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, amountToIssue);
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, amountToIssue);

      subjectCaller = bidderAccount;
      subjectQuantity = ether(1);
    });

    async function subject(): Promise<string> {
      return coreMock.placeBid.sendTransactionAsync(
        rebalancingSetToken.address,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when placeBid is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when placeBid is called from Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToProposeAsync(
          rebalancingSetToken,
          nextSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when placeBid is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          nextSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('subtracts the correct amount from remainingCurrentSets', async () => {
        const currentRemainingSets = await rebalancingSetToken.remainingCurrentSets.callAsync();

        await subject();

        const expectedRemainingSets = currentRemainingSets.sub(subjectQuantity);
        const newRemainingSets = await rebalancingSetToken.remainingCurrentSets.callAsync();
        expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
      });

      describe('and quantity is greater than remaining sets', async () => {
        beforeEach(async () => {
          subjectQuantity = ether(4);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });

  describe('#placeBid: Called on RebalancingSetToken', async () => {
    let subjectCaller: Address;
    let subjectQuantity: BigNumber;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingTokenWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      subjectCaller = bidderAccount;
      subjectQuantity = ether(1);
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.placeBid.sendTransactionAsync(
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when placeBid is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingTokenWrapper.defaultTransitionToRebalanceAsync(
          rebalancingSetToken,
          nextSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
