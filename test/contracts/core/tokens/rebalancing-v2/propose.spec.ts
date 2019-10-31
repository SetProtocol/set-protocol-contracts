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
  getExpectedRebalanceProposedV2Log,
} from '@utils/contract_logs/rebalancingSetToken';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingSetV2Helper } from '@utils/helpers/rebalancingSetV2Helper';
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
const { NULL_ADDRESS } = SetUtils.CONSTANTS;

contract('Propose', accounts => {
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
  let liquidatorWhitelist: WhiteListContract;
  let liquidatorMock: LiquidatorMockContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV2Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper)

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
    liquidatorWhitelist = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhitelist.address
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMockAsync();
    await coreHelper.addAddressToWhiteList(liquidatorMock.address, liquidatorWhitelist);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#propose', async () => {
    let subjectNextSet: Address;
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;
    let proposalPeriod: BigNumber;
    let failPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let reproposeRebalancingSetTokenV2: SetTokenContract;
    let setTokens: SetTokenContract[];
    let naturalUnits: BigNumber[];

    beforeEach(async () => {
      const setTokensToDeploy = 3;
      setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        naturalUnits || undefined
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];
      reproposeRebalancingSetTokenV2 = setTokens[2];

      const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
      const reproposeRebalancingSetComponentAddresses = await reproposeRebalancingSetTokenV2.getComponents.callAsync();
      const componentsToWhiteList = _.uniq(
        nextSetTokenComponentAddresses.concat(reproposeRebalancingSetComponentAddresses)
      );
      await coreHelper.addTokensToWhiteList(componentsToWhiteList, rebalancingComponentWhiteList);

      proposalPeriod = ONE_DAY_IN_SECONDS;
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

      subjectNextSet = nextSetToken.address;
      subjectCaller = managerAccount;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSetToken.propose.sendTransactionAsync(
        subjectNextSet,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when propose is called from the Default state', async () => {
      it('updates to the nextSet correctly', async () => {
        await subject();

        const newRebalacingSet = await rebalancingSetToken.nextSet.callAsync();
        expect(newRebalacingSet).to.equal(subjectNextSet);
      });

      it('updates the proposalStartTime properly', async () => {
        await subject();
        const { timestamp } = await web3.eth.getBlock('latest');

        const newRebalanceState = await rebalancingSetToken.proposalStartTime.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(timestamp);
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
        const expectedLogs = getExpectedRebalanceProposedV2Log(
          subjectNextSet,
          proposalEndTime,
          rebalancingSetToken.address,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      it('sends the correct nextSet to the liquidator', async () => {
        await subject();

        const retrievedNextSet = await liquidatorMock.nextSet.callAsync();
        expect(retrievedNextSet).to.equal(subjectNextSet);
      });

      it('sends the correct currentSet to the liquidator', async () => {
        await subject();

        const retrievedCurrentSet = await liquidatorMock.currentSet.callAsync();
        expect(retrievedCurrentSet).to.equal(currentSetToken.address);
      });

      describe('when one of the components in the next set is not on the whitelist', async () => {
        beforeEach(async () => {
          const nextSetComponents = await nextSetToken.getComponents.callAsync();
          await rebalancingComponentWhiteList.removeAddress.sendTransactionAsync(
            nextSetComponents[0],
            { from: deployerAccount }
          );
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the rebalance interval has not elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = ONE_DAY_IN_SECONDS.sub(10);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when not by the token manager', async () => {
        beforeEach(async () => {
          subjectCaller = otherAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the proposed nextSet is not approved by Core', async () => {
        beforeEach(async () => {
          subjectNextSet = fakeTokenAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe("when the new proposed set's natural unit is not a multiple of the current set", async () => {
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
        await rebalancingHelper.transitionToProposeV2Async(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          managerAccount
        );

        subjectNextSet = reproposeRebalancingSetTokenV2.address;
        timeJump = new BigNumber(1000);
        await blockchain.increaseTimeAsync(timeJump);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when propose is called from Rebalance state', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingHelper.transitionToRebalanceV2Async(
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

    describe('when propose is called from Drawdown State', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingHelper.transitionToDrawdownV2Async(
          coreMock,
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

  describe('#cancelProposal', async () => {
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;
    let failPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let reproposeRebalancingSetTokenV2: SetTokenContract;
    let setTokens: SetTokenContract[];

    beforeEach(async () => {
      const setTokensToDeploy = 3;
      setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];
      reproposeRebalancingSetTokenV2 = setTokens[2];

      const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
      const reproposeRebalancingSetComponentAddresses = await reproposeRebalancingSetTokenV2.getComponents.callAsync();
      const componentsToWhiteList: Address[] = _.uniq(
        nextSetTokenComponentAddresses.concat(reproposeRebalancingSetComponentAddresses)
      );
      await coreHelper.addTokensToWhiteList(componentsToWhiteList, rebalancingComponentWhiteList);

      proposalPeriod = ONE_DAY_IN_SECONDS;
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

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.cancelProposal.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when called from the Default state', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when called from the proposal state', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToProposeV2Async(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          managerAccount
        );
      });

      it('sets the nextSet correctly', async () => {
        await subject();

        const newRebalacingSet = await rebalancingSetToken.nextSet.callAsync();
        expect(newRebalacingSet).to.equal(NULL_ADDRESS);
      });

      it('updates the rebalanceState to Default', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
      });

      it('makes a function call to the liquidator', async () => {
        await subject();

        const retrievedNextSet = await liquidatorMock.nextSet.callAsync();
        expect(retrievedNextSet).to.equal(NULL_ADDRESS);
      });

      describe('when not called by the manager', async () => {
        beforeEach(async () => {
          subjectCaller = otherAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when called from Rebalance state', async () => {
      beforeEach(async () => {
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingHelper.transitionToRebalanceV2Async(
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

    describe('when propose is called from Drawdown State', async () => {
      beforeEach(async () => {
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingHelper.transitionToDrawdownV2Async(
          coreMock,
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
});
