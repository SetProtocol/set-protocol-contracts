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


  let signature: ZeroExSignature = "ABCDEFHIJKLMNOPQRSTUVWXYZ";
  let signatureLength: UInt = signature.length;

  let zeroExOrder: ZeroExOrder;
  let zeroExOrderLength = 0;
  
  let fillAmount = 5;

  let makerAssetDataLength = 4;
  let takerAssetDataLength = 3;



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
    const subjectOrderData: Bytes32 = bufferArrayToHex(bufferOrderHeader(1, 2, 3, 4));

    it("works", async () => {
      const result = await zeroExExchangeWrapper.getOrderDataHeader.callAsync(subjectOrderData);
      expect(result[0]).to.bignumber.equal(new BigNumber(1));
      expect(result[1]).to.bignumber.equal(new BigNumber(2));
      expect(result[2]).to.bignumber.equal(new BigNumber(3));
      expect(result[3]).to.bignumber.equal(new BigNumber(4));
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
      expect(result).to.equal(bufferArrayToHex(zeroExOrderBuffer));
    });
  });


  describe("#parseZeroExOrder", async () => {
    zeroExOrder = createZeroExOrder(
      ownerAccount,
      takerAddress,
      feeRecipientAddress,
      senderAddress,
      new BigNumber(1), // makerAssetAmount
      new BigNumber(2), // takerAssetAmount
      new BigNumber(3), // makerFee
      new BigNumber(4), // takerFee
      new BigNumber(5), // expirationTimeSeconds
      new BigNumber(6), // salt
      'ABC',
      'XYZ',
    );

    const zeroExOrderBuffer = bufferZeroExOrder(zeroExOrder);

    const subjectOrderData: Bytes32 = bufferArrayToHex(zeroExOrderBuffer);

    it("works", async () => {
      const result = await zeroExExchangeWrapper.parseZeroExOrder.callAsync(subjectOrderData, new BigNumber(3), new BigNumber(3));

      expect(ownerAccount).to.equal(result[0][0]);
      expect(takerAddress).to.equal(result[0][1]);
      expect(feeRecipientAddress).to.equal(result[0][2]);
      expect(senderAddress).to.equal(result[0][3]);
      expect(new BigNumber(1)).to.be.bignumber.equal(result[1][0]);
      expect(new BigNumber(2)).to.be.bignumber.equal(result[1][1]);
      expect(new BigNumber(3)).to.be.bignumber.equal(result[1][2]);
      expect(new BigNumber(4)).to.be.bignumber.equal(result[1][3]);
      expect(new BigNumber(5)).to.be.bignumber.equal(result[1][4]);
      expect(new BigNumber(6)).to.be.bignumber.equal(result[1][5]);
      expect('ABC').to.equal(web3.toAscii(result[2]));
      expect('XYZ').to.equal(web3.toAscii(result[3]));
    });
  });

  describe("#parseZeroExOrderData", async () => {
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

    zeroExOrderLength = Buffer.concat(zeroExOrderBuffer).length;

    const subjectOrderData: Bytes32 = bufferArrayToHex(
      bufferOrderHeader(signatureLength, zeroExOrderLength, 3, 3)
      .concat(bufferFillAmount(fillAmount))
      .concat(bufferSignature(signature))
      .concat(zeroExOrderBuffer)
    );


    it("works", async () => {
      const result = await zeroExExchangeWrapper.parseZeroExOrderData.callAsync(subjectOrderData);
      
      expect(ownerAccount).to.equal(result[0][0]);
      expect(takerAddress).to.equal(result[0][1]);
      expect(feeRecipientAddress).to.equal(result[0][2]);
      expect(senderAddress).to.equal(result[0][3]);
      expect(new BigNumber(1)).to.be.bignumber.equal(result[1][0]);
      expect(new BigNumber(2)).to.be.bignumber.equal(result[1][1]);
      expect(new BigNumber(3)).to.be.bignumber.equal(result[1][2]);
      expect(new BigNumber(4)).to.be.bignumber.equal(result[1][3]);
      expect(new BigNumber(5)).to.be.bignumber.equal(result[1][4]);
      expect(new BigNumber(6)).to.be.bignumber.equal(result[1][5]);
      expect('ABC').to.equal(web3.toAscii(result[2]));
      expect('XYZ').to.equal(web3.toAscii(result[3]));
    });
  });
});
