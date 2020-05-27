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
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract,
  WhiteListContract,
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import {
  DEFAULT_GAS,
  ONE_DAY_IN_SECONDS,
  DEFAULT_UNIT_SHARES,
  DEFAULT_REBALANCING_NATURAL_UNIT,
  NULL_ADDRESS,
} from '@utils/constants';
import {
  getExpectedNewManagerAddedLog,
  getExpectedNewEntryFeeLog,
  getExpectedNewLiquidatorAddedLog,
  getExpectedNewFeeRecipientAddedLog
} from '@utils/contract_logs/rebalancingSetTokenV2';
import { expectRevertError } from '@utils/tokenAssertions';
import { getWeb3, txnFrom } from '@utils/web3Helper';
import { ether } from '@utils/units';

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
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);


contract('RebalancingSetState', accounts => {
  const [
    deployerAccount,
    managerAccount,
    otherAccount,
    fakeTokenAccount,
    fakeModuleAccount,
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

  let feeCalculator: FixedFeeCalculatorContract;
  let feeCalculatorWhitelist: WhiteListContract;

  let initialSetToken: SetTokenContract;
  let nextSetToken: SetTokenContract;
  let manager: Address;
  let liquidator: Address;
  let initialUnitShares: BigNumber;
  let initialNaturalUnit: BigNumber;
  let rebalanceInterval: BigNumber;
  let failPeriod: BigNumber;
  let lastRebalanceTimestamp: BigNumber;
  let entryFee: BigNumber;

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
    [ initialSetToken, nextSetToken ] = await rebalancingHelper.createSetTokensAsync(
      coreMock,
      factory.address,
      transferProxy.address,
      2,
      undefined,
      managerAccount,
    );


    manager = managerAccount;
    liquidator = liquidatorMock.address;
    initialUnitShares = DEFAULT_UNIT_SHARES;
    initialNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
    rebalanceInterval = ONE_DAY_IN_SECONDS;
    failPeriod = ONE_DAY_IN_SECONDS;
    entryFee = ether(1).div(10);

    const { timestamp } = await web3.eth.getBlock('latest');
    lastRebalanceTimestamp = timestamp;

    feeCalculator = await feeCalculatorHelper.deployFixedFeeCalculatorAsync();
    await coreHelper.addAddressToWhiteList(feeCalculator.address, feeCalculatorWhitelist);

    rebalancingSetToken = await rebalancingHelper.deployRebalancingSetTokenV2Async(
      [
        rebalancingFactory.address,
        manager,
        liquidator,
        initialSetToken.address,
        rebalancingComponentWhiteList.address,
        liquidatorWhitelist.address,
        feeRecipient,
        feeCalculator.address,
      ],
      [
        initialUnitShares,
        initialNaturalUnit,
        rebalanceInterval,
        failPeriod,
        lastRebalanceTimestamp,
        entryFee,
      ]
    );

    await coreMock.addSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(deployerAccount));
  });

  afterEach(async () => {
    blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    let subjectFactory: Address;
    let subjectManager: Address;
    let subjectLiquidator: Address;
    let subjectInitialSet: Address;
    let subjectComponentWhiteList: Address;
    let subjectLiquidatorWhiteList: Address;
    let subjectFeeRecipient: Address;
    let subjectInitialUnitShares: BigNumber;
    let subjectNaturalUnit: BigNumber;
    let subjectRebalanceInterval: BigNumber;
    let subjectFailPeriod: BigNumber;
    let subjectLastRebalanceTimestamp: BigNumber;
    let subjectEntryFee: BigNumber;
    let subjectRebalanceFeeCalculator: Address;
    const subjectName: string = 'Rebalancing Set';
    const subjectSymbol: string = 'RBSET';

    beforeEach(async () => {
      const { timestamp } = await web3.eth.getBlock('latest');

      subjectFactory = rebalancingFactory.address;
      subjectManager = managerAccount;
      subjectLiquidator = fakeModuleAccount;
      subjectInitialSet = initialSetToken.address;
      subjectComponentWhiteList = rebalancingComponentWhiteList.address;
      subjectLiquidatorWhiteList = liquidatorWhitelist.address;
      subjectFeeRecipient = feeRecipient;
      subjectInitialUnitShares = DEFAULT_UNIT_SHARES;
      subjectNaturalUnit = DEFAULT_REBALANCING_NATURAL_UNIT;
      subjectRebalanceInterval = ONE_DAY_IN_SECONDS.mul(2);
      subjectFailPeriod = ONE_DAY_IN_SECONDS.mul(3);
      subjectLastRebalanceTimestamp = new BigNumber(timestamp);
      subjectEntryFee = ether(1);
      subjectRebalanceFeeCalculator = feeCalculator.address;
    });

    async function subject(): Promise<RebalancingSetTokenV2Contract> {
      const addressConfig = [
        subjectFactory,
        subjectManager,
        subjectLiquidator,
        subjectInitialSet,
        subjectComponentWhiteList,
        subjectLiquidatorWhiteList,
        subjectFeeRecipient,
        subjectRebalanceFeeCalculator,
      ];

      const bigNumberConfig = [
        subjectInitialUnitShares,
        subjectNaturalUnit,
        subjectRebalanceInterval,
        subjectFailPeriod,
        subjectLastRebalanceTimestamp,
        subjectEntryFee,
      ];

      return rebalancingHelper.deployRebalancingSetTokenV2Async(
        addressConfig,
        bigNumberConfig,
        subjectName,
        subjectSymbol,
      );
    }

    it('creates a set with the correct name', async () => {
      rebalancingSetToken = await subject();
      const tokenName = await rebalancingSetToken.name.callAsync();
      expect(tokenName).to.equal(subjectName);
    });

    it('creates a set with the correct symbol', async () => {
      rebalancingSetToken = await subject();
      const tokenSymbol = await rebalancingSetToken.symbol.callAsync();
      expect(tokenSymbol).to.equal(subjectSymbol);
    });

    it('creates a set with the correct core', async () => {
      rebalancingSetToken = await subject();
      const coreAddress = await rebalancingSetToken.core.callAsync();
      expect(coreAddress).to.equal(coreMock.address);
    });

    it('creates a set with the correct vault', async () => {
      rebalancingSetToken = await subject();
      const vaultAddress = await rebalancingSetToken.vault.callAsync();
      expect(vaultAddress).to.equal(vault.address);
    });

    it('creates a set with the correct whitelist', async () => {
      rebalancingSetToken = await subject();
      const whitelistAddress = await rebalancingSetToken.componentWhiteList.callAsync();
      expect(whitelistAddress).to.equal(rebalancingComponentWhiteList.address);
    });

    it('creates a set with the correct factory', async () => {
      rebalancingSetToken = await subject();
      const tokenFactory = await rebalancingSetToken.factory.callAsync();
      expect(tokenFactory).to.equal(subjectFactory);
    });

    it('creates a set with the correct liquidator', async () => {
      rebalancingSetToken = await subject();
      const liquidator = await rebalancingSetToken.liquidator.callAsync();
      expect(liquidator).to.equal(subjectLiquidator);
    });

    it('creates a set with the correct manager', async () => {
      rebalancingSetToken = await subject();
      const tokenManager = await rebalancingSetToken.manager.callAsync();
      expect(tokenManager).to.equal(subjectManager);
    });

    it('creates a set with the correct initialSet', async () => {
      rebalancingSetToken = await subject();
      const tokenInitialSet = await rebalancingSetToken.currentSet.callAsync();
      expect(tokenInitialSet).to.equal(subjectInitialSet);
    });

    it('creates a set with the correct feeRecipient', async () => {
      rebalancingSetToken = await subject();
      const feeRecipient = await rebalancingSetToken.feeRecipient.callAsync();
      expect(feeRecipient).to.equal(subjectFeeRecipient);
    });

    it('creates a set with the correct initial unit shares', async () => {
      rebalancingSetToken = await subject();
      const tokenInitialUnitShares = await rebalancingSetToken.unitShares.callAsync();
      expect(tokenInitialUnitShares).to.be.bignumber.equal(subjectInitialUnitShares);
    });

    it('creates a set with the correct naturalUnit', async () => {
      rebalancingSetToken = await subject();
      const returnedNaturalUnit = await rebalancingSetToken.naturalUnit.callAsync();
      expect(returnedNaturalUnit).to.be.bignumber.equal(subjectNaturalUnit);
    });

    it('creates a set with the correct rebalance interval', async () => {
      rebalancingSetToken = await subject();
      const rebalancingInterval = await rebalancingSetToken.rebalanceInterval.callAsync();
      expect(rebalancingInterval).to.be.bignumber.equal(subjectRebalanceInterval);
    });

    it('creates a set with the correct rebalance fail Period', async () => {
      rebalancingSetToken = await subject();
      const rebalanceFailPeriod = await rebalancingSetToken.rebalanceFailPeriod.callAsync();
      expect(rebalanceFailPeriod).to.be.bignumber.equal(subjectFailPeriod);
    });

    it('creates a set with the correct lastRebalanceTimestamp', async () => {
      rebalancingSetToken = await subject();
      const lastRebalanceTimestamp = await rebalancingSetToken.lastRebalanceTimestamp.callAsync();
      expect(lastRebalanceTimestamp).to.be.bignumber.equal(lastRebalanceTimestamp);
    });

    it('sets the rebalancingSetToken state to Default', async () => {
      rebalancingSetToken = await subject();
      const tokenState = await rebalancingSetToken.rebalanceState.callAsync();
      expect(tokenState).to.be.bignumber.equal(SetUtils.REBALANCING_STATE.DEFAULT);
    });

    it('creates a set with the rebalanceIndex variable set to 0', async () => {
      rebalancingSetToken = await subject();
      const rebalanceIndex = await rebalancingSetToken.rebalanceIndex.callAsync();
      expect(rebalanceIndex).to.bignumber.equal(0);
    });

    it('creates a set with an empty nextSet', async () => {
      rebalancingSetToken = await subject();
      const tokenNextlSet = await rebalancingSetToken.nextSet.callAsync();
      expect(tokenNextlSet).to.equal(NULL_ADDRESS);
    });

    it('creates a set with the rebalanceStartTime variable set to 0', async () => {
      rebalancingSetToken = await subject();
      const rebalanceStartTime = await rebalancingSetToken.rebalanceStartTime.callAsync();
      expect(rebalanceStartTime).to.be.bignumber.equal(0);
    });

    it('creates a set with the the correct entryFee', async () => {
      rebalancingSetToken = await subject();
      const entryFee = await rebalancingSetToken.entryFee.callAsync();
      expect(entryFee).to.be.bignumber.equal(subjectEntryFee);
    });

    it('creates a set with the the correct rebalanceFeeCalculator', async () => {
      rebalancingSetToken = await subject();
      const rebalanceFeeCalculator = await rebalancingSetToken.rebalanceFeeCalculator.callAsync();
      expect(rebalanceFeeCalculator).to.equal(subjectRebalanceFeeCalculator);
    });

    it('creates a set with the hasBidded variable set to false', async () => {
      rebalancingSetToken = await subject();
      const hasBidded = await rebalancingSetToken.hasBidded.callAsync();
      expect(hasBidded).to.equal(false);
    });

    it('creates a set with the proposalPeriod to 0', async () => {
      rebalancingSetToken = await subject();
      const proposalPeriod = await rebalancingSetToken.proposalPeriod.callAsync();
      expect(proposalPeriod).to.bignumber.equal(0);
    });

    it('creates a set with the proposalStartTime to 0', async () => {
      rebalancingSetToken = await subject();
      const startTime = await rebalancingSetToken.proposalStartTime.callAsync();
      expect(startTime).to.bignumber.equal(0);
    });

    it('creates a set with the auctionLibrary to 0', async () => {
      rebalancingSetToken = await subject();
      const auctionLibrary = await rebalancingSetToken.auctionLibrary.callAsync();
      expect(auctionLibrary).to.equal(NULL_ADDRESS);
    });
  });

  describe('#initialize', async () => {
    let subjectRebalanceFeeCalldata: string;
    let subjectCaller: Address;

    let fee: BigNumber;

    beforeEach(async () => {
      fee = ether(1);

      subjectRebalanceFeeCalldata = feeCalculatorHelper.generateFixedRebalanceFeeCallData(fee);

      await coreMock.addSet.sendTransactionAsync(rebalancingSetToken.address, txnFrom(deployerAccount));

      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.initialize.sendTransactionAsync(
        subjectRebalanceFeeCalldata,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('calls the rebalancefeeCalculator properly', async () => {
      await subject();

      const expectedValue = await feeCalculator.fees.callAsync(rebalancingSetToken.address);
      expect(expectedValue).to.bignumber.equal(fee);
    });

    describe('when the Set has already been initialized', async () => {
      beforeEach(async () => {
        await rebalancingSetToken.initialize.sendTransactionAsync(
          subjectRebalanceFeeCalldata,
          { from: subjectCaller, gas: DEFAULT_GAS}
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#setManager', async () => {
    let subjectNewManager: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectNewManager = otherAccount,
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.setManager.sendTransactionAsync(
        subjectNewManager,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates to the new manager correctly', async () => {
      await subject();

      const expectedNewManager = await rebalancingSetToken.manager.callAsync();
      expect(subjectNewManager).to.equal(expectedNewManager);
    });

    it('emits the correct NewManagerAdded event', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedNewManagerAddedLog(
          subjectNewManager,
          subjectCaller,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the current manager', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#setEntryFee', async () => {
    let subjectNewEntryFee: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectNewEntryFee = new BigNumber(10 ** 16),
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.setEntryFee.sendTransactionAsync(
        subjectNewEntryFee,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates to the new entryFee correctly', async () => {
      await subject();

      const expectedNewFee = await rebalancingSetToken.entryFee.callAsync();
      expect(subjectNewEntryFee).to.bignumber.equal(expectedNewFee);
    });

    it('emits the correct NewEntryFeeAdded event', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedNewEntryFeeLog(
          subjectNewEntryFee,
          entryFee,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the current manager', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fee is greater than 100%', async () => {
      beforeEach(async () => {
        subjectNewEntryFee = ether(1).plus(10 ** 14);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the fee not a multiple of 1 basis point', async () => {
      beforeEach(async () => {
        subjectNewEntryFee = new BigNumber(10 ** 14).plus(1);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#setLiquidator', async () => {
    let subjectNewLiquidator: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectNewLiquidator = otherAccount,
      subjectCaller = managerAccount;

      await liquidatorWhitelist.addAddress.sendTransactionAsync(
        otherAccount,
        { from: deployerAccount, gas: DEFAULT_GAS }
      );
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.setLiquidator.sendTransactionAsync(
        subjectNewLiquidator,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates to the new liquidatorWhiteList correctly', async () => {
      await subject();

      const expectedNewLiquidator = await rebalancingSetToken.liquidator.callAsync();
      expect(subjectNewLiquidator).to.equal(expectedNewLiquidator);
    });

    it('emits the correct NewLiquidatorAdded event', async () => {
      const txHash = await subject();

      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs = getExpectedNewLiquidatorAddedLog(
        subjectNewLiquidator,
        liquidator,
        rebalancingSetToken.address
      );

      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the current manager', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the liquidator is not whitelisted', async () => {
      beforeEach(async () => {
        subjectNewLiquidator = managerAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when startRebalance is called from Rebalance State', async () => {
      beforeEach(async () => {
        const nextSetTokenComponentAddresses = await nextSetToken.getComponents.callAsync();
        await coreHelper.addTokensToWhiteList(nextSetTokenComponentAddresses, rebalancingComponentWhiteList);

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
  });

  describe('#setFeeRecipient', async () => {
    let subjectFeeRecipient: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectFeeRecipient = otherAccount,
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string> {
      return rebalancingSetToken.setFeeRecipient.sendTransactionAsync(
        subjectFeeRecipient,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('updates to the new liquidatorWhiteList correctly', async () => {
      await subject();

      const expectedNewLiquidator = await rebalancingSetToken.feeRecipient.callAsync();
      expect(subjectFeeRecipient).to.equal(expectedNewLiquidator);
    });

    it('emits the correct NewLiquidatorAdded event', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedNewFeeRecipientAddedLog(
          subjectFeeRecipient,
          feeRecipient,
          rebalancingSetToken.address
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the current manager', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#getComponents', async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<string[]> {
      return rebalancingSetToken.getComponents.callAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('returns the correct component array', async () => {
      const components = await subject();

      expect([initialSetToken.address]).to.deep.equal(components);
    });
  });

  describe('#getUnits', async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      subjectCaller = managerAccount;
    });

    async function subject(): Promise<BigNumber[]> {
      return rebalancingSetToken.getUnits.callAsync(
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('returns the correct unit array', async () => {
      const units = await subject();

      expect(1).to.equal(units.length);
      expect(initialUnitShares).to.be.bignumber.equal(units[0]);
    });
  });

  describe('#tokenIsComponent', async () => {
    let subjectCaller: Address;
    let subjectComponent: Address;

    beforeEach(async () => {
      subjectCaller = managerAccount;
      subjectComponent = initialSetToken.address;
    });

    async function subject(): Promise<boolean> {
      return rebalancingSetToken.tokenIsComponent.callAsync(
        subjectComponent,
        { from: subjectCaller, gas: DEFAULT_GAS}
      );
    }

    it('returns true', async () => {
      const isComponentOfSet = await subject();

      expect(isComponentOfSet).to.equal(true);
    });

    describe('when the subject token is not a component', async () => {
      beforeEach(async () => {
        subjectComponent = fakeTokenAccount;
      });

      it('returns false', async () => {
        const isComponentOfSet = await subject();

        expect(isComponentOfSet).to.equal(false);
      });
    });
  });
});
