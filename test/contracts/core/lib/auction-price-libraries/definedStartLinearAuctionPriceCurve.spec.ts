require('module-alias/register');

import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { LinearAuctionPriceCurveContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import ChaiSetup from '@utils/chaiSetup';
import {
  DEFAULT_AUCTION_PRICE_DIVISOR,
  ZERO,
} from '@utils/constants';
import { getWeb3, blankTxn } from '@utils/web3Helper';

import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { CoreHelper } from '@utils/helpers/coreHelper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const { expect } = chai;


contract('DefinedStartLinearAuctionPriceCurve', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let auctionCurve: LinearAuctionPriceCurveContract;

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
    const usesStartPrice = true;
    auctionCurve = await rebalancingHelper.deployLinearAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_DIVISOR,
      usesStartPrice
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

    let subjectAuctionPriceParameters: any;

    beforeEach(async () => {
      auctionStartPrice = new BigNumber(500);
      auctionTimeToPivot = new BigNumber(100000);
      auctionStartTime = ZERO;
      auctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(2);

      subjectAuctionPriceParameters = {
        auctionStartTime,
        auctionTimeToPivot,
        auctionStartPrice,
        auctionPivotPrice,
      };
    });

    async function subject(): Promise<void> {
      return auctionCurve.validateAuctionPriceParameters.callAsync(
        subjectAuctionPriceParameters,
      );
    }

    it('has a valid pivot price', async () => {
      await subject();

      expect(true).to.be.true;
    });

    describe('when the pivot price is lower than .2', async () => {
      beforeEach(async () => {
        const auctionPivotRatio = new BigNumber(0.15);
        subjectAuctionPriceParameters.auctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(auctionPivotRatio);
        subjectAuctionPriceParameters.auctionStartPrice = ZERO;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the pivot price is higher than 5', async () => {
      beforeEach(async () => {
        const auctionPivotRatio = new BigNumber(6);
        subjectAuctionPriceParameters.auctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(auctionPivotRatio);
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
  });

  describe('#getCurrentPrice', async () => {
    let auctionStartTime: BigNumber;
    let auctionTimeToPivot: BigNumber;
    let auctionStartPrice: BigNumber;
    let auctionPivotPrice: BigNumber;

    let subjectAuctionPriceParameters: any;

    beforeEach(async () => {
      auctionStartPrice = new BigNumber(500);
      auctionTimeToPivot = new BigNumber(100000);
      auctionStartTime = SetTestUtils.generateTimestamp(0);
      auctionPivotPrice = DEFAULT_AUCTION_PRICE_DIVISOR.mul(2);

      subjectAuctionPriceParameters = {
        auctionStartPrice,
        auctionTimeToPivot,
        auctionStartTime,
        auctionPivotPrice,
      };
    });

    async function subject(): Promise<BigNumber[]> {
      return auctionCurve.getCurrentPrice.callAsync(
        subjectAuctionPriceParameters,
      );
    }

    it('starts with the correct price', async () => {
      const returnedPrice = await subject();

      expect(returnedPrice[0]).to.be.bignumber.equal(auctionStartPrice);
      expect(returnedPrice[1]).to.be.bignumber.equal(DEFAULT_AUCTION_PRICE_DIVISOR);
    });

    it('returns the correct price after one hour', async () => {
      const timeJump = new BigNumber(3600);
      await blockchain.increaseTimeAsync(timeJump);
      await blankTxn(ownerAccount);

      const returnedPrice = await subject();

      const expectedPrice = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
        timeJump,
        subjectAuctionPriceParameters.auctionTimeToPivot,
        subjectAuctionPriceParameters.auctionStartPrice,
        subjectAuctionPriceParameters.auctionPivotPrice,
        DEFAULT_AUCTION_PRICE_DIVISOR,
      );

      expect(returnedPrice[0]).to.be.bignumber.equal(expectedPrice.priceNumerator);
      expect(returnedPrice[1]).to.be.bignumber.equal(expectedPrice.priceDivisor);
    });

    it('returns the correct price at the pivot', async () => {
      const timeJump = subjectAuctionPriceParameters.auctionTimeToPivot;
      await blockchain.increaseTimeAsync(timeJump);
      await blankTxn(ownerAccount);

      const returnedPrice = await subject();

      expect(returnedPrice[0]).to.be.bignumber.equal(subjectAuctionPriceParameters.auctionPivotPrice);
      expect(returnedPrice[1]).to.be.bignumber.equal(DEFAULT_AUCTION_PRICE_DIVISOR);
    });

    it('returns the correct price after the pivot', async () => {
      const timeJump = new BigNumber(115000);
      await blockchain.increaseTimeAsync(timeJump);
      await blankTxn(ownerAccount);

      const returnedPrice = await subject();

      const expectedPrice = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
        timeJump,
        subjectAuctionPriceParameters.auctionTimeToPivot,
        subjectAuctionPriceParameters.auctionStartPrice,
        subjectAuctionPriceParameters.auctionPivotPrice,
        DEFAULT_AUCTION_PRICE_DIVISOR,
      );

      expect(returnedPrice[0]).to.be.bignumber.equal(expectedPrice.priceNumerator);
      expect(returnedPrice[1]).to.be.bignumber.equal(expectedPrice.priceDivisor);
    });

    it('returns the correct price after denominator hits 1', async () => {
      const timeJump = new BigNumber(150000);
      await blockchain.increaseTimeAsync(timeJump);
      await blankTxn(ownerAccount);

      const returnedPrice = await subject();

      const expectedPrice = rebalancingHelper.getExpectedOpenLinearAuctionPrice(
        timeJump,
        subjectAuctionPriceParameters.auctionTimeToPivot,
        subjectAuctionPriceParameters.auctionStartPrice,
        subjectAuctionPriceParameters.auctionPivotPrice,
        DEFAULT_AUCTION_PRICE_DIVISOR,
      );

      expect(returnedPrice[0]).to.be.bignumber.equal(expectedPrice.priceNumerator);
      expect(returnedPrice[1]).to.be.bignumber.equal(expectedPrice.priceDivisor);
    });
  });
});
