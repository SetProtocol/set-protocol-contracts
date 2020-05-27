require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenContract,
  SetTokenFactoryContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { ether } from '@utils/units';
import { assertTokenBalanceAsync, expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { getExpectedTransferLogs } from '@utils/contract_logs/core';
import {
  DEFAULT_GAS,
  DEPLOYED_TOKEN_QUANTITY,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO,
  ONE,
} from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const setTestUtils = new SetTestUtils(web3);
const { expect } = chai;
const blockchain = new Blockchain(web3);
const { NULL_ADDRESS } =  SetUtils.CONSTANTS;

contract('CoreModuleInteraction', accounts => {
  const [
    ownerAccount,
    otherAccount,
    moduleAccount,
    recipientAccount,
  ] = accounts;

  let core: CoreContract;
  let mockTokens: StandardTokenMockContract[] = [];
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(StandardTokenMockContract.getAbi());
    ABIDecoder.addABI(CoreContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(StandardTokenMockContract.getAbi());
    ABIDecoder.removeABI(CoreContract.getAbi());
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();

    vault = await coreHelper.deployVaultAsync();
    transferProxy = await coreHelper.deployTransferProxyAsync();
    core = await coreHelper.deployCoreAsync(transferProxy, vault);
    setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);
    await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
    await coreHelper.addModuleAsync(core, moduleAccount);
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#depositModule', async () => {
    const tokenOwner: Address = ownerAccount;
    let mockToken: StandardTokenMockContract;

    let subjectTokenAddress: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      mockToken = await erc20Helper.deployTokenAsync(tokenOwner);
      await mockToken.approve.sendTransactionAsync(
        transferProxy.address,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: tokenOwner },
      );

      subjectTokenAddress = mockToken.address;
      subjectQuantity = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = moduleAccount;
    });

    afterEach(async () => {
      subjectTokenAddress = undefined;
      subjectQuantity = undefined;
    });

    async function subject(): Promise<string> {
      return core.depositModule.sendTransactionAsync(
        ownerAccount,
        ownerAccount,
        subjectTokenAddress,
        subjectQuantity,
        { from: subjectCaller },
      );
    }

    it('transfers the correct amount of each token from the caller', async () => {
      const [existingTokenBalance] = await erc20Helper.getTokenBalances([mockToken], ownerAccount);
      const expectedNewBalance = existingTokenBalance.sub(DEPLOYED_TOKEN_QUANTITY);

      await subject();

      const [newTokenBalance] = await await erc20Helper.getTokenBalances([mockToken], ownerAccount);
      expect(newTokenBalance).to.eql(expectedNewBalance);
    });

    it('transfers the correct amount of each token to the vault', async () => {
      const [existingTokenBalance] = await erc20Helper.getTokenBalances([mockToken], vault.address);
      const expectedNewBalance = existingTokenBalance.add(DEPLOYED_TOKEN_QUANTITY);

      await subject();

      const [newTokenBalance] = await erc20Helper.getTokenBalances([mockToken], vault.address);
      expect(newTokenBalance).to.eql(expectedNewBalance);
    });

    it('increments the vault balances of the tokens of the owner by the correct amount', async () => {
      const [existingOwnerVaultBalance] = await coreHelper.getVaultBalancesForTokensForOwner(
        [mockToken.address],
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalance = existingOwnerVaultBalance.add(DEPLOYED_TOKEN_QUANTITY);

      await subject();

      const [newOwnerVaultBalance] = await coreHelper.getVaultBalancesForTokensForOwner(
        [mockToken.address],
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalance).to.bignumber.equal(expectedNewOwnerVaultBalance);
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchDepositModule', async () => {
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 3;

    let subjectTokens: Address[];
    let subjectQuantities: BigNumber[];
    let subjectCaller: Address;

    beforeEach(async () => {
      mockTokens = await erc20Helper.deployTokensAsync(tokenCount, tokenOwner);
      subjectTokens = _.map(mockTokens, token => token.address);

      const approvePromises = _.map(mockTokens, token =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);

      subjectQuantities = _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);
      subjectCaller = moduleAccount;
    });

    afterEach(async () => {
      subjectTokens = undefined;
      subjectQuantities = undefined;
    });

    async function subject(): Promise<string> {
      return core.batchDepositModule.sendTransactionAsync(
        ownerAccount,
        ownerAccount,
        subjectTokens,
        subjectQuantities,
        { from: subjectCaller },
      );
    }

    it('transfers the correct amount of each token from the caller', async () => {
      const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('transfers the correct amount of each token to the vault', async () => {
      const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('increments the vault balances of the tokens of the owner by the correct amount', async () => {
      const existingOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokens,
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokens,
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe('when the quantities array contains a zero value', async () => {
      beforeEach(async () => {
        subjectTokens = _.map(mockTokens, token => token.address);
        subjectQuantities = _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);
        subjectQuantities[tokenCount - 2] = ZERO;
      });

      it('transfers the correct amount of each token from the caller', async () => {
        const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
        const expectedNewBalances = _.map(existingTokenBalances, (balance, index) =>
          balance.sub(subjectQuantities[index]),
        );

        await subject();

        const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
        expect(newTokenBalances).to.eql(expectedNewBalances);
      });

      it('transfers the correct amount of each token to the vault', async () => {
        const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
        const expectedNewBalances = _.map(existingTokenBalances, (balance, index) =>
          balance.add(subjectQuantities[index]),
        );

        await subject();

        const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
        expect(newTokenBalances).to.eql(expectedNewBalances);
      });

      it('increments the vault balances of the tokens of the owner by the correct amount', async () => {
        const existingOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokens,
          vault,
          ownerAccount,
        );
        const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, (balance, index) =>
          balance.add(subjectQuantities[index]),
        );

        await subject();

        const newOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
          subjectTokens,
          vault,
          ownerAccount,
        );
        expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
      });

      it('only executes transfers for the non-zero components', async () => {
        const txHash = await subject();
        const formattedLogs = await setTestUtils.getLogsFromTxHash(txHash);

        const expectedLogs = getExpectedTransferLogs(
          ownerAccount,
          vault.address,
          subjectQuantities,
          subjectTokens
        );

        expect(formattedLogs).to.deep.include.members(expectedLogs);
      });
    });

    describe('when the token addresses input is empty', async () => {
      beforeEach(async () => {
        subjectTokens = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the deposit quantities input is empty', async () => {
      beforeEach(async () => {
        subjectQuantities = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token addresses input length does not match the deposit quantities input length', async () => {
      beforeEach(async () => {
        subjectTokens = [_.first(mockTokens).address];
        subjectQuantities = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when batch is called with one token', async () => {
      beforeEach(async () => {
        tokenCount = 1;
      });

      it('increments the balance of the token of the owner by the correct amount', async () => {
        const token = _.first(mockTokens);
        const existingOwnerVaultBalance = await vault.balances.callAsync(token.address, ownerAccount);

        await subject();

        const newOwnerBalance = await vault.balances.callAsync(token.address, ownerAccount);
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(DEPLOYED_TOKEN_QUANTITY));
      });
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the protocol is not in operational state', async () => {
      beforeEach(async () => {
        await coreHelper.setOperationStateAsync(
          core,
          ONE,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#withdrawModule', async () => {
    const tokenOwner: Address = ownerAccount;
    let mockToken: StandardTokenMockContract;
    let subjectToken: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      mockToken = await erc20Helper.deployTokenAsync(tokenOwner);
      subjectToken = mockToken.address;
      await mockToken.approve.sendTransactionAsync(
        transferProxy.address,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: tokenOwner },
      );
      // Deposit tokens first so they can be withdrawn
      await core.deposit.sendTransactionAsync(
        subjectToken,
        DEPLOYED_TOKEN_QUANTITY,
        { from: ownerAccount },
      );

      subjectToken = mockToken.address;
      subjectQuantity = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = moduleAccount;
    });

    afterEach(async () => {
      subjectToken = undefined;
    });

    async function subject(): Promise<string> {
      return core.withdrawModule.sendTransactionAsync(
        ownerAccount,
        ownerAccount,
        subjectToken,
        subjectQuantity,
        { from: subjectCaller },
      );
    }

    it('transfers the correct amount of each token to the caller', async () => {
      const [existingTokenBalance] = await erc20Helper.getTokenBalances([mockToken], ownerAccount);
      const expectedNewBalance = existingTokenBalance.add(DEPLOYED_TOKEN_QUANTITY);

      await subject();

      const [newTokenBalance] = await await erc20Helper.getTokenBalances([mockToken], ownerAccount);
      expect(newTokenBalance).to.eql(expectedNewBalance);
    });

    it('transfers the correct amount of each token from the vault', async () => {
      const [existingTokenBalance] = await erc20Helper.getTokenBalances([mockToken], vault.address);
      const expectedNewBalance = existingTokenBalance.sub(DEPLOYED_TOKEN_QUANTITY);

      await subject();

      const [newTokenBalance] = await erc20Helper.getTokenBalances([mockToken], vault.address);
      expect(newTokenBalance).to.eql(expectedNewBalance);
    });

    it('decrements the vault balances of the tokens of the owner by the correct amount', async () => {
      const [existingOwnerVaultBalance] = await coreHelper.getVaultBalancesForTokensForOwner(
        [subjectToken],
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalance = existingOwnerVaultBalance.sub(DEPLOYED_TOKEN_QUANTITY);

      await subject();

      const [newOwnerVaultBalance] = await coreHelper.getVaultBalancesForTokensForOwner(
        [subjectToken],
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalance).to.bignumber.equal(expectedNewOwnerVaultBalance);
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchWithdrawModule', async () => {
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 3;

    let subjectTokens: Address[];
    let subjectQuantities: BigNumber[];
    let subjectCaller: Address;

    beforeEach(async () => {
      mockTokens = await erc20Helper.deployTokensAsync(tokenCount, tokenOwner);
      subjectTokens = _.map(mockTokens, token => token.address);
      const approvePromises = _.map(mockTokens, token =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);

      // Deposit tokens first so they can be withdrawn
      await core.batchDeposit.sendTransactionAsync(
        _.map(mockTokens, token => token.address),
        _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY),
        { from: ownerAccount },
      );

      subjectQuantities = _.map(subjectTokens, () => DEPLOYED_TOKEN_QUANTITY);
      subjectCaller = moduleAccount;
    });

    afterEach(async () => {
      subjectTokens = undefined;
      subjectQuantities = undefined;
    });

    async function subject(): Promise<string> {
      return core.batchWithdrawModule.sendTransactionAsync(
        ownerAccount,
        ownerAccount,
        subjectTokens,
        subjectQuantities,
        { from: subjectCaller },
      );
    }

    it('transfers the correct amount of each token from the caller', async () => {
      const existingTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('transfers the correct amount of each token to the vault', async () => {
      const existingTokenBalances = await await erc20Helper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Helper.getTokenBalances(mockTokens, vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('decrements the vault balances of the tokens of the owner by the correct amount', async () => {
      const existingOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokens,
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newOwnerVaultBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        subjectTokens,
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe('when the token addresses input is empty', async () => {
      beforeEach(async () => {
        subjectTokens = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the withdraw quantities input is empty', async () => {
      beforeEach(async () => {
        subjectQuantities = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token addresses input length does not match the withdraw quantities input length', async () => {
      beforeEach(async () => {
        subjectTokens = [_.first(mockTokens).address];
        subjectQuantities = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when batch is called with one token', async () => {
      beforeEach(async () => {
        tokenCount = 1;
      });

      it('decrements the balance of the token of the owner by the correct amount', async () => {
        const token = _.first(mockTokens);
        const existingOwnerVaultBalance = await vault.balances.callAsync(token.address, ownerAccount);

        await subject();

        const newOwnerBalance = await vault.balances.callAsync(token.address, ownerAccount);
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(DEPLOYED_TOKEN_QUANTITY));
      });
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#issueModule: SetToken', async () => {
    let subjectIssuer: Address;
    let subjectRecipient: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;
    let subjectCaller: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(2, ownerAccount);
      await erc20Helper.approveTransfersAsync(components, transferProxy.address);

      componentAddresses = _.map(components, token => token.address);
      componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      subjectIssuer = ownerAccount;
      subjectRecipient = ownerAccount;
      subjectQuantityToIssue = ether(2);
      subjectSetToIssue = setToken.address;
      subjectCaller = moduleAccount;
    });

    async function subject(): Promise<string> {
      return core.issueModule.sendTransactionAsync(
        subjectIssuer,
        subjectRecipient,
        subjectSetToIssue,
        subjectQuantityToIssue,
        { from: subjectCaller },
      );
    }

    it('transfers the required tokens from the user', async () => {
      const component: StandardTokenMockContract = _.first(components);
      const unit: BigNumber = _.first(componentUnits);

      const existingBalance = await component.balanceOf.callAsync(ownerAccount);
      await assertTokenBalanceAsync(component, DEPLOYED_TOKEN_QUANTITY, ownerAccount);

      await subject();

      const newBalance = await component.balanceOf.callAsync(ownerAccount);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue.div(naturalUnit).mul(unit));
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it('updates the balances of the components in the vault to belong to the set token', async () => {
      const existingBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        setToken.address,
      );

      await subject();

      const expectedNewBalances = _.map(existingBalances, (balance, idx) => {
        const units = componentUnits[idx];
        return balance.add(subjectQuantityToIssue.div(naturalUnit).mul(units));
      });
      const newBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        setToken.address
      );
      expect(newBalances).to.be.bignumber.eql(expectedNewBalances);
    });

    it('does not change balances of the components in the vault for the user', async () => {
      const existingBalances = await coreHelper.getVaultBalancesForTokensForOwner(
        componentAddresses,
        vault,
        ownerAccount
      );

      await subject();

      const newBalances = await coreHelper.getVaultBalancesForTokensForOwner(componentAddresses, vault, ownerAccount);
      expect(newBalances).to.be.bignumber.eql(existingBalances);
    });

    it('mints the correct quantity of the set for the user', async () => {
      const existingBalance = await setToken.balanceOf.callAsync(subjectRecipient);

      await subject();

      await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), subjectRecipient);
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectSetToIssue = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the user does not have enough of a component', async () => {
      beforeEach(async () => {
        await _.first(components).transfer.sendTransactionAsync(
          otherAccount,
          DEPLOYED_TOKEN_QUANTITY,
          { from: ownerAccount, gas: DEFAULT_GAS },
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when a required component quantity is in the vault for the user', async () => {
      let alreadyDepositedComponent: StandardTokenMockContract;
      const alreadyDepositedQuantity: BigNumber = DEPLOYED_TOKEN_QUANTITY;
      let componentUnit: BigNumber;

      beforeEach(async () => {
        alreadyDepositedComponent = _.first(components);
        componentUnit = _.first(componentUnits);
        await coreHelper.depositFromUser(core, alreadyDepositedComponent.address, alreadyDepositedQuantity);
      });

      it('updates the vault balance of the component for the user by the correct amount', async () => {
        await subject();

        const requiredQuantityToIssue = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit);
        const expectedNewBalance = alreadyDepositedQuantity.sub(requiredQuantityToIssue);
        const newVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);
        expect(newVaultBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it('mints the correct quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });

    describe('when half of a required component quantity is in the vault for the user', async () => {
      let alreadyDepositedComponent: StandardTokenMockContract;
      let alreadyDepositedQuantity: BigNumber;
      let componentUnit: BigNumber;
      let quantityToTransfer: BigNumber;

      beforeEach(async () => {
        alreadyDepositedComponent = _.first(components);
        componentUnit = _.first(componentUnits);

        alreadyDepositedQuantity = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit).div(2);
        await coreHelper.depositFromUser(core, alreadyDepositedComponent.address, alreadyDepositedQuantity);

        quantityToTransfer = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit).sub(alreadyDepositedQuantity);
      });

      it('transfers the correct amount from the user', async () => {
        const existingBalance = await alreadyDepositedComponent.balanceOf.callAsync(ownerAccount);
        const expectedExistingBalance = DEPLOYED_TOKEN_QUANTITY.sub(alreadyDepositedQuantity);
        await assertTokenBalanceAsync(alreadyDepositedComponent, expectedExistingBalance, ownerAccount);

        await subject();

        const expectedNewBalance = existingBalance.sub(quantityToTransfer);
        const newBalance = await alreadyDepositedComponent.balanceOf.callAsync(ownerAccount);
        expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it('updates the vault balance of the component for the user by the correct amount', async () => {
        const existingVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);

        await subject();

        const expectedNewBalance = await existingVaultBalance.sub(alreadyDepositedQuantity);
        const newVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);
        expect(newVaultBalance).to.be.bignumber.eql(expectedNewBalance);
      });

      it('mints the correct quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });

    describe('when all of the required component quantites are in the vault for the user', async () => {
      const alreadyDepositedQuantity: BigNumber = DEPLOYED_TOKEN_QUANTITY;

      beforeEach(async () => {
        const depositPromises = _.map(components, component =>
          coreHelper.depositFromUser(core, component.address, alreadyDepositedQuantity),
        );
        await Promise.all(depositPromises);
      });

      it('updates the vault balance of the component for the user by the correct amount', async () => {
        const existingVaultBalancePromises = _.map(components, component =>
          vault.balances.callAsync(component.address, ownerAccount),
        );
        const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

        await subject();

        const expectedVaultBalances = _.map(components, (component, idx) => {
          const requiredQuantityToIssue = subjectQuantityToIssue.div(naturalUnit).mul(componentUnits[idx]);
          return existingVaultBalances[idx].sub(requiredQuantityToIssue);
        });

        const newVaultBalancesPromises = _.map(components, component =>
          vault.balances.callAsync(component.address, ownerAccount),
        );
        const newVaultBalances = await Promise.all(newVaultBalancesPromises);

        _.map(components, (component, idx) =>
          expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
        );
      });

      it('mints the correct quantity of the set for the user', async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        await assertTokenBalanceAsync(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });

    describe('when the protocol is not in operational state', async () => {
      beforeEach(async () => {
        await coreHelper.setOperationStateAsync(
          core,
          ONE,
        );
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#issueInVaultModule: SetToken', async () => {
    let subjectRecipient: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;
    let subjectCaller: Address;

    const naturalUnit: BigNumber = ether(2);
    const alreadyDepositedQuantity: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let components: StandardTokenMockContract[] = [];
    let componentAddresses: Address[];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(2, ownerAccount);
      await erc20Helper.approveTransfersAsync(components, transferProxy.address);

      componentAddresses = _.map(components, token => token.address);
      componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      const depositPromises = _.map(components, component =>
        coreHelper.depositFromUser(core, component.address, alreadyDepositedQuantity),
      );
      await Promise.all(depositPromises);

      subjectRecipient = ownerAccount;
      subjectQuantityToIssue = ether(2);
      subjectSetToIssue = setToken.address;
      subjectCaller = moduleAccount;
    });

    async function subject(): Promise<string> {
      return core.issueInVaultModule.sendTransactionAsync(
        subjectRecipient,
        subjectSetToIssue,
        subjectQuantityToIssue,
        { from: subjectCaller },
      );
    }

    it('updates the vault balance of the component for the recipient by the correct amount', async () => {
      const existingVaultBalancePromises = _.map(components, component =>
        vault.balances.callAsync(component.address, ownerAccount),
      );
      const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToIssue = subjectQuantityToIssue.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].sub(requiredQuantityToIssue);
      });

      const newVaultBalancesPromises = _.map(components, component =>
        vault.balances.callAsync(component.address, ownerAccount),
      );
      const newVaultBalances = await Promise.all(newVaultBalancesPromises);

      _.map(components, (component, idx) =>
        expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
      );
    });

    it('mints the correct quantity of the set for the user', async () => {
      const existingVaultBalance = await vault.getOwnerBalance.callAsync(setToken.address, subjectCaller);

      await subject();

      const newVaultBalance = await vault.getOwnerBalance.callAsync(setToken.address, subjectCaller);
      const expectedVaultBalance = existingVaultBalance.add(newVaultBalance);
      expect(newVaultBalance).to.be.bignumber.eql(expectedVaultBalance);
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectSetToIssue = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#redeemModule', async () => {
    let subjectRedeemer: Address;
    let subjectQuantityToRedeem: BigNumber;
    let subjectSetToRedeem: Address;
    let subjectCaller: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      components = await erc20Helper.deployTokensAsync(2, ownerAccount);
      await erc20Helper.approveTransfersAsync(components, transferProxy.address);

      const componentAddresses = _.map(components, token => token.address);
      componentUnits = _.map(components, () => naturalUnit.mul(2)); // Multiple of naturalUnit
      setToken = await coreHelper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      await coreHelper.issueSetTokenAsync(core, setToken.address, naturalUnit);

      subjectRedeemer = ownerAccount;
      subjectQuantityToRedeem = naturalUnit;
      subjectSetToRedeem = setToken.address;
      subjectCaller = moduleAccount;
    });

    async function subject(): Promise<string> {
      return core.redeemModule.sendTransactionAsync(
        subjectRedeemer,
        subjectRedeemer,
        subjectSetToRedeem,
        subjectQuantityToRedeem,
        { from: subjectCaller },
      );
    }

    it('increments the balances of the tokens back to the user in vault', async () => {
      const existingVaultBalancePromises = _.map(components, component =>
        vault.balances.callAsync(component.address, ownerAccount),
      );
      const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].add(requiredQuantityToRedeem);
      });

      const newVaultBalancesPromises = _.map(components, component =>
        vault.balances.callAsync(component.address, ownerAccount),
      );
      const newVaultBalances = await Promise.all(newVaultBalancesPromises);

      _.map(components, (component, idx) =>
        expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
      );
    });

    it('decrements the balance of the tokens owned by set in vault', async () => {
      const existingVaultBalancePromises = _.map(components, component =>
        vault.balances.callAsync(component.address, subjectSetToRedeem),
      );
      const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].sub(requiredQuantityToRedeem);
      });

      const newVaultBalancesPromises = _.map(components, component =>
        vault.balances.callAsync(component.address, subjectSetToRedeem),
      );
      const newVaultBalances = await Promise.all(newVaultBalancesPromises);

      _.map(components, (component, idx) =>
        expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx]),
      );
    });

    it('decrements the balance of the set tokens owned by owner', async () => {
      const existingSetBalance = await setToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const expectedSetBalance = existingSetBalance.sub(subjectQuantityToRedeem);
      const newSetBalance = await setToken.balanceOf.callAsync(ownerAccount);
      expect(newSetBalance).to.be.bignumber.equal(expectedSetBalance);
    });

    describe('when the set was not created through core', async () => {
      beforeEach(async () => {
        subjectSetToRedeem = NULL_ADDRESS;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the user does not have enough of a set', async () => {
      beforeEach(async () => {
        subjectQuantityToRedeem = ether(3);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the quantity is not a multiple of the natural unit of the set', async () => {
      beforeEach(async () => {
        subjectQuantityToRedeem = ether(1.5);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchIncrementTokenOwnerModule', async () => {
    let subjectTokens: Address[];
    let subjectOwner: Address;
    let subjectQuantities: BigNumber[];
    let subjectCaller: Address;

     beforeEach(async () => {
      subjectTokens = (await erc20Helper.deployTokensAsync(2, ownerAccount)).map(token => token.address);
      subjectOwner = otherAccount;
      subjectQuantities = [new BigNumber(10), new BigNumber(20)];
      subjectCaller = moduleAccount;
    });

    async function subject(): Promise<string> {
      return core.batchIncrementTokenOwnerModule.sendTransactionAsync(
        subjectTokens,
        subjectOwner,
        subjectQuantities,
        { from: subjectCaller },
      );
    }

    it('should increment the balances of the tokens properly', async () => {
      const [token1, token2] = subjectTokens;

      const preToken1Vault = await vault.getOwnerBalance.callAsync(token1, subjectOwner);
      const preToken2Vault = await vault.getOwnerBalance.callAsync(token2, subjectOwner);

      await subject();

      const [token1IncrementQuantity, token2IncrementQuantity] = subjectQuantities;

      const token1Vault = await vault.getOwnerBalance.callAsync(token1, subjectOwner);
      const token2Vault = await vault.getOwnerBalance.callAsync(token2, subjectOwner);

      const expectedToken1 = token1Vault.sub(preToken1Vault);
      const expectedToken2 = token2Vault.sub(preToken2Vault);

      expect(expectedToken1).to.bignumber.equal(token1IncrementQuantity);
      expect(expectedToken2).to.bignumber.equal(token2IncrementQuantity);
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchDecrementTokenOwnerModule', async () => {
    let subjectTokens: Address[];
    let subjectOwner: Address;
    let subjectQuantities: BigNumber[];
    let subjectCaller: Address;

    const initialIncrementedQuantities = [new BigNumber(100), new BigNumber(100)];

     beforeEach(async () => {
      subjectTokens = (await erc20Helper.deployTokensAsync(2, ownerAccount)).map(token => token.address);
      subjectOwner = otherAccount;
      subjectCaller = moduleAccount;

      await coreHelper.addAuthorizationAsync(vault, subjectCaller);
      await vault.batchIncrementTokenOwner.sendTransactionAsync(
        subjectTokens,
        subjectOwner,
        initialIncrementedQuantities,
        { from: subjectCaller },
      );

      subjectQuantities = [new BigNumber(10), new BigNumber(20)];
    });

    async function subject(): Promise<string> {
      return core.batchDecrementTokenOwnerModule.sendTransactionAsync(
        subjectTokens,
        subjectOwner,
        subjectQuantities,
        { from: subjectCaller },
      );
    }

    it('should decrement the balances of the tokens properly', async () => {
      await subject();

      const [token1, token2] = subjectTokens;
      const [token1DecrementQuantity, token2DecrementQuantity] = subjectQuantities;

      const token1Vault = await vault.getOwnerBalance.callAsync(token1, subjectOwner);
      const token2Vault = await vault.getOwnerBalance.callAsync(token2, subjectOwner);

      const expectedToken1 = initialIncrementedQuantities[0].sub(token1Vault);
      const expectedToken2 = initialIncrementedQuantities[1].sub(token2Vault);

      expect(expectedToken1).to.bignumber.equal(token1DecrementQuantity);
      expect(expectedToken2).to.bignumber.equal(token2DecrementQuantity);

    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchTransferBalanceModule', async () => {
    let subjectTokens: Address[];
    let subjectFrom: Address;
    let subjectTo: Address;
    let subjectQuantities: BigNumber[];
    let subjectCaller: Address;

    const initialIncrementedQuantities = [new BigNumber(100), new BigNumber(100)];

     beforeEach(async () => {
      subjectTokens = (await erc20Helper.deployTokensAsync(2, ownerAccount)).map(token => token.address);
      subjectFrom = otherAccount;
      subjectTo = recipientAccount;
      subjectCaller = moduleAccount;

      await coreHelper.addAuthorizationAsync(vault, subjectCaller);
      await vault.batchIncrementTokenOwner.sendTransactionAsync(
        subjectTokens,
        subjectFrom,
        initialIncrementedQuantities,
        { from: subjectCaller },
      );

      subjectQuantities = [new BigNumber(10), new BigNumber(20)];
    });

    async function subject(): Promise<string> {
      return core.batchTransferBalanceModule.sendTransactionAsync(
        subjectTokens,
        subjectFrom,
        subjectTo,
        subjectQuantities,
        { from: subjectCaller },
      );
    }

    it('should decrement the senders quantities correctly', async () => {
      await subject();

      const [token1, token2] = subjectTokens;
      const [token1TransferQuantity, token2TransferQuantity] = subjectQuantities;
      const [token1InitialQuantity, token2InitialQuantity] = initialIncrementedQuantities;

      const token1Vault = await vault.getOwnerBalance.callAsync(token1, subjectFrom);
      const token2Vault = await vault.getOwnerBalance.callAsync(token2, subjectFrom);

      const expectedToken1Quantity = token1InitialQuantity.sub(token1TransferQuantity);
      const expectedToken2Quantity = token2InitialQuantity.sub(token2TransferQuantity);

      expect(token1Vault).to.bignumber.equal(expectedToken1Quantity);
      expect(token2Vault).to.bignumber.equal(expectedToken2Quantity);
    });

    it('should increment the recipient quantities correctly', async () => {
      await subject();

      const [token1, token2] = subjectTokens;
      const [token1TransferQuantity, token2TransferQuantity] = subjectQuantities;

      const token1Vault = await vault.getOwnerBalance.callAsync(token1, subjectTo);
      const token2Vault = await vault.getOwnerBalance.callAsync(token2, subjectTo);

      expect(token1Vault).to.bignumber.equal(token1TransferQuantity);
      expect(token2Vault).to.bignumber.equal(token2TransferQuantity);
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#transferModule', async () => {
    let subjectToken: Address;
    let subjectFrom: Address;
    let subjectTo: Address;
    let subjectQuantity: BigNumber;
    let subjectCaller: Address;

    let subjectTokenContract;

     beforeEach(async () => {
      subjectTokenContract = await erc20Helper.deployTokenAsync(otherAccount);

      subjectToken = subjectTokenContract.address;
      subjectFrom = otherAccount;
      subjectTo = recipientAccount;
      subjectCaller = moduleAccount;

      await subjectTokenContract.approve.sendTransactionAsync(
        transferProxy.address,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: otherAccount },
      );

      subjectQuantity = new BigNumber(10);
    });

    async function subject(): Promise<string> {
      return core.transferModule.sendTransactionAsync(
        subjectToken,
        subjectQuantity,
        subjectFrom,
        subjectTo,
        { from: subjectCaller },
      );
    }

    it('should increment the recipient quantities correctly', async () => {
      await subject();

      const expectedQuantity = await subjectTokenContract.balanceOf.callAsync(subjectTo);

      expect(expectedQuantity).to.bignumber.equal(subjectQuantity);
    });

    it('should decrement the recipient quantities correctly', async () => {
      const initialBalance = await subjectTokenContract.balanceOf.callAsync(subjectFrom);

      await subject();

      const finalBalance = await subjectTokenContract.balanceOf.callAsync(subjectFrom);

      const decrementedAmount = initialBalance.sub(finalBalance);
      expect(decrementedAmount).to.bignumber.equal(subjectQuantity);
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchTransferModule', async () => {
    let subjectTokens: Address[];
    let subjectFrom: Address;
    let subjectTo: Address;
    let subjectQuantities: BigNumber[];
    let subjectCaller: Address;

    let subjectTokenContracts: StandardTokenMockContract[];

     beforeEach(async () => {
      subjectTokenContracts = await erc20Helper.deployTokensAsync(2, otherAccount);

      subjectTokens = subjectTokenContracts.map(token => token.address);
      subjectFrom = otherAccount;
      subjectTo = recipientAccount;
      subjectCaller = moduleAccount;

      await subjectTokenContracts[0].approve.sendTransactionAsync(
        transferProxy.address,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: otherAccount },
      );

      await subjectTokenContracts[1].approve.sendTransactionAsync(
        transferProxy.address,
        UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
        { from: otherAccount },
      );

      subjectQuantities = [new BigNumber(10), new BigNumber(20)];
    });

    async function subject(): Promise<string> {
      return core.batchTransferModule.sendTransactionAsync(
        subjectTokens,
        subjectQuantities,
        subjectFrom,
        subjectTo,
        { from: subjectCaller },
      );
    }

    it('should increment the recipient quantities correctly', async () => {
      await subject();

      const [token1Contract, token2Contract] = subjectTokenContracts;
      const [token1Quantity, token2Quantity] = subjectQuantities;

      const token1Balance = await token1Contract.balanceOf.callAsync(subjectTo);
      const token2Balance = await token2Contract.balanceOf.callAsync(subjectTo);

      expect(token1Balance).to.bignumber.equal(token1Quantity);
      expect(token2Balance).to.bignumber.equal(token2Quantity);
    });

    it('should decrement the sender balance correctly', async () => {
      const [token1Contract, token2Contract] = subjectTokenContracts;
      const [token1TransferQuantity, token2TransferQuantity] = subjectQuantities;

      const initialToken1Balance = await token1Contract.balanceOf.callAsync(subjectFrom);
      const initialToken2Balance = await token2Contract.balanceOf.callAsync(subjectFrom);

      await subject();

      const finalToken1Balance = await token1Contract.balanceOf.callAsync(subjectFrom);
      const finalToken2Balance = await token2Contract.balanceOf.callAsync(subjectFrom);

      const decrementedToken1Amount = initialToken1Balance.sub(finalToken1Balance);
      const decrementedToken2Amount = initialToken2Balance.sub(finalToken2Balance);

      expect(decrementedToken1Amount).to.bignumber.equal(token1TransferQuantity);
      expect(decrementedToken2Amount).to.bignumber.equal(token2TransferQuantity);
    });

    describe('when the caller is not a module', async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });
});
