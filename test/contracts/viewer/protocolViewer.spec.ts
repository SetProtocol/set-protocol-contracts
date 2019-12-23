require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  ConstantAuctionPriceCurveContract,
  CoreMockContract,
  FixedFeeCalculatorContract,
  LinearAuctionLiquidatorContract,
  OracleWhiteListContract,
  ProtocolViewerContract,
  RebalanceAuctionModuleMockContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenFactoryContract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenContract,
  SetTokenFactoryContract,
  SocialTradingManagerMockContract,
  StandardTokenMockContract,
  TransferProxyContract,
  UpdatableOracleMockContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { ether, gWei } from '@utils/units';
import {
  ONE_DAY_IN_SECONDS,
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DIVISOR,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  DEFAULT_UNIT_SHARES,
  ZERO,
} from '@utils/constants';
import { Blockchain } from '@utils/blockchain';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { LibraryMockHelper } from '@utils/helpers/libraryMockHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { ProtocolViewerHelper } from '@utils/helpers/protocolViewerHelper';
import { RebalancingHelper } from '@utils/helpers/rebalancingHelper';
import { RebalancingSetV2Helper } from '@utils/helpers/rebalancingSetV2Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const CoreMock = artifacts.require('CoreMock');
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);
const { expect } = chai;
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('ProtocolViewer', accounts => {
  const [
    deployerAccount,
    managerAccount,
    ownerAccount,
    feeRecipient,
    trader,
    allocator,
  ] = accounts;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const protocolViewerHelper = new ProtocolViewerHelper(deployerAccount);
  const rebalancingHelper = new RebalancingHelper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );

  let protocolViewer: ProtocolViewerContract;

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    protocolViewer = await protocolViewerHelper.deployProtocolViewerAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#batchFetchSupplies', async () => {
    let subjectTokenAddresses: Address[];
    let token: StandardTokenMockContract;

    beforeEach(async () => {
      token = await erc20Helper.deployTokenAsync(ownerAccount);
      subjectTokenAddresses = [token.address];
    });

    async function subject(): Promise<BigNumber[]> {
      return protocolViewer.batchFetchSupplies.callAsync(
        subjectTokenAddresses,
      );
    }

    it('fetches the supplies of the token addresses', async () => {
      const supplies: BigNumber[] = await subject();
      const suppliesJSON = JSON.stringify(supplies);

      const expectedSupplies = await erc20Helper.getTokenSupplies([token]);
      const expectedSuppliesJSON = JSON.stringify(expectedSupplies);

      expect(suppliesJSON).to.equal(expectedSuppliesJSON);
    });
  });

  describe('#batchFetchBalancesOf', async () => {
    let subjectTokenAddresses: Address[];
    let subjectTokenOwner: Address;

    let token: StandardTokenMockContract;

    beforeEach(async () => {
      token = await erc20Helper.deployTokenAsync(ownerAccount);

      subjectTokenAddresses = [token.address];
      subjectTokenOwner = deployerAccount;
    });

    async function subject(): Promise<BigNumber[]> {
      return protocolViewer.batchFetchBalancesOf.callAsync(
        subjectTokenAddresses,
        subjectTokenOwner,
      );
    }

    it('fetches the balances of the token addresses', async () => {
      const balances: BigNumber[] = await subject();
      const balancesJSON = JSON.stringify(balances);

      const expectedSupplies = await erc20Helper.getTokenBalances([token], subjectTokenOwner);
      const expectedSuppliesJSON = JSON.stringify(expectedSupplies);

      expect(balancesJSON).to.equal(expectedSuppliesJSON);
    });
  });

  describe('#fetchRebalanceProposalStateAsync', async () => {
    let subjectRebalancingSetAddress: Address;

    let coreMock: CoreMockContract;
    let transferProxy: TransferProxyContract;
    let vault: VaultContract;
    let rebalanceAuctionModuleMock: RebalanceAuctionModuleMockContract;
    let factory: SetTokenFactoryContract;
    let rebalancingComponentWhiteList: WhiteListContract;
    let rebalancingFactory: RebalancingSetTokenFactoryContract;
    let constantAuctionPriceCurve: ConstantAuctionPriceCurveContract;

    let rebalancingSetToken: RebalancingSetTokenContract;

    beforeEach(async () => {
      transferProxy = await coreHelper.deployTransferProxyAsync();
      vault = await coreHelper.deployVaultAsync();
      coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);
      rebalanceAuctionModuleMock = await coreHelper.deployRebalanceAuctionModuleMockAsync(coreMock, vault);
      await coreHelper.addModuleAsync(coreMock, rebalanceAuctionModuleMock.address);

      factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
      rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
      rebalancingFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
        coreMock.address,
        rebalancingComponentWhiteList.address,
      );
      constantAuctionPriceCurve = await rebalancingHelper.deployConstantAuctionPriceCurveAsync(
        DEFAULT_AUCTION_PRICE_NUMERATOR,
        DEFAULT_AUCTION_PRICE_DIVISOR,
      );

      await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
      await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
      await rebalancingHelper.addPriceLibraryAsync(coreMock, constantAuctionPriceCurve);

      const naturalUnits = [ether(.001), ether(.0001)];

      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2,
        naturalUnits
      );

      const currentSetToken = setTokens[0];
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        ONE_DAY_IN_SECONDS
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetTokenQuantityToIssue = ether(8);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

      subjectRebalancingSetAddress = rebalancingSetToken.address;
    });

    async function subject(): Promise<any> {
      return protocolViewer.fetchRebalanceProposalStateAsync.callAsync(
        subjectRebalancingSetAddress,
      );
    }

    it('fetches the RebalancingSetToken\'s current proposal\'s parameters', async () => {
      const rebalanceProposalState: any[] = await subject();

      const rebalancingSetState = rebalanceProposalState[0];
      expect(rebalancingSetState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);

      const [nextSetAddress, auctionLibraryAddress] = rebalanceProposalState[1];
      expect(nextSetAddress).to.equal(NULL_ADDRESS);
      expect(auctionLibraryAddress).to.equal(NULL_ADDRESS);

      const [
        proposalStartTime,
        auctionTimeToPivot,
        auctionStartPrice,
        auctionPivotPrice,
      ] = rebalanceProposalState[2];
      expect(proposalStartTime).to.be.bignumber.equal(ZERO);
      expect(auctionTimeToPivot).to.be.bignumber.equal(ZERO);
      expect(auctionStartPrice).to.be.bignumber.equal(ZERO);
      expect(auctionPivotPrice).to.be.bignumber.equal(ZERO);
    });
  });

  describe('#fetchRebalanceAuctionStateAsync', async () => {
    let subjectRebalancingSetAddress: Address;

    let coreMock: CoreMockContract;
    let transferProxy: TransferProxyContract;
    let vault: VaultContract;
    let rebalanceAuctionModuleMock: RebalanceAuctionModuleMockContract;
    let factory: SetTokenFactoryContract;
    let rebalancingComponentWhiteList: WhiteListContract;
    let rebalancingFactory: RebalancingSetTokenFactoryContract;
    let constantAuctionPriceCurve: ConstantAuctionPriceCurveContract;

    let rebalancingSetToken: RebalancingSetTokenContract;

    beforeEach(async () => {
      transferProxy = await coreHelper.deployTransferProxyAsync();
      vault = await coreHelper.deployVaultAsync();
      coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);
      rebalanceAuctionModuleMock = await coreHelper.deployRebalanceAuctionModuleMockAsync(coreMock, vault);
      await coreHelper.addModuleAsync(coreMock, rebalanceAuctionModuleMock.address);

      factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
      rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
      rebalancingFactory = await coreHelper.deployRebalancingSetTokenFactoryAsync(
        coreMock.address,
        rebalancingComponentWhiteList.address,
      );
      constantAuctionPriceCurve = await rebalancingHelper.deployConstantAuctionPriceCurveAsync(
        DEFAULT_AUCTION_PRICE_NUMERATOR,
        DEFAULT_AUCTION_PRICE_DIVISOR,
      );

      await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
      await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
      await rebalancingHelper.addPriceLibraryAsync(coreMock, constantAuctionPriceCurve);

      const naturalUnits = [ether(.001), ether(.0001)];

      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2,
        naturalUnits
      );

      const currentSetToken = setTokens[0];
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        ONE_DAY_IN_SECONDS
      );

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetTokenQuantityToIssue = ether(8);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetTokenQuantityToIssue);

      subjectRebalancingSetAddress = rebalancingSetToken.address;
    });

    async function subject(): Promise<any> {
      return protocolViewer.fetchRebalanceAuctionStateAsync.callAsync(
        subjectRebalancingSetAddress,
      );
    }

    it('fetches the RebalancingSetToken\'s current auction\'s parameters', async () => {
      const rebalanceAuctionState: any[] = await subject();

      const rebalancingSetState = rebalanceAuctionState[0];
      expect(rebalancingSetState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);

      const [
        startingCurrentSetAmount,
        auctionStartTime,
        minimumBid,
        remainingCurrentSets,
      ] = rebalanceAuctionState[1];
      expect(startingCurrentSetAmount).to.be.bignumber.equal(ZERO);
      expect(auctionStartTime).to.be.bignumber.equal(ZERO);
      expect(minimumBid).to.be.bignumber.equal(ZERO);
      expect(remainingCurrentSets).to.be.bignumber.equal(ZERO);
    });
  });

  describe('#fetchNewTradingPoolDetails', async () => {
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

    let set1Components: Address[];
    let set1Units: BigNumber[];
    let set1NaturalUnit: BigNumber;

    let component1Oracle: UpdatableOracleMockContract;
    let component2Oracle: UpdatableOracleMockContract;

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

    let subjectTradingPool: Address;

    let currentSetToken: SetTokenContract;
    let currentAllocation: BigNumber;
    let lastRebalanceTimestamp: BigNumber;
    let setManager: SocialTradingManagerMockContract;

    beforeEach(async () => {
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

      currentSetToken = set1;

      setManager = await viewerHelper.deploySocialTradingManagerMockAsync();

      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp } = await web3.eth.getBlock('latest');
      lastRebalanceTimestamp = new BigNumber(timestamp);
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

      subjectTradingPool = rebalancingSetToken.address;
    });

    async function subject(): Promise<any> {
      return protocolViewer.fetchNewTradingPoolDetails.callAsync(
        subjectTradingPool
      );
    }

    it('fetches the correct poolInfo data', async () => {
      const [ poolInfo, , ] = await subject();

      expect(poolInfo.trader).to.equal(trader);
      expect(poolInfo.allocator).to.equal(allocator);
      expect(poolInfo.currentAllocation).to.be.bignumber.equal(currentAllocation);
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
    });
  });
});
