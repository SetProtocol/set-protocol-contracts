require('module-alias/register');

import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { ArrayValidationsMockContract } from '@utils/contracts';
import { getWeb3 } from '@utils/web3Helper';
import { expectRevertError } from '@utils/tokenAssertions';

import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();

contract('ArrayValidation', accounts => {
  const [
    ownerAccount,
    otherAccount,
  ] = accounts;
  const libraryMockWrapper = new LibraryMockWrapper(ownerAccount);

  let arrayValidationsMockLibrary: ArrayValidationsMockContract;

  beforeEach(async () => {
    arrayValidationsMockLibrary = await libraryMockWrapper.deployArrayValidationsLibraryAsync();
  });

  describe('#testValidateNonEmpty', async () => {
    let subjectArray: Address[];

    beforeEach(async () => {
      subjectArray = [otherAccount];
    });

    async function subject(): Promise<void> {
      return arrayValidationsMockLibrary.testValidateNonEmpty.callAsync(
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
      return arrayValidationsMockLibrary.testValidateEqualLength.callAsync(
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
