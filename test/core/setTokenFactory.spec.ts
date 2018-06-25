import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address } from "../../types/common.js";

// Contract types
import { StandardTokenContract } from "../../types/generated/standard_token";
import { StandardTokenMockContract } from "../../types/generated/standard_token_mock";
import { SetTokenFactoryContract } from "../../types/generated/set_token_factory";

// Artifacts
const SetTokenFactory = artifacts.require("SetTokenFactory");

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
import { DEPLOYED_TOKEN_QUANTITY, ZERO } from "../utils/constants";

contract("SetTokenFactory", (accounts) => {
  const [
    deployerAccount,
    authorizedAccount,
    nonAuthorizedAccount,
    coreAccount,
  ] = accounts;

  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(deployerAccount, deployerAccount);
  const erc20Wrapper = new ERC20Wrapper(deployerAccount);

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
        const deployedComponent: StandardTokenMockContract = await erc20Wrapper.deployTokenAsync(deployerAccount);

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

  describe("#setCoreAddress", async () => {
    let subjectCaller: Address = deployerAccount;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    });

    async function subject(): Promise<string> {
      return setTokenFactory.setCoreAddress.sendTransactionAsync(
        coreAccount,
        { from: subjectCaller },
      );
    }

    it("sets core address correctly", async () => {
      await subject();

      const storedCoreAddress = await setTokenFactory.core.callAsync();
      expect(storedCoreAddress).to.eql(coreAccount);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        subjectCaller = nonAuthorizedAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
