import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";
import * as Web3 from "web3";
const web3 = new Web3();

import { BigNumber } from "bignumber.js";
import { Address, Bytes32, Bytes, UInt } from "../../types/common.js";
import { ZeroExOrder } from "../../types/zeroEx";

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

export function bufferOrderHeader(
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
    ]
}

export function bufferFillAmount(
  fillAmount: UInt = 0,
): Buffer[] {
    return [bufferAndLPad32(web3.toHex(fillAmount))];
}

export function bufferSignature(
  signature: Bytes32 = '',
): Buffer[] {
    return [ethUtil.toBuffer(signature)];
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

export function bufferArrayToHex(
  bufferArr: Buffer[]
): Bytes32 {
    const buffer = Buffer.concat(bufferArr);
    return ethUtil.bufferToHex(buffer);
}
