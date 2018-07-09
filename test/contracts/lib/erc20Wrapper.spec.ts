import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address } from "../../../types/common.js";

// Contract types
import { ERC20WrapperMockContract } from "../../../types/generated/e_r_c20_wrapper_mock";
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

import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from "../../utils/constants";


contract("ERC20WrapperMock", (accounts) => {
  const [
    deployerAccount,
    ownerAccount,
    spenderAccount
  ] = accounts;

  let erc20WrapperLibrary: ERC20WrapperMockContract;

  const erc20Wrapper = new ERC20Wrapper(deployerAccount);
  const libraryMockWrapper = new LibraryMockWrapper(deployerAccount);

  describe.only("#approve", async () => {
    const subjectTransferAllowance: BigNumber = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
    let token: StandardTokenMockContract;
    let caller: Address = ownerAccount;

    beforeEach(async () => {
      token = await erc20Wrapper.deployTokenAsync(ownerAccount);
      erc20WrapperLibrary = await libraryMockWrapper.deployERC20WrapperLibraryAsync();
    });

    async function subject(): Promise<string> {
      return erc20WrapperLibrary.approve.sendTransactionAsync(
        token.address,
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
  });
});
