require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  LinearAuctionPriceCurveContract,
  RebalancingLibraryMockContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import { getWeb3 } from '@utils/web3Helper';

import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const Core = artifacts.require('Core');
const blockchain = new Blockchain(web3);


contract('RebalancingLibraryMock', accounts => {
  const [
    contractDeployer,
  ] = accounts;

  const coreHelper = new CoreHelper(contractDeployer, contractDeployer);
  const erc20Helper = new ERC20Helper(contractDeployer);

  let linearAuctionPriceCurve: LinearAuctionPriceCurveContract;
  let rebalancingLibraryMock: RebalancingLibraryMockContract;

  const rebalancingHelper = new RebalancingHelper(contractDeployer, coreHelper, erc20Helper, blockchain);
  const libraryMockHelper = new LibraryMockHelper(contractDeployer);

  let auctionCurvePriceDivisor: BigNumber;


  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    auctionCurvePriceDivisor = new BigNumber(1000);

    linearAuctionPriceCurve = await rebalancingHelper.deployLinearAuctionPriceCurveAsync(
      auctionCurvePriceDivisor,
      false,
    );

    rebalancingLibraryMock = await libraryMockHelper.deployRebalancingLibraryMockAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#testComputeTransferValue', async () => {
    let subjectUnit: BigNumber;
    let subjectNaturalUnit: BigNumber;
    let subjectMinimumBid: BigNumber;
    let subjectAuctionLibrary: Address;

    beforeEach(async () => {
      subjectUnit = ether(2);
      subjectNaturalUnit = ether(1);
      subjectMinimumBid = ether(3);
      subjectAuctionLibrary = linearAuctionPriceCurve.address;
    });

    async function subject(): Promise<BigNumber> {
      return rebalancingLibraryMock.testComputeTransferValue.callAsync(
        subjectUnit,
        subjectNaturalUnit,
        subjectMinimumBid,
        subjectAuctionLibrary,
      );
    }

    it('should return the correct transfer value', async () => {
      const result = await subject();

      const expectedResult = subjectMinimumBid
                              .mul(subjectUnit)
                              .div(subjectNaturalUnit)
                              .div(auctionCurvePriceDivisor);

      expect(expectedResult).to.bignumber.equal(result);
    });
  });
});
