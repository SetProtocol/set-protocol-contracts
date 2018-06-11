import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, Log, UInt } from "../types/common.js";

// Contract types
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { VaultContract } from "../types/generated/vault";

// Artifacts
const StandardTokenMock = artifacts.require("StandardTokenMock");
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
  NULL_ADDRESS,
  STANDARD_INITIAL_TOKENS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "./constants/constants";

contract("Vault", (accounts) => {
  const [
    ownerAccount,
    authorizedAccount,
    unauthorizedAccount,
    otherAccount,
  ] = accounts;
  const TX_DEFAULTS = {
    from: ownerAccount,
    gas: 7000000,
  };

  let mockToken: StandardTokenMockContract;
  let vault: VaultContract;

  const deployToken = async (initialAccount: Address, from: Address = ownerAccount) => {
    mockToken = null;

    const truffleMockToken = await StandardTokenMock.new(
      initialAccount,
      STANDARD_INITIAL_TOKENS,
      "Mock Token",
      "MOCK",
      { from, gas: 7000000 },
    );

    const mockTokenWeb3Contract = web3.eth
      .contract(truffleMockToken.abi)
      .at(truffleMockToken.address);

    mockToken = new StandardTokenMockContract(
      mockTokenWeb3Contract,
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

  const approveTransfer = async (to: Address, from: Address = ownerAccount) => {
    await mockToken.approve.sendTransactionAsync(
      to,
      UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
      { from },
    );
  };

  const authorizeForVault = async (toAuthorize: Address, from: Address = ownerAccount) => {
    await vault.addAuthorizedAddress.sendTransactionAsync(
      toAuthorize,
      { from },
    );
  };

  const incrementOwnerBalance = async (
    owner: Address,
    token: Address,
    quantity: BigNumber,
    from: Address = authorizedAccount,
  ) => {
    await vault.incrementTokenOwner.sendTransactionAsync(
        owner,
        token,
        quantity,
        { from },
      );
  };

  before(async () => {
    ABIDecoder.addABI(Vault.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Vault.abi);
  });

  describe("#withdrawTo", async () => {
    // Setup
    const ownerBalanceInVault: BigNumber = STANDARD_INITIAL_TOKENS;

    beforeEach(async () => {
      await deployVault();
      await authorizeForVault(authorizedAccount);

      await deployToken(vault.address);
      await incrementOwnerBalance(ownerAccount, mockToken.address, ownerBalanceInVault, authorizedAccount);
    });

    // Subject
    let receiver: Address = ownerAccount;
    let amountToWithdraw: BigNumber = STANDARD_INITIAL_TOKENS;

    let caller: Address = authorizedAccount;

    async function subject(): Promise<string> {
      return vault.withdrawTo.sendTransactionAsync(
        mockToken.address,
        receiver,
        amountToWithdraw,
        { from: caller },
      );
    }

    it("should decrement the mock token balance of the vault by the correct amount", async () => {
      await subject();

      assertTokenBalance(mockToken, new BigNumber(0), vault.address);
    });

    it("should increment the mock token balance of the receiver by the correct amount", async () => {
      await subject();

      assertTokenBalance(mockToken, amountToWithdraw, receiver);
    });

    it("should not update the balances mapping", async () => {
      const existingOwnerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

      await subject();

      const ownerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(existingOwnerBalance);
    });

    describe("when the caller is not authorized", async () => {
      before(async () => {
        caller = unauthorizedAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the receiver is not valid", async () => {
      before(async () => {
        receiver = NULL_ADDRESS;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the amountToWithdraw is zero", async () => {
      before(async () => {
        amountToWithdraw = new BigNumber(0);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#incrementTokenOwner", async () => {
    // Setup
    const authorized: Address = authorizedAccount;

    beforeEach(async () => {
      await deployVault();
      await authorizeForVault(authorized);
    });

    // Subject
    let caller: Address = authorizedAccount;
    let amountToIncrement: BigNumber = STANDARD_INITIAL_TOKENS;
    const tokenAddress: Address = NULL_ADDRESS;

    async function subject(): Promise<string> {
      return vault.incrementTokenOwner.sendTransactionAsync(
        ownerAccount,
        tokenAddress,
        amountToIncrement,
        { from: caller },
      );
    }

    it("should increment the balance of the user by the correct amount", async () => {
      await subject();

      const ownerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(amountToIncrement);
    });

    describe("when the caller is not authorized", async () => {
      before(async () => {
        caller = unauthorizedAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the incrementAmount is zero", async () => {
      before(async () => {
        amountToIncrement = new BigNumber(0);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#decrementTokenOwner", async () => {
    // Setup
    let amountToDecrement: BigNumber = STANDARD_INITIAL_TOKENS;
    const amountToIncrement: BigNumber = STANDARD_INITIAL_TOKENS;
    const tokenAddress: Address = NULL_ADDRESS;

    beforeEach(async () => {
      await deployVault();
      await authorizeForVault(authorizedAccount);

      await incrementOwnerBalance(ownerAccount, tokenAddress, amountToIncrement, authorizedAccount);
    });

    // Subject
    let caller: Address = authorizedAccount;

    async function subject(): Promise<string> {
      return vault.decrementTokenOwner.sendTransactionAsync(
        ownerAccount,
        tokenAddress,
        amountToDecrement,
        { from: caller },
      );
    }

    it("should decrement the balance of the user by the correct amount", async () => {
      await subject();

      const ownerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(new BigNumber(0));
    });

    describe("when the caller is not authorized", async () => {
      before(async () => {
        caller = unauthorizedAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the decrementAmount is larger than balance", async () => {
      before(async () => {
        amountToDecrement = STANDARD_INITIAL_TOKENS.add(1);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the decrementAmount is zero", async () => {
      before(async () => {
        amountToDecrement = new BigNumber(0);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#getOwnerBalance", async () => {
    // Setup
    const balance: BigNumber = STANDARD_INITIAL_TOKENS;

    beforeEach(async () => {
      await deployVault();
      await authorizeForVault(authorizedAccount);
      await deployToken(vault.address);
      await incrementOwnerBalance(ownerAccount, mockToken.address, balance, authorizedAccount);
    });

    // Subject
    let caller: Address = ownerAccount;

    async function subject(tokenAddress: Address = mockToken.address): Promise<BigNumber> {
      return vault.getOwnerBalance.callAsync(
        ownerAccount,
        tokenAddress,
        { from: caller },
      );
    }

    it("should return the correct balance for the owner", async () => {
      const ownerBalance = await subject();

      expect(ownerBalance).to.be.bignumber.equal(balance);
    });

    describe("when the caller is not the owner", async () => {
      before(async () => {
        caller = otherAccount;
      });

      it("should still return the correct balance for the owner", async () => {
        const ownerBalance = await subject();

        expect(ownerBalance).to.be.bignumber.equal(balance);
      });
    });

    describe("when the token address has no balances", async () => {
      it("should return zero", async () => {
        const ownerBalance = await subject(NULL_ADDRESS);

        expect(ownerBalance).to.be.bignumber.equal(0);
      });
    });
  });
});
