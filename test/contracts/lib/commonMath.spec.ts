require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import { ether } from '@utils/units';
import { expectRevertError } from '@utils/tokenAssertions';

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

  describe('getPartialAmount', async () => {
    let subjectPrincipal: BigNumber;
    let subjectNumerator: BigNumber;
    let subjectDenominator: BigNumber;

    beforeEach(async () => {
      subjectPrincipal = new BigNumber(1000);
      subjectNumerator = new BigNumber(400);
      subjectDenominator = new BigNumber(500);
    });

    async function subject(): Promise<BigNumber> {
      return commonMathLibrary.testGetPartialAmount.callAsync(
        subjectPrincipal,
        subjectNumerator,
        subjectDenominator,
      );
    }

    it('calculates the partial amount correctly', async () => {
      const partialAmount = await subject();

      const expectedPartialAmount = subjectPrincipal.mul(subjectNumerator).div(subjectDenominator);
      expect(partialAmount).to.be.bignumber.equal(expectedPartialAmount);
    });

    describe('when there is slippage due to rounding', async () => {
      beforeEach(async () => {
        subjectPrincipal = ether(10);
        subjectNumerator = ether(4);
        subjectDenominator = ether(6);
      });

      it('should revert', async () => {
        const partialAmount = await subject();

        const expectedAmount = new BigNumber('6666666666666666666');
        expect(partialAmount).to.be.bignumber.equal(expectedAmount);
      });

      describe('when the rounding error is too large', async () => {
        beforeEach(async () => {
          subjectPrincipal = new BigNumber(10);
          subjectNumerator = new BigNumber(4);
          subjectDenominator = new BigNumber(6);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });

});
