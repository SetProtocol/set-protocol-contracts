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
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TWAPAuctionMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { ether } from '@utils/units';
import { AssetChunkSizeBounds } from '@utils/auction';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { ValuationHelper } from '@utils/helpers/valuationHelper';
import { ZERO, ZERO_BYTES } from '@utils/constants';

BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

const Core = artifacts.require('Core');
const TwoAssetPriceBoundedLinearAuction = artifacts.require('TwoAssetPriceBoundedLinearAuction');

contract('TWAPAuction', accounts => {
  const [
    deployerAccount,
  ] = accounts;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  let twapAuction: TWAPAuctionMockContract;
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
  let assetPairHashes: string[];
  let assetPairBounds: AssetChunkSizeBounds[];

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
    rangeStart = new BigNumber(3); // 3%
    rangeEnd = new BigNumber(21); // 21%
    assetPairHashes = [
      liquidatorHelper.generateAssetPairHashes(wrappedETH.address, wrappedBTC.address),
      liquidatorHelper.generateAssetPairHashes(wrappedETH.address, usdc.address),
    ];
    assetPairBounds = [
      {min: ZERO, max: ether(10 ** 6)},
      {min: ether(10 ** 4), max: ether(10 ** 6)},
    ];

    twapAuction = await liquidatorHelper.deployTWAPAuctionMock(
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      assetPairHashes,
      assetPairBounds
    );
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
    ABIDecoder.removeABI(TwoAssetPriceBoundedLinearAuction.abi);
  });

  describe('#constructor', async () => {
    it('sets the correct chunkSizeWhiteList', async () => {
      const pairOne: any = await twapAuction.chunkSizeWhiteList.callAsync(assetPairHashes[0]);
      const pairTwo: any = await twapAuction.chunkSizeWhiteList.callAsync(assetPairHashes[1]);

      expect(pairOne.min).to.equal(assetPairBounds[0].min.toString());
      expect(pairOne.max).to.equal(assetPairBounds[0].max.toString());
      expect(pairTwo.min).to.equal(assetPairBounds[1].min.toString());
      expect(pairTwo.max).to.equal(assetPairBounds[1].max.toString());
    });

    it('sets the correct expected chunk auction length', async () => {
      const actualExpectedAuctionLength = await twapAuction.expectedChunkAuctionLength.callAsync();

      const expectedAuctionLength = auctionPeriod.mul(rangeStart.add(2)).div(rangeStart.add(rangeEnd));

      expect(actualExpectedAuctionLength).to.be.bignumber.equal(expectedAuctionLength);
    });
  });

  describe('#initializeTWAPAuction', async () => {
    let subjectCurrentSet: Address;
    let subjectNextSet: Address;
    let subjectStartingCurrentSets: BigNumber;
    let subjectLiquidatorData: any;

    beforeEach(async () => {
      subjectCurrentSet = deployerAccount;
      subjectNextSet = deployerAccount;
      subjectStartingCurrentSets = ether(1);
      subjectLiquidatorData = ZERO_BYTES;
    });

    async function subject(): Promise<BigNumber> {
      return twapAuction.initializeTWAPAuction.sendTransactionAsync(
        subjectCurrentSet,
        subjectNextSet,
        subjectStartingCurrentSets,
        subjectLiquidatorData
      );
    }

    it('sets the correct chunkSizeWhiteList', async () => {
      await subject();
    });
  });
});