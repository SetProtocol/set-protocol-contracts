require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  OracleWhiteListContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TWAPAuctionMockContract,
  TransferProxyContract,
  VaultContract,
  SetTokenContract,
  TWAPAuctionCallerContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import { AssetPairVolumeBounds } from '@utils/auction';
import { getSubjectTimestamp, expectNoRevertError, expectRevertError } from '@utils/tokenAssertions';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import {
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO
} from '@utils/constants';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

contract('TWAPAuction', accounts => {
  const [
    deployerAccount,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  let twapAuction: TWAPAuctionMockContract;
  let oracleWhiteList: OracleWhiteListContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper, valuationHelper);

  let wrappedETH: StandardTokenMockContract;
  let wrappedBTC: StandardTokenMockContract;
  let usdc: StandardTokenMockContract;
  let dai: StandardTokenMockContract;

  let wrappedETHPrice: BigNumber;
  let wrappedBTCPrice: BigNumber;
  let usdcPrice: BigNumber;
  let daiPrice: BigNumber;

  let wrappedETHOracle: UpdatableOracleMockContract;
  let wrappedBTCOracle: UpdatableOracleMockContract;
  let usdcOracle: UpdatableOracleMockContract;
  let daiOracle: UpdatableOracleMockContract;

  let set1: SetTokenContract;
  let set2: SetTokenContract;
  let set3: SetTokenContract;

  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;
  let assetPairVolumeBounds: AssetPairVolumeBounds[];

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(TWAPAuctionMockContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);

    wrappedETH = await erc20Helper.deployTokenAsync(deployerAccount, 18);
    wrappedBTC = await erc20Helper.deployTokenAsync(deployerAccount, 8);
    usdc = await erc20Helper.deployTokenAsync(deployerAccount, 6);
    dai = await erc20Helper.deployTokenAsync(deployerAccount, 18);

    wrappedETHPrice = ether(128);
    wrappedBTCPrice = ether(7500);
    usdcPrice = ether(1);
    daiPrice = ether(1);

    wrappedETHOracle = await oracleHelper.deployUpdatableOracleMockAsync(wrappedETHPrice);
    wrappedBTCOracle = await oracleHelper.deployUpdatableOracleMockAsync(wrappedBTCPrice);
    usdcOracle = await oracleHelper.deployUpdatableOracleMockAsync(usdcPrice);
    daiOracle = await oracleHelper.deployUpdatableOracleMockAsync(daiPrice);

    const set1Components = [wrappedETH.address, usdc.address];
    const set1Units = [new BigNumber(10 ** 13), new BigNumber(1280)];
    const set1NaturalUnit = new BigNumber(10 ** 13);
    set1 = await coreHelper.createSetTokenAsync(
      coreMock,
      setTokenFactory.address,
      set1Components,
      set1Units,
      set1NaturalUnit,
    );

    const set2Components = [wrappedETH.address, usdc.address];
    const set2Units = [new BigNumber(10 ** 13), new BigNumber(5120)];
    const set2NaturalUnit = new BigNumber(10 ** 13);
    set2 = await coreHelper.createSetTokenAsync(
      coreMock,
      setTokenFactory.address,
      set2Components,
      set2Units,
      set2NaturalUnit,
    );

    const set3Components = [usdc.address];
    const set3Units = [new BigNumber(5120)];
    const set3NaturalUnit = new BigNumber(10 ** 13);
    set3 = await coreHelper.createSetTokenAsync(
      coreMock,
      setTokenFactory.address,
      set3Components,
      set3Units,
      set3NaturalUnit,
    );

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [wrappedETH.address, wrappedBTC.address, usdc.address, dai.address],
      [wrappedETHOracle.address, wrappedBTCOracle.address, usdcOracle.address, daiOracle.address],
    );

    auctionPeriod = new BigNumber(14400); // 4 hours
    rangeStart = ether(.03); // 3%
    rangeEnd = ether(.21); // 21%
    assetPairVolumeBounds = [
      {assetOne: wrappedETH.address, assetTwo: wrappedBTC.address, bounds: {lower: ZERO, upper: ether(10 ** 6)}},
      {assetOne: wrappedETH.address, assetTwo: usdc.address, bounds: {lower: ether(10 ** 4), upper: ether(10 ** 6)}},
    ];
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(TWAPAuctionMockContract.getAbi());
  });

  describe('#constructor', async () => {
    let subjectOracleWhiteList: Address;
    let subjectAuctionPeriod: BigNumber;
    let subjectRangeStart: BigNumber;
    let subjectRangeEnd: BigNumber;
    let subjectAssetPairVolumeBounds: any[];

    beforeEach(async () => {
      subjectOracleWhiteList = oracleWhiteList.address;
      subjectAuctionPeriod = auctionPeriod;
      subjectRangeStart = rangeStart;
      subjectRangeEnd = rangeEnd;
      subjectAssetPairVolumeBounds = assetPairVolumeBounds;
    });

    async function subject(): Promise<TWAPAuctionMockContract> {
      return liquidatorHelper.deployTWAPAuctionMock(
        subjectOracleWhiteList,
        subjectAuctionPeriod,
        subjectRangeStart,
        subjectRangeEnd,
        subjectAssetPairVolumeBounds
      );
    }

    it('sets the correct chunkSizeWhiteList', async () => {
      twapAuction = await subject();

      const pairOne: any = await twapAuction.chunkSizeWhiteList.callAsync(
        subjectAssetPairVolumeBounds[0].assetOne,
        subjectAssetPairVolumeBounds[0].assetTwo,
      );
      const pairTwo: any = await twapAuction.chunkSizeWhiteList.callAsync(
        subjectAssetPairVolumeBounds[1].assetOne,
        subjectAssetPairVolumeBounds[1].assetTwo
      );

      expect(pairOne.lower).to.equal(subjectAssetPairVolumeBounds[0].bounds.lower.toString());
      expect(pairOne.upper).to.equal(subjectAssetPairVolumeBounds[0].bounds.upper.toString());
      expect(pairTwo.lower).to.equal(subjectAssetPairVolumeBounds[1].bounds.lower.toString());
      expect(pairTwo.upper).to.equal(subjectAssetPairVolumeBounds[1].bounds.upper.toString());
    });

    it('sets the correct expected chunk auction length', async () => {
      twapAuction = await subject();

      const actualExpectedAuctionLength = await twapAuction.expectedChunkAuctionLength.callAsync();

      const expectedAuctionLength = subjectAuctionPeriod
        .mul(subjectRangeStart.add(ether(.02)))
        .div(subjectRangeStart.add(subjectRangeEnd))
        .round(0, 3);

      expect(actualExpectedAuctionLength).to.be.bignumber.equal(expectedAuctionLength);
    });

    describe('when invalid bounds are passed', async () => {
      beforeEach(async () => {
        subjectAssetPairVolumeBounds = [
          {
            assetOne: wrappedETH.address,
            assetTwo: wrappedBTC.address,
            bounds: {lower: ZERO, upper: ether(10 ** 6)},
          },
          {
            assetOne: wrappedETH.address,
            assetTwo: usdc.address,
            bounds: {lower: ether(10 ** 7), upper: ether(10 ** 6)},
          },
        ];
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when duplicate bounds are passed', async () => {
      beforeEach(async () => {
        subjectAssetPairVolumeBounds = [
          {assetOne: wrappedETH.address, assetTwo: wrappedBTC.address, bounds: {lower: ZERO, upper: ether(10 ** 6)}},
          {assetOne: wrappedETH.address, assetTwo: wrappedBTC.address, bounds: {lower: ZERO, upper: ether(10 ** 6)}},
        ];
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when rangeEnd is less than the auction completion buffer', async () => {
      beforeEach(async () => {
        subjectRangeEnd = ether(.01);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when rangeEnd exceeds 100%', async () => {
      beforeEach(async () => {
        subjectRangeEnd = ether(1.01);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when rangeStart exceeds 100%', async () => {
      beforeEach(async () => {
        subjectRangeStart = ether(1.01);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when auctionPeriod too high', async () => {
      beforeEach(async () => {
        subjectAuctionPeriod = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when expectedAuctionLength is 0', async () => {
      beforeEach(async () => {
        subjectAuctionPeriod = new BigNumber(1);
      });

      it('reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#initializeTWAPAuction', async () => {
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSets: BigNumber;
    let subjectChunkSizeValue: BigNumber;
    let subjectChunkAuctionPeriod: BigNumber;

    beforeEach(async () => {
      twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
        oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairVolumeBounds
      );

      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
      subjectStartingCurrentSets = ether(2000);
      subjectChunkSizeValue = ether(10 ** 5);
      subjectChunkAuctionPeriod = ONE_HOUR_IN_SECONDS;
    });

    async function subject(): Promise<string> {
      return twapAuction.testInitializeTWAPAuction.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSets,
        subjectChunkSizeValue,
        subjectChunkAuctionPeriod
      );
    }

    it('sets the correct orderSize', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();
      const { minimumBid } = twapState.chunkAuction.auction;
      const expectedOrderSize = subjectStartingCurrentSets.div(minimumBid).round(0, 3).mul(minimumBid);

      expect(twapState.orderSize).to.be.bignumber.equal(expectedOrderSize);
    });

    it('sets the correct orderRemaining', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();
      const { minimumBid } = twapState.chunkAuction.auction;
      const chunkSize = await liquidatorHelper.calculateChunkSize(
        set1,
        set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        subjectChunkSizeValue,
      );
      const expectedOrderSize = subjectStartingCurrentSets.div(minimumBid).round(0, 3).mul(minimumBid);
      const expectedChunkSize = chunkSize.div(minimumBid).round(0, 3).mul(minimumBid);

      expect(twapState.orderRemaining).to.be.bignumber.equal(expectedOrderSize.sub(expectedChunkSize));
    });

    it('sets the correct startingCurrentSets', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();
      const { minimumBid } = twapState.chunkAuction.auction;
      const chunkSize = await liquidatorHelper.calculateChunkSize(
        set1,
        set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        subjectChunkSizeValue,
      );
      const expectedChunkSize = chunkSize.div(minimumBid).round(0, 3).mul(minimumBid);

      expect(twapState.chunkAuction.auction.startingCurrentSets).to.be.bignumber.equal(
        expectedChunkSize
      );
    });

    it('sets the correct lastChunkAuctionEnd', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();
      expect(twapState.lastChunkAuctionEnd).to.be.bignumber.equal(ZERO);
    });

    it('sets the correct chunkAuctionPeriod', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.chunkAuctionPeriod).to.be.bignumber.equal(subjectChunkAuctionPeriod);
    });

    it('sets the correct chunkSize', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();
      const { minimumBid } = twapState.chunkAuction.auction;
      const chunkSize = await liquidatorHelper.calculateChunkSize(
        set1,
        set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        subjectChunkSizeValue,
      );
      const expectedChunkSize = chunkSize.div(minimumBid).round(0, 3).mul(minimumBid);

      expect(twapState.chunkSize).to.be.bignumber.equal(expectedChunkSize);
    });

    describe('for an auction that does not need to be chunked', async () => {
      beforeEach(async () => {
        subjectStartingCurrentSets = ether(1000);
      });

      it('sets the correct chunkSize', async () => {
        await subject();

        const twapState: any = await twapAuction.twapState.callAsync();
        const expectedChunkSize = await liquidatorHelper.calculateChunkSize(
          set1,
          set2,
          oracleWhiteList,
          subjectStartingCurrentSets,
          subjectChunkSizeValue,
        );

        expect(twapState.chunkSize).to.be.bignumber.equal(expectedChunkSize);
      });

      it('sets the correct orderRemaining', async () => {
        await subject();

        const twapState: any = await twapAuction.twapState.callAsync();

        expect(twapState.orderRemaining).to.be.bignumber.equal(ZERO);
      });
    });

    describe('when a collateral has one asset', async () => {
      beforeEach(async () => {
        subjectNextSet = set3.address;
      });

      it('sets the correct chunkSize', async () => {
        await subject();

        const twapState: any = await twapAuction.twapState.callAsync();
        const expectedChunkSize = await liquidatorHelper.calculateChunkSize(
          set1,
          set3,
          oracleWhiteList,
          subjectStartingCurrentSets,
          subjectChunkSizeValue,
        );

        expect(twapState.chunkSize).to.be.bignumber.equal(expectedChunkSize);
      });

      it('sets the correct orderRemaining', async () => {
        await subject();

        const twapState: any = await twapAuction.twapState.callAsync();
        const expectedChunkSize = await liquidatorHelper.calculateChunkSize(
          set1,
          set3,
          oracleWhiteList,
          subjectStartingCurrentSets,
          subjectChunkSizeValue,
        );

        expect(twapState.orderRemaining).to.be.bignumber.equal(subjectStartingCurrentSets.sub(expectedChunkSize));
      });
    });
  });

  describe('#auctionNextChunk', async () => {
    let currentSet: Address;
    let nextSet: Address;
    let startingCurrentSets: BigNumber;
    let chunkSizeValue: BigNumber;
    let chunkAuctionPeriod: BigNumber;

    let postChunkSetsRemaining: BigNumber;

    before(async () => {
      startingCurrentSets = ether(3000);
      postChunkSetsRemaining = new BigNumber(10 ** 13);
    });

    beforeEach(async () => {
      twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
        oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairVolumeBounds
      );

      currentSet = set1.address;
      nextSet = set2.address;
      chunkSizeValue = ether(10 ** 5),
      chunkAuctionPeriod = ONE_HOUR_IN_SECONDS,
      await twapAuction.testInitializeTWAPAuction.sendTransactionAsync(
        currentSet,
        nextSet,
        startingCurrentSets,
        chunkSizeValue,
        chunkAuctionPeriod
      );

      await twapAuction.setRemainingCurrentSets.sendTransactionAsync(postChunkSetsRemaining);
    });

    async function subject(): Promise<string> {
      return twapAuction.testAuctionNextChunk.sendTransactionAsync();
    }

    it('sets the correct orderRemaining', async () => {
      const preTWAPState: any = await twapAuction.twapState.callAsync();

      await subject();

      const newChunkSize = BigNumber.min(preTWAPState.chunkSize, preTWAPState.orderRemaining);
      const expectedOrderRemaining = new BigNumber(preTWAPState.orderRemaining).sub(newChunkSize)
                                        .add(postChunkSetsRemaining);

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.orderRemaining).to.be.bignumber.equal(expectedOrderRemaining);
    });

    it('sets the correct startingCurrentSets', async () => {
      const preTWAPState: any = await twapAuction.twapState.callAsync();

      await subject();

      const newChunkSize = BigNumber.min(preTWAPState.chunkSize, preTWAPState.orderRemaining);

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.chunkAuction.auction.startingCurrentSets).to.be.bignumber.equal(newChunkSize);
    });

    it('sets the correct remainingCurrentSets', async () => {
      const preTWAPState: any = await twapAuction.twapState.callAsync();

      await subject();

      const newChunkSize = BigNumber.min(preTWAPState.chunkSize, preTWAPState.orderRemaining);

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.chunkAuction.auction.remainingCurrentSets).to.be.bignumber.equal(newChunkSize);
    });

    it('sets the correct startTime', async () => {
      const subjectTimestamp = await getSubjectTimestamp(subject());

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.chunkAuction.auction.startTime).to.be.bignumber.equal(subjectTimestamp);
    });

    it('sets the correct endTime', async () => {
      const subjectTimestamp = await getSubjectTimestamp(subject());

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.chunkAuction.endTime).to.be.bignumber.equal(subjectTimestamp.add(auctionPeriod));
    });

    it('does not change the minimumBid', async () => {
      const preTWAPState: any = await twapAuction.twapState.callAsync();

      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.chunkAuction.auction.minimumBid).to.be.bignumber.equal(
        preTWAPState.chunkAuction.auction.minimumBid
      );
    });

    it('does not change the combinedTokenArray', async () => {
      const preTWAPState: any = await twapAuction.twapState.callAsync();

      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(JSON.stringify(twapState.chunkAuction.auction.combinedTokenArray)).to.equal(
        JSON.stringify(preTWAPState.chunkAuction.auction.combinedTokenArray)
      );
    });

    it('does not change the combinedCurrentSetUnits', async () => {
      const preTWAPState: any = await twapAuction.twapState.callAsync();

      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(JSON.stringify(twapState.chunkAuction.auction.combinedCurrentSetUnits)).to.equal(
        JSON.stringify(preTWAPState.chunkAuction.auction.combinedCurrentSetUnits)
      );
    });

    it('does not change the combinedNextSetUnits', async () => {
      const preTWAPState: any = await twapAuction.twapState.callAsync();

      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(JSON.stringify(twapState.chunkAuction.auction.combinedNextSetUnits)).to.equal(
        JSON.stringify(preTWAPState.chunkAuction.auction.combinedNextSetUnits)
      );
    });

    describe('when orderRemaining should be zeroed out', async () => {
      before(async () => {
        startingCurrentSets = ether(2000);
      });

      after(async () => {
        startingCurrentSets = ether(3000);
      });

      it('sets the correct orderRemaining', async () => {
        await subject();

        const twapState: any = await twapAuction.twapState.callAsync();

        expect(twapState.orderRemaining).to.be.bignumber.equal(ZERO);
      });

      it('sets the correct startingCurrentSets', async () => {
        const preTWAPState: any = await twapAuction.twapState.callAsync();

        await subject();

        const newChunkSize = BigNumber.min(
          preTWAPState.chunkSize,
          new BigNumber(preTWAPState.orderRemaining).add(postChunkSetsRemaining)
        );

        const twapState: any = await twapAuction.twapState.callAsync();

        expect(twapState.chunkAuction.auction.startingCurrentSets).to.be.bignumber.equal(newChunkSize);
      });
    });
  });

  describe('#validateLiquidatorData', async () => {
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSets: BigNumber;
    let subjectChunkSizeValue: BigNumber;
    let subjectChunkAuctionPeriod: BigNumber;

    let auctionCaller: TWAPAuctionCallerContract;

    let chunkSizeValue: BigNumber;
    let chunkAuctionPeriod: BigNumber;

    before(async () => {
      chunkSizeValue = ether(10 ** 5);
      chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;
    });

    beforeEach(async () => {
      twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
        oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairVolumeBounds
      );

      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
      subjectStartingCurrentSets = ether(2000);
      subjectChunkSizeValue = chunkSizeValue;
      subjectChunkAuctionPeriod = chunkAuctionPeriod;
      auctionCaller = await liquidatorHelper.deployTWAPAuctionCallerAsync(
        twapAuction.address
      );
    });

    async function subject(): Promise<string> {
      return auctionCaller.validateLiquidatorData.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSets,
        subjectChunkSizeValue,
        subjectChunkAuctionPeriod
      );
    }

    it('does not revert', async () => {
      await expectNoRevertError(subject());
    });

    describe('when passed chunk size is not within the bounds', async () => {
      before(async () => {
        chunkSizeValue = ether(10 ** 7);
      });

      after(async () => {
        chunkSizeValue = ether(10 ** 5);
      });

      it('it reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when expected auction time would exceed failAuctionPeriod', async () => {
      before(async () => {
        chunkAuctionPeriod = ONE_DAY_IN_SECONDS;
      });

      after(async () => {
        chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;
      });

      it('it reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#validateNextChunkAuction', async () => {
    let startingCurrentSets: BigNumber;
    let chunkSizeValue: BigNumber;
    let chunkAuctionPeriod: BigNumber;
    let isChunksAuctionFinished: boolean;

    before(async () => {
      isChunksAuctionFinished = true;
      startingCurrentSets = ether(2000);
    });

    beforeEach(async () => {
      twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
        oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairVolumeBounds
      );

      const currentSet = set1.address;
      const nextSet = set2.address;
      chunkSizeValue = ether(10 ** 5),
      chunkAuctionPeriod = ONE_HOUR_IN_SECONDS,

      await twapAuction.testInitializeTWAPAuction.sendTransactionAsync(
        currentSet,
        nextSet,
        startingCurrentSets,
        chunkSizeValue,
        chunkAuctionPeriod
      );

      if (isChunksAuctionFinished) {
        await twapAuction.setRemainingCurrentSets.sendTransactionAsync(ZERO);
      }
    });

    async function subject(): Promise<string> {
      return twapAuction.testValidateNextChunkAuction.sendTransactionAsync();
    }

    it('does not revert', async () => {
      await expectNoRevertError(subject());
    });

    describe('when current chunk auction is not finished', async () => {
      before(async () => {
        isChunksAuctionFinished = false;
      });

      after(async () => {
        isChunksAuctionFinished = true;
      });

      it('it reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when orderRemaining is 0', async () => {
      before(async () => {
        startingCurrentSets = ether(1000);
      });

      after(async () => {
        startingCurrentSets = ether(2000);
      });

      it('it reverts', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when not enough time has passed between chunks', async () => {
      beforeEach(async () => {
        const block = await web3.eth.getBlock('latest');
        await twapAuction.setLastChunkAuctionEnd.sendTransactionAsync(new BigNumber(block.timestamp));
      });

      it('it reverts', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#parseLiquidatorData', async () => {
    let chunkSizeValue: BigNumber;
    let chunkAuctionPeriod: BigNumber;

    let subjectLiquidatorData: string;

    beforeEach(async () => {
      twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
        oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairVolumeBounds
      );

      chunkSizeValue = ether(10 ** 5);
      chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;
      subjectLiquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
        chunkSizeValue,
        chunkAuctionPeriod
      );
    });

    async function subject(): Promise<BigNumber[]> {
      return twapAuction.testParseLiquidatorData.callAsync(
        subjectLiquidatorData
      );
    }

    it('sets returns the correct struct', async () => {
      const [receivedChunkSize, receivedAuctionPeriod] = await subject();

      expect(receivedChunkSize).to.be.bignumber.equal(chunkSizeValue);
      expect(receivedAuctionPeriod).to.be.bignumber.equal(chunkAuctionPeriod);
    });
  });
});