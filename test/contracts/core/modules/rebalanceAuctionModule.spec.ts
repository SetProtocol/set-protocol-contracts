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
  DEFAULT_AUCTION_PRICE_DIVISOR,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { BidPlaced } from '@utils/contract_logs/rebalanceAuctionModule';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
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
    ABIDecoder.addABI(RebalanceAuctionModuleMockContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalanceAuctionModuleMockContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);
    rebalanceAuctionModuleMock = await coreHelper.deployRebalanceAuctionModuleMockAsync(coreMock, vault);
    await coreHelper.addModuleAsync(coreMock, rebalanceAuctionModuleMock.address);

    factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );
    constantAuctionPriceCurve = await rebalancingHelper.deployConstantAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_NUMERATOR,
      DEFAULT_AUCTION_PRICE_DIVISOR,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
    await rebalancingHelper.addPriceLibraryAsync(coreMock, constantAuctionPriceCurve);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#bid', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;
    let subjectExecutePartialQuantity: boolean;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetTokenQuantityToIssue: BigNumber;
    let minBid: BigNumber;

    beforeEach(async () => {
      const naturalUnits = [ether(.001), ether(.0001)];

      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2,
        naturalUnits
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetTokenQuantityToIssue = ether(8);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

      // Determine minimum bid
      const decOne = await currentSetToken.naturalUnit.callAsync();
      const decTwo = await nextSetToken.naturalUnit.callAsync();
      minBid = new BigNumber(Math.max(decOne.toNumber(), decTwo.toNumber()) * 1000);

      subjectCaller = deployerAccount;
      subjectQuantity = minBid;
      subjectRebalancingSetToken = rebalancingSetToken.address;
      subjectExecutePartialQuantity = false;
    });

    async function subject(): Promise<string> {
      return rebalanceAuctionModuleMock.bid.sendTransactionAsync(
        subjectRebalancingSetToken,
        subjectQuantity,
        subjectExecutePartialQuantity,
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

    describe('when bid is called and token is in Rebalance State', async () => {
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

      it('transfers the correct amount of tokens to the bidder in the Vault', async () => {
        const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const oldReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          deployerAccount
        );

        await subject();

        const newReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          deployerAccount
        );
        const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
          balance.add(expectedTokenFlow['outflowArray'][index])
        );

        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });

      it('transfers the correct amount of tokens from the bidder to the rebalancing token in Vault', async () => {
        const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );

        await subject();

        const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );
        const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
          balance.add(expectedTokenFlow['inflowArray'][index]).sub(expectedTokenFlow['outflowArray'][index])
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
        const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs = BidPlaced(
          rebalancingSetToken.address,
          subjectCaller,
          subjectQuantity,
          combinedTokenArray,
          expectedTokenFlow['inflowArray'],
          expectedTokenFlow['outflowArray'],
          rebalanceAuctionModuleMock.address,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('but quantity is zero', async () => {
        beforeEach(async () => {
          subjectQuantity = new BigNumber(0);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but quantity is more than remainingCurrentSets', async () => {
        beforeEach(async () => {
          subjectQuantity = rebalancingSetTokenQuantityToIssue.add(minBid);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('partial fills is true but amount is less than remainingCurrentSets', async () => {
        beforeEach(async () => {
          subjectExecutePartialQuantity = true;
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

        describe('but quantity is zero', async () => {
          beforeEach(async () => {
            subjectQuantity = new BigNumber(0);
          });

          it('should revert', async () => {
            await expectRevertError(subject());
          });
        });
      });

      describe('and quantity is greater than remainingCurrentSets', async () => {
        const roundedQuantity = ether(8);

        beforeEach(async () => {
          subjectQuantity = ether(9);
          subjectExecutePartialQuantity = true;
        });

        it('transfers the correct amount of tokens to the bidder in the Vault', async () => {
          const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            roundedQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );
          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          const oldReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
            combinedTokenArray,
            vault,
            deployerAccount
          );

          await subject();

          const newReceiverBalances = await coreHelper.getVaultBalancesForTokensForOwner(
            combinedTokenArray,
            vault,
            deployerAccount
          );
          const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
            balance.add(expectedTokenFlow['outflowArray'][index])
          );

          expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
        });

        it('transfers the correct amount of tokens from the bidder to the rebalancing token in Vault', async () => {
          const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            roundedQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );
          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
            combinedTokenArray,
            vault,
            rebalancingSetToken.address
          );

          await subject();

          const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
            combinedTokenArray,
            vault,
            rebalancingSetToken.address
          );
          const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
            balance.add(expectedTokenFlow['inflowArray'][index]).sub(expectedTokenFlow['outflowArray'][index])
          );
          expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
        });

        it('subtracts the correct amount from remainingCurrentSets', async () => {
          const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const currentRemainingSets = new BigNumber(biddingParameters[1]);

          await subject();

          const expectedRemainingSets = currentRemainingSets.sub(roundedQuantity);
          const newBiddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const newRemainingSets = new BigNumber(newBiddingParameters[1]);
          expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
        });

        it('emits a placeBid event', async () => {
          const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            roundedQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );
          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          const txHash = await subject();
          const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

          const expectedLogs = BidPlaced(
            rebalancingSetToken.address,
            subjectCaller,
            roundedQuantity,
            combinedTokenArray,
            expectedTokenFlow['inflowArray'],
            expectedTokenFlow['outflowArray'],
            rebalanceAuctionModuleMock.address,
          );


          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });

      describe('but quantity is not multiple of minimum Bid', async () => {
        beforeEach(async () => {
          subjectQuantity = minBid.add(1);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });

  describe('#bidAndWithdraw', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let subjectExecutePartialQuantity: boolean;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetTokenQuantityToIssue: BigNumber;
    let minBid: BigNumber;

    beforeEach(async () => {
      const naturalUnits = [ether(.001), ether(.0001)];

      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2,
        naturalUnits
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetTokenQuantityToIssue = ether(8);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

      // Determine minimum bid
      const decOne = await currentSetToken.naturalUnit.callAsync();
      const decTwo = await nextSetToken.naturalUnit.callAsync();
      minBid = new BigNumber(Math.max(decOne.toNumber(), decTwo.toNumber()) * 1000);

      subjectCaller = deployerAccount;
      subjectQuantity = minBid;
      subjectRebalancingSetToken = rebalancingSetToken.address;
      subjectExecutePartialQuantity = false;
    });

    async function subject(): Promise<string> {
      return rebalanceAuctionModuleMock.bidAndWithdraw.sendTransactionAsync(
        subjectRebalancingSetToken,
        subjectQuantity,
        subjectExecutePartialQuantity,
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

    describe('when bid is called and token is in Rebalance State', async () => {
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

      it("transfers the correct amount of tokens to the bidder's wallet", async () => {
        const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );

        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
        const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

        const oldReceiverBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );

        await subject();

        const newReceiverBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
          balance.add(expectedTokenFlow['outflowArray'][index]).sub(expectedTokenFlow['inflowArray'][index])
        );

        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });

      it('transfers the correct amount of tokens from the bidder to the rebalancing token in Vault', async () => {
        const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );

        await subject();

        const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );
        const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
          balance.add(expectedTokenFlow['inflowArray'][index]).sub(expectedTokenFlow['outflowArray'][index])
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
        const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs = BidPlaced(
          rebalancingSetToken.address,
          subjectCaller,
          subjectQuantity,
          combinedTokenArray,
          expectedTokenFlow['inflowArray'],
          expectedTokenFlow['outflowArray'],
          rebalanceAuctionModuleMock.address,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('but quantity is zero', async () => {
        beforeEach(async () => {
          subjectQuantity = new BigNumber(0);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but quantity is more than remainingCurrentSets', async () => {
        beforeEach(async () => {
          subjectQuantity = rebalancingSetTokenQuantityToIssue.add(minBid);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('partial fills is true but amount is less than remainingCurrentSets', async () => {
        beforeEach(async () => {
          subjectExecutePartialQuantity = true;
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

        describe('but quantity is zero', async () => {
          beforeEach(async () => {
            subjectQuantity = new BigNumber(0);
          });

          it('should revert', async () => {
            await expectRevertError(subject());
          });
        });
      });

      describe('and quantity is greater than remainingCurrentSets', async () => {
        const roundedQuantity = ether(8);

        beforeEach(async () => {
          subjectQuantity = ether(9);
          subjectExecutePartialQuantity = true;
        });

        it("transfers the correct amount of tokens to the bidder's wallet", async () => {
          const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            roundedQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );

          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
          const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

          const oldReceiverBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );

          await subject();

          const newReceiverBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );
          const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
            balance.add(expectedTokenFlow['outflowArray'][index]).sub(expectedTokenFlow['inflowArray'][index])
          );

          expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
        });

        it('transfers the correct amount of tokens from the bidder to the rebalancing token in Vault', async () => {
          const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            roundedQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );
          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
            combinedTokenArray,
            vault,
            rebalancingSetToken.address
          );

          await subject();

          const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
            combinedTokenArray,
            vault,
            rebalancingSetToken.address
          );
          const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
            balance.add(expectedTokenFlow['inflowArray'][index]).sub(expectedTokenFlow['outflowArray'][index])
          );

          expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
        });

        it('subtracts the correct amount from remainingCurrentSets', async () => {
          const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const currentRemainingSets = new BigNumber(biddingParameters[1]);

          await subject();

          const expectedRemainingSets = currentRemainingSets.sub(roundedQuantity);
          const newBiddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const newRemainingSets = new BigNumber(newBiddingParameters[1]);
          expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
        });

        it('emits a placeBid event', async () => {
          const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            roundedQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );
          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          const txHash = await subject();
          const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

          const expectedLogs = BidPlaced(
            rebalancingSetToken.address,
            subjectCaller,
            roundedQuantity,
            combinedTokenArray,
            expectedTokenFlow['inflowArray'],
            expectedTokenFlow['outflowArray'],
            rebalanceAuctionModuleMock.address,
          );

          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });

      describe('but quantity is not multiple of natural unit', async () => {
        beforeEach(async () => {
          subjectQuantity = minBid.add(1);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
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
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
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

    describe('when getBidPrice is called from Rebalance State', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, ether(7));

        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('returns the correct UnitArrays; using price=1.374', async () => {
        const expectedFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
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

      amountToIssue = ether(2);
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, amountToIssue);
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, amountToIssue);

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

    describe('when placeBid is called from Rebalance State', async () => {
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

      it('subtracts the correct amount from remainingCurrentSets', async () => {
        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const currentRemainingSets = new BigNumber(biddingParameters[1]);

        await subject();

        const expectedRemainingSets = currentRemainingSets.sub(subjectQuantity);
        const newBiddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const newRemainingSets = new BigNumber(newBiddingParameters[1]);

        expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
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
        const minimumBid = biddingParameters[0];
        await rebalanceAuctionModuleMock.bid.sendTransactionAsync(
          rebalancingSetToken.address,
          minimumBid,
          false
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

  describe('#placeBid: Called on RebalancingSetToken', async () => {
    let subjectCaller: Address;
    let subjectQuantity: BigNumber;

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
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, ether(7));

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
  });

  describe('#redeemFromFailedRebalance', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetTokenQuantityToIssue: BigNumber;

    beforeEach(async () => {
      const naturalUnits = [ether(.001), ether(.0001)];

      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2,
        naturalUnits
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetTokenQuantityToIssue = ether(8);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

      subjectCaller = deployerAccount;
      subjectRebalancingSetToken = rebalancingSetToken.address;
    });

    async function subject(): Promise<string> {
      return rebalanceAuctionModuleMock.redeemFromFailedRebalance.sendTransactionAsync(
        subjectRebalancingSetToken,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when redeemFromFailedRebalance is called by an invalid Set Token', async () => {
      beforeEach(async () => {
        subjectRebalancingSetToken = nonTrackedSetToken;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when redeemFromFailedRebalance is called and token is in Default state', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when redeemFromFailedRebalance is called and token is in Proposal State', async () => {
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

    describe('when redeemFromFailedRebalance is called and token is in Rebalance State', async () => {
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

    describe('when redeemFromFailedRebalance is called and token is in Drawdown State', async () => {
      let minimumBid: BigNumber;

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
        minimumBid = biddingParameters[0];
        await rebalanceAuctionModuleMock.bid.sendTransactionAsync(
          rebalancingSetToken.address,
          minimumBid,
          false
        );

        await rebalancingHelper.endFailedRebalanceAsync(
          rebalancingSetToken
        );
      });

      it('transfers the correct amount of tokens to the bidder in the Vault', async () => {
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const receiverTokenBalance = await rebalancingSetToken.balanceOf.callAsync(subjectCaller);
        const setTotalSupply = await rebalancingSetToken.totalSupply.callAsync();

        const collateralBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );

        const oldReceiverVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          deployerAccount
        );

        await subject();

        const newReceiverVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
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

  describe('#calculateExecutionQuantity', async () => {
    let subjectCaller: Address;
    let subjectQuantity: BigNumber;
    let subjectAllowPartialFill: boolean;

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

      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, ether(7));

      await rebalancingHelper.defaultTransitionToRebalanceAsync(
        coreMock,
        rebalancingComponentWhiteList,
        rebalancingSetToken,
        nextSetToken,
        constantAuctionPriceCurve.address,
        managerAccount
      );

      subjectCaller = bidderAccount;
      subjectQuantity = ether(1);
      subjectAllowPartialFill = true;
    });

    async function subject(): Promise<BigNumber> {
      return rebalanceAuctionModuleMock.calculateExecutionQuantityExternal.callAsync(
        rebalancingSetToken.address,
        subjectQuantity,
        subjectAllowPartialFill,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should return passed quantity', async () => {
      const executionQuantity = await subject();
      expect(executionQuantity).to.be.bignumber.equal(subjectQuantity);
    });

    describe('when quantity passed is greater than remainingCurrentSets', async () => {
      beforeEach(async () => {
        subjectQuantity = ether(9);
      });

      it('should return passed quantity', async () => {
        const executionQuantity = await subject();

        const biddingParams = await rebalancingSetToken.getBiddingParameters.callAsync();
        const expectedExecutionQuantity = biddingParams[1];
        expect(executionQuantity).to.be.bignumber.equal(expectedExecutionQuantity);
      });
    });
  });
});
