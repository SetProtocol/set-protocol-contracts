import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address, Bytes32, Log } from "../../../types/common.js";

// Contract types
import { ZeroExExchangeWrapperContract } from "../../../types/generated/zero_ex_exchange_wrapper";

// Artifacts
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");

import {
  generateZeroExExchangeOrdersHeader,
} from "../../utils/zeroExExchangeWrapper";

// Testing Set up
import { BigNumberSetup } from "../../config/bigNumberSetup";
import ChaiSetup from "../../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  DEFAULT_GAS,
} from "../../utils/constants";
 
contract("ZeroExExchangeWrapper", (accounts) => {
  const [ownerAccount] = accounts;
  let zeroExExchangeWrapper: ZeroExExchangeWrapperContract;

  beforeEach(async () => {
    const zeroExExchangeWrapperInstance = await ZeroExExchangeWrapper.new(
      { from: ownerAccount, gas: DEFAULT_GAS },
    );

    zeroExExchangeWrapper = new ZeroExExchangeWrapperContract(
      web3.eth.contract(zeroExExchangeWrapperInstance.abi).at(zeroExExchangeWrapperInstance.address),
      { from: ownerAccount },
    );
  });

  describe("#getSumFromOrderDataHeader", async () => {
    const subjectOrderData: Bytes32 = generateZeroExExchangeOrdersHeader(1, 2, 3, 4);

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getSumFromOrderDataHeader.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(10);
    });
  });

  describe("#getSignatureLength", async () => {
    const signature = "ABCDEFHIJKLMNOPQRSTUVWXYZ";
    const signatureLength = signature.length;


    const subjectOrderData: Bytes32 = generateZeroExExchangeOrdersHeader(signatureLength, 2, 3, 4, 0, signature);

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getSignatureLength.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(signatureLength);
    });
  });

  describe("#getFillAmount", async () => {
    const fillAmount = 5;

    const subjectOrderData: Bytes32 = generateZeroExExchangeOrdersHeader(1, 2, 3, 4, fillAmount);

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getFillAmount.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(fillAmount);
    });
  });

  describe("#trySlicing", async () => {
    const signature = "ABCDEFHIJKLMNOPQRSTUVWXYZ";
    const signatureLength = signature.length;

    const subjectOrderData: Bytes32 = generateZeroExExchangeOrdersHeader(signatureLength, 2, 3, 4, 0, signature);

    it("works", async () => {
      const result = await zeroExExchangeWrapper.trySlicing.callAsync(subjectOrderData, new BigNumber(0), new BigNumber(32));

      expect(result).to.be.bignumber.equal(signatureLength);
    });
  });

  describe.only("#getSignature", async () => {
    const signature = "ABCDEFHIJKLMNOPQRSTUVWXYZ";
    const signatureLength = signature.length;

    console.log("Sig", signature)
    console.log("SigLength", signatureLength);

    const subjectOrderData: Bytes32 = generateZeroExExchangeOrdersHeader(signatureLength, 2, 3, 4, 0, signature);

    console.log("data length", subjectOrderData.length);

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getSignature.callAsync(subjectOrderData);

      console.log(web3.toAscii(result));

      expect(web3.toAscii(result)).to.equal(signature);
    });
  });
});
