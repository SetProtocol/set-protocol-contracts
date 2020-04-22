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

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(TWAPLiquidator.abi);

    await scenario.initialize();

    auctionPeriod = ONE_DAY_IN_SECONDS;
    rangeStart = new BigNumber(10); // 10% below fair value
    rangeEnd = new BigNumber(10); // 10% above fair value
    name = 'liquidator';
    oracleWhiteList = scenario.oracleWhiteList;

    liquidator = await liquidatorHelperFelix.deployTWAPLiquidatorAsync(
      scenario.core.address,
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
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

    // It sets the correct initial bounds

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
    describe('#placeBid', async () => {});
    describe('#getBidPrice', async () => {});
    describe('#iterateChunkAuction', async () => {});
    describe('#auctionGetters', async () => {});
    describe('#twapGetters', async () => {});
    describe('hasRebalanceFailed', async () => {});

    describe('when the auction has failed', async () => {
      describe('hasRebalanceFailed', async () => {});
    });
  });

  describe('[CONTEXT] Second two chunk auction', async () => {
    describe('#settleRebalance', async () => {});
  });



  describe('#setChunkSizeBounds', async () => {
    // Can only be called by owner
    // Sets properly
  });

});