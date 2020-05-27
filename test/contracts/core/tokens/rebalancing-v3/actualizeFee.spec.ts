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
  FixedFeeCalculatorMockContract,
  SetTokenContract,
  LiquidatorMockContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenV3Contract,
  RebalancingSetTokenV3FactoryContract,
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
import { RebalancingSetV3Helper } from '@utils/helpers/rebalancingSetV3Helper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

import { getExpectedIncentiveFeePaidLog } from '@utils/contract_logs/rebalancingSetTokenV3';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('RebalancingSetTokenV3: Actualize Fee', accounts => {
  const [
    deployerAccount,
    managerAccount,
    feeRecipient,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV3Contract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let factory: SetTokenFactoryContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let rebalancingFactory: RebalancingSetTokenV3FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorWhitelist: WhiteListContract;
  let liquidatorMock: LiquidatorMockContract;
  let fixedFeeCalculator: FixedFeeCalculatorMockContract;
  let feeCalculatorWhitelist: WhiteListContract;

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
  const feeCalculatorHelper = new FeeCalculatorHelper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(RebalancingSetTokenV3Contract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetTokenV3Contract.getAbi());
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

    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV3FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhitelist.address,
      feeCalculatorWhitelist.address,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMockAsync();
    await coreHelper.addAddressToWhiteList(liquidatorMock.address, liquidatorWhitelist);

    fixedFeeCalculator = await feeCalculatorHelper.deployFixedFeeCalculatorMockAsync();
    await coreHelper.addAddressToWhiteList(fixedFeeCalculator.address, feeCalculatorWhitelist);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#actualizeFee', async () => {
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    let rebalancingSetQuantityToIssue: BigNumber;
    let currentSetIssueQuantity: BigNumber;

    let rebalanceFee: BigNumber;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
        undefined
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      rebalanceFee = new BigNumber(10 ** 17);

      const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
      await coreHelper.addTokensToWhiteList(nextSetTokenComponentAddresses, rebalancingComponentWhiteList);

      const failPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV3Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidatorMock.address,
        feeRecipient,
        fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        undefined,
        ZERO, // entryFee
        rebalanceFee,
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
      return rebalancingSetToken.actualizeFee.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

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

      const txHash = await subject();

      const unitShares = await rebalancingHelper.getExpectedIncentiveFeeUnitShares(
        rebalancingSetToken,
        currentSetToken,
        vault
      );
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = getExpectedIncentiveFeePaidLog(
        feeRecipient,
        feeQuantity,
        feePercentage,
        unitShares,
        rebalancingSetToken.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    it('updates the unitShares amount correctly', async () => {
      await subject();

      const unitShares = await rebalancingHelper.getExpectedIncentiveFeeUnitShares(
        rebalancingSetToken,
        currentSetToken,
        vault
      );
      const newUnitShares = await rebalancingSetToken.unitShares.callAsync();
      expect(newUnitShares).to.be.bignumber.equal(unitShares);
    });

    it('properly calls the updateAndGetFee function', async () => {
      await subject();

      const isCalled = await fixedFeeCalculator.isCalled.callAsync();
      expect(isCalled).to.equal(true);
    });

    describe('when actualizeFee is called but unitShares is 0', async () => {
      beforeEach(async () => {
       await coreMock.redeem.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when actualizeFee is called from Rebalance State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToRebalanceV2Async(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          nextSetToken,
          managerAccount,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when actualizeFee is called from Drawdown State', async () => {
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
