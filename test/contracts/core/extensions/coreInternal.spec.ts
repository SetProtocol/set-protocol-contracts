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
  VaultContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { STANDARD_NATURAL_UNIT, ZERO } from '@utils/constants';
import {
  ExchangeRegistered,
  FactoryRegistrationChanged,
  PriceLibraryRegistrationChanged,
  ProtocolFeeChanged,
  SetRegistrationChanged,
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

  describe('#registerSet', async () => {
    let setToken: SetTokenContract;
    let subjectCaller: Address;
    let subjectSet: Address;
    let subjectShouldEnable: boolean;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      subjectCaller = ownerAccount;
    });

    describe('when enabling a set', async () => {
      beforeEach(async () => {
        const components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
        const componentAddresses = _.map(components, token => token.address);
        const componentUnits = _.map(components, () => STANDARD_NATURAL_UNIT); // Multiple of naturalUnit

        // Create and enable an arbitrary set for branch coverage
        await coreWrapper.createSetTokenAsync(
          core,
          setTokenFactory.address,
          componentAddresses,
          componentUnits,
          STANDARD_NATURAL_UNIT,
        );

        // Create another set (unenabled) to use in our tests
        setToken = await coreWrapper.deploySetTokenAsync(
          setTokenFactory.address,
          componentAddresses,
          componentUnits,
          STANDARD_NATURAL_UNIT,
        );

        subjectSet = setToken.address;
        subjectShouldEnable = true;
      });

      async function subject(): Promise<string> {
        return core.registerSet.sendTransactionAsync(
          subjectSet,
          subjectShouldEnable,
          { from: subjectCaller },
        );
      }

      it('starts with 1 enabled set', async () => {
        const approvedSetTokens = await core.setTokens.callAsync();
        expect(approvedSetTokens.length).to.equal(1);
      });

      it('enables set address correctly', async () => {
        await subject();

        const isSetValid = await core.validSets.callAsync(setToken.address);
        expect(isSetValid).to.be.true;
      });

      it('adds set address to setTokens array', async () => {
        await subject();

        const approvedSetTokens = await core.setTokens.callAsync();
        expect(approvedSetTokens).to.include(setToken.address);
        expect(approvedSetTokens.length).to.equal(2);
      });

      it('adds set address to setTokens array only once over multiple calls', async () => {
        await subject();
        await subject();

        const isSetValid = await core.validSets.callAsync(setToken.address);
        expect(isSetValid).to.be.true;

        const approvedSetTokens = await core.setTokens.callAsync();
        expect(approvedSetTokens).to.include(setToken.address);
        expect(approvedSetTokens.length).to.equal(2);
      });

      it('emits a SetRegistrationChanged event', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
         const expectedLogs: Log[] = [
          SetRegistrationChanged(
            core.address,
            subjectSet,
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

    describe('when disabling a set', async () => {
      beforeEach(async () => {
        const components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
        const componentAddresses = _.map(components, token => token.address);
        const componentUnits = _.map(components, () => STANDARD_NATURAL_UNIT); // Multiple of naturalUnit

        // Create and enable an arbitrary set for branch coverage
        await coreWrapper.createSetTokenAsync(
          core,
          setTokenFactory.address,
          componentAddresses,
          componentUnits,
          STANDARD_NATURAL_UNIT,
        );

        // Create and enable another set to use in our tests
        setToken = await coreWrapper.createSetTokenAsync(
          core,
          setTokenFactory.address,
          componentAddresses,
          componentUnits,
          STANDARD_NATURAL_UNIT,
        );

        subjectSet = setToken.address;
        subjectShouldEnable = false;
      });

      async function subject(): Promise<string> {
        return core.registerSet.sendTransactionAsync(
          subjectSet,
          subjectShouldEnable,
          { from: subjectCaller },
        );
      }

      it('starts with 2 enabled sets', async () => {
        const approvedSetTokens = await core.setTokens.callAsync();
        expect(approvedSetTokens.length).to.equal(2);
      });

      it('disables set address correctly', async () => {
        await subject();

        const isSetValid = await core.validSets.callAsync(setToken.address);
        expect(isSetValid).to.be.false;
      });

      it('removes set address from setTokens array', async () => {
        await subject();

        const approvedSetTokens = await core.setTokens.callAsync();
        expect(approvedSetTokens).to.not.include(setToken.address);
        expect(approvedSetTokens.length).to.equal(1);
      });

      it('disables set address successfully over multiple calls', async () => {
        await subject();
        await subject();

        const isSetValid = await core.validSets.callAsync(setToken.address);
        expect(isSetValid).to.be.false;

        const approvedSetTokens = await core.setTokens.callAsync();
        expect(approvedSetTokens).to.not.include(setToken.address);
        expect(approvedSetTokens.length).to.equal(1);
      });

      it('emits a SetRegistrationChanged event', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
         const expectedLogs: Log[] = [
          SetRegistrationChanged(
            core.address,
            subjectSet,
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

  describe('#registerPriceLibrary', async () => {
    let subjectCaller: Address;
    let subjectPriceLibrary: Address;
    let subjectShouldEnable: boolean;

    beforeEach(async () => {
      priceLibrary = await rebalancingWrapper.deployLinearAuctionPriceCurveAsync();

      subjectCaller = ownerAccount;
      subjectPriceLibrary = priceLibrary.address;
      subjectShouldEnable = true;
    });

    async function subject(): Promise<string> {
      return core.registerPriceLibrary.sendTransactionAsync(
        subjectPriceLibrary,
        subjectShouldEnable,
        { from: subjectCaller },
      );
    }

    it('adds priceLibrary address to mapping correctly', async () => {
      await subject();

      const isPriceLibraryValid = await core.validPriceLibraries.callAsync(subjectPriceLibrary);
      expect(isPriceLibraryValid).to.be.true;
    });

    it('emits a PriceLibraryRegistrationChanged event', async () => {
      const txHash = await subject();
      const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

      const expectedLogs: Log[] = [
        PriceLibraryRegistrationChanged(
          core.address,
          subjectPriceLibrary,
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

    describe('when disabling an enabled price library', async () => {
      beforeEach(async () => {
        await rebalancingWrapper.registerPriceLibraryAsync(core, priceLibrary, true);

        subjectShouldEnable = false;
      });

      it('disables priceLibrary address correctly', async () => {
        await subject();

        const isPriceLibraryValid = await core.validPriceLibraries.callAsync(subjectPriceLibrary);
        expect(isPriceLibraryValid).to.be.false;
      });

      describe('when the caller is not the owner of the contract', async () => {
        beforeEach(async () => {
          subjectCaller = otherAccount;
        });

        it('should revert', async () => {
          await expectRevertError(subject());
        });
      });

      it('emits a PriceLibraryRegistrationChanged event', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs: Log[] = [
          PriceLibraryRegistrationChanged(
            core.address,
            subjectPriceLibrary,
            subjectShouldEnable,
          ),
        ];

        await SetTestUtils.assertLogEquivalence(formattedLogs, expectedLogs);
      });
    });
  });

  describe('#setProtocolFee', async () => {
    let subjectProtocolFee: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      subjectCaller = ownerAccount;
      subjectProtocolFee = new BigNumber(100);
    });

    async function subject(): Promise<string> {
      return core.setProtocolFee.sendTransactionAsync(
        subjectProtocolFee,
        { from: subjectCaller },
      );
    }

    it('changes protocol fee state variable', async () => {
      const currentFees = await core.protocolFee.callAsync();
      expect(currentFees).to.bignumber.equal(ZERO);

      await subject();

      const enabledFees = await core.protocolFee.callAsync();
      expect(enabledFees).to.bignumber.equal(subjectProtocolFee);
    });

    describe('removing the protocol fee', async () => {
      let existingProtocolFee: BigNumber;

      beforeEach(async () => {
        existingProtocolFee = new BigNumber(250);
        await core.setProtocolFee.sendTransactionAsync(
          existingProtocolFee,
          { from: subjectCaller },
        );

        subjectProtocolFee = ZERO;
      });

      it('changes protocolFee to 0', async () => {
        const currentFees = await core.protocolFee.callAsync();
        expect(currentFees).to.bignumber.equal(existingProtocolFee);

        await subject();

        const enabledFees = await core.protocolFee.callAsync();
        expect(enabledFees).to.bignumber.equal(subjectProtocolFee);
      });

      it('emits the correct FeeStatusChanged log', async () => {
        const txHash = await subject();

        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);
        const expectedLogs = ProtocolFeeChanged(
          core.address,
          subjectCaller,
          subjectProtocolFee,
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

  describe('#setProtocolFeeRecipient', async () => {
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
      return core.setProtocolFeeRecipient.sendTransactionAsync(
        subjectProtocolAddress,
        { from: subjectCaller },
      );
    }

    it('changes protocolFee to true', async () => {
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

  describe('#setSignatureValidator', async () => {
    let subjectCaller: Address;
    let subjectSignatureValidator: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      subjectSignatureValidator = protocolAccount;
      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.setSignatureValidator.sendTransactionAsync(
        subjectSignatureValidator,
        { from: subjectCaller },
      );
    }

    it('changes the signatureValidator to the correct address', async () => {
      await subject();

      const signatureValidatorAddress = await core.signatureValidator.callAsync();
      expect(signatureValidatorAddress).to.equal(subjectSignatureValidator);
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
