require('module-alias/register');

import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { LinearAuctionPriceCurveContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ERC20Wrapper } from '@utils/erc20Wrapper';
import { CoreWrapper } from '@utils/coreWrapper';
import { RebalancingWrapper } from '@utils/rebalancingWrapper';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import ChaiSetup from '@utils/chaiSetup';
import {
  DEFAULT_GAS,
  DEFAULT_AUCTION_PRICE_DENOMINATOR,
  ZERO,
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils } = setProtocolUtils;
const { expect } = chai;


contract('LinearAuctionPriceCurve', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let auctionCurve: LinearAuctionPriceCurveContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const blockchain = new Blockchain(web3);
  const rebalancingWrapper = new RebalancingWrapper(
    ownerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
    auctionCurve = await rebalancingWrapper.deployLinearAuctionPriceCurveAsync(DEFAULT_AUCTION_PRICE_DENOMINATOR);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe.only('#validateAuctionPriceParameters', async () => {
    let subjectAuctionTimeToPivot: BigNumber;
    let subjectAuctionStartPrice: BigNumber;
    let subjectAuctionPivotPrice: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectAuctionStartPrice = new BigNumber(500);
      subjectAuctionTimeToPivot = new BigNumber(100000);
      subjectAuctionPivotPrice = DEFAULT_AUCTION_PRICE_DENOMINATOR.mul(2);
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<BigNumber[]> {
      return auctionCurve.validateAuctionPriceParameters.callAsync(
        subjectAuctionTimeToPivot,
        subjectAuctionStartPrice,
        subjectAuctionPivotPrice,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('has a valid pivot price', async () => {
      await subject();

      expect(true).to.be.true;
    });

    describe('when the pivot price is lower than .5', async () => {
      beforeEach(async () => {
        const auctionPivotPrice = new BigNumber(0.4);
        subjectAuctionPivotPrice = DEFAULT_AUCTION_PRICE_DENOMINATOR.mul(auctionPivotPrice);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the pivot price is higher than 5', async () => {
      beforeEach(async () => {
        const auctionPivotPrice = new BigNumber(6);
        subjectAuctionPivotPrice = DEFAULT_AUCTION_PRICE_DENOMINATOR.mul(auctionPivotPrice);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getCurrentPrice', async () => {
    let subjectAuctionStartTime: BigNumber;
    let subjectAuctionTimeToPivot: BigNumber;
    let subjectAuctionStartPrice: BigNumber;
    let subjectAuctionPivotPrice: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectAuctionStartPrice = new BigNumber(500);
      subjectAuctionTimeToPivot = new BigNumber(100000);
      subjectAuctionStartTime = SetTestUtils.generateTimestamp(0);
      subjectAuctionPivotPrice = DEFAULT_AUCTION_PRICE_DENOMINATOR.mul(2);
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<BigNumber[]> {
      return auctionCurve.getCurrentPrice.callAsync(
        subjectAuctionStartTime,
        subjectAuctionTimeToPivot,
        subjectAuctionStartPrice,
        subjectAuctionPivotPrice,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('starts with the correct price', async () => {
      const returnedPrice = await subject();

      expect(returnedPrice[0]).to.be.bignumber.equal(ZERO);
      expect(returnedPrice[1]).to.be.bignumber.equal(DEFAULT_AUCTION_PRICE_DENOMINATOR);
    });

    it('returns the correct price after one hour', async () => {
      const timeJump = new BigNumber(3600);
      await blockchain.increaseTimeAsync(timeJump);

      const returnedPrice = await subject();

      const expectedPrice = timeJump.div(new BigNumber(30));
      expect(returnedPrice[0]).to.be.bignumber.equal(expectedPrice);
      expect(returnedPrice[1]).to.be.bignumber.equal(DEFAULT_AUCTION_PRICE_DENOMINATOR);
    });
  });
});
