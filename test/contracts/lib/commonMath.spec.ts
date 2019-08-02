require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import { ether } from '@utils/units';
import { expectRevertError } from '@utils/tokenAssertions';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CommonMathMockContract } from '@utils/contracts';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;


contract('CommonMathMock', accounts => {
  const [ownerAccount] = accounts;
  const libraryMockHelper = new LibraryMockHelper(ownerAccount);

  let commonMathLibrary: CommonMathMockContract;

  beforeEach(async () => {
    commonMathLibrary = await libraryMockHelper.deployCommonMathLibraryAsync();
  });

  describe('#testMaxUInt256', async () => {
    const caller: Address = ownerAccount;

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

  describe('#testSafePower', async () => {
    let subjectBase: BigNumber;
    let subjectPower: BigNumber;
    const caller: Address = ownerAccount;

    beforeEach(async () => {
      subjectBase = new BigNumber(2);
      subjectPower = new BigNumber(5);
    });

    async function subject(): Promise<BigNumber> {
      return commonMathLibrary.testSafePower.callAsync(
        subjectBase,
        subjectPower,
        { from: caller },
      );
    }

    it('returns the correct value', async () => {
      const result = await subject();

      const expectedResult =
        new BigNumber(subjectBase).pow(subjectPower.toNumber());
      expect(result).to.be.bignumber.equal(expectedResult);
    });

    describe('when the the base is 1', async () => {
      beforeEach(async () => {
        subjectBase = new BigNumber(1);
        subjectPower = new BigNumber(5);
      });

      it('returns the correct value', async () => {
        const result = await subject();

        const expectedResult =
          new BigNumber(subjectBase).pow(subjectPower.toNumber());
        expect(result).to.be.bignumber.equal(expectedResult);
      });
    });

    describe('when the values overflow', async () => {
      beforeEach(async () => {
        subjectBase = new BigNumber(10000);
        subjectPower = new BigNumber(10).pow(99);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the the base is 0', async () => {
      beforeEach(async () => {
        subjectBase = new BigNumber(0);
        subjectPower = new BigNumber(5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
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
