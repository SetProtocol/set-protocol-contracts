import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, Log, UInt } from "../types/common.js";

// Contract types
import { TransferProxyContract } from "../types/generated/transfer_proxy";
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";

// Artifacts
const StandardTokenMock = artifacts.require("StandardTokenMock");
const TransferProxy = artifacts.require("TransferProxy");

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  assertTokenBalance,
  expectRevertError,
} from "./utils/tokenAssertions";
import {
  STANDARD_INITIAL_TOKENS,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
} from "./constants/constants";

contract("TransferProxy", (accounts) => {
  const [
    owner,
    authorizedAddress,
    vaultAddress,
  ] = accounts;

  const TX_DEFAULTS = { from: owner, gas: 7000000 };

  let mockToken: StandardTokenMockContract;
  let transferProxy: TransferProxyContract;

  const reset = async () => {
    mockToken = null;
  };

  const resetAndDeployTransferProxy = async () => {
    reset();

    const truffleMockToken = await StandardTokenMock.new(
      owner,
      STANDARD_INITIAL_TOKENS,
      "Mock Token",
      "MOCK",
      TX_DEFAULTS,
    );
    const mockTokenWeb3Contract = web3.eth
      .contract(truffleMockToken.abi)
      .at(truffleMockToken.address);

    mockToken = new StandardTokenMockContract(mockTokenWeb3Contract, TX_DEFAULTS);

    const truffleTransferProxy = await TransferProxy.new(vaultAddress, TX_DEFAULTS);
    const transferProxyWeb3Contract = web3.eth
      .contract(truffleTransferProxy.abi)
      .at(truffleTransferProxy.address);

    transferProxy = new TransferProxyContract(transferProxyWeb3Contract, TX_DEFAULTS);
  };

  const addAuthorizedAddressToTransferProxy = async (addressToAuthorize: Address) => {
     await transferProxy.addAuthorizedAddress.sendTransactionAsync(
       owner,
       TX_DEFAULTS,
     );
  }

  before(async () => {
    ABIDecoder.addABI(TransferProxy.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(TransferProxy.abi);
  });

  describe.only("#transferToVault", async () => {
    const amountToTransfer = STANDARD_INITIAL_TOKENS;

    beforeEach(async () => {
      await resetAndDeployTransferProxy();
    });

    async function subject(): Promise<string> {
      return transferProxy.transferToVault.sendTransactionAsync(
        owner,
        mockToken.address,
        amountToTransfer,
        TX_DEFAULTS,
      );
    }

    it("should revert", async () => {
      await expectRevertError(subject());
    });

    describe("when the user approves the token for transfer", async () => {
      beforeEach(async () => {
        await addAuthorizedAddressToTransferProxy(authorizedAddress);

        await mockToken.approve.sendTransactionAsync(
          transferProxy.address,
          UNLIMITED_ALLOWANCE_IN_BASE_UNITS,
          TX_DEFAULTS,
        );
      });

      it("should decerement the balance of the user", async () => {
        await subject();

        assertTokenBalance(mockToken, new BigNumber(0), owner);
      });

      it("should increment the balance of the vault", async () => {
        await subject();

        assertTokenBalance(mockToken, amountToTransfer, vaultAddress);
      });
    });
  });
});
