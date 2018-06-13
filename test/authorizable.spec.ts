import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address, Log, UInt } from "../types/common.js";

// Contract types
import { AuthorizableContract } from "../types/generated/authorizable";

// Artifacts
const Authorizable = artifacts.require("Authorizable");

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
  expectLogEquivalenceAddAuthorized,
  expectLogEquivalenceRemoveAuthorized,
} from "./logs/logAssertions";

import {
  expectRevertError,
} from "./utils/tokenAssertions";
import {
  STANDARD_INITIAL_TOKENS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "./constants/constants";

contract("Authorizable", (accounts) => {
  const [
    ownerAccount,
    otherAccount,
    authorizedAccount,
    authAccount1,
    authAccount2,
  ] = accounts;
  const TX_DEFAULTS = { from: ownerAccount, gas: 7000000 };

  let authorizableContract: AuthorizableContract;
  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Authorizable.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Authorizable.abi);
  });

  describe("#addAuthorizedAddress", async () => {
    let caller: Address = ownerAccount;

    beforeEach(async () => {
      authorizableContract = await coreWrapper.deployAuthorizableAsync();
    });

    afterEach(async () => {
      caller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return authorizableContract.addAuthorizedAddress.sendTransactionAsync(
        authorizedAccount,
        { from: caller },
      );
    }

    it("sets authorized mapping correctly", async () => {
      await subject();

      const storedAuthAddress = await authorizableContract.authorized.callAsync(
        authorizedAccount,
      );
      expect(storedAuthAddress).to.eql(true);
    });

    it("sets authorities array correctly", async () => {
      await subject();

      const authoritiesArray = await authorizableContract.getAuthorizedAddresses.callAsync();

      expect(authoritiesArray.length).to.eql(1);
      expect(authoritiesArray[0]).to.eql(authorizedAccount);
    });

    it("emits correct AddressAuthorized log", async () => {
      const txHash = await subject();

      expectLogEquivalenceAddAuthorized(txHash, authorizedAccount, caller, authorizableContract.address);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        caller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the passed address is already authorized", async () => {
      beforeEach(async () => {
        await authorizableContract.addAuthorizedAddress.sendTransactionAsync(
          authorizedAccount,
          { from: caller },
        );
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#removeAuthorizedAddress", async () => {
    let caller: Address = ownerAccount;
    let addressToRemove: Address = authorizedAccount;

    beforeEach(async () => {
      authorizableContract = await coreWrapper.deployAuthorizableAsync();
      await coreWrapper.addAuthorizationAsync(authorizableContract, authorizedAccount);
    });

    afterEach(async () => {
      caller = ownerAccount;
      addressToRemove = authorizedAccount;
    });

    async function subject(): Promise<string> {
      return authorizableContract.removeAuthorizedAddress.sendTransactionAsync(
        addressToRemove,
        { from: caller },
      );
    }

    it("removes address from authorized mapping", async () => {
      await subject();

      const storedAuthAddress = await authorizableContract.authorized.callAsync(
        addressToRemove,
      );
      expect(storedAuthAddress).to.eql(false);
    });

    it("removes address from authorities array", async () => {
      await subject();

      const authoritiesArray = await authorizableContract.getAuthorizedAddresses.callAsync();

      expect(authoritiesArray.length).to.eql(0);
    });

    it("emits correct AuthorizedAddressRemoved log", async () => {
      const txHash = await subject();

      expectLogEquivalenceRemoveAuthorized(txHash, addressToRemove, caller, authorizableContract.address);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        caller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the passed address is not authorized", async () => {
      beforeEach(async () => {
        addressToRemove = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#removeAuthorizedAddressAtindexToRemove", async () => {
    let caller: Address = ownerAccount;
    let addressToRemove: Address = authorizedAccount;
    let indexToRemove: BigNumber = new BigNumber(2);

    beforeEach(async () => {
      authorizableContract = await coreWrapper.deployAuthorizableAsync();

      const authAccountArray: Address[] = [authAccount1, authAccount2, authorizedAccount];
      for (const account of authAccountArray) {
        await coreWrapper.addAuthorizationAsync(authorizableContract, account);
      }
    });

    afterEach(async () => {
      caller = ownerAccount;
      addressToRemove = authorizedAccount;
      indexToRemove = new BigNumber(2);
    });

    async function subject(): Promise<string> {
      return authorizableContract.removeAuthorizedAddressAtIndex.sendTransactionAsync(
        addressToRemove,
        indexToRemove,
        { from: caller },
      );
    }

    it("removes address from authorized mapping", async () => {
      await subject();

      const storedAuthAddress = await authorizableContract.authorized.callAsync(
        addressToRemove,
      );

      expect(storedAuthAddress).to.eql(false);
    });

    it("removes address from authorities array", async () => {
      await subject();

      const newAuthoritiesArray = await authorizableContract.getAuthorizedAddresses.callAsync();
      expect(newAuthoritiesArray).to.not.include(addressToRemove);
    });

    it("emits correct AuthorizedAddressRemoved log", async () => {
      const txHash = await subject();

      expectLogEquivalenceRemoveAuthorized(txHash, addressToRemove, caller, authorizableContract.address);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        caller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the passed indexToRemove is not in array", async () => {
      beforeEach(async () => {
        indexToRemove = new BigNumber(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the passed indexToRemove does not match target address", async () => {
      beforeEach(async () => {
        indexToRemove = new BigNumber(1);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
