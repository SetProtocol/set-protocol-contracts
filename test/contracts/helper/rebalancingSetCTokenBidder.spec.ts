require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address, SetProtocolTestUtils as SetTestUtils } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  BadCTokenMockContract,
  ConstantAuctionPriceCurveContract,
  CoreMockContract,
  RebalanceAuctionModuleMockContract,
  RebalancingSetCTokenBidderContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  RebalancingSetTokenV3Contract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  TWAPLiquidatorContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DIVISOR,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  ONE_HOUR_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { BidPlacedCToken } from '@utils/contract_logs/rebalancingSetCTokenBidder';

import {
  getLinearAuction
} from '@utils/auction';
import { CoreHelper } from '@utils/helpers/coreHelper';
import { CompoundHelper } from '@utils/helpers/compoundHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { OracleHelper } from 'set-protocol-oracles';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { RebalancingSetV3Helper } from '@utils/helpers/rebalancingSetV3Helper';
import { RebalanceTestSetup } from '@utils/helpers/rebalanceTestSetup';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { RebalancingSetBidderHelper } from '@utils/helpers/rebalancingSetBidderHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;

contract('RebalancingSetCTokenBidder', accounts => {
  const [
    deployerAccount,
    managerAccount,
    feeRecipient,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModuleMock: RebalanceAuctionModuleMockContract;
  let factory: SetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
  let constantAuctionPriceCurve: ConstantAuctionPriceCurveContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const compoundHelper = new CompoundHelper(deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV3Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const rebalancingSetBidderHelper = new RebalancingSetBidderHelper(deployerAccount);
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper, valuationHelper);

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(RebalanceAuctionModuleMockContract.getAbi());
    ABIDecoder.addABI(RebalancingSetCTokenBidderContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);
    rebalanceAuctionModuleMock = await coreHelper.deployRebalanceAuctionModuleMockAsync(coreMock, vault);
    await coreHelper.addModuleAsync(coreMock, rebalanceAuctionModuleMock.address);

    factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );
    constantAuctionPriceCurve = await rebalancingHelper.deployConstantAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_NUMERATOR,
      DEFAULT_AUCTION_PRICE_DIVISOR,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
    await rebalancingHelper.addPriceLibraryAsync(coreMock, constantAuctionPriceCurve);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalanceAuctionModuleMockContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetCTokenBidderContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let cUSDCInstance: StandardTokenMockContract;
    let usdcInstance: StandardTokenMockContract;
    let cDAIInstance: StandardTokenMockContract;
    let daiInstance: StandardTokenMockContract;

    let rebalancingSetCTokenBidder: RebalancingSetCTokenBidderContract;
    let dataDescription: string;

    before(async () => {
      // Set up Compound USDC token
      usdcInstance = await erc20Helper.deployTokenAsync(
        deployerAccount,
        6,
      );
      const cUSDCAddress = await compoundHelper.deployMockCUSDC(usdcInstance.address, deployerAccount);
      await compoundHelper.enableCToken(cUSDCAddress);
      // Set the Borrow Rate
      await compoundHelper.setBorrowRate(cUSDCAddress, new BigNumber('43084603999'));

      await erc20Helper.approveTransferAsync(
        usdcInstance,
        cUSDCAddress,
        deployerAccount
      );
      cUSDCInstance = await erc20Helper.getTokenInstanceAsync(cUSDCAddress);

      // Set up Compound DAI token
      daiInstance = await erc20Helper.deployTokenAsync(
        deployerAccount,
        18,
      );
      const cDAIAddress = await compoundHelper.deployMockCDAI(daiInstance.address, deployerAccount);
      await compoundHelper.enableCToken(cDAIAddress);
      // Set the Borrow Rate
      await compoundHelper.setBorrowRate(cDAIAddress, new BigNumber('29313252165'));

      await erc20Helper.approveTransferAsync(
        daiInstance,
        cDAIAddress,
        deployerAccount
      );
      cDAIInstance = await erc20Helper.getTokenInstanceAsync(cDAIAddress);
      dataDescription = 'cDAI cUSDC Bidder Contract';

      rebalancingSetCTokenBidder = await rebalancingSetBidderHelper.deployRebalancingSetCTokenBidderAsync(
        rebalanceAuctionModuleMock.address,
        transferProxy.address,
        [cUSDCInstance.address, cDAIInstance.address],
        [usdcInstance.address, daiInstance.address],
        dataDescription,
      );
    });

    it('should contain the correct address of the rebalance auction module', async () => {
      const actualRebalanceAuctionModuleAddress = await rebalancingSetCTokenBidder.rebalanceAuctionModule.callAsync();
      expect(actualRebalanceAuctionModuleAddress).to.equal(rebalanceAuctionModuleMock.address);
    });

    it('should contain the correct address of the transfer proxy', async () => {
      const actualProxyAddress = await rebalancingSetCTokenBidder.transferProxy.callAsync();

      expect(actualProxyAddress).to.equal(transferProxy.address);
    });

    it('should contain the correct cTokens to underlying', async () => {
      const actualDAIAddress = await rebalancingSetCTokenBidder.cTokenToUnderlying.callAsync(cDAIInstance.address);
      const actualUSDCAddress = await rebalancingSetCTokenBidder.cTokenToUnderlying.callAsync(cUSDCInstance.address);
      expect(actualDAIAddress).to.equal(daiInstance.address);
      expect(actualUSDCAddress).to.equal(usdcInstance.address);
    });

    it('should contain the correct data description', async () => {
      const actualDataDescription = await rebalancingSetCTokenBidder.dataDescription.callAsync();

      expect(actualDataDescription).to.equal(dataDescription);
    });

    it('should have unlimited allowance for underlying to cToken contract', async () => {
      const underlyingUSDCAllowance = await usdcInstance.allowance.callAsync(
        rebalancingSetCTokenBidder.address,
        cUSDCInstance.address,
      );
      const underlyingDAIAllowance = await daiInstance.allowance.callAsync(
        rebalancingSetCTokenBidder.address,
        cDAIInstance.address,
      );
      const expectedUnderlyingAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(underlyingUSDCAllowance).to.bignumber.equal(expectedUnderlyingAllowance);
      expect(underlyingDAIAllowance).to.bignumber.equal(expectedUnderlyingAllowance);
    });

    it('should have unlimited allowance for cToken to transferProxy contract', async () => {
      const cUSDCAllowance = await cUSDCInstance.allowance.callAsync(
        rebalancingSetCTokenBidder.address,
        transferProxy.address,
      );
      const cDAIAllowance = await cUSDCInstance.allowance.callAsync(
        rebalancingSetCTokenBidder.address,
        transferProxy.address,
      );
      const expectedCTokenAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(cUSDCAllowance).to.bignumber.equal(expectedCTokenAllowance);
      expect(cDAIAllowance).to.bignumber.equal(expectedCTokenAllowance);
    });

    describe('when cToken array and underlying array are not the same length', async () => {
      it('should revert', async () => {
        await expectRevertError(
          rebalancingSetBidderHelper.deployRebalancingSetCTokenBidderAsync(
            rebalanceAuctionModuleMock.address,
            transferProxy.address,
            [cUSDCInstance.address], // Missing cDAI address
            [usdcInstance.address, daiInstance.address],
            dataDescription,
          )
        );
      });
    });
  });

  describe('#bidAndWithdraw', async () => {
    let cUSDCInstance: StandardTokenMockContract;
    let usdcInstance: StandardTokenMockContract;
    let cDAIInstance: StandardTokenMockContract;
    let daiInstance: StandardTokenMockContract;

    let rebalancingSetCTokenBidder: RebalancingSetCTokenBidderContract;
    let dataDescription: string;

    let badCUSDCInstance: BadCTokenMockContract;

    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let subjectExecutePartialQuantity: boolean;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let defaultBaseSetNaturalUnit: BigNumber;
    let defaultBaseSetComponent: StandardTokenMockContract;
    let defaultBaseSetComponent2: StandardTokenMockContract;
    let cTokenBaseSetNaturalUnit: BigNumber;
    let cTokenBaseSetComponent: StandardTokenMockContract;
    let cTokenBaseSetComponent2: StandardTokenMockContract;
    let cTokenComponentUnits: BigNumber;

    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let defaultSetToken: SetTokenContract;
    let cTokenSetToken: SetTokenContract;

    let rebalancingSetTokenQuantityToIssue: BigNumber;
    let minBid: BigNumber;

    beforeEach(async () => {
      // Set up Compound USDC token
      usdcInstance = await erc20Helper.deployTokenAsync(
        deployerAccount,
        6,
      );
      const cUSDCAddress = await compoundHelper.deployMockCUSDC(usdcInstance.address, deployerAccount);
      await compoundHelper.enableCToken(cUSDCAddress);
      // Set the Borrow Rate
      await compoundHelper.setBorrowRate(cUSDCAddress, new BigNumber('43084603999'));

      await erc20Helper.approveTransferAsync(
        usdcInstance,
        cUSDCAddress,
        deployerAccount
      );
      cUSDCInstance = badCUSDCInstance || await erc20Helper.getTokenInstanceAsync(cUSDCAddress);

      // Set up Compound DAI token
      daiInstance = await erc20Helper.deployTokenAsync(
        deployerAccount,
        18,
      );
      const cDAIAddress = await compoundHelper.deployMockCDAI(daiInstance.address, deployerAccount);
      await compoundHelper.enableCToken(cDAIAddress);
      // Set the Borrow Rate
      await compoundHelper.setBorrowRate(cDAIAddress, new BigNumber('29313252165'));

      await erc20Helper.approveTransferAsync(
        daiInstance,
        cDAIAddress,
        deployerAccount
      );
      cDAIInstance = await erc20Helper.getTokenInstanceAsync(cDAIAddress);
      dataDescription = 'cDAI cUSDC Bidder Contract';

      rebalancingSetCTokenBidder = await rebalancingSetBidderHelper.deployRebalancingSetCTokenBidderAsync(
        rebalanceAuctionModuleMock.address,
        transferProxy.address,
        [cUSDCInstance.address, cDAIInstance.address],
        [usdcInstance.address, daiInstance.address],
        dataDescription,
      );

      // ----------------------------------------------------------------------
      // Create Set with no cToken component
      // ----------------------------------------------------------------------

      // Create component tokens for default Set
      defaultBaseSetComponent = await erc20Helper.deployTokenAsync(deployerAccount);
      defaultBaseSetComponent2 = await erc20Helper.deployTokenAsync(deployerAccount);

      // Create the Set (default is 2 components)
      const defaultComponentAddresses = [
        defaultBaseSetComponent.address, defaultBaseSetComponent2.address,
      ];
      const defaultComponentUnits = [
        ether(0.01), ether(0.01),
      ];

      defaultBaseSetNaturalUnit = ether(0.001);
      defaultSetToken = await coreHelper.createSetTokenAsync(
        coreMock,
        factory.address,
        defaultComponentAddresses,
        defaultComponentUnits,
        defaultBaseSetNaturalUnit,
      );

      // ----------------------------------------------------------------------
      // Create Set with 2 cToken components
      // ----------------------------------------------------------------------

      // Create component tokens for Set containing the target cToken
      cTokenBaseSetComponent = cUSDCInstance;
      cTokenBaseSetComponent2 = cDAIInstance;

      // Create the Set (default is 2 components)
      const nextComponentAddresses = [
        cTokenBaseSetComponent.address, cTokenBaseSetComponent2.address,
      ];

      cTokenComponentUnits = ether(0.001);
      const nextComponentUnits = [
        cTokenComponentUnits, ether(1),
      ];

      cTokenBaseSetNaturalUnit = ether(0.0001);
      cTokenSetToken = await coreHelper.createSetTokenAsync(
        coreMock,
        factory.address,
        nextComponentAddresses,
        nextComponentUnits,
        cTokenBaseSetNaturalUnit,
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSetCTokenBidder.bidAndWithdraw.sendTransactionAsync(
        subjectRebalancingSetToken,
        subjectQuantity,
        subjectExecutePartialQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );
    }

    describe('when target cToken is an inflow in a bid', async () => {
      beforeEach(async () => {
        // Create the Rebalancing Set without cToken component
        proposalPeriod = ONE_DAY_IN_SECONDS;
        rebalancingUnitShares = ether(1);
        rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
          coreMock,
          rebalancingFactory.address,
          managerAccount,
          defaultSetToken.address,
          proposalPeriod,
          rebalancingUnitShares
        );

        // Approve tokens and issue defaultSetToken
        const baseSetIssueQuantity = ether(1);

        await erc20Helper.approveTransfersAsync([
          defaultBaseSetComponent,
          defaultBaseSetComponent2,
        ], transferProxy.address);

        await coreMock.issue.sendTransactionAsync(
          defaultSetToken.address,
          baseSetIssueQuantity,
          {from: deployerAccount}
        );

        // Use issued defaultSetToken to issue rebalancingSetToken
        await erc20Helper.approveTransfersAsync([defaultSetToken], transferProxy.address);
        rebalancingSetTokenQuantityToIssue = baseSetIssueQuantity
          .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
          .div(rebalancingUnitShares);

        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);
        // Determine minimum bid
        const decOne = await defaultSetToken.naturalUnit.callAsync();
        const decTwo = await cTokenSetToken.naturalUnit.callAsync();
        minBid = new BigNumber(Math.max(decOne.toNumber(), decTwo.toNumber()) * 1000);

        subjectCaller = deployerAccount;
        subjectQuantity = minBid;
        subjectRebalancingSetToken = rebalancingSetToken.address;
        subjectExecutePartialQuantity = false;

        // Transition to rebalance
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          cTokenSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );
        // Approve underlying tokens to rebalancingSetCTokenBidder contract
        await erc20Helper.approveTransfersAsync([
          usdcInstance,
          daiInstance,
        ], rebalancingSetCTokenBidder.address);
      });

      it("transfers the correct amount of tokens to the bidder's wallet", async () => {
        const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );

        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        // Get current exchange rate
        const cUSDCExchangeRate = await compoundHelper.getExchangeRateCurrent(cUSDCInstance.address);
        const cDAIExchangeRate = await compoundHelper.getExchangeRateCurrent(cDAIInstance.address);
        // Replace expected token flow arrays with cToken underlying
        const expectedTokenFlowsUnderlying = rebalancingSetBidderHelper.replaceFlowsWithCTokenUnderlyingAsync(
          expectedTokenFlows,
          combinedTokenArray,
          [cUSDCInstance.address, cDAIInstance.address],
          [usdcInstance.address, daiInstance.address],
          [cUSDCExchangeRate, cDAIExchangeRate],
        );

        const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

        const oldReceiverTokenBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );

        const oldUnderlyingTokenBalances = await erc20Helper.getTokenBalances(
          [usdcInstance, daiInstance],
          subjectCaller
        );
        // Replace cToken balance with underlying token balance
        const oldReceiverTokenUnderlyingBalances = _.map(oldReceiverTokenBalances, (balance, index) => {
          if (combinedTokenArray[index] === cUSDCInstance.address) {
            return oldUnderlyingTokenBalances[0];
          } else if (combinedTokenArray[index] === cDAIInstance.address) {
            return oldUnderlyingTokenBalances[1];
          } else {
            return balance;
          }
        });

        await subject();

        const newReceiverTokenBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        const newUnderlyingTokenBalances = await erc20Helper.getTokenBalances(
          [usdcInstance, daiInstance],
          subjectCaller
        );
        // Replace cToken balance with underlying token balance
        const newReceiverTokenUnderlyingBalances = _.map(newReceiverTokenBalances, (balance, index) => {
          if (combinedTokenArray[index] === cUSDCInstance.address) {
            return newUnderlyingTokenBalances[0];
          } else if (combinedTokenArray[index] === cDAIInstance.address) {
            return newUnderlyingTokenBalances[1];
          } else {
            return balance;
          }
        });

        const expectedReceiverBalances = _.map(oldReceiverTokenUnderlyingBalances, (balance, index) =>
          balance
          .add(expectedTokenFlowsUnderlying['outflowArray'][index])
          .sub(expectedTokenFlowsUnderlying['inflowArray'][index])
        );

        expect(JSON.stringify(newReceiverTokenUnderlyingBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });

      it('transfers the correct amount of tokens from the bidder to the rebalancing token in Vault', async () => {
        const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );
        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );

        await subject();

        const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          combinedTokenArray,
          vault,
          rebalancingSetToken.address
        );
        const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
          balance.add(expectedTokenFlows['inflowArray'][index]).sub(expectedTokenFlows['outflowArray'][index])
        );
        expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
      });

      it('subtracts the correct amount from remainingCurrentSets', async () => {
        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const currentRemainingSets = new BigNumber(biddingParameters[1]);

        await subject();

        const expectedRemainingSets = currentRemainingSets.sub(subjectQuantity);
        const newBiddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const newRemainingSets = new BigNumber(newBiddingParameters[1]);
        expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
      });

      it('emits a BidPlacedCToken event', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs = BidPlacedCToken(
          rebalancingSetToken.address,
          subjectCaller,
          subjectQuantity,
          rebalancingSetCTokenBidder.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('but quantity is zero', async () => {
        beforeEach(async () => {
          subjectQuantity = ZERO;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but quantity is more than remainingCurrentSets', async () => {
        beforeEach(async () => {
          subjectQuantity = rebalancingSetTokenQuantityToIssue.add(minBid);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('partial fills is true but amount is less than remainingCurrentSets', async () => {
        beforeEach(async () => {
          subjectExecutePartialQuantity = true;
        });

        it('subtracts the correct amount from remainingCurrentSets', async () => {
          const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const currentRemainingSets = new BigNumber(biddingParameters[1]);

          await subject();

          const expectedRemainingSets = currentRemainingSets.sub(subjectQuantity);
          const newBiddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const newRemainingSets = new BigNumber(newBiddingParameters[1]);
          expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
        });

        describe('but quantity is zero', async () => {
          beforeEach(async () => {
            subjectQuantity = ZERO;
          });

          it('should revert', async () => {
            await expectRevertError(subject());
          });
        });
      });

      describe('and quantity is greater than remainingCurrentSets', async () => {
        const roundedQuantity = ether(1);

        beforeEach(async () => {
          subjectQuantity = ether(2);
          subjectExecutePartialQuantity = true;
        });

        it("transfers the correct amount of tokens to the bidder's wallet", async () => {
          const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            roundedQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );

          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          const cUSDCExchangeRate = await compoundHelper.getExchangeRateCurrent(cUSDCInstance.address);
          const cDAIExchangeRate = await compoundHelper.getExchangeRateCurrent(cDAIInstance.address);
          // Replace expected token flow arrays with cToken underlying
          const expectedTokenFlowsUnderlying = rebalancingSetBidderHelper.replaceFlowsWithCTokenUnderlyingAsync(
            expectedTokenFlows,
            combinedTokenArray,
            [cUSDCInstance.address, cDAIInstance.address],
            [usdcInstance.address, daiInstance.address],
            [cUSDCExchangeRate, cDAIExchangeRate],
          );

          const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

          const oldReceiverTokenBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );

          const oldUnderlyingTokenBalances = await erc20Helper.getTokenBalances(
            [usdcInstance, daiInstance],
            subjectCaller
          );
          // Replace cToken balance with underlying token balance
          const oldReceiverTokenUnderlyingBalances = _.map(oldReceiverTokenBalances, (balance, index) => {
            if (combinedTokenArray[index] === cUSDCInstance.address) {
              return oldUnderlyingTokenBalances[0];
            } else if (combinedTokenArray[index] === cDAIInstance.address) {
              return oldUnderlyingTokenBalances[1];
            } else {
              return balance;
            }
          });

          await subject();

          const newReceiverTokenBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );
          const newUnderlyingTokenBalances = await erc20Helper.getTokenBalances(
            [usdcInstance, daiInstance],
            subjectCaller
          );
          // Replace cToken balance with underlying token balance
          const newReceiverTokenUnderlyingBalances = _.map(newReceiverTokenBalances, (balance, index) => {
            if (combinedTokenArray[index] === cUSDCInstance.address) {
              return newUnderlyingTokenBalances[0];
            } else if (combinedTokenArray[index] === cDAIInstance.address) {
              return newUnderlyingTokenBalances[1];
            } else {
              return balance;
            }
          });

          const expectedReceiverBalances = _.map(oldReceiverTokenUnderlyingBalances, (balance, index) =>
            balance
            .add(expectedTokenFlowsUnderlying['outflowArray'][index])
            .sub(expectedTokenFlowsUnderlying['inflowArray'][index])
          );

          expect(JSON.stringify(newReceiverTokenUnderlyingBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
        });

        it('transfers the correct amount of tokens from the bidder to the rebalancing token in Vault', async () => {
          const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            roundedQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );
          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          const oldSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
            combinedTokenArray,
            vault,
            rebalancingSetToken.address
          );

          await subject();

          const newSenderBalances = await coreHelper.getVaultBalancesForTokensForOwner(
            combinedTokenArray,
            vault,
            rebalancingSetToken.address
          );
          const expectedSenderBalances = _.map(oldSenderBalances, (balance, index) =>
            balance.add(expectedTokenFlows['inflowArray'][index]).sub(expectedTokenFlows['outflowArray'][index])
          );

          expect(JSON.stringify(newSenderBalances)).to.equal(JSON.stringify(expectedSenderBalances));
        });

        it('subtracts the correct amount from remainingCurrentSets', async () => {
          const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const currentRemainingSets = new BigNumber(biddingParameters[1]);

          await subject();

          const expectedRemainingSets = currentRemainingSets.sub(roundedQuantity);
          const newBiddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
          const newRemainingSets = new BigNumber(newBiddingParameters[1]);
          expect(newRemainingSets).to.be.bignumber.equal(expectedRemainingSets);
        });

        it('emits a BidPlacedCToken event', async () => {
          const txHash = await subject();
          const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

          const expectedLogs = BidPlacedCToken(
            rebalancingSetToken.address,
            subjectCaller,
            subjectQuantity,
            rebalancingSetCTokenBidder.address
          );

          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });

      describe('but quantity is not multiple of natural unit', async () => {
        beforeEach(async () => {
          subjectQuantity = minBid.add(1);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when minting a cToken is returning a nonzero response', async () => {
        before(async () => {
          badCUSDCInstance = await compoundHelper.deployCTokenWithInvalidMintAndRedeemAsync(deployerAccount);
        });

        after(async () => {
          badCUSDCInstance = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when target cToken is an outflow in a bid', async () => {
      beforeEach(async () => {
        // Create the Rebalancing Set with the cToken component
        proposalPeriod = ONE_DAY_IN_SECONDS;
        rebalancingUnitShares = ether(1);
        rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
          coreMock,
          rebalancingFactory.address,
          managerAccount,
          cTokenSetToken.address,
          proposalPeriod,
          rebalancingUnitShares
        );

        // Approve tokens, mint cToken and issue cTokenSetToken
        const baseSetIssueQuantity = ether(1);

        await erc20Helper.approveTransfersAsync([usdcInstance], cTokenBaseSetComponent.address);
        await erc20Helper.approveTransfersAsync([daiInstance], cTokenBaseSetComponent2.address);
        await compoundHelper.mintCToken(
          cTokenBaseSetComponent.address,
          new BigNumber(10 ** 18)
        );
        await compoundHelper.mintCToken(
          cTokenBaseSetComponent2.address,
          new BigNumber(10 ** 22)
        );

        await erc20Helper.approveTransfersAsync(
          [cTokenBaseSetComponent, cTokenBaseSetComponent2],
          transferProxy.address
        );
        await coreMock.issue.sendTransactionAsync(
          cTokenSetToken.address,
          baseSetIssueQuantity,
          {from: deployerAccount}
        );

        // Use issued cTokenSetToken to issue rebalancingSetToken
        await erc20Helper.approveTransfersAsync([cTokenSetToken], transferProxy.address);

        rebalancingSetTokenQuantityToIssue = baseSetIssueQuantity
          .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
          .div(rebalancingUnitShares);

        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

        // Determine minimum bid
        const decOne = await defaultSetToken.naturalUnit.callAsync();
        const decTwo = await cTokenSetToken.naturalUnit.callAsync();
        minBid = new BigNumber(Math.max(decOne.toNumber(), decTwo.toNumber()) * 1000);

        subjectCaller = deployerAccount;
        subjectQuantity = minBid;
        subjectRebalancingSetToken = rebalancingSetToken.address;
        subjectExecutePartialQuantity = false;

        // Transition to rebalance
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          defaultSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        // Approve tokens to rebalancingSetCTokenBidder contract
        await erc20Helper.approveTransfersAsync([
          defaultBaseSetComponent,
          defaultBaseSetComponent2,
        ], rebalancingSetCTokenBidder.address);
      });

      it("transfers the correct amount of tokens to the bidder's wallet", async () => {
        const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );

        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const cUSDCExchangeRate = await compoundHelper.getExchangeRateCurrent(cUSDCInstance.address);
        const cDAIExchangeRate = await compoundHelper.getExchangeRateCurrent(cDAIInstance.address);
        // Replace expected token flow arrays with cToken underlying
        const expectedTokenFlowsUnderlying = rebalancingSetBidderHelper.replaceFlowsWithCTokenUnderlyingAsync(
          expectedTokenFlows,
          combinedTokenArray,
          [cUSDCInstance.address, cDAIInstance.address],
          [usdcInstance.address, daiInstance.address],
          [cUSDCExchangeRate, cDAIExchangeRate],
        );

        const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

        const oldReceiverTokenBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );

        const oldUnderlyingTokenBalances = await erc20Helper.getTokenBalances(
          [usdcInstance, daiInstance],
          subjectCaller
        );
        // Replace cToken balance with underlying token balance
        const oldReceiverTokenUnderlyingBalances = _.map(oldReceiverTokenBalances, (balance, index) => {
          if (combinedTokenArray[index] === cUSDCInstance.address) {
            return oldUnderlyingTokenBalances[0];
          } else if (combinedTokenArray[index] === cDAIInstance.address) {
            return oldUnderlyingTokenBalances[1];
          } else {
            return balance;
          }
        });

        await subject();
        const newReceiverTokenBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        const newUnderlyingTokenBalances = await erc20Helper.getTokenBalances(
          [usdcInstance, daiInstance],
          subjectCaller
        );
        // Replace cToken balance with underlying token balance
        const newReceiverTokenUnderlyingBalances = _.map(newReceiverTokenBalances, (balance, index) => {
          if (combinedTokenArray[index] === cUSDCInstance.address) {
            return newUnderlyingTokenBalances[0];
          } else if (combinedTokenArray[index] === cDAIInstance.address) {
            return newUnderlyingTokenBalances[1];
          } else {
            return balance;
          }
        });

        const expectedReceiverBalances = _.map(oldReceiverTokenUnderlyingBalances, (balance, index) =>
          balance
          .add(expectedTokenFlowsUnderlying['outflowArray'][index])
          .sub(expectedTokenFlowsUnderlying['inflowArray'][index])
        );

        expect(JSON.stringify(newReceiverTokenUnderlyingBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });

      describe('when redeeming a cToken is returning a nonzero response', async () => {
        before(async () => {
          badCUSDCInstance = await compoundHelper.deployCTokenWithInvalidMintAndRedeemAsync(deployerAccount);
        });

        after(async () => {
          badCUSDCInstance = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when cTokens are neither inflow nor outflow in a bid', async () => {
      beforeEach(async () => {
        // Create the Rebalancing Set with the default component
        proposalPeriod = ONE_DAY_IN_SECONDS;
        rebalancingUnitShares = ether(1);
        rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
          coreMock,
          rebalancingFactory.address,
          managerAccount,
          defaultSetToken.address,
          proposalPeriod,
          rebalancingUnitShares
        );

        // Approve tokens and issue defaultSetToken
        const baseSetIssueQuantity = ether(1);

        await erc20Helper.approveTransfersAsync([
          defaultBaseSetComponent,
          defaultBaseSetComponent2,
        ], transferProxy.address);
        await coreMock.issue.sendTransactionAsync(
          defaultSetToken.address,
          baseSetIssueQuantity,
          {from: deployerAccount}
        );

        // Use issued defaultSetToken to issue rebalancingSetToken
        await erc20Helper.approveTransfersAsync([defaultSetToken], transferProxy.address);

        rebalancingSetTokenQuantityToIssue = baseSetIssueQuantity
          .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
          .div(rebalancingUnitShares);

        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

        // Determine minimum bid
        const decOne = await defaultSetToken.naturalUnit.callAsync();
        const decTwo = await cTokenSetToken.naturalUnit.callAsync();
        minBid = new BigNumber(Math.max(decOne.toNumber(), decTwo.toNumber()) * 1000);

        subjectCaller = deployerAccount;
        subjectQuantity = minBid;
        subjectRebalancingSetToken = rebalancingSetToken.address;
        subjectExecutePartialQuantity = false;

        // Create new next Set with no cToken component
        const defaultNextBaseSetComponent = await erc20Helper.deployTokenAsync(deployerAccount);
        const defaultNextBaseSetComponent2 = await erc20Helper.deployTokenAsync(deployerAccount);
        const defaultNextComponentAddresses = [
          defaultNextBaseSetComponent.address, defaultNextBaseSetComponent2.address,
        ];
        const defaultNextComponentUnits = [
          ether(0.01), ether(0.01),
        ];
        const defaultBaseSetNaturalUnit = ether(0.001);
        const defaultNextSetToken = await coreHelper.createSetTokenAsync(
          coreMock,
          factory.address,
          defaultNextComponentAddresses,
          defaultNextComponentUnits,
          defaultBaseSetNaturalUnit,
        );

        // Transition to rebalance
        await rebalancingHelper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          defaultNextSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        // Approve tokens to rebalancingSetCTokenBidder contract
        await erc20Helper.approveTransfersAsync([
          defaultNextBaseSetComponent,
          defaultNextBaseSetComponent2,
        ], rebalancingSetCTokenBidder.address);
      });

      it("transfers the correct amount of tokens to the bidder's wallet", async () => {
        const expectedTokenFlow = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );

        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
        const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

        const oldReceiverBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );

        await subject();

        const newReceiverBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
          balance.add(expectedTokenFlow['outflowArray'][index]).sub(expectedTokenFlow['inflowArray'][index])
        );

        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });
    });
  });

  describe('#bidAndWithdrawTWAP', async () => {
    const setup: RebalanceTestSetup = new RebalanceTestSetup(deployerAccount);
    let rebalancingSetToken: RebalancingSetTokenV3Contract;
    let rebalancingSetCTokenBidder: RebalancingSetCTokenBidderContract;
    let liquidator: TWAPLiquidatorContract;

    const scenario: any = {
      name: 'ETH 20 MA Set Rebalances 100% WETH to 100% USD',
      rebalancingSet: {
        unitShares: new BigNumber(2076796),
        naturalUnit: new BigNumber(1000000),
        supply: new BigNumber('20556237207015075000000'),
      },
      currentSet: {
        components: ['component1'], // ETH
        units: [new BigNumber(1000000)],
        naturalUnit: new BigNumber(1000000),
      },
      nextSet: {
        components: ['component2'], // USDC
        units: [new BigNumber(307)],
        naturalUnit: new BigNumber(1000000000000),
      },
      components: {
        component1Price: ether(188),
        component2Price: ether(1),
        component1Decimals: 18,
        component2Decimals: 6,
      },
      auction: {
        chunkSize: ether(2000000),
        chunkAuctionPeriod: new BigNumber(3600), // 1 hour
      },
    };

    const name: string = 'liquidator';
    const auctionPeriod: BigNumber = ONE_HOUR_IN_SECONDS.mul(4);
    const rangeStart: BigNumber = ether(.01);
    const rangeEnd: BigNumber = ether(.21);

    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let subjectLastChunkTimestamp: BigNumber;
    let subjectExecutePartialQuantity: boolean;
    let subjectCaller: Address;

    beforeEach(async () => {
      await setup.initializeCore();
      await setup.initializeComponents(scenario.components);
      await setup.initializeBaseSets({
        set1Components: _.map(scenario.currentSet.components, component => setup[component].address),
        set2Components: _.map(scenario.nextSet.components, component => setup[component].address),
        set1Units: scenario.currentSet.units,
        set2Units: scenario.nextSet.units,
        set1NaturalUnit: scenario.currentSet.naturalUnit,
        set2NaturalUnit: scenario.nextSet.naturalUnit,
      });

      const assetPairVolumeBounds = [
        {
          assetOne: setup.component1.address,
          assetTwo: setup.component2.address,
          bounds: {lower: ether(10 ** 4), upper: ether(10 ** 7)},
        },
        {
          assetOne: setup.component2.address,
          assetTwo: setup.component3.address,
          bounds: {lower: ZERO, upper: ether(10 ** 6)},
        },
      ];

      liquidator = await liquidatorHelper.deployTWAPLiquidatorAsync(
        setup.core.address,
        setup.oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairVolumeBounds,
        name,
      );
      await coreHelper.addAddressToWhiteList(liquidator.address, setup.liquidatorWhitelist);

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV3Async(
        setup.core,
        setup.rebalancingFactory.address,
        managerAccount,
        liquidator.address,
        feeRecipient,
        setup.fixedFeeCalculator.address,
        setup.set1.address,
        failPeriod,
        lastRebalanceTimestamp,
        ZERO, // entry fee
        ZERO, // rebalance fee
        scenario.rebalancingSet.unitShares
      );

      await setup.setRebalancingSet(rebalancingSetToken);

      await setup.mintRebalancingSets(scenario.rebalancingSet.supply);

      const { chunkSize, chunkAuctionPeriod } = scenario.auction;
      const liquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(chunkSize, chunkAuctionPeriod);
      await rebalancingHelper.transitionToRebalanceV2Async(
        setup.core,
        setup.rebalancingComponentWhiteList,
        setup.rebalancingSetToken,
        setup.set2,
        managerAccount,
        liquidatorData,
      );

      const dataDescription = 'TWAP CToken Bidder Contract';
      rebalancingSetCTokenBidder = await rebalancingSetBidderHelper.deployRebalancingSetCTokenBidderAsync(
        setup.rebalanceAuctionModule.address,
        setup.transferProxy.address,
        [],
        [],
        dataDescription,
      );

      await setup.approveComponentsToAddress(rebalancingSetCTokenBidder.address);

      const remainingBids = await liquidator.remainingCurrentSets.callAsync(setup.rebalancingSetToken.address);

      subjectRebalancingSetToken = rebalancingSetToken.address;
      subjectQuantity = remainingBids;
      subjectLastChunkTimestamp = ZERO;
      subjectExecutePartialQuantity = false;
      subjectCaller = deployerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetCTokenBidder.bidAndWithdrawTWAP.sendTransactionAsync(
        subjectRebalancingSetToken,
        subjectQuantity,
        subjectLastChunkTimestamp,
        subjectExecutePartialQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS }
      );
    }

    describe('when auction is in first chunk and last chunk timestamp is the same', async () => {

      it("transfers the correct amount of tokens to the bidder's wallet", async () => {

        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
        const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

        const oldReceiverBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );

        await subject();

        const auction = await liquidator.auctions.callAsync(subjectRebalancingSetToken);
        const chunkAuction = auction[0];

        const linearAuction = getLinearAuction(chunkAuction);
        const { timestamp } = await web3.eth.getBlock('latest');

        const currentPrice = await liquidatorHelper.calculateCurrentPrice(
          linearAuction,
          new BigNumber(timestamp),
          auctionPeriod,
        );
        const expectedTokenFlow = liquidatorHelper.constructTokenFlow(
          linearAuction,
          subjectQuantity,
          currentPrice,
        );

        const newReceiverBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
          balance.add(expectedTokenFlow['outflow'][index]).sub(expectedTokenFlow['inflow'][index])
        );

        expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });
    });

    describe('when auction is iterated to the next chunk', async () => {

      // Bids and iterates to the next auction
      beforeEach(async () => {
        const timeToFV = ONE_HOUR_IN_SECONDS.div(6);
        await blockchain.increaseTimeAsync(timeToFV);
        await blockchain.mineBlockAsync();

        // Bid the entire quantity
        const remainingBids = await liquidator.remainingCurrentSets.callAsync(setup.rebalancingSetToken.address);
        await rebalancingHelper.bidAndWithdrawAsync(
          setup.rebalanceAuctionModule,
          setup.rebalancingSetToken.address,
          remainingBids,
        );

        await blockchain.increaseTimeAsync(scenario.auction.chunkAuctionPeriod);

        await liquidator.iterateChunkAuction.sendTransactionAsync(
          setup.rebalancingSetToken.address,
          { from: deployerAccount, gas: DEFAULT_GAS }
        );
      });

      describe('when timestamp is the same', async () => {
        beforeEach(async () => {
          const timestamp = await liquidator.getLastChunkAuctionEnd.callAsync(rebalancingSetToken.address);
          subjectLastChunkTimestamp = timestamp;
        });

        it("transfers the correct amount of tokens to the bidder's wallet", async () => {

          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
          const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

          const oldReceiverBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );

          await subject();

          const auction = await liquidator.auctions.callAsync(subjectRebalancingSetToken);
          const chunkAuction = auction[0];

          const linearAuction = getLinearAuction(chunkAuction);
          const { timestamp } = await web3.eth.getBlock('latest');

          const currentPrice = await liquidatorHelper.calculateCurrentPrice(
            linearAuction,
            new BigNumber(timestamp),
            auctionPeriod,
          );
          const expectedTokenFlow = liquidatorHelper.constructTokenFlow(
            linearAuction,
            subjectQuantity,
            currentPrice,
          );

          const newReceiverBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );
          const expectedReceiverBalances = _.map(oldReceiverBalances, (balance, index) =>
            balance.add(expectedTokenFlow['outflow'][index]).sub(expectedTokenFlow['inflow'][index])
          );

          expect(JSON.stringify(newReceiverBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
        });

      });

      describe('when timestamp is different', async () => {
        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });

  describe('#getAddressAndBidPriceArray', async () => {
    let cUSDCInstance: StandardTokenMockContract;
    let usdcInstance: StandardTokenMockContract;
    let cDAIInstance: StandardTokenMockContract;
    let daiInstance: StandardTokenMockContract;

    let rebalancingSetCTokenBidder: RebalancingSetCTokenBidderContract;
    let dataDescription: string;

    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let proposalPeriod: BigNumber;

    let defaultBaseSetNaturalUnit: BigNumber;
    let defaultBaseSetComponent: StandardTokenMockContract;
    let defaultBaseSetComponent2: StandardTokenMockContract;
    let cTokenBaseSetNaturalUnit: BigNumber;
    let cTokenBaseSetComponent: StandardTokenMockContract;
    let cTokenBaseSetComponent2: StandardTokenMockContract;
    let cTokenComponentUnits: BigNumber;

    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let defaultSetToken: SetTokenContract;
    let cTokenSetToken: SetTokenContract;

    let rebalancingSetTokenQuantityToIssue: BigNumber;
    let minBid: BigNumber;

    beforeEach(async () => {
      // Set up Compound USDC token
      usdcInstance = await erc20Helper.deployTokenAsync(
        deployerAccount,
        6,
      );
      const cUSDCAddress = await compoundHelper.deployMockCUSDC(usdcInstance.address, deployerAccount);
      await compoundHelper.enableCToken(cUSDCAddress);
      // Set the Borrow Rate
      await compoundHelper.setBorrowRate(cUSDCAddress, new BigNumber('43084603999'));

      await erc20Helper.approveTransferAsync(
        usdcInstance,
        cUSDCAddress,
        deployerAccount
      );
      cUSDCInstance = await erc20Helper.getTokenInstanceAsync(cUSDCAddress);

      // Set up Compound DAI token
      daiInstance = await erc20Helper.deployTokenAsync(
        deployerAccount,
        18,
      );
      const cDAIAddress = await compoundHelper.deployMockCDAI(daiInstance.address, deployerAccount);
      await compoundHelper.enableCToken(cDAIAddress);
      // Set the Borrow Rate
      await compoundHelper.setBorrowRate(cDAIAddress, new BigNumber('29313252165'));

      await erc20Helper.approveTransferAsync(
        daiInstance,
        cDAIAddress,
        deployerAccount
      );
      cDAIInstance = await erc20Helper.getTokenInstanceAsync(cDAIAddress);
      dataDescription = 'cDAI cUSDC Bidder Contract';

      rebalancingSetCTokenBidder = await rebalancingSetBidderHelper.deployRebalancingSetCTokenBidderAsync(
        rebalanceAuctionModuleMock.address,
        transferProxy.address,
        [cUSDCInstance.address, cDAIInstance.address],
        [usdcInstance.address, daiInstance.address],
        dataDescription,
      );

      // ----------------------------------------------------------------------
      // Create Set with no cToken component
      // ----------------------------------------------------------------------

      // Create component tokens for default Set
      defaultBaseSetComponent = await erc20Helper.deployTokenAsync(deployerAccount);
      defaultBaseSetComponent2 = await erc20Helper.deployTokenAsync(deployerAccount);

      // Create the Set (default is 2 components)
      const defaultComponentAddresses = [
        defaultBaseSetComponent.address, defaultBaseSetComponent2.address,
      ];
      const defaultComponentUnits = [
        ether(0.01), ether(0.01),
      ];

      defaultBaseSetNaturalUnit = ether(0.001);
      defaultSetToken = await coreHelper.createSetTokenAsync(
        coreMock,
        factory.address,
        defaultComponentAddresses,
        defaultComponentUnits,
        defaultBaseSetNaturalUnit,
      );

      // ----------------------------------------------------------------------
      // Create Set with 2 cToken components
      // ----------------------------------------------------------------------

      // Create component tokens for Set containing the target cToken
      cTokenBaseSetComponent = cUSDCInstance;
      cTokenBaseSetComponent2 = cDAIInstance;

      // Create the Set (default is 2 components)
      const nextComponentAddresses = [
        cTokenBaseSetComponent.address, cTokenBaseSetComponent2.address,
      ];

      cTokenComponentUnits = ether(0.001);
      const nextComponentUnits = [
        cTokenComponentUnits, ether(1),
      ];

      cTokenBaseSetNaturalUnit = ether(0.0001);
      cTokenSetToken = await coreHelper.createSetTokenAsync(
        coreMock,
        factory.address,
        nextComponentAddresses,
        nextComponentUnits,
        cTokenBaseSetNaturalUnit,
      );

      // Create the Rebalancing Set without cToken component
      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingUnitShares = ether(1);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        defaultSetToken.address,
        proposalPeriod,
        rebalancingUnitShares
      );

      // Approve tokens and issue defaultSetToken
      const baseSetIssueQuantity = ether(1);

      await erc20Helper.approveTransfersAsync([
        defaultBaseSetComponent,
        defaultBaseSetComponent2,
      ], transferProxy.address);

      await coreMock.issue.sendTransactionAsync(
        defaultSetToken.address,
        baseSetIssueQuantity,
        {from: deployerAccount}
      );

      // Use issued defaultSetToken to issue rebalancingSetToken
      await erc20Helper.approveTransfersAsync([defaultSetToken], transferProxy.address);
      rebalancingSetTokenQuantityToIssue = baseSetIssueQuantity
        .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
        .div(rebalancingUnitShares);

      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);
      // Determine minimum bid
      const decOne = await defaultSetToken.naturalUnit.callAsync();
      const decTwo = await cTokenSetToken.naturalUnit.callAsync();
      minBid = new BigNumber(Math.max(decOne.toNumber(), decTwo.toNumber()) * 1000);

      subjectQuantity = minBid;
      subjectRebalancingSetToken = rebalancingSetToken.address;

      // Transition to rebalance
      await rebalancingHelper.defaultTransitionToRebalanceAsync(
        coreMock,
        rebalancingComponentWhiteList,
        rebalancingSetToken,
        cTokenSetToken,
        constantAuctionPriceCurve.address,
        managerAccount
      );
    });

    async function subject(): Promise<any> {
      return rebalancingSetCTokenBidder.getAddressAndBidPriceArray.callAsync(
        subjectRebalancingSetToken,
        subjectQuantity,
      );
    }

    it('should return the correct inflow, outflow and address arrays', async () => {
      const [
        actualAddressArray,
        actualInflowUnitArray,
        actualOutflowUnitArray,
      ] = await subject();

      const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
        rebalancingSetToken,
        subjectQuantity,
        DEFAULT_AUCTION_PRICE_NUMERATOR
      );

      const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();
      const expectedCombinedTokenArray = _.map(combinedTokenArray, token => {
        if (token === cUSDCInstance.address) {
          return usdcInstance.address;
        } else if (token === cDAIInstance.address) {
          return daiInstance.address;
        } else {
          return token;
        }
      });
      // Get exchange rate stored
      const cUSDCExchangeRate = await compoundHelper.getExchangeRate(cUSDCInstance.address);
      const cDAIExchangeRate = await compoundHelper.getExchangeRate(cDAIInstance.address);
      // Replace expected token flow arrays with cToken underlying
      const expectedTokenFlowsUnderlying = rebalancingSetBidderHelper.replaceFlowsWithCTokenUnderlyingAsync(
        expectedTokenFlows,
        combinedTokenArray,
        [cUSDCInstance.address, cDAIInstance.address],
        [usdcInstance.address, daiInstance.address],
        [cUSDCExchangeRate, cDAIExchangeRate],
      );

      expect(
        JSON.stringify(actualInflowUnitArray)
      ).to.equal(
        JSON.stringify(expectedTokenFlowsUnderlying['inflowArray'])
      );
      expect(
        JSON.stringify(actualOutflowUnitArray)
      ).to.equal(
        JSON.stringify(expectedTokenFlowsUnderlying['outflowArray'])
      );
      expect(
        JSON.stringify(actualAddressArray)
      ).to.equal(
        JSON.stringify(expectedCombinedTokenArray)
      );
    });
  });
});