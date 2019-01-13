require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  FeedFactoryContract,
  PriceFeedContract,
  MedianContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ZERO } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { OracleWrapper } from '@utils/wrappers/oracleWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const FeedFactory = artifacts.require('FeedFactory');
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);
const setUtils = new SetUtils(web3);


contract('Median Oracle', accounts => {
  const [
    ownerAccount,
    secondOracleAccount,
    thirdOracleAccount,
  ] = accounts;

  let feedFactory: FeedFactoryContract;

  const oracleWrapper = new OracleWrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(FeedFactory.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(FeedFactory.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('FeedFactory', async () => {
    beforeEach(async () => {
      feedFactory = await oracleWrapper.deployFeedFactoryAsync();
    });

    describe('#create', async () => {
      async function subject(): Promise<PriceFeedContract> {
        return await oracleWrapper.deployPriceFeedAsync(feedFactory);
      }

      it('creates a price feed', async () => {
        const priceFeed = await subject();

        const peekResponse = await priceFeed.peek.callAsync();
        const initialValue = peekResponse[0];

        expect(initialValue).to.bignumber.equal(ZERO);
      });
    });
  });

  describe('PriceFeed', async () => {
    let priceFeed: PriceFeedContract;

    beforeEach(async () => {
      feedFactory = await oracleWrapper.deployFeedFactoryAsync();
      priceFeed = await oracleWrapper.deployPriceFeedAsync(feedFactory);
    });

    describe('#poke', async () => {
      let subjectPrice: BigNumber;
      let subjectTimestamp: BigNumber;
      let subjectCaller: Address;

      beforeEach(async () => {
        subjectPrice = new BigNumber(1000000000000000000);
        subjectTimestamp = SetTestUtils.generateTimestamp(1000);
        subjectCaller = ownerAccount;
      });

      async function subject(): Promise<string> {
        return await priceFeed.poke.sendTransactionAsync(
          subjectPrice,
          subjectTimestamp,
          { from: subjectCaller }
        );
      }

      it('updates the price feed value', async () => {
        await subject();

        const peekResponse = await priceFeed.peek.callAsync();
        const value = peekResponse[0];

        const priceBuffer = SetUtils.paddedBufferForBigNumber(subjectPrice);
        const expectedValue = SetTestUtils.bufferArrayToHex([priceBuffer]);

        expect(value).to.bignumber.equal(expectedValue);
      });

      it('updates the price feed timestamp', async () => {
        await subject();

        const peekResponse = await priceFeed.peek.callAsync();
        const value = peekResponse[1];

        expect(value).to.be.true;
      });
    });
  });

  describe('Medianizer', async () => {
    let oracleCount: number;
    let medianizer: MedianContract;

    beforeEach(async () => {
      medianizer = await oracleWrapper.deployMedianizerAsync();
    });

    describe('#poke', async () => {
      let subjectValues: BigNumber[];
      let subjectTimestamps: BigNumber[];
      let subjectVSignatures: BigNumber[];
      let subjectRSignatures: Bytes[];
      let subjectSSignatures: Bytes[];
      let subjectCaller: Address;

      let updatedPrice: BigNumber;

      beforeEach(async () => {
        oracleCount = 3;
        await oracleWrapper.addPriceFeedOwnerToMedianizer(medianizer, ownerAccount);
        await oracleWrapper.addPriceFeedOwnerToMedianizer(medianizer, secondOracleAccount);
        await oracleWrapper.addPriceFeedOwnerToMedianizer(medianizer, thirdOracleAccount);

        updatedPrice = new BigNumber(10000000);
        const updatedTimestamp = SetTestUtils.generateTimestamp(1000);

        const standardSignature = SetUtils.hashPriceFeedHex(updatedPrice, updatedTimestamp);
        const firstECSignature = await setUtils.signMessage(standardSignature, ownerAccount);
        const secondECSignature = await setUtils.signMessage(standardSignature, secondOracleAccount);
        const thirdECSignature = await setUtils.signMessage(standardSignature, thirdOracleAccount);

        subjectValues = _.times(oracleCount, () => updatedPrice);
        subjectTimestamps = _.times(oracleCount, () => updatedTimestamp);
        subjectVSignatures = [
          new BigNumber(firstECSignature.v),
          new BigNumber(secondECSignature.v),
          new BigNumber(thirdECSignature.v),
        ];
        subjectRSignatures = [firstECSignature.r, secondECSignature.r, thirdECSignature.r];
        subjectSSignatures = [firstECSignature.s, secondECSignature.s, thirdECSignature.s];
        subjectCaller = ownerAccount;
      });

      async function subject(): Promise<string> {
        return await medianizer.poke.sendTransactionAsync(
          subjectValues,
          subjectTimestamps,
          subjectVSignatures,
          subjectRSignatures,
          subjectSSignatures,
          { from: subjectCaller }
        );
      }

      it('updates the price feed value', async () => {
        await subject();

        const peekResponse = await medianizer.peek.callAsync();
        const value = peekResponse[0];

        const priceBuffer = SetUtils.paddedBufferForBigNumber(updatedPrice);
        const expectedValue = SetTestUtils.bufferArrayToHex([priceBuffer]);

        expect(value).to.bignumber.equal(expectedValue);
      });

      describe('when the number of updates (3) is less than the quorum (4)', async () => {
        beforeEach(async () => {
          await oracleWrapper.setMedianizerMinimumQuorumAsync(medianizer, oracleCount + 1);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });
});
