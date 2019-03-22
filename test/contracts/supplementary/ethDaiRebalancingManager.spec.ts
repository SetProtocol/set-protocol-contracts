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
  ETHDaiRebalancingManagerContract,
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
  DEFAULT_AUCTION_PRICE_DIVISOR,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';
import { LogManagerProposal } from '@utils/contract_logs/ethDaiRebalancingManager';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { OracleWrapper } from '@utils/wrappers/oracleWrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const ETHDaiRebalancingManager = artifacts.require('ETHDaiRebalancingManager');
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);

contract('ETHDaiRebalancingManager', accounts => {
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
  let ethDaiRebalancingManager: ETHDaiRebalancingManagerContract;
  let ethMedianizer: MedianContract;
  let daiMock: StandardTokenMockContract;
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
    ABIDecoder.addABI(ETHDaiRebalancingManager.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalancingSetToken.abi);
    ABIDecoder.removeABI(ETHDaiRebalancingManager.abi);
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
      DEFAULT_AUCTION_PRICE_DIVISOR,
    );

    ethMedianizer = await oracleWrapper.deployMedianizerAsync();
    await oracleWrapper.addPriceFeedOwnerToMedianizer(ethMedianizer, deployerAccount);

    daiMock = await erc20Wrapper.deployTokenAsync(deployerAccount, 18);
    wrappedETH = await erc20Wrapper.deployTokenAsync(deployerAccount, 18);
    await erc20Wrapper.approveTransfersAsync(
      [daiMock, wrappedETH],
      transferProxy.address
    );
    await coreWrapper.addTokensToWhiteList(
      [daiMock.address, wrappedETH.address],
      rebalancingComponentWhiteList
    );

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreWrapper.addFactoryAsync(coreMock, rebalancingFactory);
    await coreWrapper.addAuthorizationAsync(vault, rebalanceAuctionModule.address);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectCoreAddress: Address;
    let subjectEthPriceFeedAddress: Address;
    let subjectDaiAddress: Address;
    let subjectEthAddress: Address;
    let subjectSetTokenFactory: Address;
    let subjectAuctionLibrary: Address;
    let subjectAuctionTimeToPivot: BigNumber;
    let subjectDaiMultiplier: BigNumber;
    let subjectEthMultiplier: BigNumber;
    let subjectLowerAllocationBound: BigNumber;
    let subjectUpperAllocationBound: BigNumber;

    beforeEach(async () => {
      subjectCoreAddress = coreMock.address;
      subjectEthPriceFeedAddress = ethMedianizer.address;
      subjectDaiAddress = daiMock.address;
      subjectEthAddress = wrappedETH.address;
      subjectSetTokenFactory = factory.address;
      subjectAuctionLibrary = constantAuctionPriceCurve.address;
      subjectAuctionTimeToPivot = ONE_DAY_IN_SECONDS;
      subjectDaiMultiplier = new BigNumber(1);
      subjectEthMultiplier = new BigNumber(1);
      subjectLowerAllocationBound = new BigNumber(48);
      subjectUpperAllocationBound = new BigNumber(52);
    });

    async function subject(): Promise<ETHDaiRebalancingManagerContract> {
      return rebalancingWrapper.deployETHDaiRebalancingManagerAsync(
        subjectCoreAddress,
        subjectEthPriceFeedAddress,
        subjectDaiAddress,
        subjectEthAddress,
        subjectSetTokenFactory,
        subjectAuctionLibrary,
        subjectAuctionTimeToPivot,
        [subjectDaiMultiplier, subjectEthMultiplier],
        [subjectLowerAllocationBound, subjectUpperAllocationBound]
      );
    }

    it('sets dai address', async () => {
      const rebalancingManager = await subject();

      const actualDaiAddress = await rebalancingManager.daiAddress.callAsync();

      expect(actualDaiAddress).to.be.equal(subjectDaiAddress);
    });

    it('sets weth address', async () => {
      const rebalancingManager = await subject();

      const actualEthAddress = await rebalancingManager.ethAddress.callAsync();

      expect(actualEthAddress).to.be.equal(subjectEthAddress);
    });

    it('sets set token factory', async () => {
      const rebalancingManager = await subject();

      const actualSetTokenFactory = await rebalancingManager.setTokenFactory.callAsync();

      expect(actualSetTokenFactory).to.be.equal(subjectSetTokenFactory);
    });

    it('sets auction library', async () => {
      const rebalancingManager = await subject();

      const actualAuctionLibrary = await rebalancingManager.auctionLibrary.callAsync();

      expect(actualAuctionLibrary).to.be.equal(subjectAuctionLibrary);
    });

    it('sets correct auctionTimeToPivot', async () => {
      const rebalancingManager = await subject();

      const actualAuctionTimeToPivot = await rebalancingManager.auctionTimeToPivot.callAsync();

      expect(actualAuctionTimeToPivot).to.be.bignumber.eql(subjectAuctionTimeToPivot);
    });

    it('sets correct daiMultiplier', async () => {
      const rebalancingManager = await subject();

      const actualDaiMultiplier = await rebalancingManager.daiMultiplier.callAsync();

      expect(actualDaiMultiplier).to.be.bignumber.eql(subjectDaiMultiplier);
    });

    it('sets correct ethMultiplier', async () => {
      const rebalancingManager = await subject();

      const actualEthMultiplier = await rebalancingManager.ethMultiplier.callAsync();

      expect(actualEthMultiplier).to.be.bignumber.eql(subjectEthMultiplier);
    });

    it('sets correct ethPriceFeed', async () => {
      const rebalancingManager = await subject();

      const ethPriceFeed = await rebalancingManager.ethPriceFeed.callAsync();

      expect(ethPriceFeed).to.be.bignumber.eql(subjectEthPriceFeedAddress);
    });

    it('sets correct maximumLowerThreshold', async () => {
      const rebalancingManager = await subject();

      const maximumLowerThreshold = await rebalancingManager.maximumLowerThreshold.callAsync();

      expect(maximumLowerThreshold).to.be.bignumber.eql(subjectLowerAllocationBound);
    });

    it('sets correct minimumUpperThreshold', async () => {
      const rebalancingManager = await subject();

      const minimumUpperThreshold = await rebalancingManager.minimumUpperThreshold.callAsync();

      expect(minimumUpperThreshold).to.be.bignumber.eql(subjectUpperAllocationBound);
    });

    describe('when lower allocation bound is greater than upper', async () => {
      beforeEach(async () => {
        subjectLowerAllocationBound = new BigNumber(52);
        subjectUpperAllocationBound = new BigNumber(48);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#propose', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;

    let proposalPeriod: BigNumber;
    let daiMultiplier: BigNumber;
    let ethMultiplier: BigNumber;
    let lowerAllocationBound: BigNumber;
    let upperAllocationBound: BigNumber;
    let ethPrice: BigNumber;
    let daiUnit: BigNumber;

    const DAI_PRICE: BigNumber = new BigNumber(10 ** 18);
    const DAI_DECIMALS: BigNumber = new BigNumber(10 ** 18);
    const ETH_DECIMALS: BigNumber = new BigNumber(10 ** 18);
    const PRICE_PRECISION: BigNumber = new BigNumber(100);

    let initialAllocationToken: SetTokenContract;

    before(async () => {
      daiMultiplier = new BigNumber(1);
      ethMultiplier = new BigNumber(1);

      ethPrice = new BigNumber(128 * 10 ** 18);
      daiUnit = new BigNumber(115);
    });

    beforeEach(async () => {
      lowerAllocationBound = new BigNumber(48);
      upperAllocationBound = new BigNumber(52);
      ethDaiRebalancingManager = await rebalancingWrapper.deployETHDaiRebalancingManagerAsync(
        coreMock.address,
        ethMedianizer.address,
        daiMock.address,
        wrappedETH.address,
        factory.address,
        constantAuctionPriceCurve.address,
        ONE_DAY_IN_SECONDS,
        [daiMultiplier, ethMultiplier],
        [lowerAllocationBound, upperAllocationBound]
      );

      initialAllocationToken = await coreWrapper.createSetTokenAsync(
        coreMock,
        factory.address,
        [daiMock.address, wrappedETH.address],
        [daiUnit.mul(daiMultiplier).mul(100), ethMultiplier.mul(100)],
        new BigNumber(100),
      );

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        ethDaiRebalancingManager.address,
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
        ethMedianizer,
        ethPrice,
        SetTestUtils.generateTimestamp(1000),
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(
        initialAllocationToken.address,
        ether(9),
        {from: deployerAccount, gas: DEFAULT_GAS},
      );
      await erc20Wrapper.approveTransfersAsync([initialAllocationToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, ether(7), { gas: DEFAULT_GAS });
    });

    async function subject(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return ethDaiRebalancingManager.propose.sendTransactionAsync(
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

        const expectedNextSetParams = rebalancingWrapper.getExpectedGeneralNextSetParameters(
          DAI_PRICE,
          ethPrice,
          daiMultiplier,
          ethMultiplier,
          DAI_DECIMALS.div(ETH_DECIMALS),
          PRICE_PRECISION,
        );
        expect(nextSetNaturalUnit).to.be.bignumber.equal(expectedNextSetParams['naturalUnit']);
      });

      it('updates new set token to the correct units', async () => {
        await subject();

        const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
        const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
        const nextSetUnits = await nextSet.getUnits.callAsync();

        const expectedNextSetParams = rebalancingWrapper.getExpectedGeneralNextSetParameters(
          DAI_PRICE,
          ethPrice,
          daiMultiplier,
          ethMultiplier,
          DAI_DECIMALS.div(ETH_DECIMALS),
          PRICE_PRECISION,
        );
        expect(JSON.stringify(nextSetUnits)).to.be.eql(JSON.stringify(expectedNextSetParams['units']));
      });

      it('updates new set token to the correct components', async () => {
        await subject();

        const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
        const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
        const nextSetComponents = await nextSet.getComponents.callAsync();

        const expectedNextSetComponents = [daiMock.address, wrappedETH.address];
        expect(JSON.stringify(nextSetComponents)).to.be.eql(JSON.stringify(expectedNextSetComponents));
      });

      it('updates to the new auction library correctly', async () => {
        await subject();

        const newAuctionLibrary = await rebalancingSetToken.auctionLibrary.callAsync();
        expect(newAuctionLibrary).to.equal(constantAuctionPriceCurve.address);
      });

      it('updates the time to pivot correctly', async () => {
        await subject();

        const auctionPriceParameters = await rebalancingSetToken.auctionPriceParameters.callAsync();
        const newAuctionTimeToPivot = auctionPriceParameters[1];
        expect(newAuctionTimeToPivot).to.be.bignumber.equal(ONE_DAY_IN_SECONDS);
      });

      it('updates the auction start price correctly', async () => {
        await subject();

        const auctionPriceParameters = await rebalancingWrapper.getExpectedGeneralAuctionParameters(
          DAI_PRICE,
          ethPrice,
          daiMultiplier,
          ethMultiplier,
          DAI_DECIMALS,
          ETH_DECIMALS,
          PRICE_PRECISION,
          ONE_DAY_IN_SECONDS,
          initialAllocationToken,
        );

        const newAuctionParameters = await rebalancingSetToken.auctionPriceParameters.callAsync();
        const newAuctionPivotPrice = newAuctionParameters[2];

        expect(newAuctionPivotPrice).to.be.bignumber.equal(auctionPriceParameters['auctionStartPrice']);
      });

      it('updates the auction pivot price correctly', async () => {
        await subject();

        const auctionPriceParameters = await rebalancingWrapper.getExpectedGeneralAuctionParameters(
          DAI_PRICE,
          ethPrice,
          daiMultiplier,
          ethMultiplier,
          DAI_DECIMALS,
          ETH_DECIMALS,
          PRICE_PRECISION,
          ONE_DAY_IN_SECONDS,
          initialAllocationToken,
        );

        const newAuctionParameters = await rebalancingSetToken.auctionPriceParameters.callAsync();
        const newAuctionPivotPrice = newAuctionParameters[3];

        expect(newAuctionPivotPrice).to.be.bignumber.equal(auctionPriceParameters['auctionPivotPrice']);
      });

      it('emits correct LogProposal event', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = LogManagerProposal(
          ethPrice,
          ethDaiRebalancingManager.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });

      describe('when the new allocation is 75/25', async () => {
        before(async () => {
          daiMultiplier = new BigNumber(3);
          ethMultiplier = new BigNumber(1);
        });

        after(async () => {
          daiMultiplier = new BigNumber(1);
          ethMultiplier = new BigNumber(1);
        });

        it('updates new set token to the correct naturalUnit', async () => {
          await subject();

          const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
          const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
          const nextSetNaturalUnit = await nextSet.naturalUnit.callAsync();

          const expectedNextSetParams = rebalancingWrapper.getExpectedGeneralNextSetParameters(
            DAI_PRICE,
            ethPrice,
            daiMultiplier,
            ethMultiplier,
            DAI_DECIMALS.div(ETH_DECIMALS),
            PRICE_PRECISION,
          );
          expect(nextSetNaturalUnit).to.be.bignumber.equal(expectedNextSetParams['naturalUnit']);
        });

        it('updates new set token to the correct units', async () => {
          await subject();

          const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
          const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
          const nextSetUnits = await nextSet.getUnits.callAsync();

          const expectedNextSetParams = rebalancingWrapper.getExpectedGeneralNextSetParameters(
            DAI_PRICE,
            ethPrice,
            daiMultiplier,
            ethMultiplier,
            DAI_DECIMALS.div(ETH_DECIMALS),
            PRICE_PRECISION,
          );

          expect(JSON.stringify(nextSetUnits)).to.be.eql(JSON.stringify(expectedNextSetParams['units']));
        });
      });

      describe('but the price of Dai is greater than ETH', async () => {
        before(async () => {
          ethPrice = new BigNumber(7 * 10 ** 17);
          daiUnit = new BigNumber(1);
        });

        after(async () => {
          ethPrice = new BigNumber(150 * 10 ** 18);
          daiUnit = new BigNumber(115);
        });

        it('updates new set token to the correct naturalUnit', async () => {
          await subject();

          const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
          const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
          const nextSetNaturalUnit = await nextSet.naturalUnit.callAsync();

          const expectedNextSetParams = rebalancingWrapper.getExpectedGeneralNextSetParameters(
            DAI_PRICE,
            ethPrice,
            daiMultiplier,
            ethMultiplier,
            DAI_DECIMALS.div(ETH_DECIMALS),
            PRICE_PRECISION,
          );
          expect(nextSetNaturalUnit).to.be.bignumber.equal(expectedNextSetParams['naturalUnit']);
        });

        it('updates new set token to the correct units', async () => {
          await subject();

          const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
          const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
          const nextSetUnits = await nextSet.getUnits.callAsync();

          const expectedNextSetParams = rebalancingWrapper.getExpectedGeneralNextSetParameters(
            DAI_PRICE,
            ethPrice,
            daiMultiplier,
            ethMultiplier,
            DAI_DECIMALS.div(ETH_DECIMALS),
            PRICE_PRECISION,
          );
          expect(JSON.stringify(nextSetUnits)).to.be.eql(JSON.stringify(expectedNextSetParams['units']));
        });

        it('updates the auction start price correctly', async () => {
          await subject();

          const auctionPriceParameters = await rebalancingWrapper.getExpectedGeneralAuctionParameters(
            DAI_PRICE,
            ethPrice,
            daiMultiplier,
            ethMultiplier,
            DAI_DECIMALS,
            ETH_DECIMALS,
            PRICE_PRECISION,
            ONE_DAY_IN_SECONDS,
            initialAllocationToken,
          );

          const newAuctionParameters = await rebalancingSetToken.auctionPriceParameters.callAsync();
          const newAuctionPivotPrice = newAuctionParameters[2];

          expect(newAuctionPivotPrice).to.be.bignumber.equal(auctionPriceParameters['auctionStartPrice']);
        });

        it('updates the auction pivot price correctly', async () => {
          await subject();

          const auctionPriceParameters = await rebalancingWrapper.getExpectedGeneralAuctionParameters(
            DAI_PRICE,
            ethPrice,
            daiMultiplier,
            ethMultiplier,
            DAI_DECIMALS,
            ETH_DECIMALS,
            PRICE_PRECISION,
            ONE_DAY_IN_SECONDS,
            initialAllocationToken,
          );

          const newAuctionParameters = await rebalancingSetToken.auctionPriceParameters.callAsync();
          const newAuctionPivotPrice = newAuctionParameters[3];

          expect(newAuctionPivotPrice).to.be.bignumber.equal(auctionPriceParameters['auctionPivotPrice']);
        });

        describe('but the new allocation is 75/25', async () => {
          before(async () => {
            daiMultiplier = new BigNumber(3);
            ethMultiplier = new BigNumber(1);
          });

          after(async () => {
            daiMultiplier = new BigNumber(1);
            ethMultiplier = new BigNumber(1);
          });

          it('updates new set token to the correct naturalUnit', async () => {
            await subject();

            const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
            const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
            const nextSetNaturalUnit = await nextSet.naturalUnit.callAsync();

            const expectedNextSetParams = rebalancingWrapper.getExpectedGeneralNextSetParameters(
              DAI_PRICE,
              ethPrice,
              daiMultiplier,
              ethMultiplier,
              DAI_DECIMALS.div(ETH_DECIMALS),
              PRICE_PRECISION,
            );
            expect(nextSetNaturalUnit).to.be.bignumber.equal(expectedNextSetParams['naturalUnit']);
          });

          it('updates new set token to the correct units', async () => {
            await subject();

            const nextSetAddress = await rebalancingSetToken.nextSet.callAsync();
            const nextSet = await rebalancingWrapper.getExpectedSetTokenAsync(nextSetAddress);
            const nextSetUnits = await nextSet.getUnits.callAsync();

            const expectedNextSetParams = rebalancingWrapper.getExpectedGeneralNextSetParameters(
              DAI_PRICE,
              ethPrice,
              daiMultiplier,
              ethMultiplier,
              DAI_DECIMALS.div(ETH_DECIMALS),
              PRICE_PRECISION,
            );
            expect(JSON.stringify(nextSetUnits)).to.be.eql(JSON.stringify(expectedNextSetParams['units']));
          });
        });
      });

      describe('but the computed token allocation is too close to the bounds', async () => {
        before(async () => {
          ethPrice = new BigNumber(112 * 10 ** 18);
        });

        after(async () => {
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
        await ethDaiRebalancingManager.propose.sendTransactionAsync(
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
        await ethDaiRebalancingManager.propose.sendTransactionAsync(
          subjectRebalancingSetToken,
        );

        // Transition to rebalance
        await blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));
        await rebalancingSetToken.startRebalance.sendTransactionAsync(
          { from: otherAccount, gas: DEFAULT_GAS }
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when proposeNewRebalance is called from Drawdown State', async () => {
      beforeEach(async () => {
        // propose rebalance
        await blockchain.increaseTimeAsync(subjectTimeFastForward);
        await ethDaiRebalancingManager.propose.sendTransactionAsync(
          subjectRebalancingSetToken,
        );

        // Transition to rebalance
        await blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS.add(1));

        await rebalancingSetToken.startRebalance.sendTransactionAsync(
          { from: otherAccount, gas: DEFAULT_GAS }
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const minimumBid = biddingParameters[0];
        await rebalanceAuctionModule.bid.sendTransactionAsync(
          rebalancingSetToken.address,
          minimumBid,
          false
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