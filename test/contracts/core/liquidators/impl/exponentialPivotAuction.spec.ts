require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as _ from 'lodash';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  OracleWhiteListContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  ExponentialPivotAuctionMockContract,
  TransferProxyContract,
  UpdatableOracleMockContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
} from '@utils/constants';
import { ether, gWei } from '@utils/units';
import { getLinearAuction } from '@utils/auction';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');

contract('ExponentialPivotAuction', accounts => {
  const [
    ownerAccount,
    functionCaller,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let auctionMock: ExponentialPivotAuctionMockContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);
  const libraryMockHelper = new LibraryMockHelper(ownerAccount);
  const liquidatorHelper = new LiquidatorHelper(ownerAccount, erc20Helper);

  let pricePrecision: BigNumber;
  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;
  let oracleWhiteList: OracleWhiteListContract;

  let component1: StandardTokenMockContract;
  let component2: StandardTokenMockContract;
  let component3: StandardTokenMockContract;

  let component1Price: BigNumber;
  let component2Price: BigNumber;
  let component3Price: BigNumber;

  let set1: SetTokenContract;
  let set2: SetTokenContract;

  let set1Components: Address[];
  let set2Components: Address[];

  let set1Units: BigNumber[];
  let set2Units: BigNumber[];

  let set1NaturalUnit: BigNumber;
  let set2NaturalUnit: BigNumber;

  let component1Oracle: UpdatableOracleMockContract;
  let component2Oracle: UpdatableOracleMockContract;
  let component3Oracle: UpdatableOracleMockContract;

  let subjectCaller: Address;
  let startingCurrentSetQuantity: BigNumber;

  before(async () => {
    ABIDecoder.addABI(Core.abi);

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

    component1 = await erc20Helper.deployTokenAsync(ownerAccount);
    component2 = await erc20Helper.deployTokenAsync(ownerAccount);
    component3 = await erc20Helper.deployTokenAsync(ownerAccount);

    set1Components = [component1.address, component2.address];
    set1Units = [gWei(1), gWei(1)];
    set1NaturalUnit = gWei(1);
    set1 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set1Components,
      set1Units,
      set1NaturalUnit,
    );

    set2Components = [component2.address, component3.address];
    set2Units = [gWei(1), gWei(1)];
    set2NaturalUnit = gWei(2);
    set2 = await coreHelper.createSetTokenAsync(
      core,
      setTokenFactory.address,
      set2Components,
      set2Units,
      set2NaturalUnit,
    );

    component1Price = ether(1);
    component2Price = ether(2);
    component3Price = ether(1);

    component1Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component1Price);
    component2Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component2Price);
    component3Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component3Price);

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [component1.address, component2.address, component3.address],
      [component1Oracle.address, component2Oracle.address, component3Oracle.address],
    );

    pricePrecision = new BigNumber(1000);
    auctionPeriod = ONE_DAY_IN_SECONDS;
    rangeStart = new BigNumber(10); // 10% above fair value
    rangeEnd = new BigNumber(10); // 10% below fair value

    auctionMock = await liquidatorHelper.deployExponentialPivotAuctionMockAsync(
      oracleWhiteList.address,
      pricePrecision,
      auctionPeriod,
      rangeStart,
      rangeEnd,
    );

    subjectCaller = functionCaller;
    startingCurrentSetQuantity = ether(10);

    await auctionMock.initializeLinearAuction.sendTransactionAsync(
      set1.address,
      set2.address,
      startingCurrentSetQuantity,
      { from: subjectCaller, gas: DEFAULT_GAS },
    );
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#getPrice', async () => {
    async function subject(): Promise<any> {
      return auctionMock.getPrice.callAsync();
    }

    async function getNumerator(): Promise<BigNumber> {
      const { timestamp } = await web3.eth.getBlock('latest');
      const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
      return await liquidatorHelper.calculateExponentialPivotNumerator(
        linearAuction,
        new BigNumber(timestamp),
        auctionPeriod,
        pricePrecision,
      );
    }

    async function getDenominator(): Promise<BigNumber> {
      const { timestamp } = await web3.eth.getBlock('latest');
      const linearAuction = getLinearAuction(await auctionMock.auction.callAsync());
      return await liquidatorHelper.calculateExponentialPivotDenominator(
        linearAuction,
        new BigNumber(timestamp),
        auctionPeriod,
        pricePrecision,
      );
    }

    describe('at the beginning of the auction', async () => {
      it('returns the correct numerator', async () => {
        const { numerator } = await subject();
        const expected = await getNumerator();
        expect(numerator).to.bignumber.equal(expected);
      });

      it('returns the correct denominator', async () => {
        const { denominator } = await subject();
        const expected = await getDenominator();
        expect(denominator).to.bignumber.equal(expected);
      });
    });

    describe('halfway through the auctionPeriod', async () => {
      beforeEach(async () => {
        await blockchain.increaseTimeAsync(auctionPeriod.div(2));
        // Do dummy transaction to advance the block
        await auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
          startingCurrentSetQuantity.div(2),
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      });

      it('returns the correct numerator', async () => {
        const { numerator } = await subject();
        const expected = await getNumerator();
        expect(numerator).to.bignumber.equal(expected);
      });

      it('returns the correct denominator', async () => {
        const { denominator } = await subject();
        const expected = await getDenominator();
        expect(denominator).to.bignumber.equal(expected);
      });
    });

    describe('after the auctionPeriod', async () => {
      beforeEach(async () => {
        await blockchain.increaseTimeAsync(auctionPeriod.plus(ONE_HOUR_IN_SECONDS));
        // Do dummy transaction to advance the block
        await auctionMock.reduceRemainingCurrentSets.sendTransactionAsync(
          startingCurrentSetQuantity.div(2),
          { from: subjectCaller, gas: DEFAULT_GAS },
        );
      });

      it('returns the correct numerator', async () => {
        const { numerator } = await subject();
        const expected = await getNumerator();
        expect(numerator).to.bignumber.equal(expected);
      });

      it('returns the correct denominator', async () => {
        const { denominator } = await subject();
        const expected = await getDenominator();
        expect(denominator).to.bignumber.equal(expected);
      });
    });
  });
});