import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address } from "../../../types/common.js";

// Contract types
import { InvalidReturnTokenMockContract } from "../../../types/generated/invalid_return_token_mock";
import { ERC20WrapperMockContract } from "../../../types/generated/erc20_wrapper_mock";
import { StandardTokenMockContract } from "../../../types/generated/standard_token_mock";

// Wrappers
import { LibraryMockWrapper } from "../../utils/libraryMockWrapper";
import { ERC20Wrapper } from "../../utils/erc20Wrapper";

// Testing Set up
import { BigNumberSetup } from "../../utils/bigNumberSetup";
import ChaiSetup from "../../utils/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  assertTokenBalance,
  expectRevertError
} from "../../utils/tokenAssertions";

import {
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
  ZERO,
} from "../../utils/constants";


contract("ERC20WrapperMock", (accounts) => {
  const [
    deployerAccount,
    ownerAccount,
    spenderAccount
  ] = accounts;

  let erc20WrapperLibrary: ERC20WrapperMockContract;

  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const libraryMockWrapper = new LibraryMockWrapper(deployerAccount);

  describe("#approve", async () => {
    const subjectTransferAllowance: BigNumber = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
    let subjectTokenAddress: Address;
    let token: StandardTokenMockContract;
    let caller: Address = ownerAccount;

    beforeEach(async () => {
      token = await erc20Wrapper.deployTokenAsync(ownerAccount);
      subjectTokenAddress = token.address

      erc20WrapperLibrary = await libraryMockWrapper.deployERC20WrapperLibraryAsync();
    });

    async function subject(): Promise<string> {
      return erc20WrapperLibrary.approve.sendTransactionAsync(
        subjectTokenAddress,
        spenderAccount,
        subjectTransferAllowance,
        { from: ownerAccount },
      );
    }

    it("approves the spender on behalf of the calling contract", async () => {
      const existingAllowance = await token.allowance.callAsync(
        erc20WrapperLibrary.address,
        spenderAccount
      );

      await subject();

      const expectedNewAllowance = existingAllowance.add(subjectTransferAllowance);
      const newSpenderAllowance = await token.allowance.callAsync(
        erc20WrapperLibrary.address,
        spenderAccount
      );
      expect(newSpenderAllowance).to.bignumber.equal(subjectTransferAllowance);
    });

    describe("#when the token has an invalid return", async () => {
      let invalidReturnToken: InvalidReturnTokenMockContract;

      beforeEach(async () => {
        invalidReturnToken = await erc20Wrapper.deployTokenInvalidReturnAsync(ownerAccount);
        subjectTokenAddress = invalidReturnToken.address;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#allowance", async () => {
    let token: StandardTokenMockContract;
    let caller: Address = ownerAccount;

    beforeEach(async () => {
      token = await erc20Wrapper.deployTokenAsync(ownerAccount);
      erc20WrapperLibrary = await libraryMockWrapper.deployERC20WrapperLibraryAsync();
    });

    async function subject(): Promise<BigNumber> {
      return erc20WrapperLibrary.allowance.callAsync(
        token.address,
        ownerAccount,
        spenderAccount,
        { from: ownerAccount },
      );
    }

    it("approves the spender on behalf of the calling contract", async () => {
      const allowance = await subject();
      expect(allowance).to.bignumber.equal(ZERO);
    });
  });
});
