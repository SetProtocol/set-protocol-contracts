require('module-alias/register');

import * as chai from 'chai';
import { Bytes } from 'set-protocol-utils';

import { EIP712LibraryMockContract } from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import ChaiSetup from '@utils/chaiSetup';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('EIP712Library', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let eip712Lib: EIP712LibraryMockContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    eip712Lib = await coreWrapper.deployMockEIP712LibAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#getEIP712DomainHash', async () => {
    async function subject(): Promise<string> {
      return eip712Lib.testGetEIP712DomainHash.callAsync();
    }

    it('should return the correct hash', async () => {
      const returnedHash = await subject();

      const expectedEIP712Hash: Bytes = '0xa8dcc602486c63f3c678c9b3c5d615c4d6ab4b7d51868af6881272b5d8bb31ff';
      expect(returnedHash).to.equal(expectedEIP712Hash);
    });
  });

  describe('#hashEIP712Message', async () => {
    const subjectHashStruct: Bytes = '0x0000000000000000000000000000000000000000000000000000000000000000';

    async function subject(): Promise<string> {
      return eip712Lib.testHashEIP712Message.callAsync(
        subjectHashStruct,
      );
    }

    it('should return the correct hash', async () => {
      const returnedHash = await subject();

      const expectedHash = '0x5686079a65f95107943e531f6f7f755044148600233246c75fdce6e59c85cae5';
      expect(returnedHash).to.equal(expectedHash);
    });
  });
});
