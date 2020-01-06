require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  StandardTokenMockContract,
  OracleWhiteListContract,
  TwoAssetAuctionBoundsCalculatorMockContract,
  UpdatableOracleMockContract,
} from '@utils/contracts';
import { ether } from '@utils/units';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

contract('TwoAssetAuctionBoundsCalculator', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let boundsCalculator: TwoAssetAuctionBoundsCalculatorMockContract;
  let oracleWhiteList: OracleWhiteListContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper);
  const libraryMockHelper = new LibraryMockHelper(ownerAccount);

  let wrappedETH: StandardTokenMockContract;
  let wrappedBTC: StandardTokenMockContract;
  let usdc: StandardTokenMockContract;

  let wrappedETHPrice: BigNumber;
  let wrappedBTCPrice: BigNumber;
  let usdcPrice: BigNumber;

  let wrappedETHOracle: UpdatableOracleMockContract;
  let wrappedBTCOracle: UpdatableOracleMockContract;
  let usdcOracle: UpdatableOracleMockContract;

  before(async () => {
    wrappedETH = await erc20Helper.deployTokenAsync(ownerAccount, 18);
    wrappedBTC = await erc20Helper.deployTokenAsync(ownerAccount, 8);
    usdc = await erc20Helper.deployTokenAsync(ownerAccount, 6);

    wrappedETHPrice = ether(128);
    wrappedBTCPrice = ether(7500);
    usdcPrice = ether(1);

    wrappedETHOracle = await libraryMockHelper.deployUpdatableOracleMockAsync(wrappedETHPrice);
    wrappedBTCOracle = await libraryMockHelper.deployUpdatableOracleMockAsync(wrappedBTCPrice);
    usdcOracle = await libraryMockHelper.deployUpdatableOracleMockAsync(usdcPrice);

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [wrappedETH.address, wrappedBTC.address, usdc.address],
      [wrappedETHOracle.address, wrappedBTCOracle.address, usdcOracle.address],
    );

    boundsCalculator = await liquidatorHelper.deployTwoAssetAuctionBoundsCalculatorMock(
      oracleWhiteList.address
    );
  });

  describe.only('#calculateStartNumerator', async () => {
    let subjectFairValue: BigNumber;
    let subjectRangeStart: BigNumber;

    let combinedTokenArray: Address[];
    let combinedCurrentSetUnits: BigNumber[];
    let combinedNextSetUnits: BigNumber[];

    before(async () => {
      combinedTokenArray = [wrappedETH.address, usdc.address];
      combinedCurrentSetUnits = [new BigNumber(10 ** 12), new BigNumber(128)];
      combinedNextSetUnits = [new BigNumber(10 ** 12), new BigNumber(1152)];
    });

    beforeEach(async () => {
      combinedTokenArray = [wrappedETH.address, usdc.address];
      combinedCurrentSetUnits = [new BigNumber(10 ** 12), new BigNumber(128)];
      combinedNextSetUnits = [new BigNumber(10 ** 12), new BigNumber(1152)];

      await boundsCalculator.parameterizeAuction.sendTransactionAsync(
        combinedTokenArray,
        combinedCurrentSetUnits,
        combinedNextSetUnits
      );

      subjectFairValue = ether(5);
      subjectRangeStart = new BigNumber(3);
    });

    async function subject(): Promise<BigNumber> {
      return boundsCalculator.calculateAuctionBoundDifferenceMock.callAsync(
        subjectFairValue,
        subjectRangeStart
      );
    }

    it('sets the correct oracleWhiteList', async () => {
      const actualStartBound = await subject();

      const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
        combinedTokenArray,
        combinedCurrentSetUnits,
        combinedNextSetUnits,
        subjectFairValue,
        subjectRangeStart,
        new BigNumber(21),
        oracleWhiteList
      );

      expect(actualStartBound).to.bignumber.equal(expectedStartBound);
    });

    describe('when asset order is flipped', async () => {
      before(async () => {
        combinedTokenArray = [usdc.address, wrappedETH.address];
        combinedCurrentSetUnits = [new BigNumber(128), new BigNumber(10 ** 12)];
        combinedNextSetUnits = [new BigNumber(1152), new BigNumber(10 ** 12)];
      });

      it('sets the correct oracleWhiteList', async () => {
        const actualStartBound = await subject();

        const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          combinedTokenArray,
          combinedCurrentSetUnits,
          combinedNextSetUnits,
          subjectFairValue,
          subjectRangeStart,
          new BigNumber(21),
          oracleWhiteList
        );

        expect(actualStartBound).to.bignumber.equal(expectedStartBound);
      });
    });

    describe('when other asset is higher allocation', async () => {
      before(async () => {
        combinedTokenArray = [wrappedETH.address, usdc.address];
        combinedCurrentSetUnits = [new BigNumber(10 ** 12), new BigNumber(128)];
        combinedNextSetUnits = [new BigNumber(9 * 10 ** 12), new BigNumber(128)];
      });

      it('sets the correct oracleWhiteList', async () => {
        const actualStartBound = await subject();

        const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          combinedTokenArray,
          combinedCurrentSetUnits,
          combinedNextSetUnits,
          subjectFairValue,
          subjectRangeStart,
          new BigNumber(21),
          oracleWhiteList
        );

        expect(actualStartBound).to.bignumber.equal(expectedStartBound);
      });
    });

    describe('when other asset is highest allocation and assets are flipped', async () => {
      before(async () => {
        combinedTokenArray = [usdc.address, wrappedETH.address];
        combinedCurrentSetUnits = [new BigNumber(128), new BigNumber(10 ** 12)];
        combinedNextSetUnits = [new BigNumber(1152), new BigNumber(9 * 10 ** 12)];
      });

      it('sets the correct oracleWhiteList', async () => {
        const actualStartBound = await subject();

        const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          combinedTokenArray,
          combinedCurrentSetUnits,
          combinedNextSetUnits,
          subjectFairValue,
          subjectRangeStart,
          new BigNumber(21),
          oracleWhiteList
        );

        expect(actualStartBound).to.bignumber.equal(expectedStartBound);
      });
    });

    describe('different allocation', async () => {
      before(async () => {
        combinedTokenArray = [wrappedETH.address, usdc.address];
        combinedCurrentSetUnits = [new BigNumber(10 ** 12), new BigNumber(128)];
        combinedNextSetUnits = [new BigNumber(10 ** 12), new BigNumber(192)];
      });

      it('sets the correct oracleWhiteList', async () => {
        const actualStartBound = await subject();

        const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          combinedTokenArray,
          combinedCurrentSetUnits,
          combinedNextSetUnits,
          subjectFairValue,
          subjectRangeStart,
          new BigNumber(21),
          oracleWhiteList
        );

        expect(actualStartBound).to.bignumber.equal(expectedStartBound);
      });
    });
  });
});