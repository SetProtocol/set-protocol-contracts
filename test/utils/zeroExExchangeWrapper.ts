import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";
import * as Web3 from "web3";
const web3 = new Web3();

import { BigNumber } from "bignumber.js";
import { Address, Bytes32, Bytes, UInt } from "../../types/common.js";
import { ZeroExOrder, ZeroExSignature, ZeroExOrderHeader } from "../../types/zeroEx";

function bufferAndLPad32(input: any): Buffer {
  return ethUtil.setLengthLeft(ethUtil.toBuffer(input), 32);
}

export function createZeroExOrder(
  makerAddress: Address,
  takerAddress: Address,
  feeRecipientAddress: Address,
  senderAddress: Address,
  makerAssetAmount: UInt,
  takerAssetAmount: UInt,
  makerFee: UInt,
  takerFee: UInt,
  expirationTimeSeconds: UInt,
  salt: UInt,
  makerAssetData: Bytes,
  takerAssetData: Bytes,
): ZeroExOrder {
  return {
    makerAddress,
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
  }
}

export function generateStandardZeroExOrderBytesArray(
    zeroExOrder: ZeroExOrder,
    signature: ZeroExSignature,
    fillAmount: UInt,
) {
  const { makerAssetData, takerAssetData } = zeroExOrder;

  const makerAssetDataLength = new BigNumber(makerAssetData.length);
  const takerAssetDataLength = new BigNumber(takerAssetData.length);    

  // Get signature length
  const signatureLength: UInt = new BigNumber(signature.length);
  
  // Get order length   
  const zeroExOrderBuffer = bufferZeroExOrder(zeroExOrder);
  const zeroExOrderLength = getZeroExOrderLengthFromBuffer(zeroExOrderBuffer);

  // Generate the standard byte array
  return bufferArrayToHex(
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
}

export function getZeroExOrderLengthFromBuffer(
    zeroExOrder: Buffer[],
): BigNumber {
    return new BigNumber(Buffer.concat(zeroExOrder).length);
}

export function bufferZeroExOrder(
  order: ZeroExOrder,
): Buffer[] {
  return [
      bufferAndLPad32(order.makerAddress),
      bufferAndLPad32(order.takerAddress),
      bufferAndLPad32(order.feeRecipientAddress),
      bufferAndLPad32(order.senderAddress),
      bufferAndLPad32(web3.toHex(order.makerAssetAmount)),
      bufferAndLPad32(web3.toHex(order.takerAssetAmount)),
      bufferAndLPad32(web3.toHex(order.makerFee)),
      bufferAndLPad32(web3.toHex(order.takerFee)),
      bufferAndLPad32(web3.toHex(order.expirationTimeSeconds)),
      bufferAndLPad32(web3.toHex(order.salt)),
      ethUtil.toBuffer(order.makerAssetData),
      ethUtil.toBuffer(order.takerAssetData),
  ];
}

function bufferOrderHeader(
  signatureLength: UInt,
  orderLength: UInt,
  makerAssetDataLength: UInt,
  takerAssetDataLength: UInt,
): Buffer[] {
    return [
      bufferAndLPad32(web3.toHex(signatureLength)),
      bufferAndLPad32(web3.toHex(orderLength)),
      bufferAndLPad32(web3.toHex(makerAssetDataLength)),
      bufferAndLPad32(web3.toHex(takerAssetDataLength)),
    ];
}

function bufferFillAmount(
  fillAmount: UInt = 0,
): Buffer[] {
    return [bufferAndLPad32(web3.toHex(fillAmount))];
}

function bufferSignature(
  signature: Bytes32 = '',
): Buffer[] {
    return [ethUtil.toBuffer(signature)];
}

function bufferArrayToHex(
  bufferArr: Buffer[]
): Bytes32 {
    const buffer = Buffer.concat(bufferArr);
    return ethUtil.bufferToHex(buffer);
}
