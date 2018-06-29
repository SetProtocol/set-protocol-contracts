import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address } from "../../types/common.js";

// Contract types
import { BadTokenMockContract } from "../../types/generated/bad_token_mock";
import { MockTokenInvalidReturnContract } from "../../types/generated/mock_token_invalid_return";
import { MockTokenNoXferReturnContract } from "../../types/generated/mock_token_no_xfer_return";
import { StandardTokenMockContract } from "../../types/generated/standard_token_mock";
import { StandardTokenWithFeeMockContract } from "../../types/generated/standard_token_with_fee_mock";
import { VaultContract } from "../../types/generated/vault";

// Testing Set up
import { BigNumberSetup } from "../config/bigNumberSetup";
import ChaiSetup from "../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import { CoreWrapper } from "../utils/coreWrapper";
import { ERC20Wrapper } from "../utils/erc20Wrapper";
import { assertTokenBalance, expectRevertError } from "../utils/tokenAssertions";
import { DEPLOYED_TOKEN_QUANTITY, NULL_ADDRESS, ZERO } from "../utils/constants";

contract("Vault", (accounts) => {
  const [
    ownerAccount,
    authorizedAccount,
    unauthorizedAccount,
    otherAccount,
  ] = accounts;

  let mockToken: StandardTokenMockContract;
  let vault: VaultContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  describe.only("#withdrawTo", async () => {
    let subjectAmountToWithdraw: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectCaller: Address = authorizedAccount;
    let subjectTokenAddress: Address;
    let subjectReceiver: Address = ownerAccount;
    const ownerExistingBalanceInVault: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorizedAccount);

      mockToken = await erc20Wrapper.deployTokenAsync(vault.address);
      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        mockToken.address,
        ownerExistingBalanceInVault,
        authorizedAccount,
      );
    });

    afterEach(async () => {
      subjectAmountToWithdraw = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = authorizedAccount;
      subjectReceiver = ownerAccount;
      subjectTokenAddress = null;
    });

    async function subject(): Promise<string> {
      // Initialize tokenAddress to deployed token's address unless subjectTokenAddress is overwritten in test cases
      const tokenAddress = subjectTokenAddress || mockToken.address;

      return vault.withdrawTo.sendTransactionAsync(
        tokenAddress,
        subjectReceiver,
        subjectAmountToWithdraw,
        { from: subjectCaller },
      );
    }

    it("should decrement the mock token balance of the vault by the correct amount", async () => {
      await subject();

      assertTokenBalance(mockToken, ZERO, vault.address);
    });

    it("should increment the mock token balance of the receiver by the correct amount", async () => {
      await subject();

      assertTokenBalance(mockToken, subjectAmountToWithdraw, subjectReceiver);
    });

    it("should not update the balances mapping", async () => {
      const existingOwnerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);

      await subject();

      const ownerBalance = await vault.balances.callAsync(mockToken.address, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(existingOwnerBalance);
    });

    describe("when working with a bad ERC20 token", async () => {
      beforeEach(async () => {
        mockToken = await erc20Wrapper.deployTokenWithInvalidBalancesAsync(vault.address);
        subjectTokenAddress = mockToken.address;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the caller is not authorized", async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the receiver is not null address", async () => {
      beforeEach(async () => {
        subjectReceiver = NULL_ADDRESS;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the receiver is vault address", async () => {
      beforeEach(async () => {
        subjectReceiver = vault.address;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the amount to withdraw is zero", async () => {
      beforeEach(async () => {
        subjectAmountToWithdraw = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token has a transfer fee", async () => {
      let mockTokenWithFee: StandardTokenWithFeeMockContract;

      beforeEach(async () => {
        mockTokenWithFee = await erc20Wrapper.deployTokenWithFeeAsync(ownerAccount);
        subjectTokenAddress = mockTokenWithFee.address;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token doesn't return a value on transfer", async () => {
      let mockTokenNoXferReturn: MockTokenNoXferReturnContract;

      beforeEach(async () => {
        mockTokenNoXferReturn = await erc20Wrapper.deployTokenNoXferReturnAsync(vault.address);
        subjectTokenAddress = mockTokenNoXferReturn.address;
      });

      it("should still work", async () => {
        await subject();

        const tokenBalance = await mockTokenNoXferReturn.balanceOf.callAsync(subjectReceiver);
        await expect(tokenBalance).to.be.bignumber.equal(subjectAmountToWithdraw);
      });
    });


    describe("when the token returns an invalid value", async () => {
      let mockTokenInvalidReturn: MockTokenInvalidReturnContract;

      beforeEach(async () => {
        mockTokenInvalidReturn = await erc20Wrapper.deployTokenInvalidReturnAsync(vault.address);
        subjectTokenAddress = mockTokenInvalidReturn.address;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#incrementTokenOwner", async () => {
    const tokenAddress: Address = NULL_ADDRESS;
    const authorized: Address = authorizedAccount;
    let subjectCaller: Address = authorizedAccount;
    let subjectAmountToIncrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorized);
    });

    afterEach(async () => {
      subjectCaller = authorizedAccount;
      subjectAmountToIncrement = DEPLOYED_TOKEN_QUANTITY;
    });

    async function subject(): Promise<string> {
      return vault.incrementTokenOwner.sendTransactionAsync(
        ownerAccount,
        tokenAddress,
        subjectAmountToIncrement,
        { from: subjectCaller },
      );
    }

    it("should increment the balance of the user by the correct amount", async () => {
      await subject();

      const ownerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(subjectAmountToIncrement);
    });

    describe("when the caller is not authorized", async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the incrementAmount is zero", async () => {
      beforeEach(async () => {
        subjectAmountToIncrement = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#decrementTokenOwner", async () => {
    const amountToIncrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    const tokenAddress: Address = NULL_ADDRESS;
    let subjectAmountToDecrement: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectCaller: Address = authorizedAccount;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorizedAccount);
      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        tokenAddress,
        amountToIncrement,
        authorizedAccount,
      );
    });

    afterEach(async () => {
      subjectAmountToDecrement = DEPLOYED_TOKEN_QUANTITY;
      subjectCaller = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return vault.decrementTokenOwner.sendTransactionAsync(
        ownerAccount,
        tokenAddress,
        subjectAmountToDecrement,
        { from: subjectCaller },
      );
    }

    it("should decrement the balance of the user by the correct amount", async () => {
      await subject();

      const ownerBalance = await vault.balances.callAsync(tokenAddress, ownerAccount);
      expect(ownerBalance).to.be.bignumber.equal(ZERO);
    });

    describe("when the caller is not authorized", async () => {
      beforeEach(async () => {
        subjectCaller = unauthorizedAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the decrementAmount is larger than balance", async () => {
      beforeEach(async () => {
        subjectAmountToDecrement = DEPLOYED_TOKEN_QUANTITY.add(1);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the decrementAmount is zero", async () => {
      beforeEach(async () => {
        subjectAmountToDecrement = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#getOwnerBalance", async () => {
    const balance: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let subjectCaller: Address = ownerAccount;
    let subjectTokenAddress: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, authorizedAccount);

      mockToken = await erc20Wrapper.deployTokenAsync(vault.address);
      await coreWrapper.incrementAccountBalanceAsync(
        vault,
        ownerAccount,
        mockToken.address,
        balance,
        authorizedAccount,
      );
    });

    afterEach(async () => {
      subjectCaller = ownerAccount;
      subjectTokenAddress = null;
    });

    async function subject(): Promise<BigNumber> {
      // Initialize tokenAddress to deployed token's address unless subjectTokenAddress is overwritten in test cases
      const tokenAddress = subjectTokenAddress || mockToken.address;

      return vault.getOwnerBalance.callAsync(
        ownerAccount,
        tokenAddress,
        { from: subjectCaller },
      );
    }

    it("should return the correct balance for the owner", async () => {
      const ownerBalance = await subject();

      expect(ownerBalance).to.be.bignumber.equal(balance);
    });

    describe("when the caller is not the owner", async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it("should still return the correct balance for the owner", async () => {
        const ownerBalance = await subject();

        expect(ownerBalance).to.be.bignumber.equal(balance);
      });
    });

    describe("when the token address has no balances", async () => {
      beforeEach(async () => {
        subjectTokenAddress = NULL_ADDRESS;
      });

      it("should return zero", async () => {
        const ownerBalance = await subject();

        expect(ownerBalance).to.be.bignumber.equal(0);
      });
    });
  });
});
