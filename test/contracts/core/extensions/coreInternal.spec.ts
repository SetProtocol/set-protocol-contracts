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
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { STANDARD_NATURAL_UNIT, DEFAULT_AUCTION_PRICE_DENOMINATOR } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
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
    zeroExWrapperAddress,
    moduleAccount,
  ] = accounts;

  let core: CoreContract;
  let priceLibrary: LinearAuctionPriceCurveContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);
  const rebalancingWrapper = new RebalancingWrapper(ownerAccount, coreWrapper, erc20Wrapper, blockchain);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    core = await coreWrapper.deployCoreAndDependenciesAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#addFactory', async () => {
    let subjectCaller: Address;
    let subjectFactoryAddress: Address;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

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
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

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
  });

  describe('#addExchange', async () => {
    let subjectCaller: Address;
    let subjectExchangeId: BigNumber;
    let subjectExchangeAddress: Address;

    beforeEach(async () => {
      subjectCaller = ownerAccount;
      subjectExchangeId = new BigNumber(SetUtils.EXCHANGES.ZERO_EX);
      subjectExchangeAddress = zeroExWrapperAddress;
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

      const exchangeAddress = await core.exchanges.callAsync(subjectExchangeId);
      expect(exchangeAddress).to.eql(subjectExchangeAddress);
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
  });

  describe('#removeExchange', async () => {
    let subjectCaller: Address;
    let subjectExchangeId: BigNumber;
    let exchangeAddress: Address;

    beforeEach(async () => {
      subjectCaller = ownerAccount;
      subjectExchangeId = new BigNumber(SetUtils.EXCHANGES.ZERO_EX);
      exchangeAddress = zeroExWrapperAddress;

      await core.addExchange.sendTransactionAsync(
        subjectExchangeId,
        exchangeAddress,
        { from: subjectCaller },
      );
    });

    async function subject(): Promise<string> {
      return core.removeExchange.sendTransactionAsync(
        subjectExchangeId,
        { from: subjectCaller },
      );
    }

    it('sets exchange address correctly', async () => {
      await subject();

      const exchangeAddress = await core.exchanges.callAsync(subjectExchangeId);
      expect(exchangeAddress).to.eql(NULL_ADDRESS);
    });

    it('emits a ExchangeREmoved event', async () => {
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
  });

  describe('#disableSet', async () => {
    let setToken: SetTokenContract;
    let subjectCaller: Address;
    let subjectSet: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      subjectCaller = ownerAccount;

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
      await subject();

      const approvedSetTokens = await core.setTokens.callAsync();
      expect(approvedSetTokens).to.not.include(setToken.address);
      expect(approvedSetTokens.length).to.equal(0);
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

      it('should not add the Set to the disabled Set list', async () => {
        await subject();

        const isSetDisabled = await core.disabledSets.callAsync(subjectSet);
        expect(isSetDisabled).to.be.false;
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
    let setToken: SetTokenContract;
    let subjectCaller: Address;
    let subjectSet: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      subjectCaller = ownerAccount;

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

      await core.disableSet.sendTransactionAsync(
        subjectSet,
        { from: subjectCaller },
      );
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
      await subject();

      const approvedSetTokens = await core.setTokens.callAsync();
      expect(approvedSetTokens).to.include(setToken.address);
      expect(approvedSetTokens.length).to.equal(1);
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

      it('should not add the Set to the tracked Set list', async () => {
        await subject();

        const isSetValid = await core.validSets.callAsync(subjectSet);
        expect(isSetValid).to.be.false;
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
    let subjectCaller: Address;
    let subjectPriceLibrary: Address;

    beforeEach(async () => {
      priceLibrary = await rebalancingWrapper.deployLinearAuctionPriceCurveAsync(DEFAULT_AUCTION_PRICE_DENOMINATOR);

      subjectCaller = ownerAccount;
      subjectPriceLibrary = priceLibrary.address;
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
    let subjectCaller: Address;
    let subjectPriceLibrary: Address;

    beforeEach(async () => {
      priceLibrary = await rebalancingWrapper.deployLinearAuctionPriceCurveAsync(DEFAULT_AUCTION_PRICE_DENOMINATOR);

      subjectCaller = ownerAccount;
      subjectPriceLibrary = priceLibrary.address;

      await core.addPriceLibrary.sendTransactionAsync(
        subjectPriceLibrary,
        { from: subjectCaller },
      );
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
  });
});
