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
  makerAssetAmount: UInt;
  takerAssetAmount: UInt;
  makerFee: UInt;
  takerFee: UInt;
  expirationTimeSeconds: UInt;
  salt: UInt;
  makerAssetData: Bytes;
  takerAssetData: Bytes;
}

export type ZeroExSignature = string;
