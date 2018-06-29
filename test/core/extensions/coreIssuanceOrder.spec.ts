import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../utils/units";

// Types
import { Address, IssuanceOrder } from "../../../types/common.js";

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
import {
  generateFillOrderParameters,
} from "../../utils/orderWrapper";

// Testing Set up
import { BigNumberSetup } from "../../config/bigNumberSetup";
import ChaiSetup from "../../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  IssuanceComponentDeposited,
} from "../../logs/contracts/core";

import {
  assertTokenBalance,
  expectRevertError,
} from "../../utils/tokenAssertions";

import {
  DEPLOYED_TOKEN_QUANTITY,
  ZERO,
  NULL_ADDRESS,
} from "../../utils/constants";

contract("CoreIssuanceOrder", (accounts) => {
  const [
    ownerAccount,
    takerAccount,
    makerAccount,
    signerAccount,
    mockSetTokenAccount,
    mockTokenAccount
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
    vault = await coreWrapper.deployVaultAsync();
    transferProxy = await coreWrapper.deployTransferProxyAsync(vault.address);
    setTokenFactory = await coreWrapper.deploySetTokenFactoryAsync();
    await coreWrapper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
  });

  describe("#fillOrder", async () => {
    let subjectCaller: Address;
    let subjectQuantityToIssue: BigNumber;

    const naturalUnit: BigNumber = ether(2);
    let components: StandardTokenMockContract[] = [];
    let componentUnits: BigNumber[];
    let setToken: SetTokenContract;
    let signerAddress: Address;
    let componentAddresses: Address[];

    let issuanceOrderParams: any;

    beforeEach(async () => {
      signerAddress = signerAccount;

      components = await erc20Wrapper.deployTokensAsync(2, signerAddress); //For current purposes issue to maker/signer
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address, signerAddress);

      componentAddresses = _.map(components, (token) => token.address);
      componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        naturalUnit,
      );

      subjectCaller = takerAccount;
      subjectQuantityToIssue = ether(2);

      issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0]);
    });

    async function subject(): Promise<string> {
      return core.fillOrder.sendTransactionAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        subjectQuantityToIssue,
        issuanceOrderParams.signature.v,
        issuanceOrderParams.signature.r,
        issuanceOrderParams.signature.s,
        { from: subjectCaller },
      );
    }

    it("transfers the required tokens from the user", async () => {
      const component: StandardTokenMockContract = _.first(components);
      const unit: BigNumber = _.first(componentUnits);

      const existingBalance = await component.balanceOf.callAsync(signerAddress);
      assertTokenBalance(component, DEPLOYED_TOKEN_QUANTITY, signerAddress);
      await subject();

      const newBalance = await component.balanceOf.callAsync(signerAddress);
      const expectedNewBalance = existingBalance.sub(subjectQuantityToIssue.div(naturalUnit).mul(unit));
      expect(newBalance).to.be.bignumber.equal(expectedNewBalance);
    });
    it("mints the correct quantity of the set for the user", async () => {
      const existingBalance = await setToken.balanceOf.callAsync(signerAddress);

      await subject();

      assertTokenBalance(setToken, existingBalance.add(subjectQuantityToIssue), signerAddress);
    });
    describe("when the quantity to issue is not positive", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
    describe("when the set was not created through core", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(NULL_ADDRESS, signerAddress, signerAddress, componentAddresses[0])
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
    describe("when the quantity is not a multiple of the natural unit of the set", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
    describe("when the order has expired", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], undefined, undefined, -1)
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
    describe("when invalid Set Token quantity in Issuance Order", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], ZERO)
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
    describe("when invalid makerTokenAmount in Issuance Order", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], undefined, ZERO)
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
    describe("when the message is not signed by the maker", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, makerAccount, componentAddresses[0])
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
