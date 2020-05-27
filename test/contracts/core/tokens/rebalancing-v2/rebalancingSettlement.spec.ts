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

import { getExpectedRebalanceSettledLog } from '@utils/contract_logs/rebalancingSetTokenV2';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('SettleRebalance', accounts => {
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
  let fixedFeeCalculator: FixedFeeCalculatorContract;
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
      feeCalculatorWhitelist.address,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMockAsync();
    await coreHelper.addAddressToWhiteList(liquidatorMock.address, liquidatorWhitelist);

    fixedFeeCalculator = await feeCalculatorHelper.deployFixedFeeCalculatorAsync();
    await coreHelper.addAddressToWhiteList(fixedFeeCalculator.address, feeCalculatorWhitelist);
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

    let rebalanceFee: BigNumber;

    let customRebalancingSetQuantityToIssue: BigNumber;
    let customBaseSetQuantityToIssue: BigNumber;
    let customRebalanceFee: BigNumber;

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

      rebalanceFee = customRebalanceFee || ZERO;

      const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
      await coreHelper.addTokensToWhiteList(nextSetTokenComponentAddresses, rebalancingComponentWhiteList);

      const failPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidatorMock.address,
        feeRecipient,
        fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        rebalancingSetUnitShares,
        ZERO, // entryFee
        rebalanceFee,
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

    describe('when settleRebalance is called from Rebalance State and all currentSets are rebalanced', async () => {
      beforeEach(async () => {
       await rebalancingHelper.transitionToRebalanceV2Async(
         coreMock,
         rebalancingComponentWhiteList,
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
        const nextSetIssueAmount = await rebalancingHelper.getSetIssueQuantity(
          nextSetToken,
          rebalancingSetToken,
          vault
        );

        await subject();

        const expectedBalance = existingBalance.add(nextSetIssueAmount);
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

        const nextSetIssueAmount = await rebalancingHelper.getSetIssueQuantity(
          nextSetToken,
          rebalancingSetToken,
          vault
        );

        await subject();

        const quantityToIssue = nextSetIssueAmount;
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
        const expectedUnitShares = await rebalancingHelper.getExpectedUnitSharesV2(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(expectedUnitShares);
      });

      it('clears the nextSet variable', async () => {
        await subject();

        const nextSet = await rebalancingSetToken.nextSet.callAsync();
        const expectedNextSet = 0;

        expect(nextSet).to.be.bignumber.equal(expectedNextSet);
      });
    });

    describe('when the rebalance fee is 10%', async () => {
      before(async () => {
        customRebalanceFee = new BigNumber(10 ** 17);
      });

      after(async () => {
        customRebalanceFee = undefined;
      });

      beforeEach(async () => {
       await rebalancingHelper.transitionToRebalanceV2Async(
         coreMock,
         rebalancingComponentWhiteList,
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

      it('mints the correct Rebalancing Set to the feeRecipient', async () => {
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalanceFeeInflation = await rebalancingHelper.calculateRebalanceFeeInflation(
          rebalanceFee,
          previousSupply
        );

        await subject();

        const feeRecipientBalance = await rebalancingSetToken.balanceOf.callAsync(feeRecipient);
        expect(feeRecipientBalance).to.bignumber.equal(rebalanceFeeInflation);
      });

      it('increments the totalSupply properly', async () => {
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const rebalanceFeeInflation = await rebalancingHelper.calculateRebalanceFeeInflation(
          rebalanceFee,
          previousSupply
        );
        const expectedSupply = previousSupply.plus(rebalanceFeeInflation);

        await subject();

        const newSupply = await rebalancingSetToken.totalSupply.callAsync(feeRecipient);
        expect(newSupply).to.bignumber.equal(expectedSupply);
      });

      it('emits the RebalanceSettled log', async () => {
        const feePercentage = await rebalancingSetToken.rebalanceFee.callAsync();
        const previousSupply = await rebalancingSetToken.totalSupply.callAsync();
        const feeQuantity = await rebalancingHelper.calculateRebalanceFeeInflation(
          feePercentage,
          previousSupply
        );
        const unitShares = await rebalancingHelper.getExpectedUnitSharesV2(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );
        const rebalanceIndex = await rebalancingSetToken.rebalanceIndex.callAsync();

        const issueQuantity = await rebalancingHelper.getSetIssueQuantity(
          nextSetToken,
          rebalancingSetToken,
          vault
        );

        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRebalanceSettledLog(
          feeRecipient,
          feeQuantity,
          feePercentage,
          rebalanceIndex,
          issueQuantity,
          unitShares,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      it('updates the unitShares amount correctly', async () => {
        const unitShares = await rebalancingHelper.getExpectedUnitSharesV2(
          coreMock,
          rebalancingSetToken,
          nextSetToken,
          vault
        );

        await subject();

        const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
        expect(newUnitShares).to.be.bignumber.equal(unitShares);
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
         rebalancingComponentWhiteList,
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

});
