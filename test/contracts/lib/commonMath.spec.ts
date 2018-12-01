require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CommonMathMockContract } from '@utils/contracts';

import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;


contract('CommonMathMock', accounts => {
  const [ownerAccount] = accounts;
  const libraryMockWrapper = new LibraryMockWrapper(ownerAccount);

  let commonMathLibrary: CommonMathMockContract;

  describe('#testMaxUInt256', async () => {
    const caller: Address = ownerAccount;

    beforeEach(async () => {
      commonMathLibrary = await libraryMockWrapper.deployCommonMathLibraryAsync();
    });

    async function subject(): Promise<BigNumber> {
      return commonMathLibrary.testMaxUInt256.callAsync(
        { from: caller },
      );
    }

    it('returns the max allowed integer', async () => {
      const maxUInt256 = await subject();

      const expectedMaxUInt256 =
        new BigNumber('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77');
      expect(maxUInt256).to.be.bignumber.equal(expectedMaxUInt256);
    });
  });
});
