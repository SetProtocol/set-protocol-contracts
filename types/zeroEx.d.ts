import { BigNumber } from "bignumber.js";
import { Address, Bytes, UInt } from "./common";

export interface ZeroExOrderHeader {
  signatureLength: UInt;
  orderLength: UInt;
  makerAssetDataLength: UInt;
  takerAssetDataLength: UInt;
}

export interface ZeroExOrder {
  makerAddress: Address;
  takerAddress: Address;
  feeRecipientAddress: Address;
  senderAddress: Address;
  makerAssetAmount: BigNumber;
  takerAssetAmount: BigNumber;
  makerFee: BigNumber;
  takerFee: BigNumber;
  expirationTimeSeconds: BigNumber;
  salt: BigNumber;
  makerAssetData: Bytes;
  takerAssetData: Bytes;
}