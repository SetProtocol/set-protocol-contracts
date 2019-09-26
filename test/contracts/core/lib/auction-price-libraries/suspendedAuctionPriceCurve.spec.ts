require('module-alias/register');

import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { SuspendedAuctionPriceCurveContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import ChaiSetup from '@utils/chaiSetup';
import {
  DEFAULT_GAS,
  DEFAULT_AUCTION_PRICE_DIVISOR,
  DEFAULT_SUSPENDED_MIN_AUCTION_FAIL_TIME,
  DEFAULT_SUSPENDED_MAX_AUCTION_FAIL_TIME,
  ZERO,
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { CoreHelper } from '@utils/helpers/coreHelper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const { expect } = chai;


contract('SuspendedAuctionPriceCurve', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let auctionCurve: SuspendedAuctionPriceCurveContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const blockchain = new Blockchain(web3);
  const rebalancingHelper = new RebalancingHelper(
    ownerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
    auctionCurve = await rebalancingHelper.deploySuspendedAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_DIVISOR,
      DEFAULT_SUSPENDED_MIN_AUCTION_FAIL_TIME,
      DEFAULT_SUSPENDED_MAX_AUCTION_FAIL_TIME,
    );
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#validateAuctionPriceParameters', async () => {
    let auctionStartTime: BigNumber;
    let auctionTimeToPivot: BigNumber;
    let auctionStartPrice: BigNumber;
    let auctionPivotPrice: BigNumber;

    let lastCriticalBidTime: BigNumber;
    let lastCriticalBidNumerator: BigNumber;
    let lastCriticalBidRemainingShares: BigNumber;
    let suspensionTime: BigNumber;
    let auctionFailTime: BigNumber;
    let criticalThreshold: BigNumber;

    let subjectAuctionPriceParameters: any;
    let subjectSuspendedPriceParameters: any;
    let subjectCaller: Address;

    beforeEach(async () => {
      auctionStartPrice = new BigNumber(500);
      auctionTimeToPivot = new BigNumber(100000);
      auctionStartTime = ZERO;
      auctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(2);

      lastCriticalBidTime = new BigNumber(0);
      lastCriticalBidNumerator = new BigNumber(600);
      lastCriticalBidRemainingShares = new BigNumber(100);
      suspensionTime = new BigNumber(3600);
      auctionFailTime = DEFAULT_SUSPENDED_MIN_AUCTION_FAIL_TIME;
      criticalThreshold = ZERO;


      subjectAuctionPriceParameters = {
        auctionStartTime,
        auctionTimeToPivot,
        auctionStartPrice,
        auctionPivotPrice,
      };

      subjectSuspendedPriceParameters = {
        lastCriticalBidTime,
        lastCriticalBidNumerator,
        lastCriticalBidRemainingShares,
        suspensionTime,
        auctionFailTime,
        criticalThreshold,
      };

      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<void> {
      return auctionCurve.validateAuctionPriceParameters.callAsync(
        subjectAuctionPriceParameters,
        subjectSuspendedPriceParameters,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('has a valid pivot price', async () => {
      await subject();

      expect(true).to.be.true;
    });

    describe('when the start time is lower than the time to pivot', async () => {
      beforeEach(async () => {
        subjectAuctionPriceParameters.auctionStartTime = new BigNumber(1000);
        subjectAuctionPriceParameters.auctionTimeToPivot = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the pivot price is less than the start price', async () => {
      beforeEach(async () => {
        const auctionPivotRatio = new BigNumber(0.6);
        const auctionStartRatio = new BigNumber(0.8);
        subjectAuctionPriceParameters.auctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(auctionPivotRatio);
        subjectAuctionPriceParameters.auctionStartPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(auctionStartRatio);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the auctionFailTime is less than the minAuctionFailTime', async () => {
      beforeEach(async () => {
        subjectSuspendedPriceParameters.auctionFailTime = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the auctionFailTime is greater than the maxAuctionFailTime', async () => {
      beforeEach(async () => {
        subjectSuspendedPriceParameters.auctionFailTime = DEFAULT_SUSPENDED_MAX_AUCTION_FAIL_TIME.mul(2);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getCurrentPrice', async () => {
    let auctionStartTime: BigNumber;
    let auctionTimeToPivot: BigNumber;
    let auctionStartPrice: BigNumber;
    let auctionPivotPrice: BigNumber;

    let lastCriticalBidTime: BigNumber;
    let lastCriticalBidNumerator: BigNumber;
    let lastCriticalBidRemainingShares: BigNumber;
    let suspensionTime: BigNumber;

    let subjectAuctionPriceParameters: any;
    let subjectSuspendedPriceParameters: any;
    let subjectCaller: Address;

    beforeEach(async () => {
      auctionStartPrice = new BigNumber(0);
      auctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR; // 1000
      auctionStartTime = new BigNumber(0);
      auctionTimeToPivot = new BigNumber(10000);

      lastCriticalBidTime = SetTestUtils.generateTimestamp(0);
      lastCriticalBidNumerator = new BigNumber(600);
      lastCriticalBidRemainingShares = new BigNumber(100);
      suspensionTime = new BigNumber(3600);

      subjectAuctionPriceParameters = {
        auctionStartPrice,
        auctionTimeToPivot,
        auctionStartTime,
        auctionPivotPrice,
      };

      subjectSuspendedPriceParameters = {
        lastCriticalBidTime,
        lastCriticalBidNumerator,
        lastCriticalBidRemainingShares,
        suspensionTime,
        auctionFailTime: ZERO,
        criticalThreshold: ZERO,
      };

      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<BigNumber[]> {
      return auctionCurve.getCurrentPrice.callAsync(
        subjectAuctionPriceParameters,
        subjectSuspendedPriceParameters,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('starts with the correct price when in suspension period', async () => {
      const timeJump = suspensionTime.div(2);
      await blockchain.increaseTimeAsync(timeJump);

      const returnedPrice = await subject();

      expect(returnedPrice[0]).to.be.bignumber.equal(lastCriticalBidNumerator);
      expect(returnedPrice[1]).to.be.bignumber.equal(DEFAULT_AUCTION_PRICE_DIVISOR);
    });

    it('returns the correct price after the extension period', async () => {
      const timeJump = suspensionTime.mul(2);
      await blockchain.increaseTimeAsync(timeJump);

      const returnedPrice = await subject();

      const { timestamp } = await web3.eth.getBlock('latest');
      // THe current time is not reflected onchain yet.
      const expectedCurrentTimestamp = new BigNumber(timestamp).plus(timeJump);

      const expectedPrice = rebalancingHelper.getExpectedSuspendedAuctionPrice(
        expectedCurrentTimestamp,
        subjectAuctionPriceParameters.auctionStartTime,
        subjectAuctionPriceParameters.auctionTimeToPivot,
        subjectAuctionPriceParameters.auctionStartPrice,
        subjectAuctionPriceParameters.auctionPivotPrice,
        DEFAULT_AUCTION_PRICE_DIVISOR,
        subjectSuspendedPriceParameters.lastCriticalBidTime,
        subjectSuspendedPriceParameters.lastCriticalBidNumerator,
        subjectSuspendedPriceParameters.suspensionTime,
      );

      expect(returnedPrice[0]).to.be.bignumber.equal(expectedPrice.priceNumerator);
      expect(returnedPrice[1]).to.be.bignumber.equal(expectedPrice.priceDivisor);

    });
  });
});
