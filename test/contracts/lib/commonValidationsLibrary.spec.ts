require('module-alias/register');

import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CommonValidationsLibraryMockContract } from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';

BigNumberSetup.configure();
ChaiSetup.configure();

contract('CommonValidationsLibrary', accounts => {
  const [
    ownerAccount,
    otherAccount,
  ] = accounts;
  const libraryMockHelper = new LibraryMockHelper(ownerAccount);

  let commonValidationsMockLibrary: CommonValidationsLibraryMockContract;

  beforeEach(async () => {
    commonValidationsMockLibrary = await libraryMockHelper.deployCommonValidationsLibraryAsync();
  });

  describe('#testValidateNonEmpty', async () => {
    let subjectArray: Address[];

    beforeEach(async () => {
      subjectArray = [otherAccount];
    });

    async function subject(): Promise<void> {
      return commonValidationsMockLibrary.testValidateNonEmpty.callAsync(
        subjectArray,
        { from: ownerAccount }
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when the input array is empty', async () => {
      beforeEach(async () => {
        subjectArray = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#testValidateEqualLength', async () => {
    let subjectAddressArray: Address[];
    let subjectBigNumberArray: BigNumber[];

    beforeEach(async () => {
      subjectAddressArray = [otherAccount];
      subjectBigNumberArray = [new BigNumber(1)];
    });

    async function subject(): Promise<void> {
      return commonValidationsMockLibrary.testValidateEqualLength.callAsync(
        subjectAddressArray,
        subjectBigNumberArray,
        { from: ownerAccount }
      );
    }

    it('should not revert', async () => {
      await subject();
    });

    describe('when the address array length is mismatched with the bignumber array', async () => {
      beforeEach(async () => {
        subjectAddressArray = [otherAccount, ownerAccount];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
