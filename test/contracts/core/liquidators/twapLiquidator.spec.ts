require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  LiquidatorProxyContract,
  OracleWhiteListContract,
  TWAPLiquidatorContract,
} from '@utils/contracts';
import { getSubjectTimestamp, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  ZERO,
  ONE_DAY_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
} from '@utils/constants';
import { ether } from '@utils/units';
import {
  AssetChunkSizeBounds,
  AssetPairVolumeBounds,
  getLinearAuction,
  LinearAuction,
  TokenFlow
} from '@utils/auction';
import {
  getExpectedChunkAuctionIteratedLog,
  getExpectedChunkSizeBoundUpdatedLog
} from '@utils/contract_logs/twapLiquidator';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { RebalanceTestSetup } from '@utils/helpers/rebalanceTestSetup';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);

export interface TWAPAuction {
  chunkAuction: LinearAuction;
  orderSize: BigNumber;
  orderRemaining: BigNumber;
  lastChunkAuctionEnd: BigNumber;
  chunkAuctionPeriod: BigNumber;
  chunkSize: BigNumber;
}

contract('TWAPLiquidator', accounts => {
  const [
    ownerAccount,
    functionCaller,
    nonSet,
  ] = accounts;

  let liquidator: TWAPLiquidatorContract;
  let liquidatorProxy: LiquidatorProxyContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const oracleHelper = new OracleHelper(ownerAccount);
  const valuationHelper = new ValuationHelper(ownerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper, valuationHelper);

  const scenario = new RebalanceTestSetup(ownerAccount);

  let name: string;
  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;
  let oracleWhiteList: OracleWhiteListContract;
  let assetPairVolumeBounds: AssetPairVolumeBounds[];

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(TWAPLiquidatorContract.getAbi());

    await scenario.initialize();

    auctionPeriod = new BigNumber(14400); // 4 hours
    rangeStart = ether(.03); // 3% below fair value
    rangeEnd = ether(.21); // 21% above fair value
    name = 'liquidator';
    oracleWhiteList = scenario.oracleWhiteList;

    assetPairVolumeBounds = [
      {
        assetOne: scenario.component1.address,
        assetTwo: scenario.component2.address,
        bounds: {lower: ether(10 ** 4), upper: ether(10 ** 6)},
      },
      {
        assetOne: scenario.component2.address,
        assetTwo: scenario.component3.address,
        bounds: {lower: ZERO, upper: ether(10 ** 6)},
      },
    ];

    liquidator = await liquidatorHelper.deployTWAPLiquidatorAsync(
      scenario.core.address,
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairVolumeBounds,
      name,
    );

    await scenario.core.addSet.sendTransactionAsync(
      functionCaller,
      { from: ownerAccount, gas: DEFAULT_GAS },
    );

    liquidatorProxy = await liquidatorHelper.deployLiquidatorProxyAsync(liquidator.address);
    await liquidatorProxy.setAuctionFailPeriod.sendTransactionAsync(
      ONE_DAY_IN_SECONDS,
      { from: ownerAccount, gas: DEFAULT_GAS }
    );

    await scenario.core.addSet.sendTransactionAsync(
      liquidatorProxy.address,
      { from: ownerAccount, gas: DEFAULT_GAS },
    );
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(TWAPLiquidatorContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    it('sets the correct auctionPeriod', async () => {
      const result = await liquidator.auctionPeriod.callAsync();
      expect(result).to.bignumber.equal(auctionPeriod);
    });

    it('sets the correct rangeStart', async () => {
      const result = await liquidator.rangeStart.callAsync();
      expect(result).to.bignumber.equal(rangeStart);
    });

    it('sets the correct rangeEnd', async () => {
      const result = await liquidator.rangeEnd.callAsync();
      expect(result).to.bignumber.equal(rangeEnd);
    });

    it('sets the correct oracleWhiteList', async () => {
      const result = await liquidator.oracleWhiteList.callAsync();
      expect(result).to.equal(oracleWhiteList.address);
    });

    it('sets the correct core', async () => {
      const result = await liquidator.core.callAsync();
      expect(result).to.equal(scenario.core.address);
    });

    it('sets the correct chunk whitelist values', async () => {
      const bounds1: any = await liquidator.chunkSizeWhiteList.callAsync(
        assetPairVolumeBounds[0].assetOne,
        assetPairVolumeBounds[0].assetTwo,
      );
      const bounds2: any = await liquidator.chunkSizeWhiteList.callAsync(
        assetPairVolumeBounds[1].assetOne,
        assetPairVolumeBounds[1].assetTwo,
      );

      expect(bounds1.lower).to.bignumber.equal(assetPairVolumeBounds[0].bounds.lower);
      expect(bounds1.upper).to.bignumber.equal(assetPairVolumeBounds[0].bounds.upper);

      expect(bounds2.lower).to.bignumber.equal(assetPairVolumeBounds[1].bounds.lower);
      expect(bounds2.upper).to.bignumber.equal(assetPairVolumeBounds[1].bounds.upper);
    });

    it('sets the correct expected chunk auction length', async () => {
      const actualExpectedAuctionLength = await liquidator.expectedChunkAuctionLength.callAsync();
      const expectedAuctionLength = auctionPeriod
                                      .mul(rangeStart.add(ether(.02)))
                                      .div(rangeStart.add(rangeEnd))
                                      .round(0, 3);
      expect(actualExpectedAuctionLength).to.be.bignumber.equal(expectedAuctionLength);
    });

    it('sets the correct name', async () => {
      const result = await liquidator.name.callAsync();
      expect(result).to.equal(name);
    });
  });

  describe('#startRebalance', async () => {
    let usdChunkSize: BigNumber;
    let chunkAuctionPeriod: BigNumber;
    let linearAuction: LinearAuction;

    let subjectCaller: Address;
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSets: BigNumber;
    let subjectLiquidatorData: string;

    let customNexSet: Address;
    let customChunkSize: BigNumber;
    let customChunkAuctionPeriod: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;
      subjectCurrentSet = scenario.set1.address;
      subjectNextSet = customNexSet || scenario.set2.address;
      subjectStartingCurrentSets = ether(2000);

      usdChunkSize = customChunkSize || ether(10 ** 5);
      chunkAuctionPeriod = customChunkAuctionPeriod || ONE_HOUR_IN_SECONDS;

      subjectLiquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
        usdChunkSize,
        chunkAuctionPeriod,
      );

      const maxNaturalUnit = BigNumber.max(
        await scenario.set1.naturalUnit.callAsync(),
        await scenario.set2.naturalUnit.callAsync()
      );

      const combinedTokenArray: Address[] = _.union(scenario.set1Components, scenario.set2Components);
      const combinedCurrentSetUnits = await liquidatorHelper.constructCombinedUnitArrayAsync(
        scenario.set1,
        combinedTokenArray,
        maxNaturalUnit,
      );
      const combinedNextSetUnits = await liquidatorHelper.constructCombinedUnitArrayAsync(
        scenario.set2,
        combinedTokenArray,
        maxNaturalUnit,
      );

      linearAuction = {
        auction: {
          maxNaturalUnit,
          minimumBid: new BigNumber(0),
          startTime: new BigNumber(0),
          startingCurrentSets: new BigNumber(0),
          remainingCurrentSets: new BigNumber(0),
          combinedTokenArray,
          combinedCurrentSetUnits,
          combinedNextSetUnits,
        },
        endTime: new BigNumber(0),
        startPrice: new BigNumber(0),
        endPrice: new BigNumber(0),
      };
    });

    async function subject(): Promise<string> {
      return liquidatorProxy.startRebalance.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSets,
        subjectLiquidatorData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    async function directCallSubject(): Promise<string> {
      return liquidator.startRebalance.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSets,
        subjectLiquidatorData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('sets the correct auction parameters', async () => {
      await subject();

      const { auction } = linearAuction;

      const chunkSize = await liquidatorHelper.calculateChunkSize(
        scenario.set1,
        scenario.set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        usdChunkSize,
      );

      const [expectedStartPrice, expectedEndPrice] = await liquidatorHelper.calculateAuctionBoundsAsync(
        linearAuction,
        rangeStart,
        rangeEnd,
        oracleWhiteList,
      );

      const expectedMinimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        linearAuction,
        scenario.set1,
        scenario.set2,
        scenario.component1Price.div(scenario.component2Price)
      );

      const expectedChunkSize = chunkSize.div(expectedMinimumBid).round(0, 3).mul(expectedMinimumBid);

      const minimumBid =  await liquidator.minimumBid.callAsync(liquidatorProxy.address);
      expect(minimumBid).to.be.bignumber.equal(expectedMinimumBid);

      const combinedArray =  await liquidator.getCombinedTokenArray.callAsync(liquidatorProxy.address);
      expect(JSON.stringify(combinedArray)).to.equal(JSON.stringify(auction.combinedTokenArray));

      const combinedCurrentUnits =  await liquidator.getCombinedCurrentSetUnits.callAsync(liquidatorProxy.address);
      expect(JSON.stringify(combinedCurrentUnits)).to.equal(JSON.stringify(auction.combinedCurrentSetUnits));

      const combinedNextUnits =  await liquidator.getCombinedNextSetUnits.callAsync(liquidatorProxy.address);
      expect(JSON.stringify(combinedNextUnits)).to.equal(JSON.stringify(auction.combinedNextSetUnits));

      const remainingCurrentSets =  await liquidator.remainingCurrentSets.callAsync(liquidatorProxy.address);
      expect(remainingCurrentSets).to.be.bignumber.equal(expectedChunkSize);

      const startingCurrentSets =  await liquidator.startingCurrentSets.callAsync(liquidatorProxy.address);
      expect(startingCurrentSets).to.be.bignumber.equal(expectedChunkSize);

      const twapAuction = await liquidator.auctions.callAsync(liquidatorProxy.address);
      expect(twapAuction[0].startPrice).to.bignumber.equal(expectedStartPrice);
      expect(twapAuction[0].endPrice).to.bignumber.equal(expectedEndPrice);
    });

    it('sets the correct orderSize', async () => {
      await subject();

      const expectedMinimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        linearAuction,
        scenario.set1,
        scenario.set2,
        scenario.component1Price.div(scenario.component2Price)
      );
      const orderSize = subjectStartingCurrentSets.div(expectedMinimumBid).round(0, 3).mul(expectedMinimumBid);

      const expectedOrderSize = await liquidator.getOrderSize.callAsync(liquidatorProxy.address);
      expect(expectedOrderSize).to.be.bignumber.equal(orderSize);
    });

    it('sets the correct orderRemaining', async () => {
      await subject();

      const orderRemaining = await liquidator.getOrderRemaining.callAsync(liquidatorProxy.address);
      const chunkSize = await liquidatorHelper.calculateChunkSize(
        scenario.set1,
        scenario.set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        usdChunkSize,
      );
      const expectedMinimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        linearAuction,
        scenario.set1,
        scenario.set2,
        scenario.component1Price.div(scenario.component2Price)
      );
      const orderSize = subjectStartingCurrentSets.div(expectedMinimumBid).round(0, 3).mul(expectedMinimumBid);
      const expectedChunkSize = chunkSize.div(expectedMinimumBid).round(0, 3).mul(expectedMinimumBid);

      expect(orderRemaining).to.be.bignumber.equal(orderSize.sub(expectedChunkSize));
    });

    it('sets the correct lastChunkAuctionEnd', async () => {
      subject();

      const auctionEndTime = await liquidator.getLastChunkAuctionEnd.callAsync(liquidatorProxy.address);
      expect(auctionEndTime).to.be.bignumber.equal(ZERO);
    });

    it('sets the correct chunkAuctionPeriod', async () => {
      await subject();

      const expectedPeriod = await liquidator.getChunkAuctionPeriod.callAsync(liquidatorProxy.address);
      expect(expectedPeriod).to.be.bignumber.equal(chunkAuctionPeriod);
    });

    it('sets the correct chunkSize', async () => {
      await subject();

      const chunkSize = await liquidator.getChunkSize.callAsync(liquidatorProxy.address);
      const anticipatedChunkSize = await liquidatorHelper.calculateChunkSize(
        scenario.set1,
        scenario.set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        usdChunkSize,
      );
      const expectedMinimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        linearAuction,
        scenario.set1,
        scenario.set2,
        scenario.component1Price.div(scenario.component2Price)
      );
      const expectedChunkSize = anticipatedChunkSize.div(expectedMinimumBid).round(0, 3).mul(expectedMinimumBid);
      expect(chunkSize).to.be.bignumber.equal(expectedChunkSize);
    });

    it('gets the correct getOrderRemaining', async () => {
      await subject();

      const orderRemaining = await liquidator.getOrderRemaining.callAsync(liquidatorProxy.address);
      const expectedMinimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        linearAuction,
        scenario.set1,
        scenario.set2,
        scenario.component1Price.div(scenario.component2Price)
      );
      const chunkSize = await liquidatorHelper.calculateChunkSize(
        scenario.set1,
        scenario.set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        usdChunkSize,
      );
      const expectedChunkSize = chunkSize.div(expectedMinimumBid).round(0, 3).mul(expectedMinimumBid);
      const orderSize = subjectStartingCurrentSets.div(expectedMinimumBid).round(0, 3).mul(expectedMinimumBid);
      const expectedOrderRemaining = orderSize.sub(expectedChunkSize);
      expect(orderRemaining).to.bignumber.equal(expectedOrderRemaining);
    });

    it('gets the correct getTotalSetsRemaining', async () => {
      await subject();

      const totalSetsRemaining = await liquidator.getTotalSetsRemaining.callAsync(liquidatorProxy.address);
      expect(totalSetsRemaining).to.bignumber.equal(subjectStartingCurrentSets);
    });

    describe('when the caller is not a valid Set', async () => {
      it('should revert', async () => {
        await expectRevertError(directCallSubject());
      });
    });

    describe('when the chunk size is too low', async () => {
      before(async () => {
        customChunkSize = ether(10 ** 3);
      });

      after(async () => {
        customChunkSize = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the chunk size is too high', async () => {
      before(async () => {
        customChunkSize = ether(10 ** 7);
      });

      after(async () => {
        customChunkSize = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the chunk auction period is too high', async () => {
      before(async () => {
        customChunkAuctionPeriod = ONE_DAY_IN_SECONDS.mul(2);
      });

      after(async () => {
        customChunkAuctionPeriod = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the combined tokey array is 3 assets', async () => {
      before(async () => {
        customNexSet = scenario.set3.address;
      });

      after(async () => {
        customNexSet = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('[CONTEXT] Two chunk auction rebalance', async () => {
    let usdChunkSize: BigNumber;
    let chunkAuctionPeriod: BigNumber;

    let subjectCaller: Address;
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSets: BigNumber;
    let subjectLiquidatorData: string;

    let chunkAuctionChunkSize: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;

      subjectCaller = functionCaller;
      subjectCurrentSet = scenario.set1.address;
      subjectNextSet = scenario.set2.address;
      subjectStartingCurrentSets = ether(2000);

      usdChunkSize = ether(10 ** 5);
      chunkAuctionPeriod =  ONE_HOUR_IN_SECONDS;

      subjectLiquidatorData = liquidatorHelper.generateTWAPLiquidatorCalldata(
        usdChunkSize,
        chunkAuctionPeriod,
      );

      await liquidatorProxy.startRebalance.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSets,
        subjectLiquidatorData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );

      chunkAuctionChunkSize = await liquidatorHelper.calculateChunkSize(
        scenario.set1,
        scenario.set2,
        oracleWhiteList,
        subjectStartingCurrentSets,
        usdChunkSize,
      );
    });

    describe('#placeBid', async () => {
      let subjectSet: Address;
      let subjectQuantity: BigNumber;

      let maxBid: BigNumber;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;

        const minimumBid =  await liquidator.minimumBid.callAsync(liquidatorProxy.address);
        maxBid = liquidatorHelper.calculateChunkAuctionMaximumBid(
          chunkAuctionChunkSize,
          minimumBid,
        );

        subjectQuantity = maxBid.div(2);
      });

      async function subject(): Promise<any> {
        return liquidatorProxy.placeBid.sendTransactionAsync(
          subjectQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      it('returns the correct array and inflows', async () => {
        await subject();

        const auction = await liquidator.auctions.callAsync(subjectSet);
        const chunkAuction = auction[0];
        const linearAuction = getLinearAuction(chunkAuction);
        const { timestamp } = await web3.eth.getBlock('latest');

        const currentPrice = await liquidatorHelper.calculateCurrentPrice(
          linearAuction,
          new BigNumber(timestamp),
          auctionPeriod,
        );

        const tokenFlows = liquidatorHelper.constructTokenFlow(
          linearAuction,
          subjectQuantity,
          currentPrice,
        );

        const addresses = await liquidatorProxy.getCombinedTokenArray.callAsync();
        expect(JSON.stringify(addresses)).to.equal(JSON.stringify(tokenFlows.addresses));

        const inflow = await liquidatorProxy.getInflow.callAsync();
        expect(JSON.stringify(inflow)).to.equal(JSON.stringify(tokenFlows.inflow));
      });

      it('reduces the remainingCurrentSets', async () => {
        await subject();

        const remainingQuantity = await liquidator.remainingCurrentSets.callAsync(subjectSet);
        const startQuantity = await liquidator.startingCurrentSets.callAsync(subjectSet);
        const expectedRemainingSets = startQuantity.sub(subjectQuantity);
        expect(expectedRemainingSets).to.bignumber.equal(remainingQuantity);
      });

      describe('when the entire auction is bidded on', async () => {
        beforeEach(async () => {
          subjectQuantity = maxBid;
        });

        it('should update lastChunkAuctionEnd to the present timestamp', async () => {
          const subjectTimestamp = await getSubjectTimestamp(subject());

          const lastAuctionEnded = await liquidator.getLastChunkAuctionEnd.callAsync(subjectSet);

          expect(lastAuctionEnded).to.bignumber.equal(subjectTimestamp);
        });
      });

      describe('when the bid quantity is not a multiple of the minimumBid', async () => {
        beforeEach(async () => {
          subjectQuantity = chunkAuctionChunkSize;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('#getBidPrice', async () => {
      let subjectSet: Address;
      let subjectQuantity: BigNumber;

      let tokenFlows: TokenFlow;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;
        subjectQuantity = subjectStartingCurrentSets;

        const auction = await liquidator.auctions.callAsync(subjectSet);
        const chunkAuction = auction[0];
        const linearAuction = getLinearAuction(chunkAuction);
        const { timestamp } = await web3.eth.getBlock('latest');

        const currentPrice = await liquidatorHelper.calculateCurrentPrice(
          linearAuction,
          new BigNumber(timestamp),
          auctionPeriod,
        );

        tokenFlows = liquidatorHelper.constructTokenFlow(
          linearAuction,
          subjectQuantity,
          currentPrice,
        );
      });

      async function subject(): Promise<any> {
        return liquidatorProxy.getBidPrice.callAsync(subjectSet, subjectQuantity);
      }

      it('returns the token array', async () => {
        const { addresses } = await subject();
        expect(JSON.stringify(addresses)).to.equal(JSON.stringify(tokenFlows.addresses));
      });

      it('returns the correct inflow', async () => {
        const { inflow } = await subject();
        expect(JSON.stringify(inflow)).to.equal(JSON.stringify(tokenFlows.inflow));
      });

      it('returns the correct outflow', async () => {
        const { outflow } = await subject();
        expect(JSON.stringify(outflow)).to.equal(JSON.stringify(tokenFlows.outflow));
      });
    });

    describe('#iterateChunkAuction', async () => {
      let subjectSet: Address;

      let customBidQuantity: BigNumber;
      let customPostAuctionElapsed: BigNumber;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;

        const minimumBid =  await liquidator.minimumBid.callAsync(liquidatorProxy.address);
        const maxBid = liquidatorHelper.calculateChunkAuctionMaximumBid(
          chunkAuctionChunkSize,
          minimumBid,
        );

        const bidQuantity = customBidQuantity || maxBid;
        await liquidatorProxy.placeBid.sendTransactionAsync(
          bidQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );

        const postAuctionTimePeriod = customPostAuctionElapsed || chunkAuctionPeriod;
        await blockchain.increaseTimeAsync(postAuctionTimePeriod);
      });

      async function subject(): Promise<any> {
        return liquidator.iterateChunkAuction.sendTransactionAsync(
          subjectSet,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      it('should update the orderRemaining', async () => {
        const previousOrderRemaining = await liquidator.getOrderRemaining.callAsync(subjectSet);
        const postChunkSetsRemaining = await liquidator.remainingCurrentSets.callAsync(subjectSet);
        const updatedOrderRemaining = previousOrderRemaining.plus(postChunkSetsRemaining);

        await subject();

        const newChunkSize = BigNumber.min(chunkAuctionChunkSize, updatedOrderRemaining);
        const expectedOrderRemaining = new BigNumber(updatedOrderRemaining).sub(newChunkSize);

        const newOrderRemaining = await liquidator.getOrderRemaining.callAsync(subjectSet);
        expect(newOrderRemaining).to.bignumber.equal(expectedOrderRemaining);
      });

      it('emits ChunkAuctionIterated log', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const orderRemaining = await liquidator.getOrderRemaining.callAsync(subjectSet);
        const startingCurrentSets = await liquidator.startingCurrentSets.callAsync(subjectSet);
        const expectedLogs = getExpectedChunkAuctionIteratedLog(
          subjectSet,
          orderRemaining,
          startingCurrentSets,
          liquidator.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

      describe('when the auction has not been complete', async () => {
        before(async () => {
          const minimumBid =  await liquidator.minimumBid.callAsync(liquidatorProxy.address);
          customBidQuantity = minimumBid;
        });

        after(async () => {
          customBidQuantity = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the chunkAuctionPeriod has not elapsed', async () => {
        before(async () => {
          customPostAuctionElapsed = chunkAuctionPeriod.div(2);
        });

        after(async () => {
          customPostAuctionElapsed = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('#settleRebalance', async () => {
      let subjectSet: Address;

      let customBidQuantity: BigNumber;
      let skipSecondAuction: boolean;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;

        const minimumBid =  await liquidator.minimumBid.callAsync(liquidatorProxy.address);
        const maxBid = liquidatorHelper.calculateChunkAuctionMaximumBid(
          chunkAuctionChunkSize,
          minimumBid,
        );

        const bidQuantity = maxBid;
        await liquidatorProxy.placeBid.sendTransactionAsync(
          bidQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );

        await blockchain.increaseTimeAsync(chunkAuctionPeriod);

        if (skipSecondAuction) { return; }

        await liquidator.iterateChunkAuction.sendTransactionAsync(
          subjectSet,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );

        const secondAuctionRemaining = await liquidator.remainingCurrentSets.callAsync(liquidatorProxy.address);
        const secondAuctionMaxBid = liquidatorHelper.calculateChunkAuctionMaximumBid(
          secondAuctionRemaining,
          minimumBid,
        );

        const secondAuctionBidQuantity = customBidQuantity || secondAuctionMaxBid;
        await liquidatorProxy.placeBid.sendTransactionAsync(
          secondAuctionBidQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      });

      async function subject(): Promise<any> {
        return liquidatorProxy.settleRebalance.sendTransactionAsync(
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      it('should clear the auction state', async () => {
        await subject();

        const auction: any = await liquidator.auctions.callAsync(subjectCaller);
        expect(auction.orderSize).to.bignumber.equal(ZERO);
        expect(auction.orderRemaining).to.bignumber.equal(ZERO);
        expect(auction.lastChunkAuctionEnd).to.bignumber.equal(ZERO);
        expect(auction.chunkAuctionPeriod).to.bignumber.equal(ZERO);
        expect(auction.chunkSize).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.auction.minimumBid).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.auction.startTime).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.auction.startingCurrentSets).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.auction.remainingCurrentSets).to.bignumber.equal(ZERO);
        expect(JSON.stringify(auction.chunkAuction.auction.combinedTokenArray)).to.equal(JSON.stringify([]));
        expect(JSON.stringify(auction.chunkAuction.auction.combinedCurrentSetUnits)).to.equal(JSON.stringify([]));
        expect(JSON.stringify(auction.chunkAuction.auction.combinedNextSetUnits)).to.equal(JSON.stringify([]));
        expect(auction.chunkAuction.endTime).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.startPrice).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.endPrice).to.bignumber.equal(ZERO);
      });

      describe('when the auction has not been complete', async () => {
        before(async () => {
          const minimumBid =  await liquidator.minimumBid.callAsync(liquidatorProxy.address);
          customBidQuantity = minimumBid;
        });

        after(async () => {
          customBidQuantity = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the rebalance is not complete', async () => {
        before(async () => {
          skipSecondAuction = true;
        });

        after(async () => {
          skipSecondAuction = undefined;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('#hasRebalanceFailed', async () => {
      let subjectSet: Address;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;
      });

      async function subject(): Promise<boolean> {
        return liquidator.hasRebalanceFailed.callAsync(subjectSet);
      }

      it('should return false', async () => {
        const result = await subject();
        expect(result).to.equal(false);
      });

      describe('when the auctionFailPeriod has elapsed', async () => {
        beforeEach(async () => {
          await blockchain.increaseTimeAsync(auctionPeriod.mul(2));
          await blockchain.mineBlockAsync();
        });

      it('should return true', async () => {
        const result = await subject();
        expect(result).to.equal(true);
      });
      });
    });

    describe('#endFailedRebalance', async () => {
      async function subject(): Promise<string> {
        return liquidatorProxy.endFailedRebalance.sendTransactionAsync(
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      async function directCallSubject(): Promise<string> {
        return liquidator.endFailedRebalance.sendTransactionAsync(
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      it('clears the auction state', async () => {
        await subject();

        const auction: any = await liquidator.auctions.callAsync(subjectCaller);
        expect(auction.orderSize).to.bignumber.equal(ZERO);
        expect(auction.orderRemaining).to.bignumber.equal(ZERO);
        expect(auction.lastChunkAuctionEnd).to.bignumber.equal(ZERO);
        expect(auction.chunkAuctionPeriod).to.bignumber.equal(ZERO);
        expect(auction.chunkSize).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.auction.minimumBid).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.auction.startTime).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.auction.startingCurrentSets).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.auction.remainingCurrentSets).to.bignumber.equal(ZERO);
        expect(JSON.stringify(auction.chunkAuction.auction.combinedTokenArray)).to.equal(JSON.stringify([]));
        expect(JSON.stringify(auction.chunkAuction.auction.combinedCurrentSetUnits)).to.equal(JSON.stringify([]));
        expect(JSON.stringify(auction.chunkAuction.auction.combinedNextSetUnits)).to.equal(JSON.stringify([]));
        expect(auction.chunkAuction.endTime).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.startPrice).to.bignumber.equal(ZERO);
        expect(auction.chunkAuction.endPrice).to.bignumber.equal(ZERO);
      });

      describe('when the caller is not a valid Set', async () => {
        beforeEach(async () => {
          subjectCaller = nonSet;
        });

        it('should revert', async () => {
          await expectRevertError(directCallSubject());
        });
      });
    });

    describe('#auctionPriceParameters', async () => {
      let subjectSet: Address;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;
      });

      async function subject(): Promise<any> {
        return liquidator.auctionPriceParameters.callAsync(subjectSet);
      }

      it('should return the correct values', async () => {
        const {
          auctionStartTime,
          auctionTimeToPivot,
          auctionStartPrice,
          auctionPivotPrice,
        } = await subject();

        const auction = await liquidator.auctions.callAsync(subjectSet);
        const chunkAuction = auction[0];

        const linearAuction = getLinearAuction(chunkAuction);
        expect(auctionStartTime).to.bignumber.equal(linearAuction.auction.startTime);
        expect(auctionTimeToPivot).to.bignumber.equal(auctionPeriod);
        expect(auctionStartPrice).to.bignumber.equal(linearAuction.startPrice);
        expect(auctionPivotPrice).to.bignumber.equal(linearAuction.endPrice);
      });
    });

    describe('#getTotalSetsRemaining', async () => {
      let subjectSet: Address;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;
      });


      async function subject(): Promise<BigNumber> {
        return liquidator.getTotalSetsRemaining.callAsync(
          subjectSet,
        );
      }

      it('returns the correct total sets remaining', async () => {
        const actualTotalSetsRemaining = await subject();

        const twapAuction: any = await liquidator.auctions.callAsync(subjectSet);
        const expectedTotalSetsRemaining = new BigNumber(twapAuction.orderRemaining)
          .add(twapAuction.chunkAuction.auction.remainingCurrentSets);

        expect(actualTotalSetsRemaining).to.be.bignumber.equal(expectedTotalSetsRemaining);
      });
    });
  });

  describe('#setChunkSizeBounds', async () => {
    let subjectCaller: Address;
    let subjectAsset1: Address;
    let subjectAsset2: Address;
    let subjectAssetPairBounds: AssetChunkSizeBounds;

    beforeEach(async () => {
      subjectCaller = ownerAccount;
      subjectAsset1 = scenario.component1.address;
      subjectAsset2 = scenario.component2.address;

      subjectAssetPairBounds = {
        lower: ether(10 ** 8),
        upper: ether(10 ** 9),
      };
    });

    async function subject(): Promise<string> {
      return liquidator.setChunkSizeBounds.sendTransactionAsync(
        subjectAsset1,
        subjectAsset2,
        subjectAssetPairBounds,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('sets the correct chunkAuction parameters', async () => {
      await subject();

      const bounds: any = await liquidator.chunkSizeWhiteList.callAsync(
        subjectAsset1,
        subjectAsset2,
      );

      expect(bounds.lower).to.bignumber.equal(subjectAssetPairBounds.lower);
      expect(bounds.upper).to.bignumber.equal(subjectAssetPairBounds.upper);
    });

    it('emits ChunkSizeBoundUpdated log', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

      const expectedLogs = getExpectedChunkSizeBoundUpdatedLog(
        subjectAsset1,
        subjectAsset2,
        subjectAssetPairBounds.lower,
        subjectAssetPairBounds.upper,
        liquidator.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner', async () => {
      beforeEach(async () => {
        subjectCaller = functionCaller;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the min is greater than the max bound', async () => {
      beforeEach(async () => {
        subjectAssetPairBounds = {
          lower: ether(10 ** 9),
          upper: ether(10 ** 8),
        };
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getLiquidatorData', async () => {
    let subjectChunkSize: BigNumber;
    let subjectChunkAuctionPeriod: BigNumber;

    beforeEach(async () => {
      subjectChunkSize = ether(100);
      subjectChunkAuctionPeriod = ONE_HOUR_IN_SECONDS;
    });

    async function subject(): Promise<string> {
      return liquidator.getLiquidatorData.callAsync(
        subjectChunkSize,
        subjectChunkAuctionPeriod,
      );
    }

    it('should return the correct result', async () => {
      const result = await subject();
      const expected = liquidatorHelper.generateTWAPLiquidatorCalldata(subjectChunkSize, subjectChunkAuctionPeriod);
      expect(result).to.equal(expected);
    });
  });
});