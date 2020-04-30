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
import { AssetChunkSizeBounds } from '@utils/auction';
import { coerceStructBNValuesToString } from '@utils/web3Helper';
import { getSubjectTimestamp, expectNoRevertError, expectRevertError } from '@utils/tokenAssertions';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { ZERO, ONE_HOUR_IN_SECONDS, ONE_DAY_IN_SECONDS } from '@utils/constants';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

const Core = artifacts.require('Core');
const TwoAssetPriceBoundedLinearAuction = artifacts.require('TwoAssetPriceBoundedLinearAuction');

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
  let assetPairHashes: string[];
  let assetPairBounds: AssetChunkSizeBounds[];

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(TwoAssetPriceBoundedLinearAuction.abi);

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
    rangeStart = new BigNumber(3); // 3%
    rangeEnd = new BigNumber(21); // 21%
    assetPairHashes = [
      liquidatorHelper.generateAssetPairHashes(wrappedETH.address, wrappedBTC.address),
      liquidatorHelper.generateAssetPairHashes(wrappedETH.address, usdc.address),
    ];
    assetPairBounds = [
      {min: ZERO, max: ether(10 ** 6)},
      {min: ether(10 ** 4), max: ether(10 ** 6)},
    ];
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(TwoAssetPriceBoundedLinearAuction.abi);
  });

  describe('#constructor', async () => {
    let subjectOracleWhiteList: Address;
    let subjectAuctionPeriod: BigNumber;
    let subjectRangeStart: BigNumber;
    let subjectRangeEnd: BigNumber;
    let subjectAssetPairHashes: string[];
    let subjectAssetPairBounds: any[];

    beforeEach(async () => {
      subjectOracleWhiteList = oracleWhiteList.address;
      subjectAuctionPeriod = auctionPeriod;
      subjectRangeStart = rangeStart;
      subjectRangeEnd = rangeEnd;
      subjectAssetPairHashes = assetPairHashes;
      subjectAssetPairBounds = assetPairBounds;
    });

    async function subject(): Promise<TWAPAuctionMockContract> {
      return liquidatorHelper.deployTWAPAuctionMock(
        subjectOracleWhiteList,
        subjectAuctionPeriod,
        subjectRangeStart,
        subjectRangeEnd,
        subjectAssetPairHashes,
        subjectAssetPairBounds
      );
    }

    it('sets the correct chunkSizeWhiteList', async () => {
      twapAuction = await subject();

      const pairOne: any = await twapAuction.chunkSizeWhiteList.callAsync(subjectAssetPairHashes[0]);
      const pairTwo: any = await twapAuction.chunkSizeWhiteList.callAsync(subjectAssetPairHashes[1]);

      expect(pairOne.min).to.equal(subjectAssetPairBounds[0].min.toString());
      expect(pairOne.max).to.equal(subjectAssetPairBounds[0].max.toString());
      expect(pairTwo.min).to.equal(subjectAssetPairBounds[1].min.toString());
      expect(pairTwo.max).to.equal(subjectAssetPairBounds[1].max.toString());
    });

    it('sets the correct expected chunk auction length', async () => {
      twapAuction = await subject();

      const actualExpectedAuctionLength = await twapAuction.expectedChunkAuctionLength.callAsync();

      const expectedAuctionLength = subjectAuctionPeriod
        .mul(subjectRangeStart.add(2))
        .div(subjectRangeStart.add(subjectRangeEnd));

      expect(actualExpectedAuctionLength).to.be.bignumber.equal(expectedAuctionLength);
    });

    describe('when assetPairHashes and assetPairBounds lengths do not match', async () => {
      beforeEach(async () => {
        subjectAssetPairBounds = [
          {min: ether(10 ** 4), max: ether(10 ** 6)},
        ];
      });

      it('sets the correct chunkSize', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when invalid bounds are passed', async () => {
      beforeEach(async () => {
        subjectAssetPairBounds = [
          {min: ether(10 ** 7), max: ether(10 ** 6)},
          {min: ether(10 ** 4), max: ether(10 ** 6)},
        ];
      });

      it('sets the correct chunkSize', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#initializeTWAPAuction', async () => {
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSets: BigNumber;
    let subjectLiquidatorData: any;

    beforeEach(async () => {
      twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
        oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairHashes,
        assetPairBounds
      );

      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
      subjectStartingCurrentSets = ether(2000);
      subjectLiquidatorData = coerceStructBNValuesToString(
        {
          chunkSizeValue: ether(10 ** 5),
          chunkAuctionPeriod: ONE_HOUR_IN_SECONDS,
        }
      );
    });

    async function subject(): Promise<string> {
      return twapAuction.testInitializeTWAPAuction.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSets,
        subjectLiquidatorData
      );
    }

    it('sets the correct orderSize', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.orderSize).to.be.bignumber.equal(subjectStartingCurrentSets);
    });

    it('sets the correct orderRemaining', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();
      const expectedChunkSize = await liquidatorHelper.calculateChunkSize(
        set1,
        set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        subjectLiquidatorData.chunkSizeValue,
      );

      expect(twapState.orderRemaining).to.be.bignumber.equal(subjectStartingCurrentSets.sub(expectedChunkSize));
    });

    it('sets the correct startingCurrentSets', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();
      const expectedChunkSize = await liquidatorHelper.calculateChunkSize(
        set1,
        set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        subjectLiquidatorData.chunkSizeValue,
      );

      expect(twapState.chunkAuction.auction.startingCurrentSets).to.be.bignumber.equal(
        expectedChunkSize
      );
    });

    it('sets the correct lastChunkAuctionEnd', async () => {
      const subjectTimestamp = await getSubjectTimestamp(subject());

      const twapState: any = await twapAuction.twapState.callAsync();
      const expectedLastChunkAuctionEnd = subjectTimestamp.sub(subjectLiquidatorData.chunkAuctionPeriod);
      expect(twapState.lastChunkAuctionEnd).to.be.bignumber.equal(expectedLastChunkAuctionEnd);
    });

    it('sets the correct chunkAuctionPeriod', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();

      expect(twapState.chunkAuctionPeriod).to.be.bignumber.equal(subjectLiquidatorData.chunkAuctionPeriod);
    });

    it('sets the correct chunkSize', async () => {
      await subject();

      const twapState: any = await twapAuction.twapState.callAsync();
      const expectedChunkSize = await liquidatorHelper.calculateChunkSize(
        set1,
        set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        subjectLiquidatorData.chunkSizeValue,
      );

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
          subjectLiquidatorData.chunkSizeValue,
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
          subjectLiquidatorData.chunkSizeValue,
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
          subjectLiquidatorData.chunkSizeValue,
        );

        expect(twapState.orderRemaining).to.be.bignumber.equal(subjectStartingCurrentSets.sub(expectedChunkSize));
      });
    });
  });

  describe('#auctionNextChunk', async () => {
    let currentSet: Address;
    let nextSet: Address;
    let startingCurrentSets: BigNumber;
    let liquidatorData: any;

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
        assetPairHashes,
        assetPairBounds
      );

      currentSet = set1.address;
      nextSet = set2.address;
      liquidatorData = coerceStructBNValuesToString(
        {
          chunkSizeValue: ether(10 ** 5),
          chunkAuctionPeriod: ONE_HOUR_IN_SECONDS,
        }
      );

      await twapAuction.testInitializeTWAPAuction.sendTransactionAsync(
        currentSet,
        nextSet,
        startingCurrentSets,
        liquidatorData
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
    let subjectLiquidatorData: any;

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
        assetPairHashes,
        assetPairBounds
      );

      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
      subjectStartingCurrentSets = ether(2000);
      subjectLiquidatorData = coerceStructBNValuesToString(
        {
          chunkSizeValue,
          chunkAuctionPeriod,
        }
      );

      auctionCaller = await liquidatorHelper.deployTWAPAuctionCallerAsync(
        twapAuction.address
      );
    });

    async function subject(): Promise<string> {
      return auctionCaller.validateLiquidatorData.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSets,
        subjectLiquidatorData
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
    let liquidatorData: any;
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
        assetPairHashes,
        assetPairBounds
      );

      const currentSet = set1.address;
      const nextSet = set2.address;
      liquidatorData = coerceStructBNValuesToString(
        {
          chunkSizeValue: ether(10 ** 5),
          chunkAuctionPeriod: ONE_HOUR_IN_SECONDS,
        }
      );

      await twapAuction.testInitializeTWAPAuction.sendTransactionAsync(
        currentSet,
        nextSet,
        startingCurrentSets,
        liquidatorData
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

  describe('#getAssetPairHashFromCollateral', async () => {
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;

    beforeEach(async () => {
      twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
        oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairHashes,
        assetPairBounds
      );

      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
    });

    async function subject(): Promise<string> {
      return twapAuction.testGetAssetPairHashFromCollateral.callAsync(
        subjectCurrentSet,
        subjectNextSet
      );
    }

    it('sets creates the correct asset pair hash', async () => {
      const assetPairHash = await subject();

      const expectedAssetPairHash = await liquidatorHelper.generateAssetPairHashes(
        wrappedETH.address,
        usdc.address
      );

      expect(assetPairHash).to.be.bignumber.equal(expectedAssetPairHash);
    });

    describe('when one Set has one component', async () => {
      beforeEach(async () => {
        subjectCurrentSet = set3.address;
      });

      it('sets creates the correct asset pair hash', async () => {
        const assetPairHash = await subject();

        const expectedAssetPairHash = await liquidatorHelper.generateAssetPairHashes(
          wrappedETH.address,
          usdc.address
        );

        expect(assetPairHash).to.be.bignumber.equal(expectedAssetPairHash);
      });
    });
  });

  describe('#getAssetPairHash', async () => {
    let subjectAssetOne: Address;
    let subjectAssetTwo: Address;

    beforeEach(async () => {
      twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
        oracleWhiteList.address,
        auctionPeriod,
        rangeStart,
        rangeEnd,
        assetPairHashes,
        assetPairBounds
      );

      subjectAssetOne = wrappedETH.address;
      subjectAssetTwo = usdc.address;
    });

    async function subject(): Promise<string> {
      return twapAuction.testGetAssetPairHash.callAsync(
        subjectAssetOne,
        subjectAssetTwo
      );
    }

    it('sets creates the correct asset pair hash', async () => {
      const assetPairHash = await subject();

      const expectedAssetPairHash = await liquidatorHelper.generateAssetPairHashes(
        wrappedETH.address,
        usdc.address
      );

      expect(assetPairHash).to.be.bignumber.equal(expectedAssetPairHash);
    });

    describe('when asset order is flipped', async () => {
      beforeEach(async () => {
        twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
          oracleWhiteList.address,
          auctionPeriod,
          rangeStart,
          rangeEnd,
          assetPairHashes,
          assetPairBounds
        );

        subjectAssetOne = usdc.address;
        subjectAssetTwo = wrappedETH.address;
      });

      it('sets creates the correct asset pair hash', async () => {
        const assetPairHash = await subject();

        const expectedAssetPairHash = await liquidatorHelper.generateAssetPairHashes(
          wrappedETH.address,
          usdc.address
        );

        expect(assetPairHash).to.be.bignumber.equal(expectedAssetPairHash);
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
        assetPairHashes,
        assetPairBounds
      );

      chunkSizeValue = ether(10 ** 5);
      chunkAuctionPeriod = ONE_HOUR_IN_SECONDS;
      subjectLiquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
        chunkSizeValue,
        chunkAuctionPeriod
      );
    });

    async function subject(): Promise<any> {
      return twapAuction.testParseLiquidatorData.callAsync(
        subjectLiquidatorData
      );
    }

    it('sets returns the correct struct', async () => {
      const liquidatorDataStruct: any = await subject();

      expect(liquidatorDataStruct.chunkSizeValue).to.be.bignumber.equal(chunkSizeValue);
      expect(liquidatorDataStruct.chunkAuctionPeriod).to.be.bignumber.equal(chunkAuctionPeriod);
    });
  });
});