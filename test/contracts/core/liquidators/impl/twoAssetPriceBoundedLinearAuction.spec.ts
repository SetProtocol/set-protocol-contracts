require('module-alias/register');

import * as _ from 'lodash';
import * as chai from 'chai';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  UpdatableOracleMockContract
} from 'set-protocol-oracles';
import {
  CoreMockContract,
  OracleWhiteListContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TwoAssetPriceBoundedLinearAuctionMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { ether, gWei } from '@utils/units';
import { LinearAuction } from '@utils/auction';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { expectRevertError } from '@utils/tokenAssertions';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

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
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper, valuationHelper);

  let wrappedETH: StandardTokenMockContract;
  let wrappedBTC: StandardTokenMockContract;
  let usdc: StandardTokenMockContract;
  let dai: StandardTokenMockContract;

  let wrappedETHPrice: BigNumber;
  let wrappedBTCPrice: BigNumber;
  let usdcPrice: BigNumber;
  let daiPrice: BigNumber;

  let wrappedETHOracle: UpdatableOracleMockContract;
  let wrappedBTCOracle: UpdatableOracleMockContract;
  let usdcOracle: UpdatableOracleMockContract;
  let daiOracle: UpdatableOracleMockContract;

  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(TwoAssetPriceBoundedLinearAuctionMockContract.getAbi());

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);

    wrappedETH = await erc20Helper.deployTokenAsync(deployerAccount, 18);
    wrappedBTC = await erc20Helper.deployTokenAsync(deployerAccount, 8);
    usdc = await erc20Helper.deployTokenAsync(deployerAccount, 6);
    dai = await erc20Helper.deployTokenAsync(deployerAccount, 18);

    wrappedETHPrice = ether(128);
    wrappedBTCPrice = ether(7500);
    usdcPrice = ether(1);
    daiPrice = ether(1);

    wrappedETHOracle = await oracleHelper.deployUpdatableOracleMockAsync(wrappedETHPrice);
    wrappedBTCOracle = await oracleHelper.deployUpdatableOracleMockAsync(wrappedBTCPrice);
    usdcOracle = await oracleHelper.deployUpdatableOracleMockAsync(usdcPrice);
    daiOracle = await oracleHelper.deployUpdatableOracleMockAsync(daiPrice);

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [wrappedETH.address, wrappedBTC.address, usdc.address, dai.address],
      [wrappedETHOracle.address, wrappedBTCOracle.address, usdcOracle.address, daiOracle.address],
    );

    auctionPeriod = new BigNumber(14400); // 4 hours
    rangeStart = ether(.03); // 3%
    rangeEnd = ether(.21); // 21%

    boundsCalculator = await liquidatorHelper.deployTwoAssetPriceBoundedLinearAuctionMock(
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
    );
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(TwoAssetPriceBoundedLinearAuctionMockContract.getAbi());
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

  describe('#calculateMinimumBid', async () => {
    let set1: SetTokenContract;
    let set2: SetTokenContract;

    let set1Components: Address[];
    let set2Components: Address[];

    let set1Units: BigNumber[];
    let set2Units: BigNumber[];

    let set1NaturalUnit: BigNumber;
    let set2NaturalUnit: BigNumber;
    let combinedTokenArray: Address[];
    let combinedCurrentSetUnits: BigNumber[];
    let combinedNextSetUnits: BigNumber[];

    let linearAuction: LinearAuction;

    let subjectCurrentSet: Address;
    let subjectNextSet: Address;

    before(async () => {
      set1Components = [wrappedBTC.address, usdc.address];
      set1Units = [new BigNumber(100), new BigNumber(7500)];
      set1NaturalUnit = new BigNumber(10 ** 12);

      set2Components = [wrappedBTC.address, usdc.address];
      set2Units = [new BigNumber(100), new BigNumber(7806)];
      set2NaturalUnit = new BigNumber(10 ** 12);
    });

    beforeEach(async () => {
      set1 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set1Components,
        set1Units,
        set1NaturalUnit,
      );

      set2 = await coreHelper.createSetTokenAsync(
        coreMock,
        setTokenFactory.address,
        set2Components,
        set2Units,
        set2NaturalUnit,
      );

      combinedTokenArray = set1Components;
      combinedCurrentSetUnits = set1Units;
      combinedNextSetUnits = set2Units;

      await boundsCalculator.parameterizeAuction.sendTransactionAsync(
        combinedTokenArray,
        combinedCurrentSetUnits,
        combinedNextSetUnits
      );

      linearAuction = {
        auction: {
          maxNaturalUnit: BigNumber.max(set1NaturalUnit, set2NaturalUnit),
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

      subjectCurrentSet = set1.address;
      subjectNextSet = set2.address;
    });

    async function subject(): Promise<BigNumber> {
      return boundsCalculator.calculateMinimumBid.callAsync(
        subjectCurrentSet,
        subjectNextSet
      );
    }

    it('calculates the correct minimumBid', async () => {
      const result = await subject();

      const expectedResult = await liquidatorHelper.calculateMinimumBidAsync(
        linearAuction,
        set1,
        set2,
        wrappedBTCPrice.div(usdcPrice),
      );

      expect(result).to.bignumber.equal(expectedResult);
    });

    describe('when using assets that do not require a bump in minimumBid', async () => {
      before(async () => {
        set1Components = [wrappedETH.address, dai.address];
        set1Units = [new BigNumber(10 ** 6), new BigNumber(128 * 10 ** 6)];
        set1NaturalUnit = new BigNumber(10 ** 6);

        set2Components = [wrappedETH.address, dai.address];
        set2Units = [new BigNumber(10 ** 6), new BigNumber(133224489)];
        set2NaturalUnit = new BigNumber(10 ** 6);
      });

      it('calculates the correct minimumBid', async () => {
        const result = await subject();

        const expectedResult = await liquidatorHelper.calculateMinimumBidAsync(
          linearAuction,
          set1,
          set2,
          wrappedETHPrice.div(usdcPrice)
        );

        expect(result).to.bignumber.equal(expectedResult);
      });
    });
  });

  describe('#calculateStartPrice and calculateEndPrice', async () => {
    let combinedTokenArray: Address[];
    let combinedCurrentSetUnits: BigNumber[];
    let combinedNextSetUnits: BigNumber[];

    let linearAuction: LinearAuction;

    beforeEach(async () => {
      combinedTokenArray = [wrappedBTC.address, usdc.address];
      combinedCurrentSetUnits = [new BigNumber(100), new BigNumber(7500)];
      combinedNextSetUnits = [new BigNumber(100), new BigNumber(7806)];

      await boundsCalculator.parameterizeAuction.sendTransactionAsync(
        combinedTokenArray,
        combinedCurrentSetUnits,
        combinedNextSetUnits
      );

      linearAuction = {
        auction: {
          maxNaturalUnit: new BigNumber(10 ** 12),
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
      console.log(expectedResult, result);
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
      console.log(expectedResult, result);
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
          maxNaturalUnit: new BigNumber(10 ** 12),
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
      console.log(actualStartBound);
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