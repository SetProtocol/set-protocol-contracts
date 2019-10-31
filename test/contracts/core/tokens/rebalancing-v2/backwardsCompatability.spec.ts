require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
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
  SetTokenContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
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
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('BackwardsCompatability', accounts => {
  const [
    deployerAccount,
    managerAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenV2Contract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenV2FactoryContract;
  let rebalancingComponentWhiteList: WhiteListContract;
  let liquidatorWhitelist: WhiteListContract;
  let liquidatorMock: LiquidatorMockContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV2Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper)

  let currentSetToken: SetTokenContract;
  let nextSetToken: SetTokenContract;
  let rebalancingSetQuantityToIssue: BigNumber;

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
    liquidatorWhitelist = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhitelist.address
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMockAsync();
    await coreHelper.addAddressToWhiteList(liquidatorMock.address, liquidatorWhitelist);

    const setTokensToDeploy = 2;
    const setTokens = await rebalancingHelper.createSetTokensAsync(
      coreMock,
      factory.address,
      transferProxy.address,
      setTokensToDeploy,
    );

    currentSetToken = setTokens[0];
    nextSetToken = setTokens[1];

    const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
    await coreHelper.addTokensToWhiteList(nextSetTokenComponentAddresses, rebalancingComponentWhiteList);

    const proposalPeriod = ONE_DAY_IN_SECONDS;
    const failPeriod = ONE_DAY_IN_SECONDS;
    rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
      coreMock,
      rebalancingFactory.address,
      managerAccount,
      liquidatorMock.address,
      currentSetToken.address,
      proposalPeriod,
      failPeriod,
    );

    await coreMock.issue.sendTransactionAsync(
      currentSetToken.address,
      ether(8),
      {from: deployerAccount}
    );
    await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

    rebalancingSetQuantityToIssue = ether(7);
    await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

    await rebalancingHelper.transitionToRebalanceV2Async(
      coreMock,
      rebalancingSetToken,
      nextSetToken,
      managerAccount,
    );
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#getAuctionPriceParameters', async () => {
    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getAuctionPriceParameters.callAsync();
    }

    it('returns the correct getAuctionPriceParameters', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.getAuctionPriceParameters.callAsync(
        rebalancingSetToken.address
      );
      expect(JSON.stringify(retrievedResult)).to.equal(JSON.stringify(expectedResult));
    });
  });

  describe('#getCombinedCurrentUnits', async () => {
    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getCombinedCurrentUnits.callAsync();
    }

    it('returns the correct getCombinedCurrentUnits', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.getCombinedCurrentUnits.callAsync(
        rebalancingSetToken.address
      );
      expect(JSON.stringify(retrievedResult)).to.equal(JSON.stringify(expectedResult));
    });
  });

  describe('#getCombinedNextSetUnits', async () => {
    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getCombinedNextSetUnits.callAsync();
    }

    it('returns the correct getCombinedNextSetUnits', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.getCombinedNextSetUnits.callAsync(
        rebalancingSetToken.address
      );
      expect(JSON.stringify(retrievedResult)).to.equal(JSON.stringify(expectedResult));
    });
  });

  describe('#getCombinedTokenArray', async () => {
    async function subject(): Promise<Address[]> {
      return rebalancingSetToken.getCombinedTokenArray.callAsync();
    }

    it('returns the correct getCombinedTokenArray', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.getCombinedTokenArray.callAsync(
        rebalancingSetToken.address
      );
      expect(JSON.stringify(retrievedResult)).to.equal(JSON.stringify(expectedResult));
    });
  });


  describe('#getCombinedTokenArrayLength', async () => {
    async function subject(): Promise<BigNumber> {
      return rebalancingSetToken.getCombinedTokenArrayLength.callAsync();
    }

    it('returns the correct getCombinedTokenArrayLength', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.getCombinedTokenArray.callAsync(
        rebalancingSetToken.address
      );
      expect(retrievedResult).to.bignumber.equal(expectedResult.length);
    });
  });

  describe('#startingCurrentSetAmount', async () => {
    async function subject(): Promise<BigNumber> {
      return rebalancingSetToken.startingCurrentSetAmount.callAsync();
    }

    it('returns the correct startingCurrentSetAmount', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.startingCurrentSetAmount.callAsync(
        rebalancingSetToken.address
      );
      expect(retrievedResult).to.bignumber.equal(expectedResult);
    });
  });

  describe('#auctionPriceParameters', async () => {
    async function subject(): Promise<any> {
      return rebalancingSetToken.auctionPriceParameters.callAsync();
    }

    it('returns the correct auctionPriceParameters', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.auctionPriceParameters.callAsync(
        rebalancingSetToken.address
      );
      expect(retrievedResult[0]).to.equal(expectedResult[0]);
      expect(retrievedResult[1]).to.equal(expectedResult[1]);
      expect(retrievedResult[2]).to.equal(expectedResult[2]);
      expect(retrievedResult[3]).to.equal(expectedResult[3]);
    });
  });

  describe('#getFailedAuctionWithdrawComponents', async () => {
    async function subject(): Promise<Address[]> {
      return rebalancingSetToken.getFailedAuctionWithdrawComponents.callAsync();
    }

    it('returns the correct getFailedAuctionWithdrawComponents', async () => {
      const auctionWithdrawComponents = await subject();

      const failedComponents =  await rebalancingSetToken.getFailedRebalanceComponents.callAsync(
        rebalancingSetToken.address
      );
      expect(JSON.stringify(auctionWithdrawComponents)).to.equal(JSON.stringify(failedComponents));
    });
  });

  describe('#getBiddingParameters', async () => {
    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getBiddingParameters.callAsync();
    }

    it('returns the correct minimumBid', async () => {
      const [minimumBid] = await subject();

      const liquidatorMinimumBid = await liquidatorMock.minimumBid.callAsync(rebalancingSetToken.address);
      expect(minimumBid).to.be.bignumber.equal(liquidatorMinimumBid);
    });

    it('returns the correct remainingCurrentSets', async () => {
      const [, remaininCurrentSets] = await subject();

      const liquidatorRemaininCurrentSets = await liquidatorMock.remainingCurrentSets.callAsync(
        rebalancingSetToken.address
      );
      expect(remaininCurrentSets).to.be.bignumber.equal(liquidatorRemaininCurrentSets);
    });
  });

  describe('#biddingParameters', async () => {
    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.biddingParameters.callAsync();
    }

    it('returns the correct minimumBid', async () => {
      const [minimumBid] = await subject();

      const liquidatorMinimumBid = await liquidatorMock.minimumBid.callAsync(
        rebalancingSetToken.address
      );
      expect(minimumBid).to.be.bignumber.equal(liquidatorMinimumBid);
    });

    it('returns the correct remainingCurrentSets', async () => {
      const [, remaininCurrentSets] = await subject();

      const liquidatorRemaininCurrentSets = await liquidatorMock.remainingCurrentSets.callAsync(
        rebalancingSetToken.address
      );
      expect(remaininCurrentSets).to.be.bignumber.equal(liquidatorRemaininCurrentSets);
    });
  });

  describe('#endFailedAuction', async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      const failPeriod = new BigNumber(100000);
      await blockchain.increaseTimeAsync(failPeriod.add(1));

      const minimumBid = await liquidatorMock.minimumBid.callAsync(rebalancingSetToken.address);
      await rebalancingHelper.placeBidAsync(
        rebalanceAuctionModule,
        rebalancingSetToken.address,
        minimumBid,
      );

      subjectCaller = deployerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.endFailedAuction.sendTransactionAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the rebalanceState to Drawdown', async () => {
      await subject();

      const newRebalanceState = await rebalancingSetToken.rebalanceState.callAsync();
      expect(newRebalanceState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DRAWDOWN);
    });
  });
});
