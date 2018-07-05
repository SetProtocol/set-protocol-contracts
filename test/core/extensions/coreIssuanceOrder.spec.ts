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
    relayerAccount,
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
    let relayerAddress: Address;
    let componentAddresses: Address[];

    let issuanceOrderParams: any;

    beforeEach(async () => {
      signerAddress = signerAccount;
      relayerAddress = relayerAccount;

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
      subjectQuantityToIssue = ether(4);
      issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], relayerAddress);
      subjectExchangeOrdersData = generateOrdersDataForOrderCount(3);
    });

    async function subject(): Promise<string> {
      return core.fillOrder.sendTransactionAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        subjectQuantityToIssue,
        issuanceOrderParams.signature.v,
        [issuanceOrderParams.signature.r, issuanceOrderParams.signature.s],
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

    describe("when the fill size is less than the order quantity", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(2);
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
    });

    describe("when the full fill size has been taken", async () => {
      beforeEach(async () => {
        const quantity = ether(4);
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], relayerAddress, quantity);
        await core.cancelOrder.sendTransactionAsync(
          issuanceOrderParams.addresses,
          issuanceOrderParams.values,
          quantity,
          { from: signerAccount }
        );
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the partial fill size has been taken", async () => {
      beforeEach(async () => {
        const quantity = ether(4);
        const quantityToCancel = ether(2);
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], relayerAddress, quantity);
        await core.cancelOrder.sendTransactionAsync(
          issuanceOrderParams.addresses,
          issuanceOrderParams.values,
          quantityToCancel,
          { from: signerAccount }
        );
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the fill size is greater than the order quantity", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(6);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
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
        issuanceOrderParams = await generateFillOrderParameters(NULL_ADDRESS, signerAddress, signerAddress, componentAddresses[0], relayerAddress);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the fill quantity is not a multiple of the natural unit of the set", async () => {
      beforeEach(async () => {
        subjectQuantityToIssue = ether(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the order quantity is not a multiple of the natural unit of the set", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], relayerAddress, ether(5));
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the order has expired", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], relayerAddress, undefined, undefined, -1);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when Set Token quantity in Issuance Order equals 0", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], relayerAddress, ZERO);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when makerTokenAmount in Issuance Order equals 0", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, signerAddress, componentAddresses[0], relayerAddress, undefined, ZERO);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the message is not signed by the maker", async () => {
      beforeEach(async () => {
        issuanceOrderParams = await generateFillOrderParameters(setToken.address, signerAddress, makerAccount, componentAddresses[0], relayerAddress);
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

  describe.only("#cancelOrder", async () => {
    let subjectCaller: Address;
    let subjectQuantityToCancel: BigNumber;
    let subjectExchangeOrdersData: Bytes32;

    let quantity: BigNumber;
    let makerTokenAmount: BigNumber;
    let expirationTime: number;
    let issuanceOrderParams: any;

    beforeEach(async () => {
      const signerAddress = signerAccount;
      const relayerAddress = relayerAccount;

      const components = await erc20Wrapper.deployTokensAsync(2, signerAddress); //For current purposes issue to maker/signer
      await erc20Wrapper.approveTransfersAsync(components, transferProxy.address, signerAddress);

      const componentAddresses = _.map(components, (token) => token.address);
      const componentUnits = _.map(components, () => ether(4)); // Multiple of naturalUnit
      const setToken = await coreWrapper.createSetTokenAsync(
        core,
        setTokenFactory.address,
        componentAddresses,
        componentUnits,
        ether(2),
      );

      await coreWrapper.registerDefaultExchanges(core);

      subjectCaller = signerAccount;
      subjectQuantityToCancel = ether(2);
      issuanceOrderParams = await generateFillOrderParameters(
        setToken.address,
        signerAddress,
        signerAddress,
        componentAddresses[0],
        relayerAddress,
        quantity || ether(4),
        makerTokenAmount || ether(10),
        expirationTime || 10,
      );
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

   describe("when the quantity to cancel is greater than the open amount", async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(6);
      });

      it("should mark only the remaining open amount as canceled", async () => {
        const filled = await core.orderFills.callAsync(issuanceOrderParams.orderHash);
        const preCanceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
        const openAmount = issuanceOrderParams.values[0].minus(filled).minus(preCanceled);

        await subject();

        const canceled = await core.orderCancels.callAsync(issuanceOrderParams.orderHash);
        expect(canceled).to.be.bignumber.equal(preCanceled + openAmount);
      });
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
      before(async () => {
        quantity = undefined;
        makerTokenAmount = undefined;
        expirationTime = -1;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the cancel quantity is not a multiple of the natural unit of the set", async () => {
      beforeEach(async () => {
        subjectQuantityToCancel = ether(3);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when the Set Token quantity in Issuance Order is not a multiple of the natural unit of the set", async () => {
      before(async () => {
        quantity = ether(5);
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when Set Token quantity in Issuance Order equals 0", async () => {
      before(async () => {
        quantity = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });

    describe("when makerTokenAmount in Issuance Order equals 0", async () => {
      before(async () => {
        quantity = undefined;
        makerTokenAmount = ZERO;
      });

      it("should revert", async () => {
        await expectRevertError(subject());
      });
    });
  });
});
