import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../utils/units";

// Types
import { Address } from "../../../types/common.js";

// Contract types
import { CoreContract } from "../../../types/generated/core";
import { SetTokenContract } from "../../../types/generated/set_token";
import { SetTokenFactoryContract } from "../../../types/generated/set_token_factory";
import { StandardTokenMockContract } from "../../../types/generated/standard_token_mock";
import { TransferProxyContract } from "../../../types/generated/transfer_proxy";
import { VaultContract } from "../../../types/generated/vault";

// Artifacts
const Core = artifacts.require("Core");

// Core wrapper
import { CoreWrapper } from "../../utils/coreWrapper";
import { ERC20Wrapper } from "../../utils/erc20Wrapper";

// Testing Set up
import { BigNumberSetup } from "../../config/bigNumberSetup";
import ChaiSetup from "../../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

import {
  expectRevertError,
} from "../../utils/tokenAssertions";

import {
  STANDARD_NATURAL_UNIT,
} from "../../utils/constants";

contract("CoreInternal", (accounts) => {
  const [
    ownerAccount,
    otherAccount,
  ] = accounts;

  let core: CoreContract;
  let transferProxy: TransferProxyContract;
  let vault: VaultContract;
  let setTokenFactory: SetTokenFactoryContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
  });

  describe("#setVaultAddress", async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      await coreWrapper.addAuthorizationAsync(vault, core.address);

      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.setVaultAddress.sendTransactionAsync(
        vault.address,
        { from: subjectCaller },
      );
    }

    it("sets vault address correctly", async () => {
      await subject();

      const storedVaultAddress = await core.vaultAddress.callAsync();
      expect(storedVaultAddress).to.eql(vault.address);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#setTransferProxyAddress", async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();

      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.setTransferProxyAddress.sendTransactionAsync(
        transferProxy.address,
        { from: subjectCaller },
      );
    }

    it("sets transfer proxy address correctly", async () => {
      await subject();

      const storedTransferProxyAddress = await core.transferProxyAddress.callAsync();
      expect(storedTransferProxyAddress).to.eql(transferProxy.address);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#enableFactory", async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();

      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.enableFactory.sendTransactionAsync(
        setTokenFactory.address,
        { from: subjectCaller },
      );
    }

    it("adds setTokenFactory address correctly", async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
      expect(isFactoryValid).to.be.true;
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#disableFactory", async () => {
    let subjectCaller: Address;

    beforeEach(async () => {
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.enableFactoryAsync(core, setTokenFactory);

      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.disableFactory.sendTransactionAsync(
        setTokenFactory.address,
        { from: subjectCaller },
      );
    }

    it("disables setTokenFactory address correctly", async () => {
      await subject();

      const isFactoryValid = await core.validFactories.callAsync(setTokenFactory.address);
      expect(isFactoryValid).to.be.false;
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#disableSet", async () => {
    let setToken: SetTokenContract;
    let subjectCaller: Address;

    beforeEach(async () => {
      vault = await coreWrapper.deployVaultAsync();
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
      await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);

      const components = await erc20Wrapper.deployTokensAsync(2, ownerAccount);
      const componentAddresses = _.map(components, (token) => token.address);
      const componentUnits = _.map(components, () => STANDARD_NATURAL_UNIT); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        STANDARD_NATURAL_UNIT,
      );

      subjectCaller = ownerAccount;
    });

    async function subject(): Promise<string> {
      return core.disableSet.sendTransactionAsync(
        setToken.address,
        { from: subjectCaller },
      );
    }

    it("disables set token address correctly", async () => {
      await subject();

      const isSetValid = await core.validSets.callAsync(setToken.address);
      expect(isSetValid).to.be.false;
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        subjectCaller = otherAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
