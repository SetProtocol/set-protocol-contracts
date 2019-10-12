require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  LinearAuctionLiquidatorContract,
  OracleWhiteListContract,
  RebalancingSetTokenFactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  UpdatableOracleMockContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_AUCTION_PRICE_DIVISOR,
  ONE_HOUR_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
// const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
// const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('LinearAuctionLiquidator', accounts => {
  const [
    deployerAccount,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let oracleWhiteList: OracleWhiteListContract;
  let linearAuctionLiquidator: LinearAuctionLiquidatorContract;

  let currentSet: SetTokenContract;
  let nextSet: SetTokenContract;
  let tokens: Address[];
  let oracleMocks: UpdatableOracleMockContract[];

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingHelper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  const liquidatorHelper = new LiquidatorHelper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);

    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );
    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    [currentSet, nextSet] = await rebalancingHelper.createSetTokensAsync(
      coreMock,
      factory.address,
      transferProxy.address,
      2
    );

    const currentSetComponents = await currentSet.getComponents.callAsync();
    const nextSetComponents = await nextSet.getComponents.callAsync();
    tokens = _.union(currentSetComponents, nextSetComponents);
    oracleMocks = await liquidatorHelper.deployUpdatableOracleMocksAsync(
      [ether(100), ether(1), ether(75)]
    );

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      tokens,
      [oracleMocks[0].address, oracleMocks[1].address, oracleMocks[2].address]
    );
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectCoreInstance: Address;
    let subjectOracleWhiteListInstance: Address;
    let subjectPricePrecision: BigNumber;
    let subjectAuctionTimeToPivot: BigNumber;
    let subjectAuctionSpeed: BigNumber;
    let subjectName: string;

    beforeEach(async () => {
      subjectCoreInstance = coreMock.address;
      subjectOracleWhiteListInstance = oracleWhiteList.address;
      subjectPricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      subjectAuctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      subjectAuctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      subjectName = 'LinearAuctionLiquidator';
    });

    async function subject(): Promise<LinearAuctionLiquidatorContract> {
      return liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        subjectCoreInstance,
        subjectOracleWhiteListInstance,
        subjectPricePrecision,
        subjectAuctionTimeToPivot,
        subjectAuctionSpeed,
        subjectName
      );
    }

    it('creates a liquidator with the correct core instance', async () => {
      linearAuctionLiquidator = await subject();

      const actualCoreInstance = await linearAuctionLiquidator.coreInstance.callAsync();
      expect(actualCoreInstance).to.equal(subjectCoreInstance);
    });

    it('creates a liquidator with the correct oracleWhiteList instance', async () => {
      linearAuctionLiquidator = await subject();

      const actualOracleWhiteList = await linearAuctionLiquidator.oracleWhiteListInstance.callAsync();
      expect(actualOracleWhiteList).to.equal(subjectOracleWhiteListInstance);
    });

    it('creates a liquidator with the correct price divisor', async () => {
      linearAuctionLiquidator = await subject();

      const actualPricePrecision = await linearAuctionLiquidator.pricePrecision.callAsync();
      expect(actualPricePrecision).to.be.bignumber.equal(subjectPricePrecision);
    });

    it('creates a liquidator with the correct auction time to pivot', async () => {
      linearAuctionLiquidator = await subject();

      const actualAuctionTimeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
      expect(actualAuctionTimeToPivot).to.be.bignumber.equal(subjectAuctionTimeToPivot);
    });

    it('creates a liquidator with the correct auction speed', async () => {
      linearAuctionLiquidator = await subject();

      const actualAuctionSpeed = await linearAuctionLiquidator.auctionSpeed.callAsync();
      expect(actualAuctionSpeed).to.be.bignumber.equal(subjectAuctionSpeed);
    });

    it('creates a liquidator with the correct name', async () => {
      linearAuctionLiquidator = await subject();

      const actualName = await linearAuctionLiquidator.name.callAsync();
      expect(actualName).to.equal(subjectName);
    });
  });

  describe('#processProposal', async () => {
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectCaller: Address;

    let auctionTimeToPivot: BigNumber;
    let auctionSpeed: BigNumber;
    let pricePrecision: BigNumber;

    beforeEach(async () => {
      auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      pricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      const name = 'LinearAuctionLiquidator';
      linearAuctionLiquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        coreMock.address,
        oracleWhiteList.address,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
        name
      );

      subjectCurrentSet = currentSet.address;
      subjectNextSet = nextSet.address;
      subjectCaller = deployerAccount;
    });

    async function subject(): Promise<string> {
      return linearAuctionLiquidator.processProposal.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        { from: subjectCaller }
      );
    }

    it('sets the correct combinedTokenArray', async () => {
      await subject();

      const actualCombinedTokenArray =  await linearAuctionLiquidator.getCombinedTokenArray.callAsync();
      expect(actualCombinedTokenArray).to.deep.equal(tokens);
    });

    it('calculates the correct startPrice', async () => {
      await subject();

      const currentSetValue = await liquidatorHelper.calculateSetTokenValueAsync(currentSet, oracleWhiteList);
      const nextSetValue = await liquidatorHelper.calculateSetTokenValueAsync(nextSet, oracleWhiteList);
      const auctionParams = liquidatorHelper.calculateLinearAuctionParameters(
        currentSetValue,
        nextSetValue,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
      );

      const [, actualStartPrice, ] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualStartPrice).to.be.bignumber.equal(auctionParams['auctionStartPrice']);
    });

    it('calculates the correct pivotPrice', async () => {
      await subject();

      const currentSetValue = await liquidatorHelper.calculateSetTokenValueAsync(currentSet, oracleWhiteList);
      const nextSetValue = await liquidatorHelper.calculateSetTokenValueAsync(nextSet, oracleWhiteList);
      const auctionParams = liquidatorHelper.calculateLinearAuctionParameters(
        currentSetValue,
        nextSetValue,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
      );

      const [, , actualPivotPrice] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualPivotPrice).to.be.bignumber.equal(auctionParams['auctionPivotPrice']);
    });

    describe('when a token is passed that does not have a matching oracle', async () => {
      beforeEach(async () => {
        await oracleWhiteList.removeTokenOraclePair.sendTransactionAsync(tokens[0]);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#cancelProposal', async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      const auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      const auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      const pricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      const name = 'LinearAuctionLiquidator';
      linearAuctionLiquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        coreMock.address,
        oracleWhiteList.address,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
        name
      );

      subjectCaller = deployerAccount;

      await linearAuctionLiquidator.processProposal.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        { from: subjectCaller},
      );
    });

    async function subject(): Promise<string> {
      return linearAuctionLiquidator.cancelProposal.sendTransactionAsync(
        { from: subjectCaller }
      );
    }

    it('deletes the minimumBid', async () => {
      await subject();

      const [actualMinimumBid, , ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(subjectCaller);
      expect(actualMinimumBid).to.be.bignumber.equal('0');
    });

    it('deletes the startingCurrentSets', async () => {
      await subject();

      const [, actualStartingCurrentSets, ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      expect(actualStartingCurrentSets).to.be.bignumber.equal('0');
    });

    it('deletes the remainingCurrentSets', async () => {
      await subject();

      const [, , actualRemainingCurrentSets] =  await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      expect(actualRemainingCurrentSets).to.be.bignumber.equal('0');
    });

    it('deletes the startPrice', async () => {
      await subject();

      const [actualStartTime, , ] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualStartTime).to.be.bignumber.equal('0');
    });

    it('deletes the startPrice', async () => {
      await subject();

      const [, actualStartPrice, ] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualStartPrice).to.be.bignumber.equal('0');
    });

    it('deletes the pivotPrice', async () => {
      await subject();

      const [, , actualPivotPrice] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualPivotPrice).to.be.bignumber.equal('0');
    });

    it('deletes the combinedTokenArray', async () => {
      await subject();

      const actualCombinedTokenArray = await linearAuctionLiquidator.getCombinedTokenArray.callAsync();
      const expectedCombinedTokenArray = [];

      expect(actualCombinedTokenArray).to.deep.equal(expectedCombinedTokenArray);
    });

    it('deletes the combinedCurrentSetUnits', async () => {
      await subject();

      const actualCombinedCurrentSetUnits = await linearAuctionLiquidator.getCombinedCurrentSetUnits.callAsync();
      const expectedCombinedCurrentSetUnits = [];

      expect(actualCombinedCurrentSetUnits).to.deep.equal(expectedCombinedCurrentSetUnits);
    });

    it('deletes the combinedNextSetUnits', async () => {
      await subject();

      const actualCombinedNextSetUnits = await linearAuctionLiquidator.getCombinedNextSetUnits.callAsync();
      const expectedCombinedNextSetUnits = [];

      expect(actualCombinedNextSetUnits).to.deep.equal(expectedCombinedNextSetUnits);
    });
  });

  describe('#startRebalance', async () => {
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSetQuantity;
    let subjectCaller: Address;

    let auctionTimeToPivot: BigNumber;
    let auctionSpeed: BigNumber;
    let pricePrecision: BigNumber;

    beforeEach(async () => {
      auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      pricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      const name = 'LinearAuctionLiquidator';
      linearAuctionLiquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        coreMock.address,
        oracleWhiteList.address,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
        name
      );

      await linearAuctionLiquidator.processProposal.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        { from: subjectCaller},
      );

      subjectCurrentSet = currentSet.address;
      subjectNextSet = nextSet.address;
      subjectStartingCurrentSetQuantity = ether(100);
      subjectCaller = deployerAccount;
    });

    async function subject(): Promise<string> {
      return linearAuctionLiquidator.startRebalance.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSetQuantity,
        { from: subjectCaller }
      );
    }

    it('sets the correct starting time', async () => {
      await subject();
      const block = await web3.eth.getBlock('latest');

      const [actualStartTime, , ] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualStartTime).to.be.bignumber.equal(new BigNumber(block.timestamp));
    });

    it('sets the correct minimumBid', async () => {
      await subject();

      const expectedMinimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        currentSet,
        nextSet,
        pricePrecision
      );
      const [actualMinimumBid, , ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(subjectCaller);
      expect(actualMinimumBid).to.be.bignumber.equal(expectedMinimumBid);
    });

    it('sets the correct startingCurrentSets', async () => {
      await subject();

      const [, actualStartingCurrentSets, ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      expect(actualStartingCurrentSets).to.be.bignumber.equal(subjectStartingCurrentSetQuantity);
    });

    it('sets the correct remainingCurrentSets', async () => {
      await subject();

      const [, , actualRemainingCurrentSets] =  await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      expect(actualRemainingCurrentSets).to.be.bignumber.equal(subjectStartingCurrentSetQuantity);
    });

    it('sets the correct combinedCurrentSetUnits', async () => {
      await subject();

      const minimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        currentSet,
        nextSet,
        pricePrecision
      );

      const expectedCurrentSetUnits = await liquidatorHelper.constructCombinedUnitArrayAsync(
        currentSet,
        tokens,
        minimumBid,
        pricePrecision,
      );

      const actualCurrentSetUnits =  await linearAuctionLiquidator.getCombinedCurrentSetUnits.callAsync(subjectCaller);
      expect(actualCurrentSetUnits).to.deep.equal(expectedCurrentSetUnits);
    });

    it('sets the correct combinedNextSetUnits', async () => {
      await subject();

      const minimumBid = await liquidatorHelper.calculateMinimumBidAsync(
        currentSet,
        nextSet,
        pricePrecision
      );

      const expectedNextSetUnits = await liquidatorHelper.constructCombinedUnitArrayAsync(
        nextSet,
        tokens,
        minimumBid,
        pricePrecision,
      );

      const actualNextSetUnits =  await linearAuctionLiquidator.getCombinedNextSetUnits.callAsync(subjectCaller);
      expect(actualNextSetUnits).to.deep.equal(expectedNextSetUnits);
    });

    describe('when less than a minimumBid amount of Sets are collateralizing the RebalancingSet', async () => {
      beforeEach(async () => {
        const minimumBid = await liquidatorHelper.calculateMinimumBidAsync(
          currentSet,
          nextSet,
          pricePrecision
        );

        subjectStartingCurrentSetQuantity = minimumBid.div(10);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getBidPrice', async () => {
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;

    let auctionTimeToPivot: BigNumber;
    let auctionSpeed: BigNumber;
    let pricePrecision: BigNumber;

    beforeEach(async () => {
      auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      pricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      const name = 'LinearAuctionLiquidator';
      linearAuctionLiquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        coreMock.address,
        oracleWhiteList.address,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
        name
      );

      subjectCaller = deployerAccount;

      await linearAuctionLiquidator.processProposal.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        { from: subjectCaller},
      );

      const startingCurrentSetQuantity = ether(100);
      await linearAuctionLiquidator.startRebalance.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        startingCurrentSetQuantity,
        { from: subjectCaller }
      );

      const [minimumBid, , ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(subjectCaller);
      subjectQuantity = new BigNumber(minimumBid);
      subjectTimeFastForward = ONE_HOUR_IN_SECONDS;
    });

    async function subject(): Promise<[string[], BigNumber[], BigNumber[]]> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return linearAuctionLiquidator.getBidPrice.callAsync(
        subjectQuantity,
        { from: subjectCaller }
      );
    }

    it('returns the correct combinedTokenArray', async () => {
      const [actualCombinedTokenArray, , ] = await subject();

      expect(actualCombinedTokenArray).to.deep.equal(tokens);
    });

    it('returns the correct inflow tokens', async () => {
      const [, actualInflowArray , ] = await subject();

      const auctionDetails = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      const timeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
      const price = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
        subjectTimeFastForward,
        timeToPivot,
        new BigNumber(auctionDetails[1]),
        new BigNumber(auctionDetails[2]),
        pricePrecision
      );
      const flowArrays = await liquidatorHelper.constructInflowOutflowArraysAsync(
        linearAuctionLiquidator,
        subjectQuantity,
        price['priceNumerator'],
        price['priceDivisor'],
        subjectCaller
      );

      expect(actualInflowArray).to.deep.equal(flowArrays['inflowArray']);
    });

    it('returns the correct outflow tokens', async () => {
      const [, , actualOutflowArray] = await subject();

      const auctionDetails = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      const timeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
      const price = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
        subjectTimeFastForward,
        timeToPivot,
        new BigNumber(auctionDetails[1]),
        new BigNumber(auctionDetails[2]),
        pricePrecision
      );
      const flowArrays = await liquidatorHelper.constructInflowOutflowArraysAsync(
        linearAuctionLiquidator,
        subjectQuantity,
        price['priceNumerator'],
        price['priceDivisor'],
        subjectCaller
      );

      expect(actualOutflowArray).to.deep.equal(flowArrays['outflowArray']);
    });

    describe('when time has passed the auction time to pivot', async () => {
      beforeEach(async () => {
        subjectTimeFastForward = auctionTimeToPivot.add(ONE_HOUR_IN_SECONDS);
      });

      it('returns the correct inflow tokens', async () => {
        const [, actualInflowArray , ] = await subject();

        const auctionDetails = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
        const timeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
        const price = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
          subjectTimeFastForward,
          timeToPivot,
          new BigNumber(auctionDetails[1]),
          new BigNumber(auctionDetails[2]),
          pricePrecision
        );
        const flowArrays = await liquidatorHelper.constructInflowOutflowArraysAsync(
          linearAuctionLiquidator,
          subjectQuantity,
          price['priceNumerator'],
          price['priceDivisor'],
          subjectCaller
        );

        expect(actualInflowArray).to.deep.equal(flowArrays['inflowArray']);
      });

      it('returns the correct outflow tokens', async () => {
        const [, , actualOutflowArray] = await subject();

        const auctionDetails = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
        const timeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
        const price = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
          subjectTimeFastForward,
          timeToPivot,
          new BigNumber(auctionDetails[1]),
          new BigNumber(auctionDetails[2]),
          pricePrecision
        );
        const flowArrays = await liquidatorHelper.constructInflowOutflowArraysAsync(
          linearAuctionLiquidator,
          subjectQuantity,
          price['priceNumerator'],
          price['priceDivisor'],
          subjectCaller
        );
        expect(actualOutflowArray).to.deep.equal(flowArrays['outflowArray']);
      });
    });

    describe('when enough time has passed to fix the price denominator at .1% of pricePrecision', async () => {
      beforeEach(async () => {

        subjectTimeFastForward = auctionTimeToPivot.add(30000);
      });

      it('returns the correct inflow tokens', async () => {
        const [, actualInflowArray , ] = await subject();

        const auctionDetails = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
        const timeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
        const price = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
          subjectTimeFastForward,
          timeToPivot,
          new BigNumber(auctionDetails[1]),
          new BigNumber(auctionDetails[2]),
          pricePrecision
        );
        const flowArrays = await liquidatorHelper.constructInflowOutflowArraysAsync(
          linearAuctionLiquidator,
          subjectQuantity,
          price['priceNumerator'],
          price['priceDivisor'],
          subjectCaller
        );

        expect(actualInflowArray).to.deep.equal(flowArrays['inflowArray']);
      });

      it('returns the correct outflow tokens', async () => {
        const [, , actualOutflowArray] = await subject();

        const auctionDetails = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
        const timeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
        const price = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
          subjectTimeFastForward,
          timeToPivot,
          new BigNumber(auctionDetails[1]),
          new BigNumber(auctionDetails[2]),
          pricePrecision
        );
        const flowArrays = await liquidatorHelper.constructInflowOutflowArraysAsync(
          linearAuctionLiquidator,
          subjectQuantity,
          price['priceNumerator'],
          price['priceDivisor'],
          subjectCaller
        );
        expect(actualOutflowArray).to.deep.equal(flowArrays['outflowArray']);
      });
    });
  });

  describe('#placeBid', async () => {
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;

    let auctionTimeToPivot: BigNumber;
    let auctionSpeed: BigNumber;
    let pricePrecision: BigNumber;
    let startingCurrentSetQuantity: BigNumber;

    beforeEach(async () => {
      auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      pricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      const name = 'LinearAuctionLiquidator';
      linearAuctionLiquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        coreMock.address,
        oracleWhiteList.address,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
        name
      );

      subjectCaller = deployerAccount;

      await linearAuctionLiquidator.processProposal.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        { from: subjectCaller},
      );

      startingCurrentSetQuantity = ether(100);
      await linearAuctionLiquidator.startRebalance.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        startingCurrentSetQuantity,
        { from: subjectCaller }
      );

      const [minimumBid, , ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(subjectCaller);
      subjectQuantity = new BigNumber(minimumBid);
      subjectTimeFastForward = ONE_HOUR_IN_SECONDS;
    });

    async function subjectTxn(): Promise<string> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return linearAuctionLiquidator.placeBid.sendTransactionAsync(
        subjectQuantity,
        { from: subjectCaller }
      );
    }

    async function subjectCall(): Promise<[string[], BigNumber[], BigNumber[]]> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return linearAuctionLiquidator.placeBid.callAsync(
        subjectQuantity,
        { from: subjectCaller }
      );
    }

    it('updates the remainingCurrentSets correctly', async () => {
      await subjectTxn();

      const [, , actualRemainingCurrentSets] =  await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      const expectedRemainingCurrentSets = startingCurrentSetQuantity.sub(subjectQuantity);

      expect(actualRemainingCurrentSets).to.deep.equal(expectedRemainingCurrentSets.toString());
    });

    it('returns the correct combinedTokenArray', async () => {
      const [actualCombinedTokenArray, , ] = await subjectCall();

      expect(actualCombinedTokenArray).to.deep.equal(tokens);
    });

    it('returns the correct inflow tokens', async () => {
      const [, actualInflowArray , ] = await subjectCall();

      const auctionDetails = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      const timeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
      const price = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
        subjectTimeFastForward,
        timeToPivot,
        new BigNumber(auctionDetails[1]),
        new BigNumber(auctionDetails[2]),
        pricePrecision
      );
      const flowArrays = await liquidatorHelper.constructInflowOutflowArraysAsync(
        linearAuctionLiquidator,
        subjectQuantity,
        price['priceNumerator'],
        price['priceDivisor'],
        subjectCaller
      );

      expect(actualInflowArray).to.deep.equal(flowArrays['inflowArray']);
    });

    it('returns the correct outflow tokens', async () => {
      const [, , actualOutflowArray] = await subjectCall();

      const auctionDetails = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      const timeToPivot = await linearAuctionLiquidator.timeToPivot.callAsync();
      const price = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
        subjectTimeFastForward,
        timeToPivot,
        new BigNumber(auctionDetails[1]),
        new BigNumber(auctionDetails[2]),
        pricePrecision
      );
      const flowArrays = await liquidatorHelper.constructInflowOutflowArraysAsync(
        linearAuctionLiquidator,
        subjectQuantity,
        price['priceNumerator'],
        price['priceDivisor'],
        subjectCaller
      );

      expect(actualOutflowArray).to.deep.equal(flowArrays['outflowArray']);
    });

    describe('quantity is not a multiple of naturalUnit', async () => {
      beforeEach(async () => {
        const minimumBid = await liquidatorHelper.calculateMinimumBidAsync(
          currentSet,
          nextSet,
          pricePrecision
        );

        subjectQuantity = minimumBid.div(2);
      });

      it('should revert', async () => {
        await expectRevertError(subjectTxn());
      });
    });

    describe('quantity more than remainingCurrentSets', async () => {
      beforeEach(async () => {
        const minimumBid = await liquidatorHelper.calculateMinimumBidAsync(
          currentSet,
          nextSet,
          pricePrecision
        );

        subjectQuantity = startingCurrentSetQuantity.add(minimumBid);
      });

      it('should revert', async () => {
        await expectRevertError(subjectTxn());
      });
    });
  });

  describe('#settleRebalance', async () => {
    let subjectCaller: Address;

    const startingCurrentSetQuantity: BigNumber = ether(100);
    let noSettleBid: BigNumber = undefined;

    beforeEach(async () => {
      const auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      const auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      const pricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      const name = 'LinearAuctionLiquidator';
      linearAuctionLiquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        coreMock.address,
        oracleWhiteList.address,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
        name
      );

      subjectCaller = deployerAccount;

      await linearAuctionLiquidator.processProposal.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        { from: subjectCaller},
      );

      await linearAuctionLiquidator.startRebalance.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        startingCurrentSetQuantity,
        { from: subjectCaller }
      );

      const bidQuantity = noSettleBid || startingCurrentSetQuantity;
      await linearAuctionLiquidator.placeBid.sendTransactionAsync(
        bidQuantity,
        { from: subjectCaller }
      );
    });

    async function subject(): Promise<string> {
      return linearAuctionLiquidator.settleRebalance.sendTransactionAsync(
        { from: subjectCaller }
      );
    }

    it('deletes the minimumBid', async () => {
      await subject();

      const [actualMinimumBid, , ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(subjectCaller);
      expect(actualMinimumBid).to.be.bignumber.equal('0');
    });

    it('deletes the startingCurrentSets', async () => {
      await subject();

      const [, actualStartingCurrentSets, ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      expect(actualStartingCurrentSets).to.be.bignumber.equal('0');
    });

    it('deletes the remainingCurrentSets', async () => {
      await subject();

      const [, , actualRemainingCurrentSets] =  await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      expect(actualRemainingCurrentSets).to.be.bignumber.equal('0');
    });

    it('deletes the startPrice', async () => {
      await subject();

      const [actualStartTime, , ] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualStartTime).to.be.bignumber.equal('0');
    });

    it('deletes the startPrice', async () => {
      await subject();

      const [, actualStartPrice, ] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualStartPrice).to.be.bignumber.equal('0');
    });

    it('deletes the pivotPrice', async () => {
      await subject();

      const [, , actualPivotPrice] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualPivotPrice).to.be.bignumber.equal('0');
    });

    it('deletes the combinedTokenArray', async () => {
      await subject();

      const actualCombinedTokenArray = await linearAuctionLiquidator.getCombinedTokenArray.callAsync();
      const expectedCombinedTokenArray = [];

      expect(actualCombinedTokenArray).to.deep.equal(expectedCombinedTokenArray);
    });

    it('deletes the combinedCurrentSetUnits', async () => {
      await subject();

      const actualCombinedCurrentSetUnits = await linearAuctionLiquidator.getCombinedCurrentSetUnits.callAsync();
      const expectedCombinedCurrentSetUnits = [];

      expect(actualCombinedCurrentSetUnits).to.deep.equal(expectedCombinedCurrentSetUnits);
    });

    it('deletes the combinedNextSetUnits', async () => {
      await subject();

      const actualCombinedNextSetUnits = await linearAuctionLiquidator.getCombinedNextSetUnits.callAsync();
      const expectedCombinedNextSetUnits = [];

      expect(actualCombinedNextSetUnits).to.deep.equal(expectedCombinedNextSetUnits);
    });

    describe('when still too many remainingSets left', async () => {
      before(async () => {
        noSettleBid = startingCurrentSetQuantity.div(2);
      });

      after(async () => {
        noSettleBid = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#endFailedRebalance', async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      const auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      const auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      const pricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      const name = 'LinearAuctionLiquidator';
      linearAuctionLiquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        coreMock.address,
        oracleWhiteList.address,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
        name
      );

      subjectCaller = deployerAccount;

      await linearAuctionLiquidator.processProposal.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        { from: subjectCaller},
      );

      const startingCurrentSetQuantity = ether(100);
      await linearAuctionLiquidator.startRebalance.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        startingCurrentSetQuantity,
        { from: subjectCaller }
      );
    });

    async function subject(): Promise<string> {
      return linearAuctionLiquidator.endFailedRebalance.sendTransactionAsync(
        { from: subjectCaller }
      );
    }

    it('deletes the minimumBid', async () => {
      await subject();

      const [actualMinimumBid, , ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(subjectCaller);
      expect(actualMinimumBid).to.be.bignumber.equal('0');
    });

    it('deletes the startingCurrentSets', async () => {
      await subject();

      const [, actualStartingCurrentSets, ] = await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      expect(actualStartingCurrentSets).to.be.bignumber.equal('0');
    });

    it('deletes the remainingCurrentSets', async () => {
      await subject();

      const [, , actualRemainingCurrentSets] =  await linearAuctionLiquidator.generalAuctionDetails.callAsync(
        subjectCaller
      );
      expect(actualRemainingCurrentSets).to.be.bignumber.equal('0');
    });

    it('deletes the startPrice', async () => {
      await subject();

      const [actualStartTime, , ] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualStartTime).to.be.bignumber.equal('0');
    });

    it('deletes the startPrice', async () => {
      await subject();

      const [, actualStartPrice, ] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualStartPrice).to.be.bignumber.equal('0');
    });

    it('deletes the pivotPrice', async () => {
      await subject();

      const [, , actualPivotPrice] = await linearAuctionLiquidator.linearAuctionDetails.callAsync(subjectCaller);
      expect(actualPivotPrice).to.be.bignumber.equal('0');
    });

    it('deletes the combinedTokenArray', async () => {
      await subject();

      const actualCombinedTokenArray = await linearAuctionLiquidator.getCombinedTokenArray.callAsync();
      const expectedCombinedTokenArray = [];

      expect(actualCombinedTokenArray).to.deep.equal(expectedCombinedTokenArray);
    });

    it('deletes the combinedCurrentSetUnits', async () => {
      await subject();

      const actualCombinedCurrentSetUnits = await linearAuctionLiquidator.getCombinedCurrentSetUnits.callAsync();
      const expectedCombinedCurrentSetUnits = [];

      expect(actualCombinedCurrentSetUnits).to.deep.equal(expectedCombinedCurrentSetUnits);
    });

    it('deletes the combinedNextSetUnits', async () => {
      await subject();

      const actualCombinedNextSetUnits = await linearAuctionLiquidator.getCombinedNextSetUnits.callAsync();
      const expectedCombinedNextSetUnits = [];

      expect(actualCombinedNextSetUnits).to.deep.equal(expectedCombinedNextSetUnits);
    });
  });

  describe('#hasRebalanceFailed', async () => {
    let subjectCaller: Address;
    let subjectTimeFastForward: BigNumber;

    const startingCurrentSetQuantity: BigNumber = ether(100);
    let noSettleBid: BigNumber = ether(1);

    beforeEach(async () => {
      const auctionTimeToPivot = ONE_HOUR_IN_SECONDS.mul(4);
      const auctionSpeed = ONE_HOUR_IN_SECONDS.div(3);
      const pricePrecision = DEFAULT_AUCTION_PRICE_DIVISOR;
      const name = 'LinearAuctionLiquidator';
      linearAuctionLiquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
        coreMock.address,
        oracleWhiteList.address,
        pricePrecision,
        auctionTimeToPivot,
        auctionSpeed,
        name
      );

      subjectCaller = deployerAccount;

      await linearAuctionLiquidator.processProposal.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        { from: subjectCaller},
      );

      await linearAuctionLiquidator.startRebalance.sendTransactionAsync(
        currentSet.address,
        nextSet.address,
        startingCurrentSetQuantity,
        { from: subjectCaller }
      );

      const bidQuantity = noSettleBid || startingCurrentSetQuantity;
      await linearAuctionLiquidator.placeBid.sendTransactionAsync(
        bidQuantity,
        { from: subjectCaller }
      );

      subjectTimeFastForward = auctionTimeToPivot.add(1);
    });

    async function subject(): Promise<boolean> {
      await blockchain.increaseTimeAsync(subjectTimeFastForward);
      return linearAuctionLiquidator.hasRebalanceFailed.callAsync(
        { from: subjectCaller }
      );
    }

    it('returns true', async () => {
      const rebalanceFailed = await subject();

      expect(rebalanceFailed).to.be.true;
    });

    describe('when full size has been rebalanced', async () => {
      before(async () => {
        noSettleBid = undefined;
      });

      after(async () => {
        noSettleBid = ether(1);
      });

      it('should return false', async () => {
        const rebalanceFailed = await subject();

        expect(rebalanceFailed).to.be.false;
      });
    });

    describe('when timeToPivot has not been reached', async () => {
      beforeEach(async () => {
        subjectTimeFastForward = ZERO;
      });

      it('should return false', async () => {
        const rebalanceFailed = await subject();

        expect(rebalanceFailed).to.be.false;
      });
    });
  });
});