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
  SetTokenContract,
  RebalanceAuctionModuleContract,
  RebalancingSetTokenV2Contract,
  RebalancingSetTokenV2FactoryContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_UNIT_SHARES,
  DEFAULT_REBALANCING_NATURAL_UNIT,
} from '@utils/constants';
import {
  getExpectedTransferLog,
} from '@utils/contract_logs/rebalancingSetToken';
import { expectRevertError, assertTokenBalanceAsync } from '@utils/tokenAssertions';
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
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('RebalancingSetState', accounts => {
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
  const liquidatorHelper = new LiquidatorHelper(deployerAccount, erc20Helper);

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
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#mint: Called from CoreMock', async () => {
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let rebalancingSetToken: RebalancingSetTokenV2Contract;
    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokensToDeploy = 2;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );

      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const liquidator = liquidatorMock.address;
      const failPeriod = ONE_DAY_IN_SECONDS;

      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidator,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      subjectIssuer = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return coreMock.mint.sendTransactionAsync(
        rebalancingSetToken.address,
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingSetToken.balanceOf.callAsync(subjectIssuer);

      await subject();

      const expectedNewBalance = existingBalance.add(subjectQuantity);
      await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, subjectIssuer);
    });

    it('updates the totalSupply_ correctly', async () => {
      const existingTokenSupply = await rebalancingSetToken.totalSupply.callAsync();

      await subject();

      const expectedTokenSupply = existingTokenSupply.add(subjectQuantity);
      const newTokenSupply = await rebalancingSetToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
    });

    it('emits a Transfer log denoting a minting', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          NULL_ADDRESS,
          subjectIssuer,
          subjectQuantity,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('Post-Rebalance stage', async () => {
      beforeEach(async () => {
        // Issue currentSetToken
        await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(8), {from: deployerAccount});
        await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

        // Use issued currentSetToken to issue rebalancingSetToken
        const rebalancingSetQuantityToIssue = ether(7);
        await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, rebalancingSetQuantityToIssue);
      });

      describe('when mint is called from Rebalance state', async () => {
        beforeEach(async () => {
          await rebalancingHelper.transitionToRebalanceV2Async(
            coreMock,
            rebalancingComponentWhiteList,
            rebalancingSetToken,
            nextSetToken,
            managerAccount
          );
        });

         it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

       describe('when mint is called from Drawdown State', async () => {
        beforeEach(async () => {
          await rebalancingHelper.transitionToDrawdownV2Async(
            coreMock,
            rebalancingComponentWhiteList,
            rebalancingSetToken,
            rebalanceAuctionModule,
            liquidatorMock,
            nextSetToken,
            managerAccount,
          );
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });
    });
  });

  describe('#mint: Called on Rebalancing Token', async () => {
    let subjectIssuer: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      const setTokensToDeploy = 1;
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        setTokensToDeploy,
      );
      const currentSetToken = setTokens[0];

      const manager = managerAccount;
      const liquidator = liquidatorMock.address;
      const initialSet = currentSetToken.address;
      const initialUnitShares = DEFAULT_UNIT_SHARES;
      const initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      const rebalanceInterval = ONE_DAY_IN_SECONDS;
      const failPeriod = ONE_DAY_IN_SECONDS;
      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');

      const rebalancingFactory = await coreHelper.deployRebalancingSetTokenV2FactoryAsync(
        coreMock.address,
        rebalancingComponentWhiteList.address,
        liquidatorWhitelist.address,
      );

      await coreHelper.addFactoryAsync(coreMock, rebalancingFactory);
      rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenV2Async(
        [
          rebalancingFactory.address,
          manager,
          liquidator,
          initialSet,
          rebalancingComponentWhiteList.address,
          liquidatorWhitelist.address,
        ],
        [
          initialUnitShares,
          initialNaturalUnit,
          rebalanceInterval,
          failPeriod,
          new BigNumber(lastRebalanceTimestamp),
        ],
      );

      subjectIssuer = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = deployerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.mint.sendTransactionAsync(
        subjectIssuer,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should revert since call is not from core', async () => {
      await expectRevertError(subject());
    });
  });

  describe('#burn: Called by Module', async () => {
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let currentSetToken: SetTokenContract;
    let nextSetToken: SetTokenContract;

    beforeEach(async () => {
      await coreHelper.addModuleAsync(coreMock, managerAccount);

      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const liquidator = liquidatorMock.address;
      const failPeriod = ONE_DAY_IN_SECONDS;

      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidator,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      const mintedQuantity = ether(5);
      subjectBurner = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = managerAccount;

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(5), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, mintedQuantity);
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.burn.sendTransactionAsync(
        subjectBurner,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should revert because its not called through core during non-Drawdown state', async () => {
      await expectRevertError(subject());
    });

    describe('when Module calls burn from Drawdown State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToDrawdownV2Async(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          rebalanceAuctionModule,
          liquidatorMock,
          nextSetToken,
          managerAccount,
        );
      });

      it('updates the totalSupply_ correctly', async () => {
        const existingTokenSupply = await rebalancingSetToken.totalSupply.callAsync();

        await subject();

        const expectedTokenSupply = existingTokenSupply.sub(subjectQuantity);
        const newTokenSupply = await rebalancingSetToken.totalSupply.callAsync();
        expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
      });
    });
  });

  describe('#burn: Called from CoreMock', async () => {
    let rebalancingSetToken: RebalancingSetTokenV2Contract;
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let nextSetToken: SetTokenContract;
    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];
      nextSetToken = setTokens[1];

      const liquidator = liquidatorMock.address;
      const failPeriod = ONE_DAY_IN_SECONDS;

      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidator,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      const mintedQuantity = ether(5);
      subjectBurner = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = managerAccount;

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(5), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, mintedQuantity);
    });

    async function subject(): Promise<string> {
      return coreMock.burn.sendTransactionAsync(
        rebalancingSetToken.address,
        subjectBurner,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates the balances of the user correctly', async () => {
      const existingBalance = await rebalancingSetToken.balanceOf.callAsync(subjectBurner);

      await subject();

      const expectedNewBalance = existingBalance.sub(subjectQuantity);
      await assertTokenBalanceAsync(rebalancingSetToken, expectedNewBalance, subjectBurner);
    });

    it('updates the totalSupply_ correctly', async () => {
      const existingTokenSupply = await rebalancingSetToken.totalSupply.callAsync();

      await subject();

      const expectedTokenSupply = existingTokenSupply.sub(subjectQuantity);
      const newTokenSupply = await rebalancingSetToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(expectedTokenSupply);
    });

    it('emits a Transfer log denoting a burn', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedTransferLog(
          subjectBurner,
          NULL_ADDRESS,
          subjectQuantity,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the user does not have enough shares to burn', async () => {
      beforeEach(async () => {
        subjectQuantity = ether(10);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('during Rebalance state', async () => {
      beforeEach(async () => {
       await rebalancingHelper.transitionToRebalanceV2Async(
         coreMock,
         rebalancingComponentWhiteList,
         rebalancingSetToken,
         nextSetToken,
         managerAccount
       );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when Core calls burn from Drawdown State', async () => {
      beforeEach(async () => {
        await rebalancingHelper.transitionToDrawdownV2Async(
          coreMock,
          rebalancingComponentWhiteList,
          rebalancingSetToken,
          rebalanceAuctionModule,
          liquidatorMock,
          nextSetToken,
          managerAccount,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#burn: Called on Rebalancing Token', async () => {
    let subjectBurner: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let currentSetToken: SetTokenContract;

    beforeEach(async () => {
      const setTokens = await rebalancingHelper.createSetTokensAsync(
        coreMock,
        factory.address,
        transferProxy.address,
        2
      );
      currentSetToken = setTokens[0];

      const liquidator = liquidatorMock.address;
      const failPeriod = ONE_DAY_IN_SECONDS;

      const { timestamp: lastRebalanceTimestamp } = await web3.eth.getBlock('latest');
      rebalancingSetToken = await rebalancingHelper.createDefaultRebalancingSetTokenV2Async(
        coreMock,
        rebalancingFactory.address,
        managerAccount,
        liquidator,
        currentSetToken.address,
        failPeriod,
        lastRebalanceTimestamp,
      );

      const mintedQuantity = ether(5);
      subjectBurner = deployerAccount,
      subjectQuantity = ether(5);
      subjectCaller = managerAccount;

      // Issue currentSetToken
      await coreMock.issue.sendTransactionAsync(currentSetToken.address, ether(5), {from: deployerAccount});
      await erc20Helper.approveTransfersAsync([currentSetToken], transferProxy.address);

      // Use issued currentSetToken to issue rebalancingSetToken
      await coreMock.issue.sendTransactionAsync(rebalancingSetToken.address, mintedQuantity);
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.burn.sendTransactionAsync(
        subjectBurner,
        subjectQuantity,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('should revert because its not called through core', async () => {
      await expectRevertError(subject());
    });
  });
});
