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
  ConstantAuctionPriceCurveContract,
  SetTokenContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenContract,
  RebalancingSetTokenFactoryContract,
  RebalancingTokenManagerContract,
  SetTokenFactoryContract,
  SignatureValidatorContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_AUCTION_PRICE_NUMERATOR,
  DEFAULT_AUCTION_PRICE_DENOMINATOR,
} from '@utils/constants';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const CoreMock = artifacts.require('CoreMock');
const RebalancingSetToken = artifacts.require('RebalancingSetToken');
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('RebalancingTokenManager', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
  ] = accounts;

  let rebalancingSetToken: RebalancingSetTokenContract;

  let coreMock: CoreMockContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let rebalanceAuctionModule: RebalanceAuctionModuleContract;
  let signatureValidator: SignatureValidatorContract;
  let factory: SetTokenFactoryContract;
  let rebalancingFactory: RebalancingSetTokenFactoryContract;
  let constantAuctionPriceCurve: ConstantAuctionPriceCurveContract;
  let rebalancingTokenManager: RebalancingTokenManagerContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const rebalancingWrapper = new RebalancingWrapper(
    deployerAccount,
    coreWrapper,
    erc20Wrapper,
    blockchain
  );

  before(async () => {
    ABIDecoder.addABI(CoreMock.abi);
    ABIDecoder.addABI(RebalancingSetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(CoreMock.abi);
    ABIDecoder.removeABI(RebalancingSetToken.abi);
  });

  beforeEach(async () => {
    blockchain.saveSnapshotAsync();

    transferProxy = await coreWrapper.deployTransferProxyAsync();
    vault = await coreWrapper.deployVaultAsync();
    signatureValidator = await coreWrapper.deploySignatureValidatorAsync();
    coreMock = await coreWrapper.deployCoreMockAsync(transferProxy, vault, signatureValidator);
    rebalanceAuctionModule = await coreWrapper.deployRebalanceAuctionModuleAsync(coreMock, vault);
    await coreWrapper.addModuleAsync(coreMock, rebalanceAuctionModule.address);

    factory = await coreWrapper.deploySetTokenFactoryAsync(coreMock.address);
    rebalancingFactory = await coreWrapper.deployRebalancingSetTokenFactoryAsync(
      coreMock.address,
    );
    constantAuctionPriceCurve = await rebalancingWrapper.deployConstantAuctionPriceCurveAsync(
      DEFAULT_AUCTION_PRICE_NUMERATOR,
      DEFAULT_AUCTION_PRICE_DENOMINATOR,
    );
    rebalancingTokenManager = await rebalancingWrapper.deployRebalancingTokenManagerAsync(
      constantAuctionPriceCurve.address,
    );

    await coreWrapper.setDefaultStateAndAuthorizationsAsync(coreMock, vault, transferProxy, factory);
    await coreWrapper.addFactoryAsync(coreMock, rebalancingFactory);
    await coreWrapper.addAuthorizationAsync(vault, rebalanceAuctionModule.address);
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe.only('#proposeNewRebalance', async () => {
    let subjectRebalancingSetToken: Address;
    let subjectCaller: Address;
    let proposalPeriod: BigNumber;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;
    let reproposeRebalancingSetToken: SetTokenContract;
    let setTokens: SetTokenContract[];

    beforeEach(async () => {
      const setTokensToDeploy = 3;
      setTokens = await rebalancingWrapper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];
      reproposeRebalancingSetToken = setTokens[2];

      proposalPeriod = ONE_DAY_IN_SECONDS;
      rebalancingSetToken = await rebalancingWrapper.createDefaultRebalancingSetTokenAsync(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        currentSetToken.address,
        proposalPeriod
      );

      subjectRebalancingSetToken = rebalancingSetToken.address;
      subjectCaller = otherAccount;

      await rebalancingWrapper.addPriceLibraryAsync(
        coreMock,
        constantAuctionPriceCurve,
      );
       const timeFastForward = ONE_DAY_IN_SECONDS.add(1);
       await blockchain.increaseTimeAsync(timeFastForward);
    });

    async function subject(): Promise<string> {
      return rebalancingTokenManager.proposeNewRebalance.sendTransactionAsync(
        subjectRebalancingSetToken,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    describe('when proposeNewRebalance is called from the Default state', async () => {
      it('updates to the new rebalancing set correctly', async () => {
        await subject();

        const newRebalacingSet = await rebalancingSetToken.nextSet.callAsync();
        expect(newRebalacingSet).to.equal(subjectRebalancingToken);
      });

      it('updates to the new auction library correctly', async () => {
        await subject();

        const newAuctionLibrary = await rebalancingSetToken.auctionLibrary.callAsync();
        expect(newAuctionLibrary).to.equal(constantAuctionPriceCurve.address);
      });

      it('updates the time to pivot correctly', async () => {
        await subject();

        const auctionParameters = await rebalancingSetToken.auctionParameters.callAsync();
        const newAuctionTimeToPivot = auctionParameters[1];
        expect(newAuctionTimeToPivot).to.be.bignumber.equal(subjectAuctionTimeToPivot);
      });

      it('updates the auction pivot price correctly', async () => {
        await subject();

        const auctionParameters = await rebalancingSetToken.auctionParameters.callAsync();
        const newAuctionPivotPrice = auctionParameters[3];
        expect(newAuctionPivotPrice).to.be.bignumber.equal(subjectAuctionPivotPrice);
      });

      describe('but the rebalance interval has not elapsed', async () => {
        beforeEach(async () => {
          subjectTimeFastForward = ONE_DAY_IN_SECONDS.sub(10);
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });

    describe('when proposeNewRebalance is called from Proposal state', async () => {
      let timeJump: BigNumber;

      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToProposeAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        subjectRebalancingSetToken = reproposeRebalancingSetToken.address;
        timeJump = new BigNumber(1000);
        await blockchain.increaseTimeAsync(timeJump);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when proposeNewRebalance is called from Rebalance state', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when proposeNewRebalance is called from Drawdown State', async () => {
      beforeEach(async () => {
      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(9), {from: deployerAccount});
      await erc20Wrapper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      const rebalancingSetQuantityToIssue = ether(7);
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);

        await rebalancingWrapper.defaultTransitionToRebalanceAsync(
          coreMock,
          rebalancingSetToken,
          nextSetToken.address,
          constantAuctionPriceCurve.address,
          managerAccount
        );

        const defaultTimeToPivot = new BigNumber(100000);
        await blockchain.increaseTimeAsync(defaultTimeToPivot.add(1));

        const biddingParameters = await rebalancingSetToken.biddingParameters.callAsync();
        const minimumBid = biddingParameters[0];
        await rebalanceAuctionModule.bid.sendTransactionAsync(
          rebalancingSetToken.address,
          minimumBid
        );

        await rebalancingSetToken.endFailedAuction.sendTransactionAsync();
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});