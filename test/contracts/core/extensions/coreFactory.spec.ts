import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../../utils/units";

// Types
import { Address, Log } from "../../../../types/common.js";

// Contract types
import { CoreContract } from "../../../../types/generated/core";
import { SetTokenContract } from "../../../../types/generated/set_token";
import { SetTokenFactoryContract } from "../../../../types/generated/set_token_factory";
import { StandardTokenMockContract } from "../../../../types/generated/standard_token_mock";

// Artifacts
const Core = artifacts.require("Core");

// Core wrapper
import { CoreWrapper } from "../../../utils/coreWrapper";
import { ERC20Wrapper } from "../../../utils/erc20Wrapper";

// Testing Set up
import { BigNumberSetup } from "../../../utils/bigNumberSetup";
import ChaiSetup from "../../../utils/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect } = chai;

import {
  expectRevertError,
} from "../../../utils/tokenAssertions";

import {
  extractNewSetTokenAddressFromLogs,
  IssuanceComponentDeposited,
  SetTokenCreated,
} from "../../../utils/contract_logs/core";

import { 
  assertLogEquivalence,
  getFormattedLogsFromTxHash
} from "../../../utils/logs";

import {
  NULL_ADDRESS,
  ONE,
  STANDARD_NATURAL_UNIT,
} from "../../../utils/constants";

contract("CoreFactory", (accounts) => {
  const [
    ownerAccount,
    otherAccount,
  ] = accounts;

  let core: CoreContract;
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
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    await coreWrapper.addAuthorizationAsync(setTokenFactory, core.address);
    await coreWrapper.setCoreAddress(setTokenFactory, core.address);
    await coreWrapper.enableFactoryAsync(core, setTokenFactory);
  });

  describe("#create", async () => {
    let factoryAddress: Address;
    let components: Address[];
    let mockToken: StandardTokenMockContract;
    const units: BigNumber[] = [ONE];
    const naturalUnit: BigNumber = ONE;
    const name = "New Set";
    const symbol = "SET";

    beforeEach(async () => {
      mockToken = await erc20Wrapper.deployTokenAsync(ownerAccount);

      factoryAddress = setTokenFactory.address;
      components = [mockToken.address];
    });

    async function subject(): Promise<string> {
      return core.create.sendTransactionAsync(
        factoryAddress,
        components,
        units,
        naturalUnit,
        name,
        symbol,
        { from: ownerAccount },
      );
    }

    it("creates a new SetToken and tracks it in mapping", async () => {
      const txHash = await subject();

      const logs = await getFormattedLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const isSetTokenValid = await core.validSets.callAsync(newSetTokenAddress);
      expect(isSetTokenValid).to.be.true;
    });

    it("creates a new SetToken and adds to setTokens array", async () => {
      const txHash = await subject();

      const logs = await getFormattedLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const setTokens = await core.setTokens.callAsync();
      expect(setTokens).to.include(newSetTokenAddress);
    });

    it("emits a SetTokenCreated event", async () => {
      const txHash = await subject();
      const logs = await getFormattedLogsFromTxHash(txHash);
      const newSetTokenAddress = extractNewSetTokenAddressFromLogs(logs);

      const expectedLogs: Log[] = [
        SetTokenCreated(
          core.address,
          newSetTokenAddress,
          factoryAddress,
          components,
          units,
          naturalUnit,
          name,
          symbol,
        ),
      ];

      await assertLogEquivalence(expectedLogs, logs);
    });

    describe("when the factory is not valid", async () => {
      beforeEach(async () => {
        factoryAddress = NULL_ADDRESS;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
