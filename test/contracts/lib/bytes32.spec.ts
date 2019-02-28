require('module-alias/register');

import * as chai from 'chai';
import { Bytes } from 'set-protocol-utils';
import * as setProtocolUtils from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { Bytes32MockContract } from '@utils/contracts';
import { getWeb3 } from '@utils/web3Helper';

import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const { SetProtocolUtils: SetUtils } = setProtocolUtils;


contract('Bytes32Mock', accounts => {
  const [ownerAccount] = accounts;
  const libraryMockWrapper = new LibraryMockWrapper(ownerAccount);

  let bytes32Library: Bytes32MockContract;

  describe('#testBytes32ToBytes', async () => {
    let subjectString: string;
    let subjectData: Bytes;

    beforeEach(async () => {
      bytes32Library = await libraryMockWrapper.deployBytes32LibraryAsync();
    });

    async function subject(data: Bytes): Promise<string> {
      return bytes32Library.testBytes32ToBytes.callAsync(
        subjectData,
      );
    }

    describe('when the string input is a 32 byte word', async () => {
      beforeEach(async () => {
        subjectString = 'ethereum';
        subjectData = SetUtils.stringToBytes(subjectString);
      });

      it('returns the same bytestring', async () => {
        const returnData = await subject(subjectData);

        const unpaddedBytes = web3.utils.fromAscii('ethereum');

        expect(returnData).to.equal(unpaddedBytes);
      });
    });
  });

  describe('#testBytes32ToString', async () => {
    let subjectString: string;
    let subjectData: Bytes;

    beforeEach(async () => {
      bytes32Library = await libraryMockWrapper.deployBytes32LibraryAsync();
    });

    async function subject(data: Bytes): Promise<string> {
      return bytes32Library.testBytes32ToString.callAsync(
        subjectData,
      );
    }

    describe('when the string input is a 32 byte padded standard word', async () => {
      beforeEach(async () => {
        subjectString = 'ethereum';
        subjectData = SetUtils.stringToBytes(subjectString);
      });

      it('returns the correct Ascii word', async () => {
        const returnData = await subject(subjectData);

        expect(returnData).to.equal(subjectString);
      });
    });

    describe('when the string input is an empty string', async () => {
      beforeEach(async () => {
        subjectString = '';
        subjectData = SetUtils.stringToBytes(subjectString);
      });

      it('returns the correct Ascii word', async () => {
        const returnData = await subject(subjectData);

        expect(returnData).to.equal(subjectString);
      });
    });

    describe('when the string input is all cap', async () => {
      beforeEach(async () => {
        subjectString = 'ETHEREUM00000';
        subjectData = SetUtils.stringToBytes(subjectString);
      });

      it('returns the correct Ascii word', async () => {
        const returnData = await subject(subjectData);

        expect(returnData).to.equal(subjectString);
      });
    });
  });
});
