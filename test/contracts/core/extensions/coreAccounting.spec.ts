import * as chai from 'chai';
import * as _ from 'lodash';

import { BigNumber } from 'bignumber.js';

// Types
import { Address } from '../../../../types/common.js';

// Contract types
import { CoreContract } from '../../../../types/generated/core';
import { SetTokenFactoryContract } from '../../../../types/generated/set_token_factory';
import { StandardTokenMockContract } from '../../../../types/generated/standard_token_mock';
import { TransferProxyContract } from '../../../../types/generated/transfer_proxy';
import { VaultContract } from '../../../../types/generated/vault';

// Core wrapper
import { CoreWrapper } from '../../../../utils/coreWrapper';
import { ERC20Wrapper } from '../../../../utils/erc20Wrapper';

// Testing Set up
import { BigNumberSetup } from '../../../../utils/bigNumberSetup';
import ChaiSetup from '../../../../utils/chaiSetup';
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

import {
  assertTokenBalance,
  expectRevertError,
} from '../../../../utils/tokenAssertions';

import {
  DEPLOYED_TOKEN_QUANTITY,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from '../../../../utils/constants';

contract('CoreAccounting', accounts => {
  const [
    ownerAccount,
    otherAccount,
  ] = accounts;

  let core: CoreContract;
  let mockToken: StandardTokenMockContract;
  let mockTokens: StandardTokenMockContract[] = [];
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync();
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  describe('#deposit', async () => {
    const tokenOwner: Address = ownerAccount;
    const approver: Address = ownerAccount;

    beforeEach(async () => {
      mockToken = await erc20Wrapper.deployTokenAsync(tokenOwner);
      await erc20Wrapper.approveTransferAsync(mockToken, transferProxy.address, approver);
    });

    let amountToDeposit = DEPLOYED_TOKEN_QUANTITY;
    let depositor: Address = ownerAccount;

    async function subject(): Promise<string> {
      return core.deposit.sendTransactionAsync(
        mockToken.address,
        amountToDeposit,
        { from: depositor },
      );
    }

    it('transfers the correct amount of tokens from the caller', async () => {
      const existingOwnerTokenBalance = await mockToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const newOwnerBalance = existingOwnerTokenBalance.sub(amountToDeposit);
      assertTokenBalance(mockToken, newOwnerBalance, ownerAccount);
    });

    it('transfers the correct amount of tokens to the vault', async () => {
      const existingVaultTokenBalance = await mockToken.balanceOf.callAsync(vault.address);

      await subject();

      const newVaultBalance = existingVaultTokenBalance.add(amountToDeposit);
      assertTokenBalance(mockToken, newVaultBalance, vault.address);
    });

    it('increments the vault balance of the token of the owner by the correct amount', async () => {
      const existingOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

      await subject();

      const newOwnerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(amountToDeposit));
    });

    describe('when the amount is zero', async () => {
      beforeEach(async () => {
        amountToDeposit = new BigNumber(0);
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the amount is not the full balance of the token for the owner', async () => {
      beforeEach(async () => {
        amountToDeposit = DEPLOYED_TOKEN_QUANTITY.div(2);
      });

      it('should transfer the correct amount from the vault to the withdrawer', async () => {
        const existingOwnerTokenBalance = await mockToken.balanceOf.callAsync(ownerAccount);
        const existingVaultTokenBalance = await mockToken.balanceOf.callAsync(vault.address);
        const existingOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

        await subject();

        const newOwnerBalance = existingOwnerTokenBalance.sub(amountToDeposit);
        assertTokenBalance(mockToken, newOwnerBalance, ownerAccount);

        const newVaultBalance = existingVaultTokenBalance.add(amountToDeposit);
        assertTokenBalance(mockToken, newVaultBalance, vault.address);

        const newOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
        expect(newOwnerVaultBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(amountToDeposit));
      });
    });

    describe('when the depositor does not have the correct balance', async () => {
      beforeEach(async () => {
        depositor = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#withdraw', async () => {
    const tokenOwner: Address = ownerAccount;
    const approver: Address = ownerAccount;
    const ownerBalanceInVault: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    beforeEach(async () => {
      mockToken = await erc20Wrapper.deployTokenAsync(tokenOwner);
      await erc20Wrapper.approveTransferAsync(mockToken, transferProxy.address, approver);
      await coreWrapper.depositFromUser(core, mockToken.address, ownerBalanceInVault);
    });

    let amountToWithdraw: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let withdrawer: Address = ownerAccount;

    async function subject(): Promise<string> {
      return core.withdraw.sendTransactionAsync(
        mockToken.address,
        amountToWithdraw,
        { from: withdrawer },
      );
    }

    it('transfers the correct amount of tokens to the caller', async () => {
      const existingOwnerTokenBalance = await mockToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const newOwnerBalance = existingOwnerTokenBalance.add(amountToWithdraw);
      assertTokenBalance(mockToken, newOwnerBalance, ownerAccount);
    });

    it('transfers the correct amount of tokens from the vault', async () => {
      const existingVaultTokenBalance = await mockToken.balanceOf.callAsync(vault.address);

      await subject();

      const newVaultBalance = existingVaultTokenBalance.sub(amountToWithdraw);
      assertTokenBalance(mockToken, newVaultBalance, vault.address);
    });

    it('increments the vault balance of the token of the owner by the correct amount', async () => {
      const existingOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

      await subject();

      const newOwnerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(amountToWithdraw));
    });

    describe('when the amount is not the full balance of the token for the owner', async () => {
      beforeEach(async () => {
        amountToWithdraw = DEPLOYED_TOKEN_QUANTITY.div(2);
      });

      it('should transfer the correct amount from the vault to the withdrawer', async () => {
        const existingOwnerTokenBalance = await mockToken.balanceOf.callAsync(ownerAccount);
        const existingVaultTokenBalance = await mockToken.balanceOf.callAsync(vault.address);
        const existingOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

        await subject();

        const newOwnerBalance = existingOwnerTokenBalance.add(amountToWithdraw);
        assertTokenBalance(mockToken, newOwnerBalance, ownerAccount);

        const newVaultBalance = existingVaultTokenBalance.sub(amountToWithdraw);
        assertTokenBalance(mockToken, newVaultBalance, vault.address);

        const newOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
        expect(newOwnerVaultBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(amountToWithdraw));
      });
    });

    describe('when the withdrawer does not have the correct balance', async () => {
      beforeEach(async () => {
        withdrawer = otherAccount;
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe('#batchDeposit', async () => {
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 1;

    beforeEach(async () => {
      mockTokens = await erc20Wrapper.deployTokensAsync(tokenCount, tokenOwner);
      const approvePromises = _.map(mockTokens, token =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);
    });

    afterEach(async () => {
      tokenAddresses = undefined;
      amountsToDeposit = undefined;
    });

    let tokenAddresses: Address[];
    let amountsToDeposit: BigNumber[];

    async function subject(): Promise<string> {
      // Initialize addresses to deployed tokens' addresses unless tokenAddresses is overwritten in test cases
      const addresses = tokenAddresses || _.map(mockTokens, token => token.address);
      // Initialize quantities to deployed tokens' quantities unless amountsToDeposit is overwritten in test cases
      const quantities = amountsToDeposit || _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);

      return core.batchDeposit.sendTransactionAsync(
        addresses,
        quantities,
        { from: ownerAccount },
      );
    }

    it('transfers the correct amount of each token from the caller', async () => {
      const existingTokenBalances = await erc20Wrapper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await await erc20Wrapper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('transfers the correct amount of each token to the vault', async () => {
      const existingTokenBalances = await erc20Wrapper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Wrapper.getTokenBalances(mockTokens, vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('increments the vault balances of the tokens of the owner by the correct amount', async () => {
      const existingOwnerVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        mockTokens,
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newOwnerVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        mockTokens,
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe('when the token addresses input is empty', async () => {
      beforeEach(async () => {
        tokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the deposit quantities input is empty', async () => {
      beforeEach(async () => {
        amountsToDeposit = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token addresses input length does not match the deposit quantities input length', async () => {
      beforeEach(async () => {
        tokenAddresses = [_.first(mockTokens).address];
        amountsToDeposit = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
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
  });

  describe('#batchWithdraw', async () => {
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 3;

    beforeEach(async () => {
      mockTokens = await erc20Wrapper.deployTokensAsync(tokenCount, tokenOwner);
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
    });

    afterEach(async () => {
      tokenAddresses = undefined;
      amountsToWithdraw = undefined;
    });

    let tokenAddresses: Address[];
    let amountsToWithdraw: BigNumber[];

    async function subject(): Promise<string> {
      // Initialize addresses to deployed tokens' addresses unless tokenAddresses is overwritten in test cases
      const addresses = tokenAddresses || _.map(mockTokens, token => token.address);
      // Initialize quantites to deployed tokens' quantities unless amountsToWithdraw is overwritten in test cases
      const quantities = amountsToWithdraw || _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);

      return core.batchWithdraw.sendTransactionAsync(
        addresses,
        quantities,
        { from: ownerAccount },
      );
    }

    it('transfers the correct amount of each token from the caller', async () => {
      const existingTokenBalances = await erc20Wrapper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Wrapper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('transfers the correct amount of each token to the vault', async () => {
      const existingTokenBalances = await await erc20Wrapper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await erc20Wrapper.getTokenBalances(mockTokens, vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it('decrements the vault balances of the tokens of the owner by the correct amount', async () => {
      const existingOwnerVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        mockTokens,
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, balance =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newOwnerVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        mockTokens,
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe('when the token addresses input is empty', async () => {
      beforeEach(async () => {
        tokenAddresses = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the withdraw quantities input is empty', async () => {
      beforeEach(async () => {
        amountsToWithdraw = [];
      });

      it('should revert', async () => {
        await expectRevertError(subject());
      });
    });

    describe('when the token addresses input length does not match the withdraw quantities input length', async () => {
      beforeEach(async () => {
        tokenAddresses = [_.first(mockTokens).address];
        amountsToWithdraw = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
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
  });
});
