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
} from '@utils/constants';
import {
  getExpectedRebalanceStartedLog,
} from '@utils/contract_logs/rebalancingSetTokenV2';
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


  describe('#startRebalance', async () => {
    let subjectCaller: Address;
    let subjectNextSet: Address;
    let subjectLiquidatorData: string;
    let subjectTimeFastForward: BigNumber;
    let failPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetQuantityToIssue: BigNumber;
    let naturalUnits: BigNumber[];

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        naturalUnits || undefined,
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
      await coreMock.issue.sendTransactionAsync(
        currentSetToken.address,
        ether(8),
        {from: deployerAccount}
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      subjectCaller = managerAccount;
      subjectNextSet = nextSetToken.address;
      subjectLiquidatorData = fakeTokenAccount;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return rebalancingSetToken.startRebalance.sendTransactionAsync(
        subjectNextSet,
        subjectLiquidatorData,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when startRebalance is called from Default State', async () => {
      it('updates to the nextSet correctly', async () => {
        await subject();

        const newRebalacingSet = await rebalancingSetToken.nextSet.callAsync();
        expect(newRebalacingSet).to.equal(subjectNextSet);
      });

      it('updates the rebalanceState to Rebalance', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.REBALANCE);
      });

      it('updates the rebalanceStartTime to the latest timestamp', async () => {
        await subject();

        const { timestamp } = await web3.eth.getBlock('latest');

        const rebalanceStartTime = await rebalancingSetToken.rebalanceStartTime.callAsync();
        expect(rebalanceStartTime).to.be.bignumber.equal(timestamp);
      });

      it('emits the correct RebalanceStarted event', async () => {
        const txHash = await subject();

        const rebalanceIndex = await rebalancingSetToken.rebalanceIndex.callAsync();
          const currentSetAmount = await liquidatorMock.startingCurrentSets.callAsync(
          rebalancingSetToken.address
        );

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedRebalanceStartedLog(
          currentSetToken.address,
          nextSetToken.address,
          rebalanceIndex,
          currentSetAmount,
          rebalancingSetToken.address,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      it('sends the correct startingCurrentSetAmount to the liquidator', async () => {
        await subject();

        const startingCurrentSetAmount = rebalancingSetQuantityToIssue;

        const actualStartingCurrentSetAmount = await liquidatorMock.startingCurrentSets.callAsync(
          rebalancingSetToken.address
        );
        expect(actualStartingCurrentSetAmount).to.be.bignumber.equal(startingCurrentSetAmount);
      });

      it('sends the correct currentSet to the liquidator', async () => {
        await subject();

        const currentSet = await liquidatorMock.currentSet.callAsync();
        expect(currentSet).to.equal(currentSetToken.address);
      });

      it('sends the correct nextSet to the liquidator', async () => {
        await subject();

        const nextSet = await liquidatorMock.nextSet.callAsync();
        expect(nextSet).to.equal(nextSetToken.address);
      });

      it('sends the correct liquidatorData to the liquidator', async () => {
        await subject();

        const liquidatorData = await liquidatorMock.liquidatorData.callAsync();
        expect(liquidatorData).to.equal(subjectLiquidatorData.toLowerCase());
      });

      it('redeemsInVault the currentSet', async () => {
        const supply = await vault.getOwnerBalance.callAsync(currentSetToken.address, rebalancingSetToken.address);
        const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();
        const currentSetTokenBalance = await vault.balances.callAsync(
          currentSetToken.address,
          rebalancingSetToken.address
        );

        await subject();

        const expectedRedeemableCurrentSets = supply.div(currentSetNaturalUnit).round(0, 3).mul(currentSetNaturalUnit);
        const expectedCurrentSetTokenBalance = currentSetTokenBalance.sub(expectedRedeemableCurrentSets);
        const actualCurrentSetTokenBalance = await vault.balances.callAsync(
          currentSetToken.address,
          rebalancingSetToken.address
        );
        expect(actualCurrentSetTokenBalance).to.be.bignumber.equal(expectedCurrentSetTokenBalance);
      });

      it('increments the balances of the currentSet components back to the rebalancingSetToken', async () => {
        const components = await currentSetToken.getComponents.callAsync();
        const naturalUnit = await currentSetToken.naturalUnit.callAsync();
        const componentUnits = await currentSetToken.getUnits.callAsync();

        const existingVaultBalancePromises = _.map(components, component =>
          vault.balances.callAsync(component, rebalancingSetToken.address),
        );
        const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

        await subject();

        const actualStartingCurrentSetAmount = await liquidatorMock.startingCurrentSets.callAsync(
          rebalancingSetToken.address
        );
        const expectedVaultBalances = _.map(components, (component, idx) => {
          const requiredQuantityToRedeem = actualStartingCurrentSetAmount.div(naturalUnit).mul(componentUnits[idx]);
          return existingVaultBalances[idx].add(requiredQuantityToRedeem);
        });

        const newVaultBalancesPromises = _.map(components, component =>
          vault.balances.callAsync(component, rebalancingSetToken.address),
        );
        const newVaultBalances = await Promise.all(newVaultBalancesPromises);

        _.map(components, (component, idx) =>
          expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
        );
      });

      describe('when remainingCurrentSetToken amount is not multiple of currentSetToken', async () => {
        beforeEach(async () => {
          await coreMock.deposit.sendTransactionAsync(currentSetToken.address, ether(1), {from: deployerAccount});
          await coreMock.internalTransfer.sendTransactionAsync(
            currentSetToken.address,
            rebalancingSetToken.address,
            new BigNumber(1)
          );
        });

        it('redeemsInVault the currentSet properly', async () => {
          const supply = await vault.getOwnerBalance.callAsync(currentSetToken.address, rebalancingSetToken.address);
          const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();
          const currentSetTokenBalance = await vault.balances.callAsync(
            currentSetToken.address,
            rebalancingSetToken.address
          );

          await subject();

          const expectedRedeemableCurrentSets = supply.div(currentSetNaturalUnit).round(0, 3).mul(
            currentSetNaturalUnit
          );
          const expectedCurrentSetTokenBalance = currentSetTokenBalance.sub(expectedRedeemableCurrentSets);
          const actualCurrentSetTokenBalance = await vault.balances.callAsync(
            currentSetToken.address,
            rebalancingSetToken.address
          );

          expect(actualCurrentSetTokenBalance).to.be.bignumber.equal(expectedCurrentSetTokenBalance);
          expect(currentSetTokenBalance.mod(currentSetNaturalUnit)).to.be.bignumber.not.equal(new BigNumber(0));
        });
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

      describe('when the rebalancing set supply is 0', async () => {
        beforeEach(async () => {
          // Redeem all supply
          await coreMock.redeem.sendTransactionAsync(
            rebalancingSetToken.address,
            rebalancingSetQuantityToIssue
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

      describe('when the new nextSet is not approved by Core', async () => {
        beforeEach(async () => {
          subjectNextSet = fakeTokenAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe("when the new new set's natural unit is not a multiple of the current set", async () => {
        before(async () => {
          // a setToken with natural unit ether(.003) and setToken with natural unit ether(.002) are being used
          naturalUnits = [ether(.002), ether(.003)];
        });

        after(async () => {
          naturalUnits = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when startRebalance is called from Rebalance State', async () => {
      beforeEach(async () => {
       await rebalancingHelper.transitionToRebalanceV2Async(
         coreMock,
         rebalancingComponentWhiteList,
         rebalancingSetToken,
         nextSetToken,
         managerAccount
       );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when startRebalance is called from Drawdown State', async () => {
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
