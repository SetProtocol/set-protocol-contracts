import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address, Bytes32, Log, UInt } from "../../../types/common.js";
import { ZeroExSignature, ZeroExOrderHeader, ZeroExOrder } from "../../../types/zeroEx";

// Contract types
import { ZeroExExchangeWrapperContract } from "../../../types/generated/zero_ex_exchange_wrapper";

// Artifacts
const ZeroExExchangeWrapper = artifacts.require("ZeroExExchangeWrapper");

import {
  bufferOrderHeader,
  bufferFillAmount,
  bufferSignature,
  bufferZeroExOrder,
  bufferArrayToHex,
  createZeroExOrder,
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
  const [ownerAccount, takerAddress, feeRecipientAddress, senderAddress] = accounts;
  let zeroExExchangeWrapper: ZeroExExchangeWrapperContract;


  let signature: ZeroExSignature = "ABCDEFHIJKLMNOPQRSTUVWXYZ";
  let signatureLength: UInt = signature.length;

  let zeroExOrder: ZeroExOrder;
  let zeroExOrderLength = 0;
  
  let fillAmount = 5;

  let makerAssetDataLength = 4;
  let takerAssetDataLength = 3;



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
    const subjectOrderData: Bytes32 = bufferArrayToHex(bufferOrderHeader(1, 2, 3, 4));

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getSumFromOrderDataHeader.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(10);
    });
  });

  describe("#getSignatureLength", async () => {
    const subjectOrderData: Bytes32 = bufferArrayToHex(bufferOrderHeader(signatureLength, 2, 3, 4));

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getSignatureLength.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(signatureLength);
    });
  });

  describe("#getFillAmount", async () => {
    const subjectOrderData: Bytes32 = bufferArrayToHex(
      bufferOrderHeader(signatureLength, 2, 3, 4).concat(bufferFillAmount(fillAmount))
    );

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getFillAmount.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(fillAmount);
    });
  });

  describe("#trySlicing", async () => {
    const subjectOrderData: Bytes32 = bufferArrayToHex(bufferOrderHeader(signatureLength, 2, 3, 4));

    it("works", async () => {
      const result = await zeroExExchangeWrapper.trySlicing.callAsync(subjectOrderData, new BigNumber(0), new BigNumber(32));

      expect(result).to.be.bignumber.equal(signatureLength);
    });
  });

  describe("#getSignature", async () => {
    const subjectOrderData: Bytes32 = bufferArrayToHex(
      bufferOrderHeader(signatureLength, 2, 3, 4)
      .concat(bufferFillAmount(fillAmount))
      .concat(bufferSignature(signature))
    );

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getSignature.callAsync(subjectOrderData);
      expect(web3.toAscii(result)).to.equal(signature);
    });
  });

  describe("#getZeroExOrderInBytes", async () => {

    console.log("Account", ownerAccount);

    zeroExOrder = createZeroExOrder(
      ownerAccount,
      takerAddress,
      feeRecipientAddress,
      senderAddress,
      new BigNumber(1),
      new BigNumber(2),
      new BigNumber(3),
      new BigNumber(4),
      new BigNumber(5),
      new BigNumber(6),
      'ABC',
      'XYZ',
    );

    const zeroExOrderBuffer = bufferZeroExOrder(zeroExOrder);

    // Trim the 0x in the front and divide by two to get the num bytesgit 
    zeroExOrderLength = Buffer.concat(zeroExOrderBuffer).length;

    const subjectOrderData: Bytes32 = bufferArrayToHex(
      bufferOrderHeader(signatureLength, zeroExOrderLength, 3, 4)
      .concat(bufferFillAmount(fillAmount))
      .concat(bufferSignature(signature))
      .concat(zeroExOrderBuffer)
    );

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getZeroExOrderInBytes.callAsync(subjectOrderData);
      
      console.log(result);
      expect(1).to.equal(1);
    });
  });
});
