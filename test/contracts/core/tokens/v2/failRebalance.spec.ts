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
  LiquidatorMockContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';
import {
  getExpectedRebalanceStartedLog,
} from '@utils/contract_logs/rebalancingSetToken';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetTokenV2 = artifacts.require('RebalancingSetTokenV2');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('FailRebalance', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    fakeTokenAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV2Contract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let factory: SetTokenFactoryContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let rebalancingFactory: RebalancingSetTokenV2FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorMock: LiquidatorMockContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingHelper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const liquidatorHelper = new LiquidatorHelper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
    ABIDecoder.addABI(RebalancingSetTokenV2.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalancingSetTokenV2.abi);
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
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMock();
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#failRebalance', async () => {
    let subjectCaller: Address;

    let proposalPeriod: BigNumber;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let baseSetQuantityToIssue: BigNumber;
    let rebalancingSetQuantityToIssue: BigNumber = ether(7);
    let setTokenNaturalUnits: BigNumber[];
    let rebalancingSetUnitShares: BigNumber;
    let currentSetIssueQuantity: BigNumber;

    let failPeriod: BigNumber;

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

      const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
      await coreHelper.addTokensToWhiteList(nextSetTokenComponentAddresses, rebalancingComponentWhiteList);

      const proposalPeriod = ONE_DAY_IN_SECONDS;
      failPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidatorMock.address,
        currentSetToken.address,
        proposalPeriod,
        failPeriod,
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

    describe('when endFailedRebalance is called from Proposal State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToProposeV2Async(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe.only('when endFailedAuction is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToRebalanceV2Async(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          managerAccount
        );
      });

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
          const nextSetIssueQuantity = await rebalancingHelper.getNextSetIssueQuantity(
            nextSetToken,
            rebalancingSetToken,
            vault,
          );

          await subject();

          const expectedBalance = existingBalance.add(nextSetIssueQuantity);
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
      });

      describe('and bids have been placed', async () => {
        beforeEach(async () => {
          const failPeriod = new BigNumber(100000);
          await blockchain.increaseTimeAsync(failPeriod.add(1));

          const minimumBid = await liquidatorMock.minimumBid.callAsync();
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

        it('moves combinedTokenArray to failedAuctionWithdrawComponents', async () => {
          const currentSetComponents = await currentSetToken.getComponents.callAsync();
          const nextSetComponents = await nextSetToken.getComponents.callAsync();

          const expectedWithdrawComponents = _.union(currentSetComponents, nextSetComponents);

          await subject();

          const withdrawComponents = await rebalancingSetToken.getFailedAuctionWithdrawComponents.callAsync();

          expect(withdrawComponents).to.deep.equal(expectedWithdrawComponents);
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

            const minimumBid = await liquidatorMock.minimumBid.callAsync();
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



  });

});
