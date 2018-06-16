import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "./utils/units";

// Types
import { Address } from "../types/common.js";

// Contract types
import { AuthorizableContract } from "../types/generated/authorizable";
import { CoreContract } from "../types/generated/core";
import { SetTokenContract } from "../types/generated/set_token";
import { SetTokenFactoryContract } from "../types/generated/set_token_factory";
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

import { getFormattedLogsFromTxHash } from "./logs/log_utils";
import { extractNewSetTokenAddressFromLogs } from "./logs/Core";

import {
  assertTokenBalance,
  expectRevertError,
} from "./utils/tokenAssertions";
import {
  DEFAULT_GAS,
  DEPLOYED_TOKEN_QUANTITY,
  NULL_ADDRESS,
  ONE,
  STANDARD_NATURAL_UNIT,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "./constants/constants";
import {
  getExpectedCreateLogs,
} from "./logs/Core";
import {
  assertLogEquivalence,
} from "./logs/logAssertions";

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
  let setTokenFactory: SetTokenFactoryContract;

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

    await core.addFactory.sendTransactionAsync(
      setTokenFactory.address,
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

    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    await coreWrapper.addAuthorizationAsync(setTokenFactory, core.address);
    await coreWrapper.setCoreAddress(setTokenFactory, core.address);

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

  describe("#addFactory", async () => {
    beforeEach(async () => {
      core = await coreWrapper.deployCoreAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    });

    let caller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return core.addFactory.sendTransactionAsync(
        setTokenFactory.address,
        { from: caller },
      );
    }

    it("adds setTokenFactory address correctly", async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
      expect(isFactoryValid).to.be.true;
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

  describe("#removeFactory", async () => {
    beforeEach(async () => {
      core = await coreWrapper.deployCoreAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
      await core.addFactory.sendTransactionAsync(setTokenFactory.address, {
        from: ownerAccount,
      });
    });

    let caller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return core.removeFactory.sendTransactionAsync(
        setTokenFactory.address,
        { from: caller },
      );
    }

    it("removes setTokenFactory address correctly", async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
      expect(isFactoryValid).to.be.false;
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

    let amountToDeposit = DEPLOYED_TOKEN_QUANTITY;
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
        amountToDeposit = DEPLOYED_TOKEN_QUANTITY.div(2);
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
    const ownerBalanceInVault: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();

      mockToken = await coreWrapper.deployTokenAsync(tokenOwner);
      await coreWrapper.approveTransferAsync(mockToken, transferProxy.address, approver);
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
        amountToWithdraw = DEPLOYED_TOKEN_QUANTITY.div(2);
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
      const quantities = amountsToDeposit || _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);

      return core.batchDeposit.sendTransactionAsync(
        addresses,
        quantities,
        { from: ownerAccount },
      );
    }

    it("transfers the correct amount of each token from the caller", async () => {
      const existingTokenBalances = await coreWrapper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await await coreWrapper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("transfers the correct amount of each token to the vault", async () => {
      const existingTokenBalances = await coreWrapper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
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
        amountsToDeposit = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
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
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(DEPLOYED_TOKEN_QUANTITY));
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
        _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY),
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
      const quantities = amountsToWithdraw || _.map(mockTokens, () => DEPLOYED_TOKEN_QUANTITY);

      return core.batchWithdraw.sendTransactionAsync(
        addresses,
        quantities,
        { from: ownerAccount },
      );
    }

    it("transfers the correct amount of each token from the caller", async () => {
      const existingTokenBalances = await coreWrapper.getTokenBalances(mockTokens, ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.add(DEPLOYED_TOKEN_QUANTITY),
      );

      await subject();

      const newTokenBalances = await await coreWrapper.getTokenBalances(mockTokens, ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("transfers the correct amount of each token to the vault", async () => {
      const existingTokenBalances = await await coreWrapper.getTokenBalances(mockTokens, vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.sub(DEPLOYED_TOKEN_QUANTITY),
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
        amountsToWithdraw = [DEPLOYED_TOKEN_QUANTITY, DEPLOYED_TOKEN_QUANTITY];
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
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(DEPLOYED_TOKEN_QUANTITY));
      });
    });
  });

  describe("#issue", async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();

      components = await coreWrapper.deployTokensAsync(2, ownerAccount);
      await coreWrapper.approveTransfersAsync(components, transferProxy.address);

      const componentAddresses = _.map(components, (token) => token.address);
      componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
        "Set Token",
        "SET",
      );

      subjectCaller = ownerAccount;
      subjectQuantityToIssue = ether(2);
      subjectSetToIssue = setToken.address;
    });

    async function subject(): Promise<string> {
      return core.issue.sendTransactionAsync(
        subjectSetToIssue,
        subjectQuantityToIssue,
        { from: ownerAccount },
      );
    }

    it("transfers the required tokens from the user", async () => {
      const component: StandardTokenMockContract = _.first(components);
      const unit: BigNumber = _.first(componentUnits);

      const existingBalance = await component.balanceOf.callAsync(ownerAccount);
      assertTokenBalance(component, DEPLOYED_TOKEN_QUANTITY, ownerAccount);

      await subject();

      const newBalance = await component.balanceOf.callAsync(ownerAccount);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue.div(naturalUnit).mul(unit));
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });

    it("updates the balances of the components in the vault to belong to the set token", async () => {
      const existingBalances = await coreWrapper.getVaultBalancesForTokensForOwner(
        components,
        vault,
        setToken.address,
      );

      await subject();

      const expectedNewBalances = _.map(existingBalances, (balance, idx) => {
        const units = componentUnits[idx];
        return balance.add(subjectQuantityToIssue.div(naturalUnit).mul(units));
      });
      const newBalances = await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, setToken.address);
      expect(newBalances).to.be.bignumber.eql(expectedNewBalances);
    });

    it("does not change balances of the components in the vault for the user", async () => {
      const existingBalances = await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, ownerAccount);

      await subject();

      const newBalances = await coreWrapper.getVaultBalancesForTokensForOwner(components, vault, ownerAccount);
      expect(newBalances).to.be.bignumber.eql(existingBalances);
    });

    it("mints the correct quantity of the set for the user", async () => {
      const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

      await subject();

      assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
    });

    describe("when the set was not created through core", async () => {
      beforeEach(async () => {
        subjectSetToIssue = NULL_ADDRESS;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the user does not have enough of a component", async () => {
      beforeEach(async () => {
        await _.first(components).transfer.sendTransactionAsync(
          otherAccount,
          DEPLOYED_TOKEN_QUANTITY,
          { from: ownerAccount, gas: DEFAULT_GAS },
        );
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the quantity is not a multiple of the natural unit of the set", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when a required component quantity is in the vault for the user", async () => {
      let alreadyDepositedComponent: StandardTokenMockContract;
      const alreadyDepositedQuantity: BigNumber = DEPLOYED_TOKEN_QUANTITY;
      let componentUnit: BigNumber;

      beforeEach(async () => {
        alreadyDepositedComponent = _.first(components);
        componentUnit = _.first(componentUnits);
        await coreWrapper.depositFromUser(core, alreadyDepositedComponent.address, alreadyDepositedQuantity);
      });

      it("updates the vault balance of the component for the user by the correct amount", async () => {
        const existingVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);

        await subject();

        const requiredQuantityToIssue = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit);
        const expectedNewBalance = alreadyDepositedQuantity.sub(requiredQuantityToIssue);
        const newVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);
        expect(newVaultBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it("mints the correct quantity of the set for the user", async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });

    describe("when half of a required component quantity is in the vault for the user", async () => {
      let alreadyDepositedComponent: StandardTokenMockContract;
      let alreadyDepositedQuantity: BigNumber;
      let componentUnit: BigNumber;
      let quantityToTransfer: BigNumber;

      beforeEach(async () => {
        alreadyDepositedComponent = _.first(components);
        componentUnit = _.first(componentUnits);

        alreadyDepositedQuantity = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit).div(2);
        await coreWrapper.depositFromUser(core, alreadyDepositedComponent.address, alreadyDepositedQuantity);

        quantityToTransfer = subjectQuantityToIssue.div(naturalUnit).mul(componentUnit).sub(alreadyDepositedQuantity);
      });

      it("transfers the correct amount from the user", async () => {
        const existingBalance = await alreadyDepositedComponent.balanceOf.callAsync(ownerAccount);
        const expectedExistingBalance = DEPLOYED_TOKEN_QUANTITY.sub(alreadyDepositedQuantity);
        assertTokenBalance(alreadyDepositedComponent, expectedExistingBalance, ownerAccount);

        await subject();

        const expectedNewBalance = existingBalance.sub(quantityToTransfer);
        const newBalance = await alreadyDepositedComponent.balanceOf.callAsync(ownerAccount);
        expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
      });

      it("updates the vault balance of the component for the user by the correct amount", async () => {
        const existingVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);

        await subject();

        const expectedNewBalance = await existingVaultBalance.sub(alreadyDepositedQuantity);
        const newVaultBalance = await vault.balances.callAsync(alreadyDepositedComponent.address, ownerAccount);
        expect(newVaultBalance).to.be.bignumber.eql(expectedNewBalance);
      });

      it("mints the correct quantity of the set for the user", async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });

    describe("when all of the required component quantites are in the vault for the user", async () => {
      let alreadyDepositedComponent: StandardTokenMockContract;
      const alreadyDepositedQuantity: BigNumber = DEPLOYED_TOKEN_QUANTITY;

      beforeEach(async () => {
        const depositPromises = _.map(components, (component) =>
          coreWrapper.depositFromUser(core, component.address, alreadyDepositedQuantity)
        );
        await Promise.all(depositPromises);
      });

      it("updates the vault balance of the component for the user by the correct amount", async () => {
        const existingVaultBalancePromises = _.map(components, (component) =>
          vault.balances.callAsync(component.address, ownerAccount)
        );
        const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

        await subject();

        const expectedVaultBalances = _.map(components, (component, idx) => {
          const requiredQuantityToIssue = subjectQuantityToIssue.div(naturalUnit).mul(componentUnits[idx]);
          return existingVaultBalances[idx].sub(requiredQuantityToIssue);
        });

        const newVaultBalancesPromises = _.map(components, (component) =>
          vault.balances.callAsync(component.address, ownerAccount)
        );
        const newVaultBalances = await Promise.all(newVaultBalancesPromises);

        _.map(components, (component, idx) => 
          expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx])
        );
      });

      it("mints the correct quantity of the set for the user", async () => {
        const existingBalance = await setToken.balanceOf.callAsync(ownerAccount);

        await subject();

        assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), ownerAccount);
      });
    });
  });

  describe("#redeem", async () => {
    let subjectCaller: Address;
    let subjectQuantityToRedeem: BigNumber;
    let subjectSetToRedeem: Address;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;

    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();

      components = await coreWrapper.deployTokensAsync(2, ownerAccount);
      await coreWrapper.approveTransfersAsync(components, transferProxy.address);

      const componentAddresses = _.map(components, (token) => token.address);
      componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
        "Set Token",
        "SET",
      );

      await coreWrapper.issueSetTokenAsync(
        core,
        setToken.address,
        ether(2),
      );

      subjectCaller = ownerAccount;
      subjectQuantityToRedeem = ether(2);
      subjectSetToRedeem = setToken.address;
    });

    async function subject(): Promise<string> {
      return core.redeem.sendTransactionAsync(
        subjectSetToRedeem,
        subjectQuantityToRedeem,
        { from: ownerAccount },
      );
    }

    it("increments the balances of the tokens back to the user in vault", async () => {
      const existingVaultBalancePromises = _.map(components, (component) =>
        vault.balances.callAsync(component.address, ownerAccount)
      );
      const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].add(requiredQuantityToRedeem);
      });

      const newVaultBalancesPromises = _.map(components, (component) =>
        vault.balances.callAsync(component.address, ownerAccount)
      );
      const newVaultBalances = await Promise.all(newVaultBalancesPromises);

      _.map(components, (component, idx) =>
        expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx])
      );
    });

    it("decrements the balance of the tokens owned by set in vault", async () => {
      const existingVaultBalancePromises = _.map(components, (component) =>
        vault.balances.callAsync(component.address, subjectSetToRedeem)
      );
      const existingVaultBalances = await Promise.all(existingVaultBalancePromises);

      await subject();

      const expectedVaultBalances = _.map(components, (component, idx) => {
        const requiredQuantityToRedeem = subjectQuantityToRedeem.div(naturalUnit).mul(componentUnits[idx]);
        return existingVaultBalances[idx].sub(requiredQuantityToRedeem);
      });

      const newVaultBalancesPromises = _.map(components, (component) =>
        vault.balances.callAsync(component.address, subjectSetToRedeem)
      );
      const newVaultBalances = await Promise.all(newVaultBalancesPromises);

      _.map(components, (component, idx) =>
        expect(newVaultBalances[idx]).to.be.bignumber.equal(expectedVaultBalances[idx])
      );
    });

    describe("when the set was not created through core", async () => {
      beforeEach(async () => {
        subjectSetToRedeem = NULL_ADDRESS;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the user does not have enough of a set", async () => {
      beforeEach(async () => {
        subjectQuantityToRedeem = ether(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the quantity is not a multiple of the natural unit of the set", async () => {
      beforeEach(async () => {
        subjectQuantityToRedeem = ether(1.5);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#create", async () => {
    let factoryAddress: Address;
    let components: Address[];
    let units: BigNumber[] = [ONE];
    let naturalUnit: BigNumber = ONE;
    let name = "New Set";
    let symbol = "SET";


    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();
      mockToken = await coreWrapper.deployTokenAsync(ownerAccount);

      factoryAddress = setTokenFactory.address;
      components = [mockToken.address];
    });

    async function subject(): Promise<string> {
      return core.create.sendTransactionAsync(
        factoryAddress,
        components,
        units,
        naturalUnit,
        name,
        symbol,
        { from: ownerAccount },
      );
    }

    it("creates a new SetToken and tracks it", async () => {
      const txHash = await subject();

      const logs = await getFormattedLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const isSetTokenValid = await core.validSets.callAsync(newSetTokenAddress);
      expect(isSetTokenValid).to.be.true;
    });

    it("should have the correct logs", async () => {
      const txHash = await subject();

      const logs = await getFormattedLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);
      const expectedLogs = getExpectedCreateLogs(
        core.address,
        newSetTokenAddress,
        factoryAddress,
        components,
        units,
        naturalUnit,
        name,
        symbol,
      );

      assertLogEquivalence(expectedLogs, logs);
    });

    describe("when the factory is not valid", async () => {
      beforeEach(async () => {
        factoryAddress = NULL_ADDRESS;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
