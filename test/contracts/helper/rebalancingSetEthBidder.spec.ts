require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address, SetProtocolTestUtils as SetTestUtils } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  ConstantAuctionPriceCurveContract,
  CoreMockContract,
  RebalanceAuctionModuleMockContract,
  RebalancingSetEthBidderContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  WethMockContract,
  WhiteListContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DIVISOR,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3, getGasUsageInEth } from '@utils/web3Helper';
import { BidPlacedWithEth } from '@utils/contract_logs/rebalancingSetEthBidder';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';
import { RebalancingSetBidderHelper } from '@utils/helpers/rebalancingSetBidderHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const blockchain = new Blockchain(web3);
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;

contract('RebalancingSetEthBidder', accounts => {
  const [
    deployerAccount,
    managerAccount,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModuleMock: RebalanceAuctionModuleMockContract;
  let factory: SetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
  let constantAuctionPriceCurve: ConstantAuctionPriceCurveContract;

  let rebalancingSetEthBidder: RebalancingSetEthBidderContract;

  let weth: WethMockContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingHelper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const rebalancingSetBidderHelper = new RebalancingSetBidderHelper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(RebalanceAuctionModuleMockContract.getAbi());
    ABIDecoder.addABI(RebalancingSetEthBidderContract.getAbi());

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

    weth = await erc20Helper.deployWrappedEtherAsync(deployerAccount, ZERO);

    rebalancingSetEthBidder = await rebalancingSetBidderHelper.deployRebalancingSetEthBidderAsync(
      rebalanceAuctionModuleMock.address,
      transferProxy.address,
      weth.address,
    );
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalanceAuctionModuleMockContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetEthBidderContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    it('should contain the correct address of the rebalance auction module', async () => {
      const proxyAddress = await rebalancingSetEthBidder.transferProxy.callAsync();
      expect(proxyAddress).to.equal(transferProxy.address);
    });

    it('should contain the correct address of the transfer proxy', async () => {
      const proxyAddress = await rebalancingSetEthBidder.transferProxy.callAsync();

      expect(proxyAddress).to.equal(transferProxy.address);
    });

    it('should contain the correct address of Wrapped Ether', async () => {
      const wethAddress = await rebalancingSetEthBidder.weth.callAsync();

      expect(wethAddress).to.equal(weth.address);
    });

    it('should have unlimited allowance for weth', async () => {
      const wethAllowance = await weth.allowance.callAsync(
        rebalancingSetEthBidder.address,
        transferProxy.address,
      );
      const expectedWethAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

      expect(wethAllowance).to.bignumber.equal(expectedWethAllowance);
    });
  });

  describe('#bidAndWithdrawWithEther', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectQuantity: BigNumber;
    let subjectEthQuantity: BigNumber;
    let subjectExecutePartialQuantity: boolean;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let defaultBaseSetNaturalUnit: BigNumber;
    let defaultBaseSetComponent: StandardTokenMockContract | WethMockContract;
    let defaultBaseSetComponent2: StandardTokenMockContract | WethMockContract;
    let wethBaseSetNaturalUnit: BigNumber;
    let wethBaseSetComponent: StandardTokenMockContract | WethMockContract;
    let wethBaseSetComponent2: StandardTokenMockContract | WethMockContract;
    let wethComponentUnits: BigNumber;

    let rebalancingSetToken: RebalancingSetTokenContract;
    let rebalancingUnitShares: BigNumber;

    let defaultSetToken: SetTokenContract;
    let wethSetToken: SetTokenContract;

    let rebalancingSetTokenQuantityToIssue: BigNumber;
    let minBid: BigNumber;

    beforeEach(async () => {
      // ----------------------------------------------------------------------
      // Create Set with no WETH component
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
      // Create Set with a WETH component
      // ----------------------------------------------------------------------

      // Create component tokens for Set containing weth
      wethBaseSetComponent = weth;
      wethBaseSetComponent2 = await erc20Helper.deployTokenAsync(deployerAccount);

      // Create the Set (default is 2 components)
      const nextComponentAddresses = [
        wethBaseSetComponent.address, wethBaseSetComponent2.address,
      ];

      wethComponentUnits = ether(0.01);
      const nextComponentUnits = [
        wethComponentUnits, ether(0.01),
      ];

      wethBaseSetNaturalUnit = ether(0.001);
      wethSetToken = await coreHelper.createSetTokenAsync(
        coreMock,
        factory.address,
        nextComponentAddresses,
        nextComponentUnits,
        wethBaseSetNaturalUnit,
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSetEthBidder.bidAndWithdrawWithEther.sendTransactionAsync(
        subjectRebalancingSetToken,
        subjectQuantity,
        subjectExecutePartialQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS, value: subjectEthQuantity.toNumber()}
      );
    }

    describe('when WETH is an inflow in a bid', async () => {
      beforeEach(async () => {
        // Create the Rebalancing Set without WETH component
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
        const decTwo = await wethSetToken.naturalUnit.callAsync();
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
          wethSetToken,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        // Approve tokens to rebalancingSetEthBidder contract
        await erc20Helper.approveTransfersAsync([
          wethBaseSetComponent,
          wethBaseSetComponent2,
        ], rebalancingSetEthBidder.address);

        subjectEthQuantity = baseSetIssueQuantity.mul(wethComponentUnits).div(wethBaseSetNaturalUnit);
      });


      it("transfers the correct amount of tokens to the bidder's wallet", async () => {
        const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );

        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

        const oldEthBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));
        const oldReceiverTokenBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        // Replace WETH balance with ETH balance
        const oldReceiverTokenAndEthBalances = _.map(oldReceiverTokenBalances, (balance, index) =>
          combinedTokenArray[index] === weth.address ? new BigNumber(oldEthBalance) : balance
        );

        const txHash = await subject();

        const newEthBalance =  await web3.eth.getBalance(subjectCaller);
        const newReceiverTokenBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        // Replace WETH balance with ETH balance and factor in gas paid
        const totalGasInEth = await getGasUsageInEth(txHash);
        const newReceiverTokenAndEthBalances = _.map(newReceiverTokenBalances, (balance, index) =>
          combinedTokenArray[index] === weth.address ? totalGasInEth.add(newEthBalance) : balance
        );

        const expectedReceiverBalances = _.map(oldReceiverTokenAndEthBalances, (balance, index) =>
          balance.add(expectedTokenFlows['outflowArray'][index]).sub(expectedTokenFlows['inflowArray'][index])
        );

        expect(JSON.stringify(newReceiverTokenAndEthBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
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

      it('emits a BidPlacedWithEth event', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs = BidPlacedWithEth(
          rebalancingSetToken.address,
          subjectCaller,
          subjectQuantity,
          rebalancingSetEthBidder.address
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

          const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

          const oldEthBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));
          const oldReceiverTokenBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );
          // Replace WETH balance with ETH balance
          const oldReceiverTokenAndEthBalances = _.map(oldReceiverTokenBalances, (balance, index) =>
            combinedTokenArray[index] === weth.address ? new BigNumber(oldEthBalance) : balance
          );

          const txHash = await subject();

          const newEthBalance =  await web3.eth.getBalance(subjectCaller);
          const newReceiverTokenBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );
          // Replace WETH balance with ETH balance and factor in gas paid
          const totalGasInEth = await getGasUsageInEth(txHash);
          const newReceiverTokenAndEthBalances = _.map(newReceiverTokenBalances, (balance, index) =>
            combinedTokenArray[index] === weth.address ? totalGasInEth.add(newEthBalance) : balance
          );

          const expectedReceiverBalances = _.map(oldReceiverTokenAndEthBalances, (balance, index) =>
            balance.add(expectedTokenFlows['outflowArray'][index]).sub(expectedTokenFlows['inflowArray'][index])
          );

          expect(JSON.stringify(newReceiverTokenAndEthBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
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

        it('emits a BidPlacedWithEth event', async () => {
          const txHash = await subject();
          const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

          const expectedLogs = BidPlacedWithEth(
            rebalancingSetToken.address,
            subjectCaller,
            subjectQuantity,
            rebalancingSetEthBidder.address
          );

          await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
        });
      });

      describe('when submitted ETH quantity is higher than required inflow', async () => {
        beforeEach(async () => {
          subjectEthQuantity = ether(10);
        });

        it("transfers the correct amount of tokens and ETH to the bidder's wallet", async () => {
          const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
            rebalancingSetToken,
            subjectQuantity,
            DEFAULT_AUCTION_PRICE_NUMERATOR
          );

          const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

          const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

          const oldEthBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));
          const oldReceiverTokenBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );
          // Replace WETH balance with ETH balance
          const oldReceiverTokenAndEthBalances = _.map(oldReceiverTokenBalances, (balance, index) =>
            combinedTokenArray[index] === weth.address ? new BigNumber(oldEthBalance) : balance
          );

          const txHash = await subject();

          const newEthBalance =  await web3.eth.getBalance(subjectCaller);
          const newReceiverTokenBalances = await erc20Helper.getTokenBalances(
            tokenInstances,
            subjectCaller
          );
          // Replace WETH balance with ETH balance and factor in gas paid
          const totalGasInEth = await getGasUsageInEth(txHash);
          const newReceiverTokenAndEthBalances = _.map(newReceiverTokenBalances, (balance, index) =>
            combinedTokenArray[index] === weth.address ? totalGasInEth.add(newEthBalance) : balance
          );

          const expectedReceiverBalances = _.map(oldReceiverTokenAndEthBalances, (balance, index) =>
            balance.add(expectedTokenFlows['outflowArray'][index]).sub(expectedTokenFlows['inflowArray'][index])
          );

          expect(JSON.stringify(newReceiverTokenAndEthBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
        });
      });

      describe('but ETH input quantity is lower than required inflow', async () => {
        beforeEach(async () => {
          subjectEthQuantity = ZERO;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the contract does not have enough allowance to transfer weth', async () => {
        beforeEach(async () => {
          await weth.changeAllowanceProxy.sendTransactionAsync(
            rebalancingSetEthBidder.address,
            transferProxy.address,
            ZERO,
            { gas: DEFAULT_GAS }
          );
        });

        it('resets the transferProxy allowance', async () => {
          const wethAllowance = await weth.allowance.callAsync(
            rebalancingSetEthBidder.address,
            transferProxy.address
          );
          expect(wethAllowance).to.bignumber.equal(ZERO);

          await subject();

          const expectedWethAllowance = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
          const newWethAllowance = await weth.allowance.callAsync(
            rebalancingSetEthBidder.address,
            transferProxy.address
          );
          expect(newWethAllowance).to.bignumber.equal(expectedWethAllowance);
        });
      });
    });

    describe('when WETH is an outflow in a bid', async () => {
      beforeEach(async () => {
        // Create the Rebalancing Set with the WETH component
        proposalPeriod = ONE_DAY_IN_SECONDS;
        rebalancingUnitShares = ether(1);
        rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
          coreMock,
          rebalancingFactory.address,
          managerAccount,
          wethSetToken.address,
          proposalPeriod,
          rebalancingUnitShares
        );

        // Approve tokens and issue wethSetToken
        const baseSetIssueQuantity = ether(1);
        const requiredWrappedEther = baseSetIssueQuantity.mul(wethComponentUnits).div(wethBaseSetNaturalUnit);
        await weth.deposit.sendTransactionAsync(
          { from: deployerAccount, value: requiredWrappedEther.toString() }
        );

        await erc20Helper.approveTransfersAsync([wethBaseSetComponent, wethBaseSetComponent2], transferProxy.address);
        await coreMock.issue.sendTransactionAsync(wethSetToken.address, baseSetIssueQuantity, {from: deployerAccount});

        // Use issued defaultSetToken to issue rebalancingSetToken
        await erc20Helper.approveTransfersAsync([wethSetToken], transferProxy.address);

        rebalancingSetTokenQuantityToIssue = baseSetIssueQuantity
          .mul(DEFAULT_REBALANCING_NATURAL_UNIT)
          .div(rebalancingUnitShares);

        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

        // Determine minimum bid
        const decOne = await defaultSetToken.naturalUnit.callAsync();
        const decTwo = await wethSetToken.naturalUnit.callAsync();
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

        // Approve tokens to rebalancingSetEthBidder contract
        await erc20Helper.approveTransfersAsync([
          defaultBaseSetComponent,
          defaultBaseSetComponent2,
        ], rebalancingSetEthBidder.address);

        subjectEthQuantity = ZERO;
      });

      it("transfers the correct amount of tokens to the bidder's wallet", async () => {
        const expectedTokenFlows = await rebalancingHelper.constructInflowOutflowArraysAsync(
          rebalancingSetToken,
          subjectQuantity,
          DEFAULT_AUCTION_PRICE_NUMERATOR
        );

        const combinedTokenArray = await rebalancingSetToken.getCombinedTokenArray.callAsync();

        const tokenInstances = await erc20Helper.retrieveTokenInstancesAsync(combinedTokenArray);

        const oldEthBalance = new BigNumber(await web3.eth.getBalance(subjectCaller));
        const oldReceiverTokenBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        // Replace WETH balance with ETH balance
        const oldReceiverTokenAndEthBalances = _.map(oldReceiverTokenBalances, (balance, index) =>
          combinedTokenArray[index] === weth.address ? new BigNumber(oldEthBalance) : balance
        );

        const txHash = await subject();

        const newEthBalance =  await web3.eth.getBalance(subjectCaller);
        const newReceiverTokenBalances = await erc20Helper.getTokenBalances(
          tokenInstances,
          subjectCaller
        );
        // Replace WETH balance with ETH balance and factor in gas paid
        const totalGasInEth = await getGasUsageInEth(txHash);
        const newReceiverTokenAndEthBalances = _.map(newReceiverTokenBalances, (balance, index) =>
          combinedTokenArray[index] === weth.address ? totalGasInEth.add(newEthBalance) : balance
        );

        const expectedReceiverBalances = _.map(oldReceiverTokenAndEthBalances, (balance, index) =>
          balance.add(expectedTokenFlows['outflowArray'][index]).sub(expectedTokenFlows['inflowArray'][index])
        );

        expect(JSON.stringify(newReceiverTokenAndEthBalances)).to.equal(JSON.stringify(expectedReceiverBalances));
      });
    });

    describe('when WETH is neither inflow nor outflow in a bid', async () => {
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
        const requiredWrappedEther = baseSetIssueQuantity.mul(wethComponentUnits).div(wethBaseSetNaturalUnit);
        await weth.deposit.sendTransactionAsync(
          { from: deployerAccount, value: requiredWrappedEther.toString() }
        );

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
        const decTwo = await wethSetToken.naturalUnit.callAsync();
        minBid = new BigNumber(Math.max(decOne.toNumber(), decTwo.toNumber()) * 1000);

        subjectCaller = deployerAccount;
        subjectQuantity = minBid;
        subjectRebalancingSetToken = rebalancingSetToken.address;
        subjectExecutePartialQuantity = false;

        // Create new next Set with no weth component
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

        // Approve tokens to rebalancingSetEthBidder contract
        await erc20Helper.approveTransfersAsync([
          defaultNextBaseSetComponent,
          defaultNextBaseSetComponent2,
        ], rebalancingSetEthBidder.address);

        subjectEthQuantity = ether(10);
      });

      it('returns the amount of ETH minus gas cost', async () => {
        const previousEthBalance: BigNumber = new BigNumber(await web3.eth.getBalance(subjectCaller));

        const txHash = await subject();

        const currentEthBalance =  await web3.eth.getBalance(subjectCaller);

        const totalGasInEth = await getGasUsageInEth(txHash);

        const expectedEthBalance = previousEthBalance.sub(totalGasInEth);

        expect(expectedEthBalance).to.bignumber.equal(currentEthBalance);
      });
    });
  });
});