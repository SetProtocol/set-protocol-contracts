import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import { LinearAuctionLibraryContract } from '../../../../utils/contracts';
import { CoreWrapper } from '../../../../utils/coreWrapper';
import { Blockchain } from '../../../../utils/blockchain';

import { BigNumberSetup } from '../../../../utils/bigNumberSetup';
import ChaiSetup from '../../../../utils/chaiSetup';
import { DEFAULT_GAS } from '../../../../utils/constants';

BigNumberSetup.configure();
ChaiSetup.configure();
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;


contract('LinearAuctionLibrary', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let auctionLib: LinearAuctionLibraryContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const blockchain = new Blockchain(web3);

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();
    auctionLib = await coreWrapper.deployLinearAuctionLibraryAsync();
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe.only('#getCurrentPrice', async () => {
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
      return auctionLib.getCurrentPrice.callAsync(
        subjectAuctionStartTime,
        subjectAuctionStartPrice,
        subjectCurveCoefficient,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('returns the correct price after one hour', async () => {
      // Constant found on contract; amount of seconds before price changes
      const timeIncrement = new BigNumber(30);

      const timeJump = new BigNumber(3600);
      blockchain.increaseTimeAsync(timeJump);

      const returnedPrice = await subject();

      const expectedPrice = subjectCurveCoefficient.mul(timeJump.div(timeIncrement)).add(subjectAuctionStartPrice);
      expect(returnedPrice).to.be.bignumber.equal(expectedPrice);
    });
  });
});