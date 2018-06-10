import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, Log, UInt } from "../types/common.js";

// Contract types
import { CoreContract } from "../types/generated/core";
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { TransferProxyContract } from "../types/generated/transfer_proxy";
import { VaultContract } from "../types/generated/vault";

// Artifacts
const Core = artifacts.require("Core");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const TransferProxy = artifacts.require("TransferProxy");
const Vault = artifacts.require("Vault");

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

  const deployToken = async (initialAccount: Address, from: Address = ownerAccount) => {
    const tokenCount: number = 1;
    await deployTokens(tokenCount, initialAccount, from);
    mockToken = _.first(mockTokens);
  };

  const deployTokens = async (tokenCount: number, initialAccount: Address, from: Address = ownerAccount) => {
    mockTokens = [];

    const tokenMocks = _.times(tokenCount, (index) => {
      return StandardTokenMock.new(
        initialAccount,
        STANDARD_INITIAL_TOKENS,
        `Component ${index}`,
        index,
        { from, gas: 7000000 },
      );
    });

    await Promise.all(tokenMocks).then((tokenMock) => {
      _.each(tokenMock, (standardToken) => {
        const tokenWeb3Contract = web3.eth
          .contract(standardToken.abi)
          .at(standardToken.address);

        mockTokens.push(new StandardTokenMockContract(tokenWeb3Contract, { from }));
      });
    });
  };

  const deployTransferProxy = async (vaultAddress: Address, from: Address = ownerAccount) => {
    const truffleTransferProxy = await TransferProxy.new(
      { from, gas: 7000000 },
    );

    const transferProxyWeb3Contract = web3.eth
      .contract(truffleTransferProxy.abi)
      .at(truffleTransferProxy.address);

    transferProxy = new TransferProxyContract(
      transferProxyWeb3Contract,
      { from, gas: 7000000 },
    );

    // Set TransferProxy dependencies
    await transferProxy.setVaultAddress.sendTransactionAsync(
      vaultAddress,
      { from },
    );
  };

  const deployVault = async (from: Address = ownerAccount) => {
    const truffleVault = await Vault.new(
      { from, gas: 7000000 },
    );

    const vaultWeb3Contract = web3.eth
      .contract(truffleVault.abi)
      .at(truffleVault.address);

    vault = new VaultContract(
      vaultWeb3Contract,
      { from, gas: 7000000 },
    );
  };

  const deployCore = async (from: Address = ownerAccount) => {
    const truffleCore = await Core.new(
      { from, gas: 7000000 },
    );

    const coreWeb3Contract = web3.eth
      .contract(truffleCore.abi)
      .at(truffleCore.address);

    core = new CoreContract(
      coreWeb3Contract,
      { from, gas: 7000000 },
    );
  };

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
    await deployCore();

    await deployVault();
    await addAuthorizedAddress(vault, core.address);

    await deployTransferProxy(vault.address);
    await addAuthorizedAddress(transferProxy, core.address);

    await setCoreDependencies();
  };

  const approveTokenTransfer = async (token: StandardTokenMockContract, to: Address, from: Address = ownerAccount) => {
    await token.approve.sendTransactionAsync(
      to,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      { from },
    );
  };

  const addAuthorizedAddress = async (contract: any, toAuthorize: Address, from: Address = ownerAccount) => {
    await contract.addAuthorizedAddress.sendTransactionAsync(
      toAuthorize,
      { from },
    );
  };

  const incrementOwnerBalance = async (owner: Address, token: Address, quantity: BigNumber, from: Address) => {
    await vault.incrementTokenOwner.sendTransactionAsync(
      owner,
      token,
      quantity,
      { from },
    );
  };

  const depositFromUser = async (token: Address, quantity: BigNumber, from: Address = ownerAccount) => {
    await core.deposit.sendTransactionAsync(
      token,
      quantity,
      { from },
    );
  };

    // TODO: Abstract dependency on mockTokens
  async function getMockTokensBalances(address: Address) {
    const balancePromises = _.map(mockTokens, (token) => token.balanceOf.callAsync(address));

    let balances: BigNumber[];
    await Promise.all(balancePromises).then((fetchedTokenBalances) => {
      balances = fetchedTokenBalances;
    });

    return balances;
  }

  // TODO: Abstract dependency on mockTokens
  async function getVaultMockTokensBalances(owner: Address) {
    const balancePromises = _.map(mockTokens, (token) => vault.balances.callAsync(token.address, owner));

    let balances: BigNumber[];
    await Promise.all(balancePromises).then((fetchedTokenBalances) => {
      balances = fetchedTokenBalances;
    });

    return balances;
  }

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  describe.only("#setVaultAddress", async () => {
    beforeEach(async () => {
      await deployCore();
      await deployVault();
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
      before(async () => {
        caller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe.only("#setTransferProxyAddress", async () => {
    beforeEach(async () => {
      await deployCore();
      await deployVault();
      await deployTransferProxy(vault.address);
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
      before(async () => {
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

      await deployToken(tokenOwner);
      await approveTokenTransfer(mockToken, transferProxy.address, approver);
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

    describe("when the amount is not the full balance of the token for the owner", async () => {
      before(async () => {
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
      before(async () => {
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

      await deployToken(tokenOwner);
      await approveTokenTransfer(mockToken, transferProxy.address, approver);
      await depositFromUser(mockToken.address, ownerBalanceInVault);
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
      before(async () => {
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
      before(async () => {
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

      await deployTokens(tokenCount, tokenOwner);
      const approvePromises = _.map(mockTokens, (token) =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);
    });

    async function subject(): Promise<string> {
      const mockTokenAddresses = _.map(mockTokens, (token) => token.address);
      const amountsToDeposit = _.map(mockTokens, () => STANDARD_INITIAL_TOKENS);

      return core.batchDeposit.sendTransactionAsync(
        mockTokenAddresses,
        amountsToDeposit,
        { from: ownerAccount },
      );
    }

    it("transfers the correct amount of each token from the caller", async () => {
      const existingTokenBalances = await getMockTokensBalances(ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.sub(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newTokenBalances = await getMockTokensBalances(ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("transfers the correct amount of each token to the vault", async () => {
      const existingTokenBalances = await getMockTokensBalances(vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.add(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newTokenBalances = await getMockTokensBalances(vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("increments the vault balances of the tokens of the owner by the correct amount", async () => {
      const existingOwnerVaultBalances = await getVaultMockTokensBalances(ownerAccount);
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, (balance) =>
        balance.add(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newOwnerVaultBalances = await getVaultMockTokensBalances(ownerAccount);
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe("when batch is called with one token", async () => {
      before(async () => {
        tokenCount = 1;
      });

      it("increments the vault balances of the tokens of the owner by the correct amount", async () => {
        const token = _.first(mockTokens);
        const existingOwnerVaultBalance = await vault.balances.callAsync(token.address, ownerAccount);

        await subject();

        const newOwnerBalance = await vault.balances.callAsync(token.address, ownerAccount);
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.add(STANDARD_INITIAL_TOKENS));
      });
    });
  });

  describe("#batchWithdraw", async () => {
    let amountsToWithdraw: BigNumber[];
    let mockTokenAddresses: Address[];
    const tokenOwner: Address = ownerAccount;
    let tokenCount: number = 3;

    beforeEach(async () => {
      await deployCoreAndInitializeDependencies();

      await deployTokens(tokenCount, tokenOwner);
      const approvePromises = _.map(mockTokens, (token) =>
        token.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: tokenOwner },
        ),
      );
      await Promise.all(approvePromises);

      mockTokenAddresses = _.map(mockTokens, (token) => token.address);
      amountsToWithdraw = _.map(mockTokens, () => STANDARD_INITIAL_TOKENS);

      await core.batchDeposit.sendTransactionAsync(
        mockTokenAddresses,
        amountsToWithdraw,
        { from: ownerAccount },
      );
    });

    async function subject(): Promise<string> {
      return core.batchWithdraw.sendTransactionAsync(
        mockTokenAddresses,
        amountsToWithdraw,
        { from: ownerAccount },
      );
    }

    it("transfers the correct amount of each token from the caller", async () => {
      const existingTokenBalances = await getMockTokensBalances(ownerAccount);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.add(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newTokenBalances = await getMockTokensBalances(ownerAccount);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("transfers the correct amount of each token to the vault", async () => {
      const existingTokenBalances = await getMockTokensBalances(vault.address);
      const expectedNewBalances = _.map(existingTokenBalances, (balance) =>
        balance.sub(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newTokenBalances = await getMockTokensBalances(vault.address);
      expect(newTokenBalances).to.eql(expectedNewBalances);
    });

    it("decrements the vault balances of the tokens of the owner by the correct amount", async () => {
      const existingOwnerVaultBalances = await getVaultMockTokensBalances(ownerAccount);
      const expectedNewOwnerVaultBalances = _.map(existingOwnerVaultBalances, (balance) =>
        balance.sub(STANDARD_INITIAL_TOKENS),
      );

      await subject();

      const newOwnerVaultBalances = await getVaultMockTokensBalances(ownerAccount);
      expect(newOwnerVaultBalances).to.eql(expectedNewOwnerVaultBalances);
    });

    describe("when batch is called with one token", async () => {
      before(async () => {
        tokenCount = 1;
      });

      it("decrements the vault balances of the tokens of the owner by the correct amount", async () => {
        const token = _.first(mockTokens);
        const existingOwnerVaultBalance = await vault.balances.callAsync(token.address, ownerAccount);

        await subject();

        const amountWithdrawn = _.first(amountsToWithdraw);
        const newOwnerBalance = await vault.balances.callAsync(token.address, ownerAccount);
        expect(newOwnerBalance).to.be.bignumber.equal(existingOwnerVaultBalance.sub(amountWithdrawn));
      });
    });
  });
});
