require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  ManagerLibraryMockContract
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import { DEFAULT_AUCTION_PRICE_DIVISOR } from '@utils/constants';

import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const blockchain = new Blockchain(web3);
const { expect } = chai;

contract('ManagerLibraryMock', accounts => {
  const [
    contractDeployer,
  ] = accounts;

  let managerLibraryMock: ManagerLibraryMockContract;

  const libraryMockWrapper = new LibraryMockWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    managerLibraryMock = await libraryMockWrapper.deployManagerLibraryMockAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#calculateAuctionPriceParameters', async () => {
    let subjectCurrentSetDollarAmount: BigNumber;
    let subjectNextSetDollarAmount: BigNumber;
    let subjectAuctionLibraryPriceDivisor: BigNumber;
    let subjectAuctionTimeToPivot: BigNumber;

    const THIRTY_MINUTE_IN_SECONDS = new BigNumber(60 * 30);

    beforeEach(async () => {
      subjectCurrentSetDollarAmount = new BigNumber(10 ** 20);
      subjectNextSetDollarAmount = new BigNumber(10 ** 20).mul(2);
      subjectAuctionLibraryPriceDivisor = DEFAULT_AUCTION_PRICE_DIVISOR;
      subjectAuctionTimeToPivot = new BigNumber(60 * 60 * 24); // 1 day
    });

    async function subject(): Promise<any> {
      return managerLibraryMock.calculateAuctionPriceParameters.callAsync(
        subjectCurrentSetDollarAmount,
        subjectNextSetDollarAmount,
        subjectAuctionLibraryPriceDivisor,
        subjectAuctionTimeToPivot,
      );
    }

    it('should return the correct auctionStartPrice', async () => {
      const [auctionStartPrice] = await subject();

      const fairValue = subjectNextSetDollarAmount
                          .mul(subjectAuctionLibraryPriceDivisor)
                          .div(subjectCurrentSetDollarAmount);
      const thirtyMinutePeriods = subjectAuctionTimeToPivot.div(THIRTY_MINUTE_IN_SECONDS);
      const halfPriceRange = thirtyMinutePeriods.mul(fairValue).div(200);
      const expectedStartPrice = fairValue.sub(halfPriceRange);

      expect(expectedStartPrice).to.bignumber.equal(auctionStartPrice);
    });

    it('should return the correct auctionPivotPrice', async () => {
      const [, auctionPivotPrice] = await subject();

      const fairValue = subjectNextSetDollarAmount
                          .mul(subjectAuctionLibraryPriceDivisor)
                          .div(subjectCurrentSetDollarAmount);
      const thirtyMinutePeriods = subjectAuctionTimeToPivot.div(THIRTY_MINUTE_IN_SECONDS);
      const halfPriceRange = thirtyMinutePeriods.mul(fairValue).div(200);
      const expectedPivotPrice = fairValue.add(halfPriceRange);

      expect(expectedPivotPrice).to.bignumber.equal(auctionPivotPrice);
    });
  });
});
