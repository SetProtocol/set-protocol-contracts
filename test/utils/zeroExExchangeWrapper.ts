import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";

import { BigNumber } from "bignumber.js";
import { Address, Bytes32, Bytes, UInt } from "../../types/common.js";
import { ZeroExOrder } from "../../types/zeroEx";

function bufferAndLPad32(input: any): Buffer {
  return ethUtil.setLengthLeft(ethUtil.toBuffer(input), 32);
}

/**
  makerAddress  address  Address that created the order.
  takerAddress  address  Address that is allowed to fill the order. If set to 0, any address is allowed to fill the order.
  feeRecipientAddress  address  Address that will recieve fees when order is filled.
  senderAddress  address  Address that is allowed to call Exchange contract methods that affect this order. If set to 0, any address is allowed to call these methods.
  makerAssetAmount  uint256  Amount of makerAsset being offered by maker. Must be greater than 0.
  takerAssetAmount  uint256  Amount of takerAsset being bid on by maker. Must be greater than 0.
  makerFee  uint256  Amount of ZRX paid to feeRecipient by maker when order is filled. If set to 0, no transfer of ZRX from maker to feeRecipient will be attempted.
  takerFee  uint256  Amount of ZRX paid to feeRecipient by taker when order is filled. If set to 0, no transfer of ZRX from taker to feeRecipient will be attempted.
  expirationTimeSeconds  uint256  Timestamp in seconds at which order expires.
  salt  uint256  Arbitrary number to facilitate uniqueness of the order's hash.
  makerAssetData  bytes  ABIv2 encoded data that can be decoded by a specified proxy contract when transferring makerAsset.
  takerAssetData  bytes  ABIv2 encoded data that can be decoded by a specified proxy contract when transferring takerAsset.
**/

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


export function generateZeroExExchangeOrdersHeader(
  signatureLength: UInt,
  orderLength: UInt,
  makerAssetDataLength: UInt,
  takerAssetDataLength: UInt,
  fillAmount: UInt = 0,
  signature: Bytes32 = '',
): Bytes32 {
  const buffer = Buffer.concat(
    [
      bufferAndLPad32(signatureLength),
      bufferAndLPad32(orderLength),
      bufferAndLPad32(makerAssetDataLength),
      bufferAndLPad32(takerAssetDataLength),
      bufferAndLPad32(fillAmount),
      ethUtil.toBuffer(signature),
    ]
  );

  return ethUtil.bufferToHex(buffer);
}
