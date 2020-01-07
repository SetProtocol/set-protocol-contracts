require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  OracleWhiteListContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TwoAssetPriceBoundedLinearAuctionMockContract,
  TransferProxyContract,
  UpdatableOracleMockContract,
  VaultContract,
} from '@utils/contracts';
import { ether, gWei } from '@utils/units';
import { LinearAuction } from '@utils/auction';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { expectRevertError } from '@utils/tokenAssertions';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;
const Core = artifacts.require('Core');
const TwoAssetPriceBoundedLinearAuction = artifacts.require('TwoAssetPriceBoundedLinearAuction');

contract('TwoAssetPriceBoundedLinearAuction', accounts => {
  const [
    deployerAccount,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  let boundsCalculator: TwoAssetPriceBoundedLinearAuctionMockContract;
  let oracleWhiteList: OracleWhiteListContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper);
  const libraryMockHelper = new LibraryMockHelper(deployerAccount);

  let wrappedETH: StandardTokenMockContract;
  let wrappedBTC: StandardTokenMockContract;
  let usdc: StandardTokenMockContract;

  let wrappedETHPrice: BigNumber;
  let wrappedBTCPrice: BigNumber;
  let usdcPrice: BigNumber;

  let wrappedETHOracle: UpdatableOracleMockContract;
  let wrappedBTCOracle: UpdatableOracleMockContract;
  let usdcOracle: UpdatableOracleMockContract;

  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;

  before(async () => {
    ABIDecoder.addABI(Core.abi);
    ABIDecoder.addABI(TwoAssetPriceBoundedLinearAuction.abi);

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);

    wrappedETH = await erc20Helper.deployTokenAsync(deployerAccount, 18);
    wrappedBTC = await erc20Helper.deployTokenAsync(deployerAccount, 8);
    usdc = await erc20Helper.deployTokenAsync(deployerAccount, 6);

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

    auctionPeriod = new BigNumber(14400); // 4 hours
    rangeStart = new BigNumber(3); // 3%
    rangeEnd = new BigNumber(21); // 21%

    boundsCalculator = await liquidatorHelper.deployTwoAssetPriceBoundedLinearAuctionMock(
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
    );
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(TwoAssetPriceBoundedLinearAuction.abi);
  });

  describe('#constructor', async () => {
    it('sets the correct auctionPeriod', async () => {
      const result = await boundsCalculator.auctionPeriod.callAsync();
      expect(result).to.bignumber.equal(auctionPeriod);
    });

    it('sets the correct rangeStart', async () => {
      const result = await boundsCalculator.rangeStart.callAsync();
      expect(result).to.bignumber.equal(rangeStart);
    });

    it('sets the correct rangeEnd', async () => {
      const result = await boundsCalculator.rangeEnd.callAsync();
      expect(result).to.bignumber.equal(rangeEnd);
    });

    it('sets the correct oracleWhiteList', async () => {
      const result = await boundsCalculator.oracleWhiteList.callAsync();
      expect(result).to.equal(oracleWhiteList.address);
    });
  });

  describe('#validateTwoAssetPriceBoundedAuction', async () => {
    let set1: SetTokenContract;
    let set2: SetTokenContract;

    let set1Components: Address[];
    let set2Components: Address[];

    let set1Units: BigNumber[];
    let set2Units: BigNumber[];

    let set1NaturalUnit: BigNumber;
    let set2NaturalUnit: BigNumber;

    let customComponents1: Address[];
    let customComponents2: Address[];

    let customUnits1: BigNumber[];
    let customUnits2: BigNumber[];

    let subjectCurrentSet: Address;
    let subjectNextSet: Address;

    beforeEach(async () => {
      set1Components = customComponents1 || [wrappedETH.address, wrappedBTC.address];
      set1Units = customUnits1 || [gWei(1), gWei(1)];
      set1NaturalUnit = new BigNumber(10 ** 12);
      set1 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set1Components,
        set1Units,
        set1NaturalUnit,
      );

      set2Components = customComponents2 || [wrappedETH.address, wrappedBTC.address];
      set2Units = customUnits2 || [gWei(1), gWei(2)];
      set2NaturalUnit = new BigNumber(10 ** 12);
      set2 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set2Components,
        set2Units,
        set2NaturalUnit,
      );

      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
    });

    async function subject(): Promise<void> {
      return boundsCalculator.validateTwoAssetPriceBoundedAuctionMock.callAsync(
        subjectCurrentSet,
        subjectNextSet
      );
    }

    it('does not revert', async () => {
      await subject();
    });

    describe('when the union is 3 components', async () => {
      before(async () => {
        customComponents2 = [wrappedETH.address, usdc.address];
      });

      after(async () => {
        customComponents2 = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the union is 1 components', async () => {
      before(async () => {
        customComponents1 = [wrappedETH.address];
        customComponents2 = [wrappedETH.address];

        customUnits1 = [gWei(1)];
        customUnits2 = [gWei(2)];
      });

      after(async () => {
        customComponents1 = undefined;
        customComponents2 = undefined;

        customUnits1 = undefined;
        customUnits2 = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a passed token does not have matching oracle', async () => {
      before(async () => {
        const nonOracleComponent = await erc20Helper.deployTokenAsync(deployerAccount, 6);

        customComponents2 = [wrappedETH.address, nonOracleComponent.address];
      });

      after(async () => {
        customComponents2 = undefined;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#calculateStartPrice and calculateEndPrice', async () => {
    let combinedTokenArray: Address[];
    let combinedCurrentSetUnits: BigNumber[];
    let combinedNextSetUnits: BigNumber[];

    let linearAuction: LinearAuction;

    beforeEach(async () => {
      combinedTokenArray = [wrappedETH.address, usdc.address];
      combinedCurrentSetUnits = [new BigNumber(10 ** 12), new BigNumber(128)];
      combinedNextSetUnits = [new BigNumber(10 ** 12), new BigNumber(1152)];

      await boundsCalculator.parameterizeAuction.sendTransactionAsync(
        combinedTokenArray,
        combinedCurrentSetUnits,
        combinedNextSetUnits
      );

      linearAuction = {
        auction: {
          minimumBid: new BigNumber(0),
          startTime: new BigNumber(0),
          startingCurrentSets: new BigNumber(0),
          remainingCurrentSets: new BigNumber(0),
          combinedTokenArray: [wrappedETH.address, usdc.address],
          combinedCurrentSetUnits: [new BigNumber(10 ** 12), new BigNumber(128)],
          combinedNextSetUnits: [new BigNumber(10 ** 12), new BigNumber(1152)],
        },
        endTime: new BigNumber(0),
        startPrice: new BigNumber(0),
        endPrice: new BigNumber(0),
      };
    });

    async function startPriceSubject(): Promise<BigNumber> {
      return boundsCalculator.calculateStartPriceMock.callAsync();
    }

    async function endPriceSubject(): Promise<BigNumber> {
      return boundsCalculator.calculateEndPriceMock.callAsync();
    }

    it('calculates the correct start price value', async () => {
      const result = await startPriceSubject();

      const [expectedResult, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
        linearAuction,
        rangeStart,
        rangeEnd,
        oracleWhiteList,
      );

      expect(result).to.bignumber.equal(expectedResult);
    });

    it('calculates the correct end price value', async () => {
      const result = await endPriceSubject();

      const [, expectedResult] = await liquidatorHelper.calculateAuctionBoundsAsync(
        linearAuction,
        rangeStart,
        rangeEnd,
        oracleWhiteList,
      );

      expect(result).to.bignumber.equal(expectedResult);
    });
  });

  describe('#calculateAuctionBounds', async () => {
    let linearAuction: LinearAuction;

    let combinedTokenArray: Address[];
    let combinedCurrentSetUnits: BigNumber[];
    let combinedNextSetUnits: BigNumber[];

    before(async () => {
      combinedTokenArray = [wrappedETH.address, usdc.address];
      combinedCurrentSetUnits = [new BigNumber(10 ** 12), new BigNumber(128)];
      combinedNextSetUnits = [new BigNumber(10 ** 12), new BigNumber(1152)];
    });

    beforeEach(async () => {
      await boundsCalculator.parameterizeAuction.sendTransactionAsync(
        combinedTokenArray,
        combinedCurrentSetUnits,
        combinedNextSetUnits
      );

      linearAuction = {
        auction: {
          minimumBid: new BigNumber(0),
          startTime: new BigNumber(0),
          startingCurrentSets: new BigNumber(0),
          remainingCurrentSets: new BigNumber(0),
          combinedTokenArray,
          combinedCurrentSetUnits,
          combinedNextSetUnits,
        },
        endTime: new BigNumber(0),
        startPrice: new BigNumber(0),
        endPrice: new BigNumber(0),
      };
    });

    async function subject(): Promise<BigNumber> {
      return boundsCalculator.calculateStartPriceMock.callAsync();
    }

    it('gets the correct start bound', async () => {
      const actualStartBound = await subject();

      const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
        linearAuction,
        rangeStart,
        rangeEnd,
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

      it('gets the correct start bound', async () => {
        const actualStartBound = await subject();

        const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          linearAuction,
          rangeStart,
          rangeEnd,
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

      it('gets the correct start bound', async () => {
        const actualStartBound = await subject();

        const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          linearAuction,
          rangeStart,
          rangeEnd,
          oracleWhiteList
        );

        expect(actualStartBound).to.bignumber.equal(expectedStartBound);
      });
    });

    describe('when other asset is highest allocation and assets are flipped', async () => {
      before(async () => {
        combinedTokenArray = [usdc.address, wrappedETH.address];
        combinedCurrentSetUnits = [new BigNumber(128), new BigNumber(10 ** 12)];
        combinedNextSetUnits = [new BigNumber(128), new BigNumber(9 * 10 ** 12)];
      });

      it('gets the correct start bound', async () => {
        const actualStartBound = await subject();

        const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          linearAuction,
          rangeStart,
          rangeEnd,
          oracleWhiteList
        );

        expect(actualStartBound).to.bignumber.equal(expectedStartBound);
      });
    });

    describe('different allocation', async () => {
      before(async () => {
        combinedTokenArray = [wrappedETH.address, usdc.address];
        combinedCurrentSetUnits = [new BigNumber(10 ** 14), new BigNumber(12800)];
        combinedNextSetUnits = [new BigNumber(10 ** 14), new BigNumber(1267200)];
      });

      it('gets the correct start bound', async () => {
        const actualStartBound = await subject();

        const [expectedStartBound, ] = await liquidatorHelper.calculateAuctionBoundsAsync(
          linearAuction,
          rangeStart,
          rangeEnd,
          oracleWhiteList
        );

        expect(actualStartBound).to.bignumber.equal(expectedStartBound);
      });
    });
  });
});