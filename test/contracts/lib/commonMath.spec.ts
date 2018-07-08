import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address } from "../../../types/common.js";

// Contract types
import { CommonMathMockContract } from "../../../types/generated/common_math_mock";

// Wrappers
import { LibraryMockWrapper } from "../../utils/libraryMockWrapper";

// Testing Set up
import { BigNumberSetup } from "../../utils/bigNumberSetup";
import ChaiSetup from "../../utils/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;


contract("CommonMathMock", (accounts) => {
  const [ownerAccount] = accounts;
  const libraryMockWrapper = new LibraryMockWrapper(ownerAccount);

  let commonMathLibrary: CommonMathMockContract;

  describe("#testMaxUInt256", async () => {
    let caller: Address = ownerAccount;

    beforeEach(async () => {
      commonMathLibrary = await libraryMockWrapper.deployCommonMathLibraryAsync()
    });

    async function subject(): Promise<BigNumber> {
      return commonMathLibrary.testMaxUInt256.callAsync(
        { from: ownerAccount },
      );
    }

    it("returns the max allowed integer", async () => {
      const maxUInt256 = await subject();

      const expectedMaxUInt256 = new BigNumber('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77');
      expect(maxUInt256).to.be.bignumber.equal(expectedMaxUInt256);
    });
  });
});
