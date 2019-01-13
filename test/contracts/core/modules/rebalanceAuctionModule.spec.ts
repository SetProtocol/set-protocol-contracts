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
  ConstantAuctionPriceCurveContract,
  CoreMockContract,
  RebalanceAuctionModuleMockContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DENOMINATOR,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { BidPlaced } from '@utils/contract_logs/rebalanceAuctionModule';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalanceAuctionModuleMock = artifacts.require('RebalanceAuctionModuleMock');
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);


contract('RebalanceAuctionModule', accounts => {
  const [
    deployerAccount,
    managerAccount,
    bidderAccount,
    nonTrackedSetToken,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModuleMock: RebalanceAuctionModuleMockContract;
  let factory: SetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
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
    ABIDecoder.addABI(RebalanceAuctionModuleMock.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalanceAuctionModuleMock.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    coreMock = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    rebalanceAuctionModuleMock = await coreWrapper.deployRebalanceAuctionModuleMockAsync(coreMock, vault);
    await coreWrapper.addModuleAsync(coreMock, rebalanceAuctionModuleMock.address);

    factory = await coreWrapper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreWrapper.deployWhiteListAsync();
    rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );
    constantAuctionPriceCurve = await rebalancingWrapper.deployConstantAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_NUMERATOR,
      DEFAULT_AUCTION_PRICE_DENOMINATOR,
    );

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreWrapper.addFactoryAsync(coreMock, rebalancingFactory);
    await coreWrapper.addAuthorizationAsync(vault, rebalanceAuctionModuleMock.address);
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

      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2,
        naturalUnits
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
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
      return rebalanceAuctionModuleMock.bid.sendTransactionAsync(
        subjectRebalancingSetToken,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when bid is called by an invalid Set Token', async () => {
      beforeEach(async () => {
        subjectRebalancingSetToken = nonTrackedSetToken;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when bid is called and token is in Default state', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when bid is called and token is in Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToProposeAsync(
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

    describe('when bid is called and token is in Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('transfers the correct amount of tokens to the bidder in the Vault', async () => {
        const expectedTokenFlows = await rebalancingWrapper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
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
        const expectedTokenFlows = await rebalancingWrapper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
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
        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const currentRemainingSets = new BigNumber(biddingParameters[1]);

        await subject();

        const expectedRemainingSets = currentRemainingSets.sub(subjectQuantity);
        const newBiddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const newRemainingSets = new BigNumber(newBiddingParameters[1]);
        expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
      });

      it('emits a placeBid event', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs = BidPlaced(
          subjectCaller,
          subjectQuantity,
          rebalanceAuctionModuleMock.address,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
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
      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
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
        await rebalancingWrapper.defaultTransitionToProposeAsync(
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

    describe('when getBidPrice is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('returns the correct UnitArrays; using price=1.374', async () => {
        const expectedFlows = await rebalancingWrapper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );

        const arrays = await subject();

        expect(JSON.stringify(arrays[0])).to.equal(JSON.stringify(expectedFlows['inflowArray']));
        expect(JSON.stringify(arrays[1])).to.equal(JSON.stringify(expectedFlows['outflowArray']));
      });
    });
  });

  describe('#placeBid: Called from RebalanceAuction Module', async () => {
    let subjectCaller: Address;
    let subjectQuantity: BigNumber;
    let amountToIssue: BigNumber;

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

      amountToIssue = ether(2);
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, amountToIssue);
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, amountToIssue);
      await coreMock.addPriceLibrary.sendTransactionAsync(constantAuctionPriceCurve.address);

      subjectCaller = bidderAccount;
      subjectQuantity = ether(1);
    });

    async function subject(): Promise<string> {
      return rebalanceAuctionModuleMock.placeBid.sendTransactionAsync(
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
        await rebalancingWrapper.defaultTransitionToProposeAsync(
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

    describe('when placeBid is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('subtracts the correct amount from remainingCurrentSets', async () => {
        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const currentRemainingSets = new BigNumber(biddingParameters[1]);

        await subject();

        const expectedRemainingSets = currentRemainingSets.sub(subjectQuantity);
        const newBiddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const newRemainingSets = new BigNumber(newBiddingParameters[1]);

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

      describe('and quantity is not a multiple of minimumBid', async () => {
        beforeEach(async () => {
          const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const minimumBid = new BigNumber(biddingParameters[0]);

          subjectQuantity = minimumBid.mul(new BigNumber(1.5));
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when placeBid is called from Drawdown State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
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
        const minimumBid = biddingParameters[0];
        await rebalanceAuctionModuleMock.bid.sendTransactionAsync(
          rebalancingSetToken.address,
          minimumBid
        );

        await rebalancingSetToken.endFailedAuction.sendTransactionAsync();
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#placeBid: Called on RebalancingSetToken', async () => {
    let subjectCaller: Address;
    let subjectQuantity: BigNumber;

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
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
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
  });

  describe('#withdrawFromFailedRebalance', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetTokenQuantityToIssue: BigNumber;

    beforeEach(async () => {
      const naturalUnits = [ether(.001), ether(.0001)];

      const setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2,
        naturalUnits
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
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

      subjectCaller = deployerAccount;
      subjectRebalancingSetToken = rebalancingSetToken.address;
    });

    async function subject(): Promise<string> {
      return rebalanceAuctionModuleMock.withdrawFromFailedRebalance.sendTransactionAsync(
        subjectRebalancingSetToken,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when withdrawFromFailedRebalance is called by an invalid Set Token', async () => {
      beforeEach(async () => {
        subjectRebalancingSetToken = nonTrackedSetToken;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when withdrawFromFailedRebalance is called and token is in Default state', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when withdrawFromFailedRebalance is called and token is in Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToProposeAsync(
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

    describe('when withdrawFromFailedRebalance is called and token is in Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
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

    describe('when withdrawFromFailedRebalance is called and token is in Drawdown State', async () => {
      let minimumBid: BigNumber;

      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
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
        minimumBid = biddingParameters[0];
        await rebalanceAuctionModuleMock.bid.sendTransactionAsync(
          rebalancingSetToken.address,
          minimumBid
        );

        await rebalancingSetToken.endFailedAuction.sendTransactionAsync();
      });

      it('transfers the correct amount of tokens to the bidder in the Vault', async () => {
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const receiverTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const setTotalSupply = await rebalancingSetToken.totalSupply.callAsync();

        const collateralBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );

        const oldReceiverVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          deployerAccount
        );

        await subject();

        const newReceiverVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          deployerAccount
        );
        const expectedReceiverBalances = _.map(collateralBalances, (balance, index) =>
          oldReceiverVaultBalances[index].add(
            balance.mul(receiverTokenBalance).div(setTotalSupply).round(0, 3)
          )
        );

        expect(JSON.stringify(newReceiverVaultBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });

      it("zeros out the caller's balance", async () => {
        const currentBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        expect(currentBalance).to.be.bignumber.not.equal(ZERO);

        await subject();

        const newBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        expect(newBalance).to.be.bignumber.equal(ZERO);
      });

      it('subtracts the correct amount from the totalSupply', async () => {
        const userBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const setTotalSupply = await rebalancingSetToken.totalSupply.callAsync();

        await subject();

        const newTotalSupply = await rebalancingSetToken.totalSupply.callAsync();
        const expectedTotalSupply = setTotalSupply.sub(userBalance);
        expect(newTotalSupply).to.be.bignumber.equal(expectedTotalSupply);
      });
    });
  });
});
