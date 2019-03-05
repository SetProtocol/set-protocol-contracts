require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Log } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  FactoryAdded,
  FactoryRemoved,
  ExchangeAdded,
  ExchangeRemoved,
  ModuleAdded,
  ModuleRemoved,
  SetDisabled,
  SetReenabled,
  PriceLibraryAdded,
  PriceLibraryRemoved,
} from '@utils/contract_logs/core';
import {
  LinearAuctionPriceCurveContract,
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { STANDARD_NATURAL_UNIT } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { ExchangeWrapper } from '@utils/wrappers/exchangeWrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const setTestUtils = new SetTestUtils(web3);
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');
const { NULL_ADDRESS } = SetUtils.CONSTANTS;


contract('CoreInternal', accounts => {
  const [
    ownerAccount,
    otherAccount,
    moduleAccount,
  ] = accounts;

  let core: CoreContract;
  let priceLibrary: LinearAuctionPriceCurveContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const exchangeWrapper = new ExchangeWrapper(ownerAccount);
  const rebalancingWrapper = new RebalancingWrapper(ownerAccount, coreWrapper, erc20Wrapper, blockchain);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    core = await coreWrapper.getDeployedCoreAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#addFactory', async () => {
    let subjectCaller: Address;
    let subjectFactoryAddress: Address;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.getDeployedSetTokenFactoryAsync();

      subjectFactoryAddress = setTokenFactory.address;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.addFactory.sendTransactionAsync(
        subjectFactoryAddress,
        { from: subjectCaller },
      );
    }

    it('adds setTokenFactory address to mapping correctly', async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
      expect(isFactoryValid).to.be.true;
    });

    it('adds factory address to factories array', async () => {
      const currentFactories = await core.factories.callAsync();
      const currentFactoriesCount = currentFactories.length;

      await subject();

      const factories = await core.factories.callAsync();
      expect(factories).to.include(subjectFactoryAddress);

      const expectApprovedFactoriesCount = currentFactoriesCount + 1;
      expect(factories.length).to.equal(expectApprovedFactoriesCount);
    });

    it('emits a FactoryAdded event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        FactoryAdded(
          core.address,
          subjectFactoryAddress,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#removeFactory', async () => {
    let subjectCaller: Address;
    let subjectFactoryAddress: Address;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.getDeployedSetTokenFactoryAsync();

      subjectFactoryAddress = setTokenFactory.address;
      subjectCaller = ownerAccount;

      await core.addFactory.sendTransactionAsync(
        subjectFactoryAddress,
        { from: subjectCaller },
      );
    });

    async function subject(): Promise<string> {
      return core.removeFactory.sendTransactionAsync(
        subjectFactoryAddress,
        { from: subjectCaller },
      );
    }

    it('removes setTokenFactory address to mapping correctly', async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
      expect(isFactoryValid).to.be.false;
    });

    it('removes factory address from factories array', async () => {
      const currentApprovedFactories = await core.factories.callAsync();
      const currentFactoriesCount = currentApprovedFactories.length;

      await subject();

      const factories = await core.factories.callAsync();
      expect(factories).to.include(subjectFactoryAddress);

      const expectApprovedFactoriesCount = currentFactoriesCount - 1;
      expect(factories.length).to.equal(expectApprovedFactoriesCount);
    });

    it('emits a FactoryRemoved event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        FactoryRemoved(
          core.address,
          subjectFactoryAddress,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the factory is not already approved', async () => {
      beforeEach(async () => {
        subjectFactoryAddress = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#addModule', async () => {
    let subjectCaller: Address;
    let subjectModuleAddress: Address;

    beforeEach(async () => {
      subjectModuleAddress = moduleAccount;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.addModule.sendTransactionAsync(
        subjectModuleAddress,
        { from: subjectCaller },
      );
    }

    it('adds module address to mapping correctly', async () => {
      await subject();

      const isModuleValid = await core.validModules.callAsync(subjectModuleAddress);
      expect(isModuleValid).to.be.true;
    });

    it('adds module address to modules array', async () => {
      const currentApprovedModules = await core.modules.callAsync();
      const currentApprovedModulesCount = currentApprovedModules.length;

      await subject();

      const modules = await core.modules.callAsync();
      expect(modules).to.include(subjectModuleAddress);

      const expectModulesCount = currentApprovedModulesCount + 1;
      expect(modules.length).to.equal(expectModulesCount);
    });

    it('emits a ModuleAdded event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        ModuleAdded(
          core.address,
          subjectModuleAddress,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#removeModule', async () => {
    let subjectCaller: Address;
    let subjectModuleAddress: Address;

    beforeEach(async () => {
      subjectModuleAddress = moduleAccount;
      subjectCaller = ownerAccount;

      await core.addModule.sendTransactionAsync(
        subjectModuleAddress,
        { from: subjectCaller },
      );
    });

    async function subject(): Promise<string> {
      return core.removeModule.sendTransactionAsync(
        subjectModuleAddress,
        { from: subjectCaller },
      );
    }

    it('removes module address from mapping correctly', async () => {
      await subject();

      const isModuleValid = await core.validModules.callAsync(moduleAccount);
      expect(isModuleValid).to.be.false;
    });

    it('removes module address from modules array', async () => {
      const currentApprovedModules = await core.modules.callAsync();
      const currentApprovedModuleCount = currentApprovedModules.length;

      await subject();

      const modules = await core.modules.callAsync();
      expect(modules).to.not.include(subjectModuleAddress);

      const expectModulesCount = currentApprovedModuleCount - 1;
      expect(modules.length).to.equal(expectModulesCount);
    });

    it('emits a ModuleRemoved event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        ModuleRemoved(
          core.address,
          subjectModuleAddress,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the module is not already approved', async () => {
      beforeEach(async () => {
        subjectModuleAddress = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#addExchange', async () => {
    let subjectExchangeId: BigNumber;
    let subjectExchangeAddress: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      const exchangeId = new BigNumber(SetUtils.EXCHANGES.ZERO_EX);

      // Remove existing ZeroExExchangeWrapper first
      const zeroExExchangeWrapper = await exchangeWrapper.getDeployedZeroExExchangeWrapper();
      await core.removeExchange.sendTransactionAsync(
        exchangeId,
        zeroExExchangeWrapper.address,
        { from: ownerAccount },
      );

      subjectExchangeId = exchangeId;
      subjectExchangeAddress = zeroExExchangeWrapper.address;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.addExchange.sendTransactionAsync(
        subjectExchangeId,
        subjectExchangeAddress,
        { from: subjectCaller },
      );
    }

    it('sets exchange address correctly', async () => {
      await subject();

      const exchangeAddress = await core.exchangeIds.callAsync(subjectExchangeId);
      expect(exchangeAddress).to.eql(subjectExchangeAddress);
    });

    it('adds exchange address to exchanges array', async () => {
      const currentApprovedExchanges = await core.exchanges.callAsync();
      const currentApprovedExchangesCount = currentApprovedExchanges.length;

      await subject();

      const exchanges = await core.exchanges.callAsync();
      expect(exchanges).to.include(subjectExchangeAddress);

      const expectApprovedExchangesCount = currentApprovedExchangesCount + 1;
      expect(exchanges.length).to.equal(expectApprovedExchangesCount);
    });

    it('emits a ExchangeAdded event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        ExchangeAdded(
          core.address,
          subjectExchangeId,
          subjectExchangeAddress,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the exchange ID has already been registered', async () => {
      const alreadySetExchangeAddress = otherAccount;

      beforeEach(async () => {
        await core.addExchange.sendTransactionAsync(
          subjectExchangeId,
          alreadySetExchangeAddress,
          { from: subjectCaller },
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#removeExchange', async () => {
    let subjectCaller: Address;
    let subjectExchangeId: BigNumber;
    let subjectExchangeAddress: Address;

    beforeEach(async () => {
      const zeroExExchangeWrapper = await exchangeWrapper.getDeployedZeroExExchangeWrapper();

      subjectCaller = ownerAccount;
      subjectExchangeId = new BigNumber(SetUtils.EXCHANGES.ZERO_EX);
      subjectExchangeAddress = zeroExExchangeWrapper.address;
    });

    async function subject(): Promise<string> {
      return core.removeExchange.sendTransactionAsync(
        subjectExchangeId,
        subjectExchangeAddress,
        { from: subjectCaller },
      );
    }

    it('sets exchange address correctly', async () => {
      await subject();

      const exchangeAddress = await core.exchangeIds.callAsync(subjectExchangeId);
      expect(exchangeAddress).to.eql(NULL_ADDRESS);
    });

    it('removes exchange address from exchanges array', async () => {
      const previousExchanges = await core.exchanges.callAsync();
      const previousExchangesCount = previousExchanges.length;

      await subject();

      const exchanges = await core.exchanges.callAsync();
      expect(exchanges).to.not.include(subjectExchangeAddress);

      const expectedExchangeCount = previousExchangesCount - 1;
      expect(exchanges.length).to.equal(expectedExchangeCount);
    });

    it('emits a ExchangeRemoved event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        ExchangeRemoved(
          core.address,
          subjectExchangeId,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the exchange wrapper is not already approved', async () => {
      beforeEach(async () => {
        subjectExchangeId = new BigNumber(10);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the exchangeId and address do not match', async () => {
      beforeEach(async () => {
        subjectExchangeAddress = otherAccount;

      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#disableSet', async () => {
    let subjectSet: Address;
    let subjectCaller: Address;

    let setToken: SetTokenContract;

    beforeEach(async () => {
      const setTokenFactory = await coreWrapper.getDeployedSetTokenFactoryAsync();

      const components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => STANDARD_NATURAL_UNIT); // Multiple of naturalUnit

      // Create and enable an arbitrary set
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      subjectSet = setToken.address;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.disableSet.sendTransactionAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('removes from the valid Sets mapping', async () => {
      await subject();

      const isSetValid = await core.validSets.callAsync(setToken.address);
      expect(isSetValid).to.be.false;
    });

    it('is added to the disabled Sets mapping', async () => {
      await subject();

      const isSetDisabled = await core.disabledSets.callAsync(setToken.address);
      expect(isSetDisabled).to.be.true;
    });

    it('removes set address to setTokens array', async () => {
      const currentSets = await core.setTokens.callAsync();
      const currentSetsCount = currentSets.length;

      await subject();

      const sets = await core.setTokens.callAsync();
      expect(sets).to.not.include(setToken.address);

      const expectedSetsCount = currentSetsCount - 1;
      expect(sets.length).to.equal(expectedSetsCount);
    });

    it('emits a SetDisabled event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        SetDisabled(
          core.address,
          subjectSet,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when set is not a tracked Set', async () => {
      beforeEach(async () => {
        subjectSet = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#reenableSet', async () => {
    let subjectSet: Address;
    let subjectCaller: Address;

    let setToken: SetTokenContract;

    beforeEach(async () => {
      const setTokenFactory = await coreWrapper.getDeployedSetTokenFactoryAsync();

      const components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => STANDARD_NATURAL_UNIT); // Multiple of naturalUnit

      // Create and enable an arbitrary set
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      await core.disableSet.sendTransactionAsync(
        setToken.address,
        { from: ownerAccount },
      );

      subjectSet = setToken.address;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.reenableSet.sendTransactionAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('adds to the valid Sets mapping', async () => {
      await subject();

      const isSetValid = await core.validSets.callAsync(setToken.address);
      expect(isSetValid).to.be.true;
    });

    it('is removed from the disabled Sets mapping', async () => {
      await subject();

      const isSetDisabled = await core.disabledSets.callAsync(setToken.address);
      expect(isSetDisabled).to.be.false;
    });

    it('adds set address to setTokens array', async () => {
      const currentSetTokens = await core.setTokens.callAsync();
      const currentSetTokensCount = currentSetTokens.length;

      await subject();

      const sets = await core.setTokens.callAsync();
      expect(sets).to.include(setToken.address);

      const expectedSetTokenCount = currentSetTokensCount + 1;
      expect(sets.length).to.equal(expectedSetTokenCount);
    });

    it('emits a SetReenabled event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        SetReenabled(
          core.address,
          subjectSet,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when set is not a disabled Set', async () => {
      beforeEach(async () => {
        subjectSet = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#addPriceLibrary', async () => {
    let subjectPriceLibrary: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      priceLibrary = await rebalancingWrapper.getDeployedLinearAuctionPriceCurveAsync();

      await core.removePriceLibrary.sendTransactionAsync(
        priceLibrary.address,
        { from: ownerAccount },
      );

      subjectPriceLibrary = priceLibrary.address;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.addPriceLibrary.sendTransactionAsync(
        subjectPriceLibrary,
        { from: subjectCaller },
      );
    }

    it('adds priceLibrary address to mapping correctly', async () => {
      await subject();

      const isPriceLibraryValid = await core.validPriceLibraries.callAsync(subjectPriceLibrary);
      expect(isPriceLibraryValid).to.be.true;
    });

    it('adds price library address to priceLibraries array', async () => {
      const currentPriceLibraries = await core.priceLibraries.callAsync();
      const currentPriceLibrariesCount = currentPriceLibraries.length;

      await subject();

      const priceLibraries = await core.priceLibraries.callAsync();
      expect(priceLibraries).to.include(subjectPriceLibrary);

      const expectedPriceLibraryCount = currentPriceLibrariesCount + 1;
      expect(priceLibraries.length).to.equal(expectedPriceLibraryCount);
    });

    it('emits a PriceLibraryAdded event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        PriceLibraryAdded(
          core.address,
          subjectPriceLibrary,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#removePriceLibrary', async () => {
    let subjectPriceLibrary: Address;
    let subjectCaller: Address;

    beforeEach(async () => {
      priceLibrary = await rebalancingWrapper.getDeployedLinearAuctionPriceCurveAsync();

      subjectPriceLibrary = priceLibrary.address;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.removePriceLibrary.sendTransactionAsync(
        subjectPriceLibrary,
        { from: subjectCaller },
      );
    }

    it('removes priceLibrary address to mapping correctly', async () => {
      await subject();

      const isPriceLibraryValid = await core.validPriceLibraries.callAsync(subjectPriceLibrary);
      expect(isPriceLibraryValid).to.be.false;
    });

    it('removes price library address from priceLibraries array', async () => {
      const currentPriceLibraries = await core.priceLibraries.callAsync();
      const currentPriceLibrariesCount = currentPriceLibraries.length;

      await subject();

      const priceLibraries = await core.priceLibraries.callAsync();
      expect(priceLibraries).to.not.include(subjectPriceLibrary);

      const expectedPriceLibraryCount = currentPriceLibrariesCount - 1;
      expect(priceLibraries.length).to.equal(expectedPriceLibraryCount);
    });

    it('emits a PriceLibraryRemoved event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
      const expectedLogs: Log[] = [
        PriceLibraryRemoved(
          core.address,
          subjectPriceLibrary,
        ),
      ];
      await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the priceLibrary is not enabled', async () => {
      beforeEach(async () => {
        subjectPriceLibrary = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
