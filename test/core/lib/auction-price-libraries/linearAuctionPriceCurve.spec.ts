require('module-alias/register');

import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { LinearAuctionPriceCurveContract } from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ERC20Wrapper } from '@utils/erc20Wrapper';
import { CoreWrapper } from '@utils/coreWrapper';
import { RebalancingTokenWrapper } from '@utils/RebalancingTokenWrapper';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import ChaiSetup from '@utils/chaiSetup';
import { DEFAULT_GAS } from '@utils/constants';

BigNumberSetup.configure();
ChaiSetup.configure();
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;


contract('LinearAuctionLibrary', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let auctionCurve: LinearAuctionPriceCurveContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const blockchain = new Blockchain(web3);
  const rebalancingTokenWrapper = new RebalancingTokenWrapper(
    ownerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
    auctionCurve = await coreWrapper.deployLinearAuctionPriceCurveAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#getCurrentPrice', async () => {
    let subjectAuctionStartTime: BigNumber;
    let subjectAuctionStartPrice: BigNumber;
    let subjectCurveCoefficient: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectAuctionStartPrice = new BigNumber(500);
      subjectCurveCoefficient = new BigNumber (5);
      subjectAuctionStartTime = SetUtils.generateTimestamp(0);
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<BigNumber> {
      return auctionCurve.getCurrentPrice.callAsync(
        subjectAuctionStartTime,
        subjectAuctionStartPrice,
        subjectCurveCoefficient,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('starts with the correct price', async () => {
      const returnedPrice = await subject();

      expect(returnedPrice).to.be.bignumber.equal(subjectAuctionStartPrice);
    });

    it('returns the correct price after one hour', async () => {
      const timeJump = new BigNumber(3600);
      await blockchain.increaseTimeAsync(timeJump);

      const returnedPrice = await subject();

      const expectedPrice = rebalancingTokenWrapper.getExpectedLinearAuctionPrice(
        timeJump,
        subjectCurveCoefficient,
        subjectAuctionStartPrice
      );
      expect(returnedPrice).to.be.bignumber.equal(expectedPrice);
    });
  });
});