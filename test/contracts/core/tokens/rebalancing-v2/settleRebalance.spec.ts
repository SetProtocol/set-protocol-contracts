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
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('SettleRebalance', accounts => {
  const [
    deployerAccount,
    managerAccount,
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

  describe('#settleRebalance', async () => {
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let rebalancingSetQuantityToIssue: BigNumber;
    let setTokenNaturalUnits: BigNumber[];
    let rebalancingSetUnitShares: BigNumber;
    let currentSetIssueQuantity: BigNumber;

    let customRebalancingSetQuantityToIssue: BigNumber;
    let customBaseSetQuantityToIssue: BigNumber;

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
      const failPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidatorMock.address,
        currentSetToken.address,
        proposalPeriod,
        failPeriod,
        rebalancingSetUnitShares,
      );

      // Issue currentSetToken
      currentSetIssueQuantity = customBaseSetQuantityToIssue || ether(8);
      await coreMock.issue.sendTransactionAsync(
        currentSetToken.address,
        currentSetIssueQuantity,
        {from: deployerAccount}
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = customRebalancingSetQuantityToIssue || ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.settleRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when settleRebalance is called from Default State', async () => {
      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settleRebalance is called from Proposal State', async () => {
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

    describe('when settleRebalance is called from Rebalance State and all currentSets are rebalanced', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToRebalanceV2Async(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          managerAccount
        );

        const bidQuantity = rebalancingSetQuantityToIssue;

        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );
      });

      it('updates the rebalanceState to Default', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
      });

      it('updates the lastRebalanceTimestamp to the latest blocktimestamp', async () => {
        await subject();

        const { timestamp } = await web3.eth.getBlock('latest');
        const lastRebalanceTimestamp = await rebalancingSetToken.lastRebalanceTimestamp.callAsync();
        expect(lastRebalanceTimestamp).to.be.bignumber.equal(timestamp);
      });

      it('updates the hasBidded state to false', async () => {
        await subject();

        const hasBidded = await rebalancingSetToken.hasBidded.callAsync();
        expect(hasBidded).to.equal(false);
      });

      it('increments the rebalanceIndex', async () => {
        const previousRebalanceIndex = await rebalancingSetToken.rebalanceIndex.callAsync();

        await subject();

        const newRebalanceIndex = previousRebalanceIndex.plus(1);
        const rebalanceIndex = await rebalancingSetToken.rebalanceIndex.callAsync();
        expect(rebalanceIndex).to.bignumber.equal(newRebalanceIndex);
      });

      it('updates the currentSet to rebalancing set', async () => {
        await subject();

        const newCurrentSet = await rebalancingSetToken.currentSet.callAsync();
        expect(newCurrentSet).to.equal(nextSetToken.address);
      });

      it('properly calls the liquidator', async () => {
        await subject();

        const hasSettled = await liquidatorMock.hasSettled.callAsync();
        expect(hasSettled).to.equal(true);
      });

      it('issues the nextSet to the rebalancingSetToken', async () => {
        const existingBalance = await vault.balances.callAsync(
          nextSetToken.address,
          rebalancingSetToken.address
        );
        const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const expectedBalance = existingBalance.add(settlementAmounts['issueAmount']);
        const newBalance = await vault.balances.callAsync(nextSetToken.address, rebalancingSetToken.address);
        expect(newBalance).to.be.bignumber.equal(expectedBalance);
      });

      it('decrements component balance for the rebalancingSetToken by the correct amount', async () => {
        const componentAddresses = await nextSetToken.getComponents.callAsync();
        const setNaturalUnit = await nextSetToken.naturalUnit.callAsync();
        const setComponentUnits = await nextSetToken.getUnits.callAsync();

        const existingVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          componentAddresses,
          vault,
          rebalancingSetToken.address
        );

        const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const quantityToIssue = settlementAmounts['issueAmount'];
        const expectedVaultBalances: BigNumber[] = [];
        setComponentUnits.forEach((component, idx) => {
          const requiredQuantityToIssue = quantityToIssue.div(setNaturalUnit).mul(component);
          expectedVaultBalances.push(existingVaultBalances[idx].sub(requiredQuantityToIssue));
        });

        const newVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          componentAddresses,
          vault,
          rebalancingSetToken.address
        );
        expect(JSON.stringify(newVaultBalances)).to.equal(JSON.stringify(expectedVaultBalances));
      });

      it('updates the unitShares amount correctly', async () => {
        const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(settlementAmounts['unitShares']);
      });

      it('clears the nextSet variable', async () => {
        await subject();

        const nextSet = await rebalancingSetToken.nextSet.callAsync();
        const expectedNextSet = 0;

        expect(nextSet).to.be.bignumber.equal(expectedNextSet);
      });
    });

    describe('when settleRebalance is called but no bids are made', async () => {

      beforeEach(async () => {
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

    describe('when settleRebalance is called but unitShares is 0', async () => {
      before(async () => {
        rebalancingSetUnitShares = new BigNumber(1);
        setTokenNaturalUnits = [new BigNumber(10 ** 14), new BigNumber(10 ** 14)];
        customBaseSetQuantityToIssue = new BigNumber(10 ** 27);
        customRebalancingSetQuantityToIssue = new BigNumber(10 ** 27);
      });

      after(async () => {
        rebalancingSetUnitShares = undefined;
        setTokenNaturalUnits = undefined;
        customBaseSetQuantityToIssue = undefined;
        customRebalancingSetQuantityToIssue = undefined;
      });

      beforeEach(async () => {
        await rebalancingHelper.transitionToRebalanceV2Async(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          managerAccount
        );

        // Create a price that is REALLY bad, where nothing is returned
        await liquidatorMock.setPriceNumerator.sendTransactionAsync(
          new BigNumber(1000),
          { from: deployerAccount},
        );

        const bidQuantity = rebalancingSetQuantityToIssue.div(10 ** 10);
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when settleRebalance is called from Drawdown State', async () => {
      beforeEach(async () => {
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
