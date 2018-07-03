import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../utils/units";

// Types
import { Address, Bytes32, IssuanceOrder } from "../../../types/common.js";

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
  generateOrdersDataForOrderCount,
  generateOrdersDataWithIncorrectExchange,
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
    let subjectExchangeOrdersData: Bytes32;

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

      await coreWrapper.registerDefaultExchanges(core);

      subjectCaller = takerAccount;
      subjectQuantityToIssue = ether(2);
      issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0]);
      subjectExchangeOrdersData = generateOrdersDataForOrderCount(3);
    });

    async function subject(): Promise<string> {
      return core.fillOrder.sendTransactionAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        subjectQuantityToIssue,
        issuanceOrderParams.signature.v,
        issuanceOrderParams.signature.r,
        issuanceOrderParams.signature.s,
        subjectExchangeOrdersData,
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

    it("marks the correct amount as filled in orderFills mapping", async () => {
      const preFilled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
      expect(preFilled).to.be.bignumber.equal(ZERO);

      await subject();

      const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
      expect(filled).to.be.bignumber.equal(subjectQuantityToIssue);
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
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, makerAccount, componentAddresses[0]);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when an encoded exchangeId is invalid", async () => {
      beforeEach(async () => {
        subjectExchangeOrdersData = generateOrdersDataWithIncorrectExchange();
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });

  describe("#cancelOrder", async () => {
    let subjectCaller: Address;
    let subjectQuantityToCancel: BigNumber;
    let subjectExchangeOrdersData: Bytes32;

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

      await coreWrapper.registerDefaultExchanges(core);

      subjectCaller = signerAccount;
      subjectQuantityToCancel = ether(2);
      issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0]);
      subjectExchangeOrdersData = generateOrdersDataForOrderCount(3);
    });

    async function subject(): Promise<string> {
      return core.cancelOrder.sendTransactionAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        subjectQuantityToCancel,
        { from: subjectCaller },
      );
    }

    it("marks the correct amount as canceled in orderCancels mapping", async () => {
      const preCanceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
      expect(preCanceled).to.be.bignumber.equal(ZERO);

      await subject();

      const canceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
      expect(canceled).to.be.bignumber.equal(subjectQuantityToCancel);
    });

    describe("when the quantity to cancel is not positive", async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the transaction sender is not the maker", async () => {
      beforeEach(async () => {
        subjectCaller = takerAccount;
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
  });
});
