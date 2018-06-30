import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

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
      bufferAndLPad32(signatureLength),
      bufferAndLPad32(orderLength),
      bufferAndLPad32(makerAssetDataLength),
      bufferAndLPad32(takerAssetDataLength),
    ]
}

export function bufferFillAmount(
  fillAmount: UInt = 0,
): Buffer[] {
    return [bufferAndLPad32(fillAmount)];
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
      bufferAndLPad32(order.makerAssetAmount.toString()),
      bufferAndLPad32(order.takerAssetAmount.toString()),
      bufferAndLPad32(order.makerFee.toString()),
      bufferAndLPad32(order.takerFee.toString()),
      bufferAndLPad32(order.expirationTimeSeconds.toString()),
      bufferAndLPad32(order.salt.toString()),
      bufferAndLPad32(order.makerAssetData),
      bufferAndLPad32(order.takerAssetData),
  ];
}

export function bufferArrayToHex(
  bufferArr: Buffer[]
): Bytes32 {
    const buffer = Buffer.concat(bufferArr);
    return ethUtil.bufferToHex(buffer);
}
