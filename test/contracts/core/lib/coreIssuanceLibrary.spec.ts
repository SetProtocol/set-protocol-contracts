require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreIssuanceLibraryMockContract
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { LibraryMockWrapper } from '@utils/wrappers/libraryMockWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const Core = artifacts.require('Core');
const blockchain = new Blockchain(web3);


contract('CoreIssuanceLibraryMock', accounts => {
  const [
    contractDeployer,
  ] = accounts;

  let coreIssuanceLibraryMock: CoreIssuanceLibraryMockContract;

  const libraryMockWrapper = new LibraryMockWrapper(contractDeployer);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    coreIssuanceLibraryMock = await libraryMockWrapper.deployCoreIssuanceLibraryAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#testCalculateRequiredComponentQuantities', async () => {
    let subjectComponentUnits: BigNumber[];
    let subjectNaturalUnit: BigNumber;
    let subjectQuantity: BigNumber;

    beforeEach(async () => {
      subjectComponentUnits = [new BigNumber(1), new BigNumber(5)];
      subjectNaturalUnit = new BigNumber(2);
      subjectQuantity = new BigNumber(4);
    });

    async function subject(): Promise<any> {
      return coreIssuanceLibraryMock.testCalculateRequiredComponentQuantities.callAsync(
        subjectComponentUnits,
        subjectNaturalUnit,
        subjectQuantity
      );
    }

    it('should return the correct transfer values', async () => {
      const result = await subject();

      const expectedResult = _.map(
        subjectComponentUnits, unit => subjectQuantity.div(subjectNaturalUnit).mul(unit)
      );

      expect(JSON.stringify(result)).to.equal(JSON.stringify(expectedResult));
    });

    describe('when the quantity is not a multiple of the natural unit', async () => {
      beforeEach(async () => {
        subjectQuantity = new BigNumber(5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
