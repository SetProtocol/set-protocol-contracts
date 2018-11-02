require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Log } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  LinearAuctionPriceCurveContract,
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { STANDARD_NATURAL_UNIT } from '@utils/constants';
import {
  getExpectedFeeStatusChangeLog,
  ExchangeRegistered,
  FactoryRegistrationChanged,
} from '@utils/contract_logs/core';
import { CoreWrapper } from '@utils/coreWrapper';
import { ERC20Wrapper } from '@utils/erc20Wrapper';
import { RebalancingWrapper } from '@utils/rebalancingWrapper';
import { getWeb3 } from '@utils/web3Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');


contract('CoreInternal', accounts => {
  const [
    ownerAccount,
    otherAccount,
    nonSetAccount,
    protocolAccount,
    zeroExWrapperAddress,
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

  describe('#registerFactory', async () => {
    let subjectCaller: Address;
    let subjectFactoryAddress: Address;
    let subjectShouldEnable: boolean;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);

      subjectFactoryAddress = setTokenFactory.address;
      subjectShouldEnable = true;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.registerFactory.sendTransactionAsync(
        subjectFactoryAddress,
        subjectShouldEnable,
        { from: subjectCaller },
      );
    }

    it('adds setTokenFactory address to mapping correctly', async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
      expect(isFactoryValid).to.be.true;
    });

    it('emits a FactoryRegistrationChanged event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

      const expectedLogs: Log[] = [
        FactoryRegistrationChanged(
          core.address,
          subjectFactoryAddress,
          subjectShouldEnable,
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

    describe('when disabling a factory', async () => {
      beforeEach(async () => {
        await coreWrapper.registerFactoryAsync(core, setTokenFactory, true);

        subjectShouldEnable = false;
      });

      it('disables setTokenFactory address correctly', async () => {
        await subject();

        const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
        expect(isFactoryValid).to.be.false;
      });

      it('emits a FactoryRegistrationChanged event', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs: Log[] = [
          FactoryRegistrationChanged(
            core.address,
            subjectFactoryAddress,
            subjectShouldEnable,
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

  describe('#registerExchange', async () => {
    let subjectCaller: Address;
    let subjectExchangeId: BigNumber;
    let subjectExchangeAddress: Address;

    beforeEach(async () => {
      subjectCaller = ownerAccount;
      subjectExchangeId = new BigNumber(SetUtils.EXCHANGES.ZERO_EX);
      subjectExchangeAddress = zeroExWrapperAddress;
    });

    async function subject(): Promise<string> {
      return core.registerExchange.sendTransactionAsync(
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

    it('emits a IssuanceComponentDeposited event for each component deposited', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

      const expectedLogs: Log[] = [
        ExchangeRegistered(
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

  describe('#disableSet', async () => {
    let setToken: SetTokenContract;
    let subjectCaller: Address;
    let subjectSet: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      const components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      const componentAddresses = _.map(components, token => token.address);
      const componentUnits = _.map(components, () => STANDARD_NATURAL_UNIT); // Multiple of naturalUnit

      // Deploy another Set for branch coverage
      await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      subjectCaller = ownerAccount;
      subjectSet = setToken.address;
    });

    async function subject(): Promise<string> {
      return core.disableSet.sendTransactionAsync(
        subjectSet,
        { from: subjectCaller },
      );
    }

    it('disables set token address correctly', async () => {
      await subject();

      const isSetValid = await core.validSets.callAsync(setToken.address);
      expect(isSetValid).to.be.false;
    });

    it('removes setToken address from setTokens array', async () => {
      await subject();

      const approvedSetTokens = await core.setTokens.callAsync();
      expect(approvedSetTokens).to.not.include(setToken.address);
      expect(approvedSetTokens.length).to.equal(1);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the Set is not enabled or valid', async () => {
      beforeEach(async () => {
        subjectSet = nonSetAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#setPriceLibraryEnabled', async () => {
    let subjectCaller: Address;
    let subjectPriceLibrary: Address;
    let subjectEnabled: boolean;

    beforeEach(async () => {
      priceLibrary = await rebalancingWrapper.deployLinearAuctionPriceCurveAsync();

      subjectCaller = ownerAccount;
      subjectPriceLibrary = priceLibrary.address;
      subjectEnabled = true;
    });

    async function subject(): Promise<string> {
      return core.setPriceLibraryEnabled.sendTransactionAsync(
        subjectPriceLibrary,
        subjectEnabled,
        { from: subjectCaller },
      );
    }

    it('adds priceLibrary address to mapping correctly', async () => {
      await subject();

      const isPriceLibraryValid = await core.validPriceLibraries.callAsync(subjectPriceLibrary);
      expect(isPriceLibraryValid).to.be.true;
    });

    it('adds priceLibrary address to priceLibraries array correctly', async () => {
      await subject();

      const priceLibraries = await core.priceLibraries.callAsync();
      expect(priceLibraries).to.include(subjectPriceLibrary);
    });

    describe('when the caller is not the owner of the contract', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when disabling an enabled price library', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.setPriceLibraryEnabledAsync(core, priceLibrary, true);

        subjectEnabled = false;
      });

      it('disables priceLibrary address correctly', async () => {
        await subject();

        const isPriceLibraryValid = await core.validPriceLibraries.callAsync(subjectPriceLibrary);
        expect(isPriceLibraryValid).to.be.false;
      });

      it('removes priceLibrary address from priceLibraries array', async () => {
        await subject();

        const priceLibraries = await core.priceLibraries.callAsync();
        expect(priceLibraries).to.not.include(subjectPriceLibrary);
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

  describe('#setFeesEnabled', async () => {
    let subjectEnable: boolean;
    let subjectCaller: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      subjectCaller = ownerAccount;
      subjectEnable = true;
    });

    async function subject(): Promise<string> {
      return core.setFeesEnabled.sendTransactionAsync(
        subjectEnable,
        { from: subjectCaller },
      );
    }

    it('changes feesEnabled to true', async () => {
      const currentFees = await core.feesEnabled.callAsync();
      expect(currentFees).to.be.false;

      await subject();

      const enabledFees = await core.feesEnabled.callAsync();
      expect(enabledFees).to.be.true;
    });

    describe('when you want to change back to false', async () => {
      beforeEach(async () => {
        await core.setFeesEnabled.sendTransactionAsync(
          true,
          { from: subjectCaller },
        );
        subjectEnable = false;
      });

      it('changes feesEnabled to false', async () => {
        const currentFees = await core.feesEnabled.callAsync();
        expect(currentFees).to.be.true;

        await subject();

        const enabledFees = await core.feesEnabled.callAsync();
        expect(enabledFees).to.be.false;
      });

      it('emits the correct FeeStatusChanged log', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = getExpectedFeeStatusChangeLog(
          core.address,
          subjectCaller,
          subjectEnable,
        );

        await SetTestUtils.assertLogEquivalence(formattedLogs, [expectedLogs]);
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

  describe('#setProtocolAddress', async () => {
    let subjectCaller: Address;
    let subjectProtocolAddress: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      subjectProtocolAddress = protocolAccount;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.setProtocolAddress.sendTransactionAsync(
        subjectProtocolAddress,
        { from: subjectCaller },
      );
    }

    it('changes feesEnabled to true', async () => {
      await subject();

      const newProtocolAddress = await core.protocolAddress.callAsync();
      expect(newProtocolAddress).to.equal(subjectProtocolAddress);
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
