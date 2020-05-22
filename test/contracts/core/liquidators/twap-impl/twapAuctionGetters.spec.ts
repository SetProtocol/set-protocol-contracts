require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';
import { OracleHelper } from 'set-protocol-oracles';

import { ether } from '@utils/units';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { TWAPAuctionGettersMockContract } from '@utils/contracts';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper, TestTWAPAuctionData } from '@utils/helpers/liquidatorHelper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

contract('TWAPAuctionGetters', accounts => {
  const [ownerAccount, dummyTradingPool] = accounts;
  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const oracleHelper = new OracleHelper(ownerAccount);
  const valuationHelper = new ValuationHelper(ownerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper, valuationHelper);

  let auctionGetters: TWAPAuctionGettersMockContract;

  const twapAuctionState = {
    orderSize: ether(20),
    orderRemaining: ether(15),
    lastChunkAuctionEnd: ether(.01),
    chunkAuctionPeriod: ether(1),
    chunkSize: ether(10 ** 6),
    remainingCurrentSets: ether(1),
  } as TestTWAPAuctionData;

  beforeEach(async () => {
    auctionGetters = await liquidatorHelper.deployTWAPAuctionGettersMockAsync();
    await auctionGetters.setState.sendTransactionAsync(twapAuctionState);
  });

  describe('#getOrderSize', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber> {
      return auctionGetters.getOrderSize.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct order size', async () => {
      const actualOrderSize = await subject();

      expect(actualOrderSize).to.be.bignumber.equal(twapAuctionState.orderSize);
    });
  });

  describe('#getOrderRemaining', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber> {
      return auctionGetters.getOrderRemaining.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct order remaining', async () => {
      const actualOrderRemaining = await subject();

      expect(actualOrderRemaining).to.be.bignumber.equal(twapAuctionState.orderRemaining);
    });
  });

  describe('#getChunkSize', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber> {
      return auctionGetters.getChunkSize.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct chunk size', async () => {
      const actualChunkSize = await subject();

      expect(actualChunkSize).to.be.bignumber.equal(twapAuctionState.chunkSize);
    });
  });

  describe('#getChunkAuctionPeriod', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber> {
      return auctionGetters.getChunkAuctionPeriod.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct chunk auction period', async () => {
      const actualChunkAuctionPeriod = await subject();

      expect(actualChunkAuctionPeriod).to.be.bignumber.equal(twapAuctionState.chunkAuctionPeriod);
    });
  });

  describe('#getLastChunkAuctionEnd', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber> {
      return auctionGetters.getLastChunkAuctionEnd.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct last chunk auction end', async () => {
      const actualLastChunkAuctionEnd = await subject();

      expect(actualLastChunkAuctionEnd).to.be.bignumber.equal(twapAuctionState.lastChunkAuctionEnd);
    });
  });
});