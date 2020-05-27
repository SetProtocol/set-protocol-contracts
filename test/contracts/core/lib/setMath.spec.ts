require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { SetMathMockContract } from '@utils/contracts';
import { ether } from '@utils/units';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;


contract('SetMath', accounts => {
  const [contractDeployer] = accounts;

  const libraryMockHelper = new LibraryMockHelper(contractDeployer);
  let setMathMock: SetMathMockContract;

  beforeEach(async () => {
    setMathMock = await libraryMockHelper.deploySetMathAsync();
  });

  describe('#setToComponent', async () => {
    let subjectSetQuantity: BigNumber;
    let subjectUnit: BigNumber;
    let subjectNaturalUnit: BigNumber;

    beforeEach(async () => {
      subjectSetQuantity = ether(10);
      subjectUnit = ether(1);
      subjectNaturalUnit = ether(0.5);
    });

    async function subject(): Promise<BigNumber> {
      return setMathMock.setToComponent.callAsync(
        subjectSetQuantity,
        subjectUnit,
        subjectNaturalUnit
      );
    }

    it('should calculate the correct value', async () => {
      const result = await subject();
      const expectedResult = subjectSetQuantity.mul(subjectUnit).div(subjectNaturalUnit);
      expect(result).to.bignumber.equal(expectedResult);
    });
  });

  describe('#componentToSet', async () => {
    let subjectComponentQuantity: BigNumber;
    let subjectUnit: BigNumber;
    let subjectNaturalUnit: BigNumber;

    beforeEach(async () => {
      subjectComponentQuantity = ether(1);
      subjectUnit = ether(1);
      subjectNaturalUnit = ether(5);
    });

    async function subject(): Promise<BigNumber> {
      return setMathMock.componentToSet.callAsync(
        subjectComponentQuantity,
        subjectUnit,
        subjectNaturalUnit
      );
    }

    it('should calculate the correct value', async () => {
      const result = await subject();
      const expectedResult = subjectComponentQuantity.mul(subjectNaturalUnit).div(subjectUnit);
      expect(result).to.bignumber.equal(expectedResult);
    });
  });
});
