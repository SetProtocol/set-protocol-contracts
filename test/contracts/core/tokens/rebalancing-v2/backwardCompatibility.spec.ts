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
  FixedFeeCalculatorContract,
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
import { getWeb3, txnFrom } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';
import { FeeCalculatorHelper } from '@utils/helpers/feeCalculatorHelper';
import { LiquidatorHelper } from '@utils/helpers/liquidatorHelper';
import { OracleHelper } from 'set-protocol-oracles';
import { RebalancingSetV2Helper } from '@utils/helpers/rebalancingSetV2Helper';
import { ValuationHelper } from '@utils/helpers/valuationHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('BackwardsCompatability', accounts => {
  const [
    deployerAccount,
    managerAccount,
    feeRecipient,
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
  let fixedFeeCalculator: FixedFeeCalculatorContract;
  let feeCalculatorWhitelist: WhiteListContract;

  const coreHelper = new CoreHelper(deployerAccount, deployerAccount);
  const erc20Helper = new ERC20Helper(deployerAccount);
  const rebalancingHelper = new RebalancingSetV2Helper(
    deployerAccount,
    coreHelper,
    erc20Helper,
    blockchain
  );
  const oracleHelper = new OracleHelper(deployerAccount);
  const valuationHelper = new ValuationHelper(deployerAccount, coreHelper, erc20Helper, oracleHelper);
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper, valuationHelper);
  const feeCalculatorHelper = new FeeCalculatorHelper(deployerAccount);

  let currentSetToken: SetTokenContract;
  let nextSetToken: SetTokenContract;
  let rebalancingSetQuantityToIssue: BigNumber;

  before(async () => {
    ABIDecoder.addABI(CoreMockContract.getAbi());
    ABIDecoder.addABI(RebalancingSetTokenV2Contract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMockContract.getAbi());
    ABIDecoder.removeABI(RebalancingSetTokenV2Contract.getAbi());
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
    feeCalculatorWhitelist = await coreHelper.deployWhiteListAsync();
    rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
      coreMock.address,
      rebalancingComponentWhiteList.address,
      liquidatorWhitelist.address,
      feeCalculatorWhitelist.address
    );

    await coreHelper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);

    liquidatorMock = await liquidatorHelper.deployLiquidatorMockAsync();
    await coreHelper.addAddressToWhiteList(liquidatorMock.address, liquidatorWhitelist);

    fixedFeeCalculator = await feeCalculatorHelper.deployFixedFeeCalculatorAsync();
    await coreHelper.addAddressToWhiteList(fixedFeeCalculator.address, feeCalculatorWhitelist);

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

    const failPeriod = ONE_DAY_IN_SECONDS;
    const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
    rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
      coreMock,
      rebalancingFactory.address,
      managerAccount,
      liquidatorMock.address,
      feeRecipient,
      fixedFeeCalculator.address,
      currentSetToken.address,
      failPeriod,
      new BigNumber(lastRebalanceTimestamp),
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
      rebalancingComponentWhiteList,
      rebalancingSetToken,
      nextSetToken,
      managerAccount,
    );
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#getAuctionPriceParameters', async () => {
    let startTime: BigNumber;
    let endTime: BigNumber;
    let startPrice: BigNumber;
    let endPrice: BigNumber;

    beforeEach(async () => {
      startTime = new BigNumber(1);
      endTime = new BigNumber(2);
      startPrice = new BigNumber(3);
      endPrice = new BigNumber(4);

      await liquidatorMock.setAuctionPriceParameters.sendTransactionAsync(
        startTime,
        endTime,
        startPrice,
        endPrice,
        txnFrom(deployerAccount)
      );
    });

    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getAuctionPriceParameters.callAsync();
    }

    it('returns the correct getAuctionPriceParameters', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.getAuctionPriceParameters.callAsync(
        rebalancingSetToken.address
      );

      expect(retrievedResult[0]).to.bignumber.equal(startTime);
      expect(retrievedResult[1]).to.bignumber.equal(endTime);
      expect(retrievedResult[2]).to.bignumber.equal(startPrice);
      expect(retrievedResult[3]).to.bignumber.equal(endPrice);

      expect(JSON.stringify(retrievedResult)).to.equal(JSON.stringify(expectedResult));
    });
  });

  describe('#getCombinedCurrentUnits', async () => {
    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getCombinedCurrentUnits.callAsync();
    }

    it('returns the correct getCombinedCurrentUnits', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.getCombinedCurrentSetUnits.callAsync(
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

  describe('#startingCurrentSets', async () => {
    async function subject(): Promise<BigNumber> {
      return rebalancingSetToken.startingCurrentSetAmount.callAsync();
    }

    it('returns the correct startingCurrentSets', async () => {
      const retrievedResult = await subject();

      const expectedResult =  await liquidatorMock.startingCurrentSets.callAsync(
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
    beforeEach(async () => {
      await rebalancingHelper.failRebalanceToDrawdownAsync(
        rebalancingSetToken,
        liquidatorMock,
        rebalanceAuctionModule
      );
    });

    async function subject(): Promise<Address[]> {
      return rebalancingSetToken.getFailedAuctionWithdrawComponents.callAsync();
    }

    it('returns the correct getFailedAuctionWithdrawComponents', async () => {
      const auctionWithdrawComponents = await subject();

      const failedComponents =  await rebalancingHelper.getFailedWithdrawComponentsAsync(
        currentSetToken,
        nextSetToken,
      );
      const sortedExpected = _.sortBy(failedComponents);
      const sortActual = _.sortBy(auctionWithdrawComponents);

      expect(JSON.stringify(sortActual)).to.equal(JSON.stringify(sortedExpected));
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
    async function subject(): Promise<any> {
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
