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
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  AuctionMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
} from '@utils/constants';
import { ether, gWei } from '@utils/units';

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

contract('Auction', accounts => {
  const [
    ownerAccount,
    functionCaller,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let auctionMock: AuctionMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const oracleHelper = new OracleHelper(ownerAccount);
  const valuationHelper = new ValuationHelper(ownerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper, valuationHelper);

  let component1: StandardTokenMockContract;
  let component2: StandardTokenMockContract;
  let component3: StandardTokenMockContract;

  let set1: SetTokenContract;
  let set2: SetTokenContract;

  let set1Components: Address[];
  let set2Components: Address[];

  let set1Units: BigNumber[];
  let set2Units: BigNumber[];

  let set1NaturalUnit: BigNumber;
  let set2NaturalUnit: BigNumber;

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
    ABIDecoder.addABI(AuctionMockContract.getAbi());

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
    set1NaturalUnit = gWei(2);
    set1 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set1Components,
      set1Units,
      set1NaturalUnit,
    );

    set2Components = [component2.address, component3.address];
    set2Units = [gWei(1), gWei(1)];
    set2NaturalUnit = gWei(1);
    set2 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set2Components,
      set2Units,
      set2NaturalUnit,
    );
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
    ABIDecoder.removeABI(AuctionMockContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#initializeAuction', async () => {
    let subjectCaller: Address;
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSetQuantity: BigNumber;

    beforeEach(async () => {
      auctionMock = await liquidatorHelper.deployAuctionMockAsync();

      subjectCaller = functionCaller;
      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
      subjectStartingCurrentSetQuantity = ether(10);
    });

    after(async () => {
    });

    async function subject(): Promise<string> {
      return auctionMock.initializeAuction.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSetQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('sets the correct startTime', async () => {
      await subject();

      const auctionSetup: any = await auctionMock.auction.callAsync();

      const { timestamp } = await web3.eth.getBlock('latest');
      expect(auctionSetup.startTime).to.bignumber.equal(timestamp);
    });

    it('sets the correct startingCurrentSets', async () => {
      await subject();

      const auctionSetup: any = await auctionMock.auction.callAsync();
      expect(auctionSetup.startingCurrentSets).to.bignumber.equal(subjectStartingCurrentSetQuantity);
    });

    it('sets the correct remainingCurrentSets', async () => {
      await subject();

      const auctionSetup: any = await auctionMock.auction.callAsync();
      expect(auctionSetup.remainingCurrentSets).to.bignumber.equal(subjectStartingCurrentSetQuantity);
    });

    it('sets the correct combinedTokenArray', async () => {
      await subject();

      const combinedTokenArray = await auctionMock.combinedTokenArray.callAsync();
      const expectedResult = _.union(set1Components, set2Components);

      expect(JSON.stringify(combinedTokenArray)).to.equal(JSON.stringify(expectedResult));
    });

    it('sets the correct combinedCurrentSetUnits', async () => {
      await subject();

      const combinedCurrentSetUnits = await auctionMock.combinedCurrentSetUnits.callAsync();

      const combinedTokenArray = await auctionMock.combinedTokenArray.callAsync();
      const auctionSetup: any = await auctionMock.auction.callAsync();

      const expectedResult = await liquidatorHelper.constructCombinedUnitArrayAsync(
        set1,
        combinedTokenArray,
        new BigNumber(auctionSetup.maxNaturalUnit),
      );

      expect(JSON.stringify(combinedCurrentSetUnits)).to.equal(JSON.stringify(expectedResult));
    });

    it('sets the correct combinedNextSetUnits', async () => {
      await subject();

      const combinedNextSetUnits = await auctionMock.combinedNextSetUnits.callAsync();
      const combinedTokenArray = await auctionMock.combinedTokenArray.callAsync();
      const auctionSetup: any = await auctionMock.auction.callAsync();

      const expectedResult = await liquidatorHelper.constructCombinedUnitArrayAsync(
        set2,
        combinedTokenArray,
        new BigNumber(auctionSetup.maxNaturalUnit),
      );

      expect(JSON.stringify(combinedNextSetUnits)).to.equal(JSON.stringify(expectedResult));
    });
  });

  describe('#reduceRemainingCurrentSets', async () => {
    let subjectCaller: Address;

    let startingCurrentSetQuantity: BigNumber;

    let subjectReductionQuantity: BigNumber;

    beforeEach(async () => {
      auctionMock = await liquidatorHelper.deployAuctionMockAsync();

      subjectCaller = functionCaller;
      startingCurrentSetQuantity = ether(10);

      await auctionMock.initializeAuction.sendTransactionAsync(
        set1.address,
        set2.address,
        startingCurrentSetQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );

      subjectReductionQuantity = ether(5);
    });

    async function subject(): Promise<string> {
      return auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
        subjectReductionQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('calculates the correct new remainingCurrentSets', async () => {
      await subject();

      const auctionSetup: any = await auctionMock.auction.callAsync();
      const expectedRemainingCurrentSets = startingCurrentSetQuantity.sub(subjectReductionQuantity);
      expect(auctionSetup.remainingCurrentSets).to.bignumber.equal(expectedRemainingCurrentSets);
    });
  });

  describe('#validateBidQuantity', async () => {
    let subjectCaller: Address;

    let startingCurrentSetQuantity: BigNumber;

    let subjectQuantity: BigNumber;

    beforeEach(async () => {
      auctionMock = await liquidatorHelper.deployAuctionMockAsync();

      subjectCaller = functionCaller;
      startingCurrentSetQuantity = ether(10);

      await auctionMock.initializeAuction.sendTransactionAsync(
        set1.address,
        set2.address,
        startingCurrentSetQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );

      subjectQuantity = ether(5);
    });

    async function subject(): Promise<string> {
      return auctionMock.validateBidQuantity.sendTransactionAsync(
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('does not revert', async () => {
      await subject();
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
  });

  describe('#validateAuctionCompletion', async () => {
    let subjectCaller: Address;

    let startingCurrentSetQuantity: BigNumber;
    let reductionQuantity: BigNumber;
    let customReductionQuantity: BigNumber;

    beforeEach(async () => {
      auctionMock = await liquidatorHelper.deployAuctionMockAsync();

      subjectCaller = functionCaller;
      startingCurrentSetQuantity = ether(10);

      await auctionMock.initializeAuction.sendTransactionAsync(
        set1.address,
        set2.address,
        startingCurrentSetQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );

      reductionQuantity = customReductionQuantity || startingCurrentSetQuantity;
      await auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
        reductionQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    });

    async function subject(): Promise<string> {
      return auctionMock.validateAuctionCompletion.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when the auction is not complete', async () => {
      before(async () => {
        customReductionQuantity = startingCurrentSetQuantity.div(2);
      });

      after(async () => {
        customReductionQuantity = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#isAuctionActive', async () => {
    let subjectCaller: Address;
    let startingCurrentSetQuantity: BigNumber;

    beforeEach(async () => {
      auctionMock = await liquidatorHelper.deployAuctionMockAsync();

      subjectCaller = functionCaller;
    });

    async function subject(): Promise<boolean> {
      return auctionMock.isAuctionActive.callAsync(
        { from: subjectCaller, gas: DEFAULT_GAS },
      );
    }

    it('should return false', async () => {
      const result = await subject();
      expect(result).to.equal(false);
    });

    describe('when the auction has begun', async () => {
      beforeEach(async () => {
        startingCurrentSetQuantity = ether(10);

        await blockchain.increaseTimeAsync(new BigNumber(1000));

        await auctionMock.initializeAuction.sendTransactionAsync(
          set1.address,
          set2.address,
          startingCurrentSetQuantity,
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      });

      it('should return true', async () => {
        const result = await subject();
        expect(result).to.equal(true);
      });
    });
  });
});
