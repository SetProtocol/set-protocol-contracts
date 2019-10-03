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
  LiquidatorMockContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import {
  ONE_DAY_IN_SECONDS,
  DEFAULT_UNIT_SHARES,
  DEFAULT_REBALANCING_NATURAL_UNIT,
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { RebalancingSetV2Helper } from '@utils/helpers/rebalancingSetV2Helper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetTokenV2 = artifacts.require('RebalancingSetTokenV2');
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('BackwardsCompatability', accounts => {
  const [
    deployerAccount,
    managerAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV2Contract;
  let components: StandardTokenMockContract[] = [];

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenV2FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorMock: LiquidatorMockContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV2Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const liquidatorHelper = new LiquidatorHelper(deployerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
    ABIDecoder.addABI(RebalancingSetTokenV2.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalancingSetTokenV2.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreHelper.deployTransferProxyAsync();
    vault = await coreHelper.deployVaultAsync();
    coreMock = await coreHelper.deployCoreMockAsync(transferProxy, vault);
    rebalanceAuctionModule = await coreHelper.deployRebalanceAuctionModuleAsync(coreMock, vault);
    await coreHelper.addModuleAsync(coreMock, rebalanceAuctionModule.address);

    factory = await coreHelper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingComponentWhiteList = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMock();
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#getFailedAuctionWithdrawComponents', async () => {

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      const liquidator = liquidatorMock.address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const failPeriod = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenV2Async(
        rebalancingFactory.address,
        manager,
        liquidator,
        initialSet,
        rebalancingComponentWhiteList.address,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        failPeriod,
      );
    });

    async function subject(): Promise<Address[]> {
      return rebalancingSetToken.getFailedAuctionWithdrawComponents.callAsync();
    }

    it('returns the correct getFailedAuctionWithdrawComponents', async () => {
      const auctionWithdrawComponents = await subject();

      const failedComponents =  await rebalancingSetToken.getFailedRebalanceComponents.callAsync();
      expect(JSON.stringify(auctionWithdrawComponents)).to.equal(JSON.stringify(failedComponents));
    });
  });

  describe('#getBiddingParameters', async () => {
    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(1, deployerAccount);

      const initialSet = components[0].address;
      const manager = managerAccount;
      const liquidator = liquidatorMock.address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const proposalPeriod = ONE_DAY_IN_SECONDS;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const failPeriod = ONE_DAY_IN_SECONDS;

      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenV2Async(
        rebalancingFactory.address,
        manager,
        liquidator,
        initialSet,
        rebalancingComponentWhiteList.address,
        initialUnitShares,
        initialNaturalUnit,
        proposalPeriod,
        rebalanceInterval,
        failPeriod,
      );
    });

    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getBiddingParameters.callAsync();
    }

    it('returns the correct minimumBid', async () => {
      const [minimumBid] = await subject();

      const liquidatorMinimumBid = await liquidatorMock.minimumBid.callAsync();
      expect(minimumBid).to.be.bignumber.equal(liquidatorMinimumBid);
    });

    it('returns the correct remainingCurrentSets', async () => {
      const [, remaininCurrentSets] = await subject();

      const liquidatorRemaininCurrentSets = await liquidatorMock.remainingCurrentSets.callAsync();
      expect(remaininCurrentSets).to.be.bignumber.equal(liquidatorRemaininCurrentSets);
    });
  });
});
