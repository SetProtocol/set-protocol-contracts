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

  let authorizable: AuthorizableContract;

  const deployAuthorizable = async (from: Address = ownerAccount) => {
    const truffleAuthorizable = await Authorizable.new(
      { from, gas: 7000000 },
    );

    const authorizableWeb3Contract = web3.eth
      .contract(truffleAuthorizable.abi)
      .at(truffleAuthorizable.address);

    authorizable = new AuthorizableContract(
      authorizableWeb3Contract,
      { from, gas: 7000000 },
    );
  };

  const addAuthorizableAddress = async (authAddress: Address, from: Address = ownerAccount) => {
    authorizable.addAuthorizedAddress.sendTransactionAsync(
      authAddress,
      { from },
    );
  };

  before(async () => {
    ABIDecoder.addABI(Authorizable.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Authorizable.abi);
  });

  describe("#addAuthorizedAddress", async () => {
    beforeEach(async () => {
      await deployAuthorizable();
    });

    afterEach(async () => {
      caller = ownerAccount;
    });

    let caller: Address = ownerAccount;

    async function subject(): Promise<string> {
      return authorizable.addAuthorizedAddress.sendTransactionAsync(
        authorizedAccount,
        { from: caller },
      );
    }

    it("sets authorized mapping correctly", async () => {
      await subject();

      const storedAuthAddress = await authorizable.authorized.callAsync(
        authorizedAccount,
      );
      expect(storedAuthAddress).to.eql(true);
    });

    it("sets authorities array correctly", async () => {
      await subject();

      const authoritiesArray = await authorizable.getAuthorizedAddresses.callAsync();

      expect(authoritiesArray.length).to.eql(1);
      expect(authoritiesArray[0]).to.eql(authorizedAccount);
    });

    it("emits correct AddressAuthorized log", async () => {
      const txHash = await subject();

      expectLogEquivalenceAddAuthorized(txHash, authorizedAccount, caller, authorizable.address);
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
        await authorizable.addAuthorizedAddress.sendTransactionAsync(
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
    beforeEach(async () => {
      await deployAuthorizable();
      await addAuthorizableAddress(authorizedAccount);
    });

    afterEach(async () => {
      caller = ownerAccount;
      removedAddress = authorizedAccount;
    });

    let caller: Address = ownerAccount;
    let removedAddress: Address = authorizedAccount;

    async function subject(): Promise<string> {
      return authorizable.removeAuthorizedAddress.sendTransactionAsync(
        removedAddress,
        { from: caller },
      );
    }

    it("removes address from authorized mapping", async () => {
      await subject();

      const storedAuthAddress = await authorizable.authorized.callAsync(
        removedAddress,
      );
      expect(storedAuthAddress).to.eql(false);
    });

    it("removes address from authorities array", async () => {
      await subject();

      const authoritiesArray = await authorizable.getAuthorizedAddresses.callAsync();

      expect(authoritiesArray.length).to.eql(0);
    });

    it("emits correct AuthorizedAddressRemoved log", async () => {
      const txHash = await subject();

      expectLogEquivalenceRemoveAuthorized(txHash, removedAddress, caller, authorizable.address);
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
        removedAddress = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#removeAuthorizedAddressAtIndex", async () => {
    beforeEach(async () => {
      await deployAuthorizable();

      const authAccountArray: Address[] = [authAccount1, authAccount2, authorizedAccount];
      for (const account of authAccountArray) {
        await addAuthorizableAddress(account);
      }
    });

    afterEach(async () => {
      caller = ownerAccount;
      removedAddress = authorizedAccount;
      index = new BigNumber(2);
    });

    let caller: Address = ownerAccount;
    let removedAddress: Address = authorizedAccount;
    let index: BigNumber = new BigNumber(2);

    async function subject(): Promise<string> {
      return authorizable.removeAuthorizedAddressAtIndex.sendTransactionAsync(
        removedAddress,
        index,
        { from: caller },
      );
    }

    it("removes address from authorized mapping", async () => {
      await subject();

      const storedAuthAddress = await authorizable.authorized.callAsync(
        removedAddress,
      );

      expect(storedAuthAddress).to.eql(false);
    });

    it("removes address from authorities array", async () => {
      await subject();

      const newAuthoritiesArray = await authorizable.getAuthorizedAddresses.callAsync();

      expect(newAuthoritiesArray).to.not.include(removedAddress);
    });

    it("emits correct AuthorizedAddressRemoved log", async () => {
      const txHash = await subject();

      expectLogEquivalenceRemoveAuthorized(txHash, removedAddress, caller, authorizable.address);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        caller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the passed index is not in array", async () => {
      beforeEach(async () => {
        index = new BigNumber(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the passed index does not match target address", async () => {
      beforeEach(async () => {
        index = new BigNumber(1);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
