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

contract('StartRebalance', accounts => {
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

  describe('#settleRebalance', async () => {
    let subjectCaller: Address;

    let proposalPeriod: BigNumber;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let baseSetQuantityToIssue: BigNumber;
    let rebalancingSetQuantityToIssue: BigNumber = ether(7);
    let setTokenNaturalUnits: BigNumber[];
    let rebalancingSetUnitShares: BigNumber;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        undefined || setTokenNaturalUnits,
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod,
        undefined || rebalancingSetUnitShares,
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(
        currentSetToken.address,
        baseSetQuantityToIssue || ether(9),
        {from: deployerAccount},
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(
        rebalancingSetToken.address,
        rebalancingSetQuantityToIssue,
        {from: deployerAccount}
      );

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
        await rebalancingHelper.defaultTransitionToProposeV2Async(
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
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const bidQuantity = rebalancingSetQuantityToIssue;
        await rebalancingHelper.placeBidAsync(
          rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );
      });

      // it('updates the rebalanceState to Default', async () => {
      //   await subject();

      //   const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
      //   expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
      // });

      // it('updates the currentSet to rebalancing set', async () => {
      //   await subject();

      //   const newCurrentSet = await rebalancingSetToken.currentSet.callAsync();
      //   expect(newCurrentSet).to.equal(nextSetToken.address);
      // });

      // it('issues the nextSet to the rebalancingSetToken', async () => {
      //   const existingBalance = await vault.balances.callAsync(
      //     nextSetToken.address,
      //     rebalancingSetToken.address
      //   );
      //   const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
      //     coreMock,
      //     rebalancingSetToken,
      //     nextSetToken,
      //     vault
      //   );

      //   await subject();

      //   const expectedBalance = existingBalance.add(settlementAmounts['issueAmount']);
      //   const newBalance = await vault.balances.callAsync(nextSetToken.address, rebalancingSetToken.address);
      //   expect(newBalance).to.be.bignumber.equal(expectedBalance);
      // });

      // it('decrements component balance for the rebalancingSetToken by the correct amount', async () => {
      //   const componentAddresses = await nextSetToken.getComponents.callAsync();
      //   const setNaturalUnit = await nextSetToken.naturalUnit.callAsync();
      //   const setComponentUnits = await nextSetToken.getUnits.callAsync();

      //   const existingVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
      //     componentAddresses,
      //     vault,
      //     rebalancingSetToken.address
      //   );

      //   const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
      //     coreMock,
      //     rebalancingSetToken,
      //     nextSetToken,
      //     vault
      //   );

      //   await subject();

      //   const quantityToIssue = settlementAmounts['issueAmount'];
      //   const expectedVaultBalances: BigNumber[] = [];
      //   setComponentUnits.forEach((component, idx) => {
      //     const requiredQuantityToIssue = quantityToIssue.div(setNaturalUnit).mul(component);
      //     expectedVaultBalances.push(existingVaultBalances[idx].sub(requiredQuantityToIssue));
      //   });

      //   const newVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
      //     componentAddresses,
      //     vault,
      //     rebalancingSetToken.address
      //   );
      //   expect(JSON.stringify(newVaultBalances)).to.equal(JSON.stringify(expectedVaultBalances));
      // });

      // it('updates the unitShares amount correctly', async () => {
      //   const settlementAmounts = await rebalancingHelper.getExpectedUnitSharesAndIssueAmount(
      //     coreMock,
      //     rebalancingSetToken,
      //     nextSetToken,
      //     vault
      //   );

      //   await subject();

      //   const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
      //   expect(newUnitShares).to.be.bignumber.equal(settlementAmounts['unitShares']);
      // });

      // it('clears the nextSet variable', async () => {
      //   await subject();

      //   const nextSet = await rebalancingSetToken.nextSet.callAsync();
      //   const expectedNextSet = 0;

      //   expect(nextSet).to.be.bignumber.equal(expectedNextSet);
      // });
    });

    // describe('when settleRebalance is called and there are more than minimumBid amount of sets left', async () => {
    //   beforeEach(async () => {
    //     await rebalancingHelper.defaultTransitionToRebalanceAsync(
    //       coreMock,
    //       rebalancingComponentWhiteList,
    //       rebalancingSetToken,
    //       nextSetToken,
    //       constantAuctionPriceCurve.address,
    //       managerAccount
    //     );
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });

    // describe("when settleRebalance is called but issuable amount is less than nextSet's natural unit", async () => {
    //   before(async () => {
    //     setTokenNaturalUnits = [new BigNumber(10 ** 14), new BigNumber(10 ** 14)];
    //   });

    //   after(async () => {
    //     setTokenNaturalUnits = undefined;
    //   });

    //   beforeEach(async () => {
    //     await rebalancingHelper.defaultTransitionToRebalanceAsync(
    //       coreMock,
    //       rebalancingComponentWhiteList,
    //       rebalancingSetToken,
    //       nextSetToken,
    //       constantAuctionPriceCurve.address,
    //       managerAccount
    //     );

    //     const newPrice = new BigNumber(8 * 10 ** 7);
    //     await constantAuctionPriceCurve.updatePrice.sendTransactionAsync(newPrice);

    //     const bidQuantity = rebalancingSetQuantityToIssue;
    //     await rebalancingHelper.placeBidAsync(
    //       rebalanceAuctionModule,
    //       rebalancingSetToken.address,
    //       bidQuantity,
    //     );
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });

    // describe('when settleRebalance is called but unitShares is 0', async () => {
    //   before(async () => {
    //     rebalancingSetUnitShares = new BigNumber(1);
    //     setTokenNaturalUnits = [new BigNumber(10 ** 14), new BigNumber(10 ** 14)];
    //     baseSetQuantityToIssue = new BigNumber(10 ** 27);
    //     rebalancingSetQuantityToIssue = new BigNumber(10 ** 27);
    //   });

    //   after(async () => {
    //     rebalancingSetUnitShares = undefined;
    //     setTokenNaturalUnits = undefined;
    //     baseSetQuantityToIssue = undefined;
    //     rebalancingSetQuantityToIssue = ether(7);
    //   });

    //   beforeEach(async () => {
    //     await rebalancingHelper.defaultTransitionToRebalanceAsync(
    //       coreMock,
    //       rebalancingComponentWhiteList,
    //       rebalancingSetToken,
    //       nextSetToken,
    //       constantAuctionPriceCurve.address,
    //       managerAccount
    //     );

    //     const newPrice = new BigNumber(1001);
    //     await constantAuctionPriceCurve.updatePrice.sendTransactionAsync(newPrice);

    //     const bidQuantity = rebalancingSetQuantityToIssue.div(10 ** 10);
    //     await rebalancingHelper.placeBidAsync(
    //       rebalanceAuctionModule,
    //       rebalancingSetToken.address,
    //       bidQuantity,
    //     );
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });

    // describe('when settleRebalance is called from Drawdown State', async () => {
    //   beforeEach(async () => {
    //     await rebalancingHelper.defaultTransitionToRebalanceAsync(
    //       coreMock,
    //       rebalancingComponentWhiteList,
    //       rebalancingSetToken,
    //       nextSetToken,
    //       constantAuctionPriceCurve.address,
    //       managerAccount
    //     );

    //     const defaultTimeToPivot = new BigNumber(100000);
    //     await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

    //     const [bidQuantity] = await rebalancingSetToken.biddingParameters.callAsync();
    //     await rebalancingHelper.placeBidAsync(
    //       rebalanceAuctionModule,
    //       rebalancingSetToken.address,
    //       bidQuantity,
    //     );

    //     await rebalancingHelper.endFailedRebalanceAsync(
    //       rebalancingSetToken
    //     );
    //   });

    //   it('should revert', async () => {
    //     await expectRevertError(subject());
    //   });
    // });
  });


});
