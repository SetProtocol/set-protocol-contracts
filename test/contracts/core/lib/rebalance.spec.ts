require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { RebalanceMockContract, RebalanceStateSetTokenMockContract } from '@utils/contracts';
import { ether } from '@utils/units';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;


contract('Rebalance', accounts => {
  const [contractDeployer, tokenArrayAddress] = accounts;

  const libraryMockHelper = new LibraryMockHelper(contractDeployer);
  let rebalanceMock: RebalanceMockContract;

  beforeEach(async () => {
    rebalanceMock = await libraryMockHelper.deployRebalanceMockAsync();
  });

  describe('#getTokenFlows', async () => {
    let subjectRebalancingSetToken: RebalanceStateSetTokenMockContract;
    let subjectCombinedTokenArray: Address[];
    let subjectInflowArray: BigNumber[];
    let subjectOutflowArray: BigNumber[];
    let subjectQuantity: BigNumber;

    beforeEach(async () => {
      subjectCombinedTokenArray = [contractDeployer, tokenArrayAddress];
      subjectInflowArray = [ether(10), ether(0)];
      subjectOutflowArray = [ether(0), ether(9)];

      subjectRebalancingSetToken = await libraryMockHelper.deployRebalanceStateSetTokenMockAsync(
        subjectCombinedTokenArray,
        subjectInflowArray,
        subjectOutflowArray
      );
    });

    async function subject(): Promise<any> {
      subjectQuantity = new BigNumber(10);

      return rebalanceMock.getTokenFlows.callAsync(
        subjectRebalancingSetToken.address,
        subjectQuantity
      );
    }

    it('should calculate the correct value', async () => {
      const result = await subject();
      const expectedResult = {
        '0': subjectCombinedTokenArray,
        '1': subjectInflowArray,
        '2': subjectOutflowArray,
      };
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expectedResult));
    });
  });
});
