require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  OracleWhiteListContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  LinearAuctionMockContract,
  TransferProxyContract,
  UpdatableOracleMockContract,
  VaultContract,
} from '@utils/contracts';
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
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const LinearAuctionMock = artifacts.require('LinearAuctionMock');

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
  const libraryMockHelper = new LibraryMockHelper(ownerAccount);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper);

  let pricePrecision: BigNumber;
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
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(LinearAuctionMock.abi);

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

    component1Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component1Price);
    component2Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component2Price);
    component3Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component3Price);

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [component1.address, component2.address, component3.address],
      [component1Oracle.address, component2Oracle.address, component3Oracle.address],
    );

    pricePrecision = new BigNumber(1000);
    auctionPeriod = ONE_DAY_IN_SECONDS;
    rangeStart = new BigNumber(10); // 10% above fair value
    rangeEnd = new BigNumber(10); // 10% below fair value

    auctionMock = await liquidatorHelper.deployLinearAuctionMockAsync(
      oracleWhiteList.address,
      pricePrecision,
      auctionPeriod,
      rangeStart,
      rangeEnd,
    );

  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(LinearAuctionMock.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    it('sets the correct pricePrecision', async () => {
      const result = await auctionMock.pricePrecision.callAsync();
      expect(result).to.bignumber.equal(pricePrecision);
    });

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

    it('sets the correct oracleWhiteList', async () => {
      const result = await auctionMock.oracleWhiteList.callAsync();
      expect(result).to.equal(oracleWhiteList.address);
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

      const pricePrecision = await auctionMock.pricePrecision.callAsync();
      const expectedMinimumBid = BigNumber.max(set1NaturalUnit, set2NaturalUnit)
                                          .mul(pricePrecision);
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

    it('sets the correct startNumerator', async () => {
      await subject();

      const auction: any = await auctionMock.auction.callAsync();

      const fairValue = await liquidatorHelper.calculateFairValueAsync(
        set1,
        set2,
        oracleWhiteList,
        pricePrecision,
      );
      const rangeStart = await auctionMock.rangeStart.callAsync();
      const expectedStartPrice = liquidatorHelper.calculateStartPrice(fairValue, rangeStart);
      expect(auction.startNumerator).to.bignumber.equal(expectedStartPrice);
    });

    it('sets the correct endNumerator', async () => {
      await subject();

      const auction: any = await auctionMock.auction.callAsync();

      const fairValue = await liquidatorHelper.calculateFairValueAsync(
        set1,
        set2,
        oracleWhiteList,
        pricePrecision,
      );
      const rangeEnd = await auctionMock.rangeEnd.callAsync();
      const expectedEndPrice = liquidatorHelper.calculateEndPrice(fairValue, rangeEnd);
      expect(auction.endNumerator).to.bignumber.equal(expectedEndPrice);
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

    describe('#getNumerator', async () => {
      async function subject(): Promise<BigNumber> {
        return auctionMock.getNumerator.callAsync();
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
      });
    });

    describe('#getPrice', async () => {
      async function subject(): Promise<any> {
        return auctionMock.getPrice.callAsync();
      }

      it('returns the correct numerator', async () => {
        const { numerator } = await subject();
        const { timestamp } = await web3.eth.getBlock('latest');
        const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
        const currentPrice = await liquidatorHelper.calculateCurrentPrice(
          linearAuction,
          new BigNumber(timestamp),
          auctionPeriod,
        );
        expect(numerator).to.bignumber.equal(currentPrice);
      });

      it('returns the correct denominator', async () => {
        const { denominator } = await subject();
        expect(denominator).to.bignumber.equal(pricePrecision);
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
          pricePrecision,
          subjectQuantity,
          currentPrice,
          pricePrecision,
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
            pricePrecision,
            subjectQuantity,
            currentPrice,
            pricePrecision,
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