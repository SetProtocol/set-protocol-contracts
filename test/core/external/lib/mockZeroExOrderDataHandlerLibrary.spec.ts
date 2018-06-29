import * as chai from "chai";
import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";

// Types
import { Address, Bytes32, Log, UInt } from "../../../../types/common.js";
import { ZeroExSignature, ZeroExOrderHeader, ZeroExOrder } from "../../../../types/zeroEx";

// Contract types
import { MockZeroExOrderDataHandlerLibraryContract } from "../../../../types/generated/mock_zero_ex_order_data_handler_library";

// Artifacts
const MockZeroExOrderDataHandlerLibrary = artifacts.require("MockZeroExOrderDataHandlerLibrary");

import {
  bufferOrderHeader,
  bufferFillAmount,
  bufferSignature,
  bufferZeroExOrder,
  bufferArrayToHex,
  createZeroExOrder,
} from "../../../utils/zeroExExchangeWrapper";

// Testing Set up
import { BigNumberSetup } from "../../../config/bigNumberSetup";
import ChaiSetup from "../../../config/chaiSetup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import {
  DEFAULT_GAS,
} from "../../../utils/constants";
 
contract("MockZeroExOrderDataHandlerLibrary", (accounts) => {
  const [ownerAccount, takerAddress, feeRecipientAddress, senderAddress] = accounts;
  let zeroExExchangeWrapper: MockZeroExOrderDataHandlerLibraryContract;

  // Signature
  let signature: ZeroExSignature = "ABCDEFgiHIJKLMNOPQRSTUVWXYZ";

  // 0x Order Subject Data
  let fillAmount = new BigNumber(5);

  let makerAssetAmount = new BigNumber(1);
  let takerAssetAmount = new BigNumber(2);
  let makerFee = new BigNumber(3);
  let takerFee = new BigNumber(4);
  let expirationTimeSeconds = new BigNumber(5);
  let salt = new BigNumber(6);
  let makerAssetData = "ABC";
  let takerAssetData = "XYZ";

  let zeroExOrder: ZeroExOrder = createZeroExOrder(
    ownerAccount,
    takerAddress,
    feeRecipientAddress,
    senderAddress,
    makerAssetAmount,
    takerAssetAmount,
    makerFee,
    takerFee,
    expirationTimeSeconds,
    salt,
    makerAssetData,
    takerAssetData,
  );

  // Header Subject Data
  let signatureLength: UInt = new BigNumber(signature.length);
  let zeroExOrderLength = new BigNumber(0);
  let makerAssetDataLength = new BigNumber(makerAssetData.length);
  let takerAssetDataLength = new BigNumber(takerAssetData.length);

  beforeEach(async () => {
    const zeroExExchangeWrapperInstance = await MockZeroExOrderDataHandlerLibrary.new(
      { from: ownerAccount, gas: DEFAULT_GAS },
    );

    zeroExExchangeWrapper = new MockZeroExOrderDataHandlerLibraryContract(
      web3.eth.contract(zeroExExchangeWrapperInstance.abi).at(zeroExExchangeWrapperInstance.address),
      { from: ownerAccount },
    );
  });

  describe("#getOrderDataHeader", async () => {
    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      subjectOrderData = bufferArrayToHex(bufferOrderHeader(
        signatureLength,
        zeroExOrderLength,
        makerAssetDataLength,
        takerAssetDataLength
      ));
    });

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getOrderDataHeader.callAsync(subjectOrderData);

      expect(result[0]).to.bignumber.equal(signatureLength);
      expect(result[1]).to.bignumber.equal(zeroExOrderLength);
      expect(result[2]).to.bignumber.equal(makerAssetDataLength);
      expect(result[3]).to.bignumber.equal(takerAssetDataLength);
    });
  });

  describe("#getFillAmount", async () => {
    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      subjectOrderData = bufferArrayToHex(
        bufferOrderHeader(
          signatureLength,
          zeroExOrderLength,
          makerAssetDataLength,
          takerAssetDataLength,
        ).concat(bufferFillAmount(fillAmount)
      ));
    });

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getFillAmount.callAsync(subjectOrderData);
      expect(result).to.be.bignumber.equal(fillAmount);
    });
  });

  describe("#getSignature", async () => {
    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      subjectOrderData = bufferArrayToHex(
        bufferOrderHeader(
          signatureLength,
          zeroExOrderLength,
          makerAssetDataLength,
          takerAssetDataLength,
        )
        .concat(bufferFillAmount(fillAmount))
        .concat(bufferSignature(signature)
      ));
    });

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getSignature.callAsync(subjectOrderData);
      expect(web3.toAscii(result)).to.equal(signature);
    });
  });

  describe("#parseZeroExOrder", async () => {
    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      const zeroExOrderBuffer = bufferZeroExOrder(zeroExOrder);

      subjectOrderData = bufferArrayToHex(zeroExOrderBuffer);
    });

    it("works", async () => {
      const result = await zeroExExchangeWrapper.parseZeroExOrder.callAsync(
        subjectOrderData,
        makerAssetDataLength,
        takerAssetDataLength
      );

      const [addresses, uints, makerAssetDataResult, takerAssetDataResult] = result;
      const [makerResult, takerResult, feeRecipientResult, senderResult] = addresses;
      const [
        makerAssetAmountResult,
        takerAssetAmountResult,
        makerFeeResult,
        takerFeeResult,
        expirationResult,
        saltResult,
      ] = uints;

      expect(ownerAccount).to.equal(makerResult);
      expect(takerAddress).to.equal(takerResult);
      expect(feeRecipientAddress).to.equal(feeRecipientResult);
      expect(senderAddress).to.equal(senderResult);
      expect(makerAssetAmount).to.be.bignumber.equal(makerAssetAmountResult);
      expect(takerAssetAmount).to.be.bignumber.equal(takerAssetAmountResult);
      expect(makerFee).to.be.bignumber.equal(makerFeeResult);
      expect(takerFee).to.be.bignumber.equal(takerFeeResult);
      expect(expirationTimeSeconds).to.be.bignumber.equal(expirationResult);
      expect(salt).to.be.bignumber.equal(saltResult);
      expect(makerAssetData).to.equal(web3.toAscii(makerAssetDataResult));
      expect(takerAssetData).to.equal(web3.toAscii(takerAssetDataResult));
    });
  });

  describe("#parseZeroExOrderData", async () => {
    let subjectOrderData: Bytes32;

    beforeEach(async () => {
      const zeroExOrderBuffer = bufferZeroExOrder(zeroExOrder);

      zeroExOrderLength = new BigNumber(Buffer.concat(zeroExOrderBuffer).length);

      subjectOrderData = bufferArrayToHex(
        bufferOrderHeader(
          signatureLength,
          zeroExOrderLength,
          makerAssetDataLength,
          takerAssetDataLength,
        )
        .concat(bufferFillAmount(fillAmount))
        .concat(bufferSignature(signature))
        .concat(zeroExOrderBuffer)
      );
    });

    it("works", async () => {
      const result = await zeroExExchangeWrapper.parseZeroExOrderData.callAsync(subjectOrderData);
      
      const [addresses, uints, makerAssetDataResult, takerAssetDataResult] = result;
      const [makerResult, takerResult, feeRecipientResult, senderResult] = addresses;
      const [
        makerAssetAmountResult,
        takerAssetAmountResult,
        makerFeeResult,
        takerFeeResult,
        expirationResult,
        saltResult,
      ] = uints;

      expect(ownerAccount).to.equal(makerResult);
      expect(takerAddress).to.equal(takerResult);
      expect(feeRecipientAddress).to.equal(feeRecipientResult);
      expect(senderAddress).to.equal(senderResult);
      expect(makerAssetAmount).to.be.bignumber.equal(makerAssetAmountResult);
      expect(takerAssetAmount).to.be.bignumber.equal(takerAssetAmountResult);
      expect(makerFee).to.be.bignumber.equal(makerFeeResult);
      expect(takerFee).to.be.bignumber.equal(takerFeeResult);
      expect(expirationTimeSeconds).to.be.bignumber.equal(expirationResult);
      expect(salt).to.be.bignumber.equal(saltResult);
      expect(makerAssetData).to.equal(web3.toAscii(makerAssetDataResult));
      expect(takerAssetData).to.equal(web3.toAscii(takerAssetDataResult));
    });
  });
});
