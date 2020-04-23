require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  LiquidatorProxyContract,
  OracleWhiteListContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TWAPLiquidatorContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { AssetChunkSizeBounds } from '@utils/auction';
import { 
  DEFAULT_GAS,
  EMPTY_BYTESTRING,
  ZERO,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';
import { ether, gWei } from '@utils/units';
import { getLinearAuction, LinearAuction, TokenFlow } from '@utils/auction';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { LiquidatorHelperFelix } from '@utils/helpers/LiquidatorHelperFelix';
import { RebalanceTestSetup } from '@utils/helpers/RebalanceTestSetup';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const TWAPLiquidator = artifacts.require('TWAPLiquidator');

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
  const liquidatorHelperFelix = new LiquidatorHelperFelix(ownerAccount, erc20Helper, valuationHelper);
  
  const scenario = new RebalanceTestSetup(ownerAccount, coreHelper, erc20Helper, oracleHelper);

  let name: string;
  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;
  let oracleWhiteList: OracleWhiteListContract;
  let assetPairHashes: string[];
  let assetPairBounds: AssetChunkSizeBounds[];

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(TWAPLiquidator.abi);

    await scenario.initialize();

    auctionPeriod = ONE_DAY_IN_SECONDS;
    rangeStart = new BigNumber(10); // 10% below fair value
    rangeEnd = new BigNumber(10); // 10% above fair value
    name = 'liquidator';
    oracleWhiteList = scenario.oracleWhiteList;
    assetPairHashes = [
      liquidatorHelper.generateAssetPairHashes(scenario.component1.address, scenario.component2.address),
      liquidatorHelper.generateAssetPairHashes(scenario.component2.address, scenario.component3.address),
    ];
    assetPairBounds = [
      {min: ZERO, max: ether(10 ** 6)},
      {min: ether(10 ** 4), max: ether(10 ** 6)},
    ];

    liquidator = await liquidatorHelperFelix.deployTWAPLiquidatorAsync(
      scenario.core.address,
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairHashes,
      assetPairBounds,
      name,
    );

    await scenario.core.addSet.sendTransactionAsync(
      functionCaller,
      { from: ownerAccount, gas: DEFAULT_GAS },
    );

    liquidatorProxy = await liquidatorHelper.deployLiquidatorProxyAsync(liquidator.address);

    await scenario.core.addSet.sendTransactionAsync(
      liquidatorProxy.address,
      { from: ownerAccount, gas: DEFAULT_GAS },
    );
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(TWAPLiquidator.abi);
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
      const bounds1 = await liquidator.chunkSizeWhiteList.callAsync(assetPairHashes[0]);
      const bounds2 = await liquidator.chunkSizeWhiteList.callAsync(assetPairHashes[1]);
      
      expect(bounds1['min']).to.bignumber.equal(assetPairBounds[0]['min']);
      expect(bounds1['max']).to.bignumber.equal(assetPairBounds[0]['max']);

      expect(bounds2['min']).to.bignumber.equal(assetPairBounds[1]['min']);
      expect(bounds2['max']).to.bignumber.equal(assetPairBounds[1]['max']);
    });

    it('sets the expected chunk auction length properly', async () => {
      // TODO
    });

    it('sets the correct name', async () => {
      const result = await liquidator.name.callAsync();
      expect(result).to.equal(name);
    });
  });

  describe('#startRebalance', async () => {
    let twapAuction: TWAPAuction;

    let subjectCaller: Address;
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSetQuantity: BigNumber;
    let subjectLiquidatorData: string;

    beforeEach(async () => {
      const maxNaturalUnit = BigNumber.max(
        await scenario.set1.naturalUnit.callAsync(),
        await scenario.set2.naturalUnit.callAsync()
      );

      const combinedTokenArray = _.union(scenario.set1Components, scenario.set2Components);
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

      twapAuction = {
        chunkAuction: {
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
        },
        orderSize: new BigNumber(0),
        orderRemaining: new BigNumber(0),
        lastChunkAuctionEnd: new BigNumber(0),
        chunkAuctionPeriod: new BigNumber(0),
        chunkSize: new BigNumber(0),
      };

      subjectCaller = functionCaller;
      subjectCurrentSet = scenario.set1.address;
      subjectNextSet = scenario.set2.address;
      subjectStartingCurrentSetQuantity = ether(10);

      // Liquidator data will be different 
      subjectLiquidatorData = EMPTY_BYTESTRING;
    });

    async function subject(): Promise<string> {
      return liquidator.startRebalance.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSetQuantity,
        subjectLiquidatorData,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('sets the correct chunkAuction parameters', async () => {});
    it('sets the correct orderSize', async () => {});
    it('sets the correct orderRemaining', async () => {});
    it('sets the correct lastChunkAuctionEnd', async () => {});
    it('sets the correct chunkAuctionPeriod', async () => {});
    it('sets the correct chunkSize', async () => {});
    describe('when the caller is not a valid Set', async () => {
      beforeEach(async () => {
        subjectCaller = nonSet;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('[CONTEXT] First two chunk auction', async () => {
    let subjectCaller: Address;

    let startingCurrentSetQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;
      startingCurrentSetQuantity = ether(10);
    });

    describe('#placeBid', async () => {});
    describe('#getBidPrice', async () => {
      let subjectSet: Address;
      let subjectQuantity: BigNumber;

      let tokenFlows: TokenFlow;

      beforeEach(async () => {
        subjectSet = functionCaller;
        subjectQuantity = startingCurrentSetQuantity;

        await liquidator.startRebalance.sendTransactionAsync(
          scenario.set1.address,
          scenario.set2.address,
          startingCurrentSetQuantity,
          EMPTY_BYTESTRING,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );

        const auction = await liquidator.auctions.callAsync(subjectCaller);
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

    describe('#iterateChunkAuction', async () => {});

    describe('#auctionGetters', async () => {
      it('gets the correct minimumBid', async () => {});
      it('gets the correct remainingCurrentSets', async () => {});
      it('gets the correct startingCurrentSets', async () => {});
      it('gets the correct getCombinedTokenArray', async () => {});
      it('gets the correct getCombinedCurrentSetUnits', async () => {});
      it('gets the correct getCombinedNextSetUnits', async () => {});
    });

    describe('#twapGetters', async () => {
      it('gets the correct chunkAuction parameters', async () => {});
      it('gets the correct orderSize', async () => {});
      it('gets the correct orderRemaining', async () => {});
      it('gets the correct lastChunkAuctionEnd', async () => {});
      it('gets the correct chunkAuctionPeriod', async () => {});
      it('gets the correct chunkSize', async () => {});
    });
    
    describe('#hasRebalanceFailed', async () => {
      let subjectSet: Address;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;
      });

      async function subject(): Promise<boolean> {
        return liquidator.hasRebalanceFailed.callAsync(subjectSet);
      }

      it('should return the correct value', async () => {
        const result = await subject();
        expect(result).to.equal(false);
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

    describe('when the auction has failed', async () => {
      describe('hasRebalanceFailed', async () => {});
    });
  });

  describe('[CONTEXT] Second two chunk auction', async () => {
    describe('#settleRebalance', async () => {});
  });



  describe('#setChunkSizeBounds', async () => {
    let subjectCaller: Address;
    let subjectAsset1: Address;
    let subjectAsset2: Address;
    let subjectAssetPairBounds: AssetChunkSizeBounds;

    let pairHash: string;
    // Can only be called by owner
    // Sets properly
    beforeEach(async () => {
      subjectCaller = ownerAccount;
      subjectAsset1 = scenario.component1.address;
      subjectAsset2 = scenario.component2.address;
      pairHash = liquidatorHelper.generateAssetPairHashes(
        scenario.component1.address,
        scenario.component2.address,
      );
      subjectAssetPairBounds = {
        min: ether(10 ** 8),
        max: ether(10 ** 9)
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
      const bounds = await liquidator.chunkSizeWhiteList.callAsync(pairHash);
      
      expect(bounds['min']).to.bignumber.equal(subjectAssetPairBounds['min']);
      expect(bounds['max']).to.bignumber.equal(subjectAssetPairBounds['max']);
    });
  });

});