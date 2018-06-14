import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, Bytes32, Log, UInt } from "../types/common.js";

// Contract types
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { StandardTokenWithFeeMockContract } from "../types/generated/standard_token_with_fee_mock";
import { SetTokenFactoryContract } from "../types/generated/set_token_factory";
import { SetTokenContract } from "../types/generated/set_token";

// Artifacts
const SetToken = artifacts.require("SetToken");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const StandardTokenWithFeeMock = artifacts.require("StandardTokenWithFeeMock");

// Core wrapper
import { CoreWrapper } from "./utils/coreWrapper";

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import { getFormattedLogsFromTxHash } from "./logs/log_utils";

import {
  getExpectedIssueLogs,
  getExpectedPartialRedeemLogs,
  getExpectedRedeemExcludedLogs,
  getExpectedRedeemLogs,
} from "./logs/SetToken";

import {
  assertTokenBalance,
  expectInvalidOpcodeError,
  expectRevertError,
} from "./utils/tokenAssertions";
import {
  INVALID_OPCODE,
  NULL_ADDRESS,
  REVERT_ERROR,
  STANDARD_INITIAL_TOKENS,
  STANDARD_NATURAL_UNIT,
  STANDARD_QUANTITY_ISSUED,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "./constants/constants";

contract("SetToken", (accounts) => {
  const [
    deployerAccount,
    otherAccount,
    coreAccount,
  ] = accounts;

  let components: StandardTokenMockContract[] = [];
  let setToken: SetTokenContract;
  let factory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);

  before(async () => {
    // Initialize ABI Decoders for deciphering log receipts
    ABIDecoder.addABI(SetToken.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(SetToken.abi);
  });

  describe("#mint", async () => {
    const tokenReceiver: Address = deployerAccount;
    const quantityToMint: BigNumber = STANDARD_NATURAL_UNIT;
    let subjectCaller: Address = coreAccount;

    beforeEach(async () => {
      components = await coreWrapper.deployTokensAsync(3, deployerAccount);
      factory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setCoreAddress(factory, coreAccount);

      const componentAddresses = _.map(components, (token) => token.address);
      const componentUnits = _.map(components, () => ether(Math.ceil(Math.random() * Math.floor(4))));
      setToken = await coreWrapper.deploySetTokenAsync(
        factory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
        "Set Token",
        "SET",
      );
    });

    afterEach(async () => {
      subjectCaller = coreAccount;
    });

    async function subject(): Promise<string> {
      return setToken.mint.sendTransactionAsync(
        tokenReceiver,
        quantityToMint,
        { from: subjectCaller },
      );
    }

    it("increments the balance of the issuer by the correct amount", async () => {
      const existingUserBalance = await setToken.balanceOf.callAsync(tokenReceiver);

      await subject();

      const expectedSupply = existingUserBalance.add(quantityToMint);
      assertTokenBalance(setToken, expectedSupply, tokenReceiver);
    });

    it("updates the total supply by the correct amount", async () => {
      const existingTokenSupply = await setToken.totalSupply.callAsync();

      await subject();

      const newTokenSupply = await setToken.totalSupply.callAsync();
      expect(newTokenSupply).to.be.bignumber.equal(existingTokenSupply.add(quantityToMint));
    });

    describe("when the caller is not authorized", async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it("increments the balance of the issuer by the correct amount", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
