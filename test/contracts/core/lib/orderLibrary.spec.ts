import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether } from "../../../utils/units";

// Types
import { Address, IssuanceOrder } from "../../../../types/common.js";

// Contract types
import { OrderLibraryMockContract } from "../../../../types/generated/order_library_mock";

// Artifacts
const OrderLibraryMock = artifacts.require("OrderLibraryMock");

// Core wrapper
import { CoreWrapper } from "../../../utils/coreWrapper";
import {
  generateFillOrderParameters,
} from "../../../utils/orderWrapper";

// Testing Set up
import { BigNumberSetup } from "../../../utils/bigNumberSetup";
import ChaiSetup from "../../../utils/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  expectRevertError,
} from "../../../utils/tokenAssertions";

import {
  ZERO,
  NULL_ADDRESS,
} from "../../../utils/constants";

contract("OrderLibrary", (accounts) => {
  const [
    ownerAccount,
    takerAccount,
    makerAccount,
    signerAccount,
    relayerAccount,
    mockSetTokenAccount,
    mockTokenAccount
  ] = accounts;

  let orderLib: OrderLibraryMockContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  beforeEach(async () => {
    orderLib = await coreWrapper.deployMockOrderLibAsync();
  });

  describe("#validateSignature", async () => {
    let subjectCaller: Address;
    let subjectMaker: Address;
    let signerAddress: Address;
    let relayerAddress: Address;
    let orderQuantity: BigNumber;
    let makerTokenAmount: BigNumber;
    let timeToExpiration: number;
    let issuanceOrderParams: any;

    beforeEach(async () => {
      subjectCaller = takerAccount;
      subjectMaker = signerAccount;

      signerAddress = signerAccount;
      relayerAddress = relayerAccount;
      orderQuantity = ether(4);
      makerTokenAmount = ether(10);
      timeToExpiration = 10;

      issuanceOrderParams = await generateFillOrderParameters(
        mockSetTokenAccount,
        signerAddress,
        signerAddress,
        mockTokenAccount,
        relayerAddress,
        orderQuantity,
        makerTokenAmount,
        timeToExpiration,
      );
    });

    async function subject(): Promise<boolean> {
      return orderLib.testValidateSignature.callAsync(
        issuanceOrderParams.orderHash,
        subjectMaker,
        issuanceOrderParams.signature.v,
        issuanceOrderParams.signature.r,
        issuanceOrderParams.signature.s,
        { from: subjectCaller },
      );
    }

    it("should return true", async () => {
      const validSig = await subject();

      expect(validSig).to.equal(true);
    });
    describe("when the message is not signed by the maker", async () => {
      beforeEach(async () => {
        subjectMaker = makerAccount;
      });

      it("should return false", async () => {
        const validSig = await subject();

        expect(validSig).to.equal(false);
      });
    });
  });
  describe("#generateOrderHash", async () => {
    let subjectCaller: Address;

    let signerAddress: Address;
    let relayerAddress: Address;
    let orderQuantity: BigNumber;
    let makerTokenAmount: BigNumber;
    let timeToExpiration: number;

    let issuanceOrderParams: any;

    beforeEach(async () => {
      subjectCaller = takerAccount;

      signerAddress = signerAccount;
      relayerAddress = relayerAccount;
      orderQuantity = ether(4);
      makerTokenAmount = ether(10);
      timeToExpiration = 10;

      issuanceOrderParams = await generateFillOrderParameters(
        mockSetTokenAccount,
        signerAddress,
        signerAddress,
        mockTokenAccount,
        relayerAddress,
        orderQuantity,
        makerTokenAmount,
        timeToExpiration,
      );
    });

    async function subject(): Promise<string> {
      return orderLib.testGenerateOrderHash.callAsync(
        issuanceOrderParams.addresses,
        issuanceOrderParams.values,
        { from: subjectCaller },
      );
    }

    it("should return true", async () => {
      const contractOrderHash = await subject();

      expect(contractOrderHash).to.equal(issuanceOrderParams.orderHash);
    });
  });
});