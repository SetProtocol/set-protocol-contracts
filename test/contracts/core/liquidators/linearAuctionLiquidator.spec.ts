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
  LinearAuctionLiquidatorContract,
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
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('LinearAuctionLiquidator', accounts => {
  const [
    ownerAccount,
    functionCaller,
    nonSet,
  ] = accounts;

  let core: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let liquidator: LinearAuctionLiquidatorContract;
  let liquidatorProxy: LiquidatorProxyContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const oracleHelper = new OracleHelper(ownerAccount);
  const valuationHelper = new ValuationHelper(ownerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper, valuationHelper);

  let name: string;
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
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(LinearAuctionLiquidatorContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreMockAsync(transferProxy, vault);

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

    set2Components = [component1.address, component2.address];
    set2Units = [gWei(1), gWei(0.5)];
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
    rangeStart = new BigNumber(10); // 10% below fair value
    rangeEnd = new BigNumber(10); // 10% above fair value
    name = 'liquidator';

    liquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
      core.address,
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      name,
    );

    await core.addSet.sendTransactionAsync(
      functionCaller,
      { from: ownerAccount, gas: DEFAULT_GAS },
    );

    liquidatorProxy = await liquidatorHelper.deployLiquidatorProxyAsync(liquidator.address);

    await core.addSet.sendTransactionAsync(
      liquidatorProxy.address,
      { from: ownerAccount, gas: DEFAULT_GAS },
    );
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(LinearAuctionLiquidatorContract.getAbi());
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
      expect(result).to.equal(core.address);
    });

    it('sets the correct name', async () => {
      const result = await liquidator.name.callAsync();
      expect(result).to.equal(name);
    });
  });

  describe('#startRebalance', async () => {
    let linearAuction: LinearAuction;

    let subjectCaller: Address;
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSetQuantity: BigNumber;
    let subjectLiquidatorData: string;

    beforeEach(async () => {
      const maxNaturalUnit = BigNumber.max(
        await set1.naturalUnit.callAsync(),
        await set2.naturalUnit.callAsync()
      );

      const combinedTokenArray = _.union(set1Components, set2Components);
      const combinedCurrentSetUnits = await liquidatorHelper.constructCombinedUnitArrayAsync(
        set1,
        combinedTokenArray,
        maxNaturalUnit,
      );
      const combinedNextSetUnits = await liquidatorHelper.constructCombinedUnitArrayAsync(
        set2,
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

      subjectCaller = functionCaller;
      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
      subjectStartingCurrentSetQuantity = ether(10);
      subjectLiquidatorData = EMPTY_BYTESTRING;
    });

    after(async () => {
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

    it('sets the correct minimumBid', async () => {
      await subject();

      const auction: any = await liquidator.auctions.callAsync(subjectCaller);

      const expectedMinimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        linearAuction,
        set1,
        set2,
        component1Price.div(component2Price)
      );

      expect(auction.auction.minimumBid).to.bignumber.equal(expectedMinimumBid);
    });

    it('sets the correct endTime', async () => {
      await subject();

      const auction: any = await liquidator.auctions.callAsync(subjectCaller);
      const auctionPeriod = await liquidator.auctionPeriod.callAsync();

      const { timestamp } = await web3.eth.getBlock('latest');
      const expectedEndTime = new BigNumber(timestamp).plus(auctionPeriod);
      expect(auction.endTime).to.bignumber.equal(expectedEndTime);
    });

    it('sets the correct startPrice', async () => {
      await subject();

      const auction: any = await liquidator.auctions.callAsync(subjectCaller);

      const rangeStart = await liquidator.rangeStart.callAsync();
      const [expectedStartPrice, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
        getLinearAuction(auction),
        rangeStart,
        rangeEnd,
        oracleWhiteList,
      );
      expect(auction.startPrice).to.bignumber.equal(expectedStartPrice);
    });

    it('sets the correct endPrice', async () => {
      await subject();

      const auction: any = await liquidator.auctions.callAsync(subjectCaller);

      const rangeEnd = await liquidator.rangeEnd.callAsync();
      const [, expectedEndPrice] = await liquidatorHelper.calculateAuctionBoundsAsync(
        getLinearAuction(auction),
        rangeStart,
        rangeEnd,
        oracleWhiteList,
      );
      expect(auction.endPrice).to.bignumber.equal(expectedEndPrice);
    });

    describe('when the currentSet is > 10x nextSet', async () => {
      beforeEach(async () => {
        const setComponents = [component1.address, component2.address];
        const setUnits = [gWei(1), gWei(2)];
        const setNaturalUnit = gWei(100);
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

        const auction: any = await liquidator.auctions.callAsync(subjectCaller);

        const rangeStart = await liquidator.rangeStart.callAsync();
        const [expectedStartPrice, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          getLinearAuction(auction),
          rangeStart,
          rangeEnd,
          oracleWhiteList,
        );
        expect(auction.startPrice).to.bignumber.equal(expectedStartPrice);
      });

      it('sets the correct endPrice', async () => {
        await subject();

        const auction: any = await liquidator.auctions.callAsync(subjectCaller);

        const rangeEnd = await liquidator.rangeEnd.callAsync();
        const [, expectedEndPrice] = await liquidatorHelper.calculateAuctionBoundsAsync(
          getLinearAuction(auction),
          rangeStart,
          rangeEnd,
          oracleWhiteList,
        );
        expect(auction.endPrice).to.bignumber.equal(expectedEndPrice);
      });
    });

    describe('when the caller is not a valid Set', async () => {
      beforeEach(async () => {
        subjectCaller = nonSet;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a token does not have a supported oracle', async () => {
      beforeEach(async () => {
        await oracleWhiteList.removeTokenOraclePair.sendTransactionAsync(
          component1.address,
          { from: ownerAccount, gas: DEFAULT_GAS },
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the union of the current and next Set is not 2 components', async () => {
      beforeEach(async () => {
        const set3Components = [component1.address, component3.address];
        const set3Units = [gWei(1), gWei(2)];
        const set3NaturalUnit = gWei(2);
        const set3 = await coreHelper.createSetTokenAsync(
          core,
          setTokenFactory.address,
          set3Components,
          set3Units,
          set3NaturalUnit,
        );

        subjectNextSet = set3.address;
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

      await liquidatorProxy.startRebalance.sendTransactionAsync(
        set1.address,
        set2.address,
        startingCurrentSetQuantity,
        EMPTY_BYTESTRING,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    });

    describe('#placeBid', async () => {
      let subjectQuantity: BigNumber;
      let tokenFlows: TokenFlow;

      beforeEach(async () => {
        subjectQuantity = ether(5);
      });

      async function subject(): Promise<string> {
        return liquidatorProxy.placeBid.sendTransactionAsync(
          subjectQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      async function directCallSubject(): Promise<string> {
        return liquidator.placeBid.sendTransactionAsync(
          subjectQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      async function setTokenFlows(): Promise<void> {
        const linearAuction = getLinearAuction(await liquidator.auctions.callAsync(liquidatorProxy.address));
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
      }

      it('calculates the correct new remainingCurrentSets', async () => {
        await subject();

        const auction: any = await liquidator.auctions.callAsync(liquidatorProxy.address);
        const expectedRemainingCurrentSets = startingCurrentSetQuantity.sub(subjectQuantity);
        expect(auction.auction.remainingCurrentSets).to.bignumber.equal(expectedRemainingCurrentSets);
      });

      it('returns the correct combinedTokenArray', async () => {
        await subject();
        await setTokenFlows();

        const combinedTokenArray = await liquidatorProxy.getCombinedTokenArray.callAsync();
        expect(JSON.stringify(combinedTokenArray)).to.equal(JSON.stringify(tokenFlows.addresses));
      });

      it('returns the correct inflow', async () => {
        await subject();
        await setTokenFlows();

        const inflow = await liquidatorProxy.getInflow.callAsync();
        expect(JSON.stringify(inflow)).to.equal(JSON.stringify(tokenFlows.inflow));
      });

      it('returns the correct outflow', async () => {
        await subject();
        await setTokenFlows();

        const outflow = await liquidatorProxy.getOutflow.callAsync();
        expect(JSON.stringify(outflow)).to.equal(JSON.stringify(tokenFlows.outflow));
      });

      describe('when the quantity is not a multiple of the minimumBid', async () => {
        beforeEach(async () => {
          const halfMinimumBid = BigNumber.max(set1NaturalUnit, set2NaturalUnit).div(2);
          subjectQuantity = gWei(10).plus(halfMinimumBid);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      describe('when the quantity is more than the remainingCurrentsets', async () => {
        beforeEach(async () => {
          subjectQuantity = startingCurrentSetQuantity.plus(ether(1));
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
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

    describe('#getBidPrice', async () => {
      let subjectSet: Address;
      let subjectQuantity: BigNumber;

      let tokenFlows: TokenFlow;

      beforeEach(async () => {
        subjectSet = functionCaller;
        subjectQuantity = startingCurrentSetQuantity;

        await liquidator.startRebalance.sendTransactionAsync(
          set1.address,
          set2.address,
          startingCurrentSetQuantity,
          EMPTY_BYTESTRING,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );

        const linearAuction = getLinearAuction(await liquidator.auctions.callAsync(subjectCaller));
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

    describe('#settleRebalance', async () => {
      let bidQuantity: BigNumber;
      let customBidQuantity: BigNumber;


      beforeEach(async () => {
        bidQuantity = customBidQuantity || startingCurrentSetQuantity;

        return liquidatorProxy.placeBid.sendTransactionAsync(
          bidQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      });

      async function subject(): Promise<string> {
        return liquidatorProxy.settleRebalance.sendTransactionAsync(
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      async function directCallSubject(): Promise<string> {
        return liquidator.settleRebalance.sendTransactionAsync(
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      }

      it('clears the auction state', async () => {
        await subject();

        const auction: any = await liquidator.auctions.callAsync(subjectCaller);
        expect(auction.auction.minimumBid).to.bignumber.equal(ZERO);
        expect(auction.auction.startTime).to.bignumber.equal(ZERO);
        expect(auction.auction.startingCurrentSets).to.bignumber.equal(ZERO);
        expect(auction.auction.remainingCurrentSets).to.bignumber.equal(ZERO);
        expect(JSON.stringify(auction.auction.combinedTokenArray)).to.equal(JSON.stringify([]));
        expect(JSON.stringify(auction.auction.combinedCurrentSetUnits)).to.equal(JSON.stringify([]));
        expect(JSON.stringify(auction.auction.combinedNextSetUnits)).to.equal(JSON.stringify([]));
        expect(auction.endTime).to.bignumber.equal(ZERO);
        expect(auction.startPrice).to.bignumber.equal(ZERO);
        expect(auction.endPrice).to.bignumber.equal(ZERO);
      });

      describe('when there is a biddable quantity', async () => {
        before(async () => {
          customBidQuantity = ether(5);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
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
        expect(auction.auction.minimumBid).to.bignumber.equal(ZERO);
        expect(auction.auction.startTime).to.bignumber.equal(ZERO);
        expect(auction.auction.startingCurrentSets).to.bignumber.equal(ZERO);
        expect(auction.auction.remainingCurrentSets).to.bignumber.equal(ZERO);
        expect(JSON.stringify(auction.auction.combinedTokenArray)).to.equal(JSON.stringify([]));
        expect(JSON.stringify(auction.auction.combinedCurrentSetUnits)).to.equal(JSON.stringify([]));
        expect(JSON.stringify(auction.auction.combinedNextSetUnits)).to.equal(JSON.stringify([]));
        expect(auction.endTime).to.bignumber.equal(ZERO);
        expect(auction.startPrice).to.bignumber.equal(ZERO);
        expect(auction.endPrice).to.bignumber.equal(ZERO);
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

    describe('#getCombinedTokenArray', async () => {
      let subjectSet: Address;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;
      });

      async function subject(): Promise<Address[]> {
        return liquidator.getCombinedTokenArray.callAsync(subjectSet);
      }

      it('should return the correct value', async () => {
        const result = await subject();

        const linearAuction = getLinearAuction(await liquidator.auctions.callAsync(subjectSet));
        expect(JSON.stringify(result)).to.equal(JSON.stringify(linearAuction.auction.combinedTokenArray));
      });
    });

    describe('#getCombinedCurrentSetUnits', async () => {
      let subjectSet: Address;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;
      });

      async function subject(): Promise<BigNumber[]> {
        return liquidator.getCombinedCurrentSetUnits.callAsync(subjectSet);
      }

      it('should return the correct value', async () => {
        const result = await subject();

        const linearAuction = getLinearAuction(await liquidator.auctions.callAsync(subjectSet));
        expect(JSON.stringify(result)).to.equal(JSON.stringify(linearAuction.auction.combinedCurrentSetUnits));
      });
    });

    describe('#getCombinedNextSetUnits', async () => {
      let subjectSet: Address;

      beforeEach(async () => {
        subjectSet = liquidatorProxy.address;
      });

      async function subject(): Promise<BigNumber[]> {
        return liquidator.getCombinedNextSetUnits.callAsync(subjectSet);
      }

      it('should return the correct value', async () => {
        const result = await subject();

        const linearAuction = getLinearAuction(await liquidator.auctions.callAsync(subjectSet));
        expect(JSON.stringify(result)).to.equal(JSON.stringify(linearAuction.auction.combinedNextSetUnits));
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

        const linearAuction = getLinearAuction(await liquidator.auctions.callAsync(subjectSet));
        expect(auctionStartTime).to.bignumber.equal(linearAuction.auction.startTime);
        expect(auctionTimeToPivot).to.bignumber.equal(auctionPeriod);
        expect(auctionStartPrice).to.bignumber.equal(linearAuction.startPrice);
        expect(auctionPivotPrice).to.bignumber.equal(linearAuction.endPrice);
      });
    });
  });
});