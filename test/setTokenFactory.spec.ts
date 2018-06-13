import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address } from "../types/common.js";

// Contract types
import { StandardTokenContract } from "../types/generated/standard_token";
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { SetTokenFactoryContract } from "../types/generated/set_token_factory";

// Artifacts
const SetTokenFactory = artifacts.require("SetTokenFactory");

// Core wrapper
import { CoreWrapper } from "./utils/coreWrapper";

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import { assertTokenBalance, expectRevertError } from "./utils/tokenAssertions";
import { STANDARD_INITIAL_TOKENS, ZERO } from "./constants/constants";

contract("SetTokenFactory", (accounts) => {
  const [
    authorizedAccount,
    nonAuthorizedAccount,
  ] = accounts;

  let mockToken: StandardTokenMockContract;
  let mockTokens: StandardTokenMockContract[] = [];
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(authorizedAccount, authorizedAccount);

  before(async () => {
    ABIDecoder.addABI(SetTokenFactory.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(SetTokenFactory.abi);
  });

  describe("#create", async () => {
    let caller: Address = authorizedAccount;
    let components: Address[] = [];
    let units: BigNumber[] = [];
    let naturalUnit: BigNumber = ZERO;

    // Setup
    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();

      await coreWrapper.addAuthorizationAsync(setTokenFactory, authorizedAccount);
    });

    async function subject(): Promise<string> {
      return setTokenFactory.create.sendTransactionAsync(
        components,
        units,
        naturalUnit,
        "Set Token Name",
        "SET",
        { from: caller },
      );
    }

    describe("when there is one component", async () => {
      beforeEach(async () => {
        const deployedComponent: StandardTokenMockContract = await coreWrapper.deployTokenAsync(
          authorizedAccount,
        );

        components = [deployedComponent.address];
        units = [new BigNumber(1)];
        naturalUnit = new BigNumber(1);
      });

      it("should create a SetToken correctly", async () => {
        const newSetAddress = await subject();

        expect(newSetAddress).to.not.be.null;
      });

      describe("when the caller is not authorized", async () => {
        beforeEach(async () => {
          caller = nonAuthorizedAccount;
        });

        it("should revert", async () => {
          await expectRevertError(subject());
        });
      });  
    });
  });
});
