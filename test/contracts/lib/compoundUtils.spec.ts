require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import { ether } from '@utils/units';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CompoundUtilsMockContract } from '@utils/contracts';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;


contract('CompoundUtilsMock', accounts => {
  const [ownerAccount] = accounts;
  const libraryMockHelper = new LibraryMockHelper(ownerAccount);

  let compoundUtilsLibrary: CompoundUtilsMockContract;

  beforeEach(async () => {
    compoundUtilsLibrary = await libraryMockHelper.deployCompoundUtilsLibraryMockAsync();
  });

  describe('#testCalculateUnderlyingUnits', async () => {
    const caller: Address = ownerAccount;
    let subjectCTokenUnits: BigNumber;
    let subjectExchangeRate: BigNumber;

    beforeEach(async () => {
      subjectCTokenUnits = new BigNumber(1);
      subjectExchangeRate = ether(1).add(1);
    });

    async function subject(): Promise<BigNumber> {
      return compoundUtilsLibrary.testConvertCTokenToUnderlying.callAsync(
        subjectCTokenUnits,
        subjectExchangeRate,
        { from: caller },
      );
    }

    it('returns the correct value', async () => {
      const actualUnderlyingUnits = await subject();

      const expectedUnderlyingUnits = new BigNumber(2);
      expect(actualUnderlyingUnits).to.be.bignumber.equal(expectedUnderlyingUnits);
    });

    describe('when there is no rounding', async () => {
      beforeEach(async () => {
        subjectCTokenUnits = new BigNumber(6);
        subjectExchangeRate = ether(1);
      });

      it('returns the correct value', async () => {
        const actualUnderlyingUnits = await subject();

        const expectedUnderlyingUnits = new BigNumber(6);
        expect(actualUnderlyingUnits).to.be.bignumber.equal(expectedUnderlyingUnits);
      });
    });
  });
});
