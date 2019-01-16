require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { SetProtocolTestUtils } from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  BTCETHRebalancingManagerContract,
  CoreMockContract,
  ConstantAuctionPriceCurveContract,
  MedianContract,
  SetTokenContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
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
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DENOMINATOR,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { OracleWrapper } from '@utils/wrappers/oracleWrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('BTCETHRebalancingManager', accounts => {
  const [
    deployerAccount,
    otherAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let constantAuctionPriceCurve: ConstantAuctionPriceCurveContract;
  let btcethRebalancingManager: BTCETHRebalancingManagerContract;
  let btcMedianizer: MedianContract;
  let ethMedianizer: MedianContract;
  let wrappedBTC: StandardTokenMockContract;
  let wrappedETH: StandardTokenMockContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const rebalancingWrapper = new RebalancingWrapper(
    deployerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );
  const oracleWrapper = new OracleWrapper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
    ABIDecoder.addABI(RebalancingSetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalancingSetToken.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    coreMock = await coreWrapper.deployCoreMockAsync(transferProxy, vault);
    rebalanceAuctionModule = await coreWrapper.deployRebalanceAuctionModuleAsync(coreMock, vault);
    await coreWrapper.addModuleAsync(coreMock, rebalanceAuctionModule.address);

    factory = await coreWrapper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreWrapper.deployWhiteListAsync();
    rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );
    constantAuctionPriceCurve = await rebalancingWrapper.deployConstantAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_NUMERATOR,
      DEFAULT_AUCTION_PRICE_DENOMINATOR,
    );

    btcMedianizer = await oracleWrapper.deployMedianizerAsync();
    await oracleWrapper.addPriceFeedOwnerToMedianizer(btcMedianizer, deployerAccount);
    ethMedianizer = await oracleWrapper.deployMedianizerAsync();
    await oracleWrapper.addPriceFeedOwnerToMedianizer(ethMedianizer, deployerAccount);

    wrappedBTC = await erc20Wrapper.deployTokenAsync(deployerAccount, 8);
    wrappedETH = await erc20Wrapper.deployTokenAsync(deployerAccount, 18);
    await erc20Wrapper.approveTransfersAsync(
      [wrappedBTC, wrappedETH],
      transferProxy.address
    );
    await coreWrapper.addTokensToWhiteList(
      [wrappedBTC.address, wrappedETH.address],
      rebalancingComponentWhiteList
    );
    btcethRebalancingManager = await rebalancingWrapper.deployBTCETHRebalancingManagerAsync(
      coreMock.address,
      btcMedianizer.address,
      ethMedianizer.address,
      wrappedBTC.address,
      wrappedETH.address,
      factory.address,
      constantAuctionPriceCurve.address,
      ONE_DAY_IN_SECONDS,
    );

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreWrapper.addFactoryAsync(coreMock, rebalancingFactory);
    await coreWrapper.addAuthorizationAsync(vault, rebalanceAuctionModule.address);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#propose', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;

    let proposalPeriod: BigNumber;
    let btcPrice: BigNumber;
    let ethPrice: BigNumber;
    let ethUnit: BigNumber;

    let initialAllocationToken: SetTokenContract;

    before(async () => {
      btcPrice = new BigNumber(4082 * 10 ** 18);
      ethPrice = new BigNumber(128 * 10 ** 18);
      ethUnit = new BigNumber(28.999 * 10 ** 10);
    });

    beforeEach(async () => {
      initialAllocationToken = await coreWrapper.createSetTokenAsync(
        coreMock,
        factory.address,
        [wrappedBTC.address, wrappedETH.address],
        [new BigNumber(1), ethUnit],
        new BigNumber(10 ** 10),
      );

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        btcethRebalancingManager.address,
        initialAllocationToken.address,
        proposalPeriod
      );

      subjectRebalancingSetToken = rebalancingSetToken.address;
      subjectCaller = otherAccount;
      subjectTimeFastForward = ONE_DAY_IN_SECONDS.add(1);

      await rebalancingWrapper.addPriceLibraryAsync(
        coreMock,
        constantAuctionPriceCurve,
      );

      await oracleWrapper.updateMedianizerPriceAsync(
        btcMedianizer,
        btcPrice,
        SetProtocolTestUtils.generateTimestamp(1000),
      );

      await oracleWrapper.updateMedianizerPriceAsync(
        ethMedianizer,
        ethPrice,
        SetProtocolTestUtils.generateTimestamp(1000),
      );
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return btcethRebalancingManager.propose.sendTransactionAsync(
        subjectRebalancingSetToken,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when proposeNewRebalance is called from the Default state', async () => {
      it('updates new set token to the correct naturalUnit', async () => {
        await subject();

        const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
        const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
        const nextSetNaturalUnit = await nextSet.naturalUnit.callAsync();

        const expectedNextSetParams = rebalancingWrapper.getExpectedNextSetParameters(
          btcPrice,
          ethPrice
        );
        expect(nextSetNaturalUnit).to.be.bignumber.equal(expectedNextSetParams['naturalUnit']);
      });

      it('updates new set token to the correct units', async () => {
        await subject();

        const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
        const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
        const nextSetUnits = await nextSet.getUnits.callAsync();

        const expectedNextSetParams = rebalancingWrapper.getExpectedNextSetParameters(
          btcPrice,
          ethPrice
        );
        expect(JSON.stringify(nextSetUnits)).to.be.eql(JSON.stringify(expectedNextSetParams['units']));
      });

      it('updates new set token to the correct components', async () => {
        await subject();

        const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
        const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
        const nextSetComponents = await nextSet.getComponents.callAsync();

        const expectedNextSetComponents = [wrappedBTC.address, wrappedETH.address];
        expect(JSON.stringify(nextSetComponents)).to.be.eql(JSON.stringify(expectedNextSetComponents));
      });

      it('updates to the new auction library correctly', async () => {
        await subject();

        const newAuctionLibrary = await rebalancingSetToken.auctionLibrary.callAsync();
        expect(newAuctionLibrary).to.equal(constantAuctionPriceCurve.address);
      });

      it('updates the time to pivot correctly', async () => {
        await subject();

        const auctionParameters = await rebalancingSetToken.auctionParameters.callAsync();
        const newAuctionTimeToPivot = auctionParameters[1];
        expect(newAuctionTimeToPivot).to.be.bignumber.equal(ONE_DAY_IN_SECONDS);
      });

      it('updates the auction start price correctly', async () => {
        await subject();

        const auctionParameters = await rebalancingWrapper.getExpectedAuctionParameters(
          btcPrice.div(new BigNumber(10 ** 18)),
          ethPrice.div(new BigNumber(10 ** 18)),
          ONE_DAY_IN_SECONDS,
          initialAllocationToken,
        );

        const newAuctionParameters = await rebalancingSetToken.auctionParameters.callAsync();
        const newAuctionPivotPrice = newAuctionParameters[2];

        expect(newAuctionPivotPrice).to.be.bignumber.equal(auctionParameters['auctionStartPrice']);
      });

      it('updates the auction pivot price correctly', async () => {
        await subject();

        const auctionParameters = await rebalancingWrapper.getExpectedAuctionParameters(
          btcPrice.div(new BigNumber(10 ** 18)),
          ethPrice.div(new BigNumber(10 ** 18)),
          ONE_DAY_IN_SECONDS,
          initialAllocationToken,
        );

        const newAuctionParameters = await rebalancingSetToken.auctionParameters.callAsync();
        const newAuctionPivotPrice = newAuctionParameters[3];

        expect(newAuctionPivotPrice).to.be.bignumber.equal(auctionParameters['auctionPivotPrice']);
      });

      describe('but the price of ETH is greater than BTC (LOL)', async () => {
        before(async () => {
          btcPrice = new BigNumber(2000 * 10 ** 18);
          ethPrice = new BigNumber(2500 * 10 ** 18);
          ethUnit = new BigNumber(10 ** 10);
        });

        after(async () => {
          btcPrice = new BigNumber(3500 * 10 ** 18);
          ethPrice = new BigNumber(150 * 10 ** 18);
          ethUnit = new BigNumber(40 * 10 ** 10);
        });

        it('updates new set token to the correct naturalUnit', async () => {
          await subject();

          const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
          const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
          const nextSetNaturalUnit = await nextSet.naturalUnit.callAsync();

          const expectedNextSetParams = rebalancingWrapper.getExpectedNextSetParameters(
            btcPrice,
            ethPrice
          );
          expect(nextSetNaturalUnit).to.be.bignumber.equal(expectedNextSetParams['naturalUnit']);
        });

        it('updates new set token to the correct units', async () => {
          await subject();

          const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
          const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
          const nextSetUnits = await nextSet.getUnits.callAsync();

          const expectedNextSetParams = rebalancingWrapper.getExpectedNextSetParameters(
            btcPrice,
            ethPrice
          );
          expect(JSON.stringify(nextSetUnits)).to.be.eql(JSON.stringify(expectedNextSetParams['units']));
        });

        it('updates the auction start price correctly', async () => {
          await subject();

          const auctionParameters = await rebalancingWrapper.getExpectedAuctionParameters(
            btcPrice.div(new BigNumber(10 ** 18)),
            ethPrice.div(new BigNumber(10 ** 18)),
            ONE_DAY_IN_SECONDS,
            initialAllocationToken,
          );

          const newAuctionParameters = await rebalancingSetToken.auctionParameters.callAsync();
          const newAuctionPivotPrice = newAuctionParameters[2];

          expect(newAuctionPivotPrice).to.be.bignumber.equal(auctionParameters['auctionStartPrice']);
        });

        it('updates the auction pivot price correctly', async () => {
          await subject();

          const auctionParameters = await rebalancingWrapper.getExpectedAuctionParameters(
            btcPrice.div(new BigNumber(10 ** 18)),
            ethPrice.div(new BigNumber(10 ** 18)),
            ONE_DAY_IN_SECONDS,
            initialAllocationToken,
          );

          const newAuctionParameters = await rebalancingSetToken.auctionParameters.callAsync();
          const newAuctionPivotPrice = newAuctionParameters[3];

          expect(newAuctionPivotPrice).to.be.bignumber.equal(auctionParameters['auctionPivotPrice']);
        });
      });

      describe('but the computed token allocation is too close to 50/50', async () => {
        before(async () => {
          btcPrice = new BigNumber(4000 * 10 ** 18);
          ethPrice = new BigNumber(100 * 10 ** 18);
        });

        after(async () => {
          btcPrice = new BigNumber(3500 * 10 ** 18);
          ethPrice = new BigNumber(150 * 10 ** 18);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('but the rebalance interval has not elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = ONE_DAY_IN_SECONDS.sub(10);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when proposeNewRebalance is called from Proposal state', async () => {
      let timeJump: BigNumber;

      beforeEach(async () => {
        await blockchain.increaseTimeAsync(subjectTimeFastForward);
        await btcethRebalancingManager.propose.sendTransactionAsync(
          subjectRebalancingSetToken,
        );

        timeJump = new BigNumber(1000);
        await blockchain.increaseTimeAsync(timeJump);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when proposeNewRebalance is called from Rebalance state', async () => {
      beforeEach(async () => {
        await blockchain.increaseTimeAsync(subjectTimeFastForward);
        await btcethRebalancingManager.propose.sendTransactionAsync(
          subjectRebalancingSetToken,
        );

        // Transition to rebalance
        await blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
        await rebalancingSetToken.startRebalance.sendTransactionAsync();
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when proposeNewRebalance is called from Drawdown State', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(initialAllocationToken.address, ether(9), {from: deployerAccount});
        await erc20Wrapper.approveTransfersAsync([initialAllocationToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        // propose rebalance
        await blockchain.increaseTimeAsync(subjectTimeFastForward);
        await btcethRebalancingManager.propose.sendTransactionAsync(
          subjectRebalancingSetToken,
        );

        // Transition to rebalance
        await blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));

        await rebalancingSetToken.startRebalance.sendTransactionAsync(
          { from: otherAccount, gas: DEFAULT_GAS}
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const minimumBid = biddingParameters[0];
        await rebalanceAuctionModule.bid.sendTransactionAsync(
          rebalancingSetToken.address,
          minimumBid
        );

        await rebalancingSetToken.endFailedAuction.sendTransactionAsync(
          { from: otherAccount, gas: DEFAULT_GAS}
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});