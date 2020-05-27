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
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  FixedFeeCalculatorContract,
  LinearAuctionLiquidatorContract,
  OracleWhiteListContract,
  SetTokenContract,
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
import { ether, gWei } from '@utils/units';
import {
  DEFAULT_GAS,
  EMPTY_BYTESTRING,
  ONE_DAY_IN_SECONDS,
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

contract('RebalancingSetV2 - LinearAuctionLiquidator', accounts => {
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
  let setTokenFactory: SetTokenFactoryContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let rebalancingFactory: RebalancingSetTokenV2FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorWhitelist: WhiteListContract;
  let liquidator: LinearAuctionLiquidatorContract;
  let fixedFeeCalculator: FixedFeeCalculatorContract;
  let feeCalculatorWhitelist: WhiteListContract;

  let name: string;
  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;
  let oracleWhiteList: OracleWhiteListContract;

  let component1: StandardTokenMockContract;
  let component2: StandardTokenMockContract;
  let component3: StandardTokenMockContract;

  let component1Price: BigNumber;
  let component2Price: BigNumber;
  let component3Price: BigNumber;

  let set1: SetTokenContract;
  let set2: SetTokenContract;

  let set1Components: Address[];
  let set2Components: Address[];

  let set1Units: BigNumber[];
  let set2Units: BigNumber[];

  let set1NaturalUnit: BigNumber;
  let set2NaturalUnit: BigNumber;

  let customSet1NaturalUnit: BigNumber;
  let customSet2NaturalUnit: BigNumber;

  let component1Oracle: UpdatableOracleMockContract;
  let component2Oracle: UpdatableOracleMockContract;
  let component3Oracle: UpdatableOracleMockContract;

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
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    rebalanceAuctionModule = await coreHelper.deployRebalanceAuctionModuleAsync(coreMock, vault);
    await coreHelper.addModuleAsync(coreMock, rebalanceAuctionModule.address);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    liquidatorWhitelist = await coreHelper.deployWhiteListAsync();
    feeCalculatorWhitelist = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhitelist.address,
      feeCalculatorWhitelist.address,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    component1 = await erc20Helper.deployTokenAsync(deployerAccount);
    component2 = await erc20Helper.deployTokenAsync(deployerAccount);
    component3 = await erc20Helper.deployTokenAsync(deployerAccount);
    await coreHelper.addTokensToWhiteList(
      [component1.address, component2.address, component3.address],
      rebalancingComponentWhiteList,
    );
    await erc20Helper.approveTransfersAsync(
      [component1, component2, component3],
      transferProxy.address
    );

    set1Components = [component1.address, component2.address];
    set1Units = [gWei(1), gWei(1)];
    set1NaturalUnit = customSet1NaturalUnit || gWei(1);
    set1 = await coreHelper.createSetTokenAsync(
      coreMock,
      setTokenFactory.address,
      set1Components,
      set1Units,
      set1NaturalUnit,
    );

    set2Components = [component1.address, component2.address];
    set2Units = [gWei(1), gWei(2)];
    set2NaturalUnit = customSet2NaturalUnit || gWei(2);
    set2 = await coreHelper.createSetTokenAsync(
      coreMock,
      setTokenFactory.address,
      set2Components,
      set2Units,
      set2NaturalUnit,
    );

    component1Price = ether(1);
    component2Price = ether(2);
    component3Price = ether(1);

    component1Oracle = await oracleHelper.deployUpdatableOracleMockAsync(component1Price);
    component2Oracle = await oracleHelper.deployUpdatableOracleMockAsync(component2Price);
    component3Oracle = await oracleHelper.deployUpdatableOracleMockAsync(component3Price);

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [component1.address, component2.address, component3.address],
      [component1Oracle.address, component2Oracle.address, component3Oracle.address],
    );

    auctionPeriod = ONE_DAY_IN_SECONDS;
    rangeStart = new BigNumber(10); // 10% above fair value
    rangeEnd = new BigNumber(10); // 10% below fair value
    name = 'liquidator';

    liquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
      coreMock.address,
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      name,
    );
    await coreHelper.addAddressToWhiteList(liquidator.address, liquidatorWhitelist);

    fixedFeeCalculator = await feeCalculatorHelper.deployFixedFeeCalculatorAsync();
    await coreHelper.addAddressToWhiteList(fixedFeeCalculator.address, feeCalculatorWhitelist);
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

    beforeEach(async () => {
      currentSetToken = set1;
      nextSetToken = set2;

      failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

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
      subjectLiquidatorData = EMPTY_BYTESTRING;
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

        const actualStartingCurrentSetAmount = await liquidator.startingCurrentSets.callAsync(
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

      describe('when the union of currentSet and nextSet is not 2 components', async () => {
        beforeEach(async () => {
          const set3Components = [component1.address, component3.address];
          const set3Units = [gWei(1), gWei(1)];
          const set3NaturalUnit = customSet1NaturalUnit || gWei(1);
          const set3 = await coreHelper.createSetTokenAsync(
            coreMock,
            setTokenFactory.address,
            set3Components,
            set3Units,
            set3NaturalUnit,
          );

          subjectNextSet = set3.address;
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

      describe('when the nextSet is not approved by Core', async () => {
        beforeEach(async () => {
          subjectNextSet = fakeTokenAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe("when the new set's natural unit is not a multiple of the current set", async () => {
        before(async () => {
          // a setToken with natural unit ether(.003) and setToken with natural unit ether(.002) are being used
          customSet1NaturalUnit = ether(.002);
          customSet2NaturalUnit = ether(.003);
        });

        after(async () => {
          customSet1NaturalUnit = undefined;
          customSet2NaturalUnit = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when startRebalance is called from Rebalance state', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingHelper.transitionToRebalanceV2Async(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          set2,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#settleRebalance', async () => {
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let rebalancingSetQuantityToIssue: BigNumber;
    let currentSetIssueQuantity: BigNumber;

    beforeEach(async () => {
      currentSetToken = set1;
      nextSetToken = set2;

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
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
      return rebalancingSetToken.settleRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

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
  });

  describe('#failRebalance', async () => {
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let rebalancingSetQuantityToIssue: BigNumber = ether(7);
    let currentSetIssueQuantity: BigNumber;

    let failPeriod: BigNumber;

    beforeEach(async () => {
      currentSetToken = set1;
      nextSetToken = set2;

      failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
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
            const nextSetIssueQuantity = await rebalancingHelper.getSetIssueQuantity(
              currentSetToken,
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

            const minimumBid = await liquidator.minimumBid.callAsync(rebalancingSetToken.address);
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
    });
  });
});
