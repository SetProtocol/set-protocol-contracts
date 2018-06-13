import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address } from "../types/common.js";

// Contract types
import { AuthorizableContract } from "../types/generated/authorizable";
import { CoreContract } from "../types/generated/core";
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { TransferProxyContract } from "../types/generated/transfer_proxy";
import { VaultContract } from "../types/generated/vault";

// Artifacts
const Core = artifacts.require("Core");

// Core wrapper
import { CoreWrapper } from "./utils/coreWrapper";

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  assertTokenBalance,
  expectRevertError,
} from "./utils/tokenAssertions";
import {
  STANDARD_INITIAL_TOKENS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "./constants/constants";

contract("Core", (accounts) => {
  const [
    ownerAccount,
    otherAccount,
    unauthorizedAccount,
  ] = accounts;
  const TX_DEFAULTS = { from: ownerAccount, gas: 7000000 };

  let core: CoreContract;
  let mockToken: StandardTokenMockContract;
  let mockTokens: StandardTokenMockContract[] = [];
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  const setCoreDependencies = async (from: Address = ownerAccount) => {
    await core.setVaultAddress.sendTransactionAsync(
        vault.address,
        { from },
    );
    await core.setTransferProxyAddress.sendTransactionAsync(
        transferProxy.address,
        { from },
    );
  };

  // TODO: Leaving this setup modular right now so we can toggle the deployers, authorizers, etc. if we want.
  // If we decide later that we don't need to, then we can move the abstracted setup functions into this one.
  const deployCoreAndInitializeDependencies = async (from: Address = ownerAccount) => {
    core = await coreWrapper.deployCoreAsync();

    vault = await coreWrapper.deployVaultAsync();
    await coreWrapper.addAuthorizationAsync(vault, core.address);

    transferProxy = await coreWrapper.deployTransferProxyAsync(vault.address);
    await coreWrapper.addAuthorizationAsync(transferProxy, core.address);

    await setCoreDependencies();
  };

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  describe("#setVaultAddress", async () => {
    beforeEach(async () => {
      core = await coreWrapper.deployCoreAsync();
      vault = await coreWrapper.deployVaultAsync();
    });

    let caller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return core.setVaultAddress.sendTransactionAsync(
        vault.address,
        { from: caller },
      );
    }

    it("sets vault address correctly", async () => {
      await subject();

      const storedVaultAddress = await core.vaultAddress.callAsync();
      expect(storedVaultAddress).to.eql(vault.address);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        caller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#setTransferProxyAddress", async () => {
    beforeEach(async () => {
      core = await coreWrapper.deployCoreAsync();
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync(vault.address);
    });

    let caller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return core.setTransferProxyAddress.sendTransactionAsync(
        transferProxy.address,
        { from: caller },
      );
    }

    it("sets transfer proxy address correctly", async () => {
      await subject();

      const storedTransferProxyAddress = await core.transferProxyAddress.callAsync();
      expect(storedTransferProxyAddress).to.eql(transferProxy.address);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        caller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#deposit", async () => {
    const tokenOwner: Address = ownerAccount;
    const approver: Address = ownerAccount;

    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();

      mockToken = await coreWrapper.deployTokenAsync(tokenOwner);
      await coreWrapper.approveTransferAsync(mockToken, transferProxy.address, approver);
    });

    let amountToDeposit = STANDARD_INITIAL_TOKENS;
    let depositor: Address = ownerAccount;

    async function subject(): Promise<string> {
      return core.deposit.sendTransactionAsync(
        mockToken.address,
        amountToDeposit,
        { from: depositor },
      );
    }

    it("transfers the correct amount of tokens from the caller", async () => {
      const existingOwnerTokenBalance = await mockToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const newOwnerBalance = existingOwnerTokenBalance.sub(amountToDeposit);
      assertTokenBalance(mockToken, newOwnerBalance, ownerAccount);
    });

    it("transfers the correct amount of tokens to the vault", async () => {
      const existingVaultTokenBalance = await mockToken.balanceOf.callAsync(vault.address);

      await subject();

      const newVaultBalance = existingVaultTokenBalance.add(amountToDeposit);
      assertTokenBalance(mockToken, amountToDeposit, vault.address);
    });

    it("increments the vault balance of the token of the owner by the correct amount", async () => {
      const existingOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

      await subject();

      const newOwnerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(amountToDeposit));
    });

    describe("when the amount is zero", async () => {
      beforeEach(async () => {
        amountToDeposit = new BigNumber(0);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the amount is not the full balance of the token for the owner", async () => {
      beforeEach(async () => {
        amountToDeposit = STANDARD_INITIAL_TOKENS.div(2);
      });

      it("should transfer the correct amount from the vault to the withdrawer", async () => {
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

    describe("when the depositor does not have the correct balance", async () => {
      beforeEach(async () => {
        depositor = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#withdraw", async () => {
    const tokenOwner: Address = ownerAccount;
    const approver: Address = ownerAccount;
    const ownerBalanceInVault: BigNumber = STANDARD_INITIAL_TOKENS;

    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();

      mockToken = await coreWrapper.deployTokenAsync(tokenOwner);
      await coreWrapper.approveTransferAsync(mockToken, transferProxy.address, approver);
      await coreWrapper.depositFromUser(core, mockToken.address, ownerBalanceInVault);
    });

    let amountToWithdraw: BigNumber = STANDARD_INITIAL_TOKENS;
    let withdrawer: Address = ownerAccount;

    async function subject(): Promise<string> {
      return core.withdraw.sendTransactionAsync(
        mockToken.address,
        amountToWithdraw,
        { from: withdrawer },
      );
    }

    it("transfers the correct amount of tokens to the caller", async () => {
      const existingOwnerTokenBalance = await mockToken.balanceOf.callAsync(ownerAccount);

      await subject();

      const newOwnerBalance = existingOwnerTokenBalance.add(amountToWithdraw);
      assertTokenBalance(mockToken, newOwnerBalance, ownerAccount);
    });

    it("transfers the correct amount of tokens from the vault", async () => {
      const existingVaultTokenBalance = await mockToken.balanceOf.callAsync(vault.address);

      await subject();

      const newVaultBalance = existingVaultTokenBalance.sub(amountToWithdraw);
      assertTokenBalance(mockToken, newVaultBalance, vault.address);
    });

    it("increments the vault balance of the token of the owner by the correct amount", async () => {
      const existingOwnerVaultBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

      await subject();

      const newOwnerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(amountToWithdraw));
    });

    describe("when the amount is not the full balance of the token for the owner", async () => {
      beforeEach(async () => {
        amountToWithdraw = STANDARD_INITIAL_TOKENS.div(2);
      });

      it("should transfer the correct amount from the vault to the withdrawer", async () => {
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

    describe("when the withdrawer does not have the correct balance", async () => {
      beforeEach(async () => {
        withdrawer = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#batchDeposit", async () => {
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 1;

    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();

      mockTokens = await coreWrapper.deployTokensAsync(tokenCount, tokenOwner);
      const approvePromises = _.map(mockTokens, (token) =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);
    });

    afterEach(async () => {
      tokenAddresses = null;
      amountsToDeposit = null;
    });

    let tokenAddresses: Address[];
    let amountsToDeposit: BigNumber[];

    async function subject(): Promise<string> {
      // Initialize addresses to deployed tokens' addresses unless tokenAddresses is overwritten in test cases
      const addresses = tokenAddresses || _.map(mockTokens, (token) => token.address);
      // Initialize quantities to deployed tokens' quantities unless amountsToDeposit is overwritten in test cases
      const quantities = amountsToDeposit || _.map(mockTokens, () => STANDARD_INITIAL_TOKENS);

      return core.batchDeposit.sendTransactionAsync(
        addresses,
        quantities,
        { from: ownerAccount },
      );
    }

    it("transfers the correct amount of each token from the caller", async () => {
      const existingTokenBalances = await coreWrapper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.sub(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newTokenBalances = await await coreWrapper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("transfers the correct amount of each token to the vault", async () => {
      const existingTokenBalances = await coreWrapper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.add(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newTokenBalances = await coreWrapper.getTokenBalances(mockTokens, vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("increments the vault balances of the tokens of the owner by the correct amount", async () => {
      const existingOwnerVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        mockTokens,
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, (balance) =>
        balance.add(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newOwnerVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        mockTokens,
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe("when the token addresses input is empty", async () => {
      beforeEach(async () => {
        tokenAddresses = [];
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the deposit quantities input is empty", async () => {
      beforeEach(async () => {
        amountsToDeposit = [];
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token addresses input length does not match the deposit quantities input length", async () => {
      beforeEach(async () => {
        tokenAddresses = [_.first(mockTokens).address];
        amountsToDeposit = [STANDARD_INITIAL_TOKENS, STANDARD_INITIAL_TOKENS];
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when batch is called with one token", async () => {
      beforeEach(async () => {
        tokenCount = 1;
      });

      it("increments the balance of the token of the owner by the correct amount", async () => {
        const token = _.first(mockTokens);
        const existingOwnerVaultBalance = await vault.balances.callAsync(token.address, ownerAccount);

        await subject();

        const newOwnerBalance = await vault.balances.callAsync(token.address, ownerAccount);
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(STANDARD_INITIAL_TOKENS));
      });
    });
  });

  describe("#batchWithdraw", async () => {
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 3;

    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();

      mockTokens = await coreWrapper.deployTokensAsync(tokenCount, tokenOwner);
      const approvePromises = _.map(mockTokens, (token) =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);

      // Deposit tokens first so they can be withdrawn
      await core.batchDeposit.sendTransactionAsync(
        _.map(mockTokens, (token) => token.address),
        _.map(mockTokens, () => STANDARD_INITIAL_TOKENS),
        { from: ownerAccount },
      );
    });

    afterEach(async () => {
      tokenAddresses = null;
      amountsToWithdraw = null;
    });

    let tokenAddresses: Address[];
    let amountsToWithdraw: BigNumber[];

    async function subject(): Promise<string> {
      // Initialize addresses to deployed tokens' addresses unless tokenAddresses is overwritten in test cases
      const addresses = tokenAddresses || _.map(mockTokens, (token) => token.address);
      // Initialize quantites to deployed tokens' quantities unless amountsToWithdraw is overwritten in test cases
      const quantities = amountsToWithdraw || _.map(mockTokens, () => STANDARD_INITIAL_TOKENS);

      return core.batchWithdraw.sendTransactionAsync(
        addresses,
        quantities,
        { from: ownerAccount },
      );
    }

    it("transfers the correct amount of each token from the caller", async () => {
      const existingTokenBalances = await coreWrapper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.add(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newTokenBalances = await await coreWrapper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("transfers the correct amount of each token to the vault", async () => {
      const existingTokenBalances = await await coreWrapper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.sub(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newTokenBalances = await coreWrapper.getTokenBalances(mockTokens, vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("decrements the vault balances of the tokens of the owner by the correct amount", async () => {
      const existingOwnerVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        mockTokens,
        vault,
        ownerAccount,
      );
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, (balance) =>
        balance.sub(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newOwnerVaultBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        mockTokens,
        vault,
        ownerAccount,
      );
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe("when the token addresses input is empty", async () => {
      beforeEach(async () => {
        tokenAddresses = [];
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the withdraw quantities input is empty", async () => {
      beforeEach(async () => {
        amountsToWithdraw = [];
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token addresses input length does not match the withdraw quantities input length", async () => {
      beforeEach(async () => {
        tokenAddresses = [_.first(mockTokens).address];
        amountsToWithdraw = [STANDARD_INITIAL_TOKENS, STANDARD_INITIAL_TOKENS];
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when batch is called with one token", async () => {
      beforeEach(async () => {
        tokenCount = 1;
      });

      it("decrements the balance of the token of the owner by the correct amount", async () => {
        const token = _.first(mockTokens);
        const existingOwnerVaultBalance = await vault.balances.callAsync(token.address, ownerAccount);

        await subject();

        const newOwnerBalance = await vault.balances.callAsync(token.address, ownerAccount);
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(STANDARD_INITIAL_TOKENS));
      });
    });
  });
});
