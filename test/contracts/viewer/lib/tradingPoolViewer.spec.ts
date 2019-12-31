require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreMockContract,
  FixedFeeCalculatorContract,
  LinearAuctionLiquidatorContract,
  OracleWhiteListContract,
  SetTokenContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenFactoryContract,
  SocialTradingManagerMockContract,
  StandardTokenMockContract,
  TradingPoolViewerContract,
  TransferProxyContract,
  UpdatableOracleMockContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether, gWei } from '@utils/units';
import {
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_UNIT_SHARES,
  ONE_DAY_IN_SECONDS,
  ZERO,
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingSetV2Helper } from '@utils/helpers/rebalancingSetV2Helper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { ProtocolViewerHelper } from '@utils/helpers/protocolViewerHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('TradingPoolViewer', accounts => {
  const [
    deployerAccount,
    feeRecipient,
    trader,
    allocator,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV2Contract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenV2FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorWhitelist: WhiteListContract;
  let liquidator: LinearAuctionLiquidatorContract;
  let fixedFeeCalculator: FixedFeeCalculatorContract;
  let feeCalculatorWhitelist: WhiteListContract;

  let name: string;
  let auctionPeriod: BigNumber;
  let rangeStart: BigNumber;
  let rangeEnd: BigNumber;
  let oracleWhiteList: OracleWhiteListContract;

  let component1: StandardTokenMockContract;
  let component2: StandardTokenMockContract;

  let component1Price: BigNumber;
  let component2Price: BigNumber;

  let set1: SetTokenContract;
  let set2: SetTokenContract;

  let set1Components: Address[];
  let set1Units: BigNumber[];
  let set1NaturalUnit: BigNumber;

  let set2Components: Address[];
  let set2Units: BigNumber[];
  let set2NaturalUnit: BigNumber;

  let component1Oracle: UpdatableOracleMockContract;
  let component2Oracle: UpdatableOracleMockContract;

  let poolViewer: TradingPoolViewerContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV2Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper);
  const libraryMockHelper = new LibraryMockHelper(deployerAccount);
  const feeCalculatorHelper = new FeeCalculatorHelper(deployerAccount);
  const viewerHelper = new ProtocolViewerHelper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);

    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    liquidatorWhitelist = await coreHelper.deployWhiteListAsync();
    feeCalculatorWhitelist = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhitelist.address,
      feeCalculatorWhitelist.address,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, setTokenFactory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    component1 = await erc20Helper.deployTokenAsync(deployerAccount);
    component2 = await erc20Helper.deployTokenAsync(deployerAccount);
    await coreHelper.addTokensToWhiteList(
      [component1.address, component2.address],
      rebalancingComponentWhiteList,
    );
    await erc20Helper.approveTransfersAsync(
      [component1, component2],
      transferProxy.address
    );

    set1Components = [component1.address, component2.address];
    set1Units = [gWei(1), gWei(1)];
    set1NaturalUnit = gWei(1);
    set1 = await coreHelper.createSetTokenAsync(
      coreMock,
      setTokenFactory.address,
      set1Components,
      set1Units,
      set1NaturalUnit,
    );

    set2Components = [component1.address, component2.address];
    set2Units = [gWei(2), gWei(3)];
    set2NaturalUnit = gWei(2);
    set2 = await coreHelper.createSetTokenAsync(
      coreMock,
      setTokenFactory.address,
      set2Components,
      set2Units,
      set2NaturalUnit,
    );

    component1Price = ether(1);
    component2Price = ether(2);

    component1Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component1Price);
    component2Oracle = await libraryMockHelper.deployUpdatableOracleMockAsync(component2Price);

    oracleWhiteList = await coreHelper.deployOracleWhiteListAsync(
      [component1.address, component2.address],
      [component1Oracle.address, component2Oracle.address],
    );

    auctionPeriod = ONE_DAY_IN_SECONDS;
    rangeStart = new BigNumber(10); // 10% above fair value
    rangeEnd = new BigNumber(10); // 10% below fair value
    name = 'liquidator';

    liquidator = await liquidatorHelper.deployLinearAuctionLiquidatorAsync(
      coreMock.address,
      oracleWhiteList.address,
      auctionPeriod,
      rangeStart,
      rangeEnd,
      name,
    );
    await coreHelper.addAddressToWhiteList(liquidator.address, liquidatorWhitelist);

    fixedFeeCalculator = await feeCalculatorHelper.deployFixedFeeCalculatorAsync();
    await coreHelper.addAddressToWhiteList(fixedFeeCalculator.address, feeCalculatorWhitelist);

    poolViewer = await viewerHelper.deployTradingPoolViewerAsync();
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#fetchNewTradingPoolDetails', async () => {
    let subjectTradingPool: Address;

    let currentSetToken: SetTokenContract;
    let currentAllocation: BigNumber;
    let lastRebalanceTimestamp: BigNumber;
    let setManager: SocialTradingManagerMockContract;

    let newFee: BigNumber;
    let feeUpdateTimestamp: BigNumber;

    beforeEach(async () => {
      currentSetToken = set1;

      setManager = await viewerHelper.deploySocialTradingManagerMockAsync();

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp } = await web3.eth.getBlock('latest');
      lastRebalanceTimestamp = timestamp;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        setManager.address,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      currentAllocation = ether(.6);
      await setManager.updateRecord.sendTransactionAsync(
        rebalancingSetToken.address,
        trader,
        allocator,
        currentAllocation
      );

      newFee = ether(.02);
      await setManager.updateFee.sendTransactionAsync(
        rebalancingSetToken.address,
        newFee
      );

      const block = await web3.eth.getBlock('latest');
      feeUpdateTimestamp = new BigNumber(block.timestamp);

      subjectTradingPool = rebalancingSetToken.address;
    });

    async function subject(): Promise<any> {
      return poolViewer.fetchNewTradingPoolDetails.callAsync(
        subjectTradingPool
      );
    }

    it('fetches the correct poolInfo data', async () => {
      const [ poolInfo, , ] = await subject();

      expect(poolInfo.trader).to.equal(trader);
      expect(poolInfo.allocator).to.equal(allocator);
      expect(poolInfo.currentAllocation).to.be.bignumber.equal(currentAllocation);
      expect(poolInfo.newEntryFee).to.be.bignumber.equal(newFee);
      expect(poolInfo.feeUpdateTimestamp).to.be.bignumber.equal(feeUpdateTimestamp);
    });

    it('fetches the correct RebalancingSetTokenV2/TradingPool data', async () => {
      const [ , rbSetData, ] = await subject();

      expect(rbSetData.manager).to.equal(setManager.address);
      expect(rbSetData.feeRecipient).to.equal(feeRecipient);
      expect(rbSetData.currentSet).to.equal(currentSetToken.address);
      expect(rbSetData.name).to.equal('Rebalancing Set Token');
      expect(rbSetData.symbol).to.equal('RBSET');
      expect(rbSetData.unitShares).to.be.bignumber.equal(DEFAULT_UNIT_SHARES);
      expect(rbSetData.naturalUnit).to.be.bignumber.equal(DEFAULT_REBALANCING_NATURAL_UNIT);
      expect(rbSetData.rebalanceInterval).to.be.bignumber.equal(ONE_DAY_IN_SECONDS);
      expect(rbSetData.entryFee).to.be.bignumber.equal(ZERO);
      expect(rbSetData.rebalanceFee).to.be.bignumber.equal(ZERO);
      expect(rbSetData.lastRebalanceTimestamp).to.be.bignumber.equal(lastRebalanceTimestamp);
      expect(rbSetData.rebalanceState).to.be.bignumber.equal(ZERO);
    });

    it('fetches the correct CollateralSet data', async () => {
      const [ , , collateralSetData ] = await subject();

      expect(JSON.stringify(collateralSetData.components)).to.equal(JSON.stringify(set1Components));
      expect(JSON.stringify(collateralSetData.units)).to.equal(JSON.stringify(set1Units));
      expect(collateralSetData.naturalUnit).to.be.bignumber.equal(set1NaturalUnit);
      expect(collateralSetData.name).to.equal('Set Token');
      expect(collateralSetData.symbol).to.equal('SET');
    });
  });

  describe('#fetchTradingPoolRebalanceDetails', async () => {
    let subjectTradingPool: Address;
    let setManager: SocialTradingManagerMockContract;

    let newAllocation: BigNumber;
    let nextSet: SetTokenContract;

    beforeEach(async () => {
      const currentSetToken = set1;

      setManager = await viewerHelper.deploySocialTradingManagerMockAsync();

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp } = await web3.eth.getBlock('latest');
      const lastRebalanceTimestamp = timestamp;
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        setManager.address,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      const currentAllocation = ether(.6);
      await setManager.updateRecord.sendTransactionAsync(
        rebalancingSetToken.address,
        trader,
        allocator,
        currentAllocation
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(
        currentSetToken.address,
        ether(8),
        {from: deployerAccount}
      );
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

      await blockchain.increaseTimeAsync(ONE_DAY_IN_SECONDS);


      const liquidatorData = '0x';
      nextSet = set2;
      newAllocation = ether(.4);
      await setManager.rebalance.sendTransactionAsync(
        rebalancingSetToken.address,
        nextSet.address,
        newAllocation,
        liquidatorData
      );

      subjectTradingPool = rebalancingSetToken.address;
    });

    async function subject(): Promise<any> {
      return poolViewer.fetchTradingPoolRebalanceDetails.callAsync(
        subjectTradingPool
      );
    }

    it('fetches the correct poolInfo data', async () => {
      const [ poolInfo, , ] = await subject();

      expect(poolInfo.trader).to.equal(trader);
      expect(poolInfo.allocator).to.equal(allocator);
      expect(poolInfo.currentAllocation).to.be.bignumber.equal(newAllocation);
      expect(poolInfo.newEntryFee).to.be.bignumber.equal(ZERO);
      expect(poolInfo.feeUpdateTimestamp).to.be.bignumber.equal(ZERO);
    });

    it('fetches the correct RebalancingSetTokenV2/TradingPool data', async () => {
      const [ , rbSetData, ] = await subject();

      const auctionPriceParams = await rebalancingSetToken.getAuctionPriceParameters.callAsync();
      const startingCurrentSets = await rebalancingSetToken.startingCurrentSetAmount.callAsync();
      const biddingParams = await rebalancingSetToken.getBiddingParameters.callAsync();

      expect(rbSetData.rebalanceStartTime).to.be.bignumber.equal(auctionPriceParams[0]);
      expect(rbSetData.timeToPivot).to.be.bignumber.equal(auctionPriceParams[1]);
      expect(rbSetData.startPrice).to.be.bignumber.equal(auctionPriceParams[2]);
      expect(rbSetData.endPrice).to.be.bignumber.equal(auctionPriceParams[3]);
      expect(rbSetData.startingCurrentSets).to.be.bignumber.equal(startingCurrentSets);
      expect(rbSetData.remainingCurrentSets).to.be.bignumber.equal(biddingParams[1]);
      expect(rbSetData.minimumBid).to.be.bignumber.equal(biddingParams[0]);
      expect(rbSetData.rebalanceState).to.be.bignumber.equal(new BigNumber(2));
      expect(rbSetData.nextSet).to.equal(nextSet.address);
      expect(rbSetData.liquidator).to.equal(liquidator.address);
    });

    it('fetches the correct CollateralSet data', async () => {
      const [ , , collateralSetData ] = await subject();

      expect(JSON.stringify(collateralSetData.components)).to.equal(JSON.stringify(set2Components));
      expect(JSON.stringify(collateralSetData.units)).to.equal(JSON.stringify(set2Units));
      expect(collateralSetData.naturalUnit).to.be.bignumber.equal(set2NaturalUnit);
      expect(collateralSetData.name).to.equal('Set Token');
      expect(collateralSetData.symbol).to.equal('SET');
    });
  });

  describe('#batchFetchTradingPoolEntryFees', async () => {
    let subjectTradingPools: Address[];

    let rebalancingSetToken2: RebalancingSetTokenV2Contract;
    let entryFee1: BigNumber;
    let entryFee2: BigNumber;

    beforeEach(async () => {
      const setManager = await viewerHelper.deploySocialTradingManagerMockAsync();

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp } = await web3.eth.getBlock('latest');
      const lastRebalanceTimestamp = timestamp;

      entryFee1 = ether(.02);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        setManager.address,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        set1.address,
        failPeriod,
        lastRebalanceTimestamp,
        entryFee1
      );

      entryFee2 = ether(.03);
      rebalancingSetToken2 = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        setManager.address,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        set1.address,
        failPeriod,
        lastRebalanceTimestamp,
        entryFee2
      );

      subjectTradingPools = [rebalancingSetToken.address, rebalancingSetToken2.address];
    });

    async function subject(): Promise<any> {
      return poolViewer.batchFetchTradingPoolEntryFees.callAsync(
        subjectTradingPools
      );
    }

    it('fetches the correct entryFee array', async () => {
      const actualEntryFeeArray = await subject();

      const expectedEntryFeeArray = [entryFee1, entryFee2];

      expect(JSON.stringify(actualEntryFeeArray)).to.equal(JSON.stringify(expectedEntryFeeArray));
    });
  });

  describe('#batchFetchTradingPoolRebalanceFees', async () => {
    let subjectTradingPools: Address[];

    let rebalancingSetToken2: RebalancingSetTokenV2Contract;
    let rebalanceFee1: BigNumber;
    let rebalanceFee2: BigNumber;

    beforeEach(async () => {
      const setManager = await viewerHelper.deploySocialTradingManagerMockAsync();

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp } = await web3.eth.getBlock('latest');
      const lastRebalanceTimestamp = timestamp;
      const entryFee = ether(.02);

      rebalanceFee1 = ether(.002);
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        setManager.address,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        set1.address,
        failPeriod,
        lastRebalanceTimestamp,
        entryFee,
        rebalanceFee1
      );

      rebalanceFee2 = ether(.003);
      rebalancingSetToken2 = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        setManager.address,
        liquidator.address,
        feeRecipient,
        fixedFeeCalculator.address,
        set1.address,
        failPeriod,
        lastRebalanceTimestamp,
        entryFee,
        rebalanceFee2
      );

      subjectTradingPools = [rebalancingSetToken.address, rebalancingSetToken2.address];
    });

    async function subject(): Promise<any> {
      return poolViewer.batchFetchTradingPoolRebalanceFees.callAsync(
        subjectTradingPools
      );
    }

    it('fetches the correct rebalanceFee array', async () => {
      const actualEntryRebalanceArray = await subject();

      const expectedEntryRebalanceArray = [rebalanceFee1, rebalanceFee2];

      expect(JSON.stringify(actualEntryRebalanceArray)).to.equal(JSON.stringify(expectedEntryRebalanceArray));
    });
  });
});
