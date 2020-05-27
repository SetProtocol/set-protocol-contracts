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
  CoreContract,
  OracleWhiteListContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  LinearAuctionMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
} from '@utils/constants';
import { ether, gWei } from '@utils/units';
import { getLinearAuction, TokenFlow } from '@utils/auction';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('LinearAuction', accounts => {
  const [
    ownerAccount,
    functionCaller,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let auctionMock: LinearAuctionMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const oracleHelper = new OracleHelper(ownerAccount);
  const valuationHelper = new ValuationHelper(ownerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper, valuationHelper);

  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;
  let oracleWhiteList: OracleWhiteListContract;

  let component1: StandardTokenMockContract;
  let component2: StandardTokenMockContract;
  let component3: StandardTokenMockContract;

  let component1Price: BigNumber;
  let component2Price: BigNumber;
  let component3Price: BigNumber;

  let set1: SetTokenContract;
  let set2: SetTokenContract;

  let set1Components: Address[];
  let set2Components: Address[];

  let set1Units: BigNumber[];
  let set2Units: BigNumber[];

  let set1NaturalUnit: BigNumber;
  let set2NaturalUnit: BigNumber;

  let component1Oracle: UpdatableOracleMockContract;
  let component2Oracle: UpdatableOracleMockContract;
  let component3Oracle: UpdatableOracleMockContract;

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(LinearAuctionMockContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    component1 = await erc20Helper.deployTokenAsync(ownerAccount);
    component2 = await erc20Helper.deployTokenAsync(ownerAccount);
    component3 = await erc20Helper.deployTokenAsync(ownerAccount);

    set1Components = [component1.address, component2.address];
    set1Units = [gWei(1), gWei(1)];
    set1NaturalUnit = gWei(1);
    set1 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set1Components,
      set1Units,
      set1NaturalUnit,
    );

    set2Components = [component2.address, component3.address];
    set2Units = [gWei(1), gWei(1)];
    set2NaturalUnit = gWei(2);
    set2 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set2Components,
      set2Units,
      set2NaturalUnit,
    );

    component1Price = ether(1);
    component2Price = ether(2);
    component3Price = ether(1);

    component1Oracle = await oracleHelper.deployUpdatableOracleMockAsync(component1Price);
    component2Oracle = await oracleHelper.deployUpdatableOracleMockAsync(component2Price);
    component3Oracle = await oracleHelper.deployUpdatableOracleMockAsync(component3Price);

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [component1.address, component2.address, component3.address],
      [component1Oracle.address, component2Oracle.address, component3Oracle.address],
    );

    auctionPeriod = ONE_DAY_IN_SECONDS;
    rangeStart = new BigNumber(10); // 10% above fair value
    rangeEnd = new BigNumber(10); // 10% below fair value

    auctionMock = await liquidatorHelper.deployLinearAuctionMockAsync(
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
    );

  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(LinearAuctionMockContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    it('sets the correct auctionPeriod', async () => {
      const result = await auctionMock.auctionPeriod.callAsync();
      expect(result).to.bignumber.equal(auctionPeriod);
    });

    it('sets the correct rangeStart', async () => {
      const result = await auctionMock.rangeStart.callAsync();
      expect(result).to.bignumber.equal(rangeStart);
    });

    it('sets the correct rangeEnd', async () => {
      const result = await auctionMock.rangeEnd.callAsync();
      expect(result).to.bignumber.equal(rangeEnd);
    });
  });

  describe('#initializeLinearAuction', async () => {
    let subjectCaller: Address;
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSetQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;
      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
      subjectStartingCurrentSetQuantity = ether(10);
    });

    after(async () => {
    });

    async function subject(): Promise<string> {
      return auctionMock.initializeLinearAuction.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSetQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('sets the correct minimumBid', async () => {
      await subject();

      const auction: any = await auctionMock.auction.callAsync();

      const expectedMinimumBid = BigNumber.max(set1NaturalUnit, set2NaturalUnit);
      expect(auction.auction.minimumBid).to.bignumber.equal(expectedMinimumBid);
    });

    it('sets the correct endTime', async () => {
      await subject();

      const auction: any = await auctionMock.auction.callAsync();
      const auctionPeriod = await auctionMock.auctionPeriod.callAsync();

      const { timestamp } = await web3.eth.getBlock('latest');
      const expectedEndTime = new BigNumber(timestamp).plus(auctionPeriod);
      expect(auction.endTime).to.bignumber.equal(expectedEndTime);
    });

    it('sets the correct startPrice', async () => {
      await subject();

      const auction: any = await auctionMock.auction.callAsync();

      const fairValue = await liquidatorHelper.calculateFairValueAsync(
        set1,
        set2,
        oracleWhiteList,
      );
      const rangeStart = await auctionMock.rangeStart.callAsync();

      const negativeRange = fairValue.mul(rangeStart).div(100).round(0, 3);
      const expectedStartPrice = fairValue.sub(negativeRange);
      expect(auction.startPrice).to.bignumber.equal(expectedStartPrice);
    });

    it('sets the correct endPrice', async () => {
      await subject();

      const auction: any = await auctionMock.auction.callAsync();

      const fairValue = await liquidatorHelper.calculateFairValueAsync(
        set1,
        set2,
        oracleWhiteList,
      );
      const rangeEnd = await auctionMock.rangeEnd.callAsync();
      const positiveRange = fairValue.mul(rangeEnd).div(100).round(0, 3);
      const expectedEndPrice = fairValue.add(positiveRange);
      expect(auction.endPrice).to.bignumber.equal(expectedEndPrice);
    });

    describe('when currentSet is greater than 10x the nextSet', async () => {
      beforeEach(async () => {
        const setComponents = [component1.address, component2.address];
        const setUnits = [gWei(1), gWei(1)];
        const setNaturalUnit = gWei(101);
        const set3 = await coreHelper.createSetTokenAsync(
          core,
          setTokenFactory.address,
          setComponents,
          setUnits,
          setNaturalUnit,
        );

        subjectNextSet = set3.address;
      });

      it('sets the correct startPrice', async () => {
        await subject();

        const auction: any = await auctionMock.auction.callAsync();

        const fairValue = await liquidatorHelper.calculateFairValueAsync(
          await coreHelper.getSetInstance(subjectCurrentSet),
          await coreHelper.getSetInstance(subjectNextSet),
          oracleWhiteList,
        );
        const rangeStart = await auctionMock.rangeStart.callAsync();
        const negativeRange = fairValue.mul(rangeStart).div(100).round(0, 3);
        const expectedStartPrice = fairValue.sub(negativeRange);

        expect(auction.startPrice).to.bignumber.equal(expectedStartPrice);
      });

      it('sets the correct endPrice', async () => {
        await subject();

        const auction: any = await auctionMock.auction.callAsync();

        const fairValue = await liquidatorHelper.calculateFairValueAsync(
          await coreHelper.getSetInstance(subjectCurrentSet),
          await coreHelper.getSetInstance(subjectNextSet),
          oracleWhiteList,
        );
        const rangeEnd = await auctionMock.rangeEnd.callAsync();
        const positiveRange = fairValue.mul(rangeEnd).div(100).round(0, 3);
        const expectedEndPrice = fairValue.add(positiveRange);

        expect(auction.endPrice).to.bignumber.equal(expectedEndPrice);
      });
    });

    describe('when there is insufficient collateral to rebalance', async () => {
      beforeEach(async () => {
        subjectStartingCurrentSetQuantity = gWei(0.5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when there is insufficient collateral to rebalance', async () => {
      beforeEach(async () => {
        subjectStartingCurrentSetQuantity = gWei(199);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('[CONTEXT] Initialized auction', async () => {
    let subjectCaller: Address;

    let startingCurrentSetQuantity: BigNumber;

    beforeEach(async () => {
      subjectCaller = functionCaller;
      startingCurrentSetQuantity = ether(10);

      await auctionMock.initializeLinearAuction.sendTransactionAsync(
        set1.address,
        set2.address,
        startingCurrentSetQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    });

    describe('#getPrice', async () => {
      async function subject(): Promise<BigNumber> {
        return auctionMock.getPrice.callAsync();
      }

      it('returns the correct result', async () => {
        const result = await subject();
        const { timestamp } = await web3.eth.getBlock('latest');
        const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
        const currentPrice = await liquidatorHelper.calculateCurrentPrice(
          linearAuction,
          new BigNumber(timestamp),
          auctionPeriod,
        );
        expect(result).to.bignumber.equal(currentPrice);
      });

      describe('when the auction has elapsed half the period', async () => {
        beforeEach(async () => {
          await blockchain.increaseTimeAsync(auctionPeriod.div(2));
          // Do dummy transaction to advance the block
          await auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
            startingCurrentSetQuantity.div(2),
            { from: subjectCaller, gas: DEFAULT_GAS },
          );
        });

        it('returns the correct price', async () => {
          const result = await subject();

          const { timestamp } = await web3.eth.getBlock('latest');
          const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
          const currentPrice = await liquidatorHelper.calculateCurrentPrice(
            linearAuction,
            new BigNumber(timestamp),
            auctionPeriod,
          );
          expect(result).to.bignumber.equal(currentPrice);
        });
      });

      describe('when the timestamp has exceeded the endTime', async () => {
        beforeEach(async () => {
          await blockchain.increaseTimeAsync(auctionPeriod.add(100));

          // Do dummy transaction to advance the block
          await auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
            startingCurrentSetQuantity.div(2),
            { from: subjectCaller, gas: DEFAULT_GAS },
          );
        });

        it('returns the correct price / endPrice', async () => {
          const result = await subject();

          const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
          expect(result).to.bignumber.equal(linearAuction.endPrice);
        });
      });
    });

    describe('#getPrice', async () => {
      async function subject(): Promise<any> {
        return auctionMock.getPrice.callAsync();
      }

      it('returns the correct numerator', async () => {
        const numerator = await subject();
        const { timestamp } = await web3.eth.getBlock('latest');
        const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
        const currentPrice = await liquidatorHelper.calculateCurrentPrice(
          linearAuction,
          new BigNumber(timestamp),
          auctionPeriod,
        );
        expect(numerator).to.bignumber.equal(currentPrice);
      });
    });

    describe('#getTokenFlow', async () => {
      let subjectQuantity: BigNumber;

      let tokenFlows: TokenFlow;

      beforeEach(async () => {
        subjectQuantity = startingCurrentSetQuantity;

        const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
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
        return auctionMock.getTokenFlow.callAsync(subjectQuantity);
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

      describe('when the auction has elapsed half the period', async () => {
        beforeEach(async () => {
          await blockchain.increaseTimeAsync(auctionPeriod.div(2));
          // Do dummy transaction to advance the block
          await auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
            startingCurrentSetQuantity.div(2),
            { from: subjectCaller, gas: DEFAULT_GAS },
          );

          subjectQuantity = startingCurrentSetQuantity.div(2);

          const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
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
    });

    describe('#hasAuctionFailed', async () => {
      async function subject(): Promise<boolean> {
        return auctionMock.hasAuctionFailed.callAsync();
      }

      it('returns false', async () => {
        const hasAuctionFailed = await subject();
        expect(hasAuctionFailed).to.be.false;
      });

      describe('when the timestamp has exceeded the endTime and still biddable quantity', async () => {
        beforeEach(async () => {
          await blockchain.increaseTimeAsync(auctionPeriod.add(1));

          await auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
            startingCurrentSetQuantity,
            { from: subjectCaller, gas: DEFAULT_GAS },
          );
        });

        it('should return true', async () => {
          const hasAuctionFailed = await subject();
          expect(hasAuctionFailed).to.be.false;
        });
      });

      describe('when the auction has been completed', async () => {
        beforeEach(async () => {
          await auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
            startingCurrentSetQuantity,
            { from: subjectCaller, gas: DEFAULT_GAS },
          );
        });

        it('should return false', async () => {
          const hasAuctionFailed = await subject();
          expect(hasAuctionFailed).to.be.false;
        });
      });

      describe('when the timestamp has exceeded endTime and there is not biddable quantity', async () => {
        beforeEach(async () => {
          await blockchain.increaseTimeAsync(auctionPeriod.add(1));

          await blockchain.mineBlockAsync();
        });

        it('should return true', async () => {
          const hasAuctionFailed = await subject();
          expect(hasAuctionFailed).to.be.true;
        });
      });
    });
  });
});
