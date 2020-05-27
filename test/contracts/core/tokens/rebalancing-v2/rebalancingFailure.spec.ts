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
  FixedFeeCalculatorContract,
  LiquidatorMockContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV2Helper } from '@utils/helpers/rebalancingSetV2Helper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('FailRebalance', accounts => {
  const [
    deployerAccount,
    managerAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV2Contract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let factory: SetTokenFactoryContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let rebalancingFactory: RebalancingSetTokenV2FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorWhitelist: WhiteListContract;
  let liquidatorMock: LiquidatorMockContract;
  let feeCalculator: FixedFeeCalculatorContract;
  let feeCalculatorWhitelist: WhiteListContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV2Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper, valuationHelper);
  const feeCalculatorHelper = new FeeCalculatorHelper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(RebalancingSetTokenV2Contract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetTokenV2Contract.getAbi());
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
    liquidatorWhitelist = await coreHelper.deployWhiteListAsync();
    feeCalculatorWhitelist = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhitelist.address,
      feeCalculatorWhitelist.address
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMockAsync();
    await coreHelper.addAddressToWhiteList(liquidatorMock.address, liquidatorWhitelist);

    feeCalculator = await feeCalculatorHelper.deployFixedFeeCalculatorAsync();
    await coreHelper.addAddressToWhiteList(feeCalculator.address, feeCalculatorWhitelist);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#failRebalance', async () => {
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let rebalancingSetQuantityToIssue: BigNumber = ether(7);
    let currentSetIssueQuantity: BigNumber;

    let failPeriod: BigNumber;

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

      const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
      await coreHelper.addTokensToWhiteList(nextSetTokenComponentAddresses, rebalancingComponentWhiteList);

      failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidatorMock.address,
        feeRecipient,
        feeCalculator.address,
        currentSetToken.address,
        failPeriod,
        new BigNumber(lastRebalanceTimestamp),
      );

      // Issue currentSetToken
      currentSetIssueQuantity = ether(8);
      await coreMock.issue.sendTransactionAsync(
        currentSetToken.address,
        currentSetIssueQuantity,
        {from: deployerAccount}
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.endFailedRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when endFailedRebalance is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when endFailedAuction is called from Rebalance State', async () => {
      beforeEach(async () => {
       await rebalancingHelper.transitionToRebalanceV2Async(
         coreMock,
         rebalancingComponentWhiteList,
         rebalancingSetToken,
         nextSetToken,
         managerAccount
       );
      });

      describe('when the failAuctionTime has been breached', async () => {
        describe('and no bids have been placed', async () => {
          beforeEach(async () => {
            const failRebalancePeriod = new BigNumber(100000);
            await blockchain.increaseTimeAsync(failRebalancePeriod.add(1));
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
            const currentSetIssueQuantity = await rebalancingHelper.getSetIssueQuantity(
              currentSetToken,
              rebalancingSetToken,
              vault,
            );

            await subject();

            const expectedBalance = existingBalance.add(currentSetIssueQuantity);
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

          it('clears the hasBidded variable', async () => {
            await subject();

            const hasBidded = await rebalancingSetToken.hasBidded.callAsync();

            expect(hasBidded).to.equal(false);
          });

          it('increments the rebalanceIndex variable', async () => {
            const previousRebalanceIndex = await rebalancingSetToken.rebalanceIndex.callAsync();

            await subject();

            const expectedRebalanceIndex = previousRebalanceIndex.plus(1);
            const rebalanceIndex = await rebalancingSetToken.rebalanceIndex.callAsync();

            expect(rebalanceIndex).to.bignumber.equal(expectedRebalanceIndex);
          });
        });

        describe('and bids have been placed', async () => {
          beforeEach(async () => {
            const failPeriod = new BigNumber(100000);
            await blockchain.increaseTimeAsync(failPeriod.add(1));

            const minimumBid = await liquidatorMock.minimumBid.callAsync(rebalancingSetToken.address);
            await rebalancingHelper.placeBidAsync(
              rebalanceAuctionModule,
              rebalancingSetToken.address,
              minimumBid,
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

          it('updates the failedRebalanceComponents property', async () => {
            const currentSetComponents = await currentSetToken.getComponents.callAsync();
            const nextSetComponents = await nextSetToken.getComponents.callAsync();

            const expectedWithdrawComponents = _.union(currentSetComponents, nextSetComponents);

            await subject();

            const withdrawComponents = await rebalancingSetToken.getFailedAuctionWithdrawComponents.callAsync();

            expect(withdrawComponents).to.deep.equal(expectedWithdrawComponents);
          });
        });
      });

      describe('when auctionFailPoint has not been reached and auction has not failed', async () => {
        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when liquidator auction returns with a failure', async () => {
        beforeEach(async () => {
          await liquidatorMock.setHasFailed.sendTransactionAsync(true, { from: deployerAccount });
        });

        describe('and no bids have been placed', async () => {
          it('updates the rebalanceState to Default', async () => {
            await subject();

            const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
            expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
          });
        });

        describe('and bids have been placed', async () => {
          beforeEach(async () => {
            const failPeriod = new BigNumber(100000);
            await blockchain.increaseTimeAsync(failPeriod.add(1));

            const minimumBid = await liquidatorMock.minimumBid.callAsync(rebalancingSetToken.address);
            await rebalancingHelper.placeBidAsync(
              rebalanceAuctionModule,
              rebalancingSetToken.address,
              minimumBid,
            );
          });

          it('updates the rebalanceState to Drawdown', async () => {
            await subject();

            const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
            expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DRAWDOWN);
          });
        });
      });
    });

    describe('when settleRebalance is called from Drawdown State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToDrawdownV2Async(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          rebalanceAuctionModule,
          liquidatorMock,
          nextSetToken,
          managerAccount,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#RebalanceAuctionModule.redeemFromFailedRebalance', async () => {
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let rebalancingSetQuantityToIssue: BigNumber;
    let currentSetIssueQuantity: BigNumber;

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

      const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
      await coreHelper.addTokensToWhiteList(nextSetTokenComponentAddresses, rebalancingComponentWhiteList);

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidatorMock.address,
        feeRecipient,
        feeCalculator.address,
        currentSetToken.address,
        failPeriod,
        new BigNumber(lastRebalanceTimestamp),
      );

      // Issue currentSetToken
      currentSetIssueQuantity = ether(8);
      await coreMock.issue.sendTransactionAsync(
        currentSetToken.address,
        currentSetIssueQuantity,
        {from: deployerAccount}
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      await rebalancingHelper.transitionToDrawdownV2Async(
        coreMock,
        rebalancingComponentWhiteList,
        rebalancingSetToken,
        rebalanceAuctionModule,
        liquidatorMock,
        nextSetToken,
        managerAccount,
      );

      subjectCaller = deployerAccount;
    });

    async function subject(): Promise<string> {
      return rebalanceAuctionModule.redeemFromFailedRebalance.sendTransactionAsync(
        rebalancingSetToken.address,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('transfers the correct amount of tokens to the bidder in the Vault', async () => {
      const currentSetComponents = await currentSetToken.getComponents.callAsync();
      const nextSetComponents = await nextSetToken.getComponents.callAsync();

      const combinedTokenArray = _.union(currentSetComponents, nextSetComponents);

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

  });

});
