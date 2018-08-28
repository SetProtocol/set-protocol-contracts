import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '../../../utils/chaiSetup';
import { BigNumberSetup } from '../../../utils/bigNumberSetup';
import {
  CoreMockContract,
  SetTokenContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
} from '../../../utils/contracts';
import { Blockchain } from '../../../utils/blockchain';
import { ether } from '../../../utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
} from '../../../utils/constants';
import { expectRevertError } from '../../../utils/tokenAssertions';
import { CoreWrapper } from '../../../utils/coreWrapper';
import { ERC20Wrapper } from '../../../utils/erc20Wrapper';
import { RebalancingTokenWrapper } from '../../../utils/RebalancingTokenWrapper';


BigNumberSetup.configure();
ChaiSetup.configure();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const { expect } = chai;

contract('CoreRebalanceAuction', accounts => {
  const [
    deployerAccount,
    managerAccount,
    libraryAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;

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

  describe('#bid', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let newRebalancingSetToken: SetTokenContract;
    let rebalancingSetQuantityToIssue: BigNumber;

    beforeEach(async () => {
      const setTokens = await rebalancingTokenWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
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

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(4), {from: deployerAccount});
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(2);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      subjectCaller = deployerAccount;
      subjectQuantity = ether(2);
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
          newRebalancingSetToken.address,
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
          newRebalancingSetToken.address,
          libraryAccount,
          managerAccount
        );
      });

      it('transfers the correct amount of tokens to the bidder in the Vault', async () => {
        const expectedTokenFlows = await rebalancingSetToken.getBidPrice.callAsync(subjectQuantity);
        const tokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
        const outflowArray = expectedTokenFlows[1];

        const oldSenderBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          tokenArray,
          vault,
          deployerAccount
        );

        await subject();

        const newSenderBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          tokenArray,
          vault,
          deployerAccount
        );
        const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
          balance.add(outflowArray[index])
        );
        expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
      });

      it('transfers the correct amount of tokens from the bidder to the rebalancing token in Vault', async () => {
        const expectedTokenFlows = await rebalancingSetToken.getBidPrice.callAsync(subjectQuantity);
        const tokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
        const inflowArray = expectedTokenFlows[0];

        const oldSenderBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          tokenArray,
          vault,
          rebalancingSetToken.address
        );

        await subject();

        const newSenderBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          tokenArray,
          vault,
          rebalancingSetToken.address
        );
        const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
          balance.add(inflowArray[index]).sub(expectedTokenFlows[1][index])
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

      it('adds the correct amount to rebalanceSetSupply', async () => {
        const currentRebalanceSets = await rebalancingSetToken.rebalanceSetSupply.callAsync();

        await subject();

        const price = new BigNumber(1);
        const expectedRebalanceSets = currentRebalanceSets.add(subjectQuantity.mul(price));
        const newRebalanceSets = await rebalancingSetToken.rebalanceSetSupply.callAsync();
        expect(newRebalanceSets).to.be.bignumber.equal(expectedRebalanceSets);
      });
    });
  });
});
