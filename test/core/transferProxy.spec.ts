import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address } from "../../types/common.js";

// Contract types
import { MockTokenInvalidReturnContract } from "../../types/generated/mock_token_invalid_return";
import { MockTokenNoXferReturnContract } from "../../types/generated/mock_token_no_xfer_return";
import { StandardTokenContract } from "../../types/generated/standard_token";
import { StandardTokenMockContract } from "../../types/generated/standard_token_mock";
import { StandardTokenWithFeeMockContract } from "../../types/generated/standard_token_with_fee_mock";
import { TransferProxyContract } from "../../types/generated/transfer_proxy";

// Artifacts
const TransferProxy = artifacts.require("TransferProxy");

// Core wrapper
import { CoreWrapper } from "../utils/coreWrapper";
import { ERC20Wrapper } from "../utils/erc20Wrapper";

// Testing Set up
import { BigNumberSetup } from "../config/bigNumberSetup";
import ChaiSetup from "../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import { assertTokenBalance, expectRevertError } from "../utils/tokenAssertions";
import {
  DEPLOYED_TOKEN_QUANTITY,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "../utils/constants";

contract("TransferProxy", (accounts) => {
  const [
    ownerAccount,
    authorizedAccount,
    vaultAccount,
    otherAccount,
    unauthorizedAccount,
  ] = accounts;

  let mockToken: StandardTokenMockContract;
  let transferProxy: TransferProxyContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(TransferProxy.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(TransferProxy.abi);
  });

  describe("#setVaultAddress", async () => {
    // Setup
    beforeEach(async () => {
      transferProxy = await coreWrapper.deployTransferProxyAsync(vaultAccount);
    });

    // Subject
    let caller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return transferProxy.setVaultAddress.sendTransactionAsync(
        vaultAccount,
        { from: caller },
      );
    }

    it("sets vault address correctly", async () => {
      await subject();

      const storedVaultAddress = await transferProxy.vaultAddress.callAsync();
      expect(storedVaultAddress).to.eql(vaultAccount);
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

  describe("#transferToVault", async () => {
    // Setup
    let approver: Address = ownerAccount;
    let authorizedContract: Address = authorizedAccount;
    let subjectCaller: Address = ownerAccount;
    let amountToTransfer: BigNumber = DEPLOYED_TOKEN_QUANTITY;
    let tokenAddress: Address;

    beforeEach(async () => {
      transferProxy = await coreWrapper.deployTransferProxyAsync(vaultAccount);
      await coreWrapper.addAuthorizationAsync(transferProxy, authorizedContract);
      mockToken = await erc20Wrapper.deployTokenAsync(ownerAccount);
      await erc20Wrapper.approveTransferAsync(mockToken, transferProxy.address, approver);
    });

    afterEach(async () => {
      approver = ownerAccount;
      authorizedContract = authorizedAccount;
      subjectCaller = ownerAccount;
      amountToTransfer = DEPLOYED_TOKEN_QUANTITY;
    });

    async function subject(): Promise<string> {
      // Initialize tokenToTransfer to deployed token's address unless tokenAddress is overwritten in test cases
      const tokenToTransfer = tokenAddress || mockToken.address;

      return transferProxy.transferToVault.sendTransactionAsync(
        subjectCaller,
        tokenToTransfer,
        amountToTransfer,
        { from: authorizedContract },
      );
    }

    it("should decrement the balance of the user", async () => {
      await subject();

      assertTokenBalance(mockToken, new BigNumber(0), ownerAccount);
    });

    it("should increment the balance of the vault", async () => {
      await subject();

      assertTokenBalance(mockToken, amountToTransfer, vaultAccount);
    });

    describe("when the owner of the token is not the user", async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the caller is not authorized", async () => {
      beforeEach(async () => {
        authorizedContract = unauthorizedAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token is not approved for transfer", async () => {
      before(async () => {
        approver = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token has a transfer fee", async () => {
      let mockTokenWithFee: StandardTokenWithFeeMockContract;

      beforeEach(async () => {
        mockTokenWithFee = await erc20Wrapper.deployTokenWithFeeAsync(ownerAccount);
        tokenAddress = mockTokenWithFee.address;

        await erc20Wrapper.approveTransferAsync(mockTokenWithFee, transferProxy.address, ownerAccount);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the token doesn't return a value on transfer", async () => {
      let mockTokenNoXferReturn: MockTokenNoXferReturnContract;

      beforeEach(async () => {
        mockTokenNoXferReturn = await erc20Wrapper.deployTokenNoXferReturnAsync(ownerAccount);
        tokenAddress = mockTokenNoXferReturn.address;

        await mockTokenNoXferReturn.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          { from: ownerAccount },
        )
      });

      it("should still work", async () => {
        await subject();

        const tokenBalance = await mockTokenNoXferReturn.balanceOf.callAsync(vaultAccount);
        await expect(tokenBalance).to.be.bignumber.equal(amountToTransfer);
      });
    });

    describe("when the token returns an invalid value", async () => {
      let mockTokenInvalidReturn: MockTokenInvalidReturnContract;

      beforeEach(async () => {
        mockTokenInvalidReturn = await erc20Wrapper.deployTokenInvalidReturnAsync(ownerAccount);
        tokenAddress = mockTokenInvalidReturn.address;

        await erc20Wrapper.approveInvalidTransferAsync(mockTokenInvalidReturn, transferProxy.address, ownerAccount);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
