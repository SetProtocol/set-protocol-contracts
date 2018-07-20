import * as _ from "lodash";
import * as ethUtil from "ethereumjs-util";
import * as Web3 from "web3";
const web3 = new Web3();

import { BigNumber } from "bignumber.js";
import { Address, Bytes32, Bytes, UInt } from "../types/common.js";
import { ZeroExOrder, ZeroExOrderHeader } from "../types/zeroEx";

import {
  bufferAndLPad32,
  getNumBytesFromHex,
  getNumBytesFromBuffer,
  bufferArrayToHex,
  bufferAndLPad32BigNumber,
} from "./encoding";

export function createZeroExOrder(
  makerAddress: Address,
  takerAddress: Address,
  feeRecipientAddress: Address,
  senderAddress: Address,
  makerAssetAmount: BigNumber,
  takerAssetAmount: BigNumber,
  makerFee: BigNumber,
  takerFee: BigNumber,
  expirationTimeSeconds: BigNumber,
  salt: BigNumber,
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
    signature: Bytes,
    fillAmount: BigNumber,
): Bytes {
  const { makerAssetData, takerAssetData } = zeroExOrder;

  const makerAssetDataLength = getNumBytesFromHex(makerAssetData);
  const takerAssetDataLength = getNumBytesFromHex(makerAssetData);

  // Get signature length
  const signatureLength: BigNumber = getNumBytesFromHex(signature);

  // Get order length
  const zeroExOrderBuffer = bufferZeroExOrder(zeroExOrder);
  const zeroExOrderLength = getNumBytesFromBuffer(zeroExOrderBuffer);

  // Generate the standard byte array
  return bufferArrayToHex(
    bufferOrderHeader(
      signatureLength,
      zeroExOrderLength,
      makerAssetDataLength,
      takerAssetDataLength,
    )
    .concat([bufferAndLPad32BigNumber(fillAmount)])
    .concat([ethUtil.toBuffer(signature)])
    .concat(zeroExOrderBuffer)
  );
}

export function bufferZeroExOrder(
  order: ZeroExOrder,
): Buffer[] {
  return [
      bufferAndLPad32(order.makerAddress),
      bufferAndLPad32(order.takerAddress),
      bufferAndLPad32(order.feeRecipientAddress),
      bufferAndLPad32(order.senderAddress),
      bufferAndLPad32BigNumber(order.makerAssetAmount),
      bufferAndLPad32BigNumber(order.takerAssetAmount),
      bufferAndLPad32BigNumber(order.makerFee),
      bufferAndLPad32BigNumber(order.takerFee),
      bufferAndLPad32BigNumber(order.expirationTimeSeconds),
      bufferAndLPad32BigNumber(order.salt),
      ethUtil.toBuffer(order.makerAssetData),
      ethUtil.toBuffer(order.takerAssetData),
  ];
}

export function generateERC20TokenAssetData(
  tokenAddress: Address,
): string {
  // The ERC20 asset data is always prefixed with 0xf47261b0
  // bytes4 ERC20_SELECTOR = bytes4(keccak256("ERC20Token(address)"));
  const erc20AssetSelector = "0xf47261b0";

  // Remove hex prefix and left pad to 32 bytes
  const moddedTokenAddress = tokenAddress.slice(2).padStart(64, "0");
  return erc20AssetSelector.concat(moddedTokenAddress);
}

function bufferOrderHeader(
  signatureLength: BigNumber,
  orderLength: BigNumber,
  makerAssetDataLength: BigNumber,
  takerAssetDataLength: BigNumber,
): Buffer[] {
    return [
      bufferAndLPad32BigNumber(signatureLength),
      bufferAndLPad32BigNumber(orderLength),
      bufferAndLPad32BigNumber(makerAssetDataLength),
      bufferAndLPad32BigNumber(takerAssetDataLength),
    ];
}
