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
  TWAPLiquidatorContract,
  SetTokenContract,
  RebalancingSetTokenV3Contract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether, gWei } from '@utils/units';
import { AssetChunkSizeBounds } from '@utils/auction';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV3Helper } from '@utils/helpers/rebalancingSetV3Helper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { RebalanceTestSetup } from '@utils/helpers/rebalanceTestSetup';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('RebalancingSetV3 - LinearAuctionLiquidator', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    fakeTokenAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV3Contract;

  let liquidatorWhitelist: WhiteListContract;
  let liquidator: TWAPLiquidatorContract;

  let name: string;
  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;

  let assetPairHashes: string[];
  let assetPairBounds: AssetChunkSizeBounds[];

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV3Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper, valuationHelper);

  const scenario = new RebalanceTestSetup(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    await scenario.initialize();

    auctionPeriod = ONE_DAY_IN_SECONDS;
    rangeStart = new BigNumber(10); // 10% above fair value
    rangeEnd = new BigNumber(10); // 10% below fair value
    name = 'liquidator';

    assetPairHashes = [
      liquidatorHelper.generateAssetPairHashes(scenario.component1.address, scenario.component2.address),
      liquidatorHelper.generateAssetPairHashes(scenario.component2.address, scenario.component3.address),
    ];
    assetPairBounds = [
      {min: ZERO, max: ether(10 ** 10)},
      {min: ZERO, max: ether(10 ** 10)},
    ];

    liquidator = await liquidatorHelper.deployTWAPLiquidatorAsync(
      scenario.core.address,
      scenario.oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairHashes,
      assetPairBounds,
      name,
    );
    await coreHelper.addAddressToWhiteList(liquidator.address, scenario.liquidatorWhitelist);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#startRebalance', async () => {
    let usdChunkSize: BigNumber;
    let chunkAuctionPeriod: BigNumber;

    let subjectCaller: Address;
    let subjectNextSet: Address;
    let subjectLiquidatorData: string;
    let subjectTimeFastForward: BigNumber;
    let failPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let rebalancingSetQuantityToIssue: BigNumber;

    beforeEach(async () => {
      currentSetToken = scenario.set1;
      nextSetToken = scenario.set2;

      failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV3Async(
        scenario.core,
        scenario.rebalancingFactory.address,
        managerAccount,
        liquidator.address,
        feeRecipient,
        scenario.fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      await scenario.core.issue.sendTransactionAsync(
        currentSetToken.address,
        ether(8),
        {from: deployerAccount}
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], scenario.transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(7);
      await scenario.core.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      usdChunkSize = ether(10 ** 5);
      chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;

      subjectLiquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
        usdChunkSize,
        chunkAuctionPeriod,
      );

      subjectCaller = managerAccount;
      subjectNextSet = nextSetToken.address;
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
        const supply = await scenario.vault.getOwnerBalance.callAsync(currentSetToken.address, rebalancingSetToken.address);
        const currentSetNaturalUnit = await currentSetToken.naturalUnit.callAsync();
        const currentSetTokenBalance = await scenario.vault.balances.callAsync(
          currentSetToken.address,
          rebalancingSetToken.address
        );

        await subject();

        const expectedRedeemableCurrentSets = supply.div(currentSetNaturalUnit).round(0, 3).mul(currentSetNaturalUnit);
        const expectedCurrentSetTokenBalance = currentSetTokenBalance.sub(expectedRedeemableCurrentSets);
        const actualCurrentSetTokenBalance = await scenario.vault.balances.callAsync(
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
          scenario.vault.balances.callAsync(component, rebalancingSetToken.address),
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
          scenario.vault.balances.callAsync(component, rebalancingSetToken.address),
        );
        const newVaultBalances = await Promise.all(newVaultBalancesPromises);

        _.map(components, (component, idx) =>
          expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
        );
      });

      describe('when one of the components in the next set is not on the whitelist', async () => {
        beforeEach(async () => {
          const nextSetComponents = await nextSetToken.getComponents.callAsync();
          await scenario.rebalancingComponentWhiteList.removeAddress.sendTransactionAsync(
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
          const set3Components = [scenario.component1.address, scenario.component3.address];
          const set3Units = [gWei(1), gWei(1)];
          const set3NaturalUnit = new BigNumber(10 ** 13);
          const set3 = await coreHelper.createSetTokenAsync(
            scenario.core,
            scenario.setTokenFactory.address,
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
    });
  });

  describe('#settleRebalance', async () => {
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let rebalancingSetQuantityToIssue: BigNumber;
    let currentSetIssueQuantity: BigNumber;

    beforeEach(async () => {
      currentSetToken = scenario.set1;
      nextSetToken = scenario.set2;

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV3Async(
        scenario.core,
        scenario.rebalancingFactory.address,
        managerAccount,
        liquidator.address,
        feeRecipient,
        scenario.fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      // Issue currentSetToken
      currentSetIssueQuantity = ether(8);
      await scenario.core.issue.sendTransactionAsync(
        currentSetToken.address,
        currentSetIssueQuantity,
        {from: deployerAccount}
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], scenario.transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      rebalancingSetQuantityToIssue = ether(7);
      await scenario.core.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.settleRebalance.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when settleRebalance is called from Rebalance State and all currentSets are rebalanced', async () => {
      let liquidatorData: string;
      let usdChunkSize: BigNumber;
      let chunkAuctionPeriod: BigNumber;

      beforeEach(async () => {
        // Should only be one chunk auction
        usdChunkSize = ether(10 ** 10); // max value
        chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;

        liquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
          usdChunkSize,
          chunkAuctionPeriod,
        );

       await rebalancingHelper.transitionToRebalanceV2Async(
         scenario.core,
         scenario.rebalancingComponentWhiteList,
         rebalancingSetToken,
         nextSetToken,
         managerAccount,
         liquidatorData,
       );

        const bidQuantity = rebalancingSetQuantityToIssue;

        await rebalancingHelper.placeBidAsync(
          scenario.rebalanceAuctionModule,
          rebalancingSetToken.address,
          bidQuantity,
        );
      });

      it('updates the rebalanceState to Default', async () => {
        await subject();

        const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
        expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
      });
    });
  });

});
