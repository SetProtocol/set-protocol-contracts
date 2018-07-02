import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../utils/units";

// Types
import { Address, Log, UInt } from "../../../types/common.js";

// Contract types
import { CoreContract } from "../../../types/generated/core";

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
  EXCHANGES,
} from "../../utils/constants";

import {
  expectRevertError,
} from "../../utils/tokenAssertions";

import { getFormattedLogsFromTxHash } from "../../logs/logUtils";
import { assertLogEquivalence } from "../../logs/logAssertions";
import { ExchangeRegistered } from "../../logs/contracts/core";

contract("CoreExchangeDispatcher", (accounts) => {
  const [
    ownerAccount,
    notOwnerAccount,
    zeroExWrapperAddress,
  ] = accounts;

  let core: CoreContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    core = await coreWrapper.deployCoreAsync();
  });

  describe("#registerExchange", async () => {
    let subjectCaller: Address;
    let subjectExchangeId: UInt;
    let subjectExchangeAddress: Address;

    beforeEach(async () => {
      subjectCaller = ownerAccount;
      subjectExchangeId = EXCHANGES.ZERO_EX;
      subjectExchangeAddress = zeroExWrapperAddress;
    });

    async function subject(): Promise<string> {
      return core.registerExchange.sendTransactionAsync(
        subjectExchangeId,
        subjectExchangeAddress,
        { from: subjectCaller },
      );
    }

    it("sets exchange address correctly", async () => {
      await subject();

      const exchangeAddress = await core.exchanges.callAsync(subjectExchangeId);
      expect(exchangeAddress).to.eql(subjectExchangeAddress);
    });

    it("emits a IssuanceComponentDeposited even for each component deposited", async () => {
      const txHash = await subject();
      const formattedLogs = await getFormattedLogsFromTxHash(txHash);

      const expectedLogs: Log[] = [
        ExchangeRegistered(
          core.address,
          new BigNumber(subjectExchangeId),
          subjectExchangeAddress,
        )
      ];

      await assertLogEquivalence(expectedLogs, formattedLogs);
    });

    describe("when the caller is not the owner of the contract", async () => {
      beforeEach(async () => {
        subjectCaller = notOwnerAccount;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
