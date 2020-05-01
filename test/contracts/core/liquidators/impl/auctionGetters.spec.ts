require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';
import { OracleHelper } from 'set-protocol-oracles';

import { ether } from '@utils/units';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { AuctionGettersMockContract } from '@utils/contracts';
import { ZERO } from '@utils/constants';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper, AuctionData } from '@utils/helpers/liquidatorHelper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

contract('AuctionGetters', accounts => {
  const [ownerAccount, dummyTradingPool, tokenOne, tokenTwo] = accounts;
  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const oracleHelper = new OracleHelper(ownerAccount);
  const valuationHelper = new ValuationHelper(ownerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper, valuationHelper);

  let auctionGetters: AuctionGettersMockContract;

  const auctionState = {
    maxNaturalUnit: ether(.0001),
    minimumBid: ether(.001),
    startTime: ether(.01),
    startingCurrentSets: ether(1),
    remainingCurrentSets: ether(1),
    combinedTokenArray: [tokenOne, tokenTwo],
    combinedCurrentSetUnits: [ether(1), ZERO],
    combinedNextSetUnits: [ZERO, ether(1)],
  } as AuctionData;

  beforeEach(async () => {
    auctionGetters = await liquidatorHelper.deployAuctionGettersMockAsync();

    await auctionGetters.setState.sendTransactionAsync(auctionState);
  });

  describe('#minimumBid', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber> {
      return auctionGetters.minimumBid.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct minimumBid', async () => {
      const actualMinBid = await subject();

      expect(actualMinBid).to.be.bignumber.equal(auctionState.minimumBid);
    });
  });

  describe('#remainingCurrentSets', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber> {
      return auctionGetters.remainingCurrentSets.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct remaining current sets', async () => {
      const actualRemainingCurrentSets = await subject();

      expect(actualRemainingCurrentSets).to.be.bignumber.equal(auctionState.remainingCurrentSets);
    });
  });

  describe('#startingCurrentSets', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber> {
      return auctionGetters.startingCurrentSets.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct starting current sets', async () => {
      const actualStartingCurrentSets = await subject();

      expect(actualStartingCurrentSets).to.be.bignumber.equal(auctionState.startingCurrentSets);
    });
  });

  describe('#getCombinedTokenArray', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<string[]> {
      return auctionGetters.getCombinedTokenArray.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct combined token array', async () => {
      const actualCombinedTokenArray = await subject();

      expect(JSON.stringify(actualCombinedTokenArray)).to.equal(JSON.stringify(auctionState.combinedTokenArray));
    });
  });

  describe('#getCombinedCurrentSetUnits', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber[]> {
      return auctionGetters.getCombinedCurrentSetUnits.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct combined current set units', async () => {
      const combinedCurrentSetUnits = await subject();

      expect(JSON.stringify(combinedCurrentSetUnits)).to.equal(JSON.stringify(auctionState.combinedCurrentSetUnits));
    });
  });

  describe('#getCombinedNextSetUnits', async () => {
    const subjectSet: Address = dummyTradingPool;
    const subjectCaller: Address = ownerAccount;

    async function subject(): Promise<BigNumber[]> {
      return auctionGetters.getCombinedNextSetUnits.callAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('returns the correct combined next set units', async () => {
      const actualcombinedNextSetUnits = await subject();

      expect(JSON.stringify(actualcombinedNextSetUnits)).to.equal(JSON.stringify(auctionState.combinedNextSetUnits));
    });
  });
});